import { useState } from 'react'
import { Input } from '../../ui/Input'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { IconEye, IconEyeOff } from '../../ui/icons'

export interface BasicInformationState {
  fullName: string
  email: string
  phone: string
  username: string
  password: string
  confirmPassword: string
}

interface BasicInformationStepProps {
  value: BasicInformationState
  onChange: <K extends keyof BasicInformationState>(field: K, value: BasicInformationState[K]) => void
}

// Shared by the Password and Confirm Password fields below — same
// show/hide-on-click behaviour, just toggled independently per field.
function PasswordField({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      type={visible ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      trailingIcon={
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="flex cursor-pointer items-center text-ink-muted transition-colors duration-150 hover:text-ink"
        >
          {visible ? <IconEyeOff size={17} /> : <IconEye size={17} />}
        </button>
      }
    />
  )
}

export function BasicInformationStep({ value, onChange }: BasicInformationStepProps) {
  return (
    <StepCard step={1} title="Basic Information" subtitle="Fill in the user basic information.">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Full Name" required>
          <Input placeholder="Enter full name" value={value.fullName} onChange={(event) => onChange('fullName', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Email" required>
          <Input type="email" placeholder="Enter email address" value={value.email} onChange={(event) => onChange('email', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Phone">
          <Input placeholder="Enter phone number (optional)" value={value.phone} onChange={(event) => onChange('phone', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Username" required>
          <Input placeholder="Enter username" value={value.username} onChange={(event) => onChange('username', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Password" required>
          <PasswordField placeholder="Enter password" value={value.password} onChange={(next) => onChange('password', next)} />
        </FormFieldRow>

        <FormFieldRow label="Confirm Password" required>
          <PasswordField
            placeholder="Confirm password"
            value={value.confirmPassword}
            onChange={(next) => onChange('confirmPassword', next)}
          />
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
