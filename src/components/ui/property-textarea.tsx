import { forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const PropertyTextarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      className={cn(
        "px-4 py-3 border border-gray-300 rounded-lg bg-white transition-all duration-200 resize-none",
        "focus:border-blue-800 focus:ring-1 focus:ring-blue-800 focus:outline-none",
        "hover:border-gray-400",
        "disabled:bg-gray-50 disabled:text-gray-500",
        className
      )}
      {...props}
    />
  );
});

PropertyTextarea.displayName = "PropertyTextarea";

export default PropertyTextarea;
