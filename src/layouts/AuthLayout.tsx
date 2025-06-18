import { Outlet } from "react-router-dom";
import AuthLogo from "@/assets/images/auth-layout-logo.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Form Section - Now on the RIGHT */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Logo Section - Now on the LEFT */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12 order-1 lg:order-2">
        <div className="max-w-md w-full">
          <img
            src={AuthLogo}
            alt="Dusser Logo"
            className="w-full h-auto max-w-sm mx-auto"
          />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
