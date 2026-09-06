import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

interface ShiftsToolbarProps {
  date: string
  onDateChange: (value: string) => void
  branch: string
  onBranchChange: (value: string) => void
  branches: string[]
}

export function ShiftsToolbar({ date, onDateChange, branch, onBranchChange, branches }: ShiftsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-1.5 sm:w-44">
        <label htmlFor="shift-date" className="text-xs font-medium text-ink-muted">
          Date
        </label>
        <Input id="shift-date" type="date" value={date} onChange={(event) => onDateChange(event.target.value)} />
      </div>

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
    </div>
  )
}
