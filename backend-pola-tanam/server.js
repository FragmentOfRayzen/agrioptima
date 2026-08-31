require("dotenv").config();
// Paksa IPv4 agar kompatibel dengan Railway (Railway tidak support IPv6 ke Gmail)
require("dns").setDefaultResultOrder("ipv4first");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool.connect(function(err, client, release) {
  if (err) {
    console.error("Gagal menyambung ke PostgreSQL:", err.message);
  } else {
    console.log("Berhasil tersambung ke database agrioptima_db");
    release();
  }
});

const emailUser = (process.env.EMAIL_USER || "").trim();
const emailPass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "").trim();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  tls: { rejectUnauthorized: false }
});

transporter.verify(function(error, success) {
  if (error) {
    console.error("Status Koneksi Email Gmail:", error.message);
  } else {
    console.log("Email Transporter Gmail Siap Mengirim Pesan");
  }
});

function buatTemplateEmail(nama, otp) {
  return "<div style='font-family:Arial,sans-serif;padding:20px;color:#333;max-width:500px;margin:auto;border:1px solid #ddd;border-radius:10px;'>" +
    "<h2 style='color:#023c27;text-align:center;'>AgriOptima Research</h2>" +
    "<p>Halo <b>" + (nama || "Peneliti") + "</b>,</p>" +
    "<p>Untuk mengaktifkan akun Anda, gunakan kode OTP berikut:</p>" +
    "<div style='background:#f4f9f6;border:2px dashed #69bd45;padding:15px;text-align:center;margin:20px 0;border-radius:8px;'>" +
    "<h1 style='margin:0;letter-spacing:8px;color:#023c27;font-size:32px;'>" + otp + "</h1>" +
    "</div>" +
    "<p style='font-size:12px;color:#888;text-align:center;'>Kode ini hanya berlaku selama 10 menit.</p>" +
    "<p style='margin-top:30px;'>Salam hangat,<br>Tim Peneliti AgriOptima</p>" +
    "</div>";
}

