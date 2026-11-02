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

## Kartu inventaris sumber R012 pada tema Sejarah — 2 November 2026

Generator `npm run content:generate` menghasilkan 13 catatan, 23 sumber, 10 tema, dan 8 nama marga. Kartu `rujukan-politik-tapanuli-1915-1940` berstatus **Inventaris sumber** dan menautkan R012. Kartu mempertahankan 2001 sebagai tahun edisi yang dicatat, tidak menganggapnya tanggal peristiwa, serta tidak memakai wilayah administratif sebagai kategori etnis.

`npm run check` lulus 510 pemeriksaan integritas; `git diff --check` lulus. Snapshot memiliki 6 Ringkasan terbatas, 6 Inventaris sumber, dan 1 Dokumentasi visual beratribusi. Delapan belas dari 23 ID sumber muncul pada catatan; lima belum tertaut.

Batas: R012 tetap berstatus Metadata dan katalog. Isi buku, naskah Inggris, dan arsip belum diperiksa; kartu hanya memakai metadata dan anotasi inventaris, tidak merangkum isi atau menetapkan klaim sejarah. Pemeriksaan lokal tidak mencakup pembaca layar, browser/Pages, telaah komunitas, atau uji Apps Script end-to-end. CI `validate` lulus pada [run 41369349707](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41369349707) untuk commit konten `ffa4fa9` yang menambahkan kartu R012.

## Kartu inventaris sumber R017 pada tema Bahasa & sastra — 2 November 2026

Generator `npm run content:generate` menghasilkan 14 catatan, 23 sumber, 10 tema, dan 8 nama marga. Kartu `rujukan-aksara-batak-unicode` menautkan R017 dengan status catatan **Inventaris sumber**. Status sumber R017 tetap **Bagian tertentu**; inventaris proyek hanya mencatat telaah halaman 1–2, terutama §2.1 Mandailing, serta pembandingan dengan bagan Unicode 18.0.0.

`npm run check` lulus 521 pemeriksaan integritas; `git diff --check` lulus. Snapshot memuat 6 Ringkasan terbatas, 7 Inventaris sumber, dan 1 Dokumentasi visual beratribusi. Sembilan belas dari 23 ID sumber tertaut; empat belum tertaut.

Batas: proposal R017 adalah kontribusi awal, bukan spesifikasi Unicode saat ini atau bukti asal aksara pada naskah tertentu. Pembaruan ini tidak memeriksa ulang PDF. Pemeriksaan lokal tidak mencakup browser/Pages, telaah komunitas, aksesibilitas pembaca layar, atau uji Apps Script end-to-end. CI `validate` lulus pada [run 41369696427](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41369696427) untuk commit konten `2217447`.

## Kartu inventaris sumber R018 pada tema Adat — 2 November 2026

Generator `npm run content:generate` menghasilkan 15 catatan, 23 sumber, 10 tema, dan 8 nama marga. Kartu `kerangka-unesco-warisan-takbenda` menautkan R018 sebagai rujukan institusional dan berstatus **Inventaris sumber**. Status R018 tetap **Metadata dan katalog**.

`npm run check` lulus 532 pemeriksaan integritas; `git diff --check` lulus. Snapshot memuat 6 Ringkasan terbatas, 8 Inventaris sumber, dan 1 Dokumentasi visual beratribusi. Dua puluh dari 23 ID sumber tertaut; tiga belum tertaut.

Batas: teks penuh dan pasal konvensi belum diperiksa. Kartu tidak menyatakan bahwa unsur budaya Mandailing tertentu telah tercatat atau ditetapkan sebagai warisan budaya. Pemeriksaan lokal tidak mencakup browser/Pages, telaah komunitas, aksesibilitas pembaca layar, atau uji Apps Script end-to-end. CI `validate` lulus pada [run 41370233614](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41370233614) untuk commit konten `1b2e8e9`.

## Kartu inventaris sumber R003 dan R016 — 2 November 2026

Generator `npm run content:generate` menghasilkan 17 catatan, 23 sumber, 10 tema, dan 8 nama marga. Kartu `rujukan-umum-budaya-mandailing` mencatat R003 sebagai rujukan pengantar lintas topik; kartu tidak merangkum buku atau menyatakan klaim asal-usul. Kartu `rujukan-statistik-mandailing-natal-2026` mengindeks publikasi BPS R016 tanpa mengekstrak angka.

