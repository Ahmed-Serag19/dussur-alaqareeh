import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Eye, User, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success(t("auth.login.loginSuccess"));
    navigate("/auth/login");
  };

  const isRTL = i18n.language === "ar";

  const navigation = [
    {
      name: t("sidebar.addProperty"),
      href: "/properties/add",
      icon: Plus,
      className: "text-blue-600 hover:text-blue-700 hover:bg-blue-50",
    },
    {
      name: t("sidebar.viewProperties"),
      href: "/properties",
      icon: Eye,
      className: "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
    },
    {
      name: t("sidebar.profile"),
      href: "/profile",
      icon: User,
      className: "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 z-50",
          isRTL ? "right-0" : "left-0",
          isOpen
            ? "translate-x-0"
            : isRTL
            ? "translate-x-full"
            : "-translate-x-full"
        )}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-center">
            <img
              src="/assets/images/login-page-logo.png"
              alt="Dusser"
              className="h-12 w-auto"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm"
                    : item.className,
                  isRTL ? "text-right" : "text-left"
                )}
                onClick={() => onClose()}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={cn(
                "w-full justify-start gap-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200",
                isRTL ? "text-right" : "text-left"
              )}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1">{t("sidebar.logout")}</span>
            </Button>
          </div>
        </nav>
      </aside>
    </>
  );
};
