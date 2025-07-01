import { useState, useEffect } from "react";
import { getAllLookupData } from "@/features/properties/api/lookup.api";
import type {
  LookupData,
  LookupItem,
  CityItem,
  NeighborhoodItem,
} from "@/features/properties/types/lookup.types";
import useLanguage from "@/hooks/useLanguage";

export const useLookupData = () => {
  const { isRTL } = useLanguage();
  const [lookupData, setLookupData] = useState<LookupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLookupData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllLookupData();
        setLookupData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch lookup data:", err);
        setError("Failed to load form data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLookupData();
  }, []);

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
    return getLookupName(lookupData?.regions, id);
  };

  const getCityName = (id: number): string => {
    return getLookupName(lookupData?.cities, id);
  };

  const getNeighborhoodName = (id: number): string => {
    return getLookupName(lookupData?.neighborhoods, id);
  };

  const getPropertyTypeName = (id: number): string => {
    return getLookupName(lookupData?.propertyTypes, id);
  };

  const getListingTypeName = (id: number): string => {
    return getLookupName(lookupData?.listingTypes, id);
  };

  const getPropertyConditionName = (id: number): string => {
    return getLookupName(lookupData?.propertyConditions, id);
  };

  const getFinishingTypeName = (id: number): string => {
    return getLookupName(lookupData?.finishingTypes, id);
  };

  const getPropertyStatusValueName = (id: number): string => {
    return getLookupName(lookupData?.propertyStatusValues, id);
  };

  const getPropertyFeatureName = (id: number): string => {
    return getLookupName(lookupData?.propertyFeatures, id);
  };

  // Get cities by region
  const getCitiesByRegion = (regionId: number): CityItem[] => {
    if (!lookupData?.cities || !regionId) return [];
    return lookupData.cities.filter((city) => city.regionId === regionId);
  };

  // Get neighborhoods by city
  const getNeighborhoodsByCity = (cityId: number): NeighborhoodItem[] => {
    if (!lookupData?.neighborhoods || !cityId) return [];
    return lookupData.neighborhoods.filter(
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

    if (isRTL) {
      return `${neighborhood}، ${city}، ${region}`;
    } else {
      return `${neighborhood}, ${city}, ${region}`;
    }
  };

  const refetch = async () => {
    try {
      setIsLoading(true);
      const data = await getAllLookupData();
      setLookupData(data);
      setError(null);
    } catch (err) {
      console.error("Failed to refetch lookup data:", err);
      setError("Failed to reload form data");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Raw data for form components (backward compatibility)
    regions: lookupData?.regions || [],
    cities: lookupData?.cities || [],
    neighborhoods: lookupData?.neighborhoods || [],
    propertyTypes: lookupData?.propertyTypes || [],
    listingTypes: lookupData?.listingTypes || [],
    propertyConditions: lookupData?.propertyConditions || [],
    finishingTypes: lookupData?.finishingTypes || [],
    propertyStatusValues: lookupData?.propertyStatusValues || [],
    propertyFeatures: lookupData?.propertyFeatures || [],

    // Loading state
    isLoading,
    error,
    refetch,

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

    // Filtered data
    getCitiesByRegion,
    getNeighborhoodsByCity,

    // Composite helpers
    getFullLocationString,
  };
};
