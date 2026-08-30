// Mendefinisikan tipe data untuk input pengguna
export interface ParameterLahan {
  luasLahan: number; // dalam hektar
  modalAwal: number; // dalam Rupiah
  ketersediaanAir: 'Tinggi' | 'Sedang' | 'Rendah';
  targetBulanPanen: number;
}