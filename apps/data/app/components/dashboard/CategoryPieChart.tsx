'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { categoryBreakdown, categoryColors, formatCurrency, FoodCategory } from '../../data/food-sales-data';

const data = categoryBreakdown.map((c) => ({
  name: c.category,
  value: c.revenue,
  percentage: c.percentage,
}));

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; percentage: number } }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white font-semibold text-sm">{d.name}</p>
      <p className="text-emerald-400 text-sm">{d.percentage}%</p>
      <p className="text-gray-400 text-xs">{formatCurrency(d.value)}</p>
    </div>
  );
}

export default function CategoryPieChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-gray-800/50 bg-gray-950/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-1">Revenue by Category</h3>
      <p className="text-sm text-gray-500 mb-4">Appetizers & Sides lead at 25%</p>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="h-[300px] w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={categoryColors[entry.name as FoodCategory]}
                    stroke="transparent"
                    opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.4}
                    onMouseEnter={() => setHoveredIndex(index)}
                    style={{ cursor: 'pointer', transition: 'opacity 200ms ease' }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              {/* Center label */}
              <text x="50%" y="46%" textAnchor="middle" fill="#fff" fontSize={22} fontWeight={700}>
                $312.7K
              </text>
              <text x="50%" y="56%" textAnchor="middle" fill="#71717a" fontSize={12}>
                Total Revenue
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2 space-y-2">
          {data.map((entry, index) => (
            <button
              key={entry.name}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                ${hoveredIndex === index ? 'bg-gray-800/60' : 'hover:bg-gray-900/60'}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: categoryColors[entry.name as FoodCategory] }}
              />
              <span className="text-sm text-gray-300 flex-1 truncate">{entry.name}</span>
              <span className="text-sm text-gray-500 tabular-nums">{entry.percentage}%</span>
              <span className="text-sm text-gray-400 tabular-nums">{formatCurrency(entry.value)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
