import { axiosInstance } from "@/lib/axios";
import type { CreatePropertyDto } from "../types/property.types";

export const createProperty = async (data: CreatePropertyDto) => {
  console.log("API call - Creating property with data:", data);

  const apiPayload = {
    title: data.title,
    description: data.description,
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
    longitude: data.longitude,
    latitude: data.latitude,
    descriptionAr: data.descriptionAr,
    descriptionEn: data.descriptionEn,
    area: data.area,
    roomsCount: data.roomsCount,
    bathroomsCount: data.bathroomsCount,
    livingroomsCount: data.livingroomsCount,
    floorsCount: data.floorsCount,
    buildingAge: data.buildingAge,
    statusId: data.statusId,
  };

  try {
    const response = await axiosInstance.post(
      "/temp-properties/addProperty",
      apiPayload
    );
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
