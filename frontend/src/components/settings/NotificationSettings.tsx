import { SettingsCheckboxRow } from './SettingsCheckboxRow'
import { SettingsSection } from './SettingsSection'

export const notificationTypes = [
  { key: 'lowStock', label: 'Low stock alert', description: 'Notify when a product falls at or below its minimum stock.' },
  { key: 'newOrder', label: 'New order notification', description: 'Notify staff when a new transaction is created.' },
  { key: 'dailyReport', label: 'Daily sales report email', description: 'Send a summary email at the end of each day.' },
  { key: 'paymentReceived', label: 'Payment received alert', description: 'Notify when a payment is confirmed.' },
] as const

export type NotificationPreferences = Record<(typeof notificationTypes)[number]['key'], boolean>

interface NotificationSettingsProps {
  value: NotificationPreferences
  onToggle: (key: (typeof notificationTypes)[number]['key']) => void
  onSave: () => void
}

export function NotificationSettings({ value, onToggle, onSave }: NotificationSettingsProps) {
  return (
    <SettingsSection onSave={onSave}>
      {notificationTypes.map((item) => (
        <SettingsCheckboxRow
          key={item.key}
          label={item.label}
          description={item.description}
          checked={value[item.key]}
          onChange={() => onToggle(item.key)}
        />
      ))}
    </SettingsSection>
  )
}
