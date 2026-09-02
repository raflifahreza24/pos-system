import { cn } from '../../utils/formatters'

export type Status = 'Completed' | 'Paid' | 'Approved' | 'Pending' | 'Cancelled' | 'Rejected' | 'Refunded'

const statusStyles: Record<Status, string> = {
  Completed: 'bg-success-light text-success-strong',
  Paid: 'bg-success-light text-success-strong',
  Approved: 'bg-success-light text-success-strong',
  Pending: 'bg-warning-light text-warning-strong',
  Cancelled: 'bg-danger-light text-danger-strong',
  Rejected: 'bg-danger-light text-danger-strong',
  Refunded: 'bg-danger-light text-danger-strong',
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
