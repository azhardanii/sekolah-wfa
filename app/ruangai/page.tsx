"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RuangAIPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [overlayActive, setOverlayActive] = useState(true);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleInteraction = () => {
    // Begitu ada scroll/geser → overlay langsung non-aktif
    setOverlayActive(false);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    // Kalau berhenti scroll 600ms → overlay aktif lagi
    scrollTimeoutRef.current = setTimeout(() => {
      setOverlayActive(true);
    }, 100);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (overlayActive) {
      router.push("/ruangai/beasiswa");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-100 font-inter">
      <div
        className="relative flex-grow"
        onWheel={handleInteraction}
        onTouchMove={handleInteraction}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-30 rounded-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-b-emerald-500 border-gray-400"></div>
            <p className="ml-4 text-gray-700 text-lg">
              Sedang Masuk ke Ruang AI...
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
