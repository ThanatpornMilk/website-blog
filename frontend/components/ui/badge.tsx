import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest w-fit whitespace-nowrap shrink-0 transition-all",
  {
    variants: {
      variant: {
        default: "border-transparent bg-orange-500 text-white shadow-sm",
        secondary: "border-transparent bg-stone-100 text-stone-600",
        destructive: "border-transparent bg-red-500 text-white shadow-sm",
        outline: "text-stone-600 border-stone-200 bg-white hover:bg-stone-50",
        success: "border-transparent bg-green-100 text-green-700",
        warning: "border-transparent bg-orange-100 text-orange-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
