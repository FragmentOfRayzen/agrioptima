import React from 'react';
import { Link } from 'react-router-dom';

const TimPeneliti: React.FC = () => {
  const dosenPeneliti = [
    { nama: 'Dr. Lasker P Sinaga, S.Si., M.Si.', peran: 'Ketua Peneliti', instansi: 'Universitas Negeri Medan' },
    { nama: 'Dinda Kartika, S.Pd., M.Si.', peran: 'Anggota Peneliti', instansi: 'Universitas Negeri Medan' },
    { nama: 'Rizki Habibi, M.Si.', peran: 'Anggota Peneliti', instansi: 'Universitas Negeri Medan' },
  ];

  const asistenPeneliti = [
    { nama: 'Raihan Insan Pratama Siagian', peran: 'Asisten Peneliti (Software & Web Developer)', instansi: 'Universitas Negeri Medan' },
    { nama: 'Tri Sapta Warman Zai', peran: 'Asisten Peneliti (Software & Web Developer)', instansi: 'Universitas Negeri Medan' },
    { nama: 'M Alfin Syahrin', peran: 'Asisten Peneliti', instansi: 'Universitas Negeri Medan' },
    { nama: 'Yoel Manaek Simarmata', peran: 'Asisten Peneliti', instansi: 'Universitas Negeri Medan' },
    { nama: 'Tika Irmala Sari', peran: 'Asisten Peneliti', instansi: 'Universitas Negeri Medan' },
    { nama: 'Tyesa Junika Sihombing', peran: 'Asisten Peneliti', instansi: 'Universitas Negeri Medan' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* ================= HEADER NAVBAR ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md font-sans">
        <div className="bg-[#023c27] text-white text-xs md:text-sm py-2.5 text-center font-medium">
          Penelitian Terapan — Fakultas MIPA, Universitas Negeri Medan. <span className="underline cursor-pointer font-bold hover:text-green-300">Desa Saribudolok, Kab. Simalungun</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Link to="/">
                <span className="font-extrabold text-3xl text-[#00a3e0] tracking-tight">
                  Agri<span className="text-agri-green">Optima</span>
                </span>
              </Link>
            </div>

            <nav className="hidden lg:flex space-x-8 text-[15px] font-semibold text-gray-700">
              <Link to="/" className="cursor-pointer hover:text-agri-green transition">Beranda</Link>
              <Link to="/tentang-riset" className="group relative flex items-center gap-1 cursor-pointer hover:text-agri-green transition">
  Tentang Riset <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
</Link>
              <Link to="/metodologi" className="cursor-pointer hover:text-agri-green transition">Metodologi</Link>
              <Link to="/login" className="cursor-pointer hover:text-agri-green transition">Simulasi Model</Link>
              <div className="group relative flex items-center gap-1 cursor-pointer hover:text-agri-green transition">
                Publikasi <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              {/* Menu Tim Peneliti Aktif */}
              <Link to="/tim-peneliti" className="cursor-pointer text-agri-green transition">Tim Peneliti</Link>
            </nav>

            <div className="flex items-center space-x-3">
              <button className="w-9 h-9 bg-[#69bd45] hover:bg-green-600 text-white rounded-full flex items-center justify-center transition shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
              <button className="hidden sm:flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                <svg className="w-5 h-5 text-[#00a3e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                ID
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-[#023c27] text-white pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Tim Peneliti</h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Kolaborasi antara dosen dan mahasiswa Fakultas Matematika dan Ilmu Pengetahuan Alam, Universitas Negeri Medan dalam mengembangkan model sistem pendukung keputusan pertanian.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-20">
        
        {/* Dosen Peneliti */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 drop-shadow-sm">Tim Pengusul / Peneliti Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dosenPeneliti.map((dosen, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-20 h-20 mx-auto bg-green-100 text-agri-green rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{dosen.nama}</h3>
                <p className="text-sm font-semibold text-agri-green mb-2">{dosen.peran}</p>
                <p className="text-xs text-gray-500">{dosen.instansi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Asisten Peneliti (Mahasiswa) */}
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 drop-shadow-sm">Tim Asisten Peneliti</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {asistenPeneliti.map((asisten, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 flex-shrink-0 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">{asisten.nama}</h3>
                  <p className="text-xs font-medium text-blue-600 mt-1">{asisten.peran}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default TimPeneliti;