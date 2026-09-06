import type { NavItem } from '../../data/navigation'
import {
  IconAlertTriangle,
  IconCategory,
  IconClock,
  IconCustomers,
  IconDashboard,
  IconEmployees,
  IconInventory,
  IconMovements,
  IconOpname,
  IconPercent,
  IconPos,
  IconProducts,
  IconPurchaseOrder,
  IconReceiving,
  IconReports,
  IconReturn,
  IconSettings,
  IconShieldCheck,
  IconStorefront,
  IconTransactions,
  IconTransfer,
  IconTruck,
} from '../ui/icons'
import { cn } from '../../utils/formatters'

// Exported so any other feature that needs the same nav-icon-key ->
// icon-component mapping (e.g. the Add Role permission module cards) can
// reuse it instead of redeclaring its own copy.
export const navIconMap = {
  dashboard: IconDashboard,
  pos: IconPos,
  transactions: IconTransactions,
  returns: IconReturn,
  customers: IconCustomers,
  products: IconProducts,
  categories: IconCategory,
  priceDiscounts: IconPercent,
  inventory: IconInventory,
  stockMovements: IconMovements,
  stockTransfer: IconTransfer,
  stockOpname: IconOpname,
  lowStock: IconAlertTriangle,
  suppliers: IconTruck,
  purchaseOrders: IconPurchaseOrder,
  goodsReceiving: IconReceiving,
  usersEmployees: IconEmployees,
  rolesPermissions: IconShieldCheck,
  shifts: IconClock,
  reports: IconReports,
  branches: IconStorefront,
  settings: IconSettings,
} as const

interface SidebarItemProps {
  item: NavItem
  active: boolean
  collapsed: boolean
  onNavigate?: () => void
}

export function SidebarItem({ item, active, collapsed, onNavigate }: SidebarItemProps) {
  const Icon = navIconMap[item.icon]

  return (
    <a
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150',
        collapsed ? 'lg:justify-center lg:px-2.5' : '',
        active
          ? 'bg-sidebar-active text-sidebar-ink-active'
          : 'text-sidebar-ink hover:bg-sidebar-hover hover:text-sidebar-ink-active',
      )}
    >
      <Icon size={19} className="shrink-0" />
      <span className={cn('truncate', collapsed && 'lg:hidden')}>{item.label}</span>

      {collapsed ? (
        <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 lg:group-hover:block">
          {item.label}
        </span>
      ) : null}
    </a>
  )
}
