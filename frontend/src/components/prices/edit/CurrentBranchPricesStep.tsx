import { StepCard } from '../../ui/StepCard'
import { Input } from '../../ui/Input'
import { formatCurrency } from '../../../utils/formatters'
import type { BranchPriceRow } from '../../../data/priceDetailData'

const rupiahIcon = <span className="text-sm font-medium text-ink-muted">Rp</span>

interface CurrentBranchPricesStepProps {
  rows: BranchPriceRow[]
  values: Record<string, number>
  onChange: (branch: string, price: number) => void
}

export function CurrentBranchPricesStep({ rows, values, onChange }: CurrentBranchPricesStepProps) {
  return (
    <StepCard
      step={3}
      title="Current Branch Prices"
      subtitle="Daftar harga untuk setiap cabang (akan diperbarui sesuai effective scope)."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-3 py-2.5 font-medium">No</th>
              <th className="px-3 py-2.5 font-medium">Branch</th>
              <th className="px-3 py-2.5 font-medium">Current Price</th>
              <th className="px-3 py-2.5 font-medium">New Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.branch} className="border-b border-line last:border-0">
                <td className="px-3 py-2.5 text-ink-muted">{index + 1}</td>
                <td className="px-3 py-2.5 font-medium text-ink">{row.branch}</td>
                <td className="px-3 py-2.5 text-ink-muted">{formatCurrency(row.price)}</td>
                <td className="px-3 py-2.5">
                  <Input
                    type="number"
                    min={0}
                    icon={rupiahIcon}
                    wrapperClassName="max-w-[160px] bg-canvas"
                    value={values[row.branch] ?? row.price}
                    onChange={(event) => onChange(row.branch, Number(event.target.value))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StepCard>
  )
}
