import React from 'react';
import type { HasilOptimisasi } from '../types/simulasi';
import { NAMA_BULAN, DATA_CUACA, DAFTAR_TANAMAN } from '../data/researchData';

interface JadwalTanamProps {
  data: HasilOptimisasi | null;
}

// Ikon cuaca
const IkonCuaca = ({ normal }: { normal: boolean }) =>
  normal ? (
    <span title="Cuaca Normal" className="text-amber-400 text-base">☀️</span>
  ) : (
    <span title="Cuaca Tidak Normal (Hujan)" className="text-blue-400 text-base">🌧️</span>
  );

const JadwalTanam: React.FC<JadwalTanamProps> = ({ data }) => {
  const hasilValid = data && data.feasible && data.jadwalTanam.length > 0;
  const jadwal = hasilValid ? data.jadwalTanam : [];
  const polaTanamLabel = data ? data.polaTanam : null;

  // Buat peta: bulan → info tanaman yang sedang aktif di bulan itu
  type InfoBulan = {
    tanamanId: number;
    namaTanaman: string;
    warna: string;
    fase: string;
    cuacaNormal: boolean;
    warnaIkon: string;
    bulanMulai: number;
    bulanSelesai: number;
  };
  const petaBulan: Record<number, InfoBulan[]> = {};
  for (let b = 1; b <= 12; b++) petaBulan[b] = [];

  for (const item of jadwal) {
    if (item.tanamanId === 0) continue;
    const tanaman = DAFTAR_TANAMAN.find(t => t.id === item.tanamanId);
    for (let b = item.bulanMulai; b <= Math.min(item.bulanSelesai, 12); b++) {
      petaBulan[b].push({
        tanamanId: item.tanamanId,
        namaTanaman: item.tanaman,
        warna: tanaman?.warna || '#94a3b8',
        fase: item.fase,
        cuacaNormal: DATA_CUACA[b - 1]?.isNormal ?? true,
        warnaIkon: item.warnaIkon,
        bulanMulai: item.bulanMulai,
        bulanSelesai: item.bulanSelesai,
      });
    }
  }

  // Visual bar warna per bulan
  const bulanColors: string[] = Array(12).fill('#e5e7eb');
  for (let b = 1; b <= 12; b++) {
    if (petaBulan[b].length > 0) {
      bulanColors[b - 1] = petaBulan[b][0].warna;
    }
  }

  // Empty state — sebelum simulasi
  if (!hasilValid) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100 pb-4 gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-agri-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Rekomendasi Jadwal Tanam
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Jadwal operasional Januari – Desember berdasarkan hasil optimisasi MILP
            </p>
          </div>
          <span className="text-xs px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full font-bold border border-gray-200">
            Belum Disimulasikan
          </span>
        </div>

        {/* Grid preview 12 bulan (kosong) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
          {NAMA_BULAN.map((_, i) => (
            <div key={i} className="rounded-lg border border-dashed border-gray-200 p-3 bg-gray-50/50 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">{DATA_CUACA[i].bulan}</span>
                <IkonCuaca normal={DATA_CUACA[i].isNormal} />
              </div>
              <div className="h-1.5 rounded-full bg-gray-200 mt-1"></div>
              <p className="text-[10px] text-gray-400 mt-1">—</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <p className="font-semibold text-gray-600 mb-1">Jalankan Optimisasi</p>
          <p className="text-sm text-gray-400 max-w-xs">
            Isi parameter di form sebelah kiri, lalu klik <span className="font-semibold text-agri-green">Jalankan Optimisasi</span> untuk melihat jadwal tanam optimal Januari–Desember.
          </p>
        </div>
      </div>
    );
  }

  // Ringkasan hasil
  const totalTanaman = jadwal.filter(j => j.tanamanId !== 0).length;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8 w-full">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100 pb-4 gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-agri-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Rekomendasi Jadwal Tanam
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Jadwal operasional Januari – Desember — Pola:{' '}
            <span className="font-semibold text-gray-700">{polaTanamLabel}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 bg-green-50 text-agri-green rounded-full font-bold border border-green-200">
            {totalTanaman} Tanaman Aktif
          </span>
          <span className="text-xs px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full font-bold border border-gray-200">
            12 Bulan
          </span>
        </div>
      </div>

      {/* Visual Bar Calendar */}
      <div className="mb-6">
        <div className="flex gap-0.5 rounded-lg overflow-hidden">
          {bulanColors.map((color, i) => (
            <div key={i} className="flex-1 group relative">
              <div
                className="h-10 transition-all hover:h-12 cursor-pointer"
                style={{ backgroundColor: color, opacity: 0.85 }}
              ></div>
              <p className="text-center text-[10px] text-gray-500 mt-1 font-medium">
                {DATA_CUACA[i].bulan}
              </p>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 pointer-events-none">
                <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                  {NAMA_BULAN[i]} — {DATA_CUACA[i].curahHujan}mm
                  {petaBulan[i + 1].length > 0 && (
                    <div className="text-emerald-300 font-semibold">{petaBulan[i + 1][0].namaTanaman}</div>
                  )}
                  <div className={`text-[10px] ${DATA_CUACA[i].isNormal ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {DATA_CUACA[i].isNormal ? '☀ Cuaca Normal' : '🌧 Cuaca Tidak Normal'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Legenda */}
        <div className="flex flex-wrap gap-3 mt-3">
          {jadwal.filter(j => j.tanamanId !== 0).map(j => {
            const tanaman = DAFTAR_TANAMAN.find(t => t.id === j.tanamanId);
            return (
              <div key={j.id} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: tanaman?.warna || '#94a3b8' }}></span>
                <span className="text-xs text-gray-600 font-medium">{j.tanaman}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gray-200 border border-gray-300"></span>
            <span className="text-xs text-gray-400 font-medium">Tidak ditanami</span>
          </div>
        </div>
      </div>

      {/* === TABEL GRID 12 BULAN === */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-agri-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
          </svg>
          Tabel Jadwal Bulan per Bulan
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {NAMA_BULAN.map((_, i) => {
            const bIdx = i + 1;
            const infoList = petaBulan[bIdx];
            const isEmpty = infoList.length === 0;
            const cuaca = DATA_CUACA[i];
            const tanamanInfo = isEmpty ? null : infoList[0];
            const tanaman = tanamanInfo ? DAFTAR_TANAMAN.find(t => t.id === tanamanInfo.tanamanId) : null;

            return (
              <div
                key={i}
                className={`rounded-xl border p-3 flex flex-col gap-1.5 transition-shadow hover:shadow-md ${
                  isEmpty
                    ? 'border-dashed border-gray-200 bg-gray-50/60'
                    : 'border-gray-100 bg-white shadow-sm'
                }`}
              >
                {/* Header bulan */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isEmpty ? 'text-gray-400' : 'text-gray-700'}`}>
                    {cuaca.bulan}
                  </span>
                  <IkonCuaca normal={cuaca.isNormal} />
                </div>

                {/* Bar warna */}
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    backgroundColor: isEmpty ? '#e5e7eb' : (tanaman?.warna || '#94a3b8'),
                    opacity: isEmpty ? 1 : 0.75,
                  }}
                ></div>

                {/* Nama tanaman */}
                {isEmpty ? (
                  <p className="text-[10px] text-gray-400 mt-0.5">Tidak ditanami</p>
                ) : (
                  <>
                    <p className="text-[11px] font-semibold text-gray-800 leading-tight">{tanamanInfo!.namaTanaman}</p>
                    <p className="text-[10px] text-gray-500">{tanaman?.famili ?? ''}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        cuaca.isNormal ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {cuaca.isNormal ? 'Normal' : 'Hujan'}
                      </span>
                      {tanamanInfo!.bulanMulai === bIdx && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                          Mulai
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline Detail */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-agri-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          Detail Periode Tanam
        </h3>
        <div className="relative border-l-2 border-gray-200 ml-4 sm:ml-6 py-2">
          {jadwal.map((item, index) => (
            <div key={item.id} className="mb-6 ml-8 sm:ml-10 relative last:mb-0">

              {/* Timeline dot */}
              <span className={`absolute -left-[43px] sm:-left-[51px] flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white ${item.warnaIkon} text-white shadow-sm text-xs font-bold`}>
                {index + 1}
              </span>

              {/* Card */}
              <div className={`p-5 rounded-xl border border-gray-100 ${item.warnaBg} shadow-sm hover:shadow-md transition-shadow`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-3">
                    {item.tanamanId !== 0 && (
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: DAFTAR_TANAMAN.find(t => t.id === item.tanamanId)?.warna || '#94a3b8' }}
                      ></span>
                    )}
                    <h3 className="text-lg font-bold text-gray-800">{item.tanaman}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 bg-white text-gray-600 rounded-full border border-gray-200 shadow-sm">
                      {NAMA_BULAN[item.bulanMulai - 1]} — {NAMA_BULAN[item.bulanSelesai - 1]}
                    </span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      DATA_CUACA[item.bulanMulai - 1]?.isNormal
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {DATA_CUACA[item.bulanMulai - 1]?.isNormal ? '☀' : '🌧'}
                    </span>
                  </div>
                </div>

                <p className="text-sm font-semibold text-gray-700 mb-1">{item.fase}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.keterangan}</p>

                {item.tanamanId !== 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100/50 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span>
                      Famili:{' '}
                      <span className="font-semibold text-gray-700">
                        {DAFTAR_TANAMAN.find(t => t.id === item.tanamanId)?.famili || '-'}
                      </span>
                    </span>
                    <span>
                      Durasi:{' '}
                      <span className="font-semibold text-gray-700">
                        {item.bulanSelesai - item.bulanMulai + 1} bulan
                      </span>
                    </span>
                    <span>
                      Cuaca mulai tanam:{' '}
                      <span className={`font-semibold ${DATA_CUACA[item.bulanMulai - 1]?.isNormal ? 'text-emerald-600' : 'text-blue-600'}`}>
                        {DATA_CUACA[item.bulanMulai - 1]?.isNormal ? 'Normal' : 'Tidak Normal (Hujan)'}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kendala Rotasi Info */}
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <h4 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Kendala Rotasi Famili
        </h4>
        <p className="text-xs text-blue-700 leading-relaxed">
          Tanaman dari famili yang sama tidak boleh ditanam berurutan pada lahan yang sama.{' '}
          Contoh: <span className="font-semibold">Tomat → Cabai → Kentang</span> (semua Solanaceae){' '}
          <span className="text-red-500 font-bold">✗ tidak disarankan</span>.{' '}
          Sebaliknya: <span className="font-semibold">Tomat → Jagung → Wortel</span> (famili berbeda){' '}
          <span className="text-emerald-600 font-bold">✓ disarankan</span>.
        </p>
      </div>

    </div>
  );
};

export default JadwalTanam;