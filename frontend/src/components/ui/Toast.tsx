import { useCallback, useEffect, useState } from 'react'
import { IconCheckCircle, IconClose, IconXCircle } from './icons'
import { cn } from '../../utils/formatters'
import type { ToastItem } from '../../context/ToastContext'

interface ToastProps {
  toast: ToastItem
  onDismiss: (id: string) => void
}

const EXIT_MS = 200

/**
 * One success/error notification card. Animates in on mount and, on
 * close (manual or auto-dismiss), animates out before actually being
 * removed from the stack by its parent (`ToastContainer`).
 */
export function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Same reasoning as ConfirmDialog: double rAF so the "hidden" starting
  // state actually paints before flipping to visible, and an inline
  // transition because a global `* { transition-property: ... }` reset
  // in index.css (for the theme toggle) would otherwise silently drop
  // opacity/transform from what's animated.
  useEffect(() => {
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIsVisible(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => onDismiss(toast.id), EXIT_MS)
  }, [toast.id, onDismiss])

  useEffect(() => {
    if (toast.duration <= 0) return
    const timer = setTimeout(handleClose, toast.duration)
    return () => clearTimeout(timer)
  }, [toast.duration, handleClose])

  const isSuccess = toast.variant === 'success'

  return (
    <div
      role="status"
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease-out',
      }}
      className={cn(
        'pointer-events-auto flex w-full items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-lg',
        isVisible ? 'translate-x-0 translate-y-0 opacity-100' : '-translate-y-1 translate-x-4 opacity-0',
      )}
    >
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          isSuccess ? 'bg-success-light text-success-strong' : 'bg-danger-light text-danger-strong',
        )}
      >
        {isSuccess ? <IconCheckCircle size={20} /> : <IconXCircle size={20} />}
      </span>

      <div className="flex-1 pt-0.5">
        <p className="text-sm font-semibold text-ink">{toast.title}</p>
        {toast.description ? <p className="mt-0.5 text-sm text-ink-muted">{toast.description}</p> : null}
      </div>

      <button
        type="button"
        onClick={handleClose}
        aria-label="Dismiss notification"
        className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-ink"
      >
        <IconClose size={14} />
      </button>
    </div>
  )
}
