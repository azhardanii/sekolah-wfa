import { db as prisma } from '@/lib/db';
import Link from 'next/link';
import NavbarWFA from '@/components/NavbarWFA';



// Optional revalidation for static rendering
export const revalidate = 60;

function formatCategory(cat: string) {
  return cat.replace(/_/g, ' ');
}

export default async function MadingPublicPage() {
  const publishedArticles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#f4fbfa]">
      <div className="bg-gradient-to-b from-[#E0F7F4] to-[#f4fbfa]">
        <div className="absolute top-0 w-full h-[500px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[120px] pointer-events-none opacity-20" />
        <NavbarWFA />

        <header className="relative z-10 container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl lg:text-6xl md:pb-2 font-bold bg-gradient-to-r from-[#2AB3B0] to-[#147167] bg-clip-text text-transparent mb-2">
            Mading Sekolah WFA
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Temukan insight, berita, dan tips seputar produktivitas, teknologi, dan gaya hidup Work From Anywhere dari Sekolah WFA.
          </p>
        </header>
      </div>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedArticles.length === 0 && (
            <p className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 py-12">
              Belum ada artikel yang dipublikasi.
            </p>
          )}

          {publishedArticles.map((article) => (
            <Link
              href={`/mading/${article.slug}`}
              key={article.id}
              className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden transition-all duration-300 border border-[#26D7C4]/10"
            >
              <div className="aspect-[16/9] w-full bg-gray-100 relative overflow-hidden">
                {article.thumbnailUrl ? (
                  <img
                    src={article.thumbnailUrl}
                    alt={article.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#2AB3B0]/20 to-[#147167]/10">
                    <span className="text-4xl">📄</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-[#147167] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {formatCategory(article.category)}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-gray-500 mb-3 font-medium">
                  {new Date(article.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })} • 3 min read
                </p>
                <h2 className="text-xl font-bold text-gray-800 leading-tight mb-3 group-hover:text-[#2AB3B0] transition-colors line-clamp-2">
                  {article.title}
                </h2>

                {/* We won't render HTML here, just a "Baca selengkapnya" button */}
                <div className="mt-auto pt-4 flex items-center gap-2 text-[#147167] font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Baca Selengkapnya</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
