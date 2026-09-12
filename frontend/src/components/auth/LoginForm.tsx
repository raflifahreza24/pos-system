import { useState, type FormEvent } from 'react'
import { Button } from '../ui/Button'
import { FormField } from '../ui/FormField'
import { Input } from '../ui/Input'
import {
  IconArrowRight,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconShieldCheck,
  IconStorefront,
} from '../ui/icons'
import { getApiErrorMessage } from '../../api/apiClient'
import { useAuth } from '../../hooks/useAuth'

// Staggered entrance timing, top to bottom — see
// public/assets/css/login-animations.css (loaded via index.html) for what
// `auth-fade-up`/`auth-scale-in` do. Starts a beat after the hero panel's
// own entrance (src/components/auth/LoginHeroPanel.tsx) so the two sides
// read as one sequence instead of two disconnected ones.
const DELAY = {
  card: '60ms',
  header: '160ms',
  emailField: '240ms',
  passwordField: '310ms',
  rememberRow: '380ms',
  submitButton: '450ms',
  secureAccess: '520ms',
}

interface LoginFormProps {
  onForgotPassword: () => void
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return

    setErrorMessage('')
    setLoading(true)
    try {
      await login({ email, password })
      window.location.hash = '#/dashboard'
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Unable to sign in. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="auth-scale-in w-full max-w-[560px] rounded-[14px] border border-line bg-surface p-8 sm:p-10"
      style={{ animationDelay: DELAY.card }}
    >
      <div className="auth-fade-up flex flex-col items-center gap-2 text-center" style={{ animationDelay: DELAY.header }}>
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
          <IconStorefront size={26} />
        </span>
        <h1 className="mt-2 text-2xl font-bold text-ink">Welcome Back</h1>
        <p className="text-sm text-ink-muted">Login to your POS account to continue</p>
      </div>

      <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="auth-fade-up" style={{ animationDelay: DELAY.emailField }}>
          <FormField label="Email">
            <Input
              type="email"
              name="email"
              autoComplete="username"
              required
              placeholder="Enter your email"
              icon={<IconMail size={18} className="shrink-0 text-ink-muted" />}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormField>
        </div>

        <div className="auth-fade-up" style={{ animationDelay: DELAY.passwordField }}>
          <FormField label="Password">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              icon={<IconLock size={18} className="shrink-0 text-ink-muted" />}
              trailingIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="flex shrink-0 cursor-pointer items-center justify-center text-ink-muted transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              }
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormField>
        </div>

        <div className="auth-fade-up flex items-center justify-between gap-3 text-sm" style={{ animationDelay: DELAY.rememberRow }}>
          <label className="flex cursor-pointer items-center gap-2 text-ink">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border-line text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="cursor-pointer font-medium text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {errorMessage ? (
          <p role="alert" className="rounded-xl bg-danger-light px-4 py-3 text-sm text-danger-strong">
            {errorMessage}
          </p>
        ) : null}

        <div className="auth-fade-up" style={{ animationDelay: DELAY.submitButton }}>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            trailingIcon={loading ? undefined : <IconArrowRight size={16} />}
            className="w-full justify-center py-3 text-[15px]"
          >
            {loading ? 'Signing in...' : 'Log In'}
          </Button>
        </div>
      </form>

      <div className="auth-fade-in my-6 flex items-center gap-3" style={{ animationDelay: DELAY.secureAccess }}>
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs font-medium text-ink-muted">OR</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div
        className="auth-fade-up flex items-start gap-3 rounded-xl bg-primary-light/60 p-4"
        style={{ animationDelay: DELAY.secureAccess }}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
          <IconShieldCheck size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Secure Access</p>
          <p className="text-sm text-ink-muted">Your data is protected with industry-standard security measures.</p>
        </div>
      </div>
    </div>
  )
}
