import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/formatters'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  wrapperClassName?: string
}

export function Textarea({ wrapperClassName, className, rows = 3, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(
        'w-full resize-none rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15',
        wrapperClassName,
        className,
      )}
      {...props}
    />
  )
}
