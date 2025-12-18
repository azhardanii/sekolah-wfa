'use client';

import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const THEPROBLEMS = [
  {
    text: "Kerjaan gue repetitif banget, kayak robot. Masuk jam 8, meeting gak jelas, revisi, pulang jam 6. Gitu terus sampe mati? Gue punya mimpi traveling, tapi jatah cuti gue cuma 12 hari setahun. Is this really it?",
    name: "Siska (24)",
    role: "Staff HRD"
  },
  {
    text: "Gue udah tonton ratusan tutorial di YouTube soal WFA. Tapi pas praktek, bingung. Kena kendala dikit gak tau mau nanya ke siapa. Kesepian banget belajar sendiri. Gue butuh temen seperjuangan sefrekuesi biar gak gampang burnout.",
    name: "Eko Prasetyo (23)",
    role: "Fresh Graduate"
  },
  {
    text: "Gue sarjana Hukum, tapi ngerasa passion gue di kreatif/digital. Masalahnya, gue nol besar soal konten atau digital marketing. Mau switch carreer takut telat, mau stay di sini gue menderita. Harus mulai belajar apa dulu biar gak buang waktu?",
    name: "Kevin (24)",
    role: "Legal Staff"
  },
  {
    text: "Gaji UMR, tapi gaya hidup dan kebutuhan naik terus. Mau side hustle bingung mulai dari mana. Liat orang main crypto atau saham malah boncos. Gue butuh skill real yang bisa hasilin dollar, bukan cuma investasi bodong.",
    name: "Dinda (21)",
    role: "Customer Service"
  },
  {
    text: "Gue udah freelance 2 tahun, tapi rasanya kayak kuli digital. Klien nawar sadis, revisi tanpa batas. Bulan ini dapet gede, bulan depan nol besar. Gue pengen punya pricing power biar gak usah ngemis proyek di situs freelancer lagi.",
    name: "Rian (25)",
    role: "Freelance Design Graphic"
  },
  {
    text: "Jujur gue capek. Berangkat gelap, pulang gelap. Umur gue abis di Commuter Line sama macetnya Jakarta. Liat Story IG orang bisa kerja dimana aja, gue cuma bisa liat pantat truk di tol. Gue mau keluar, tapi cicilan siapa yang bayar?",
    name: "Bayu (22)",
    role: "Admin Logistik"
  },
  {
    text: "Tiap pagi harus ninggalin anak sama pengasuh demi bisa ngantor. Pas pulang, anak udah tidur. Gue ngerasa bersalah banget. Gue pengen kerja yang bisa hasilin duit setara gaji kantor, tapi tetep bisa liat tumbuh kembang anak di rumah.",
    name: "Tari (30)",
    role: "Teller Bank - Mama Muda"
  },
  {
    text: "Semua orang ngomongin WFA, Digital Nomad, Passive Income. Gue pengen ikutan, tapi takut kena tipu kelas abal-abal yang isinya cuma motivasi doang. Gue butuh blueprint yang teknis, bukan omong kosong 'ayo semangat'." ,
    name: "Aldi (27)",
    role: "Sales Manager"
  },
  {
    text: "Skill ngedit video ku jago kak. Tapi nyari klien luar negeri nol besar. Bahasa Inggris pas-pasan, gak ngerti cara pitching ke bule. Akibatnya cuma dapet klien lokal yang bayarnya, yaahh gitulahh... Capek nagihnya.",
    name: "Bagas (22)",
    role: "Video Editor"
  },  
  {
    text: "Gue liat ChatGPT sama AI image generator makin canggih. Jujur, gue takut kerjaan gue sebagai penulis bakal ilang 2-3 tahun lagi. Gue ngerasa obsolete. Gue butuh upgrade skill biar bisa make AI, bukan digantiin sama AI.",
    name: "Fanny (23)",
    role: "Copywriter Agensi"
  },        
];

export default function RelateSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const isPaused = useRef(false); 
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrameId: number;

    const animateScroll = () => {
      if (scrollContainer && !isPaused.current) {
        scrollContainer.scrollLeft += 0.5;

        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
           scrollContainer.scrollLeft = 0; 
        }
      }
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      isPaused.current = true;

      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);

      const scrollAmount = 350;
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }

      pauseTimeout.current = setTimeout(() => {
        isPaused.current = false;
      }, 3000);
    }
  };

  return (
    <section className="relative w-full py-20">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 items-center lg:items-start">
          
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 flex flex-col justify-center text-center lg:text-left z-20 px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2))]">
            <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-[#32c8c7]/40 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
            
            <h2 className="relative z-10 text-5xl md:text-7xl font-bold tracking-wide text-white leading-tight">
              KAMU <br />
              ENGGAK <br />
              <span className="text-white/80">SENDIRI...</span>
            </h2>

            <div className="hidden lg:flex gap-4 mt-8">
                <button 
                    onClick={() => handleManualScroll('left')}
                    className="p-3 rounded-full border border-white/20 text-white hover:bg-[#32c8c7] hover:border-[#32c8c7] hover:text-black transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={() => handleManualScroll('right')}
                    className="p-3 rounded-full border border-white/20 text-white hover:bg-[#32c8c7] hover:border-[#32c8c7] hover:text-black transition-all"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 relative z-10 pl-6 lg:pl-0">
             <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none lg:hidden" />

             <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 95%, transparent 100%)'
                }}
                onMouseEnter={() => (isPaused.current = true)}
                onMouseLeave={() => (isPaused.current = false)}
             >
              {THEPROBLEMS.map((item, index) => (
                <div 
                  key={index} 
                  className="min-w-[300px] sm:min-w-[350px] snap-center group relative pl-[1px] pb-[1px] pt-[1px] pr-[1px] rounded-2xl bg-gradient-to-br from-[#32c8c7]/50 to-transparent hover:to-[#32c8c7]/30 transition-all duration-300"
                >
                  <div className="h-full bg-black/90 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between border border-white/5 hover:bg-black/80 transition-all relative">
                    <p className="text-white/80 text-sm leading-relaxed pt-5 mb-6 italic">
                      <span className="text-[#1d8b84] text-7xl leading-none font-serif opacity-50 top-2 absolute">“</span> {item.text}
                    </p>
                   
                    <div className="border-t border-white/10 pt-4 mt-auto">
                      <p className="text-[#1d8b84] font-bold text-base">
                        {item.name}
                      </p>
                      <p className="text-white/50 text-xs">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}