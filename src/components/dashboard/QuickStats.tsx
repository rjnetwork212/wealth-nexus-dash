import { MetricCard } from "./MetricCard";
import { 
  Wallet, 
  TrendingUp, 
  Building2, 
  Bitcoin,
  DollarSign,
  PieChart
} from "lucide-react";
import { Portfolio } from "@/lib/storage";

interface QuickStatsProps {
  portfolio: Portfolio;
  totalPortfolio: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export const QuickStats = ({ portfolio, totalPortfolio, monthlyIncome, monthlyExpenses }: QuickStatsProps) => {
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  
  const netIncome = monthlyIncome - monthlyExpenses;
  const incomeChange = monthlyIncome > 0 ? "+15.4%" : "0%";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      <MetricCard
        title="Total Portfolio"
        value={formatCurrency(totalPortfolio)}
        change={{ value: "+8.2%", type: "increase" }}
        icon={<PieChart className="h-6 w-6" />}
        variant="success"
      />
      
      <MetricCard
        title="Personal Assets"
        value={formatCurrency(portfolio.personal)}
        change={{ value: "+5.1%", type: "increase" }}
        icon={<Wallet className="h-6 w-6" />}
      />
      
      <MetricCard
        title="Business Value"
        value={formatCurrency(portfolio.business)}
        change={{ value: "+12.3%", type: "increase" }}
        icon={<Building2 className="h-6 w-6" />}
        variant="success"
      />
      
      <MetricCard
        title="Crypto Holdings"
        value={formatCurrency(portfolio.crypto)}
        change={{ value: "-3.2%", type: "decrease" }}
        icon={<Bitcoin className="h-6 w-6" />}
        variant="warning"
      />
      
      <MetricCard
        title="Stock Portfolio"
        value={formatCurrency(portfolio.stocks)}
        change={{ value: "+6.8%", type: "increase" }}
        icon={<TrendingUp className="h-6 w-6" />}
        variant="success"
      />
      
      <MetricCard
        title="Monthly Net"
        value={formatCurrency(netIncome)}
        change={{ 
          value: incomeChange, 
          type: netIncome >= 0 ? "increase" : "decrease" 
        }}
        icon={<DollarSign className="h-6 w-6" />}
        variant={netIncome >= 0 ? "success" : "loss"}
      />
    </div>
  );
};