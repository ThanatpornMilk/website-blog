import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-stone-900 placeholder:text-stone-400 dark:bg-stone-50/50 border-stone-200 h-12 w-full min-w-0 rounded-2xl border bg-stone-50 px-5 py-2 text-base shadow-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-orange-500 focus-visible:ring-orange-500/20 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
