import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const [token, setToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false); // State baru untuk tombol kirim ulang
  
  const navigate = useNavigate();
  const location = useLocation();

  const emailTerdaftar = location.state?.email || '';

  // Fungsi Verifikasi (Tetap sama)
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!emailTerdaftar) {
      setErrorMsg('Akses tidak valid. Silakan lakukan registrasi ulang.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailTerdaftar, token }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message);
        setLoading(false);
        return;
      }

      alert('Verifikasi berhasil! Akun Anda telah aktif. Silakan masuk ke sistem.');
      navigate('/login');

    } catch (error) {
      console.error('Error saat verifikasi:', error);
      setErrorMsg('Gagal terhubung ke server. Pastikan Backend berjalan.');
      setLoading(false);
    }
  };

  // Fungsi BARU: Kirim Ulang OTP
  const handleResendOTP = async () => {
    setResendLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailTerdaftar }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message);
      } else {
        alert('Token baru berhasil dikirim! Silakan cek terminal Backend Anda.');
      }
    } catch (error) {
      console.error('Error kirim ulang:', error);
      setErrorMsg('Gagal terhubung ke server.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-agri-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
        
        <div className="mx-auto h-12 w-12 bg-green-100 text-agri-green rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Verifikasi Email</h2>
        <p className="text-sm text-gray-600 mb-6">
          Kami telah mengirimkan 6-digit kode token ke email <br/>
          <span className="font-semibold text-agri-green">{emailTerdaftar || 'email Anda'}</span>
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <input
              type="text"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
              className="mt-1 w-full text-center text-2xl tracking-widest px-4 py-3 border border-gray-300 rounded-md focus:ring-agri-green focus:border-agri-green"
              placeholder="••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-agri-green hover:bg-green-700 focus:outline-none transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Memverifikasi...' : 'Konfirmasi Token'}
          </button>
        </form>

        {/* TOMBOL KIRIM ULANG */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600">
            Tidak menerima token atau token kadaluarsa?{' '}
            <button 
              onClick={handleResendOTP}
              disabled={resendLoading || !emailTerdaftar}
              className="font-bold text-agri-green hover:text-green-800 transition-colors focus:outline-none"
            >
              {resendLoading ? 'Mengirim ulang...' : 'Kirim Ulang OTP'}
            </button>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default VerifyEmail;