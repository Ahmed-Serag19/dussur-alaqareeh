import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PropertyInput from "@/components/ui/property-input";
import {
  PropertySelect,
  PropertySelectItem,
} from "@/components/ui/property-select";
import MapModal from "./MapModal";
import { MapPin, CheckCircle } from "lucide-react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";
import type {
  LookupItem,
  CityItem,
  NeighborhoodItem,
} from "@/features/properties/api/lookup.api";
import useLanguage from "@/hooks/useLanguage";

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

const LocationSection = ({
  control,
  register,
  errors,
  regions,
  cities,
  neighborhoods,
  selectedRegion,
  selectedCity,
  selectedLocation,
  setSelectedLocation,
}: LocationSectionProps) => {
  const { isRTL, t } = useLanguage();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const selectedCityName =
    cities?.find((city) => city.id === selectedCity)?.nameAr ||
    cities?.find((city) => city.id === selectedCity)?.nameEn;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className={isRTL ? "text-right" : "text-left"}>
            {t("properties.locationInfo")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                  <PropertySelect
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                    placeholder={t("properties.selectRegion")}
                  >
                    {regions?.map((region) => (
                      <PropertySelectItem
                        key={region.id}
                        value={region.id.toString()}
                      >
                        {isRTL ? region.nameAr : region.nameEn}
                      </PropertySelectItem>
                    ))}
                  </PropertySelect>
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
                  <PropertySelect
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                    disabled={!selectedRegion}
                    placeholder={t("properties.selectCity")}
                  >
                    {cities?.map((city) => (
                      <PropertySelectItem
                        key={city.id}
                        value={city.id.toString()}
                      >
                        {isRTL ? city.nameAr : city.nameEn}
                      </PropertySelectItem>
                    ))}
                  </PropertySelect>
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
                  <PropertySelect
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                    disabled={!selectedCity}
                    placeholder={t("properties.selectNeighborhood")}
                  >
                    {neighborhoods?.map((neighborhood) => (
                      <PropertySelectItem
                        key={neighborhood.id}
                        value={neighborhood.id.toString()}
                      >
                        {isRTL ? neighborhood.nameAr : neighborhood.nameEn}
                      </PropertySelectItem>
                    ))}
                  </PropertySelect>
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
              <PropertyInput
                id="streetAr"
                className={isRTL ? "text-right" : "text-left"}
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
              <PropertyInput
                id="streetEn"
                className={isRTL ? "text-right" : "text-left"}
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
          <div className="space-y-3">
            <Label
              className={`block text-sm font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("properties.selectLocation")}
            </Label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button
                type="button"
                variant={selectedLocation ? "outline" : "default"}
                onClick={() => setIsMapModalOpen(true)}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                {selectedLocation ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                {selectedLocation ? "Change Location" : "Select Location"}
              </Button>
              {selectedLocation && (
                <div className="text-sm text-gray-600 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                  <p className="font-medium text-green-800">
                    ✓ Location Selected
                  </p>
                  <p className="text-green-600">
                    {selectedLocation.lat.toFixed(4)},{" "}
                    {selectedLocation.lng.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onLocationSelect={setSelectedLocation}
        selectedLocation={selectedLocation}
        cityName={selectedCityName}
      />
    </>
  );
};

export default LocationSection;
