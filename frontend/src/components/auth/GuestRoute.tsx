import { useEffect, type ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'

export function GuestRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      window.location.hash = '#/dashboard'
    }
  }, [isAuthenticated, isLoading])

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-canvas text-sm text-ink-muted">
        Loading...
      </div>
    )
  }

  return children
}
