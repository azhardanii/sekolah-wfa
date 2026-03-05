import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, AlertCircle } from "lucide-react";
import LazyYoutube from "@/components/LazyYoutube";
import { COURSE_DATA } from "@/lib/data";

export default async function DetailVideoPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const resolvedParams = await params;
  const videoId = resolvedParams.id;

  const courseDetail = COURSE_DATA.find((c) => c.id === videoId);

  if (!courseDetail) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F0FDFA] p-5 text-center">
        <AlertCircle size={60} className="mb-4 text-[#147167] opacity-50" />
        <h2 className="text-2xl font-bold text-[#134E4A]">Materi tidak ditemukan</h2>
        <p className="mt-2 text-[#147167]">Video yang kamu cari mungkin sudah dihapus atau URL salah.</p>
        <Link 
          href="/ruang-kelas" 
          className="mt-6 rounded-lg bg-[#147167] px-6 py-3 font-medium text-white transition-colors hover:bg-[#134E4A]"
        >
          Kembali ke Ruang Kelas
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0FDFA] p-5 md:p-10">
      <div className="mx-auto max-w-4xl pt-20 md:pt-0">
        
        <Link 
          href="/ruang-kelas" 
          className="mb-6 inline-flex items-center gap-2 text-[#147167] transition-all hover:font-bold"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Daftar Materi</span>
        </Link>

        {/* JUDUL & VIDEO PLAYER */}
        <h1 className="mb-6 text-2xl font-bold text-[#134E4A] md:text-3xl">
          {courseDetail.title}
        </h1>
        
        <div className="mb-10 w-full overflow-hidden rounded-2xl border-[5.5px] border-white shadow-xl">
          <LazyYoutube
            videoId={courseDetail.id}
            title={courseDetail.title}
            ratio="16:9"
          />
        </div>

        {/* UPSELL / RELEVANT LINKS SECTION */}
        <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm md:p-8">
          <h3 className="mb-6 border-b border-teal-100 pb-4 text-xl font-bold text-[#147167]">
            Akses yang kamu butuhkan:
          </h3>
          
          <div className="flex flex-col gap-3">
            {courseDetail.links.map((link, index) => {
              const isLinkEmpty = link.url === "#" || link.url === "";
              
              return isLinkEmpty ? (
                <div 
                  key={index} 
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4 opacity-70"
                >
                  <span className="font-semibold text-gray-500">{link.title}</span>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Segera Hadir</span>
                </div>
              ) : (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-teal-50 bg-[#F0FDFA] p-4 transition-all hover:bg-[#1c8a82] hover:text-white"
                >
                  <span className="font-semibold text-[#134E4A] group-hover:text-white">
                    {link.title}
                  </span>
                  <ExternalLink size={18} className="text-teal-600 group-hover:text-white" />
                </a>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}