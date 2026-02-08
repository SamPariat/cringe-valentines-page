"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

// Animated Heart SVG
export const AnimatedHeart = ({
  size = 40,
  color = "#ec4899",
  delay = 0,
}: {
  size?: number;
  color?: string;
  delay?: number;
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1.2, 1],
      opacity: 1,
    }}
    transition={{ delay, duration: 0.5, ease: "backOut" }}
  >
    <title>Heart</title>
    <motion.path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 0.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  </motion.svg>
);

// Cupid Arrow SVG
export const CupidArrow = ({
  size = 60,
  color = "#f472b6",
}: {
  size?: number;
  color?: string;
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    initial={{ x: -100, opacity: 0, rotate: -45 }}
    animate={{ x: 0, opacity: 1, rotate: -45 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <title>Cupid Arrow</title>
    {/* Arrow shaft */}
    <motion.line
      x1="10"
      y1="32"
      x2="54"
      y2="32"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    />
    {/* Arrow head */}
    <motion.path
      d="M54 32L44 22M54 32L44 42"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    />
    {/* Arrow feathers */}
    <motion.path
      d="M10 32L16 26M10 32L16 38"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    />
    {/* Heart on arrow */}
    <motion.path
      d="M32 28c-1-2-3-3-5-3-2.5 0-4.5 2-4.5 4.5 0 3 2.7 5.4 6.8 9.1l2.7 2.4 2.7-2.4c4.1-3.7 6.8-6.1 6.8-9.1 0-2.5-2-4.5-4.5-4.5-2 0-4 1-5 3z"
      fill="#ef4444"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.3, 1] }}
      transition={{ delay: 1, duration: 0.5 }}
    />
  </motion.svg>
);

// Floating Sparkle SVG
export const Sparkle = ({
  size = 24,
  color = "#fbbf24",
}: {
  size?: number;
  color?: string;
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    animate={{
      scale: [1, 1.5, 1],
      rotate: [0, 180, 360],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  >
    <title>Sparkle</title>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </motion.svg>
);

// Love Letter SVG
export const LoveLetter = ({ size = 50 }: { size?: number }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <title>Love Letter</title>
    {/* Envelope body */}
    <motion.rect
      x="8"
      y="16"
      width="48"
      height="36"
      rx="4"
      fill="#fce7f3"
      stroke="#ec4899"
      strokeWidth="2"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
    />
    {/* Envelope flap */}
    <motion.path
      d="M8 20L32 36L56 20"
      stroke="#ec4899"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />
    {/* Heart seal */}
    <motion.path
      d="M32 30c-1-2-3-3-5-3-2.5 0-4.5 2-4.5 4.5 0 3 2.7 5.4 6.8 9.1l2.7 2.4 2.7-2.4c4.1-3.7 6.8-6.1 6.8-9.1 0-2.5-2-4.5-4.5-4.5-2 0-4 1-5 3z"
      fill="#ef4444"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ delay: 0.6, duration: 0.4 }}
    />
  </motion.svg>
);

// Rose SVG
export const Rose = ({ size = 40 }: { size?: number }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    initial={{ scale: 0, rotate: -30 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", duration: 0.8 }}
  >
    <title>Rose</title>
    {/* Stem */}
    <motion.path
      d="M32 64V35"
      stroke="#22c55e"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
    {/* Leaf */}
    <motion.path
      d="M32 50C38 45 42 48 40 55C35 52 32 50 32 50Z"
      fill="#22c55e"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3 }}
    />
    {/* Rose petals */}
    <motion.ellipse
      cx="32"
      cy="22"
      rx="14"
      ry="18"
      fill="#e11d48"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4, type: "spring" }}
    />
    <motion.ellipse
      cx="32"
      cy="20"
      rx="10"
      ry="12"
      fill="#f43f5e"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
    />
    <motion.ellipse
      cx="32"
      cy="18"
      rx="6"
      ry="8"
      fill="#fb7185"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: "spring" }}
    />
  </motion.svg>
);

