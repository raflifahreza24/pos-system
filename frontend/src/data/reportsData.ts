import { formatCurrency, formatDate, formatNumber } from '../utils/formatters'
import { transactions } from './transactionsData'
import { products } from './productsData'
import { inventoryItems, lowStockItems } from './inventoryData'
import { customers } from './customersData'
import { users } from './usersData'
import { purchaseOrders } from './purchaseOrdersData'
import { salesByBranch, topSellingProducts } from './dashboardData'

export interface ReportType {
  id: string
  label: string
}

export const reportTypes: ReportType[] = [
  { id: 'sales', label: 'Sales Report' },
  { id: 'product', label: 'Product Report' },
  { id: 'inventory', label: 'Inventory Report' },
  { id: 'customer', label: 'Customer Report' },
  { id: 'employee', label: 'Employee Report' },
  { id: 'purchase', label: 'Purchase Report' },
  { id: 'payment', label: 'Payment Report' },
]

export interface ChartDatum {
  label: string
  value: number
}

export interface ReportColumn {
  key: string
  label: string
  align?: 'right'
}

export interface ReportDefinition {
  chartTitle: string
  chart: ChartDatum[]
  formatChartValue: (value: number) => string
  tableTitle: string
  columns: ReportColumn[]
  rows: Record<string, string>[]
}

// The one aggregation helper every report below builds its chart data
// with, so "sum this value per group" logic lives in exactly one place.
function sumByGroup<T>(items: T[], groupKey: (item: T) => string, value: (item: T) => number): ChartDatum[] {
  const totals = new Map<string, number>()
  for (const item of items) {
    const key = groupKey(item)
    totals.set(key, (totals.get(key) ?? 0) + value(item))
  }
  return Array.from(totals, ([label, total]) => ({ label, value: total }))
}

function topN<T>(items: T[], by: (item: T) => number, n: number): T[] {
  return [...items].sort((a, b) => by(b) - by(a)).slice(0, n)
}

// --- Sales Report — chart reuses the Dashboard's per-branch totals; the
// table lists the highest-value transactions. ---
const salesReport: ReportDefinition = {
  chartTitle: 'Sales by Branch',
  chart: salesByBranch.map((item) => ({ label: item.branch, value: item.value })),
  formatChartValue: (value) => formatCurrency(value * 1_000_000),
  tableTitle: 'Top Transactions',
  columns: [
    { key: 'no', label: 'No' },
    { key: 'invoice', label: 'Invoice' },
    { key: 'branch', label: 'Branch' },
    { key: 'cashier', label: 'Cashier' },
    { key: 'total', label: 'Total', align: 'right' },
    { key: 'status', label: 'Status' },
  ],
  rows: topN(transactions, (t) => t.total, 8).map((t, index) => ({
    no: String(index + 1),
    invoice: t.id,
    branch: t.branch,
    cashier: t.cashier,
    total: formatCurrency(t.total),
    status: t.status,
  })),
}

// --- Product Report — chart reuses the Dashboard's top-selling products;
// the table lists the highest-stocked products. ---
const productReport: ReportDefinition = {
  chartTitle: 'Top Selling Products',
  chart: topSellingProducts.map((item) => ({ label: item.name, value: item.sold })),
  formatChartValue: (value) => `${formatNumber(value)} sold`,
  tableTitle: 'Products by Stock',
  columns: [
    { key: 'no', label: 'No' },
    { key: 'product', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price', align: 'right' },
    { key: 'stock', label: 'Stock', align: 'right' },
    { key: 'status', label: 'Status' },
  ],
  rows: topN(products, (p) => p.stock, 8).map((p, index) => ({
    no: String(index + 1),
    product: p.name,
    category: p.category,
    price: formatCurrency(p.price),
    stock: formatNumber(p.stock),
    status: p.status,
  })),
}

// --- Inventory Report — chart sums current stock per category; the table
// reuses the Low Stock page's list directly. ---
const inventoryReport: ReportDefinition = {
  chartTitle: 'Stock by Category',
  chart: sumByGroup(
    inventoryItems,
    (item) => item.category,
    (item) => item.stock,
  ),
  formatChartValue: (value) => `${formatNumber(value)} pcs`,
  tableTitle: 'Low Stock Items',
  columns: [
    { key: 'no', label: 'No' },
    { key: 'product', label: 'Product' },
    { key: 'sku', label: 'SKU' },
    { key: 'stock', label: 'Stock', align: 'right' },
    { key: 'minStock', label: 'Min Stock', align: 'right' },
    { key: 'status', label: 'Status' },
  ],
  rows: lowStockItems.slice(0, 8).map((item, index) => ({
    no: String(index + 1),
    product: item.product,
    sku: item.sku,
    stock: formatNumber(item.stock),
    minStock: formatNumber(item.minStock),
    status: item.status,
  })),
}

// --- Customer Report — chart and table both rank customers by loyalty
// points. ---
const topCustomers = topN(customers, (c) => c.totalPoints, 8)
const customerReport: ReportDefinition = {
  chartTitle: 'Top Customers by Points',
  chart: topCustomers.slice(0, 6).map((c) => ({ label: c.name, value: c.totalPoints })),
  formatChartValue: (value) => `${formatNumber(value)} pts`,
  tableTitle: 'Top Customers',
  columns: [
    { key: 'no', label: 'No' },
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'points', label: 'Total Points', align: 'right' },
  ],
  rows: topCustomers.map((c, index) => ({
    no: String(index + 1),
    name: c.name,
    phone: c.phone,
    email: c.email,
    points: formatNumber(c.totalPoints),
  })),
}

