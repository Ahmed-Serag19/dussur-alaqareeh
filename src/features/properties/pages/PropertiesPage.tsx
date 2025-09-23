import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { PropertyList } from "@/features/properties/components/PropertyList";
import { PropertyStatusTabs } from "@/features/properties/components/PropertyStatusTabs";
import { PropertyViewModal } from "@/features/properties/components/PropertyViewModal";
import { usePropertiesData } from "@/features/properties/hooks/usePropertiesData";

import type {
  Property,
  PropertyStatus,
} from "@/features/properties/types/property-response.types";
import useLanguage from "@/hooks/useLanguage";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLookupContext } from "../context/lookup-context";

export const PropertiesPage = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<PropertyStatus | "ALL">("ALL");
  const [viewModal, setViewModal] = useState<{
    isOpen: boolean;
    property: Property | null;
  }>({
    isOpen: false,
    property: null,
  });

  const {
    isLoading,
    error,
    refetch,
    getPropertiesByStatus,
    getCounts,
    deleteProperty,
    isDeletingProperty,
  } = usePropertiesData();

  // Preload lookup data
  const { isLoading: isLoadingLookup } = useLookupContext();

  const handleViewProperty = (property: Property) => {
    setViewModal({
      isOpen: true,
      property,
    });
  };

  const handleRefresh = () => {
    refetch();
    toast.success(t("properties.list.refreshSuccess"));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as PropertyStatus | "ALL");
  };

  const handleCloseViewModal = () => {
    setViewModal({
      isOpen: false,
      property: null,
    });
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div
          className={`flex items-center justify-between ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <div className={isRTL ? "text-right" : "text-left"}>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("properties.list.title")}
            </h1>
            <p className="text-gray-600 mt-2">
              {t("properties.list.subtitle")}
            </p>
          </div>
        </div>

        <div className="text-center py-12">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("properties.list.errorTitle")}
          </h3>
          <p className="text-gray-600 mb-4">
            {t("properties.list.errorMessage")}
          </p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t("common.retry")}
          </Button>
        </div>
      </div>
    );
  }

  const currentProperties = getPropertiesByStatus(activeTab);
  const counts = getCounts();
  const isLoadingData = isLoading || isLoadingLookup;

  return (
    <>
      <div className="space-y-6">
        <div
          className={`flex items-center justify-between ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoadingData}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${
                  isLoadingData ? "animate-spin" : ""
                }`}
              />
              {t("common.refresh")}
            </Button>
            <Link to="/properties/add">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t("properties.list.addNew")}
              </Button>
            </Link>
          </div>
          <div className={isRTL ? "text-right" : "text-left"}>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("properties.list.title")}
            </h1>
            <p className="text-gray-600 mt-2">
              {t("properties.list.subtitle")}
            </p>
          </div>
        </div>

        <PropertyStatusTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          counts={counts}
        >
          <PropertyList
            properties={currentProperties}
            isLoading={isLoadingData}
            onViewProperty={handleViewProperty}
            onDeleteProperty={deleteProperty}
            isDeletingProperty={isDeletingProperty}
          />
        </PropertyStatusTabs>
      </div>

      <PropertyViewModal
        property={viewModal.property}
        isOpen={viewModal.isOpen}
        onClose={handleCloseViewModal}
      />
    </>
  );
};
