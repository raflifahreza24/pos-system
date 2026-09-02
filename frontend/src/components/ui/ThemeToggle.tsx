import { useTheme } from '../../hooks/useTheme'
import { IconMoon, IconSun } from './icons'
import { cn } from '../../utils/formatters'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to default theme' : 'Switch to light theme'}
      aria-pressed={isLight}
      title={isLight ? 'Light mode' : 'Default mode'}
      className="relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border border-line bg-canvas px-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <span
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-full bg-surface text-primary shadow-sm transition-transform duration-300 ease-out',
          isLight ? 'translate-x-[28px]' : 'translate-x-0',
        )}
      >
        {isLight ? <IconSun size={16} /> : <IconMoon size={16} />}
      </span>
    </button>
  )
}
