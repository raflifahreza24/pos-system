import { Input } from '../../ui/Input'
import { StepCard } from '../../ui/StepCard'
import { products, getProductSku } from '../../../data/productsData'
import { inventoryItems } from '../../../data/inventoryData'

export interface GoodsReceivingItemRow {
  productId: string
  orderedQty: number
  receivedQty: number
  remarks: string
}

interface ItemsStepProps {
  rows: GoodsReceivingItemRow[]
  onReceivedQtyChange: (index: number, receivedQty: number) => void
  onRemarksChange: (index: number, remarks: string) => void
}

export function ItemsStep({ rows, onReceivedQtyChange, onRemarksChange }: ItemsStepProps) {
  return (
    <StepCard step={2} title="Items" subtitle="List of items from the selected purchase order. Enter the received quantity for each item.">
      {rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-3 py-2.5 font-medium">No</th>
                <th className="px-3 py-2.5 font-medium">Product</th>
                <th className="px-3 py-2.5 font-medium">SKU</th>
                <th className="px-3 py-2.5 font-medium">Ordered Qty</th>
                <th className="px-3 py-2.5 font-medium">Received Qty</th>
                <th className="px-3 py-2.5 font-medium">Unit</th>
                <th className="px-3 py-2.5 font-medium">Remarks</th>
                <th className="px-3 py-2.5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const product = products.find((entry) => entry.id === row.productId)
                if (!product) return null
                const unit = inventoryItems.find((item) => item.id === row.productId)?.unit ?? 'pcs'

                return (
                  <tr key={row.productId} className="border-b border-line last:border-0">
                    <td className="px-3 py-2.5 text-ink-muted">{index + 1}</td>
                    <td className="px-3 py-2.5 font-medium text-ink">{product.name}</td>
                    <td className="px-3 py-2.5 text-ink-muted">{getProductSku(product.id)}</td>
                    <td className="px-3 py-2.5 text-ink-muted">{row.orderedQty}</td>
                    <td className="px-3 py-2.5">
                      <Input
                        type="number"
                        min={0}
                        value={row.receivedQty}
                        onChange={(event) => onReceivedQtyChange(index, Number(event.target.value))}
                        wrapperClassName="w-24"
                      />
                    </td>
                    <td className="px-3 py-2.5 text-ink-muted">{unit}</td>
                    <td className="px-3 py-2.5">
                      <Input
                        placeholder="Enter remarks (optional)"
                        value={row.remarks}
                        onChange={(event) => onRemarksChange(index, event.target.value)}
                        wrapperClassName="min-w-[180px]"
                      />
                    </td>
                    <td className="px-3 py-2.5" />
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-line py-8 text-center text-sm text-ink-muted">
          Select a purchase order above to load its items.
        </p>
      )}
    </StepCard>
  )
}
