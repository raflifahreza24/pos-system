import { StepCard } from '../../ui/StepCard'
import { formatDateNumeric } from '../../../utils/formatters'
import type { GoodsReceivingItemRow } from './ItemsStep'

interface SummaryStepProps {
  rows: GoodsReceivingItemRow[]
  supplier: string
  poNo: string
  receivingDate: string
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-32 shrink-0 font-medium text-ink">{label}</span>
      <span className="text-ink-muted">: {value}</span>
    </div>
  )
}

export function SummaryStep({ rows, supplier, poNo, receivingDate }: SummaryStepProps) {
  const totalItems = rows.length
  const totalReceivedQty = rows.reduce((sum, row) => sum + row.receivedQty, 0)

  return (
    <StepCard step={3} title="Summary" subtitle="Review the receiving summary.">
      <div className="grid grid-cols-1 gap-x-10 gap-y-3 rounded-xl bg-canvas p-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <SummaryRow label="Total Items" value={String(totalItems)} />
          <SummaryRow label="Total Received Qty" value={String(totalReceivedQty)} />
        </div>
        <div className="flex flex-col gap-2">
          <SummaryRow label="Supplier" value={supplier || '-'} />
          <SummaryRow label="PO No" value={poNo || '-'} />
          <SummaryRow label="Receiving Date" value={formatDateNumeric(receivingDate)} />
        </div>
      </div>
    </StepCard>
  )
}
