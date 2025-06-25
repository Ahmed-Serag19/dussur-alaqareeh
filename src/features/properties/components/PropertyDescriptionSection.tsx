import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import PropertyTextarea from "@/components/ui/property-textarea";
import type { FieldErrors } from "react-hook-form";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";
import useLanguage from "@/hooks/useLanguage";

interface PropertyDescriptionSectionProps {
  register: any;
  errors: FieldErrors<CreatePropertyFormData>;
}

const PropertyDescriptionSection = ({
  register,
  errors,
}: PropertyDescriptionSectionProps) => {
  const { isRTL, t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isRTL ? "text-right" : "text-left"}>
          الوصف التفصيلي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="descriptionAr"
            className={`block text-sm font-medium ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("properties.descriptionAr")}
          </Label>
          <PropertyTextarea
            id="descriptionAr"
            rows={4}
            className={`${isRTL ? "text-right" : "text-left"}`}
            {...register("descriptionAr")}
          />
          {errors.descriptionAr && (
            <p className="text-sm text-red-600 text-right">
              {errors.descriptionAr.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="descriptionEn"
            className={`block text-sm font-medium ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("properties.descriptionEn")}
          </Label>
          <PropertyTextarea
            id="descriptionEn"
            rows={4}
            className={`${isRTL ? "text-right" : "text-left"}`}
            {...register("descriptionEn")}
          />
          {errors.descriptionEn && (
            <p className="text-sm text-red-600 text-right">
              {errors.descriptionEn.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDescriptionSection;
