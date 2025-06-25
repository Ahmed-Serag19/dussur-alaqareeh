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
import type { LookupItem } from "@/features/properties/api/lookup.api";
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
  conditions,
  finishTypes,
}: PropertySpecsSectionProps) => {
  const { isRTL, t } = useLanguage();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={isRTL ? "text-right" : "text-left"}>
            {t("properties.propertySpecs")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
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
                      <SelectValue placeholder={t("properties.condition")} />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions?.map((condition) => (
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
                      <SelectValue placeholder={t("properties.finishType")} />
                    </SelectTrigger>
                    <SelectContent>
                      {finishTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {isRTL ? type.nameAr : type.nameEn}
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
              <Input
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
              <Input
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
              <Input
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
              <Input
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
            <Input
              id="buildingAge"
              type="number"
              min="0"
              className={isRTL ? "text-right" : "text-left"}
              {...register("buildingAge", { valueAsNumber: true })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Descriptions */}
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
            <Textarea
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
            <Textarea
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
    </div>
  );
};
