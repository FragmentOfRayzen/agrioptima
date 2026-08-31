import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [nama, setNama] = useState('');
  const [instansi, setInstansi] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi sederhana Frontend
    if (password !== konfirmasiPassword) {
      setErrorMsg('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password harus terdiri dari minimal 6 karakter.');
      return;
    }

    try {
      // 1. Mengirim data ke Backend Node.js menggunakan fetch()
      const response = await fetch('https://agrioptima-backend-production.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama, instansi, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Jika backend menolak (misal: email sudah ada)
        setErrorMsg(data.message);
        return;
      }

      // 2. Jika sukses, arahkan ke halaman verifikasi
      alert('Pendaftaran tahap 1 berhasil! Token telah dikirim ke email Anda.');
      navigate('/verify', { state: { email: email } }); 
      
    } catch (error) {
      console.error('Error menghubungkan ke server:', error);
      setErrorMsg('Gagal terhubung ke server. Pastikan Backend berjalan.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f9f6] font-sans">
      
      {/* ================= HERO BANNER SECTION (Sesuai Referensi) ================= */}
      <section className="relative bg-[#023c27] pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
          {/* Teks Kiri */}
          <div className="lg:w-1/2 text-left">
            <p className="text-[#00a3e0] text-sm font-bold tracking-widest uppercase mb-3">
              Pendaftaran Peneliti
            </p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Daftarkan diri Anda untuk akses <span className="text-green-400">teknologi pertanian pintar</span>
            </h1>
            <p className="text-green-100 text-lg max-w-lg">
              Bergabunglah dengan platform sistem pendukung keputusan kami untuk mulai mengoptimalkan pola tanam dan hasil observasi lapangan Anda.
            </p>
          </div>

          {/* Ilustrasi Vektor Kanan (Abstrak Daun & Geometris seperti referensi) */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-end opacity-90">
            <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Lingkaran Bergaris */}
              <circle cx="150" cy="100" r="60" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="150" cy="100" r="40" stroke="#69bd45" strokeWidth="1" />
              {/* Kotak Bergaris */}
              <rect x="230" y="40" width="80" height="120" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 4" />
              {/* Ikon Daun Besar */}
              <path d="M300 160C300 160 270 110 320 60C370 10 390 10 390 10C390 10 390 30 340 80C290 130 300 160 300 160Z" fill="#69bd45" />
              <path d="M345 85L305 145" stroke="#023c27" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Ornamen Garis Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:40px_100%]"></div>
        </div>
      </section>

      {/* ================= FORM REGISTRASI LEBAR ================= */}
      {/* Menggunakan margin negatif (-mt-20) agar kotak sedikit menimpa area hijau di atasnya */}
      <section className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-100">
          
          {/* Header Register */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Buat Akun AgriOptima</h2>
            <p className="mt-2 text-sm text-gray-500">Silakan lengkapi formulir pendaftaran di bawah ini.</p>
          </div>

          {/* Pesan Error */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r text-sm font-medium">
              {errorMsg}
            </div>
          )}

          {/* Form Register - Dibuat Grid (Menyamping) */}
          <form className="space-y-6" onSubmit={handleRegister}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Nama */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-agri-green bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Contoh: Budi Santoso"
                  required
                />
              </div>

              {/* Input Instansi */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Instansi / Universitas</label>
                <input
                  type="text"
                  value={instansi}
                  onChange={(e) => setInstansi(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-agri-green bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Contoh: Universitas Negeri Medan"
                  required
                />
              </div>
            </div>

            {/* Input Email (Full Width) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-agri-green bg-gray-50 focus:bg-white transition-colors"
                placeholder="email@instansi.ac.id"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-agri-green bg-gray-50 focus:bg-white transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Input Konfirmasi Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Konfirmasi Password</label>
                <input
                  type="password"
                  value={konfirmasiPassword}
                  onChange={(e) => setKonfirmasiPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-agri-green bg-gray-50 focus:bg-white transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Tombol Register */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-agri-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-agri-green transition-transform transform hover:-translate-y-0.5"
              >
                Daftar Sekarang
              </button>
            </div>
          </form>

          {/* Tautan kembali ke Login */}
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="font-bold text-agri-green hover:text-green-800 transition-colors">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div> 
      </section>
    </div>
  );
};

export default Register;
