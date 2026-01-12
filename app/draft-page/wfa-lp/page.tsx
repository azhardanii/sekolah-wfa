"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from '@/components/FadeIn';
import { useIsMobile } from "@/hooks/useIsMobile";

type Direction = 'up' | 'down' | 'left' | 'right';
const areaCardsData: {
  dir: Direction;
  imageSrc: string;
  altText: string;
  linkHref: string;
}[] = [
  {
    dir:"right",
    imageSrc: "/onlinelobby-sekolahwfa.webp",
    altText: "Kelas Online Sekolah WFA",
    linkHref: "/kelas-online",
  },
  {
    dir:"down",
    imageSrc: "/lobbyoffline-sekolahwfa.webp",
    altText: "Ekstrakurikuler Sekolah WFA",
    linkHref: "/ekskul",
  },
  {
    dir:"left",
    imageSrc: "/lobbyekstrakurikuler-sekolahwfa.webp",
    altText: "Kelas Offline Sekolah WFA",
    linkHref: "/kelas-offline",
  },
  {
    dir:"right",
    imageSrc: "/lobbyruangbk-sekolahwfa.webp",
    altText: "Ruang B.K. Sekolah WFA",
    linkHref: "/ruangbk",
  },
  {
    dir:"up",
    imageSrc: "/lobbyrekreasi-sekolahwfa.webp",
    altText: "Rekreasi Sekolah WFA",
    linkHref: "/rekreasi",
  },
  {
    dir:"left",
    imageSrc: "/lobbykantin-sekolahwfa.webp",
    altText: "Kantin Sekolah WFA",
    linkHref: "/kantin",
  },
]

const produkList: {
  dir: Direction;
  imageSrc: string;
  linkHref: string;
  title: string;
  tag: string;
  priceOriginal: number;
  priceDiscounted: number;
}[] = [
    {
      dir: 'right',
      tag: 'popular',
      title: 'The Next Level Content Planner AI Integrated - CONTENT AUTO PILOT by Sekolah WFA',
      imageSrc: '/autopilot-sekolahwfa.webp',
      priceOriginal: 250_000,
      priceDiscounted: 99_000,
      linkHref: 'https://lynk.id/febbyanggun/Gxz5rZb',
    },
    {
      dir: 'up',
      tag: 'popular',
      title: 'Assistant Keuangan pakai AI di WA - F.I.N.A. by Sekolah WFA Ngga Perlu Install Aplikasi Lagi!!',
      imageSrc: '/financialassistant-sekolahwfa.webp',
      priceOriginal: 200_000,
      priceDiscounted: 89_000,
      linkHref: 'https://lynk.id/febbyanggun/zxnr3943280z',
    },
    {
      dir: 'left',
      tag: 'popular',
      title: "HABIT TRACKER FULL VERSION Bonus!! Daily Todo List, Mood, Sleep, n' Water Tracker",
      imageSrc: '/trackerhabit-sekolahwfa.webp',
      priceOriginal: 150_000,
      priceDiscounted: 49_000,
      linkHref: 'https://lynk.id/febbyanggun/PGPyE25',
    },
    {
      dir: 'right',
      tag: 'new',
      title: 'Tools Personal Branding Pertama di Indonesia - Personal Branding Builder by Kadev Academy X Sekolah WFA',
      imageSrc: '/pbbkadev-sekolahwfa.webp',
      priceOriginal: 950_000,
      priceDiscounted: 174_000,
      linkHref: 'https://lynk.id/a/4330981422/e3RyMwz/',
    },
    {
      dir: 'up',
      tag: 'new',
      title: 'Workbook Proposal Jalur Langit - Kumpulan Amalan Febby Anggun Sari X Sekolah WFA (Exclusive Collab)',
      imageSrc: '/proposaljalurlangit-sekolahwfa.webp',
      priceOriginal: 100_000,
      priceDiscounted: 25_000,
      linkHref: 'https://lynk.id/febbyanggun/5w1ezww',
    },
    {
      dir: 'up',
      tag: 'new',
      title: 'Project Challenge 40 Hari Work From Anywhere - Daily To Do List Konsisten Ngonten & Bikin Product Digital',
      imageSrc: '/projectchallenge40-sekolahwfa.webp',
      priceOriginal: 100_000,
      priceDiscounted: 35_000,
      linkHref: 'https://lynk.id/febbyanggun/aola1PX',
    },
    {
      dir: 'left',
      tag: 'new',
      title: "Top 100+ Platform Job Seeker Active Local & International - Cocok Buat Para Pekerja WFA (kerja dari mana aja)",
      imageSrc: '/100platformwfa-sekolahwfa.webp',
      priceOriginal: 100_000,
      priceDiscounted: 35_000,
      linkHref: 'https://lynk.id/febbyanggun/9e21rzokyogj',
    },
]

