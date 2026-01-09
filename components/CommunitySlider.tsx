'use client';

import Image from 'next/image';

interface CommunitySliderProps {
  images: string[];
}

export default function CommunitySlider({ images = [] }: CommunitySliderProps) {
  if (!images || images.length === 0) {
    return null; 
  }

  const midIndex = Math.ceil(images.length / 2);
  const topRowImages = images.slice(0, midIndex);
  const bottomRowImages = images.slice(midIndex);

  return (
    <section className="w-full py-16 bg-[radial-gradient(circle_at_center,_#FEFEFE_0%,_#26d7c55a_32%,_#26d7c55a_46%,_#FEFEFE_92%)] overflow-hidden flex flex-col gap-6">
      <SliderRow images={topRowImages} direction="right" />
      {bottomRowImages.length > 0 && (
        <SliderRow images={bottomRowImages} direction="left" />
      )}
    </section>
  );
}

const SliderRow = ({ images, direction }: { images: string[], direction: 'left' | 'right' }) => {
  const displayImages = [...images, ...images, ...images, ...images]; 

  return (
    <div className="relative w-full flex overflow-hidden group">
      <div
        className={`flex gap-4 w-max py-4 ${
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
        } group-hover:paused`}
      >
        {displayImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative z-0 w-[280px] h-[180px] md:w-[500px] md:h-[320px] flex-shrink-0 rounded-[2rem] overflow-hidden shadow-[0px_4px_5px_0px_rgba(0,0,0,0.5)] transform-gpu"
          >
            <Image
              src={src}
              alt={`Community moment ${index}`}
              fill
              className="object-cover scale-105 hover:scale-110 transition-transform duration-500 will-change-transform"
              sizes="(max-width: 768px) 280px, 350px"
              onError={(e) => {
                 console.error("Gagal load gambar:", src);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};