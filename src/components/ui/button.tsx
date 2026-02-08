import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outline"
    | "pink"
    | "blue"
    | "glass"
    | "glassPink"
    | "glassBlue";
  size?: "default" | "sm" | "lg" | "xl";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";

    const variants = {
      default:
        "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl hover:scale-105",
      outline:
        "border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20",
      pink: "bg-linear-to-r from-pink-500 via-rose-400 to-pink-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-[1.02]",
      blue: "bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]",
      glass:
        "bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg shadow-black/10 hover:bg-white/30 hover:scale-105",
      glassPink:
        "bg-pink-200/20 backdrop-blur-md border border-pink-200/40 text-white shadow-lg shadow-pink-500/20 hover:bg-pink-200/30 hover:scale-105",
      glassBlue:
        "bg-cyan-200/20 backdrop-blur-md border border-cyan-200/40 text-white shadow-lg shadow-blue-500/20 hover:bg-cyan-200/30 hover:scale-105",
    };

    const sizes = {
      default: "h-12 px-6 py-3 text-base",
      sm: "h-10 rounded-xl px-4 text-sm",
      lg: "h-14 rounded-2xl px-8 text-lg",
      xl: "h-16 rounded-3xl px-10 text-xl",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
