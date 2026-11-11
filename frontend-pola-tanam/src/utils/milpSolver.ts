// ============================================================
// SOLVER MILP (Frontend)
// Optimisasi Pola Tanam - Desa Saribudolok
// ============================================================
// Model 1 (Tunggal + Rotasi) dan Model 2 (Tumpang Sari + Rotasi) diselesaikan
// dengan HiGHS (WebAssembly) di browser. Formulasi: lihat milpModel.ts.
// ============================================================

import type { ParameterSimulasi, HasilOptimisasi } from '../types/simulasi';
import { DAFTAR_TANAMAN } from '../data/researchData';
import { selesaikanModel } from './milpModel';
import type { NomorModel } from './milpModel';
import { getHighs } from './highsBrowser';

/** Jalankan satu model sesuai pilihan pada parameter */
export async function jalankanOptimisasi(params: ParameterSimulasi): Promise<HasilOptimisasi> {
  const highs = await getHighs();
  const model: NomorModel = params.polaTanam === 'tunggalRotasi' ? 1 : 2;
  return selesaikanModel(highs, DAFTAR_TANAMAN, {
    beta: params.beta,
    gamma: params.gamma,
    luasLahanHa: params.luasLahan,
  }, model);
}

/** Jalankan kedua model dengan parameter yang sama (untuk tampilan berdampingan) */
export async function jalankanKeduaModel(
  params: ParameterSimulasi,
): Promise<{ model1: HasilOptimisasi; model2: HasilOptimisasi }> {
  const highs = await getHighs();
  const opsi = { beta: params.beta, gamma: params.gamma, luasLahanHa: params.luasLahan };
  return {
    model1: selesaikanModel(highs, DAFTAR_TANAMAN, opsi, 1),
    model2: selesaikanModel(highs, DAFTAR_TANAMAN, opsi, 2),
  };
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
