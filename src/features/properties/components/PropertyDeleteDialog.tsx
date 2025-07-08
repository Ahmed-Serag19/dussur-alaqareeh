import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import type { Property } from "@/features/properties/types/property-response.types";
import { useTranslation } from "react-i18next";
import useLanguage from "@/hooks/useLanguage";

interface PropertyDeleteDialogProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
  isDeleting?: boolean;
}

export const PropertyDeleteDialog = ({
  property,
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}: PropertyDeleteDialogProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  if (!property) return null;

  const handleConfirm = () => {
    onConfirm(property.id);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className={isRTL ? "text-right" : "text-left"}>
        <AlertDialogHeader>
          <div
            className={`flex items-center gap-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                {t("properties.delete.title")}
              </AlertDialogTitle>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-gray-600 space-y-3">
          <p>{t("properties.delete.message")}</p>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium text-gray-900">{property.title}</p>
            <p className="text-sm text-gray-600">ID: {property.id}</p>
          </div>
          <p className="text-sm text-red-600 font-medium">
            {t("properties.delete.warning")}
          </p>
        </AlertDialogDescription>

        <AlertDialogFooter
          className={`gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={isDeleting}>
              {t("common.cancel")}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting
                ? t("properties.delete.deleting")
                : t("properties.delete.confirm")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
