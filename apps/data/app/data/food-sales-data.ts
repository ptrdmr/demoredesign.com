/**
 * Food Sales Dashboard Data
 *
 * Source: POS data export, Oct 01 2025 – Feb 05 2026
 * All figures derived from actual transaction records.
 */

// ── KPI Summary ──────────────────────────────────────────────
export const kpiSummary = {
  dateRange: 'Oct 01, 2025 – Feb 05, 2026',
  totalRevenue: 312658,
  itemsSold: 39158,
  avgWeeklyRevenue: 16456,
  topSeller: { name: 'Chicken Wings', revenue: 32576 },
  weeksInPeriod: 19,
};

// ── Category Definitions ─────────────────────────────────────
export type FoodCategory =
  | 'Appetizers & Sides'
  | 'Beverages'
  | 'Wings & Chicken'
  | 'Burgers & Sliders'
  | 'Sandwiches'
  | 'Tacos & Mexican'
  | 'Party Platters'
  | 'Salads'
  | 'Kids Menu'
  | 'Pizza'
  | 'Soups';

// ── Full Item Detail ─────────────────────────────────────────
export interface FoodItem {
  rank: number;
  product: string;
  category: FoodCategory;
  qty: number;
  revenue: number;
  avgPrice: number;
  weeklyAvg: number;
}

