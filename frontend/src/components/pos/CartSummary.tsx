import { Button } from '../ui/Button'
import { formatCurrency } from '../../utils/formatters'

interface CartSummaryProps {
  subtotal: number
  discount: number
  tax: number
  total: number
  disabled: boolean
  onCancel: () => void
  onPay: () => void
}

export function CartSummary({ subtotal, discount, tax, total, disabled, onCancel, onPay }: CartSummaryProps) {
  return (
    <div>
      <dl className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-ink-muted">Subtotal</dt>
          <dd className="text-ink">{formatCurrency(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-muted">Discount</dt>
          <dd className="text-ink">{formatCurrency(discount)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-muted">Tax</dt>
          <dd className="text-ink">{formatCurrency(tax)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-2.5 text-base font-semibold">
          <dt className="text-ink">Total</dt>
          <dd className="text-primary">{formatCurrency(total)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onCancel} disabled={disabled}>
          Cancel
        </Button>
        <Button variant="primary" className="flex-1" onClick={onPay} disabled={disabled}>
          Pay
        </Button>
      </div>
    </div>
  )
}
