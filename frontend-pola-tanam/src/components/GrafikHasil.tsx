import React from 'react';
import type { HasilOptimisasi } from '../types/simulasi';
import { DAFTAR_TANAMAN, NAMA_BULAN } from '../data/researchData';

interface GrafikHasilProps {
  data: HasilOptimisasi | null;
}

const GrafikHasil: React.FC<GrafikHasilProps> = ({ data }) => {
  // Prepare data for display
  const items = data ? data.hasilPerTanaman.map(h => ({
    ...h,
    warna: DAFTAR_TANAMAN.find(t => t.id === h.tanamanId)?.warna || '#94a3b8',
    famili: DAFTAR_TANAMAN.find(t => t.id === h.tanamanId)?.famili || '-',
    durasi: DAFTAR_TANAMAN.find(t => t.id === h.tanamanId)?.durasiTanam || 0,
  })) : DAFTAR_TANAMAN.map(t => ({
    tanamanId: t.id,
    namaTanaman: t.nama,
    bulanTanam: 0,
    ditanam: false,
    produksiAktual: 0,
    pendapatanBruto: 0,
    biayaProduksiTotal: 0,
    pendapatanNetto: 0,
    cuacaNormal: true,
    warna: t.warna,
    famili: t.famili,
    durasi: t.durasiTanam,
  }));

  // Hitung max durasi untuk skala bar
  const maxDurasi = Math.max(...items.map(i => i.durasi), 1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-agri-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Hasil Optimisasi per Tanaman
        </h2>
        {data && (
          <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
            data.feasible 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {data.feasible ? `Pola: ${data.polaTanam}` : 'Tidak Feasible'}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-5">
        {data 
          ? 'Status penanaman 10 tanaman Saribudolok berdasarkan hasil solver MILP.'
          : 'Jalankan simulasi untuk melihat hasil optimisasi.'
        }
      </p>

      {/* Custom Bar Chart */}
      <div className="flex-grow space-y-2.5 overflow-y-auto">
        {items.map((item) => {
          const barWidth = item.ditanam ? (item.durasi / maxDurasi) * 100 : 0;
          
          return (
            <div key={item.tanamanId} className="group">
              <div className="flex items-center gap-3">
                {/* Nama tanaman */}
                <div className="w-28 flex-shrink-0 text-right">
                  <span className={`text-sm font-semibold ${item.ditanam ? 'text-gray-800' : 'text-gray-300'}`}>
                    {item.namaTanaman}
                  </span>
                </div>
                
                {/* Bar container */}
                <div className="flex-grow h-9 bg-gray-50 rounded-lg relative overflow-hidden border border-gray-100">
                  {item.ditanam ? (
                    <div
                      className="h-full rounded-lg flex items-center px-3 transition-all duration-500 ease-out"
                      style={{ 
                        width: `${Math.max(barWidth, 20)}%`, 
                        backgroundColor: item.warna,
                        opacity: 0.85,
                      }}
                    >
                      <span className="text-xs font-bold text-white drop-shadow-sm whitespace-nowrap">
                        {NAMA_BULAN[item.bulanTanam - 1]} • {item.durasi} bln
                      </span>
                    </div>
                  ) : (
                    <div className="h-full flex items-center px-3">
                      <span className="text-xs text-gray-300 italic">tidak ditanam</span>
                    </div>
                  )}
                </div>

                {/* Status icon */}
                <div className="w-8 flex-shrink-0 flex justify-center">
                  {item.ditanam ? (
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      item.cuacaNormal ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}>
                      {item.cuacaNormal ? '☀' : '🌧'}
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                      —
                    </span>
                  )}
                </div>
              </div>

              {/* Hover detail */}
              {item.ditanam && (
                <div className="hidden group-hover:flex ml-[7.5rem] mt-1 mb-1 items-center gap-3 text-xs text-gray-500 pl-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.warna }}></span>
                    {item.famili}
                  </span>
                  <span>•</span>
                  <span>Bulan ke-{item.bulanTanam}</span>
                  <span>•</span>
                  <span className={item.cuacaNormal ? 'text-emerald-600' : 'text-amber-600'}>
                    {item.cuacaNormal ? 'Cuaca Normal' : 'Cuaca Tidak Normal'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-3 h-3 rounded bg-emerald-500"></span>
          <span>Cuaca Normal</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-3 h-3 rounded bg-amber-500"></span>
          <span>Cuaca Tidak Normal</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-3 h-3 rounded bg-gray-200"></span>
          <span>Tidak Ditanam</span>
        </div>
      </div>

      {/* Summary Cards */}
      {data && data.feasible && (
        <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-500">Tanaman Ditanam</p>
            <p className="text-xl font-bold text-agri-green">
              {data.hasilPerTanaman.filter(h => h.ditanam).length}
              <span className="text-sm text-gray-400 font-normal">/10</span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Bulan Normal</p>
            <p className="text-xl font-bold text-emerald-600">
              {data.hasilPerTanaman.filter(h => h.ditanam && h.cuacaNormal).length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Bulan Hujan</p>
            <p className="text-xl font-bold text-amber-600">
              {data.hasilPerTanaman.filter(h => h.ditanam && !h.cuacaNormal).length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrafikHasil;