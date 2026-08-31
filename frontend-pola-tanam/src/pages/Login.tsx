import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [notVerifiedEmail, setNotVerifiedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Mengirim kredensial ke API Backend
      const response = await fetch('https://agrioptima-backend-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Jika login ditolak (password salah, email tidak ada, belum verifikasi)
        setErrorMsg(data.message);
        setLoading(false);
        return;
      }

      // 2. Jika sukses, simpan JWT (ID Card) ke LocalStorage browser
      localStorage.setItem('agrioptima_token', data.token);
      localStorage.setItem('agrioptima_user', JSON.stringify(data.user));

      // 3. Arahkan ke halaman utama sistem (Dashboard)
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error menghubungkan ke server:', error);
      setErrorMsg('Gagal terhubung ke server. Pastikan Backend berjalan.');
      setLoading(false);
    }
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
              disabled={loading}
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
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-agri-green hover:bg-green-700 focus:outline-none transition-transform transform hover:-translate-y-0.5 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Mengautentikasi...' : 'Masuk Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">

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
