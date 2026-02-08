"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useValentineMachine } from "@/machines";
import { StrategyProvider, useStrategy } from "@/strategies";
import {
  GenderSelection,
  SuccessScreen,
  ValentineForm,
} from "@/components/valentine";

export default function Home() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || searchParams.get("n") || "";

  const { state, context, send } = useValentineMachine(name.trim());

  // Gender selection screen - no strategy needed yet
  if (state.type === "GENDER_SELECTION") {
    return (
      <GenderSelection
        displayName={name.trim()}
        onSelect={(gender) => send({ type: "SELECT_GENDER", gender })}
      />
    );
  }

  // Once gender is selected, wrap in strategy provider
  if (!context.gender) return null;

  return (
    <StrategyProvider gender={context.gender}>
      <ValentineContentWithStrategy
        state={state}
        context={context}
        send={send}
      />
    </StrategyProvider>
  );
}

interface ValentineContentWithStrategyProps {
  readonly state: ReturnType<typeof useValentineMachine>["state"];
  readonly context: ReturnType<typeof useValentineMachine>["context"];
  readonly send: ReturnType<typeof useValentineMachine>["send"];
}

function ValentineContentWithStrategy({
  state,
  context,
  send,
}: ValentineContentWithStrategyProps) {
  const strategy = useStrategy();

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
  }, [send, strategy]);

  if (state.type === "ASKING") {
    return (
      <ValentineForm
        state={state}
        recipientName={context.recipientName}
        onYes={() => send({ type: "CLICK_YES" })}
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
