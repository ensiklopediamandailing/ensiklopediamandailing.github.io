# Sistem penerimaan kontribusi — panduan aktivasi

## Status
Kode backend dan panel admin adalah **scaffold siap dikonfigurasi**, **belum di-deploy** ke Google Apps Script. Tidak ada endpoint publik yang aktif. Jangan menyebut formulir GitHub Pages mengirim ke Google Drive sebelum deployment dan uji kirim nyata berhasil.

Folder antrean: `15jHZLKKkFdHGv9t1L7aVZBxcKb9yJbEI` — **Usulan Kontributor — Menunggu Moderasi**, di bawah folder proyek Ensiklopedia. Folder ini harus tetap terbatas pada admin.

## Mengapa dua deployment terpisah?
GitHub Pages tidak bisa menyimpan rahasia autentikasi Google Drive. Jangan menaruh token, service account JSON, atau API key rahasia dalam HTML/JS publik. Backend Google Apps Script menulis ke Drive atas nama pemilik. Gunakan **dua proyek Apps Script terpisah** yang berisi salinan tiga file di direktori ini:

1. **PUBLIC**: set Script Properties `MODE=public`, `INTAKE_FOLDER_ID=15jHZLKKkFdHGv9t1L7aVZBxcKb9yJbEI`, `ADMIN_EMAIL=<email admin yang diverifikasi>`. Deploy web app **Execute as me**, **Who has access: Anyone**. Publikasikan hanya URL deployment ini ke halaman kontributor. Form publik menggunakan `google.script.run.submitProposal` dari dalam HTML Apps Script; tidak perlu CORS.
2. **ADMIN**: set `MODE=admin` dan dua properti sama. Deploy web app **Execute as user accessing the web app**, **Who has access: Only myself** atau batas akses paling sempit yang didukung akun. Admin harus login ke akun Google yang cocok dengan `ADMIN_EMAIL` dan memiliki izin ke folder antrean. **Jangan** gunakan deployment `Execute as me + Anyone` untuk admin. Verifikasi `Session.getActiveUser().getEmail()` tidak kosong; jika kosong, akses ditolak.
3. Simpan URL admin secara privat. Jangan tambahkan tautan admin ke situs publik. Periksa permissions folder antrean sebelum mengaktifkan URL publik.

## Aktivasi situs
Setelah deployment publik diuji, tambahkan tautan `https://script.google.com/macros/s/.../exec` yang **benar-benar diterbitkan** pada `kontributor.html`, dengan label “Kirim usulan secara daring”. Jangan menggunakan URL contoh/placeholder sebagai tautan aktif. Formulir draf lokal dapat tetap tersedia sebagai alternatif.

## Alur
Usulan -> validasi dasar -> berkas JSON di folder antrean -> admin meninjau di panel -> `reviewing`, `approved`, atau `rejected`. Status `approved` **bukan** publikasi otomatis; editor berizin harus memeriksa fakta dan memindahkan konten ke repositori melalui PR.

## Keamanan dan batasan sebelum peluncuran publik
- Terapkan CAPTCHA/anti-spam yang kuat, pembatasan laju per pengguna/IP via infrastruktur tepercaya, kuota, batas ukuran, dan kebijakan retensi/hapus. Pemeriksaan honeypot saat ini **tidak cukup** menghadapi bot.
- Pertimbangkan kebijakan privasi, pemberitahuan pengolahan data, persetujuan atribusi, dan penghapusan data. Jangan mengumpulkan alamat rumah, nomor telepon, silsilah pribadi, atau materi sakral.
- Pengguna publik tidak diberi izin Drive atau GitHub. Tidak ada unggah media langsung; hanya teks.
- Pengujian manual yang wajib: kirim usulan dummy, verifikasi JSON di folder, cek penolakan admin tidak berizin, cek persetujuan/rejection, cek akses mobile, lalu hapus data dummy.
- Backend ini adalah prototipe operasional, bukan sistem produksi dengan perlindungan spam, logging audit terpisah, atau skala besar.
