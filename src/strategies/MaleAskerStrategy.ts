import { noMessagesForHer } from "@/data/messages/noMessagesForHer";
import { quotesForHer } from "@/data/quotes/forHer";
import type { GenderStrategy } from "./types";

export class MaleAskerStrategy implements GenderStrategy {
  readonly gender = "male" as const;

  getQuotes(): readonly string[] {
    return quotesForHer;
  }

  getNoMessages(): readonly string[] {
    return noMessagesForHer;
  }

  getGradientClasses(): string {
    return "from-blue-500 via-cyan-400 to-indigo-500";
  }

  getAccentColor(): "blue" {
    return "blue";
  }

  getButtonVariant(): "glassBlue" {
    return "glassBlue";
  }

  getAccentBgClass(): string {
    return "bg-blue-600/20";
  }

  getSuccessEmojis(): readonly string[] {
    return ["🔥", "🥹", "💙", "✨", "🏆"];
  }

  getSuccessTitle(): string {
    return "LETS GOOOO 🔥";
  }

  getSuccessSubtitle(name?: string): string {
    return name
      ? `${name.toUpperCase()} SAID YES 😭🏆`
      : "SHE ACTUALLY SAID YES 😭🏆";
  }

  getSuccessFooter(): string {
    return "you understood the assignment king 👑";
  }

  getFormSubtitle(): string {
    return "okay here goes nothing bro 😳";
  }

  getHintText(noButtonVisible: boolean): string {
    return noButtonVisible
      ? "psst... keep clicking no and watch it disappear like her red flags 🙈"
      : "the no button left the chat... take the hint bro 🏆";
  }

  getScreenshotHint(): string {
    return "(the boys need to see this W)";
  }

  getYesButtonEmoji(): string {
    return "🥺💙";
  }

  getConfettiEmojis(): readonly string[] {
    return ["🎉", "🎊", "💙", "✨", "⭐", "🥳", "🏆", "💪", "🔥", "👑"];
  }
}
