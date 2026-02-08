export type Gender = "male" | "female";

export type ValentineState =
  | { type: "GENDER_SELECTION" }
  | {
      type: "ASKING";
      quoteIndex: number;
      noMessageIndex: number;
      noOpacity: number;
      exclamations: number;
      heartBeat: number;
    }
  | { type: "ACCEPTED" };

export type ValentineEvent =
  | { type: "SELECT_GENDER"; gender: Gender }
  | { type: "CLICK_YES" }
  | { type: "CLICK_NO"; noMessagesLength: number }
  | { type: "NEXT_QUOTE"; quotesLength: number }
  | { type: "RESET" };

export interface ValentineContext {
  gender: Gender | null;
  recipientName: string;
}
