'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { monthlyByCategory, categoryColors, FoodCategory, formatCompactCurrency } from '../../data/food-sales-data';

const categories: FoodCategory[] = [
  'Appetizers & Sides',
  'Beverages',
  'Wings & Chicken',
  'Burgers & Sliders',
  'Sandwiches',
  'Tacos & Mexican',
  'Party Platters',
  'Salads',
  'Kids Menu',
  'Pizza',
  'Soups',
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum, p) => sum + p.value, 0);
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl max-h-64 overflow-y-auto">
      <p className="text-white font-semibold text-sm mb-2">{label}</p>
      <p className="text-emerald-400 text-sm mb-2">Total: ${total.toLocaleString()}</p>
      <div className="space-y-1">
        {payload
          .filter((p) => p.value > 0)
          .sort((a, b) => b.value - a.value)
          .map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-400 flex-1 truncate">{entry.name}</span>
              <span className="text-gray-300 tabular-nums">${entry.value.toLocaleString()}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function MonthlyCategoryChart() {
  return (
    <div className="rounded-2xl border border-gray-800/50 bg-gray-950/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-1">Monthly Revenue by Category</h3>
      <p className="text-sm text-gray-500 mb-6">December peak driven by holiday season across all categories</p>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyByCategory} margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#525252"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => formatCompactCurrency(v)}
              stroke="#525252"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
              iconType="circle"
              iconSize={8}
            />
            {categories.map((cat) => (
              <Bar
                key={cat}
                dataKey={cat}
                stackId="a"
                fill={categoryColors[cat]}
                fillOpacity={0.85}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
