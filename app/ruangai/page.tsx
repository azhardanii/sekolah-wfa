"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RuangAIPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [overlayActive, setOverlayActive] = useState(true);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleInteraction = () => {
      setOverlayActive(false);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        setOverlayActive(true);
      }, 500);
    };

    // Tambahin listener global
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("wheel", handleInteraction, { passive: true });
    window.addEventListener("touchmove", handleInteraction, { passive: true });

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (overlayActive) {
      router.push("/ruangai/beasiswa");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-100 font-inter">
      <div className="relative flex-grow">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-30 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-b-emerald-500 border-gray-400"></div>
            <p className="ml-4 text-gray-700 text-lg">
              Mengakses Ruang AI...
            </p>
          </div>
        )}

        <iframe
          id="ruang-ai-iframe"
          src="https://www.ruangai.id/?ref=3EC5EC"
          title="Sekolah WFA x Ruang AI Codepolitan"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock"
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
        />

        <div
          onClick={handleOverlayClick}
          className={`absolute inset-0 z-20 transition-opacity duration-500`}
          aria-label="Navigasi ke halaman beasiswa"
          style={{
            pointerEvents: overlayActive ? "auto" : "none",
            opacity: overlayActive ? 1 : 0,
            background: "transparent",
            touchAction: "none",
          }}
        />
      </div>
    </div>
  );
}
