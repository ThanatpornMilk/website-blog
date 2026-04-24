import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-stone-400 dark:bg-stone-50/50 border-stone-200 w-full min-w-0 rounded-2xl border bg-stone-50 px-5 py-3 text-base shadow-sm transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
        "focus-visible:border-orange-500 focus-visible:ring-orange-500/20 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