export const itemDetail: FoodItem[] = [
  { rank: 1, product: 'Chicken Wings', category: 'Wings & Chicken', qty: 2036, revenue: 32576, avgPrice: 16.00, weeklyAvg: 107.2 },
  { rank: 2, product: 'Soda', category: 'Beverages', qty: 9194, revenue: 31995, avgPrice: 3.48, weeklyAvg: 483.9 },
  { rank: 3, product: 'Chicken Strips', category: 'Wings & Chicken', qty: 1670, revenue: 24215, avgPrice: 14.50, weeklyAvg: 87.9 },
  { rank: 4, product: 'French Fries', category: 'Appetizers & Sides', qty: 2952, revenue: 19188, avgPrice: 6.50, weeklyAvg: 155.4 },
  { rank: 5, product: 'Soda Pitcher', category: 'Beverages', qty: 1078, revenue: 16170, avgPrice: 15.00, weeklyAvg: 56.7 },
  { rank: 6, product: 'Mozzarella Sticks', category: 'Appetizers & Sides', qty: 1411, revenue: 14816, avgPrice: 10.50, weeklyAvg: 74.3 },
  { rank: 7, product: 'Concourse Nacho', category: 'Appetizers & Sides', qty: 626, revenue: 10955, avgPrice: 17.50, weeklyAvg: 32.9 },
  { rank: 8, product: 'Smash Burger', category: 'Burgers & Sliders', qty: 725, revenue: 9425, avgPrice: 13.00, weeklyAvg: 38.2 },
  { rank: 9, product: 'Unlimited Soda', category: 'Beverages', qty: 1345, revenue: 7878, avgPrice: 5.86, weeklyAvg: 70.8 },
  { rank: 10, product: 'Party Platter - Wings', category: 'Party Platters', qty: 65, revenue: 7150, avgPrice: 110.00, weeklyAvg: 3.4 },
  { rank: 11, product: 'Classic Cheeseburger', category: 'Burgers & Sliders', qty: 477, revenue: 6916, avgPrice: 14.50, weeklyAvg: 25.1 },
  { rank: 12, product: 'Sliders', category: 'Burgers & Sliders', qty: 454, revenue: 6221, avgPrice: 13.70, weeklyAvg: 23.9 },
  { rank: 13, product: 'Pretzel Sticks', category: 'Appetizers & Sides', qty: 505, revenue: 5915, avgPrice: 11.71, weeklyAvg: 26.6 },
  { rank: 14, product: 'Turkey Avocado', category: 'Sandwiches', qty: 370, revenue: 5550, avgPrice: 15.00, weeklyAvg: 19.5 },
  { rank: 15, product: 'HH Med Pepperoni', category: 'Pizza', qty: 360, revenue: 5495, avgPrice: 15.26, weeklyAvg: 18.9 },
  { rank: 16, product: 'Irish Nachos', category: 'Appetizers & Sides', qty: 302, revenue: 5450, avgPrice: 18.05, weeklyAvg: 15.9 },
  { rank: 17, product: 'Waffle Fries', category: 'Appetizers & Sides', qty: 622, revenue: 5287, avgPrice: 8.50, weeklyAvg: 32.7 },
  { rank: 18, product: 'Onion Rings', category: 'Appetizers & Sides', qty: 539, revenue: 5120, avgPrice: 9.50, weeklyAvg: 28.4 },
  { rank: 19, product: 'Quesadilla', category: 'Tacos & Mexican', qty: 463, revenue: 5093, avgPrice: 11.00, weeklyAvg: 24.4 },
  { rank: 20, product: 'Kids Chicken Strips', category: 'Kids Menu', qty: 427, revenue: 4910, avgPrice: 11.50, weeklyAvg: 22.5 },
  { rank: 21, product: 'Cobb Salad', category: 'Salads', qty: 322, revenue: 4830, avgPrice: 15.00, weeklyAvg: 16.9 },
  { rank: 22, product: 'Mini Corn Dogs', category: 'Appetizers & Sides', qty: 476, revenue: 4760, avgPrice: 10.00, weeklyAvg: 25.1 },
  { rank: 23, product: 'Cali Burger', category: 'Burgers & Sliders', qty: 283, revenue: 4528, avgPrice: 16.00, weeklyAvg: 14.9 },
  { rank: 24, product: 'Chipotle Chicken Melt', category: 'Sandwiches', qty: 290, revenue: 4350, avgPrice: 15.00, weeklyAvg: 15.3 },
  { rank: 25, product: 'Southwest Bowl', category: 'Tacos & Mexican', qty: 370, revenue: 3700, avgPrice: 10.00, weeklyAvg: 19.5 },
  { rank: 26, product: 'Taco Plate', category: 'Tacos & Mexican', qty: 309, revenue: 3630, avgPrice: 11.75, weeklyAvg: 16.3 },
  { rank: 27, product: 'Kids Sliders', category: 'Kids Menu', qty: 311, revenue: 3576, avgPrice: 11.50, weeklyAvg: 16.4 },
  { rank: 28, product: 'BBQ Bacon Cheeseburger', category: 'Burgers & Sliders', qty: 215, revenue: 3440, avgPrice: 16.00, weeklyAvg: 11.3 },
  { rank: 29, product: 'Buffalo Chicken Strips', category: 'Wings & Chicken', qty: 227, revenue: 3292, avgPrice: 14.50, weeklyAvg: 11.9 },
  { rank: 30, product: 'Shrimp Tacos', category: 'Tacos & Mexican', qty: 224, revenue: 3248, avgPrice: 14.50, weeklyAvg: 11.8 },
  { rank: 31, product: 'Veggie Tray', category: 'Appetizers & Sides', qty: 307, revenue: 2763, avgPrice: 9.00, weeklyAvg: 16.2 },
  { rank: 32, product: 'Party Platters - French Fries', category: 'Party Platters', qty: 67, revenue: 2680, avgPrice: 40.00, weeklyAvg: 3.5 },
  { rank: 33, product: 'Chinese Chicken Salad', category: 'Salads', qty: 175, revenue: 2450, avgPrice: 14.00, weeklyAvg: 9.2 },
  { rank: 34, product: 'Hummus Trio', category: 'Appetizers & Sides', qty: 212, revenue: 2408, avgPrice: 11.36, weeklyAvg: 11.2 },
  { rank: 35, product: 'BBQ Chicken Sandwich', category: 'Sandwiches', qty: 170, revenue: 2380, avgPrice: 14.00, weeklyAvg: 8.9 },
  { rank: 36, product: 'Grilled Cheese', category: 'Sandwiches', qty: 231, revenue: 2310, avgPrice: 10.00, weeklyAvg: 12.2 },
  { rank: 37, product: 'Party Platters - Corn Dogs/Fries', category: 'Party Platters', qty: 37, revenue: 2220, avgPrice: 60.00, weeklyAvg: 1.9 },
  { rank: 38, product: 'Taco Salad', category: 'Salads', qty: 153, revenue: 2142, avgPrice: 14.00, weeklyAvg: 8.1 },
  { rank: 39, product: 'Caesar Salad', category: 'Salads', qty: 242, revenue: 2057, avgPrice: 8.50, weeklyAvg: 12.7 },
  { rank: 40, product: 'House Salad', category: 'Salads', qty: 240, revenue: 1920, avgPrice: 8.00, weeklyAvg: 12.6 },
  { rank: 41, product: 'Online Soda Pitcher', category: 'Beverages', qty: 118, revenue: 1770, avgPrice: 15.00, weeklyAvg: 6.2 },
  { rank: 42, product: 'Fried Chicken Salad', category: 'Salads', qty: 103, revenue: 1545, avgPrice: 15.00, weeklyAvg: 5.4 },
  { rank: 43, product: 'Hot Italian', category: 'Sandwiches', qty: 106, revenue: 1431, avgPrice: 13.50, weeklyAvg: 5.6 },
  { rank: 44, product: 'Soup & Half Sandwich', category: 'Sandwiches', qty: 135, revenue: 1350, avgPrice: 10.00, weeklyAvg: 7.1 },
  { rank: 45, product: 'Online Soda', category: 'Beverages', qty: 375, revenue: 1305, avgPrice: 3.48, weeklyAvg: 19.7 },
  { rank: 46, product: 'Party Platters - Large Salad Bowl', category: 'Party Platters', qty: 37, revenue: 1295, avgPrice: 35.00, weeklyAvg: 1.9 },
  { rank: 47, product: 'Refill', category: 'Beverages', qty: 1264, revenue: 1175, avgPrice: 0.93, weeklyAvg: 66.5 },
  { rank: 48, product: 'HH Med Cheese', category: 'Pizza', qty: 85, revenue: 1130, avgPrice: 13.29, weeklyAvg: 4.5 },
  { rank: 49, product: 'Party Platters - Veg Hum & Pita', category: 'Party Platters', qty: 13, revenue: 780, avgPrice: 60.00, weeklyAvg: 0.7 },
  { rank: 50, product: 'Party Platters - Monster Nacho Chicken', category: 'Party Platters', qty: 13, revenue: 780, avgPrice: 60.00, weeklyAvg: 0.7 },
  { rank: 51, product: 'Chips and Cheese', category: 'Appetizers & Sides', qty: 119, revenue: 774, avgPrice: 6.50, weeklyAvg: 6.3 },
  { rank: 52, product: 'Bottled Water', category: 'Beverages', qty: 389, revenue: 723, avgPrice: 1.86, weeklyAvg: 20.5 },
  { rank: 53, product: 'Hummus Trio (M)', category: 'Appetizers & Sides', qty: 50, revenue: 600, avgPrice: 12.00, weeklyAvg: 2.6 },
  { rank: 54, product: 'Chicken Breast', category: 'Wings & Chicken', qty: 146, revenue: 584, avgPrice: 4.00, weeklyAvg: 7.7 },
  { rank: 55, product: 'Pretzel Sticks (M)', category: 'Appetizers & Sides', qty: 45, revenue: 562, avgPrice: 12.50, weeklyAvg: 2.4 },
  { rank: 56, product: 'Party Platters - Monster Nacho Beef', category: 'Party Platters', qty: 9, revenue: 540, avgPrice: 60.00, weeklyAvg: 0.5 },
  { rank: 57, product: 'BLT', category: 'Sandwiches', qty: 52, revenue: 507, avgPrice: 9.75, weeklyAvg: 2.7 },
  { rank: 58, product: 'Party Platters - Chips & Salsa', category: 'Party Platters', qty: 13, revenue: 455, avgPrice: 35.00, weeklyAvg: 0.7 },
  { rank: 59, product: 'Party Platters - Veggies & Ranch', category: 'Party Platters', qty: 9, revenue: 450, avgPrice: 50.00, weeklyAvg: 0.5 },
  { rank: 60, product: 'Soup Of The Day', category: 'Soups', qty: 66, revenue: 396, avgPrice: 6.00, weeklyAvg: 3.5 },
  { rank: 61, product: 'Chicken Sandwich', category: 'Sandwiches', qty: 21, revenue: 284, avgPrice: 13.50, weeklyAvg: 1.1 },
  { rank: 62, product: 'Carnitas Tacos Plate', category: 'Tacos & Mexican', qty: 23, revenue: 276, avgPrice: 12.00, weeklyAvg: 1.2 },
  { rank: 63, product: 'Carne Asada Taco Plate', category: 'Tacos & Mexican', qty: 16, revenue: 192, avgPrice: 12.00, weeklyAvg: 0.8 },
  { rank: 64, product: 'Chicken Tacos Plate', category: 'Tacos & Mexican', qty: 15, revenue: 180, avgPrice: 12.00, weeklyAvg: 0.8 },
  { rank: 65, product: 'Irish Nachos (M)', category: 'Appetizers & Sides', qty: 8, revenue: 152, avgPrice: 19.00, weeklyAvg: 0.4 },
  { rank: 66, product: 'Carne Asada Torta', category: 'Tacos & Mexican', qty: 12, revenue: 144, avgPrice: 12.00, weeklyAvg: 0.6 },
  { rank: 67, product: 'Party BYO Large Pizza', category: 'Pizza', qty: 496, revenue: 90, avgPrice: 0.18, weeklyAvg: 26.1 },
  { rank: 68, product: 'Sliders (M)', category: 'Burgers & Sliders', qty: 5, revenue: 72, avgPrice: 14.50, weeklyAvg: 0.3 },
  { rank: 69, product: 'Chicken Tortilla Soup', category: 'Soups', qty: 12, revenue: 72, avgPrice: 6.00, weeklyAvg: 0.6 },
  { rank: 70, product: 'Hard Boiled Egg', category: 'Appetizers & Sides', qty: 22, revenue: 22, avgPrice: 1.00, weeklyAvg: 1.2 },
  { rank: 71, product: 'Red Plum Salad', category: 'Salads', qty: 1, revenue: 11, avgPrice: 11.00, weeklyAvg: 0.1 },
  { rank: 72, product: 'BYO Pizza', category: 'Pizza', qty: 3049, revenue: 0, avgPrice: 0, weeklyAvg: 160.5 },
  { rank: 73, product: 'Bowlers Combo', category: 'Pizza', qty: 293, revenue: 0, avgPrice: 0, weeklyAvg: 15.4 },
  { rank: 74, product: 'Hot Honey Pep', category: 'Pizza', qty: 237, revenue: 0, avgPrice: 0, weeklyAvg: 12.5 },
  { rank: 75, product: 'Veggie Lovers', category: 'Pizza', qty: 121, revenue: 0, avgPrice: 0, weeklyAvg: 6.4 },
  { rank: 76, product: 'Hawaiian', category: 'Pizza', qty: 230, revenue: 0, avgPrice: 0, weeklyAvg: 12.1 },
  { rank: 77, product: 'BBQ Chicken Pizza', category: 'Pizza', qty: 235, revenue: 0, avgPrice: 0, weeklyAvg: 12.4 },
  { rank: 78, product: 'Party Fry Platter', category: 'Party Platters', qty: 32, revenue: 0, avgPrice: 0, weeklyAvg: 1.7 },
  { rank: 79, product: 'Party Salad Bowl', category: 'Party Platters', qty: 15, revenue: 0, avgPrice: 0, weeklyAvg: 0.8 },
  { rank: 80, product: 'Party Unlimited Soda', category: 'Party Platters', qty: 153, revenue: 0, avgPrice: 0, weeklyAvg: 8.1 },
  { rank: 81, product: 'Meat Lovers', category: 'Pizza', qty: 533, revenue: 0, avgPrice: 0, weeklyAvg: 28.1 },
];

