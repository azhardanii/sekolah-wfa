"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RuangAIPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
        {/* 🔘 Button langsung push ke /ruangai */}
        <button
          onClick={() => router.push("/ruangai")}
          className="fixed top-4 right-4 z-20 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-700 transition"
        >
          Kembali
        </button>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10 rounded-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-b-emerald-500 border-gray-400"></div>
            <p className="ml-4 text-gray-700 text-lg">Sedang Masuk ke Ruang AI...</p>
          </div>
        )}

        <iframe
          ref={iframeRef}
          id="ruang-ai-iframe"
          src="https://www.ruangai.id/registration?ref=38C5EC"
          title="Sekolah WFA x Ruang AI Codepolitan"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock"
          className={`w-full h-full border-0 transition-opacity duration-500 rounded-lg shadow-xl ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
