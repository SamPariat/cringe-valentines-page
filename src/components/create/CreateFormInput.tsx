"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CreateFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export const CreateFormInput = forwardRef<
  HTMLInputElement,
  CreateFormInputProps
>(({ label, hint, className, ...props }, ref) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-white/90 text-sm font-medium">{label}</span>
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl",
          "bg-white/20 backdrop-blur-sm border border-white/30",
          "text-white placeholder:text-white/50",
          "focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent",
          "transition-all duration-200",
          className,
        )}
        {...props}
      />
      {hint && <span className="text-white/50 text-xs">{hint}</span>}
    </label>
  );
});
CreateFormInput.displayName = "CreateFormInput";
