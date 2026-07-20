# Bhumi Wanaprastha v0.9 — Tahap 4.3.5 Batch 2

Batch 2 menggunakan `bhumi-wanaprastha-v0.9-tahap-4.3.5-batch-1.zip` sebagai baseline resmi dan menerapkan hasil review Batch 1.

## Perbaikan hasil review

1. **Jejak Pengetahuan**
   - Kartu lima ruang diganti menjadi timeline vertikal yang ringkas.
   - Node aktif memakai lingkaran penuh; node kosong memakai lingkaran outline.
   - Judul node maksimal dua baris dan status “Belum terhubung” dibuat lebih ringan.

2. **Tipografi artikel**
   - Ukuran subjudul, body, dan heading isi diperkecil.
   - Line-height dipadatkan agar ritme membaca lebih nyaman.
   - Perubahan diterapkan melalui CSS global, tanpa mengubah isi Markdown.

3. **Jelajahi Selanjutnya**
   - Metadata relevansi dibuat lebih kecil, ringan, dan redup.

4. **Halaman ruang dan Hasil Panen**
   - Teks pengantar diperkecil dan line-height dirapatkan.

5. **Footer**
   - Panorama footer menjadi full-bleed tanpa margin kiri, kanan, dan bawah.
   - Border dan efek bingkai dihilangkan agar footer benar-benar menjadi akhir halaman.

## Arsitektur Hasil Panen

Hasil Panen kini diperlakukan sebagai katalog karya, bukan katalog PDF.

Field opsional yang dapat digunakan pada front matter:

```yaml
cover: /assets/harvest/nama-cover.webp
harvestType: image
harvestTarget: /assets/harvest/nama-karya-full.webp
harvestAction: Lihat Ilustrasi
harvestLabel: Gambar
```

`harvestType` yang dikenali:

- `pdf`
- `image`
- `video`
- `html` atau `app`
- `url` atau `website`
- `zip`
- `markdown`
- `dataset`
- `file`

Jika field tidak diisi, sistem menggunakan data lama seperti `download`, `thumbnail`, atau `cover` sebagai fallback. Konten lama tetap kompatibel.

## Catatan

Batch ini belum menambah dataset baru. Fokusnya adalah menerapkan hasil review dan membuat fondasi Hasil Panen lebih fleksibel sebelum kumpulan konten Batch 2 ditambahkan.
