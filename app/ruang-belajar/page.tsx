// app/ruang-belajar/page.tsx
import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import { LogOut, Home } from "lucide-react";
import LazyYoutube from "@/components/LazyYoutube";

export default async function RuangBelajarPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const [video, upsellProducts] = await Promise.all([
    db.courseVideo.findFirst({ where: { isActive: true } }),
    db.upsellProduct.findMany({ where: { isActive: true } }),
  ]);

  return (
    <div className="flex min-h-screen bg-[#F0FDFA]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[linear-gradient(180deg,_#FEFEFE_1%,_#26D7C4_55%,_#26D7C4_57%,_#FEFEFE_99%)] text-white flex flex-col px-0 pb-6 pt-20 fixed h-full">
        <div className="mb-20 flex justify-center w-full">
          <Image 
            src="/logo-wfa.webp" 
            alt="Sekolah WFA Logo" 
            width={150}
            height={75}
            priority
            className="object-contain"
          />
        </div>

        <nav className="space-y-2 mb-2">
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#2AB3B0] to-[#147167] py-3 px-10 cursor-pointer">
            <Home size={20} />
            <span className="font-medium">Ruang Belajar</span>
          </div>
        </nav>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="flex items-center gap-3 py-3 px-10 text-[#147167] w-full hover:bg-white/10 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </form>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 px-10 pb-10 pt-20">
        {/* HEADER USER */}
        <div className="flex items-center gap-4 mb-[4.4rem]">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-sm">
            <Image
              src={session.user?.image || "/default-avatar.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#26D7C4] to-[#147167] items-center">
              Hai, {session.user?.name?.split(" ")[0]} <span className="text-white">👋🏻</span>
            </h2>
            <p className="text-[#147167] font-semibold pt-1">Semangat belajarnya yaa!</p>
          </div>
        </div>

        <div className="mb-8 shadow-lg">
          <LazyYoutube 
            videoId="2s-k6Ov4xAY" 
            title="Video Materi"
            ratio="16:9"
          />
        </div>

        {/* UPSELL SECTION (Mapping dari DB) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {upsellProducts.length > 0 ? (
            upsellProducts.map((product) => (
              <a 
                href={product.productLink} 
                key={product.id}
                target="_blank"
                className="group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-teal-100">
                  <div className="aspect-square relative bg-gray-100">
                    <Image 
                      src={product.thumbnailUrl} 
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#134E4A] line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-teal-600 mt-1 line-clamp-2">{product.description}</p>
                  </div>
                </div>
              </a>
            ))
          ) : (
            // Placeholder jika DB kosong (Sesuai mockup abu-abu)
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-bold uppercase p-4 text-center">
                Upsell Section Placeholder
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}