# Audit fokus dialog bacaan — 2 November 2026

Status: **implementasi lokal dan uji browser selesai; belum dikomit, masuk PR, atau diterbitkan**. Bagian backlog: P1-05 aksesibilitas, fase hari 17–18 pada roadmap 20 hari. Uji dilakukan pada 2 November 2026 (Asia/Kuala_Lumpur).

## Perubahan sesi ini

- `app.js`: judul dialog diberi `tabindex="-1"` dan menerima fokus setiap kali bacaan dibuka atau diganti melalui navigasi catatan–sumber. Judul tidak menambah pemberhentian Tab biasa.
- `app.js`: penutupan dialog mempertahankan fokus ke tombol pembuka awal. Jika tidak ada pembuka, misalnya kunjungan langsung ke fragmen sumber, fokus menuju kotak pencarian dan menggulirnya ke tampilan.
- `styles.css`: garis fokus judul mengikuti warna dan ukuran indikator fokus situs.
- `index.html`: versi cache aplikasi diperbarui. Perubahan lokal lain dan pembaruan filter status editorial yang masuk selama sesi tetap dipertahankan; filter tersebut bukan hasil sesi ini.

## Dasar dan batas sumber

Roadmap 20 hari, backlog teknis, dan audit implementasi di folder kerja Drive diperiksa. PR #36 (inventaris sumber) serta #37 (pedoman sejarah lisan) masih terbuka pada pemeriksaan awal; tidak digabung. Sumber kebenaran konten tetap generator dan inventaris referensi lokal. Catatan Dalihan Na Tolu/R001 dipakai sebagai contoh navigasi antarmuka; sumber budaya tidak dibaca ulang atau dinaikkan statusnya dalam sesi ini.

## Bukti uji

Lingkungan: browser dalam aplikasi pada server statis loopback lokal, bukan GitHub Pages. Interaksi memakai Enter, Tab, Shift+Tab, dan Escape dengan pemeriksaan DOM/AX.

| Skenario | Hasil yang diamati |
| --- | --- |
| Buka kartu dengan Enter | Fokus pada `reading-title` |
| Catatan → sumber → catatan | Fokus pada judul isi baru, fragmen URL sesuai |
| Tab dari judul | Menuju tautan sumber asli |
| Shift+Tab dari judul | Menuju tombol Tutup bacaan |
| Tutup setelah navigasi dua arah | Fokus kembali ke tombol kartu pembuka awal |
| Buka langsung `#sumber/R001`, lalu Escape | Fokus ke `entry-search`; kotak terlihat setelah gulir selesai |
| Daftar sumber, lalu Escape | Fokus dari judul kembali ke tombol Daftar sumber |
| Lebar 320, 390, 768, 1280 px; tinggi 900 px | Fokus judul terlihat; tidak ada overflow horizontal halaman atau dialog pada snapshot ini |
| Log aplikasi saat pemeriksaan | Tidak ada error/warning yang tertangkap pada tab uji |

Data observasi dan SHA-256 berkas yang diperiksa: [hasil terstruktur](2026-11-02-dialog-focus-results.json).

Generator menghasilkan 17 catatan, 23 sumber, 10 tema, 8 marga. `npm run check` terakhir lulus **566 pemeriksaan integritas**, termasuk pemeriksaan filter yang ditambahkan pekerjaan lain. `git diff --check` lulus. Sempat ada kegagalan pemeriksaan gaya filter ketika berkas pekerjaan lain masih ditulis; pemeriksaan ulang sesudah pembaruan tersebut lulus. Angka ini memeriksa snapshot worktree gabungan, bukan head PR atau CI perubahan sesi ini.

## Backlog setelah sesi

- Selesai lokal: fokus judul saat bacaan berubah, kembali ke pembuka, fallback tautan langsung, serta uji keyboard dan empat lebar di atas.
- Tetap terbuka: pembaca layar aktual/VoiceOver, Safari/Firefox/perangkat fisik, sweep tautan sumber, kontras di atas foto, dan pemeriksaan Pages setelah rilis yang disetujui.
- Tetap menunggu bukti: pembacaan sumber penuh/primer, tinjauan penutur/komunitas, serta uji Apps Script kirim → simpan → antrean moderasi. Intake tidak dinyatakan berfungsi.
- MVP belum selesai; jadwal tidak dinonaktifkan. Tidak ada perubahan pada proyek Kamus, commit, push, merge, deploy, atau publikasi dalam sesi ini.

## Pembaruan integrasi setelah sesi — 2 November 2026

Hash snapshot pada hasil terstruktur cocok dengan `app.js`, `styles.css`, `index.html`, `data/content.js`, dan `scripts/check.mjs` yang ditambahkan ke head PR #36 `d5dd51b`. Head kode tersebut lulus CI `validate` pada [run 41373282855](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41373282855). PR #36 tetap terbuka dan mergeable; belum digabung atau diterbitkan. File audit dan hasil JSON ini kini menjadi dokumentasi pendamping PR.
