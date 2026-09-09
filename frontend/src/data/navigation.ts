export type NavIconKey =
  | 'dashboard'
  | 'pos'
  | 'transactions'
  | 'returns'
  | 'customers'
  | 'products'
  | 'categories'
  | 'priceDiscounts'
  | 'inventory'
  | 'stockMovements'
  | 'stockTransfer'
  | 'stockOpname'
  | 'lowStock'
  | 'suppliers'
  | 'purchaseOrders'
  | 'goodsReceiving'
  | 'usersEmployees'
  | 'rolesPermissions'
  | 'shifts'
  | 'reports'
  | 'branches'
  | 'settings'

export interface NavItem {
  key: string
  label: string
  icon: NavIconKey
  href: string
}

/**
 * Whether a nav item should read as "active" for the current hash path —
 * an exact match, or a sub-route beneath it (e.g. `/returns-refunds/create`
 * stays under the "Returns & Refunds" item). Shared by the Sidebar
 * (highlighting) and the Topbar (breadcrumb label) so both agree on what
 * "on this page" means.
 */
// Most create pages nest under their own page's path (e.g.
// `/purchase-orders/create` stays under "Purchase Orders"), so a plain
// prefix check is enough. "Open Shift" is the one route that doesn't —
// it lives at the top-level `/open-shift` — so it's mapped back to
// "Shifts" here rather than teaching every caller about the exception.
const ROUTE_ALIASES: Record<string, string> = {
  'open-shift': 'shifts',
}

export function isNavItemActive(href: string, currentPath: string): boolean {
  const itemPath = href.slice(1)
  const resolvedPath = ROUTE_ALIASES[currentPath] ?? currentPath
  return resolvedPath === itemPath || resolvedPath.startsWith(`${itemPath}/`)
}

// Pages reachable only from the user dropdown (UserDropdown.tsx), not from
// the sidebar — so they have no navItems entry for Topbar's breadcrumb to
// match against. Kept separate from navItems itself so Sidebar (which
// renders navItems directly) doesn't grow extra links for them.
export const EXTRA_PAGE_TITLES: Record<string, string> = {
  '/profile': 'Profile',
  '/preferences': 'Preferences',
}

export const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '#/dashboard' },
  { key: 'pos', label: 'Point of Sale', icon: 'pos', href: '#/point-of-sale' },
  { key: 'transactions', label: 'Transactions', icon: 'transactions', href: '#/transactions' },
  { key: 'returns', label: 'Returns & Refunds', icon: 'returns', href: '#/returns-refunds' },
  { key: 'customers', label: 'Customers', icon: 'customers', href: '#/customers' },
  { key: 'products', label: 'Products', icon: 'products', href: '#/products' },
  { key: 'categories', label: 'Categories', icon: 'categories', href: '#/categories' },
  { key: 'priceDiscounts', label: 'Price & Discounts', icon: 'priceDiscounts', href: '#/price-discounts' },
  { key: 'inventory', label: 'Inventory', icon: 'inventory', href: '#/inventory' },
  { key: 'stockMovements', label: 'Stock Movements', icon: 'stockMovements', href: '#/stock-movements' },
  { key: 'stockTransfer', label: 'Stock Transfer', icon: 'stockTransfer', href: '#/stock-transfer' },
  { key: 'stockOpname', label: 'Stock Opname', icon: 'stockOpname', href: '#/stock-opname' },
  { key: 'lowStock', label: 'Low Stock', icon: 'lowStock', href: '#/low-stock' },
  { key: 'suppliers', label: 'Suppliers', icon: 'suppliers', href: '#/suppliers' },
  { key: 'purchaseOrders', label: 'Purchase Orders', icon: 'purchaseOrders', href: '#/purchase-orders' },
  { key: 'goodsReceiving', label: 'Goods Receiving', icon: 'goodsReceiving', href: '#/goods-receiving' },
  { key: 'usersEmployees', label: 'Users / Employees', icon: 'usersEmployees', href: '#/users-employees' },
  { key: 'rolesPermissions', label: 'Roles & Permissions', icon: 'rolesPermissions', href: '#/roles-permissions' },
  { key: 'shifts', label: 'Shifts', icon: 'shifts', href: '#/shifts' },
  { key: 'reports', label: 'Reports', icon: 'reports', href: '#/reports' },
  { key: 'branches', label: 'Branches', icon: 'branches', href: '#/branches' },
  { key: 'settings', label: 'Settings', icon: 'settings', href: '#/settings' },
]
