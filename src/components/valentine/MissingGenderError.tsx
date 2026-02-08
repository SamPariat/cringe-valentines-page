"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MissingGenderErrorProps {
  readonly recipientName?: string;
}

export function MissingGenderError({ recipientName }: MissingGenderErrorProps) {
  return (
    <div className="min-h-dvh bg-linear-to-br from-violet-500 via-fuchsia-400 to-cyan-400 flex items-center justify-center p-4 sm:p-6 animate-gradient overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="text-center">
          <motion.div
            className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-linear-to-br from-pink-400 to-violet-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg"
            animate={{ rotate: [12, -12, 12] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-3xl -rotate-12">💔</span>
          </motion.div>

          <CardHeader className="pt-8">
            <CardTitle className="text-3xl sm:text-4xl md:text-5xl bg-linear-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
              {recipientName ? `oops ${recipientName}!` : "oops!"}
            </CardTitle>
            <p className="text-white/80 text-base sm:text-lg font-light mt-2">
              looks like this link is incomplete
            </p>
            <p className="text-white/60 text-sm mt-1">
              someone needs to create a proper valentine for you first
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 pt-8">
            <Link href="/create">
              <Button
                variant="pink"
                size="xl"
                className="w-full text-lg sm:text-xl"
              >
                Create a Valentine
              </Button>
            </Link>

            <p className="text-white/40 text-xs sm:text-sm mt-4">
              make your own and share the love
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
