import type { Transaction } from '../../../data/transactionsData'
import type { TransactionItem } from '../../../data/transactionItemsData'
import { StepCard } from '../../ui/StepCard'
import { StatusBadge } from '../../ui/StatusBadge'
import { formatCurrency, formatDateTime } from '../../../utils/formatters'

interface OriginalTransactionStepProps {
  transaction: Transaction
  items: TransactionItem[]
  total: number
}

export function OriginalTransactionStep({ transaction, items, total }: OriginalTransactionStepProps) {
  return (
    <StepCard step={2} title="Original Transaction">
      <div className="flex flex-col gap-4 rounded-xl border border-line bg-canvas p-4 sm:flex-row sm:justify-between">
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
          <dt className="text-ink-muted">Invoice No</dt>
          <dd className="font-medium text-ink">{transaction.id}</dd>
          <dt className="text-ink-muted">Date</dt>
          <dd className="font-medium text-ink">{formatDateTime(transaction.date)}</dd>
          <dt className="text-ink-muted">Customer</dt>
          <dd className="font-medium text-ink">{transaction.customer}</dd>
          <dt className="text-ink-muted">Cashier</dt>
          <dd className="font-medium text-ink">{transaction.cashier}</dd>
          <dt className="text-ink-muted">Branch</dt>
          <dd className="font-medium text-ink">{transaction.branch}</dd>
          <dt className="text-ink-muted">Payment Method</dt>
          <dd className="font-medium text-ink">{transaction.payment}</dd>
        </dl>

        <div className="flex flex-row gap-8 sm:flex-col sm:items-end sm:text-right">
          <div>
            <p className="text-xs text-ink-muted">Status</p>
            <StatusBadge status={transaction.status} />
          </div>
          <div>
            <p className="text-xs text-ink-muted">Total</p>
            <p className="text-base font-semibold text-ink">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-3 py-2.5 font-medium">No</th>
              <th className="px-3 py-2.5 font-medium">Product</th>
              <th className="px-3 py-2.5 font-medium">SKU</th>
              <th className="px-3 py-2.5 text-right font-medium">Qty</th>
              <th className="px-3 py-2.5 text-right font-medium">Price</th>
              <th className="px-3 py-2.5 text-right font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={`${item.sku}-${index}`} className="border-b border-line last:border-0">
                <td className="px-3 py-2.5 text-ink-muted">{index + 1}</td>
                <td className="px-3 py-2.5 font-medium text-ink">{item.product}</td>
                <td className="px-3 py-2.5 text-ink-muted">{item.sku}</td>
                <td className="px-3 py-2.5 text-right text-ink">{item.qty}</td>
                <td className="px-3 py-2.5 text-right text-ink">{formatCurrency(item.price)}</td>
                <td className="px-3 py-2.5 text-right font-medium text-ink">
                  {formatCurrency(item.qty * item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StepCard>
  )
}
