import { useEffect, type ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { usePermission } from '../../hooks/usePermission'
import { IconShieldCheck } from '../ui/icons'

function LoadingRoute() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-canvas text-sm text-ink-muted">
      Loading...
    </div>
  )
}

interface ProtectedRouteProps {
  children: ReactNode
  permission?: string
  fallback?: ReactNode
}

function AccessDenied() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl items-center justify-center">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-8 py-10 text-center shadow-xs">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-light text-danger-strong">
          <IconShieldCheck size={23} />
        </span>
        <h1 className="text-lg font-semibold text-ink">Access Denied</h1>
        <p className="text-sm text-ink-muted">You do not have permission to access this page.</p>
      </div>
    </div>
  )
}

export function ProtectedRoute({ children, permission, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const { can } = usePermission()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.hash = '#/login'
    }
  }, [isAuthenticated, isLoading])

  if (isLoading || !isAuthenticated) return <LoadingRoute />

  if (permission && !can(permission)) {
    return fallback ?? <AccessDenied />
  }

  return children
}
