import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'

export type ThemeMode = 'default' | 'light'

const STORAGE_KEY = 'pos_theme'

interface ThemeContextValue {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

function readInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'default'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'default' ? stored : 'default'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(readInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = useCallback((next: ThemeMode) => setThemeState(next), [])
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === 'default' ? 'light' : 'default')),
    [],
  )

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
