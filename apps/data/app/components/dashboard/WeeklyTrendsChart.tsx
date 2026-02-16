'use client';

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { weeklyTrends, formatCompactCurrency, formatNumber } from '../../data/food-sales-data';

const peakWeek = weeklyTrends.reduce((max, w) => (w.revenue > max.revenue ? w : max), weeklyTrends[0]);

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-gray-400 text-xs mb-2">Week of {label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className={`text-sm ${entry.name === 'revenue' ? 'text-emerald-400' : 'text-cyan-400'}`}>
          {entry.name === 'revenue' ? `Revenue: $${entry.value.toLocaleString()}` : `Transactions: ${formatNumber(entry.value)}`}
        </p>
      ))}
    </div>
  );
}

export default function WeeklyTrendsChart() {
  return (
    <div className="rounded-2xl border border-gray-800/50 bg-gray-950/50 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Weekly Trends</h3>
          <p className="text-sm text-gray-500">Revenue & transaction volume over 19 weeks</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-500/50" />
            Transactions
          </span>
        </div>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={weeklyTrends} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
            <XAxis
              dataKey="week"
              stroke="#525252"
              fontSize={11}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              yAxisId="revenue"
              tickFormatter={(v: number) => formatCompactCurrency(v)}
              stroke="#525252"
              fontSize={11}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="txn"
              orientation="right"
              tickFormatter={(v: number) => formatNumber(v)}
              stroke="#525252"
              fontSize={11}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              yAxisId="revenue"
              y={peakWeek.revenue}
              stroke="#10b981"
              strokeDasharray="4 4"
              strokeOpacity={0.4}
              label={{
                value: `Peak: $${peakWeek.revenue.toLocaleString()}`,
                position: 'top',
                fill: '#10b981',
                fontSize: 11,
              }}
            />
            <Bar
              yAxisId="txn"
              dataKey="transactions"
              fill="#22d3ee"
              fillOpacity={0.15}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#10b981', stroke: '#000', strokeWidth: 2 }}
              activeDot={{ r: 5, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
