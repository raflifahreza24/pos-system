import { createContext, useCallback, useState, type ReactNode } from 'react'

interface SidebarContextValue {
  collapsed: boolean
  mobileOpen: boolean
  toggleCollapsed: () => void
  openMobile: () => void
  closeMobile: () => void
}

export const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleCollapsed = useCallback(() => setCollapsed((prev) => !prev), [])
  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <SidebarContext.Provider
      value={{ collapsed, mobileOpen, toggleCollapsed, openMobile, closeMobile }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