`npm run check` lulus 554 pemeriksaan integritas; `git diff --check` lulus. Snapshot memuat 6 Ringkasan terbatas, 10 Inventaris sumber, dan 1 Dokumentasi visual beratribusi. Dua puluh dua dari 23 ID sumber tertaut; R019 tetap menjadi rujukan metode internal yang tidak ditautkan pada catatan publik.

Batas: R003 dan R016 tetap Metadata dan katalog. Isi buku R003 dan tabel/angka R016 belum diperiksa. Data kabupaten tidak dianggap sebagai jumlah etnis Mandailing. CI `validate` lulus pada [run 41370647363](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41370647363) untuk commit konten `3e1fa3a`.

## Pemeriksaan kelengkapan tautan sumber — 2 November 2026

Pemeriksaan `scripts/check.mjs` kini menghitung ID yang dipakai oleh catatan publik dan menolak sumber yang tidak tertaut tanpa pengecualian tertulis pada `docs/CONTENT_COVERAGE.md`. Untuk snapshot ini, satu-satunya pengecualian adalah R019 sebagai rujukan metode internal; pemeriksaan ini hanya menilai kelengkapan relasi ID, bukan dukungan bukti.

Salinan kerja lokal lulus `npm run check` dengan 556 pemeriksaan integritas dan `git diff --check`. Salinan itu masih memiliki perubahan lokal; pemeriksaan head PR dibuktikan oleh CI validate yang sukses pada [run 41371664312](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41371664312) untuk commit `4ba7748`.

Pemeriksaan ini tidak menilai ketepatan klaim budaya atau kelengkapan telaah sumber. Pembacaan penuh, tinjauan komunitas, browser/Pages, audit pembaca layar, dan uji Apps Script end-to-end tetap belum dilakukan.

## Status baca sumber pada kartu — 2 November 2026

Kartu catatan kini menampilkan kedalaman baca untuk sumber yang tertaut, terpisah dari status editorial catatan. Jika beberapa sumber memiliki status baca berbeda, semua status unik dicantumkan; kartu dokumentasi visual tidak menampilkan status baca sumber. Nilai berasal dari inventaris yang ada dan tidak dinaikkan.

Pemeriksaan lokal lulus 558 pemeriksaan integritas dan `git diff --check`. GitHub Actions validate lulus pada [run 41372278166](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41372278166) untuk commit `bc1fd3c`. Pemeriksaan statis tidak membuktikan tampilan pada semua ukuran layar atau audit pembaca layar; pemeriksaan tersebut masih terbuka.

## Pencarian metadata sumber — 2 November 2026

Pencarian catatan kini mencakup ID, judul, penulis, tahun, penerbit, status baca, dan lokasi pemeriksaan untuk sumber yang ditautkan. Ini menyelaraskan fitur pencarian dengan label “Cari … sumber” tanpa mengubah isi, relasi, atau status editorial sumber. Versi cache `app.js` diperbarui.

`npm run check` lulus 560 pemeriksaan integritas; `git diff --check` lulus. Pemeriksaan integritas memastikan metadata sumber masuk ke indeks pencarian dan versi cache menunjuk berkas antarmuka yang baru. GitHub Actions `validate` lulus pada [run 41372768652](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41372768652) untuk head PR `c32b3c7`, yang membawa perubahan antarmuka, pemeriksaan, dan laporan awal.

Perubahan ini tidak memverifikasi isi sumber, klaim budaya, atau ketepatan relasi sumber. Pembacaan penuh, telaah komunitas, pengujian browser/Pages, audit pembaca layar, dan uji Apps Script end-to-end tetap belum dilakukan.


## Fokus dialog bacaan — sesi otomatis 2 November 2026

Judul dialog kini menerima fokus saat bacaan berganti, dan penutupan tautan langsung mengarahkan fokus ke pencarian. Uji keyboard, navigasi catatan–sumber, bibliografi, serta lebar 320/390/768/1280 px dicatat pada [audit fokus dialog](audits/2026-11-02-dialog-focus.md) beserta hasil terstruktur dan hash berkas. Generator lulus; worktree gabungan lulus 566 pemeriksaan integritas dan `git diff --check`. Perubahan filter editorial dari pekerjaan lain dipertahankan. Hasil ini adalah uji lokal, belum CI/Pages atau uji pembaca layar aktual. Tidak ada status budaya, sumber, atau intake yang dinaikkan.

