import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  nama: string;
  email: string;
  instansi: string;
  created_at: string;
}

const Profil: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('agrioptima_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://agrioptima-backend-production.up.railway.app/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data profil');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setErrorMsg('Terjadi kesalahan saat memuat profil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil Peneliti</h2>
        
        {loading ? (
          <div className="text-center py-10 text-gray-500">Memuat data...</div>
        ) : errorMsg ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">{errorMsg}</div>
        ) : profile ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#023c27] h-32 relative"></div>
            <div className="px-8 pb-8 relative">
              {/* Foto Profil Inisial */}
              <div className="w-24 h-24 bg-[#69bd45] text-white font-bold text-3xl rounded-full flex items-center justify-center border-4 border-white absolute -top-12 shadow-md">
                {profile.nama.substring(0, 2).toUpperCase()}
              </div>
              
              <div className="pt-16">
                <h3 className="text-2xl font-bold text-gray-900">{profile.nama}</h3>
                <span className="inline-block mt-1 px-3 py-1 bg-green-50 text-agri-green text-xs font-bold rounded-full border border-green-100">
                  Pengguna Terverifikasi
                </span>
                
                <div className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Alamat Email</p>
                    <p className="md:col-span-2 text-gray-900 font-medium">{profile.email}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Instansi</p>
                    <p className="md:col-span-2 text-gray-900 font-medium">{profile.instansi}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Bergabung Sejak</p>
                    <p className="md:col-span-2 text-gray-900 font-medium">
                      {new Date(profile.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Profil;