import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { IconDownload } from '../ui/icons'

export type ReportDateRange = 'thisMonth' | 'lastMonth' | 'thisYear'

interface ReportsToolbarProps {
  dateRange: ReportDateRange
  onDateRangeChange: (value: ReportDateRange) => void
  branch: string
  onBranchChange: (value: string) => void
  branches: string[]
}

export function ReportsToolbar({
  dateRange,
  onDateRangeChange,
  branch,
  onBranchChange,
  branches,
}: ReportsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Select
        value={dateRange}
        onChange={(event) => onDateRangeChange(event.target.value as ReportDateRange)}
        wrapperClassName="sm:w-40"
        aria-label="Filter by date range"
      >
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
        <option value="thisYear">This Year</option>
      </Select>

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

      <Button variant="secondary" icon={<IconDownload size={15} />} className="sm:ml-auto">
        Export
      </Button>
    </div>
  )
}
