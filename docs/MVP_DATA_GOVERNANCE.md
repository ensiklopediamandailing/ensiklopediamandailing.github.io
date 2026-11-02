# Pedoman data dan tautan silang — MVP Mandailing

Status: **rancangan teknis**, diperbarui 2 November 2026. Dokumen ini tidak mengesahkan klaim sejarah, padanan kata, atau hubungan kekerabatan.

## Sumber kebenaran

- Ensiklopedia: `scripts/prepare-content.py` untuk konten, `docs/reference-inventory.json` untuk sumber, `data/content.js` sebagai hasil generator.
- Kamus: `src/words.json` dan `src/inventory.json`; hasil terbitan berasal dari `build.py`.
- Kedua repositori tetap terpisah. Jangan menyalin seluruh data leksikal ke ensiklopedia atau mengubah ID yang telah digunakan.

## Status editorial

| Status | Makna |
| --- | --- |
| `draft` | Draf; belum siap menjadi rujukan |
| `source_attested` | Bentuk/klaim ditemukan dalam sumber yang disebut; bukan validasi semua makna/dialek |
| `editorial_reviewed` | Ditelaah editor dan dapat ditelusuri keputusan serta sumbernya |
| `speaker_reviewed` | Ditelaah penutur, dengan cakupan dialek dan izin yang tercatat |
| `disputed` | Ada versi berbeda yang harus dipertahankan dan dijelaskan |

**Catatan:** Ini kosakata status lintas-proyek yang diusulkan, bukan perintah untuk mengganti status lama dalam aplikasi. Petakan status lama secara eksplisit sebelum migrasi.

## Rancangan pemetaan tautan

Simpan daftar pemetaan sebagai data terpisah setelah ID nyata diverifikasi. Skema usulan:

```json
{
  "mapping_id": "",
  "dictionary_entry_id": "",
  "encyclopedia_article_id": "",
  "relation_type": "explains_term",
  "source_ids": [],
  "review_status": "draft",
  "reviewed_at": null
}
```

Contoh di atas adalah **template kosong**, bukan satu hubungan yang sudah terverifikasi.

Aturan penerimaan: (1) kedua ID ada di data sumber masing-masing; (2) hubungan istilah/artikel relevan secara semantik; (3) status dan sumber dicatat; (4) tautan diuji pada kedua domain; (5) tidak membuka informasi keluarga atau rekaman terbatas.

## Penerimaan kontribusi

Halaman `kontributor.html` di GitHub Pages menyimpan draf lokal di browser. Kode prototipe formulir publik dan panel admin tersimpan di `integrations/apps-script/`, tetapi **belum dideploy sebagai layanan Apps Script**. Folder intake Google Drive yang diperiksa untuk audit ini masih kosong; belum ada pengiriman uji yang terverifikasi menghasilkan berkas atau antrean moderasi. Jangan menyatakan sistem penerimaan daring sudah operasional sebelum uji ujung-ke-ujung (kirim → berkas masuk → antrean admin → moderasi) berhasil. Sebelum membuka kontribusi luas, tetapkan kebijakan privasi, izin rekaman/foto, bukti penerimaan, pembatasan penyalahgunaan, dan audit akses. Jangan menyimpan silsilah keluarga hidup, kontak pribadi atau bahan sensitif di data publik.

### Rekaman sejarah lisan

R019, *Oral History Best Practices* dari Oral History Association, tercatat berstatus **Bagian tertentu**. Inventaris menyebut bagian Preparation, Interviewing, Preservation, dan Access and Use pada PDF halaman 1–7 telah ditelaah. Gunakan ini sebagai rujukan metode yang terbatas; bukan pengganti kebijakan privasi lokal, telaah etika, atau pemeriksaan panduan lengkap.

Sebelum rekaman dipakai dalam artikel atau disimpan pada kanal kontribusi:

- Catat persetujuan narasumber untuk perekaman, penyimpanan, penggunaan kutipan, atribusi, dan tingkat akses yang diminta. Simpan bukti persetujuan di lokasi dengan akses terbatas; jangan masukkan kontak atau formulir persetujuan ke data publik.
- Beri narasumber kesempatan meninjau materi sebelum publikasi dan catat cakupan materi yang telah disetujui.
- Pisahkan rekaman asli, transkrip, dan kutipan publik. Batasi akses pada bahan mentah sesuai persetujuan; simpan metadata dan konteks yang diperlukan untuk menemukan rekaman penuh.
- Saat mengutip, pertahankan konteks dan sitasikan rekaman lengkap serta lokatornya. Potongan kutipan tidak menggantikan rekaman atau rangkaian pedoman metode.
- Jangan menyatakan rekaman telah diterima, disimpan, ditinjau, atau disetujui sebelum tahap tersebut benar-benar diuji dan dicatat.

Checklist ini adalah rancangan proses untuk penerapan mendatang. Ia tidak mengaktifkan endpoint atau membuktikan alur Apps Script.

## Pemeriksaan sebelum rilis

1. Jalankan `python3 scripts/prepare-content.py` lalu `node scripts/check.mjs`.
2. Pastikan ID catatan unik dan `sourceIds` menunjuk referensi yang ada.
3. Periksa kredit dan izin media serta batas penafsiran.
4. Uji tautan ke `https://kamusmandailing.github.io/` dan URL ensiklopedia.
5. Pastikan `kontributor.html` tetap menyebut draf lokal; bedakan dengan formulir Apps Script terpisah yang masih menunggu verifikasi penyimpanan dan moderasi.
6. Catat hasil dan keterbatasan di folder Google Drive proyek `Audit dan Pengembangan`.
7. Untuk rekaman sejarah lisan, periksa bukti persetujuan, kesempatan peninjauan narasumber, batas akses, metadata, konteks kutipan, dan sitasi rekaman lengkap sesuai lingkup R019 yang tercatat.

## Backlog

- **P0:** audit deploy publik, penanda status sumber, navigasi dua arah.
- **P1:** metadata review, pemetaan ID lintas situs, kontribusi termoderasi dan protokol rekaman sejarah lisan, aksesibilitas.
- **P2:** audio berizin dan indeks pencarian gabungan.

Rencana kerja dan catatan audit disimpan di folder Google Drive internal proyek. URL folder internal tidak disalin ke repositori publik; jangan menautkan dokumen pribadi atau konten terbatas ke situs publik.


## Menyiapkan draf artikel

Gunakan [templat riset artikel](ARTICLE_RESEARCH_TEMPLATE.md) untuk mencatat pertanyaan, pernyataan yang akan diperiksa, lokator sumber, batas bukti, dan status telaah. Templat sengaja kosong: mengisinya tidak dengan sendirinya memverifikasi sumber atau menyetujui publikasi. Jangan memindahkan nilai status usulan lintas-proyek ke data artikel tanpa pemetaan skema yang terdokumentasi.
