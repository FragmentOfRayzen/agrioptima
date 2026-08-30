import React from 'react';
import { Link } from 'react-router-dom';
import videoBackground from './Video_Lahan.mp4'; 
import logoUnimed from './logo-unimed.png';

const LandingPage: React.FC = () => {
  return (
    <div className="w-full font-sans text-gray-800 bg-white">
      
      {/* ================= HEADER NAVBAR ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md font-sans">
        {/* Top Bar Gelap */}
        <div className="bg-[#023c27] text-white text-xs md:text-sm py-2.5 text-center font-medium">
          Penelitian Terapan — Fakultas MIPA, Universitas Negeri Medan. <span className="underline cursor-pointer font-bold hover:text-green-300">Desa Saribudolok, Kab. Simalungun</span>
        </div>
        
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <span className="font-extrabold text-3xl text-[#00a3e0] tracking-tight">
                Agri<span className="text-agri-green">Optima</span>
              </span>
            </div>

            {/* Nav Menu */}
            <nav className="hidden lg:flex space-x-8 text-[15px] font-semibold text-gray-700">
              <div className="cursor-pointer hover:text-agri-green transition">
                Beranda
              </div>
              <Link to="/tentang-riset" className="group relative flex items-center gap-1 cursor-pointer hover:text-agri-green transition">
                Tentang Riset <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              <Link to="/metodologi" className="group relative flex items-center gap-1 cursor-pointer hover:text-agri-green transition">
                Metodologi <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              <Link to="/login" className="cursor-pointer text-agri-green hover:text-green-800 transition">
                Simulasi Model
              </Link>
              <div className="group relative flex items-center gap-1 cursor-pointer hover:text-agri-green transition">
                Publikasi <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
             <Link to="/tim-peneliti" className="cursor-pointer hover:text-agri-green transition">
                Tim Peneliti
            </Link>
            </nav>

            {/* Action Buttons */}
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
      <section className="relative h-screen w-full overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src={videoBackground} type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center text-white pt-28">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <svg className="w-5 h-5 text-agri-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <span className="text-sm font-semibold tracking-wider uppercase">Pemodelan Matematika & Optimisasi</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-2xl leading-tight max-w-5xl">
            Optimisasi Pola Tanam Pertanian dengan Faktor Cuaca Ekstrem
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-3xl mb-4 text-gray-300 drop-shadow-md leading-relaxed">
            Studi Kasus: Desa Saribudolok, Kecamatan Silimakuta, Kabupaten Simalungun, Sumatera Utara
          </p>
          <p className="text-sm md:text-base max-w-2xl mb-10 text-gray-400 drop-shadow-md leading-relaxed">
            Menggunakan model Mixed Integer Linear Programming (MILP) untuk menentukan pola tanam optimal 
            10 jenis tanaman hortikultura pada lahan dataran tinggi.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/login" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-agri-green rounded-full hover:bg-green-700 shadow-[0_0_20px_rgba(45,106,79,0.5)] hover:shadow-[0_0_30px_rgba(45,106,79,0.8)] hover:-translate-y-1">
              Mulai Simulasi Model
              <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
            <a href="/metodologi" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white/80 hover:text-white transition-all border border-white/30 rounded-full hover:border-white/60 backdrop-blur-sm">
              Pelajari Metodologi
            </a>
          </div>
        </div>
      </section>

      {/* ================= SECTION STATISTIK ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-agri-green mb-4">Studi Kasus: Desa Saribudolok</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Data lapangan dari Kecamatan Silimakuta, Kabupaten Simalungun — daerah dataran tinggi pertanian hortikultura di Sumatera Utara.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="border-t-4 border-agri-green pt-6">
              <h3 className="text-5xl font-extrabold text-gray-900 mb-2">10</h3>
              <p className="text-gray-600 font-medium">Jenis Tanaman Dianalisis</p>
            </div>
            <div className="border-t-4 border-agri-green pt-6">
              <h3 className="text-5xl font-extrabold text-gray-900 mb-2">7</h3>
              <p className="text-gray-600 font-medium">Famili Botani Berbeda</p>
            </div>
            <div className="border-t-4 border-agri-green pt-6">
              <h3 className="text-5xl font-extrabold text-gray-900 mb-2">12</h3>
              <p className="text-gray-600 font-medium">Bulan Periode Analisis</p>
            </div>
            <div className="border-t-4 border-agri-green pt-6">
              <h3 className="text-5xl font-extrabold text-gray-900 mb-2">1.4<span className="text-3xl">K</span></h3>
              <p className="text-gray-600 font-medium">Meter di Atas Permukaan Laut</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION TANAMAN ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Komoditas Pertanian Saribudolok</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">10 jenis tanaman yang dibudidayakan dan dianalisis dalam model optimisasi.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { nama: 'Tomat', famili: 'Solanaceae', emoji: '🍅', warna: 'from-red-50 to-rose-50 border-red-100' },
              { nama: 'Cabai', famili: 'Solanaceae', emoji: '🌶️', warna: 'from-orange-50 to-amber-50 border-orange-100' },
              { nama: 'Kubis', famili: 'Brassicaceae', emoji: '🥬', warna: 'from-green-50 to-emerald-50 border-green-100' },
              { nama: 'Kentang', famili: 'Solanaceae', emoji: '🥔', warna: 'from-yellow-50 to-amber-50 border-yellow-100' },
              { nama: 'Bawang Merah', famili: 'Amaryllidaceae', emoji: '🧅', warna: 'from-pink-50 to-rose-50 border-pink-100' },
              { nama: 'Sawi Putih', famili: 'Brassicaceae', emoji: '🥗', warna: 'from-lime-50 to-green-50 border-lime-100' },
              { nama: 'Wortel', famili: 'Apiaceae', emoji: '🥕', warna: 'from-orange-50 to-red-50 border-orange-100' },
              { nama: 'Jagung', famili: 'Poaceae', emoji: '🌽', warna: 'from-yellow-50 to-amber-50 border-yellow-100' },
              { nama: 'Kopi', famili: 'Rubiaceae', emoji: '☕', warna: 'from-amber-50 to-yellow-50 border-amber-100' },
              { nama: 'Jeruk', famili: 'Rutaceae', emoji: '🍊', warna: 'from-orange-50 to-yellow-50 border-orange-100' },
            ].map(t => (
              <div key={t.nama} className={`bg-gradient-to-br ${t.warna} rounded-xl p-5 border hover:shadow-lg transition-all hover:-translate-y-1 cursor-default`}>
                <span className="text-3xl mb-3 block">{t.emoji}</span>
                <h3 className="font-bold text-gray-800 text-sm">{t.nama}</h3>
                <p className="text-xs text-gray-500 italic">{t.famili}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION METODOLOGI ================= */}
      <section id="metodologi" className="relative py-32 bg-gray-900 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-agri-green/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Pendekatan Mixed Integer Linear Programming (MILP)
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                Model MILP digunakan untuk memaksimalkan keuntungan bersih petani dengan mempertimbangkan kendala cuaca ekstrem, 
                keterbatasan lahan, rotasi tanaman berdasarkan famili botani, dan pola tumpang tindih tanam.
              </p>
              <div className="space-y-3 text-gray-300 text-sm">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                  <span><strong className="text-white">Fungsi Tujuan:</strong> max Z = Σ(PB<sub>ij</sub> - BP<sub>ij</sub>)</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                  <span><strong className="text-white">Variabel Keputusan:</strong> y<sub>ij</sub> (biner), P<sub>ij</sub> (kontinu)</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                  <span><strong className="text-white">Kendala:</strong> Cuaca, Luas Lahan, Tanam Tunggal, Rotasi Famili</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start lg:items-end space-y-5">
              <div className="bg-agri-green/80 backdrop-blur-md border border-green-400/50 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:-translate-x-3 transition-transform duration-300">
                10 Tanaman × 12 Bulan
              </div>
              <div className="bg-[#4ade80]/80 backdrop-blur-md border border-green-300/50 text-green-900 font-bold py-3 px-8 rounded-full shadow-lg transform hover:-translate-x-3 transition-transform duration-300">
                7 Famili untuk Kendala Rotasi
              </div>
              <div className="bg-green-600/80 backdrop-blur-md border border-green-400/50 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:-translate-x-3 transition-transform duration-300">
                3 Pola: Tunggal / Tumpang Sari / Rotasi
              </div>
              <div className="bg-amber-500/80 backdrop-blur-md border border-amber-300/50 text-amber-900 font-bold py-3 px-8 rounded-full shadow-lg transform hover:-translate-x-3 transition-transform duration-300">
                Faktor Cuaca: β &amp; γ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION FITUR ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Permasalahan yang Diselesaikan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Model MILP menyelesaikan empat kendala utama dalam optimisasi pertanian dataran tinggi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-agri-green mb-3">Kendala Cuaca Ekstrem</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Curah hujan ≥ 200mm/bulan (Agustus–Desember) menurunkan produksi sebesar β% dan menaikkan biaya γ%.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-agri-green">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-agri-green mb-3">Keterbatasan Luas Lahan</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Total lahan yang sedang digunakan per bulan tidak boleh melebihi kapasitas A, diatur oleh fungsi δ<sub>ijb</sub>.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-6 text-yellow-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-agri-green mb-3">Tanam Tunggal per Tahun</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Setiap jenis tanaman hanya boleh ditanam satu kali per tahun: Σy<sub>ij</sub> ≤ 1, mendorong variasi tanaman optimal.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6 text-purple-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-agri-green mb-3">Rotasi Berdasarkan Famili</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Tanaman dari famili botani yang sama (misal Solanaceae) tidak boleh ditanam berurutan untuk menjaga kesuburan tanah.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER & CTA ================= */}
      <footer className="bg-[#023c27] text-white pt-16 pb-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-green-800/50 pb-12 mb-12">
            <div className="mb-8 md:mb-0 max-w-lg">
              <h2 className="text-3xl font-bold mb-2">Bergabunglah <span className="text-green-400 font-normal">dengan</span><br/>Buletin <span className="font-normal">Kami</span></h2>
            </div>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <input 
                type="email" 
                placeholder="Email" 
                className="px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 min-w-[300px]"
              />
              <button className="bg-[#00a3e0] hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-full transition-colors whitespace-nowrap">
                Bergabung Sekarang
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-sm text-green-100/80">
            <div className="lg:col-span-2">
              <img src={logoUnimed} alt="Logo Unimed" className="h-20 mb-6 object-contain" />
              <div className="border-t-2 border-green-500 w-12 mb-6"></div>
              <p className="mb-1 font-bold text-white">Pemodelan Matematika & Optimisasi Pola Tanam</p>
              <p className="leading-relaxed">
                Dengan Faktor Cuaca Ekstrem di <br />
                Desa Saribudolok, Kab. Simalungun,<br />
                Sumatera Utara.<br />
                Universitas Negeri Medan.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-base">Tahap Penelitian</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition">Observasi Lapangan</a></li>
                <li><a href="#" className="hover:text-white transition">Pemodelan MILP</a></li>
                <li><a href="#" className="hover:text-white transition">Penyelesaian & Solver</a></li>
                <li><a href="#" className="hover:text-white transition">Uji Sensitivitas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-base">Publikasi</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition">Laporan Kemajuan</a></li>
                <li><a href="#" className="hover:text-white transition">Artikel Prosiding</a></li>
                <li><a href="#" className="hover:text-white transition">Jurnal Scopus</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-base">Tautan Cepat</h4>
              <ul className="space-y-4">
                <li><a href="/login" className="hover:text-white transition">Masuk Sistem (Login)</a></li>
                <li><a href="/register" className="hover:text-white transition">Daftar Akun Peneliti</a></li>
                <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-20 flex flex-col md:flex-row items-end justify-between relative">
            <div 
              className="text-[6rem] md:text-[10rem] font-black leading-none tracking-tighter text-transparent select-none pointer-events-none" 
              style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.15)' }}
            >
              UNIMED
            </div>
            
            <div className="pb-4 text-xs text-green-400/60 flex items-center gap-4">
              <span>© 2026 AgriOptima Research. All rights reserved.</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default LandingPage;