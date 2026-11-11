// Pemuat solver HiGHS (WebAssembly) untuk browser (Vite).
// Dimuat secara dinamis (code-splitting) agar halaman awal tetap ringan;
// solver baru diunduh saat simulasi pertama dijalankan.
// Instance dibuat sekali lalu dipakai ulang.
import type { HighsLike } from './milpModel';

let instance: Promise<HighsLike> | null = null;

export function getHighs(): Promise<HighsLike> {
  if (!instance) {
    instance = (async () => {
      const [{ default: loadHighs }, { default: wasmUrl }] = await Promise.all([
        import('highs'),
        import('highs/runtime?url'),
      ]);
      return (await loadHighs({
        locateFile: (file: string) => (file.endsWith('.wasm') ? wasmUrl : file),
      })) as unknown as HighsLike;
    })().catch((err: unknown) => {
      instance = null; // izinkan percobaan ulang bila gagal dimuat
      throw new Error(
        'Solver HiGHS gagal dimuat. Periksa koneksi internet lalu coba lagi. ' +
          (err instanceof Error ? `(${err.message})` : ''),
      );
    });
  }
  return instance;
}
