// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // 1. Import Landing Page
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/dashboard';
import Metodologi from './pages/metodologi';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import TimPeneliti from './pages/TimPeneliti';
import TentangRiset from './pages/TentangRiset';
import UbahPassword from './pages/UbahPassword';
import Profil from './pages/Profil';
import Riwayat from './pages/Riwayat';
import Katalog from './pages/Katalog';
import Panduan from './pages/Panduan';
function App() {
  return (
    <Router>
      <Routes>
        {/* 2. Jadikan Landing Page sebagai halaman utama (/) */}
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/metodologi" element={<Metodologi />} />
        <Route path="/tim-peneliti" element={<TimPeneliti />} />
        <Route path="/tentang-riset" element={<TentangRiset />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/ubah-password" element={<UbahPassword />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/katalog" element={<Katalog />} />
        <Route path="/panduan" element={<Panduan />} />
        {/* 3. Jika URL tidak ditemukan, arahkan kembali ke utama */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;