// Floating Hearts Background Component
export const FloatingHeartsSVG = ({ isPink = true }: { isPink?: boolean }) => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: 20 + Math.random() * 30,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        color: isPink
          ? ["#ec4899", "#f472b6", "#f9a8d4", "#fce7f3"][
              Math.floor(Math.random() * 4)
            ]
          : ["#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"][
              Math.floor(Math.random() * 4)
            ],
      })),
    [isPink],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: `${heart.left}%` }}
          initial={{ y: "110vh", opacity: 0, rotate: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
          >
            <title>Heart</title>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Cupid Character SVG
export const Cupid = ({ size = 100 }: { size?: number }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ type: "spring", duration: 1 }}
  >
    <title>Cupid</title>
    {/* Wings */}
    <motion.ellipse
      cx="30"
      cy="45"
      rx="20"
      ry="15"
      fill="white"
      fillOpacity="0.8"
      animate={{ scaleX: [1, 1.1, 1] }}
      transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
    />
    <motion.ellipse
      cx="70"
      cy="45"
      rx="20"
      ry="15"
      fill="white"
      fillOpacity="0.8"
      animate={{ scaleX: [1, 1.1, 1] }}
      transition={{
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        delay: 0.1,
      }}
    />
    {/* Body */}
    <circle cx="50" cy="55" r="18" fill="#fcd5ce" />
    {/* Head */}
    <circle cx="50" cy="35" r="14" fill="#fcd5ce" />
    {/* Hair */}
    <motion.path
      d="M38 28C38 22 44 18 50 18C56 18 62 22 62 28C62 28 58 26 50 26C42 26 38 28 38 28Z"
      fill="#fbbf24"
      animate={{ y: [0, -1, 0] }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
    />
    {/* Eyes */}
    <circle cx="45" cy="33" r="2" fill="#1f2937" />
    <circle cx="55" cy="33" r="2" fill="#1f2937" />
    {/* Blush */}
    <circle cx="42" cy="38" r="3" fill="#fca5a5" fillOpacity="0.6" />
    <circle cx="58" cy="38" r="3" fill="#fca5a5" fillOpacity="0.6" />
    {/* Smile */}
    <path
      d="M46 40C46 40 48 43 50 43C52 43 54 40 54 40"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Bow */}
    <motion.g
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      style={{ transformOrigin: "25px 60px" }}
    >
      <path
        d="M15 50C10 60 10 70 15 80"
        stroke="#8b5cf6"
        strokeWidth="3"
        fill="none"
      />
      <line x1="15" y1="50" x2="15" y2="80" stroke="#8b5cf6" strokeWidth="2" />
      {/* Arrow */}
      <motion.g
        initial={{ x: 0 }}
        animate={{ x: [0, 5, 0] }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2,
        }}
      >
        <line
          x1="15"
          y1="65"
          x2="40"
          y2="65"
          stroke="#f472b6"
          strokeWidth="2"
        />
        <path d="M40 65L35 60M40 65L35 70" stroke="#f472b6" strokeWidth="2" />
        <path
          d="M42 65c-0.5-1-1.5-1.5-2.5-1.5-1.25 0-2.25 1-2.25 2.25 0 1.5 1.35 2.7 3.4 4.55l1.35 1.2 1.35-1.2c2.05-1.85 3.4-3.05 3.4-4.55 0-1.25-1-2.25-2.25-2.25-1 0-2 0.5-2.5 1.5z"
          fill="#ef4444"
        />
      </motion.g>
    </motion.g>
    {/* Diaper/cloth */}
    <ellipse cx="50" cy="68" rx="12" ry="8" fill="white" />
  </motion.svg>
);

// Sparkles Background
export const SparklesBackground = () => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: 8 + Math.random() * 16,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%` }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill="#fbbf24"
          >
            <title>Sparkle</title>
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
