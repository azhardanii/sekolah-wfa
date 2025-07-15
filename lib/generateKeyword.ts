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
  
  export async function generateKeyword(title: string, content: string): Promise<string[]> {
    const prompt = `
Saya ingin kamu bertindak sebagai pakar SEO profesional. Berdasarkan judul dan konten di bawah ini, hasilkan 7–10 keyword SEO yang:

- Relevan secara semantik dan kontekstual.
- Mengandung kombinasi keyword short-tail dan long-tail secara proposional (50:50).
- Termasuk keyword LSI (Latent Semantic Indexing).
- Cocok untuk optimasi Google Search (bahasa Indonesia & Inggris).

Tampilkan hanya dalam format array JSON tanpa penjelasan tambahan.

Judul:
"${title}"

Konten:
"${content}"

Contoh Output yang diinginkan:
["keyword 1", "keyword 2", "keyword 3", ...]
`;
  
    try {
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 8192,
          topP: 1,
          topK: 40,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
      });
  
      const result = await model.generateContent(prompt);
      const response = await result.response; // Ambil objek respons lengkap
      const text = response.text().trim();
  
      // Ambil array JSON dari hasil teks AI (hanya yang diawali & diakhiri [ ])
      const match = text.match(/\[\s*("[^"]+"\s*,?\s*)+\]/);
      if (match) {
        try {
          const parsed = JSON.parse(match[0]);
          if (Array.isArray(parsed)) {
            return parsed.map((k) => k.trim()).filter((k) => k.length > 2).slice(0, 10);
          }
        } catch (jsonErr) {
          console.error('[JSON Parse Error]', jsonErr);
        }
      }
  
      // Fallback parsing jika gagal
      return text
        .split(/[\n,•-]+/)
        .map((s) => s.trim().replace(/^[-•]/, ''))
        .filter((s) => s.length > 3)
        .slice(0, 10);
  
    } catch (err) {
      console.error('[Keyword Generation Error]', err);
      const fallback = title.toLowerCase().match(/\b[a-z0-9]{4,}\b/g) || [];
      return Array.from(new Set([...fallback, 'sekolah wfa'])).slice(0, 5);
    }
  }
  