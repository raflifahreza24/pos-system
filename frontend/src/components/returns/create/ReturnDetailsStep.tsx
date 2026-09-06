import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { StepCard } from '../../ui/StepCard'
import type { TransactionItem } from '../../../data/transactionItemsData'
import { returnReasons, type ReturnCondition } from '../../../data/returnsData'
import { paymentMethods, type PaymentMethod } from '../../../data/transactionsData'
import { cn, formatCurrency } from '../../../utils/formatters'

export interface ReturnLineState {
  selected: boolean
  returnQty: number
  reason: string
}

interface ReturnDetailsStepProps {
  items: TransactionItem[]
  lines: ReturnLineState[]
  onToggleLine: (index: number) => void
  onQtyChange: (index: number, qty: number) => void
  onReasonChange: (index: number, reason: string) => void
  condition: ReturnCondition
  onConditionChange: (condition: ReturnCondition) => void
  refundMethod: PaymentMethod
  onRefundMethodChange: (method: PaymentMethod) => void
  refundAmount: number
  notes: string
  onNotesChange: (notes: string) => void
}

export function ReturnDetailsStep({
  items,
  lines,
  onToggleLine,
  onQtyChange,
  onReasonChange,
  condition,
  onConditionChange,
  refundMethod,
  onRefundMethodChange,
  refundAmount,
  notes,
  onNotesChange,
}: ReturnDetailsStepProps) {
  return (
    <StepCard
      step={3}
      title="Return Details"
      subtitle="Select the item(s) to return and fill in the return information."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
              <th className="w-10 px-3 py-2.5" />
              <th className="px-3 py-2.5 font-medium">Product</th>
              <th className="px-3 py-2.5 font-medium">SKU</th>
              <th className="px-3 py-2.5 text-right font-medium">Purchased Qty</th>
              <th className="px-3 py-2.5 font-medium">Return Qty</th>
              <th className="px-3 py-2.5 text-right font-medium">Unit Price</th>
              <th className="px-3 py-2.5 text-right font-medium">Subtotal</th>
              <th className="px-3 py-2.5 font-medium">Reason</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const line = lines[index]
              const subtotal = line.selected ? line.returnQty * item.price : 0

              return (
                <tr key={`${item.sku}-${index}`} className="border-b border-line last:border-0">
                  <td className="px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={line.selected}
                      onChange={() => onToggleLine(index)}
                      aria-label={`Select ${item.product} for return`}
                      className="h-4 w-4 rounded border-line text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </td>
                  <td className="px-3 py-2.5 font-medium text-ink">{item.product}</td>
                  <td className="px-3 py-2.5 text-ink-muted">{item.sku}</td>
                  <td className="px-3 py-2.5 text-right text-ink-muted">{item.qty}</td>
                  <td className="px-3 py-2.5">
                    <Input
                      type="number"
                      min={1}
                      max={item.qty}
                      value={line.returnQty}
                      disabled={!line.selected}
                      onChange={(event) => onQtyChange(index, Number(event.target.value))}
                      wrapperClassName={cn('w-20', !line.selected && 'opacity-60')}
                    />
                  </td>
                  <td className="px-3 py-2.5 text-right text-ink">{formatCurrency(item.price)}</td>
                  <td className="px-3 py-2.5 text-right font-medium text-ink">{formatCurrency(subtotal)}</td>
                  <td className="px-3 py-2.5">
                    <Select
                      value={line.reason}
                      disabled={!line.selected}
                      onChange={(event) => onReasonChange(index, event.target.value)}
                      wrapperClassName={cn('w-44', !line.selected && 'opacity-60')}
                      aria-label={`Return reason for ${item.product}`}
                    >
                      <option value="">Select Reason</option>
                      {returnReasons.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </Select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">Condition</span>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="radio"
              name="condition"
              checked={condition === 'restock'}
              onChange={() => onConditionChange('restock')}
              className="h-4 w-4 text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            Restock (item returned can be added to inventory)
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="radio"
              name="condition"
              checked={condition === 'damaged'}
              onChange={() => onConditionChange('damaged')}
              className="h-4 w-4 text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            Damaged / Do Not Restock
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-ink">Refund Method</span>
          <Select
            value={refundMethod}
            onChange={(event) => onRefundMethodChange(event.target.value as PaymentMethod)}
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </Select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-ink">Refund Amount</span>
          <Input value={formatCurrency(refundAmount)} disabled wrapperClassName="bg-canvas" readOnly />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-ink">Notes (Optional)</span>
        <Textarea value={notes} onChange={(event) => onNotesChange(event.target.value)} placeholder="Add notes here..." />
      </label>
    </StepCard>
  )
}
