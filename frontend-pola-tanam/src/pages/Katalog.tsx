import React from 'react';
import Navbar from '../components/navbar';
import { DAFTAR_TANAMAN } from '../data/researchData';

const Katalog: React.FC = () => {
  // Menghitung metrik cepat untuk ringkasan di atas tabel
  const totalTanaman = DAFTAR_TANAMAN.length;
  const daftarFamiliUnik = new Set(DAFTAR_TANAMAN.map(t => t.famili));
  const totalFamili = daftarFamiliUnik.size;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Header Halaman */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Katalog Komoditas Pertanian</h2>
          <p className="text-sm text-gray-500 mt-1">
            Basis data parameter biologis dan ekonomi untuk komoditas hortikultura di Desa Saribudolok[cite: 1].
          </p>
        </div>

        {/* Kartu Metrik Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-agri-green">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Varietas</p>
              <h3 className="text-xl font-extrabold text-gray-800">{totalTanaman} Komoditas</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori Biologis</p>
              <h3 className="text-xl font-extrabold text-gray-800">{totalFamili} Famili Botani</h3>
            </div>
          </div>
        </div>

        {/* Tabel Data Komoditas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-agri-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                Parameter Model MILP
              </h2>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-8">#</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Tanaman</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Famili</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Durasi (Bulan)</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Prod. Max (h<sub>i</sub>)</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Biaya (c<sub>i</sub>)</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Harga Jual (s<sub>i</sub>)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {DAFTAR_TANAMAN.map((tanaman) => (
                  <tr key={tanaman.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-400 font-medium text-xs">{tanaman.id}</td>
                    <td className="py-4 px-6 font-bold text-gray-800 flex items-center gap-3">
                      <span 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: tanaman.warna }}
                      ></span>
                      {tanaman.nama}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                        {tanaman.famili}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-gray-700">
                      {tanaman.durasiTanam}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {tanaman.produksiMax > 0 ? (
                        <span className="font-medium text-gray-700">{tanaman.produksiMax.toLocaleString('id-ID')} kg/ha</span>
                      ) : (
                        <span className="text-xs text-gray-300 italic">belum ada</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {tanaman.biayaProduksi > 0 ? (
                        <span className="font-medium text-gray-700">Rp {tanaman.biayaProduksi.toLocaleString('id-ID')}</span>
                      ) : (
                        <span className="text-xs text-gray-300 italic">belum ada</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {tanaman.hargaJual > 0 ? (
                        <span className="font-medium text-green-700">Rp {tanaman.hargaJual.toLocaleString('id-ID')}</span>
                      ) : (
                        <span className="text-xs text-gray-300 italic">belum ada</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-amber-50/50 border-t border-amber-100 flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-bold block mb-1">Catatan Parameter Model:</span> 
              Nilai parameter h<sub>i</sub>, c<sub>i</sub>, s<sub>i</sub>, dan l<sub>i</sub> saat ini menunggu input aktual. Data akan dilengkapi setelah hasil survei lapangan dan data komoditas dari instansi terkait setempat diverifikasi.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Katalog;