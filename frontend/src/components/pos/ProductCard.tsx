import type { Product } from '../../data/posData'
import { IconImage, IconPlus } from '../ui/icons'
import { formatCurrency } from '../../utils/formatters'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={() => onAdd(product)}
      className="group flex flex-col rounded-2xl border border-line bg-surface p-3 text-left shadow-xs transition-shadow duration-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <span className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-canvas text-ink-muted">
        <IconImage size={28} />
        <span className="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
          <IconPlus size={15} />
        </span>
      </span>
      <p className="mt-2.5 truncate text-sm font-medium text-ink">{product.name}</p>
      <p className="mt-0.5 text-sm font-semibold text-primary">{formatCurrency(product.price)}</p>
    </button>
  )
}
