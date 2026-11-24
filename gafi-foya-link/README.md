# gafi foya link

Dibuat dengan CodeStudio (gemini-flash-lite-latest) pada 2026-11-24.

## Isi folder

- `Code.gs` — server aplikasi (Google Apps Script)
- `index.html` — tampilan aplikasi

## Cara memasang (± 5 menit)

1. Buka https://script.google.com dan klik **Proyek baru**.
2. Hapus isi `Code.gs` bawaan, lalu tempel seluruh isi file `Code.gs` dari folder ini.
3. Klik **+** di samping *File* → **HTML**, beri nama `index` (tanpa .html), lalu tempel isi `index.html`.
4. Simpan (Ctrl+S). Di menu atas pilih fungsi **setupDatabase**, lalu klik **Jalankan**.
   - Google akan meminta izin. Pilih akunmu → **Advanced** → **Go to … (unsafe)** → **Allow**.
     Peringatan itu muncul untuk semua script buatan sendiri; aman karena kode ini milikmu.
   - Spreadsheet database dibuat otomatis di Google Drive-mu.
5. Klik **Deploy** → **New deployment** → pilih jenis **Web app**.
   - *Execute as*: **Me**
   - *Who has access*: **Anyone** (atau *Anyone with Google account* untuk tim internal)
   - Klik **Deploy** dan salin URL yang berakhiran `/exec`. Itulah alamat aplikasimu.

## Mengubah aplikasi nanti

Setelah mengedit kode, buka **Deploy** → **Manage deployments** → ikon pensil → *Version*: **New version** → **Deploy**.
URL `/exec` tetap sama, jadi link yang sudah kamu bagikan tidak berubah.

## Di HP

Setelah deploy, buka aplikasi ini di CodeStudio: bagian **Di HP** memberi link HP siap pasang (dan kode QR-nya). Dibuka di HP, aplikasinya bisa dipasang seperti aplikasi biasa — ikon sendiri, layar penuh.
Deploy manual? Tempel link `/exec`-nya di bagian itu, link HP-nya langsung jadi.

Panduan lengkap — termasuk memasang alamat sendiri dan cara menjual — ada di menu *Cara Deploy*, *Cara Hosting* dan *Cara Jualan* di CodeStudio.

## Hosting di mana saja (folder website/)

`Code.gs` dan `index.html` berjalan di Google Apps Script — di sanalah logika dan data aplikasinya (Google Sheets). Folder **website/** adalah versi web/PWA-nya yang bisa ditaruh di hosting mana pun: cPanel, VPS Nginx, hosting Windows, Netlify, Vercel, Cloudflare Pages, GitHub Pages, server Node.js, atau di folder `public/` proyek Laravel, Next.js dan React.
Konfigurasi tiap hosting sudah ada di dalamnya (`.htaccess`, `nginx.conf.example`, `web.config`, `vercel.json`, `_headers`, `server.js`). Langkah per hosting ada di `website/BACA-SAYA.txt`.
Setelah deploy di Apps Script, tempel link `/exec` di `website/app-link.js` (kalau belum terisi).
