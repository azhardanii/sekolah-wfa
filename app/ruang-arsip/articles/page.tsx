'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  createdAt: string;
};

function ArticlesDashboardInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('status') || 'DRAFT';

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchArticles();
  }, [activeTab]);

  const fetchArticles = async () => {
    setLoading(true);
    setSelectedIds([]);
    try {
      const res = await fetch(`/api/articles?status=${activeTab}`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = ['DRAFT', 'SCHEDULED', 'PUBLISHED'];

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkPublish = async () => {
    if (selectedIds.length === 0) return;
    
    if (confirm(`Yakin ingin mem-publish ${selectedIds.length} artikel secara massal?`)) {
      try {
        const res = await fetch('/api/articles/bulk', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds, status: 'PUBLISHED' })
        });
        
        if (res.ok) {
          alert('Berhasil dipublish!');
          fetchArticles();
        } else {
          alert('Gagal mem-publish artikel');
        }
      } catch (error) {
        alert('Terjadi kesalahan');
      }
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (confirm(`Yakin ingin menghapus artikel "${title}"?`)) {
      try {
        const res = await fetch(`/api/articles/${slug}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (res.ok) {
          alert('Artikel berhasil dihapus!');
          fetchArticles();
        } else {
          const err = await res.json().catch(() => ({ error: 'Unknown error' }));
          alert('Gagal menghapus artikel: ' + (err.error || `Status ${res.status}`));
          console.error('Delete failed:', res.status, err);
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Terjadi kesalahan jaringan saat menghapus');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    
    if (confirm(`Yakin ingin secara permanen menghapus ${selectedIds.length} artikel dari sistem?`)) {
      try {
        const res = await fetch('/api/articles/bulk', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds })
        });
        
        if (res.ok) {
          alert(`${selectedIds.length} artikel berhasil dihapus!`);
          fetchArticles();
        } else {
          const err = await res.json();
          alert('Gagal menghapus artikel: ' + err.error);
        }
      } catch (error) {
        alert('Terjadi kesalahan saat penghapusan massal');
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#147167]">Manajemen Artikel</h1>
          <p className="text-gray-500 mt-1">Kelola draft AI, penjadwalan, dan publikasi Mading</p>
        </div>
        <Link 
          href="/ruang-arsip/articles/new/edit" 
          className="bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
        >
          + Tulis Manual
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => router.push(`/ruang-arsip/articles?status=${tab}`)}
            className={`px-4 py-3 font-medium text-sm transition-all border-b-2 ${
              activeTab === tab 
                ? 'border-[#147167] text-[#147167]' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'DRAFT' ? 'Draf AI' : tab === 'SCHEDULED' ? 'Terjadwal' : 'Dipublikasi'}
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      <div className="mb-4 flex items-center gap-4 h-10">
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-4 bg-[#E0F7F4] px-4 py-2 rounded-lg text-[#147167] text-sm animate-in fade-in slide-in-from-top-2">
            <span className="font-semibold">{selectedIds.length} terpilih</span>
            {activeTab !== 'PUBLISHED' && (
              <button 
                onClick={handleBulkPublish}
                className="bg-[#147167] text-white px-4 py-1.5 rounded-md hover:bg-[#0e4e48] transition-colors"
              >
                Publish Semua
              </button>
            )}
            <button 
              onClick={handleBulkDelete}
              className="bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded-md hover:bg-red-100 hover:text-red-700 transition-colors font-medium"
            >
              Hapus Terpilih
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="p-4 w-12">
                <input 
                  type="checkbox" 
                  className="rounded text-[#2AB3B0] focus:ring-[#2AB3B0]"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(articles.map(a => a.id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                  checked={selectedIds.length === articles.length && articles.length > 0}
                />
              </th>
              <th className="p-4 font-medium">Judul Artikel</th>
              <th className="p-4 font-medium">Kategori</th>
              <th className="p-4 font-medium">Tanggal Dibuat</th>
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Belum ada artikel untuk status ini.
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      className="rounded text-[#2AB3B0] focus:ring-[#2AB3B0]"
                      checked={selectedIds.includes(article.id)}
                      onChange={() => toggleSelect(article.id)}
                    />
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-800 line-clamp-1">{article.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{article.slug}</p>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {article.category.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                       <Link 
                        href={`/ruang-arsip/articles/${article.slug}`}
                        className="text-sm px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Preview
                      </Link>
                      <Link 
                        href={`/ruang-arsip/articles/${article.slug}/edit`}
                        className="text-sm px-3 py-1.5 rounded-md bg-[#E0F7F4] text-[#147167] hover:bg-[#c8f0ec] font-medium transition-colors"
                      >
                        Proofing
                      </Link>
                      <button
                        onClick={() => handleDelete(article.slug, article.title)}
                        className="text-sm px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ArticlesDashboard() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Memuat data...</div>}>
      <ArticlesDashboardInner />
    </Suspense>
  );
}
