with open('backend-pola-tanam/server.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

lines[206] = "    console.log('[OTP SYSTEM] Token OTP untuk ' + email + ': ' + newOtpToken);\n"
lines[214] = "      console.log(Email OTP baru berhasil dikirim ulang ke: );\n    } catch (mailErr) {\n      console.error('Gagal mengirim email OTP via SMTP:', mailErr.message);\n    }\n"

lines[318] = "\n"
lines[327] = "      console.log(Link reset password dikirim ke: );\n    } catch (mailErr) {\n      console.error('Gagal mengirim email reset via SMTP:', mailErr.message);\n    }\n"

for i, line in enumerate(lines):
    if "app.listen(PORT, () => {" in line:
        lines[i] = "app.listen(PORT, '0.0.0.0', () => {\n"

with open('backend-pola-tanam/server.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)
