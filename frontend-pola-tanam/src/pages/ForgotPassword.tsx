import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setMessage('');

    try {
      const response = await fetch('https://agrioptima-backend-production.up.railway.app/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setErrorMsg('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-agri-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Lupa Password?</h2>
          <p className="mt-2 text-sm text-gray-600">Masukkan email Anda untuk menerima link pemulihan.</p>
        </div>

        {errorMsg && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center font-medium">{errorMsg}</div>}
        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm text-center font-medium">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Terdaftar</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri-green focus:border-agri-green bg-gray-50"
              placeholder="email@instansi.ac.id"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg text-white font-bold bg-agri-green hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Mengirim...' : 'Kirim Link Reset'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-agri-green transition">
            &larr; Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;