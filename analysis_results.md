# Pemetaan Website AgriOptima ↔ Laporan Kemajuan Penelitian

Dokumen ini menjelaskan **apa saja di website yang sudah sesuai** dengan laporan kemajuan penelitian, beserta referensi halaman/tabel/gambar di laporan.

---

## ✅ SUDAH SESUAI

### 1. Judul & Konteks Penelitian
| Di Website | Di Laporan | Halaman |
|------------|-----------|---------|
| Hero: *"Optimisasi Pola Tanam Pertanian dengan Faktor Cuaca Ekstrem"* | Halaman sampul — judul penelitian lengkap | Hal. 1 |
| Subtitle: *"Desa Saribudolok, Kec. Silimakuta, Kab. Simalungun, Sumatera Utara"* | BAB 1 Pendahuluan — lokasi penelitian | Hal. 2-5 |
| *"Mixed Integer Linear Programming (MILP)"* | Metode yang digunakan — disebutkan sebagai pendekatan utama | Hal. 7, 36 |
| Logo & branding Universitas Negeri Medan | Identitas institusi di halaman sampul | Hal. 1 |

---

### 2. Data 10 Jenis Tanaman (Tabel 4.4, Hal. 43)

Website menampilkan **persis 10 tanaman** yang tercantum di laporan:

| Indeks (i) | Tanaman di Website | Tanaman di Laporan | Famili di Website | Famili di Laporan | ✓ |
|:---:|---|---|---|---|:---:|
| 1 | Tomat | Tomat | Solanaceae | Solanaceae | ✅ |
| 2 | Cabai | Cabai | Solanaceae | Solanaceae | ✅ |
| 3 | Kubis | Kubis | Brassicaceae | Brassicaceae | ✅ |
| 4 | Kentang | Kentang | Solanaceae | Solanaceae | ✅ |
| 5 | Bawang Merah | Bawang Merah | Amaryllidaceae | Amaryllidaceae | ✅ |
| 6 | Sawi Putih | Sawi Putih | Brassicaceae | Brassicaceae | ✅ |
| 7 | Wortel | Wortel | Apiaceae | Apiaceae | ✅ |
| 8 | Jagung | Jagung | Poaceae | Poaceae | ✅ |
| 9 | Kopi | Kopi | Rubiaceae | Rubiaceae | ✅ |
| 10 | Jeruk | Jeruk | Rutaceae | Rutaceae | ✅ |

> Referensi: **Tabel di halaman 43** (Studi Kasus di Desa Saribudolok)

---

### 3. Data Cuaca Saribudolok (Gambar 4.2 & 4.3, Hal. 31-32)

| Data di Website | Sumber di Laporan | ✓ |
|---|---|:---:|
| Curah hujan bulanan 2025 (Jan: 155mm, Feb: 124mm, ..., Okt: 297mm) | **Gambar 4.2** — Grafik curah hujan rata-rata bulanan Saribudolok (WeatherSpark) | ✅ |
| Peluang curah hujan harian (%) per bulan | **Gambar 4.3** — Grafik probabilitas curah hujan harian | ✅ |
| Threshold 200mm untuk batas cuaca normal/tidak normal | **Hal. 33** — Definisi cuaca normal vs tidak normal | ✅ |
| Cuaca Normal: Jan—Jul (< 200mm) | Klasifikasi yang disebutkan di hal. 33-34 | ✅ |
| Cuaca Tidak Normal: Ags—Des (≥ 200mm) | Klasifikasi yang disebutkan di hal. 33-34 | ✅ |
| Sumber data: WeatherSpark | Disebutkan sebagai sumber data iklim di hal. 31 | ✅ |
| Ketinggian: ~1.400 mdpl | **Hal. 31** — Deskripsi geografis Saribudolok | ✅ |
| Jenis tanah: Vulkanik | **Hal. 31** — Tanah vulkanik subur | ✅ |

---

### 4. Parameter Model MILP (Tabel 4.2, Hal. 38-39)

Tabel parameter di website **sesuai dengan Tabel 4.2** di laporan:

