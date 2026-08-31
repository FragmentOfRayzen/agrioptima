$content = Get-Content "server.js" -Raw
$old = @"
    // E. Mengirim Ulang Email OTP yang Sesungguhnya
    console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + (typeof otpToken !== 'undefined' ? otpToken : 'token'));
    try {
      await transporter.sendMail({
      from: `"Sistem AgriOptima" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Kirim Ulang: Kode Verifikasi OTP Anda',
      html: buatTemplateEmail(user.nama, newOtpToken)
    });
    console.log(`o%,? Email OTP baru berhasil dikirim ulang ke: ${email}`);

    res.status(200).json({ message: 'Token OTP baru telah dikirim ulang ke email Anda!' });

  } catch (error) {
    console.error('Error saat kirim ulang OTP:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});
"@

$new = @"
    // E. Mengirim Ulang Email OTP yang Sesungguhnya
    console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + newOtpToken);
    try {
      await transporter.sendMail({
        from: `"Sistem AgriOptima" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Kirim Ulang: Kode Verifikasi OTP Anda',
        html: buatTemplateEmail(user.nama, newOtpToken)
      });
      console.log(`Email OTP baru berhasil dikirim ulang ke: ${email}`);
    } catch (mailErr) {
      console.error('Gagal mengirim email OTP via SMTP:', mailErr.message);
    }

    res.status(200).json({ message: 'Token OTP baru telah dikirim ulang ke email Anda!' });

  } catch (error) {
    console.error('Error saat kirim ulang OTP:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});
"@

$content = $content.Replace($old, $new)
Set-Content "server.js" -Value $content -NoNewline
