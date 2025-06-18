import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Loader2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { register as registerUser } from "@/features/auth/api/auth.api";
import {
  registerSchema,
  type RegisterDto,
} from "@/features/auth/types/auth.types";
import { useTranslation } from "react-i18next";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success(t("auth.register.registerSuccess"));
      navigate("/auth/login");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || t("auth.register.registerError")
      );
    },
  });

  const onSubmit = (data: RegisterDto) => {
    registerMutation.mutate(data);
  };

  return (
    <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
          <UserPlus className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {t("auth.register.title")}
        </CardTitle>
        <CardDescription className="text-gray-600 text-base">
          {t("auth.register.description")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-3">
            <Label
              htmlFor="name"
              className={`block text-sm font-semibold text-gray-700 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("auth.register.name")}
            </Label>
            <div className="relative group">
              <Input
                id="name"
                type="text"
                placeholder={t("auth.register.namePlaceholder")}
                className={`h-12 pl-12 pr-4 border-2 border-gray-200 rounded-xl bg-gray-50/50 transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 hover:border-gray-300 ${
                  isRTL ? "text-right pr-12 pl-4" : "text-left"
                }`}
                {...register("name")}
              />
              <User
                className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors ${
                  isRTL ? "right-4" : "left-4"
                }`}
              />
            </div>
            {errors.name && (
              <p
                className={`text-sm text-red-500 font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="email"
              className={`block text-sm font-semibold text-gray-700 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("auth.register.email")}
            </Label>
            <div className="relative group">
              <Input
                id="email"
                type="email"
                placeholder={t("auth.register.emailPlaceholder")}
                className={`h-12 pl-12 pr-4 border-2 border-gray-200 rounded-xl bg-gray-50/50 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300 ${
                  isRTL ? "text-right pr-12 pl-4" : "text-left"
                }`}
                {...register("email")}
              />
              <Mail
                className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors ${
                  isRTL ? "right-4" : "left-4"
                }`}
              />
            </div>
            {errors.email && (
              <p
                className={`text-sm text-red-500 font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="phone"
              className={`block text-sm font-semibold text-gray-700 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("auth.register.phone")}
            </Label>
            <div className="relative group">
              <Input
                id="phone"
                type="tel"
                placeholder={t("auth.register.phonePlaceholder")}
                className={`h-12 pl-12 pr-4 border-2 border-gray-200 rounded-xl bg-gray-50/50 transition-all duration-200 focus:border-purple-900 focus:bg-white focus:ring-4 focus:ring-purple-500/10 hover:border-gray-300 ${
                  isRTL ? "text-right pr-12 pl-4" : "text-left"
                }`}
                {...register("phone")}
              />
              <Phone
                className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors ${
                  isRTL ? "right-4" : "left-4"
                }`}
              />
            </div>
            {errors.phone && (
              <p
                className={`text-sm text-red-500 font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="password"
              className={`block text-sm font-semibold text-gray-700 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("auth.register.password")}
            </Label>
            <div className="relative group">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.register.passwordPlaceholder")}
                className={`h-12 px-12 border-2 border-gray-200 rounded-xl bg-gray-50/50 transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 hover:border-gray-300 ${
                  isRTL ? "text-right" : "text-left"
                }`}
                {...register("password")}
              />
              <Lock
                className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors ${
                  isRTL ? "right-4" : "left-4"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors ${
                  isRTL ? "left-4" : "right-4"
                }`}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                className={`text-sm text-red-500 font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="confirmPassword"
              className={`block text-sm font-semibold text-gray-700 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("auth.register.confirmPassword")}
            </Label>
            <div className="relative group">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("auth.register.confirmPasswordPlaceholder")}
                className={`h-12 px-12 border-2 border-gray-200 rounded-xl bg-gray-50/50 transition-all duration-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 hover:border-gray-300 ${
                  isRTL ? "text-right" : "text-left"
                }`}
                {...register("confirmPassword")}
              />
              <Lock
                className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors ${
                  isRTL ? "right-4" : "left-4"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors ${
                  isRTL ? "left-4" : "right-4"
                }`}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                className={`text-sm text-red-500 font-medium ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r text-lg from-blue-800 to-blue-600 hover:from-blue-950 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                {t("auth.register.registerButtonLoading")}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {t("auth.register.registerButton")}
                <ArrowRight
                  className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`}
                />
              </div>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                أو
              </span>
            </div>
          </div>

          <div className="text-center">
            <span className="text-gray-600 text-sm">
              {t("auth.register.haveAccount")}{" "}
            </span>
            <Link
              to="/auth/login"
              className="text-sm font-semibold text-blue-800 hover:text-blue-700 transition-colors hover:underline"
            >
              {t("auth.register.loginLink")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
