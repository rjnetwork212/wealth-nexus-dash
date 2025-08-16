import { DashboardCard } from "./DashboardCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Portfolio } from "@/lib/storage";

interface AssetAllocationProps {
  portfolio: Portfolio;
}

export const AssetAllocation = ({ portfolio }: AssetAllocationProps) => {
  const total = portfolio.personal + portfolio.business + portfolio.crypto + portfolio.stocks;
  
  const data = [
    { 
      name: "Stocks", 
      value: total > 0 ? Math.round((portfolio.stocks / total) * 100) : 0, 
      amount: portfolio.stocks,
      color: "hsl(var(--primary))" 
    },
    { 
      name: "Crypto", 
      value: total > 0 ? Math.round((portfolio.crypto / total) * 100) : 0, 
      amount: portfolio.crypto,
      color: "hsl(var(--accent))" 
    },
    { 
      name: "Business", 
      value: total > 0 ? Math.round((portfolio.business / total) * 100) : 0, 
      amount: portfolio.business,
      color: "hsl(var(--success))" 
    },
    { 
      name: "Personal", 
      value: total > 0 ? Math.round((portfolio.personal / total) * 100) : 0, 
      amount: portfolio.personal,
      color: "hsl(var(--warning))" 
    },
  ].filter(item => item.value > 0);

  return (
    <DashboardCard 
      title="Asset Allocation" 
      description="Portfolio distribution by category"
    >
      <div className="h-64">
        {total > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--card-foreground))'
                }}
                formatter={(value: number, name: string, entry: any) => [
                  `${value}% ($${entry.payload.amount.toLocaleString()})`, 
                  'Allocation'
                ]}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                wrapperStyle={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">No portfolio data available</p>
          </div>
        )}
      </div>
    </DashboardCard>
  );
};