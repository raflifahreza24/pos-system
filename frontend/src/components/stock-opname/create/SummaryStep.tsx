import { StepCard } from '../../ui/StepCard'
import { inventoryItems } from '../../../data/inventoryData'
import { formatDateNumeric } from '../../../utils/formatters'
import type { OpnameItemRow } from './CountItemsStep'
import type { OpnameType, OpnameFormStatus } from './OpnameInformationStep'

interface SummaryStepProps {
  rows: OpnameItemRow[]
  branch: string
  opnameType: OpnameType
  date: string
  status: OpnameFormStatus
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-32 shrink-0 font-medium text-ink">{label}</span>
      <span className="text-ink-muted">: {value}</span>
    </div>
  )
}

export function SummaryStep({ rows, branch, opnameType, date, status }: SummaryStepProps) {
  const differences = rows.map((row) => {
    const item = inventoryItems.find((entry) => entry.id === row.productId)
    return row.actualStock - (item?.stock ?? row.actualStock)
  })

  const matched = differences.filter((diff) => diff === 0).length
  const positive = differences.filter((diff) => diff > 0).length
  const negative = differences.filter((diff) => diff < 0).length

  return (
    <StepCard step={3} title="Summary" subtitle="Review the stock opname summary.">
      <div className="grid grid-cols-1 gap-x-10 gap-y-3 rounded-xl bg-canvas p-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <SummaryRow label="Total Products" value={String(rows.length)} />
          <SummaryRow label="Matched" value={String(matched)} />
          <SummaryRow label="Difference (+)" value={String(positive)} />
          <SummaryRow label="Difference (-)" value={String(negative)} />
        </div>
        <div className="flex flex-col gap-2">
          <SummaryRow label="Branch" value={branch || '-'} />
          <SummaryRow label="Opname Type" value={opnameType === 'Full' ? 'Full Stock Opname' : 'Partial Stock Opname'} />
          <SummaryRow label="Date" value={formatDateNumeric(date)} />
          <SummaryRow label="Status" value={status} />
        </div>
      </div>
    </StepCard>
  )
}
