import React from 'react';
import type { HasilOptimisasi } from '../types/simulasi';
import { NAMA_BULAN, DAFTAR_TANAMAN } from '../data/researchData';
import { formatRupiah } from '../utils/milpSolver';

interface Props {
  model1: HasilOptimisasi | null;
  model2: HasilOptimisasi | null;
}

const fmt = (n: number) => new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(n);

/** Gantt chart sederhana 12 bulan untuk satu model */
const Gantt: React.FC<{ hasil: HasilOptimisasi }> = ({ hasil }) => {
  const baris = hasil.hasilPerTanaman
    .filter(h => h.ditanam)
    .sort((a, b) => a.bulanTanam - b.bulanTanam);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[520px]">
        <div className="grid grid-cols-[130px_repeat(12,1fr)] text-[10px] text-gray-500 font-medium mb-1">
          <span></span>
          {NAMA_BULAN.map(b => <span key={b} className="text-center">{b.slice(0, 3)}</span>)}
        </div>
        {baris.map(h => {
          const t = DAFTAR_TANAMAN.find(x => x.id === h.tanamanId);
          const durasi = t?.durasiTanam ?? 1;
          const aktif = Array.from({ length: 12 }, (_, i) => {
            const rel = (i + 1 - h.bulanTanam + 12) % 12;
            return rel < durasi;
          });
          return (
            <div key={h.tanamanId} className="grid grid-cols-[130px_repeat(12,1fr)] items-center mb-1">
              <span className="text-xs text-gray-700 pr-2 truncate">
                {h.namaTanaman} <span className="text-gray-400">({h.luasTanam} ha)</span>
              </span>
              {aktif.map((a, i) => (
                <div
                  key={i}
                  className="h-5 border-r border-white/60"
                  style={{ backgroundColor: a ? t?.warna ?? '#94a3b8' : '#f3f4f6', opacity: a ? 0.9 : 1 }}
                  title={`${NAMA_BULAN[i]}${i + 1 === h.bulanTanam ? ' (mulai)' : ''}`}
                ></div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TabelHasil: React.FC<{ hasil: HasilOptimisasi }> = ({ hasil }) => {
  const baris = hasil.hasilPerTanaman
    .filter(h => h.ditanam)
    .sort((a, b) => a.bulanTanam - b.bulanTanam || a.tanamanId - b.tanamanId);
  const totalProd = baris.reduce((s, h) => s + h.produksiAktual, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-200">
            <th className="py-2 pr-2 font-semibold">Tanaman</th>
            <th className="py-2 pr-2 font-semibold">Tanam</th>
            <th className="py-2 pr-2 font-semibold">Panen</th>
            <th className="py-2 pr-2 font-semibold text-right">Luas (ha)</th>
            <th className="py-2 pr-2 font-semibold text-right">Produksi (kg)</th>
            <th className="py-2 font-semibold text-right">Keuntungan (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {baris.map(h => (
            <tr key={h.tanamanId} className="border-b border-gray-100">
              <td className="py-1.5 pr-2 font-medium text-gray-800">
                {h.namaTanaman}
                {h.pasangan && h.pasangan.length > 0 && (
                  <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                    + {h.pasangan.join(', ')}
                  </span>
                )}
              </td>
              <td className="py-1.5 pr-2 text-gray-600">{NAMA_BULAN[h.bulanTanam - 1]}</td>
              <td className="py-1.5 pr-2 text-gray-600">{h.bulanPanen ? NAMA_BULAN[h.bulanPanen - 1] : '-'}</td>
              <td className="py-1.5 pr-2 text-right text-gray-700">{h.luasTanam}</td>
              <td className="py-1.5 pr-2 text-right text-gray-700">{fmt(h.produksiAktual)}</td>
              <td className="py-1.5 text-right text-gray-800 font-medium">{fmt(h.pendapatanNetto)}</td>
            </tr>
          ))}
          <tr className="font-bold text-gray-900">
            <td className="py-2" colSpan={3}>Total</td>
            <td className="py-2 pr-2 text-right">{hasil.totalLuasTanam}</td>
            <td className="py-2 pr-2 text-right">{fmt(totalProd)}</td>
            <td className="py-2 text-right">{fmt(hasil.totalPendapatanNetto)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const KartuModel: React.FC<{ judul: string; sub: string; hasil: HasilOptimisasi; aksen: string }> = ({ judul, sub, hasil, aksen }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
    <div>
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${aksen}`}></span>
        <h3 className="text-base font-bold text-gray-800">{judul}</h3>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
          hasil.feasible ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {hasil.feasible ? 'Optimal' : 'Tidak feasible'}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
    </div>
    {hasil.feasible ? (
      <>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-[10px] text-gray-500">Keuntungan</p>
            <p className="text-xs font-bold text-gray-800">{formatRupiah(hasil.totalPendapatanNetto)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-[10px] text-gray-500">Luas tanam</p>
            <p className="text-xs font-bold text-gray-800">{hasil.totalLuasTanam} ha</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-[10px] text-gray-500">Tanaman</p>
            <p className="text-xs font-bold text-gray-800">{hasil.hasilPerTanaman.filter(h => h.ditanam).length} jenis</p>
          </div>
        </div>
        <Gantt hasil={hasil} />
        <TabelHasil hasil={hasil} />
      </>
    ) : (
      <p className="text-sm text-gray-500">Tidak ada solusi feasible untuk parameter ini.</p>
    )}
  </div>
);

const PerbandinganModel: React.FC<Props> = ({ model1, model2 }) => {
  if (!model1 || !model2) return null;

  // Perbedaan bulan tanam antar model
  const selisih = model1.hasilPerTanaman
    .filter(a => a.ditanam)
    .map(a => {
      const b = model2.hasilPerTanaman.find(x => x.tanamanId === a.tanamanId);
      return b && b.ditanam && b.bulanTanam !== a.bulanTanam
        ? `${a.namaTanaman}: ${NAMA_BULAN[a.bulanTanam - 1]} → ${NAMA_BULAN[b.bulanTanam - 1]}`
        : null;
    })
    .filter((s): s is string => !!s);

  const pasangan = model2.hasilPerTanaman
    .filter(h => h.ditanam && h.pasangan && h.pasangan.length > 0 && h.tanamanId < (DAFTAR_TANAMAN.find(t => t.nama === h.pasangan![0])?.id ?? 0))
    .map(h => `${h.namaTanaman} + ${h.pasangan![0]} (${NAMA_BULAN[h.bulanTanam - 1]})`);

  const sama = Math.abs(model1.totalPendapatanNetto - model2.totalPendapatanNetto) < 1;

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">Perbandingan Pola Tanam Optimal</h2>
        <p className="text-sm text-gray-500 mt-1">
          Kedua model memaksimalkan keuntungan yang sama; yang berbeda hanya kendala pola tanamnya.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <KartuModel
          judul="Model 1: Tunggal + Rotasi"
          sub="Maksimal satu tanaman mulai tanam per bulan, rotasi antar famili."
          hasil={model1}
          aksen="bg-emerald-500"
        />
        <KartuModel
          judul="Model 2: Tumpang Sari + Rotasi"
          sub="Pasangan tanaman tertentu boleh mulai bersamaan, rotasi antar famili."
          hasil={model2}
          aksen="bg-purple-500"
        />
      </div>

      {model1.feasible && model2.feasible && (
        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-800 space-y-1">
          <p>
            <span className="font-bold">Keuntungan: </span>
            {sama
              ? 'sama pada kedua model, sehingga tumpang sari belum meningkatkan keuntungan; yang berubah adalah pengaturan jadwal.'
              : `Model 1 ${formatRupiah(model1.totalPendapatanNetto)} vs Model 2 ${formatRupiah(model2.totalPendapatanNetto)}.`}
          </p>
          {pasangan.length > 0 && (
            <p><span className="font-bold">Pasangan tumpang sari (Model 2): </span>{pasangan.join('; ')}.</p>
          )}
          {selisih.length > 0 && (
            <p><span className="font-bold">Perubahan jadwal Model 1 → Model 2: </span>{selisih.join('; ')}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PerbandinganModel;

