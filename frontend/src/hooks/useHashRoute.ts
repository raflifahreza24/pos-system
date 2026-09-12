import { useEffect, useState } from 'react'

const DEFAULT_PATH = '/dashboard'

function readPath(): string {
  const hash = window.location.hash.replace(/^#/, '')
  if (hash) return hash.split('?')[0] || DEFAULT_PATH

  // Password reset emails point to a regular `/reset-password?...` URL.
  // Keep supporting the app's existing hash links while allowing that
  // direct entry path to reach the reset screen.
  return window.location.pathname === '/' ? DEFAULT_PATH : window.location.pathname
}

/**
 * Minimal hash-based router. Every sidebar link already points at
 * `#/some-path` (see src/data/navigation.ts), so this hook is the only
 * piece of routing infrastructure the app needs for now — no extra
 * dependency required. Swap it for react-router-dom later without
 * touching the pages themselves: only App.tsx's route table changes.
 */
export function useHashRoute(): string {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    function handleHashChange() {
      setPath(readPath())
    }
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handleHashChange)
    }
  }, [])

  return path
}
