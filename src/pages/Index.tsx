import { QuickStats } from "@/components/dashboard/QuickStats";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { AssetAllocation } from "@/components/dashboard/AssetAllocation";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { TransactionForm } from "@/components/forms/TransactionForm";
import { ImportExportForm } from "@/components/forms/ImportExportForm";
import { PortfolioEditor } from "@/components/forms/PortfolioEditor";
import { Button } from "@/components/ui/button";
import { useFinancialData } from "@/hooks/useFinancialData";
import { 
  Settings, 
  RefreshCw,
  Bell,
  User,
  AlertCircle
} from "lucide-react";

const Index = () => {
  const {
    transactions,
    portfolio,
    loading,
    totalPortfolio,
    monthlyIncome,
    monthlyExpenses,
    addTransaction,
    deleteTransaction,
    updatePortfolio,
    exportData,
    importData,
    exportToCSV
  } = useFinancialData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Financial Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Personal Finance • Business • Crypto • Stocks
              </p>
            </div>
            <div className="flex items-center gap-3">
              <TransactionForm onAddTransaction={addTransaction} />
              <ImportExportForm 
                onExportJSON={exportData}
                onExportCSV={exportToCSV}
                onImport={importData}
              />
              <PortfolioEditor 
                portfolio={portfolio}
                onUpdatePortfolio={updatePortfolio}
              />
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">Development Mode:</span>
            <span className="text-muted-foreground">
              This is a React app that runs with `npm run dev`. Data is stored in browser localStorage. 
              For production use, consider connecting to a database.
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <QuickStats 
          portfolio={portfolio}
          totalPortfolio={totalPortfolio}
          monthlyIncome={monthlyIncome}
          monthlyExpenses={monthlyExpenses}
        />

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <PortfolioChart />
          <div className="space-y-6">
            <AssetAllocation portfolio={portfolio} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentTransactions 
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
          />
          
          {/* Additional Info Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-card rounded-lg border border-border p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">How to Use</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Add Transactions</p>
                  <p className="text-muted-foreground">Click "Add Transaction" to record income, expenses, investments</p>
                </div>
                <div>
                  <p className="font-medium">Edit Portfolio</p>
                  <p className="text-muted-foreground">Update your asset values manually when needed</p>
                </div>
                <div>
                  <p className="font-medium">Import/Export</p>
                  <p className="text-muted-foreground">Backup your data or import from CSV/JSON files</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-card rounded-lg border border-border p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Total Transactions:</span>
                  <span className="font-medium">{transactions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Income:</span>
                  <span className="font-medium text-profit">${monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Expenses:</span>
                  <span className="font-medium text-loss">${monthlyExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span>Net Income:</span>
                  <span className={`font-medium ${monthlyIncome - monthlyExpenses >= 0 ? 'text-profit' : 'text-loss'}`}>
                    ${(monthlyIncome - monthlyExpenses).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
