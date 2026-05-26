import * ;

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, >(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
