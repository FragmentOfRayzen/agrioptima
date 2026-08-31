require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt'); // Tambahan: Library kriptografi password
const jwt = require('jsonwebtoken'); // Tambahkan baris ini
const nodemailer = require('nodemailer'); // Tambahan: Library untuk kirim email asli

const crypto = require('crypto'); // Tambahkan ini
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Konfigurasi Koneksi PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Gagal menyambung ke PostgreSQL:', err.message);
  } else {
    console.log('✅ Berhasil tersambung ke database agrioptima_db');
    release();
  }
});

// ========================================================
// KONFIGURASI PENGIRIMAN EMAIL (NODEMAILER)
// ========================================================
// ========================================================
// KONFIGURASI PENGIRIMAN EMAIL (NODEMAILER)
// ========================================================
const emailUser = (process.env.EMAIL_USER || '').trim();
const emailPass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '').trim();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('? Status Koneksi Email Gmail:', error.message);
  } else {
    console.log('? Email Transporter Gmail Siap Mengirim Pesan');
  }
});
// Fungsi bantuan untuk mendesain template email HTML agar terlihat profesional
const buatTemplateEmail = (nama, otp) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="color: #023c27; text-align: center;">AgriOptima Research</h2>
    <p>Halo <b>${nama || 'Peneliti'}</b>,</p>
    <p>Terima kasih telah bergabung di Sistem Pendukung Keputusan Pola Tanam kami. Untuk mengaktifkan akun Anda, gunakan kode Verifikasi (OTP) berikut:</p>
    <div style="background-color: #f4f9f6; border: 2px dashed #69bd45; padding: 15px; text-align: center; margin: 20px 0; border-radius: 8px;">
      <h1 style="margin: 0; letter-spacing: 8px; color: #023c27; font-size: 32px;">${otp}</h1>
    </div>
    <p style="font-size: 12px; color: #888; text-align: center;">Kode ini bersifat rahasia dan hanya berlaku selama 10 menit.</p>
    <p style="margin-top: 30px;">Salam hangat,<br>Tim Peneliti AgriOptima</p>
  </div>
