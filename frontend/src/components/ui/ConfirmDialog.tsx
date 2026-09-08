import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './Button'
import { IconAlertTriangle } from './icons'
import { cn } from '../../utils/formatters'

interface ConfirmDialogProps {
  /** Controls both mounting and the enter/exit animation. */
  open: boolean
  title: string
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  /** 'danger' (red, for destructive actions like delete) or 'warning'
   * (amber, for a non-destructive confirmation). */
  variant?: 'danger' | 'warning'
  /** Disables the buttons and shows the confirm button as busy — for a
   * confirm handler that calls an API before closing the dialog. */
  confirmLoading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ANIMATION_MS = 180

const VARIANT_STYLES = {
  danger: { iconBg: 'bg-danger-light text-danger-strong', confirmVariant: 'danger' as const },
  warning: { iconBg: 'bg-warning-light text-warning-strong', confirmVariant: 'primary' as const },
}

/**
 * A SweetAlert-style centered confirmation dialog — the app's own
 * replacement for `window.confirm`, styled to match the rest of the UI
 * and animated in/out instead of appearing instantly. Fully controlled
 * (the caller owns the `open` boolean, typically "which row is pending
 * delete"), so any page can reuse it for any yes/no confirmation, not
 * just deleting a customer.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  confirmLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // `shouldRender` keeps the dialog mounted for the exit animation after
  // `open` flips back to false; `isVisible` is the class that actually
  // drives the transition, flipped on the frame after mount so the
  // "from" state has a chance to paint first.
  const [shouldRender, setShouldRender] = useState(open)
  const [isVisible, setIsVisible] = useState(false)

  // The caller typically resets its own state (e.g. "which row is
  // pending delete") the instant it calls onConfirm/onCancel, which
  // would otherwise blank out the title/description mid fade-out. Cache
  // the content whenever the dialog is open so the exit animation plays
  // against the last real content instead of empty props.
  const [content, setContent] = useState({ title, description, confirmLabel, cancelLabel, variant })

  useEffect(() => {
    if (open) {
      setContent({ title, description, confirmLabel, cancelLabel, variant })
    }
  }, [open, title, description, confirmLabel, cancelLabel, variant])

  useEffect(() => {
    if (open) {
      setShouldRender(true)
      // A single rAF can still land before the browser paints the
      // "hidden" starting state, which would skip the transition
      // entirely — nesting two rAFs guarantees a paint happens in
      // between, so the enter animation always plays.
      let raf2 = 0
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setIsVisible(true))
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
      }
    }

    setIsVisible(false)
    const timeout = setTimeout(() => setShouldRender(false), ANIMATION_MS)
    return () => clearTimeout(timeout)
  }, [open])

  useEffect(() => {
    if (!shouldRender) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shouldRender, onCancel])

  if (!shouldRender) return null

  const styles = VARIANT_STYLES[content.variant]

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onCancel}
        aria-hidden="true"
        // Inline transition: a global `* { transition-property: ... }`
        // reset in index.css (for the light/dark theme toggle) sits
        // outside Tailwind's utility layer, so per CSS cascade-layer
        // rules it silently wins over the `transition-opacity` utility
        // class regardless of specificity. Inline styles beat any
        // stylesheet rule, so this is what actually makes it animate.
        style={{ transitionProperty: 'opacity', transitionDuration: '200ms', transitionTimingFunction: 'ease-out' }}
        className={cn('absolute inset-0 bg-ink/50 backdrop-blur-[1px]', isVisible ? 'opacity-100' : 'opacity-0')}
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        // Same reason as the backdrop above — inline styles are the only
        // reliable way to transition opacity/transform here.
        style={{
          transitionProperty: 'opacity, transform',
          transitionDuration: '200ms',
          transitionTimingFunction: 'ease-out',
        }}
        className={cn(
          'relative flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-surface p-6 text-center shadow-lg',
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0',
        )}
      >
        <span className={cn('flex h-14 w-14 items-center justify-center rounded-full', styles.iconBg)}>
          <IconAlertTriangle size={26} />
        </span>

        <div className="flex flex-col gap-1.5">
          <h2 id="confirm-dialog-title" className="text-base font-semibold text-ink">
            {content.title}
          </h2>
          {content.description ? <p className="text-sm text-ink-muted">{content.description}</p> : null}
        </div>

        <div className="mt-1 flex w-full gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={confirmLoading} className="flex-1">
            {content.cancelLabel}
          </Button>
          <Button variant={styles.confirmVariant} onClick={onConfirm} disabled={confirmLoading} className="flex-1">
            {confirmLoading ? 'Please wait...' : content.confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
