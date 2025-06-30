import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useLanguage from "@/hooks/useLanguage";
import type { FieldErrors } from "react-hook-form";

interface PriceAndAreaProps {
  register: any;
  errors: FieldErrors;
}

const PriceAndArea = ({ register, errors }: PriceAndAreaProps) => {
  const { isRTL, t } = useLanguage();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {["price", "area"].map((field) => (
        <div className="space-y-2" key={field}>
          <Label
            htmlFor={field}
            className={`block text-sm font-medium ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t(`properties.${field}`)}
          </Label>
          <Input
            id={field}
            type="number"
            placeholder={t(`properties.${field}Placeholder`)}
            className={isRTL ? "text-right" : "text-left"}
            {...register(field, { valueAsNumber: true })}
          />
          {errors?.[field] && (
            <p className="text-sm text-red-600 text-right">
              {typeof errors?.[field]?.message === "string"
                ? errors[field].message
                : ""}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PriceAndArea;
