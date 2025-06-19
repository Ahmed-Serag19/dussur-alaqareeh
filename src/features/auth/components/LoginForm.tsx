import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FormField } from "@/components/ui/form-field";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { GradientButton } from "@/components/ui/gradient-button";
import useToggle from "@/hooks/useToggle";
import useLanguage from "@/hooks/useLanguage";
import useFormValidation from "@/hooks/useFormValidation";
import {
  createLoginSchema,
  type LoginDto,
} from "@/features/auth/types/auth.types";

interface LoginFormProps {
  onSubmit: (data: LoginDto) => void;
  isLoading: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const { value: showPassword, toggle: togglePassword } = useToggle();
  const { isRTL, t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation(createLoginSchema(t));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label={t("auth.login.email")}
        htmlFor="email"
        error={
          typeof errors.email === "object" && errors.email
            ? (errors.email as { message?: string }).message
            : undefined
        }
        required
      >
        <InputWithIcon
          id="email"
          type="email"
          placeholder={t("auth.login.emailPlaceholder")}
          icon={<Mail className="h-5 w-5" />}
          focusColor="blue"
          {...register("email")}
        />
      </FormField>

      <FormField
        label={t("auth.login.password")}
        htmlFor="password"
        error={
          typeof errors.password === "object" && errors.password
            ? (errors.password as { message?: string }).message
            : undefined
        }
        required
      >
        <InputWithIcon
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder={t("auth.login.passwordPlaceholder")}
          icon={<Lock className="h-5 w-5" />}
          rightIcon={
            <button
              type="button"
              onClick={togglePassword}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
          focusColor="blue"
          {...register("password")}
        />
      </FormField>

      <div
        className={`flex items-center ${
          isRTL ? "justify-start" : "justify-end"
        }`}
      >
        <Link
          to="/auth/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline"
        >
          {t("auth.login.forgotPassword")}
        </Link>
      </div>

      <GradientButton
        type="submit"
        className="w-full h-12"
        isLoading={isLoading}
        loadingText={t("auth.login.loginButtonLoading")}
      >
        <div className="flex items-center gap-2">
          {t("auth.login.loginButton")}
          <ArrowRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
        </div>
      </GradientButton>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">
            {t("common.or")}
          </span>
        </div>
      </div>

      <div className="text-center">
        <span className="text-gray-600 text-sm">
          {t("auth.login.noAccount")}{" "}
        </span>
        <Link
          to="/auth/register"
          className="text-sm font-semibold text-blue-600 hover:text-blue-950 transition-colors hover:underline"
        >
          {t("auth.login.createAccount")}
        </Link>
      </div>
    </form>
  );
};
export default LoginForm;
