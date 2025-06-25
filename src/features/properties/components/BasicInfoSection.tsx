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

interface BasicInfoSectionProps {
  control: Control<CreatePropertyFormData>;
  register: any;
  errors: FieldErrors<CreatePropertyFormData>;
  propertyTypes?: LookupItem[];
  listingTypes?: LookupItem[];
}

export const BasicInfoSection = ({
  control,
  register,
  errors,
  propertyTypes,
  listingTypes,
}: BasicInfoSectionProps) => {
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
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className={`block text-sm font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("properties.title")}
            </Label>
            <Input
              id="title"
              placeholder={t("properties.titlePlaceholder")}
              className={isRTL ? "text-right" : "text-left"}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-600 text-right">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className={`block text-sm font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("properties.description")}
            </Label>
            <Textarea
              id="description"
              rows={3}
              placeholder={t("properties.descriptionPlaceholder")}
              className={isRTL ? "text-right" : "text-left"}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-600 text-right">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.price")}
              </Label>
              <Input
                id="price"
                type="number"
                placeholder={t("properties.pricePlaceholder")}
                className={isRTL ? "text-right" : "text-left"}
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-sm text-red-600 text-right">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="area"
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.area")}
              </Label>
              <Input
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
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <Label
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.propertyType")}
              </Label>
              <Controller
                name="propertyTypeId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <SelectValue placeholder={t("properties.propertyType")} />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {isRTL ? type.nameAr : type.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.propertyTypeId && (
                <p className="text-sm text-red-600 text-right">
                  {errors.propertyTypeId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.listingType")}
              </Label>
              <Controller
                name="listingTypeId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <SelectValue placeholder={t("properties.listingType")} />
                    </SelectTrigger>
                    <SelectContent>
                      {listingTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {isRTL ? type.nameAr : type.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.listingTypeId && (
                <p className="text-sm text-red-600 text-right">
                  {errors.listingTypeId.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
