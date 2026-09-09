import { cn } from '../../utils/formatters'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  ariaLabel: string
}

/**
 * Compact pill toggle for a single on/off preference (Notifications rows,
 * ...) — visually distinct from ThemeToggle (which carries a sun/moon icon
 * and is specifically wired to ThemeContext) and from the plain checkbox
 * SettingsCheckboxRow uses elsewhere. Fully controlled, no internal state.
 */
export function Switch({ checked, onChange, ariaLabel }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={cn(
        'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        checked ? 'bg-primary' : 'bg-line',
      )}
    >
      <span
        className={cn(
          'h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  )
}
