"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import { motion, AnimatePresence } from 'framer-motion';
import LazyYoutube from "@/components/LazyYoutube";

interface FAQData {
  id: number;
  question: string;
  answer: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

const faqData: FAQData[] = [
  {
    id: 1,
    question: "Aku belum pernah mencatat keuangan, bisa pakai FINA?",
    answer: "Justru FINA didesain khusus untuk pemula! Nggak perlu pusing sama istilah akuntansi atau rumus ribet. Cukup chat pengeluaranmu seperti ngobrol ke teman, biar FINA yang membereskan semua pencatatan dan laporannya."
  },
  {
    id: 2,
    question: "Aku sibuk banget, masih sempet pakai FINA ngga ya?",
    answer: "Pasti sempat! Mencatat di FINA cuma butuh waktu 1-3 detik. Lagi nyetir atau ribet ngetik? Tinggal kirim Voice Note atau Foto Struk belanjaanmu, FINA yang akan input otomatis."
  },
  {
    id: 3,
    question: "Kalau dipakai lewat HP, apa yang perlu aku install?",
    answer: "Nggak perlu install aplikasi tambahan apapun! Selama ada aplikasi WhatsApp di HP kamu, kamu sudah bisa langsung pakai FINA."
  },
  {
    id: 4,
    question: "Kalau pas pakai FINA terus bingung gimana?",
    answer: "Tenang, kamu bakal dapet akses ke video tutorial lengkap step-by-step."
  },
];

const FAQItem = ({ question, answer, defaultOpen = false }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`w-full border-[3px] transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'bg-transparent border-[#147167] rounded-3xl' : 'bg-transparent border-[#147167]/70 hover:border-[#147167] rounded-full'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-5 px-10 text-left focus:outline-none group">
        <span className="text-[#147167] font-medium text-base md:text-lg pr-4">
          {question}
        </span>
                
        <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
          <svg className={`w-6 h-6 text-[#147167] transform transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-45' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-5">
            <div className="w-full h-[1px] bg-[#147167]/70"></div>
          </div>
          
          <div className="py-5 px-10 text-[#147167] leading-relaxed text-sm md:text-base">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-1 md:gap-2">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={4}
      stroke="currentColor" 
      className="w-5 h-5 md:w-6 md:h-6 mb-0.5"
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

const FeatureCard = ({ title, desc }: { title: string, desc: string }) => {
  return (
    <div className="relative">
      <div className="pr-5 pt-5 pb-3 pl-8 rounded-2xl bg-gradient-to-b from-white to-[#a3eee6] shadow-lg relative z-0">
        <div className="space-y-1">
          <h4 className="font-bold text-[#147167] text-lg">
            {title}
          </h4>
          <p className="text-[#147167] text-xs md:text-base leading-relaxed">
            {desc}
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 -left-5 -translate-y-1/2 z-10">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-[#26D7C4] to-[#147167] flex items-center justify-center text-white shadow-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={4}
            stroke="currentColor" 
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, text, image }: { name: string; text: string; image: string }) => {
  return (
    <div className="w-full rounded-[2rem] p-5 bg-gradient-to-b from-[#E0F8F6] to-[#2AB3B0] shadow-[0_10px_30px_-10px_rgba(42,179,176,0.5)] hover:scale-[1.02] transition-transform duration-300 flex flex-col">
      <div className="flex items-center gap-4 mb-4 px-2">
        <div className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden shadow-sm">
          <Image 
            src={image}
            alt={name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        
        <h4 className="text-xl font-bold text-[#147167]">
          {name}
        </h4>
      </div>

      <div className="bg-white rounded-2xl p-6 flex-grow shadow-sm">
        <p className="text-black leading-relaxed text-sm md:text-[15px]">
          {text}
        </p>
      </div>
    </div>
  );
};

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

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rizky", 
    image: "/img/testi/avatar-aif.webp",
    text: "Jadi ceritanya gue tuh orangnya kalau liat lucu langsung checkout, nyadarnya pas cek rekening tinggal 50rb padahal masi tanggal 15. Sejak pakai FINA, setiap abis belanja langsung foto struk terus dia ngasih warning “budget fashion bulan ini udah 70% nih”, baru deh gue mikir dua kali sebelum mau beli-beli lagi."
  },
  {
    id: 2,
    name: "Budi",
    image: "/img/testi/avatar-asran.webp",
    text: "Istriku sampe kaget kok tiba-tiba bisa nabung 800rb sebulan. Rahasianya simpel: FINA ngasih tau ternyata jajan kopi sama rokok gue udah 600rb seminggu, langsung sadar deh."
  },
  {
    id: 3,
    name: "Sarah",
    image: "/img/testi/avatar-clara.webp",
    text: "Integrasi ke spreadsheet-nya beneran mulus dan lengkap banget buat aku yang butuh data mentah dan diolah kembali jadi strategi hemat."
  },
  {
    id: 4,
    name: "Dimas",
    image: "/img/testi/avatar-dimas.webp",
    text: "Bulan lalu gue nangis di kosan karena uang tinggal 50rb padahal masih tanggal 20. Literally cuma makan indomie seminggu. Sejak pakai FINA, gue baru sadar ternyata jajan boba sama nongkrong cafe itu udah habis 400rb sebulan gila kan?! Sekarang gue bisa budgeting beneran, bahkan masih bisa sisain buat pulang kampung."
  },
  {
    id: 5,
    name: "Putri",
    image: "/img/testi/avatar-anggie.webp",
    text: "Kirain bakal ribet kayak aplikasi sebelah yang kebanyakan menu, ternyata sesimpel chattingan biasa doang. Jujur, baru kali ini aku betah nyatet keuangan lebih dari seminggu karena prosesnya nggak ribet hehe..."
  },
  {
    id: 6,
    name: "Andi",
    image: "/img/testi/avatar-fuad.webp",
    text: "Paling suka fitur voice note-nya karena aku orangnya malas banget kalau harus input teks panjang lebar. Tinggal ngomong doang, eh pas dicek laporannya udah rapii."
  }
];

const AutoFitLine = ({ text }: { text: string }) => {
  const COMPRESSION_RATE = 0.57; 
  
  return (
    <div 
      className="w-full flex justify-center items-center px-1 md:px-2"
      style={{ containerType: 'inline-size' }} 
    >
      <h1 
        className="font-bold bg-gradient-to-l from-[#26D7C4] to-[#147167] bg-clip-text text-transparent pb-1 md:pb-2 text-center"
        style={{
            fontSize: `clamp(0.5rem, calc(95cqi / (${text.length} * ${COMPRESSION_RATE})), 5.5rem)`,
            
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

  const column1 = TESTIMONIALS.filter((_, i) => i % 2 === 0);
  const column2 = TESTIMONIALS.filter((_, i) => i % 2 !== 0);

  return (
    <>
      <section className="relative min-h-screen w-full bg-gradient-to-b from-[#E0F7F4] to-[#fff] overflow-hidden text-[#0E4E48]">
        <div className="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-30" />
        <div className="absolute -left-52 top-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50" />
        <div className="absolute -bottom-5 right-5 w-[350px] h-[350px] bg-white opacity-30 rounded-full translate-x-1/3 -translate-y-[30%] pointer-events-none"></div>
        <div className="absolute -bottom-10 right-14 w-[350px] h-[350px] bg-gradient-to-b from-[#26D7C4] to-white opacity-15 rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-5 -left-44 w-[350px] h-[350px] bg-white opacity-30 rounded-full translate-x-1/3 -translate-y-[30%] pointer-events-none"></div>
        <div className="absolute -bottom-10 left-24 w-[350px] h-[350px] bg-gradient-to-b from-[#26D7C4] to-white opacity-15 rounded-full pointer-events-none"></div>

        <div className="relative z-10 container mx-auto pt-0 md:pt-16 pb-0 px-2 lg:px-0"> 
          <div className="flex flex-col items-center justify-between gap-0 lg:gap-4 min-h-[90vh] lg:min-h-0">
            <div className="w-full md:max-w-7xl mt-0 px-4">
              <div className="relative min-h-[200px] flex flex-col justify-center items-center">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    className="w-full flex flex-col items-center gap-0 md:gap-2"
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

            <div className="w-full flex flex-col items-center relative -mt-20 lg:mt-0">
              <div className="relative w-full flex justify-center mb-0 z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[80%] h-full md:h-[80%] bg-[#26D7C4] opacity-20 blur-[80px] rounded-full z-0" />
                <div className="relative z-10 w-full lg:w-[60%] flex justify-center">
                  <Image 
                    src="/fina/mobver-bannerfina.webp"
                    alt="FINA Sekolah WFA"
                    width={1000} 
                    height={800}
                    priority
                    className="w-full max-w-full h-auto object-contain drop-shadow-xl"
                  />
                </div>
              </div>

              <div className="w-screen relative py-3 md:py-7 bg-gradient-to-r from-[#26D7C4] via-[#1DA495] to-[#26D7C4]">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-4 text-white font-semibold text-lg md:text-2xl">
                    <FeatureItem text="Langsung Pakai" />
                    <FeatureItem text="Akses Seumur Hidup" />
                    <FeatureItem text="Tercatat Otomatis Di Spreadsheet" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section className="flex flex-col items-center text-center gap-8 mb-20 mt-10">
        <div className="flex flex-col sm:flex-row gap-8 md:gap-16">
          <Link href="#intro" className="px-6 md:px-10 py-3 md:py-5 rounded-full bg-gradient-to-b from-gray-100 to-[#8BD4D4] text-[#147167] font-semibold text-xl md:text-2xl shadow-lg hover:shadow-xl hover:cursor-pointer transition-all">
            Pelajari Selengkapnya
          </Link>

          <button className="hover:scale-105 block group relative pb-[3.25px] pt-[3.5px] pl-[3px] pr-[2.5px] rounded-full bg-gradient-to-t from-[#147167] to-[#2AB3B0] shadow-lg shadow-teal-700/20 active:scale-95 transition-transform duration-150 ease-in-out hover:cursor-pointer">
            <Link
              href="#cta"
              className="block w-full h-full px-6 md:px-10 py-3 md:py-5 rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white font-semibold text-xl md:text-2xl tracking-wide"
            >
              Mulai Chat dengan FINA
            </Link>
          </button>
        </div>
      </section>

      <section className="w-full pb-20 bg-white overflow-hidden mt-20 md:mt-44">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mx-auto text-center max-w-5xl mb-20">
            <h2 className="text-[1.65rem] leading-tight md:leading-snug md:text-5xl font-medium text-[#147167] tracking-normal">
              Niatnya mau <span className="font-extrabold">Mandiri Finansial</span>, <br className="hidden md:block pb-10"/>
              tapi baru nyatet aja udah kena mental.
            </h2>
          </div>

          <div className="relative space-y-10">
            <div className="absolute -right-1/2 top-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-30 z-0" />
            <div className="absolute -left-[35%] top-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50 z-0" />
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
                  className="object-contain md:scale-125 transition-transform duration-500 z-20"
                />
              </div>
              <div className="w-full md:w-3/4 text-center md:text-left">
                <h3 className="text-lg md:text-2xl font-medium text-[#1EA697] mb-2">
                  <span className="font-extrabold text-2xl md:text-3xl">Ngerasa Ribet </span>buat catat <span className="font-extrabold">1 Transaksi doang?</span> <br className="hidden md:block"/>
                  Ujung-ujungnya males, lupa, dan<br className="hidden md:block"/>gak pernah dibuka lagi.
                </h3>
              </div>
            </div>

            {/* ITEM 3: Struk Numpuk (Text Left - Image Right) */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="w-full md:w-3/4 text-center md:text-right">
                <h3 className="text-xl md:text-2xl font-medium text-[#1EA697] mb-2">
                  Struk & Nota numpuk habis belanja <br className="hidden md:block"/>
                  <span className="font-extrabold">mau di input satu-satu?</span> <br/>
                  <span className="font-extrabold text-2xl md:text-3xl">Duh, Cape dehh.</span>
                </h3>
              </div>
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <Image 
                  src="/fina/fina-2.webp"
                  alt="Struk menumpuk"
                  width={600} height={600}
                  className="object-contain md:scale-150 transition-transform duration-500 z-20"
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
                  className="object-contain md:scale-125 transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-3/4 text-center md:text-left">
                <h3 className="text-lg md:text-2xl font-medium text-[#1EA697] mb-2">
                  Bingung duit <span className="font-extrabold text-xl md:text-3xl">habis kemana.</span> <br className="hidden md:block"/>
                  Gaji baru masuk, tiba-tiba udah mau abis aja.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="intro" className="w-full py-20 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16 space-y-1 md:space-y-4">
            <h2 className="text-3xl md:text-6xl tracking-wide font-bold bg-gradient-to-b from-[#26D7C4] to-[#147167] bg-clip-text text-transparent">
              Kenalan Sama FINA
            </h2>
            <p className="text-lg md:text-2xl text-[#1b8d82] font-medium max-w-3xl mx-auto leading-snug md:leading-relaxed">
              Bukan App. Bukan AI biasa. Tapi temen canggih yang 
              bantuin kamu atur duit langsung dari WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center ml-0 lg:-ml-52">
            <div className="relative w-full flex justify-center md:justify-end pr-0 md:pr-8">
              <div className="relative w-[300px] md:w-[350px]">
                <div className="relative z-20 pointer-events-none drop-shadow-2xl">
                  <Image 
                    src="/frame-iphone.webp"
                    alt="FINA WhatsApp Interface"
                    width={380} 
                    height={700}
                    priority
                    className="w-full h-auto"
                  />
                </div>

                <div className="absolute top-[2.5%] left-[5%] right-[5%] bottom-[2.5%] z-10 rounded-[2.5rem] overflow-hidden bg-black">
                  <div className="w-full h-full mt-[3rem]">
                    <LazyYoutube
                      videoId="_IefQ3zlB10"
                      title="Video Clip FINA"
                      ratio="9:16"
                      thumbnailUrl="/content-pilot/cap-preview-thumb.webp"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-8">
              <h3 className="text-3xl md:text-[2.75rem] tracking-wide font-bold bg-gradient-to-r from-[#26D7C4] to-[#124D4C] bg-clip-text text-transparent leading-tight text-center md:text-left">
                Kenapa FINA Bisa Jadi <br/>
                Bestie Finansialmu?
              </h3>

              <div className="space-y-5 pl-4 md:pl-0">
                <FeatureCard 
                  title="Catat Sat-Set dari chat WA"
                  desc="Lupain ngetik manual. Cukup kirim foto nota / voice note di WA, FINA memproses cuma hitungan detik."
                />

                <FeatureCard 
                  title="Akses Seumur Hidup, Tanpa Tagihan Bulanan!"
                  desc="Sekali beli, FINA nemenin kamu selamanya buat bantu mengelola keuanganmu lebih baik."
                />

                <FeatureCard 
                  title="Langsung Pakai!"
                  desc="Langsung chat FINA, Langsung tercatat semua transaksimu."
                />
              </div>

              <div className="pt-4 w-full flex justify-center">
                <button className="hover:scale-105 block group relative pb-[3.25px] pt-[3.5px] pl-[3px] pr-[2.5px] rounded-full bg-gradient-to-t from-[#147167] to-[#2AB3B0] shadow-lg w-full shadow-teal-700/20 active:scale-95 transition-transform duration-150 ease-in-out hover:cursor-pointer">
                  <Link
                    href="#cta"
                    className="block w-full h-full px-7 md:px-10 py-4 md:py-5 rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white font-bold text-2xl md:text-3xl tracking-wide"
                  >
                    Mulai Coba Gratis!
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl tracking-wide pb-2 font-bold bg-gradient-to-b from-[#26D7C4] to-[#147167] bg-clip-text text-transparent">
              Cara Pakainya Gampang Banget
            </h2>
          </div>
          <div className="relative z-10 w-full flex justify-center mb-16">
            <Image 
              src="/fina/fina-carapakai.webp"
              alt="FINA Sekolah WFA"
              width={1000} 
              height={400}
              priority
              className="w-full max-w-full h-auto object-contain hidden lg:block"
            />
            <Image 
              src="/fina/mobver-fina-carapakai.webp"
              alt="FINA Sekolah WFA"
              width={400} 
              height={1000}
              priority
              className="w-full max-w-full h-auto object-contain block lg:hidden"
            />
          </div>
        </div>
        <div className="w-screen relative py-3 md:py-7 bg-gradient-to-r from-[#26D7C4] via-[#1DA495] to-[#26D7C4]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-4 text-white font-semibold text-lg md:text-2xl">
              <span className="block md:hidden"><FeatureItem text="Akses Seumur Hidup!" /></span>
              <span className="block md:hidden"><FeatureItem text="Data aman di Google Sheets-mu " /></span>
              <span className="hidden md:block"><FeatureItem text="Data aman di Google Sheets-mu sendiri" /></span>
              <span className="hidden md:block"><FeatureItem text="Akses Seumur Hidup, Tanpa Langganan Tiap Bulan" /></span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16 space-y-4">
            <h2 className="text-[1.75rem] md:text-6xl tracking-wide leading-tight md:leading-normal font-bold bg-gradient-to-b from-[#26D7C4] to-[#147167] bg-clip-text text-transparent">
              DENGERIN KATA MEREKA <br />
              YANG UDAH PAKAI FINA!!
            </h2>
          </div>

          <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8 flex flex-col space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                <div className="flex flex-col gap-6 md:gap-8">
                  {column1.map((item) => (
                    <TestimonialCard key={item.id} {...item} />
                  ))}
                </div>

                <div className="flex flex-col gap-6 md:gap-8">
                  {column2.map((item) => (
                    <TestimonialCard key={item.id} {...item} />
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-4 relative w-full flex justify-center md:justify-start pr-0">
              <div className="md:absolute w-[400px] md:w-[350px] bottom-0 md:-bottom-32">
                <div className="relative z-20 pointer-events-none drop-shadow-2xl">
                  <Image 
                    src="/frame-iphone.webp"
                    alt="FINA WhatsApp Interface"
                    width={380} 
                    height={700}
                    priority
                    className="w-full h-auto"
                  />
                </div>

                <div className="absolute top-[2.5%] left-[5%] right-[5%] bottom-[2.5%] z-10 rounded-[2.5rem] overflow-hidden bg-black">
                  <div className="w-full h-full mt-[3rem]">
                    <LazyYoutube
                      videoId="ZLBh7Ql8MN4"
                      title="Video Testimonial FINA"
                      ratio="9:16"
                      thumbnailUrl="/fina/fina-thumbtesti.webp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="w-full py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-6xl tracking-wide pb-2 font-bold bg-gradient-to-b from-[#26D7C4] to-[#147167] bg-clip-text text-transparent">
              FINA UDAH SIAP <br />
              NGE-BANTU KAMU!!
            </h2>
          </div>
          <div className="w-full max-w-7xl mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
              <Link href="https://lynk.id" target="_blank" className="order-2 md:order-1 md:col-span-5 w-[80%] md:w-full mx-auto flex justify-center">
                <Image 
                  src="/fina/fina-ctafree.webp"
                  alt="FINA Free Version"
                  width={400} 
                  height={400}
                  className="w-full h-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                />
              </Link>

              <Link href="https://lynk.id" target="_blank" className="order-1 md:order-2 md:col-span-7 w-full">
                <Image 
                  src="/fina/fina-ctapersonal.webp"
                  alt="FINA Personal Version"
                  width={800} 
                  height={600}
                  priority
                  className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 overflow-hidden mb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-6xl tracking-wide pb-2 font-bold bg-gradient-to-b from-[#26D7C4] to-[#147167] bg-clip-text text-transparent">
              PERTANYAAN YANG <br />
              SERING FINA JAWAB
            </h2>
          </div>

          <div className="w-full max-w-5xl flex flex-col gap-6">
            {faqData.map((item, index) => (
              <FAQItem 
                key={item.id} 
                question={item.question} 
                answer={item.answer} 
                defaultOpen={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="w-full text-[#085b53] text-center py-6 px-4">
        <div className="text-xs md:text-md mx-auto max-w-sm flex justify-center font-medium items-end">
          <p>Copyright &copy; {new Date().getFullYear()}</p>
          <Image
            src="/logo-wfa.webp"
            alt="KADEV Academy"
            width={50}
            height={20}
            className="ml-1.5 mr-1"
            loading="lazy"
          />
          <p>All rights reserved.</p>
        </div>
      </div>
    </>
  );
}