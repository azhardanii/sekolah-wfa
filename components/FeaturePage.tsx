'use client';

import { useEffect, useState } from "react";

type FeaturePageProps = {
  title: string;
  description: React.ReactNode;
  status?: string; // optional error message
};

export default function FeaturePage({ title, description, status = "" }: FeaturePageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="bg-[radial-gradient(circle_at_0%_0%,_#ffffff_0%,_#ffffff_40%,_#ffffff_80%,_#b91c1c_100%)] w-full flex justify-center">
      <div className={`relative min-h-screen flex flex-col items-center justify-center px-10 transition-opacity max-w-4xl text-center duration-1000 
        ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="-mt-32 md:-mt-16">
            {/* Status Section */}
            {status && (
            <div className="pb-1 md:pb-4 bg-gradient-to-r from-[#b91c1c] to-[#f87171] font-extrabold bg-clip-text text-transparent text-5xl md:text-7xl">
                {status}
            </div>
            )}

            <h1 className="text-2xl md:text-5xl font-extrabold bg-gradient-to-r from-[#f87171] to-[#b91c1c] bg-clip-text text-transparent pb-2 md:pb-4">
                {title}
            </h1>
            <p className="text-sm md:text-xl text-gray-700 max-w-2xl" suppressHydrationWarning>
                {description}
            </p>
        </div>
      </div>
    </main>
  );
}
