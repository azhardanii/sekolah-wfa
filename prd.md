# 📄 Product Requirements Document (PRD): AI SEO Article Automation

## 1. Tujuan & Visi (Objective)
Membangun sistem otomatisasi pembuatan artikel SEO yang terintegrasi langsung dengan platform Sekolah WFA. Artikel akan digenerate oleh AI (teks & *thumbnail*), disimpan sebagai *draft*, dan menunggu *human-proofing* sebelum dipublikasikan di Mading. Tujuan utamanya adalah mendominasi *keyword* seputar WFA, produktivitas, dan AI di Indonesia, sekaligus menjadi *funnel* organik untuk produk Sekolah WFA.

## 2. Alur Kerja (Workflow)
1. **Pemicu Waktu (Cron Job):** Sistem berjalan otomatis setiap hari pukul 06:00 WIB.
2. **Batch Generation:** Sistem merancang dan mengeksekusi pembuatan **10 artikel sekaligus** dengan kategori yang bervariasi.
3. **Pembuatan Ide & Teks (AI Text Generation):** AI menentukan topik, menyusun struktur SEO, menyisipkan *soft-selling* produk Sekolah WFA, dan menulis konten secara penuh.
4. **Pembuatan Gambar (AI Image Generation):** Berdasarkan judul artikel, sistem memanggil API (seperti Vertex AI Imagen atau DALL-E) untuk membuat *thumbnail* artikel.
5. **Penyimpanan Teks & Media:** Gambar diunggah ke *storage* (Supabase Storage), lalu *link* gambar dan teks artikel disimpan ke *database* dengan status `DRAFT`.
6. **Notifikasi WhatsApp:** Sistem mengirimkan pesan otomatis ke WA-mu bahwa 10 draft hari ini sudah siap di-*review*.
7. **Human Proofing (Ruang Arsip):** Kamu membuka *dashboard*, mengedit hasil AI, lalu mengubah status menjadi `PUBLISHED` atau `SCHEDULED`.

## 3. Skema Database (Supabase / Prisma)
Tambahkan skema berikut di `prisma/schema.prisma`:

| Column Name | Data Type | Keterangan |
| :--- | :--- | :--- |
| `id` | String (CUID/UUID) | Primary Key |
| `title` | String | Judul artikel (SEO Optimized) |
| `slug` | String | URL artikel (Unique) |
| `content` | Text / JSON | Isi konten (Bisa format HTML dari Tiptap) |
| `thumbnailUrl` | String | Link gambar dari Supabase Storage |
| `category` | String | Enum Kategori (Lihat daftar di bawah) |
| `status` | String | Enum: `DRAFT`, `SCHEDULED`, `PUBLISHED` |
| `seoKeywords` | String[] | Array *keyword* yang disasar |
| `scheduledAt` | DateTime (Nullable)| Jika artikel ingin dijadwalkan tayang otomatis |
| `createdAt` | DateTime | Waktu *generate* (otomatis) |
| `updatedAt` | DateTime | Waktu terakhir diedit (otomatis) |

---

## 🛠️ Step-by-Step Perombakan Next.js

### Bagian 1: Backend & Automation (API Routes)

**1. `vercel.json` (Edit di root folder)**
Tambahkan konfigurasi `cron` agar Vercel mengeksekusi *route* setiap jam 6 pagi WIB (23:00 UTC).

**2. `app/api/cron/generate-article/route.ts` (File Baru)**
Ini adalah "otak" otomatisasinya. Di dalam *file* ini, alur logika utamanya adalah:
* **Verifikasi *Authorization Header*:** Pastikan hanya Vercel Cron atau *request* internal yang bisa memicu API ini.
* **Batch Topic Generation:** Panggil LLM untuk merancang 10 ide judul/topik artikel berbeda berdasarkan daftar kategori di bawah.
* **Looping/Batch Processing (10 Artikel):** Untuk setiap ide dari 10 topik tersebut:
  * Panggil LLM (menggunakan AI SDK) dengan instruksi sistem khusus gaya bahasa Sekolah WFA untuk menulis konten *full-length* (termasuk *soft-selling* produk).
  * Panggil API Image Generation untuk membuat *thumbnail* yang relevan dengan judul.
  * *Upload* gambar ke `lib/supabase.ts` storage.
  * *Insert* data teks HTML dan URL gambar ke Prisma DB dengan status `DRAFT` dan simpan *tag* kategorinya.
