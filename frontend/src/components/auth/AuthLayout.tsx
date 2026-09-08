import type { ReactNode } from 'react'
import { LoginHeroPanel } from './LoginHeroPanel'

/**
 * Shared split-screen shell for every auth screen (Login, Forgot Password,
 * Reset Password): hero panel on the left, a scrollable form column on the
 * right. Extracted verbatim from LoginPage.tsx's original layout so the
 * already-approved Login look is byte-for-byte unchanged — only the
 * `children` passed into the right column differ per screen.
 */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-canvas">
      <LoginHeroPanel />

      <div className="flex h-full w-full flex-col items-center justify-center gap-6 overflow-y-auto px-4 py-8 sm:px-6 md:w-[60%] lg:w-[55%] lg:px-10">
        {children}
      </div>
    </div>
  )
}
