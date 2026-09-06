import { Input } from '../ui/Input'
import { FormField } from '../ui/FormField'
import { SettingsCheckboxRow } from './SettingsCheckboxRow'
import { SettingsSection } from './SettingsSection'

export interface TaxSettingsValue {
  taxName: string
  taxRate: string
  pricesIncludeTax: boolean
}

interface TaxSettingsProps {
  value: TaxSettingsValue
  onChange: (value: TaxSettingsValue) => void
  onSave: () => void
}

export function TaxSettings({ value, onChange, onSave }: TaxSettingsProps) {
  return (
    <SettingsSection onSave={onSave}>
      <FormField label="Tax Name">
        <Input value={value.taxName} onChange={(event) => onChange({ ...value, taxName: event.target.value })} />
      </FormField>

      <FormField label="Tax Rate (%)">
        <Input
          type="number"
          min={0}
          max={100}
          value={value.taxRate}
          onChange={(event) => onChange({ ...value, taxRate: event.target.value })}
        />
      </FormField>

      <SettingsCheckboxRow
        label="Prices already include tax"
        description="When on, the tax amount is extracted from the item price instead of added on top."
        checked={value.pricesIncludeTax}
        onChange={(checked) => onChange({ ...value, pricesIncludeTax: checked })}
      />
    </SettingsSection>
  )
}
