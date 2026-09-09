import { SectionHeader } from '../ui/SectionHeader'
import { FormField } from '../ui/FormField'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { IconSave, IconUser } from '../ui/icons'

export interface PersonalInformationValue {
  fullName: string
  phone: string
}

interface PersonalInformationCardProps {
  value: PersonalInformationValue
  onChange: (value: PersonalInformationValue) => void
  email: string
  role: string
  branch: string
  onSave: () => void
}

/**
 * Editable identity fields (name, phone) plus read-only account facts
 * (email, role, branch — assigned by an administrator, not by the user).
 */
export function PersonalInformationCard({ value, onChange, email, role, branch, onSave }: PersonalInformationCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <SectionHeader icon={<IconUser size={18} />} title="Personal Information" subtitle="Update your personal details." />

      <div className="flex flex-col gap-4">
        <FormField label="Full Name">
          <Input value={value.fullName} onChange={(event) => onChange({ ...value, fullName: event.target.value })} />
        </FormField>

        <FormField label="Email Address" helperText="Contact an administrator to change your email.">
          <Input value={email} disabled wrapperClassName="bg-canvas" className="cursor-not-allowed" />
        </FormField>

        <FormField label="Phone Number">
          <Input type="tel" value={value.phone} onChange={(event) => onChange({ ...value, phone: event.target.value })} />
        </FormField>

        <FormField label="Role">
          <Input value={role} disabled wrapperClassName="bg-canvas" className="cursor-not-allowed" />
        </FormField>

        <FormField label="Branch">
          <Input value={branch} disabled wrapperClassName="bg-canvas" className="cursor-not-allowed" />
        </FormField>
      </div>

      <div>
        <Button icon={<IconSave size={16} />} onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
