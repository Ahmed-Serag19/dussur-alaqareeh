import { forwardRef, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import useLanguage from "@/hooks/useLanguage";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  rightIcon?: ReactNode;
  focusColor?: string;
}

export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, rightIcon, focusColor = "blue", className = "", ...props }, ref) => {
    const { isRTL } = useLanguage();

    return (
      <div className="relative group ">
        <Input
          ref={ref}
          className={`h-10 placeholder:py-3  ${
            isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
          } ${
            rightIcon ? (isRTL ? "pl-10" : "pr-10") : ""
          } border-2 border-gray-200 rounded-xl bg-gray-50/50 transition-all duration-200 focus:border-${focusColor}-500 focus:bg-white focus:ring-4 focus:ring-${focusColor}-500/10 hover:border-gray-300 ${
            isRTL ? "text-right" : "text-left"
          } ${className}`}
          {...props}
        />
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-${focusColor}-500 transition-colors ${
            isRTL ? "right-3" : "left-3"
          }`}
        >
          {icon}
        </div>
        {rightIcon && (
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              isRTL ? "left-3" : "right-3"
            }`}
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";
