// ============================================================
// MODEL MILP POLA TANAM (Model 1 dan Model 2)
// Mengikuti ModelSatu.ipynb dan ModelDua.ipynb (PuLP/CBC), dijalankan
// di browser dengan solver HiGHS (WebAssembly), tanpa server.
// ============================================================
// Variabel keputusan: y[i,j] biner = 1 jika tanaman i mulai ditanam di bulan j.
// Variabel produksi P[i,j] pada notebook disubstitusi (P = h_i(1-pen)*l_i*y),
// hasilnya setara di titik optimum.
//
// Fungsi tujuan (sama untuk kedua model):
//   max sum_ij ( h_i(1-β_ij)*l_i*s_i - c_i(1+γ_ij)*l_i ) * y[i,j]
//   penalti β/γ berlaku bila masa tanam (mulai j, sepanjang d_i bulan, melingkar)
//   memuat bulan hujan tidak normal (Agu-Des) dan tanaman tidak tahan hujan.
//
// Kendala bersama:
//   (a) total luas tanam seluruh tanaman terpilih <= L (kumulatif)
//   (b) tiap tanaman maksimal 1 kali tanam per tahun
//   (c) rotasi famili: tanaman satu famili tidak boleh memiliki masa tanam
//       yang beririsan (masa tanam melingkar, termasuk bulan mulai yang sama)
// Kendala pembeda:
//   Model 1 (tunggal)    : maksimal 1 tanaman mulai tanam per bulan
//   Model 2 (tumpang sari): maksimal 2 tanaman mulai per bulan, dan dua
//                           tanaman hanya boleh bersama bila termasuk pasangan diizinkan
// Kopi/Jeruk (tahunan) boleh mulai di bulan mana pun, sama seperti notebook,
// dan ikut dihitung pada batas jumlah tanaman per bulan.
// ============================================================

import type { HasilOptimisasi, Tanaman } from '../types/simulasi';
import { bangunHasilDariKeputusan, masaTanam, terkenaHujan } from '../data/hasilModel';
import type { KeputusanTanam } from '../data/hasilModel';
import { PASANGAN_TUMPANG_SARI, JADWAL_ACUAN } from '../data/researchData';

export type NomorModel = 1 | 2;

/** Bagian minimal dari objek HiGHS yang dipakai di sini (agar mudah diuji) */
export interface HighsLike {
  solve(problem: string, options?: Record<string, unknown>): {
    Status: string;
    Columns: Record<string, { Primal: number }>;
  };
}

export interface OpsiModel {
  beta: number;        // %
  gamma: number;       // %
  luasLahanHa: number; // batas total luas tanam (ha)
  pakaiJadwalAcuan?: boolean; // default true: pemecah seri mengikuti jadwal paper
}

/** Bonus (Rp) per tanaman pada jadwal acuan; hanya memecah seri antar solusi optimal ganda */
const BONUS_ACUAN = 10000;

const BULAN = Array.from({ length: 12 }, (_, i) => i + 1);

function suku(koef: number, nama: string): string {
  return `${koef < 0 ? '-' : '+'} ${Math.abs(koef)} ${nama}`;
}

function gabung(daftar: string[], perBaris = 8): string {
  const baris: string[] = [];
  for (let i = 0; i < daftar.length; i += perBaris) {
    baris.push(daftar.slice(i, i + perBaris).join(' '));
  }
  return baris.join('\n   ');
}

/** Himpunan pasangan tumpang sari yang diizinkan (kunci "idKecil-idBesar") */
export function pasanganDiizinkan(daftarTanaman: Tanaman[]): Set<string> {
  const kunci = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
  const hasil = new Set<string>();
  for (const [a, b] of PASANGAN_TUMPANG_SARI) hasil.add(kunci(a, b));
  const semusim = daftarTanaman.filter(t => !t.tahunan);
  for (const pohon of daftarTanaman.filter(t => t.tahunan)) {
    for (const t of semusim) hasil.add(kunci(pohon.id, t.id));
  }
  return hasil;
}

