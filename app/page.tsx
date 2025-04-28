"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false); // Untuk fade-in
  const [isFadingOut, setIsFadingOut] = useState(false); // Untuk fade-out
  const router = useRouter();

  useEffect(() => {
    // Saat pertama render halaman ➔ fade-in
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      router.push("/ppdbwfa");
    }, 100); // Timing fade out sebelum navigate
  };

  return (
    <div className="bg-[radial-gradient(circle_at_0%_0%,_#ffffff_0%,_#ffffff_40%,_#ffffff_70%,_#34d0ce_100%)]">
      <div
        className={`relative min-h-screen flex flex-col items-center justify-center p-3 md:p-6 transition-opacity duration-500 ${
          isVisible && !isFadingOut ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Logo */}
        <div className="absolute top-10">
          <Image
            className="text-center"
            src="/logo-wfa.webp"
            alt="Kadev Academy Logo"
            width={125}
            height={38}
            priority
          />
        </div>

        {/* Content */}
        <div className="relative w-full max-w-xl mx-auto text-[#156357]">
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
        </div>

        {/* Footer */}
        <div className="absolute bottom-10 text-center text-[#156357] text-xs md:text-sm">
          <p>
            halo@sekolahwfa.com
            <br />© 2025 All Rights Reserved | Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
