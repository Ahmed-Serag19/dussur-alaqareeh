import { axiosInstance } from "@/lib/axios";

export interface CreatePropertyDto {
  title: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  cityId: number;
  regionId: number;
  neighborhoodId: number;
  typeId: number;
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

export const createProperty = (data: CreatePropertyDto) => {
  return axiosInstance.post("/properties/add", data);
};
