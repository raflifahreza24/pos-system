import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { IconSearch } from '../ui/icons'

interface InventoryToolbarProps {
  branch: string
  onBranchChange: (value: string) => void
  branches: string[]
  search: string
  onSearchChange: (value: string) => void
}

export function InventoryToolbar({
  branch,
  onBranchChange,
  branches,
  search,
  onSearchChange,
}: InventoryToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Select
        value={branch}
        onChange={(event) => onBranchChange(event.target.value)}
        wrapperClassName="sm:w-48"
        aria-label="Filter by branch"
      >
        <option value="all">All Branches</option>
        {branches.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>

      <Input
        icon={<IconSearch size={17} className="text-ink-muted" />}
        placeholder="Search product or SKU..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        wrapperClassName="sm:flex-1"
      />
    </div>
  )
}
