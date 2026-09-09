import { useSidebar } from '../../hooks/useSidebar'
import { useHashRoute } from '../../hooks/useHashRoute'
import { ThemeToggle } from '../ui/ThemeToggle'
import { UserDropdown } from '../ui/UserDropdown'
import { IconBell, IconMenu, IconSearch } from '../ui/icons'
import { navItems, isNavItemActive, EXTRA_PAGE_TITLES } from '../../data/navigation'

export function Topbar() {
  const { openMobile } = useSidebar()
  const currentPath = useHashRoute()
  const pageTitle =
    navItems.find((item) => isNavItemActive(item.href, currentPath))?.label ?? EXTRA_PAGE_TITLES[currentPath] ?? 'Dashboard'

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-topbar px-4 transition-colors duration-300 sm:px-6">
      <button
        type="button"
        onClick={openMobile}
        aria-label="Open menu"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-ink lg:hidden"
      >
        <IconMenu size={20} />
      </button>

      <div className="min-w-0">
        <p className="truncate text-xs text-ink-muted">POS / {pageTitle}</p>
        <p className="truncate text-sm font-semibold text-ink sm:hidden">{pageTitle}</p>
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
        <div className="hidden items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2 md:flex">
          <IconSearch size={16} className="text-ink-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none lg:w-56"
          />
        </div>
        <button
          type="button"
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-ink md:hidden"
        >
          <IconSearch size={19} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-ink"
        >
          <IconBell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger-strong ring-2 ring-topbar" />
        </button>

        <ThemeToggle />

        <div className="ml-1 h-6 w-px bg-line sm:ml-2" />

        <UserDropdown />
      </div>
    </header>
  )
}
