# Bhumi Wanaprastha v0.9 — Living Knowledge Hotfix

Tanggal: 9 Agustus 2026

## Perubahan

1. **Jejak Pengetahuan — Jalan Sunyi**
   - Menghubungkan `Jalan Sunyi` dengan `Pengetahuan yang Menjadi Laku`.
   - Menghubungkan `Jalan Sunyi` dengan `Wajah Kebijaksanaan`.
   - Menghubungkan `Jalan Sunyi` dengan `Ngerti, Ngrasa, Nglakoni`.
   - Relasi masuk otomatis terbaca oleh node tujuan melalui sistem incoming/outgoing yang sudah ada.

2. **Tanggal karya dan tanggal publikasi**
   - Menambah dukungan `original_date` dan `published_date`.
   - Urutan daftar konten memakai `published_date` bila tersedia.
   - Konten lama tanpa field baru tetap kompatibel dan memakai `date`.
   - `Jalan Sunyi`: original 2015-08-17, published 2026-08-09.
   - `Mengalami Tuhan`: original 2025-01-20, published 2026-08-09.

3. **Author di header artikel**
   - Menampilkan nama penulis di bawah judul dan sebelum ringkasan.
   - Tanggal karya asli ditampilkan ringkas bersama author.
   - Berlaku global untuk konten yang memiliki metadata author.

4. **Forest-floor background**
   - Mengurangi overlay terang dari 0.89 menjadi 0.84 agar tekstur sedikit lebih terlihat.
   - Tidak mengubah aset gambar atau struktur layout.

## Catatan

Relasi `Wajah Kebijaksanaan -> Embodied Knowledge` telah diperiksa dan ID `embodied-knowledge` memang valid, sehingga tidak diubah. Warning relasi lama lain yang menunjuk node yang belum tersedia tidak termasuk scope hotfix ini.
