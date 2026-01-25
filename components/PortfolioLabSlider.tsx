'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    desc: "Pelopor Tools Bikin Konten yang Tersistem & Terintegrasi AI",
    productImage: "/img/portolab/portoproduct-febbyanggun.webp", 
    userProfileImage: "/img/portolab/portoprofile-febby.webp",
    income: {
      label: "Lifetime Sales (IDR)",
      amount: "492,665,021"
    }
  },
  {
    id: 2,
    desc: "Tools yang Bantu Bangun Personal Branding Pertama di Indonesia",
    productImage: "/img/portolab/portoproduct-kadafi.webp",
    userProfileImage: "/img/portolab/portoprofile-kadafi.webp",
    income: {
      label: "Monthly Earnings",
      amount: "119,653,940"
    }
  },
  {
    id: 3,
    desc: "Tools Bikin Itinerary, Split Bill, & Planner yang Terintegrasi AI",
    productImage: "/img/portolab/portoproduct-dimas.webp",
    userProfileImage: "/img/portolab/portoprofile-dimas.webp",
    income: {
      label: "Daily Earnings",
      amount: "10,000,000"
    }
  },
  {
    id: 4,
    desc: "Tools All in One Belajar Excel Auto Update & Terintegrasi dengan AI",
    productImage: "/img/portolab/portoproduct-mia.webp",
    userProfileImage: "/img/portolab/portoprofile-mia.webp",
    income: {
      label: "Total Revenue",
      amount: "120,450,000"
    }
  },
  {
    id: 5,
    desc: "Tools All in One KOL Listing, Tracking, & Evaluating Terintegrasi AI",
    productImage: "/img/portolab/portoproduct-mindiw.webp",
    userProfileImage: "/img/portolab/portoprofile-mindiw.webp",
    income: {
      label: "Monthly Earnings",
      amount: "29,136,780"
    }
  },
  {
    id: 6,
    desc: "Tools Cerdas untuk Mengelola ADS yang Terintegrasi dengan AI",
    productImage: "/img/portolab/portoproduct-sophia.webp",
    userProfileImage: "/img/portolab/portoprofile-sophia.webp",
    income: {
      label: "Monthly Earnings",
      amount: "13,274,300"
    }
  },
  {
    id: 7,
    desc: "Tools AI Menemukan Program Studi & Roadmap Belajar (Personality Based)",
    productImage: "/img/portolab/portoproduct-sadewa.webp",
    userProfileImage: "/img/portolab/portoprofile-sadewa.webp",
    income: {
      label: "Monthly Earnings",
      amount: "22,104,000"
    }
  },
  {
    id: 8,
    desc: "Flipbook Interaktif Bayi Gembul - 100% Base on Real Experience Fanny Kondoh",
    productImage: "/img/portolab/portoproduct-fanny.webp",
    userProfileImage: "/img/portolab/portoprofile-fanny.webp",
    income: {
      label: "Daily Earnings",
      amount: "11,566,000"
    }
  },
  {
    id: 9,
    desc: "Tools AI + Tracker Berpenghasilan Berdasarkan Hobi yang Disukai",
    productImage: "/img/portolab/portoproduct-dewangga.webp",
    userProfileImage: "/img/portolab/portoprofile-dewangga.webp",
    income: {
      label: "Daily Earnings",
      amount: "6,445,500"
    }
  },
  {
    id: 10,
    desc: "Tools AI Untuk Para Freelancer Bisa Berpenghasilan Dari Rumah",
    productImage: "/img/portolab/portoproduct-shofina.webp",
    userProfileImage: "/img/portolab/portoprofile-shofina.webp",
    income: {
      label: "Total Revenue",
      amount: "101,590,000"
    }
  },
];

