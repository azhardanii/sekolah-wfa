'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/TiptapEditor';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
}

export default function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const isNew = resolvedParams.slug === 'new';

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [category, setCategory] = useState('WFA_PRODUCTIVITY');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchArticle();
    }
  }, [resolvedParams.slug]);

  // Auto-generate slug from title when creating new articles
  useEffect(() => {
    if (autoSlug && title) {
      setSlug(generateSlug(title));
    }
  }, [title, autoSlug]);

  const fetchArticle = async () => {
    try {
      const res = await fetch(`/api/articles/${resolvedParams.slug}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setSlug(data.slug);
        setAutoSlug(false); // Don't auto-generate for existing articles
        setCategory(data.category);
        setContent(data.content);
        setThumbnailUrl(data.thumbnailUrl || '');
        setSeoKeywords(data.seoKeywords?.join(', ') || '');
      } else {
        alert('Artikel tidak ditemukan');
        router.push('/ruang-arsip/articles');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (status: string) => {
    if (!title.trim()) {
      alert('Judul artikel wajib diisi');
      return;
    }
    if (!slug.trim()) {
      alert('URL Slug wajib diisi');
      return;
    }
    if (!category) {
      alert('Kategori wajib dipilih');
      return;
    }

    setSaving(true);
    const payload = {
      title,
      slug,
      category,
      content,
      thumbnailUrl,
      seoKeywords,
      status
    };

    try {
      // For new articles, POST to /api/articles. For existing, PUT to /api/articles/[slug]
      const url = isNew ? '/api/articles' : `/api/articles/${resolvedParams.slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(`Artikel berhasil disimpan sebagai ${status}`);
        router.push('/ruang-arsip/articles?status=' + status);
      } else {
        const err = await res.json();
        alert('Error: ' + (err.error || 'Gagal menyimpan artikel'));
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isNew && confirm('Yakin ingin menghapus artikel ini secara permanen?')) {
      try {
        const res = await fetch(`/api/articles/${resolvedParams.slug}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          alert('Artikel berhasil dihapus!');
          router.push('/ruang-arsip/articles');
        } else {
          const err = await res.json();
          alert('Gagal menghapus: ' + (err.error || 'Unknown error'));
        }
      } catch (error) {
        alert('Terjadi kesalahan saat menghapus');
      }
    }
  };

  if (loading) {
    return <div className="p-8">Memuat artikel...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#147167] mb-6">
        {isNew ? 'Tulis Artikel Baru' : 'Human Proofing & Edit Artikel'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 border rounded-xl shadow-sm">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Judul Artikel</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-[#2AB3B0] focus:border-[#2AB3B0]"
              placeholder="Masukkan judul..."
            />
          </div>

          <div className="bg-white p-6 border rounded-xl shadow-sm">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Konten Artikel</label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 border rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 border-b pb-2 mb-4">Metadata</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setAutoSlug(false);
                }}
                className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-[#2AB3B0]"
                placeholder="contoh-url-artikel"
              />
              {isNew && (
                <p className="text-xs text-gray-400 mt-1">
                  {autoSlug ? 'Auto-generated dari judul' : 'Manual mode'}
                  {!autoSlug && (
                    <button
                      type="button"
                      onClick={() => setAutoSlug(true)}
                      className="ml-2 text-[#2AB3B0] hover:underline"
                    >
                      Reset ke auto
                    </button>
                  )}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border rounded-lg text-sm focus:ring-[#2AB3B0]"
              >
                <option value="WFA_PRODUCTIVITY">WFA & Productivity</option>
                <option value="TECH_UPDATE">Tech & AI Update</option>
                <option value="CONTENT_CREATION">Content Creation</option>
                <option value="WFA_HACKS">Remote Career Hacks</option>
                <option value="DIGITAL_NOMAD_LIFESTYLE">Digital Nomad Lifestyle</option>
                <option value="FINANCE_MANAGEMENT">Financial Management</option>
                <option value="MENTAL_HEALTH">Mental Health</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">SEO Keywords (koma)</label>
              <input
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                className="w-full p-2.5 border rounded-lg text-sm focus:ring-[#2AB3B0]"
                placeholder="wfa, belajar ai, produktivitas"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">Thumbnail URL (Supabase/Lainnya)</label>
              <input
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full p-2.5 border rounded-lg text-sm focus:ring-[#2AB3B0]"
                placeholder="https://..."
              />
              {thumbnailUrl && (
                <div className="mt-2 text-center aspect-video bg-gray-100 rounded-md overflow-hidden relative">
                  <img src={thumbnailUrl} alt="Thumbnail preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 border rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 border-b pb-2 mb-4">Aksi Publikasi</h3>

            <div className="flex flex-col gap-3">
              <button
                disabled={saving}
                onClick={() => handleSave('DRAFT')}
                className="w-full py-2.5 px-4 rounded-lg bg-gray-100 font-medium text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : 'Simpan Draft'}
              </button>
              <button
                disabled={saving}
                onClick={() => handleSave('SCHEDULED')}
                className="w-full py-2.5 px-4 rounded-lg border-2 border-[#147167] text-[#147167] font-medium hover:bg-[#E0F7F4] transition-colors disabled:opacity-50"
              >
                Jadwalkan
              </button>
              <button
                disabled={saving}
                onClick={() => handleSave('PUBLISHED')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#147167] text-white font-semibold shadow-md hover:bg-[#0e4e48] transition-colors disabled:opacity-50"
              >
                Publish Sekarang
              </button>

              {!isNew && (
                <button
                  disabled={saving}
                  onClick={handleDelete}
                  className="w-full py-2.5 px-4 rounded-lg bg-red-50 text-red-600 border border-red-200 font-medium hover:bg-red-100 transition-colors disabled:opacity-50 mt-2"
                >
                  Hapus Artikel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
