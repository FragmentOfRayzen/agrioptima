// ============================================================
// DATA PENELITIAN - Desa Saribudolok, Kab. Simalungun
// Sumber: Laporan Kemajuan Penelitian 2026 (Lasker P. Sinaga)
// ============================================================

import type { Tanaman, DataCuacaBulanan } from '../types/simulasi';

// -----------------------------------------------
// 10 JENIS TANAMAN DESA SARIBUDOLOK (Tabel 4.4)
// -----------------------------------------------
// Catatan: Nilai parameter (h_i, c_i, s_i, l_i) masih kosong (0)
// karena data lapangan belum tersedia dalam laporan kemajuan.
// Akan diisi setelah data dari survei lapangan diperoleh.

export const DAFTAR_TANAMAN: Tanaman[] = [
  {
    id: 1,  nama: 'Tomat',        famili: 'Solanaceae',      familiId: 1,
    durasiTanam: 4, produksiMax: 0, biayaProduksi: 0, hargaJual: 0, luasTanam: 0,
    warna: '#ef4444' // merah
  },
  {
    id: 2,  nama: 'Cabai',         famili: 'Solanaceae',      familiId: 1,
    durasiTanam: 5, produksiMax: 0, biayaProduksi: 0, hargaJual: 0, luasTanam: 0,
    warna: '#f97316' // oranye
  },
  {
    id: 3,  nama: 'Kubis',         famili: 'Brassicaceae',    familiId: 2,
    durasiTanam: 3, produksiMax: 0, biayaProduksi: 0, hargaJual: 0, luasTanam: 0,
    warna: '#22c55e' // hijau
  },
  {
    id: 4,  nama: 'Kentang',       famili: 'Solanaceae',      familiId: 1,
    durasiTanam: 4, produksiMax: 0, biayaProduksi: 0, hargaJual: 0, luasTanam: 0,
    warna: '#a16207' // coklat
  },
  {
    id: 5,  nama: 'Bawang Merah',  famili: 'Amaryllidaceae',  familiId: 3,
    durasiTanam: 3, produksiMax: 0, biayaProduksi: 0, hargaJual: 0, luasTanam: 0,
    warna: '#be185d' // pink
  },
  {
    id: 6,  nama: 'Sawi Putih',    famili: 'Brassicaceae',    familiId: 2,
    durasiTanam: 2, produksiMax: 0, biayaProduksi: 0, hargaJual: 0, luasTanam: 0,
    warna: '#65a30d' // lime
  },
  {
    id: 7,  nama: 'Wortel',        famili: 'Apiaceae',        familiId: 4,
    durasiTanam: 3, produksiMax: 0, biayaProduksi: 0, hargaJual: 0, luasTanam: 0,
    warna: '#ea580c' // oranye tua
  },
  {
    id: 8,  nama: 'Jagung',        famili: 'Poaceae',         familiId: 5,
    durasiTanam: 4, produksiMax: 0, biayaProduksi: 0, hargaJual: 0, luasTanam: 0,
    warna: '#eab308' // kuning
  },
  {
    id: 9,  nama: 'Kopi',          famili: 'Rubiaceae',       familiId: 6,
    durasiTanam: 12, produksiMax: 0, biayaProduksi: 0, hargaJual: 0, luasTanam: 0,
    warna: '#78350f' // coklat tua
  },
  {
    id: 10, nama: 'Jeruk',         famili: 'Rutaceae',        familiId: 7,
    durasiTanam: 12, produksiMax: 0, biayaProduksi: 0, hargaJual: 0, luasTanam: 0,
    warna: '#f59e0b' // amber
  },
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
