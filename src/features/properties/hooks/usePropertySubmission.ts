import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createProperty } from "@/features/properties/api/properties.api";
import type { CreatePropertyFormData } from "@/features/properties/types/property.types";
import useLanguage from "@/hooks/useLanguage";
import { getApiErrorMessage } from "@/lib/errorHandler";

export const usePropertySubmission = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const mutation = useMutation({
    mutationFn: ({
      data,
      images,
    }: {
      data: Omit<CreatePropertyFormData, "featureIds"> & {
        statusId: number;
        featureIds: number[];
      };
      images: File[];
    }) =>
      createProperty(
        {
          ...data,
          featureIds: data.featureIds ?? [],
        },
        images
      ),
    onSuccess: () => {
      toast.success(t("properties.createSuccess"));
      navigate("/properties");
    },
    onError: (error: unknown) => {
      console.error("Property creation error:", error);
      const errorMessage = getApiErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  const submitProperty = async (
    data: CreatePropertyFormData,
    selectedLocation: { lat: number; lng: number } | null,
    images: File[] = []
  ) => {
    console.log("Submitting property with data:", data);
    console.log("Selected location:", selectedLocation);
    console.log("Images to upload:", images);

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
      featureIds: data.featureIds ?? [],
    };

    console.log("Final property data being sent:", propertyData);

    try {
      await mutation.mutateAsync({ data: propertyData, images });
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
