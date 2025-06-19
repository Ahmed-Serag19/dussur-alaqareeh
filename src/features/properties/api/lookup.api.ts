import { axiosInstance } from "@/lib/axios";

export interface LookupItem {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface CityItem extends LookupItem {
  regionId: number;
}

export interface NeighborhoodItem extends LookupItem {
  cityId: number;
}

// Regions
export const getRegions = () => {
  return axiosInstance.get<LookupItem[]>("/lookup/regions");
};

// Cities (depends on region)
export const getCities = (regionId: number) => {
  return axiosInstance.get<CityItem[]>(`/lookup/cities?region_id=${regionId}`);
};

// Neighborhoods (depends on city)
export const getNeighborhoods = (cityId: number) => {
  return axiosInstance.get<NeighborhoodItem[]>(
    `/lookup/neighborhoods?city_id=${cityId}`
  );
};

// Property Types
export const getPropertyTypes = () => {
  return axiosInstance.get<LookupItem[]>("/lookup/property-types");
};

// Listing Types
export const getListingTypes = () => {
  return axiosInstance.get<LookupItem[]>("/lookup/listing-types");
};

// Property Conditions
export const getPropertyConditions = () => {
  return axiosInstance.get<LookupItem[]>("/lookup/property-conditions");
};

// Finishing Types
export const getFinishingTypes = () => {
  return axiosInstance.get<LookupItem[]>("/lookup/finishing-types");
};

// Property Status Values
export const getPropertyStatusValues = () => {
  return axiosInstance.get<LookupItem[]>("/lookup/property-status-values");
};

// Property Features
export const getPropertyFeatures = () => {
  return axiosInstance.get<LookupItem[]>("/lookup/property-features");
};
