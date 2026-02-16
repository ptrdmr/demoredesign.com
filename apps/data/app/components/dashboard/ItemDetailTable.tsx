'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, Search, ChevronDown, ChevronUp } from 'lucide-react';
import {
  itemDetail,
  FoodItem,
  FoodCategory,
  categoryColors,
  formatCurrency,
  formatNumber,
} from '../../data/food-sales-data';

type SortKey = 'rank' | 'product' | 'category' | 'qty' | 'revenue' | 'avgPrice' | 'weeklyAvg';
type SortDir = 'asc' | 'desc';

const CATEGORIES: FoodCategory[] = [
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

export default function ItemDetailTable() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FoodCategory | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [showAll, setShowAll] = useState(false);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir(key === 'rank' || key === 'product' || key === 'category' ? 'asc' : 'desc');
    }
  };

  const filtered = useMemo(() => {
    let items = [...itemDetail];

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) => i.product.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      items = items.filter((i) => i.category === categoryFilter);
    }

    items.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      const numA = aVal as number;
      const numB = bVal as number;
      return sortDir === 'asc' ? numA - numB : numB - numA;
    });

    return items;
  }, [search, categoryFilter, sortKey, sortDir]);

  const displayed = showAll ? filtered : filtered.slice(0, 30);

  function SortHeader({ label, sortKeyVal, className }: { label: string; sortKeyVal: SortKey; className?: string }) {
    const isActive = sortKey === sortKeyVal;
    return (
      <th
        className={`px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide cursor-pointer
                    hover:text-white transition-colors select-none ${className || ''}`}
        onClick={() => toggleSort(sortKeyVal)}
      >
        <span className="inline-flex items-center gap-1">
          {label}
          {isActive ? (
            sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
          ) : (
            <ArrowUpDown className="w-3 h-3 opacity-40" />
          )}
        </span>
      </th>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-800/50 bg-gray-950/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-1">Full Item Detail</h3>
      <p className="text-sm text-gray-500 mb-4">
        All {itemDetail.length} products — sortable & filterable
      </p>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/80 border border-gray-800 text-sm text-white
                       placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as FoodCategory | 'all')}
          className="px-4 py-2 rounded-lg bg-gray-900/80 border border-gray-800 text-sm text-white
                     focus:outline-none focus:border-emerald-500/50 transition-colors"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-6">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-800/50">
              <SortHeader label="#" sortKeyVal="rank" className="pl-6 w-12" />
              <SortHeader label="Product" sortKeyVal="product" />
              <SortHeader label="Category" sortKeyVal="category" />
              <SortHeader label="Qty" sortKeyVal="qty" />
              <SortHeader label="Revenue" sortKeyVal="revenue" />
              <SortHeader label="Avg $" sortKeyVal="avgPrice" />
              <SortHeader label="Wkly Avg" sortKeyVal="weeklyAvg" className="pr-6" />
            </tr>
          </thead>
          <tbody>
            {displayed.map((item: FoodItem) => (
              <tr
                key={item.rank}
                className="border-b border-gray-800/30 hover:bg-gray-900/40 transition-colors"
              >
                <td className="pl-6 px-3 py-2.5 text-sm text-gray-500 tabular-nums">{item.rank}</td>
                <td className="px-3 py-2.5 text-sm text-white font-medium">{item.product}</td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: categoryColors[item.category] }}
                    />
                    {item.category}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-300 tabular-nums">{formatNumber(item.qty)}</td>
                <td className="px-3 py-2.5 text-sm text-emerald-400 tabular-nums">
                  {item.revenue > 0 ? formatCurrency(item.revenue) : '—'}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-400 tabular-nums">
                  {item.avgPrice > 0 ? `$${item.avgPrice.toFixed(2)}` : '—'}
                </td>
                <td className="pr-6 px-3 py-2.5 text-sm text-gray-400 tabular-nums">{item.weeklyAvg.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show more / less */}
      {filtered.length > 30 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-gray-400 
                       hover:text-white border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
          >
            {showAll ? (
              <>Show Less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Show All {filtered.length} Items <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-800/50 flex items-center justify-between text-xs text-gray-500">
        <span>Showing {displayed.length} of {filtered.length} items</span>
        <span>Note: Some pizza & party items show $0 revenue — pricing captured on parent items</span>
      </div>
    </div>
  );
}
