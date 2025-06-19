import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useLanguage from "@/hooks/useLanguage";

interface PropertyFormActionsProps {
  isLoading: boolean;
}

const PropertyFormActions = ({ isLoading }: PropertyFormActionsProps) => {
  const { isRTL, t } = useLanguage();

  return (
    <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
      <Button type="submit" className="px-8" disabled={isLoading}>
        {isLoading ? t("common.loading") : t("properties.saveProperty")}
      </Button>
      <Link to="/properties">
        <Button type="button" variant="outline" className="px-8">
          {t("properties.cancel")}
        </Button>
      </Link>
    </div>
  );
};

export default PropertyFormActions;
