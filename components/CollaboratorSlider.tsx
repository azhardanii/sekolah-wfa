'use client';

import Image from 'next/image';

interface CollaboratorSliderProps {
  images: string[];
}

export default function CollaboratorSlider({ images = [] }: CollaboratorSliderProps) {
  if (!images || images.length === 0) {
    return null; 
  }

  const midIndex = Math.ceil(images.length / 2);
  const topRowImages = images.slice(0, midIndex);
  const bottomRowImages = images.slice(midIndex);

  return (
    <section className="w-full pb-16 bg-transparent overflow-hidden flex flex-col gap-8">
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
        // Tambahkan 'items-center' agar gambar rata tengah vertikal
        // Perbesar gap antar logo biar lebih lega (opsional, ubah gap-8 sesuai selera)
        className={`flex gap-4 w-max py-4 items-center ${
          direction === 'left' ? 'animate-scrollcollab-left' : 'animate-scrollcollab-right'
        } group-hover:paused`}
      >
        {displayImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative z-0 h-[120px] md:h-[180px] flex-shrink-0 transform-gpu"
          >
            <Image
              src={src}
              alt={`Collaborator ${index}`}
              width={0}
              height={0}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="w-auto h-full object-contain hover:scale-105 transition-transform duration-300 will-change-transform"
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