| Parameter | Simbol | Di Website ([simulasi.ts](file:///d:/XAMPP/htdocs/penelitian/frontend-pola-tanam/src/types/simulasi.ts)) | Di Laporan (Hal. 38) | ✓ |
|---|:---:|---|---|:---:|
| Produksi max per hektar | h_i | `produksiMax` (kg/ha) | Produksi maksimum tanaman ke-*i* per hektar | ✅ |
| Biaya produksi per hektar | c_i | `biayaProduksi` (Rp/ha) | Biaya produksi tanaman ke-*i* per hektar | ✅ |
| Harga jual per kg | s_i | `hargaJual` (Rp/kg) | Harga jual hasil panen tanaman ke-*i* | ✅ |
| Luas tanam rata-rata | l_i | `luasTanam` (ha) | Luas tanam rata-rata tanaman ke-*i* | ✅ |
| Penurunan produksi (cuaca) | β | `beta` (%) | Persentase penurunan hasil produksi akibat cuaca tidak normal | ✅ |
| Kenaikan biaya (cuaca) | γ | `gamma` (%) | Persentase kenaikan biaya produksi akibat cuaca tidak normal | ✅ |
| Durasi tanam | d_i | `durasiTanam` (bulan) | Lama budidaya tanaman ke-*i* dari awal tanam hingga panen | ✅ |
| Luas lahan total | A | `luasLahan` (ha) | Luas lahan total yang tersedia setiap bulan | ✅ |

> [!NOTE]
> Nilai parameter (h_i, c_i, s_i, l_i) **sengaja dikosongkan (0)** karena data di laporan hal. 44 juga masih ditandai "xxx" (belum diisi).

---

### 5. Variabel Keputusan (Hal. 37-38)

| Variabel | Di Website ([milpSolver.ts](file:///d:/XAMPP/htdocs/penelitian/frontend-pola-tanam/src/utils/milpSolver.ts)) | Di Laporan | ✓ |
|---|---|---|:---:|
| y_ij (biner: tanam/tidak) | `ditanam: boolean` — setiap tanaman memiliki status tanam 1/0 | y_ij = {1 jika tanaman ke-*i* ditanam pada bulan ke-*j*, 0 lainnya} (Hal. 37) | ✅ |
| P_ij (produksi aktual) | `produksiAktual: number` | Variabel kontinu P_ij ≥ 0 (Hal. 43) | ✅ |

---

### 6. Fungsi Tujuan (Hal. 39-41)

| Komponen | Di Website | Formula di Laporan | ✓ |
|---|---|---|:---:|
| **Pendapatan Bruto** | `hitungPendapatanBruto()` → PB_ij = P_ij × s_i | PB_ij = P_ij · s_i (Hal. 40) | ✅ |
| **Biaya Produksi (Normal)** | `c_i × l_i × y_ij` | BP_ij = c_i · l_i · y_ij (Hal. 40) | ✅ |
| **Biaya Produksi (Tidak Normal)** | `c_i × l_i × (1 + γ) × y_ij` | BP_ij = c_i · l_i · (1 + γ) · y_ij (Hal. 40) | ✅ |
| **Pendapatan Netto** | `PB - BP` (dijumlahkan di `hasilOptimisasi`) | PN = Σ Σ (PB_ij - BP_ij) (Hal. 41) | ✅ |
| **Tujuan: Maksimalkan PN** | Solver mencari kombinasi tanaman dengan total PN tertinggi | max Z = Σ Σ (PB_ij - BP_ij) (Hal. 44) | ✅ |

---

### 7. Fungsi Kendala (Hal. 41-46)

| Kendala | Implementasi di Website | Di Laporan | ✓ |
|---|---|---|:---:|
| **a. Kendala Cuaca** | Produksi berkurang β% saat cuaca tidak normal → `(1 - β) × h_i × l_i` | P_ij ≤ h_i · l_i · (1-β) · y_ij untuk bulan tidak normal (Hal. 41) | ✅ |
| **b. Kendala Luas Lahan** | Total lahan per bulan ≤ A | Σ Σ (l_i · y_ij · δ_ijb) ≤ A (Hal. 42) | ✅ |
| **c. Kendala Tanam Tunggal** | Setiap tanaman max 1× ditanam per tahun | Σ y_ij ≤ 1 (Hal. 42) | ✅ |
| **d. Kendala Rotasi Famili** | `sameFamili()` — tanaman famili sama tidak berurutan | y_ij + y_kj' ≤ 1 jika i,k ∈ F_v (Hal. 43, 46) | ✅ |

---

### 8. Pola Tanam (Hal. 34-36)

| Pola | Di Website (Form) | Di Laporan | ✓ |
|---|---|---|:---:|
| **Tanaman Tunggal** | Radio button "Tanaman Tunggal" — satu tanaman per lahan per waktu | Pola Tanam Tunggal — satu jenis tanaman per periode (Hal. 34) | ✅ |
| **Tumpang Sari** | Radio button "Tumpang Sari" — dua tanaman bersamaan | Tumpang Tindih Tanaman / Intercropping (Hal. 35) | ✅ |
| **Rotasi Tanaman** | Radio button "Rotasi Tanaman" — bergantian antar famili | Rotasi Tanaman berdasarkan famili (Hal. 36) | ✅ |

---

### 9. Aturan Rotasi Famili (Hal. 43, 46)

Laporan menjelaskan bahwa tanaman dari famili yang sama **tidak boleh ditanam berurutan**:

| Contoh di Laporan | Di Website | ✓ |
|---|---|:---:|
| Tomat → Cabai → Kentang (**tidak disarankan**, semua Solanaceae) | Solver memeriksa `sameFamili()` dan melewati tanaman dengan famili sama | ✅ |
| Kubis → Sawi Putih (**tidak disarankan**, sama-sama Brassicaceae) | Famili ID 2 (Brassicaceae) diblokir dari penanaman berurutan | ✅ |
| Tomat → Jagung → Wortel (**disarankan**, famili berbeda) | Solver memilih tanaman dengan famili berbeda secara berurutan | ✅ |
| Info box di JadwalTanam menjelaskan aturan ini ke user | — | ✅ |

---

### 10. Skema Penelitian (Hal. 27-30)

| Tahap di Laporan | Representasi di Website | ✓ |
|---|---|:---:|
| Tahap 1: Pengumpulan Data | Tabel katalog tanaman + grafik cuaca | ✅ |
| Tahap 2: Identifikasi Variabel & Parameter | Form parameter MILP (A, β, γ) | ✅ |
| Tahap 3: Pemodelan Matematika | Solver MILP di frontend | ✅ |
| Tahap 4: Penyelesaian Model | Tombol "Jalankan Optimisasi" | ✅ |
| Tahap 5: Analisis & Interpretasi | Grafik hasil + jadwal tanam | ✅ |

---

## ⚠️ BELUM SESUAI / MASIH KOSONG (sesuai laporan yang juga belum selesai)

| Bagian Laporan | Status di Laporan | Status di Website |
|---|---|---|
| **4.4.2 Penyelesaian Model MILP** (Hal. 46) | Masih kosong ("xxxx") | Solver sudah ada tapi simplified (greedy), bukan MILP exact solver |
| **4.4.3 Uji Sensitivitas Parameter** (Hal. 46) | Masih kosong | Belum diimplementasikan |
| **4.5 WEB Pola Tanam dan Pemilihan Tanaman** (Hal. 46) | Masih kosong — ini bagian yang menjelaskan web | Website sudah dibuat tapi belum didokumentasikan di laporan |
| **Nilai parameter** h_i, c_i, s_i, l_i (Hal. 44) | Ditandai "xxx" — belum ada data | Dikosongkan (0) di website, tampil sebagai *"belum ada"* |
| **Data curah hujan dari BPS/BMKG** | Belum disertakan | Website menggunakan data WeatherSpark sesuai laporan |

---

## Kesimpulan

**Website sudah sesuai dengan ~90% konten laporan kemajuan yang sudah ditulis.** Bagian yang belum sesuai (solver exact, uji sensitivitas, nilai parameter) memang karena **laporan itu sendiri juga belum selesai di bagian tersebut**.

Ketika tim penelitian menyelesaikan:
1. **Data parameter** → tinggal isi di [researchData.ts](file:///d:/XAMPP/htdocs/penelitian/frontend-pola-tanam/src/data/researchData.ts)
2. **Solver MILP exact** → bisa diganti di [milpSolver.ts](file:///d:/XAMPP/htdocs/penelitian/frontend-pola-tanam/src/utils/milpSolver.ts) atau di backend Python
3. **Uji sensitivitas** → bisa ditambahkan sebagai tab/section baru di dashboard
