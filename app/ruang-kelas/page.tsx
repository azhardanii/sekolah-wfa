import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogOut, Home, PlayCircle } from "lucide-react";
import { COURSE_DATA } from "@/lib/data";

export default async function RuangKelasPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  return (
    <div className="flex min-h-screen flex-col bg-[#F0FDFA] md:flex-row">
      {/* SIDEBAR / TOP NAV (MOBILE) */}
      <aside className="fixed left-0 right-0 top-0 z-50 flex h-20 flex-row items-center justify-between bg-white px-4 shadow-sm md:h-full md:w-64 md:flex-col md:justify-start md:bg-[linear-gradient(180deg,_#FEFEFE_1%,_#26D7C4_55%,_#26D7C4_57%,_#FEFEFE_99%)] md:px-0 md:pb-6 md:pt-20 md:text-white md:shadow-none">
        
        <div className="flex w-24 justify-center md:mb-20 md:w-full">
          <Image
            src="/logo-wfa.webp"
            alt="Sekolah WFA Logo"
            width={150}
            height={75}
            priority
            className="object-contain"
          />
        </div>

        {/* Navigation & Logout Wrapper */}
        <div className="flex flex-row items-center gap-2 md:w-full md:flex-col md:gap-0">
          <nav className="md:mb-2 md:w-full">
            <div className="flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#2AB3B0] to-[#147167] px-3 py-2 text-white md:justify-start md:rounded-none md:px-10 md:py-3">
              <Home size={20} className="h-5 w-5" />
              <span className="hidden font-medium sm:block md:block">Ruang Kelas</span>
            </div>
          </nav>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
            className="md:w-full"
          >
            <button className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2 text-[#147167] transition-colors hover:bg-black/5 md:justify-start md:rounded-lg md:px-10 md:py-3 md:hover:bg-white/10">
              <LogOut size={20} className="h-5 w-5" />
              <span className="hidden sm:block md:block">Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-5 pt-28 pb-10 md:ml-64 md:px-10 md:pt-20">
        
        {/* HEADER USER */}
        <div className="mb-8 flex flex-col items-center gap-4 text-center md:mb-[4.4rem] md:flex-row md:text-left">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-sm">
            <Image
              src={session.user?.image || "/default-avatar.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="flex items-center justify-center gap-2 text-2xl font-bold md:justify-start md:text-4xl">
              <span className="bg-gradient-to-r from-[#26D7C4] to-[#147167] bg-clip-text text-transparent">
                Hai, {session.user?.name ? (session.user.name.split(" ")[0].charAt(0).toUpperCase() + session.user.name.split(" ")[0].slice(1).toLowerCase()) : "Kak"}
              </span>
              <span>👋🏻</span>
            </h2>
            <p className="pt-1 text-sm font-semibold text-[#147167] md:text-base">
              Selamat datang di Ruang Kelas!<br /> Semangat belajarnya yaa..🔥
            </p>
          </div>
        </div>

        {/* GRID VIDEO THUMBNAILS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSE_DATA.map((course) => (
            <Link href={`/ruang-kelas/${course.id}`} key={course.id} className="group block h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-teal-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                
                <div className="relative aspect-video w-full bg-gray-200">
                  <Image
                    src={`https://img.youtube.com/vi/${course.id}/maxresdefault.jpg`}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <PlayCircle className="h-14 w-14 text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                  </div>

                </div>

                <div className="flex flex-1 flex-col p-5 border-t border-teal-50">
                  <h4 className="line-clamp-2 font-bold text-lg text-[#147167] transition-colors duration-300 group-hover:text-[#1c8a82]">
                    {course.title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}