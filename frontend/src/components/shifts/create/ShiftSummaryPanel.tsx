import { IconTransactions } from '../../ui/icons'
import { formatCurrency, formatDateNumeric } from '../../../utils/formatters'
import { cashierOptions } from './CashierInformationStep'

interface ShiftSummaryPanelProps {
  cashierId: string
  branch: string
  openDate: string
  openTime: string
  startingCash: number
  notes: string
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-28 shrink-0 font-medium text-ink">{label}</span>
      <span className="truncate text-ink-muted">: {value}</span>
    </div>
  )
}

export function ShiftSummaryPanel({ cashierId, branch, openDate, openTime, startingCash, notes }: ShiftSummaryPanelProps) {
  const cashier = cashierOptions.find((entry) => entry.id === cashierId) ?? null

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-canvas p-5">
      <div className="flex items-center gap-2.5">
        <IconTransactions size={18} className="text-ink" />
        <h3 className="text-base font-semibold text-ink">Shift Summary</h3>
      </div>

      <div className="flex flex-col gap-2">
        <SummaryRow label="Cashier" value={cashier ? `${cashier.name} (${cashier.id})` : '-'} />
        <SummaryRow label="Branch" value={branch || '-'} />
        <SummaryRow label="Open Date" value={formatDateNumeric(openDate)} />
        <SummaryRow label="Open Time" value={openTime || '-'} />
        <SummaryRow label="Starting Cash" value={startingCash > 0 ? formatCurrency(startingCash) : '-'} />
        <SummaryRow label="Notes" value={notes || '-'} />
      </div>
    </div>
  )
}
