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
import useLanguage from "@/hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { useLookupContext } from "../context/lookup-context";
import clsx from "clsx";
import { ImageCarousel } from "./ImageCarousel";
interface PropertyCardProps {
  property: Property;
  onView: (property: Property) => void;

  onDelete: (property: Property) => void;
}

export const PropertyCard = ({
  property,
  onView,

  onDelete,
}: PropertyCardProps) => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const { getFullLocationString, getPropertyTypeName } = useLookupContext();

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

  // Use all images for the card carousel
  const images = Array.isArray(property.imageUrls) ? property.imageUrls : [];

  return (
    <Card className="group rounded-xl shadow-sm hover:shadow-lg border pt-0 border-gray-200 bg-white transition-all duration-200 max-w-md sm:min-w-md  overflow-hidden">
      {/* Image Carousel or Placeholder */}
      <ImageCarousel images={images} heightClass="h-52" />
      <CardHeader className="pb-3">
        <div
          className={clsx(
            "flex items-start justify-between",
            isRTL && "flex-row-reverse"
          )}
        >
          <div className={clsx("flex-1", isRTL ? "text-right" : "text-left")}>
            <h3 className="font-semibold text-lg text-slate-800 line-clamp-1 mb-1">
              {property.title}
            </h3>
            <div
              className={clsx(
                "flex items-center gap-1 text-slate-500",
                isRTL && "flex-row-reverse"
              )}
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
            className={clsx(
              "flex items-center justify-between",
              isRTL && "flex-row-reverse"
            )}
          >
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(property.price)} {isRTL ? "ريال" : "SAR"}
            </span>
            <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full font-medium">
              {getPropertyTypeName(property.propertyTypeId)}
            </span>
          </div>

          {/* Property Details */}
          <div
            className={clsx(
              "grid grid-cols-2 gap-3 text-sm",
              isRTL ? "text-right" : "text-left"
            )}
          >
            <div
              className={clsx(
                "flex items-center gap-2",
                isRTL && "flex-row-reverse"
              )}
            >
              <Ruler className="h-4 w-4 text-slate-400" />
              <span className="text-slate-600">
                {property.area} {isRTL ? "م²" : "sqm"}
              </span>
            </div>
            <div
              className={clsx(
                "flex items-center gap-2",
                isRTL && "flex-row-reverse"
              )}
            >
              <Home className="h-4 w-4 text-slate-400" />
              <span className="text-slate-600">
                {property.roomsCount} {isRTL ? "غرف" : "rooms"}
              </span>
            </div>
          </div>

          {/* Description */}
          {(property.descriptionAr || property.descriptionEn) && (
            <p className="text-slate-500 text-sm line-clamp-2">
              {isRTL ? property.descriptionAr : property.descriptionEn}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-gray-100 flex-col space-y-3">
        {/* Date - Separate line */}
        <div
          className={clsx(
            "flex items-center gap-1 text-xs text-slate-400 w-full",
            isRTL ? "flex-row-reverse justify-end" : "justify-start"
          )}
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
            className="flex-1 gap-1 border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer"
          >
            <Eye className="h-3 w-3" />
            {t("properties.actions.view")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
