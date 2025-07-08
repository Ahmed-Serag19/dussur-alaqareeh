import { Home, Ruler } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Property } from "@/features/properties/types/property-response.types";

interface PropertyGeneralInfoProps {
  property: Property;
  isRTL: boolean;
  getPropertyTypeName: (id: number) => string;
  getListingTypeName: (id: number) => string;
}

export const PropertyGeneralInfo = ({
  property,
  isRTL,
  getPropertyTypeName,
  getListingTypeName,
}: PropertyGeneralInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3
        className={`text-lg font-semibold flex items-center gap-2 ${
          isRTL ? "justify-end" : ""
        }`}
      >
        <Home className="h-5 w-5" />
        {t("properties.viewModal.generalInfo")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.title")}
          </label>
          <p className="text-gray-900">{property.title}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.area")}
          </label>
          <p
            className={`text-gray-900 flex items-center gap-1 ${
              isRTL ? "justify-end" : ""
            }`}
          >
            {property.area} {isRTL ? "متر مربع" : "sqm"}
            <Ruler className="h-4 w-4" />
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.propertyType")}
          </label>
          <p className="text-gray-900">
            {getPropertyTypeName(property.propertyTypeId)}
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.listingType")}
          </label>
          <p className="text-gray-900">
            {getListingTypeName(property.listingTypeId)}
          </p>
        </div>
        {property.descriptionAr && (
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-500">
              {t("properties.descriptionAr")}
            </label>
            <p className="text-gray-900 leading-relaxed">
              {property.descriptionAr}
            </p>
          </div>
        )}
        {property.descriptionEn && (
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-500">
              {t("properties.descriptionEn")}
            </label>
            <p className="text-gray-900 leading-relaxed">
              {property.descriptionEn}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
