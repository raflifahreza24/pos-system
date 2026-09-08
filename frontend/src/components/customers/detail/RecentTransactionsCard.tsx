import { Button } from '../../ui/Button'
import { IconTransactions } from '../../ui/icons'
import { formatCurrency, formatDateNumeric } from '../../../utils/formatters'
import type { CustomerRecentTransaction } from '../../../data/customerTransactionsData'

interface RecentTransactionsCardProps {
  transactions: CustomerRecentTransaction[]
  onViewAll: () => void
}

export function RecentTransactionsCard({ transactions, onViewAll }: RecentTransactionsCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <IconTransactions size={18} className="text-ink" />
          <h2 className="text-base font-semibold text-ink">Recent Transactions</h2>
        </div>
        <Button variant="secondary" onClick={onViewAll}>
          View All
        </Button>
      </div>

      {transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-3 py-2.5 font-medium">No</th>
                <th className="px-3 py-2.5 font-medium">Invoice No</th>
                <th className="px-3 py-2.5 font-medium">Date</th>
                <th className="px-3 py-2.5 font-medium">Branch</th>
                <th className="px-3 py-2.5 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.invoiceNo} className="border-b border-line last:border-0">
                  <td className="px-3 py-2.5 text-ink-muted">{index + 1}</td>
                  <td className="px-3 py-2.5 font-medium text-ink">{transaction.invoiceNo}</td>
                  <td className="px-3 py-2.5 text-ink-muted">{formatDateNumeric(transaction.date)}</td>
                  <td className="px-3 py-2.5 text-ink-muted">{transaction.branch}</td>
                  <td className="px-3 py-2.5 text-right font-medium text-ink">{formatCurrency(transaction.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-line py-8 text-center text-sm text-ink-muted">
          No transactions yet for this customer.
        </p>
      )}
    </div>
  )
}
