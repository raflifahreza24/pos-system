import { StepCard } from '../../ui/StepCard'
import { formatCurrency, formatDate, formatDateTimeLong } from '../../../utils/formatters'
import type { PriceHistoryRow } from '../../../data/priceDetailData'

interface PriceHistoryStepProps {
  rows: PriceHistoryRow[]
}

function formatOptionalDate(value: string | null): string {
  return value ? formatDate(value) : '-'
}

export function PriceHistoryStep({ rows }: PriceHistoryStepProps) {
  return (
    <StepCard step={4} title="Price History" subtitle="Riwayat perubahan harga.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-3 py-2.5 font-medium">No</th>
              <th className="px-3 py-2.5 font-medium">Price</th>
              <th className="px-3 py-2.5 font-medium">Start Date</th>
              <th className="px-3 py-2.5 font-medium">End Date</th>
              <th className="px-3 py-2.5 font-medium">Branch</th>
              <th className="px-3 py-2.5 font-medium">Changed At</th>
              <th className="px-3 py-2.5 font-medium">Changed By</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.changedAt}-${index}`} className="border-b border-line last:border-0">
                <td className="px-3 py-2.5 text-ink-muted">{index + 1}</td>
                <td className="px-3 py-2.5 font-medium text-ink">{formatCurrency(row.price)}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-ink-muted">{formatOptionalDate(row.startDate)}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-ink-muted">{formatOptionalDate(row.endDate)}</td>
                <td className="px-3 py-2.5 text-ink-muted">{row.branch}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-ink-muted">{formatDateTimeLong(row.changedAt)}</td>
                <td className="px-3 py-2.5 text-ink-muted">{row.changedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StepCard>
  )
}
