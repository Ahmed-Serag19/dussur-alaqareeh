import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { FieldError } from "react-hook-form";
import useLanguage from "@/hooks/useLanguage";

interface TitleInputProps {
  register: any;
  error?: FieldError;
}

const TitleInput = ({ register, error }: TitleInputProps) => {
  const { isRTL, t } = useLanguage();

  return (
    <div className="space-y-2">
      <Label
        htmlFor="title"
        className={`block text-sm font-medium ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {t("properties.title")}
      </Label>
      <Input
        id="title"
        placeholder={t("properties.titlePlaceholder")}
        className={`${isRTL ? "text-right" : "text-left"} h-10`}
        {...register("title")}
      />
      {error && (
        <p className="text-sm text-red-600 text-right">{error.message}</p>
      )}
    </div>
  );
};

export default TitleInput;
