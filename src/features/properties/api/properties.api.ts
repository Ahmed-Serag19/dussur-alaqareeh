import { axiosInstance } from "@/lib/axios";

export interface CreatePropertyDto {
  title: string;
  description: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  cityId: number;
  regionId: number;
  neighborhoodId: number;
  propertyTypeId: number;
  listingTypeId: number;
  conditionId: number;
  finishTypeId: number;
  streetAr: string;
  streetEn: string;
  longitude: number;
  latitude: number;
  area: number;
  roomsCount: number;
  bathroomsCount: number;
  livingroomsCount: number;
  floorsCount: number;
  buildingAge: number;
  statusId: number;
  createdBy: number;
}

export const createProperty = async (data: CreatePropertyDto) => {
  console.log("API call - Creating property with data:", data);

  // Send exactly what the backend expects
  const apiPayload = {
    title: data.title,
    description: data.description,
    price: data.price,
    cityId: data.cityId,
    regionId: data.regionId,
    neighborhoodId: data.neighborhoodId,
    typeId: data.propertyTypeId, // typeId = propertyTypeId
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
    createdBy: 1001, // Default createdBy
  };

  console.log("Transformed API payload:", apiPayload);

  try {
    const response = await axiosInstance.post("/properties/add", apiPayload);
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
