# Bhumi Wanaprastha v0.9 — Update Tahap A Final

Tanggal: 22 Juli 2026

## Ringkasan

Paket ini merupakan hasil finalisasi review lokal Pemutakhiran Tahap A. Fokusnya adalah penyelarasan narasi, konten, aset visual, struktur Karya, Kebun, serta konsistensi Living Knowledge. Fitur Tahap B belum dimasukkan.

## Perubahan utama

- Memperbarui pengantar Pendopo menjadi:
  - “Sebuah ruang belajar terbuka tentang manusia, alam, dan pengetahuan.”
  - “Tempat pengetahuan bertumbuh menjadi laku.”
- Menambahkan dan merapikan tulisan baru pada Gagasan dan Renungan.
- Menambahkan hero image untuk tulisan-tulisan baru.
- Menambahkan ilustrasi aksen Pasemaian, Hasil Panen, dan Gudang.
- Mengaktifkan embrio Gudang sebagai repositori rujukan kontekstual.
- Menambahkan enam temuan Gudang beserta alasan penyimpanan dan tautan sumber asal.
- Menyamakan narasi Gudang dengan rumusan final:
  “Tempat menyimpan berbagai rujukan, arsip, catatan lama, dan pengetahuan yang belum tentu dibutuhkan hari ini, tetapi mungkin berguna pada waktunya.”
- Mempertahankan tiga kategori Project Portfolio:
  - Arsitektur
  - Interior
  - Visual & Sistem
- Menjadikan ketiga kartu kategori Project Portfolio dapat diklik menuju halaman kategori masing-masing.
- Menambahkan aksen watercolor halus pada kartu kategori Project Portfolio.
- Mengganti placeholder “Segera dikurasi” dengan bahasa pertumbuhan yang lebih organik, yaitu “Sedang bertumbuh”.
- Menampilkan karya yang tersedia secara otomatis pada halaman kategori terkait.
- Membangun ulang manifest Living Knowledge menjadi 38 node.

## Pemeriksaan teknis

- Sintaks JavaScript utama lolos pemeriksaan `node --check`.
- Proses `npm run build:content` berhasil.
- Seluruh route statis memiliki view yang sesuai.
- Tidak ditemukan ID HTML ganda.
- Referensi aset lokal utama tersedia.

## Peringatan yang masih ada

Build manifest masih melaporkan beberapa relasi menuju node yang belum tersedia. Ini bukan kerusakan sistem; relasi tersebut merupakan jejak menuju konten yang belum dimasukkan atau nama route lama yang kelak perlu dibersihkan saat penyempurnaan Living Knowledge.

## Batas Tahap A

Belum termasuk:

- Lembar Pengetahuan / panel pratinjau tautan.
- Tanya Bhumi.
- Integrasi Ruang Gagasan dengan mesin blog.
- Perubahan besar perilaku navigasi.

Ketiganya disimpan untuk tahap pengembangan berikutnya agar paket ini tetap menjadi checkpoint stabil.
