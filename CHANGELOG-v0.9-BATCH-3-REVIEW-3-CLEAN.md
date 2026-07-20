# Bhumi Wanaprastha v0.9 · Batch 3 Review 3 Clean

## Perbaikan paket

- Paket disusun ulang dari repository GitHub terbaru sebagai sumber dasar.
- `content/_generated/content-manifest.js` diregenerasi dari seluruh file Markdown terbaru.
- Perubahan narasi suasana malam pada proyek **Melanjutkan yang Sudah Ada** kini masuk ke manifest dan akan tampil di website.
- File audio `.m4a` yang melebihi batas 25 MiB dipastikan tidak ada dalam paket.
- Struktur `images/karya/rumah-papakmanggu/` diverifikasi benar; tampilan path gabungan di GitHub hanyalah penyederhanaan antarmuka.
- README dan petunjuk publikasi diperbarui agar sesuai dengan sistem v0.9 dan alur GitHub–Cloudflare saat ini.

## Catatan untuk batch berikutnya

Cloudflare perlu menjalankan `node scripts/build-content.mjs` sebelum deployment agar perubahan Markdown dari GitHub dapat langsung terbit tanpa regenerasi manual.
