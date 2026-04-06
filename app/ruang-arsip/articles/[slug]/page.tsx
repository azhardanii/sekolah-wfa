import { db as prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ArticlePreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!article) {
    return notFound();
  }

  const categoryName = article.category.replace(/_/g, ' ');

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#147167]">Mode Preview HTML</h1>
          <p className="text-sm text-gray-500">Tampilan ini merepresentasikan bagaimana artikel akan terlihat di Mading Publik.</p>
        </div>
        <Link
          href={`/ruang-arsip/articles/${article.slug}/edit`}
          className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-100 transition-colors"
        >
          Kembali ke Edit &rarr;
        </Link>
      </div>

      <div className="border-4 border-dashed border-gray-200 rounded-3xl p-8 relative">
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#147167] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          {article.status}
        </div>

        {/* Header Section from Public Page */}
        <header className="mb-10 text-center flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-[#147167] font-semibold">
            <span className="bg-[#E0F7F4] px-3 py-1 rounded-full">{categoryName}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">
              {new Date(article.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric'
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#147167] to-[#2AB3B0] bg-clip-text text-transparent leading-tight mb-8">
            {article.title}
          </h1>

          {article.thumbnailUrl && (
            <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-lg mx-auto">
              <img
                src={article.thumbnailUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Content Body */}
        <article className="prose prose-lg prose-[#147167] mx-auto text-gray-700 font-medium leading-relaxed
        prose-h2:text-2xl prose-h2:text-[#147167] prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:text-[#147167] prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3
        prose-a:text-[#2AB3B0] prose-a:underline hover:prose-a:text-[#147167]
        prose-img:rounded-xl prose-img:shadow-md
        prose-ul:list-disc pb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