const faqData = [
  {
    question: "Aku GAPTEK banget, bisa nggak ikut belajar di sini?",
    answer:
      "Justru cocok! Banyak yang mulai dari 0, pelan-pelan banget, dan materinya juga dirancang buat orang yang belum ngerti sama sekali. Nggak perlu jago dulu, yang penting mau mulai.",
  },
  {
    question: "Emang masih bisa ya dapet uang dari internet di zaman sekarang?",
    answer:
      "Masih banget! Bahkan peluangnya makin terbuka lebar. Asal tahu caranya aja, internet tuh kayak pasar yang nggak ada tutupnya.",
  },
  {
    question: "Kalau aku udah kerja, bisa ikut belajar juga nggak?",
    answer:
      "Bisa banget. Banyak yang ikut belajar sambil kerja. Tinggal atur waktu aja, misal belajarnya malam atau pas weekend.",
  },
  {
    question: "Apa sih gunanya bikin konten di sosmed?",
    answer:
      "Konten itu cara kamu kenalan, ngobrol, dan narik perhatian orang lain di internet. Bukan cuma buat eksis, tapi buat nunjukin kamu punya nilai, ilmu, atau produk yang bisa bantu mereka.",
  },
  {
    question: "Apa itu Digital Product?",
    answer:
      "Produk yang nggak ada bentuk fisiknya. Seperti: eBook, Template, Webinar, Subcribtion Content, atau Aplikasi yang bisa diunduh. Bikinnya sekali, bisa dijual berkali-kali tanpa ribet mikirin stok.",
  },
  {
    question: "Konten harus viral biar dapet hasil?",
    answer:
      "Nggak harus. Konsistensi lebih penting! Konten yang nggak viral tapi relevan dan rutin justru lebih bikin orang percaya dengan apa yang kamu sampaikan.",
  },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false); // Untuk fade-in
  const [isFadingOut, setIsFadingOut] = useState(false); // Untuk fade-out
  const [openIndexes, setOpenIndexes] = useState(
    Array(faqData.length).fill(false).map((_, i) => i === 0) // hanya pertama yang true
  );
  const router = useRouter();

  useEffect(() => {
    // Saat pertama render halaman ➔ fade-in
    setIsVisible(true);
  }, []);

  const handleClick = (url: string) => {
    setIsFadingOut(true);
    setTimeout(() => {
      router.push(url);
    }, 500);
  };

  // Animasi FAQ
  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();

  // Animasi scroll
  const scale = useTransform(scrollYProgress, isMobile ? [0, 0.1] : [0, 0.25], isMobile ? [1, 2] : [1, 1.75]);
  const translateY = useTransform(scrollYProgress, isMobile ? [0, 0.05] : [0, 0.25], isMobile ? [0, -300] : [0, -600]);
  const opacity = useTransform(scrollYProgress, isMobile ? [0.02, 0.05] : [0.05, 0.125], [1, 0]);
  const subHeroOpacity = useTransform(scrollYProgress, isMobile ? [0.025, 0.05, 0.075, 0.1] : [0.1, 0.125, 0.15, 0.2], [0, 1, 1, 0]);

  return (
    <div className={`relative w-screen overflow-x-hidden transition-opacity duration-1000 ${
          isVisible && !isFadingOut ? 'opacity-100' : 'opacity-0'
        }`}>
      {/* Hero Section dengan Animasi */}
      <motion.div
        style={{ scale, opacity, y: translateY }}
        className={`fixed left-0 top-0 md:mt-16 ml-5 md:ml-0 lg:-ml-5 w-[90%] md:w-screen h-screen -z-10`}
      >
        <div className="absolute top-10 md:-top-8 left-1/2 -translate-x-1/2 z-20 text-center text-[#166256]">
          <h2 className="text-xs font-bold drop-shadow-lg animate-bounce-pulse">Scroll ke Bawah</h2>
          <svg
            className="w-6 h-6 mx-auto -mt-2.5 text-[#166256] animate-bounce-pulse"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <polyline points="8 12 12 16 16 12" />
          </svg>
        </div>
        <Image
          src="/building-sekolahwfa.webp"
          alt="Sekolah WFA Building Photo"
          fill
          className="object-contain w-full h-full scale-110"
          priority
        />
      </motion.div>

      {/* Sub Hero Section - muncul di balik hero */}
      <motion.section
          style={{ opacity: subHeroOpacity }}
          className="fixed -z-10 top-0 left-0 w-screen h-screen flex text-center flex-col gap-2 items-center justify-center px-4"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#4dc194] to-[#166256] bg-clip-text text-transparent tracking-wide hidden md:block">
            SELAMAT DATANG <span className="inline-block text-black animate-wave pb-3 -mt-1">👋🏻</span> <br /> DI SEKOLAH DIGITAL MASA KINI
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#4dc194] to-[#166256] bg-clip-text text-transparent tracking-wide block md:hidden">
            SELAMAT DATANG <br /> DI SEKOLAH DIGITAL MASA KINI <span className="inline-block text-black animate-wave -mt-1">👋🏻</span> 
          </h1>
          <p className="text-xs sm:text-lg text-[#166256] mb-5">
            Belajar menyenangkan dari mana saja dan kapan saja.
          </p>

        {/* <button
          type="button"
          onClick={handleClick}
          className="relative text-lg font-bold text-[#166256] tracking-wider shadow-md gradient-border-circular"
        >
          <span className="flex bg-white px-6 py-2 gap-1 rounded-md">
            DAFTAR PPDB <div className="scale-x-[-1]">↖︎</div>
          </span>
        </button> */}
      </motion.section>

      <div className="h-[75vh] md:h-screen" />

      {/* Lobby Sekolah WFA */}
      <motion.section className="z-10 container mx-auto mt-[110vh] p-3 md:p-10">
        <div className="mb-32">
            <button type="button" className="flex mx-auto relative text-base md:text-lg font-bold text-[#166256] tracking-wider shadow-md gradient-border-circular">
              <span className="bg-white flex px-3 md:px-6 py-2 rounded-md">
                ↓ UPCOMING ↓
              </span>
            </button>
            <Link href="https://chat.whatsapp.com/EZftlt4w5X41tmf1nMTJPP?mode=ac_c" target="_blank">
              <Image
                src="/bootcamp-sekolahwfa.webp"
                alt="Summer School Bootcamp Sekolah WFA Online Class Batch 1"
                width={800}
                height={500}
                className="hidden md:block w-full h-auto mt-12 mb-32 max-w-5xl mx-auto transition-all duration-500 hover:scale-105 hover:shadow-lg hover:-translate-y-2"
                loading="lazy"
              />
              <Image
                src="/bootcamp-mobver-sekolahwfa.webp"
                alt="Summer School Bootcamp Sekolah WFA Online Class Batch 1"
                width={500}
                height={500}
                className="block md:hidden w-full h-auto mt-10 mb-32 max-w-5xl mx-auto transition-all duration-500 hover:scale-105 hover:shadow-lg hover:-translate-y-2"
                loading="lazy"
              />
            </Link>
        </div>

        <FadeIn direction="up">
          <div className="flex flex-col items-center mb-7 md:mb-12">
            <div className="flex items-center text-[#166256] text-sm font-bold uppercase tracking-wider mb-3 border-2 border-[#166256] pl-1.5 pr-2 py-1 rounded-md">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
              </svg>
              EXPLORE
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#166256] text-center tracking-wide">
              LOBBY SEKOLAH WFA
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl px-2 md:px-0 mx-auto">
          {areaCardsData.map((card, index) => (
            <FadeIn direction={card.dir} key={index}>
              <Link href={card.linkHref} onClick={(e) => {
                  e.preventDefault();         // Biar nggak langsung pindah
                  handleClick(card.linkHref);    // Lakukan fade out → baru redirect
                }} className="block group relative w-full overflow-hidden shadow-lg hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-3">
                <div className="relative w-full h-[30.5rem] md:h-[27rem]">
                  <Image
                    src={card.imageSrc}
                    alt={card.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </motion.section>

      {/* Fasilitor Sekolah WFA */}
      <section className="container mx-auto mt-20 p-5 md:p-10">
        <FadeIn direction="up" className="flex flex-col items-center mb-7 md:mb-12">
          <div className="flex items-center text-[#166256] text-sm font-bold uppercase tracking-wider mb-3 border-2 border-[#166256] pl-1.5 pr-2 py-1 rounded-md">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
            </svg>
            EXPERTIST
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#166256] tracking-wide text-center">
            FASILITATOR<br/>SEKOLAH WFA
          </h2>
        </FadeIn>
        
        <div className="container space-y-10 max-w-3xl mx-auto">
          {/* FEBBY ANGGUN */}
          <div className="flex flex-col md:flex-row items-end justify-start gap-5 md:gap-10">
            <FadeIn direction="left" className="w-full md:w-[55%]">
              <Image
                src="/febbyanggun-sekolahwfa.webp"
                alt="Febby Anggun - Sekolah WFA"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
            </FadeIn>

            <FadeIn direction="right" className="w-full md:w-[50%] text-[#166256] text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">
                FEBBY ANGGUN
              </h3>
              <div className="flex justify-center md:justify-start items-center gap-2 mt-2 mb-4">
                <Link href="https://www.linkedin.com/in/febby-anggun-sari-a27645260/" target="_blank" className="hover:border-blue-600">
                  <div className="border-[3px] border-[#166256] group hover:border-blue-600 rounded-[8px] p-[3px] ml-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-[18px] h-[18px] text-[#166256] group-hover:text-blue-600 transition"
                      fill="currentColor"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341a53.73 53.73 0 1 1 53.73-53.73 53.73 53.73 0 0 1-53.73 53.73zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.6V448h-92.68V148.9h88.96v40.8h1.3c12.4-23.6 42.6-48.3 87.7-48.3 93.8 0 111.1 61.8 111.1 142.3V448z"/>
                    </svg>
                  </div>
                </Link>
                <Link href="https://www.instagram.com/febbyanggun.s/" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-[34px] h-[34px] text-[#166256] hover:text-[#dc2743] transition"
                  >
                    <path
                      fill="currentColor"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 186.6c-39.6 0-71.7-32.1-71.7-71.7s32.1-71.7 71.7-71.7 71.7 32.1 71.7 71.7-32.1 71.7-71.7 71.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.6s-57.9-34.5-93.6-36.2c-37-2.1-147.9-2.1-184.9 0-35.7 1.7-67.3 9.9-93.6 36.2s-34.5 57.9-36.2 93.6c-2.1 37-2.1 147.9 0 184.9 1.7 35.7 9.9 67.3 36.2 93.6s57.9 34.5 93.6 36.2c37 2.1 147.9 2.1 184.9 0 35.7-1.7 67.3-9.9 93.6-36.2s34.5-57.9 36.2-93.6c2.1-37 2.1-147.8 0-184.9zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"
                    />
                  </svg>
                </Link>
                <span className="bg-[#ebfa6e] text-[#166256] border-[2.75px] border-[#166256] font-extrabold tracking-wide px-3 py-1 rounded-lg text-sm">
                  WFA INITIATOR
                </span>
              </div>
              <Link href="#" className="block md:hidden">
                <button className="mb-4 bg-[#166256] text-white font-bold px-5 py-2 rounded shadow-md hover:shadow-lg hover:scale-105 transition duration-500 text-sm inline-flex items-center gap-1">
                  KENALAN LEBIH DEKAT
                  <span>↗︎</span>
                </button>
              </Link>
              <p className="text-xs md:text-sm leading-relaxed text-center md:text-justify">
              Dulu aku cuma anak desa yang hampir nggak bisa lanjut SMA. Tapi siapa sangka, sekarang aku jadi inisiator Work From Anywhere, membantu ribuan orang mendapatkan penghasilan dari mana saja
              <br /><br />
              Aku tahu rasanya terbatas oleh keadaan. Tapi aku percaya bahwa di dunia digital punya peluang yang begitu luas — sayangnya, masih banyak yang belum menyadari hal ini
              </p>
              <Link href="https://lynk.id/febbyanggun/page/landing" target="_blank" className="hidden md:block">
                <button className="mt-4 md:mt-5 bg-[#166256] text-white font-bold px-5 py-2 rounded shadow-md hover:shadow-lg hover:scale-105 transition duration-500 text-sm inline-flex items-center gap-1">
                  KENALAN LEBIH DEKAT
                  <span>↗︎</span>
                </button>
              </Link>
            </FadeIn>
          </div>

          {/* AZHARDANII */}
          <div className="flex flex-col md:flex-row-reverse items-start gap-5 md:gap-10">
            <FadeIn direction="right" className="w-full md:w-[55%]">
                <Image
                  src="/azhardanii-sekolahwfa.webp"
                  alt="Azhar Danii - Sekolah WFA"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
            </FadeIn>

            <FadeIn direction="left" className="w-full md:w-[55%] text-[#166256] text-center md:text-right">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">
                SYAUQI AZHAR
              </h3>
              <div className="flex justify-center md:justify-end items-center gap-2 mt-2 mb-4">
                <span className="bg-[#ebfa6e] text-[#166256] border-[2.75px] border-[#166256] font-extrabold tracking-wide px-3 py-1 rounded-lg text-sm">
                  DIGIPRENEUR
                </span>
                <Link href="https://www.linkedin.com/in/azhardanii/" target="_blank" className="hover:border-blue-600">
                  <div className="border-[3px] border-[#166256] group hover:border-blue-600 rounded-[8px] p-[3px] ml-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-[18px] h-[18px] text-[#166256] group-hover:text-blue-600 transition"
                      fill="currentColor"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341a53.73 53.73 0 1 1 53.73-53.73 53.73 53.73 0 0 1-53.73 53.73zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.6V448h-92.68V148.9h88.96v40.8h1.3c12.4-23.6 42.6-48.3 87.7-48.3 93.8 0 111.1 61.8 111.1 142.3V448z"/>
                    </svg>
                  </div>
                </Link>
                <Link href="https://www.instagram.com/azhardanii/" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-[34px] h-[34px] text-[#166256] hover:text-[#dc2743] transition"
                  >
                    <path
                      fill="currentColor"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 186.6c-39.6 0-71.7-32.1-71.7-71.7s32.1-71.7 71.7-71.7 71.7 32.1 71.7 71.7-32.1 71.7-71.7 71.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.6s-57.9-34.5-93.6-36.2c-37-2.1-147.9-2.1-184.9 0-35.7 1.7-67.3 9.9-93.6 36.2s-34.5 57.9-36.2 93.6c-2.1 37-2.1 147.9 0 184.9 1.7 35.7 9.9 67.3 36.2 93.6s57.9 34.5 93.6 36.2c37 2.1 147.9 2.1 184.9 0 35.7-1.7 67.3-9.9 93.6-36.2s34.5-57.9 36.2-93.6c2.1-37 2.1-147.8 0-184.9zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"
                    />
                  </svg>
                </Link>
              </div>
              <Link href="https://drive.google.com/file/d/1mXU647wF048cbsPVtp_Ok-SpGwz0n8TS/" target="_blank" className="block md:hidden">
                <button className="mb-4 bg-[#166256] text-white font-bold px-5 py-2 rounded shadow-md hover:shadow-lg hover:scale-105 transition duration-500 text-sm inline-flex items-center gap-1">
                  KENALAN LEBIH DEKAT
                  <span>↗︎</span>
                </button>
              </Link>
              <p className="text-xs md:text-sm leading-relaxed text-center md:text-justify" style={{ direction: "rtl" }}>
                Memulai karir di bidang teknologi sejak 2017, bermula dari Fullstack Web Developer kemudian terus berkembang mempelajari SEO, UI/UX, Copywriting, Content Creating, Digital Marketing, Artificial Intelegent, Spreadsheet Formula, dsb. Hingga detik ini masih terus mempelajari hal-hal baru seiring dengan perkembangan teknologi di dunia 👨🏻‍💻
              </p>
              <Link href="#" className="hidden md:block">
                <button className="mt-4 md:mt-5 bg-[#166256] text-white font-bold px-5 py-2 rounded shadow-md hover:shadow-lg hover:scale-105 transition duration-500 text-sm inline-flex items-center gap-1">
                  KENALAN LEBIH DEKAT
                  <span>↗︎</span>
                </button>
              </Link>
            </FadeIn>
          </div>

          {/* COMINGSOON */}
          <FadeIn direction="up">
            <h3 className="hidden md:block text-3xl text-[#166256] text-center font-extrabold tracking-tight uppercase">
              WHO THE NEXT?? COMING SOON...
            </h3>
            <h3 className="block md:hidden text-2xl text-[#166256] text-center font-extrabold tracking-tight uppercase">
              WHO THE NEXT?? <br /> COMING SOON...
            </h3>
          </FadeIn>

          <div className="flex flex-col md:flex-row items-start justify-end gap-10">
            <FadeIn direction="right" className="w-full md:w-1/2">
              <Image
                src="/siloueteboy-sekolahwfa.webp"
                alt="Febby Anggun - Sekolah WFA"
                width={250}
                height={300}
                className="w-full h-auto object-cover"
              />
            </FadeIn>

            <FadeIn direction="left" className="w-full md:w-1/2">
              <Image
                src="/silouetegirl-sekolahwfa.webp"
                alt="Febby Anggun - Sekolah WFA"
                width={250}
                height={300}
                className="w-full h-auto object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Kantin Sekolah WFA */}
      <section className="bg-gradient-to-b from-white via-[#34c7c6]/50 to-white">
        <div className="container mx-auto mt-20 p-5 md:p-10">
          <div className="flex flex-col items-center mb-12">
            <FadeIn direction="up" className="flex flex-col items-center mb-5">
              <div className="flex items-center text-[#166256] text-sm font-bold uppercase tracking-wider mb-3 border-2 border-[#166256] pl-1.5 pr-2 py-1 rounded-md">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
                </svg>
                DIGITAL TOOLS
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#166256] text-center tracking-wide">
                KANTIN SEKOLAH WFA
              </h2>
            </FadeIn>

            <div className="bg-white border-2 md:border-[3px] border-[#166256] rounded-lg max-w-4xl w-full py-5 md:py-10 my-5 md:my-10">
              <FadeIn direction="down">
                <h3 className="text-2xl md:text-3xl text-[#166256] text-center font-bold">
                  Produk Terpopuler 🎉
                </h3>
                <div className="h-[3px] md:h-1 w-1/4 mt-1.5 bg-[#166256] rounded-full mx-auto"></div>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:justify-between gap-10 md:gap-0 px-5 lg:px-10 pb-2 mt-10">
                {produkList.filter((produk) => produk.tag === 'popular').map((produk, idx) => (
                  <FadeIn key={idx} direction={produk.dir} className="flex flex-col gap-3 text-[#166256] w-full md:w-[31%]">
                    <Image
                      src={produk.imageSrc}
                      alt={produk.title}
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <h3 className="text-justify text-lg md:text-xs lg:text-sm font-extrabold">
                      {produk.title}
                    </h3>
                    <div className="flex gap-3 items-center justify-between">
                      <div className="flex flex-col">
                        <p className="line-through italic text-xl md:text-sm lg:text-lg font-normal">Rp. {produk.priceOriginal.toLocaleString('id-ID')}</p>
                        <p className="font-extrabold text-2xl md:text-base lg:text-xl tracking-wide">Rp. {produk.priceDiscounted.toLocaleString('id-ID')}</p>
                      </div>
                      <Link
                        href={produk.linkHref}
                        target="_blank"
                        className="w-fit h-fit hover:scale-105 transition bg-[#166256] text-[#ebfa6e] tracking-wide rounded-lg font-extrabold flex justify-center items-center px-5 py-3 md:px-1.5 lg:p-3 md:text-sm lg:text-base"
                      >
                        CHECKOUT
                      </Link>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <div className="max-w-4xl w-full pt-5 mb-20">
              <FadeIn direction="down">
                <h3 className="text-2xl md:text-3xl text-[#166256] text-center font-bold">
                  Produk Terbaru 🛍️
                </h3>
                <div className="h-[3px] md:h-1 w-1/4 mt-1.5 bg-[#166256] rounded-full mx-auto"></div>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-10 lg:gap-5 pb-2 mt-10">
                {produkList.filter((produk) => produk.tag === 'new').map((produk, idx) => (
                  <FadeIn key={idx} direction={produk.dir} className="flex flex-col gap-3 text-[#166256] w-full lg:w-[31%]">
                    <Image
                      src={produk.imageSrc}
                      alt={produk.title}
                      width={300}
                      height={300}
                      className="w-full md:h-[323px] lg:h-[209px] object-cover"
                    />
                    <h3 className="text-justify text-base lg:text-[11px] lg:leading-snug font-extrabold">
                      {produk.title}
                    </h3>
                    <div className="flex gap-3 items-center justify-between">
                      <div className="flex flex-col">
                        <p className="line-through italic text-xl lg:text-sm font-normal">Rp. {produk.priceOriginal.toLocaleString('id-ID')}</p>
                        <p className="font-extrabold text-2xl lg:text-base tracking-wide">Rp. {produk.priceDiscounted.toLocaleString('id-ID')}</p>
                      </div>
                      <Link
                        href={produk.linkHref}
                        target="_blank"
                        className="w-fit h-fit hover:scale-105 transition bg-[#166256] text-[#ebfa6e] tracking-wide rounded-lg font-extrabold flex justify-center items-center px-5 py-3 lg:p-2 lg:text-sm"
                      >
                        CHECKOUT
                      </Link>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            <FadeIn direction="down">
              <Link href="/kantin" className="text-xl md:text-2xl text-[#166256] text-center mt-10 font-extrabold tracking-tight hover:underline hover:scale-105 transition">
                → Lihat Semua Produk...
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Sekolah WFA */}
      <section className="container max-w-5xl mx-auto mt-20 pb-10 px-5">
        <FadeIn direction="left" className="flex flex-col items-center md:items-end mb-0 md:mb-12">
          <div className="flex items-center text-[#166256] text-sm font-bold uppercase tracking-wider mb-3 border-2 border-[#166256] pl-1.5 pr-2 py-1 rounded-md">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
            </svg>
            FAQ
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#166256] tracking-wide text-center md:text-right">
            PERTANYAAN YANG<br/>SERING DITANYAKAN
          </h2>
        </FadeIn>

        <div className="mt-10 flex flex-col gap-7 max-w-5xl w-full">
          {faqData.map((item, index) => (
            <FadeIn direction="right" key={index}>
              <div
                className="w-full border-2 border-[#166256] text-[#166256] p-4 rounded-lg cursor-pointer transition-all duration-1000"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h5 className="text-base w-[95%] font-semibold">{item.question}</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 text-current transform transition-transform duration-300 ${
                      openIndexes[index] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div
                  className={`transition-all duration-700 ease-in-out overflow-hidden ${
                    openIndexes[index]
                      ? "max-h-96 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-2"
                  }`}
                >
                  <p className="text-sm mt-2">
                    {item.answer}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Mading Sekolah WFA */}
      {/* <section className="container mx-auto mt-5 p-5 md:p-10">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center text-[#166256] text-sm font-bold uppercase tracking-wider mb-3 border-2 border-[#166256] pl-1.5 pr-2 py-1 rounded-md">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
            </svg>
            KEEP UPDATE
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#166256] tracking-wide text-center">
            MADING SEKOLAH WFA
          </h2>
        </div>
      </section> */}

      {/* Footer Sekolah WFA */}
      <section className="bg-[#166256] mt-32">
        <div className="container mx-auto mt-5 max-w-5xl py-16 px-5">
          <div className="flex flex-col items-center md:items-start mb-5 md:mb-12">
            <div className="flex items-center text-white text-sm font-bold uppercase tracking-wider mb-3 border-2 border-white pl-1.5 pr-2 py-1 rounded-md">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
              </svg>
              SITEMAP
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide text-center md:text-left">
              HALAMAN SEKOLAH WFA
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-5 md:justify-between text-white text-lg font-semibold tracking-wide mt-6">
            <div className="w-full md:w-[20%] flex flex-wrap justify-center md:flex-col md:items-start gap-5">
              <Link href="/kelas-online" className="flex flex-col hover:scale-105 transition">
                <p>Kelas Online</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
              <Link href="/kelas-offline" className="flex flex-col hover:scale-105 transition">
                <p>Kelas Indoor</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
              <Link href="/kelas-outdoor" className="flex flex-col hover:scale-105 transition">
                <p>Kelas Outdoor</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
            </div>
            <div className="w-full md:w-[20%] flex flex-wrap justify-center md:flex-col md:items-start gap-5">
              <Link href="/ekskul" className="flex flex-col hover:scale-105 transition">
                <p>Ekstrakulikuler</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
              <Link href="/ruangbk" className="flex flex-col hover:scale-105 transition">
                <p>Ruang B.K.</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
              <Link href="/rekreasi" className="flex flex-col hover:scale-105 transition">
                <p>Rekreasi</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
            </div>
            <div className="w-full md:w-[20%] flex flex-wrap justify-center md:flex-col md:items-start gap-5">
              <Link href="/lab" className="flex flex-col hover:scale-105 transition">
                <p>Laboratorium</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
              <Link href="/kantin" className="flex flex-col hover:scale-105 transition">
                <p>Kantin Sekolah</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
              <Link href="/mading" className="flex flex-col hover:scale-105 transition">
                <p>Mading (Blog)</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
            </div>
            <div className="w-full md:w-[20%] flex flex-wrap justify-center md:flex-col md:items-start gap-5">
              <Link href="/contact" className="flex flex-col hover:scale-105 transition">
                <p>Contact</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
              <Link href="/testimoni" className="flex flex-col hover:scale-105 transition">
                <p>Testimoni</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
              <Link href="/term-condition" className="flex flex-col hover:scale-105 transition">
                <p className="hidden lg:block">Terms & Conditions</p>
                <p className="block lg:hidden">T&C</p>
                <div className="bg-white w-full h-0.5 mx-auto"></div>
              </Link>
            </div>
          </div>
        </div>
        <footer className="text-center text-white mt-10 pb-10 font-semibold text-base">
          <p>Copyright &copy; Sekolah WFA {new Date().getFullYear()}. All Rights Reserved.</p>
        </footer> 
      </section>
      
      {/* Content */}
      {/* <div className="relative w-full max-w-xl mx-auto text-[#156357]">
        <h1 className="md:text-3xl text-center pb-2 text-xl">
          Platform <b>Digital Terlengkap</b>
          <br />
          untuk <b>Pekerja WFA</b> Masa Kini.
        </h1>
        <p className="text-center text-xs md:text-sm">
          Belajar, Berkarya, dan Berpenghasilan Dari Mana Aja!
        </p>

        <div className="pt-10 flex justify-center w-full">
          <button
            type="button"
            onClick={handleClick}
            className="bg-[radial-gradient(circle_at_0%_0%,_#1d8b84,_#156357,_#156357,_#156357,_#156357,_#1d8b84)] text-white text-lg md:text-xl font-semibold border-white border-2 px-7 md:px-10 py-1 md:py-2 rounded-lg transition duration-200 hover:bg-[#004aad] hover:text-white"
          >
            &#x25B6; ISI FORM PPDB &#x25C0;
          </button>
        </div>
      </div> */}

      {/* Footer */}
      {/* <div className="absolute bottom-10 text-center text-[#156357] text-xs md:text-sm">
        <p>
          halo@sekolahwfa.com
          <br />© 2025 All Rights Reserved | Terms & Privacy Policy
        </p>
      </div> */}
    </div>
  );
}