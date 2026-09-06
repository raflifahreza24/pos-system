import { StepCard } from '../../ui/StepCard'
import { formatCurrency } from '../../../utils/formatters'
import type { POItemRow } from './AddItemsStep'

interface SummaryStepProps {
  rows: POItemRow[]
}

function SummaryRow({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={muted ? 'text-ink-muted' : 'font-medium text-ink'}>{label}</span>
      <span className={muted ? 'text-ink-muted' : 'font-semibold text-ink'}>{value}</span>
    </div>
  )
}

export function SummaryStep({ rows }: SummaryStepProps) {
  const totalItems = rows.length
  const totalQuantity = rows.reduce((sum, row) => sum + row.quantity, 0)
  const subtotal = rows.reduce((sum, row) => sum + row.unitPrice * row.quantity, 0)
  const tax = 0
  const total = subtotal + tax

  return (
    <StepCard step={4} title="Summary" subtitle="Review the purchase order totals before submitting.">
      <div className="grid gap-4 rounded-xl bg-canvas p-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <SummaryRow label="Total Items" value={String(totalItems)} muted />
          <SummaryRow label="Total Quantity" value={String(totalQuantity)} muted />
        </div>
        <div className="flex flex-col gap-2">
          <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} muted />
          <SummaryRow label="Tax (Optional)" value={formatCurrency(tax)} muted />
          <hr className="border-line" />
          <SummaryRow label="Total" value={formatCurrency(total)} />
        </div>
      </div>
    </StepCard>
  )
}
