import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import LazyYoutube from "@/components/LazyYoutube";

const Section = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <section className={`w-full py-10 ${className} text-center`}>{children}</section>
);

export default function Home() {
  return (
    <main className="w-full relative overflow-hidden">
      {/* <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm flex justify-center items-center text-center bg-white px-5 h-20 z-10 shadow-xl">
        <Link href={'https://lynk.id/febbyanggun/lx1mjy6y77k7/checkout'} className="bg-[#B62A2B] w-full p-2 rounded-md shadow-md text-white font-extrabold text-lg flex gap-2 items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
            </svg>
          {'>> Kuota Diskon Sisa: 1 <<'}
        </Link>
      </div> */}
      <Section>
        <div className="relative w-full mx-auto hidden md:block">
          <Image
            src="/content-pilot/cap-hook.webp"
            alt="User Content Auto Pilot"
            width={600}
            height={200}
            className="mx-auto max-w-xl ml-auto"
            priority
          />
        </div>
        <div className="relative w-full mx-auto block mt-10 md:hidden">
          <Image
            src="/content-pilot/cap-hook-mobver.webp"
            alt="User Content Auto Pilot"
            width={300}
            height={200}
            className="mx-auto max-w-sm pr-1 scale-110"
            priority
          />
        </div>
      </Section>

      {/* <Section className="text-center">
        <div className="relative w-full -mt-10 mx-auto max-w-sm px-3">
          <p className="bg-gradient-to-r from-[#3AA8A2] to-[#276E68] bg-clip-text text-transparent font-bold text-2xl">Dapatkan Akses Seumur Hidup ke Sistem Konten AI ini Hanya dengan Investasi Sekali!!</p>
          <p className="mt-3 bg-gradient-to-r from-[#a83a3a] to-[#6e2727] bg-clip-text text-transparent font-extrabold text-3xl line-through">Rp. 800.000</p>
          <p className="mt-3 bg-gradient-to-r from-[#276E68] to-[#3AA8A2] bg-clip-text text-transparent font-bold text-5xl">Rp.127.000</p>
        </div>
      </Section> */}

      <Section>
      <div className="flex justify-center w-full h-auto pt-20 pb-28 md:pt-20 md:pb-36 items-center bg-[linear-gradient(to_top,#28afae,#ffffff)]">
        <div className="max-w-xl -mt-[10%] md:-mt-5 mr-0">
          <Image
            src="/content-pilot/cap-reveal.webp"
            alt="Tools Conten Auto Pilot"
            width={550}
            height={1000}
            className="w-full scale-125 md:scale-125 h-auto md:max-w-lg lg:max-w-full"
            priority
          />
        </div>
      </div>
      </Section>

      <Section>
        <div className="relative w-full -mt-5 mx-auto block md:hidden">
          <Image
            src="/content-pilot/cap-intro.webp"
            alt="Memperkenalkan Content Auto Pilot"
            width={300}
            height={200}
            className="mx-auto max-w-sm md:max-w-xl pr-1 md:pr-0 scale-110"
            loading="lazy"
          />
        </div>
        <div className="relative w-full -mt-5 mx-auto hidden md:block">
          <Image
            src="/content-pilot/cap-intro.webp"
            alt="Memperkenalkan Content Auto Pilot"
            width={600}
            height={200}
            className="mx-auto max-w-xl"
            loading="lazy"
          />
        </div>
      </Section>

      <div className="w-full py-10 md:py-20 text-center">
        <div className="max-w-xs md:max-w-sm mx-auto">
          <hr className="border-0 h-[3px] md:h-1 bg-gradient-to-r from-white/0 via-[#28afae] via-50% to-white/0" />
        </div>
      </div>

      <Section>
        <div className="max-w-xl mx-auto text-center -mt-8 md:-mt-5">
          <h2 className="text-sm md:text-[1.4rem] text-black mb-6 tracking-wider">
            TOOLS INI ADALAH <span className="font-extrabold text-[#ff0000]">RAHASIA PARA KONTEN KREATOR, BISNIS OWNER & DIGITAL SELLER <span className="italic">!!</span></span>
          </h2>
          <div className="aspect-video w-full max-w-xl mx-auto mb-7 px-3 md:px-0">
            <LazyYoutube
              videoId="yoPexVLXDBo"
              title="Video Clip Personal Branding Builder"
              ratio="16:9"
              thumbnailUrl="/content-pilot/cap-preview-thumb.webp"
            />
          </div>
          <div className="ml-1 md:ml-2 px-3 md:px-0 -mt-4 md:mt-0">
            <Image
              src="/content-pilot/cap-exclusive.webp"
              alt="Access Exclusive Content Auto Pilot"
              width={500}
              height={200}
              className="mx-auto"
              loading="lazy"
            />
          </div>
          <div className="-ml-10 mt-5 px-3 md:px-0 hidden md:block">
            <Image
              src="/content-pilot/cap-access.webp"
              alt="Access Button Content Auto Pilot"
              width={400}
              height={200}
              className="mx-auto hover:scale-110 cursor-pointer transition-all"
              loading="lazy"
            />
          </div>
          <div className="-ml-7 mt-3 px-3 md:px-0 block md:hidden">
            <Image
              src="/content-pilot/cap-access.webp"
              alt="Access Button Content Auto Pilot"
              width={250}
              height={200}
              className="mx-auto hover:scale-110 cursor-pointer transition-all"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="relative w-full -mt-20 mx-auto block md:hidden">
          <Image
            src="/content-pilot/cap-createfor.webp"
            alt="Memperkenalkan Content Auto Pilot"
            width={300}
            height={200}
            className="mx-auto max-w-sm md:max-w-xl pr-1 md:pr-0 scale-110"
            loading="lazy"
          />
        </div>
        <div className="relative w-full -mt-10 mx-auto hidden md:block">
          <Image
            src="/content-pilot/cap-createfor.webp"
            alt="Memperkenalkan Content Auto Pilot"
            width={600}
            height={200}
            className="mx-auto max-w-xl"
            loading="lazy"
          />
        </div>
      </Section>

      <Section>
        <div className="relative w-full -mt-5 mx-auto block md:hidden">
          <Image
            src="/content-pilot/cap-feature.webp"
            alt="Memperkenalkan Content Auto Pilot"
            width={300}
            height={200}
            className="mx-auto max-w-sm md:max-w-xl pr-1 md:pr-0 scale-110"
            loading="lazy"
          />
        </div>
        <div className="relative w-full -mt-10 mx-auto hidden md:block">
          <Image
            src="/content-pilot/cap-feature.webp"
            alt="Memperkenalkan Content Auto Pilot"
            width={600}
            height={200}
            className="mx-auto max-w-xl"
            loading="lazy"
          />
        </div>
      </Section>

      <Section>
        <div className="max-w-xl mx-auto -mt-5">
          <div className="ml-1 md:ml-2 px-3 md:px-0 -mt-4 md:mt-0">
            <Image
              src="/content-pilot/cap-lifetime.webp"
              alt="Access Exclusive Content Auto Pilot"
              width={500}
              height={200}
              className="mx-auto"
              loading="lazy"
            />
          </div>
          <div className="-ml-10 mt-10 px-3 md:px-0 hidden md:block">
            <Image
              src="/content-pilot/cap-access.webp"
              alt="Access Button Content Auto Pilot"
              width={400}
              height={200}
              className="mx-auto hover:scale-110 cursor-pointer transition-all"
              loading="lazy"
            />
          </div>
          <div className="-ml-7 mt-7 md:mt-3 px-3 md:px-0 block md:hidden">
            <Image
              src="/content-pilot/cap-access.webp"
              alt="Access Button Content Auto Pilot"
              width={250}
              height={200}
              className="mx-auto hover:scale-110 cursor-pointer transition-all"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="relative w-full -mt-20 mx-auto block md:hidden">
          <Image
            src="/content-pilot/cap-faq.webp"
            alt="Memperkenalkan Content Auto Pilot"
            width={300}
            height={200}
            className="mx-auto max-w-sm md:max-w-xl pr-1 md:pr-0 scale-110"
            loading="lazy"
          />
        </div>
        <div className="relative w-full -mt-10 mx-auto hidden md:block">
          <Image
            src="/content-pilot/cap-faq.webp"
            alt="Memperkenalkan Content Auto Pilot"
            width={600}
            height={200}
            className="mx-auto max-w-xl"
            loading="lazy"
          />
        </div>
      </Section>

      <div className="w-full text-black text-center py-6 px-4">
        <div className="text-xs mx-auto max-w-sm flex justify-center items-end">
          <p>Copyright &copy; {new Date().getFullYear()}</p>
          <Image
            src="/logo-wfa.webp"
            alt="KADEV Academy"
            width={50}
            height={20}
            className="ml-1.5 mr-1 pb-0.5"
            loading="lazy"
          />
          <p>All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}