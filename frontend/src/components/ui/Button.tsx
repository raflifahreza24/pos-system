import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/formatters'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: ReactNode
  fullWidthOnMobile?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-white shadow-sm hover:bg-primary-hover focus-visible:ring-primary/40',
  secondary:
    'bg-surface text-ink border border-line hover:bg-canvas focus-visible:ring-primary/30',
  ghost: 'text-ink-muted hover:bg-canvas hover:text-ink focus-visible:ring-primary/30',
}

export function Button({
  variant = 'primary',
  icon,
  fullWidthOnMobile,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        fullWidthOnMobile && 'w-full sm:w-auto',
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
