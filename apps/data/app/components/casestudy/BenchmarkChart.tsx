'use client';

import { useSyncExternalStore } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const benchmarks = [
  { name: 'Merge 10', measured: 0.475, sla: 50, margin: '100×' },
  { name: 'Merge 50', measured: 0.742, sla: 200, margin: '270×' },
  { name: 'Merge 100', measured: 1.06, sla: 500, margin: '470×' },
  { name: 'Rollback 100', measured: 0.54, sla: 500, margin: '925×' },
];

interface TooltipPayloadEntry {
  dataKey?: string | number;
  value?: number;
  color?: string;
  payload?: (typeof benchmarks)[number];
}

function subscribe() {
  return () => undefined;
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/**
 * Horizontal Recharts comparison of measured FHIR merge timings against SLA.
 *
 * Inputs: none (values are the pytest-benchmark results).
 * Outputs: a log-scale grouped bar chart plus a numeric table.
 */
export default function BenchmarkChart() {
  const isClient = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return (
    <div className="rounded-2xl border border-gray-800/60 bg-gray-950/50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Measured vs SLA</h3>
        <p className="text-sm text-gray-500 mt-1">
          Log scale in milliseconds — otherwise the measured bars disappear.
        </p>
      </div>

      <div className="h-[320px]">
        {isClient && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={benchmarks}
            layout="vertical"
            margin={{ top: 0, right: 16, bottom: 0, left: 8 }}
          >
            <CartesianGrid stroke="#1f1f1f" horizontal={false} />
            <XAxis
              type="number"
              scale="log"
              domain={[0.1, 1000]}
              ticks={[0.1, 1, 10, 100, 1000]}
              stroke="#525252"
              fontSize={12}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => `${value}ms`}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={110}
              stroke="#525252"
              fontSize={12}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a1a1aa' }}
            />
            <Tooltip content={<BenchmarkTooltip />} cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }} />
            <Legend
              wrapperStyle={{ color: '#a1a1aa', fontSize: 12, paddingTop: 12 }}
            />
            <Bar dataKey="measured" name="Measured" fill="#10b981" radius={[0, 6, 6, 0]} maxBarSize={14} />
            <Bar dataKey="sla" name="SLA target" fill="#334155" radius={[0, 6, 6, 0]} maxBarSize={14} />
          </BarChart>
        </ResponsiveContainer>
        )}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-800">
              <th className="py-2 font-medium">Operation</th>
              <th className="py-2 font-medium">Measured</th>
              <th className="py-2 font-medium">Target</th>
              <th className="py-2 font-medium">Margin</th>
            </tr>
          </thead>
          <tbody>
            {benchmarks.map((row) => (
              <tr key={row.name} className="border-b border-gray-900">
                <td className="py-2.5 text-gray-300">{row.name} resources</td>
                <td className="py-2.5 font-mono text-emerald-400">{row.measured} ms</td>
                <td className="py-2.5 font-mono text-gray-400">{row.sla} ms</td>
                <td className="py-2.5 font-mono text-cyan-300">{row.margin} under</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BenchmarkTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const row = payload[0]?.payload;
  if (!row) {
    return null;
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white font-semibold text-sm mb-2">{row.name} resources</p>
      {payload.map((entry) => (
        <p key={String(entry.dataKey)} className="text-sm" style={{ color: entry.color }}>
          {entry.dataKey === 'measured' ? 'Measured' : 'SLA'}: {entry.value} ms
        </p>
      ))}
      <p className="text-cyan-300 text-xs mt-2">{row.margin} under budget</p>
    </div>
  );
}
