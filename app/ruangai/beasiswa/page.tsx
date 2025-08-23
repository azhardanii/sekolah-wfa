"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RuangAIPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.onload = () => {
      iframe.contentWindow?.postMessage(
        { reference: "38C5EC" },
        "https://www.ruangai.id"
      );
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-100 font-inter">
      <div className="relative flex-grow">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10 rounded-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-b-emerald-500 border-gray-400"></div>
            <p className="ml-4 text-gray-700 text-lg">Sedang Masuk ke Ruang AI...</p>
          </div>
        )}

        <Link href="/ruangai" className="absolute top-0 left-0 w-full bg-emerald-500 text-white text-center p-1.5 font-semibold hover:bg-emerald-600 transition-colors z-50 cursor-pointer">
          ✨ Detail Info tentang RuangAI, <span className="underline font-bold tracking-wide">Klik di Sini!!</span> ✨
        </Link>
        <div className="absolute top-0 w-full h-[6.75rem] bg-[#C9E6F0]" />
        <div className="absolute top-12 w-full flex justify-center">
          <Image 
            src="/wfaxruangai.webp" 
            width={300} 
            height={150} 
            alt="Logo Sekolah WFA X RuangAI"
            priority
          />
        </div>

        <iframe
          ref={iframeRef}
          id="ruang-ai-iframe"
          src="https://www.ruangai.id/registration?ref=38C5EC"
          title="Sekolah WFA x Ruang AI Codepolitan"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock"
          className={`w-full h-full border-0 transition-opacity duration-500 rounded-lg shadow-xl scrollbar-hide ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
