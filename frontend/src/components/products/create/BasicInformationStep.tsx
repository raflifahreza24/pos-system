import type { ReactNode } from 'react'
import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { IconBarcode } from '../../ui/icons'
import { categoryNames } from '../../../data/categoriesData'

export interface BasicInformationState {
  name: string
  sku: string
  barcode: string
  category: string
  brand: string
  description: string
}

interface BasicInformationStepProps {
  value: BasicInformationState
  onChange: <K extends keyof BasicInformationState>(field: K, value: BasicInformationState[K]) => void
  headerAction?: ReactNode
}

export function BasicInformationStep({ value, onChange, headerAction }: BasicInformationStepProps) {
  return (
    <StepCard step={1} title="Basic Information" headerAction={headerAction}>
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Product Name" required>
          <Input placeholder="Enter product name" value={value.name} onChange={(event) => onChange('name', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="SKU" required>
          <Input
            placeholder="Enter SKU / barcode"
            value={value.sku}
            onChange={(event) => onChange('sku', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Barcode">
          <Input
            placeholder="Enter barcode (optional)"
            value={value.barcode}
            onChange={(event) => onChange('barcode', event.target.value)}
            trailingIcon={<IconBarcode size={17} className="text-ink-muted" />}
          />
        </FormFieldRow>

        <FormFieldRow label="Category" required>
          <Select value={value.category} onChange={(event) => onChange('category', event.target.value)}>
            <option value="">Select category</option>
            {categoryNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </FormFieldRow>

        <FormFieldRow label="Brand">
          <Input
            placeholder="Enter brand (optional)"
            value={value.brand}
            onChange={(event) => onChange('brand', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Description">
          <Textarea
            placeholder="Enter product description (optional)"
            value={value.description}
            onChange={(event) => onChange('description', event.target.value)}
          />
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
