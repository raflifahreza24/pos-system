import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/formatters'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  icon?: ReactNode
  trailingIcon?: ReactNode
  fullWidthOnMobile?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-white shadow-sm hover:bg-primary-hover hover:shadow-md focus-visible:ring-primary/40',
  secondary:
    'bg-surface text-ink border border-line hover:border-primary/40 hover:bg-canvas focus-visible:ring-primary/30',
  ghost: 'text-ink-muted hover:bg-canvas hover:text-ink focus-visible:ring-primary/30',
  // For a destructive confirmation (e.g. the delete confirm dialog).
  danger: 'bg-danger-strong text-white shadow-sm hover:bg-danger-strong/90 hover:shadow-md focus-visible:ring-danger-strong/40',
}

export function Button({
  variant = 'primary',
  icon,
  trailingIcon,
  fullWidthOnMobile,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        fullWidthOnMobile && 'w-full sm:w-auto',
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      {trailingIcon}
    </button>
  )
}
