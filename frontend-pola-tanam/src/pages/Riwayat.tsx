import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

// Struktur data riwayat simulasi
interface SimulasiRecord {
  id: number;
  tanggal_simulasi: string;
  luas_lahan: number;
  total_tanaman_aktif: number;
  rekomendasi_pola: string;
  estimasi_pendapatan: number;
}

const Riwayat: React.FC = () => {
  const [riwayat, setRiwayat] = useState<SimulasiRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRiwayat = async () => {
      const token = localStorage.getItem('agrioptima_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // PERHATIAN: Endpoint ini akan kita bangun di backend pada tahap selanjutnya
        const response = await fetch('http://localhost:5000/api/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data riwayat');
        }

        const data = await response.json();
        setRiwayat(data);
      } catch (error) {
        // Hapus data mock, dan gunakan setErrorMsg agar peringatan hilang
        console.error('Error fetch riwayat:', error);
        setErrorMsg('Gagal mengambil data riwayat. Pastikan server backend berjalan.');
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Riwayat Simulasi Anda</h2>
            <p className="text-sm text-gray-500 mt-1">Daftar rekam jejak optimisasi pola tanam yang pernah Anda jalankan.</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-agri-green text-white font-bold rounded-lg hover:bg-green-700 transition shadow-sm text-sm"
          >
            + Buat Simulasi Baru
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center py-16 text-gray-500">Memuat data riwayat...</div>
          ) : errorMsg && riwayat.length === 0 ? (
            <div className="text-center py-16 text-red-500">{errorMsg}</div>
          ) : riwayat.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <p className="text-gray-500 font-medium">Belum ada riwayat simulasi.</p>
              <p className="text-sm text-gray-400 mt-1">Jalankan simulasi pertama Anda di dashboard.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Luas Lahan</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Pola Direkomendasikan</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Tanaman Aktif</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Est. Pendapatan</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {riwayat.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-gray-900 font-medium">
                        {new Date(item.tanggal_simulasi).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
                        })}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {item.luas_lahan} m²
                      </td>
                      <td className="py-4 px-6 text-gray-800 font-semibold">
                        {item.rekomendasi_pola}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                          {item.total_tanaman_aktif} Jenis
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-agri-green">
                        Rp {item.estimasi_pendapatan.toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button className="text-[#00a3e0] hover:text-blue-800 font-semibold text-xs transition">
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Riwayat;