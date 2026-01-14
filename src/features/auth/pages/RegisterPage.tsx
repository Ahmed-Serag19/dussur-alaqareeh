import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { handleRegister as registerUser } from "@/features/auth/api/auth.api";
import type { RegisterDto } from "@/features/auth/types/auth.types";
import useLanguage from "@/hooks/useLanguage";
import { getApiErrorMessage } from "@/lib/errorHandler";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success(t("auth.register.registerSuccess"));
      navigate("/auth/login");
    },
    onError: (error: unknown) => {
      const errorMessage = getApiErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (data: RegisterDto) => {
    registerMutation.mutate(data);
  };

  return (
    <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2 pb-4">
        <div className="mx-auto w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-2">
          <UserPlus className="h-7 w-7 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {t("auth.register.title")}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {t("auth.register.description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm
          onSubmit={handleSubmit}
          isLoading={registerMutation.isPending}
        />
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
