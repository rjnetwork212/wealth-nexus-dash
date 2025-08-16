import { DashboardCard } from "./DashboardCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Stocks", value: 45, color: "hsl(var(--primary))" },
  { name: "Crypto", value: 25, color: "hsl(var(--accent))" },
  { name: "Business", value: 20, color: "hsl(var(--success))" },
  { name: "Cash", value: 10, color: "hsl(var(--warning))" },
];

export const AssetAllocation = () => {
  return (
    <DashboardCard 
      title="Asset Allocation" 
      description="Portfolio distribution by category"
    >
      <div className="h-64">
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
              formatter={(value: number) => [`${value}%`, 'Allocation']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};