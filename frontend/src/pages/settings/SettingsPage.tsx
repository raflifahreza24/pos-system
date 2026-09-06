import { useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { PanelList } from '../components/ui/PanelList'
import { GeneralSettings, type GeneralSettingsValue } from '../components/settings/GeneralSettings'
import { TaxSettings, type TaxSettingsValue } from '../components/settings/TaxSettings'
import { PaymentMethodsSettings } from '../components/settings/PaymentMethodsSettings'
import { DocumentNumberSettings, type DocumentPrefixes } from '../components/settings/DocumentNumberSettings'
import { NotificationSettings, type NotificationPreferences } from '../components/settings/NotificationSettings'
import { OtherSettings, type OtherSettingsValue } from '../components/settings/OtherSettings'
import { paymentMethods, type PaymentMethod } from '../data/transactionsData'

const SECTIONS = [
  { id: 'general', label: 'General' },
  { id: 'tax', label: 'Tax' },
  { id: 'paymentMethods', label: 'Payment Methods' },
  { id: 'documentNumber', label: 'Document Number' },
  { id: 'notification', label: 'Notification' },
  { id: 'other', label: 'Other' },
]

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id)

  const [general, setGeneral] = useState<GeneralSettingsValue>({
    businessName: 'My Store',
    currency: 'IDR',
    dateFormat: 'dd/mm/yyyy',
    timeFormat: '24h',
  })

  const [tax, setTax] = useState<TaxSettingsValue>({
    taxName: 'PPN',
    taxRate: '11',
    pricesIncludeTax: false,
  })

  const [enabledPaymentMethods, setEnabledPaymentMethods] = useState<Set<PaymentMethod>>(
    () => new Set(paymentMethods),
  )

  const [documentPrefixes, setDocumentPrefixes] = useState<DocumentPrefixes>({
    invoice: 'INV-',
    purchaseOrder: 'PO-',
    goodsReceiving: 'GR-',
    stockTransfer: 'TRF-',
    stockOpname: 'OPN-',
  })

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    lowStock: true,
    newOrder: true,
    dailyReport: false,
    paymentReceived: true,
  })

  const [other, setOther] = useState<OtherSettingsValue>({
    receiptFooter: 'Thank you for shopping with us!',
    barcodeScannerEnabled: true,
  })

  // TODO: wire up once a settings API exists — every section's fields are
  // already live in local state, only persistence is missing.
  function handleSave() {}

  function togglePaymentMethod(method: PaymentMethod) {
    setEnabledPaymentMethods((current) => {
      const next = new Set(current)
      if (next.has(method)) {
        next.delete(method)
      } else {
        next.add(method)
      }
      return next
    })
  }

  function toggleNotification(key: keyof NotificationPreferences) {
    setNotifications((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Settings" subtitle="Configure how this POS behaves for your business." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <PanelList title="Settings" items={SECTIONS} activeId={activeSection} onSelect={setActiveSection} />

        {activeSection === 'general' ? (
          <GeneralSettings value={general} onChange={setGeneral} onSave={handleSave} />
        ) : null}
        {activeSection === 'tax' ? <TaxSettings value={tax} onChange={setTax} onSave={handleSave} /> : null}
        {activeSection === 'paymentMethods' ? (
          <PaymentMethodsSettings
            methods={paymentMethods}
            enabled={enabledPaymentMethods}
            onToggle={togglePaymentMethod}
            onSave={handleSave}
          />
        ) : null}
        {activeSection === 'documentNumber' ? (
          <DocumentNumberSettings value={documentPrefixes} onChange={setDocumentPrefixes} onSave={handleSave} />
        ) : null}
        {activeSection === 'notification' ? (
          <NotificationSettings value={notifications} onToggle={toggleNotification} onSave={handleSave} />
        ) : null}
        {activeSection === 'other' ? <OtherSettings value={other} onChange={setOther} onSave={handleSave} /> : null}
      </div>
    </div>
  )
}
