import { PropertyCard } from "./PropertyCard";
import { PropertyDeleteDialog } from "./PropertyDeleteDialog";
import type { Property } from "@/features/properties/types/property-response.types";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface PropertyListProps {
  properties: Property[];
  isLoading: boolean;
  onViewProperty: (property: Property) => void;
  onEditProperty: (property: Property) => void;
  onDeleteProperty: (id: number) => void;
  isDeletingProperty?: boolean;
}

export const PropertyList = ({
  properties,
  isLoading,
  onViewProperty,
  onEditProperty,
  onDeleteProperty,
  isDeletingProperty = false,
}: PropertyListProps) => {
  const { t } = useTranslation();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    property: Property | null;
  }>({
    isOpen: false,
    property: null,
  });

  const handleDeleteClick = (property: Property) => {
    setDeleteDialog({
      isOpen: true,
      property,
    });
  };

  const handleDeleteConfirm = (id: number) => {
    onDeleteProperty(id);
    setDeleteDialog({
      isOpen: false,
      property: null,
    });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      isOpen: false,
      property: null,
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64"></div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("properties.list.noProperties")}
        </h3>
        <p className="text-gray-600">
          {t("properties.list.noPropertiesMessage")}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 justify-center xl:grid-cols-2  gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onView={onViewProperty}
            onEdit={onEditProperty}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <PropertyDeleteDialog
        property={deleteDialog.property}
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeletingProperty}
      />
    </>
  );
};
