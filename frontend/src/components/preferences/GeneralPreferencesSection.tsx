import { SectionHeader } from '../ui/SectionHeader'
import { FormField } from '../ui/FormField'
import { Select } from '../ui/Select'
import { IconSettings } from '../ui/icons'

export interface GeneralPreferencesValue {
  language: string
  timezone: string
  dateFormat: string
  timeFormat: '12h' | '24h'
}

interface GeneralPreferencesSectionProps {
  value: GeneralPreferencesValue
  onChange: (value: GeneralPreferencesValue) => void
}

export function GeneralPreferencesSection({ value, onChange }: GeneralPreferencesSectionProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <SectionHeader
        icon={<IconSettings size={18} />}
        title="General Preferences"
        subtitle="Set your basic preferences for a better experience."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Language">
          <Select value={value.language} onChange={(event) => onChange({ ...value, language: event.target.value })}>
            <option value="id">Indonesian (Bahasa Indonesia)</option>
            <option value="en">English</option>
          </Select>
        </FormField>

        <FormField label="Timezone">
          <Select value={value.timezone} onChange={(event) => onChange({ ...value, timezone: event.target.value })}>
            <option value="wib">(GMT+07:00) Jakarta, Indonesia</option>
            <option value="wita">(GMT+08:00) Makassar, Indonesia</option>
            <option value="wit">(GMT+09:00) Jayapura, Indonesia</option>
          </Select>
        </FormField>

        <FormField label="Date Format">
          <Select value={value.dateFormat} onChange={(event) => onChange({ ...value, dateFormat: event.target.value })}>
            <option value="dd/mm/yyyy">DD/MM/YYYY (31/12/2026)</option>
            <option value="mm/dd/yyyy">MM/DD/YYYY (12/31/2026)</option>
            <option value="yyyy-mm-dd">YYYY-MM-DD (2026-12-31)</option>
          </Select>
        </FormField>

        <FormField label="Time Format">
          <div className="flex items-center gap-5 py-2.5 text-sm text-ink">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="time-format"
                checked={value.timeFormat === '12h'}
                onChange={() => onChange({ ...value, timeFormat: '12h' })}
                className="h-4 w-4 rounded-full border-line text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              12-hour (01:00 PM)
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="time-format"
                checked={value.timeFormat === '24h'}
                onChange={() => onChange({ ...value, timeFormat: '24h' })}
                className="h-4 w-4 rounded-full border-line text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              24-hour (13:00)
            </label>
          </div>
        </FormField>
      </div>
    </div>
  )
}
