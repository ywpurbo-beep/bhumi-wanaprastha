# Bhumi Wanaprastha — Limited Update 2026-08-09

## Ruang lingkup
Update ini sengaja dibatasi pada bahan yang sudah siap dan perubahan sistem kecil yang diperlukan agar bahan tersebut tampil dengan benar.

## Konten baru
- Renungan: **Jalan Sunyi** — Tina Kamihadi
  - menambahkan metadata yang kompatibel dengan sistem konten v0.9
  - menambahkan hero `/assets/images/renungan/jalan-sunyi.webp`
- Renungan: **Mengalami Tuhan** — Tina Kamihadi
  - hanya puisi yang disiapkan untuk publikasi
  - isi puisi tidak diubah
  - metadata diselaraskan dengan sistem konten v0.9

## Visual
- Menambahkan tekstur lantai hutan `C01-Forest-Floor-Texture.webp` sebagai background global.
- Background diulang (tiling) dan dilapisi warna paper transparan agar tetap subtil dan tidak mengganggu keterbacaan.
- Ukuran tile diperkecil secara responsif pada layar kecil.

## Perbaikan sistem konten
- Parser Markdown sekarang mendukung hard line break Markdown (dua spasi di akhir baris).
- Perubahan ini diperlukan agar puisi dan teks dengan susunan baris khusus tidak diratakan menjadi satu paragraf.

## Build
- `content/_generated/content-manifest.js` telah dibangun ulang.
- Total knowledge nodes setelah update: 40.

## Catatan
Peringatan relasi lama yang belum memiliki node tujuan masih muncul saat build. Peringatan tersebut sudah ada pada konten sebelumnya dan tidak berasal dari update ini.
