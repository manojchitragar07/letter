import React from "react";
import { WaxSealColor, WaxSealDesign } from "@/types/letter";

interface WaxSealProps {
  design?: WaxSealDesign;
  color?: WaxSealColor;
  size?: number;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const COLOR_MAP: Record<WaxSealColor, { bg: string; border: string; highlight: string; shadow: string; fill: string }> = {
  burgundy: {
    bg: "radial-gradient(circle at 35% 35%, #8B263E 0%, #631728 65%, #3D0B16 100%)",
    border: "#4E101E",
    highlight: "#A73750",
    shadow: "rgba(35, 6, 12, 0.6)",
    fill: "#E89EAE",
  },
  red: {
    bg: "radial-gradient(circle at 35% 35%, #C22D3E 0%, #9B1B2B 65%, #680E1A 100%)",
    border: "#7D1321",
    highlight: "#D94B5C",
    shadow: "rgba(50, 7, 13, 0.6)",
    fill: "#FFB8C2",
  },
  gold: {
    bg: "radial-gradient(circle at 35% 35%, #E5BE65 0%, #C49838 65%, #7D5B15 100%)",
    border: "#6E4F10",
    highlight: "#F9DA8B",
    shadow: "rgba(60, 42, 7, 0.5)",
    fill: "#FFF0C2",
  },
  forest: {
    bg: "radial-gradient(circle at 35% 35%, #3A6B52 0%, #244C38 65%, #132D20 100%)",
    border: "#183929",
    highlight: "#4F8569",
    shadow: "rgba(10, 25, 18, 0.6)",
    fill: "#A7D9BF",
  },
  navy: {
    bg: "radial-gradient(circle at 35% 35%, #2B466B 0%, #1A2D48 65%, #0D1726 100%)",
    border: "#132338",
    highlight: "#3D6091",
    shadow: "rgba(8, 15, 25, 0.6)",
    fill: "#ADC8ED",
  },
  blush: {
    bg: "radial-gradient(circle at 35% 35%, #D48C95 0%, #B86B75 65%, #783F46 100%)",
    border: "#8C4D55",
    highlight: "#E6A8B0",
    shadow: "rgba(55, 25, 29, 0.5)",
    fill: "#FFE4E7",
  },
};

export function WaxSeal({
  design = "fleur",
  color = "burgundy",
  size = 72,
  className = "",
  onClick,
  interactive = false,
}: WaxSealProps) {
  const theme = COLOR_MAP[color] || COLOR_MAP.burgundy;

  const renderIcon = () => {
    switch (design) {
      case "fleur":
        return (
          <path
            d="M32 16 C33 22 35 24 38 27 C42 22 47 22 48 27 C49 32 43 35 37 36 C39 40 40 46 39 50 C37 50 35 45 35 40 C34 40 33 40 32 40 C31 40 30 40 29 40 C29 45 27 50 25 50 C24 46 25 40 27 36 C21 35 15 32 16 27 C17 22 22 22 26 27 C29 24 31 22 32 16 Z M20 37 H44 V39 H20 Z"
            fill={theme.fill}
            opacity="0.85"
            style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" }}
          />
        );
      case "heart":
        return (
          <path
            d="M32 48 C20 38 14 28 18 20 C22 14 30 15 32 22 C34 15 42 14 46 20 C50 28 44 38 32 48 Z"
            fill={theme.fill}
            opacity="0.85"
            style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" }}
          />
        );
      case "monogram":
        return (
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fill={theme.fill}
            fontSize="30"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontWeight="bold"
            opacity="0.88"
            style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" }}
          >
            D
          </text>
        );
      case "tree":
        return (
          <g style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" }}>
            <path
              d="M32 50 V34 M30 38 L24 32 M34 38 L40 32 M32 30 V22"
              stroke={theme.fill}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="32" cy="22" r="7" fill={theme.fill} opacity="0.8" />
            <circle cx="23" cy="28" r="6" fill={theme.fill} opacity="0.8" />
            <circle cx="41" cy="28" r="6" fill={theme.fill} opacity="0.8" />
          </g>
        );
      case "moon":
        return (
          <g style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" }}>
            <path
              d="M34 18 C24 18 18 26 18 34 C18 42 24 50 34 50 C28 46 26 38 28 32 C30 26 34 22 34 18 Z"
              fill={theme.fill}
              opacity="0.9"
            />
            <circle cx="42" cy="28" r="2.5" fill={theme.fill} opacity="0.85" />
            <circle cx="40" cy="38" r="1.8" fill={theme.fill} opacity="0.85" />
          </g>
        );
      case "rose":
      default:
        return (
          <g style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" }}>
            <circle cx="32" cy="32" r="11" fill={theme.fill} opacity="0.4" />
            <circle cx="30" cy="30" r="7" fill={theme.fill} opacity="0.7" />
            <circle cx="33" cy="31" r="4" fill={theme.fill} opacity="0.9" />
            <path
              d="M26 42 Q 32 44 38 42"
              stroke={theme.fill}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        background: theme.bg,
        boxShadow: `0 8px 18px ${theme.shadow}, inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -3px 5px rgba(0,0,0,0.4)`,
      }}
      className={`relative rounded-full flex items-center justify-center select-none ${
        interactive ? "cursor-pointer transform transition-transform hover:scale-105 active:scale-95" : ""
      } ${className}`}
    >
      {/* Organic wax ripples / rim */}
      <div
        className="absolute inset-[3px] rounded-full border border-white/20 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 8px rgba(0,0,0,0.4)`,
        }}
      />
      <div
        className="absolute inset-[7px] rounded-full border border-black/20 pointer-events-none"
      />

      {/* Wax seal emblem */}
      <svg
        viewBox="0 0 64 64"
        style={{ width: size * 0.72, height: size * 0.72 }}
        className="relative z-10"
      >
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke={theme.fill}
          strokeWidth="1.2"
          strokeDasharray="2 3"
          opacity="0.6"
          fill="none"
        />
        {renderIcon()}
      </svg>
    </div>
  );
}
