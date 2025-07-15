// src/components/MadingForm.tsx (atau di mana pun lokasinya)
'use client';

import { useEffect, useState } from 'react';
import TiptapEditor from './TiptapEditor';
import SEOIndicator from './SEOIndicator';

type MadingFormProps = {
  initialData?: {
    title: string;
    content: string;
    thumbnailUrl?: string;
  };
  onSubmit: (data: {
    title: string;
    content: string;
    thumbnail?: File | null;
  }) => Promise<void>;
  isSubmitting: boolean;
};

export default function MadingForm({
  initialData,
  onSubmit,
  isSubmitting,
}: MadingFormProps) {
  // --- STATE MANAGEMENT ---
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.thumbnailUrl || null);

  const [keyword, setKeyword] = useState('');
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);

  // --- API CALL FUNCTIONS ---

  // FLOW A - Langkah 2: Generate Keyword (hanya butuh judul)
  const handleGenerateKeywords = async () => {
    if (!title) {
      alert('Judul harus diisi untuk menghasilkan keyword.');
      return;
    }
    setIsGeneratingKeywords(true);
    setKeyword(''); // Reset keyword saat generate baru
    try {
      // NOTE: API generate-keyword hanya butuh title dan sedikit konten (opsional)
      // Kita sederhanakan dengan hanya mengirim judul untuk mematuhi Flow A
      const res = await fetch('/api/mading/generate-keyword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: title }), // Kirim judul sbg konten awal
      });
      if (res.ok) {
        const data = await res.json();
        setKeyword(data.keywords?.join(', ') || 'Gagal generate, coba lagi.');
      } else {
        setKeyword('Gagal menghubungi server.');
      }
    } catch (err) {
      console.error('[Keyword Generation Error]', err);
      setKeyword('Terjadi error. Lihat console.');
    } finally {
      setIsGeneratingKeywords(false);
    }
  };

  // FLOW A - Langkah 3: Generate Konten (butuh judul dan keyword)
  const handleGenerateContent = async () => {
    if (!title || !keyword) {
      alert('Judul dan Keyword harus ada untuk menghasilkan konten.');
      return;
    }
    setIsGeneratingContent(true);
    setContent(''); // Kosongkan editor
    try {
      const res = await fetch('/api/mading/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, keyword }),
      });
      if (res.ok) {
        const data = await res.json();
        setContent(data.content || ''); // Set konten editor dengan hasil AI
      } else {
        setContent('<p>Gagal menghasilkan konten dari server.</p>');
      }
    } catch (err) {
      console.error('[Content Generation Error]', err);
      setContent('<p>Terjadi error. Lihat console.</p>');
    } finally {
      setIsGeneratingContent(false);
    }
  };


  // --- SIDE EFFECTS & SUBMIT HANDLER ---
  useEffect(() => {
    if (thumbnail) {
      const url = URL.createObjectURL(thumbnail);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [thumbnail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, content, thumbnail });
  };

  // --- RENDER JSX ---
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Langkah 1: Judul */}
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">1.</span> Masukkan Judul Artikel
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Contoh: Tools WFA Terbaik untuk Produktivitas"
        />
      </div>

      {/* Langkah 2: Generate Keyword */}
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">2.</span> Generate Keyword SEO
          </label>
          <button
            type="button"
            onClick={handleGenerateKeywords}
            disabled={!title || isGeneratingKeywords}
            className="text-xs bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold py-1 px-3 rounded-md transition-colors"
          >
            {isGeneratingKeywords ? '🔄 Generating...' : 'Generate Keyword'}
          </button>
        </div>
        <div className="w-full p-2 bg-gray-50 rounded border min-h-[40px] dark:bg-gray-700 dark:border-gray-600">
          <p className="text-sm text-emerald-800 dark:text-emerald-200 font-medium">
            {keyword || 'Keyword akan muncul di sini...'}
          </p>
        </div>
      </div>

      {/* Langkah 3: Generate & Edit Konten */}
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">3.</span> Generate & Edit Isi Konten
            </label>
            <button
                type="button"
                onClick={handleGenerateContent}
                disabled={!keyword || isGeneratingContent}
                className="text-xs bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold py-1 px-3 rounded-md transition-colors"
            >
                {isGeneratingContent ? '✍️ Menulis...' : 'Buat Konten AI'}
            </button>
        </div>
        {/* --- DIV INI YANG DIPERBAIKI --- */}
        <div className="mt-1 rounded border dark:border-gray-600 max-h-96 overflow-y-auto"> {/* <-- TAMBAHKAN KELAS INI */}
          <TiptapEditor content={content} onChange={setContent} />
        </div>
      </div>

      {/* Langkah 4: Tambahan (Thumbnail & SEO Check) */}
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">4.</span> Upload Thumbnail & Cek SEO
        </label>
        <div className="flex flex-col gap-6"> {/* <-- Perbaikan layout ke grid */}
            <div>
                <label className="block text-xs font-medium mb-1.5 text-gray-600 dark:text-gray-400">Thumbnail</label>
                <div className="flex flex-col-reverse gap-4">
                <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} className="text-sm dark:text-gray-300" />
                {previewUrl && (
                    <div className="relative mt-2 w-fit">
                    <img alt="Thumbnail preview" src={previewUrl} className="w-auto h-32 object-cover rounded shadow" />
                    <button
                        type="button"
                        onClick={() => { setThumbnail(null); setPreviewUrl(null); }}
                        className="absolute top-1 right-1 text-sm bg-white/80 px-1.5 rounded-full hover:bg-red-500 hover:text-white"
                    >&times;</button>
                    </div>
                )}
                </div>
            </div>
            <div className="mt-2 md:mt-0">
                {/* SEO Indicator dipindah ke sini agar sejajar di layout grid */}
                <SEOIndicator title={title} content={content} keyword={keyword} />
            </div>
        </div>
      </div>

      {/* Tombol Submit Utama */}
      <button
        type="submit"
        disabled={isSubmitting || !title || !content}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors text-lg"
      >
        {isSubmitting ? 'Menyimpan...' : 'Simpan & Publikasikan Postingan'}
      </button>
    </form>
  );
}