* **Notifikasi:** Lakukan HTTP POST ke provider WhatsApp (dengan *payload* "Halo! 10 Artikel Draft AI untuk hari ini sudah siap di-review di Ruang Arsip.").

### 🗂️ Perluasan Kategori Artikel (WFA Ecosystem)
AI harus diinstruksikan untuk membagi 10 artikel tersebut ke dalam variasi kategori berikut:
1. **`WFA_PRODUCTIVITY`**: Tips, *hacks*, *step-by-step* manajemen waktu, dan *tools* pendukung produktivitas.
2. **`TECH_AI_UPDATE`**: Berita teknologi terbaru, *update* algoritma media sosial, dan *review tools* AI.
3. **`CONTENT_CREATION`**: Psikologi audiens, teknik *editing*, penulisan *hook* viral, dan tren kreator.
4. **`REMOTE_CAREER_HACKS`**: Tips tembus *interview* kerja *remote*, negosiasi gaji, dan membangun portofolio.
5. **`DIGITAL_NOMAD_LIFESTYLE`**: Rekomendasi *setup* meja kerja, *review cafe wfc-friendly*, dan tips *traveling* sambil bekerja.
6. **`FINANCIAL_MANAGEMENT`**: Cara mengatur keuangan untuk *freelancer* dan manajemen *multi-currency income*.
7. **`WELLNESS_MENTAL_HEALTH`**: Cara menghindari *burnout* dan menjaga *work-life balance*.

---

### Bagian 2: Frontend Dashboard (Revamp `app/ruangarsip`)

**1. `app/ruangarsip/layout.tsx` (Edit)**
Tambahkan menu navigasi khusus untuk memisahkan antara "Mading", "Draft AI" (dengan *badge* jumlah *draft* baru), dan "Published Articles".

**2. `app/ruangarsip/articles/page.tsx` (File Baru)**
Halaman utama yang menampilkan tabel/grid daftar artikel. Buat *tab* filter status: `DRAFT`, `SCHEDULED`, dan `PUBLISHED`. Sediakan fitur *bulk action* untuk menyeleksi/publish beberapa *draft* sekaligus.

**3. `app/ruangarsip/articles/[slug]/edit/page.tsx` (File Baru)**
Halaman untuk *Human Proofing*.
* Panggil `components/TiptapEditor.tsx` untuk mengedit isi konten HTML.
* Tambahkan *form* untuk mengedit judul, *slug*, kategori (dropdown), dan *replace thumbnail*.
* Tambahkan tombol: **"Simpan Draft"** dan **"Publish Sekarang"**.

**4. `app/ruangarsip/articles/[slug]/page.tsx` (File Baru)**
Halaman *preview* artikel secara persis seperti bagaimana *user* akan melihatnya nanti.

---

### Bagian 3: Public Display (Frontend Mading)

**1. `app/mading/page.tsx` (Pembuatan/Perombakan File)**
Halaman publik yang me-*list* semua artikel dengan status `PUBLISHED`. Desain dengan pola *grid* yang *clean*, menonjolkan *thumbnail* hasil AI, *tag* kategori warna-warni, dan waktu baca (*read time*). Sediakan *filter* kategori di bagian atas.

**2. `app/mading/[slug]/page.tsx` (Pembuatan/Perombakan File)**
Halaman pembacaan artikel. Di dalam komponen ini, *render* konten HTML dari *database* menggunakan styling tipografi yang nyaman dibaca (Prose/Tailwind Typography). Sisipkan komponen *Call to Action* (CTA) statis di bawah atau di tengah artikel yang mengarahkan pembaca ke produk atau *bootcamp* Sekolah WFA.