import React from 'react';
import Navbar from '../components/navbar';

const Panduan: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <Navbar />
      
      <main className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Panduan Penggunaan Sistem</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-lg">
            Pelajari cara membaca grafik hasil simulasi, menerjemahkan jadwal tanam, dan memahami asumsi cuaca ekstrem pada model AgriOptima.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* 1. Asumsi Cuaca Ekstrem */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Memahami Asumsi Cuaca Ekstrem</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sistem ini membagi tahun ke dalam dua kondisi cuaca berdasarkan intensitas curah hujan di Desa Saribudolok:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                  <h4 className="font-bold text-green-800 mb-1">Cuaca Normal (Januari - Juli)</h4>
                  <p className="text-sm text-green-700">Curah hujan &lt; 200 mm/bulan. Tanaman tumbuh optimal dengan hasil maksimum dan biaya standar.</p>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <h4 className="font-bold text-amber-800 mb-1">Cuaca Tidak Normal (Agustus - Desember)</h4>
                  <p className="text-sm text-amber-700">Curah hujan &ge; 200 mm/bulan. Memicu penurunan hasil produksi (penalti β) dan kenaikan biaya perawatan (penalti γ).</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Cara Kerja Form Simulasi */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 bg-agri-green/10 text-agri-green rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Menjalankan Simulasi Model</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Anda hanya perlu memasukkan <strong>Luas Lahan (m²)</strong> yang tersedia. Saat Anda mengklik "Jalankan Simulasi", mesin komputasi MILP di balik layar akan bekerja menyeleksi 10 tanaman dengan aturan ketat:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>Tidak boleh melebihi luas lahan total pada bulan manapun.</li>
                <li>Setiap tanaman hanya boleh ditanam maksimal 1 kali dalam setahun (mendorong rotasi).</li>
                <li>Tanaman dari famili botani yang sama (misal: Tomat dan Cabai sama-sama Solanaceae) tidak boleh ditanam secara berurutan.</li>
              </ul>
            </div>
          </div>

          {/* 3. Membaca Grafik Optimisasi */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Membaca Grafik Hasil Optimisasi</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Setelah simulasi selesai, grafik batang akan muncul. Fokuslah pada dua komponen utama:
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#69bd45] rounded-sm flex-shrink-0"></div>
                  <p className="text-sm text-gray-700"><strong>Batang Hijau (Pendapatan Netto):</strong> Menunjukkan perkiraan keuntungan bersih dari tanaman yang direkomendasikan.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-400 rounded-sm flex-shrink-0"></div>
                  <p className="text-sm text-gray-700"><strong>Batang Merah (Biaya Produksi):</strong> Menunjukkan perkiraan modal yang harus disiapkan untuk perawatan tanaman tersebut.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Membaca Jadwal Tanam */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Membaca Timeline Jadwal Tanam</h3>
              <p className="text-gray-600 leading-relaxed">
                Di bagian paling bawah dashboard, terdapat tabel Jadwal Tanam (Gantt Chart). Balok horizontal berwarna menunjukkan masa hidup tanaman dari bulan mulai tanam hingga bulan panen. Jika terdapat dua balok warna yang saling tumpang tindih pada bulan yang sama, itu artinya sistem merekomendasikan metode <strong>Tumpang Sari</strong>. Jika balok menyambung satu sama lain, sistem merekomendasikan <strong>Rotasi Tanaman</strong>.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Panduan;