import { navItems, type NavIconKey } from './navigation'

export interface Role {
  id: string
  name: string
}

export const roles: Role[] = [
  { id: 'super-admin', name: 'Super Admin' },
  { id: 'manager', name: 'Manager' },
  { id: 'inventory-staff', name: 'Inventory Staff' },
  { id: 'cashier', name: 'Cashier' },
]

export interface PermissionNode {
  key: string
  label: string
  children?: PermissionNode[]
}

// Pulls page labels from `navItems` (not re-typed) so every permission row
// always matches the real menu label shown in the sidebar.
function pageLabel(key: string): string {
  return navItems.find((item) => item.key === key)?.label ?? key
}

export interface PermissionAction {
  key: string
  label: string
}

export interface PermissionModule {
  key: string
  label: string
  icon: NavIconKey
  actions: PermissionAction[]
}

// Action-level permissions for the "Add Role" form's Permissions step — a
// finer grain than `permissionTree` below (which only toggles whole pages
// for the main Roles & Permissions screen). Module labels reuse `pageLabel`
// so they always agree with the sidebar; "Purchasing" has no single page of
// its own, so it keeps the same literal label `permissionTree` uses for it.
export const permissionModules: PermissionModule[] = [
  {
    key: 'dashboard',
    label: pageLabel('dashboard'),
    icon: 'dashboard',
    actions: [{ key: 'view-dashboard', label: 'View Dashboard' }],
  },
  {
    key: 'pos',
    label: pageLabel('pos'),
    icon: 'pos',
    actions: [
      { key: 'access-pos', label: 'Access POS' },
      { key: 'process-sales', label: 'Process Sales' },
      { key: 'apply-discount', label: 'Apply Discount' },
      { key: 'view-sales-history', label: 'View Sales History' },
    ],
  },
  {
    key: 'transactions',
    label: pageLabel('transactions'),
    icon: 'transactions',
    actions: [
      { key: 'view-transactions', label: 'View Transactions' },
      { key: 'update-transactions', label: 'Update Transactions' },
      { key: 'delete-transactions', label: 'Delete Transactions' },
    ],
  },
  {
    key: 'returns',
    label: pageLabel('returns'),
    icon: 'returns',
    actions: [
      { key: 'view-returns', label: 'View Returns' },
      { key: 'process-returns', label: 'Process Returns' },
      { key: 'approve-refunds', label: 'Approve Refunds' },
    ],
  },
  {
    key: 'customers',
    label: pageLabel('customers'),
    icon: 'customers',
    actions: [
      { key: 'view-customers', label: 'View Customers' },
      { key: 'add-customer', label: 'Add Customer' },
      { key: 'edit-customer', label: 'Edit Customer' },
      { key: 'delete-customer', label: 'Delete Customer' },
    ],
  },
  {
    key: 'products',
    label: pageLabel('products'),
    icon: 'products',
    actions: [
      { key: 'view-products', label: 'View Products' },
      { key: 'add-product', label: 'Add Product' },
      { key: 'edit-product', label: 'Edit Product' },
      { key: 'delete-product', label: 'Delete Product' },
    ],
  },
  {
    key: 'inventory',
    label: pageLabel('inventory'),
    icon: 'inventory',
    actions: [
      { key: 'view-inventory', label: 'View Inventory' },
      { key: 'adjust-stock', label: 'Adjust Stock' },
      { key: 'stock-transfer', label: 'Stock Transfer' },
      { key: 'stock-opname', label: 'Stock Opname' },
    ],
  },
  {
    key: 'purchasing',
    label: 'Purchasing',
    icon: 'purchaseOrders',
    actions: [
      { key: 'view-purchase-orders', label: 'View Purchase Orders' },
      { key: 'create-purchase-order', label: 'Create Purchase Order' },
      { key: 'approve-purchase-order', label: 'Approve Purchase Order' },
      { key: 'receive-goods', label: 'Receive Goods' },
    ],
  },
]

export const permissionTree: PermissionNode[] = [
  { key: 'dashboard', label: pageLabel('dashboard') },
  {
    key: 'salesGroup',
    label: 'Sales',
    children: [
      { key: 'transactions', label: pageLabel('transactions') },
      { key: 'returns', label: pageLabel('returns') },
      { key: 'customers', label: pageLabel('customers') },
    ],
  },
  {
    key: 'productsGroup',
    label: pageLabel('products'),
    children: [
      { key: 'products', label: pageLabel('products') },
      { key: 'categories', label: pageLabel('categories') },
      { key: 'priceDiscounts', label: pageLabel('priceDiscounts') },
    ],
  },
  {
    key: 'inventoryGroup',
    label: pageLabel('inventory'),
    children: [
      { key: 'inventory', label: pageLabel('inventory') },
      { key: 'stockMovements', label: pageLabel('stockMovements') },
      { key: 'stockTransfer', label: pageLabel('stockTransfer') },
      { key: 'stockOpname', label: pageLabel('stockOpname') },
      { key: 'lowStock', label: pageLabel('lowStock') },
    ],
  },
  {
    key: 'purchasingGroup',
    label: 'Purchasing',
    children: [
      { key: 'suppliers', label: pageLabel('suppliers') },
      { key: 'purchaseOrders', label: pageLabel('purchaseOrders') },
      { key: 'goodsReceiving', label: pageLabel('goodsReceiving') },
    ],
  },
  { key: 'reports', label: pageLabel('reports') },
  {
    key: 'usersRolesGroup',
    label: 'Users & Roles',
    children: [
      { key: 'usersEmployees', label: pageLabel('usersEmployees') },
      { key: 'rolesPermissions', label: pageLabel('rolesPermissions') },
    ],
  },
  { key: 'settings', label: pageLabel('settings') },
]

function collectLeafKeys(nodes: PermissionNode[]): string[] {
  return nodes.flatMap((node) => (node.children ? collectLeafKeys(node.children) : [node.key]))
}

const allLeafKeys = collectLeafKeys(permissionTree)

function pick(keys: string[]): string[] {
  const allowed = new Set(allLeafKeys)
  return keys.filter((key) => allowed.has(key))
}

// Default access per role — a reasonable starting point the checkboxes
// build on; toggled live in the Roles & Permissions page state.
export const defaultRolePermissions: Record<string, string[]> = {
  'super-admin': allLeafKeys,
  manager: pick([
    'dashboard',
    'transactions',
    'returns',
    'customers',
    'products',
    'categories',
    'priceDiscounts',
    'inventory',
    'stockMovements',
    'stockTransfer',
    'stockOpname',
    'lowStock',
    'suppliers',
    'purchaseOrders',
    'goodsReceiving',
    'reports',
    'usersEmployees',
  ]),
  'inventory-staff': pick([
    'dashboard',
    'inventory',
    'stockMovements',
    'stockTransfer',
    'stockOpname',
    'lowStock',
    'suppliers',
    'purchaseOrders',
    'goodsReceiving',
  ]),
  cashier: pick(['dashboard', 'transactions', 'returns', 'customers']),
}
