import { SectionHeader } from '../ui/SectionHeader'
import { Switch } from '../ui/Switch'
import { IconBell } from '../ui/icons'

export interface NotificationPreferencesValue {
  transactionNotifications: boolean
  stockAlerts: boolean
  systemAnnouncements: boolean
}

interface NotificationsSectionProps {
  value: NotificationPreferencesValue
  onChange: (value: NotificationPreferencesValue) => void
}

const ROWS: { key: keyof NotificationPreferencesValue; label: string; description: string }[] = [
  { key: 'transactionNotifications', label: 'Transaction Notifications', description: 'Receive notifications for new transactions.' },
  { key: 'stockAlerts', label: 'Stock Alerts', description: 'Get notified when stock is low.' },
  { key: 'systemAnnouncements', label: 'System Announcements', description: 'Receive important updates from the system.' },
]

export function NotificationsSection({ value, onChange }: NotificationsSectionProps) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <SectionHeader icon={<IconBell size={18} />} title="Notifications" subtitle="Manage your notification preferences." />

      <div className="mt-3 flex flex-col divide-y divide-line">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-4 py-3.5">
            <div>
              <p className="text-sm font-medium text-ink">{row.label}</p>
              <p className="text-xs text-ink-muted">{row.description}</p>
            </div>
            <Switch
              checked={value[row.key]}
              onChange={(checked) => onChange({ ...value, [row.key]: checked })}
              ariaLabel={row.label}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
