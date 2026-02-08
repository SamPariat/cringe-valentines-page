"use client";

import { useCallback, useReducer } from "react";
import type {
  Gender,
  ValentineContext,
  ValentineEvent,
  ValentineState,
} from "./types";
import {
  createInitialContext,
  createInitialContextWithGender,
  createInitialState,
  createInitialStateWithGender,
  transition,
} from "./valentineMachine";

interface MachineState {
  state: ValentineState;
  context: ValentineContext;
}

interface UseValentineMachineOptions {
  initialName?: string;
  initialGender?: Gender;
}

export function useValentineMachine(options: UseValentineMachineOptions = {}) {
  const { initialName = "", initialGender } = options;

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
      state: initialGender
        ? createInitialStateWithGender()
        : createInitialState(),
      context: initialGender
        ? createInitialContextWithGender(initialName, initialGender)
        : createInitialContext(initialName),
    },
  );

  const send = useCallback((event: ValentineEvent) => dispatch(event), []);

  return { state, context, send };
}
