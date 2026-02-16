'use client';

import { DollarSign, ShoppingCart, TrendingUp, Award } from 'lucide-react';
import { kpiSummary, formatCurrency, formatNumber } from '../../data/food-sales-data';

interface KpiCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  accentColor: string;
}

function KpiCard({ label, value, subtitle, icon, accentColor }: KpiCardProps) {
  return (
    <div className="relative group rounded-2xl border border-gray-800/50 bg-gray-950/50 p-6
                    hover:border-emerald-500/30 transition-all duration-300">
      <div className={`absolute top-0 left-0 w-full h-0.5 rounded-t-2xl bg-gradient-to-r ${accentColor}`} />
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">{label}</span>
        <div className="p-2 rounded-lg bg-gray-900/80 text-gray-400">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        label="Total Revenue"
        value={formatCurrency(kpiSummary.totalRevenue)}
        subtitle={kpiSummary.dateRange}
        icon={<DollarSign className="w-5 h-5" />}
        accentColor="from-emerald-500 to-cyan-500"
      />
      <KpiCard
        label="Items Sold"
        value={formatNumber(kpiSummary.itemsSold)}
        subtitle={`${kpiSummary.weeksInPeriod} weeks`}
        icon={<ShoppingCart className="w-5 h-5" />}
        accentColor="from-cyan-500 to-blue-500"
      />
      <KpiCard
        label="Avg Weekly Revenue"
        value={formatCurrency(kpiSummary.avgWeeklyRevenue)}
        subtitle="Per week average"
        icon={<TrendingUp className="w-5 h-5" />}
        accentColor="from-blue-500 to-violet-500"
      />
      <KpiCard
        label="Top Seller"
        value={kpiSummary.topSeller.name}
        subtitle={formatCurrency(kpiSummary.topSeller.revenue)}
        icon={<Award className="w-5 h-5" />}
        accentColor="from-amber-500 to-orange-500"
      />
    </div>
  );
}