`;

// ========================================================
// API ENDPOINTS UNTUK AUTENTIKASI
// ========================================================

// 1. API Registrasi Akun Peneliti
app.post('/api/auth/register', async (req, res) => {
  try {
    // Menangkap data yang dikirim dari Frontend (React)
    const { nama, instansi, email, password } = req.body;

    // A. Cek apakah email sudah pernah mendaftar di database
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar di sistem!' });
    }

    // B. Lakukan Hashing (Pengacakan) Password
    // Angka 10 adalah "salt rounds" (tingkat kerumitan enkripsi, standar industri)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // C. Buat 6 Digit Angka OTP Acak
    const otpToken = Math.floor(100000 + Math.random() * 900000).toString();
    
    // D. Buat batas waktu OTP (berlaku 10 menit dari sekarang)
    const otpExpiresAt = new Date(Date.now() + 10 * 60000);

    // E. Simpan semua data ke dalam database PostgreSQL
    const newUser = await pool.query(
      `INSERT INTO users (nama, instansi, email, password_hash, otp_token, otp_expires_at, is_verified) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, nama`,
      [nama, instansi, email, passwordHash, otpToken, otpExpiresAt, false]
    );

    // F. Mengirim Email OTP yang Sesungguhnya
    console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + (typeof otpToken !== 'undefined' ? otpToken : 'token'));
    try {
      await transporter.sendMail({
      from: `"Sistem AgriOptima" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Kode Verifikasi OTP Anda - AgriOptima',
      html: buatTemplateEmail(nama, otpToken)
    });
      console.log('? Email OTP berhasil dikirim ke: ' + email);
    } catch (mailErr) {
      console.error('?? Gagal mengirim email OTP via SMTP:', mailErr.message);
    }

    // Beri tahu Frontend bahwa pendaftaran berhasil
    res.status(201).json({ 
      message: 'Registrasi berhasil! Silakan periksa email Anda untuk kode OTP.',
      email: newUser.rows[0].email 
    });

  } catch (error) {
    console.error('Error saat registrasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// 2. API Verifikasi Token OTP Email
app.post('/api/auth/verify', async (req, res) => {
  try {
    const { email, token } = req.body;

    // A. Cari pengguna berdasarkan email di database
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    const user = userResult.rows[0];

    // B. Cek apakah akun sudah diverifikasi sebelumnya
    if (user.is_verified) {
      return res.status(400).json({ message: 'Akun ini sudah aktif, silakan langsung login.' });
    }

    // C. Cocokkan token OTP yang dimasukkan oleh pengguna
    if (user.otp_token !== token) {
      return res.status(400).json({ message: 'Token verifikasi tidak valid atau salah!' });
    }

    // D. Periksa apakah token OTP sudah melewati batas waktu (kadaluarsa)
    const sekarang = new Date();
    if (sekarang > new Date(user.otp_expires_at)) {
      return res.status(400).json({ message: 'Token telah kadaluarsa! Silakan lakukan pendaftaran ulang.' });
    }

    // E. Jika semua valid, perbarui status pengguna di database menjadi AKTIF (is_verified = true)
    // Hapus juga token dan waktu kadaluarsanya agar tidak bisa digunakan lagi
    await pool.query(
      'UPDATE users SET is_verified = $1, otp_token = $2, otp_expires_at = $3 WHERE email = $4',
      [true, null, null, email]
    );

    res.status(200).json({ message: 'Verifikasi berhasil! Akun Anda telah aktif.' });

  } catch (error) {
    console.error('Error saat verifikasi OTP:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// 3. API Kirim Ulang Token OTP
app.post('/api/auth/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    // A. Cari pengguna berdasarkan email
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    const user = userResult.rows[0];

    // B. Cek apakah sudah diverifikasi
    if (user.is_verified) {
      return res.status(400).json({ message: 'Akun ini sudah aktif, silakan langsung login.' });
    }

    // C. Buat OTP Baru dan perbarui waktu kadaluarsanya
    const newOtpToken = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtpExpiresAt = new Date(Date.now() + 10 * 60000); // +10 menit lagi

    // D. Simpan OTP baru ke database
    await pool.query(
      'UPDATE users SET otp_token = $1, otp_expires_at = $2 WHERE email = $3',
      [newOtpToken, newOtpExpiresAt, email]
    );

    // E. Mengirim Ulang Email OTP yang Sesungguhnya
    console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + (typeof otpToken !== 'undefined' ? otpToken : 'token'));
    try {
      await transporter.sendMail({
      from: `"Sistem AgriOptima" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Kirim Ulang: Kode Verifikasi OTP Anda',
      html: buatTemplateEmail(user.nama, newOtpToken)
    });
    console.log(`✉️ Email OTP baru berhasil dikirim ulang ke: ${email}`);

    res.status(200).json({ message: 'Token OTP baru telah dikirim ulang ke email Anda!' });

  } catch (error) {
    console.error('Error saat kirim ulang OTP:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// 4. API Login & Pembuatan JWT (Session Token)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // A. Cari pengguna berdasarkan email
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Email tidak ditemukan! Silakan daftar terlebih dahulu.' });
    }

    const user = userResult.rows[0];

    // B. Periksa apakah akun sudah diverifikasi (Lulus Tahap OTP)
    if (!user.is_verified) {
      return res.status(403).json({ message: 'Akun belum diverifikasi. Silakan selesaikan verifikasi OTP.' });
    }

    // C. Verifikasi Password menggunakan Bcrypt (Mencocokkan teks dengan hash di database)
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ message: 'Password yang Anda masukkan salah!' });
    }

    // D. Buat JSON Web Token (JWT)
    // Menyimpan identitas dasar di dalam token (jangan pernah menyimpan password di sini)
    const tokenPayload = {
      id: user.id,
      email: user.email,
      nama: user.nama,
      instansi: user.instansi
    };

    // Menerbitkan token yang dikunci dengan JWT_SECRET rahasia kita, berlaku selama 1 hari (24 jam)
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' });

    console.log(`✅ PENGGUNA LOGIN: ${user.email} (JWT Berhasil Diterbitkan)`);

    // E. Kirim token dan data profil ke Frontend
    res.status(200).json({
      message: 'Login berhasil!',
      token: token,
      user: {
        nama: user.nama,
        instansi: user.instansi
      }
    });

  } catch (error) {
    console.error('Error saat login:', error);
    res.status(500).json({ message: 'Terjadi kesalahan internal pada server.' });
  }
});
// 5. API Lupa Password (Kirim Link)
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Cari pengguna
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Email tidak ditemukan di sistem kami.' });
    }

    const user = userResult.rows[0];

    // Buat Token Kriptografi Acak (64 karakter hex)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpiresAt = new Date(Date.now() + 15 * 60000); // Berlaku 15 menit

    // Simpan token ke database
    await pool.query(
      'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE email = $3',
      [resetToken, resetExpiresAt, email]
    );

    // Buat Link Reset
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}&email=${email}`;

    // Template Email Reset
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #023c27; text-align: center;">Pemulihan Password</h2>
        <p>Halo <b>${user.nama}</b>,</p>
        <p>Kami menerima permintaan untuk mereset password akun AgriOptima Anda. Klik tombol di bawah ini untuk membuat password baru:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${resetLink}" style="background-color: #69bd45; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password Sekarang</a>
        </div>
        <p style="font-size: 12px; color: #888;">Link ini hanya berlaku selama 15 menit. Jika Anda tidak merasa meminta reset password, abaikan email ini.</p>
      </div>
    `;

    console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + (typeof otpToken !== 'undefined' ? otpToken : 'token'));
    try {
      await transporter.sendMail({
      from: `"Sistem AgriOptima" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Password Anda - AgriOptima',
      html: emailHTML
    });

    console.log(`✉️ Link reset password dikirim ke: ${email}`);
    res.status(200).json({ message: 'Link pemulihan telah dikirim ke email Anda!' });

  } catch (error) {
    console.error('Error forgot password:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// 6. API Reset Password (Menyimpan Password Baru)
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });

    const user = userResult.rows[0];

    // Validasi Keamanan Token
    if (user.reset_password_token !== token) {
      return res.status(400).json({ message: 'Token keamanan tidak valid atau telah dimanipulasi.' });
    }
    
    if (new Date() > new Date(user.reset_password_expires)) {
      return res.status(400).json({ message: 'Link reset password telah kadaluarsa. Silakan minta ulang.' });
    }

    // Hash Password Baru
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update Password & Bersihkan Token agar tidak bisa dipakai lagi (Mencegah Replay Attack)
    await pool.query(
      'UPDATE users SET password_hash = $1, reset_password_token = null, reset_password_expires = null WHERE email = $2',
      [passwordHash, email]
    );

    res.status(200).json({ message: 'Password berhasil diubah! Silakan login dengan password baru.' });

  } catch (error) {
    console.error('Error reset password:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// ========================================================
// MIDDLEWARE AUTENTIKASI JWT UNTUK HALAMAN INTERNAL
// ========================================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Format token dari React: "Bearer TOKEN_STRING"
  const token = authHeader && authHeader.split(' ')[1]; 
  
  if (!token) return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Sesi telah berakhir atau token tidak valid. Silakan login kembali.' });
    req.user = user; // Menyimpan data payload JWT (id, email, nama, instansi) ke dalam request
    next();
  });
};

// 7. API Dapatkan Profil Pengguna (Hanya bisa diakses jika punya JWT)
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const userResult = await pool.query(
      'SELECT id, nama, instansi, email, created_at FROM users WHERE id = $1', 
      [req.user.id]
    );
    if (userResult.rows.length === 0) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    
    res.status(200).json(userResult.rows[0]);
  } catch (error) {
    console.error('Error get profile:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// 8. API Ubah Password Pengguna Aktif
app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    
    if (userResult.rows.length === 0) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    const user = userResult.rows[0];

    // Cek kecocokan password lama
    const validPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!validPassword) return res.status(400).json({ message: 'Password saat ini yang Anda masukkan salah!' });

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Simpan ke database
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, user.id]);

    res.status(200).json({ message: 'Password berhasil diperbarui!' });
  } catch (error) {
    console.error('Error change password:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// ========================================================
// API RIWAYAT SIMULASI
// ========================================================

// 9. API Simpan Hasil Simulasi Baru
app.post('/api/history', authenticateToken, async (req, res) => {
  try {
    const { luas_lahan, total_tanaman_aktif, rekomendasi_pola, estimasi_pendapatan } = req.body;
    const userId = req.user.id; // Diambil otomatis dari token JWT

    const newHistory = await pool.query(
      `INSERT INTO riwayat_simulasi 
       (user_id, luas_lahan, total_tanaman_aktif, rekomendasi_pola, estimasi_pendapatan) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, luas_lahan, total_tanaman_aktif, rekomendasi_pola, estimasi_pendapatan]
    );

    res.status(201).json({ message: 'Riwayat berhasil disimpan!', data: newHistory.rows[0] });
  } catch (error) {
    console.error('Error save history:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan riwayat.' });
  }
});

// 10. API Ambil Riwayat Simulasi (Khusus Milik Pengguna yang Login)
app.get('/api/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Identitas dari token JWT
    
    const historyResult = await pool.query(
      'SELECT * FROM riwayat_simulasi WHERE user_id = $1 ORDER BY tanggal_simulasi DESC',
      [userId]
    );
    
    res.status(200).json(historyResult.rows);
  } catch (error) {
    console.error('Error fetch history:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil riwayat.' });
  }
});
// Route Dasar
app.get('/', (req, res) => {
  res.send('Server AgriOptima Backend Berjalan Lancar!');
});

// Menjalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
