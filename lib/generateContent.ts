// src/lib/generateContent.ts
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from '@google/generative-ai';
  
  const API_KEY = process.env.GEMINI_API_KEY;
  
  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }
  
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  // Fungsi untuk membuat konten berdasarkan judul dan keyword
  export async function generateContent(title: string, keywords: string): Promise<string> {
    const prompt = `
      Anda adalah seorang penulis konten SEO profesional dan ahli dalam membuat artikel blog yang menarik dan informatif untuk audiens di Indonesia.
  
      Tugas Anda adalah membuat draf artikel blog lengkap berdasarkan Judul dan Keyword yang saya berikan.
  
      **Instruksi Penting:**
      1.  Gaya Bahasa: Gunakan gaya bahasa yang santai, informatif, dan mudah dipahami (seperti gaya blog post populer).
      2.  Struktur Artikel: Buat artikel dengan struktur yang jelas:
          - Pembuka: Paragraf pembuka yang menarik perhatian dan memperkenalkan topik.
          - Isi (Body): Beberapa paragraf isi yang membahas topik secara mendalam. Gunakan sub-judul (heading <h2> atau <h3>) untuk memecah poin-poin penting.
          - Penutup: Paragraf penutup yang merangkum isi artikel dan memberikan kesimpulan atau call-to-action.
      3.  Integrasi Keyword: "Tarik" dan "tenun" keyword yang diberikan secara alami ke dalam seluruh bagian artikel (pembuka, isi, penutup, dan sub-judul). Jangan hanya menumpuk keyword (keyword stuffing).
      4.  Panjang Artikel: Buat artikel dengan panjang sekitar 400-600 kata.
      5.  Format Output: Hasil akhir HARUS dalam format HTML yang bersih dan valid. Gunakan tag <p>, <h2>, <h3>, <ul>, <ol>, dan <li> sesuai kebutuhan.
      6. Gunakan kata "Pekerja WFA" untuk menggantikan kata "Freelance" dan untuk menyapa gunakan "Halo teman-teman WFA, dimanapun kalian berada 👋🏻" di paragraf kedua untuk memulai pembahasan lebih dalam, karena pada paragraf pertama fungsikan untuk membuat kalimat hook yang terdapat keyword didalamnya.
  
      ---
  
      **Judul Artikel:**
      "${title}"
  
      **Keyword yang Harus Digunakan:**
      "${keywords}"
  
      ---
  
      Mulai tulis artikel HTML di sini:
    `;
  
    try {
      const model = genAI.getGenerativeModel({
        // Gunakan model Pro untuk tugas penulisan yang lebih kompleks
        model: 'gemini-2.5-pro',
        generationConfig: {
          temperature: 0.7, // Sedikit lebih kreatif untuk penulisan
          maxOutputTokens: 8192,
          topP: 1,
          topK: 40,
        },
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ],
      });
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.error('[Content Generation Error]', err);
      return '<p>Maaf, terjadi kesalahan saat membuat konten. Silakan coba lagi.</p>';
    }
  }