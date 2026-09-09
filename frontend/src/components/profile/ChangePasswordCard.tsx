import { useState, type FormEvent } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { IconKey, IconLock } from '../ui/icons'
import { PasswordField } from '../auth/PasswordField'
import { PasswordRequirementsList, isPasswordValid } from '../auth/PasswordRequirementsList'

interface ChangePasswordCardProps {
  onSubmit: (payload: { currentPassword: string; newPassword: string }) => void
}

/**
 * Reuses the PasswordField / PasswordRequirementsList built for the auth
 * screens (src/components/auth, from the Reset Password page) instead of
 * redeclaring the same show/hide + strength-checklist UI a third time.
 */
export function ChangePasswordCard({ onSubmit }: ChangePasswordCardProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const passwordsMatch = confirmPassword !== '' && confirmPassword === newPassword
  const canSubmit = currentPassword !== '' && isPasswordValid(newPassword) && passwordsMatch

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) return
    onSubmit({ currentPassword, newPassword })
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <SectionHeader icon={<IconLock size={18} />} title="Change Password" subtitle="Keep your account secure with a strong password." />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <PasswordField
          label="Current Password"
          name="current-password"
          autoComplete="current-password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={setCurrentPassword}
          visible={showCurrent}
          onToggleVisible={() => setShowCurrent((prev) => !prev)}
        />

        <PasswordField
          label="New Password"
          name="new-password"
          autoComplete="new-password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={setNewPassword}
          visible={showNew}
          onToggleVisible={() => setShowNew((prev) => !prev)}
        />

        <div>
          <PasswordField
            label="Confirm New Password"
            name="confirm-password"
            autoComplete="new-password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            visible={showConfirm}
            onToggleVisible={() => setShowConfirm((prev) => !prev)}
          />
          {confirmPassword !== '' && !passwordsMatch ? (
            <p className="mt-1.5 text-xs text-danger-strong">Passwords do not match.</p>
          ) : null}
        </div>

        <PasswordRequirementsList password={newPassword} />

        <div>
          <Button type="submit" icon={<IconKey size={16} />} disabled={!canSubmit}>
            Update Password
          </Button>
        </div>
      </form>
    </div>
  )
}
