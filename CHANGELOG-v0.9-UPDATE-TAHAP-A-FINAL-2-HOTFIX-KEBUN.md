# Hotfix GUI Kebun — Tahap A Final-2

## Perbaikan
- Mengubah ilustrasi Pasemaian, Hasil Panen, dan Gudang menjadi background penuh kartu, bukan pita gambar di bagian atas.
- Menambahkan gradasi lembut agar judul, deskripsi, dan tautan tetap terbaca tanpa memisahkan gambar dari bidang kartu.
- Mempertahankan `background-image` saat hover. Sebelumnya aturan umum `.room-card:hover` menghapus gambar melalui properti shorthand `background`.
- Menyesuaikan tinggi dan posisi background untuk desktop serta perangkat bergerak.

## Akar masalah
1. `background-size: 100% 105px` membatasi ilustrasi hanya pada kepala kartu.
2. `.room-card:hover { background: ... }` memiliki spesifisitas lebih tinggi dan mereset `background-image` menjadi `none` ketika kartu disentuh kursor.
