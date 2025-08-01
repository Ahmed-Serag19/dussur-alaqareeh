import { useQuery } from "@tanstack/react-query";
import {
  getRegions,
  getCities,
  getNeighborhoods,
  getPropertyTypes,
  getListingTypes,
  getPropertyConditions,
  getFinishingTypes,
  getPropertyStatusValues,
  getPropertyFeatures,
} from "@/features/properties/api/lookup.api";

// Query keys
export const lookupKeys = {
  all: ["lookup"] as const,
  regions: () => [...lookupKeys.all, "regions"] as const,
  cities: (regionId?: number) =>
    [...lookupKeys.all, "cities", regionId] as const,
  allCities: () => [...lookupKeys.all, "cities", "all"] as const,
  neighborhoods: (cityId?: number) =>
    [...lookupKeys.all, "neighborhoods", cityId] as const,
  allNeighborhoods: () => [...lookupKeys.all, "neighborhoods", "all"] as const,
  propertyTypes: () => [...lookupKeys.all, "property-types"] as const,
  listingTypes: () => [...lookupKeys.all, "listing-types"] as const,
  propertyConditions: () => [...lookupKeys.all, "property-conditions"] as const,
  finishingTypes: () => [...lookupKeys.all, "finishing-types"] as const,
  propertyStatusValues: () =>
    [...lookupKeys.all, "property-status-values"] as const,
  propertyFeatures: () => [...lookupKeys.all, "property-features"] as const,
};

// Base lookup queries
export const useRegionsQuery = () => {
  return useQuery({
    queryKey: lookupKeys.regions(),
    queryFn: getRegions,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAllCitiesQuery = () => {
  return useQuery({
    queryKey: lookupKeys.allCities(),
    queryFn: () => getCities(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAllNeighborhoodsQuery = () => {
  return useQuery({
    queryKey: lookupKeys.allNeighborhoods(),
    queryFn: () => getNeighborhoods(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCitiesQuery = (regionId?: number) => {
  return useQuery({
    queryKey: lookupKeys.cities(regionId),
    queryFn: () => getCities(regionId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!regionId,
  });
};

export const useNeighborhoodsQuery = (cityId?: number) => {
  return useQuery({
    queryKey: lookupKeys.neighborhoods(cityId),
    queryFn: () => getNeighborhoods(cityId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!cityId,
  });
};

export const usePropertyTypesQuery = () => {
  return useQuery({
    queryKey: lookupKeys.propertyTypes(),
    queryFn: getPropertyTypes,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useListingTypesQuery = () => {
  return useQuery({
    queryKey: lookupKeys.listingTypes(),
    queryFn: getListingTypes,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePropertyConditionsQuery = () => {
  return useQuery({
    queryKey: lookupKeys.propertyConditions(),
    queryFn: getPropertyConditions,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useFinishingTypesQuery = () => {
  return useQuery({
    queryKey: lookupKeys.finishingTypes(),
    queryFn: getFinishingTypes,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePropertyStatusValuesQuery = () => {
  return useQuery({
    queryKey: lookupKeys.propertyStatusValues(),
    queryFn: getPropertyStatusValues,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePropertyFeaturesQuery = () => {
  return useQuery({
    queryKey: lookupKeys.propertyFeatures(),
    queryFn: getPropertyFeatures,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export { getCities, getNeighborhoods };
