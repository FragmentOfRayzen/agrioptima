// ============================================================
// DATA PENELITIAN - Desa Saribudolok, Kab. Simalungun
// Sumber: Laporan Kemajuan Penelitian 2026 (Lasker P. Sinaga)
// ============================================================

import type { Tanaman, DataCuacaBulanan } from '../types/simulasi';

// -----------------------------------------------
// 10 JENIS TANAMAN DESA SARIBUDOLOK
// -----------------------------------------------
// Sumber: Tabel 4.9 (Nilai-Nilai Parameter dalam Model) pada draf paper terbaru
// dan kode ModelSatu.ipynb / ModelDua.ipynb.
// SATUAN: per HEKTAR (ha)
//   produksiMax   = h_i, kg per ha (kondisi normal)
//   biayaProduksi = c_i, Rp per ha (kondisi normal)
//   hargaJual     = s_i, Rp per kg
//   luasTanam     = l_i, luas tanam (ha) hasil observasi
// Tanaman tahunan (kopi, jeruk) memakai durasi 12 bulan (melingkar).
// Hanya Sawi Putih dan Kopi yang tahan hujan (tanpa penalti beta/gamma).

export const DAFTAR_TANAMAN: Tanaman[] = [
  {
    id: 1,  nama: 'Tomat',        famili: 'Solanaceae',      familiId: 1,
    durasiTanam: 6, produksiMax: 33338, biayaProduksi: 125000000, hargaJual: 5017, luasTanam: 48,
    tahanHujan: false,
    warna: '#ef4444' // merah
  },
  {
    id: 2,  nama: 'Cabai Merah',   famili: 'Solanaceae',      familiId: 1,
    durasiTanam: 6, produksiMax: 5000, biayaProduksi: 50000000, hargaJual: 15750, luasTanam: 68,
    tahanHujan: false,
    warna: '#f97316' // oranye
  },
  {
    id: 3,  nama: 'Kubis',         famili: 'Brassicaceae',    familiId: 2,
    durasiTanam: 5, produksiMax: 41839, biayaProduksi: 30000000, hargaJual: 1323, luasTanam: 124,
    tahanHujan: false,
    warna: '#22c55e' // hijau
  },
  {
    id: 4,  nama: 'Kentang',       famili: 'Solanaceae',      familiId: 1,
    durasiTanam: 5, produksiMax: 17176, biayaProduksi: 90000000, hargaJual: 7723, luasTanam: 43,
    tahanHujan: false,
    warna: '#a16207' // coklat
  },
  {
    id: 5,  nama: 'Bawang Merah',  famili: 'Amaryllidaceae',  familiId: 3,
    durasiTanam: 3, produksiMax: 6418, biayaProduksi: 50000000, hargaJual: 14400, luasTanam: 17,
    tahanHujan: false,
    warna: '#be185d' // pink
  },
  {
    id: 6,  nama: 'Sawi Putih',    famili: 'Brassicaceae',    familiId: 2,
    durasiTanam: 3, produksiMax: 30000, biayaProduksi: 10300000, hargaJual: 1307, luasTanam: 43,
    tahanHujan: true,
    warna: '#65a30d' // lime
  },
  {
    id: 7,  nama: 'Wortel',        famili: 'Apiaceae',        familiId: 4,
    durasiTanam: 4, produksiMax: 20410, biayaProduksi: 17070000, hargaJual: 8000, luasTanam: 43,
    tahanHujan: false,
    warna: '#ea580c' // oranye tua
  },
  {
    id: 8,  nama: 'Jagung',        famili: 'Poaceae',         familiId: 5,
    durasiTanam: 5, produksiMax: 6524, biayaProduksi: 15020000, hargaJual: 5300, luasTanam: 95,
    tahanHujan: false,
    warna: '#eab308' // kuning
  },
  {
    id: 9,  nama: 'Kopi',          famili: 'Rubiaceae',       familiId: 6,
    durasiTanam: 12, produksiMax: 1306, biayaProduksi: 38970000, hargaJual: 21000, luasTanam: 96,
    tahanHujan: true, tahunan: true,
    warna: '#78350f' // coklat tua
  },
  {
    id: 10, nama: 'Jeruk',         famili: 'Rutaceae',        familiId: 7,
    durasiTanam: 12, produksiMax: 19860, biayaProduksi: 16500000, hargaJual: 18000, luasTanam: 324,
    tahanHujan: false, tahunan: true,
    warna: '#f59e0b' // amber
  },
];

