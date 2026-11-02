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


## Pembaruan pemeriksaan setelah PR #25 dan #26 — 1 November 2026

| Area | Hasil |
| --- | --- |
| Generator konten | Menghasilkan 10 catatan, 23 rekaman sumber, 10 tema, dan 8 nama marga |
| Pemeriksaan integritas lokal | node scripts/check.mjs lulus 466 pemeriksaan integritas |
| CI PR #25 | [Run 41304180212](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41304180212) sukses; validasi main [41304265349](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41304265349) dan Pages [41304264893](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41304264893) sukses |
| CI PR #26 | [Run 41304461129](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41304461129) sukses; validasi main [41304526552](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41304526552) dan Pages [41304526450](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41304526450) sukses |
| Situs publik | Artikel etnobotani menampilkan status Ringkasan terbatas, sumber R014, locator halaman, batas klaim, dan tautan DOI. Tanggal catatan editorial tampil 1 November 2026 setelah perbaikan metadata pada PR #26. |

Pemeriksaan lokal memakai salinan kode dan inventaris dari GitHub; berkas media sementara hanya dipakai untuk memastikan jalur aset terdaftar. Karena itu, CI GitHub terhadap aset repository adalah pemeriksaan integritas rilis yang berwenang.

Batas pemeriksaan: R014 ditautkan ke laman jurnal resmi dan ringkasan hanya mengatribusikan hasil pada satu studi di Tanjung Julu. Inventaris tetap mencatat 9 sumber sample_read, 12 metadata_only, 2 abstract_excerpt, dan 0 full_read. Dua puluh dua referensi lain tidak dibaca ulang satu per satu dalam pemeriksaan ini. Belum ada tinjauan komunitas. Uji VoiceOver/pembaca layar, sweep seluruh tautan sumber, pengukuran kontras teks di atas foto, dan uji Apps Script ujung-ke-ujung belum dilakukan. Folder intake yang diperiksa masih kosong; pengiriman daring tetap belum aktif.

Workflow mencatat peringatan non-blocking terkait perubahan runtime Node.js pada GitHub Actions dan migrasi runner ubuntu-latest. Keduanya tidak menggagalkan pemeriksaan.


## Pemeriksaan lanjutan dan daftar sumber — 1 November 2026

PR #28 menambahkan empat pemeriksaan otomatis untuk tanggal editorial: metadata project.updatedOn harus berupa tanggal kalender ISO yang valid; app.js mengambil nilai itu, memformatnya dalam bahasa Indonesia dengan zona waktu UTC, lalu menampilkan hasilnya pada catatan. Pemeriksaan PR lulus pada [run 41311555670](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41311555670). Perubahan hanya pada pemeriksaan; tidak mengubah konten situs.

PR #29 memperbarui dialog daftar sumber agar jumlahnya dihitung dari data yang dimuat, mengganti keterangan katalog lama, dan memperbarui hash cache app.js. Tiga pemeriksaan regresi baru memastikan hitungan dinamis, teks jumlah, dan ketiadaan label tetap “19 rekaman”. Pemeriksaan lokal lulus 473 pemeriksaan dengan 10 catatan dan 23 sumber. Pemeriksaan browser langsung setelah penerbitan menampilkan “Inventaris saat ini memuat 23 rekaman sumber” serta daftar R001–R023.

CI PR #29 lulus pada [run 41311931379](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41311931379); validasi main [41311974656](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41311974656) dan GitHub Pages [41311974038](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41311974038) juga sukses. Perubahan hanya memperbarui tampilan jumlah sumber; tidak mengubah isi budaya atau status pembacaan.


## Navigasi dua arah catatan dan sumber — 2 November 2026

PR #31 menambahkan tautan dari artikel ke rekam sumber, daftar balik ke catatan yang memakai ID sumber tersebut, serta fragmen langsung #sumber/<id>. Hubungan diturunkan dari sourceIds pada data aktif. Tidak ada isi budaya, metadata sumber, atau status editorial yang diubah.

Pemeriksaan integritas lokal lulus 477 pemeriksaan: 10 catatan, 10 tema, dan 23 sumber. CI PR #31, pemeriksaan validate pada [run 41360415504](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41360415504), sukses. Runner mencatat peringatan Node.js 20 dan pemberitahuan migrasi ubuntu-latest ke Ubuntu 26; keduanya non-blocking.

PR #31 digabung squash pada SHA 2c881c98e494da58fba8029001f3478cc0421275. Pemeriksaan browser dan GitHub Pages pasca-merge belum dicatat pada pembaruan ini. Pemetaan lintas Kamus–Ensiklopedia dan semua tahap editorial yang memerlukan verifikasi tetap ditunda.

## Kartu inventaris sumber R015 pada tema Agama — 2 November 2026

Generator `npm run content:generate` menghasilkan 11 catatan, 23 sumber, 10 tema, dan 8 nama marga. Kartu `islamisasi-mandailing-natal` memakai status **Inventaris sumber** dan menautkan R015. Isinya hanya memaparkan metadata yang sudah tercatat pada inventaris, membedakan tahun volume 2021 dari tanggal publikasi laman 18 Mei 2022, serta menahan kesimpulan kronologi.

`npm run check` lulus 488 pemeriksaan integritas pada snapshot lokal: ID, referensi, kategori, aset, tanggal, dan pemeriksaan dasar lain. `git diff --check` juga lulus. Ringkasan status pada data: 6 Ringkasan terbatas, 4 Inventaris sumber, dan 1 Dokumentasi visual beratribusi; 16 dari 23 ID sumber tercantum pada setidaknya satu catatan.

Batas: R015 tetap berstatus Abstrak atau cuplikan. Teks penuh dan arsip belum diperiksa; kartu ini tidak merangkum temuan atau menetapkan kronologi. Pemeriksaan ini tidak mencakup pembaca layar, browser/Pages, telaah komunitas, atau uji Apps Script. CI PR #36 lulus pada run 41368261488 (pemeriksaan validate; 2 November 2026).

## Kartu inventaris sumber R011 pada tema Sejarah — 2 November 2026

Generator `npm run content:generate` menghasilkan 12 catatan, 23 sumber, 10 tema, dan 8 nama marga. Kartu `rujukan-buku-pelajaran-mandailing-1873` berstatus **Inventaris sumber** dan menautkan R011. Teks judul, penulis, tahun, nama terbitan, volume, nomor, halaman, dan URL mengikuti metadata yang sudah tersimpan pada inventaris proyek.

`npm run check` lulus 499 pemeriksaan integritas; `git diff --check` lulus. Snapshot memiliki 6 Ringkasan terbatas, 5 Inventaris sumber, dan 1 Dokumentasi visual beratribusi. Tujuh belas dari 23 ID sumber muncul pada catatan; enam belum tertaut.

Batas: R011 tetap berstatus Metadata dan katalog. Artikel penuh dan buku pelajaran primer belum diperiksa; kartu tidak merangkum analisisnya atau menarik kesimpulan sejarah. Pemeriksaan lokal ini tidak mencakup aksesibilitas pembaca layar, browser/Pages, telaah komunitas, atau uji Apps Script. CI `validate` lulus pada [run 41368857650](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41368857650) untuk commit konten `b3c47fd`; run tersebut menguji generator dan data R011/R015 sebelum pembaruan catatan CI ini.
