const fs = require("fs");
let code = fs.readFileSync("server.js", "utf-8");

const resendRegex = /\/\/ E\. Mengirim Ulang Email OTP yang Sesungguhnya[\s\S]*?Terjadi kesalahan pada server\.' \}\);\s*\}\s*\)\;/;
const resendNew = `    // E. Mengirim Ulang Email OTP yang Sesungguhnya
    console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + newOtpToken);
    try {
      await transporter.sendMail({
        from: '"Sistem AgriOptima" <' + process.env.EMAIL_USER + '>',
        to: email,
        subject: 'Kirim Ulang: Kode Verifikasi OTP Anda',
        html: buatTemplateEmail(user.nama, newOtpToken)
      });
      console.log('Email OTP baru berhasil dikirim ulang ke: ' + email);
    } catch (mailErr) {
      console.error('Gagal mengirim email OTP via SMTP:', mailErr.message);
    }

    res.status(200).json({ message: 'Token OTP baru telah dikirim ulang ke email Anda!' });

  } catch (error) {
    console.error('Error saat kirim ulang OTP:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});`;

const forgotRegex = /console\.log\('\[OTP SYSTEM\] Token OTP untuk ' \+ email \+ ': ' \+ \(typeof otpToken !== 'undefined' \? otpToken : 'token'\)\);\s*try \{\s*await transporter\.sendMail\(\{[\s\S]*?\}\);\s*console\.log\([^)]+\);\s*res\.status\(200\)\.json\(\{ message: 'Link pemulihan telah dikirim ke email Anda!' \}\);\s*\} catch \(error\) \{/;
const forgotNew = `try {
      await transporter.sendMail({
        from: '"Sistem AgriOptima" <' + process.env.EMAIL_USER + '>',
        to: email,
        subject: 'Reset Password Anda - AgriOptima',
        html: emailHTML
      });
      console.log('Link reset password dikirim ke: ' + email);
    } catch (mailErr) {
      console.error('Gagal mengirim email reset via SMTP:', mailErr.message);
    }

    res.status(200).json({ message: 'Link pemulihan telah dikirim ke email Anda!' });

  } catch (error) {`;

code = code.replace(resendRegex, resendNew);
code = code.replace(forgotRegex, forgotNew);

fs.writeFileSync("server.js", code);
