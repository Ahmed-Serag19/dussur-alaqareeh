export interface PropertyUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  cityId: number;
  typeId: number;
  conditionId: number;
  finishTypeId: number;
  propertyTypeId: number;
  regionId: number;
  neighborhoodId: number;
  listingTypeId: number;
  streetAr: string;
  streetEn: string;
  longitude: number;
  latitude: number;
  descriptionAr: string;
  descriptionEn: string;
  area: number;
  roomsCount: number;
  bathroomsCount: number;
  livingroomsCount: number;
  floorsCount: number;
  buildingAge: number;
  statusId: number;
  createdAt: string;
  updatedAt: string;
  createdByUser: PropertyUser;
}

export interface PropertyFilters {
  status?: string;
  cityId?: number;
  propertyTypeId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
