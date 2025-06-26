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
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      let errorMessage = t("properties.createError");

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 403) {
        errorMessage = "Access denied. Please check your authentication token.";
      }

      toast.error(errorMessage);
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
      title: data.title,
      description: data.description,
      descriptionAr: data.descriptionAr,
      descriptionEn: data.descriptionEn,
      price: data.price,
      cityId: data.cityId,
      regionId: data.regionId,
      neighborhoodId: data.neighborhoodId,
      propertyTypeId: data.propertyTypeId,
      listingTypeId: data.listingTypeId,
      conditionId: data.conditionId,
      finishTypeId: data.finishTypeId,
      streetAr: data.streetAr,
      streetEn: data.streetEn,
      longitude: selectedLocation.lng,
      latitude: selectedLocation.lat,
      area: data.area,
      roomsCount: data.roomsCount,
      bathroomsCount: data.bathroomsCount,
      livingroomsCount: data.livingroomsCount,
      floorsCount: data.floorsCount,
      buildingAge: data.buildingAge,
      statusId: 1,
      createdBy: 1001, // ALWAYS 1001
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
