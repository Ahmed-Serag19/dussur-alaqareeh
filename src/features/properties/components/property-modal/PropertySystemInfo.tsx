"use client"

import { Calendar } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { Property } from "@/features/properties/types/property-response.types"

interface PropertySystemInfoProps {
  property: Property
  isRTL: boolean
}

export const PropertySystemInfo = ({ property, isRTL }: PropertySystemInfoProps) => {
  const { t } = useTranslation()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold flex items-center gap-2 ${isRTL ? "justify-end" : ""}`}>
        <Calendar className="h-5 w-5" />
        {t("properties.systemInformation")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">{t("properties.viewModal.propertyId")}</label>
          <p className="text-gray-900 font-mono">{property.id}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">{t("properties.viewModal.adminId")}</label>
          <p className="text-gray-900 font-mono">{property.adminId}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">{t("properties.viewModal.statusId")}</label>
          <p className="text-gray-900 font-mono">{property.statusId}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">{t("properties.viewModal.createdAt")}</label>
          <p className="text-gray-900">{formatDate(property.createdAt)}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">{t("properties.viewModal.updatedAt")}</label>
          <p className="text-gray-900">{formatDate(property.updatedAt)}</p>
        </div>
      </div>
    </div>
  )
}
