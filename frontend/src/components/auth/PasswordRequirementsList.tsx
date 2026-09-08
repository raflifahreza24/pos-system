import { IconCheckCircle, IconShieldCheck } from '../ui/icons'

interface Requirement {
  label: string
  test: (password: string) => boolean
}

const REQUIREMENTS: Requirement[] = [
  { label: 'Minimum 8 characters', test: (password) => password.length >= 8 },
  { label: 'At least one uppercase letter (A–Z)', test: (password) => /[A-Z]/.test(password) },
  { label: 'At least one lowercase letter (a–z)', test: (password) => /[a-z]/.test(password) },
  { label: 'At least one number (0–9)', test: (password) => /[0-9]/.test(password) },
  { label: 'At least one special character (e.g. ! @ # $ % ^ & *)', test: (password) => /[^A-Za-z0-9]/.test(password) },
]

/** True once `password` satisfies every rule in REQUIREMENTS. */
export function isPasswordValid(password: string): boolean {
  return REQUIREMENTS.every((requirement) => requirement.test(password))
}

/**
 * Live password-strength checklist for the Reset Password screen. Unlike
 * the flat reference mockup (all items shown as already met), each item
 * here actually reflects whether the currently-typed password satisfies
 * it — still frontend-only, no backend involved.
 */
export function PasswordRequirementsList({ password }: { password: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-primary-light/60 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
        <IconShieldCheck size={18} />
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-sm font-semibold text-ink">Password Requirements</p>
        <ul className="flex flex-col gap-1.5">
          {REQUIREMENTS.map((requirement) => {
            const met = requirement.test(password)
            return (
              <li key={requirement.label} className="flex items-center gap-2 text-sm">
                <IconCheckCircle size={15} className={met ? 'shrink-0 text-success-strong' : 'shrink-0 text-ink-muted/50'} />
                <span className={met ? 'text-ink' : 'text-ink-muted'}>{requirement.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
