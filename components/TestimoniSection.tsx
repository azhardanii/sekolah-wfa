'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ibun Aif',
    handle: '@aifarifah',
    avatar: '/img/testi/avatar-aif.webp',
    image: '/img/testi/profileig-aif.webp',
    text: "Duh gimana ya, seneng banget rasanya. Dulu tuh aku cuma bisa bikin konten, tapi gak ngerti gimana cara monetize dengan bener. Nah Sekolah WFA ini ngajarin semua hal itu—dari strategi, eksekusi, sampe cara dapetin penghasilan dari mana aja. Dan yang paling aku suka, mereka ngajarin dengan cara yang fun, gak boring. Mentor-mentornya juga asik, bisa diajak diskusi kapan aja. Pokoknya materinya daging semua deh!",
  },
  {
    id: 2,
    name: 'Raden Anggie',
    handle: '@radengie',
    avatar: '/img/testi/avatar-anggie.webp',
    image: '/img/testi/profileig-anggie.webp',
    text: "Awalnya sih agak ragu ya, namanya juga modal nekat, apalagi sebelumnya aku pernah ikut kelas gini zonkk banget! Tapi pas udah masuk, wahhh ternyata beneran berkualitas. Sistemnya rapi, step by step jelas. Dan yang bikin kaget, dalam waktu sebulan aja aku udah dapet 10 juta pertama ku! Gak nyangka secepatnya itu. Sekarang income aku lebih stabil, dan yang paling penting, aku happy karena bisa atur waktu sendiri. Thank God mempertemukan ku dengan Sekolah WFA!",
  },
  {
    id: 3,
    name: 'Asran Shady',
    handle: '@gashady',
    avatar: '/img/testi/avatar-asran.webp',
    image: '/img/testi/profileig-asran.webp',
    text: "Sebagai orang yang pekerjaannya mobile, saya butuh skill yang bisa mendukung fleksibilitas itu. Sekolah WFA memberikan perspektif baru tentang bagaimana saya bisa diversifikasi pekerjaan tanpa meninggalkan passion saya di dunia jurnalistik. Kurikulumnya applicable, dan saya bisa langsung praktek. Kalau ditanya worth it atau tidak, jawabannya absolutely worth it.",
  },
  {
    id: 4,
    name: 'Clara',
    handle: '@ceritadigitalclara',
    avatar: '/img/testi/avatar-clara.webp',
    image: '/img/testi/profileig-clara.webp',
    text: "Guys, jujur sebenernya aku tuh udah mulai nyemplung, tapi sempet stuck dan ragu banget buat lanjut karena ngerasa super newbie di dunia digital. Tapi untungnya setelah belajar di Sekolah WFA, akar permasalahanku bener-bener dibedah tuntas! Akhirnya aku bisa lepas dari mental block, dan sekarang malah jadi makin pede buat action. Ternyata kuncinya bukan cuma di skill, tapi di pola pikir yang bener. Thanks banget ilmunya!",
  },
  {
    id: 5,
    name: 'David Lo',
    handle: '@davidlo.fit',
    avatar: '/img/testi/avatar-david.webp',
    image: '/img/testi/profileig-david.webp',
    text: "Gue udah coba berbagai course online, tapi Sekolah WFA beda level sih. Mereka tuh praktis banget, langsung to the point. Gak pake basa-basi teori yang bikin ngantuk. Sekarang gue bisa dapetin income dari mana aja, meanwhile gue lagi workout di gym manapun yang gue mau. Life's good, man.",
  },
  {
    id: 6,
    name: 'Dimas Ramadhan',
    handle: '@dimasramadhan',
    avatar: '/img/testi/avatar-dimas.webp',
    image: '/img/testi/profileig-dimas.webp',
    text: "Jadi ceritanya gue kan udah lama banget jadi travel creator ya. Kira-kira udah ngerti semua lah. Eh pas ikut Sekolah WFA, ternyata banyak banget yang masih missing. Especially soal sistemnya. Mereka ngajarin hal-hal yang gak pernah kepikiran sama gue sebelumnya. Dan yang gue suka, kak Anggun itu humble, gak sok tau. Pokoknya recommended deh kalau lo serius.",
  },
  {
    id: 7,
    name: 'Sherly Fanny',
    handle: '@fannykondoh',
    avatar: '/img/testi/avatar-fanny.webp',
    image: '/img/testi/profileig-fanny.webp',
    text: "Pas gue lagi masa-masa berat dulu, gue sadar banget pentingnya punya kerjaan yang fleksibel. Dan WFA ini literally ngasih semua yang gue butuhin. Dari mulai skill sampai support system-nya. Gue nangis beberapa kali lho waktu belajar, bukan karena susah, tapi karena grateful aja akhirnya nemu tempat yang bener-bener understand our needs as digital workers.",
  },
  {
    id: 8,
    name: 'Fuad Rizal',
    handle: '@fuadekspor',
    avatar: '/img/testi/avatar-fuad.webp',
    image: '/img/testi/profileig-fuad.webp',
    text: "Kak, saya jujur ya. Awalnya mikir, lah ini kok kayak kursus-kursus online pada umumnya. Tapi ternyata beda jauh. Mereka tuh detail banget ngajarinnya, dan bisa disesuaikan sama industri kita. Saya kan di bidang ekspor, tradisional banget. Eh mereka bisa breakdown gimana cara digitalisasinya. Mantap pokoknya. Sekarang kerjaan saya jauh lebih ringan, bisnis makin lancar.",
  },
  {
    id: 9,
    name: 'Hana Puji',
    handle: '@hana.ph',
    avatar: '/img/testi/avatar-hana.webp',
    image: '/img/testi/profileig-hana.webp',
    text: "Gue tuh dari dulu pengen banget bisa kerja sambil traveling gitu kan. Nah, Sekolah WFA ini jawaban banget sih buat mimpi gue. Mereka ngajarin everything you need to know dari nol sampai bisa profit. Dan gak cuma ngajarin doang, tapi juga kasih insight tentang lifestyle-nya gimana. Now I'm living in Istanbul, working with clients from Indonesia, dan hidup gue so much better. Literally living the dream!",
  },
  {
    id: 10,
    name: 'Kadafi Devayana',
    handle: '@kadafidevayana',
    avatar: '/img/testi/avatar-kadafi.webp',
    image: '/img/testi/profileig-kadafi.webp',
    text: "Sebagai seseorang yang udah berkecimpung di dunia personal branding cukup lama, aku bisa bilang Sekolah WFA punya kurikulum yang terstruktur. Mereka ngerti betul ekosistem digital yang sebenarnya. Bukan janji-janji muluk yang ngga masuk akal. Approach-nya strategic, actionable, dan yang paling penting, proven! Aku personally recommend untuk profesional yang ingin serius di bidang digital.",
  },
  {
    id: 11,
    name: 'Mia Aulia',
    handle: '@miaauliaa.p',
    avatar: '/img/testi/avatar-mia.webp',
    image: '/img/testi/profileig-mia.webp',
    text: "Komunitasnya aktif banget. Gak cuma belajar materinya doang, tapi juga bisa networking sama temen-temen se-visi dari berbagai macam background berbeda-beda yang kerjanya WFA, jadi ngebuka peluang kolaborasi yang aku butuhin banget selama ini.",
  },
  {
    id: 12,
    name: 'Amanda Mindiw',
    handle: '@amanddanf',
    avatar: '/img/testi/avatar-mindiw.webp',
    image: '/img/testi/profileig-mindiw.webp',
    text: "Okay so. Aku kan udah kerja di beberapa agency, handle brand-brand gede juga. Kirain udah expert lah ya. Tapi pas ikut Sekolah WFA, Aku nyadar masih banyak yang bisa di-improve. Mereka tuh ngasih framework yang bikin kerjaan aku jauh lebih efisien. Plus, sekarang aku udah gak perlu stuck di kantor. Bisa kerja dari coffee shop, dari rumah, bahkan dari luar kota. Best decision ever sih ini.",
  },
  {
    id: 13,
    name: 'Uci Afterhours',
    handle: '@digital.afterhours',
    avatar: '/img/testi/avatar-suci.webp',
    image: '/img/testi/profileig-suci.webp',
    text: "Hai semuanya! Jadi aku tuh passionate banget soal empower perempuan di bidang digital. Dan Sekolah WFA ini align banget sama misi aku. Yang bikin seneng, mereka tuh gak elitist. Bahasa yang dipakai juga gampang dipahami, cocok banget buat pemula. Aku udah ajak temen-temen di komunitas aku, dan mereka pada excited semua. Thankful banget nemu tempat belajar yang supportive kayak gini!",
  },
  {
    id: 14,
    name: 'Yetti Oktarina',
    handle: '@rinaprana',
    avatar: '/img/testi/avatar-yetti.webp',
    image: '/img/testi/profileig-yetti.webp',
    text: "Permisi ya, mau sharing dikit. Aku dari Lubuklinggau, kadang suka insecure juga sih karena jauh dari kota besar. Tapi sejak ikut Sekolah WFA, mindset aku berubah total. Ternyata lokasi tuh bukan penghalang. Materinya lengkap, bisa diakses kapan aja, dan mentor-mentornya baik-baik banget mau jawab pertanyaan. Sekarang aku udah berani ambil project dari klien luar daerah. Alhamdulillah banget deh pokoknya!",
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(2); 
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    // Jika sedang dipause (hover), jangan jalankan interval
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 10000);

    // Cleanup interval saat component unmount atau paused berubah
    return () => clearInterval(interval);
  }, [isPaused]);

  // Helper untuk mendapatkan jarak index (support infinite loop wrap-around)
  const getOffset = (index: number) => {
    const total = TESTIMONIALS.length;
    let offset = (index - activeIndex);
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <section className="relative w-full bg-white pt-10 pb-0 md:pb-32 overflow-hidden flex flex-col items-center min-h-[500px] md:min-h-[900px]">
      <div className="absolute left-1/2 top-[25%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[300px] md:h-[500px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute top-[20%] left-0 w-full h-[300px] md:h-[700px] pointer-events-none">
        <svg 
            viewBox="0 0 1440 700" 
            className="w-full h-full" 
            preserveAspectRatio="none"
        >
            {/* 1. Definisi Gradient */}
            <defs>
            <linearGradient id="valleyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                {/* Atas: #26D7C4 */}
                <stop offset="0%" stopColor="#26D7C4" /> 
                {/* Bawah: Putih (#ffffff) */}
                <stop offset="100%" stopColor="#ffffff" /> 
            </linearGradient>
            </defs>

            {/* 2. Terapkan Gradient ke Path */}
            {/* fill="url(#id)" menghubungkan path dengan gradient di atas */}
            {/* fillOpacity="0.5" mengatur transparansi menjadi 50% */}
            <path 
            d="M0,0 Q720,350 1440,0 L1440,700 L0,700 Z" 
            fill="url(#valleyGradient)" 
            fillOpacity="0.5" 
            />
        </svg>
        </div>

      {/* --- HEADER TEXT --- */}
      <div className="relative z-10 text-center px-4 mb-8 md:mb-2 mx-auto -mt-2 md:mt-8">
        <h2 className="text-xs md:text-lg lg:text-2xl px-10 md:px-0 font-semibold text-[#147167] leading-snug">
          Teman belajar di Sekolah WFA yang berhasil memulai & <br className="hidden md:block" />
          berpenghasilan dari mana aja dengan sistem yang telah mereka pelajari.
        </h2>
      </div>

      {/* --- SLIDER CONTAINER --- */}
      <div className="relative z-10 w-full h-[300px] md:h-[700px] flex items-center justify-center mt-4" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        
        {/* Nav Buttons */}
        <button onClick={handlePrev} className="absolute left-2 md:left-4 lg:left-20 z-50 p-2 md:p-3 bg-white rounded-full shadow-lg hover:scale-110 text-[#147167] transition-all top-[26.5%] md:top-1/2 -translate-y-1/2 border-2 border-[#26D7C4]">
            <ArrowLeft className="w-4 h-4 md:w-6 md:h-6 text-[#147167] stroke-[2.5] stroke-[#147167] group-hover:text-white group-hover:stroke-white transition-colors" />
        </button>
        <button onClick={handleNext} className="absolute right-2 md:right-4 lg:right-20 z-50 p-2 md:p-3 bg-white rounded-full shadow-lg hover:scale-110 text-[#147167] transition-all top-[26.5%] md:top-1/2 -translate-y-1/2 border-2 border-[#26D7C4]">
            <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-[#147167] stroke-[2.5] stroke-[#147167] group-hover:text-white group-hover:stroke-white transition-colors" />
        </button>

        {/* ITEMS */}
        {TESTIMONIALS.map((item, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;

          // --- KONFIGURASI POSISI BARU (Lengkungan Senyum) ---
          const spacing = 340; // Jarak horizontal antar item
          const baseY = 250; // Posisi Y paling rendah (untuk item tengah)

          // Kita gunakan string kalkulasi CSS untuk X agar centering sempurna
          // `calc(-50% + ...px)` memastikan anchor point tetap di tengah
          let x: string | number = `calc(-50% + ${offset * spacing}px)`; 
          let y = 0;
          let scale = 1;
          let zIndex = 0;
          let opacity = 1;

          if (isActive) {
            // CENTER (Paling Bawah)
            y = baseY; 
            scale = 1;
            zIndex = 50;
            opacity = 1;
          } else if (Math.abs(offset) === 1) {
            // POSISI 1 (Naik sedikit)
            y = baseY - 120; 
            scale = 0.95;
            zIndex = 40;
            opacity = 0.9;
          } else if (Math.abs(offset) === 2) {
            // POSISI 2 (Naik banyak / Paling atas)
            y = baseY - 200; 
            scale = 0.75;
            zIndex = 30;
            opacity = 0.7;
          } else {
            // Item yang tersembunyi (untuk smooth looping)
            x = `calc(-50% + ${offset > 0 ? 1500 : -1500}px)`;
            y = baseY - 300;
            scale = 0;
            opacity = 0;
          }

          // Responsive Adjustment (Mobile)
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          if (isMobile) {
             const mobileSpacing = 160;
             x = `calc(-50% + ${offset * mobileSpacing}px)`;
             if (Math.abs(offset) === 1) { y = baseY - 80; scale: 0.6; }
             if (Math.abs(offset) >= 2) { opacity = 0; pointerEvents: 'none' }
          }

          return (
            <motion.div
              key={item.id}
              animate={{ x, y, scale, zIndex, opacity }}
              transition={{ type: 'spring', stiffness: 180, damping: 25, mass: 1 }}
              className="absolute top-0 origin-center flex flex-col items-center justify-center cursor-pointer"
              onClick={() => {
                if (offset === -1) handlePrev();
                if (offset === 1) handleNext();
              }}
              style={{ left: '50%' }} 
            >
              
              {isActive ? (
                <div className="relative flex flex-col items-center -mt-96 md:-mt-60">            
                    <Image 
                        src={item.image} 
                        alt="Testimonial Image" 
                        width={500}
                        height={750}
                        className="scale-125 md:scale-100"
                        priority
                    />

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1, ease: "easeOut", delay: 0.1 }}
                        className="absolute -bottom-32 w-[350px] md:w-[600px] bg-white rounded-3xl px-2 md:px-6 pt-2 md:pt-3 pb-3 md:pb-5 shadow-[0_-3px_10px_0_rgba(0,0,0,0.15)] z-30 text-center border border-gray-50"
                    >
                        <h3 className="text-[#147167] text-xl md:text-2xl font-semibold mb-0.5 md:mb-2">
                          {item.name}
                        </h3>
                        <p className="text-[#147167] text-[10px] md:text-sm leading-relaxed font-normal">
                          {item.text}
                        </p>
                    </motion.div>
                </div>
              ) : (
                <div className="hidden relative group lg:flex flex-col justify-center items-center -mt-60 md:mt-0">
                   <div className={`relative w-16 h-16 md:w-28 md:h-28 rounded-full p-1 transition-transform duration-300 group-hover:scale-105`}>
                      <div className="w-full h-full rounded-full overflow-hidden relative">
                        <Image src={item.avatar} alt="user" fill className="object-cover shadow-md" />
                      </div>
                   </div>
                   
                   <div className="mt-1 px-4 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-xs md:text-sm font-semibold text-[#147167] whitespace-nowrap">
                       {item.name}
                   </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}