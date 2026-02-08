"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";
import {
  Cupid,
  CupidArrow,
  FloatingHeartsSVG,
  Rose,
  SparklesBackground,
} from "@/components/animated-svgs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ValentineState } from "@/machines/types";
import { useStrategy } from "@/strategies";
import { TypewriterText } from "./TypewriterText";

interface ValentineFormProps {
  readonly state: Extract<ValentineState, { type: "ASKING" }>;
  readonly recipientName: string;
  readonly onYes: () => void;
  readonly onNo: () => void;
  readonly onNextQuote: () => void;
}

export function ValentineForm({
  state,
  recipientName,
  onYes,
  onNo,
  onNextQuote,
}: ValentineFormProps) {
  const strategy = useStrategy();
  const quotes = strategy.getQuotes();
  const noMessages = strategy.getNoMessages();
  const isPink = strategy.getAccentColor() === "pink";

  // Auto-cycle quotes every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      onNextQuote();
    }, 3500);
    return () => clearInterval(interval);
  }, [onNextQuote]);

  const handleNoClick = useCallback(() => {
    onNo();
  }, [onNo]);

  const bgGradient = strategy.getGradientClasses();

  return (
    <div
      className={`min-h-dvh bg-linear-to-br ${bgGradient} flex items-center justify-center p-4 sm:p-6 animate-gradient overflow-hidden relative`}
    >
      <FloatingHeartsSVG isPink={isPink} />
      <SparklesBackground />

      {/* Cupid in corner */}
      <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-20 hidden sm:block">
        <Cupid size={80} />
      </div>

      {/* Decorative elements */}
      <div className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 hidden sm:block">
        <Rose size={50} />
      </div>
      <div className="fixed top-4 left-4 sm:top-8 sm:left-8 z-20 hidden md:block">
        <CupidArrow size={50} />
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-10 w-full max-w-xl"
      >
        <Card>
          <div className="text-center">
            <motion.div
              className="relative inline-block mb-2 sm:mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-6xl sm:text-7xl">💘</span>
              <motion.span
                className={`absolute -right-1 -top-1 w-3 h-3 sm:w-4 sm:h-4 ${isPink ? "bg-pink-300" : "bg-blue-300"} rounded-full`}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            <p className="text-white/60 text-xs sm:text-sm mb-2 tracking-widest uppercase">
              {strategy.getFormSubtitle()}
            </p>

            {recipientName && (
              <h1 className="font-romantic text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                Hey {recipientName} 👋
              </h1>
            )}
            <h1 className="font-romantic text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 leading-tight">
              Will You Be My
            </h1>
            <h2
              className={`font-romantic text-4xl sm:text-5xl md:text-6xl font-bold ${isPink ? "text-pink-200" : "text-cyan-200"} mb-6`}
            >
              Valentine? 👉👈
            </h2>

            <div
              className={`${strategy.getAccentBgClass()} rounded-2xl p-4 sm:p-6 mb-4 backdrop-blur-sm min-h-25 sm:min-h-30 flex items-center justify-center`}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={state.quoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-white/90 text-sm sm:text-base md:text-lg font-light leading-relaxed"
                >
                  "<TypewriterText text={quotes[state.quoteIndex]} />"
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
              <span
                className={`text-xs ${isPink ? "text-pink-200/60" : "text-cyan-200/60"}`}
              >
                auto-cringe every 3.5s 💀
              </span>
              <motion.span
                className="text-sm"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                🔄
              </motion.span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative min-h-30 sm:min-h-25">
              <motion.div
                key={state.heartBeat}
                animate={{
                  scale: [1, 1.15, 1, 1.1, 1],
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="relative group"
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
                <Button
                  variant={strategy.getButtonVariant()}
                  size="lg"
                  onClick={onYes}
                  className="min-w-35 sm:min-w-40 text-base sm:text-lg font-bold relative"
                >
                  Yes{"!".repeat(state.exclamations)}{" "}
                  {strategy.getYesButtonEmoji()}
                </Button>
              </motion.div>

              <AnimatePresence>
                {state.noOpacity > 0 && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: state.noOpacity, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleNoClick}
                      className="min-w-30 text-base"
                    >
                      {noMessages[state.noMessageIndex]}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-white/40 mt-6 sm:mt-8 text-xs sm:text-sm">
              {strategy.getHintText(state.noOpacity > 0)}
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
