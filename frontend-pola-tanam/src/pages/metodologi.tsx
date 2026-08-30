import React from 'react';
import { Link } from 'react-router-dom';

const Metodologi: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* ================= HEADER NAVBAR (Navbar Publik) ================= */}
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
              <Link to="/">
                <span className="font-extrabold text-3xl text-[#00a3e0] tracking-tight">
                  Agri<span className="text-agri-green">Optima</span>
                </span>
              </Link>
            </div>

            {/* Nav Menu */}
            <nav className="hidden lg:flex space-x-8 text-[15px] font-semibold text-gray-700">
              <Link to="/" className="cursor-pointer hover:text-agri-green transition">
                Beranda
              </Link>
              <Link to="/tentang-riset" className="group relative flex items-center gap-1 cursor-pointer hover:text-agri-green transition">
  Tentang Riset <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
</Link>
              <Link to="/metodologi" className="group relative flex items-center gap-1 cursor-pointer text-agri-green transition">
                Metodologi <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              <Link to="/login" className="cursor-pointer hover:text-agri-green transition">
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

      {/* Hero Section */}
      <section className="bg-[#023c27] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Metodologi Penelitian</h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Struktur dan alur tahapan penelitian yang digunakan dalam mengembangkan model optimisasi pola tanam pertanian menghadapi cuaca ekstrem.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white -mt-10 rounded-2xl shadow-xl relative z-10 mb-20">
        
        {/* Section 1: Pendekatan & Jenis Penelitian */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#00a3e0] mb-4 border-b pb-2">Pendekatan dan Jenis Penelitian</h2>
          <p className="mb-4 leading-relaxed">
            Penelitian ini menggunakan pendekatan kuantitatif dengan metode pemodelan matematika dalam mengoptimalkan operasional sistem pertanian dan pendapatan petani.
          </p>
          <p className="leading-relaxed">
            Jenis penelitian yang digunakan adalah penelitian deskriptif dan eksperimental. Penelitian deskriptif bertujuan untuk memberikan gambaran mengenai kondisi pertanian di Desa Saribudolok, Kabupaten Simalungun, Sumatera Utara. Sementara itu, penelitian eksperimental bertujuan untuk menerapkan model Optimisasi dan Riset Operasi pada sistem pertanian dan memperoleh solusi optimal melalui pemodelan matematika yang dibangun.
          </p>
        </section>

        {/* Section 2: Tempat & Waktu */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#00a3e0] mb-4 border-b pb-2">Tempat dan Waktu Penelitian</h2>
          <p className="leading-relaxed">
            Penelitian ini dilakukan di Desa Saribudolok, Kelurahan Saribudolok, Kecamatan Silimakuta, Kabupaten Simalungun, Provinsi Sumatera Utara. Penelitian ini berlangsung kurang lebih selama satu tahun.
          </p>
        </section>

        {/* Section 3: Data Penelitian */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#00a3e0] mb-4 border-b pb-2">Data Penelitian</h2>
          <p className="mb-4 leading-relaxed">
            Penelitian ini merupakan penelitian berbentuk studi kasus dengan pendekatan riset lapangan (Field Research) dan riset kepustakaan (Library Research). Data dalam penelitian ini terdiri dari:
          </p>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Data Primer (diperoleh langsung dari lapangan):</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Observasi langsung di lahan pertanian dilakukan untuk melihat kondisi tanaman, sistem irigasi, dan dampak cuaca ekstrem terhadap pertanian di desa tersebut.</li>
                <li>Wawancara dengan petani untuk melihat pola tanam dan pemilihan jenis tanaman serta jumlah produk pertanian yang dipasarkan. Data biaya operasional juga didapatkan melalui wawancara ini.</li>
                <li>Angket terbuka dilakukan untuk memperoleh nilai parameter dalam model yang akan dibangun meliputi: luas lahan pertanian, jenis tanaman, produksi tanaman per hektar, harga jual hasil panen, biaya produksi, serta pola tanam yang diterapkan.</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Data Sekunder (diperoleh dari sumber kepustakaan dan lembaga terkait):</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Data terkait cuaca di desa tersebut diperoleh dari BMKG Wilayah I Medan yang diakses secara online pada situs resmi BMKG.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Tahapan Pemodelan */}
        <section>
          <h2 className="text-2xl font-bold text-[#00a3e0] mb-6 border-b pb-2">Tahapan Pemodelan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-bold text-gray-900">Survei Literatur</h4>
                <p className="text-sm text-gray-600">Mengumpulkan literatur yang berkaitan dengan sistem pertanian, pola tanam, pemilihan tanaman, dan penerapan metode optimisasi matematika, khususnya Mixed Integer Linear Programming (MILP).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-bold text-gray-900">Survei Lapangan</h4>
                <p className="text-sm text-gray-600">Pengumpulan data dilakukan melalui observasi, wawancara dengan petani, penyebaran kuesioner, serta pengambilan data pendukung dari kantor desa atau instansi terkait di Desa Saribudolok.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-bold text-gray-900">Identifikasi Masalah</h4>
                <p className="text-sm text-gray-600">Identifikasi permasalahan pertanian yang berkaitan dengan pola tanam, pemilihan tanaman, kondisi cuaca, dan biaya operasional untuk menentukan fokus permasalahan yang akan dimodelkan.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">4</div>
              <div>
                <h4 className="font-bold text-gray-900">Skema Pemodelan Matematika</h4>
                <p className="text-sm text-gray-600">Menyusun kerangka pemodelan berdasarkan hasil identifikasi masalah, data lapangan, dan konsep teoritis yang relevan.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">5</div>
              <div>
                <h4 className="font-bold text-gray-900">Menentukan Variabel dan Parameter</h4>
                <p className="text-sm text-gray-600">Menentukan indeks, parameter, dan variabel keputusan (kontinu, integer, maupun mixed integer) yang digunakan dalam model.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">6</div>
              <div>
                <h4 className="font-bold text-gray-900">Fungsi Objektif dan Kendala</h4>
                <p className="text-sm text-gray-600">Fungsi objektif disusun untuk mengoptimalkan pola tanam dan meminimumkan biaya operasional, sedangkan fungsi kendala dibangun berdasarkan keterbatasan sumber daya dan kondisi cuaca.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">7</div>
              <div>
                <h4 className="font-bold text-gray-900">Membangun Model Matematika</h4>
                <p className="text-sm text-gray-600">Merumuskan model matematika Mixed Integer Linear Programming (MILP) berdasarkan fungsi objektif dan fungsi kendala.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">8</div>
              <div>
                <h4 className="font-bold text-gray-900">Simulasi Model Optimisasi</h4>
                <p className="text-sm text-gray-600">Model matematika diselesaikan menggunakan bantuan perangkat lunak Python untuk memperoleh solusi optimal.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">9</div>
              <div>
                <h4 className="font-bold text-gray-900">Sensitivitas Parameter</h4>
                <p className="text-sm text-gray-600">Analisis sensitivitas dilakukan untuk mengetahui pengaruh perubahan parameter terhadap hasil optimisasi.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">10</div>
              <div>
                <h4 className="font-bold text-gray-900">Analisis Hasil Optimisasi</h4>
                <p className="text-sm text-gray-600">Menganalisis hasil simulasi dan analisis sensitivitas untuk mengevaluasi solusi optimal yang diperoleh dari model.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">11</div>
              <div>
                <h4 className="font-bold text-gray-900">Pengembangan WEB</h4>
                <p className="text-sm text-gray-600">Membangun suatu produk penelitian terapan yaitu WEB terkait pengambilan keputusan pola tanam dan pemilihan tanaman berdasarkan faktor cuaca.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">12</div>
              <div>
                <h4 className="font-bold text-gray-900">Kesimpulan dan Saran</h4>
                <p className="text-sm text-gray-600">Menarik kesimpulan berdasarkan hasil penelitian serta memberikan rekomendasi untuk pengembangan sistem pertanian dan penelitian selanjutnya.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Metodologi;