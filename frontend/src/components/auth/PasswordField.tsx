import { FormField } from '../ui/FormField'
import { Input } from '../ui/Input'
import { IconEye, IconEyeOff, IconLock } from '../ui/icons'

interface PasswordFieldProps {
  label: string
  name: string
  autoComplete: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  visible: boolean
  onToggleVisible: () => void
}

/**
 * Reusable password input with a show/hide toggle — same markup as the
 * password field already inside LoginForm.tsx, just extracted so
 * ResetPasswordPage (which needs two of these) doesn't duplicate it.
 * LoginForm.tsx itself is left untouched to avoid any risk to the
 * already-approved Login look.
 */
export function PasswordField({
  label,
  name,
  autoComplete,
  placeholder,
  value,
  onChange,
  visible,
  onToggleVisible,
}: PasswordFieldProps) {
  return (
    <FormField label={label}>
      <Input
        type={visible ? 'text' : 'password'}
        name={name}
        autoComplete={autoComplete}
        required
        placeholder={placeholder}
        icon={<IconLock size={18} className="shrink-0 text-ink-muted" />}
        trailingIcon={
          <button
            type="button"
            onClick={onToggleVisible}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="flex shrink-0 cursor-pointer items-center justify-center text-ink-muted transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            {visible ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </button>
        }
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormField>
  )
}
