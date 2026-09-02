export type NavIconKey =
  | 'dashboard'
  | 'pos'
  | 'transactions'
  | 'returns'
  | 'customers'
  | 'products'
  | 'inventory'
  | 'purchasing'
  | 'employees'
  | 'reports'
  | 'settings'

export interface NavItem {
  key: string
  label: string
  icon: NavIconKey
  href: string
}

export const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '#/dashboard' },
  { key: 'pos', label: 'Point of Sale', icon: 'pos', href: '#/point-of-sale' },
  { key: 'transactions', label: 'Transactions', icon: 'transactions', href: '#/transactions' },
  { key: 'returns', label: 'Returns & Refunds', icon: 'returns', href: '#/returns-refunds' },
  { key: 'customers', label: 'Customers', icon: 'customers', href: '#/customers' },
  { key: 'products', label: 'Products', icon: 'products', href: '#/products' },
  { key: 'inventory', label: 'Inventory', icon: 'inventory', href: '#/inventory' },
  { key: 'purchasing', label: 'Purchasing', icon: 'purchasing', href: '#/purchasing' },
  { key: 'employees', label: 'Employees', icon: 'employees', href: '#/employees' },
  { key: 'reports', label: 'Reports', icon: 'reports', href: '#/reports' },
  { key: 'settings', label: 'Settings', icon: 'settings', href: '#/settings' },
]
