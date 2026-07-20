# Bhumi Wanaprastha v0.9 · Batch 3 Review 3

Sebuah ruang untuk mengembangkan pengetahuan yang menjadi laku.

## Struktur utama

- `index.html` — mesin tampilan, navigasi, pencarian, dan pembaca konten.
- `content/` — sumber konten Markdown menurut ruang: Gagasan, Renungan, Laku, Karya, dan Kebun.
- `content/_generated/content-manifest.js` — indeks hasil olahan Markdown yang dibaca website.
- `scripts/build-content.mjs` — generator manifest konten.
- `images/` dan `assets/` — gambar serta aset pendukung.
- `apps/` — aplikasi web yang hidup di dalam ekosistem Bhumi Wanaprastha.

Folder yang tampil di GitHub sebagai `images/karya/rumah-papakmanggu` bukan folder bernama tunggal. GitHub hanya merangkum rantai folder yang masing-masing memiliki satu anak. Struktur sebenarnya tetap:

```text
images/
└── karya/
    └── rumah-papakmanggu/
```

## Memperbarui konten untuk sementara

Setelah mengubah file `.md`, jalankan generator sebelum commit:

```bash
git pull origin main
node scripts/build-content.mjs
git add .
git commit -m "Regenerate content manifest"
git push origin main
```

Di Windows, generator juga dapat dijalankan dengan klik dua kali `UPDATE CONTENT.bat`.

## Publikasi

Repository terhubung ke Cloudflare Workers. Setiap commit ke branch `main` memicu deployment otomatis.

Catatan batas aset Cloudflare Workers: satu file statis tidak boleh melebihi 25 MiB. Audio dan video besar sebaiknya ditempatkan di layanan eksternal atau penyimpanan objek, lalu ditautkan dari website.

## Rencana batch berikutnya

Cloudflare akan dikonfigurasi untuk menjalankan `node scripts/build-content.mjs` sebelum deployment. Setelah itu, pengeditan Markdown dari GitHub atau ponsel tidak lagi memerlukan regenerasi manifest secara manual.
