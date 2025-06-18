import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
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
import { login } from "@/features/auth/api/auth.api";
import type { LoginDto } from "@/features/auth/types/auth.types";
import { useTranslation } from "react-i18next";
import { createLoginSchema } from "@/features/auth/types/auth.types";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(createLoginSchema(t)),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      toast.success(t("auth.login.loginSuccess"));
      localStorage.setItem("token", response.data.token);
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || t("auth.login.loginError"));
    },
  });

  const onSubmit = (data: LoginDto) => {
    loginMutation.mutate(data);
  };

  return (
    <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-4">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {t("auth.login.title")}
        </CardTitle>
        <CardDescription className="text-gray-600 text-base">
          {t("auth.login.description")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <Label
              htmlFor="email"
              className={`block text-sm font-semibold text-gray-700 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("auth.login.email")}
            </Label>
            <div className="relative group">
              <Input
                id="email"
                type="email"
                placeholder={t("auth.login.emailPlaceholder")}
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
              htmlFor="password"
              className={`block text-sm font-semibold text-gray-700 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("auth.login.password")}
            </Label>
            <div className="relative group">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.login.passwordPlaceholder")}
                className={`h-12 px-12 border-2 border-gray-200 rounded-xl bg-gray-50/50 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300 ${
                  isRTL ? "text-right" : "text-left"
                }`}
                {...register("password")}
              />
              <Lock
                className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors ${
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

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r text-lg from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                {t("auth.login.loginButtonLoading")}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {t("auth.login.loginButton")}
                <ArrowRight
                  className={`h-10 w-10 ${isRTL ? "rotate-180" : ""}`}
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
              {t("auth.login.noAccount")}{" "}
            </span>
            <Link
              to="/auth/register"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline"
            >
              {t("auth.login.createAccount")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
