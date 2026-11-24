import React from "react";

interface PostalPostmarkProps {
  city?: string;
  date?: string;
  className?: string;
  inkColor?: string;
}

export function PostalPostmark({
  city = "PARIS",
  date = "NOV 24 1928",
  className = "",
  inkColor = "#3B322A",
}: PostalPostmarkProps) {
  return (
    <svg
      viewBox="0 0 240 100"
      className={`select-none pointer-events-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.65, mixBlendMode: "multiply" }}
    >
      {/* Outer Postmark Circle */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke={inkColor}
        strokeWidth="1.8"
        strokeDasharray="90 3 40 2"
      />
      {/* Inner Postmark Circle */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke={inkColor}
        strokeWidth="1"
        strokeDasharray="60 4 30 2"
      />

      {/* City Arced or Centered */}
      <text
        x="50"
        y="32"
        textAnchor="middle"
        fill={inkColor}
        fontSize="8.5"
        fontFamily="Courier, monospace"
        fontWeight="bold"
        letterSpacing="2"
      >
        ★ {city} ★
      </text>

      {/* Date */}
      <text
        x="50"
        y="53"
        textAnchor="middle"
        fill={inkColor}
        fontSize="10"
        fontFamily="Courier, monospace"
        fontWeight="bold"
        letterSpacing="1"
      >
        {date}
      </text>

      {/* Postmark Department */}
      <text
        x="50"
        y="72"
        textAnchor="middle"
        fill={inkColor}
        fontSize="7.5"
        fontFamily="Courier, monospace"
        letterSpacing="1.5"
      >
        POSTES
      </text>

      {/* Wavy Cancellation Ink Lines */}
      <path
        d="M102 32 C 120 24, 140 40, 160 32 C 180 24, 200 40, 230 32"
        stroke={inkColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M102 44 C 120 36, 140 52, 160 44 C 180 36, 200 52, 230 44"
        stroke={inkColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M102 56 C 120 48, 140 64, 160 56 C 180 48, 200 64, 230 56"
        stroke={inkColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M102 68 C 120 60, 140 76, 160 68 C 180 60, 200 76, 230 68"
        stroke={inkColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
