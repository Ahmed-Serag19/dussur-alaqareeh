import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FieldError } from "react-hook-form";
import useLanguage from "@/hooks/useLanguage";

interface DescriptionInputProps {
  register: any;
  error?: FieldError;
}

const DescriptionInput = ({ register, error }: DescriptionInputProps) => {
  const { isRTL, t } = useLanguage();

  return (
    <div className="space-y-2">
      <Label
        htmlFor="description"
        className={`block text-sm font-medium ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {t("properties.shortDescription")}
      </Label>
      <Textarea
        id="description"
        rows={3}
        placeholder={t("properties.descriptionPlaceholder")}
        className={isRTL ? "text-right" : "text-left"}
        {...register("description")}
      />
      {error && (
        <p className="text-sm text-red-600 text-right">{error.message}</p>
      )}
    </div>
  );
};

export default DescriptionInput;
