import React from 'react';
import type { HasilOptimisasi } from '../types/simulasi';
import { NAMA_BULAN, DATA_CUACA, DAFTAR_TANAMAN } from '../data/researchData';

interface JadwalTanamProps {
  data: HasilOptimisasi | null;
}

// Default jadwal (sebelum simulasi dijalankan)
const defaultJadwal = [
  {
    id: 1, bulanMulai: 1, bulanSelesai: 2, tanaman: 'Sawi Putih', tanamanId: 6,
    fase: 'Cuaca Normal', keterangan: 'Sawi Putih (Brassicaceae) — durasi 2 bulan. Cuaca normal mendukung pertumbuhan optimal.',
    cuacaNormal: true, warnaIkon: 'bg-emerald-500', warnaBg: 'bg-emerald-50'
  },
  {
    id: 2, bulanMulai: 3, bulanSelesai: 5, tanaman: 'Wortel', tanamanId: 7,
    fase: 'Cuaca Normal', keterangan: 'Wortel (Apiaceae) — durasi 3 bulan. Famili berbeda dari Sawi, mendukung rotasi tanaman.',
    cuacaNormal: true, warnaIkon: 'bg-emerald-500', warnaBg: 'bg-emerald-50'
  },
  {
    id: 3, bulanMulai: 6, bulanSelesai: 8, tanaman: 'Bawang Merah', tanamanId: 5,
    fase: 'Transisi Cuaca', keterangan: 'Bawang Merah (Amaryllidaceae) — durasi 3 bulan. Memasuki transisi cuaca normal ke tidak normal.',
    cuacaNormal: true, warnaIkon: 'bg-amber-500', warnaBg: 'bg-amber-50'
  },
  {
    id: 4, bulanMulai: 9, bulanSelesai: 12, tanaman: 'Jagung', tanamanId: 8,
    fase: 'Cuaca Tidak Normal', keterangan: 'Jagung (Poaceae) — durasi 4 bulan. Curah hujan tinggi (≥200mm), perlu pemantauan ketat.',
    cuacaNormal: false, warnaIkon: 'bg-amber-500', warnaBg: 'bg-amber-50'
  },
];

const JadwalTanam: React.FC<JadwalTanamProps> = ({ data }) => {
  const jadwal = data && data.feasible && data.jadwalTanam.length > 0 
    ? data.jadwalTanam 
    : defaultJadwal;

  const polaTanamLabel = data ? data.polaTanam : 'Rotasi Tanaman (Default)';

  // Build 12-month visual bar
  const bulanColors = Array(12).fill('#e5e7eb');
  for (const item of jadwal) {
    const tanaman = DAFTAR_TANAMAN.find(t => t.id === item.tanamanId);
    const color = tanaman?.warna || (item.tanamanId === 0 ? '#d1d5db' : '#94a3b8');
    for (let b = item.bulanMulai - 1; b < item.bulanSelesai && b < 12; b++) {
      bulanColors[b] = color;
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8 w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100 pb-4 gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-agri-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Rekomendasi Jadwal Tanam
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Jadwal operasional berdasarkan hasil optimisasi — Pola: <span className="font-semibold text-gray-700">{polaTanamLabel}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 bg-green-50 text-agri-green rounded-full font-bold border border-green-200">
            {jadwal.filter(j => j.tanamanId !== 0).length} Tanaman
          </span>
          <span className="text-xs px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full font-bold border border-gray-200">
            12 Bulan
          </span>
        </div>
      </div>

      {/* Visual Calendar Bar */}
      <div className="mb-8">
        <div className="flex gap-0.5 rounded-lg overflow-hidden">
          {bulanColors.map((color, i) => (
            <div key={i} className="flex-1 group relative">
              <div 
                className="h-10 transition-all hover:h-12 cursor-pointer" 
                style={{ backgroundColor: color, opacity: 0.85 }}
              >
              </div>
              <p className="text-center text-[10px] text-gray-500 mt-1 font-medium">
                {DATA_CUACA[i].bulan}
              </p>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                  {NAMA_BULAN[i]} — {DATA_CUACA[i].curahHujan}mm
                  <div className={`text-[10px] ${DATA_CUACA[i].isNormal ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {DATA_CUACA[i].isNormal ? 'Cuaca Normal' : 'Cuaca Tidak Normal'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Legend for calendar bar */}
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
          {jadwal.some(j => j.tanamanId === 0) && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gray-300"></span>
              <span className="text-xs text-gray-600 font-medium">Istirahat</span>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Detail */}
      <div className="relative border-l-2 border-gray-200 ml-4 sm:ml-6 md:ml-8 py-2">
        {jadwal.map((item, index) => (
          <div key={item.id} className="mb-8 ml-8 sm:ml-10 relative last:mb-0">
            
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
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.tanaman}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 bg-white text-gray-600 rounded-full border border-gray-200 shadow-sm">
                    {NAMA_BULAN[item.bulanMulai - 1]} — {NAMA_BULAN[item.bulanSelesai - 1]}
                  </span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    item.cuacaNormal 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.cuacaNormal ? '☀' : '🌧'}
                  </span>
                </div>
              </div>
              
              <p className="text-sm font-semibold text-gray-700 mb-1">{item.fase}</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.keterangan}
              </p>
              
              {item.tanamanId !== 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100/50 flex items-center gap-4 text-xs text-gray-500">
                  <span>
                    Famili: <span className="font-semibold text-gray-700">
                      {DAFTAR_TANAMAN.find(t => t.id === item.tanamanId)?.famili || '-'}
                    </span>
                  </span>
                  <span>
                    Durasi: <span className="font-semibold text-gray-700">
                      {item.bulanSelesai - item.bulanMulai + 1} bulan
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
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
          Tanaman dari famili yang sama tidak boleh ditanam berurutan pada lahan yang sama. 
          Contoh: <span className="font-semibold">Tomat → Cabai → Kentang</span> (semua Solanaceae) <span className="text-red-500 font-bold">✗ tidak disarankan</span>. 
          Sebaliknya: <span className="font-semibold">Tomat → Jagung → Wortel</span> (famili berbeda) <span className="text-emerald-600 font-bold">✓ disarankan</span>.
        </p>
      </div>
      
    </div>
  );
};

export default JadwalTanam;