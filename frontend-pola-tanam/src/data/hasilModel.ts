// ============================================================
// PEMBANGUN HASIL MODEL OPTIMISASI
// Mengubah keputusan solver (tanaman i mulai tanam di bulan j) menjadi
// struktur HasilOptimisasi yang dipakai komponen tampilan.
// Aturan penalti (versi perbaikan tim, 4-5 Nov 2026): penalti β (hasil turun) dan
// γ (biaya naik) berlaku jika SEBAGIAN MASA TANAM jatuh pada bulan curah hujan
// tidak normal (Agustus-Desember) dan tanaman tidak tahan hujan.
// ============================================================

import type { HasilOptimisasi, HasilPerTanaman, JadwalTanamItem, Tanaman } from '../types/simulasi';
import { DAFTAR_TANAMAN, DATA_CUACA } from './researchData';

/** Satu baris keputusan model: tanaman mulai ditanam pada bulan tertentu */
export interface KeputusanTanam {
  tanamanId: number;
  bulanTanam: number; // 1-12
}

/** Nilai asumsi paper: hasil turun 15%, biaya naik 30% */
export const BETA_MODEL = 15;   // %
export const GAMMA_MODEL = 30;  // %

/** Bulan-bulan (1-12, melingkar) yang ditempati satu tanaman */
export function masaTanam(bulanTanam: number, durasi: number): number[] {
  return Array.from({ length: durasi }, (_, o) => ((bulanTanam + o - 1) % 12) + 1);
}

/** Apakah penalti hujan berlaku: masa tanam beririsan dengan bulan tidak normal dan tanaman tidak tahan hujan */
export function terkenaHujan(tanaman: Tanaman, bulanMulai: number): boolean {
  if (tanaman.tahanHujan) return false;
  return masaTanam(bulanMulai, tanaman.durasiTanam).some(b => DATA_CUACA[b - 1] && !DATA_CUACA[b - 1].isNormal);
}

/** Ubah daftar keputusan menjadi HasilOptimisasi yang dipakai komponen web */
export function bangunHasilDariKeputusan(
  keputusan: KeputusanTanam[],
  polaTanam: string,
  beta = BETA_MODEL,
  gamma = GAMMA_MODEL,
  daftarTanaman: Tanaman[] = DAFTAR_TANAMAN,
): HasilOptimisasi {
  const hasilPerTanaman: HasilPerTanaman[] = [];
  const jadwalTanam: JadwalTanamItem[] = [];

  for (const k of keputusan) {
    const t = daftarTanaman.find(x => x.id === k.tanamanId);
    if (!t) continue;

    const hujan = terkenaHujan(t, k.bulanTanam);

    const produksi = t.produksiMax * (hujan ? 1 - beta / 100 : 1) * t.luasTanam;
    const pb = produksi * t.hargaJual;
    const bp = t.biayaProduksi * (hujan ? 1 + gamma / 100 : 1) * t.luasTanam;

    // Tanaman lain yang mulai tanam pada bulan yang sama (tumpang sari)
    const pasangan = keputusan
      .filter(o => o.tanamanId !== k.tanamanId && o.bulanTanam === k.bulanTanam)
      .map(o => daftarTanaman.find(x => x.id === o.tanamanId)?.nama)
      .filter((n): n is string => !!n);

    hasilPerTanaman.push({
      tanamanId: t.id,
      namaTanaman: t.nama,
      bulanTanam: k.bulanTanam,
      ditanam: true,
      produksiAktual: produksi,
      pendapatanBruto: pb,
      biayaProduksiTotal: bp,
      pendapatanNetto: pb - bp,
      cuacaNormal: !hujan,
      luasTanam: t.luasTanam,
      bulanPanen: masaTanam(k.bulanTanam, t.durasiTanam).slice(-1)[0],
      pasangan,
    });

    // Pecah menjadi dua segmen bila masa tanam melewati Desember
    const akhir = k.bulanTanam + t.durasiTanam - 1;
    const segmen: [number, number][] =
      akhir > 12 ? [[k.bulanTanam, 12], [1, akhir - 12]] : [[k.bulanTanam, akhir]];

    const ketPasangan = pasangan.length ? ` Ditumpangsarikan dengan ${pasangan.join(', ')}.` : '';

    segmen.forEach(([mulai, selesai], idx) => {
      jadwalTanam.push({
        id: jadwalTanam.length + 1,
        bulanMulai: mulai,
        bulanSelesai: selesai,
        tanaman: t.nama,
        tanamanId: t.id,
        fase: hujan ? 'Cuaca Tidak Normal (Hujan Tinggi)' : 'Cuaca Normal',
        keterangan: t.tahunan
          ? `${t.nama} (${t.famili}) adalah tanaman tahunan, menempati lahan 12 bulan sejak bulan ke-${k.bulanTanam}.${ketPasangan}`
          : `${t.nama} (${t.famili}) ditanam bulan ke-${k.bulanTanam}, panen bulan ke-${((k.bulanTanam + t.durasiTanam - 2) % 12) + 1}` +
            (idx === 1 ? ' (lanjutan ke tahun berikutnya).' : '.') + ketPasangan,
        cuacaNormal: !hujan,
        warnaIkon: hujan ? 'bg-amber-500' : 'bg-emerald-500',
        warnaBg: hujan ? 'bg-amber-50' : 'bg-emerald-50',
      });
    });
  }

  // Urutkan berdasarkan bulan mulai agar timeline berurutan
  jadwalTanam.sort((a, b) => a.bulanMulai - b.bulanMulai);
  jadwalTanam.forEach((j, i) => { j.id = i + 1; });

  const totalPB = hasilPerTanaman.reduce((s, h) => s + h.pendapatanBruto, 0);
  const totalBP = hasilPerTanaman.reduce((s, h) => s + h.biayaProduksiTotal, 0);
  const totalLuas = hasilPerTanaman.reduce((s, h) => s + (h.luasTanam ?? 0), 0);

  return {
    totalPendapatanNetto: totalPB - totalBP,
    totalPendapatanBruto: totalPB,
    totalBiayaProduksi: totalBP,
    totalLuasTanam: totalLuas,
    hasilPerTanaman,
    jadwalTanam,
    polaTanam,
    feasible: hasilPerTanaman.length > 0,
  };
}
