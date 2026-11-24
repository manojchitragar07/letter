"use client";

import React, { useMemo } from "react";
import { AtmosphereEffect } from "@/types/letter";

interface AtmosphereEffectsProps {
  effect: AtmosphereEffect;
}

export function AtmosphereEffects({ effect }: AtmosphereEffectsProps) {
  if (effect === "none") return null;

  // Generate deterministic particles for performance and visual beauty
  const particles = useMemo(() => {
    const count = effect === "stars" ? 40 : 26;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 3.7 + (i % 5) * 4) % 100}%`,
      delay: `${(i * 0.45) % 8}s`,
      duration: `${6 + (i % 6) * 1.5}s`,
      size: 14 + (i % 4) * 6,
      rotateStart: (i * 35) % 360,
      opacity: 0.6 + ((i % 5) * 0.08),
    }));
  }, [effect]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20">
      {particles.map((p) => {
        if (effect === "petals") {
          return (
            <div
              key={p.id}
              className="absolute animate-float"
              style={{
                left: p.left,
                top: "-10%",
                animation: `fallAndSway ${p.duration} linear infinite`,
                animationDelay: p.delay,
                opacity: p.opacity,
              }}
            >
              <svg
                width={p.size}
                height={p.size * 1.3}
                viewBox="0 0 24 32"
                style={{
                  transform: `rotate(${p.rotateStart}deg)`,
                  filter: "drop-shadow(0 2px 4px rgba(180, 50, 70, 0.2))",
                }}
              >
                <path
                  d="M12 2 C18 6, 24 16, 20 26 C16 32, 8 32, 4 26 C0 16, 6 6, 12 2 Z"
                  fill={p.id % 2 === 0 ? "#E57388" : "#F4A6B8"}
                />
              </svg>
            </div>
          );
        }

        if (effect === "stars") {
          return (
            <div
              key={p.id}
              className="absolute"
              style={{
                left: p.left,
                top: "-5%",
                animation: `fallTwinkle ${p.duration} ease-in-out infinite`,
                animationDelay: p.delay,
                opacity: p.opacity,
              }}
            >
              <svg
                width={p.size * 0.7}
                height={p.size * 0.7}
                viewBox="0 0 24 24"
                style={{
                  filter: "drop-shadow(0 0 6px rgba(245, 215, 110, 0.8))",
                }}
              >
                <path
                  d="M12 0 Q 12 12, 24 12 Q 12 12, 12 24 Q 12 12, 0 12 Q 12 12, 12 0 Z"
                  fill="#FCEBA4"
                />
              </svg>
            </div>
          );
        }

        if (effect === "leaves") {
          return (
            <div
              key={p.id}
              className="absolute"
              style={{
                left: p.left,
                top: "-10%",
                animation: `fallAndSway ${p.duration} linear infinite`,
                animationDelay: p.delay,
                opacity: p.opacity,
              }}
            >
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                style={{
                  transform: `rotate(${p.rotateStart}deg)`,
                  filter: "drop-shadow(0 2px 4px rgba(120, 80, 20, 0.2))",
                }}
              >
                <path
                  d="M12 2 C18 5 22 12 19 18 C16 22 10 22 6 18 C3 12 6 5 12 2 Z"
                  fill={p.id % 2 === 0 ? "#C4883C" : "#8A9A5B"}
                />
                <line x1="12" y1="2" x2="12" y2="22" stroke="#684518" strokeWidth="1" />
              </svg>
            </div>
          );
        }

        // fireflies
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: `${(p.id * 7) % 90}%`,
              width: `${Math.max(4, p.size * 0.3)}px`,
              height: `${Math.max(4, p.size * 0.3)}px`,
              backgroundColor: "#E2F094",
              boxShadow: "0 0 12px 4px rgba(226, 240, 148, 0.8)",
              animation: `fireflyDrift ${4 + (p.id % 4)}s ease-in-out infinite alternate`,
              animationDelay: p.delay,
            }}
          />
        );
      })}

      <style jsx>{`
        @keyframes fallAndSway {
          0% {
            transform: translateY(-50px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(40px) rotate(180deg);
          }
          100% {
            transform: translateY(105vh) translateX(-30px) rotate(360deg);
          }
        }
        @keyframes fallTwinkle {
          0% {
            transform: translateY(-20px) scale(0.6);
            opacity: 0.2;
          }
          50% {
            opacity: 1;
            transform: translateY(50vh) scale(1.2);
          }
          100% {
            transform: translateY(105vh) scale(0.6);
            opacity: 0.1;
          }
        }
        @keyframes fireflyDrift {
          0% {
            transform: translate(0px, 0px) scale(0.8);
            opacity: 0.3;
          }
          50% {
            opacity: 1;
            transform: translate(25px, -30px) scale(1.3);
          }
          100% {
            transform: translate(-20px, 25px) scale(0.7);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
