import { StepCard } from '../../ui/StepCard'
import { FormField } from '../../ui/FormField'
import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { activeInactiveStatuses, type Status } from '../../ui/StatusBadge'
import { formatCurrency } from '../../../utils/formatters'
import { branches } from '../../../data/branchesData'
import type { DiscountValueKind } from '../../../data/priceDiscountsData'

const NOTES_MAX_LENGTH = 255
const rupiahIcon = <span className="text-sm font-medium text-ink-muted">Rp</span>
const percentIcon = <span className="text-sm font-medium text-ink-muted">%</span>

export interface EditDiscountInformationState {
  discountName: string
  discountType: DiscountValueKind
  discountValue: number
  startDate: string
  endDate: string
  applicableScope: string
  status: Status
  notes: string
}

interface DiscountInformationStepProps {
  value: EditDiscountInformationState
  onChange: <K extends keyof EditDiscountInformationState>(field: K, value: EditDiscountInformationState[K]) => void
  normalPrice: number
  finalPrice: number
}

export function DiscountInformationStep({ value, onChange, normalPrice, finalPrice }: DiscountInformationStepProps) {
  return (
    <StepCard step={2} title="Discount Information" subtitle="Update the discount details.">
      <div className="flex flex-col gap-4">
        <FormField label="Discount Name" required>
          <Input
            placeholder="Enter discount name"
            value={value.discountName}
            onChange={(event) => onChange('discountName', event.target.value)}
          />
        </FormField>

        <FormField label="Discount Type" required>
          <Select
            value={value.discountType}
            onChange={(event) => onChange('discountType', event.target.value as DiscountValueKind)}
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </Select>
        </FormField>

        <FormField label="Discount Value" required>
          <Input
            type="number"
            min={0}
            icon={value.discountType === 'percentage' ? undefined : rupiahIcon}
            trailingIcon={value.discountType === 'percentage' ? percentIcon : undefined}
            value={value.discountValue || ''}
            onChange={(event) => onChange('discountValue', Number(event.target.value))}
          />
        </FormField>

        <FormField label="Normal Price" helperText="Harga normal akan diambil dari harga produk saat ini.">
          <Input value={formatCurrency(normalPrice)} disabled wrapperClassName="bg-canvas" />
        </FormField>

        <FormField label="Final Price (Preview)">
          <Input value={formatCurrency(finalPrice)} disabled wrapperClassName="bg-canvas" />
        </FormField>

        <FormField label="Start Date" required>
          <Input type="date" value={value.startDate} onChange={(event) => onChange('startDate', event.target.value)} />
        </FormField>

        <FormField label="End Date" required>
          <Input type="date" value={value.endDate} onChange={(event) => onChange('endDate', event.target.value)} />
        </FormField>

        <FormField
          label="Applicable Scope"
          required
          helperText="Pilih cabang yang berlaku untuk diskon ini."
        >
          <Select value={value.applicableScope} onChange={(event) => onChange('applicableScope', event.target.value)}>
            <option value="All Branches">All Branches</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Status" required>
          <Select value={value.status} onChange={(event) => onChange('status', event.target.value as Status)}>
            {activeInactiveStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Notes">
          <Textarea
            placeholder="Enter notes (optional)"
            maxLength={NOTES_MAX_LENGTH}
            value={value.notes}
            onChange={(event) => onChange('notes', event.target.value)}
          />
          <span className="self-end text-xs text-ink-muted">
            {value.notes.length}/{NOTES_MAX_LENGTH}
          </span>
        </FormField>
      </div>
    </StepCard>
  )
}
