import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-crust disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] touch-manipulation select-none",
  {
    variants: {
      variant: {
        default: "bg-blue text-crust shadow-md hover:shadow-lg hover:bg-blue/90 active:bg-blue/80",
        link: "text-blue underline-offset-4 hover:underline active:text-blue/80",
        ghost: "bg-transparent hover:bg-surface0 text-text active:bg-surface1",
        outline: "border-2 border-surface0 bg-transparent hover:bg-surface0/50 text-text active:bg-surface0",
        destructive: "bg-red text-crust hover:bg-red/90 active:bg-red/80",
      },
      size: {
        default: "min-h-[48px] h-12 px-6 py-3 text-base",
        sm: "min-h-[40px] h-10 rounded-md px-4 text-sm",
        lg: "min-h-[56px] h-14 rounded-lg px-8 text-lg",
        icon: "size-12 min-w-[48px] min-h-[48px]",
        "icon-sm": "size-10 min-w-[40px] min-h-[40px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, icon, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      >
        {icon && <span className="icon mr-2">{icon}</span>}
        <span className="label">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
