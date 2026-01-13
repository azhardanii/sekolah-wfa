"use client";

import Image from "next/image";
import Link from "next/link";
import CommunitySlider from "@/components/CommunitySlider";
import CollaboratorSlider from "@/components/CollaboratorSlider";
import PortfolioLabSlider from "@/components/PortfolioLabSlider";
import TestimoniSection from "@/components/TestimoniSection";
import FacilitiesSlider from "@/components/FacilitiesSlider";
import FAQSection from "@/components/FaqSection";
import NavbarWFA from "@/components/NavbarWFA";

export default function HeroSection() {
  const COMMUNITY_IMAGES = Array.from({ length: 26 }, (_, i) => 
    `/img/community/Community Momment (${i + 1}).webp`
  );

  const COLLABORATOR_IDS = [ 'bhumi', 'kadev', 'jsj', 'schoters', 'dnalliance', 'englishcafe', 'instaperfect', 'journey', 'rumakerja', 'sweetlayers', 'switchkarir', 'undukan', 'excelab'];
  const COLLABORATOR_IMAGES = COLLABORATOR_IDS.map((name) => 
    `/img/collab/collaboratorwfa-${name}.webp`
  );

  return (
    <>
      <section className="relative min-h-screen w-full bg-gradient-to-b from-[#E0F7F4] to-[#fff] overflow-hidden text-[#0E4E48]">
        <div className="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-30" />
        <div className="absolute -left-52 top-20 w-[400px] h-[400px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-white opacity-30 rounded-full translate-x-1/3 -translate-y-[30%] pointer-events-none"></div>
        <div className="absolute -bottom-5 right-32 w-[450px] h-[450px] bg-gradient-to-b from-[#26D7C4] to-white opacity-15 rounded-full pointer-events-none"></div>

        <NavbarWFA />

        <div className="relative z-10 container mx-auto py-10 px-6 md:px-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
            <div className="w-full md:w-1/2 lg:w-7/12 max-w-3xl md:-mt-10">
              <h1 className="text-5xl md:text-7xl font-semibold mb-6 text-[#147167]">
                Sekolah WFA <br />
                <span className="md:text-[5.25rem] text-[#147167]">Pertama</span> <br />
                di Indonesia
              </h1>

              <h2 className="text-3xl md:text-[2.65rem] pt-1 font-semibold bg-gradient-to-r h-12 from-[#2AB3B0] to-[#147167] bg-clip-text text-transparent">
                Dari Gen Z untuk Negeri
              </h2>

              <p className="text-black font-medium text-lg mb-10 pl-0.5 max-w-xl">
                Ngajarin kamu Skill WFA & Product Digital tanpa batas usia.
              </p>

              <div className="flex flex-col items-start gap-8">
                <button className="block group relative pb-[3.25px] pt-[3.5px] pl-[3px] pr-[2.5px] rounded-full bg-gradient-to-t from-[#147167] to-[#2AB3B0] shadow-lg shadow-teal-700/20 active:scale-95 transition-transform duration-150 ease-in-out">
                  <Link
                    href="/ruang-kelas"
                    className="block italic w-full h-full px-5 py-2 rounded-full bg-gradient-to-r from-[#2AB3B0] to-[#147167] text-white font-semibold text-xl tracking-wide"
                  >
                    <span className="md:hidden">
                      Mulai Belajar, GRATIS!!
                    </span>
                    <span className="hidden md:inline">
                      Mulai Belajar Sekarang, GRATIS!!
                    </span>
                  </Link>
                </button>

                <div className="flex-col md:flex-row items-center gap-4 mt-4">
                  <div className="flex -space-x-3 mb-2">
                    {[
                      '/img/testi/avatar-dimas.webp',
                      '/img/testi/avatar-fanny.webp',
                      '/img/testi/avatar-kadafi.webp',
                      '/img/testi/avatar-mindiw.webp',
                    ].map((src, i) => (
                      <div
                        key={i} // Menggunakan index sebagai key
                        className="w-14 h-14 rounded-full border-2 border-white relative overflow-hidden"
                      >
                        <Image
                          src={src}
                          alt={`User ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold bg-gradient-to-l from-[#2AB3B0] to-[#147167] bg-clip-text text-transparent text-[1.75rem] md:text-5xl">
                      & 1.221.500+
                    </span>
                    <span className="text-sm md:text-base max-w-[10rem] leading-tight bg-gradient-to-l pt-0.5 h-11 from-[#2AB3B0] via-[#147167] to-[#147167] bg-clip-text text-transparent font-medium">
                      Pembelajar yang Telah Bergabung
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/2 flex justify-center md:justify-end relative">
              <div className="absolute inset-0 bg-[#26D7C4] opacity-20 blur-[80px] rounded-full transform scale-75 z-0" />
                <Image 
                  src="/img/lp/model-wfa.webp"
                  alt="Model Sekolah WFA"
                  width={800} 
                  height={900}
                  priority
                  className="relative z-10 w-full max-w-md md:max-w-full h-auto object-contain drop-shadow-xl"
                />
            </div>

          </div>
        </div>
        <div className="px-6 md:px-24">
          <Image 
            src="/img/lp/trust-wfa.webp"
            alt="Trust Sekolah WFA Desktop"
            width={2000} 
            height={1000}
            priority
            className="hidden md:block relative z-10 w-full h-auto object-contain"
          />
          <Image 
            src="/img/lp/mobile-trust-wfa.webp"
            alt="Trust Sekolah WFA Mobile"
            width={800}
            height={400}
            priority
            className="block md:hidden relative z-10 w-full h-auto object-contain"
          />
        </div>
      </section>

      <TestimoniSection />

      <FacilitiesSlider />

      <section className="w-full py-20 bg-white overflow-hidden">
          {/* Section Title */}
          <h2 className="text-2xl md:text-5xl font-semibold text-[#147167] text-center mb-7 md:mb-16">
            Profiling Facilitator
          </h2>
        <div className="container mx-auto px-4 flex justify-center">

          <div className="flex flex-col md:flex-row gap-10 md:gap-1">
            
            {/* === CARD 1: FEBBY ANGGUN (Text Left, Image Right) === */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-center">
              
              {/* Text Card */}
              <div className="relative w-full md:w-[550px] min-h-[400px] bg-gradient-to-b from-[#26D7C4] to-[#FFFFFF] rounded-[40px] p-5 md:p-12 md:pr-44 flex flex-col justify-between items-center md:items-end mt-[-60px] md:mt-0 z-0">
                <div>
                  <div className="flex flex-col items-center md:items-end gap-3 mb-2 mt-20 md:mt-0">
                    <h3 className="text-4xl font-semibold text-[#147167] mb-2">Febby Anggun</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#26D7C4]/75 border-[2.75px] border-[#147167] text-white text-[13px] font-semibold px-3 py-1 rounded-full tracking-wider">
                        WFA INITIATOR
                      </span>
                      
                      {/* Social Icons */}
                      <div className="flex items-center gap-1">
                        {/* Instagram */}
                        <Link href="https://www.instagram.com/febbyanggun.s/" target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-[34px] h-[34px] text-[#147167] hover:text-[#dc2743] transition"
                          >
                            <path
                              fill="currentColor"
                              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 186.6c-39.6 0-71.7-32.1-71.7-71.7s32.1-71.7 71.7-71.7 71.7 32.1 71.7 71.7-32.1 71.7-71.7 71.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.6s-57.9-34.5-93.6-36.2c-37-2.1-147.9-2.1-184.9 0-35.7 1.7-67.3 9.9-93.6 36.2s-34.5 57.9-36.2 93.6c-2.1 37-2.1 147.9 0 184.9 1.7 35.7 9.9 67.3 36.2 93.6s57.9 34.5 93.6 36.2c37 2.1 147.9 2.1 184.9 0 35.7-1.7 67.3-9.9 93.6-36.2s34.5-57.9 36.2-93.6c2.1-37 2.1-147.8 0-184.9zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"
                            />
                          </svg>
                        </Link>

                        {/* LinkedIn */}
                        <Link href="https://www.linkedin.com/in/febby-anggun-sari-a27645260/" target="_blank" className="hover:border-blue-600">
                          <div className="border-[3px] border-[#147167] group hover:border-blue-600 rounded-[8px] p-[3px] ml-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              className="w-[18px] h-[18px] text-[#147167] group-hover:text-blue-600 transition"
                              fill="currentColor"
                            >
                              <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341a53.73 53.73 0 1 1 53.73-53.73 53.73 53.73 0 0 1-53.73 53.73zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.6V448h-92.68V148.9h88.96v40.8h1.3c12.4-23.6 42.6-48.3 87.7-48.3 93.8 0 111.1 61.8 111.1 142.3V448z"/>
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#147167] text-sm text-justify leading-normal mb-6 font-medium">
                    Dulu aku cuma anak desa yang hampir nggak bisa lanjut SMA. Tapi siapa sangka, sekarang aku jadi inisiator Work From Anywhere, membantu ribuan orang mendapatkan penghasilan dari mana saja.
                    <span className="block h-2" aria-hidden="true" />
                    Aku tahu rasanya terbatas oleh keadaan. Tapi aku percaya bahwa di dunia digital punya peluang yang begitu luas — sayangnya, masih banyak yang belum menyadari hal ini.
                  </p>
                </div>

                {/* Button */}
                <button className="w-full md:w-fit mt-1 px-10 py-5 rounded-full bg-gradient-to-b from-[#26D7C4] to-[#147167] text-white font-semibold text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
                  Kenalan Lebih Dekat
                </button>
              </div>

              {/* Image (Overlapping Right) */}
              <div className="relative w-[180px] h-[280px] md:w-[320px] md:h-[450px] shrink-0 ml-0 md:-ml-44 mt-0 md:-mt-80 -mb-10 md:mb-0 z-10">
                <div className="relative w-full h-full overflow-hidden">
                  <Image 
                    src="/facilitatorwfa-febby.webp"
                    alt="Febby Anggun Sari"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

            </div>


            {/* === CARD 2: SYAUQI AZHAR (Image Left, Text Right) === */}
            <div className="flex flex-col md:flex-row items-center justify-center mt-72 ml-0 md:-ml-28">
              
              {/* Image (Overlapping Left) */}
              <div className="relative w-[180px] h-[380px] md:w-[320px] md:h-[450px] shrink-0 mr-0 md:-mr-[11.5rem] -mt-80 -mb-20 md:mb-0 z-10">
                <div className="relative w-full h-full overflow-hidden">
                  <Image 
                    src="/facilitatorwfa-syauqi.webp"
                    alt="Syauqi Azhar"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Text Card */}
              <div className="relative w-full md:w-[550px] min-h-[400px] bg-gradient-to-b from-[#26D7C4] to-[#FFFFFF] rounded-[40px] p-5 md:p-12 md:pl-44 flex flex-col justify-between items-center mt-[-60px] md:mt-0 z-0">
                <div>
                  <div className="flex flex-col items-center md:items-start gap-3 mt-[5.25rem] md:mb-2">
                    <h3 className="text-4xl font-semibold text-[#147167] mb-2">Syauqi Azhar</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                          {/* Instagram */}
                          <Link href="https://www.instagram.com/azhardanii/" target="_blank">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              className="w-[34px] h-[34px] text-[#147167] hover:text-[#dc2743] transition"
                            >
                              <path
                                fill="currentColor"
                                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 186.6c-39.6 0-71.7-32.1-71.7-71.7s32.1-71.7 71.7-71.7 71.7 32.1 71.7 71.7-32.1 71.7-71.7 71.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.6s-57.9-34.5-93.6-36.2c-37-2.1-147.9-2.1-184.9 0-35.7 1.7-67.3 9.9-93.6 36.2s-34.5 57.9-36.2 93.6c-2.1 37-2.1 147.9 0 184.9 1.7 35.7 9.9 67.3 36.2 93.6s57.9 34.5 93.6 36.2c37 2.1 147.9 2.1 184.9 0 35.7-1.7 67.3-9.9 93.6-36.2s34.5-57.9 36.2-93.6c2.1-37 2.1-147.8 0-184.9zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"
                              />
                            </svg>
                          </Link>
                          {/* LinkedIn */}
                          <Link href="https://www.linkedin.com/in/azhardanii/" target="_blank" className="hover:border-blue-600">
                            <div className="border-[3px] border-[#147167] group hover:border-blue-600 rounded-[8px] p-[3px] ml-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-[18px] h-[18px] text-[#147167] group-hover:text-blue-600 transition" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zm-46.44-341a53.73 53.73 0 1 1 53.73-53.73 53.73 53.73 0 0 1-53.73 53.73zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.6V448h-92.68V148.9h88.96v40.8h1.3c12.4-23.6 42.6-48.3 87.7-48.3 93.8 0 111.1 61.8 111.1 142.3V448z"/></svg></div>
                          </Link>
                      </div>

                      <span className="bg-[#26D7C4]/75 border-[2.75px] border-[#147167] text-white text-[13px] font-semibold px-3 py-1 rounded-full tracking-wider">
                        DIGIPRENEUR
                      </span>
                    </div>
                  </div>

                  <p className="text-[#147167] text-sm leading-normal mt-2 md:mt-0 mb-6 text-justify font-medium">
                    Memulai karir di bidang teknologi sejak 2017, bermula dari Fullstack Web Developer kemudian terus berkembang mempelajari SEO, UI/UX, Digital Marketing, Artificial Intelegent, Spreadsheet Formula, Automation, dsb. Hingga detik ini masih terus mempelajari hal-hal baru seiring dengan perkembangan teknologi di dunia 👨🏻‍💻
                  </p>
                </div>

                {/* Button */}
                <button className="w-full md:w-fit mt-1 px-10 py-5 rounded-full bg-gradient-to-b from-[#26D7C4] to-[#147167] text-white font-semibold text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
                  Kenalan Lebih Dekat
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      <PortfolioLabSlider />

      <section className="mb-12 mt-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 md:mb-16 text-[#147167]">
          Moment Bersama Komunitas
        </h2>
        <CommunitySlider images={COMMUNITY_IMAGES} />
      </section>
      
      <section className="relative mb-12 mt-28 w-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-[radial-gradient(circle,_#26D7C4_0%,_transparent_100%)] blur-[100px] rounded-full pointer-events-none opacity-50" />

        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-10 md:mb-16 text-[#147167]">
          Collaborator & Partnership Sekolah WFA
        </h2>
        <CollaboratorSlider images={COLLABORATOR_IMAGES} />
      </section>

      <FAQSection />
      
    <footer className="w-full pt-16 pb-10 md:pt-32 md:pb-20 bg-gradient-to-b from-white to-[#26D7C4]/60">
      <div className="container mx-auto px-4 pt-10 md:pt-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-12">
          
          {/* --- LEFT SECTION: LOGO & TAGLINE --- */}
          <div className="flex flex-col gap-4 max-w-sm items-center md:items-start">
            <div className="relative w-[180px] h-[60px]">
              <Image 
                src="/logo-wfa.webp" 
                alt="Sekolah WFA Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <h3 className="text-xl mt-1 ml-0 md:ml-6 font-semibold leading-relaxed text-[#147167]">
              Sekolah Digital Masa Kini <br />
              Belajar, Berkarya, dan Berpenghasilan dari Mana Saja.
            </h3>
          </div>

          {/* --- RIGHT SECTION: NAVIGATION LINKS --- */}
          <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20 text-left md:text-left">

            <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
              <h4 className="bg-gradient-to-r from-[#26D7C4] to-[#147167] bg-clip-text text-transparent font-bold text-xl">Fasilitas</h4>
              <nav className="flex flex-col gap-2">
                {['Ruang Kelas','Ruang BK', 'Rekreasi', 'Laboratorium'].map((item) => (
                  <Link key={item} href="#" className="text-[#147167]/80 hover:text-[#147167] font-medium transition-colors">
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
              <h4 className="bg-gradient-to-r from-[#26D7C4] to-[#147167] bg-clip-text text-transparent font-bold text-xl">Navigasi</h4>
              <nav className="flex flex-col gap-2">
                {['Profil', 'Alumni', 'Mading', 'Kantin'].map((item) => (
                  <Link key={item} href={`#${item.toLowerCase()}`} className="text-[#147167]/80 hover:text-[#147167] font-medium transition-colors">
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="col-span-2 md:col-span-1 flex flex-col gap-4 items-center md:items-start text-center md:text-left">
              <h4 className="bg-gradient-to-r from-[#26D7C4] to-[#147167] bg-clip-text text-transparent font-bold text-xl">Dukungan</h4>
              <nav className="flex flex-col gap-2">
                {['FAQ', 'Kontak', 'Syarat & Ketentuan', 'Kebijakan Privasi'].map((item) => (
                  <Link key={item} href="#" className="text-[#147167]/80 hover:text-[#147167] font-medium transition-colors">
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

          </div>
        </div>

        {/* --- BOTTOM SECTION: SOCIAL BUTTONS --- */}
        <div className="mt-16 flex flex-wrap gap-4 items-center justify-center md:justify-end mr-0 md:mr-2">
          {[
            { label: 'Instagram', href: '#' },
            { label: 'Youtube', href: '#' },
            { label: 'LinkedIn', href: '#' }
          ].map((social) => (
            <Link 
              key={social.label} 
              href={social.href}
              className="px-8 py-2 rounded-full border-2 border-[#147167] text-[#147167] font-bold hover:bg-[#147167] hover:text-white transition-all duration-300 shadow-sm"
            >
              {social.label}
            </Link>
          ))}
          <div className="hidden md:flex items-center text-[#147167] font-medium text-sm opacity-90">
            <span>&copy; {new Date().getFullYear()}</span>
            <div className="relative inline-block align-middle">
              <Image 
                src="/inlinelogo-sekolahwfa.svg" 
                alt="WFA Mark"
                width={100}
                height={24}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* 2. COPYRIGHT MOBILE (Hanya muncul di Mobile, Posisi Paling Bawah Tengah) */}
        <div className="md:hidden flex flex-col items-center justify-center mt-12 pt-8 border-t border-[#147167]/20 text-[#147167] font-medium text-xs opacity-90">
          <div className="flex items-center justify-center flex-wrap gap-1">
            <span className="-mr-1">&copy; {new Date().getFullYear()}</span>
            <div className="relative inline-block align-middle">
                <Image 
                  src="/inlinelogo-sekolahwfa.svg" 
                  alt="WFA Mark"
                  width={100}
                  height={24}
                  className="object-contain"
                />
            </div>
            <span className="-ml-1">– Semua Bisa Kerja Dari Mana Aja.</span>
          </div>
        </div>

      </div>
    </footer>
    </>
  );
}
