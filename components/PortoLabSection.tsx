'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CLIENTS = [
  { id: 1, name: "Dimas", image: "/img/lp/lab-porto-dimas.webp" },
  { id: 2, name: "Mia", image: "/img/lp/lab-porto-mia.webp" },
  { id: 3, name: "Amanda", image: "/img/lp/lab-porto-amanda.webp" },
  { id: 4, name: "Febby", image: "/img/lp/lab-porto-febby.webp" },
  { id: 5, name: "Sophia", image: "/img/lp/lab-porto-sophia.webp" },
  { id: 6, name: "Kadafi", image: "/img/lp/lab-porto-kadafi.webp" },
];

export default function LabSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CLIENTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CLIENTS.length) % CLIENTS.length);
  };

  const getCardStyle = (index: number) => {
    const total = CLIENTS.length;
    
    let distance = (index - activeIndex + total) % total;
    if (distance > total / 2) distance -= total;

    if (distance === 0) {
      return "z-30 scale-125 opacity-100 translate-x-0 cursor-auto"; 
    }
    
    if (distance === 1) {
      return "z-20 scale-90 opacity-70 translate-x-[60%] lg:translate-x-[140%] blur-[1px] grayscale-[50%]";
    }
    
    if (distance === 2) {
      return "z-10 scale-75 opacity-40 translate-x-[120%] lg:translate-x-[260%] blur-[2px] grayscale-[80%]";
    }
    
    if (distance === -1) {
      return "z-20 scale-90 opacity-70 -translate-x-[60%] lg:-translate-x-[140%] blur-[1px] grayscale-[50%]";
    }
    
    if (distance === -2) {
      return "z-10 scale-75 opacity-40 -translate-x-[120%] lg:-translate-x-[260%] blur-[2px] grayscale-[80%]";
    }

    return "z-0 scale-0 opacity-0";
  };

  return (
    <section className="relative w-full py-24">
      
      <div className="container mx-auto px-6 text-center relative z-10">
        
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60 mb-1 tracking-wide uppercase">
          KESULITAN BIKIN PRODUK DIGITAL?
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#32c8c7] to-[#237674] mb-5 tracking-tight">
          LAB SEKOLAH WFA AKAN BANTU BUATIN!
        </h3>
        <p className="text-white/70 max-w-4xl mx-auto mb-20 text-sm md:text-lg font-light leading-relaxed">
          Bikin <span className='italic'>Digital Tools</span> sendiri itu melelahkan dan waktumu terlalu berharga hanya untuk membuatnya. Serahkan aja pada ahlinya. <span className='font-medium'>Tim Lab Sekolah WFA</span> <span className='italic'>stand by</span> merealisasikan idemu menjadi kenyataan dengan berbagai fitur yang diinginkan.
        </p>

        <div 
          className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="w-full flex justify-between relative z-40">
            <button onClick={handlePrev} className="flex items-center justify-center w-16 h-16 rounded-full bg-black border border-white/50 text-white hover:border-[#32c8c7] hover:text-[#32c8c7] hover:scale-110 transition-all duration-300">
                <ChevronLeft size={35} strokeWidth={3.5} className="-ml-[1.5px]" /> 
            </button>

            <button onClick={handleNext} className="flex items-center justify-center w-16 h-16 rounded-full bg-black border border-white/50 text-white hover:border-[#32c8c7] hover:text-[#32c8c7] hover:scale-110 transition-all duration-300">
                <ChevronRight size={35} strokeWidth={3.5} className="ml-[1.5px]" />
            </button>
          </div>

          {CLIENTS.map((client, index) => (
            <div
              key={client.id}
              className={`absolute transition-all duration-700 rounded-3xl ease-[cubic-bezier(0.25,0.8,0.25,1)] ${getCardStyle(index)}`}
            >
              <div className="relative w-[280px] md:w-[350px] h-auto group mt-10">    
                 {index === activeIndex && (
                    <div 
                        className="
                            absolute 
                            top-1/2 left-1/2 
                            -translate-x-1/2 -translate-y-1/2 
                            w-[120%] aspect-square 
                            bg-[#32c8c7]/60 
                            rounded-full 
                            blur-[100px] 
                            -z-10
                        " 
                    />
                 )}             
                 <Image
                    src={client.image}
                    alt={client.name}
                    width={1000}
                    height={1200}
                    className="w-full h-full object-cover"
                    priority={index === activeIndex}
                 />
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}