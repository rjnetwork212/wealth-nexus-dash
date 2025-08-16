import { DashboardCard } from "./DashboardCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: 1,
    type: "Buy",
    asset: "AAPL",
    amount: "$2,500",
    date: "2024-01-15",
    status: "completed",
    category: "stock"
  },
  {
    id: 2,
    type: "Sell",
    asset: "BTC",
    amount: "$1,200",
    date: "2024-01-14",
    status: "completed",
    category: "crypto"
  },
  {
    id: 3,
    type: "Dividend",
    asset: "MSFT",
    amount: "$85",
    date: "2024-01-13",
    status: "completed",
    category: "stock"
  },
  {
    id: 4,
    type: "Revenue",
    asset: "Business Income",
    amount: "$3,200",
    date: "2024-01-12",
    status: "completed",
    category: "business"
  },
  {
    id: 5,
    type: "Expense",
    asset: "Office Rent",
    amount: "$800",
    date: "2024-01-10",
    status: "completed",
    category: "business"
  }
];

export const RecentTransactions = () => {
  const getTypeColor = (type: string, category: string) => {
    if (type === "Buy" || type === "Revenue" || type === "Dividend") {
      return "bg-success text-success-foreground";
    }
    if (type === "Sell") {
      return "bg-warning text-warning-foreground";
    }
    if (type === "Expense") {
      return "bg-loss text-loss-foreground";
    }
    return "bg-muted text-muted-foreground";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "stock": return "📈";
      case "crypto": return "₿";
      case "business": return "🏢";
      default: return "💰";
    }
  };

  return (
    <DashboardCard 
      title="Recent Transactions" 
      description="Latest financial activities"
      className="col-span-full lg:col-span-1"
    >
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="text-lg">{getCategoryIcon(transaction.category)}</div>
              <div>
                <p className="font-medium text-sm">{transaction.asset}</p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className={cn("text-xs", getTypeColor(transaction.type, transaction.category))}>
                {transaction.type}
              </Badge>
              <p className={cn(
                "text-sm font-medium mt-1",
                transaction.type === "Buy" || transaction.type === "Revenue" || transaction.type === "Dividend" 
                  ? "text-profit" 
                  : "text-loss"
              )}>
                {transaction.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};