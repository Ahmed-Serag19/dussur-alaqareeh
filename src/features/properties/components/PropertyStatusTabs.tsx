"use client";

import type React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { PropertyStatus } from "@/features/properties/types/property-response.types";
import { useTranslation } from "react-i18next";
import useLanguage from "@/hooks/useLanguage";

interface PropertyStatusTabsProps {
  activeTab: PropertyStatus | "ALL";
  onTabChange: (tab: string) => void;
  counts: {
    all: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  children: React.ReactNode;
}

export const PropertyStatusTabs = ({
  activeTab,
  onTabChange,
  counts,
  children,
}: PropertyStatusTabsProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const tabs = [
    {
      value: "ALL",
      label: t("properties.status.all"),
      count: counts.all,
      color: "bg-gray-100 text-gray-800",
    },
    {
      value: "PENDING",
      label: t("properties.status.pending"),
      count: counts.pending,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "APPROVED",
      label: t("properties.status.approved"),
      count: counts.approved,
      color: "bg-green-100 text-green-800",
    },
    {
      value: "REJECTED",
      label: t("properties.status.rejected"),
      count: counts.rejected,
      color: "bg-red-100 text-red-800",
    },
  ];

  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full items-center"
    >
      <TabsList className={`grid grid-cols-2 grid-rows-2 gap-2 h-auto p-2 `}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`h-12 text-sm flex items-center justify-between gap-2 ${
              isRTL ? "flex-row-reverse" : ""
            } data-[state=active]:bg-white data-[state=active]:shadow-sm`}
          >
            <span className="font-medium">{tab.label}</span>
            <Badge
              variant="secondary"
              className={`${tab.color} text-xs px-2 py-1`}
            >
              {tab.count}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
};
