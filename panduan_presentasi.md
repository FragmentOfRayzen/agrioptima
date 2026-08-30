# 📋 Panduan Presentasi Website AgriOptima

> Panduan ini untuk kamu dan teman satu tim (Ilmu Komputer) yang bertanggung jawab di bagian **pembangunan web**.

---

## 🎯 Yang Perlu Kamu Ingat Sebelum Presentasi

**Peran kamu di tim:**
> "Kami bertanggung jawab untuk membangun **platform web** yang menampilkan dan memvisualisasikan hasil dari penelitian ini. Tugas kami adalah menerjemahkan model matematika yang sudah dirancang oleh tim peneliti ke dalam bentuk **antarmuka web yang interaktif**, sehingga pengguna bisa melihat data, menjalankan simulasi, dan memahami hasilnya secara visual."

**Yang bukan tanggung jawab kamu:**
- ❌ Membuat model matematika MILP
- ❌ Menentukan nilai parameter (h_i, c_i, s_i, l_i)
- ❌ Menyelesaikan model / solver exact
- ❌ Melakukan uji sensitivitas parameter

**Yang menjadi tanggung jawab kamu:**
- ✅ Membangun antarmuka web (frontend)
- ✅ Memvisualisasikan data cuaca & tanaman
- ✅ Menyediakan form input untuk parameter model
- ✅ Menampilkan hasil simulasi dalam bentuk grafik & jadwal
- ✅ Menyiapkan infrastruktur web (backend, database, login)

---

## 🗣️ Skrip Presentasi (Step-by-Step)

### Pembukaan (30 detik)

> *"Untuk bagian pengembangan web, kami sudah membangun platform bernama **AgriOptima** yang berfungsi sebagai antarmuka web untuk model optimisasi pola tanam yang sedang dikembangkan dalam penelitian ini. Website ini dibangun menggunakan **React** sebagai frontend dan **Node.js** sebagai backend, dengan database **PostgreSQL** untuk manajemen pengguna."*

---

### Demo 1: Landing Page (1-2 menit)

Buka `http://localhost:5173/`

> *"Ini adalah halaman utama website kami. Di sini pengunjung bisa melihat:"*
>
> **[scroll pelan-pelan sambil menjelaskan]**
>
> 1. *"**Judul penelitian lengkap** — Optimisasi Pola Tanam Pertanian dengan Faktor Cuaca Ekstrem, studi kasus di Desa Saribudolok."*
>
> 2. *"**Statistik penelitian** — 10 jenis tanaman yang dianalisis, 7 famili botani, 12 bulan periode analisis, dan ketinggian lokasi 1.400 mdpl."*
>
> 3. *"**Showcase 10 komoditas pertanian** Saribudolok yang menjadi objek penelitian, mulai dari Tomat, Cabai, Kubis, sampai Kopi dan Jeruk."*
>
> 4. *"**Penjelasan metodologi MILP** — kami tampilkan fungsi tujuan, variabel keputusan, dan keempat kendala yang digunakan dalam model."*
>
> *"Semua data ini kami ambil dari laporan kemajuan penelitian yang sudah disusun."*

---

### Demo 2: Dashboard — Grafik Cuaca (1-2 menit)

Klik "Simulasi Model" → klik "Masuk Mode Demo" → masuk Dashboard

> *"Ini adalah dashboard utama sistem. Bagian pertama menampilkan **data iklim Desa Saribudolok** yang kami ambil dari sumber WeatherSpark."*
>
> **[tunjuk grafik cuaca]**
>
> *"Grafik ini menampilkan **curah hujan bulanan** selama setahun. Yang berwarna **hijau** adalah bulan-bulan dengan cuaca **normal**, yaitu Januari sampai Juli, di mana curah hujan di bawah 200 milimeter per bulan."*
>
> *"Yang berwarna **oranye/kuning** adalah bulan-bulan dengan cuaca **tidak normal**, yaitu Agustus sampai Desember, di mana curah hujan mencapai di atas 200 milimeter. Garis putus-putus merah ini menandai **batas 200mm** yang menjadi threshold dalam model MILP."*
>
> *"Curah hujan **terendah** ada di bulan Februari yaitu 124 milimeter, dan **tertinggi** di bulan Oktober yaitu 297 milimeter."*
>
> *"Klasifikasi cuaca normal dan tidak normal ini **sangat penting** dalam model, karena mempengaruhi parameter **beta** (penurunan produksi) dan **gamma** (kenaikan biaya operasional)."*

