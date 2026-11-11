// ============================================================
// TIPE DATA - Model MILP Pola Tanam Pertanian Desa Saribudolok
// ============================================================

/** Data jenis tanaman yang dibudidayakan di Desa Saribudolok */
export interface Tanaman {
  id: number;            // Indeks i (1-10)
  nama: string;          // Nama tanaman
  famili: string;        // Famili botani (untuk kendala rotasi)
  familiId: number;      // ID famili numerik
  durasiTanam: number;   // d_i: durasi tanam dalam bulan (tanaman tahunan = 12)
  produksiMax: number;   // h_i: produktivitas normal (kg/ha)
  biayaProduksi: number; // c_i: biaya produksi normal (Rp/ha)
  hargaJual: number;     // s_i: harga jual per kg (Rp/kg)
  luasTanam: number;     // l_i: luas tanam hasil observasi (ha)
  warna: string;         // Warna untuk visualisasi chart
  tahanHujan?: boolean;  // true jika tahan curah hujan > 200 mm (tanpa penalti β dan γ)
  tahunan?: boolean;     // true untuk tanaman tahunan (kopi, jeruk)
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
  luasLahan: number;       // L: batas total luas tanam (ha)
  beta: number;            // β: Persentase penurunan produksi akibat cuaca tidak normal (%)
  gamma: number;           // γ: Persentase kenaikan biaya akibat cuaca tidak normal (%)
  polaTanam: 'tunggalRotasi' | 'tumpangSariRotasi'; // Model 1: tunggal + rotasi, Model 2: tumpang sari + rotasi
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
  luasTanam?: number;        // l_i (ha)
  bulanPanen?: number;       // bulan terakhir masa tanam (1-12)
  pasangan?: string[];       // tanaman yang mulai di bulan yang sama (tumpang sari)
}

/** Hasil simulasi keseluruhan (output solver) */
export interface HasilOptimisasi {
  totalPendapatanNetto: number;   // Total PN = max Z
  totalPendapatanBruto: number;
  totalBiayaProduksi: number;
  totalLuasTanam?: number;        // total luas tanam terpilih (ha)
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