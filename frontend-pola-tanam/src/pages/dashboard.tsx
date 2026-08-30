import React, { useState } from 'react';
import Navbar from '../components/navbar';
import FormSimulasi from '../components/FormSimulasi';
import GrafikHasil from '../components/GrafikHasil';
import JadwalTanam from '../components/JadwalTanam';
import GrafikCuaca from '../components/GrafikCuaca';

import type { ParameterSimulasi, HasilOptimisasi } from '../types/simulasi';
import { INFO_DESA } from '../data/researchData'; // DAFTAR_TANAMAN dihapus dari sini karena sudah pindah ke Katalog.tsx
import { jalankanOptimisasi } from '../utils/milpSolver';

const Dashboard: React.FC = () => {


  const [hasilOptimisasi, setHasilOptimisasi] = useState<HasilOptimisasi | null>(null);
  const [overview, setOverview] = useState({
    luasLahan: INFO_DESA.ketinggian,
    tanamanDitanam: 0,
    polaTanam: 'Belum disimulasikan',
    status: 'idle' as 'idle' | 'done'
  });


  const handleJalankanSimulasi = async (params: ParameterSimulasi) => {
    const hasil = jalankanOptimisasi(params);
    setHasilOptimisasi(hasil);

    const tanamanAktif = hasil.hasilPerTanaman.filter(h => h.ditanam).length;
    
    setOverview({
      luasLahan: params.luasLahan,
      tanamanDitanam: tanamanAktif,
      polaTanam: hasil.polaTanam,
      status: 'done'
    });

    const token = localStorage.getItem('agrioptima_token');
    if (token) {
      try {
        await fetch('http://localhost:5000/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            luas_lahan: params.luasLahan,
            total_tanaman_aktif: tanamanAktif,
            rekomendasi_pola: hasil.polaTanam,
            estimasi_pendapatan: hasil.totalPendapatanNetto 
          })
        });
        console.log('✅ Hasil simulasi otomatis tersimpan ke riwayat!');
      } catch (error) {
        console.error('❌ Gagal menyimpan riwayat ke server:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* ================= BAGIAN 1: OVERVIEW ================= */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">Dashboard Penelitian</h2>
              <span className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold border border-emerald-200">
                Desa Saribudolok[cite: 1]
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Lokasi Penelitian</p>
                <h3 className="text-sm font-bold text-gray-800">{INFO_DESA.nama}</h3>
                <p className="text-xs text-gray-400">{INFO_DESA.kabupaten}, {INFO_DESA.provinsi}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Ketinggian</p>
                <h3 className="text-base font-bold text-gray-800">{INFO_DESA.ketinggian} mdpl</h3>
                <p className="text-xs text-gray-400">{INFO_DESA.jenisTanah}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-11 h-11 rounded-lg bg-green-50 flex items-center justify-center text-agri-green">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Varietas Tanaman</p>
                <h3 className="text-base font-bold text-gray-800">10 Jenis</h3>
                <p className="text-xs text-gray-400">7 Famili Botani</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
              <div className="w-11 h-11 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Pola Tanam</p>
                <h3 className="text-sm font-bold text-gray-800 truncate max-w-[150px]" title={overview.polaTanam}>
                  {overview.polaTanam}
                </h3>
                <p className="text-xs text-gray-400">
                  {overview.status === 'done' ? `${overview.tanamanDitanam} tanaman aktif` : 'Belum disimulasikan'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BAGIAN 2: GRAFIK CUACA ================= */}
        <div className="mb-8">
           <GrafikCuaca />
        </div>

        {/* ================= BAGIAN 3 & 4: FORM INPUT & GRAFIK OPTIMISASI ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <FormSimulasi onSimulasi={handleJalankanSimulasi} />
          </div>
          <div className="lg:col-span-2">
            <GrafikHasil data={hasilOptimisasi} />
          </div>
        </div>

        {/* ================= BAGIAN 5: JADWAL TANAM ================= */}
        <JadwalTanam data={hasilOptimisasi} />

      </main>
    </div>
  );
};

export default Dashboard;