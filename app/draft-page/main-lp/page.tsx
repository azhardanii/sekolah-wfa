import StatSection from '@/components/StatSection';
import RelatedSection from '@/components/RelatedSection';
import PortoLabSection from '@/components/PortoLabSection';
import FaqSection from '@/components/FaqSection';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <section className="min-h-screen bg-black relative flex flex-col overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 opacity-80">
          <Image
            src="/img/lp/anywhere-hero.webp"
            alt="Sekolah WFA Building Photo"
            fill
            className="object-cover object-bottom" 
            priority
          />
        </div>

        <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-center px-6 pb-10 w-full max-w-5xl mx-auto">        
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight mb-2 text-white">
            Sekolah Digital Terlengkap
          </h1>
          
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight pb-2 bg-clip-text text-transparent bg-gradient-to-b from-[#32c8c7] via-[#32c8c7] to-[#237674]">
            Dari Gen-Z untuk Negeri.
          </h2>

          <p className="mt-10 text-white/80 text-lg md:text-3xl font-light max-w-3xl drop-shadow-md">
            Platform Pembelajaran <span className="italic text-white">Work From Anywhere</span>,
            <br />
            Belajar, Berkarya, & Berpenghasilan <span className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#32c8c7] to-[#237674]">Dari Mana Aja.</span>
          </p>

          <p className="mt-16 text-white/80 text-sm md:text-lg max-w-4xl leading-relaxed">
            Ini adalah <span className="font-bold text-white">akhir dari rutinitas yang monoton!</span>
            <br />
            <span className="italic font-bold text-white">Mulai upgrade skill</span> kamu dengan panduan belajar WFA yang <span className="font-bold text-white/90">jelas dan lengkap.</span>
            <br />
            <span className="underline text-white underline-offset-4 decoration-[#32c8c7]/50">Didesain untuk pemula yang mulai dari nol</span> dan juga untuk kamu yang sudah berpengalaman.
          </p>

          {/* BUTTON ACTION */}
          <div className="mt-16 flex flex-col md:flex-row gap-5 w-full md:w-auto items-center">
            <button className="relative group pt-[2.25px] pr-[2.5px] pl-[2.5px] pb-[2.5px] rounded-full bg-gradient-to-l from-[#32c8c7] to-[#1a5f5d] hover:to-[#32c8c7] transition-all duration-300">
              <div className="px-12 py-3 rounded-full bg-black group-hover:bg-black/80 transition-all duration-300 h-full w-full flex items-center justify-center">
                  <span className="text-white font-medium tracking-wide">Lihat Program Sekolah WFA</span>
              </div>
            </button>

            <button className="relative px-20 py-3 rounded-full bg-gradient-to-r from-[#189090] to-[#023d3c] text-white font-semibold shadow-[0_0_20px_rgba(50,200,199,0.3)] hover:shadow-[0_0_35px_rgba(50,200,199,0.6)] hover:scale-105 transition-all duration-300">
              Mulai Belajar Sekarang
            </button>
          </div>
        </div>
      </section>

      <section className="z-10 w-full pb-10">
          <StatSection />
      </section>

      <section className="relative w-full py-20">
        <div className="absolute -right-[10%] bottom-1/4 w-[400px] h-[400px] bg-[#32c8c7]/80 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12 tracking-tight">
            Apakah Ini Yang Kamu Rasakan?
          </h2>

          <div className="relative w-full max-w-5xl">
            <Image
              src="/img/lp/problem-card.webp"
              alt="Daftar masalah: Stuck 9-to-5, Income Stagnant, dll"
              width={1200}
              height={600}
              className="relative w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

        </div>
      </section>

      <RelatedSection />

      <section className="relative w-full bg-black py-24">    
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-bold h-32 bg-clip-text text-transparent bg-gradient-to-r from-[#9f9f9f] via-[#cdcdcd] to-white leading-loose tracking-normal mb-8">
            Sekolah Digital yang beneran <br />
            ngerti perjalanan-mu
          </h2>             
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20 items-center">
            <div className="w-full lg:w-1/2">
              <div className="space-y-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9f9f9f] via-white to-white text-lg leading-relaxed">
                <p>
                  Bukan sekolah biasa yang cuma kasih materi gitu aja. 
                  Sekolah WFA adalah ekosistem pembelajaran yang bakal nemenin kamu 
                  dari nol sampai jadi digital professional dengan income impian.
                </p>
                <p>
                  Kami paham bahwa setiap orang punya kepribadian dan kekuatan unik. 
                  Oleh karena itu pembelajaran yang disampaikan akan menyesuaikan 
                  dengan personality kamu.
                </p>
              </div>
            </div>

            {/* Right Column: Feature List Box (Image) */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-auto">
                  <div className="absolute inset-0 bg-[#32c8c7]/20 blur-[60px] rounded-full pointer-events-none" />
                  <Image
                    src="/img/lp/feature-box.webp"
                    alt="Feature List: Personality Based, Proven System, Community Support"
                    width={600}
                    height={400}
                    className="relative z-10 w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
                  />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mx-auto mb-20">
            <Image
              src="/img/lp/wfa-card.webp"
              alt="Feature List: Personality Based, Proven System, Community Support"
              width={1000}
              height={500}
              className="relative z-10 w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* --- 3. CTA BUTTON --- */}
          <div className="flex justify-center">
              <button className="relative px-20 py-4 rounded-full bg-gradient-to-l from-[#1db9b9] to-[#04605f] text-white font-bold tracking-wider text-2xl shadow-[0_0_20px_rgba(50,200,199,0.5)] hover:shadow-[0_0_35px_rgba(50,200,199,0.6)] hover:scale-105 transition-all duration-300">
                JOIN SEKARANG
              </button>
          </div>

        </div>
      </section>

      <section className="mt-10">
          <PortoLabSection />
      </section>

      <section className='h-screen'></section>

      <section>
        <FaqSection />
      </section>

      <footer className="mt-10 w-full overflow-hidden flex justify-center">
        <div className="w-full max-w-6xl h-32 md:h-64 bg-gradient-to-b from-[#32c8c7] to-[#32c8c7]/10 rounded-t-full flex items-center justify-center relative px-4">
          <div className="relative w-48 h-12 md:w-[35rem] md:h-24 scale-150">
            <Image
              src="/img/lp/linelogo-wfa.svg"
              alt="Sekolah WFA Logo"
              fill
              className="object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </footer>
    </>
  );
}