"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Property } from "@/features/properties/types/property-response.types";
import { useLookupData } from "@/features/properties/hooks/useLookupData";
import useLanguage from "@/hooks/useLanguage";

// Import the smaller components
import { PropertyHeader } from "./property-modal/PropertyHeader";
import { PropertyPriceSection } from "./property-modal/PropertyPriceSection";
import { PropertyGeneralInfo } from "./property-modal/PropertyGeneralInfo";
import { PropertyLocationDetails } from "./property-modal/PropertyLocationDetails";
import { PropertySpecifications } from "./property-modal/PropertySpecifications";
import { PropertySystemInfo } from "./property-modal/PropertySystemInfo";

interface PropertyViewModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (property: Property) => void;
}

export const PropertyViewModal = ({
  property,
  isOpen,
  onClose,
  onEdit,
}: PropertyViewModalProps) => {
  const { isRTL } = useLanguage();
  const {
    getRegionName,
    getCityName,
    getNeighborhoodName,
    getPropertyTypeName,
    getListingTypeName,
    getPropertyConditionName,
    getFinishingTypeName,
    getFullLocationString,
  } = useLookupData();

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-4xl max-h-[90vh] py-2 px-0 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">{property.title}</DialogTitle>
          <PropertyHeader
            property={property}
            isRTL={isRTL}
            onEdit={onEdit}
            onClose={onClose}
          />
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            <PropertyPriceSection price={property.price} isRTL={isRTL} />

            <PropertyGeneralInfo
              property={property}
              isRTL={isRTL}
              getPropertyTypeName={getPropertyTypeName}
              getListingTypeName={getListingTypeName}
            />

            <Separator />

            <PropertyLocationDetails
              property={property}
              isRTL={isRTL}
              getRegionName={getRegionName}
              getCityName={getCityName}
              getNeighborhoodName={getNeighborhoodName}
              getFullLocationString={getFullLocationString}
            />

            <Separator />

            <PropertySpecifications
              property={property}
              isRTL={isRTL}
              getPropertyConditionName={getPropertyConditionName}
              getFinishingTypeName={getFinishingTypeName}
            />

            <Separator />

            <PropertySystemInfo property={property} isRTL={isRTL} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
