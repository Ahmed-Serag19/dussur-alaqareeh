import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { PropertyList } from "@/features/properties/components/PropertyList";
import { getMyProperties } from "@/features/properties/api/properties-list.api";
import type { Property } from "@/features/properties/types/property-response.types";
import useLanguage from "@/hooks/useLanguage";
import { toast } from "react-hot-toast";

export const PropertiesPage = () => {
  const { isRTL } = useLanguage();

  const {
    data: properties = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my-properties"],
    queryFn: getMyProperties,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleViewProperty = (property: Property) => {
    // TODO: Navigate to property details page
    console.log("View property:", property);
    toast.success(`عرض تفاصيل العقار: ${property.title}`);
  };

  const handleEditProperty = (property: Property) => {
    // TODO: Navigate to edit property page
    console.log("Edit property:", property);
    toast.success(`تعديل العقار: ${property.title}`);
  };

  const handleRefresh = () => {
    refetch();
    toast.success("تم تحديث قائمة العقارات");
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
            <h1 className="text-3xl font-bold text-gray-900">عقاراتي</h1>
            <p className="text-gray-600 mt-2">إدارة جميع العقارات الخاصة بك</p>
          </div>
        </div>

        <div className="text-center py-12">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            حدث خطأ في تحميل العقارات
          </h3>
          <p className="text-gray-600 mb-4">
            تعذر تحميل قائمة العقارات. يرجى المحاولة مرة أخرى.
          </p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`flex items-center justify-between ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <div className={isRTL ? "text-right" : "text-left"}>
          <h1 className="text-3xl font-bold text-gray-900">عقاراتي</h1>
          <p className="text-gray-600 mt-2">إدارة جميع العقارات الخاصة بك</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            تحديث
          </Button>
          <Link to="/properties/add">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة عقار جديد
            </Button>
          </Link>
        </div>
      </div>

      {/* Properties List */}
      <PropertyList
        properties={properties}
        isLoading={isLoading}
        onViewProperty={handleViewProperty}
        onEditProperty={handleEditProperty}
      />
    </div>
  );
};
