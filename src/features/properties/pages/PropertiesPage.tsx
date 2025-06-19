import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PropertiesPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="space-y-6">
      <div
        className={`flex items-center justify-between ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <div className={isRTL ? "text-right" : "text-left"}>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("sidebar.viewProperties")}
          </h1>
          <p className="text-gray-600 mt-2">إدارة جميع العقارات في النظام</p>
        </div>
        <Link to="/properties/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("sidebar.addProperty")}
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className={isRTL ? "text-right" : "text-left"}>
            البحث والتصفية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              بحث
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Properties List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className={isRTL ? "text-right" : "text-left"}>
                عقار رقم {i}
              </CardTitle>
              <CardDescription className={isRTL ? "text-right" : "text-left"}>
                وصف مختصر للعقار
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p
                  className={`text-sm text-gray-600 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  المساحة: 200 متر مربع
                </p>
                <p
                  className={`text-sm text-gray-600 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  السعر: 500,000 ريال
                </p>
                <p
                  className={`text-sm text-gray-600 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  الموقع: الرياض
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
