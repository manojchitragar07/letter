import React from "react";

interface PolaroidFrameProps {
  imageSrc: string;
  caption?: string;
  rotation?: number;
  width?: number;
  className?: string;
}

export function PolaroidFrame({
  imageSrc,
  caption = "Cherished moment",
  rotation = -2,
  width = 170,
  className = "",
}: PolaroidFrameProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        transform: `rotate(${rotation}deg)`,
        boxShadow: "0 10px 20px -5px rgba(40, 30, 20, 0.25)",
      }}
      className={`bg-white p-2.5 pb-5 rounded shadow-md border border-stone-200 select-none ${className}`}
    >
      {/* Top Kraft Washi Tape holding photo */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#D9B78F]/90 rounded-sm transform rotate-1 border-t border-b border-[#B8966E] shadow-xs" />

      {/* Photo cutout */}
      <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden rounded-xs border border-black/10">
        <img
          src={imageSrc}
          alt={caption}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>

      {/* Handwritten Caption */}
      {caption && (
        <div className="mt-2 text-center">
          <p className="font-handwriting text-xs text-stone-700 font-semibold tracking-wide truncate px-1">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}
