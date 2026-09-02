import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { DateRangeSelect } from '../ui/DateRangeSelect'
import { Button } from '../ui/Button'
import { IconDownload, IconFilter, IconSearch } from '../ui/icons'
import type { DateRangeFilter } from '../../utils/dateRangeFilter'

interface TransactionsToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  dateRange: DateRangeFilter
  onDateRangeChange: (value: DateRangeFilter) => void
  branch: string
  onBranchChange: (value: string) => void
  cashier: string
  onCashierChange: (value: string) => void
  branches: string[]
  cashiers: string[]
}

export function TransactionsToolbar({
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  branch,
  onBranchChange,
  cashier,
  onCashierChange,
  branches,
  cashiers,
}: TransactionsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 shadow-xs sm:p-5">
      <Input
        icon={<IconSearch size={17} className="text-ink-muted" />}
        placeholder="Search invoice or customer..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <DateRangeSelect value={dateRange} onChange={onDateRangeChange} wrapperClassName="sm:w-40" />

        <Select
          value={branch}
          onChange={(event) => onBranchChange(event.target.value)}
          wrapperClassName="sm:w-44"
          aria-label="Filter by branch"
        >
          <option value="all">All Branches</option>
          {branches.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <Select
          value={cashier}
          onChange={(event) => onCashierChange(event.target.value)}
          wrapperClassName="sm:w-40"
          aria-label="Filter by cashier"
        >
          <option value="all">All Cashiers</option>
          {cashiers.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <div className="flex gap-2.5 sm:ml-auto">
          <Button variant="secondary" icon={<IconFilter size={15} />} className="flex-1 sm:flex-none">
            Filters
          </Button>
          <Button variant="secondary" icon={<IconDownload size={15} />} className="flex-1 sm:flex-none">
            Export
          </Button>
        </div>
      </div>
    </div>
  )
}
