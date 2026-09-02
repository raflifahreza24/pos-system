import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/formatters'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  wrapperClassName?: string
}

export function Input({ icon, wrapperClassName, className, ...props }: InputProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 transition-colors duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15',
        wrapperClassName,
      )}
    >
      {icon}
      <input
        className={cn('w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none', className)}
        {...props}
      />
    </div>
  )
}
