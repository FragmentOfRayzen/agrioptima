import React from 'react';
import { Link } from 'react-router-dom';

const TentangRiset: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* ================= HEADER NAVBAR (Publik) ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm font-sans">
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
              <Link to="/tentang-riset" className="group relative flex items-center gap-1 cursor-pointer text-agri-green transition">
                Tentang Riset <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              <Link to="/metodologi" className="cursor-pointer hover:text-agri-green transition">Metodologi</Link>
              <Link to="/login" className="cursor-pointer hover:text-agri-green transition">Simulasi Model</Link>
              <div className="group relative flex items-center gap-1 cursor-pointer hover:text-agri-green transition">
                Publikasi <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <Link to="/tim-peneliti" className="cursor-pointer hover:text-agri-green transition">Tim Peneliti</Link>
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

      {/* ================= HERO BANNER ================= */}
      <section className="relative pt-36 pb-28 px-4 sm:px-6 lg:px-8 bg-[#023c27] overflow-hidden">
        {/* Gambar Background dengan Overlay (Menggunakan URL placeholder pemandangan pertanian) */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595841696677-647247dbaf18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#023c27] to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-green-900/50 border border-green-500/30 text-green-300 text-sm font-bold tracking-wider uppercase mb-4 backdrop-blur-sm">
            Latar Belakang & Tujuan
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white tracking-tight drop-shadow-md">
            Tentang Riset AgriOptima
          </h1>
          <p className="text-lg md:text-xl text-green-50 leading-relaxed font-light drop-shadow">
            Memahami urgensi adaptasi perubahan iklim di sektor pertanian melalui pendekatan pemodelan matematika untuk mengamankan ketahanan pangan dan ekonomi petani.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white -mt-12 rounded-2xl shadow-xl relative z-20 mb-20">
        
        {/* 1. Latar Belakang */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">1. Latar Belakang Permasalahan</h2>
          </div>
          <div className="pl-13 space-y-4 text-gray-600 leading-relaxed text-lg border-l-2 border-gray-100 ml-5 pl-8">
            <p>
              Sektor pertanian di Indonesia sangat rentan terhadap perubahan iklim dan cuaca ekstrem.
            </p>
            <p>
              Petani di Desa Saribudolok secara khusus sering menghadapi anomali cuaca berupa curah hujan tinggi yang terjadi secara terus-menerus.
            </p>
            <p>
              Kondisi cuaca ekstrem tersebut mengakibatkan kelembaban berlebih yang membuat tanaman membusuk dan berujung pada gagal panen. Akibatnya, petani mengalami kesulitan besar dalam merencanakan pola tanam yang tepat dan adaptif.
            </p>
          </div>
        </section>

        <hr className="border-gray-100 mb-16" />

        {/* 2. Rumusan & Tujuan */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#00a3e0]/10 text-[#00a3e0] flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">2. Rumusan & Tujuan Penelitian</h2>
          </div>
          <div className="bg-[#f0f9fc] rounded-xl p-8 border border-[#e1f3f8]">
            <ul className="space-y-4 text-gray-700 text-lg">
              <li className="flex gap-4">
                <span className="text-[#00a3e0] mt-1 font-bold">✓</span>
                <span>Penelitian ini bertujuan membangun model matematika pola tanam beberapa jenis tanaman pada kondisi cuaca ekstrem.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#00a3e0] mt-1 font-bold">✓</span>
                <span>Tujuan akhirnya adalah untuk mengoptimalkan pendapatan petani di Desa Saribudolok dengan mempertimbangkan kondisi iklim, ketersediaan sumber daya, dan keterbatasan operasional di lapangan.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Profil Wilayah */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-agri-green/10 text-agri-green flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">3. Profil Wilayah Studi Kasus</h2>
          </div>
          <div className="pl-13 text-gray-600 leading-relaxed text-lg border-l-2 border-gray-100 ml-5 pl-8 space-y-4">
            <p>
              Desa Saribudolok terletak di Kecamatan Silimakuta, Kabupaten Simalungun, Sumatera Utara yang berada pada ketinggian 1.200 - 1.400 mdpl.
            </p>
            <p>
              Wilayah ini memiliki suhu sejuk dan curah hujan tinggi yang secara alamiah sangat mendukung sektor pertanian hortikultura lahan kering (seperti kentang, kubis, cabai, dan tomat). Namun, potensi besar ini menuntut adaptasi pola tanam yang sangat cerdas untuk menghindari risiko iklim.
            </p>
          </div>
        </section>

        {/* 4. Kontribusi & Manfaat (CARDS) */}
        <section>
          <div className="text-center mb-10">
            <span className="text-sm font-bold text-agri-green uppercase tracking-wider">Output Penelitian</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Kontribusi & Manfaat</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Hasil optimisasi dari pemodelan ini dirancang untuk memberikan dampak positif yang nyata bagi berbagai pemangku kepentingan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card Petani */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-green-100 text-agri-green rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Bagi Petani</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Memberikan alternatif solusi berbasis data untuk mengurangi risiko gagal panen dan secara langsung meningkatkan kesejahteraan ekonomi keluarga petani.
              </p>
            </div>

            {/* Card Pemerintah */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-blue-100 text-[#00a3e0] rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Bagi Pemerintah</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Menjadi bahan pertimbangan strategis dalam penyusunan kebijakan pengembangan daerah dan pertanian yang adaptif terhadap perubahan iklim.
              </p>
            </div>

            {/* Card Akademisi */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Bagi Akademisi</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Menjadi referensi dan sumber pembelajaran yang kaya terkait penerapan matematika terapan, optimisasi, dan riset operasi pada kasus nyata.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default TentangRiset;