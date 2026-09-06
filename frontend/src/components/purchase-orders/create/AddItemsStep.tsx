import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { StepCard } from '../../ui/StepCard'
import { IconSearch, IconTrash } from '../../ui/icons'
import { products, getProductSku } from '../../../data/productsData'
import { inventoryItems } from '../../../data/inventoryData'
import { useProductSearchAdd } from '../../../hooks/useProductSearchAdd'
import { formatCurrency } from '../../../utils/formatters'

export interface POItemRow {
  productId: string
  unitPrice: number
  quantity: number
}

// Every purchasable product, with the SKU and unit each already used
// elsewhere in the app (Returns, Stock Transfer, ...) rather than
// re-derived ad hoc for this one form.
const productCandidates = products.map((product) => ({
  id: product.id,
  product: product.name,
  sku: getProductSku(product.id),
  unit: inventoryItems.find((item) => item.id === product.id)?.unit ?? 'pcs',
  price: product.price,
}))

interface AddItemsStepProps {
  rows: POItemRow[]
  onAddRow: (productId: string, unitPrice: number) => void
  onRemoveRow: (index: number) => void
  onUnitPriceChange: (index: number, unitPrice: number) => void
  onQuantityChange: (index: number, quantity: number) => void
}

export function AddItemsStep({ rows, onAddRow, onRemoveRow, onUnitPriceChange, onQuantityChange }: AddItemsStepProps) {
  const { query, setQuery, error, handleAdd } = useProductSearchAdd(
    productCandidates,
    rows.map((row) => row.productId),
    (item) => onAddRow(item.id, item.price),
  )

  return (
    <StepCard step={3} title="Add Items" subtitle="Add products to this purchase order.">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleAdd()
        }}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <Input
          icon={<IconSearch size={17} className="text-ink-muted" />}
          placeholder="Search product by name or SKU..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          wrapperClassName="sm:flex-1"
        />
        <Button type="submit" variant="secondary" fullWidthOnMobile>
          Add Item
        </Button>
      </form>

      {error ? <p className="text-sm text-danger-strong">{error}</p> : null}

      {rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-3 py-2.5 font-medium">No</th>
                <th className="px-3 py-2.5 font-medium">Product</th>
                <th className="px-3 py-2.5 font-medium">SKU</th>
                <th className="px-3 py-2.5 font-medium">Unit</th>
                <th className="px-3 py-2.5 font-medium">Unit Price (Rp)</th>
                <th className="px-3 py-2.5 font-medium">Quantity</th>
                <th className="px-3 py-2.5 text-right font-medium">Subtotal (Rp)</th>
                <th className="px-3 py-2.5 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const item = productCandidates.find((entry) => entry.id === row.productId)
                if (!item) return null

                const subtotal = row.unitPrice * row.quantity

                return (
                  <tr key={row.productId} className="border-b border-line last:border-0">
                    <td className="px-3 py-2.5 text-ink-muted">{index + 1}</td>
                    <td className="px-3 py-2.5 font-medium text-ink">{item.product}</td>
                    <td className="px-3 py-2.5 text-ink-muted">{item.sku}</td>
                    <td className="px-3 py-2.5 text-ink-muted">{item.unit}</td>
                    <td className="px-3 py-2.5">
                      <Input
                        type="number"
                        min={0}
                        value={row.unitPrice}
                        onChange={(event) => onUnitPriceChange(index, Number(event.target.value))}
                        wrapperClassName="w-28"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <Input
                        type="number"
                        min={1}
                        value={row.quantity}
                        onChange={(event) => onQuantityChange(index, Number(event.target.value))}
                        wrapperClassName="w-24"
                      />
                    </td>
                    <td className="px-3 py-2.5 text-right font-medium text-ink">{formatCurrency(subtotal)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => onRemoveRow(index)}
                        aria-label={`Remove ${item.product}`}
                        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-danger-strong"
                      >
                        <IconTrash size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-line py-8 text-center text-sm text-ink-muted">
          No items added yet. Search for a product above to add it to this purchase order.
        </p>
      )}
    </StepCard>
  )
}
