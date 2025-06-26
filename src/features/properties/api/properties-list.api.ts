import { axiosInstance } from "@/lib/axios";
import type { Property } from "@/features/properties/types/property-response.types";

export const getMyProperties = async (): Promise<Property[]> => {
  const response = await axiosInstance.get<Property[]>(
    "/properties/my-requests"
  );
  return response.data;
};
