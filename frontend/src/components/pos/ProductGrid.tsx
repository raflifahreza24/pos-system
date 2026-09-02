import type { Product } from '../../data/posData'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onAdd: (product: Product) => void
}

export function ProductGrid({ products, onAdd }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No products match your search.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  )
}
