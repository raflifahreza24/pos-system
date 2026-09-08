import { createContext, useCallback, useState, type ReactNode } from 'react'
import { ToastContainer } from '../components/ui/ToastContainer'

export type ToastVariant = 'success' | 'error'

export interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
  /** Milliseconds before it auto-dismisses. Pass 0 to require a manual close. */
  duration?: number
}

export interface ToastItem {
  id: string
  title: string
  description?: string
  variant: ToastVariant
  duration: number
}

interface ToastContextValue {
  toasts: ToastItem[]
  showToast: (options: ToastOptions) => string
  dismissToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

const DEFAULT_DURATION = 4000

/**
 * App-wide success/error notification stack. Mounted once at the root
 * (see App.tsx) so any page can call `useToast()` to show one without
 * rendering anything itself — the same "controlled from anywhere, owned
 * centrally" shape as ThemeProvider/SidebarProvider.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((options: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    setToasts((prev) => [
      ...prev,
      {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant ?? 'success',
        duration: options.duration ?? DEFAULT_DURATION,
      },
    ])
    return id
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}
