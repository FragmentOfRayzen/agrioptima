import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const [token, setToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const emailTerdaftar = location.state?.email || '';

  // Fungsi Verifikasi Token
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (!emailTerdaftar) {
      setErrorMsg('Akses tidak valid. Silakan lakukan registrasi ulang.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://agrioptima-backend-production.up.railway.app/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailTerdaftar, token }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || 'Token verifikasi tidak valid.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Verifikasi berhasil! Mengalihkan ke halaman login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (error) {
      console.error('Error saat verifikasi:', error);
      setErrorMsg('Gagal terhubung ke server. Pastikan Backend berjalan.');
      setLoading(false);
    }
  };

  // Fungsi Kirim Ulang OTP
  const handleResendOTP = async () => {
    setResendLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('https://agrioptima-backend-production.up.railway.app/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailTerdaftar }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || 'Gagal mengirim ulang OTP.');
      } else {
        setSuccessMsg('Kode OTP baru telah dikirimkan! Silakan cek kotak masuk atau folder spam email Anda.');
      }
    } catch (error) {
      console.error('Error kirim ulang:', error);
      setErrorMsg('Gagal terhubung ke server.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f9f6] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
        
        {/* Banner Sukses Pendaftaran */}
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-left flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-800">Pendaftaran Berhasil!</h4>
            <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
              Kode OTP 6-digit telah dikirimkan ke email Anda. Silakan cek Kotak Masuk atau folder <b>Spam / Promosi</b>.
            </p>
          </div>
        </div>

        <div className="mx-auto h-14 w-14 bg-green-100 text-agri-green rounded-full flex items-center justify-center mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Verifikasi Email</h2>
        <p className="text-sm text-gray-600 mb-6">
          Masukkan 6-digit kode token yang dikirim ke: <br/>
          <span className="font-bold text-agri-green text-base">{emailTerdaftar || 'email Anda'}</span>
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm text-center font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Kode Verifikasi (OTP)
            </label>
            <input
              type="text"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
              className="w-full text-center text-3xl tracking-[0.5em] font-mono px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-green/30 focus:border-agri-green transition text-gray-800 font-bold"
              placeholder="000000"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || token.length < 6}
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-agri-green hover:bg-green-700 focus:outline-none transition-transform transform active:scale-95"
          >
            {loading ? 'Memverifikasi...' : 'Konfirmasi & Aktifkan Akun'}
          </button>
        </form>

        {/* TOMBOL KIRIM ULANG */}
        <div className="mt-8 border-t border-gray-100 pt-5">
          <p className="text-xs text-gray-500 mb-2">
            Tidak menerima email atau kode kadaluarsa?
          </p>
          <button 
            onClick={handleResendOTP}
            disabled={resendLoading || !emailTerdaftar}
            className="text-sm font-bold text-agri-green hover:text-green-800 hover:underline transition-colors focus:outline-none disabled:opacity-50"
          >
            {resendLoading ? 'Mengirim ulang...' : 'Kirim Ulang Kode OTP'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default VerifyEmail;