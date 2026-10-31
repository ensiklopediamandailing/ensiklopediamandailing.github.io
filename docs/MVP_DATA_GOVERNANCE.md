# Pedoman data dan tautan silang — MVP Mandailing

Status: **rancangan teknis** (31 Oktober 2026). Dokumen ini tidak mengesahkan klaim sejarah, padanan kata, atau hubungan kekerabatan.

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

Formulir saat ini menyimpan draf lokal di browser, **bukan** mengirim usulan kepada pengelola. Sebelum mengaktifkan pengiriman, tetapkan kanal penerima, moderasi, kebijakan privasi, izin rekaman/foto, dan bukti penerimaan. Jangan menyimpan silsilah keluarga hidup, kontak pribadi atau bahan sensitif di data publik.

## Pemeriksaan sebelum rilis

1. Jalankan `python3 scripts/prepare-content.py` lalu `node scripts/check.mjs`.
2. Pastikan ID catatan unik dan `sourceIds` menunjuk referensi yang ada.
3. Periksa kredit dan izin media serta batas penafsiran.
4. Uji tautan ke `https://kamusmandailing.github.io/` dan URL ensiklopedia.
5. Pastikan label kontribusi tetap menyebut draf lokal sampai pengiriman daring benar-benar berfungsi.
6. Catat hasil dan keterbatasan di folder Google Drive proyek `Audit dan Pengembangan`.

## Backlog

- **P0:** audit deploy publik, penanda status sumber, navigasi dua arah.
- **P1:** metadata review, pemetaan ID lintas situs, kontribusi termoderasi, aksesibilitas.
- **P2:** audio berizin dan indeks pencarian gabungan.

Rencana kerja dan catatan audit: [folder Google Drive Audit dan Pengembangan](https://drive.google.com/drive/folders/1OEdcxyzmDRUAksewLPCFH0G_eUbUSFwq). Folder ini merupakan ruang kerja internal; jangan menautkan dokumen pribadi atau konten terbatas ke situs publik.
