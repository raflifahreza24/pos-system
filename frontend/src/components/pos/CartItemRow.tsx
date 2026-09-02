import type { CartLine } from '../../hooks/useCart'
import { IconMinus, IconPlus, IconTrash } from '../ui/icons'
import { formatCurrency } from '../../utils/formatters'

interface CartItemRowProps {
  line: CartLine
  onIncrement: (productId: string) => void
  onDecrement: (productId: string) => void
  onRemove: (productId: string) => void
}

export function CartItemRow({ line, onIncrement, onDecrement, onRemove }: CartItemRowProps) {
  return (
    <li className="flex items-center gap-2.5 py-2.5">
      <p className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{line.product.name}</p>

      <div className="flex shrink-0 items-center gap-1 rounded-lg border border-line">
        <button
          type="button"
          onClick={() => onDecrement(line.product.id)}
          aria-label={`Decrease ${line.product.name}`}
          className="flex h-7 w-7 items-center justify-center text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-ink"
        >
          <IconMinus size={13} />
        </button>
        <span className="w-5 text-center text-sm font-medium text-ink">{line.quantity}</span>
        <button
          type="button"
          onClick={() => onIncrement(line.product.id)}
          aria-label={`Increase ${line.product.name}`}
          className="flex h-7 w-7 items-center justify-center text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-ink"
        >
          <IconPlus size={13} />
        </button>
      </div>

      <p className="w-20 shrink-0 text-right text-sm font-semibold text-ink">
        {formatCurrency(line.product.price * line.quantity)}
      </p>

      <button
        type="button"
        onClick={() => onRemove(line.product.id)}
        aria-label={`Remove ${line.product.name}`}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-danger-light hover:text-danger-strong"
      >
        <IconTrash size={14} />
      </button>
    </li>
  )
}
