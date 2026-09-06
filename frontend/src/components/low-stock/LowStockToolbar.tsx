import { Select } from '../ui/Select'

interface LowStockToolbarProps {
  branch: string
  onBranchChange: (value: string) => void
  branches: string[]
  category: string
  onCategoryChange: (value: string) => void
  categories: string[]
}

export function LowStockToolbar({
  branch,
  onBranchChange,
  branches,
  category,
  onCategoryChange,
  categories,
}: LowStockToolbarProps) {
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

      <Select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        wrapperClassName="sm:w-48"
        aria-label="Filter by category"
      >
        <option value="all">All Categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </div>
  )
}