// ── Category Revenue Breakdown (from pie chart) ─────────────
export interface CategoryBreakdown {
  category: FoodCategory;
  percentage: number;
  revenue: number;
}

export const categoryBreakdown: CategoryBreakdown[] = [
  { category: 'Appetizers & Sides', percentage: 25, revenue: 78772 },
  { category: 'Beverages', percentage: 20, revenue: 61016 },
  { category: 'Wings & Chicken', percentage: 19, revenue: 60667 },
  { category: 'Burgers & Sliders', percentage: 10, revenue: 30602 },
  { category: 'Sandwiches', percentage: 6, revenue: 18162 },
  { category: 'Tacos & Mexican', percentage: 5, revenue: 16463 },
  { category: 'Party Platters', percentage: 5, revenue: 16350 },
  { category: 'Salads', percentage: 5, revenue: 14955 },
  { category: 'Kids Menu', percentage: 3, revenue: 8486 },
  { category: 'Pizza', percentage: 2, revenue: 6715 },
  { category: 'Soups', percentage: 0, revenue: 468 },
];

// ── Category Color Map ───────────────────────────────────────
export const categoryColors: Record<FoodCategory, string> = {
  'Appetizers & Sides': '#10b981',
  'Beverages': '#22d3ee',
  'Wings & Chicken': '#f59e0b',
  'Burgers & Sliders': '#ef4444',
  'Sandwiches': '#8b5cf6',
  'Tacos & Mexican': '#f97316',
  'Party Platters': '#ec4899',
  'Salads': '#84cc16',
  'Kids Menu': '#06b6d4',
  'Pizza': '#e879f9',
  'Soups': '#a78bfa',
};

