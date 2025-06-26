import { useState } from "react";
import PropertyCard from "./PropertyCard";
import PropertyFilters from "./PropertyFilters";
import type {
  Property,
  PropertyFilters as PropertyFiltersType,
} from "@/features/properties/types/property-response.types";
import useLanguage from "@/hooks/useLanguage";

interface PropertyListProps {
  properties: Property[];
  isLoading?: boolean;
  onViewProperty?: (property: Property) => void;
  onEditProperty?: (property: Property) => void;
}

export const PropertyList = ({
  properties,
  isLoading = false,
  onViewProperty,
  onEditProperty,
}: PropertyListProps) => {
  const { isRTL } = useLanguage();
  const [filters, setFilters] = useState<PropertyFiltersType>({});

  const filteredProperties = properties.filter((property) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm) ||
        property.streetAr.toLowerCase().includes(searchTerm) ||
        property.streetEn.toLowerCase().includes(searchTerm);

      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && property.status !== filters.status) {
      return false;
    }

    // Price filters
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    // Property type filter
    if (
      filters.propertyTypeId &&
      property.propertyTypeId !== filters.propertyTypeId
    ) {
      return false;
    }

    return true;
  });

  const handleClearFilters = () => {
    setFilters({});
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PropertyFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-80"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PropertyFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Results Summary */}
      <div
        className={`flex items-center justify-between ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <p className="text-gray-600">
          عرض {filteredProperties.length} من أصل {properties.length} عقار
        </p>
        {filteredProperties.length !== properties.length && (
          <p className="text-sm text-blue-600">تم تطبيق فلاتر البحث</p>
        )}
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onView={onViewProperty}
              onEdit={onEditProperty}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏠</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            لا توجد عقارات
          </h3>
          <p className="text-gray-600">
            {properties.length === 0
              ? "لم تقم بإضافة أي عقارات بعد"
              : "لا توجد عقارات تطابق معايير البحث"}
          </p>
        </div>
      )}
    </div>
  );
};
