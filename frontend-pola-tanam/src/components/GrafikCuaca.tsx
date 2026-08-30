import React from 'react';
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { DATA_CUACA, THRESHOLD_CUACA_NORMAL } from '../data/researchData';

// Transform data untuk chart
const dataChart = DATA_CUACA.map(d => ({
  bulan: d.bulan,
  curahHujan: d.curahHujan,
  peluangHujan: d.peluangHujan,
  isNormal: d.isNormal,
}));

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  const data = DATA_CUACA.find(d => d.bulan === label);
  const isNormal = data?.isNormal;
  
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-100 min-w-[200px]">
      <p className="font-bold text-gray-800 text-base mb-2">{label}</p>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data?.isNormal ? '#22c55e' : '#f59e0b' }}></span>
          <span className="text-sm text-gray-600">Curah Hujan:</span>
          <span className="text-sm font-bold text-gray-800">{payload[0]?.value} mm</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-sm text-gray-600">Peluang Hujan:</span>
          <span className="text-sm font-bold text-gray-800">{payload[1]?.value}%</span>
        </div>
      </div>
      <div className={`mt-3 pt-2 border-t border-gray-100 text-xs font-bold ${isNormal ? 'text-emerald-600' : 'text-amber-600'}`}>
        {isNormal ? '✓ Cuaca Normal (< 200mm)' : '⚠ Cuaca Tidak Normal (≥ 200mm)'}
      </div>
    </div>
  );
};

// Custom bar shape with different colors for normal vs abnormal
const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  const data = DATA_CUACA.find(d => d.bulan === payload.bulan);
  const isNormal = data?.isNormal ?? true;
  
  // Gradient colors
  const fillColor = isNormal ? '#22c55e' : '#f59e0b';
  const fillColorLight = isNormal ? '#86efac' : '#fcd34d';
  
  return (
    <g>
      <defs>
        <linearGradient id={`grad-${payload.bulan}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillColor} stopOpacity={0.9} />
          <stop offset="100%" stopColor={fillColorLight} stopOpacity={0.6} />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#grad-${payload.bulan})`}
        rx={4}
        ry={4}
      />
    </g>
  );
};

const GrafikCuaca: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100 pb-4 gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            Kondisi Iklim Desa Saribudolok
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Curah Hujan Bulanan (mm) & Peluang Hujan Harian (%) — Tahun 2025
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-gray-600 font-medium">Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-xs text-gray-600 font-medium">Tidak Normal</span>
          </div>
          <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-bold border border-blue-100">
            Sumber: WeatherSpark
          </span>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-100">
          <p className="text-xs text-emerald-600 font-medium">Cuaca Normal</p>
          <p className="text-lg font-bold text-emerald-800">Jan — Jul</p>
          <p className="text-xs text-emerald-500">{'< 200 mm/bulan'}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-3 border border-amber-100">
          <p className="text-xs text-amber-600 font-medium">Cuaca Tidak Normal</p>
          <p className="text-lg font-bold text-amber-800">Ags — Des</p>
          <p className="text-xs text-amber-500">≥ 200 mm/bulan</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg p-3 border border-blue-100">
          <p className="text-xs text-blue-600 font-medium">Curah Hujan Terendah</p>
          <p className="text-lg font-bold text-blue-800">124 mm</p>
          <p className="text-xs text-blue-500">Februari</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-3 border border-red-100">
          <p className="text-xs text-red-600 font-medium">Curah Hujan Tertinggi</p>
          <p className="text-lg font-bold text-red-800">297 mm</p>
          <p className="text-xs text-red-500">Oktober</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full mt-4">
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={dataChart} margin={{ top: 20, right: 30, bottom: 5, left: -10 }}>
            <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="bulan" 
              tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} 
              axisLine={false} 
              tickLine={false} 
              dy={10} 
            />
            
            {/* Y-axis Kiri: Curah Hujan */}
            <YAxis 
              yAxisId="kiri" 
              orientation="left" 
              tick={{ fontSize: 11, fill: '#6b7280' }} 
              axisLine={false} 
              tickLine={false}
              domain={[0, 350]}
              label={{ value: 'mm', position: 'insideTopLeft', offset: -5, style: { fontSize: 11, fill: '#9ca3af' } }}
            />
            {/* Y-axis Kanan: Peluang Hujan */}
            <YAxis 
              yAxisId="kanan" 
              orientation="right" 
              tick={{ fontSize: 11, fill: '#6b7280' }} 
              axisLine={false} 
              tickLine={false}
              domain={[0, 100]}
              label={{ value: '%', position: 'insideTopRight', offset: -5, style: { fontSize: 11, fill: '#9ca3af' } }}
            />
            
            {/* Threshold line at 200mm */}
            <ReferenceLine 
              yAxisId="kiri" 
              y={THRESHOLD_CUACA_NORMAL} 
              stroke="#ef4444" 
              strokeDasharray="8 4" 
              strokeWidth={2}
              label={{ 
                value: 'Batas Normal (200mm)', 
                position: 'insideTopLeft',
                style: { fontSize: 11, fill: '#ef4444', fontWeight: 700 }
              }}
            />

            {/* Shaded area for abnormal months */}
            <ReferenceArea 
              yAxisId="kiri" 
              x1="Ags" 
              x2="Des" 
              fill="#fef3c7" 
              fillOpacity={0.4}
            />
            
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }} 
              formatter={(value: string) => <span className="text-sm font-medium text-gray-600">{value}</span>}
            />
            
            {/* Bar Chart: Curah Hujan */}
            <Bar 
              yAxisId="kiri" 
              dataKey="curahHujan" 
              name="Curah Hujan (mm)" 
              barSize={36} 
              shape={<CustomBar />}
            />
            
            {/* Line Chart: Peluang Hujan */}
            <Line 
              yAxisId="kanan" 
              type="monotone" 
              dataKey="peluangHujan" 
              name="Peluang Hujan Harian (%)" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
              activeDot={{ r: 7, fill: '#2563eb' }} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer note */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-xs text-gray-400">
          Data iklim dari WeatherSpark.com untuk wilayah Saribudolok, Kec. Silimakuta, Kab. Simalungun. 
          Ketinggian ~1.400 mdpl. Tanah vulkanik.
        </p>
      </div>
      
    </div>
  );
};

export default GrafikCuaca;