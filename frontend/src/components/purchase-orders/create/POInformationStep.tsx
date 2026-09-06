import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { suppliers } from '../../../data/suppliersData'

export interface POInformationState {
  supplierId: string
  orderDate: string
  expectedDeliveryDate: string
  referenceNo: string
  notes: string
}

interface POInformationStepProps {
  poNo: string
  value: POInformationState
  onChange: <K extends keyof POInformationState>(field: K, value: POInformationState[K]) => void
}

export function POInformationStep({ poNo, value, onChange }: POInformationStepProps) {
  return (
    <StepCard step={1} title="PO Information" subtitle="Fill in the purchase order details.">
      <div className="flex flex-col gap-4">
        <FormFieldRow
          label="PO No"
          hint={<span className="shrink-0 whitespace-nowrap text-xs text-ink-muted">(Auto generated)</span>}
        >
          <Input value={poNo} disabled wrapperClassName="bg-canvas" />
        </FormFieldRow>

        <FormFieldRow label="Supplier" required>
          <Select value={value.supplierId} onChange={(event) => onChange('supplierId', event.target.value)}>
            <option value="">Search supplier...</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </Select>
        </FormFieldRow>

        <FormFieldRow label="Order Date" required>
          <Input
            type="date"
            value={value.orderDate}
            onChange={(event) => onChange('orderDate', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Expected Delivery Date">
          <Input
            type="date"
            value={value.expectedDeliveryDate}
            onChange={(event) => onChange('expectedDeliveryDate', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Reference No">
          <Input
            placeholder="Enter reference number (optional)"
            value={value.referenceNo}
            onChange={(event) => onChange('referenceNo', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Notes" align="start">
          <Textarea
            placeholder="Enter notes (optional)"
            value={value.notes}
            onChange={(event) => onChange('notes', event.target.value)}
          />
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
