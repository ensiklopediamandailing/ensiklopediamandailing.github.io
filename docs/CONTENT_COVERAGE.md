# Peta cakupan konten — 2 November 2026

Snapshot struktur `data/content.js` setelah pembaruan generator. Angka menunjukkan isi dan relasi ID yang tampil pada data; audit ini bukan validasi kebenaran sejarah atau budaya.

## Catatan menurut tema

| Tema | Catatan | ID catatan |
| --- | ---: | --- |
| Sejarah | 5 | `jejak-material`, `asal-usul-kuala-lumpur`, `rujukan-buku-pelajaran-mandailing-1873`, `rujukan-politik-tapanuli-1915-1940`, `rujukan-statistik-mandailing-natal-2026` |
| Adat | 3 | `dalihan-na-tolu`, `kerangka-unesco-warisan-takbenda`, `rujukan-umum-budaya-mandailing` |
| Marga | 1 | `inventaris-marga` |
| Bahasa & sastra | 3 | `kamus-angkola-mandailing`, `sumber-tertulis`, `rujukan-aksara-batak-unicode` |
| Kesenian | 1 | `gordang-sambilan` |
| Arsitektur | 1 | `bagas-godang` |
| Kuliner | 0 | — |
| Pengetahuan lokal | 1 | `etnobotani-tanjung-julu` |
| Agama | 1 | `islamisasi-mandailing-natal` |
| Diaspora | 1 | `diaspora-dan-kampung` |

Total 17 catatan pada 9 dari 10 tema. Catatan baru pada tema Adat dan Sejarah berstatus **Inventaris sumber**; tema Kuliner masih kosong.

## Status editorial dan baca

| Status catatan | Jumlah |
| --- | ---: |
| Ringkasan terbatas | 6 |
| Inventaris sumber | 10 |
| Dokumentasi visual beratribusi | 1 |

Dari 23 rekaman sumber, 9 berstatus **Bagian tertentu**, 12 **Metadata dan katalog**, 2 **Abstrak atau cuplikan**, dan 0 **Teks penuh**. Belum ada catatan yang ditinjau komunitas.

## Relasi sumber

Dua puluh dua ID sumber muncul pada sekurangnya satu catatan: 8 berstatus Bagian tertentu, 12 Metadata dan katalog, dan 2 Abstrak atau cuplikan. Satu ID, `R019`, belum ditautkan oleh `sourceIds`; R019 menjadi rujukan pedoman metode internal.

Pemeriksaan `scripts/check.mjs` memastikan setiap sumber yang belum tertaut memiliki pengecualian tertulis pada audit cakupan. Saat ini satu-satunya pengecualian adalah R019. Pemeriksaan ini menguji kelengkapan relasi ID, bukan relevansi sumber atau dukungan bukti.

Kartu `islamisasi-mandailing-natal` menautkan R015 sebagai rekaman bibliografis untuk tema Agama. R015 tetap berstatus Abstrak atau cuplikan. Tautan itu tidak menyatakan bahwa abstrak mendukung suatu kronologi atau kesimpulan sejarah; kartu hanya menginventaris metadata dan mencatat kebutuhan pemeriksaan teks lengkap serta arsip.

Kartu `rujukan-buku-pelajaran-mandailing-1873` menautkan R011 sebagai rekaman bibliografis untuk tema Sejarah. R011 tetap berstatus Metadata dan katalog. Artikel dan buku pelajaran primer belum diperiksa; kartu tidak merangkum analisis atau menetapkan kesimpulan tentang periode kolonial.

Kartu `rujukan-politik-tapanuli-1915-1940` menautkan R012 sebagai rekaman katalog untuk tema Sejarah. R012 tetap berstatus Metadata dan katalog; buku, naskah Inggris, dan arsip belum diperiksa. Tahun edisi 2001 tidak dipakai sebagai tanggal peristiwa, dan kategori administratif Tapanuli tidak diperlakukan sebagai identitas etnis.

Kartu `rujukan-aksara-batak-unicode` menautkan R017 untuk tema Bahasa & sastra. R017 tetap berstatus Bagian tertentu dan hanya pembacaan halaman 1–2, khususnya §2.1 Mandailing, yang tercatat. Proposal awal tersebut bukan spesifikasi Unicode saat ini atau bukti asal aksara pada naskah tertentu.

Kartu `kerangka-unesco-warisan-takbenda` menautkan R018 sebagai rujukan institusional untuk tema Adat. R018 tetap Metadata dan katalog; konvensi ini tidak membuktikan status penetapan bagi unsur Mandailing tertentu.

Kartu `rujukan-umum-budaya-mandailing` menautkan R003 pada tema Adat sebagai rujukan umum lintas topik. Buku tetap Metadata dan katalog; isi per bab belum ditelaah.

Kartu `rujukan-statistik-mandailing-natal-2026` menautkan R016 pada tema Sejarah sebagai rujukan data administratif. Publikasi tetap Metadata dan katalog; belum ada tabel atau angka yang diekstrak, dan data kabupaten tidak diperlakukan sebagai jumlah etnis Mandailing.

## Batas penggunaan

- `sourceIds` menunjukkan rekaman yang dicantumkan pada sebuah catatan. Relasi tersebut tidak membuktikan bahwa setiap klaim didukung oleh keseluruhan sumber.
- Status Inventaris sumber berarti rujukan dikenali dan dicatat; status ini bukan ringkasan isi atau pengesahan klaim.
- Tema kosong dan sumber yang belum ditautkan membantu menyusun pekerjaan editorial berikutnya, tetapi tidak memberi dasar untuk menulis klaim tanpa bukti.
- Snapshot ini tidak menambahkan atau menaikkan status baca sumber. Tinjauan komunitas, pembacaan penuh, pemeriksaan browser/Pages, aksesibilitas, dan uji kontribusi tetap pekerjaan terpisah.
