import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State untuk mengontrol buka/tutup menu profil
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('Peneliti');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mengambil nama pengguna dari sesi login (localStorage) saat komponen dimuat
  useEffect(() => {
    const userDataString = localStorage.getItem('agrioptima_user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData && userData.nama) {
          setUserName(userData.nama);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Fungsi untuk menutup dropdown jika pengguna mengklik di luar area menu
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fungsi Logika Logout
  const handleLogout = () => {
    localStorage.removeItem('agrioptima_token');
    localStorage.removeItem('agrioptima_user');
    navigate('/');
  };

  // Fungsi pembuat Inisial Nama (Misal: "Budi Santoso" menjadi "BS")
  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Daftar Menu Internal
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Riwayat Simulasi', path: '/riwayat' },
    { name: 'Katalog Komoditas', path: '/katalog' },
    { name: 'Panduan Sistem', path: '/panduan' },
  ];

  return (
    <header className="bg-[#023c27] text-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* ================= KIRI: LOGO ================= */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="font-extrabold text-2xl tracking-tight text-white focus:outline-none">
              Agri<span className="text-[#69bd45]">Optima</span>
            </Link>
          </div>

          {/* ================= TENGAH: MENU UTAMA ================= */}
          <nav className="hidden md:flex space-x-1 lg:space-x-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-sm ring-1 ring-white/30' 
                      : 'text-green-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ================= KANAN: PROFIL DROPDOWN ================= */}
          <div className="flex items-center relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 focus:outline-none p-1 rounded-full hover:bg-white/5 transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none text-white">{userName}</p>
                <p className="text-xs text-green-300 mt-1 font-medium">Peneliti Aktif</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#69bd45] flex items-center justify-center text-white font-bold shadow-inner border-2 border-white/20">
                {getInitials(userName)}
              </div>
              <svg 
                className={`w-4 h-4 text-green-200 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* Isi Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-14 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 transform origin-top-right transition-all z-50">
                {/* Khusus layar kecil (mobile), tampilkan nama di dalam menu */}
                <div className="px-4 py-3 border-b border-gray-50 mb-1 sm:hidden">
                  <p className="text-sm font-bold text-gray-800 truncate">{userName}</p>
                  <p className="text-xs text-agri-green">Peneliti Aktif</p>
                </div>

                <Link 
                  to="/profil" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 font-medium hover:bg-green-50 hover:text-agri-green transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Profil Saya
                  </div>
                </Link>

                <Link 
                  to="/ubah-password" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 font-medium hover:bg-green-50 hover:text-agri-green transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                    Ubah Password
                  </div>
                </Link>

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Keluar (Logout)
                  </div>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;