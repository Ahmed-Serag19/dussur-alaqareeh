import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Home,
  Ruler,
  Calendar,
  Eye,
  Edit,
  MoreVertical,
  Bed,
  Bath,
  Building,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropertyStatusBadge } from "./PropertyStatusBadge";
import type { Property } from "@/features/properties/types/property-response.types";
import useLanguage from "@/hooks/useLanguage";

interface PropertyCardProps {
  property: Property;
  onView?: (property: Property) => void;
  onEdit?: (property: Property) => void;
}

const PropertyCard = ({ property, onView, onEdit }: PropertyCardProps) => {
  const { isRTL } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <PropertyStatusBadge status={property.status} />
              <Badge variant="outline" className="text-xs">
                ID: {property.id}
              </Badge>
            </div>
            <h3
              className={`font-semibold text-lg text-gray-900 line-clamp-2 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {property.title}
            </h3>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(property)}>
                <Eye className="h-4 w-4 mr-2" />
                عرض التفاصيل
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(property)}>
                <Edit className="h-4 w-4 mr-2" />
                تعديل
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price */}
        <div className="text-2xl font-bold text-blue-600">
          {formatPrice(property.price)}
        </div>

        {/* Description */}
        <p
          className={`text-gray-600 text-sm line-clamp-2 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {property.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm truncate">{property.streetAr}</span>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Ruler className="h-4 w-4" />
            <span>{property.area} م²</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Building className="h-4 w-4" />
            <span>{property.floorsCount} طوابق</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Bed className="h-4 w-4" />
            <span>{property.roomsCount} غرف</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Bath className="h-4 w-4" />
            <span>{property.bathroomsCount} حمام</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(property.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Home className="h-3 w-3" />
            <span>عمر البناء: {property.buildingAge} سنة</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onView?.(property)}
          >
            <Eye className="h-4 w-4 mr-1" />
            عرض
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit?.(property)}
          >
            <Edit className="h-4 w-4 mr-1" />
            تعديل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default PropertyCard;
