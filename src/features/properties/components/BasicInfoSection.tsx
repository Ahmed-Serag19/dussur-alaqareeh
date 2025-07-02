import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useLanguage from "@/hooks/useLanguage";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import PriceAndArea from "./PriceAndArea";
import TypeAndListingSelects from "./TypeAndListingSelects";
import type { Control, FieldErrors } from "react-hook-form";
import type { LookupItem } from "../types/lookup.types";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";

interface Props {
  control: Control<CreatePropertyFormData>;
  register: any;
  errors: FieldErrors<CreatePropertyFormData>;
  propertyTypes?: LookupItem[];
  listingTypes?: LookupItem[];
}

const BasicInfoSection = ({
  control,
  register,
  errors,
  propertyTypes,
  listingTypes,
}: Props) => {
  const { isRTL, t } = useLanguage();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={isRTL ? "text-right" : "text-left"}>
            {t("properties.basicInfo")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <TitleInput register={register} error={errors.title} />
          <DescriptionInput register={register} error={errors.description} />
          <PriceAndArea register={register} errors={errors} />
          <TypeAndListingSelects
            control={control}
            errors={errors}
            propertyTypes={propertyTypes}
            listingTypes={listingTypes}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoSection;
