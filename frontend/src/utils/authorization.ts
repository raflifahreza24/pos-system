import type { NavIconKey } from '../data/navigation'
import type { PermissionModule, PermissionNode } from '../data/rolesPermissionsData'
import type { Permission, PermissionGroups } from '../types/authorization'

const MODULE_PRESENTATION: Record<string, { label: string; icon: NavIconKey }> = {
  dashboard: { label: 'Dashboard', icon: 'dashboard' },
  branches: { label: 'Branches', icon: 'branches' },
  users: { label: 'Users / Employees', icon: 'usersEmployees' },
  roles: { label: 'Roles & Permissions', icon: 'rolesPermissions' },
  products: { label: 'Products', icon: 'products' },
  categories: { label: 'Categories', icon: 'categories' },
  customers: { label: 'Customers', icon: 'customers' },
  suppliers: { label: 'Suppliers', icon: 'suppliers' },
  prices: { label: 'Prices', icon: 'priceDiscounts' },
  discounts: { label: 'Discounts', icon: 'priceDiscounts' },
  inventory: { label: 'Inventory', icon: 'inventory' },
  stock_movements: { label: 'Stock Movements', icon: 'stockMovements' },
  stock_transfers: { label: 'Stock Transfer', icon: 'stockTransfer' },
  stock_opnames: { label: 'Stock Opname', icon: 'stockOpname' },
  purchase_orders: { label: 'Purchase Orders', icon: 'purchaseOrders' },
  goods_receipts: { label: 'Goods Receiving', icon: 'goodsReceiving' },
  pos: { label: 'Point of Sale', icon: 'pos' },
  sales: { label: 'Sales', icon: 'transactions' },
  returns: { label: 'Returns & Refunds', icon: 'returns' },
  shifts: { label: 'Shifts', icon: 'shifts' },
  reports: { label: 'Reports', icon: 'reports' },
  settings: { label: 'Settings', icon: 'settings' },
}

function titleCase(value: string): string {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function presentationFor(module: string) {
  return MODULE_PRESENTATION[module] ?? {
    label: titleCase(module),
    icon: 'rolesPermissions' as const,
  }
}

export function flattenPermissions(groups: PermissionGroups): Permission[] {
  return Object.values(groups).flat()
}

export function permissionGroupsToModules(groups: PermissionGroups): PermissionModule[] {
  return Object.entries(groups).map(([module, permissions]) => {
    const presentation = presentationFor(module)
    return {
      key: module,
      label: presentation.label,
      icon: presentation.icon,
      actions: permissions.map((permission) => ({
        key: permission.name,
        label: permission.description ?? titleCase(permission.action),
      })),
    }
  })
}

export function permissionGroupsToTree(groups: PermissionGroups): PermissionNode[] {
  return Object.entries(groups).map(([module, permissions]) => ({
    key: `module:${module}`,
    label: presentationFor(module).label,
    children: permissions.map((permission) => ({
      key: permission.name,
      label: permission.description ?? titleCase(permission.action),
    })),
  }))
}
