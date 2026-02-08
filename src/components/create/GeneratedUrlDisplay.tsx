"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

interface GeneratedUrlDisplayProps {
  url: string;
}

export function GeneratedUrlDisplay({ url }: GeneratedUrlDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <span className="text-white/90 text-sm font-medium">
          Your Valentine URL
        </span>
        <div className="flex gap-2">
          <div className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm break-all">
            {url}
          </div>
          <Button
            variant="glass"
            size="default"
            onClick={handleCopy}
            className="shrink-0 min-w-24"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <Link href={url} target="_blank" className="self-start">
        <Button variant="outline" size="sm">
          Preview Link
        </Button>
      </Link>
    </motion.div>
  );
}
