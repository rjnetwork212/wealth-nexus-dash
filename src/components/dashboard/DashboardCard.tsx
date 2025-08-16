import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "loss";
}

export const DashboardCard = ({ 
  title, 
  description, 
  children, 
  className,
  variant = "default" 
}: DashboardCardProps) => {
  const variants = {
    default: "bg-gradient-card border-border shadow-card",
    success: "bg-gradient-success border-profit/20 shadow-success",
    warning: "bg-gradient-primary border-warning/20 shadow-glow",
    loss: "bg-gradient-card border-loss/20 shadow-card"
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
      variants[variant],
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className={cn(
          "text-lg font-semibold",
          variant === "success" && "text-success-foreground",
          variant === "warning" && "text-warning-foreground",
          variant === "loss" && "text-loss-foreground"
        )}>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className={cn(
            variant === "success" && "text-success-foreground/80",
            variant === "warning" && "text-warning-foreground/80",
            variant === "loss" && "text-loss-foreground/80"
          )}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};