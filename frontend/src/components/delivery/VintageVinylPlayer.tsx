"use client";

import React, { useState } from "react";
import { AudioTrackId } from "@/types/letter";
import { soundEngine } from "@/lib/soundEngine";
import { Disc, Play, Pause, Volume2, VolumeX, Music2, ChevronRight } from "lucide-react";

interface VintageVinylPlayerProps {
  currentTrack: AudioTrackId;
  onTrackChange?: (track: AudioTrackId) => void;
}

const TRACK_NAMES: Record<AudioTrackId, { name: string; mood: string }> = {
  piano: { name: "Nocturne in C", mood: "Gentle Piano Arpeggio" },
  musicbox: { name: "Lullaby Keepsake", mood: "Vintage Music Box" },
  rain: { name: "Rain on Skylight", mood: "Soft Organic Rain" },
  acoustic: { name: "Autumn Hearth", mood: "Warm Acoustic Chords" },
  lofi: { name: "Midnight Solitude", mood: "Nostalgic Lo-Fi Mellow" },
  none: { name: "Silent Reverie", mood: "Quiet Stillness" },
};

export function VintageVinylPlayer({
  currentTrack,
  onTrackChange,
}: VintageVinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(currentTrack !== "none");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const trackInfo = TRACK_NAMES[currentTrack] || TRACK_NAMES.piano;

  const togglePlay = () => {
    if (isPlaying) {
      soundEngine.stopAtmosphere();
      setIsPlaying(false);
    } else {
      soundEngine.playAtmosphere(currentTrack === "none" ? "piano" : currentTrack);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  if (currentTrack === "none" && !isExpanded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <div className="bg-[#241D19]/90 text-[#F5EAD6] backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border border-[#4A3C32] flex items-center gap-3 transition-all">
        {/* Spinning Vinyl Disc */}
        <div
          onClick={togglePlay}
          className="relative w-11 h-11 rounded-full bg-stone-900 border-2 border-amber-600/60 shadow-inner flex items-center justify-center cursor-pointer group shrink-0"
        >
          {/* Vinyl Grooves */}
          <div
            className={`w-full h-full rounded-full flex items-center justify-center ${
              isPlaying && !isMuted ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "4s" }}
          >
            <div className="w-8 h-8 rounded-full border border-stone-700/80 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-burgundy border border-amber-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-200" />
              </div>
            </div>
          </div>

          {/* Center Play/Pause Overlay icon on hover */}
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-white" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            )}
          </div>
        </div>

        {/* Track Title and Waveform */}
        <div className="text-left pr-2 max-w-[160px] sm:max-w-[200px]">
          <div className="flex items-center gap-1 text-[10px] text-amber-300 font-serif tracking-wider uppercase">
            <Music2 className="w-3 h-3 text-amber-400" />
            <span>Soundtrack</span>
          </div>
          <div className="text-xs font-serif font-bold text-stone-100 truncate">
            {trackInfo.name}
          </div>
          <div className="text-[10px] text-stone-400 truncate">
            {trackInfo.mood}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 border-l border-stone-700/70 pl-2">
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
