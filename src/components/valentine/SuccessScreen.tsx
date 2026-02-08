"use client";

import { motion } from "motion/react";
import {
  Cupid,
  FloatingHeartsSVG,
  LoveLetter,
  SparklesBackground,
} from "@/components/animated-svgs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStrategy } from "@/strategies";
import { Confetti } from "./Confetti";

interface SuccessScreenProps {
  readonly recipientName: string;
}

export function SuccessScreen({ recipientName }: SuccessScreenProps) {
  const strategy = useStrategy();
  const isPink = strategy.getAccentColor() === "pink";
  const bgGradient = strategy.getGradientClasses();

  return (
    <div
      className={`min-h-dvh bg-linear-to-br ${bgGradient} flex items-center justify-center p-4 sm:p-6 animate-gradient overflow-hidden relative`}
    >
      <FloatingHeartsSVG isPink={isPink} />
      <SparklesBackground />
      <Confetti emojis={[...strategy.getConfettiEmojis()]} />

      {/* Decorative Cupid */}
      <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-20">
        <Cupid size={70} />
      </div>
      <div className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 hidden sm:block">
        <LoveLetter size={60} />
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="text-center">
          <CardHeader>
            <motion.div
              className="text-7xl sm:text-8xl mb-4"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            >
              🎉
            </motion.div>

            <CardTitle className="text-4xl sm:text-5xl md:text-6xl">
              {strategy.getSuccessTitle()}
            </CardTitle>

            <p className="text-white/90 text-lg sm:text-xl mt-4">
              {strategy.getSuccessSubtitle(recipientName)}
            </p>
            <p className="text-white/70 text-base sm:text-lg mt-2">
              {isPink
                ? "this is literally my roman empire now bestie"
                : "this is literally my roman empire now bro"}
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center gap-1 sm:gap-2 mb-6">
              {strategy.getSuccessEmojis().map((emoji, i) => (
                <motion.span
                  key={`${emoji}-${i + 1}`}
                  className="text-3xl sm:text-4xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>

            <div
              className={`${strategy.getAccentBgClass().replace("/20", "/30")} rounded-2xl p-4 backdrop-blur-sm`}
            >
              <p className="text-white/90 text-sm sm:text-base font-medium">
                📸 SCREENSHOT THIS AND SEND IT RN
              </p>
              <p className="text-white/60 text-xs sm:text-sm mt-1">
                {strategy.getScreenshotHint()}
              </p>
            </div>

            <p className="text-white/50 text-xs mt-6">
              {strategy.getSuccessFooter()}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
