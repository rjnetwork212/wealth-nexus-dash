import { MetricCard } from "./MetricCard";
import { 
  Wallet, 
  TrendingUp, 
  Building2, 
  Bitcoin,
  DollarSign,
  PieChart
} from "lucide-react";

export const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      <MetricCard
        title="Total Portfolio"
        value="$115,280"
        change={{ value: "+8.2%", type: "increase" }}
        icon={<PieChart className="h-6 w-6" />}
        variant="success"
      />
      
      <MetricCard
        title="Personal Assets"
        value="$42,500"
        change={{ value: "+5.1%", type: "increase" }}
        icon={<Wallet className="h-6 w-6" />}
      />
      
      <MetricCard
        title="Business Value"
        value="$28,950"
        change={{ value: "+12.3%", type: "increase" }}
        icon={<Building2 className="h-6 w-6" />}
        variant="success"
      />
      
      <MetricCard
        title="Crypto Holdings"
        value="$24,680"
        change={{ value: "-3.2%", type: "decrease" }}
        icon={<Bitcoin className="h-6 w-6" />}
        variant="warning"
      />
      
      <MetricCard
        title="Stock Portfolio"
        value="$35,150"
        change={{ value: "+6.8%", type: "increase" }}
        icon={<TrendingUp className="h-6 w-6" />}
        variant="success"
      />
      
      <MetricCard
        title="Monthly Income"
        value="$8,200"
        change={{ value: "+15.4%", type: "increase" }}
        icon={<DollarSign className="h-6 w-6" />}
        variant="success"
      />
    </div>
  );
};