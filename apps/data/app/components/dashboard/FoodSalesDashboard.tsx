'use client';

import KpiCards from './KpiCards';
import RevenueBarChart from './RevenueBarChart';
import QuantityBarChart from './QuantityBarChart';
import WeeklyTrendsChart from './WeeklyTrendsChart';
import CategoryPieChart from './CategoryPieChart';
import MonthlyCategoryChart from './MonthlyCategoryChart';
import ItemDetailTable from './ItemDetailTable';

/**
 * Full interactive food sales dashboard.
 * Renders all chart sections in a cohesive layout matching the site's dark theme.
 */
export default function FoodSalesDashboard() {
  return (
    <div className="space-y-8">
      {/* KPI row */}
      <KpiCards />

      {/* Weekly trends — full width */}
      <WeeklyTrendsChart />

      {/* Category pie + monthly stacked bar — side by side on large screens */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <CategoryPieChart />
        <MonthlyCategoryChart />
      </div>

      {/* Revenue vs Volume — side by side on large screens */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <RevenueBarChart />
        <QuantityBarChart />
      </div>

      {/* Full item detail table */}
      <ItemDetailTable />
    </div>
  );
}
