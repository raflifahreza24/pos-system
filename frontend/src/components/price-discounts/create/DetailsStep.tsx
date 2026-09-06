import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { activeInactiveStatuses, type Status } from '../../ui/StatusBadge'
import type { PriceDiscountType, DiscountValueKind } from '../../../data/priceDiscountsData'

const rupiahIcon = <span className="text-sm font-medium text-ink-muted">Rp</span>
const percentIcon = <span className="text-sm font-medium text-ink-muted">%</span>

export interface DetailsState {
  sellingPrice: number
  discountValueKind: DiscountValueKind
  discountValue: number
  startDate: string
  endDate: string
  notes: string
  status: Status
}

interface DetailsStepProps {
  type: PriceDiscountType
  value: DetailsState
  onChange: <K extends keyof DetailsState>(field: K, value: DetailsState[K]) => void
}

export function DetailsStep({ type, value, onChange }: DetailsStepProps) {
  return (
    <StepCard step={3} title="Price / Discount Details">
      <div className="grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {type === 'Price' ? (
            <FormFieldRow label="Selling Price" required>
              <Input
                type="number"
                min={0}
                icon={rupiahIcon}
                placeholder="Enter selling price"
                value={value.sellingPrice || ''}
                onChange={(event) => onChange('sellingPrice', Number(event.target.value))}
              />
            </FormFieldRow>
          ) : (
            <>
              <FormFieldRow label="Discount Type">
                <Select
                  value={value.discountValueKind}
                  onChange={(event) => onChange('discountValueKind', event.target.value as DiscountValueKind)}
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </Select>
              </FormFieldRow>

              <FormFieldRow label="Discount Value" required>
                <Input
                  type="number"
                  min={0}
                  icon={value.discountValueKind === 'percentage' ? percentIcon : rupiahIcon}
                  placeholder="Enter discount value"
                  value={value.discountValue || ''}
                  onChange={(event) => onChange('discountValue', Number(event.target.value))}
                />
              </FormFieldRow>
            </>
          )}

          <FormFieldRow label="Start Date">
            <Input type="date" value={value.startDate} onChange={(event) => onChange('startDate', event.target.value)} />
          </FormFieldRow>

          <FormFieldRow label="End Date">
            <Input type="date" value={value.endDate} onChange={(event) => onChange('endDate', event.target.value)} />
          </FormFieldRow>
        </div>

        <div className="flex flex-col gap-4">
          <FormFieldRow label="Notes">
            <Textarea
              placeholder="Enter notes (optional)"
              value={value.notes}
              onChange={(event) => onChange('notes', event.target.value)}
            />
          </FormFieldRow>

          <FormFieldRow label="Status">
            <Select value={value.status} onChange={(event) => onChange('status', event.target.value as Status)}>
              {activeInactiveStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </FormFieldRow>
        </div>
      </div>
    </StepCard>
  )
}
