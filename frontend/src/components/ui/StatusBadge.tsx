import { cn } from '../../utils/formatters'

export type Status =
  | 'Completed'
  | 'Paid'
  | 'Approved'
  | 'Active'
  | 'In Transit'
  | 'Ordered'
  | 'Received'
  | 'Pending'
  | 'Cancelled'
  | 'Rejected'
  | 'Refunded'
  | 'Inactive'
  | 'Low Stock'
  | 'Out of Stock'
  | 'Open'
  | 'Closed'

// The generic Active/Inactive pair used by simple status toggles across
// the app (Customers, Products, ...), so they all share one literal list.
export const activeInactiveStatuses: Status[] = ['Active', 'Inactive']

const statusStyles: Record<Status, string> = {
  Completed: 'bg-success-light text-success-strong',
  Paid: 'bg-success-light text-success-strong',
  Approved: 'bg-success-light text-success-strong',
  Active: 'bg-success-light text-success-strong',
  'In Transit': 'bg-primary-light text-primary',
  Ordered: 'bg-warning-light text-warning-strong',
  Received: 'bg-success-light text-success-strong',
  Pending: 'bg-warning-light text-warning-strong',
  Cancelled: 'bg-danger-light text-danger-strong',
  Rejected: 'bg-danger-light text-danger-strong',
  Refunded: 'bg-danger-light text-danger-strong',
  Inactive: 'bg-canvas text-ink-muted',
  'Low Stock': 'bg-warning-light text-warning-strong',
  'Out of Stock': 'bg-danger-light text-danger-strong',
  Open: 'bg-primary-light text-primary',
  Closed: 'bg-canvas text-ink-muted',
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
        statusStyles[status],
      )}
    >
      {status}
    </span>
  )
}
