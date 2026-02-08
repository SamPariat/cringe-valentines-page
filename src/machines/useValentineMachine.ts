"use client";

import { useReducer, useCallback } from "react";
import {
  createInitialState,
  createInitialContext,
  transition,
} from "./valentineMachine";
import type { ValentineState, ValentineEvent, ValentineContext } from "./types";

interface MachineState {
  state: ValentineState;
  context: ValentineContext;
}

export function useValentineMachine(initialName = "") {
  const [{ state, context }, dispatch] = useReducer(
    (current: MachineState, event: ValentineEvent): MachineState => {
      const [newState, newContext] = transition(
        current.state,
        event,
        current.context,
      );
      return { state: newState, context: newContext };
    },
    {
      state: createInitialState(),
      context: createInitialContext(initialName),
    },
  );

  const send = useCallback((event: ValentineEvent) => dispatch(event), []);

  return { state, context, send };
}
