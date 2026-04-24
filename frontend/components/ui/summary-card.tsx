"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Card components integrated directly
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[2rem] border border-stone-100 bg-white text-stone-900 shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-8 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

type SummaryCardProps = Readonly<{
  title: React.ReactNode;
  value: React.ReactNode;
  icon: LucideIcon;
  iconBoxClassName?: string;
  iconClassName?: string;
  className?: string;
  layout?: "default" | "dashboard";
}>;

export function SummaryCard({
  title,
  value,
  icon: Icon,
  iconBoxClassName,
  iconClassName,
  className,
  layout = "default",
}: SummaryCardProps) {
  return (
    <Card
      className={cn(
        layout === "dashboard" ? "min-h-[120px]" : "h-[100px]",
        "w-full bg-white shadow-sm hover:shadow-orange-500/5 transition-all border-stone-100",
        className
      )}
    >
      <CardContent
        className={cn(
          "flex h-full",
          layout === "dashboard"
            ? "flex-col justify-center gap-2 p-8"
            : "items-center gap-6 p-6"
        )}
      >
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl p-3 shadow-lg transition-transform hover:scale-105",
            iconBoxClassName || "bg-orange-500 text-white shadow-orange-500/20"
          )}
        >
          <Icon className={cn("h-7 w-7", iconClassName)} />
        </div>

        <div className="flex flex-col">
          <div className="text-sm font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">
            {title}
          </div>
          <div className="text-3xl font-black text-stone-900 tracking-tight leading-none">
            {value}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

