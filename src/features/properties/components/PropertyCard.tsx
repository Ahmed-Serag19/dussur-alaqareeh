"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Home,
  Ruler,
  Calendar,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Property } from "@/features/properties/types/property-response.types";
import { PropertyStatusBadge } from "./PropertyStatusBadge";
import { useLookupData } from "@/features/properties/hooks/useLookupData";
import useLanguage from "@/hooks/useLanguage";
import { useTranslation } from "react-i18next";

interface PropertyCardProps {
  property: Property;
  onView: (property: Property) => void;
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
}

export const PropertyCard = ({
  property,
  onView,
  onEdit,
  onDelete,
}: PropertyCardProps) => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const { getFullLocationString, getPropertyTypeName } = useLookupData();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(isRTL ? "ar-SA" : "en-US").format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="group hover:shadow-lg min-w-xs max-w-sm transition-all duration-200 border-gray-200 hover:border-gray-300">
      <CardHeader className="pb-3">
        <div
          className={`flex items-start justify-between ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 mb-1">
              {property.title}
            </h3>
            <div
              className={`flex items-center gap-1 text-gray-600 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                {getFullLocationString(
                  property.regionId,
                  property.cityId,
                  property.neighborhoodId
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PropertyStatusBadge status={property.status} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"}>
                <DropdownMenuItem onClick={() => onView(property)}>
                  <Eye className="h-4 w-4 mr-2" />
                  {t("properties.actions.view")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(property)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {t("properties.actions.edit")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(property)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t("properties.actions.delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          {/* Price and Property Type */}
          <div
            className={`flex items-center justify-between ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(property.price)} {isRTL ? "ريال" : "SAR"}
            </span>
            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {getPropertyTypeName(property.propertyTypeId)}
            </span>
          </div>

          {/* Property Details */}
          <div
            className={`grid grid-cols-2 gap-3 text-sm ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`flex items-center gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <Ruler className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">
                {property.area} {isRTL ? "م²" : "sqm"}
              </span>
            </div>
            <div
              className={`flex items-center gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <Home className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">
                {property.roomsCount} {isRTL ? "غرف" : "rooms"}
              </span>
            </div>
          </div>

          {/* Description */}
          {(property.descriptionAr || property.descriptionEn) && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {isRTL ? property.descriptionAr : property.descriptionEn}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-gray-100 flex-col space-y-3">
        {/* Date - Separate line */}
        <div
          className={`flex items-center gap-1 text-xs text-gray-500 w-full ${
            isRTL ? "flex-row-reverse justify-end" : "justify-start"
          }`}
        >
          <Calendar className="h-3 w-3" />
          <span>{formatDate(property.createdAt)}</span>
        </div>

        {/* Action Buttons - Separate line */}
        <div className="flex items-center gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(property)}
            className="flex-1 gap-1"
          >
            <Eye className="h-3 w-3" />
            {t("properties.actions.view")}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onEdit(property)}
            className="flex-1 gap-1"
          >
            <Edit className="h-3 w-3" />
            {t("properties.actions.edit")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
