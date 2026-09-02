import type { SelectHTMLAttributes } from 'react'
import { IconChevronDown } from './icons'
import { cn } from '../../utils/formatters'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  wrapperClassName?: string
}

export function Select({ wrapperClassName, className, children, ...props }: SelectProps) {
  return (
    <div className={cn('relative', wrapperClassName)}>
      <select
        className={cn(
          'w-full appearance-none rounded-xl border border-line bg-surface py-2.5 pl-3.5 pr-9 text-sm text-ink transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <IconChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
      />
    </div>
  )
}
