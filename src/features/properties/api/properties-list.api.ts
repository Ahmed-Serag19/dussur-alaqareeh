import { axiosInstance } from "@/lib/axios";
import type {
  Property,
  PropertyStatus,
} from "@/features/properties/types/property-response.types";

export const getPropertiesByStatus = async (
  status: PropertyStatus
): Promise<Property[]> => {
  const response = await axiosInstance.get<Property[]>(
    `/temp-properties/my-requests-status?status=${status}`
  );
  return response.data;
};

export const deleteProperty = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/temp-properties/delete-temp-property/${id}`);
};

// Helper function to get all properties by fetching all statuses
export const getAllProperties = async (): Promise<{
  all: Property[];
  pending: Property[];
  approved: Property[];
  rejected: Property[];
}> => {
  const [pending, approved, rejected] = await Promise.all([
    getPropertiesByStatus("PENDING"),
    getPropertiesByStatus("APPROVED"),
    getPropertiesByStatus("REJECTED"),
  ]);

  const all = [...pending, ...approved, ...rejected];

  return {
    all,
    pending,
    approved,
    rejected,
  };
};
