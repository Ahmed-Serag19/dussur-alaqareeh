"use client";

import type React from "react";
import { createContext, useContext, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useRegionsQuery,
  useAllCitiesQuery,
  useAllNeighborhoodsQuery,
  usePropertyTypesQuery,
  useListingTypesQuery,
  usePropertyConditionsQuery,
  useFinishingTypesQuery,
  usePropertyStatusValuesQuery,
  usePropertyFeaturesQuery,
  lookupKeys,
  getCities,
  getNeighborhoods,
} from "@/features/properties/queries/lookup-queries";
import type {
  LookupItem,
  CityItem,
  NeighborhoodItem,
} from "@/features/properties/types/lookup.types";
import useLanguage from "@/hooks/useLanguage";

interface LookupContextType {
  // Base data
  regions: LookupItem[];
  cities: CityItem[];
  neighborhoods: NeighborhoodItem[];
  propertyTypes: LookupItem[];
  listingTypes: LookupItem[];
  propertyConditions: LookupItem[];
  finishingTypes: LookupItem[];
  propertyStatusValues: LookupItem[];
  propertyFeatures: LookupItem[];

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Helper functions
  getLookupName: (items: LookupItem[] | undefined, id: number) => string;
  getRegionName: (id: number) => string;
  getCityName: (id: number) => string;
  getNeighborhoodName: (id: number) => string;
  getPropertyTypeName: (id: number) => string;
  getListingTypeName: (id: number) => string;
  getPropertyConditionName: (id: number) => string;
  getFinishingTypeName: (id: number) => string;
  getPropertyStatusValueName: (id: number) => string;
  getPropertyFeatureName: (id: number) => string;

  // Hierarchical data functions
  getCitiesByRegion: (regionId: number) => CityItem[];
  getNeighborhoodsByCity: (cityId: number) => NeighborhoodItem[];
  getFullLocationString: (
    regionId: number,
    cityId: number,
    neighborhoodId: number
  ) => string;

  // Prefetch functions for hierarchical loading
  prefetchCities: (regionId: number) => void;
  prefetchNeighborhoods: (cityId: number) => void;

  // Refetch function
  refetch: () => void;
}

const LookupContext = createContext<LookupContextType | undefined>(undefined);

interface LookupProviderProps {
  children: ReactNode;
}

