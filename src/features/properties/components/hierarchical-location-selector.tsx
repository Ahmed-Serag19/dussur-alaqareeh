"use client";

import type React from "react";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLookupContext } from "@/features/properties/context/lookup-context";
import {
  useCitiesQuery,
  useNeighborhoodsQuery,
} from "@/features/properties/queries/lookup-queries";
import useLanguage from "@/hooks/useLanguage";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";

interface HierarchicalLocationSelectorProps {
  control: Control<CreatePropertyFormData>;
  errors: FieldErrors<CreatePropertyFormData>;
  selectedRegion?: number;
  selectedCity?: number;
  onRegionChange?: (regionId: number) => void;
  onCityChange?: (cityId: number) => void;
  onNeighborhoodChange?: (neighborhoodId: number) => void;
}

export const HierarchicalLocationSelector: React.FC<
  HierarchicalLocationSelectorProps
> = ({
  control,
  errors,
  selectedRegion,
  selectedCity,
  onRegionChange,
  onCityChange,
  onNeighborhoodChange,
}) => {
  const { isRTL, t } = useLanguage();
  const { regions, prefetchCities, prefetchNeighborhoods } = useLookupContext();

  // Fetch cities when region is selected
  const citiesQuery = useCitiesQuery(selectedRegion);

  // Fetch neighborhoods when city is selected
  const neighborhoodsQuery = useNeighborhoodsQuery(selectedCity);

  // Prefetch cities when hovering over region options
  const handleRegionHover = (regionId: number) => {
    prefetchCities(regionId);
  };

  // Prefetch neighborhoods when hovering over city options
  const handleCityHover = (cityId: number) => {
    prefetchNeighborhoods(cityId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Region Selector */}
      <div className="space-y-2">
        <Label htmlFor="regionId">
          {t("properties.region")} <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="regionId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString() || ""}
              onValueChange={(value) => {
                const regionId = Number.parseInt(value);
                field.onChange(regionId);
                onRegionChange?.(regionId);
              }}
            >
              <SelectTrigger
                className={errors.regionId ? "border-red-500" : ""}
              >
                <SelectValue placeholder={t("properties.selectRegion")} />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem
                    key={region.id}
                    value={region.id.toString()}
                    onMouseEnter={() => handleRegionHover(region.id)}
                  >
                    {isRTL ? region.nameAr : region.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.regionId && (
          <p className="text-sm text-red-500">{errors.regionId.message}</p>
        )}
      </div>

      {/* City Selector */}
      <div className="space-y-2">
        <Label htmlFor="cityId">
          {t("properties.city")} <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="cityId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString() || ""}
              onValueChange={(value) => {
                const cityId = Number.parseInt(value);
                field.onChange(cityId);
                onCityChange?.(cityId);
              }}
              disabled={!selectedRegion || citiesQuery.isLoading}
            >
              <SelectTrigger className={errors.cityId ? "border-red-500" : ""}>
                <SelectValue
                  placeholder={
                    !selectedRegion
                      ? t("properties.selectRegionFirst")
                      : citiesQuery.isLoading
                      ? t("common.loading")
                      : t("properties.selectCity")
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {citiesQuery.data?.map((city) => (
                  <SelectItem
                    key={city.id}
                    value={city.id.toString()}
                    onMouseEnter={() => handleCityHover(city.id)}
                  >
                    {isRTL ? city.nameAr : city.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.cityId && (
          <p className="text-sm text-red-500">{errors.cityId.message}</p>
        )}
      </div>

      {/* Neighborhood Selector */}
      <div className="space-y-2">
        <Label htmlFor="neighborhoodId">
          {t("properties.neighborhood")} <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="neighborhoodId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString() || ""}
              onValueChange={(value) => {
                const neighborhoodId = Number.parseInt(value);
                field.onChange(neighborhoodId);
                onNeighborhoodChange?.(neighborhoodId);
              }}
              disabled={!selectedCity || neighborhoodsQuery.isLoading}
            >
              <SelectTrigger
                className={errors.neighborhoodId ? "border-red-500" : ""}
              >
                <SelectValue
                  placeholder={
                    !selectedCity
                      ? t("properties.selectCityFirst")
                      : neighborhoodsQuery.isLoading
                      ? t("common.loading")
                      : t("properties.selectNeighborhood")
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {neighborhoodsQuery.data?.map((neighborhood) => (
                  <SelectItem
                    key={neighborhood.id}
                    value={neighborhood.id.toString()}
                  >
                    {isRTL ? neighborhood.nameAr : neighborhood.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.neighborhoodId && (
          <p className="text-sm text-red-500">
            {errors.neighborhoodId.message}
          </p>
        )}
      </div>
    </div>
  );
};
