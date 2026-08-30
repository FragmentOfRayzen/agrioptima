/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agri-green': '#2d6a4f',    // Hijau tua untuk tombol/header
        'agri-light': '#d8f3dc',    // Hijau muda untuk background kartu
        'agri-accent': '#ffb703',   // Kuning untuk highlight/peringatan
      }
    },
  },
  plugins: [],
}