"use client"; // Wajib karena menggunakan Hooks (useState, useEffect)

import React, { useState, useEffect, useRef } from "react";

// --- 1. Reusable Hook & Component untuk Animasi Angka ---
const AnimatedNumber = ({
  start,
  end,
  duration = 5000,
  prefix = "",
  suffix = "",
}: {
  start: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false); // Agar animasi hanya jalan 1x

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          startAnimation();
          hasAnimated.current = true;
        }
      },
      { threshold: 0.5 } // Animasi mulai saat 50% elemen terlihat
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (easeOutExpo) agar gerakan terlihat natural (cepat di awal, pelan di akhir)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      // Kalkulasi nilai saat ini
      const current = Math.floor(start + (end - start) * ease);
      setCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Format angka (misal: 47100 jadi 47,100)
  const formattedNumber = new Intl.NumberFormat("en-US").format(count);

  return (
    <span ref={ref}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};

// --- 2. Main Stats Section ---
export default function StatSection() {
  return (
    <section
      className="w-full py-12 mt-auto border-t border-white/5"
      style={{
        background:
          "linear-gradient(90deg, #000000 0%, #101010 50%, #000000 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
        
        {/* Stat 1: 0 sampai 47,100 */}
        <div className="flex flex-col items-center py-4 md:py-0">
          <span className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
            <AnimatedNumber start={0} end={47100} suffix="+" />
          </span>
          <span className="text-sm text-gray-400 font-medium">
            Teman Belajar yang Telah Bergabung
          </span>
        </div>

        {/* Stat 2: 0 sampai 1,000 */}
        <div className="flex flex-col items-center py-4 md:py-0">
          <span className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
            <AnimatedNumber start={0} end={1000} suffix="+" />
          </span>
          <span className="text-sm text-gray-400 font-medium">
            Hit sales <span className="italic">Digital Product</span> tiap bulan
          </span>
        </div>

        {/* Stat 3: 99 sampai 1 (Countdown) */}
        <div className="flex flex-col items-center py-4 md:py-0">
          <span className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
            <AnimatedNumber start={99} end={1} prefix="Top " suffix="%" duration={2500} />
          </span>
          <span className="text-sm text-gray-400 font-medium">
            Earner di Lynk.id
          </span>
        </div>

      </div>
    </section>
  );
}