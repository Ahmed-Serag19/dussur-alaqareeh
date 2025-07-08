import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";
import type {
  LookupItem,
  CityItem,
  NeighborhoodItem,
} from "@/features/properties/types/lookup.types";
import useLanguage from "@/hooks/useLanguage";
import MapModal from "./MapModal";
import { useState } from "react";

interface LocationSectionProps {
  control: Control<CreatePropertyFormData>;
  register: any;
  errors: FieldErrors<CreatePropertyFormData>;
  regions?: LookupItem[];
  cities?: CityItem[];
  neighborhoods?: NeighborhoodItem[];
  selectedRegion: number | null;
  selectedCity: number | null;
  selectedLocation: { lat: number; lng: number } | null;
  setSelectedLocation: (location: { lat: number; lng: number } | null) => void;
}

export const LocationSection = ({
  control,
  register,
  errors,
  regions = [],
  cities = [],
  neighborhoods = [],
  selectedRegion,
  selectedCity,
  selectedLocation,
  setSelectedLocation,
}: LocationSectionProps) => {
  const { isRTL, t } = useLanguage();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={isRTL ? "text-right" : "text-left"}>
            {t("properties.locationInfo")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-2">
              <Label
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.region")}
              </Label>
              <Controller
                name="regionId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <SelectValue placeholder={t("properties.selectRegion")} />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem
                          key={region.id}
                          value={region.id.toString()}
                        >
                          {isRTL ? region.nameAr : region.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.regionId && (
                <p className="text-sm text-red-600 text-right">
                  {errors.regionId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.city")}
              </Label>
              <Controller
                name="cityId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                    disabled={!selectedRegion}
                  >
                    <SelectTrigger
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <SelectValue placeholder={t("properties.selectCity")} />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {isRTL ? city.nameAr : city.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.cityId && (
                <p className="text-sm text-red-600 text-right">
                  {errors.cityId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.neighborhood")}
              </Label>
              <Controller
                name="neighborhoodId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                    disabled={!selectedCity}
                  >
                    <SelectTrigger
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <SelectValue
                        placeholder={t("properties.selectNeighborhood")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {neighborhoods.map((neighborhood) => (
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
                <p className="text-sm text-red-600 text-right">
                  {errors.neighborhoodId.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="streetAr"
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.streetAr")}
              </Label>
              <Input
                id="streetAr"
                placeholder={t("properties.streetArPlaceholder")}
                className="text-right"
                {...register("streetAr")}
              />
              {errors.streetAr && (
                <p className="text-sm text-red-600 text-right">
                  {errors.streetAr.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="streetEn"
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.streetEn")}
              </Label>
              <Input
                id="streetEn"
                placeholder={t("properties.streetEnPlaceholder")}
                className="text-left"
                {...register("streetEn")}
              />
              {errors.streetEn && (
                <p className="text-sm text-red-600 text-right">
                  {errors.streetEn.message}
                </p>
              )}
            </div>
          </div>

          {/* Map Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label
                className={`block text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("properties.selectLocation")}
              </Label>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsMapModalOpen(true)}
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                {selectedLocation
                  ? t("properties.updateLocation")
                  : t("properties.selectOnMap")}
              </Button>
            </div>

            {selectedLocation && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {t("properties.locationSelected")}
                  </span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  {t("properties.coordinates")}:{" "}
                  {selectedLocation.lat.toFixed(6)},{" "}
                  {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
      />
    </div>
  );
};
