import type { GenderStrategy } from "./types";
import { quotesForHim } from "@/data/quotes/forHim";
import { noMessagesForHim } from "@/data/messages/noMessagesForHim";

export class FemaleAskerStrategy implements GenderStrategy {
  readonly gender = "female" as const;

  getQuotes(): readonly string[] {
    return quotesForHim;
  }

  getNoMessages(): readonly string[] {
    return noMessagesForHim;
  }

  getGradientClasses(): string {
    return "from-pink-500 via-rose-400 to-fuchsia-500";
  }

  getAccentColor(): "pink" {
    return "pink";
  }

  getButtonVariant(): "glassPink" {
    return "glassPink";
  }

  getAccentBgClass(): string {
    return "bg-pink-600/20";
  }

  getSuccessEmojis(): readonly string[] {
    return ["💕", "🥹", "💗", "✨", "💖"];
  }

  getSuccessTitle(): string {
    return "LETS GOOOO 💅";
  }

  getSuccessSubtitle(name?: string): string {
    return name
      ? `${name.toUpperCase()} SAID YES 😭💕`
      : "THEY ACTUALLY SAID YES 😭💕";
  }

  getSuccessFooter(): string {
    return "you understood the assignment fr fr 💅";
  }

  getFormSubtitle(): string {
    return "okay here goes nothing bestie 😳";
  }

  getHintText(noButtonVisible: boolean): string {
    return noButtonVisible
      ? "psst... keep clicking no and watch it fade away like his excuses 🙈"
      : "the no button gave up... just like you should give in 💅";
  }

  getScreenshotHint(): string {
    return "(do it for the plot bestie)";
  }

  getYesButtonEmoji(): string {
    return "🥺💖";
  }

  getConfettiEmojis(): readonly string[] {
    return ["🎉", "🎊", "💖", "✨", "💕", "🥳", "💗", "🩷", "💅", "👑"];
  }
}