export default function PortfolioLabSlider() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length);
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

  const getOffset = (index: number) => {
    const total = PORTFOLIO_ITEMS.length;
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <section className="relative w-full py-20 overflow-hidden flex flex-col items-center bg-transparent">
      <div className="absolute right-[70%] top-1/2 -translate-y-1/2 w-screen h-[650px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-screen h-[650px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50" />

      {/* TITLE */}
      <h2 className="text-4xl lg:text-5xl font-semibold text-[#147167] mb-10 md:mb-16 text-center">
        Portofolio Project Sekolah WFA
      </h2>

      {/* --- SLIDER CONTAINER --- */}
      <div 
        className="relative w-full h-[550px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {PORTFOLIO_ITEMS.map((item, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;
          
          const spacing = 380; 
          const x = `${offset * spacing}px`;
          const y = isActive ? 0 : 25;
          
          const scale = isActive ? 1.1 : 0.8;
          const opacity = isActive ? 1 : 0.5;
          const zIndex = isActive ? 50 : 10 - Math.abs(offset);

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{ x, y, scale, opacity, zIndex }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="absolute flex flex-col items-center justify-center"
            >
              
              {/* === MAIN CARD === */}
              <div className="relative w-[320px] h-[350px] md:w-[350px] md:h-[420px]">
                
                {/* 1. PRODUCT CARD BACKGROUND & IMAGE */}
                <div className="w-full h-full rounded-[40px] bg-gradient-to-b from-[#26D7C4] to-[#FFFFFF] shadow-xl p-4 flex flex-col justify-center items-center relative z-10 overflow-hidden">
                    
                    {/* Product Image (Full height of card minus padding) */}
                    <div className="relative w-full h-3/4">
                        <Image 
                           src={item.productImage} 
                           alt="Portfolio Product" 
                           fill 
                           className="object-contain hover:scale-105 transition-transform duration-500"
                           priority={isActive}
                        />
                    </div>
                </div>

                {/* 2. DESCRIPTION CARD (BOTTOM PILL) */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full rounded-b-3xl bg-gradient-to-b from-[#26D7C4] to-[#147167] p-4 text-center shadow-lg z-20">
                    <p className="text-white text-sm md:text-base font-semibold leading-snug">
                        {item.desc}
                    </p>
                </div>

                {/* === FLOATING ELEMENTS (ACTIVE ONLY) === */}
                <AnimatePresence>
                  {isActive && (
                    <>
                      {item.userProfileImage && (
                        <motion.div 
                           initial={{ opacity: 0, scale: 0, y: 20, x: -20 }}
                           animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                           exit={{ opacity: 0, scale: 0 }}
                           transition={{ delay: 0.1, type: 'spring' }}
                           className="absolute -top-28 -right-14 md:-right-40 w-[280px] md:w-[300px] h-[200px] md:h-[230px] z-50"
                        >
                            <Image 
                                src={item.userProfileImage} 
                                alt="User Profile" 
                                fill 
                                className="object-contain"
                            />
                        </motion.div>
                      )}

                      {item.income && (
                        <motion.div
                           initial={{ opacity: 0, scale: 0, x: 20 }}
                           animate={{ opacity: 1, scale: 1.15, x: 0 }}
                           exit={{ opacity: 0, scale: 0 }}
                           transition={{ delay: 0.2, type: 'spring' }}
                           className="absolute bottom-14 md:bottom-9 -left-2 md:-left-12 bg-white/95 backdrop-blur-sm rounded-xl p-2 md:p-3 shadow-lg border-2 border-white z-50 flex items-center gap-3 pr-3 md:pr-5"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#147167]">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-semibold uppercase">{item.income.label}</p>
                                <p className="text-sm font-bold text-gray-800">IDR {item.income.amount}</p>
                            </div>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- NAVIGATION BUTTONS --- */}
      <div className="flex items-center gap-6 mt-0 md:mt-12 z-30">
        <button 
            onClick={handlePrev}
            className="group w-20 h-14 rounded-full bg-white border-2 border-[#26D7C4] flex items-center justify-center shadow-lg hover:bg-[#26D7C4] hover:border-[#147167] transition-all duration-300 active:scale-95"
        >
            <ArrowLeft className="w-7 h-7 text-[#147167] stroke-[2.5] stroke-[#147167] group-hover:text-white group-hover:stroke-white transition-colors" />
        </button>

        <button 
            onClick={handleNext}
            className="group w-20 h-14 rounded-full bg-white border-2 border-[#26D7C4] flex items-center justify-center shadow-lg hover:bg-[#26D7C4] hover:border-[#147167] transition-all duration-300 active:scale-95"
        >
            <ArrowRight className="w-7 h-7 text-[#147167] stroke-[2.5] stroke-[#147167] group-hover:text-white group-hover:stroke-white transition-colors" />
        </button>
      </div>

    </section>
  );
}