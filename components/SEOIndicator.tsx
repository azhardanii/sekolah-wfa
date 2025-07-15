'use client';

import { useEffect, useState } from 'react';

// --- INTERFACE (TIDAK BERUBAH) ---
interface Suggestion {
  message: string;
  score: number;
}

interface SEOIndicatorProps {
  title: string;
  content: string; // Bisa berisi HTML dari editor
  keyword: string; // Keyword dipisah koma, contoh: "seo, cara kerja wfa, tips produktif"
}

// --- HELPER FUNCTION ---
/**
 * Membersihkan tag HTML dari string untuk mendapatkan teks murni.
 * @param html - String yang mengandung HTML.
 * @returns Teks murni tanpa HTML.
 */
function stripHtml(html: string): string {
  // Hanya berjalan di browser, lebih aman daripada regex
  if (typeof window !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  // Fallback untuk lingkungan non-browser (misal: SSR)
  return html.replace(/<[^>]*>?/gm, ' ');
}

/**
 * Fungsi untuk escape karakter spesial regex.
 * @param str - String yang akan di-escape.
 * @returns String yang aman untuk digunakan dalam RegExp.
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& berarti seluruh string yang cocok
}


// --- KOMPONEN UTAMA ---
export default function SEOIndicator({ title, content, keyword }: SEOIndicatorProps) {
  const [score, setScore] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [displayMessage, setDisplayMessage] = useState<string>('Semua indikator SEO terpenuhi 🎉');

  useEffect(() => {
    // Reset jika input dasar tidak ada
    if (!content || !keyword) {
      setScore(null);
      setSuggestions([]);
      return;
    }

    // --- 1. PERSIAPAN & PEMBERSIHAN DATA ---
    // Penting: Bersihkan HTML dari konten terlebih dahulu!
    const cleanContent = stripHtml(content);

    const titleLower = title.toLowerCase();
    const contentLower = cleanContent.toLowerCase();

    // Perbaiki parsing keyword: split dulu baru trim
    const keywordList = keyword
      .toLowerCase()
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean); // Menghapus string kosong jika ada koma berlebih (e.g., "a,,b")

    if (keywordList.length === 0) return; // Keluar jika tidak ada keyword valid

    // --- 2. ANALISIS SEO ---
    const words = contentLower.match(/\b\w+\b/g) || [];
    const wordCount = words.length;

    // A. Apakah keyword ada di Judul? (Cek frasa, bukan kata per kata)
    const inTitle = keywordList.some((k) => titleLower.includes(k));

    // B. Apakah keyword ada di awal konten? (150 karakter pertama)
    const firstParagraph = contentLower.substring(0, 150);
    const inFirstParagraph = keywordList.some((k) => firstParagraph.includes(k));

    // C. Hitung kepadatan keyword (Keyword Density)
    const keywordOccurrences = keywordList.reduce((total, k) => {
      if (!k) return total;
      const escapedKeyword = escapeRegExp(k);
      const occurrences = (contentLower.match(new RegExp(escapedKeyword, 'g')) || []).length;
      return total + occurrences;
    }, 0);
    const density = wordCount > 0 ? (keywordOccurrences / wordCount) * 100 : 0;

    // D. Cek panjang konten
    const isLongEnough = wordCount >= 300;
    
    // E. Cek keyword yang belum ada di konten
    const missingKeywords = keywordList.filter(k => !contentLower.includes(k));

    // --- 3. PENILAIAN (SCORING) ---
    let points = 0;
    const messages: Suggestion[] = [];

    // Skor: Keyword di Judul (25 poin)
    if (inTitle) {
      points += 25;
    } else {
      messages.push({ message: 'Gunakan minimal satu keyword di dalam judul.', score: 0 });
    }

    // Skor: Keyword di Awal Paragraf (25 poin)
    if (inFirstParagraph) {
      points += 25;
    } else {
      messages.push({ message: 'Letakkan minimal satu keyword di awal paragraf (150 karakter pertama).', score: 0 });
    }
    
    // Skor: Panjang Konten (25 poin)
    if (isLongEnough) {
      points += 25;
    } else {
      messages.push({ message: `Jumlah kata baru ${wordCount}. Target minimal 300 kata.`, score: 0 });
    }

    // Skor: Kepadatan Keyword (25 poin)
    if (density >= 0.5 && density <= 2.5) {
      points += 25;
    } else {
      messages.push({
        message: `Kepadatan keyword idealnya 0.5% - 2.5%. Saat ini: ${density.toFixed(2)}%.`,
        score: 0,
      });
    }

    // Pesan Tambahan: Keyword yang hilang
    if (missingKeywords.length > 0) {
      messages.push({
        message: `Keyword berikut belum muncul: ${missingKeywords.join(', ')}`,
        score: 0,
      });
    }

    setScore(points);
    setSuggestions(messages);

    if (points === 100) {
      setDisplayMessage('SEO Sempurna! 🎉');
    } else if (messages.length === 0) {
      // Ini terjadi jika poin tidak 100 tapi tidak ada pesan error spesifik
      setDisplayMessage('Hampir sempurna, periksa kembali poin di atas.');
    }

  }, [title, content, keyword]);

  // --- RENDER TAMPILAN (TIDAK BERUBAH) ---
  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-start mb-3 gap-2">
        <h4 className="text-lg font-semibold text-[#166256] dark:text-emerald-300">SEO Score:</h4>
        {score !== null ? (
          <span className={`font-bold text-2xl ${score >= 75 ? 'text-green-600 dark:text-green-400' : score >= 50 ? 'text-orange-500 dark:text-orange-400' : 'text-red-500 dark:text-red-400'}`}>
            {score}
          </span>
        ) : (
          <span className="text-gray-400 dark:text-gray-500">-</span>
        )}
      </div>
      {suggestions.length > 0 ? (
        <ul className="space-y-1 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
          {suggestions.map((s, i) => (
            <li key={i}>{s.message}</li>
          ))}
        </ul>
      ) : score !== null ? (
        <p className="text-sm text-green-700 dark:text-green-300">{displayMessage}</p>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">Masukkan konten dan keyword untuk memulai analisis.</p>
      )}
    </div>
  );
}