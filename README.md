# Ensiklopedia Suku Mandailing — landing page v0.1

Landing page berbahasa Indonesia untuk memperkenalkan proyek, menjelajahi catatan awal bersumber, memahami hubungan marga dengan Dalihan Na Tolu, dan menyiapkan kontribusi. Gaya editorial menggunakan putih gading, marun, cokelat, serta aksen emas. Halaman ini merupakan rilis awal proyek, bukan ensiklopedia yang sudah lengkap.

## Menjalankan

Situs: **https://ensiklopediamandailing.github.io/**. Kode sumber dan pengembangan berikutnya berada di repo `ensiklopediamandailing/ensiklopediamandailing.github.io`.

Tidak ada dependensi JavaScript, instalasi paket, atau proses build. Buka `index.html` di peramban modern. Untuk perilaku penyimpanan draf dan URL yang lebih konsisten, gunakan server statis dari folder proyek:

```sh
python3 -m http.server 8080
```

Buka `http://localhost:8080`. GitHub Pages menggunakan branch `main`, direktori `/ (root)`. Berkas `.nojekyll` mempertahankan perilaku situs statis tanpa pemrosesan Jekyll. Commit perubahan ke `main` untuk memicu publikasi ulang melalui konfigurasi Pages yang sudah tersedia. Status publikasi dapat diperiksa pada tab **Actions → pages build and deployment**. Tidak ada kunci API atau layanan server tambahan yang diperlukan.

## Susunan kode

| Berkas | Fungsi |
| --- | --- |
| `index.html` | Struktur semantik, metadata, navigasi, bagian editorial, dan formulir draf |
| `styles.css` | Palet, tipografi sistem, tata letak, keadaan fokus, dan aturan responsif |
| `app.js` | Pencarian, filter, menu ponsel, tab kekerabatan, dialog bacaan, serta draf lokal |
| `data/content.js` | Data publik: tema, catatan, marga, peran, sumber, dan kredit media |
| `assets/` | Foto WebP lokal, favicon, serta catatan hak penggunaan |
| `docs/reference-inventory.json` | Inventaris bibliografis dan status baca sumber proyek |
| `scripts/prepare-content.py` | Generator data konten; membutuhkan Python 3, tanpa paket tambahan |
| `scripts/check.mjs` | Pemeriksaan integritas konten, tautan internal, aset, dan kontras dasar |
| `docs/TEST_REPORT.md` | Hasil pengujian dan batas pengujian |

## Memperbarui isi

Data dipisahkan dari tampilan. Jalur yang disarankan adalah menyunting `scripts/prepare-content.py` untuk catatan/tema dan `docs/reference-inventory.json` untuk bibliografi, lalu menjalankan:

```sh
python3 scripts/prepare-content.py
node scripts/check.mjs
```

Perubahan langsung pada `data/content.js` dapat digunakan untuk penyuntingan cepat, tetapi akan tertimpa ketika generator dijalankan. Samakan perubahan itu pada generator bila hendak mempertahankannya.

Setiap catatan dalam `entries` memuat `id` unik, `title`, `category` yang cocok dengan tema, `summary`, `status`, `limit`, `sourceIds`, `tags`, dan `body`. Isi `body` berupa bagian dengan `heading` dan daftar `paragraphs`. Catatan foto juga memiliki `image`, `imageAlt`, dan `mediaId`. Tambahkan sumber terlebih dahulu lalu rujuk ID-nya, misalnya `R001`. Tanpa sumber akademik, sebuah catatan visual hanya boleh menjelaskan metadata foto dan batas pembacaannya.

Untuk sumber, jaga penulis, tahun beserta kualifikasinya, judul, penerbit, URL, status pembacaan, lokasi bukti, serta catatan keterbatasan. Jangan mengubah status menjadi pembacaan penuh atau tinjauan komunitas sebelum proses tersebut benar-benar dilakukan. Jangan mengisi silsilah, kampung asal, atau hubungan keturunan berdasarkan dugaan. Peran Dalihan Na Tolu tetap ditulis menurut hubungan dan konteks; tidak ditetapkan sebagai sifat permanen suatu marga.

