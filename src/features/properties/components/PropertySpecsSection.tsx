"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";
import type { LookupItem } from "@/features/properties/types/lookup.types";
import useLanguage from "@/hooks/useLanguage";

interface PropertySpecsSectionProps {
  control: Control<CreatePropertyFormData>;
  register: any;
  errors: FieldErrors<CreatePropertyFormData>;
  conditions?: LookupItem[];
  finishTypes?: LookupItem[];
}

export const PropertySpecsSection = ({
  control,
  register,
  errors,
  conditions = [],
  finishTypes = [],
}: PropertySpecsSectionProps) => {
  const { isRTL, t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Property Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className={isRTL ? "text-right" : "text-left"}>
            {t("properties.propertySpecs")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-2">
              <Label
                htmlFor="bedrooms"
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.bedrooms")}
              </Label>
              <Input
                id="bedrooms"
                type="number"
                min="0"
                placeholder={t("properties.bedroomsPlaceholder")}
                className={isRTL ? "text-right" : "text-left"}
                {...register("bedrooms", { valueAsNumber: true })}
              />
              {errors.roomsCount && (
                <p className="text-sm text-red-600 text-right">
                  {errors.roomsCount.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="bathrooms"
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.bathrooms")}
              </Label>
              <Input
                id="bathrooms"
                type="number"
                min="0"
                placeholder={t("properties.bathroomsPlaceholder")}
                className={isRTL ? "text-right" : "text-left"}
                {...register("bathrooms", { valueAsNumber: true })}
              />
              {errors.bathroomsCount && (
                <p className="text-sm text-red-600 text-right">
                  {errors.bathroomsCount.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="floors"
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.floors")}
              </Label>
              <Input
                id="floors"
                type="number"
                min="0"
                placeholder={t("properties.floorsPlaceholder")}
                className={isRTL ? "text-right" : "text-left"}
                {...register("floors", { valueAsNumber: true })}
              />
              {errors.floorsCount && (
                <p className="text-sm text-red-600 text-right">
                  {errors.floorsCount.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
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
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <SelectValue
                        placeholder={t("properties.selectCondition")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem
                          key={condition.id}
                          value={condition.id.toString()}
                        >
                          {isRTL ? condition.nameAr : condition.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <SelectValue
                        placeholder={t("properties.selectFinishType")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {finishTypes.map((finishType) => (
                        <SelectItem
                          key={finishType.id}
                          value={finishType.id.toString()}
                        >
                          {isRTL ? finishType.nameAr : finishType.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.finishTypeId && (
                <p className="text-sm text-red-600 text-right">
                  {errors.finishTypeId.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle className={isRTL ? "text-right" : "text-left"}>
            {t("properties.detailedDescriptions")}
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
            <Textarea
              id="descriptionAr"
              rows={4}
              placeholder={t("properties.descriptionArPlaceholder")}
              className="text-right"
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
            <Textarea
              id="descriptionEn"
              rows={4}
              placeholder={t("properties.descriptionEnPlaceholder")}
              className="text-left"
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
    </div>
  );
};