// 1. Registrasi
app.post("/api/auth/register", async function(req, res) {
  try {
    var nama = req.body.nama;
    var instansi = req.body.instansi;
    var email = req.body.email;
    var password = req.body.password;

    var userExist = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar di sistem!" });
    }

    var salt = await bcrypt.genSalt(10);
    var passwordHash = await bcrypt.hash(password, salt);
    var otpToken = Math.floor(100000 + Math.random() * 900000).toString();
    var otpExpiresAt = new Date(Date.now() + 10 * 60000);

    var newUser = await pool.query(
      "INSERT INTO users (nama, instansi, email, password_hash, otp_token, otp_expires_at, is_verified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, nama",
      [nama, instansi, email, passwordHash, otpToken, otpExpiresAt, false]
    );

    console.log("[OTP DARURAT] Token untuk " + email + ": " + otpToken);
    try {
      await transporter.sendMail({
        from: '"Sistem AgriOptima" <' + emailUser + ">",
        to: email,
        subject: "Kode Verifikasi OTP Anda - AgriOptima",
        html: buatTemplateEmail(nama, otpToken)
      });
      console.log("Email OTP dikirim ke: " + email);
    } catch (mailErr) {
      console.error("Gagal kirim email:", mailErr.message);
      console.log("[OTP DARURAT] Kode untuk " + email + ": " + otpToken);
    }

    res.status(201).json({
      message: "Registrasi berhasil! Silakan periksa email Anda untuk kode OTP.",
      email: newUser.rows[0].email
    });
  } catch (error) {
    console.error("Error registrasi:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// 2. Verifikasi OTP
app.post("/api/auth/verify", async function(req, res) {
  try {
    var email = req.body.email;
    var token = req.body.token;

    var userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan." });
    }
    var user = userResult.rows[0];

    if (user.is_verified) {
      return res.status(400).json({ message: "Akun ini sudah aktif, silakan langsung login." });
    }
    if (user.otp_token !== token) {
      return res.status(400).json({ message: "Token verifikasi tidak valid atau salah!" });
    }
    if (new Date() > new Date(user.otp_expires_at)) {
      return res.status(400).json({ message: "Token telah kadaluarsa! Silakan kirim ulang OTP." });
    }

    await pool.query(
      "UPDATE users SET is_verified = $1, otp_token = $2, otp_expires_at = $3 WHERE email = $4",
      [true, null, null, email]
    );

    res.status(200).json({ message: "Verifikasi berhasil! Akun Anda telah aktif." });
  } catch (error) {
    console.error("Error verifikasi OTP:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// 3. Kirim Ulang OTP
app.post("/api/auth/resend-otp", async function(req, res) {
  try {
    var email = req.body.email;

    var userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan." });
    }
    var user = userResult.rows[0];

    if (user.is_verified) {
      return res.status(400).json({ message: "Akun ini sudah aktif, silakan langsung login." });
    }

    var newOtpToken = Math.floor(100000 + Math.random() * 900000).toString();
    var newOtpExpiresAt = new Date(Date.now() + 10 * 60000);

    await pool.query(
      "UPDATE users SET otp_token = $1, otp_expires_at = $2 WHERE email = $3",
      [newOtpToken, newOtpExpiresAt, email]
    );

    console.log("[OTP DARURAT] Token baru untuk " + email + ": " + newOtpToken);
    try {
      await transporter.sendMail({
        from: '"Sistem AgriOptima" <' + emailUser + ">",
        to: email,
        subject: "Kirim Ulang: Kode Verifikasi OTP Anda - AgriOptima",
        html: buatTemplateEmail(user.nama, newOtpToken)
      });
      console.log("Email OTP baru dikirim ke: " + email);
    } catch (mailErr) {
      console.error("Gagal kirim email:", mailErr.message);
      console.log("[OTP DARURAT] Kode baru: " + newOtpToken);
    }

    res.status(200).json({ message: "Token OTP baru telah dikirim ulang ke email Anda!" });
  } catch (error) {
    console.error("Error kirim ulang OTP:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// 4. Login
app.post("/api/auth/login", async function(req, res) {
  try {
    var email = req.body.email;
    var password = req.body.password;

    var userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Email atau password salah!" });
    }
    var user = userResult.rows[0];

    if (!user.is_verified) {
      return res.status(403).json({ message: "Akun belum diverifikasi. Silakan cek email Anda untuk kode OTP." });
    }

    var validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Email atau password salah!" });
    }

    var token = jwt.sign(
      { id: user.id, email: user.email, nama: user.nama, instansi: user.instansi },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login berhasil!",
      token: token,
      user: { id: user.id, nama: user.nama, email: user.email, instansi: user.instansi }
    });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// 5. Lupa Password
app.post("/api/auth/forgot-password", async function(req, res) {
  try {
    var email = req.body.email;

    var userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Email tidak terdaftar di sistem." });
    }
    var user = userResult.rows[0];

    var resetToken = crypto.randomBytes(32).toString("hex");
    var resetExpiresAt = new Date(Date.now() + 15 * 60000);

    await pool.query(
      "UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE email = $3",
      [resetToken, resetExpiresAt, email]
    );

    var frontendUrl = process.env.FRONTEND_URL || "https://agrioptima-frontend-production.up.railway.app";
    var resetLink = frontendUrl + "/reset-password?token=" + resetToken + "&email=" + encodeURIComponent(email);

    var emailHTML = "<div style='font-family:Arial;padding:20px;'>" +
      "<h2 style='color:#023c27;'>Pemulihan Password</h2>" +
      "<p>Halo <b>" + user.nama + "</b>,</p>" +
      "<p>Klik link berikut untuk mereset password Anda:</p>" +
      "<a href='" + resetLink + "' style='background:#69bd45;color:white;padding:12px 25px;text-decoration:none;border-radius:5px;'>Reset Password</a>" +
      "<p style='font-size:12px;color:#888;margin-top:20px;'>Link berlaku 15 menit.</p></div>";

    try {
      await transporter.sendMail({
        from: '"Sistem AgriOptima" <' + emailUser + ">",
        to: email,
        subject: "Reset Password Anda - AgriOptima",
        html: emailHTML
      });
      console.log("Link reset dikirim ke: " + email);
    } catch (mailErr) {
      console.error("Gagal kirim email reset:", mailErr.message);
    }

    res.status(200).json({ message: "Link pemulihan telah dikirim ke email Anda!" });
  } catch (error) {
    console.error("Error forgot password:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// 6. Reset Password
app.post("/api/auth/reset-password", async function(req, res) {
  try {
    var email = req.body.email;
    var token = req.body.token;
    var newPassword = req.body.newPassword;

    var userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan." });
    }
    var user = userResult.rows[0];

    if (user.reset_password_token !== token) {
      return res.status(400).json({ message: "Token keamanan tidak valid." });
    }
    if (new Date() > new Date(user.reset_password_expires)) {
      return res.status(400).json({ message: "Link reset password telah kadaluarsa." });
    }

    var salt = await bcrypt.genSalt(10);
    var passwordHash = await bcrypt.hash(newPassword, salt);

    await pool.query(
      "UPDATE users SET password_hash = $1, reset_password_token = null, reset_password_expires = null WHERE email = $2",
      [passwordHash, email]
    );

    res.status(200).json({ message: "Password berhasil diubah! Silakan login dengan password baru." });
  } catch (error) {
    console.error("Error reset password:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// JWT Middleware
function authenticateToken(req, res, next) {
  var authHeader = req.headers["authorization"];
  var token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Akses ditolak. Token tidak ditemukan." });
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) return res.status(403).json({ message: "Sesi telah berakhir. Silakan login kembali." });
    req.user = user;
    next();
  });
}

// 7. Profile
app.get("/api/auth/profile", authenticateToken, async function(req, res) {
  try {
    var userResult = await pool.query(
      "SELECT id, nama, instansi, email, created_at FROM users WHERE id = $1",
      [req.user.id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    res.status(200).json(userResult.rows[0]);
  } catch (error) {
    console.error("Error get profile:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// 8. Ubah Password
app.post("/api/auth/change-password", authenticateToken, async function(req, res) {
  try {
    var currentPassword = req.body.currentPassword;
    var newPassword = req.body.newPassword;

    var userResult = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    var user = userResult.rows[0];

    var validPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ message: "Password saat ini yang Anda masukkan salah!" });
    }

    var salt = await bcrypt.genSalt(10);
    var passwordHash = await bcrypt.hash(newPassword, salt);

    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [passwordHash, user.id]);
    res.status(200).json({ message: "Password berhasil diperbarui!" });
  } catch (error) {
    console.error("Error change password:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// 9. Simpan Riwayat
app.post("/api/history", authenticateToken, async function(req, res) {
  try {
    var luas_lahan = req.body.luas_lahan;
    var total_tanaman_aktif = req.body.total_tanaman_aktif;
    var rekomendasi_pola = req.body.rekomendasi_pola;
    var estimasi_pendapatan = req.body.estimasi_pendapatan;
    var userId = req.user.id;

    var newHistory = await pool.query(
      "INSERT INTO riwayat_simulasi (user_id, luas_lahan, total_tanaman_aktif, rekomendasi_pola, estimasi_pendapatan) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, luas_lahan, total_tanaman_aktif, rekomendasi_pola, estimasi_pendapatan]
    );

    res.status(201).json({ message: "Riwayat berhasil disimpan!", data: newHistory.rows[0] });
  } catch (error) {
    console.error("Error save history:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat menyimpan riwayat." });
  }
});

// 10. Ambil Riwayat
app.get("/api/history", authenticateToken, async function(req, res) {
  try {
    var userId = req.user.id;
    var historyResult = await pool.query(
      "SELECT * FROM riwayat_simulasi WHERE user_id = $1 ORDER BY tanggal_simulasi DESC",
      [userId]
    );
    res.status(200).json(historyResult.rows);
  } catch (error) {
    console.error("Error fetch history:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil riwayat." });
  }
});

// Health Check
app.get("/", function(req, res) {
  res.json({ status: "ok", message: "Server AgriOptima Backend Berjalan Lancar!", version: "3.0" });
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("Server berjalan di http://localhost:" + PORT);
});
