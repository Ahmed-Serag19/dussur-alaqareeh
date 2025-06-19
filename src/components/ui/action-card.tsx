import type { ReactNode } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ActionCardProps {
  title: string;
  description?: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
  children?: ReactNode;
}

const ActionCard = ({
  title,
  description,
  href,
  icon: Icon,
  gradient,
}: ActionCardProps) => {
  return (
    <Link to={href} className="block">
      <Card className="group cursor-pointer shadow-md border-none hover:shadow-lg transition-all duration-200 overflow-hidden h-full bg-white">
        <CardHeader className="p-6 ">
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200`}
            >
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                {title}
              </h3>
              {description && <p className="text-gray-600 ">{description}</p>}
            </div>
            <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};
export default ActionCard;
