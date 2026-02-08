"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

interface ConfettiProps {
  emojis: string[];
  count?: number;
}

export function Confetti({ emojis, count = 60 }: ConfettiProps) {
  const confetti = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: emojis[i % emojis.length],
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      })),
    [emojis, count],
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-2xl sm:text-3xl"
          style={{ left: item.left }}
          initial={{ y: "-10vh", rotate: 0, opacity: 1 }}
          animate={{ y: "100vh", rotate: 720, opacity: 0 }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
