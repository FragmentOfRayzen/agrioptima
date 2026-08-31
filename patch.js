const fs = require("fs");
let code = fs.readFileSync("backend-pola-tanam/server.js", "utf-8");

// Fix resend-otp
const badResend = `    try {
      await transporter.sendMail({
      from: \`"Sistem AgriOptima" <${process.env.EMAIL_USER}>\`,
      to: email,
      subject: 'Kirim Ulang: Kode Verifikasi OTP Anda',
      html: buatTemplateEmail(user.nama, newOtpToken)
    });
    console.log(\`o%,? Email OTP baru berhasil dikirim ulang ke: ${email}\`);

    res.status(200).json({ message: 'Token OTP baru telah dikirim ulang ke email Anda!' });

  } catch (error) {`;

const goodResend = `    try {
      await transporter.sendMail({
        from: \`"Sistem AgriOptima" <${process.env.EMAIL_USER}>\`,
        to: email,
        subject: 'Kirim Ulang: Kode Verifikasi OTP Anda',
        html: buatTemplateEmail(user.nama, newOtpToken)
      });
      console.log(\`Email OTP baru berhasil dikirim ulang ke: ${email}\`);
    } catch (mailErr) {
      console.error('Gagal mengirim email OTP via SMTP:', mailErr.message);
    }

    res.status(200).json({ message: 'Token OTP baru telah dikirim ulang ke email Anda!' });

  } catch (error) {`;

// Fix forgot-password
const badForgot = `    try {
      await transporter.sendMail({
      from: \`"Sistem AgriOptima" <${process.env.EMAIL_USER}>\`,
      to: email,
      subject: 'Reset Password Anda - AgriOptima',
      html: emailHTML
    });

    console.log(\`o%,? Link reset password dikirim ke: ${email}\`);
    res.status(200).json({ message: 'Link pemulihan telah dikirim ke email Anda!' });

  } catch (error) {`;

const goodForgot = `    try {
      await transporter.sendMail({
        from: \`"Sistem AgriOptima" <${process.env.EMAIL_USER}>\`,
        to: email,
        subject: 'Reset Password Anda - AgriOptima',
        html: emailHTML
      });
      console.log(\`Link reset password dikirim ke: ${email}\`);
    } catch (mailErr) {
      console.error('Gagal mengirim email reset via SMTP:', mailErr.message);
    }

    res.status(200).json({ message: 'Link pemulihan telah dikirim ke email Anda!' });

  } catch (error) {`;

code = code.replace(badResend, goodResend);
code = code.replace(badForgot, goodForgot);

code = code.replace("console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + (typeof otpToken !== 'undefined' ? otpToken : 'token'));", "console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + (typeof newOtpToken !== 'undefined' ? newOtpToken : 'token'));");

fs.writeFileSync("backend-pola-tanam/server.js", code);