// --- Employee Report — chart sums transaction totals per cashier; the
// table lists staff (everyone but Super Admin) from Users / Employees. ---
const staff = users.filter((user) => user.role !== 'Super Admin')
const employeeReport: ReportDefinition = {
  chartTitle: 'Sales by Cashier',
  chart: sumByGroup(
    transactions,
    (t) => t.cashier,
    (t) => t.total,
  ),
  formatChartValue: (value) => formatCurrency(value),
  tableTitle: 'Staff',
  columns: [
    { key: 'no', label: 'No' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'branch', label: 'Branch' },
    { key: 'status', label: 'Status' },
  ],
  rows: staff.slice(0, 8).map((user, index) => ({
    no: String(index + 1),
    name: user.name,
    role: user.role,
    branch: user.branch,
    status: user.status,
  })),
}

// --- Purchase Report — chart sums PO value per supplier; the table lists
// the highest-value purchase orders. ---
const purchaseReport: ReportDefinition = {
  chartTitle: 'Purchase Value by Supplier',
  chart: topN(
    sumByGroup(
      purchaseOrders,
      (po) => po.supplier,
      (po) => po.total,
    ),
    (d) => d.value,
    6,
  ),
  formatChartValue: (value) => formatCurrency(value),
  tableTitle: 'Top Purchase Orders',
  columns: [
    { key: 'no', label: 'No' },
    { key: 'poNo', label: 'PO No' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'date', label: 'Date' },
    { key: 'total', label: 'Total', align: 'right' },
    { key: 'status', label: 'Status' },
  ],
  rows: topN(purchaseOrders, (po) => po.total, 8).map((po, index) => ({
    no: String(index + 1),
    poNo: po.poNo,
    supplier: po.supplier,
    date: formatDate(po.date),
    total: formatCurrency(po.total),
    status: po.status,
  })),
}

// --- Payment Report — chart and table both break sales down by payment
// method. ---
const paymentTotals = sumByGroup(
  transactions,
  (t) => t.payment,
  (t) => t.total,
)
const paymentCounts = new Map<string, number>()
for (const transaction of transactions) {
  paymentCounts.set(transaction.payment, (paymentCounts.get(transaction.payment) ?? 0) + 1)
}
const paymentReport: ReportDefinition = {
  chartTitle: 'Sales by Payment Method',
  chart: paymentTotals,
  formatChartValue: (value) => formatCurrency(value),
  tableTitle: 'Payment Breakdown',
  columns: [
    { key: 'no', label: 'No' },
    { key: 'method', label: 'Payment Method' },
    { key: 'transactions', label: 'Transactions', align: 'right' },
    { key: 'total', label: 'Total', align: 'right' },
  ],
  rows: paymentTotals.map((item, index) => ({
    no: String(index + 1),
    method: item.label,
    transactions: formatNumber(paymentCounts.get(item.label) ?? 0),
    total: formatCurrency(item.value),
  })),
}

// Every report on this page is a real aggregation over data already used
// elsewhere in the app (Transactions, Products, Inventory, Customers,
// Users, Purchase Orders, plus the Dashboard's own summaries) — nothing
// here is invented just for this page.
export const reportDefinitions: Record<string, ReportDefinition> = {
  sales: salesReport,
  product: productReport,
  inventory: inventoryReport,
  customer: customerReport,
  employee: employeeReport,
  purchase: purchaseReport,
  payment: paymentReport,
}
