import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { IconPlus, IconSearch } from '../ui/icons'

interface CustomersToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  onAddCustomer: () => void
}

export function CustomersToolbar({ search, onSearchChange, onAddCustomer }: CustomersToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        icon={<IconSearch size={17} className="text-ink-muted" />}
        placeholder="Search customer..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        wrapperClassName="sm:flex-1"
      />
      <Button icon={<IconPlus size={16} />} onClick={onAddCustomer} fullWidthOnMobile>
        Add Customer
      </Button>
    </div>
  )
}
