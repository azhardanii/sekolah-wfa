"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen w-full bg-gradient-to-b from-[#E0F7F4] to-[#F0FDFA] overflow-hidden text-[#0E4E48]">
        <div className="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-30" />
        <div className="absolute -left-52 top-20 w-[400px] h-[400px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white opacity-30 rounded-full translate-x-1/3 -translate-y-[30%] pointer-events-none"></div>
        <div className="absolute -bottom-10 right-10 w-[300px] h-[300px] bg-gradient-to-b from-[#26D7C4] to-white opacity-15 rounded-full pointer-events-none"></div>

        <nav className="relative z-10 flex items-center justify-between px-6 md:px-24 mt-2 py-6">
          <div className="flex flex-col">
            <Image
              src="/logo-wfa.webp" 
              alt="Sekolah WFA Logo" 
              width={100}
              height={50}
              priority
              className="object-contain"
            />
          </div>

          <div className="hidden md:flex pt-[2.5px] pb-[2.5px] pl-[2.5px] pr-[2.75px] rounded-full bg-gradient-to-b from-[#2AB3B0] to-[#147167] shadow-sm">            
              <div className="flex items-center gap-7 bg-white/90 backdrop-blur-sm pr-8 rounded-full text-base">
              
                  <div className="p-[2.5px] rounded-full bg-gradient-to-b from-[#2AB3B0] to-[#147167] scale-105 inline-block">
                      <a href="#" className="block w-full h-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white px-5 py-2 rounded-full font-medium">
                          Home
                      </a>
                  </div>

                  <a href="#" className="text-[#147167] font-semibold hover:text-[#2AB3B0] transition-colors scale-105">
                  Service
                  </a>
                  <a href="#" className="text-[#147167] font-semibold hover:text-[#2AB3B0] transition-colors scale-105">
                  About Us
                  </a>
                  <a href="#" className="text-[#147167] font-semibold hover:text-[#2AB3B0] transition-colors scale-105">
                  Alumni Story
                  </a>
                  <a href="#" className="text-[#147167] font-semibold hover:text-[#2AB3B0] transition-colors scale-105">
                  Event
                  </a>
                  <a href="#" className="text-[#147167] font-semibold hover:text-[#2AB3B0] transition-colors scale-105">
                  Promo
                  </a>
                  
              </div>
          </div>

          <button className="hidden md:block group relative py-[3px] pl-[3.5px] pr-[3.5px] rounded-full bg-gradient-to-t from-[#147167] to-[#2AB3B0] shadow-lg shadow-teal-700/20 active:scale-95 transition-transform duration-150 ease-in-out">
              <Link href="/ruang-belajar" className="block w-full h-full px-5 py-2 rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white font-semibold text-lg tracking-wide">
                  Free Course
              </Link>
          </button>
        </nav>

        <div className="relative z-10 container mx-auto pt-16 mt-7 pb-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-semibold leading-[1.1] mb-4 text-[#147167]">
              Sekolah WFA <br />
              <span className="md:text-[5.25rem] text-[#147167]">Pertama</span> <br />
              di Indonesia
            </h1>

            <h2 className="text-2xl md:text-[2.65rem] pt-1 font-semibold mb-1 bg-gradient-to-r h-12 from-[#2AB3B0] to-[#147167] bg-clip-text text-transparent">
              Dari Gen Z untuk Negeri
            </h2>

            <p className="text-black font-medium text-lg mb-7 pl-0.5 max-w-xl">
              Ngajarin kamu Skill WFA & Product Digital tanpa batas usia
            </p>

            <div className="flex flex-col items-start gap-8">
              <button className="hidden md:block group relative pb-[3.25px] pt-[3.5px] pl-[3px] pr-[2.5px] rounded-full bg-gradient-to-t from-[#147167] to-[#2AB3B0] shadow-lg shadow-teal-700/20 active:scale-95 transition-transform duration-150 ease-in-out">
                <Link href="/ruang-belajar" className="block w-full h-full px-5 py-2 rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white font-semibold text-xl tracking-wide">
                    Try Learning for Free
                </Link>
              </button>
              
              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-2 border-white bg-gray-200 relative overflow-hidden">
                      <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" fill className="object-cover" />
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-full border-2 border-white bg-gradient-to-b from-[white] to-[#26D7C4] flex items-center justify-center text-[10px] text-white font-bold z-20" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold bg-gradient-to-l from-[#2AB3B0] to-[#147167] bg-clip-text text-transparent text-3xl">21.500+</span>
                  <span className="text-base max-w-[6rem] leading-none bg-gradient-to-l pt-0.5 h-9 from-[#2AB3B0] via-[#147167] to-[#147167] bg-clip-text text-transparent font-medium -mt-1">Learners have joined</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* <div className="w-full px-4 md:px-12 pb-6 md:pb-8 z-20 mt-10">
          <div 
              className="w-full rounded-[30px] p-3 md:p-4 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 shadow-2xl shadow-teal-900/10"
              style={{
                  background: "linear-gradient(180deg, #FEFEFE 0%, #26D7C4 27%, #26D7C4 57%, #FEFEFE 99%)"
              }}
          >
              {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-md rounded-2xl h-24 md:h-32 shadow-sm border border-white/40 flex items-center justify-center group cursor-pointer hover:bg-white/50 transition-all">
                      <div className="w-12 h-2 rounded-full bg-teal-800/10 group-hover:bg-teal-800/20 transition-colors"></div>
                  </div>
              ))}
          </div>
        </div> */}
    </>
  );
}