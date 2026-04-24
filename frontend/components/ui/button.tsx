import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/20 shadow-lg shadow-red-500/20",
        outline:
          "border border-stone-200 bg-white shadow-sm hover:bg-stone-50 hover:text-stone-900 text-stone-600",
        secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200",
        ghost: "hover:bg-stone-100 hover:text-stone-900 text-stone-600",
        link: "text-orange-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        xs: "h-6 gap-1 rounded-md px-2 text-xs",
        sm: "h-9 rounded-md gap-1.5 px-3",
        lg: "h-12 rounded-md px-8",
        icon: "size-11",
        "icon-xs": "size-6 rounded-md",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: Readonly<ButtonProps>) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
