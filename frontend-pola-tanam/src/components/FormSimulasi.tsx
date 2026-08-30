import React, { useState } from 'react';
import type { ParameterSimulasi } from '../types/simulasi';

interface FormSimulasiProps {
  onSimulasi: (data: ParameterSimulasi) => void;
}

const FormSimulasi: React.FC<FormSimulasiProps> = ({ onSimulasi }) => {
  const [formData, setFormData] = useState<ParameterSimulasi>({
    luasLahan: 1,
    beta: 20,
    gamma: 15,
    polaTanam: 'rotasi',
  });

  const [isRunning, setIsRunning] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'polaTanam' ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRunning(true);
    // Simulate processing delay for visual feedback
    setTimeout(() => {
      onSimulasi(formData);
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-agri-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Parameter Model MILP
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Konfigurasi variabel untuk simulasi optimisasi pola tanam.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Luas Lahan (A) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Luas Lahan Total — <span className="font-normal text-gray-400">A (Hektar)</span>
          </label>
          <div className="relative">
            <input 
              type="number" 
              name="luasLahan" 
              value={formData.luasLahan || ''} 
              onChange={handleChange} 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-agri-green/30 focus:border-agri-green transition text-sm" 
              required 
              step="0.1" 
              min="0.1"
              placeholder="Masukkan luas lahan"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">Ha</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Total kapasitas lahan yang tersedia per bulan.</p>
        </div>

        {/* Beta (β) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Penurunan Produksi — <span className="font-normal text-gray-400">β (%)</span>
          </label>
          <div className="relative">
            <input 
              type="number" 
              name="beta" 
              value={formData.beta || ''} 
              onChange={handleChange} 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-agri-green/30 focus:border-agri-green transition text-sm" 
              required 
              step="1" 
              min="0" 
              max="100"
              placeholder="Masukkan persentase"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Penurunan hasil produksi akibat cuaca tidak normal (musim hujan).</p>
        </div>

        {/* Gamma (γ) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Kenaikan Biaya — <span className="font-normal text-gray-400">γ (%)</span>
          </label>
          <div className="relative">
            <input 
              type="number" 
              name="gamma" 
              value={formData.gamma || ''} 
              onChange={handleChange} 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-agri-green/30 focus:border-agri-green transition text-sm" 
              required 
              step="1" 
              min="0" 
              max="100"
              placeholder="Masukkan persentase"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Kenaikan biaya operasional akibat cuaca tidak normal.</p>
        </div>

        {/* Pola Tanam */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Pola Tanam
          </label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { value: 'tunggal', label: 'Tanaman Tunggal', desc: 'Satu jenis tanaman per periode' },
              { value: 'tumpangSari', label: 'Tumpang Sari', desc: 'Dua tanaman bersamaan' },
              { value: 'rotasi', label: 'Rotasi Tanaman', desc: 'Bergantian antar famili' },
            ].map(opt => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  formData.polaTanam === opt.value
                    ? 'border-agri-green bg-green-50/50 ring-1 ring-agri-green/20'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="polaTanam"
                  value={opt.value}
                  checked={formData.polaTanam === opt.value}
                  onChange={handleChange}
                  className="w-4 h-4 text-agri-green focus:ring-agri-green"
                />
                <div>
                  <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
                  <p className="text-xs text-gray-400">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-xs text-amber-700">
              <span className="font-bold">Catatan:</span> Data parameter tanaman (h<sub>i</sub>, c<sub>i</sub>, s<sub>i</sub>, l<sub>i</sub>) belum tersedia dari survei lapangan. Hasil simulasi saat ini menampilkan jadwal tanam berdasarkan durasi dan kendala famili.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isRunning}
            className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-sm flex items-center justify-center gap-2 ${
              isRunning 
                ? 'bg-gray-400 cursor-wait text-white'
                : 'bg-agri-green text-white hover:bg-green-700 hover:shadow-md active:scale-[0.98]'
            }`}
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menjalankan Solver MILP...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Jalankan Optimisasi
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSimulasi;