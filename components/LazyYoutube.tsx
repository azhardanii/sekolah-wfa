"use client";

import { useState } from "react";
import Image from "next/image";

export default function LazyYoutube({
  videoId,
  title,
  ratio = "9:16",
  thumbnailUrl,
}: {
  videoId: string;
  title: string;
  ratio?: "16:9" | "9:16";
  thumbnailUrl?: string;
}) {
  const [isClicked, setIsClicked] = useState(false);

  const finalThumbnail =
    thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const aspectPadding = ratio === "16:9" ? "56.25%" : "177.77%";

  const handleThumbnailClick = () => {
    setIsClicked(true);
  };

  return (
    <div
      className="relative w-full h-0 overflow-hidden rounded-xl bg-black"
      style={{ paddingBottom: aspectPadding }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* IFRAME PLAYER */}
      {isClicked && (
        <div className="absolute inset-0 z-20">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&modestbranding=1&rel=0&showinfo=0&controls=1&fs=1&iv_load_policy=3`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            style={{
              border: "none",
            }}
          />
          
          {/* CSS overlay to prevent right-click but allow video controls */}
          <style jsx>{`
            iframe {
              pointer-events: auto;
            }
            
            /* Prevent text selection */
            * {
              user-select: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
            }
          `}</style>
        </div>
      )}

      {/* THUMBNAIL */}
      {!isClicked && (
        <div
          onClick={handleThumbnailClick}
          className="absolute inset-0 cursor-pointer z-10 group"
        >
          <Image
            src={finalThumbnail}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-[#147167] rounded-2xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}