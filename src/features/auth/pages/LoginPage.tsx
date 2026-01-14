import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/features/auth/components/LoginForm";
import { handleLogin } from "@/features/auth/api/auth.api";
import type { LoginDto } from "@/features/auth/types/auth.types";
import useLanguage from "@/hooks/useLanguage";
import { useAdmin } from "@/context/AdminContext";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "@/lib/errorHandler";

const LoginPage = () => {
  const { t } = useLanguage();
  const { login } = useAdmin();
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: (response) => {
      const token = response.data.token;
      login(token, navigate);
    },
    onError: (error: unknown) => {
      const errorMessage = getApiErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (data: LoginDto) => {
    loginMutation.mutate(data);
  };

  return (
    <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl flex items-center justify-center mb-4">
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
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={loginMutation.isPending}
        />
      </CardContent>
    </Card>
  );
};
export default LoginPage;
