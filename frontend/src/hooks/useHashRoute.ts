import { useEffect, useState } from 'react'

const DEFAULT_PATH = '/dashboard'

function readPath(): string {
  const hash = window.location.hash.replace(/^#/, '')
  return hash || DEFAULT_PATH
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
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return path
}
