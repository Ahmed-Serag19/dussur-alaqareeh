import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface PropertyStatusBadgeProps {
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export const PropertyStatusBadge = ({ status }: PropertyStatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "APPROVED":
        return {
          variant: "default" as const,
          className: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          text: "مقبول",
        };
      case "REJECTED":
        return {
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 border-red-200",
          icon: XCircle,
          text: "مرفوض",
        };
      case "PENDING":
      default:
        return {
          variant: "secondary" as const,
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Clock,
          text: "قيد المراجعة",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={`flex items-center gap-1 ${config.className}`}
    >
      <Icon className="h-3 w-3" />
      {config.text}
    </Badge>
  );
};
