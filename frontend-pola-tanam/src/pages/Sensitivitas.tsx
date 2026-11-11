import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, ReferenceLine, Cell,
} from 'recharts';
import Navbar from '../components/navbar';
import { DAFTAR_TANAMAN } from '../data/researchData';
import { getHighs } from '../utils/highsBrowser';
import { sapuPenalti, hitungTornado } from '../utils/sensitivitas';
import type { BarisTornado, TitikSensitivitas } from '../utils/sensitivitas';
import { formatRupiah } from '../utils/milpSolver';

const NILAI_PENALTI = [0, 10, 20, 30, 40, 50];
// Parameter optimasi tim: β (hasil) 15%, γ (biaya) 30%, lahan 750 ha.
const OPSI_DASAR = { beta: 15, gamma: 30, luasLahanHa: 750 };
// Sapuan penalti: satu parameter divariasikan, parameter lainnya 0% (nilai 0% = kondisi ablasi),
// sama dengan dokumen analisis sensitivitas tim.
const OPSI_SAPUAN = { ...OPSI_DASAR, beta: 0, gamma: 0 };
const tunda = () => new Promise<void>(r => setTimeout(r, 0));

interface HasilModel {
  beta: TitikSensitivitas[];
  gamma: TitikSensitivitas[];
  baseline: number;
  tornado: BarisTornado[];
}

const miliar = (n: number) => n / 1e9;