/** Susun model dalam format CPLEX LP */
export function susunLP(daftarTanaman: Tanaman[], opsi: OpsiModel, model: NomorModel): string {
  const { beta, gamma, luasLahanHa } = opsi;
  const nama = (id: number, j: number) => `y_${id}_${j}`;

  // ---- Fungsi tujuan
  const sukuTujuan: string[] = [];
  for (const t of daftarTanaman) {
    for (const j of BULAN) {
      const hujan = terkenaHujan(t, j);
      const prod = t.produksiMax * (hujan ? 1 - beta / 100 : 1) * t.luasTanam;
      const biaya = t.biayaProduksi * (hujan ? 1 + gamma / 100 : 1) * t.luasTanam;
      // Bonus pemecah seri untuk jadwal acuan paper (jauh lebih kecil dari selisih keuntungan nyata)
      const bonus = opsi.pakaiJadwalAcuan !== false && JADWAL_ACUAN[model][t.id] === j ? BONUS_ACUAN : 0;
      sukuTujuan.push(suku(prod * t.hargaJual - biaya + bonus, nama(t.id, j)));
    }
  }

  const kendala: string[] = [];

  // ---- (a) Total luas tanam kumulatif
  const sLuas: string[] = [];
  for (const t of daftarTanaman) for (const j of BULAN) sLuas.push(suku(t.luasTanam, nama(t.id, j)));
  kendala.push(` luas_total: ${gabung(sLuas)} <= ${luasLahanHa}`);

  // ---- (b) Satu kali tanam per tahun per tanaman
  for (const t of daftarTanaman) {
    kendala.push(` sekali_${t.id}: ${gabung(BULAN.map(j => suku(1, nama(t.id, j))))} <= 1`);
  }

  // ---- Kendala pembeda Model 1 / Model 2
  if (model === 1) {
    for (const j of BULAN) {
      kendala.push(` mulai_${j}: ${gabung(daftarTanaman.map(t => suku(1, nama(t.id, j))))} <= 1`);
    }
  } else {
    const boleh = pasanganDiizinkan(daftarTanaman);
    for (const j of BULAN) {
      kendala.push(` mulai_${j}: ${gabung(daftarTanaman.map(t => suku(1, nama(t.id, j))))} <= 2`);
      for (let a = 0; a < daftarTanaman.length; a++) {
        for (let b = a + 1; b < daftarTanaman.length; b++) {
          const ta = daftarTanaman[a], tb = daftarTanaman[b];
          const k = ta.id < tb.id ? `${ta.id}-${tb.id}` : `${tb.id}-${ta.id}`;
          if (!boleh.has(k)) {
            kendala.push(` bukan_pasangan_${ta.id}_${tb.id}_${j}: ${suku(1, nama(ta.id, j))} ${suku(1, nama(tb.id, j))} <= 1`);
          }
        }
      }
    }
  }

  // ---- (c) Rotasi famili: masa tanam tidak boleh beririsan
  for (let a = 0; a < daftarTanaman.length; a++) {
    for (let b = a + 1; b < daftarTanaman.length; b++) {
      const ti = daftarTanaman[a], tk = daftarTanaman[b];
      if (ti.familiId !== tk.familiId) continue;
      for (const j of BULAN) {
        const masaI = new Set(masaTanam(j, ti.durasiTanam));
        for (const j2 of BULAN) {
          if (masaTanam(j2, tk.durasiTanam).some(m => masaI.has(m))) {
            kendala.push(` rot_${ti.id}_${tk.id}_${j}_${j2}: ${suku(1, nama(ti.id, j))} ${suku(1, nama(tk.id, j2))} <= 1`);
          }
        }
      }
    }
  }

  const biner: string[] = [];
  for (const t of daftarTanaman) for (const j of BULAN) biner.push(nama(t.id, j));

  return [
    'Maximize',
    ` obj: ${gabung(sukuTujuan)}`,
    'Subject To',
    ...kendala,
    'Binary',
    ` ${gabung(biner, 12)}`,
    'End',
  ].join('\n');
}

/**
 * Selesaikan Model 1 atau Model 2 dan kembalikan hasil siap tampil.
 * @param highs instance HiGHS (browser: lihat highsBrowser.ts)
 */
export function selesaikanModel(
  highs: HighsLike,
  daftarTanaman: Tanaman[],
  opsi: OpsiModel,
  model: NomorModel,
): HasilOptimisasi {
  const label = model === 1 ? 'Tunggal + Rotasi' : 'Tumpang Sari + Rotasi';
  // Gap 0 agar solver benar-benar optimal sehingga bonus pemecah seri bekerja
  const sol = highs.solve(susunLP(daftarTanaman, opsi, model), { mip_rel_gap: 0, mip_abs_gap: 0 });

  if (sol.Status !== 'Optimal') {
    return {
      totalPendapatanNetto: 0,
      totalPendapatanBruto: 0,
      totalBiayaProduksi: 0,
      hasilPerTanaman: [],
      jadwalTanam: [],
      polaTanam: label,
      feasible: false,
    };
  }

  const keputusan: KeputusanTanam[] = [];
  for (const t of daftarTanaman) {
    for (const j of BULAN) {
      if ((sol.Columns[`y_${t.id}_${j}`]?.Primal ?? 0) > 0.5) {
        keputusan.push({ tanamanId: t.id, bulanTanam: j });
      }
    }
  }

  const hasil = bangunHasilDariKeputusan(keputusan, label, opsi.beta, opsi.gamma, daftarTanaman);

  // Tambahkan tanaman yang tidak dipilih agar tabel hasil lengkap
  for (const t of daftarTanaman) {
    if (!hasil.hasilPerTanaman.some(h => h.tanamanId === t.id)) {
      hasil.hasilPerTanaman.push({
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
  return hasil;
}