// -----------------------------------------------
// PASANGAN TUMPANG SARI YANG DIIZINKAN (Model 2, Tabel kendala tumpang sari)
// -----------------------------------------------
// Pasangan tetap sesuai tabel. Kopi dan Jeruk boleh berpasangan dengan
// tanaman semusim mana pun ("Jagung atau sayuran semusim"), sesuai ModelDua.ipynb.
// -----------------------------------------------
// JADWAL ACUAN PAPER (pemecah seri / tie-break)
// -----------------------------------------------
// Model MILP memiliki beberapa jadwal dengan keuntungan sama (optimal ganda).
// Agar jadwal di web sama dengan Tabel 4.10 (Model 1) dan Tabel 4.11 (Model 2),
// solver memberi bonus sangat kecil pada jadwal ini. Bonus TIDAK mengubah
// keuntungan maksimum; hanya memilih salah satu dari solusi yang sama optimalnya.
// Format: id tanaman -> bulan mulai tanam.
export const JADWAL_ACUAN: Record<1 | 2, Record<number, number>> = {
  // Hasil tim 5 Nov 2026 (aturan penalti masa tanam, α=30% biaya, β=15% hasil, lahan 750 ha)
  1: { 1: 1, 3: 2, 5: 5, 6: 9, 7: 4, 8: 3, 10: 6 },
  2: { 1: 2, 3: 3, 5: 2, 6: 10, 7: 1, 8: 3, 10: 5 },
};

export const PASANGAN_TUMPANG_SARI: [number, number][] = [
  [1, 2], [1, 5], [2, 3], [2, 6], [2, 5],
  [3, 8], [3, 5], [4, 5], [4, 8], [7, 5],
];

// -----------------------------------------------
// DATA CUACA SARIBUDOLOK 2025 (WeatherSpark)
// -----------------------------------------------
// Cuaca Normal: curah hujan < 200 mm (Jan-Jul)
// Cuaca Tidak Normal: curah hujan >= 200 mm (Ags-Des)
// Sumber: Gambar 4.2 & 4.3 Laporan Kemajuan

export const DATA_CUACA: DataCuacaBulanan[] = [
  { bulan: 'Jan', bulanIndex: 1,  curahHujan: 155, peluangHujan: 48, isNormal: true },
  { bulan: 'Feb', bulanIndex: 2,  curahHujan: 124, peluangHujan: 33, isNormal: true },
  { bulan: 'Mar', bulanIndex: 3,  curahHujan: 148, peluangHujan: 38, isNormal: true },
  { bulan: 'Apr', bulanIndex: 4,  curahHujan: 173, peluangHujan: 44, isNormal: true },
  { bulan: 'Mei', bulanIndex: 5,  curahHujan: 194, peluangHujan: 50, isNormal: true },
  { bulan: 'Jun', bulanIndex: 6,  curahHujan: 178, peluangHujan: 48, isNormal: true },
  { bulan: 'Jul', bulanIndex: 7,  curahHujan: 185, peluangHujan: 52, isNormal: true },
  { bulan: 'Ags', bulanIndex: 8,  curahHujan: 228, peluangHujan: 56, isNormal: false },
  { bulan: 'Sep', bulanIndex: 9,  curahHujan: 255, peluangHujan: 60, isNormal: false },
  { bulan: 'Okt', bulanIndex: 10, curahHujan: 297, peluangHujan: 66, isNormal: false },
  { bulan: 'Nov', bulanIndex: 11, curahHujan: 268, peluangHujan: 62, isNormal: false },
  { bulan: 'Des', bulanIndex: 12, curahHujan: 210, peluangHujan: 52, isNormal: false },
];

// Threshold cuaca normal (mm) - dari definisi dalam laporan
export const THRESHOLD_CUACA_NORMAL = 200;

// -----------------------------------------------
// NAMA-NAMA BULAN LENGKAP
// -----------------------------------------------
export const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// -----------------------------------------------
// ATURAN ROTASI FAMILI (Kendala d)
// -----------------------------------------------
// Tanaman dengan famili yang sama TIDAK boleh ditanam berurutan
// Contoh: Tomat → Cabai → Kentang (tidak disarankan, semua Solanaceae)
// Contoh: Tomat → Jagung → Wortel (disarankan, famili berbeda)
export const FAMILI_MAP: Record<number, string[]> = {
  1: ['Tomat', 'Cabai', 'Kentang'],       // Solanaceae
  2: ['Kubis', 'Sawi Putih'],              // Brassicaceae
  3: ['Bawang Merah'],                     // Amaryllidaceae
  4: ['Wortel'],                           // Apiaceae
  5: ['Jagung'],                           // Poaceae
  6: ['Kopi'],                             // Rubiaceae
  7: ['Jeruk'],                            // Rutaceae
};

// -----------------------------------------------
// INFO DESA SARIBUDOLOK
// -----------------------------------------------
export const INFO_DESA = {
  nama: 'Desa Saribudolok',
  kecamatan: 'Silimakuta',
  kabupaten: 'Simalungun',
  provinsi: 'Sumatera Utara',
  ketinggian: 1400, // mdpl
  jenisTanah: 'Tanah Vulkanik',
  topografi: 'Dataran Tinggi (datar, bergelombang, berbukit)',
  sektorUtama: 'Hortikultura & Lahan Kering',
  periodeTanam: 3, // 3 periode per tahun (bulan ke-4, ke-8, ke-12)
  upahHarian: 120000, // Rp per hari
  jamKerja: '09.00 - 17.00 WIB',
};
