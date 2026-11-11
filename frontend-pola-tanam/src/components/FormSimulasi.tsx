import React, { useState } from 'react';
import type { ParameterSimulasi } from '../types/simulasi';

/** Acak nilai dalam rentang [min, max] dengan presisi 1 desimal */
function acakNilai(min: number, max: number, desimal = 1): number {
  const v = Math.random() * (max - min) + min;
  return parseFloat(v.toFixed(desimal));
}

interface FormSimulasiProps {
  onSimulasi: (data: ParameterSimulasi) => void | Promise<void>;
}

const FormSimulasi: React.FC<FormSimulasiProps> = ({ onSimulasi }) => {
  const [formData, setFormData] = useState<ParameterSimulasi>({
    luasLahan: 750,
    beta: 15,
    gamma: 30,
    polaTanam: 'tunggalRotasi',
  });

  const [isRunning, setIsRunning] = useState(false);
  const [pesanError, setPesanError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'polaTanam' ? value : Number(value)
    }));
  };

  const handleAcakParameter = () => {
    setFormData(prev => ({
      ...prev,
      luasLahan: acakNilai(600, 900, 0),
      beta: acakNilai(10, 30, 0),
      gamma: acakNilai(10, 25, 0),
    }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setPesanError(null);

      // Validasi masukan
      const { luasLahan, beta, gamma } = formData;
      if (!Number.isFinite(luasLahan) || luasLahan < 1 || luasLahan > 10000) {
        setPesanError('Batas luas tanam harus antara 1 dan 10.000 ha.');
        return;
      }
      if (!Number.isFinite(beta) || beta < 0 || beta > 100 || !Number.isFinite(gamma) || gamma < 0 || gamma > 100) {
        setPesanError('β dan γ harus berada di antara 0% dan 100%.');
        return;
      }

      setIsRunning(true);
        try {
          await onSimulasi(formData);
        } catch (err) {
          setPesanError(err instanceof Error ? err.message : 'Simulasi gagal dijalankan. Silakan coba lagi.');
        } finally {
          setIsRunning(false);
    }
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
            Batas Luas Tanam — <span className="font-normal text-gray-400">L (Hektar)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="luasLahan"
              value={formData.luasLahan || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-agri-green/30 focus:border-agri-green transition text-sm"
              required
              step="1"
              min="1"
              placeholder="Masukkan luas lahan"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">Ha</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Batas total luas tanam seluruh tanaman terpilih (paper: 750 ha).</p>
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

        {/* Randomize Button */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Simulasi Parameter Acak</p>
          <button
            type="button"
            onClick={handleAcakParameter}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-agri-green hover:text-agri-green hover:bg-green-50/50 transition-all text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Acak β, γ, dan Luas Lahan
          </button>
          <p className="text-xs text-gray-400 mt-1.5 text-center">
            β: 10–30% &nbsp;·&nbsp; γ: 10–25% &nbsp;·&nbsp; Lahan: 600–900 Ha
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-xs text-blue-700">
              <span className="font-bold">Model 1</span> menggunakan data parameter tanaman (h<sub>i</sub>, c<sub>i</sub>, s<sub>i</sub>, l<sub>i</sub>) dari Tabel 4.9 penelitian. Solver HiGHS (WASM) akan memaksimalkan keuntungan bersih selama 12 bulan.
            </p>
          </div>
        </div>

        {pesanError && (
          <div role="alert" className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
            {pesanError}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isRunning}
            className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-sm flex items-center justify-center gap-2 ${isRunning
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