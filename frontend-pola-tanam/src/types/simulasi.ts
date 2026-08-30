// ============================================================
// TIPE DATA - Model MILP Pola Tanam Pertanian Desa Saribudolok
// ============================================================

/** Data jenis tanaman yang dibudidayakan di Desa Saribudolok */
export interface Tanaman {
  id: number;            // Indeks i (1-10)
  nama: string;          // Nama tanaman
  famili: string;        // Famili botani (untuk kendala rotasi)
  familiId: number;      // ID famili numerik
  durasiTanam: number;   // d_i: durasi tanam dalam bulan
  produksiMax: number;   // h_i: produksi max per hektar (kg/ha), 0 = belum ada data
  biayaProduksi: number; // c_i: biaya produksi per hektar (Rp/ha), 0 = belum ada data
  hargaJual: number;     // s_i: harga jual per kg (Rp/kg), 0 = belum ada data
  luasTanam: number;     // l_i: luas tanam rata-rata (ha), 0 = belum ada data
  warna: string;         // Warna untuk visualisasi chart
}

/** Data cuaca bulanan Saribudolok */
export interface DataCuacaBulanan {
  bulan: string;           // Nama bulan singkat
  bulanIndex: number;      // Index bulan (1-12)
  curahHujan: number;      // Rata-rata curah hujan (mm)
  peluangHujan: number;    // Peluang curah hujan harian (%)
  isNormal: boolean;       // true jika < 200mm (cuaca normal)
}

/** Parameter input simulasi model MILP */
export interface ParameterSimulasi {
  luasLahan: number;       // A: Total luas lahan tersedia (ha)
  beta: number;            // β: Persentase penurunan produksi akibat cuaca tidak normal (%)
  gamma: number;           // γ: Persentase kenaikan biaya akibat cuaca tidak normal (%)
  polaTanam: 'tunggal' | 'tumpangSari' | 'rotasi'; // Jenis pola tanam
}

/** Hasil optimisasi per tanaman */
export interface HasilPerTanaman {
  tanamanId: number;
  namaTanaman: string;
  bulanTanam: number;        // Bulan mulai tanam (1-12), 0 = tidak ditanam
  ditanam: boolean;          // y_ij = 1 atau 0
  produksiAktual: number;    // P_ij (kg)
  pendapatanBruto: number;   // PB_ij (Rp)
  biayaProduksiTotal: number;// BP_ij (Rp)
  pendapatanNetto: number;   // PB_ij - BP_ij (Rp)
  cuacaNormal: boolean;      // Apakah bulan tanam cuaca normal
}

/** Hasil simulasi keseluruhan (output solver) */
export interface HasilOptimisasi {
  totalPendapatanNetto: number;   // Total PN = max Z
  totalPendapatanBruto: number;
  totalBiayaProduksi: number;
  hasilPerTanaman: HasilPerTanaman[];
  jadwalTanam: JadwalTanamItem[];
  polaTanam: string;
  feasible: boolean;              // Apakah solusi ditemukan
}

/** Item jadwal tanam untuk timeline */
export interface JadwalTanamItem {
  id: number;
  bulanMulai: number;      // Bulan mulai (1-12)
  bulanSelesai: number;    // Bulan selesai (1-12)
  tanaman: string;
  tanamanId: number;
  fase: string;
  keterangan: string;
  cuacaNormal: boolean;
  warnaIkon: string;
  warnaBg: string;
}

// Legacy interface - tetap dipertahankan untuk kompatibilitas
export interface HasilSimulasi {
  pola: string;
  profit: number;
  air: number;
}