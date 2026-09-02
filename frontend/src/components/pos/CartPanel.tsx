import type { CartLine } from '../../hooks/useCart'
import { CartItemRow } from './CartItemRow'
import { CartSummary } from './CartSummary'
import { IconPos } from '../ui/icons'

interface CartPanelProps {
  lines: CartLine[]
  itemCount: number
  subtotal: number
  discount: number
  tax: number
  total: number
  onIncrement: (productId: string) => void
  onDecrement: (productId: string) => void
  onRemove: (productId: string) => void
  onCancel: () => void
  onPay: () => void
}

export function CartPanel({
  lines,
  itemCount,
  subtotal,
  discount,
  tax,
  total,
  onIncrement,
  onDecrement,
  onRemove,
  onCancel,
  onPay,
}: CartPanelProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-surface p-4 shadow-xs sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink">Cart</h2>
        {itemCount > 0 ? (
          <span className="rounded-full bg-primary-light px-2 py-0.5 text-xs font-medium text-primary">
            {itemCount} item{itemCount > 1 ? 's' : ''}
          </span>
        ) : null}
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-ink-muted">
            <IconPos size={19} />
          </span>
          <p className="text-sm text-ink-muted">Cart is empty. Tap a product to add it.</p>
        </div>
      ) : (
        <>
          <div className="mt-3 flex items-center gap-2.5 text-xs font-medium uppercase tracking-wide text-ink-muted">
            <span className="flex-1">Item</span>
            <span className="w-[74px] shrink-0 text-center">Qty</span>
            <span className="w-20 shrink-0 text-right">Price</span>
            <span className="w-7 shrink-0" />
          </div>
          <ul className="max-h-[320px] divide-y divide-line overflow-y-auto">
            {lines.map((line) => (
              <CartItemRow
                key={line.product.id}
                line={line}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onRemove={onRemove}
              />
            ))}
          </ul>
        </>
      )}

      <div className="mt-4 border-t border-line pt-4">
        <CartSummary
          subtotal={subtotal}
          discount={discount}
          tax={tax}
          total={total}
          disabled={lines.length === 0}
          onCancel={onCancel}
          onPay={onPay}
        />
      </div>
    </div>
  )
}