export const LookupProvider: React.FC<LookupProviderProps> = ({ children }) => {
  const { isRTL } = useLanguage();
  const queryClient = useQueryClient();

  // Fetch base lookup data
  const regionsQuery = useRegionsQuery();
  const allCitiesQuery = useAllCitiesQuery();
  const allNeighborhoodsQuery = useAllNeighborhoodsQuery();
  const propertyTypesQuery = usePropertyTypesQuery();
  const listingTypesQuery = useListingTypesQuery();
  const propertyConditionsQuery = usePropertyConditionsQuery();
  const finishingTypesQuery = useFinishingTypesQuery();
  const propertyStatusValuesQuery = usePropertyStatusValuesQuery();
  const propertyFeaturesQuery = usePropertyFeaturesQuery();

  // Determine loading state
  const isLoading = [
    regionsQuery,
    allCitiesQuery,
    allNeighborhoodsQuery,
    propertyTypesQuery,
    listingTypesQuery,
    propertyConditionsQuery,
    finishingTypesQuery,
    propertyStatusValuesQuery,
    propertyFeaturesQuery,
  ].some((query) => query.isLoading);

  // Determine error state
  const error =
    [
      regionsQuery,
      allCitiesQuery,
      allNeighborhoodsQuery,
      propertyTypesQuery,
      listingTypesQuery,
      propertyConditionsQuery,
      finishingTypesQuery,
      propertyStatusValuesQuery,
      propertyFeaturesQuery,
    ].find((query) => query.error)?.error?.message || null;

  // Helper function to get name by ID from any lookup array
  const getLookupName = (
    items: LookupItem[] | undefined,
    id: number
  ): string => {
    if (!items) return `ID: ${id}`;
    const item = items.find((item) => item.id === id);
    if (!item) return `ID: ${id}`;
    return isRTL ? item.nameAr : item.nameEn;
  };

  // Specific helper functions
  const getRegionName = (id: number): string => {
    return getLookupName(regionsQuery.data, id);
  };

  const getCityName = (id: number): string => {
    const cities = allCitiesQuery.data || [];
    const city = cities.find((city) => city.id === id);
    if (!city) return `City ID: ${id}`;
    return isRTL ? city.nameAr : city.nameEn;
  };

  const getNeighborhoodName = (id: number): string => {
    const neighborhoods = allNeighborhoodsQuery.data || [];
    const neighborhood = neighborhoods.find((n) => n.id === id);
    if (!neighborhood) return `Neighborhood ID: ${id}`;
    return isRTL ? neighborhood.nameAr : neighborhood.nameEn;
  };

  const getPropertyTypeName = (id: number): string => {
    return getLookupName(propertyTypesQuery.data, id);
  };

  const getListingTypeName = (id: number): string => {
    return getLookupName(listingTypesQuery.data, id);
  };

  const getPropertyConditionName = (id: number): string => {
    return getLookupName(propertyConditionsQuery.data, id);
  };

  const getFinishingTypeName = (id: number): string => {
    return getLookupName(finishingTypesQuery.data, id);
  };

  const getPropertyStatusValueName = (id: number): string => {
    return getLookupName(propertyStatusValuesQuery.data, id);
  };

  const getPropertyFeatureName = (id: number): string => {
    return getLookupName(propertyFeaturesQuery.data, id);
  };

  // Get cities by region from the complete cities list
  const getCitiesByRegion = (regionId: number): CityItem[] => {
    if (!regionId || !allCitiesQuery.data) return [];
    return allCitiesQuery.data.filter((city) => city.regionId === regionId);
  };

  // Get neighborhoods by city from the complete neighborhoods list
  const getNeighborhoodsByCity = (cityId: number): NeighborhoodItem[] => {
    if (!cityId || !allNeighborhoodsQuery.data) return [];
    return allNeighborhoodsQuery.data.filter(
      (neighborhood) => neighborhood.cityId === cityId
    );
  };

  // Get full location string
  const getFullLocationString = (
    regionId: number,
    cityId: number,
    neighborhoodId: number
  ): string => {
    const region = getRegionName(regionId);
    const city = getCityName(cityId);
    const neighborhood = getNeighborhoodName(neighborhoodId);

    // Filter out any "ID: X" fallbacks for a cleaner display
    const locationParts = [neighborhood, city, region].filter(
      (part) => !part.includes("ID:")
    );

    if (locationParts.length === 0) {
      return `Region: ${regionId}, City: ${cityId}, Neighborhood: ${neighborhoodId}`;
    }

    if (isRTL) {
      return locationParts.join("، ");
    } else {
      return locationParts.join(", ");
    }
  };

  // Prefetch functions for hierarchical loading
  const prefetchCities = (regionId: number) => {
    if (regionId) {
      queryClient.prefetchQuery({
        queryKey: lookupKeys.cities(regionId),
        queryFn: () => getCities(regionId),
        staleTime: 5 * 60 * 1000,
      });
    }
  };

  const prefetchNeighborhoods = (cityId: number) => {
    if (cityId) {
      queryClient.prefetchQuery({
        queryKey: lookupKeys.neighborhoods(cityId),
        queryFn: () => getNeighborhoods(cityId),
        staleTime: 5 * 60 * 1000,
      });
    }
  };

  // Refetch all lookup data
  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: lookupKeys.all });
  };

  const contextValue: LookupContextType = {
    // Base data
    regions: regionsQuery.data || [],
    cities: allCitiesQuery.data || [],
    neighborhoods: allNeighborhoodsQuery.data || [],
    propertyTypes: propertyTypesQuery.data || [],
    listingTypes: listingTypesQuery.data || [],
    propertyConditions: propertyConditionsQuery.data || [],
    finishingTypes: finishingTypesQuery.data || [],
    propertyStatusValues: propertyStatusValuesQuery.data || [],
    propertyFeatures: propertyFeaturesQuery.data || [],

    // Loading states
    isLoading,
    error,

    // Helper functions
    getLookupName,
    getRegionName,
    getCityName,
    getNeighborhoodName,
    getPropertyTypeName,
    getListingTypeName,
    getPropertyConditionName,
    getFinishingTypeName,
    getPropertyStatusValueName,
    getPropertyFeatureName,

    // Hierarchical data functions
    getCitiesByRegion,
    getNeighborhoodsByCity,
    getFullLocationString,

    // Prefetch functions
    prefetchCities,
    prefetchNeighborhoods,

    // Refetch function
    refetch,
  };

  return (
    <LookupContext.Provider value={contextValue}>
      {children}
    </LookupContext.Provider>
  );
};

export const useLookupContext = (): LookupContextType => {
  const context = useContext(LookupContext);
  if (context === undefined) {
    throw new Error("useLookupContext must be used within a LookupProvider");
  }
  return context;
};
