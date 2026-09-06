import type { ReactNode } from 'react'
import { Input } from './Input'
import { Button } from './Button'
import { IconSearch } from './icons'

interface SearchToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  placeholder: string
  actionLabel: string
  actionIcon: ReactNode
  onAction: () => void
}

/**
 * "Search on the left, one primary action on the right" — the toolbar
 * shape shared by every simple list page (Customers, Products, ...).
 * Pages that need extra filters (Transactions, Returns & Refunds) build
 * their own toolbar instead of forcing those filters in here.
 */
export function SearchToolbar({
  search,
  onSearchChange,
  placeholder,
  actionLabel,
  actionIcon,
  onAction,
}: SearchToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        icon={<IconSearch size={17} className="text-ink-muted" />}
        placeholder={placeholder}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        wrapperClassName="sm:flex-1"
      />
      <Button icon={actionIcon} onClick={onAction} fullWidthOnMobile>
        {actionLabel}
      </Button>
    </div>
  )
}
