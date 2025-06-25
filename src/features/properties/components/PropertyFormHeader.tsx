import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useLanguage from "@/hooks/useLanguage";

const PropertyFormHeader = () => {
  const { isRTL, t } = useLanguage();

  return (
    <div
      className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
    >
      <Link to="/properties">
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
        </Button>
      </Link>
      <div className={isRTL ? "text-right" : "text-left"}>
        <h1 className="text-2xl font-bold text-gray-900">
          {t("properties.addProperty")}
        </h1>
        <p className="text-gray-600 mt-1">{t("properties.propertyDetails")}</p>
      </div>
    </div>
  );
};

export default PropertyFormHeader;
