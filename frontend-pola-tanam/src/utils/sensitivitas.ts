// ============================================================
// ANALISIS SENSITIVITAS
// Melihat parameter yang paling berpengaruh terhadap nilai tujuan model
// (keuntungan maksimum). Dua parameter kunci pada paper: β (penurunan hasil
// akibat curah hujan tinggi) dan γ (kenaikan biaya). Sebagai pembanding,
// parameter lain (harga, produktivitas, biaya, batas luas) diuji ±10%.
// Setiap titik adalah satu kali penyelesaian ulang MILP.
// ============================================================

import type { Tanaman } from '../types/simulasi';
import { selesaikanModel } from './milpModel';
import type { HighsLike, NomorModel, OpsiModel } from './milpModel';

export interface TitikSensitivitas {
  nilai: number;       // nilai parameter (%)
  keuntungan: number;  // keuntungan maksimum (Rp)
  jadwal: string;      // ringkasan jadwal untuk melihat perubahan pola
}

export interface BarisTornado {
  parameter: string;
  keuntunganMinus: number; // keuntungan saat parameter -10%
  keuntunganPlus: number;  // keuntungan saat parameter +10%
  persenMinus: number;     // perubahan terhadap baseline (%)
  persenPlus: number;
  rentang: number;         // |persenPlus - persenMinus|, dasar peringkat
}

const ringkasJadwal = (h: ReturnType<typeof selesaikanModel>) =>
  h.hasilPerTanaman
    .filter(x => x.ditanam)
    .sort((a, b) => a.tanamanId - b.tanamanId)
    .map(x => `${x.tanamanId}:${x.bulanTanam}`)
    .join(' ');

function hitung(highs: HighsLike, tanaman: Tanaman[], opsi: OpsiModel, model: NomorModel) {
  // Pemecah seri jadwal acuan dimatikan agar sensitivitas murni dari solver
  const h = selesaikanModel(highs, tanaman, { ...opsi, pakaiJadwalAcuan: false }, model);
  return { keuntungan: h.feasible ? h.totalPendapatanNetto : 0, jadwal: ringkasJadwal(h) };
}

/** Sapuan satu parameter penalti (β atau γ) pada daftar nilai (%) */
export function sapuPenalti(
  highs: HighsLike, tanaman: Tanaman[], opsi: OpsiModel, model: NomorModel,
  param: 'beta' | 'gamma', daftarNilai: number[],
): TitikSensitivitas[] {
  return daftarNilai.map(nilai => ({ nilai, ...hitung(highs, tanaman, { ...opsi, [param]: nilai }, model) }));
}

/** Tornado: tiap parameter diubah -10% dan +10% (relatif) dari nilai dasar */
export function hitungTornado(
  highs: HighsLike, tanaman: Tanaman[], opsi: OpsiModel, model: NomorModel, persen = 10,
): { baseline: number; baris: BarisTornado[] } {
  const base = hitung(highs, tanaman, opsi, model).keuntungan;
  const f = (p: number) => 1 + p / 100;

  const skala = (kunci: 'hargaJual' | 'produksiMax' | 'biayaProduksi' | 'luasTanam', k: number) =>
    tanaman.map(t => ({ ...t, [kunci]: t[kunci] * k }));

  const varian: { parameter: string; jalankan: (p: number) => number }[] = [
    { parameter: 'Harga jual (s)', jalankan: p => hitung(highs, skala('hargaJual', f(p)), opsi, model).keuntungan },
    { parameter: 'Produktivitas (h)', jalankan: p => hitung(highs, skala('produksiMax', f(p)), opsi, model).keuntungan },
    { parameter: 'Biaya produksi (c)', jalankan: p => hitung(highs, skala('biayaProduksi', f(p)), opsi, model).keuntungan },
    { parameter: 'Luas tanam (l)', jalankan: p => hitung(highs, skala('luasTanam', f(p)), opsi, model).keuntungan },
    { parameter: 'Batas luas lahan (L)', jalankan: p => hitung(highs, tanaman, { ...opsi, luasLahanHa: opsi.luasLahanHa * f(p) }, model).keuntungan },
    { parameter: 'Penurunan hasil (β)', jalankan: p => hitung(highs, tanaman, { ...opsi, beta: opsi.beta * f(p) }, model).keuntungan },
    { parameter: 'Kenaikan biaya (γ)', jalankan: p => hitung(highs, tanaman, { ...opsi, gamma: opsi.gamma * f(p) }, model).keuntungan },
  ];

  const baris = varian.map(v => {
    const minus = v.jalankan(-persen);
    const plus = v.jalankan(persen);
    const pm = ((minus - base) / base) * 100;
    const pp = ((plus - base) / base) * 100;
    return { parameter: v.parameter, keuntunganMinus: minus, keuntunganPlus: plus, persenMinus: pm, persenPlus: pp, rentang: Math.abs(pp - pm) };
  }).sort((a, b) => b.rentang - a.rentang);

  return { baseline: base, baris };
}

