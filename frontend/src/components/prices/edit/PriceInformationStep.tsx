import { StepCard } from '../../ui/StepCard'
import { FormField } from '../../ui/FormField'
import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { activeInactiveStatuses, type Status } from '../../ui/StatusBadge'
import { branches } from '../../../data/branchesData'

const NOTES_MAX_LENGTH = 250
const rupiahIcon = <span className="text-sm font-medium text-ink-muted">Rp</span>

export interface EditPriceInformationState {
  price: number
  effectiveScope: string
  startDate: string
  endDate: string
  tax: string
  status: Status
  notes: string
}

interface PriceInformationStepProps {
  value: EditPriceInformationState
  onChange: <K extends keyof EditPriceInformationState>(field: K, value: EditPriceInformationState[K]) => void
}

export function PriceInformationStep({ value, onChange }: PriceInformationStepProps) {
  return (
    <StepCard step={2} title="Price Information" subtitle="Update the product price details.">
      <div className="flex flex-col gap-4">
        <FormField label="Price" required>
          <Input
            type="number"
            min={0}
            icon={rupiahIcon}
            value={value.price || ''}
            onChange={(event) => onChange('price', Number(event.target.value))}
          />
        </FormField>

        <FormField
          label="Effective Scope"
          required
          helperText="Pilih cabang jika harga berbeda di setiap cabang."
        >
          <Select value={value.effectiveScope} onChange={(event) => onChange('effectiveScope', event.target.value)}>
            <option value="All Branches">All Branches</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Start Date">
          <Input type="date" value={value.startDate} onChange={(event) => onChange('startDate', event.target.value)} />
        </FormField>

        <FormField label="End Date">
          <Input type="date" value={value.endDate} onChange={(event) => onChange('endDate', event.target.value)} />
        </FormField>

        <FormField label="Tax" helperText="Harga sudah termasuk pajak.">
          <Select value={value.tax} onChange={(event) => onChange('tax', event.target.value)}>
            <option value="Include Tax">Include Tax</option>
            <option value="Exclude Tax">Exclude Tax</option>
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
