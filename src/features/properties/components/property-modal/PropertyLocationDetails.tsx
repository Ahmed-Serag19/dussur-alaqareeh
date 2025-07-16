import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Property } from "@/features/properties/types/property-response.types";

interface PropertyLocationDetailsProps {
  property: Property;
  isRTL: boolean;
  getRegionName: (id: number) => string;
  getCityName: (id: number) => string;
  getNeighborhoodName: (id: number) => string;
  getFullLocationString: (
    regionId: number,
    cityId: number,
    neighborhoodId: number
  ) => string;
}

export const PropertyLocationDetails = ({
  property,
  isRTL,
  getRegionName,
  getCityName,
  getNeighborhoodName,
  getFullLocationString,
}: PropertyLocationDetailsProps) => {
  const { t } = useTranslation();

  const formatCoordinates = (
    lat: number | undefined,
    lng: number | undefined
  ) => {
    if (typeof lat === "number" && typeof lng === "number") {
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
    return "-";
  };

  return (
    <div className="space-y-4">
      <h3
        className={`text-lg font-semibold flex items-center gap-2 ${
          isRTL ? "justify-start" : ""
        }`}
      >
        <MapPin className="h-5 w-5" />
        {t("properties.viewModal.locationDetails")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.region")}
          </label>
          <p className="text-gray-900">{getRegionName(property.regionId)}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.city")}
          </label>
          <p className="text-gray-900">{getCityName(property.cityId)}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.neighborhood")}
          </label>
          <p className="text-gray-900">
            {getNeighborhoodName(property.neighborhoodId)}
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {isRTL ? "العنوان الكامل" : "Full Address"}
          </label>
          <p className="text-gray-900">
            {getFullLocationString(
              property.regionId,
              property.cityId,
              property.neighborhoodId
            )}
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.streetAr")}
          </label>
          <p className="text-gray-900">{property.streetAr || "غير محدد"}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.streetEn")}
          </label>
          <p className="text-gray-900">
            {property.streetEn || "Not specified"}
          </p>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.viewModal.coordinates")}
          </label>
          <p className="text-gray-900 font-mono text-sm">
            {formatCoordinates(property.latitude, property.longitude)}
          </p>
        </div>
      </div>
    </div>
  );
};
