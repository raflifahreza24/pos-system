import { useState, type FormEvent } from 'react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { PasswordField } from '../../components/auth/PasswordField'
import { PasswordRequirementsList, isPasswordValid } from '../../components/auth/PasswordRequirementsList'
import { Button } from '../../components/ui/Button'
import { IconArrowRight, IconChevronLeft, IconLock } from '../../components/ui/icons'
import { authApi } from '../../api/authApi'
import { getApiErrorMessage } from '../../api/apiClient'

// Staggered entrance timing, same pattern as LoginForm.tsx/LoginPage.tsx's
// Forgot Password card (see public/assets/css/login-animations.css,
// loaded via index.html).
const DELAY = {
  backLink: '0ms',
  card: '60ms',
  header: '160ms',
  newPasswordField: '240ms',
  confirmPasswordField: '310ms',
  requirements: '380ms',
  submitButton: '450ms',
  trustLine: '520ms',
  footer: '590ms',
}

function goToLogin() {
  window.location.hash = '#/login'
}

function readResetParams() {
  const hash = window.location.hash.replace(/^#/, '')
  const hashQuery = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : ''
  const params = new URLSearchParams(hashQuery || window.location.search)

  return {
    token: params.get('token') ?? '',
    email: params.get('email') ?? '',
  }
}

/**
 * Full-screen Reset Password page — same AuthLayout shell as LoginPage
 * (hero panel + right-side card), only the form content differs. Reuses
 * PasswordField/PasswordRequirementsList (new, src/components/auth) since
 * nothing in src/components already covered a password-strength checklist.
 */
export function ResetPasswordPage() {
  const [{ token, email }] = useState(readResetParams)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const hasValidLinkParams = token !== '' && email !== ''
  const passwordsMatch = confirmPassword !== '' && confirmPassword === newPassword
  const canSubmit = hasValidLinkParams && isPasswordValid(newPassword) && passwordsMatch

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit || loading) return

    setErrorMessage('')
    setSuccessMessage('')
    setLoading(true)
    try {
      const message = await authApi.resetPassword({
        email,
        token,
        password: newPassword,
        password_confirmation: confirmPassword,
      })
      setSuccessMessage(message)
      window.setTimeout(goToLogin, 1500)
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Unable to reset your password. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="flex w-full max-w-[560px] flex-col gap-4">
        <button
          type="button"
          onClick={goToLogin}
          className="auth-fade-up flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-ink transition-colors duration-150 hover:text-primary"
          style={{ animationDelay: DELAY.backLink }}
        >
          <IconChevronLeft size={16} />
          Back to Login
        </button>

        <div
          className="auth-scale-in rounded-[14px] border border-line bg-surface p-8 sm:p-10"
          style={{ animationDelay: DELAY.card }}
        >
          <div className="auth-fade-up flex flex-col items-center gap-2 text-center" style={{ animationDelay: DELAY.header }}>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
              <IconLock size={26} />
            </span>
            <h1 className="mt-2 text-2xl font-bold text-ink">Reset Your Password</h1>
            <p className="text-sm text-ink-muted">
              Create a new password for your POS account. Make sure it&apos;s strong and secure.
            </p>
          </div>

          <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
            {!hasValidLinkParams ? (
              <p role="alert" className="rounded-xl bg-danger-light px-4 py-3 text-sm text-danger-strong">
                This password reset link is invalid or incomplete. Please request a new link.
              </p>
            ) : null}

            <div className="auth-fade-up" style={{ animationDelay: DELAY.newPasswordField }}>
              <PasswordField
                label="New Password"
                name="new-password"
                autoComplete="new-password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={setNewPassword}
                visible={showNewPassword}
                onToggleVisible={() => setShowNewPassword((prev) => !prev)}
              />
            </div>

            <div className="auth-fade-up" style={{ animationDelay: DELAY.confirmPasswordField }}>
              <PasswordField
                label="Confirm New Password"
                name="confirm-password"
                autoComplete="new-password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={showConfirmPassword}
                onToggleVisible={() => setShowConfirmPassword((prev) => !prev)}
              />
              {confirmPassword !== '' && !passwordsMatch && (
                <p className="mt-1.5 text-xs text-danger-strong">Passwords do not match.</p>
              )}
            </div>

            <div className="auth-fade-up" style={{ animationDelay: DELAY.requirements }}>
              <PasswordRequirementsList password={newPassword} />
            </div>

            {successMessage ? (
              <p role="status" className="rounded-xl bg-success-light px-4 py-3 text-sm text-success-strong">
                {successMessage} Redirecting to login...
              </p>
            ) : null}

            {errorMessage ? (
              <p role="alert" className="rounded-xl bg-danger-light px-4 py-3 text-sm text-danger-strong">
                {errorMessage}
              </p>
            ) : null}

            <div className="auth-fade-up" style={{ animationDelay: DELAY.submitButton }}>
              <Button
                type="submit"
                variant="primary"
                disabled={loading || !canSubmit}
                trailingIcon={loading ? undefined : <IconArrowRight size={16} />}
                className="w-full justify-center py-3 text-[15px]"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </div>
          </form>
        </div>

        <p
          className="auth-fade-in flex items-center justify-center gap-2 text-center text-xs text-ink-muted"
          style={{ animationDelay: DELAY.trustLine }}
        >
          <IconLock size={13} className="shrink-0" />
          Your information is safe with us. We&apos;ll never share your data with anyone.
        </p>
      </div>

      <p className="auth-fade-in text-center text-xs text-ink-muted" style={{ animationDelay: DELAY.footer }}>
        © 2026 POS. All rights reserved.
      </p>
    </AuthLayout>
  )
}