---

### Demo 3: Tabel Tanaman (1 menit)

> **[scroll ke tabel tanaman]**
>
> *"Di sini kami menampilkan **10 jenis tanaman** yang dibudidayakan di Desa Saribudolok berdasarkan data survei lapangan. Setiap tanaman memiliki klasifikasi **famili botani** — ini penting untuk kendala rotasi tanaman dalam model."*
>
> *"Misalnya, Tomat, Cabai, dan Kentang semuanya dari famili **Solanaceae**, sehingga dalam model tidak boleh ditanam berurutan di lahan yang sama."*
>
> **[tunjuk kolom yang bertuliskan "belum ada"]**
>
> *"Untuk kolom parameter — yaitu **h_i** (produksi maksimum), **c_i** (biaya produksi), dan **s_i** (harga jual) — saat ini masih kosong karena **data dari survei lapangan dan data komoditas dari pemerintah setempat masih dalam proses pengumpulan** oleh tim peneliti. Ketika data tersebut sudah tersedia, kami tinggal memasukkannya ke dalam sistem dan simulasi akan langsung bisa menghitung pendapatan netto secara akurat."*

---

### Demo 4: Form Simulasi (1-2 menit)

> **[scroll ke form parameter]**
>
> *"Ini adalah form input parameter model MILP. User bisa mengatur:"*
>
> 1. *"**Luas Lahan Total (A)** — dalam satuan hektar. Ini adalah total kapasitas lahan yang tersedia per bulan."*
>
> 2. *"**Beta (β)** — persentase penurunan hasil produksi ketika cuaca tidak normal. Misalnya 20% berarti produksi turun 20% di bulan-bulan hujan tinggi."*
>
> 3. *"**Gamma (γ)** — persentase kenaikan biaya operasional saat cuaca tidak normal. Misalnya 15% berarti biaya naik 15% karena petani perlu penanganan ekstra."*
>
> 4. *"**Pola Tanam** — ada tiga opsi sesuai dengan yang dibahas di laporan: **Tanaman Tunggal**, **Tumpang Sari**, dan **Rotasi Tanaman**."*
>
> *"Catatan kuning di bawah menginformasikan bahwa data parameter tanaman belum tersedia, jadi simulasi saat ini menampilkan jadwal berdasarkan **durasi tanam dan kendala famili** saja."*

---

### Demo 5: Jalankan Simulasi (1-2 menit)

> **[klik tombol "Jalankan Optimisasi"]**
>
> *"Setelah kita klik, solver akan berjalan dan menghasilkan rekomendasi."*
>
> **[tunjuk grafik hasil]**
>
> *"Grafik ini menunjukkan dari 10 tanaman, ada **4 tanaman yang dipilih** untuk ditanam dalam satu tahun dengan pola rotasi."*
>
> **[scroll ke jadwal tanam]**
>
> *"Dan ini adalah **jadwal tanam yang direkomendasikan**:"*
>
> 1. *"**Sawi Putih** ditanam bulan Januari–Februari — cuaca normal, famili Brassicaceae."*
> 2. *"**Wortel** ditanam bulan Maret–Mei — cuaca normal, famili Apiaceae, **berbeda** dari Sawi."*
> 3. *"**Bawang Merah** ditanam bulan Juni–Agustus — transisi cuaca, famili Amaryllidaceae."*
> 4. *"**Jagung** ditanam bulan September–Desember — cuaca tidak normal, famili Poaceae."*
>
> *"Perhatikan bahwa **tidak ada dua tanaman berurutan dari famili yang sama** — ini sesuai dengan kendala rotasi famili di model MILP."*

---

### Penutup (30 detik)

> *"Jadi secara keseluruhan, platform web ini sudah siap menerima data dari tim peneliti. Begitu **nilai parameter** dan **hasil penyelesaian model MILP** sudah tersedia, kami tinggal memasukkannya ke dalam sistem. Dashboard akan langsung menampilkan perhitungan pendapatan bruto, biaya produksi, dan pendapatan netto secara otomatis."*
>
> *"Terima kasih."*

---

## ❓ Jawaban untuk Pertanyaan yang Mungkin Muncul

### Q1: "Kenapa nilai parameternya kosong?"

> *"Nilai parameter seperti h_i, c_i, dan s_i memerlukan **data dari survei lapangan** dan **data komoditas dari BPS/pemerintah setempat**. Pengumpulan data tersebut masih dalam proses oleh tim. Dari sisi web, sistem kami sudah siap — begitu datanya ada, kami tinggal input dan hasilnya langsung muncul."*

