import { useQuery } from "@tanstack/react-query";
import {
  getRegions,
  getCities,
  getNeighborhoods,
  getPropertyTypes,
  getListingTypes,
  getPropertyConditions,
  getFinishingTypes,
  getPropertyFeatures,
} from "@/features/properties/api/lookup.api";

export const useLookupData = (
  selectedRegion: number | null,
  selectedCity: number | null
) => {
  const regions = useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegions().then((res) => res.data),
  });

  const cities = useQuery({
    queryKey: ["cities", selectedRegion],
    queryFn: () => getCities(selectedRegion!).then((res) => res.data),
    enabled: !!selectedRegion,
  });

  const neighborhoods = useQuery({
    queryKey: ["neighborhoods", selectedCity],
    queryFn: () => getNeighborhoods(selectedCity!).then((res) => res.data),
    enabled: !!selectedCity,
  });

  const propertyTypes = useQuery({
    queryKey: ["propertyTypes"],
    queryFn: () => getPropertyTypes().then((res) => res.data),
  });

  const listingTypes = useQuery({
    queryKey: ["listingTypes"],
    queryFn: () => getListingTypes().then((res) => res.data),
  });

  const conditions = useQuery({
    queryKey: ["conditions"],
    queryFn: () => getPropertyConditions().then((res) => res.data),
  });

  const finishTypes = useQuery({
    queryKey: ["finishTypes"],
    queryFn: () => getFinishingTypes().then((res) => res.data),
  });

  const features = useQuery({
    queryKey: ["features"],
    queryFn: () => getPropertyFeatures().then((res) => res.data),
  });

  return {
    regions: regions.data,
    cities: cities.data,
    neighborhoods: neighborhoods.data,
    propertyTypes: propertyTypes.data,
    listingTypes: listingTypes.data,
    conditions: conditions.data,
    finishTypes: finishTypes.data,
    features: features.data,
  };
};
