// ============================================================
// SOLVER MILP SEDERHANA (Frontend)
// Optimisasi Pola Tanam - Desa Saribudolok
// ============================================================
// Catatan: Ini adalah solver demonstrasi untuk website.
// Solver production seharusnya menggunakan Python (PuLP/SciPy).
// Saat ini menggunakan greedy heuristic karena data parameter
// belum tersedia (ditandai 0 dalam researchData).
// ============================================================

import type { 
  ParameterSimulasi, 
  HasilOptimisasi, 
  HasilPerTanaman, 
  JadwalTanamItem, 
  Tanaman 
} from '../types/simulasi';
import { DAFTAR_TANAMAN, DATA_CUACA } from '../data/researchData';

// Warna untuk timeline
const WARNA_NORMAL = {
  ikon: 'bg-emerald-500',
  bg: 'bg-emerald-50'
};
const WARNA_TIDAK_NORMAL = {
  ikon: 'bg-amber-500',
  bg: 'bg-amber-50'
};
const WARNA_ISTIRAHAT = {
  ikon: 'bg-gray-400',
  bg: 'bg-gray-50'
};

/**
 * Cek apakah bulan ke-j memiliki cuaca normal
 */
function isCuacaNormal(bulan: number): boolean {
  const data = DATA_CUACA.find(d => d.bulanIndex === bulan);
  return data ? data.isNormal : true;
}

/**
 * Cek apakah dua tanaman berasal dari famili yang sama
 */
function sameFamili(t1: Tanaman, t2: Tanaman): boolean {
  return t1.familiId === t2.familiId;
}

/**
 * Hitung pendapatan bruto: PB_ij = P_ij × s_i
 */
function hitungPendapatanBruto(tanaman: Tanaman, bulanMulai: number, beta: number): number {
  const cuacaNormal = isCuacaNormal(bulanMulai);
  const produksi = cuacaNormal 
    ? tanaman.produksiMax * tanaman.luasTanam
    : tanaman.produksiMax * tanaman.luasTanam * (1 - beta / 100);
  return produksi * tanaman.hargaJual;
}

/**
 * Hitung biaya produksi: BP_ij = c_i × l_i × (1 + γ) jika cuaca tidak normal
 */
function hitungBiayaProduksi(tanaman: Tanaman, bulanMulai: number, gamma: number): number {
  const cuacaNormal = isCuacaNormal(bulanMulai);
  return cuacaNormal
    ? tanaman.biayaProduksi * tanaman.luasTanam
    : tanaman.biayaProduksi * tanaman.luasTanam * (1 + gamma / 100);
}

/**
 * Solver utama - Greedy Heuristic untuk demonstrasi.
 * Karena data parameter masih 0, solver akan memberikan
 * jadwal tanam berdasarkan durasi dan kendala famili saja.
 */
