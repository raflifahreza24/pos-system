import { Select } from '../ui/Select'
import { DateRangeSelect } from '../ui/DateRangeSelect'
import { Button } from '../ui/Button'
import { IconDownload, IconFilter, IconPlus } from '../ui/icons'
import type { DateRangeFilter } from '../../utils/dateRangeFilter'
import type { Status } from '../ui/StatusBadge'

const STATUS_OPTIONS: Status[] = ['Approved', 'Pending', 'Rejected']

interface ReturnsToolbarProps {
  dateRange: DateRangeFilter
  onDateRangeChange: (value: DateRangeFilter) => void
  branch: string
  onBranchChange: (value: string) => void
  status: Status | 'all'
  onStatusChange: (value: Status | 'all') => void
  branches: string[]
  onNewReturn: () => void
}

export function ReturnsToolbar({
  dateRange,
  onDateRangeChange,
  branch,
  onBranchChange,
  status,
  onStatusChange,
  branches,
  onNewReturn,
}: ReturnsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 shadow-xs sm:flex-row sm:flex-wrap sm:items-center sm:p-5">
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
        value={status}
        onChange={(event) => onStatusChange(event.target.value as Status | 'all')}
        wrapperClassName="sm:w-40"
        aria-label="Filter by status"
      >
        <option value="all">All Status</option>
        {STATUS_OPTIONS.map((item) => (
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
        <Button icon={<IconPlus size={15} />} onClick={onNewReturn} className="flex-1 sm:flex-none">
          New Return
        </Button>
      </div>
    </div>
  )
}
