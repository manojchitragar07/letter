"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SvgSticker } from "@/components/stickers/SvgStickers";
import { X, Sparkles, Send, Heart } from "lucide-react";
import Link from "next/link";

interface SkyIllustrationProps {
  onOpenSecretLetter?: () => void;
}

export function SkyIllustration({ onOpenSecretLetter }: SkyIllustrationProps) {
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [hoveredPlane, setHoveredPlane] = useState(false);

  const handleOpenLetter = () => {
    if (onOpenSecretLetter) {
      onOpenSecretLetter();
    } else {
      setShowSecretModal(true);
    }
  };

  return (
    <div className="relative w-full max-w-[620px] aspect-[4/3] sm:aspect-[1.15/1] mx-auto select-none">
      {/* SVG SCENE: Boy, Dog, Knoll, and Letter Elements */}
      <svg
        viewBox="0 0 720 580"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBB73" />
            <stop offset="60%" stopColor="#CCA056" />
            <stop offset="100%" stopColor="#A27934" />
          </linearGradient>

          <linearGradient id="hillGradBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C69C54" />
            <stop offset="100%" stopColor="#8A6324" />
          </linearGradient>

          <linearGradient id="boyTunic" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A6947D" />
            <stop offset="100%" stopColor="#80705B" />
          </linearGradient>

          <linearGradient id="boyPants" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5D7382" />
            <stop offset="100%" stopColor="#435561" />
          </linearGradient>

          <linearGradient id="satchelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7E4A28" />
            <stop offset="100%" stopColor="#512E15" />
          </linearGradient>

          <linearGradient id="inkPotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2F3640" />
            <stop offset="100%" stopColor="#181D24" />
          </linearGradient>

          <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#EDE3CE" />
          </linearGradient>

          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* 1. FAINT CELESTIAL POSTAL POSTMARKS IN THE SKY */}
        <g opacity="0.22" className="text-white">
          {/* Postmark Circle 1 */}
          <circle cx="210" cy="110" r="46" stroke="#FAF7F2" strokeWidth="1.75" strokeDasharray="3 3" />
          <circle cx="210" cy="110" r="41" stroke="#FAF7F2" strokeWidth="1" />
          <text
            x="210"
            y="98"
            textAnchor="middle"
            fill="#FAF7F2"
            fontSize="7"
            fontFamily="monospace"
            letterSpacing="2"
          >
            AIR MAIL • 1924
          </text>
          <text
            x="210"
            y="114"
            textAnchor="middle"
            fill="#FAF7F2"
            fontSize="10"
            fontFamily="Georgia, serif"
            fontWeight="bold"
          >
            DEARLY
          </text>
          <text
            x="210"
            y="126"
            textAnchor="middle"
            fill="#FAF7F2"
            fontSize="6.5"
            fontFamily="monospace"
            letterSpacing="1.5"
          >
            POSTE RESTANTE
          </text>

          {/* Postal Cancellation Wavy Lines */}
          <path
            d="M265 95 C 275 88, 285 102, 295 95 C 305 88, 315 102, 325 95 M 265 110 C 275 103, 285 117, 295 110 C 305 103, 315 117, 325 110 M 265 125 C 275 118, 285 132, 295 125 C 305 118, 315 132, 325 125"
            stroke="#FAF7F2"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Celestial Star Constellation */}
          <circle cx="380" cy="65" r="2.5" fill="#FAF7F2" />
          <circle cx="430" cy="50" r="1.5" fill="#FAF7F2" />
          <circle cx="480" cy="80" r="2" fill="#FAF7F2" />
          <circle cx="530" cy="60" r="1.5" fill="#FAF7F2" />
          <path
            d="M380 65 L430 50 L480 80 L530 60"
            stroke="#FAF7F2"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
        </g>

        {/* 2. PAPER AIRPLANES FLYING TOWARD THE SKY (Interactive!) */}
        <g
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={handleOpenLetter}
          onMouseEnter={() => setHoveredPlane(true)}
          onMouseLeave={() => setHoveredPlane(false)}
        >
          {/* Dashed Flight Trail */}
          <path
            d="M310 460 C 260 380, 160 300, 190 220 C 210 160, 290 170, 310 120 C 320 90, 310 60, 270 40"
            stroke="#FAF7F2"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.4"
            fill="none"
          />

          {/* Main Paper Airplane */}
          <g transform="translate(265, 35) rotate(-32) scale(1.15)">
            <polygon points="0,0 42,16 14,24" fill="#FAF7F2" filter="url(#softShadow)" />
            <polygon points="42,16 0,0 20,12" fill="#EAE5D9" />
            <polygon points="20,12 14,24 42,16" fill="#D6CEBE" />
            <line x1="0" y1="0" x2="42" y2="16" stroke="#9A8E7A" strokeWidth="0.75" />
            {/* Tiny red airmail stripe */}
            <path d="M4 3 L8 4.5 L6 6.5 Z" fill="#9B1B30" />
          </g>

          {/* Small companion paper plane higher up */}
          <g transform="translate(140, 160) rotate(-45) scale(0.65)" opacity="0.8">
            <polygon points="0,0 35,13 11,20" fill="#FAF7F2" />
            <polygon points="35,13 0,0 17,10" fill="#EAE5D9" />
            <polygon points="17,10 11,20 35,13" fill="#D6CEBE" />
          </g>

          {/* Floating sealed letter with tiny wings */}
          <g transform="translate(80, 260) rotate(-15) scale(0.85)" opacity="0.85">
            {/* Wings */}
            <path
              d="M-4 12 C -18 2, -24 16, -14 24 C -6 22, -2 18, 0 14"
              fill="#FAF7F2"
              fillOpacity="0.75"
            />
            <path
              d="M48 12 C 62 2, 68 16, 58 24 C 50 22, 46 18, 44 14"
              fill="#FAF7F2"
              fillOpacity="0.75"
            />
            {/* Envelope Body */}
            <rect x="0" y="0" width="44" height="28" rx="2" fill="#FBF8F1" stroke="#A89476" strokeWidth="1" filter="url(#softShadow)" />
            <polygon points="0,0 22,14 44,0" fill="#EDE4D4" stroke="#A89476" strokeWidth="0.75" />
            {/* Wax seal */}
            <circle cx="22" cy="14" r="5" fill="#9B1B30" />
            <circle cx="22" cy="14" r="3.5" fill="#7A1525" />
          </g>
        </g>

        {/* 3. BACKGROUND HILL / DUNE RIDGE */}
        <path
          d="M0 580 L0 520 C 140 500, 320 480, 480 470 C 580 465, 660 475, 720 485 L720 580 Z"
          fill="url(#hillGradBack)"
          opacity="0.85"
        />

        {/* 4. FOREGROUND GOLDEN GRASSY KNOLL */}
        <path
          d="M0 580 L0 535 C 120 525, 240 515, 380 500 C 490 490, 600 480, 720 510 L720 580 Z"
          fill="url(#hillGrad1)"
        />

        {/* Textured Grass Tufts along the ridge */}
        <g stroke="#916E2D" strokeWidth="1.5" strokeLinecap="round">
          {/* Grass cluster left */}
          <path d="M40 535 Q 45 515, 52 505 M 48 535 Q 56 520, 65 510 M 55 536 Q 60 525, 62 516" />
          <path d="M110 530 Q 118 510, 126 500 M 122 531 Q 130 516, 138 508" />
          <path d="M190 522 Q 198 502, 208 492 M 202 524 Q 212 510, 220 502" />

          {/* Grass cluster center near boy */}
          <path d="M330 508 Q 338 488, 345 476 M 342 509 Q 350 494, 358 484 M 350 510 Q 355 498, 362 490" stroke="#7E5D22" />
          <path d="M380 502 Q 386 480, 394 470 M 390 503 Q 398 486, 408 476" stroke="#7E5D22" />

          {/* Wild Golden Grass Under Boy and Dog */}
          <path d="M450 496 Q 458 472, 466 458 M 460 497 Q 470 478, 480 466 M 472 498 Q 478 484, 486 474" stroke="#8A6726" strokeWidth="1.75" />
          <path d="M510 492 Q 520 468, 528 454 M 522 494 Q 532 475, 542 462 M 534 495 Q 540 482, 550 472" stroke="#8A6726" strokeWidth="1.75" />
          <path d="M570 488 Q 580 464, 590 450 M 584 490 Q 594 472, 604 460 M 596 492 Q 604 478, 614 468" stroke="#8A6726" strokeWidth="1.75" />
          <path d="M630 495 Q 640 474, 650 460 M 644 498 Q 654 480, 664 470" stroke="#8A6726" strokeWidth="1.75" />
          <path d="M675 504 Q 685 484, 696 472 M 688 506 Q 698 490, 706 480" stroke="#8A6726" strokeWidth="1.75" />

          {/* Golden Wheat Grass Heads */}
          <circle cx="466" cy="458" r="2" fill="#EAD496" stroke="none" />
          <circle cx="480" cy="466" r="2.2" fill="#EAD496" stroke="none" />
          <circle cx="528" cy="454" r="2.5" fill="#EAD496" stroke="none" />
          <circle cx="542" cy="462" r="2" fill="#EAD496" stroke="none" />
          <circle cx="590" cy="450" r="2.5" fill="#EAD496" stroke="none" />
          <circle cx="604" cy="460" r="2.2" fill="#EAD496" stroke="none" />
          <circle cx="650" cy="460" r="2" fill="#EAD496" stroke="none" />
        </g>

        {/* 5. VINTAGE LETTER ELEMENTS ON THE GRASS (Left of Boy) */}
        <g id="letterElementsOnGrass" transform="translate(330, 440)">
          {/* A. Open Leather Satchel / Mail Bag */}
          <g transform="translate(0, 20) rotate(-6)">
            {/* Bag Body */}
            <path
              d="M0 20 C 0 10, 8 4, 18 4 L 56 4 C 66 4, 74 10, 74 20 L 70 54 C 69 60, 63 65, 56 65 L 18 65 C 11 65, 5 60, 4 54 Z"
              fill="url(#satchelGrad)"
              filter="url(#softShadow)"
            />
            {/* Bag Flap Open */}
            <path
              d="M4 14 L 70 14 L 64 36 C 62 42, 54 46, 37 46 C 20 46, 12 42, 10 36 Z"
              fill="#60371A"
            />
            {/* Brass Buckle and Straps */}
            <line x1="37" y1="14" x2="37" y2="46" stroke="#3A2110" strokeWidth="3" />
            <rect x="33" y="30" width="8" height="10" rx="1" fill="#D4AF37" stroke="#9A7B1C" strokeWidth="0.75" />
            <circle cx="37" cy="35" r="1.5" fill="#3A2110" />

            {/* Letters Peeking Out of the Satchel */}
            <g transform="translate(14, -6) rotate(8)">
              <rect x="0" y="0" width="28" height="18" rx="1.5" fill="#FFFDF8" stroke="#D1C3AB" strokeWidth="0.8" />
              {/* Postage Stamp */}
              <rect x="18" y="2" width="7" height="9" fill="#9B1B30" />
              {/* Airmail stripes */}
              <line x1="2" y1="16" x2="26" y2="16" stroke="#256D93" strokeWidth="1" strokeDasharray="2 2" />
            </g>
            <g transform="translate(28, -12) rotate(-10)">
              <rect x="0" y="0" width="26" height="20" rx="1.5" fill="#F4EADB" stroke="#C4B499" strokeWidth="0.8" />
              <circle cx="13" cy="10" r="3.5" fill="#7A1525" />
            </g>
          </g>

          {/* B. Glass Ink Bottle & Feather Quill */}
          <g transform="translate(68, 38)">
            {/* Inkpot */}
            <rect x="6" y="14" width="20" height="22" rx="3" fill="url(#inkPotGrad)" stroke="#111" strokeWidth="1" />
            <rect x="9" y="8" width="14" height="6" rx="1" fill="#2F3640" />
            {/* Ink label */}
            <rect x="9" y="20" width="14" height="10" fill="#E8DEC9" />
            <text x="16" y="27" textAnchor="middle" fontSize="4.5" fontFamily="serif" fill="#3A2518">INK</text>

            {/* Goose Quill Pen standing in bottle */}
            <g transform="translate(16, 12) rotate(-28)">
              {/* Quill Shaft */}
              <line x1="0" y1="2" x2="0" y2="-45" stroke="#EDE8DC" strokeWidth="1.75" strokeLinecap="round" />
              {/* Quill Vane / Feathers */}
              <path
                d="M0 -15 C 8 -24, 9 -38, 0 -45 C -4 -38, -4 -24, 0 -15"
                fill="#FAF7F2"
                stroke="#DDD5C5"
                strokeWidth="0.75"
              />
              <path d="M0 -22 L 5 -27 M 0 -28 L 6 -34 M 0 -35 L 5 -40" stroke="#CCC3B1" strokeWidth="0.5" />
              {/* Ink-dipped tip */}
              <line x1="0" y1="2" x2="0" y2="8" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </g>

          {/* C. Unfolded Letter on Grass */}
          <g transform="translate(86, 52) rotate(14)">
            <path
              d="M0 0 L 46 0 C 47 0, 48 1, 48 2 L 44 34 C 44 35, 43 36, 42 36 L 0 34 C -1 34, -2 33, -2 32 L -2 2 Z"
              fill="url(#paperGrad)"
              stroke="#D3C5AE"
              strokeWidth="0.75"
              filter="url(#softShadow)"
            />
            {/* Handwritten scribble lines */}
            <line x1="4" y1="6" x2="38" y2="6" stroke="#685444" strokeWidth="0.75" strokeDasharray="3 2" />
            <line x1="4" y1="11" x2="40" y2="11" stroke="#685444" strokeWidth="0.75" strokeDasharray="4 2" />
            <line x1="4" y1="16" x2="34" y2="16" stroke="#685444" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="4" y1="21" x2="36" y2="21" stroke="#685444" strokeWidth="0.75" strokeDasharray="5 2" />
            {/* Red Wax Seal */}
            <circle cx="36" cy="27" r="5" fill="#9B1B30" stroke="#6C1220" strokeWidth="0.75" />
            <circle cx="36" cy="27" r="3.2" fill="#B3243C" />
          </g>
        </g>

        {/* 6. THE BOY SITTING CROSS-LEGGED LOOKING UP IN WONDER */}
        <g id="boyIllustration" transform="translate(520, 275)">
          {/* Head & Hair */}
          <g id="boyHead" transform="translate(18, 0)">
            {/* Neck */}
            <path d="M22 65 L 26 78 L 36 76 L 33 63 Z" fill="#DAB08C" />

            {/* Face tilted up at 45 degrees */}
            <path
              d="M16 42 C 16 30, 28 24, 38 30 C 46 35, 48 46, 46 54 C 44 62, 34 68, 24 64 C 18 60, 16 50, 16 42 Z"
              fill="#E5BD98"
            />
            {/* Chin & Jaw contour */}
            <path d="M38 52 C 40 56, 36 62, 28 64" stroke="#C99872" strokeWidth="1.2" fill="none" strokeLinecap="round" />

            {/* Nose pointing upward */}
            <path d="M42 42 L 46 41 L 43 45" stroke="#B88661" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* Eye looking upward into the sky with wonder */}
            <circle cx="37" cy="40" r="3.5" fill="#3D291D" />
            <circle cx="38" cy="39" r="1.2" fill="#FFFFFF" />
            {/* Eyebrow raised */}
            <path d="M33 34 C 36 32, 41 33, 44 35" stroke="#4A3324" strokeWidth="1.6" strokeLinecap="round" fill="none" />

            {/* Ear */}
            <path d="M19 46 C 17 44, 16 50, 19 53" fill="#DBA982" stroke="#B88661" strokeWidth="1" />

            {/* Tousled Messy Brown Hair blowing softly in the wind */}
            <path
              d="M12 40 C 8 32, 10 20, 18 14 C 26 8, 38 6, 48 12 C 56 16, 60 26, 56 34 C 54 38, 50 40, 48 38 C 46 34, 46 26, 40 22 C 34 18, 24 20, 20 26 C 16 32, 18 38, 14 42 Z"
              fill="#523927"
            />
            {/* Wild Hair Strands / Tuft spikes */}
            <path
              d="M28 8 L 32 -4 L 38 6 M 42 7 L 50 -2 L 52 10 M 18 14 L 10 4 L 16 18 M 52 14 L 64 8 L 56 22 M 56 24 L 68 22 L 56 32"
              stroke="#523927"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#523927"
            />
            <path
              d="M30 10 L 33 0 L 37 8 M 44 9 L 48 2 L 50 11"
              stroke="#684C35"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Torso / Earthy Tunic */}
          <g id="boyTorso" transform="translate(8, 70)">
            {/* Shoulders and Body */}
            <path
              d="M26 6 C 14 10, 4 24, 0 38 L 8 96 C 24 98, 48 98, 68 96 L 76 38 C 72 24, 62 10, 48 6 Z"
              fill="url(#boyTunic)"
              stroke="#695A48"
              strokeWidth="1.2"
            />
            {/* Open V-Neck Collar */}
            <path d="M30 6 L 37 28 L 44 6" stroke="#554736" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Fabric folds */}
            <path d="M22 42 C 30 50, 42 50, 52 44" stroke="#635443" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M18 64 C 28 70, 44 70, 56 64" stroke="#635443" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Left Arm resting on knee */}
            <path
              d="M4 36 C -4 52, -2 74, 8 90 L 18 86 C 12 72, 10 54, 16 40 Z"
              fill="#94836D"
              stroke="#695A48"
              strokeWidth="1"
            />
            {/* Right Arm resting on other knee */}
            <path
              d="M72 36 C 80 52, 78 74, 68 90 L 58 86 C 64 72, 66 54, 60 40 Z"
              fill="#94836D"
              stroke="#695A48"
              strokeWidth="1"
            />
            {/* Hands */}
            <circle cx="10" cy="94" r="7" fill="#E5BD98" />
            <circle cx="66" cy="94" r="7" fill="#E5BD98" />
          </g>

          {/* Cross-legged Pants & Bare Feet */}
          <g id="boyLegs" transform="translate(0, 155)">
            {/* Pants Rolled Up */}
            <path
              d="M-4 12 C 10 2, 38 0, 52 14 C 66 0, 94 2, 108 12 C 114 26, 96 38, 78 40 C 60 42, 44 38, 52 24 C 48 36, 28 42, 14 40 C -4 38, -10 26, -4 12 Z"
              fill="url(#boyPants)"
              stroke="#35444E"
              strokeWidth="1.2"
            />
            {/* Rolled Cuff Highlights */}
            <path d="M-2 18 C 4 14, 12 16, 16 22" stroke="#8EA0AC" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M88 22 C 94 16, 102 14, 106 18" stroke="#8EA0AC" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Left Foot / Toes */}
            <g transform="translate(62, 28)">
              <ellipse cx="14" cy="8" rx="14" ry="7" fill="#DAB08C" />
              <circle cx="2" cy="7" r="3.2" fill="#E5BD98" />
              <circle cx="7" cy="6" r="2.6" fill="#E5BD98" />
              <circle cx="12" cy="6" r="2.4" fill="#E5BD98" />
              <circle cx="17" cy="7" r="2.2" fill="#E5BD98" />
              <circle cx="22" cy="8" r="2" fill="#E5BD98" />
            </g>

            {/* Right Foot */}
            <g transform="translate(10, 28)">
              <ellipse cx="12" cy="8" rx="14" ry="7" fill="#DAB08C" />
              <circle cx="22" cy="7" r="3.2" fill="#E5BD98" />
              <circle cx="17" cy="6" r="2.6" fill="#E5BD98" />
              <circle cx="12" cy="6" r="2.4" fill="#E5BD98" />
              <circle cx="7" cy="7" r="2.2" fill="#E5BD98" />
              <circle cx="2" cy="8" r="2" fill="#E5BD98" />
            </g>
          </g>
        </g>

        {/* 7. THE LOYAL SCHNAUZER / TERRIER DOG LOOKING UP AT THE SKY */}
        <g id="dogIllustration" transform="translate(435, 330)">
          {/* Dog Body Sitting Upright */}
          <path
            d="M16 110 C 12 90, 16 60, 26 44 C 36 32, 54 32, 64 44 C 74 58, 76 90, 72 110 C 60 114, 28 114, 16 110 Z"
            fill="#1E1E1E"
            stroke="#111111"
            strokeWidth="1.5"
          />

          {/* Textured Fur Highlights on Back */}
          <path d="M22 55 C 20 65, 20 80, 24 95 M 28 50 C 26 65, 27 82, 30 100" stroke="#383838" strokeWidth="1.5" strokeLinecap="round" />

          {/* Front Paws Sitting on Grass */}
          <ellipse cx="34" cy="112" rx="9" ry="6" fill="#2A2A2A" stroke="#111" strokeWidth="1" />
          <ellipse cx="54" cy="112" rx="9" ry="6" fill="#2A2A2A" stroke="#111" strokeWidth="1" />
          {/* Paw claws/pads */}
          <line x1="30" y1="110" x2="30" y2="116" stroke="#141414" strokeWidth="1.5" />
          <line x1="34" y1="110" x2="34" y2="117" stroke="#141414" strokeWidth="1.5" />
          <line x1="38" y1="110" x2="38" y2="116" stroke="#141414" strokeWidth="1.5" />
          <line x1="50" y1="110" x2="50" y2="116" stroke="#141414" strokeWidth="1.5" />
          <line x1="54" y1="110" x2="54" y2="117" stroke="#141414" strokeWidth="1.5" />
          <line x1="58" y1="110" x2="58" y2="116" stroke="#141414" strokeWidth="1.5" />

          {/* Red Collar with Golden Letter Charm */}
          <path d="M30 46 C 42 50, 56 50, 66 44" stroke="#9B1B30" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="48" cy="51" r="3" fill="#D4AF37" stroke="#9A7B1C" strokeWidth="0.75" />

          {/* Dog Head Tilted Upwards at the exact angle as the boy */}
          <g id="dogHead" transform="translate(18, -12)">
            {/* Skull / Ears Base */}
            <path
              d="M16 32 C 16 18, 28 8, 42 12 C 54 16, 58 28, 54 38 C 50 44, 40 48, 28 44 C 18 40, 16 34, 16 32 Z"
              fill="#181818"
            />

            {/* Schnauzer Pointy / Folded Ears */}
            {/* Left Ear */}
            <path d="M22 14 L 14 -4 L 28 6 Z" fill="#222" stroke="#111" strokeWidth="1" />
            {/* Right Ear */}
            <path d="M46 16 L 56 0 L 52 14 Z" fill="#222" stroke="#111" strokeWidth="1" />

            {/* Muzzle / Long Schnauzer Snout pointing skyward */}
            <path
              d="M32 26 L 52 18 C 58 16, 62 20, 60 26 L 46 38 Z"
              fill="#222"
            />
            {/* Black Wet Nose */}
            <ellipse cx="56" cy="20" rx="3.5" ry="2.5" fill="#0A0A0A" />
            <circle cx="55" cy="19" r="0.8" fill="#FFF" opacity="0.6" />

            {/* Expressive Warm Dog Eye looking up at the sky */}
            <circle cx="38" cy="22" r="3" fill="#4A2E18" />
            <circle cx="39" cy="21" r="1" fill="#FFF" />

            {/* Bushy Schnauzer Eyebrows (Signature look!) */}
            <path
              d="M32 18 C 36 14, 44 14, 48 17 L 46 21 C 42 19, 36 19, 34 22 Z"
              fill="#CFCFCF"
            />
            <path d="M34 16 L 40 12 M 42 13 L 46 15" stroke="#E5E5E5" strokeWidth="1.2" strokeLinecap="round" />

            {/* Big Fluffy Gray/Silver Schnauzer Beard & Whiskers */}
            <path
              d="M36 32 C 44 32, 54 26, 62 28 C 66 32, 62 42, 54 50 C 46 56, 34 54, 30 46 C 28 42, 32 36, 36 32 Z"
              fill="#D1D1D1"
              stroke="#B0B0B0"
              strokeWidth="0.8"
            />
            {/* Beard Texture Highlights */}
            <path
              d="M40 36 C 44 42, 48 46, 52 48 M 46 34 C 50 40, 54 44, 58 46 M 36 40 C 40 44, 44 48, 48 52"
              stroke="#F0F0F0"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>

      {/* FLOATING ACTION PILL: "Secret Letter in the Sky" */}
      <motion.button
        onClick={handleOpenLetter}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 left-6 sm:top-8 sm:left-10 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-[#FAF7F2] text-xs font-serif flex items-center gap-2 shadow-lg transition-all group"
      >
        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
        <span className="tracking-wide">Open Sky Letter</span>
        <Send className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
      </motion.button>

      {/* POPUP MODAL: The Letter found in the sky */}
      <AnimatePresence>
        {showSecretModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#FAF5EC] rounded-2xl p-8 border-2 border-[#D8C7A8] shadow-2xl text-[#2B2621] overflow-hidden"
            >
              {/* Envelope liner pattern */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#8F7757 0.75px, transparent 0.75px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Close Button */}
              <button
                onClick={() => setShowSecretModal(false)}
                className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-300 pb-3">
                  <span className="text-[11px] font-mono tracking-widest text-amber-900 uppercase">
                    Par Avion • Poste Aérienne
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-rose-800 font-serif">
                    <Heart className="w-3.5 h-3.5 fill-rose-700" />
                    <span>Sky Letter No. 01</span>
                  </div>
                </div>

                <div className="py-2 space-y-3">
                  <h3 className="font-serif font-bold text-2xl text-stone-900">
                    To Whoever Is Looking Up,
                  </h3>
                  <p className="font-handwriting text-lg sm:text-xl text-stone-800 leading-relaxed">
                    &ldquo;Some feelings are too tender for ordinary screens. If you ever felt that your words deserved a quiet sky, a warm paper texture, and someone who holds them dear — you have found the right place.&rdquo;
                  </p>
                  <p className="font-serif italic text-sm text-stone-600">
                    &mdash; With quiet wonder, from Dearly
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-stone-500 font-serif">
                    Ready to send your own?
                  </span>
                  <Link
                    href="/studio"
                    onClick={() => setShowSecretModal(false)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-burgundy hover:bg-burgundy-dark text-white rounded-xl text-xs font-serif font-semibold flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105"
                  >
                    <span>Write Your Letter</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
