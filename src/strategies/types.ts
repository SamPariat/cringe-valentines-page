import type { Gender } from "@/machines/types";

export type { Gender };

export interface GenderStrategy {
  readonly gender: Gender;

  // Content
  getQuotes(): readonly string[];
  getNoMessages(): readonly string[];

  // Styling
  getGradientClasses(): string;
  getAccentColor(): "pink" | "blue";
  getButtonVariant(): "glassPink" | "glassBlue";
  getAccentBgClass(): string;

  // Copy/Text
  getSuccessEmojis(): readonly string[];
  getSuccessTitle(): string;
  getSuccessSubtitle(name?: string): string;
  getSuccessFooter(): string;
  getFormSubtitle(): string;
  getHintText(noButtonVisible: boolean): string;
  getScreenshotHint(): string;
  getYesButtonEmoji(): string;

  // Confetti
  getConfettiEmojis(): readonly string[];
}
