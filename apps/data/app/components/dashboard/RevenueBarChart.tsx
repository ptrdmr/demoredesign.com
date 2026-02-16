'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { getTopItemsByRevenue, formatCompactCurrency, categoryColors, FoodCategory } from '../../data/food-sales-data';

const data = getTopItemsByRevenue(20).map((item) => ({
  name: item.product,
  revenue: item.revenue,
  category: item.category,
}));

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; revenue: number; category: string } }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white font-semibold text-sm">{d.name}</p>
      <p className="text-emerald-400 text-sm">${d.revenue.toLocaleString()}</p>
      <p className="text-gray-500 text-xs mt-1">{d.category}</p>
    </div>
  );
}

export default function RevenueBarChart() {
  return (
    <div className="rounded-2xl border border-gray-800/50 bg-gray-950/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-1">Top 20 Items by Revenue</h3>
      <p className="text-sm text-gray-500 mb-6">Where the money is — top 10 items = 56% of total revenue</p>
      <div className="h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 0 }}>
            <XAxis
              type="number"
              tickFormatter={(v: number) => formatCompactCurrency(v)}
              stroke="#525252"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              stroke="#525252"
              fontSize={12}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a1a1aa' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }} />
            <Bar dataKey="revenue" radius={[0, 6, 6, 0]} maxBarSize={24}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColors[entry.category as FoodCategory] || '#10b981'}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
