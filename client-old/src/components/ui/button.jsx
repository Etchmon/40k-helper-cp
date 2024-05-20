import { cva } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("button-base", {
  variants: {
    variant: {
      default: "button-default",
    },
    size: {
      default: "button-size-default",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const Button = React.forwardRef(
  ({ className, variant, size, children, icon, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      >
        {icon && <span className="icon">{icon}</span>}
        <span className="label">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