const Sensitivitas: React.FC = () => {
  const [sedang, setSedang] = useState(false);
  const [hasil, setHasil] = useState<Record<1 | 2, HasilModel> | null>(null);
  const [modelTornado, setModelTornado] = useState<1 | 2>(1);
  const [langkah, setLangkah] = useState('');
  const [pesanError, setPesanError] = useState<string | null>(null);

  const jalankan = async () => {
    setSedang(true);
    setHasil(null);
    setPesanError(null);
    try {
      const highs = await getHighs();
      const keluar = {} as Record<1 | 2, HasilModel>;
      for (const m of [1, 2] as const) {
        setLangkah(`Model ${m}: sapuan β`); await tunda();
        const beta = sapuPenalti(highs, DAFTAR_TANAMAN, OPSI_SAPUAN, m, 'beta', NILAI_PENALTI);
        setLangkah(`Model ${m}: sapuan γ`); await tunda();
        const gamma = sapuPenalti(highs, DAFTAR_TANAMAN, OPSI_SAPUAN, m, 'gamma', NILAI_PENALTI);
        setLangkah(`Model ${m}: peringkat parameter (±10%)`); await tunda();
        const t = hitungTornado(highs, DAFTAR_TANAMAN, OPSI_DASAR, m);
        keluar[m] = { beta, gamma, baseline: t.baseline, tornado: t.baris };
      }
      setHasil(keluar);
    } catch (err) {
      setPesanError(err instanceof Error ? err.message : 'Analisis gagal dijalankan. Silakan coba lagi.');
    } finally {
      setSedang(false);
      setLangkah('');
    }
  };

  // Data grafik garis: satu baris per nilai, kolom per model
  const dataGaris = (param: 'beta' | 'gamma') =>
    hasil
      ? NILAI_PENALTI.map((n, i) => ({
          nilai: `${n}%`,
          'Model 1': miliar(hasil[1][param][i].keuntungan),
          'Model 2': miliar(hasil[2][param][i].keuntungan),
        }))
      : [];

  const datar = (h: HasilModel) =>
    [...h.beta, ...h.gamma].every(t => Math.abs(t.keuntungan - h.baseline) < 1);

  const tornado = hasil ? hasil[modelTornado].tornado : [];
  const dataTornado = tornado.map(b => ({
    parameter: b.parameter,
    'Turun 10%': Number(b.persenMinus.toFixed(2)),
    'Naik 10%': Number(b.persenPlus.toFixed(2)),
  }));

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Analisis Sensitivitas</h2>
          <p className="text-sm text-gray-500 mt-1 max-w-3xl">
            Melihat parameter yang paling berpengaruh terhadap nilai tujuan model (keuntungan maksimum).
            Parameter kunci pada penelitian: β (penurunan hasil karena curah hujan tinggi) dan γ (kenaikan biaya).
            Setiap titik adalah satu kali penyelesaian ulang MILP dengan lahan {OPSI_DASAR.luasLahanHa} ha.
            Pada grafik β dan γ, satu parameter divariasikan 10–50% sementara parameter lainnya 0%; titik 0% adalah
            kondisi ablasi (tanpa penalti). Peringkat parameter memakai nilai optimasi β {OPSI_DASAR.beta}% dan γ {OPSI_DASAR.gamma}%.
          </p>
        </div>

        <button
          type="button"
          onClick={jalankan}
          disabled={sedang}
          className={`px-5 py-2.5 rounded-lg font-bold text-sm text-white transition ${
            sedang ? 'bg-gray-400 cursor-wait' : 'bg-agri-green hover:bg-green-700'
          }`}
        >
          {sedang ? `Menghitung… ${langkah}` : 'Jalankan Analisis Sensitivitas'}
        </button>

        {pesanError && (
          <div role="alert" className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {pesanError}
          </div>
        )}

        {hasil && (
          <div className="mt-8 space-y-8">
            {/* β dan γ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(['beta', 'gamma'] as const).map(p => (
                <div key={p} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-base font-bold text-gray-800">
                    Keuntungan maksimum terhadap {p === 'beta' ? 'β (penurunan hasil)' : 'γ (kenaikan biaya)'}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">Satuan: miliar rupiah</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dataGaris(p)} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nilai" />
                        <YAxis domain={['auto', 'auto']} tickFormatter={(v: number) => v.toFixed(1)} />
                        <Tooltip formatter={(v) => `Rp${Number(v).toFixed(3)} miliar`} />
                        <Legend />
                        <Line type="monotone" dataKey="Model 1" stroke="#10b981" strokeWidth={2} dot />
                        <Line type="monotone" dataKey="Model 2" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 3" dot />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>

            {datar(hasil[1]) && datar(hasil[2]) && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
                <p className="font-bold mb-1">β dan γ tidak mengubah keuntungan maksimum</p>
                <p className="text-xs leading-relaxed">
                  Pada rentang 0–50%, keuntungan tetap {formatRupiah(hasil[1].baseline)} di kedua model.
                  Penalti β dan γ hanya berlaku bila masa tanam memuat bulan hujan tidak normal
                  (Agustus–Desember) dan tanaman tidak tahan hujan; jika solusi optimal menghindarinya,
                  keuntungan tidak berubah. Periksa aturan penalti yang dipakai pada model.
                </p>
              </div>
            )}

            {/* Peringkat parameter */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                <h3 className="text-base font-bold text-gray-800">Peringkat parameter paling berpengaruh (±10%)</h3>
                <div className="flex gap-2">
                  {([1, 2] as const).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setModelTornado(m)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                        modelTornado === m ? 'bg-agri-green text-white border-agri-green' : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      Model {m}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Perubahan keuntungan maksimum (%) terhadap nilai dasar {formatRupiah(hasil[modelTornado].baseline)} bila tiap
                parameter diturunkan atau dinaikkan 10% (relatif), parameter lain tetap.
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataTornado} layout="vertical" margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(v: number) => `${v}%`} />
                    <YAxis type="category" dataKey="parameter" width={150} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Legend />
                    <ReferenceLine x={0} stroke="#6b7280" />
                    <Bar dataKey="Turun 10%" fill="#f59e0b">
                      {dataTornado.map((_, i) => <Cell key={i} fill="#f59e0b" />)}
                    </Bar>
                    <Bar dataKey="Naik 10%" fill="#10b981">
                      {dataTornado.map((_, i) => <Cell key={i} fill="#10b981" />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-200">
                      <th className="py-2 pr-2 font-semibold">Peringkat</th>
                      <th className="py-2 pr-2 font-semibold">Parameter</th>
                      <th className="py-2 pr-2 font-semibold text-right">Turun 10%</th>
                      <th className="py-2 pr-2 font-semibold text-right">Naik 10%</th>
                      <th className="py-2 font-semibold text-right">Rentang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tornado.map((b, i) => (
                      <tr key={b.parameter} className="border-b border-gray-100">
                        <td className="py-1.5 pr-2 text-gray-600">{i + 1}</td>
                        <td className="py-1.5 pr-2 font-medium text-gray-800">{b.parameter}</td>
                        <td className="py-1.5 pr-2 text-right">{b.persenMinus.toFixed(2)}%</td>
                        <td className="py-1.5 pr-2 text-right">{b.persenPlus.toFixed(2)}%</td>
                        <td className="py-1.5 text-right font-semibold">{b.rentang.toFixed(2)} poin</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Sensitivitas;