### Q2: "Solver MILP-nya sudah jalan belum?"

> *"Saat ini kami sudah mengimplementasikan **solver sederhana** di frontend menggunakan JavaScript untuk keperluan demonstrasi. Solver ini sudah menerapkan kendala-kendala yang ada di model, seperti kendala cuaca, luas lahan, tanam tunggal per tahun, dan rotasi famili. Untuk **solver MILP exact** yang menggunakan metode seperti Branch and Bound, itu bagian dari tahap penyelesaian model yang akan diselesaikan oleh tim peneliti — kemungkinan menggunakan Python dengan library PuLP atau SciPy."*

### Q3: "Uji sensitivitas parameternya mana?"

> *"Uji sensitivitas parameter merupakan tahap lanjutan setelah model MILP selesai diselesaikan. Dari sisi web, kami bisa menambahkan fitur tersebut — misalnya user bisa mengubah-ubah nilai beta dan gamma, lalu melihat bagaimana perubahan itu mempengaruhi jadwal tanam dan keuntungan. Fondasi untuk itu sudah ada di form parameter yang bisa diadjust."*

### Q4: "Teknologi apa yang dipakai?"

> *"Frontend menggunakan **React** dengan **TypeScript** dan build tool **Vite**. Untuk styling kami pakai **Tailwind CSS**, dan visualisasi grafik menggunakan library **Recharts**. Backend menggunakan **Node.js** dengan **Express**, database **PostgreSQL**, dan autentikasi **JWT** dengan verifikasi email OTP."*

### Q5: "Data cuacanya dari mana?"

> *"Data iklim kami ambil dari **WeatherSpark.com** untuk wilayah Saribudolok, sesuai dengan yang tercantum di **Gambar 4.2 dan 4.3** di laporan kemajuan penelitian. Itu mencakup curah hujan bulanan rata-rata dan peluang curah hujan harian."*

### Q6: "Apa bedanya cuaca normal dan tidak normal?"

> *"Berdasarkan definisi di laporan, bulan dengan curah hujan **di bawah 200mm** diklasifikasikan sebagai cuaca **normal** (Januari–Juli), dan di atas 200mm sebagai cuaca **tidak normal** (Agustus–Desember). Di bulan tidak normal, model memperhitungkan **penurunan produksi** sebesar beta persen dan **kenaikan biaya** sebesar gamma persen."*

### Q7: "Kenapa pakai rotasi famili?"

> *"Tanaman dari famili botani yang sama memiliki kebutuhan hara, hama, dan penyakit yang serupa. Kalau ditanam berurutan di lahan yang sama, bisa merusak kesuburan tanah. Contohnya Tomat, Cabai, dan Kentang semuanya famili Solanaceae — dalam model, ketiganya tidak boleh ditanam berurutan. Ini sesuai dengan kendala di **bagian 4.3.2.d** di laporan kemajuan."*

### Q8: "Ini bisa diakses online?"

> *"Saat ini website berjalan di **localhost** (lokal). Untuk deployment online, kami bisa gunakan layanan seperti Vercel untuk frontend dan Railway untuk backend. Tapi itu tahap berikutnya setelah semua data dan model sudah final."*

---

## 🔑 Kalimat Kunci yang Bisa Kamu Hafalkan

Kalau bingung, pakai kalimat-kalimat ini:

| Situasi | Kalimat |
|---------|---------|
| Saat menjelaskan peran | *"Tugas kami sebagai tim pembuat web adalah **memvisualisasikan** hasil penelitian ke dalam platform yang interaktif."* |
| Saat ditanya soal yang kosong | *"Data tersebut masih dalam **proses pengumpulan** oleh tim peneliti. Dari sisi web, sistem sudah **siap menerima** data tersebut."* |
| Saat ditanya soal solver | *"Kami sudah menyiapkan **kerangka solver** di frontend. Solver exact MILP akan diintegrasikan setelah tim peneliti menyelesaikan **penyelesaian model** di tahap berikutnya."* |
| Saat menunjukkan fitur | *"Fitur ini kami buat berdasarkan **[sebut halaman/tabel di laporan]** yang ada di laporan kemajuan penelitian."* |
| Saat menutup | *"Website ini sudah **siap pakai**. Begitu data parameter dan hasil solver tersedia, tinggal dimasukkan dan hasilnya langsung tampil."* |
