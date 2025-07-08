import type { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { useLookupData } from "@/features/properties/hooks/useLookupData";
import useLanguage from "@/hooks/useLanguage";
import { Checkbox } from "@/components/ui/checkbox";
import type { CreatePropertyFormData } from "../types/property.types";

interface Props {
  watch: UseFormWatch<CreatePropertyFormData>;
  setValue: UseFormSetValue<CreatePropertyFormData>;
}

const PropertyFeaturesSection = ({ watch, setValue }: Props) => {
  const { t, currentLanguage } = useLanguage();
  const { propertyFeatures } = useLookupData();
  const selectedFeatures: number[] = watch("featureIds") || [];

  const toggleFeature = (id: number) => {
    const current = new Set(selectedFeatures);
    current.has(id) ? current.delete(id) : current.add(id);
    setValue("featureIds", Array.from(current));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        {t("properties.features.title")}
      </h2>
      <p className="text-gray-500">{t("properties.features.subtitle")}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto border p-4 rounded-lg">
        {propertyFeatures.map((feature) => (
          <label
            key={feature.id}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Checkbox
              checked={selectedFeatures.includes(feature.id)}
              onCheckedChange={() => toggleFeature(feature.id)}
            />
            <span>
              {currentLanguage === "ar" ? feature.nameAr : feature.nameEn}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeaturesSection;
