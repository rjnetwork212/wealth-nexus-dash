import { QuickStats } from "@/components/dashboard/QuickStats";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { AssetAllocation } from "@/components/dashboard/AssetAllocation";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Download, 
  RefreshCw,
  Bell,
  User
} from "lucide-react";

const Index = () => {
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
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <QuickStats />

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <PortfolioChart />
          <div className="space-y-6">
            <AssetAllocation />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentTransactions />
          
          {/* Additional cards for future features */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-card rounded-lg border border-border p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Market News</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Bitcoin reaches new monthly high</p>
                  <p className="text-muted-foreground text-xs">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Tech stocks show strong momentum</p>
                  <p className="text-muted-foreground text-xs">4 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Q4 earnings season begins</p>
                  <p className="text-muted-foreground text-xs">6 hours ago</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-card rounded-lg border border-border p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  📊 Add Transaction
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  💼 Business Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  📈 Portfolio Analysis
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  🎯 Set Goals
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
