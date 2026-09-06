import type { Product } from '../../data/productsData'
import { StatusBadge } from '../ui/StatusBadge'
import { formatCurrency, formatNumber } from '../../utils/formatters'

interface ProductsTableProps {
  rows: Product[]
  startIndex: number
}

export function ProductsTable({ rows, startIndex }: ProductsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No products match your search.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3 font-medium">No</th>
              <th className="px-3 py-3 font-medium">Product Name</th>
              <th className="px-3 py-3 font-medium">Category</th>
              <th className="px-3 py-3 font-medium">Price</th>
              <th className="px-3 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{product.name}</td>
                <td className="px-3 py-3 text-ink-muted">{product.category}</td>
                <td className="px-3 py-3 text-ink">{formatCurrency(product.price)}</td>
                <td className="px-3 py-3 text-ink">{formatNumber(product.stock)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={product.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((product, index) => (
          <li key={product.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {product.name} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <StatusBadge status={product.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">{product.category}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-xs text-ink-muted">Stock: {formatNumber(product.stock)}</p>
              <p className="text-sm font-semibold text-ink">{formatCurrency(product.price)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
