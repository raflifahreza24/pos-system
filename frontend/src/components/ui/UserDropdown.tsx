import { useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { IconChevronDown, IconLogOut, IconSettings, IconUser } from './icons'
import { cn } from '../../utils/formatters'

export function UserDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false), open)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 transition-colors duration-200 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:pr-2.5"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
          SA
        </span>
        <span className="hidden text-left leading-tight md:block">
          <span className="block text-sm font-medium text-ink">Super Admin</span>
          <span className="block text-xs text-ink-muted">Administrator</span>
        </span>
        <IconChevronDown size={16} className={cn('hidden text-ink-muted transition-transform duration-200 sm:block', open && 'rotate-180')} />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-52 overflow-hidden rounded-xl border border-line bg-surface py-1.5 shadow-md animate-in"
        >
          <div className="border-b border-line px-3.5 py-2.5 sm:hidden">
            <p className="text-sm font-medium text-ink">Super Admin</p>
            <p className="text-xs text-ink-muted">Administrator</p>
          </div>
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-ink transition-colors duration-150 hover:bg-canvas"
          >
            <IconUser size={16} className="text-ink-muted" />
            My Profile
          </button>
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-ink transition-colors duration-150 hover:bg-canvas"
          >
            <IconSettings size={16} className="text-ink-muted" />
            Settings
          </button>
          <div className="my-1 border-t border-line" />
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-danger-strong transition-colors duration-150 hover:bg-danger-light"
          >
            <IconLogOut size={16} />
            Log Out
          </button>
        </div>
      ) : null}
    </div>
  )
}
