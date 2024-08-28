import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const formVariants = cva("grid gap-4", {
  variants: {
    variant: {
      default: "bg-blue text-crust shadow hover:bg-blue/90",
    },
    size: {
      default: "h-9 px-6 py-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> &
  VariantProps<typeof formVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
  };

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, variant, size, children, icon, ...props }, ref) => {
    return (
      <form
        className={formVariants({ variant, size, className })}
        ref={ref}
        {...props}
      >
        {icon && <span className="icon">{icon}</span>}
        <span className="label">{children}</span>
      </form>
    );
  }
);

Form.displayName = "Form";

export { Form, formVariants };
