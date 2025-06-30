import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import useLanguage from "@/hooks/useLanguage";
import type { LookupItem } from "@/features/properties/api/lookup.api";

interface TypeAndListingSelectsProps {
  control: Control<any>;
  errors: FieldErrors;
  propertyTypes?: LookupItem[];
  listingTypes?: LookupItem[];
}

const TypeAndListingSelects = ({
  control,
  errors,
  propertyTypes,
  listingTypes,
}: TypeAndListingSelectsProps) => {
  const { isRTL, t } = useLanguage();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {[
        {
          name: "propertyTypeId",
          label: "propertyType",
          options: propertyTypes,
        },
        { name: "listingTypeId", label: "listingType", options: listingTypes },
      ].map(({ name, label, options }) => (
        <div className="space-y-2" key={name}>
          <Label
            className={`block text-sm font-medium ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t(`properties.${label}`)}
          </Label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(v) => field.onChange(Number(v))}
                value={field.value?.toString()}
              >
                <SelectTrigger className={isRTL ? "text-right" : "text-left"}>
                  <SelectValue placeholder={t(`properties.${label}`)} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {isRTL ? item.nameAr : item.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.[name] && (
            <p className="text-sm text-red-600 text-right">
              {typeof errors?.[name]?.message === "string"
                ? errors?.[name]?.message
                : ""}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TypeAndListingSelects;
