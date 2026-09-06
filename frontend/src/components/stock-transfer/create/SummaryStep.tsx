import { StepCard } from '../../ui/StepCard'
import type { TransferItemRow } from './AddItemsStep'

interface SummaryStepProps {
  rows: TransferItemRow[]
  fromBranch: string
  toBranch: string
  date: string
}

function formatDateNumeric(isoDate: string): string {
  if (!isoDate) return '-'
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-32 shrink-0 font-medium text-ink">{label}</span>
      <span className="text-ink-muted">: {value}</span>
    </div>
  )
}

export function SummaryStep({ rows, fromBranch, toBranch, date }: SummaryStepProps) {
  const totalQuantity = rows.reduce((sum, row) => sum + row.qty, 0)

  return (
    <StepCard step={3} title="Summary" subtitle="Review the transfer details.">
      <div className="grid grid-cols-1 gap-x-10 gap-y-3 rounded-xl bg-canvas p-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <SummaryRow label="Total Items" value={String(rows.length)} />
          <SummaryRow label="Total Quantity" value={String(totalQuantity)} />
        </div>
        <div className="flex flex-col gap-2">
          <SummaryRow label="From Branch" value={fromBranch || '-'} />
          <SummaryRow label="To Branch" value={toBranch || '-'} />
          <SummaryRow label="Transfer Date" value={formatDateNumeric(date)} />
        </div>
      </div>
    </StepCard>
  )
}
