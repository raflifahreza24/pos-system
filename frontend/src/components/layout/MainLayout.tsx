import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-canvas transition-colors duration-300">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
