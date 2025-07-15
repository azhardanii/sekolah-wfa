'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MadingForm from '@/components/MadingForm';
import Link from 'next/link';

type MadingItem = {
    title: string;
    slug: string;
    content: string;
    createdAt: string;
    thumbnailUrl?: string;
    keyword: string;
};

function formatDate(dateString: string) {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateString));
  }

export default function MadingDashboard() {
    const [madingList, setMadingList] = useState<MadingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<MadingItem | null>(null);
    
    //Data Mading
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleCreatePost = async ({
        title,
        content,
        thumbnail,
      }: {
        title: string;
        content: string;
        thumbnail?: File | null;
      }) => {
        setLoading(true);
        let thumbnailUrl = '';
      
        try {
          // Upload gambar
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
      
          // ambil keyword dari MadingForm (sudah diproses di client)
          const keywordRes = await fetch('/api/mading/generate-keyword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
          });
    
          const keywordData = await keywordRes.json();
          const keyword = keywordData.keywords?.join(', ') || 'sekolah wfa';
      
          // Simpan ke mading
          const res = await fetch('/api/mading', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, thumbnailUrl, keyword }),
          });
      
          if (res.ok) {
            const { post } = await res.json();
            setMadingList((prev) => [post, ...prev]);
            setIsModalCreateOpen(false);
            setTitle('');
            setContent('');
            setThumbnail(null);
            setPreviewUrl(null);
          } else {
            console.error('Gagal menyimpan postingan');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
    };

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
          // Upload jika ada gambar baru
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
      
          // ambil keyword dari MadingForm (sudah diproses di client)
          const keywordRes = await fetch('/api/mading/generate-keyword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
          });
    
          const keywordData = await keywordRes.json();
          const keyword = keywordData.keywords?.join(', ') || 'sekolah wfa';
      
          const res = await fetch(`/api/mading/${selectedPost?.slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, thumbnailUrl, keyword }),
          });
      
          if (res.ok) {
            const { post } = await res.json();
            setMadingList((prev) =>
              prev.map((item) => (item.slug === post.slug ? post : item))
            );
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
      
    // GET Data Mading
    useEffect(() => {
        const fetchMading = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/mading');
            const data = await res.json();
    
            // urutkan dari terbaru
            const sortedData = data.sort(
            (a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
    
            setMadingList(sortedData);
        } catch (error) {
            console.error("Gagal mengambil data mading:", error);
        } finally {
            setLoading(false);
        }
        };
    
        fetchMading();
    }, []);

    return (
        <main className="min-h-screen bg-white px-6 py-12">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-extrabold text-[#166256] mb-6">📚 Dashboard Mading Sekolah WFA</h1>

                <div className="flex justify-end mb-4">
                    <button  onClick={() => setIsModalCreateOpen(true)} className="bg-[#4dc194] hover:bg-[#3cae88] text-white font-semibold py-2 px-4 rounded">
                        + Buat Postingan
                    </button>
                </div>

                <div className="overflow-x-auto border rounded shadow">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-[#166256] text-white uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-3">Judul</th>
                                <th className="px-4 py-3">Tanggal</th>
                                <th className="px-4 py-3">Aksi</th>
                            </tr>
                        </thead>

                        {loading ? (
                        <tbody>
                            {[...Array(5)].map((_, i) => (
                            <tr key={i} className="animate-pulse border-b">
                                <td className="px-4 py-3">
                                <div className="h-4 w-4 bg-gray-300 rounded" />
                                </td>
                                <td className="px-4 py-3">
                                <div className="h-4 w-48 bg-gray-300 rounded" />
                                </td>
                                <td className="px-4 py-3">
                                <div className="h-4 w-24 bg-gray-300 rounded" />
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        ) : madingList.length === 0 ? (
                        <tbody>
                            <tr>
                                <td colSpan={3} className="py-10 text-center text-gray-500">
                                    Belum ada postingan mading.
                                </td>
                            </tr>
                        </tbody>
                        ) : (
                        <tbody>
                            {madingList.map((item) => (
                                <tr key={item.slug} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{item.title}</td>
                                <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <Link href={`/ruangarsip/mading/preview/${item.slug}`} className="text-blue-600 hover:underline text-sm">
                                        Detail
                                    </Link>
                                    <button className="text-green-600 hover:underline text-sm" onClick={ () => { setSelectedPost(item); setIsModalEditOpen(true); }}>Edit</button>
                                    <button className="text-red-600 hover:underline text-sm">Hapus</button>
                                </td>
                                </tr>
                            ))}
                            {madingList.length === 0 && (
                                <tr>
                                <td colSpan={3} className="text-center text-gray-500 px-4 py-5">
                                    Belum ada postingan mading.
                                </td>
                                </tr>
                            )}
                        </tbody>
                        )}
                    </table>
                </div>
            </div>

            {/* MODAL AREA */}
            {/* Create Modal */}
            <AnimatePresence>
                {isModalCreateOpen && (
                    <motion.div
                        key="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
                    >
                        <motion.div
                            key="modal"
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="bg-white rounded-lg w-full max-w-3xl max-h-[90%] overflow-y-auto shadow-lg p-6 relative"
                        >
                            {/* Tombol Close */}
                            <button onClick={() => setIsModalCreateOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">
                                &times;
                            </button>

                            <h2 className="text-2xl font-bold text-[#166256] mb-4">Buat Postingan Baru</h2>

                            <MadingForm
                                isSubmitting={loading}
                                onSubmit={handleCreatePost}
                                initialData={undefined}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Edit Modal */}
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
