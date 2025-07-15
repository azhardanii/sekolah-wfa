'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MadingForm from '@/components/MadingForm';
import parse from 'html-react-parser';

type MadingItem = {
  title: string;
  slug: string;
  content: string;
  thumbnailUrl?: string;
  createdAt: string;
  keyword?: string;
};

export default function MadingDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [data, setData] = useState<MadingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<MadingItem | null>(null);

  const handleEditPost = async ({
    title,
    content,
    thumbnail,
  }: {
    title: string;
    content: string;
    thumbnail?: File | null;
  }) => {
    setLoading(true);
    let thumbnailUrl = selectedPost?.thumbnailUrl || '';
  
    try {
      if (thumbnail) {
        const formData = new FormData();
        formData.append('image', thumbnail);
  
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (uploadRes.ok) {
          const data = await uploadRes.json();
          thumbnailUrl = data.url;
        } else {
          console.error('Gagal upload gambar');
          return;
        }
      }
  
      const res = await fetch(`/api/mading/${selectedPost?.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, thumbnailUrl }),
      });
  
      if (res.ok) {
        const { post } = await res.json();
        setData(post); // update tampilan detail
        setIsModalEditOpen(false);
        setSelectedPost(null);
      } else {
        console.error('Gagal mengedit postingan');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await fetch('/api/mading');
        const posts = await res.json();
        const found = posts.find((p: MadingItem) => p.slug === slug);
        setData(found);
      } catch (error) {
        console.error('Gagal mengambil detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleDelete = async () => {
    const confirmDelete = confirm('Yakin ingin menghapus postingan ini?');
    if (!confirmDelete || !data) return;

    try {
      const res = await fetch(`/api/mading/${data.slug}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/dashboard'); // ganti sesuai route dashboard kamu
      } else {
        alert('Gagal menghapus postingan');
      }
    } catch (err) {
      console.error('Gagal hapus:', err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-red-500">Postingan tidak ditemukan.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* --- TOMBOL KEMBALI --- */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-[#166256] mb-3">{data.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{new Date(data.createdAt).toLocaleDateString('id-ID', {
          day: '2-digit', month: 'long', year: 'numeric'
        })}</p>

        {data.thumbnailUrl && (
          <img
            src={data.thumbnailUrl}
            alt={data.title}
            className="w-full h-auto max-h-[450px] object-cover rounded-lg mb-8 shadow-lg"
          />
        )}

        <div className="prose lg:prose-lg max-w-none">
          {parse(data.content)}
        </div>

        {/* --- BAGIAN KEYWORD YANG DITAMBAHKAN --- */}
        {data.keyword && data.keyword.length > 0 && (
          <div className="mt-10 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Keywords:</h3>
            <div className="flex flex-wrap gap-2">
              {data.keyword.split(',').map((keywords, index) => {
                const trimmedKeyword = keywords.trim();
                if (!trimmedKeyword) return null; // Abaikan jika keyword kosong
                return (
                  <span
                    key={index}
                    className="bg-emerald-50 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full border border-emerald-200"
                  >
                    {trimmedKeyword}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Edit & Delete Button */}
      <div className="fixed bottom-6 right-6 flex gap-3 z-50">
        <button
          onClick={() => { setSelectedPost(data); setIsModalEditOpen(true); }}
          className="bg-[#4dc194] hover:bg-[#3cae88] text-white px-4 py-2 rounded-lg shadow-lg font-semibold transition-transform hover:scale-105"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg font-semibold transition-transform hover:scale-105"
        >
          Hapus
        </button>
      </div>

      <AnimatePresence>
        {isModalEditOpen && selectedPost && (
            <motion.div
            key="modal-edit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
            >
                <motion.div
                    key="modal-edit"
                    initial={{ scale: 0.9, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 40 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="bg-white rounded-lg w-full max-w-3xl max-h-[90%] overflow-y-auto shadow-lg p-6 relative"
                >
                    {/* Tombol Close */}
                    <button
                    onClick={() => {
                        setIsModalEditOpen(false);
                        setSelectedPost(null);
                    }}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                    >
                    &times;
                    </button>

                    <h2 className="text-2xl font-bold text-[#166256] mb-4">Edit Postingan</h2>

                    <MadingForm
                        isSubmitting={loading}
                        onSubmit={handleEditPost}
                        initialData={selectedPost}
                    />
                </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </main>
  );
}
