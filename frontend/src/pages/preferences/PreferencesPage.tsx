import { useRef, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { IconBell, IconGlobe, IconMonitor, IconSave, IconSettings } from '../../components/ui/icons'
import { PreferencesNavList, type PreferencesNavItem } from '../../components/preferences/PreferencesNavList'
import { GeneralPreferencesSection, type GeneralPreferencesValue } from '../../components/preferences/GeneralPreferencesSection'
import { AppearanceSection } from '../../components/preferences/AppearanceSection'
import { NotificationsSection, type NotificationPreferencesValue } from '../../components/preferences/NotificationsSection'
import { useToast } from '../../hooks/useToast'

const NAV_ITEMS: PreferencesNavItem[] = [
  { id: 'general', label: 'General', subtitle: 'Basic preferences', icon: IconSettings },
  { id: 'notifications', label: 'Notifications', subtitle: 'Manage notifications', icon: IconBell },
  { id: 'appearance', label: 'Appearance', subtitle: 'Theme and display', icon: IconMonitor },
  { id: 'language', label: 'Language & Region', subtitle: 'Language, timezone, date format', icon: IconGlobe },
]

// "Language & Region" scrolls to the same card as "General" — its fields
// (language/timezone/date format) already live there, so it doesn't need
// a separate card the reference design doesn't show either.
const SECTION_TARGET: Record<string, string> = {
  general: 'general',
  notifications: 'notifications',
  appearance: 'appearance',
  language: 'general',
}

/**
 * Dedicated Preferences screen reached from the topbar's "Preferences"
 * menu item (see UserDropdown.tsx) — distinct from the existing Settings
 * page (business-level config) and from the compact Preferences card on
 * the Profile screen (a quick editor for the same handful of fields).
 * Renders inside MainLayout like every other page.
 */
export function PreferencesPage() {
  const { showSuccess } = useToast()
  const [activeNav, setActiveNav] = useState(NAV_ITEMS[0].id)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const [general, setGeneral] = useState<GeneralPreferencesValue>({
    language: 'id',
    timezone: 'wib',
    dateFormat: 'dd/mm/yyyy',
    timeFormat: '24h',
  })

  const [notifications, setNotifications] = useState<NotificationPreferencesValue>({
    transactionNotifications: true,
    stockAlerts: true,
    systemAnnouncements: false,
  })

  function handleSelectNav(id: string) {
    setActiveNav(id)
    const target = SECTION_TARGET[id]
    sectionRefs.current[target]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Dummy handler for now — no settings API exists yet (same TODO as
  // SettingsPage's own handleSave).
  function handleSave() {
    showSuccess('Preferences saved', 'Your preferences have been updated.')
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <p className="text-xs text-ink-muted">Home &gt; Preferences</p>
      <PageHeader title="Preferences" subtitle="Customize your experience and manage your personal settings." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <PreferencesNavList items={NAV_ITEMS} activeId={activeNav} onSelect={handleSelectNav} />

        <div className="flex flex-col gap-5">
          <div ref={(el) => { sectionRefs.current.general = el }}>
            <GeneralPreferencesSection value={general} onChange={setGeneral} />
          </div>
          <div ref={(el) => { sectionRefs.current.appearance = el }}>
            <AppearanceSection />
          </div>
          <div ref={(el) => { sectionRefs.current.notifications = el }}>
            <NotificationsSection value={notifications} onChange={setNotifications} />
          </div>

          <div className="flex justify-end">
            <Button icon={<IconSave size={16} />} onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
