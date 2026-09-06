import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { IconInfo } from '../../ui/icons'
import { taxOptions } from '../../../data/productsData'

export interface PricingInformationState {
  purchasePrice: number
  sellingPrice: number
  costPrice: number
  tax: string
  discountable: 'Yes' | 'No'
  minimumPrice: number
}

interface PricingInformationStepProps {
  value: PricingInformationState
  onChange: <K extends keyof PricingInformationState>(field: K, value: PricingInformationState[K]) => void
}

const rupiahIcon = <span className="text-sm font-medium text-ink-muted">Rp</span>

function InfoHint({ title }: { title: string }) {
  return (
    <span title={title} className="flex shrink-0 items-center text-ink-muted">
      <IconInfo size={16} />
    </span>
  )
}

export function PricingInformationStep({ value, onChange }: PricingInformationStepProps) {
  return (
    <StepCard step={2} title="Pricing Information">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Purchase Price" required>
          <Input
            type="number"
            min={0}
            icon={rupiahIcon}
            value={value.purchasePrice}
            onChange={(event) => onChange('purchasePrice', Number(event.target.value))}
          />
        </FormFieldRow>

        <FormFieldRow label="Selling Price" required>
          <Input
            type="number"
            min={0}
            icon={rupiahIcon}
            value={value.sellingPrice}
            onChange={(event) => onChange('sellingPrice', Number(event.target.value))}
          />
        </FormFieldRow>

        <FormFieldRow label="Cost Price (HPP)" hint={<InfoHint title="Auto-calculated from purchase history" />}>
          <Input type="number" icon={rupiahIcon} value={value.costPrice} disabled wrapperClassName="bg-canvas" />
        </FormFieldRow>

        <FormFieldRow label="Tax">
          <Select value={value.tax} onChange={(event) => onChange('tax', event.target.value)}>
            <option value="">Select tax (e.g. PPN 11%)</option>
            {taxOptions.map((tax) => (
              <option key={tax} value={tax}>
                {tax}
              </option>
            ))}
          </Select>
        </FormFieldRow>

        <FormFieldRow label="Discountable">
          <Select
            value={value.discountable}
            onChange={(event) => onChange('discountable', event.target.value as 'Yes' | 'No')}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
        </FormFieldRow>

        <FormFieldRow
          label="Minimum Price"
          hint={<InfoHint title="The lowest price this product can be sold for" />}
        >
          <Input
            type="number"
            min={0}
            icon={rupiahIcon}
            value={value.minimumPrice}
            onChange={(event) => onChange('minimumPrice', Number(event.target.value))}
          />
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
