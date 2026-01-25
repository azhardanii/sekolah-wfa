"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import { motion, AnimatePresence } from 'framer-motion';
import LazyYoutube from "@/components/LazyYoutube";

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={4}
      stroke="currentColor" 
      className="w-6 h-6 mb-0.5"
    >
      <path 
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5" 
      />
    </svg>
    <span>{text}</span>
  </div>
);

const HEADLINES = [
  "Uang Bulanan Habis Kemana?\nTanya Aja ke FINA.",
  "Asisten Canggih yang Gak Pernah Lelah,\nFINA Catat Keuanganmu Lebih Mudah!",
  "Kelola Duit Sambil WFA?\nFINA Ngikutin Kamu Kemana Aja!",
  "Asisten Keuangan Canggih\nyang Kerja 24/7 di WhatsApp-mu!",
  "FINA - Pelopor Catat Keuangan\nCuma Pakai WA yang Eksis Sejak 2024.",
  "Dari Kopi Pagi Sampai Makan Malem,\nFINA Bisa Langsung Catat Dari Foto Struk-mu!",
  "Catat di WhatsApp,\nOtomatis Rapi di Spreadsheet.",
  "Males Buka Laptop Buat Catat Pengeluaran?\nChat Aja ke FINA!!",
  "Keuangan Lebih Rapi,\nFINA Bikin Hidup Lebih Happy!",
];

const AutoFitLine = ({ text }: { text: string }) => {
  const COMPRESSION_RATE = 0.65; 
  
  return (
    <div 
      className="w-full flex justify-center items-center px-2"
      style={{ containerType: 'inline-size' }} 
    >
      <h1 
        className="font-bold bg-gradient-to-l from-[#26D7C4] to-[#147167] bg-clip-text text-transparent pb-2 text-center"
        style={{
            fontSize: `clamp(1.5rem, calc(95cqi / (${text.length} * ${COMPRESSION_RATE})), 5.5rem)`,
            whiteSpace: 'nowrap',
            lineHeight: '1.1',
            width: 'auto',
            maxWidth: '100%' 
        }}
      >
        {text}
      </h1>
    </div>
  );
};

