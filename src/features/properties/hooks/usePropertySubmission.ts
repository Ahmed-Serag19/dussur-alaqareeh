"use client";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createProperty } from "@/features/properties/api/properties.api";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";
import useLanguage from "@/hooks/useLanguage";

export const usePropertySubmission = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const mutation = useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      toast.success(t("properties.createSuccess"));
      navigate("/properties");
    },
    onError: (error: any) => {
      console.error("Property creation error:", error);
      toast.error(error.response?.data?.message || t("properties.createError"));
    },
  });

  const submitProperty = async (
    data: CreatePropertyFormData,
    selectedLocation: { lat: number; lng: number } | null
  ) => {
    console.log("Submitting property with data:", data);
    console.log("Selected location:", selectedLocation);

    if (!selectedLocation) {
      toast.error(t("properties.validation.locationRequired"));
      throw new Error("Location is required");
    }

    const propertyData = {
      ...data,
      longitude: selectedLocation.lng,
      latitude: selectedLocation.lat,
      typeId: data.propertyTypeId,
      createdBy: 1001,
      statusId: 1,
    };

    console.log("Final property data being sent:", propertyData);

    try {
      await mutation.mutateAsync(propertyData);
    } catch (error) {
      console.error("Mutation error:", error);
      throw error;
    }
  };

  return {
    submitProperty,
    isLoading: mutation.isPending,
  };
};
