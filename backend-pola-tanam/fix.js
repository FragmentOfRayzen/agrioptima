const fs = require('fs');
let file = fs.readFileSync('server.js', 'utf8');

const regex = /\/\/ E\. Mengirim Ulang Email OTP yang Sesungguhnya[\s\S]*?Terjadi kesalahan pada server\.' \}\);\s*\}\s*\)\;/;
const newStr = \    // E. Mengirim Ulang Email OTP yang Sesungguhnya
    console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + newOtpToken);
    try {
      await transporter.sendMail({
        from: \\\"\Sistem AgriOptima\\\" <\>,
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
});\

if(regex.test(file)) {
    file = file.replace(regex, newStr);
    fs.writeFileSync('server.js', file, 'utf8');
    console.log('Success regex');
} else {
    console.log('Regex not found!');
}