export function jalankanOptimisasi(params: ParameterSimulasi): HasilOptimisasi {
  const { luasLahan, beta, gamma, polaTanam } = params;
  
  // Filter tanaman yang bisa digunakan (exclude tanaman tahunan untuk mode bukan rotasi)
  const tanamanTersedia = polaTanam === 'tunggal' 
    ? DAFTAR_TANAMAN.filter(t => t.durasiTanam <= 6)
    : DAFTAR_TANAMAN.filter(t => t.durasiTanam <= 6); // tanaman musiman saja

  // Track bulan yang sudah terisi
  const jadwalBulan: (Tanaman | null)[] = new Array(12).fill(null);
  const hasilPerTanaman: HasilPerTanaman[] = [];
  const tanamanDitanam: Tanaman[] = [];

  if (polaTanam === 'tunggal') {
    // Mode Tanaman Tunggal: satu tanaman per lahan per waktu
    // Greedy: coba isi dari bulan 1, pilih tanaman yang cocok
    let bulanSekarang = 0; // 0-indexed
    
    for (const tanaman of tanamanTersedia) {
      if (bulanSekarang >= 12) break;
      if (bulanSekarang + tanaman.durasiTanam > 12) continue;
      
      // Cek kendala famili (tidak berurutan dengan tanaman sebelumnya)
      const tanamanSebelumnya = tanamanDitanam[tanamanDitanam.length - 1];
      if (tanamanSebelumnya && sameFamili(tanaman, tanamanSebelumnya)) continue;

      // Tanam tanaman ini
      for (let b = bulanSekarang; b < bulanSekarang + tanaman.durasiTanam && b < 12; b++) {
        jadwalBulan[b] = tanaman;
      }
      
      const bulanTanam = bulanSekarang + 1; // 1-indexed
      const pb = hitungPendapatanBruto(tanaman, bulanTanam, beta);
      const bp = hitungBiayaProduksi(tanaman, bulanTanam, gamma);
      
      hasilPerTanaman.push({
        tanamanId: tanaman.id,
        namaTanaman: tanaman.nama,
        bulanTanam,
        ditanam: true,
        produksiAktual: tanaman.produksiMax * (tanaman.luasTanam || luasLahan),
        pendapatanBruto: pb,
        biayaProduksiTotal: bp,
        pendapatanNetto: pb - bp,
        cuacaNormal: isCuacaNormal(bulanTanam),
      });
      
      tanamanDitanam.push(tanaman);
      bulanSekarang += tanaman.durasiTanam;
    }
  } else if (polaTanam === 'tumpangSari') {
    // Tumpang sari: dua tanaman bersamaan pada lahan yang sama
    // Contoh yang umum di Saribudolok: Cabai + Jagung, Cabai + Padi
    const pasanganUmum = [
      [1, 8], // Tomat + Jagung (famili berbeda)
      [2, 7], // Cabai + Wortel (famili berbeda)
      [3, 5], // Kubis + Bawang Merah (famili berbeda)
    ];

    let bulanSekarang = 0;
    for (const [id1, id2] of pasanganUmum) {
      if (bulanSekarang >= 12) break;
      const t1 = DAFTAR_TANAMAN.find(t => t.id === id1)!;
      const t2 = DAFTAR_TANAMAN.find(t => t.id === id2)!;
      const durasi = Math.max(t1.durasiTanam, t2.durasiTanam);
      
      if (bulanSekarang + durasi > 12) continue;

      for (let b = bulanSekarang; b < bulanSekarang + durasi && b < 12; b++) {
        jadwalBulan[b] = t1; // primary crop
      }

      const bulanTanam = bulanSekarang + 1;
      for (const t of [t1, t2]) {
        const pb = hitungPendapatanBruto(t, bulanTanam, beta);
        const bp = hitungBiayaProduksi(t, bulanTanam, gamma);
        hasilPerTanaman.push({
          tanamanId: t.id,
          namaTanaman: t.nama,
          bulanTanam,
          ditanam: true,
          produksiAktual: t.produksiMax * (t.luasTanam || luasLahan / 2),
          pendapatanBruto: pb,
          biayaProduksiTotal: bp,
          pendapatanNetto: pb - bp,
          cuacaNormal: isCuacaNormal(bulanTanam),
        });
        tanamanDitanam.push(t);
      }
      
      bulanSekarang += durasi;
    }
  } else {
    // Rotasi: tanaman bergantian dengan memperhatikan famili
    // Prioritaskan tanaman dengan durasi pendek agar bisa lebih banyak rotasi
    const sortedByDurasi = [...tanamanTersedia].sort((a, b) => a.durasiTanam - b.durasiTanam);
    let bulanSekarang = 0;
    
    for (const tanaman of sortedByDurasi) {
      if (bulanSekarang >= 12) break;
      if (bulanSekarang + tanaman.durasiTanam > 12) continue;
      
      // Kendala famili
      const prev = tanamanDitanam[tanamanDitanam.length - 1];
      if (prev && sameFamili(tanaman, prev)) continue;

      // Kendala: satu kali tanam per tahun per jenis
      if (tanamanDitanam.some(t => t.id === tanaman.id)) continue;

      for (let b = bulanSekarang; b < bulanSekarang + tanaman.durasiTanam && b < 12; b++) {
        jadwalBulan[b] = tanaman;
      }
      
      const bulanTanam = bulanSekarang + 1;
      const pb = hitungPendapatanBruto(tanaman, bulanTanam, beta);
      const bp = hitungBiayaProduksi(tanaman, bulanTanam, gamma);
      
      hasilPerTanaman.push({
        tanamanId: tanaman.id,
        namaTanaman: tanaman.nama,
        bulanTanam,
        ditanam: true,
        produksiAktual: tanaman.produksiMax * (tanaman.luasTanam || luasLahan),
        pendapatanBruto: pb,
        biayaProduksiTotal: bp,
        pendapatanNetto: pb - bp,
        cuacaNormal: isCuacaNormal(bulanTanam),
      });
      
      tanamanDitanam.push(tanaman);
      bulanSekarang += tanaman.durasiTanam;
    }
  }

  // Tambah tanaman yang tidak ditanam ke hasil
  for (const t of DAFTAR_TANAMAN) {
    if (!hasilPerTanaman.some(h => h.tanamanId === t.id)) {
      hasilPerTanaman.push({
        tanamanId: t.id,
        namaTanaman: t.nama,
        bulanTanam: 0,
        ditanam: false,
        produksiAktual: 0,
        pendapatanBruto: 0,
        biayaProduksiTotal: 0,
        pendapatanNetto: 0,
        cuacaNormal: true,
      });
    }
  }

  // Bangun jadwal tanam timeline
  const jadwalTanam = bangunJadwalTimeline(tanamanDitanam, jadwalBulan);

  // Hitung total
  const totalPB = hasilPerTanaman.reduce((sum, h) => sum + h.pendapatanBruto, 0);
  const totalBP = hasilPerTanaman.reduce((sum, h) => sum + h.biayaProduksiTotal, 0);

  return {
    totalPendapatanNetto: totalPB - totalBP,
    totalPendapatanBruto: totalPB,
    totalBiayaProduksi: totalBP,
    hasilPerTanaman,
    jadwalTanam,
    polaTanam: polaTanam === 'tunggal' ? 'Tanaman Tunggal' 
             : polaTanam === 'tumpangSari' ? 'Tumpang Sari' 
             : 'Rotasi Tanaman',
    feasible: tanamanDitanam.length > 0,
  };
}

