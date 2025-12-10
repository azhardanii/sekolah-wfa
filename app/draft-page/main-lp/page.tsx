import React from 'react';
import StatSection from '@/components/StatSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col justify-center items-center relative overflow-hidden">
      
      {/* ========================================= */}
      {/* --- BACKGROUND SHINE / GLOW EFFECT --- */}
      {/* ========================================= */}
      
      {/* 1. Main Spotlight (Cahaya Utama dari Tengah Atas) */}
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#32c8c7] opacity-20 blur-[120px] pointer-events-none z-0" 
      />

      {/* 2. Secondary Ambient (Cahaya Redup Melebar) */}
      <div 
        className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#32c8c7]/10 to-transparent blur-3xl pointer-events-none z-0" 
      />

      {/* ========================================= */}

      
      {/* --- Section Hero (Tengah) --- */}
      {/* Note: Saya pastikan z-10 ada disini agar text tidak tertutup efek shine */}
      <section className="w-full max-w-5xl mx-auto px-6 py-20 mt-9 flex flex-col items-center text-center z-10 relative">
        
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-2">
          Sekolah Digital Terlengkap
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent h-[4.25rem] bg-gradient-to-b from-[#32c8c7] to-[#237674]">
          Dari Gen-Z untuk Negeri.
        </h2>

        {/* Subtitle 1 */}
        <p className="mt-8 text-white/70 text-lg md:text-2xl font-light max-w-3xl">
          Platform Pembelajaran <span className="italic">Work From Anywhere</span>,
          <br className="hidden md:block" />
          Berkarya & Berpenghasilan <span className="font-bold text-white/90">Dari Mana Aja.</span>
        </p>

        {/* Subtitle 2 (Description) */}
        <p className="mt-10 text-white/70 text-sm md:text-base max-w-3xl leading-relaxed">
          Ini adalah <span className="font-bold text-white/90">akhir dari rutinitas yang monoton!</span>
          <br />
          Mulai <span className="italic font-bold text-white/90">upgrade skill</span> kamu dengan panduan belajar WFA yang <span className="font-bold text-white/90">jelas dan lengkap.</span>
          <br />
          <span className="underline text-white/90">Didesain untuk pemula</span> dan juga untuk kamu yang sudah pernah belajar sebelumnya.
        </p>

        {/* Buttons Action */}
        <div className="mt-14 flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Button 1: Gradient Border Trick */}
        <button className="relative group p-[3px] rounded-full bg-gradient-to-l from-[#32c8c7] via-[#237674] to-[#237674]">
        {/* Bagian dalam tombol (Layer penutup) */}
        <div className="px-10 py-2 rounded-full bg-black group-hover:bg-white/10 transition-all duration-300 h-full w-full flex items-center justify-center">
            <span className="text-white font-semibold">Lihat Program kami</span>
        </div>
        </button>

          {/* Button 2 */}
          <button className="px-10 py-2 rounded-full bg-gradient-to-l from-[#32c8c7] to-[#237674] text-white font-semibold shadow-[0_0_15px_rgba(50,200,199,0.4)] hover:shadow-[0_0_25px_rgba(50,200,199,0.6)] transition-all duration-300">
            Mulai belajar sekarang
          </button>
        </div>
      </section>

      {/* --- Section Stats (Bawah) --- */}
      <StatSection />

      <section className="h-screen">
         {/* Spacer untuk scroll effect */}
      </section>

    </main>
  );
}