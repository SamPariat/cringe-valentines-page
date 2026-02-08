import type {
  Gender,
  ValentineContext,
  ValentineEvent,
  ValentineState,
} from "./types";

const INITIAL_ASKING_STATE: ValentineState = {
  type: "ASKING",
  quoteIndex: 0,
  noMessageIndex: 0,
  noOpacity: 1,
  exclamations: 1,
  heartBeat: 0,
};

export function createInitialState(): ValentineState {
  return { type: "GENDER_SELECTION" };
}

export function createInitialStateWithGender(): ValentineState {
  return INITIAL_ASKING_STATE;
}

export function createInitialContext(recipientName = ""): ValentineContext {
  return {
    gender: null,
    recipientName,
  };
}

export function createInitialContextWithGender(
  recipientName: string,
  gender: Gender,
): ValentineContext {
  return {
    gender,
    recipientName,
  };
}

export function transition(
  state: ValentineState,
  event: ValentineEvent,
  context: ValentineContext,
): [ValentineState, ValentineContext] {
  switch (state.type) {
    case "GENDER_SELECTION":
      if (event.type === "SELECT_GENDER") {
        return [INITIAL_ASKING_STATE, { ...context, gender: event.gender }];
      }
      break;

    case "ASKING":
      switch (event.type) {
        case "CLICK_YES":
          return [{ type: "ACCEPTED" }, context];

        case "CLICK_NO":
          return [
            {
              ...state,
              noMessageIndex:
                (state.noMessageIndex + 1) % event.noMessagesLength,
              noOpacity: Math.max(state.noOpacity - 0.05, 0),
              exclamations: state.exclamations + 1,
              heartBeat: state.heartBeat + 1,
            },
            context,
          ];

        case "NEXT_QUOTE":
          return [
            {
              ...state,
              quoteIndex: (state.quoteIndex + 1) % event.quotesLength,
            },
            context,
          ];
      }
      break;

    case "ACCEPTED":
      if (event.type === "RESET") {
        return [
          { type: "GENDER_SELECTION" },
          { gender: null, recipientName: "" },
        ];
      }
      break;
  }

  return [state, context];
}
