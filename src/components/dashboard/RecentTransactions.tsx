import { DashboardCard } from "./DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { Transaction } from "@/lib/storage";

interface RecentTransactionsProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export const RecentTransactions = ({ transactions, onDeleteTransaction }: RecentTransactionsProps) => {
  const getTypeColor = (type: string) => {
    if (type === "income" || type === "dividend") {
      return "bg-success text-success-foreground";
    }
    if (type === "sell") {
      return "bg-warning text-warning-foreground";
    }
    if (type === "expense") {
      return "bg-loss text-loss-foreground";
    }
    if (type === "buy") {
      return "bg-primary text-primary-foreground";
    }
    return "bg-muted text-muted-foreground";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "stock": return "📈";
      case "crypto": return "₿";
      case "business": return "🏢";
      case "personal": return "👤";
      default: return "💰";
    }
  };

  const formatAmount = (amount: number, type: string) => {
    const formatted = `$${amount.toLocaleString()}`;
    return type === "expense" ? `-${formatted}` : `+${formatted}`;
  };

  const getAmountColor = (type: string) => {
    return type === "expense" ? "text-loss" : "text-profit";
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <DashboardCard 
      title="Recent Transactions" 
      description={`${transactions.length} total transactions`}
      className="col-span-full lg:col-span-1"
    >
      <div className="space-y-4">
        {recentTransactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No transactions yet. Add your first transaction!
          </p>
        ) : (
          recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 group">
              <div className="flex items-center gap-3">
                <div className="text-lg">{getCategoryIcon(transaction.category)}</div>
                <div>
                  <p className="font-medium text-sm">{transaction.asset}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  {transaction.description && (
                    <p className="text-xs text-muted-foreground truncate max-w-32">
                      {transaction.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <Badge className={cn("text-xs", getTypeColor(transaction.type))}>
                    {transaction.type}
                  </Badge>
                  <p className={cn(
                    "text-sm font-medium mt-1",
                    getAmountColor(transaction.type)
                  )}>
                    {formatAmount(transaction.amount, transaction.type)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardCard>
  );
};