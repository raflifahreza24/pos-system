import { navItems, isNavItemActive } from '../../data/navigation'
import { useSidebar } from '../../hooks/useSidebar'
import { useHashRoute } from '../../hooks/useHashRoute'
import { SidebarItem } from './SidebarItem'
import { IconChevronLeft, IconChevronRight, IconClose, IconLogOut } from '../ui/icons'
import { cn } from '../../utils/formatters'

export function Sidebar() {
  const { collapsed, mobileOpen, toggleCollapsed, closeMobile } = useSidebar()
  const currentPath = useHashRoute()

  return (
    <>
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[1px] lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col bg-sidebar transition-transform duration-300 ease-in-out lg:static lg:z-30 lg:h-full lg:translate-x-0 lg:transition-[width] lg:duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'lg:w-20' : 'lg:w-64',
        )}
      >
        <div className={cn('flex h-16 shrink-0 items-center gap-2.5 px-4', collapsed && 'lg:justify-center lg:px-0')}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
            POS
          </span>
          <span className={cn('text-sm font-semibold text-sidebar-ink-active', collapsed && 'lg:hidden')}>
            Super Admin
          </span>
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-ink transition-colors duration-150 hover:bg-sidebar-hover lg:hidden"
          >
            <IconClose size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-hide px-3 py-2">
          {navItems.map((item) => (
            <SidebarItem
              key={item.key}
              item={item}
              active={isNavItemActive(item.href, currentPath)}
              collapsed={collapsed}
              onNavigate={closeMobile}
            />
          ))}
        </nav>

        <div className={cn('space-y-2 border-t border-sidebar-line px-3 py-3', collapsed && 'lg:px-2.5')}>
          <div className={cn('flex items-center gap-2.5 rounded-xl px-2 py-1.5', collapsed && 'lg:justify-center lg:px-0')}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
              SA
            </span>
            <span className={cn('min-w-0 flex-1', collapsed && 'lg:hidden')}>
              <span className="block truncate text-sm font-medium text-sidebar-ink-active">Super Admin</span>
              <span className="block truncate text-xs text-sidebar-ink">admin@pos.app</span>
            </span>
          </div>
          <button
            type="button"
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-ink transition-colors duration-150 hover:bg-sidebar-hover hover:text-sidebar-ink-active',
              collapsed && 'lg:justify-center lg:px-2.5',
            )}
          >
            <IconLogOut size={18} className="shrink-0" />
            <span className={cn(collapsed && 'lg:hidden')}>Log Out</span>
          </button>
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn(
              'hidden w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-ink transition-colors duration-150 hover:bg-sidebar-hover hover:text-sidebar-ink-active lg:flex',
              collapsed && 'lg:justify-center lg:px-2.5',
            )}
          >
            {collapsed ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
            <span className={cn(collapsed && 'lg:hidden')}>Collapse</span>
          </button>
        </div>
      </aside>
    </>
  )
}