export default function FINAPage() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * HEADLINES.length));
    const timer = setInterval(() => {
      setIndex((prev) => (prev === null ? 0 : (prev + 1) % HEADLINES.length));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  if (index === null) return <div className="h-40" />;
  const currentLines = HEADLINES[index].split('\n');

  return (
    <>
      <section className="relative min-h-screen w-full bg-gradient-to-b from-[#E0F7F4] to-[#fff] overflow-hidden text-[#0E4E48]">
        <div className="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-30" />
        <div className="absolute -left-52 top-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50" />
        <div className="absolute -bottom-5 right-5 w-[350px] h-[350px] bg-white opacity-30 rounded-full translate-x-1/3 -translate-y-[30%] pointer-events-none"></div>
        <div className="absolute -bottom-10 right-14 w-[350px] h-[350px] bg-gradient-to-b from-[#26D7C4] to-white opacity-15 rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-5 -left-44 w-[350px] h-[350px] bg-white opacity-30 rounded-full translate-x-1/3 -translate-y-[30%] pointer-events-none"></div>
        <div className="absolute -bottom-10 left-24 w-[350px] h-[350px] bg-gradient-to-b from-[#26D7C4] to-white opacity-15 rounded-full pointer-events-none"></div>

        <div className="relative z-10 container mx-auto py-10 px-6 lg:px-0">
          <div className="flex flex-col items-center justify-between gap-10 lg:gap-4">
            <div className="w-full max-w-7xl mt-0 px-4">
              <div className="relative min-h-[200px] flex flex-col justify-center items-center">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    className="w-full flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -30, filter: 'blur(12px)' }}
                    transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {currentLines.map((line, i) => (
                      <AutoFitLine key={i} text={line} />
                    ))}
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

            <div className="w-full flex flex-col items-center relative -mt-5">
              <div className="relative w-full flex justify-center mb-0 z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#26D7C4] opacity-20 blur-[80px] rounded-full z-0" />
                <div className="relative z-10 w-full lg:w-[60%] flex justify-center">
                  <Image 
                    src="/fina/fina-banner.webp"
                    alt="FINA Sekolah WFA"
                    width={1000} 
                    height={800}
                    priority
                    className="w-full max-w-full h-auto object-contain drop-shadow-xl"
                  />
                </div>
              </div>

              <div className="w-screen relative py-7 bg-gradient-to-r from-[#26D7C4] via-[#1DA495] to-[#26D7C4]">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white font-semibold text-xl md:text-2xl">
                    <FeatureItem text="Akses Seumur Hidup" />
                    <FeatureItem text="Tercatat Otomatis Di Spreadsheet" />
                    <FeatureItem text="Langsung Pakai" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center text-center gap-8 mb-20 mt-10">
        <div className="flex flex-col sm:flex-row gap-16">
          <button className="px-10 py-5 rounded-full bg-gradient-to-b from-gray-100 to-[#8BD4D4] text-[#147167] font-semibold text-2xl shadow-lg hover:shadow-xl transition-all">
            Pelajari Selengkapnya
          </button>

          <button className="hover:scale-105 block group relative pb-[3.25px] pt-[3.5px] pl-[3px] pr-[2.5px] rounded-full bg-gradient-to-t from-[#147167] to-[#2AB3B0] shadow-lg shadow-teal-700/20 active:scale-95 transition-transform duration-150 ease-in-out">
              <Link
                href="/ruang-kelas"
                className="block w-full h-full px-10 py-5 rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white font-semibold text-2xl tracking-wide"
              >
                Mulai Chat dengan FINA
              </Link>
            </button>
        </div>
      </section>

      <section className="w-full pb-20 bg-white overflow-hidden mt-44">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mx-auto text-center max-w-5xl mb-20">
            <h2 className="text-3xl md:text-5xl font-medium text-[#147167] tracking-normal">
              Niatnya mau <span className="font-extrabold">Mandiri Finansial</span>, <br className="hidden md:block pb-10"/>
              tapi baru nyatet aja udah kena mental.
            </h2>
          </div>

          <div className="relative space-y-10">
            <div className="absolute -right-1/2 top-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-30" />
            <div className="absolute -left-[35%] top-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50" />
            {/* ITEM 1: Kopi 25 Ribu (Text Left - Image Right) */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="w-full md:w-3/4 text-center md:text-right">
                <h3 className="text-xl md:text-2xl font-medium text-[#1EA697] mb-2">
                  Kopi 25 ribu, <span className="font-extrabold text-2xl md:text-3xl">“Ah kecil, nanti aja dicatet”</span> <br className="hidden md:block"/>
                  Besoknya lupa, Bulan depan bingung duit ke mana.
                </h3>
              </div>
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <Image 
                  src="/fina/fina-3.webp"
                  alt="Lupa catat pengeluaran kecil"
                  width={400} height={400}
                  className="object-contain transition-transform duration-500"
                />
              </div>
            </div>

            {/* ITEM 2: Ngerasa Ribet (Image Left - Text Right) */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <Image 
                  src="/fina/fina-4.webp"
                  alt="Ribet catat manual"
                  width={500} height={500}
                  className="object-contain scale-125 transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-3/4 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-medium text-[#1EA697] mb-2">
                  <span className="font-extrabold text-2xl md:text-3xl">Ngerasa Ribet </span>buat catat <span className="font-extrabold">1 Transaksi doang?</span> <br className="hidden md:block"/>
                  Ujung-ujungnya males, lupa, dan<br className="hidden md:block"/>gak pernah dibuka lagi.
                </h3>
              </div>
            </div>

            {/* ITEM 3: Struk Numpuk (Text Left - Image Right) */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="w-full md:w-3/4 text-center md:text-right">
                <h3 className="text-xl md:text-2xl font-medium text-[#1EA697] mb-2">
                  Struk & Nota numpuk habis belanja<br className="hidden md:block"/>
                  <span className="font-extrabold">mau di input satu-satu?</span> <br className="hidden md:block"/>
                  <span className="font-extrabold text-2xl md:text-3xl">Duh, Cape dehh.</span>
                </h3>
              </div>
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <Image 
                  src="/fina/fina-2.webp"
                  alt="Struk menumpuk"
                  width={600} height={600}
                  className="object-contain scale-150 transition-transform duration-500"
                />
              </div>
            </div>

            {/* ITEM 4: Bingung Duit Habis (Image Left - Text Right) */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="w-full md:w-5/12 flex justify-center md:justify-end">
                <Image 
                  src="/fina/fina-1.webp"
                  alt="Dompet kosong"
                  width={450} height={450}
                  className="object-contain scale-125 transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-3/4 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-medium text-[#1EA697] mb-2">
                  Bingung duit <span className="font-extrabold text-2xl md:text-3xl">habis kemana.</span> <br className="hidden md:block"/>
                  Gaji baru masuk, tiba-tiba udah mau abis aja.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}