Jumlah catatan dan filter diperbarui dari data. Angka cakupan cetak biru, teks perkembangan, tanggal rilis, serta tautan editorial dalam `index.html` harus diperiksa manual jika cakupan berubah. Perbarui juga `project.updatedOn` pada generator. Slug catatan mendukung tautan seperti `#catatan/dalihan-na-tolu`.

## Kontribusi dan integrasi

Penyusun kontribusi berfungsi sebagai **draf lokal**. Tombol simpan menulis ke `localStorage`, memeriksa hasil tulis, lalu menampilkan status. Draf dapat dipulihkan setelah halaman dimuat ulang, diunduh sebagai teks, atau dihapus. Tidak ada pengiriman ke server dan tidak ada kotak masuk pengelola. Kunci draf adalah `mandailing.contribution.draft.v1`.

Untuk membuka pengiriman daring, pengelola perlu menentukan kanal kontak resmi, tujuan penyimpanan, izin akses, masa simpan, dan proses persetujuan dokumentasi. Buat endpoint server yang memvalidasi masukan dan mengembalikan bukti penerimaan sebelum antarmuka menyatakan berhasil terkirim. Menambahkan nilai `contributionEndpoint` saja belum mengaktifkan integrasi. Jangan menaruh kunci API di berkas publik. Jangan memasukkan arsip keluarga terbatas atau data pribadi ke `content.js`.

Halaman tidak mengirim analitik atau memuat font/CDN pihak ketiga. Tautan sumber membuka layanan luar. GitHub Pages mengikuti kebijakan layanan GitHub. Penyimpanan lokal dapat diblokir oleh peramban; kegagalan tersebut ditampilkan tanpa klaim bahwa draf telah tersimpan. Draf dari domain pratinjau sebelumnya tidak otomatis berpindah karena penyimpanan lokal terikat pada domain peramban.

## Asumsi dan status editorial

- Dasar isi adalah cetak biru 26 Oktober 2026: 16 bab rencana, 19 rekaman referensi awal, dan 8 nama marga dari judul katalog. Angka ini bukan ukuran kelengkapan ensiklopedia.
- Empat belas catatan yang tersedia mencakup enam ringkasan terbatas, tujuh inventaris sumber, dan satu dokumentasi visual beratribusi. Status baca dan batas pemeriksaan dicatat; belum ada tinjauan komunitas atau pembacaan penuh seluruh referensi.
- Tema yang belum memiliki catatan menampilkan keadaan kosong yang menjelaskan rencana kajian.
- Kontak pengiriman belum ditetapkan dalam dokumen proyek. Halaman menampilkan status kanal sedang disiapkan.
- Nama pemrakarsa mengikuti dokumen proyek. Tidak ada mitra, testimoni, statistik pengunjung, atau silsilah yang direkayasa.
- Foto mengikuti konteks dan lisensi pada Wikimedia Commons. Kredit lengkap ada pada situs dan `assets/CREDITS.md`.

## Aksesibilitas dan SEO

HTML menggunakan `lang="id"`, landmark, hierarki judul, tautan lompat ke isi, label formulir, hasil pencarian `aria-live`, teks alternatif, serta dialog native. Tab kekerabatan mendukung panah, Home, dan End. Menu dan dialog mendukung Escape. Keadaan fokus terlihat dan animasi menghormati `prefers-reduced-motion`. Foto menggunakan WebP, dimensi eksplisit, `srcset` pada hero, dan lazy loading pada kartu.

Versi GitHub Pages ini dipindahkan ke repo publik atas permintaan pemilik proyek. URL canonical/OG memakai `https://ensiklopediamandailing.github.io/`, dan metadata robots memakai `index,follow`. Status catatan awal serta batas pemeriksaan tetap terlihat. Dokumen dan folder kerja Google Drive tidak ditautkan pada situs atau kode publik. Publikasi dokumen proyek dilakukan tersendiri setelah peninjauan hak akses.

## Hak penggunaan

Lisensi publikasi naskah proyek belum ditetapkan. Hak atas sumber akademik serta pengetahuan komunitas tetap mengikuti pemiliknya. Dua foto dan versi WebP-nya mengikuti CC BY-SA 4.0 dengan kredit Nasution007; penggunaan foto tidak menyiratkan dukungan fotografer. Ikon buku dan ilustrasi tipografi adalah elemen antarmuka umum, bukan ornamen atau aksara tradisional Mandailing.
