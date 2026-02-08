"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Gender, GenderStrategy } from "./types";
import { FemaleAskerStrategy } from "./FemaleAskerStrategy";
import { MaleAskerStrategy } from "./MaleAskerStrategy";

const StrategyContext = createContext<GenderStrategy | null>(null);

export function useStrategy(): GenderStrategy {
  const strategy = useContext(StrategyContext);
  if (!strategy) {
    throw new Error("useStrategy must be used within StrategyProvider");
  }
  return strategy;
}

interface StrategyProviderProps {
  readonly gender: Gender;
  readonly children: ReactNode;
}

export function StrategyProvider({ gender, children }: StrategyProviderProps) {
  const strategy = useMemo(() => {
    return gender === "female"
      ? new FemaleAskerStrategy()
      : new MaleAskerStrategy();
  }, [gender]);

  return (
    <StrategyContext.Provider value={strategy}>
      {children}
    </StrategyContext.Provider>
  );
}
