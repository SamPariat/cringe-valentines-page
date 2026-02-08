"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface QRCodeDisplayProps {
  url: string;
}

export function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  const qrApiUrl = `/api/qr?url=${encodeURIComponent(url)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="bg-white p-3 rounded-xl shadow-lg">
        <Image
          src={qrApiUrl}
          alt="QR Code for Valentine URL"
          width={150}
          height={150}
          unoptimized
        />
      </div>
      <span className="text-white/60 text-xs">Scan to open</span>
    </motion.div>
  );
}
