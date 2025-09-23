import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PropertyStatusBadge } from "../PropertyStatusBadge";
import { useTranslation } from "react-i18next";
import type { Property } from "@/features/properties/types/property-response.types";

interface PropertyHeaderProps {
  property: Property;
  isRTL: boolean;
  onClose: () => void;
}

export const PropertyHeader = ({
  property,
  isRTL,

  onClose,
}: PropertyHeaderProps) => {
  const { i18n } = useTranslation();

  return (
    <div
      className={`flex items-start justify-between ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex items-center gap-2 ${isRTL ? "" : "flex-row-reverse"}`}
      >
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <h2
          className={`text-2xl font-bold mb-2 ${
            i18n.language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {property.title}
        </h2>
        <div
          className={`flex items-center gap-2 ${
            isRTL ? "" : "flex-row-reverse"
          }`}
        >
          <PropertyStatusBadge status={property.status} />
        </div>
      </div>
    </div>
  );
};
