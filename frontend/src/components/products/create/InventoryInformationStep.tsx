import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { IconInfo } from '../../ui/icons'
import { productUnits } from '../../../data/productsData'
import { branches } from '../../../data/transactionsData'

export interface InventoryInformationState {
  initialStock: number
  unit: string
  reorderLevel: number
  location: string
}

interface InventoryInformationStepProps {
  value: InventoryInformationState
  onChange: <K extends keyof InventoryInformationState>(field: K, value: InventoryInformationState[K]) => void
}

export function InventoryInformationStep({ value, onChange }: InventoryInformationStepProps) {
  return (
    <StepCard step={3} title="Inventory Information">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Initial Stock">
          <Input
            type="number"
            min={0}
            value={value.initialStock}
            onChange={(event) => onChange('initialStock', Number(event.target.value))}
          />
        </FormFieldRow>

        <FormFieldRow label="Unit" required>
          <Select value={value.unit} onChange={(event) => onChange('unit', event.target.value)}>
            <option value="">Select unit (pcs, box, kg, etc)</option>
            {productUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Select>
        </FormFieldRow>

        <FormFieldRow
          label="Reorder Level"
          hint={
            <span title="Stock at or below this level shows up on the Low Stock page" className="flex shrink-0 items-center text-ink-muted">
              <IconInfo size={16} />
            </span>
          }
        >
          <Input
            type="number"
            min={0}
            value={value.reorderLevel}
            onChange={(event) => onChange('reorderLevel', Number(event.target.value))}
          />
        </FormFieldRow>

        <FormFieldRow label="Location">
          <Select value={value.location} onChange={(event) => onChange('location', event.target.value)}>
            <option value="">Select location (optional)</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </Select>
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
