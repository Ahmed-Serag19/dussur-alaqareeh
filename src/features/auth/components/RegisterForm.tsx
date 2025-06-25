import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FormField } from "@/components/ui/form-field";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { GradientButton } from "@/components/ui/gradient-button";
import useToggle from "@/hooks/useToggle";
import useLanguage from "@/hooks/useLanguage";
import useFormValidation from "@/hooks/useFormValidation";
import {
  createRegisterSchema,
  type RegisterDto,
} from "@/features/auth/types/auth.types";

interface RegisterFormProps {
  onSubmit: (data: RegisterDto) => void;
  isLoading: boolean;
}

const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
  const { value: showPassword, toggle: togglePassword } = useToggle();

  const { isRTL, t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation(createRegisterSchema(t));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={t("auth.register.name")}
          htmlFor="name"
          error={
            typeof errors.name?.message === "string"
              ? errors.name.message
              : undefined
          }
          required
        >
          <InputWithIcon
            id="name"
            type="text"
            placeholder={t("auth.register.namePlaceholder")}
            icon={<User className="h-5 w-5" />}
            focusColor="green"
            {...register("name")}
          />
        </FormField>

        <FormField
          label={t("auth.register.phone")}
          htmlFor="phone"
          error={
            typeof errors.phone?.message === "string"
              ? errors.phone.message
              : undefined
          }
          required
        >
          <InputWithIcon
            id="phone"
            type="tel"
            placeholder={t("auth.register.phonePlaceholder")}
            icon={<Phone className="h-5 w-5" />}
            focusColor="blue"
            {...register("phone")}
          />
        </FormField>
      </div>

      <FormField
        label={t("auth.register.email")}
        htmlFor="email"
        error={
          typeof errors.email?.message === "string"
            ? errors.email.message
            : undefined
        }
        required
      >
        <InputWithIcon
          id="email"
          type="email"
          placeholder={t("auth.register.emailPlaceholder")}
          icon={<Mail className="h-5 w-5" />}
          focusColor="blue"
          {...register("email")}
        />
      </FormField>

      <FormField
        label={t("auth.register.password")}
        htmlFor="password"
        error={
          typeof errors.password?.message === "string"
            ? errors.password.message
            : undefined
        }
        required
      >
        <InputWithIcon
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder={t("auth.register.passwordPlaceholder")}
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
          focusColor="red"
          {...register("password")}
        />
      </FormField>

      {/* <FormField
        label={t("auth.register.confirmPassword")}
        htmlFor="confirmPassword"
        error={
          typeof errors.confirmPassword?.message === "string"
            ? errors.confirmPassword.message
            : undefined
        }
        required
      >
        <InputWithIcon
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder={t("auth.register.confirmPasswordPlaceholder")}
          icon={<Lock className="h-5 w-5" />}
          rightIcon={
            <button
              type="button"
              onClick={toggleConfirmPassword}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
          focusColor="orange"
          {...register("confirmPassword")}
        />
      </FormField> */}

      <GradientButton
        type="submit"
        className="w-full h-12 mt-2"
        gradient="from-blue-500 to-blue-800"
        hoverGradient="hover:from-blue-600 hover:to-blue-950"
        isLoading={isLoading}
        loadingText={t("auth.register.registerButtonLoading")}
      >
        <div className="flex items-center gap-2">
          {t("auth.register.registerButton")}
          <ArrowRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
        </div>
      </GradientButton>

      <div className="text-center mt-4">
        <span className="text-gray-600 text-sm">
          {t("auth.register.haveAccount")}{" "}
        </span>
        <Link
          to="/auth/login"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline"
        >
          {t("auth.register.loginLink")}
        </Link>
      </div>
    </form>
  );
};
export default RegisterForm;
