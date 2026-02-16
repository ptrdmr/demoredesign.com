import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Calendar, Tag, BarChart3 } from 'lucide-react';
import FoodSalesDashboard from '../../components/dashboard/FoodSalesDashboard';

export const metadata: Metadata = {
  title: 'Food & Beverage Sales Dashboard | Data Portfolio - Demore Design',
  description:
    'Interactive food sales analytics dashboard: $312K revenue across 81 products over 19 weeks. Built with React, Recharts, and Tailwind CSS.',
};

export default function FoodSalesDashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20" />

      {/* Hero */}
      <header className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-black to-cyan-950/20" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Type badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
            <Tag className="w-4 h-4" />
            Interactive Dashboard
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Food & Beverage Sales Dashboard
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Comprehensive analysis of food sales data from a bowling & entertainment venue — $312K
            in revenue across 81 menu items over a 19-week period.
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">February 2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">19 weeks of data</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Recharts', 'TypeScript', 'Tailwind CSS'].map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 text-xs font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <FoodSalesDashboard />

        {/* Project Narrative */}
        <div className="mt-16 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">The Problem</h2>
              <p className="text-gray-400 leading-relaxed">
                The venue&apos;s food & beverage operation generates thousands of transactions weekly
                across a large menu, but leadership lacked a consolidated view of what was selling,
                what was underperforming, and how revenue trended over time. Weekly reports were
                manual spreadsheets with limited insight into category performance or seasonal
                patterns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Approach</h2>
              <p className="text-gray-400 leading-relaxed">
                Extracted 19 weeks of POS transaction data and built an interactive dashboard
                covering KPI metrics, revenue & volume rankings, weekly trend analysis, category
                breakdowns, and a sortable/filterable product detail table. The dashboard surfaces
                key insights: the top 10 items drive 56% of revenue, December holiday traffic
                produced a peak week of $28.9K, and 15 low-volume items may warrant menu
                consolidation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Outcome</h2>
              <p className="text-gray-400 leading-relaxed">
                A fully interactive, responsive dashboard built with React and Recharts — no
                external BI tool required. Provides actionable visibility into revenue drivers,
                seasonal trends, and menu optimization opportunities. The dashboard is
                self-contained, performant, and deployable as part of a Next.js application.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="p-6 rounded-2xl bg-gray-950/50 border border-gray-800/50">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Domains
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Food & Beverage', 'Analytics', 'Reporting', 'Visualization'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm text-gray-300 bg-gray-900 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-950/50 border border-gray-800/50">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Recharts', 'Tailwind CSS'].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 text-sm text-emerald-400 bg-emerald-950/30 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-950/50 border border-gray-800/50">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Key Metrics
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-gray-500">Total Revenue</dt>
                  <dd className="text-lg font-semibold text-white">$312,658</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Items Tracked</dt>
                  <dd className="text-lg font-semibold text-white">81 products</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Categories</dt>
                  <dd className="text-lg font-semibold text-white">11 categories</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Analysis Period</dt>
                  <dd className="text-lg font-semibold text-white">19 weeks</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all projects
            </Link>
            <span className="text-sm text-gray-600">
              © {new Date().getFullYear()} Demore Design
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
