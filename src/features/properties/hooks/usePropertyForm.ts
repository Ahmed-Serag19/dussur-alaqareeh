"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPropertySchema,
  type CreatePropertyFormData,
} from "@/features/properties/types/property.types";
import useLanguage from "@/hooks/useLanguage";

export const usePropertyForm = () => {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const form = useForm<CreatePropertyFormData>({
    resolver: zodResolver(createPropertySchema(t)),
    defaultValues: {
      title: "",
      description: "",
      descriptionAr: "",
      descriptionEn: "",
      price: 0,
      area: 0,
      regionId: 0,
      cityId: 0,
      neighborhoodId: 0,
      propertyTypeId: 0,
      listingTypeId: 0,
      conditionId: 0,
      finishTypeId: 0,
      streetAr: "",
      streetEn: "",
      roomsCount: 0,
      bathroomsCount: 0,
      livingroomsCount: 0,
      floorsCount: 0,
      buildingAge: 0,
      longitude: 0,
      latitude: 0,
    },
    mode: "onChange", // Enable real-time validation
  });

  const { watch, setValue } = form;
  const watchedRegion = watch("regionId");
  const watchedCity = watch("cityId");

  // Handle region change
  useEffect(() => {
    if (watchedRegion && watchedRegion !== selectedRegion) {
      setSelectedRegion(watchedRegion);
      setSelectedCity(null);
      setValue("cityId", 0);
      setValue("neighborhoodId", 0);
    }
  }, [watchedRegion, selectedRegion, setValue]);

  // Handle city change
  useEffect(() => {
    if (watchedCity && watchedCity !== selectedCity) {
      setSelectedCity(watchedCity);
      setValue("neighborhoodId", 0);
    }
  }, [watchedCity, selectedCity, setValue]);

  return {
    form,
    selectedRegion,
    selectedCity,
    selectedLocation,
    setSelectedLocation,
  };
};
