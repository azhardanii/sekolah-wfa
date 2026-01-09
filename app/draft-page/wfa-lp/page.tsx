"use client";

import Image from "next/image";
import Link from "next/link";
import CommunitySlider from "@/components/CommunitySlider";
import TestimoniSection from "@/components/TestimoniSection";

export default function HeroSection() {
  const COMMUNITY_IMAGES = Array.from({ length: 26 }, (_, i) => 
    `/img/community/Community Momment (${i + 1}).webp`
  );

  return (
    <>
      <section className="relative min-h-screen w-full bg-gradient-to-b from-[#E0F7F4] to-[#fff] overflow-hidden text-[#0E4E48]">
        <div className="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-30" />
        <div className="absolute -left-52 top-20 w-[400px] h-[400px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-white opacity-30 rounded-full translate-x-1/3 -translate-y-[30%] pointer-events-none"></div>
        <div className="absolute -bottom-5 right-32 w-[450px] h-[450px] bg-gradient-to-b from-[#26D7C4] to-white opacity-15 rounded-full pointer-events-none"></div>

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
                          Beranda
                      </a>
                  </div>

                  <a href="#" className="text-[#147167] font-semibold hover:text-[#2AB3B0] transition-colors scale-105">
                  Fasilitas
                  </a>
                  <a href="#" className="text-[#147167] font-semibold hover:text-[#2AB3B0] transition-colors scale-105">
                  Profil Sekolah
                  </a>
                  <a href="#" className="text-[#147167] font-semibold hover:text-[#2AB3B0] transition-colors scale-105">
                  Cerita Alumni
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
                  Belajar GRATIS &#8599;
              </Link>
          </button>
        </nav>

        <div className="relative z-10 container mx-auto py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
            <div className="w-full md:w-1/2 lg:w-7/12 max-w-3xl -mt-10">
              <h1 className="text-5xl md:text-7xl font-semibold mb-6 text-[#147167]">
                Sekolah WFA <br />
                <span className="md:text-[5.25rem] text-[#147167]">Pertama</span> <br />
                di Indonesia
              </h1>

              <h2 className="text-2xl md:text-[2.65rem] pt-1 font-semibold bg-gradient-to-r h-12 from-[#2AB3B0] to-[#147167] bg-clip-text text-transparent">
                Dari Gen Z untuk Negeri
              </h2>

              <p className="text-black font-medium text-lg mb-10 pl-0.5 max-w-xl">
                Ngajarin kamu Skill WFA & Product Digital tanpa batas usia
              </p>

              <div className="flex flex-col items-start gap-8">
                <button className="hidden md:block group relative pb-[3.25px] pt-[3.5px] pl-[3px] pr-[2.5px] rounded-full bg-gradient-to-t from-[#147167] to-[#2AB3B0] shadow-lg shadow-teal-700/20 active:scale-95 transition-transform duration-150 ease-in-out">
                  <Link
                    href="/ruang-belajar"
                    className="block italic w-full h-full px-5 py-2 rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white font-semibold text-xl tracking-wide"
                  >
                    Mulai Belajar Sekarang, GRATIS!!
                  </Link>
                </button>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex -space-x-3">
                    {[
                      '/img/testi/avatar-dimas.webp',
                      '/img/testi/avatar-fanny.webp',
                      '/img/testi/avatar-kadafi.webp',
                      '/img/testi/avatar-mindiw.webp',
                    ].map((src, i) => (
                      <div
                        key={i} // Menggunakan index sebagai key
                        className="w-14 h-14 rounded-full border-2 border-white bg-gray-200 relative overflow-hidden"
                      >
                        <Image
                          src={src}
                          alt={`User ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold bg-gradient-to-l from-[#2AB3B0] to-[#147167] bg-clip-text text-transparent text-5xl">
                      21.500+
                    </span>
                    <span className="text-base max-w-[10rem] leading-tight bg-gradient-to-l pt-0.5 h-11 from-[#2AB3B0] via-[#147167] to-[#147167] bg-clip-text text-transparent font-medium">
                      Pembelajar yang Telah Bergabung
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/2 flex justify-center md:justify-end relative">
              <div className="absolute inset-0 bg-[#26D7C4] opacity-20 blur-[80px] rounded-full transform scale-75 z-0" />
                <Image 
                  src="/img/lp/model-wfa.webp"
                  alt="Model Sekolah WFA"
                  width={800} 
                  height={900}
                  priority
                  className="relative z-10 w-full max-w-md md:max-w-full h-auto object-contain drop-shadow-xl"
                />
            </div>

          </div>
        </div>
        <div className="px-24">
          <Image 
            src="/img/lp/trust-wfa.webp"
            alt="Trust Sekolah WFA"
            width={2000} 
            height={1000}
            priority
            className="relative z-10 w-full h-auto object-contain"
          />
        </div>
      </section>

      <TestimoniSection />

      <section className="my-12">
        <h2 className="text-4xl font-semibold text-center mb-10 text-[#147167]">
          Moment Bersama Komunitas
        </h2>
        <CommunitySlider images={COMMUNITY_IMAGES} />
      </section>
      
    </>
  );
}