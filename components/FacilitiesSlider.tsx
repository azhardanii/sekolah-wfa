'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Ikon panah default, bisa diganti image

// DATA FASILITAS (Berdasarkan gambar referensi Anda)
const FACILITIES = [
  {
    id: 1,
    title: 'Ruang BK',
    desc: 'Konsultasi Mental Health & Kenali Potensi Dalam Dirimu Bareng Psikolog.',
    icon: '/iconwfa-ruangbk.webp',
  },
  {
    id: 2,
    title: 'Rekreasi',
    desc: 'Trip bersama ke destinasi dalam & luar negeri, sekaligus menjalin relasi.',
    icon: '/iconwfa-rekreasi.webp',
  },
  {
    id: 3,
    title: 'Ruang Kelas',
    desc: 'Pembelajaran kerja WFA (berpenghasilan dari mana aja), Akses kapanpun.',
    icon: '/iconwfa-ruangkelas.webp',
  },
  {
    id: 4,
    title: 'Laboratorium',
    desc: "Digital Asset's Agency (Jasa Customize Development Digital Tools)",
    icon: '/iconwfa-lab.webp',
  },
  {
    id: 5,
    title: 'Kantin',
    desc: 'Tempat jajan Ebook, Tools Digital, Record Webinar, dsb.',
    icon: '/iconwfa-kantin.webp',
  },
  {
    id: 6,
    title: 'Mading', 
    desc: 'Pusat Info loker, showcase karya, & news update seputar dunia digital.',
    icon: '/iconwfa-mading.webp',
  },
];

export default function FacilitiesSlider() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % FACILITIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + FACILITIES.length) % FACILITIES.length);
  };

  useEffect(() => {
    // Jika sedang dipause (kursor di atas slider), hentikan timer
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 15000); // 15000ms = 15 detik

    // Bersihkan interval saat komponen unmount atau state berubah
    return () => clearInterval(interval);
  }, [isPaused]);

  // Helper untuk mendapatkan offset posisi
  const getOffset = (index: number) => {
    const total = FACILITIES.length;
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <section className="w-full pb-10 bg-white overflow-hidden flex flex-col items-center">
      
      {/* JUDUL SECTION */}
      <div className="text-center mb-5 px-4">
        <h2 className="text-3xl md:text-5xl font-semibold text-[#147167]">
          Fasilitas di Sekolah WFA
        </h2>
      </div>

      {/* --- SLIDER AREA --- */}
      <div className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center perspective-1000">
        {FACILITIES.map((item, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;
          
          // Konfigurasi Posisi & Scale
          let x = '0%';
          let scale = 1;
          let zIndex = 0;
          let opacity = 1;
          
          // Jarak antar kartu
          const spacing = 320; // Sesuaikan jika ingin lebih rapat/renggang

          if (isActive) {
            x = '0%';
            scale = 1.10; // Active item lebih besar (115%)
            zIndex = 20;
            opacity = 1;
          } else if (Math.abs(offset) === 1) {
            x = `${offset * spacing}px`;
            scale = 0.85; // Item samping lebih kecil
            zIndex = 10;
            opacity = 0.7; // Agak transparan
          } else if (Math.abs(offset) === 2) {
             // Item terjauh (masih terlihat sedikit)
            x = `${offset * (spacing * 0.9)}px`;
            scale = 0.7;
            zIndex = 5;
            opacity = 0.4;
          } else {
            // Sembunyikan sisanya
            x = `${offset * spacing}px`;
            scale = 0.5;
            opacity = 0;
          }

          // Responsive Mobile: Tumpuk saja / logic sederhana
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          if (isMobile) {
            if (!isActive) opacity = 0; // Di mobile hanya tampilkan 1
          }

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{ x, scale, zIndex, opacity }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              onClick={() => {
                  if (offset === 1) handleNext();
                  if (offset === -1) handlePrev();
              }}
            >
              {/* === CARD CONTAINER === */}
              {/* Gradient Diagonal: FEFEFE -> 26D7C4 -> 147167 */}
              <div 
                className={`
                  relative w-[280px] h-[360px] md:w-[300px] md:h-[300px] 
                  rounded-[35px] p-6 flex flex-col items-center text-center justify-between
                  bg-gradient-to-br from-[#FEFEFE] via-[#23c6b6] to-[#147167]
                  shadow-[0_20px_40px_-10px_rgba(20,113,103,0.3)]
                `} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
              >
                {/* ICON */}
                <div className="mt-4 w-28 h-28 relative">
                   {/* Placeholder Icon jika image belum ada, ganti src sesuai aset Anda */}
                   <Image 
                     src={item.icon} 
                     alt={item.title} 
                     fill 
                     className="object-contain drop-shadow-md"
                   />
                </div>

                {/* TEXT CONTENT */}
                <div className="flex flex-col gap-1 mb-2 mt-3">
                    {/* Title: Pakai warna gelap agar kontras dengan bagian atas gradient yg putih */}
                    <h3 className="text-xl font-semibold text-white">
                        {item.title}
                    </h3>
                    {/* Desc: Putih agar kontras dengan bagian bawah gradient yg hijau tua */}
                    <p className="text-white text-xs font-medium leading-snug px-2">
                        {item.desc}
                    </p>
                </div>

                {/* BUTTON 'LIHAT DETAIL' */}
                <button className="mt-2 mb-4 bg-white text-[#147167] px-6 py-2 rounded-full text-sm font-bold shadow-md hover:scale-105 transition-transform">
                    Lihat Detail
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* --- NAVIGATION BUTTONS (DI BAWAH SLIDER) --- */}
      <div className="flex items-center gap-6 mt-2 z-30">
        
        {/* Tombol Prev */}
        <button 
            onClick={handlePrev}
            className="group w-20 h-14 rounded-full bg-white border-2 border-[#26D7C4] flex items-center justify-center shadow-lg hover:bg-[#26D7C4] hover:border-[#147167] transition-all duration-300 active:scale-95"
        >
            {/* Ganti <ArrowLeft /> dengan <Image src="/path/icon-left.png" /> jika ingin pakai gambar sendiri */}
            <ArrowLeft className="w-7 h-7 text-[#147167] stroke-[2.5] stroke-[#147167] group-hover:text-white group-hover:stroke-white transition-colors" />
        </button>

        {/* Tombol Next */}
        <button 
            onClick={handleNext}
            className="group w-20 h-14 rounded-full bg-white border-2 border-[#26D7C4] flex items-center justify-center shadow-lg hover:bg-[#26D7C4] hover:border-[#147167] transition-all duration-300 active:scale-95"
        >
             {/* Ganti <ArrowRight /> dengan <Image src="/path/icon-right.png" /> jika ingin pakai gambar sendiri */}
            <ArrowRight className="w-7 h-7 text-[#147167] stroke-[2.5] stroke-[#147167] group-hover:text-white group-hover:stroke-white transition-colors" />
        </button>

      </div>

    </section>
  );
}