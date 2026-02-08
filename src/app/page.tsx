"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  MissingGenderError,
  SuccessScreen,
  ValentineForm,
} from "@/components/valentine";
import { parseGenderParam } from "@/lib/parseGenderParam";
import { useValentineMachine } from "@/machines";
import { StrategyProvider, useStrategy } from "@/strategies";

export default function Home() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || searchParams.get("n") || "";
  const gender = useMemo(() => parseGenderParam(searchParams), [searchParams]);

  // If no gender provided, show error page
  if (!gender) {
    return <MissingGenderError recipientName={name.trim() || undefined} />;
  }

  return (
    <StrategyProvider gender={gender}>
      <ValentineContent name={name.trim()} gender={gender} />
    </StrategyProvider>
  );
}

interface ValentineContentProps {
  readonly name: string;
  readonly gender: NonNullable<ReturnType<typeof parseGenderParam>>;
}

function ValentineContent({ name, gender }: ValentineContentProps) {
  const { state, context, send } = useValentineMachine({
    initialName: name,
    initialGender: gender,
  });
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
