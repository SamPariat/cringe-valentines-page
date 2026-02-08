"use client";

import { SuccessScreen } from "@/components/valentine";
import type { Gender } from "@/machines/types";
import { StrategyProvider } from "@/strategies";

interface SuccessClientProps {
  readonly recipientName: string;
  readonly gender: Gender;
}

export function SuccessClient({ recipientName, gender }: SuccessClientProps) {
  return (
    <StrategyProvider gender={gender}>
      <SuccessScreen recipientName={recipientName} />
    </StrategyProvider>
  );
}
