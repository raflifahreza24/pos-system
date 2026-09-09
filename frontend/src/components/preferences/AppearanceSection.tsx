import { SectionHeader } from '../ui/SectionHeader'
import { IconMonitor } from '../ui/icons'
import { themeOptions } from '../../data/themeOptions'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils/formatters'

export function AppearanceSection() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <SectionHeader icon={<IconMonitor size={18} />} title="Appearance" subtitle="Customize how the application looks." />

      <div>
        <p className="mb-3 text-sm font-medium text-ink">Theme</p>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map((option) => {
            const isActive = !option.comingSoon && theme === option.value
            return (
              <label
                key={option.value}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors duration-150',
                  option.comingSoon
                    ? 'cursor-not-allowed border-line text-ink-muted/50'
                    : isActive
                      ? 'cursor-pointer border-primary bg-primary-light text-primary'
                      : 'cursor-pointer border-line text-ink hover:border-primary/40',
                )}
              >
                <span className={cn('flex h-9 w-9 items-center justify-center rounded-full', isActive ? 'bg-primary/15' : 'bg-canvas')}>
                  <option.icon size={18} />
                </span>
                <input
                  type="radio"
                  name="appearance-theme"
                  disabled={option.comingSoon}
                  checked={isActive}
                  onChange={() => {
                    if (option.value === 'light' || option.value === 'default') setTheme(option.value)
                  }}
                  className="h-4 w-4 rounded-full border-line text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {option.label}
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}
