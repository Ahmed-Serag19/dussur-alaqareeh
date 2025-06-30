import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProperties,
  deleteProperty as deletePropertyApi,
} from "@/features/properties/api/properties-list.api";
import type {
  Property,
  PropertyStatus,
} from "@/features/properties/types/property-response.types";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const usePropertiesData = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    data: propertiesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["properties", "all-statuses"],
    queryFn: getAllProperties,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 30,
    refetchIntervalInBackground: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePropertyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success(t("properties.delete.success"));
    },
    onError: () => {
      toast.error(t("properties.delete.error"));
    },
  });

  const getPropertiesByStatus = (
    status: PropertyStatus | "ALL"
  ): Property[] => {
    if (!propertiesData) return [];

    switch (status) {
      case "PENDING":
        return propertiesData.pending;
      case "APPROVED":
        return propertiesData.approved;
      case "REJECTED":
        return propertiesData.rejected;
      case "ALL":
      default:
        return propertiesData.all;
    }
  };

  const getCounts = () => {
    if (!propertiesData) {
      return {
        all: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
      };
    }

    return {
      all: propertiesData.all.length,
      pending: propertiesData.pending.length,
      approved: propertiesData.approved.length,
      rejected: propertiesData.rejected.length,
    };
  };

  const deleteProperty = (id: number) => {
    deleteMutation.mutate(id);
  };

  return {
    propertiesData,
    isLoading,
    error,
    refetch,
    getPropertiesByStatus,
    getCounts,
    deleteProperty,
    isDeletingProperty: deleteMutation.isPending,
  };
};