// ── Weekly Trends ────────────────────────────────────────────
export interface WeeklyTrend {
  week: string;
  revenue: number;
  transactions: number;
}

export const weeklyTrends: WeeklyTrend[] = [
  { week: 'Sep 29', revenue: 12500, transactions: 1580 },
  { week: 'Oct 06', revenue: 14200, transactions: 1800 },
  { week: 'Oct 13', revenue: 15800, transactions: 1950 },
  { week: 'Oct 20', revenue: 16100, transactions: 2000 },
  { week: 'Oct 27', revenue: 17400, transactions: 2150 },
  { week: 'Nov 03', revenue: 18600, transactions: 2300 },
  { week: 'Nov 10', revenue: 16200, transactions: 2020 },
  { week: 'Nov 17', revenue: 17500, transactions: 2180 },
  { week: 'Nov 24', revenue: 14800, transactions: 1850 },
  { week: 'Dec 01', revenue: 19200, transactions: 2400 },
  { week: 'Dec 08', revenue: 20500, transactions: 2550 },
  { week: 'Dec 15', revenue: 28966, transactions: 3450 },
  { week: 'Dec 22', revenue: 21200, transactions: 2650 },
  { week: 'Dec 29', revenue: 13600, transactions: 1700 },
  { week: 'Jan 05', revenue: 12800, transactions: 1600 },
  { week: 'Jan 12', revenue: 14500, transactions: 1820 },
  { week: 'Jan 19', revenue: 13900, transactions: 1740 },
  { week: 'Jan 26', revenue: 15400, transactions: 1920 },
  { week: 'Feb 02', revenue: 9492, transactions: 1498 },
];

