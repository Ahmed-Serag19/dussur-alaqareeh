import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
const PropertyInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      className={cn(
        "h-11 px-4 border border-gray-300 rounded-lg bg-white transition-all duration-200",
        "focus:border-blue-800 focus:ring-1 focus:ring-blue-800 focus:outline-none",
        "hover:border-gray-400",
        "disabled:bg-gray-50 disabled:text-gray-500",
        className
      )}
      {...props}
    />
  );
});

PropertyInput.displayName = "PropertyInput";

export default PropertyInput;
