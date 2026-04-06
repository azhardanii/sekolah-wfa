import { db as prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NavbarWFA from '@/components/NavbarWFA';

// Revalidate cache setiap 60 detik (ISR)
export const revalidate = 60;

export default async function MadingArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug }
  });

  if (!article || article.status !== 'PUBLISHED') {
    return notFound();
  }

  const categoryName = article.category.replace(/_/g, ' ');

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#E0F7F4] via-white to-white text-[#0E4E48] overflow-x-hidden flex flex-col">

      {/* --- BACKGROUND EFFECTS CONTAINER --- */}
      {/* Ditempatkan secara absolut di belakang (z-[-1]) agar tidak mengganggu Navbar dan interaksi */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        {/* Top Right Effect - Disesuaikan ukurannya untuk mobile & desktop */}
        <div className="absolute -right-10 md:-right-20 top-0 md:top-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[60px] md:blur-[100px] rounded-full opacity-30" />

        {/* Top Left Effect */}
        <div className="absolute -left-20 md:-left-52 top-10 md:top-20 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[50px] md:blur-[100px] rounded-full opacity-50" />

        {/* Bottom Right Effect (White Overlay) */}
        <div className="absolute bottom-0 right-0 md:right-10 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-white opacity-30 rounded-full translate-x-1/4 md:translate-x-1/3 -translate-y-1/4 md:-translate-y-[30%]" />

        {/* Bottom Right Gradient */}
        <div className="absolute -bottom-10 md:-bottom-5 right-10 md:right-32 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-gradient-to-b from-[#26D7C4] to-white opacity-15 rounded-full" />
      </div>
      {/* --- END BACKGROUND EFFECTS --- */}

      {/* NavbarWFA sekarang berada dalam flex-flow normal, sehingga paddingnya tidak akan terpotong */}
      <div className="w-full relative z-50">
        <NavbarWFA />
      </div>

      {/* Tambahkan flex-grow agar main mengambil sisa ruang jika konten pendek */}
      <main className="flex-grow max-w-3xl mx-auto px-6 pt-24 pb-24 relative z-10 w-full">

        {/* Header Section */}
        <header className="mb-10 text-center">
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-[#147167] font-semibold">
            <span className="bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-[#26D7C4]/20">
              {categoryName}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">
              {new Date(article.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric'
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#147167] to-[#2AB3B0] pb-1 bg-clip-text text-transparent leading-tight mb-6">
            {article.title}
          </h1>

          {article.thumbnailUrl && (
            // Mengganti <img> dengan next/image untuk performa
            <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-lg bg-gray-50">
              <Image
                src={article.thumbnailUrl}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}
        </header>

        {/* Content Body */}
        {/* Menambahkan sedikit background putih transparan agar teks tetap kontras terhadap gradien */}
        <article className="prose prose-lg prose-[#147167] mx-auto text-gray-700 font-medium leading-relaxed
        prose-h2:text-2xl prose-h2:text-[#147167] prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:text-[#147167] prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3
        prose-a:text-[#2AB3B0] prose-a:underline hover:prose-a:text-[#147167]
        prose-img:rounded-xl prose-img:shadow-md
        prose-ul:list-disc border-b border-gray-200 pb-12 text-justify
        bg-white/40 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-sm border border-white/50"
          dangerouslySetInnerHTML={{
            __html: article.content.replace(/<a(?![^>]*\btarget=)[^>]*>/gi, (match) => match.replace('<a ', '<a target="_blank" rel="noopener noreferrer" '))
          }}
        />

        {/* CTA Internal Link */}
        <div className="mt-12 bg-gradient-to-r from-[#26D7C4] to-[#147167] rounded-3xl p-8 md:p-10 text-center shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 [mask-image:linear-gradient(45deg,white,transparent)] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
          <h3 className="text-xl md:text-3xl font-bold text-white mb-4 relative z-10">
            Siap Membangun Karir Tanpa Batas Ruang & Waktu?
          </h3>
          <p className="text-[#E0F7F4] mb-8 max-w-xl mx-auto relative z-10">
            Pelajari skill remote work, content creation, dan bangun portofolio profesionalmu bersama komunitas 180.000+ member lainnya di Sekolah WFA.
          </p>
          <Link
            href="/ruang-kelas"
            className="relative z-10 inline-block bg-white text-[#147167] px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Mulai Belajar Gratis &rarr;
          </Link>
        </div>

      </main>
    </div>
  );
}