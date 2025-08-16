import { DashboardCard } from "./DashboardCard";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    type: "increase" | "decrease";
  };
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "loss";
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon,
  variant = "default" 
}: MetricCardProps) => {
  return (
    <DashboardCard title={title} variant={variant}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className={cn(
            "text-2xl font-bold",
            variant === "success" && "text-success-foreground",
            variant === "warning" && "text-warning-foreground", 
            variant === "loss" && "text-loss-foreground"
          )}>
            {value}
          </p>
          {change && (
            <div className={cn(
              "flex items-center gap-1 text-xs",
              change.type === "increase" ? "text-profit" : "text-loss"
            )}>
              {change.type === "increase" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {change.value}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn(
            "opacity-60",
            variant === "success" && "text-success-foreground",
            variant === "warning" && "text-warning-foreground",
            variant === "loss" && "text-loss-foreground"
          )}>
            {icon}
          </div>
        )}
      </div>
    </DashboardCard>
  );
};