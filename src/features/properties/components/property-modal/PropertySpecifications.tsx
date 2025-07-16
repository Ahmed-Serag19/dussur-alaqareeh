import { Building, Bed, Bath, Sofa } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Property } from "@/features/properties/types/property-response.types";

interface PropertySpecificationsProps {
  property: Property;
  isRTL: boolean;
  getPropertyConditionName: (id: number) => string;
  getFinishingTypeName: (id: number) => string;
}

export const PropertySpecifications = ({
  property,
  isRTL,
  getPropertyConditionName,
  getFinishingTypeName,
}: PropertySpecificationsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3
        className={`text-lg font-semibold flex items-center gap-2 ${
          isRTL ? "justify-start" : ""
        }`}
      >
        <Building className="h-5 w-5" />
        {t("properties.viewModal.propertySpecs")}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Bed className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-gray-900">
            {property.roomsCount}
          </div>
          <div className="text-sm text-gray-600">
            {t("properties.roomsCount")}
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Bath className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-gray-900">
            {property.bathroomsCount}
          </div>
          <div className="text-sm text-gray-600">
            {t("properties.bathroomsCount")}
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Sofa className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-gray-900">
            {property.livingroomsCount}
          </div>
          <div className="text-sm text-gray-600">
            {t("properties.livingroomsCount")}
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Building className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-gray-900">
            {property.floorsCount}
          </div>
          <div className="text-sm text-gray-600">
            {t("properties.floorsCount")}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.buildingAge")}
          </label>
          <p className="text-gray-900">
            {property.buildingAge} {isRTL ? "سنة" : "years"}
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.condition")}
          </label>
          <p className="text-gray-900">
            {getPropertyConditionName(property.conditionId)}
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            {t("properties.finishType")}
          </label>
          <p className="text-gray-900">
            {getFinishingTypeName(property.finishTypeId)}
          </p>
        </div>
      </div>
    </div>
  );
};
