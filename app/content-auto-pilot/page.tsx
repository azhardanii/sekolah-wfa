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
  <section className={`w-full px-4 py-10 ${className}`}>{children}</section>
);

export default function Home() {
  return (
    <main className="w-full relative overflow-hidden">
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm flex justify-center items-center text-center bg-white px-5 h-20 z-10 shadow-xl">
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
      </div>
      <Section className="text-center">
        <div className="relative w-full -mt-10 mx-auto">
          <Image
            src="https://raw.githubusercontent.com/sekolahwfa/img/refs/heads/main/cap-1.webp"
            alt="Preview Personal Branding Builder"
            width={600}
            height={200}
            className="mx-auto max-w-sm pr-1 -ml-5 md:ml-auto"
            loading="lazy"
          />
        </div>
      </Section>

      <Section className="text-center">
        <div className="relative w-full -mt-20 mx-auto">
          <Image
            src="https://raw.githubusercontent.com/sekolahwfa/img/refs/heads/main/cap-2.webp"
            alt="Preview Personal Branding Builder"
            width={600}
            height={200}
            className="mx-auto max-w-sm pr-1 -ml-5 md:ml-auto"
            loading="lazy"
          />
        </div>
      </Section>

      <Section className="text-center">
        <div className="relative w-full -mt-20 mx-auto">
          <Image
            src="https://raw.githubusercontent.com/sekolahwfa/img/refs/heads/main/cap-3.webp"
            alt="Preview Personal Branding Builder"
            width={600}
            height={200}
            className="mx-auto max-w-sm pr-1 -ml-5 md:ml-auto"
            loading="lazy"
          />
        </div>
      </Section>

      <Section className="text-center">
        <div className="relative w-full -mt-20 mx-auto">
          <Image
            src="https://raw.githubusercontent.com/sekolahwfa/img/refs/heads/main/cap-4.webp"
            alt="Preview Personal Branding Builder"
            width={600}
            height={200}
            className="mx-auto max-w-sm pr-1 -ml-5 md:ml-auto"
            loading="lazy"
          />
        </div>
      </Section>

      <Section className="text-center">
        <div className="relative w-full -mt-32 mb-10 mx-auto">
          <Image
            src="https://raw.githubusercontent.com/sekolahwfa/img/refs/heads/main/cap-5.webp"
            alt="Preview Personal Branding Builder"
            width={600}
            height={200}
            className="mx-auto max-w-sm pr-1 -ml-5 md:ml-auto"
            loading="lazy"
          />
        </div>
      </Section>
    </main>
  );
}