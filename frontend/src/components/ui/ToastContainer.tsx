import { createPortal } from 'react-dom'
import { Toast } from './Toast'
import type { ToastItem } from '../../context/ToastContext'

interface ToastContainerProps {
  toasts: ToastItem[]
  onDismiss: (id: string) => void
}

/**
 * Fixed top-right stack that renders whatever toasts are currently
 * active. Rendered once by `ToastProvider` — pages never mount this
 * themselves, they just call `useToast()`.
 */
export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return createPortal(
    <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-full max-w-sm flex-col gap-2.5 sm:right-5 sm:top-5">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body,
  )
}