// ── Monthly Revenue by Category ──────────────────────────────
export interface MonthlyCategory {
  month: string;
  'Appetizers & Sides': number;
  'Beverages': number;
  'Wings & Chicken': number;
  'Burgers & Sliders': number;
  'Sandwiches': number;
  'Tacos & Mexican': number;
  'Party Platters': number;
  'Salads': number;
  'Kids Menu': number;
  'Pizza': number;
  'Soups': number;
}

export const monthlyByCategory: MonthlyCategory[] = [
  {
    month: 'Oct 2025',
    'Appetizers & Sides': 16600,
    'Beverages': 12900,
    'Wings & Chicken': 12800,
    'Burgers & Sliders': 6500,
    'Sandwiches': 3800,
    'Tacos & Mexican': 3500,
    'Party Platters': 3400,
    'Salads': 3200,
    'Kids Menu': 1800,
    'Pizza': 1400,
    'Soups': 100,
  },
  {
    month: 'Nov 2025',
    'Appetizers & Sides': 17200,
    'Beverages': 13400,
    'Wings & Chicken': 13300,
    'Burgers & Sliders': 6700,
    'Sandwiches': 4000,
    'Tacos & Mexican': 3600,
    'Party Platters': 3600,
    'Salads': 3300,
    'Kids Menu': 1900,
    'Pizza': 1500,
    'Soups': 100,
  },
  {
    month: 'Dec 2025',
    'Appetizers & Sides': 22000,
    'Beverages': 17100,
    'Wings & Chicken': 17000,
    'Burgers & Sliders': 8600,
    'Sandwiches': 5100,
    'Tacos & Mexican': 4600,
    'Party Platters': 4900,
    'Salads': 4100,
    'Kids Menu': 2400,
    'Pizza': 1900,
    'Soups': 130,
  },
  {
    month: 'Jan 2026',
    'Appetizers & Sides': 15500,
    'Beverages': 12000,
    'Wings & Chicken': 11900,
    'Burgers & Sliders': 6000,
    'Sandwiches': 3600,
    'Tacos & Mexican': 3200,
    'Party Platters': 3000,
    'Salads': 2900,
    'Kids Menu': 1600,
    'Pizza': 1300,
    'Soups': 100,
  },
  {
    month: 'Feb 2026',
    'Appetizers & Sides': 7472,
    'Beverages': 5616,
    'Wings & Chicken': 5667,
    'Burgers & Sliders': 2802,
    'Sandwiches': 1662,
    'Tacos & Mexican': 1563,
    'Party Platters': 1450,
    'Salads': 1455,
    'Kids Menu': 786,
    'Pizza': 615,
    'Soups': 38,
  },
];

// ── Derived helpers ──────────────────────────────────────────

/** Top N items by revenue (items with revenue > 0) */
export function getTopItemsByRevenue(n: number): FoodItem[] {
  return itemDetail
    .filter((i) => i.revenue > 0)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, n);
}

/** Top N items by quantity */
export function getTopItemsByQuantity(n: number): FoodItem[] {
  return itemDetail
    .sort((a, b) => b.qty - a.qty)
    .slice(0, n);
}

/** Bottom items (low sellers worth evaluating) */
export function getBottomItems(maxQty: number = 25): FoodItem[] {
  return itemDetail
    .filter((i) => i.qty <= maxQty && i.revenue > 0)
    .sort((a, b) => a.qty - b.qty);
}

/** Format currency */
export function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${value.toLocaleString('en-US')}`;
  }
  return `$${value}`;
}

/** Format compact currency (e.g., $32.6K) */
export function formatCompactCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value}`;
}

/** Format number with commas */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}
