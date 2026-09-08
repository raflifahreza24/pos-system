import { useContext } from 'react'
import { ToastContext, type ToastOptions } from '../context/ToastContext'

/**
 * `showSuccess('Saved')` / `showError('Something went wrong', 'Try again')`
 * are shorthands for the common case; `showToast` is still there for a
 * custom duration or a description passed alongside a success/error title.
 */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')

  const { showToast } = ctx

  function showSuccess(title: string, description?: string, options?: Omit<ToastOptions, 'title' | 'description' | 'variant'>) {
    return showToast({ ...options, title, description, variant: 'success' })
  }

  function showError(title: string, description?: string, options?: Omit<ToastOptions, 'title' | 'description' | 'variant'>) {
    return showToast({ ...options, title, description, variant: 'error' })
  }

  return { ...ctx, showSuccess, showError }
}
