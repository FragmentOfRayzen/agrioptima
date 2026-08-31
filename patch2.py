with open("backend-pola-tanam/server.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Fix resend-otp
lines[206] = "    console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + newOtpToken);\n"
lines[207] = "    try {\n"
lines[208] = "      await transporter.sendMail({\n"
lines[209] = "        from: `\"Sistem AgriOptima\" <${process.env.EMAIL_USER}>`,\n"
lines[210] = "        to: email,\n"
lines[211] = "        subject: 'Kirim Ulang: Kode Verifikasi OTP Anda',\n"
lines[212] = "        html: buatTemplateEmail(user.nama, newOtpToken)\n"
lines[213] = "      });\n"
lines[214] = "      console.log(`Email OTP baru berhasil dikirim ulang ke: ${email}`);\n"
lines[215] = "    } catch (mailErr) {\n"
lines[216] = "      console.error('Gagal mengirim email OTP via SMTP:', mailErr.message);\n"
lines[217] = "    }\n"
lines[218] = "\n"

# Fix forgot-password
lines[318] = "    try {\n"
lines[319] = "      await transporter.sendMail({\n"
lines[320] = "        from: `\"Sistem AgriOptima\" <${process.env.EMAIL_USER}>`,\n"
lines[321] = "        to: email,\n"
lines[322] = "        subject: 'Reset Password Anda - AgriOptima',\n"
lines[323] = "        html: emailHTML\n"
lines[324] = "      });\n"
lines[325] = "      console.log(`Link reset password dikirim ke: ${email}`);\n"
lines[326] = "    } catch (mailErr) {\n"
lines[327] = "      console.error('Gagal mengirim email reset via SMTP:', mailErr.message);\n"
lines[328] = "    }\n"
lines[329] = "    res.status(200).json({ message: 'Link pemulihan telah dikirim ke email Anda!' });\n"

# Fix app.listen
for i, line in enumerate(lines):
    if "app.listen(PORT, () => {" in line:
        lines[i] = "app.listen(PORT, '0.0.0.0', () => {\n"

with open("backend-pola-tanam/server.js", "w", encoding="utf-8") as f:
    f.writelines(lines)
