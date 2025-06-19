import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  gradient?: string;
  hoverGradient?: string;
  isLoading?: boolean;
  loadingText?: string;
}

export const GradientButton = forwardRef<
  HTMLButtonElement,
  GradientButtonProps
>(
  (
    {
      gradient = "from-blue-500 to-blue-800",
      hoverGradient = "hover:from-blue-600 hover:to-blue-950",
      isLoading = false,
      loadingText,
      children,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        className={`bg-gradient-to-r ${gradient} ${hoverGradient} text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            {loadingText || children}
          </div>
        ) : (
          children
        )}
      </Button>
    );
  }
);

GradientButton.displayName = "GradientButton";
