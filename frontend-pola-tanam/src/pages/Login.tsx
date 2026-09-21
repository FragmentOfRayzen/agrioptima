import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [notVerifiedEmail, setNotVerifiedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setNotVerifiedEmail('');

    try {
      const response = await fetch('https://agrioptima-backend-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          setNotVerifiedEmail(email);
          setErrorMsg('Akun belum diverifikasi. Silakan cek email Anda untuk kode OTP.');
        } else {
          setErrorMsg(data.message);
        }
        setLoading(false);
        return;
      }

      localStorage.setItem('agrioptima_token', data.token);
      localStorage.setItem('agrioptima_user', JSON.stringify(data.user));
      navigate('/dashboard');

    } catch (error) {
      console.error('Error menghubungkan ke server:', error);
      setErrorMsg('Gagal terhubung ke server. Pastikan Backend berjalan.');
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setDemoLoading(true);
    // Simpan data demo ke localStorage agar seluruh halaman mengenalinya
    const demoUser = {
      id: 'demo',
      nama: 'Pengguna Demo',
      email: 'demo@agrioptima.id',
      instansi: 'Demo - AgriOptima',
    };
    localStorage.setItem('agrioptima_token', 'demo_token_agrioptima_2024');
    localStorage.setItem('agrioptima_user', JSON.stringify(demoUser));
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-agri-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">

        {/* Header Login */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <span className="font-extrabold text-3xl text-[#00a3e0] tracking-tight">
              Agri<span className="text-agri-green">Optima</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Masuk ke Sistem</h2>
          <p className="mt-2 text-sm text-gray-600">Sistem Pendukung Keputusan Pola Tanam</p>
        </div>

        {/* Pesan Error */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center font-medium">
            {errorMsg}
            {notVerifiedEmail && (
              <button
                type="button"
                onClick={() => navigate('/verify', { state: { email: notVerifiedEmail } })}
                className="block w-full mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg py-2 px-4 transition-colors"
              >
                Masukkan Kode OTP Sekarang →
              </button>
            )}
          </div>
        )}

        {/* Form Login */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Peneliti</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-agri-green bg-gray-50 focus:bg-white transition-colors"
              placeholder="email@instansi.ac.id"
              required
              disabled={loading || demoLoading}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-xs font-semibold text-agri-green hover:text-green-800">
                Lupa password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-agri-green bg-gray-50 focus:bg-white transition-colors"
              placeholder="••••••••••"
              required
              disabled={loading || demoLoading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || demoLoading}
            className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-agri-green hover:bg-green-700 focus:outline-none transition-transform transform hover:-translate-y-0.5 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Mengautentikasi...' : 'Masuk Dashboard'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">atau</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Tombol Mode Demo */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading || demoLoading}
          className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg border-2 border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-sm transition-all transform hover:-translate-y-0.5 shadow-sm ${
            demoLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {demoLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Memuat Mode Demo...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Coba Mode Demo (Tanpa Registrasi)
            </>
          )}
        </button>
        <p className="text-xs text-center text-gray-400 mt-2">
          Mode demo hanya untuk keperluan presentasi. Data tidak tersimpan.
        </p>

        {/* Footer */}
        <div className="mt-6 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            Belum tergabung dalam penelitian?{' '}
            <Link to="/register" className="font-bold text-agri-green hover:text-green-800 transition-colors">
              Daftar Peneliti
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
