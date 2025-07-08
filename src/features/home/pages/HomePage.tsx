import { Plus, Eye, TrendingUp, Building } from "lucide-react";
import ActionCard from "@/components/ui/action-card";
import { Card, CardHeader } from "@/components/ui/card";
import useLanguage from "@/hooks/useLanguage";
import { usePropertiesData } from "@/features/properties/hooks/usePropertiesData";

const HomePage = () => {
  const { isRTL, t } = useLanguage();
  const { getCounts } = usePropertiesData();
  const { all, approved } = getCounts();
  const stats = [
    {
      label: t("dashboard.stats.total"),
      value: all,
      icon: Building,
      color: "text-blue-600",
    },
    {
      label: t("dashboard.stats.available"),
      value: approved,
      icon: TrendingUp,
      color: "text-green-600",
    },
  ];

  const actions = [
    {
      title: t("dashboard.actions.add"),
      description: t("dashboard.actions.addDesc"),
      href: "/properties/add",
      icon: Plus,
      gradient: "from-blue-600 to-blue-900",
    },
    {
      title: t("dashboard.actions.view"),
      description: t("dashboard.actions.viewDesc"),
      href: "/properties",
      icon: Eye,
      gradient: "from-green-600 to-teal-600",
    },
  ];

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className={`space-y-4 text-center`}>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center sm:text-start">
          {t("dashboard.welcome")}
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto sm:mx-0 text-center sm:text-start">
          {t("dashboard.subtitle", {
            defaultValue: "إدارة و تنظيم جميع عقاراتك  ",
          })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto sm:mx-0">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-sm bg-white border border-gray-100 rounded-lg"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div
                  className={isRTL ? "text-right flex-1" : "text-left flex-1"}
                >
                  <p className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Main Actions */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto sm:mx-0">
        {actions.map((action, index) => (
          <ActionCard
            key={index}
            title={action.title}
            description={action.description}
            href={action.href}
            icon={action.icon}
            gradient={action.gradient}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
