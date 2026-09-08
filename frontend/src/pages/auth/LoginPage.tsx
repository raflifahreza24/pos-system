import { useState, type FormEvent } from 'react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { LoginForm } from '../../components/auth/LoginForm'
import { Button } from '../../components/ui/Button'
import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { IconArrowRight, IconChevronLeft, IconLock, IconMail, IconShieldCheck } from '../../components/ui/icons'

type LoginView = 'login' | 'forgot-password'

// Staggered entrance timing for the Forgot Password card — same
// `auth-fade-up`/`auth-scale-in` classes as LoginForm.tsx (see
// public/assets/css/login-animations.css, loaded via index.html), just
// its own sequence since it mounts fresh every time the user switches
// into this view.
const FORGOT_PASSWORD_DELAY = {
  backLink: '0ms',
  card: '60ms',
  header: '160ms',
  field: '240ms',
  submitButton: '310ms',
  needHelp: '380ms',
  trustLine: '450ms',
}

/**
 * Full-screen Login page — deliberately outside MainLayout (no
 * sidebar/topbar; see App.tsx's branch for the `/login` route). Split
 * screen on desktop (hero panel + form), form-only on mobile — the shell
 * itself lives in AuthLayout (shared with ResetPasswordPage) so both
 * screens are pixel-identical outside their form content.
 *
 * The right column swaps between the Login form and a Forgot Password
 * form via local `view` state — not a real route, so "Back to Login" /
 * "Forgot password?" are just state toggles, not navigation. Kept in
 * this one file (per request) rather than a new page/route.
 */
export function LoginPage() {
  const [view, setView] = useState<LoginView>('login')

  return (
    <AuthLayout>
      {view === 'login' ? (
        <LoginForm onForgotPassword={() => setView('forgot-password')} />
      ) : (
        <ForgotPasswordForm onBackToLogin={() => setView('login')} />
      )}
      <p className="auth-fade-in text-center text-xs text-ink-muted" style={{ animationDelay: '520ms' }}>
        © 2026 POS. All rights reserved.
      </p>
    </AuthLayout>
  )
}

function ForgotPasswordForm({ onBackToLogin }: { onBackToLogin: () => void }) {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      // Dummy handler for now, same spirit as authService.login — swap
      // for a real "/auth/forgot-password" request once that endpoint
      // exists. No new file for just this one call yet; promote it
      // alongside authService.ts if/when this screen needs more logic.
      await new Promise((resolve) => setTimeout(resolve, 700))
      // TODO: show a "check your email" confirmation once the real endpoint exists.
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full max-w-[560px] flex-col gap-4">
      <button
        type="button"
        onClick={onBackToLogin}
        className="auth-fade-up flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-ink transition-colors duration-150 hover:text-primary"
        style={{ animationDelay: FORGOT_PASSWORD_DELAY.backLink }}
      >
        <IconChevronLeft size={16} />
        Back to Login
      </button>

      <div
        className="auth-scale-in rounded-[14px] border border-line bg-surface p-8 sm:p-10"
        style={{ animationDelay: FORGOT_PASSWORD_DELAY.card }}
      >
        <div className="auth-fade-up flex flex-col items-center gap-2 text-center" style={{ animationDelay: FORGOT_PASSWORD_DELAY.header }}>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
            <IconMail size={26} />
          </span>
          <h1 className="mt-2 text-2xl font-bold text-ink">Forgot Password?</h1>
          <p className="text-sm text-ink-muted">
            No worries! Enter your email or username and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="auth-fade-up" style={{ animationDelay: FORGOT_PASSWORD_DELAY.field }}>
            <FormField label="Email or Username">
              <Input
                type="text"
                name="identifier"
                autoComplete="username"
                required
                placeholder="Enter your email or username"
                icon={<IconMail size={18} className="shrink-0 text-ink-muted" />}
                value={emailOrUsername}
                onChange={(event) => setEmailOrUsername(event.target.value)}
              />
            </FormField>
          </div>

          <div className="auth-fade-up" style={{ animationDelay: FORGOT_PASSWORD_DELAY.submitButton }}>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              trailingIcon={loading ? undefined : <IconArrowRight size={16} />}
              className="w-full justify-center py-3 text-[15px]"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>

        <div className="auth-fade-in my-6 flex items-center gap-3" style={{ animationDelay: FORGOT_PASSWORD_DELAY.needHelp }}>
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs font-medium text-ink-muted">OR</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div
          className="auth-fade-up flex items-start gap-3 rounded-xl bg-primary-light/60 p-4"
          style={{ animationDelay: FORGOT_PASSWORD_DELAY.needHelp }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
            <IconShieldCheck size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Need Help?</p>
            <p className="text-sm text-ink-muted">If you&apos;re still having trouble, please contact your administrator or IT support.</p>
          </div>
        </div>
      </div>

      <p
        className="auth-fade-in flex items-center justify-center gap-2 text-center text-xs text-ink-muted"
        style={{ animationDelay: FORGOT_PASSWORD_DELAY.trustLine }}
      >
        <IconLock size={13} className="shrink-0" />
        Your information is safe with us. We&apos;ll never share your data with anyone.
      </p>
    </div>
  )
}
