
import type React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PropertySelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const PropertySelect = ({
  className,
  children,
  ...props
}: PropertySelectProps) => {
  return (
    <Select {...props}>
      <SelectTrigger
        className={cn(
          "h-11 px-4 border border-gray-300 rounded-lg bg-white transition-all duration-200",
          "focus:border-blue-800 focus:ring-1 focus:ring-blue-800 focus:outline-none",
          "hover:border-gray-400 cursor-pointer",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          "data-[placeholder]:text-gray-500",
          className
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
        {children}
      </SelectContent>
    </Select>
  );
};

const PropertySelectItem = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  value: string;
}) => {
  return (
    <SelectItem
      className="px-4 py-2 cursor-pointer hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-150"
      {...props}
    >
      {children}
    </SelectItem>
  );
};

export { PropertySelect, PropertySelectItem };
