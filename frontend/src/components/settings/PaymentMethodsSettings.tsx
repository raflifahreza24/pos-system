import type { PaymentMethod } from '../../data/transactionsData'
import { SettingsCheckboxRow } from './SettingsCheckboxRow'
import { SettingsSection } from './SettingsSection'

interface PaymentMethodsSettingsProps {
  methods: PaymentMethod[]
  enabled: Set<PaymentMethod>
  onToggle: (method: PaymentMethod) => void
  onSave: () => void
}

// The method list itself comes from `transactionsData.ts` (not re-typed),
// so this list can never drift from the payment methods transactions
// actually record.
export function PaymentMethodsSettings({ methods, enabled, onToggle, onSave }: PaymentMethodsSettingsProps) {
  return (
    <SettingsSection onSave={onSave}>
      {methods.map((method) => (
        <SettingsCheckboxRow
          key={method}
          label={method}
          checked={enabled.has(method)}
          onChange={() => onToggle(method)}
        />
      ))}
    </SettingsSection>
  )
}
