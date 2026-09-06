import { useRef } from 'react'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { StepCard } from '../../ui/StepCard'
import { IconSearch, IconTrash, IconUpload } from '../../ui/icons'
import { inventoryItems } from '../../../data/inventoryData'
import { useProductSearchAdd } from '../../../hooks/useProductSearchAdd'
import { cn } from '../../../utils/formatters'

export interface OpnameItemRow {
  productId: string
  actualStock: number
  notes: string
}

interface CountItemsStepProps {
  branch: string
  category: string
  rows: OpnameItemRow[]
  onAddRow: (productId: string) => void
  onRemoveRow: (index: number) => void
  onActualStockChange: (index: number, actualStock: number) => void
  onNotesChange: (index: number, notes: string) => void
}

function formatDifference(diff: number): string {
  return diff > 0 ? `+${diff}` : String(diff)
}

export function CountItemsStep({
  branch,
  category,
  rows,
  onAddRow,
  onRemoveRow,
  onActualStockChange,
  onNotesChange,
}: CountItemsStepProps) {
  const importInputRef = useRef<HTMLInputElement>(null)

  const candidates = inventoryItems.filter(
    (item) => item.branch === branch && (category === '' || item.category === category),
  )

  const { query, setQuery, error, handleAdd } = useProductSearchAdd(
    candidates,
    rows.map((row) => row.productId),
    (item) => onAddRow(item.id),
  )

  return (
    <StepCard step={2} title="Count Items" subtitle="Scan barcode or search product, then input the actual stock.">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleAdd()
        }}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <Input
          icon={<IconSearch size={17} className="text-ink-muted" />}
          placeholder="Search product by name, SKU, or barcode..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          wrapperClassName="sm:flex-1"
        />
        <Button type="submit" variant="secondary" fullWidthOnMobile>
          Add Item
        </Button>
        <Button
          type="button"
          variant="secondary"
          icon={<IconUpload size={16} />}
          fullWidthOnMobile
          onClick={() => importInputRef.current?.click()}
        >
          Import from Excel
        </Button>
        <input
          ref={importInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          // TODO: parse the uploaded file once a spreadsheet-parsing library is available.
          onChange={() => {}}
        />
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
                <th className="px-3 py-2.5 text-right font-medium">System Stock</th>
                <th className="px-3 py-2.5 font-medium">Actual Stock *</th>
                <th className="px-3 py-2.5 text-right font-medium">Difference</th>
                <th className="px-3 py-2.5 font-medium">Notes</th>
                <th className="px-3 py-2.5 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const item = candidates.find((entry) => entry.id === row.productId)
                if (!item) return null

                const difference = row.actualStock - item.stock

                return (
                  <tr key={row.productId} className="border-b border-line last:border-0">
                    <td className="px-3 py-2.5 text-ink-muted">{index + 1}</td>
                    <td className="px-3 py-2.5 font-medium text-ink">{item.product}</td>
                    <td className="px-3 py-2.5 text-ink-muted">{item.sku}</td>
                    <td className="px-3 py-2.5 text-right text-ink-muted">{item.stock}</td>
                    <td className="px-3 py-2.5">
                      <Input
                        type="number"
                        min={0}
                        value={row.actualStock}
                        onChange={(event) => onActualStockChange(index, Number(event.target.value))}
                        wrapperClassName="w-24"
                      />
                    </td>
                    <td
                      className={cn(
                        'px-3 py-2.5 text-right font-medium',
                        difference < 0 ? 'text-danger-strong' : 'text-success-strong',
                      )}
                    >
                      {formatDifference(difference)}
                    </td>
                    <td className="px-3 py-2.5">
                      <Input
                        placeholder="-"
                        value={row.notes}
                        onChange={(event) => onNotesChange(index, event.target.value)}
                        wrapperClassName="min-w-[140px]"
                      />
                    </td>
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
          No items counted yet. Search for a product above to add it to this opname.
        </p>
      )}
    </StepCard>
  )
}
