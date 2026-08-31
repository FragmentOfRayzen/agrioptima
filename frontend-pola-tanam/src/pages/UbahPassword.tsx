import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const UbahPassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      return setErrorMsg('Password baru dan konfirmasi tidak cocok!');
    }
    if (newPassword.length < 6) {
      return setErrorMsg('Password baru minimal 6 karakter.');
    }

    const token = localStorage.getItem('agrioptima_token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://agrioptima-backend-production.up.railway.app/api/auth/change-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.message);
      } else {
        setMessage('Password berhasil diperbarui! Silakan gunakan password baru ini untuk sesi berikutnya.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setErrorMsg('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ubah Password</h2>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {errorMsg && <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">{errorMsg}</div>}
          {message && <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-medium">{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password Saat Ini</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-agri-green bg-gray-50 focus:bg-white transition-colors"
                required
              />
            </div>
            
            <hr className="border-gray-100" />
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password Baru</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-agri-green bg-gray-50 focus:bg-white transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Konfirmasi Password Baru</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-agri-green bg-gray-50 focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-agri-green hover:bg-green-700 text-white font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UbahPassword;