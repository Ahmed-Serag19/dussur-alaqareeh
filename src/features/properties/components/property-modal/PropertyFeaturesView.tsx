import { BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Property } from "@/features/properties/types/property-response.types";
import { useLookupContext } from "../../context/lookup-context";

interface Props {
  property: Property;
  isRTL: boolean;
}

export const PropertyFeaturesView = ({ property, isRTL }: Props) => {
  const { t } = useTranslation();
  const { propertyFeatures } = useLookupContext();
  const featureIds: number[] = Array.isArray(property.features)
    ? property.features
    : [];

  if (!featureIds.length) return null;

  // Map feature IDs to feature objects, filter out undefined
  const features = featureIds
    .map((id) => propertyFeatures.find((f) => f.id === id))
    .filter((f): f is { id: number; nameAr: string; nameEn: string } => !!f);

  return (
    <div className="space-y-4">
      <h3
        className={`text-lg font-semibold flex items-center gap-2 ${
          isRTL ? "justify-start" : ""
        }`}
      >
        <BadgeCheck className="h-5 w-5" />
        {t("properties.features.title")}
      </h3>

      <div className={`flex flex-wrap gap-2  ${isRTL ? "justify-start" : ""}`}>
        {features.map((feature) => (
          <span
            key={feature.id}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {isRTL ? feature.nameAr : feature.nameEn}
          </span>
        ))}
      </div>
    </div>
  );
};
