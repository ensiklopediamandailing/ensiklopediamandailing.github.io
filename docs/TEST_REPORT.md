# Laporan pengujian v0.1

Tanggal: 27 Oktober 2026 (Asia/Kuala_Lumpur). Lingkungan: Chrome desktop pada pratinjau statis. Pengujian responsif memakai iframe berukuran CSS 320, 390, 768, dan 1280 piksel, ditambah halaman desktop. Lebar isi masing-masing 305, 375, 753, dan 1265 piksel karena scrollbar desktop. Ini bukan pengujian perangkat fisik atau semua mesin peramban.

| Area | Hasil yang diamati |
| --- | --- |
| Desktop dan ponsel | Hero serta bagian editorial tampil; tidak ada overflow horizontal pada empat lebar yang diperiksa |
| Menu ponsel | Menu membuka navigasi; memilih Jelajahi menutup menu dan menuju bagian yang benar |
| Pencarian | Pencarian Gordang menghasilkan satu catatan yang sesuai, dengan sumber R010 |
| Filter | Tema bahasa menghasilkan dua catatan; kuliner menampilkan status rencana kajian, tanpa konten buatan |
| Reset | Menghapus filter mengembalikan delapan catatan awal |
| Dalihan Na Tolu | Pemilihan tab serta tombol panah mengubah panel dan keadaan ARIA |
| Marga | Tombol Nasution membuka status inventaris beserta R004, tanpa asal-usul atau silsilah rekaan |
| Dialog catatan | Catatan Gordang menampilkan batas pembacaan, sumber, dan kredit media; Escape menutup dialog |
| Bibliografi | Dialog daftar sumber memuat 19 rekaman sumber |
| Draf kontribusi | Data uji sintetis berhasil disimpan, lalu dipulihkan setelah reload dengan status belum dikirim |
| Unduhan draf | Berkas teks benar-benar terunduh; status tetap menyatakan belum dikirim |
| Penghapusan draf | Draf uji dihapus melalui kontrol antarmuka, lalu status penghapusan tampil |
| Validasi wajib | Formulir kosong ditolak oleh validasi native; tidak muncul pesan tersimpan |
| Tautan langsung | Fragmen `#catatan/dalihan-na-tolu` membuka catatan yang sesuai |
| Kredit dan pedoman | Dua tautan lisensi foto tersedia; dialog privasi dan pedoman sumber dapat dibuka serta ditutup |
| Kata tanpa hasil | Kata uji yang tidak cocok menampilkan keadaan kosong dan dapat direset |
| Konsol aplikasi | Tidak ditemukan peringatan/kesalahan yang berasal dari URL aplikasi pada log yang diperiksa; pesan ekstensi browser di luar aplikasi dikecualikan |

`node scripts/check.mjs` lulus 352 pemeriksaan: sintaks JavaScript, ID unik, sumber rujukan, kategori, aset lokal, metadata, tautan fragmen, dan rasio kontras pasangan warna utama. Rasio yang dihitung: teks utama 13,49:1, teks pendamping 5,53:1, marun 11,14:1 pada gading; tombol terang 11,72:1 dan aksen judul 7,18:1 pada marun; hijau 6,25:1 pada kertas; fokus emas 3,28:1 pada gading. Pemeriksaan ini tidak menggantikan audit aksesibilitas lengkap atau penilaian ilmiah isi sumber.

Keterbatasan: belum ada pengujian pembaca layar, Safari/Firefox, perangkat sentuh fisik, kondisi penyimpanan peramban yang diblokir, atau endpoint kontribusi. Tidak ada endpoint yang disediakan pada rilis ini. Tinjauan penutur, tokoh adat, peneliti Mandailing, dan pemilik pengetahuan belum dilakukan. Tautan luar dapat berubah dan sebagian sumber hanya tersedia sebagai katalog/abstrak.

## Pemindahan ke GitHub Pages

Kode ditempatkan pada root repo. Generator dan pemeriksaan integritas disesuaikan dengan lokasi baru. Canonical/OG memakai domain GitHub Pages, metadata robots memakai `index,follow`, dan `.nojekyll` ditambahkan. Tautan dokumen/folder kerja dihilangkan dari sumber publik; tautan navigasi penggantinya mengarah ke metodologi dan kontribusi pada halaman yang sama. Bibliografi akademik dan atribusi media publik tetap tersedia. Pemeriksaan migrasi menjalankan generator, sintaks, integritas aset/rujukan, domain canonical, serta ketiadaan tautan dokumen kerja. Status penerbitan versi ini tersedia pada tab Actions repo untuk commit yang bersangkutan; hasil interaksi di atas berasal dari pengujian versi awal sebelum pemindahan.
