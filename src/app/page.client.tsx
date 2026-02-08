"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { SuccessScreen, ValentineForm } from "@/components/valentine";
import { trackNoClick, trackYesClick } from "@/lib/actions/valentine";
import type { Valentine } from "@/lib/supabase";
import { useValentineMachine } from "@/machines";
import type { Gender } from "@/machines/types";
import { StrategyProvider, useStrategy } from "@/strategies";

interface ValentineClientProps {
  readonly valentine: Valentine | null;
  readonly name: string;
  readonly gender: Gender;
}

export function ValentineClient({
  valentine,
  name,
  gender,
}: ValentineClientProps) {
  const recipientName = valentine?.recipient_name || name;

  return (
    <StrategyProvider gender={gender}>
      <ValentineContent
        recipientName={recipientName}
        shortId={valentine?.short_id}
        gender={gender}
      />
    </StrategyProvider>
  );
}

interface ValentineContentProps {
  readonly recipientName: string;
  readonly shortId?: string;
  readonly gender: Gender;
}

function ValentineContent({
  recipientName,
  shortId,
  gender,
}: ValentineContentProps) {
  const router = useRouter();
  const { state, context, send } = useValentineMachine({
    initialName: recipientName,
    initialGender: gender,
  });
  const strategy = useStrategy();

  const lastNoClickRef = useRef<number>(0);
  const lastYesClickRef = useRef<number>(0);

  const handleNextQuote = useCallback(() => {
    send({
      type: "NEXT_QUOTE",
      quotesLength: strategy.getQuotes().length,
    });
  }, [send, strategy]);

  const handleNo = useCallback(() => {
    send({
      type: "CLICK_NO",
      noMessagesLength: strategy.getNoMessages().length,
    });

    if (shortId) {
      const now = Date.now();
      if (now - lastNoClickRef.current >= 500) {
        lastNoClickRef.current = now;
        trackNoClick(shortId);
      }
    }
  }, [send, strategy, shortId]);

  const handleYes = useCallback(() => {
    send({ type: "CLICK_YES" });

    if (shortId) {
      const now = Date.now();
      if (now - lastYesClickRef.current >= 500) {
        lastYesClickRef.current = now;
        trackYesClick(shortId).then(() => {
          router.push(`/success?id=${shortId}`);
        });
      }
    }
  }, [send, shortId, router]);

  if (state.type === "ASKING") {
    return (
      <ValentineForm
        state={state}
        recipientName={context.recipientName}
        onYes={handleYes}
        onNo={handleNo}
        onNextQuote={handleNextQuote}
      />
    );
  }

  if (state.type === "ACCEPTED") {
    return <SuccessScreen recipientName={context.recipientName} />;
  }

  return null;
}
