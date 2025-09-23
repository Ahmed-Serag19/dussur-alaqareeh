import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area"; // Remove this
import type { Property } from "@/features/properties/types/property-response.types";
import useLanguage from "@/hooks/useLanguage";
import { useLookupContext } from "../context/lookup-context";

// Import the smaller components
import { PropertyHeader } from "./property-modal/PropertyHeader";
import { PropertyPriceSection } from "./property-modal/PropertyPriceSection";
import { PropertyGeneralInfo } from "./property-modal/PropertyGeneralInfo";
import { PropertyLocationDetails } from "./property-modal/PropertyLocationDetails";
import { PropertySpecifications } from "./property-modal/PropertySpecifications";
import { PropertySystemInfo } from "./property-modal/PropertySystemInfo";
import { PropertyFeaturesView } from "./property-modal/PropertyFeaturesView";
import { ImageCarousel } from "./ImageCarousel";

interface PropertyViewModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyViewModal = ({
  property,
  isOpen,
  onClose,
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
  } = useLookupContext();

  if (!property) return null;

  // Use all images for the modal carousel
  const images = Array.isArray(property.imageUrls) ? property.imageUrls : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-5xl w-full sm:w-[95vw] md:w-[90vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[60vw] max-h-[90vh] p-0 overflow-auto flex flex-col ${
          isRTL ? "text-right" : "text-left"
        }`}
        style={{ padding: 0 }}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">{property.title}</DialogTitle>
          <PropertyHeader property={property} isRTL={isRTL} onClose={onClose} />
        </DialogHeader>

        {/* Image Carousel at the top */}
        <div className="pt-2 pb-4">
          <ImageCarousel images={images} heightClass="h-80" />
        </div>

        {/* Main content scrollable area - now just a normal div */}
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

          <PropertyFeaturesView property={property} isRTL={isRTL} />

          <Separator />

          <PropertySystemInfo property={property} isRTL={isRTL} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
