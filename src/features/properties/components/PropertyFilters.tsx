import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import type { PropertyFilters } from "@/features/properties/types/property-response.types";
import useLanguage from "@/hooks/useLanguage";

interface PropertyFiltersProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  onClearFilters: () => void;
}

const PropertyFiltersComponent = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: PropertyFiltersProps) => {
  const { isRTL } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ""
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle
            className={`text-lg ${isRTL ? "text-right" : "text-left"}`}
          >
            البحث والتصفية
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                <X className="h-4 w-4 mr-1" />
                مسح الفلاتر
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Filter className="h-4 w-4 mr-1" />
              {isExpanded ? "إخفاء" : "إظهار"} الفلاتر
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search
            className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${
              isRTL ? "right-3" : "left-3"
            }`}
          />
          <Input
            placeholder="البحث في العقارات..."
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className={`${isRTL ? "pr-10 text-right" : "pl-10 text-left"}`}
          />
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <Label
                className={`text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                الحالة
              </Label>
              <Select
                value={filters.status || "ALL"}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="جميع الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">جميع الحالات</SelectItem>
                  <SelectItem value="PENDING">قيد المراجعة</SelectItem>
                  <SelectItem value="APPROVED">مقبول</SelectItem>
                  <SelectItem value="REJECTED">مرفوض</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Min Price */}
            <div className="space-y-2">
              <Label
                className={`text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                السعر الأدنى
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "minPrice",
                    Number(e.target.value) || undefined
                  )
                }
                className={isRTL ? "text-right" : "text-left"}
              />
            </div>

            {/* Max Price */}
            <div className="space-y-2">
              <Label
                className={`text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                السعر الأعلى
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "maxPrice",
                    Number(e.target.value) || undefined
                  )
                }
                className={isRTL ? "text-right" : "text-left"}
              />
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label
                className={`text-sm font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                نوع العقار
              </Label>
              <Select
                value={filters.propertyTypeId?.toString() || "ALL"}
                onValueChange={(value) =>
                  handleFilterChange(
                    "propertyTypeId",
                    Number(value) || undefined
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="جميع الأنواع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">جميع الأنواع</SelectItem>
                  <SelectItem value="1">فيلا</SelectItem>
                  <SelectItem value="2">شقة</SelectItem>
                  <SelectItem value="3">أرض</SelectItem>
                  <SelectItem value="4">مكتب</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default PropertyFiltersComponent;
