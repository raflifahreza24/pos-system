import { Select } from '../ui/Select'
import { DateRangeSelect } from '../ui/DateRangeSelect'
import { Button } from '../ui/Button'
import { IconDownload, IconFilter } from '../ui/icons'
import type { DateRangeFilter } from '../../utils/dateRangeFilter'
import type { StockMovementType } from '../../data/stockMovementsData'

interface StockMovementsToolbarProps {
  dateRange: DateRangeFilter
  onDateRangeChange: (value: DateRangeFilter) => void
  branch: string
  onBranchChange: (value: string) => void
  branches: string[]
  type: StockMovementType | 'all'
  onTypeChange: (value: StockMovementType | 'all') => void
  types: StockMovementType[]
}

export function StockMovementsToolbar({
  dateRange,
  onDateRangeChange,
  branch,
  onBranchChange,
  branches,
  type,
  onTypeChange,
  types,
}: StockMovementsToolbarProps) {
  return (
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
        value={type}
        onChange={(event) => onTypeChange(event.target.value as StockMovementType | 'all')}
        wrapperClassName="sm:w-40"
        aria-label="Filter by type"
      >
        <option value="all">All Types</option>
        {types.map((item) => (
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
  )
}
