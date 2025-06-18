import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
// import { PropertiesPage } from "@/features/properties/pages/properties-page";
// import { AddPropertyPage } from "@/features/properties/pages/add-property-page";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      //   {
      //     index: true,
      //     element: <DashboardPage />,
      //   },
      //   {
      //     path: "properties",
      //     element: <PropertiesPage />,
      //   },
      //   {
      //     path: "properties/add",
      //     element: <AddPropertyPage />,
      //   },
    ],
  },
]);