## Filter status editorial dan integrasi audit fokus — 2 November 2026

Katalog kini menyediakan filter status editorial yang nilainya dibentuk dari status catatan aktif dan dapat digabung dengan pencarian serta filter tema. Hapus filter dan pintasan tema juga mengembalikan status ke “Semua status”. Tidak ada nilai status editorial yang diubah. Perubahan fokus dialog—fokus ke judul saat bacaan dibuka atau berganti, kembali ke pembuka, serta fallback ke kotak pencarian untuk fragmen langsung—disertakan bersama audit dan hasil terstruktur.

`node --check app.js`, `npm run check` (566 pemeriksaan integritas), dan `git diff --check` lulus. CI `validate` lulus pada [run 41373282855](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41373282855) untuk head kode PR `d5dd51b`. Hash SHA-256 di hasil audit cocok dengan snapshot berkas lokal yang juga cocok dengan berkas kode pada head tersebut. Audit mencatat uji keyboard dan ukuran 320/390/768/1280 px di browser lokal.

Uji browser/Pages setelah penerbitan, uji pembaca layar/VoiceOver, dan pemeriksaan di Safari/Firefox/perangkat fisik belum dilakukan. PR #36 tetap terbuka, mergeable, belum digabung atau diterbitkan. Pembacaan sumber penuh, tinjauan komunitas/penutur, serta uji Apps Script end-to-end tetap terbuka.

## Uji perilaku pencarian dan filter — 2 November 2026

Logika pencarian/filter dipisahkan ke `entry-filter.js` agar fungsi yang dipakai halaman dapat dieksekusi langsung oleh pemeriksaan Node tanpa browser. Pemeriksaan kini menguji bahwa semua catatan kembali tanpa filter, tiap status menghasilkan catatan yang tepat, filter ID sumber dapat digabung dengan tema dan status, dan status yang tidak dikenal tidak menghasilkan catatan. Pemisahan ini juga membantu menangkap dan memperbaiki rujukan variabel pencarian lama pada penghitung hasil.

`node --check app.js`, `node --check entry-filter.js`, `npm run check` (575 pemeriksaan integritas), dan `git diff --check` lulus. GitHub Actions `validate` lulus pada [run 41373985440](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41373985440) untuk head kode PR `cfa60b5`. Konten dan status editorial tidak berubah.

## Perincian terbatas artikel Dalihan Na Tolu — 2 November 2026

Artikel `dalihan-na-tolu` kini menyebut konteks yang sudah dicatat pada inventaris R001: satu observasi Markobar di acara perkawinan Pasar Maga pada 7 Juni 2019 dan sampel baca PDF halaman 4–8. Batas jumlah informan dan ketidakkonsistenan label pendekatan tetap dijelaskan. Status artikel **Ringkasan terbatas** dan status baca R001 **Bagian tertentu** tidak berubah; tidak ada pembacaan sumber baru atau generalisasi lintas tempat dan generasi.

Generator menghasilkan 17 catatan, 23 sumber, 10 tema, dan 8 nama marga. `npm run check` lulus 577 pemeriksaan integritas; `node --check app.js`, `node --check entry-filter.js`, `node --check data/content.js`, dan `git diff --check` lulus. Pemeriksaan baru mengunci status/link R001 serta batas halaman dan konteks lokal agar pembaruan mendatang tidak menaikkan status secara tidak sengaja.

Batas: hasil ini adalah pemeriksaan lokal. Filter editorial belum diuji di browser, tidak ada pemeriksaan ulang PDF atau telaah penutur, dan uji Apps Script end-to-end, pembaca layar, serta browser/Pages belum dilakukan. GitHub Actions `validate` lulus pada [run 41374690900](https://github.com/ensiklopediamandailing/ensiklopediamandailing.github.io/actions/runs/41374690900) untuk head `aa3dc42`, yang memuat perubahan artikel dan pemeriksaan R001.
