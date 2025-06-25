import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Eye, User, LogOut, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import MainLayoutLogo from "@/assets/images/main-layout-logo.png";
import { useSidebar } from "@/context/SidebarContext";
import useWindowWidth from "@/hooks/useWindowWidth";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { setOpen } = useSidebar();
  const width = useWindowWidth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success(t("auth.logout.success"));
    navigate("/auth/login");
  };

  const navigation = [
    {
      name: t("sidebar.home"),
      href: "/",
      icon: Home,
    },
    {
      name: t("sidebar.addProperty"),
      href: "/properties/add",
      icon: Plus,
    },
    {
      name: t("sidebar.viewProperties"),
      href: "/",
      icon: Eye,
    },
    {
      name: t("sidebar.profile"),
      href: "/",
      icon: User,
    },
  ];

  return (
    <aside
      className={`bg-gray-50 max-h-screen overflow-hidden p-8 flex flex-col gap-8 h-full ${
        isRTL ? "border-l border-gray-300" : "border-r border-gray-300"
      }`}
    >
      <Link to="/">
        <div className="flex justify-center">
          <img src={MainLayoutLogo} alt="Dusser Logo" className="h-16 w-auto" />
        </div>
      </Link>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => width && width < 768 && setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-50 text-blue-950 border-r-2 border-blue-950 shadow-sm"
                  : "text-gray-700 hover:text-gray-900 hover:bg-blue-100",
                isRTL ? "text-right" : "text-left"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1">{item.name}</span>
            </NavLink>
          );
        })}

        {/* Logout */}
        <div className="pt-4 border-t border-gray-200 mt-8">
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
  );
};

export default Sidebar;
