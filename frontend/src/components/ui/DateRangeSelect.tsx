import { Select } from './Select'
import type { DateRangeFilter } from '../../utils/dateRangeFilter'

interface DateRangeSelectProps {
  value: DateRangeFilter
  onChange: (value: DateRangeFilter) => void
  wrapperClassName?: string
}

export function DateRangeSelect({ value, onChange, wrapperClassName }: DateRangeSelectProps) {
  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.value as DateRangeFilter)}
      wrapperClassName={wrapperClassName}
      aria-label="Filter by date range"
    >
      <option value="all">All Dates</option>
      <option value="today">Today</option>
      <option value="7d">Last 7 Days</option>
      <option value="30d">Last 30 Days</option>
    </Select>
  )
}