/**
 * Bangun jadwal timeline dari hasil solver
 */
function bangunJadwalTimeline(
  _tanamanDitanam: Tanaman[], 
  jadwalBulan: (Tanaman | null)[]
): JadwalTanamItem[] {
  const items: JadwalTanamItem[] = [];
  let currentTanaman: Tanaman | null = null;
  let startBulan = 0;
  
  for (let b = 0; b < 12; b++) {
    const tanaman = jadwalBulan[b];
    
    if (tanaman !== currentTanaman) {
      // Simpan segment sebelumnya
      if (currentTanaman) {
        const bulanMulai = startBulan + 1;
        const bulanSelesai = b;
        const normal = isCuacaNormal(bulanMulai);
        items.push({
          id: items.length + 1,
          bulanMulai,
          bulanSelesai,
          tanaman: currentTanaman.nama,
          tanamanId: currentTanaman.id,
          fase: normal ? 'Cuaca Normal' : 'Cuaca Tidak Normal (Hujan Tinggi)',
          keterangan: `${currentTanaman.nama} (${currentTanaman.famili}) ditanam selama ${bulanSelesai - bulanMulai + 1} bulan. ${
            normal 
              ? 'Kondisi cuaca mendukung, biaya operasional standar.' 
              : 'Curah hujan tinggi (≥200mm), risiko penurunan produksi dan kenaikan biaya.'
          }`,
          cuacaNormal: normal,
          warnaIkon: normal ? WARNA_NORMAL.ikon : WARNA_TIDAK_NORMAL.ikon,
          warnaBg: normal ? WARNA_NORMAL.bg : WARNA_TIDAK_NORMAL.bg,
        });
      } else if (b > 0 && startBulan < b) {
        // Ada gap (lahan istirahat)
        items.push({
          id: items.length + 1,
          bulanMulai: startBulan + 1,
          bulanSelesai: b,
          tanaman: 'Istirahat Lahan',
          tanamanId: 0,
          fase: 'Fase Pemulihan (Bera)',
          keterangan: 'Sanitasi lahan dan pengolahan tanah untuk persiapan tanam berikutnya.',
          cuacaNormal: true,
          warnaIkon: WARNA_ISTIRAHAT.ikon,
          warnaBg: WARNA_ISTIRAHAT.bg,
        });
      }
      
      currentTanaman = tanaman;
      startBulan = b;
    }
  }
  
  // Simpan segment terakhir
  if (currentTanaman) {
    const bulanMulai = startBulan + 1;
    const normal = isCuacaNormal(bulanMulai);
    items.push({
      id: items.length + 1,
      bulanMulai,
      bulanSelesai: 12,
      tanaman: currentTanaman.nama,
      tanamanId: currentTanaman.id,
      fase: normal ? 'Cuaca Normal' : 'Cuaca Tidak Normal (Hujan Tinggi)',
      keterangan: `${currentTanaman.nama} (${currentTanaman.famili}) ditanam hingga akhir tahun. ${
        normal
          ? 'Kondisi cuaca mendukung.'
          : 'Curah hujan tinggi, perlu perhatian ekstra.'
      }`,
      cuacaNormal: normal,
      warnaIkon: normal ? WARNA_NORMAL.ikon : WARNA_TIDAK_NORMAL.ikon,
      warnaBg: normal ? WARNA_NORMAL.bg : WARNA_TIDAK_NORMAL.bg,
    });
  }
  
  // Isi gap di akhir jika ada
  const lastItem = items[items.length - 1];
  if (lastItem && lastItem.bulanSelesai < 12) {
    items.push({
      id: items.length + 1,
      bulanMulai: lastItem.bulanSelesai + 1,
      bulanSelesai: 12,
      tanaman: 'Istirahat Lahan',
      tanamanId: 0,
      fase: 'Fase Pemulihan (Bera)',
      keterangan: 'Persiapan lahan untuk siklus tanam tahun berikutnya.',
      cuacaNormal: true,
      warnaIkon: WARNA_ISTIRAHAT.ikon,
      warnaBg: WARNA_ISTIRAHAT.bg,
    });
  }

  return items;
}

/**
 * Format angka rupiah
 */
export function formatRupiah(angka: number): string {
  if (angka === 0) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
}

/**
 * Format angka ke jutaan
 */
export function formatJutaan(angka: number): string {
  if (angka === 0) return '0';
  const juta = angka / 1_000_000;
  return juta.toFixed(1);
}
