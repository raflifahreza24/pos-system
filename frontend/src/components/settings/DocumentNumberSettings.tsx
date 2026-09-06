import { Input } from '../ui/Input'
import { FormField } from '../ui/FormField'
import { SettingsSection } from './SettingsSection'

export const documentTypes = [
  { key: 'invoice', label: 'Invoice (Transactions)' },
  { key: 'purchaseOrder', label: 'Purchase Order' },
  { key: 'goodsReceiving', label: 'Goods Receiving' },
  { key: 'stockTransfer', label: 'Stock Transfer' },
  { key: 'stockOpname', label: 'Stock Opname' },
] as const

export type DocumentPrefixes = Record<(typeof documentTypes)[number]['key'], string>

interface DocumentNumberSettingsProps {
  value: DocumentPrefixes
  onChange: (value: DocumentPrefixes) => void
  onSave: () => void
}

export function DocumentNumberSettings({ value, onChange, onSave }: DocumentNumberSettingsProps) {
  return (
    <SettingsSection onSave={onSave}>
      {documentTypes.map((doc) => (
        <FormField key={doc.key} label={doc.label}>
          <Input value={value[doc.key]} onChange={(event) => onChange({ ...value, [doc.key]: event.target.value })} />
        </FormField>
      ))}
    </SettingsSection>
  )
}
