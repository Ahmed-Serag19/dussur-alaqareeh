"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import PropertyInput from "@/components/ui/property-input";
import {
  PropertySelect,
  PropertySelectItem,
} from "@/components/ui/property-select";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";
import type { LookupItem } from "@/features/properties/api/lookup.api";
import useLanguage from "@/hooks/useLanguage";

interface PropertySpecsSectionProps {
  control: Control<CreatePropertyFormData>;
  register: any;
  errors: FieldErrors<CreatePropertyFormData>;
  conditions?: LookupItem[];
  finishTypes?: LookupItem[];
}

const PropertySpecsSection = ({
  control,
  register,
  errors,
  conditions,
  finishTypes,
}: PropertySpecsSectionProps) => {
  const { isRTL, t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isRTL ? "text-right" : "text-left"}>
          {t("properties.propertySpecs")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label
              htmlFor="area"
              className={`block text-sm font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("properties.area")}
            </Label>
            <PropertyInput
              id="area"
              type="number"
              placeholder={t("properties.areaPlaceholder")}
              className={isRTL ? "text-right" : "text-left"}
              {...register("area", { valueAsNumber: true })}
            />
            {errors.area && (
              <p className="text-sm text-red-600 text-right">
                {errors.area.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              className={`block text-sm font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("properties.condition")}
            </Label>
            <Controller
              name="conditionId"
              control={control}
              render={({ field }) => (
                <PropertySelect
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                  placeholder={t("properties.condition")}
                >
                  {conditions?.map((condition) => (
                    <PropertySelectItem
                      key={condition.id}
                      value={condition.id.toString()}
                    >
                      {isRTL ? condition.nameAr : condition.nameEn}
                    </PropertySelectItem>
                  ))}
                </PropertySelect>
              )}
            />
            {errors.conditionId && (
              <p className="text-sm text-red-600 text-right">
                {errors.conditionId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              className={`block text-sm font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("properties.finishType")}
            </Label>
            <Controller
              name="finishTypeId"
              control={control}
              render={({ field }) => (
                <PropertySelect
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                  placeholder={t("properties.finishType")}
                >
                  {finishTypes?.map((type) => (
                    <PropertySelectItem
                      key={type.id}
                      value={type.id.toString()}
                    >
                      {isRTL ? type.nameAr : type.nameEn}
                    </PropertySelectItem>
                  ))}
                </PropertySelect>
              )}
            />
            {errors.finishTypeId && (
              <p className="text-sm text-red-600 text-right">
                {errors.finishTypeId.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label
              htmlFor="roomsCount"
              className={`block text-sm font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("properties.roomsCount")}
            </Label>
            <PropertyInput
              id="roomsCount"
              type="number"
              min="0"
              className={isRTL ? "text-right" : "text-left"}
              {...register("roomsCount", { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="bathroomsCount"
              className={`block text-sm font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("properties.bathroomsCount")}
            </Label>
            <PropertyInput
              id="bathroomsCount"
              type="number"
              min="0"
              className={isRTL ? "text-right" : "text-left"}
              {...register("bathroomsCount", { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="livingroomsCount"
              className={`block text-sm font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("properties.livingroomsCount")}
            </Label>
            <PropertyInput
              id="livingroomsCount"
              type="number"
              min="0"
              className={isRTL ? "text-right" : "text-left"}
              {...register("livingroomsCount", { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="floorsCount"
              className={`block text-sm font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("properties.floorsCount")}
            </Label>
            <PropertyInput
              id="floorsCount"
              type="number"
              min="0"
              className={isRTL ? "text-right" : "text-left"}
              {...register("floorsCount", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="max-w-xs space-y-2">
          <Label
            htmlFor="buildingAge"
            className={`block text-sm font-medium ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("properties.buildingAge")}
          </Label>
          <PropertyInput
            id="buildingAge"
            type="number"
            min="0"
            className={isRTL ? "text-right" : "text-left"}
            {...register("buildingAge", { valueAsNumber: true })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertySpecsSection;
