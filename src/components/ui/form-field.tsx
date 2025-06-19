import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import useLanguage from "@/hooks/useLanguage";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export const FormField = ({
  label,
  htmlFor,
  error,
  required,
  children,
}: FormFieldProps) => {
  const { isRTL } = useLanguage();

  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={htmlFor}
        className={`block text-sm font-semibold text-gray-700 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <p
          className={`text-xs text-red-500 font-medium mt-1 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
};
