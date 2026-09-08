import { IconUser } from '../../ui/icons'
import { InfoRow } from '../../ui/InfoRow'
import { StatusBadge } from '../../ui/StatusBadge'
import { formatDate } from '../../../utils/formatters'
import { formatCustomerAddress, type Customer } from '../../../data/customersData'

interface CustomerInformationCardProps {
  customer: Customer
}

export function CustomerInformationCard({ customer }: CustomerInformationCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <h2 className="text-base font-semibold text-ink">Customer Information</h2>

      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex shrink-0 items-start justify-center sm:justify-start">
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-ink-muted/15 text-ink-muted">
            <IconUser size={44} />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-lg font-semibold text-ink">{customer.name}</h3>
            <StatusBadge status={customer.status} />
          </div>

          <div className="flex flex-col gap-2">
            <InfoRow label="Customer ID" value={customer.id} />
            <InfoRow label="Phone" value={customer.phone} />
            <InfoRow label="Email" value={customer.email} />
            <InfoRow label="Address" value={formatCustomerAddress(customer)} />
            <InfoRow label="Join Date" value={formatDate(customer.joinDate)} />
            <InfoRow label="Notes" value={customer.notes || '-'} />
          </div>
        </div>
      </div>
    </div>
  )
}
