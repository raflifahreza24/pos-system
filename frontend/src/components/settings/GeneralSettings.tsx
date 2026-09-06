import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { FormField } from '../ui/FormField'
import { SettingsSection } from './SettingsSection'

export interface GeneralSettingsValue {
  businessName: string
  currency: string
  dateFormat: string
  timeFormat: string
}

interface GeneralSettingsProps {
  value: GeneralSettingsValue
  onChange: (value: GeneralSettingsValue) => void
  onSave: () => void
}

export function GeneralSettings({ value, onChange, onSave }: GeneralSettingsProps) {
  return (
    <SettingsSection onSave={onSave}>
      <FormField label="Business Name">
        <Input
          value={value.businessName}
          onChange={(event) => onChange({ ...value, businessName: event.target.value })}
        />
      </FormField>

      <FormField label="Currency">
        <Select value={value.currency} onChange={(event) => onChange({ ...value, currency: event.target.value })}>
          <option value="IDR">IDR - Indonesian Rupiah</option>
          <option value="USD">USD - US Dollar</option>
          <option value="SGD">SGD - Singapore Dollar</option>
        </Select>
      </FormField>

      <FormField label="Date Format">
        <Select
          value={value.dateFormat}
          onChange={(event) => onChange({ ...value, dateFormat: event.target.value })}
        >
          <option value="dd/mm/yyyy">dd/mm/yyyy</option>
          <option value="mm/dd/yyyy">mm/dd/yyyy</option>
          <option value="yyyy-mm-dd">yyyy-mm-dd</option>
        </Select>
      </FormField>

      <FormField label="Time Format">
        <Select
          value={value.timeFormat}
          onChange={(event) => onChange({ ...value, timeFormat: event.target.value })}
        >
          <option value="24h">24 Hours</option>
          <option value="12h">12 Hours</option>
        </Select>
      </FormField>
    </SettingsSection>
  )
}
