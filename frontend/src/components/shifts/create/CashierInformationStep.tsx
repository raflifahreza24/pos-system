import { Select } from '../../ui/Select'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { cashiers, branches } from '../../../data/transactionsData'

export interface CashierInformationState {
  cashierId: string
  branch: string
}

interface CashierInformationStepProps {
  value: CashierInformationState
  onChange: <K extends keyof CashierInformationState>(field: K, value: CashierInformationState[K]) => void
}

// Cashier names come from `cashiers` in transactionsData.ts (not re-typed),
// each given a simple "C001" style code purely for display in this form.
export const cashierOptions = cashiers.map((name, index) => ({
  id: `C${String(index + 1).padStart(3, '0')}`,
  name,
}))

export function CashierInformationStep({ value, onChange }: CashierInformationStepProps) {
  return (
    <StepCard step={1} title="Cashier Information" subtitle="Select the cashier who will open the shift.">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Cashier" required>
          <Select value={value.cashierId} onChange={(event) => onChange('cashierId', event.target.value)}>
            <option value="">Select cashier</option>
            {cashierOptions.map((cashier) => (
              <option key={cashier.id} value={cashier.id}>
                {cashier.name} ({cashier.id})
              </option>
            ))}
          </Select>
        </FormFieldRow>

        <FormFieldRow label="Branch" required>
          <Select value={value.branch} onChange={(event) => onChange('branch', event.target.value)}>
            <option value="">Select branch</option>
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
