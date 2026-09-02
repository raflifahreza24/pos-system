import type { Status } from '../components/ui/StatusBadge'

export type PeriodFilter = '7d' | '30d' | '3m' | '1y'

export interface StatDatum {
  id: string
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: 'revenue' | 'transactions' | 'customers' | 'lowStock'
}

export const statCards: StatDatum[] = [
  { id: 'revenue', label: 'Total Sales', value: 'Rp 125.000.000', change: 12.5, trend: 'up', icon: 'revenue' },
  { id: 'transactions', label: 'Transactions', value: '1.250', change: 8.2, trend: 'up', icon: 'transactions' },
  { id: 'customers', label: 'Customers', value: '3.240', change: 4.1, trend: 'up', icon: 'customers' },
  { id: 'lowStock', label: 'Low Stock', value: '24', change: -3.4, trend: 'down', icon: 'lowStock' },
]

export const salesOverviewByPeriod: Record<PeriodFilter, { label: string; value: number }[]> = {
  '7d': [
    { label: 'Mon', value: 14.2 },
    { label: 'Tue', value: 18.6 },
    { label: 'Wed', value: 16.1 },
    { label: 'Thu', value: 21.4 },
    { label: 'Fri', value: 19.8 },
    { label: 'Sat', value: 24.5 },
    { label: 'Sun', value: 22.0 },
  ],
  '30d': [
    { label: 'W1', value: 82 },
    { label: 'W2', value: 96 },
    { label: 'W3', value: 88 },
    { label: 'W4', value: 112 },
  ],
  '3m': [
    { label: 'Jul', value: 310 },
    { label: 'Aug', value: 342 },
    { label: 'Sep', value: 298 },
  ],
  '1y': [
    { label: 'Jan', value: 210 },
    { label: 'Feb', value: 240 },
    { label: 'Mar', value: 225 },
    { label: 'Apr', value: 260 },
    { label: 'May', value: 245 },
    { label: 'Jun', value: 280 },
    { label: 'Jul', value: 310 },
    { label: 'Aug', value: 342 },
    { label: 'Sep', value: 298 },
    { label: 'Oct', value: 320 },
    { label: 'Nov', value: 355 },
    { label: 'Dec', value: 390 },
  ],
}

export const periodFilterLabels: Record<PeriodFilter, string> = {
  '7d': '7 Days',
  '30d': '30 Days',
  '3m': '3 Months',
  '1y': '1 Year',
}

export const salesByBranch = [
  { branch: 'Branch A', value: 42 },
  { branch: 'Branch B', value: 38 },
  { branch: 'Branch C', value: 45 },
  { branch: 'Branch D', value: 22 },
  { branch: 'Branch E', value: 47 },
  { branch: 'Branch F', value: 34 },
]

export const topSellingProducts = [
  { rank: 1, name: 'Product A', sold: 482 },
  { rank: 2, name: 'Product B', sold: 401 },
  { rank: 3, name: 'Product C', sold: 356 },
  { rank: 4, name: 'Product D', sold: 298 },
  { rank: 5, name: 'Product E', sold: 240 },
]

export interface TransactionRow {
  id: string
  customer: string
  date: string
  amount: number
  status: Status
}

export const recentTransactions: TransactionRow[] = [
  { id: 'INV-0001', customer: 'Andi Saputra', date: '2026-09-02', amount: 150000, status: 'Completed' },
  { id: 'INV-0002', customer: 'Siti Rahma', date: '2026-09-01', amount: 230000, status: 'Completed' },
  { id: 'INV-0003', customer: 'Budi Hartono', date: '2026-09-01', amount: 175000, status: 'Pending' },
  { id: 'INV-0004', customer: 'Dewi Lestari', date: '2026-08-31', amount: 300000, status: 'Completed' },
  { id: 'INV-0005', customer: 'Rizky Pratama', date: '2026-08-31', amount: 95000, status: 'Cancelled' },
]

export interface ActivityItem {
  id: string
  title: string
  time: string
  type: 'transaction' | 'inventory' | 'customer' | 'purchasing'
}

export const recentActivity: ActivityItem[] = [
  { id: 'a1', title: 'New transaction INV-0001 created', time: '5 minutes ago', type: 'transaction' },
  { id: 'a2', title: 'Product stock "Product B" updated', time: '32 minutes ago', type: 'inventory' },
  { id: 'a3', title: 'New customer Rizky Pratama registered', time: '1 hour ago', type: 'customer' },
  { id: 'a4', title: 'Purchase order PO-0032 completed', time: '3 hours ago', type: 'purchasing' },
]
