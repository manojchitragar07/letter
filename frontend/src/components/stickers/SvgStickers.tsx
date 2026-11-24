import React from "react";

interface SvgStickerProps {
  id: string;
  className?: string;
}

export function SvgSticker({ id, className = "" }: SvgStickerProps) {
  switch (id) {
    case "svg:stamp-airmail":
      return (
        <svg
          viewBox="0 0 160 120"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Perforated stamp edge */}
          <rect
            x="4"
            y="4"
            width="152"
            height="112"
            fill="#F4EDE2"
            stroke="#C4B59F"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <rect
            x="10"
            y="10"
            width="140"
            height="100"
            fill="#FAF6EE"
            stroke="#8B2635"
            strokeWidth="1.5"
          />
          <rect
            x="14"
            y="14"
            width="132"
            height="92"
            stroke="#8B2635"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          {/* Airmail Banner */}
          <path
            d="M20 28 L140 28"
            stroke="#8B2635"
            strokeWidth="1.2"
          />
          <text
            x="80"
            y="25"
            textAnchor="middle"
            fill="#8B2635"
            fontSize="10"
            fontFamily="Georgia, serif"
            letterSpacing="2"
            fontWeight="bold"
          >
            PAR AVION • AIR MAIL
          </text>
          {/* Airplane Silhouette */}
          <path
            d="M80 45 L84 62 L105 68 L105 73 L84 71 L83 83 L91 87 L91 91 L80 89 L69 91 L69 87 L77 83 L76 71 L55 73 L55 68 L76 62 Z"
            fill="#8B2635"
            opacity="0.85"
          />
          {/* Denomination and City */}
          <text
            x="24"
            y="96"
            fill="#8B2635"
            fontSize="14"
            fontFamily="Georgia, serif"
            fontWeight="bold"
          >
            25¢
          </text>
          <text
            x="136"
            y="96"
            textAnchor="end"
            fill="#8B2635"
            fontSize="9"
            fontFamily="Georgia, serif"
            letterSpacing="1"
          >
            PARIS 1928
          </text>
          {/* Circular Postmark */}
          <circle
            cx="115"
            cy="40"
            r="20"
            stroke="#3B4252"
            strokeWidth="1"
            opacity="0.6"
            strokeDasharray="50 5"
          />
          <path
            d="M95 40 Q 115 35 135 40 M95 44 Q 115 39 135 44"
            stroke="#3B4252"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      );

    case "svg:stamp-fern":
      return (
        <svg
          viewBox="0 0 120 150"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="4"
            width="112"
            height="142"
            fill="#F3EFE6"
            stroke="#A3967F"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <rect
            x="9"
            y="9"
            width="102"
            height="132"
            fill="#FCFAF6"
            stroke="#2D5A43"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="24"
            textAnchor="middle"
            fill="#2D5A43"
            fontSize="9"
            fontFamily="Georgia, serif"
            letterSpacing="1.5"
          >
            BOTANICA
          </text>
          {/* Fern frond illustration */}
          <path
            d="M60 120 Q 58 80 62 40"
            stroke="#2D5A43"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M60 105 C 50 100 42 105 40 102 C 48 98 56 100 60 101"
            fill="#2D5A43"
          />
          <path
            d="M60 100 C 70 95 78 100 80 97 C 72 93 64 95 60 96"
            fill="#2D5A43"
          />
          <path
            d="M60 88 C 48 82 40 86 38 83 C 48 79 56 82 60 84"
            fill="#2D5A43"
          />
          <path
            d="M61 82 C 72 76 80 80 82 77 C 72 73 64 76 61 78"
            fill="#2D5A43"
          />
          <path
            d="M61 70 C 50 64 44 67 42 64 C 50 61 58 64 61 66"
            fill="#2D5A43"
          />
          <path
            d="M61 64 C 70 58 76 61 78 58 C 70 55 64 58 61 60"
            fill="#2D5A43"
          />
          <path
            d="M62 52 C 54 48 50 50 48 48 C 54 46 60 48 62 50"
            fill="#2D5A43"
          />
          <path
            d="M62 48 C 68 44 72 46 74 44 C 68 42 64 44 62 46"
            fill="#2D5A43"
          />
          <text
            x="20"
            y="130"
            fill="#2D5A43"
            fontSize="13"
            fontFamily="Georgia, serif"
            fontWeight="bold"
          >
            15¢
          </text>
          <text
            x="100"
            y="130"
            textAnchor="end"
            fill="#2D5A43"
            fontSize="8"
            fontFamily="Georgia, serif"
          >
            HERBARIUM
          </text>
        </svg>
      );

    case "svg:stamp-moon":
      return (
        <svg
          viewBox="0 0 130 150"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="4"
            width="122"
            height="142"
            fill="#EBE4D5"
            stroke="#B5A893"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <rect
            x="10"
            y="10"
            width="110"
            height="130"
            fill="#1E2433"
            stroke="#C5A059"
            strokeWidth="1.2"
          />
          <circle cx="65" cy="65" r="32" fill="#F4E9CD" />
          <circle cx="76" cy="60" r="28" fill="#1E2433" />
          {/* Tiny stars */}
          <circle cx="40" cy="40" r="1.5" fill="#C5A059" />
          <circle cx="95" cy="45" r="2" fill="#C5A059" />
          <circle cx="35" cy="85" r="1" fill="#C5A059" />
          <circle cx="90" cy="95" r="1.5" fill="#C5A059" />
          <circle cx="50" cy="100" r="1.2" fill="#C5A059" />
          <text
            x="65"
            y="124"
            textAnchor="middle"
            fill="#C5A059"
            fontSize="9"
            fontFamily="Georgia, serif"
            letterSpacing="2"
          >
            CELESTIAL POST
          </text>
        </svg>
      );

    case "svg:tape-kraft":
      return (
        <svg
          viewBox="0 0 200 50"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6 L197 4 L195 44 L5 46 Z"
            fill="#D9B78F"
            opacity="0.88"
          />
          {/* Subtle paper grain texture */}
          <path
            d="M2 5 L8 7 L6 45 L1 44 Z"
            fill="#C49F75"
            opacity="0.6"
          />
          <path
            d="M192 4 L198 6 L196 46 L191 43 Z"
            fill="#C49F75"
            opacity="0.6"
          />
          <line
            x1="20"
            y1="25"
            x2="180"
            y2="25"
            stroke="#9E764E"
            strokeWidth="0.8"
            strokeDasharray="6 8"
            opacity="0.5"
          />
        </svg>
      );

    case "svg:tape-gold":
      return (
        <svg
          viewBox="0 0 200 50"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFBA73" />
              <stop offset="50%" stopColor="#F9E4B7" />
              <stop offset="100%" stopColor="#C99846" />
            </linearGradient>
          </defs>
          <path
            d="M4 8 L196 5 L194 43 L2 45 Z"
            fill="url(#goldGrad)"
            opacity="0.9"
          />
          <path
            d="M10 25 H190"
            stroke="#FFF"
            strokeWidth="0.8"
            opacity="0.7"
          />
        </svg>
      );

    case "svg:tape-floral":
      return (
        <svg
          viewBox="0 0 200 50"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 5 L197 7 L195 45 L5 43 Z"
            fill="#F6E7E8"
            opacity="0.9"
          />
          {/* Tiny repeated flowers on tape */}
          {[25, 60, 95, 130, 165].map((cx, i) => (
            <g key={i} transform={`translate(${cx}, 25)`}>
              <circle cx="-5" cy="0" r="4" fill="#E2A1A8" opacity="0.8" />
              <circle cx="5" cy="0" r="4" fill="#E2A1A8" opacity="0.8" />
              <circle cx="0" cy="-5" r="4" fill="#E2A1A8" opacity="0.8" />
              <circle cx="0" cy="5" r="4" fill="#E2A1A8" opacity="0.8" />
              <circle cx="0" cy="0" r="2.5" fill="#BF5B67" />
            </g>
          ))}
        </svg>
      );

    case "svg:clip-rosegold":
      return (
        <svg
          viewBox="0 0 50 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 28 V76 C16 83 22 88 28 88 C34 88 40 83 40 76 V16 C40 8 32 3 24 3 C16 3 8 8 8 16 V82"
            stroke="#B76E79"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M16 28 V76 C16 83 22 88 28 88 C34 88 40 83 40 76 V16 C40 8 32 3 24 3 C16 3 8 8 8 16 V82"
            stroke="#FFE6EA"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      );

    case "svg:clip-brass":
      return (
        <svg
          viewBox="0 0 50 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 28 V76 C16 83 22 88 28 88 C34 88 40 83 40 76 V16 C40 8 32 3 24 3 C16 3 8 8 8 16 V82"
            stroke="#997A3D"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M16 28 V76 C16 83 22 88 28 88 C34 88 40 83 40 76 V16 C40 8 32 3 24 3 C16 3 8 8 8 16 V82"
            stroke="#FDE68A"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      );

    case "svg:botanical-rose":
      return (
        <svg
          viewBox="0 0 120 160"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stem */}
          <path
            d="M60 50 Q 56 100 65 155"
            stroke="#4A5844"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Leaves */}
          <path
            d="M58 85 C 40 75 32 90 40 98 C 50 102 56 94 58 86"
            fill="#5E7057"
          />
          <path
            d="M62 110 C 80 100 88 115 80 123 C 70 127 64 119 62 111"
            fill="#5E7057"
          />
          {/* Rose Petals (layered vintage dried rose) */}
          <circle cx="60" cy="40" r="22" fill="#B24C5D" />
          <circle cx="56" cy="38" r="17" fill="#8E3544" />
          <circle cx="62" cy="36" r="13" fill="#D36B7C" />
          <path
            d="M52 35 C 55 28 65 28 68 35 C 65 42 55 42 52 35 Z"
            fill="#69222E"
          />
          <circle cx="60" cy="36" r="6" fill="#F4A6B2" opacity="0.6" />
        </svg>
      );

    case "svg:botanical-lavender":
      return (
        <svg
          viewBox="0 0 90 180"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45 40 Q 42 110 46 175"
            stroke="#637554"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Lavender florets */}
          {[
            { cy: 30, cx: 45, r: 6 },
            { cy: 42, cx: 41, r: 7 },
            { cy: 44, cx: 49, r: 7 },
            { cy: 56, cx: 40, r: 8 },
            { cy: 58, cx: 50, r: 8 },
            { cy: 72, cx: 38, r: 8 },
            { cy: 74, cx: 52, r: 8 },
            { cy: 90, cx: 40, r: 7 },
            { cy: 92, cx: 50, r: 7 },
            { cy: 108, cx: 43, r: 6 },
          ].map((f, i) => (
            <ellipse
              key={i}
              cx={f.cx}
              cy={f.cy}
              rx={f.r}
              ry={f.r * 1.3}
              fill="#7A688D"
              opacity="0.9"
            />
          ))}
        </svg>
      );

    case "svg:botanical-ginkgo":
      return (
        <svg
          viewBox="0 0 120 130"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 70 Q 64 95 72 125"
            stroke="#8C6834"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Ginkgo fan leaf with notch */}
          <path
            d="M60 70 C 45 60 20 40 25 22 C 35 12 55 18 60 30 C 65 18 85 12 95 22 C 100 40 75 60 60 70 Z"
            fill="#D4A745"
            stroke="#B5892E"
            strokeWidth="1"
          />
          {/* Veins */}
          <path
            d="M60 70 L35 25 M60 70 L48 20 M60 70 L60 30 M60 70 L72 20 M60 70 L85 25"
            stroke="#E8C66E"
            strokeWidth="0.8"
            opacity="0.7"
          />
        </svg>
      );

    case "svg:creature-butterfly":
      return (
        <svg
          viewBox="0 0 130 110"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Antennae */}
          <path
            d="M63 35 Q 55 20 45 18 M67 35 Q 75 20 85 18"
            stroke="#3E2723"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Left Wings */}
          <path
            d="M63 42 C 40 10 10 25 15 55 C 18 72 45 70 63 60 Z"
            fill="#E07A5F"
            stroke="#3E2723"
            strokeWidth="1.2"
          />
          <path
            d="M63 60 C 35 65 25 85 40 98 C 55 102 62 85 63 65 Z"
            fill="#F4A261"
            stroke="#3E2723"
            strokeWidth="1.2"
          />
          {/* Right Wings */}
          <path
            d="M67 42 C 90 10 120 25 115 55 C 112 72 85 70 67 60 Z"
            fill="#E07A5F"
            stroke="#3E2723"
            strokeWidth="1.2"
          />
          <path
            d="M67 60 C 95 65 105 85 90 98 C 75 102 68 85 67 65 Z"
            fill="#F4A261"
            stroke="#3E2723"
            strokeWidth="1.2"
          />
          {/* Body */}
          <ellipse cx="65" cy="55" rx="3.5" ry="18" fill="#3E2723" />
        </svg>
      );

    case "svg:creature-bird":
      return (
        <svg
          viewBox="0 0 140 120"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bird silhouette carrying olive branch */}
          <path
            d="M30 65 C 45 50 70 48 85 58 C 95 40 115 30 135 25 C 125 45 110 60 95 68 C 90 85 75 100 50 95 C 40 92 32 85 30 65 Z"
            fill="#4A5568"
          />
          {/* Wing detail */}
          <path
            d="M75 55 C 65 30 50 20 40 18 C 45 35 60 50 70 62 Z"
            fill="#2D3748"
          />
          {/* Branch in beak */}
          <path
            d="M30 65 L15 72 M20 68 Q 16 62 14 65 M18 70 Q 22 75 25 73"
            stroke="#68D391"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "svg:doodle-heart":
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 68 C 15 50 5 35 12 20 C 18 8 32 10 40 22 C 48 10 62 8 68 20 C 75 35 65 50 40 68 Z"
            stroke="#A3283B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#FBEAEB"
            opacity="0.9"
          />
        </svg>
      );

    case "svg:doodle-stars":
      return (
        <svg
          viewBox="0 0 90 90"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Primary star */}
          <path
            d="M45 10 Q 45 35 70 35 Q 45 35 45 60 Q 45 35 20 35 Q 45 35 45 10 Z"
            fill="#D4AF37"
          />
          {/* Secondary star */}
          <path
            d="M20 55 Q 20 68 33 68 Q 20 68 20 81 Q 20 68 7 68 Q 20 68 20 55 Z"
            fill="#E5C158"
          />
          {/* Tertiary star */}
          <path
            d="M72 58 Q 72 66 80 66 Q 72 66 72 74 Q 72 66 64 66 Q 72 66 72 58 Z"
            fill="#F3D784"
          />
        </svg>
      );

    case "svg:doodle-coffee":
      return (
        <svg
          viewBox="0 0 140 140"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="70"
            cy="70"
            r="55"
            stroke="#6F4E37"
            strokeWidth="3.5"
            strokeDasharray="40 10 30 15 20 8"
            opacity="0.4"
          />
          <circle
            cx="70"
            cy="70"
            r="53"
            stroke="#8B5A2B"
            strokeWidth="1.2"
            opacity="0.3"
          />
          <circle cx="85" cy="50" r="4" fill="#6F4E37" opacity="0.35" />
          <circle cx="48" cy="100" r="3" fill="#6F4E37" opacity="0.3" />
        </svg>
      );

    case "svg:doodle-flourish":
      return (
        <svg
          viewBox="0 0 160 70"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 35 C 30 20 50 50 80 35 C 110 20 130 50 150 35 M80 35 C 75 15 85 15 80 35 C 75 55 85 55 80 35"
            stroke="#4A3728"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="80" cy="35" r="3" fill="#4A3728" />
          <circle cx="15" cy="35" r="2" fill="#4A3728" />
          <circle cx="145" cy="35" r="2" fill="#4A3728" />
        </svg>
      );

    default:
      return null;
  }
}
