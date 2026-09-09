import { useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Tabs, type Tab } from '../../components/ui/Tabs'
import { ProfileSummaryCard } from '../../components/profile/ProfileSummaryCard'
import { PersonalInformationCard, type PersonalInformationValue } from '../../components/profile/PersonalInformationCard'
import { ChangePasswordCard } from '../../components/profile/ChangePasswordCard'
import { ProfilePreferencesCard, type QuickPreferencesValue } from '../../components/profile/ProfilePreferencesCard'
import { RecentActivityCard } from '../../components/profile/RecentActivityCard'
import { currentUser, recentActivity } from '../../data/currentUserData'
import { useToast } from '../../hooks/useToast'

const TABS: Tab[] = [
  { key: 'personal', label: 'Personal Information' },
  { key: 'security', label: 'Security' },
  { key: 'preferences', label: 'Preferences' },
  { key: 'activity', label: 'Activity' },
]

/**
 * Account overview reached from the topbar's "My Profile" menu item (see
 * UserDropdown.tsx). Renders inside MainLayout like every other page —
 * unlike Login/Reset Password, this one keeps the sidebar/topbar.
 */
export function ProfilePage() {
  const { showSuccess } = useToast()
  const [activeTab, setActiveTab] = useState<string>(TABS[0].key)

  const [personalInfo, setPersonalInfo] = useState<PersonalInformationValue>({
    fullName: currentUser.name,
    phone: currentUser.phone,
  })

  const [quickPreferences, setQuickPreferences] = useState<QuickPreferencesValue>({
    language: 'en',
    timezone: 'wib',
    dateFormat: 'dd/mm/yyyy',
  })

  // Dummy handlers for now — no backend endpoint exists yet for any of
  // these (mirrors authService.resetPassword's TODO), so each just
  // confirms the action with a toast.
  function handleSaveProfile() {
    showSuccess('Profile updated', 'Your personal information has been saved.')
  }

  function handleChangePassword(_payload: { currentPassword: string; newPassword: string }) {
    showSuccess('Password updated', 'Your password has been changed successfully.')
  }

  function handleSavePreferences() {
    showSuccess('Preferences saved', 'Your preferences have been updated.')
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <p className="text-xs text-ink-muted">Home &gt; Profile</p>
      <PageHeader title="Profile" subtitle="Manage your account information and preferences." />

      <ProfileSummaryCard user={currentUser} />

      <Tabs tabs={TABS} activeKey={activeTab} onChange={setActiveTab} />

      {activeTab === 'personal' ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <PersonalInformationCard
            value={personalInfo}
            onChange={setPersonalInfo}
            email={currentUser.email}
            role={currentUser.role}
            branch={currentUser.branch}
            onSave={handleSaveProfile}
          />
          <ChangePasswordCard onSubmit={handleChangePassword} />
          <ProfilePreferencesCard value={quickPreferences} onChange={setQuickPreferences} onSave={handleSavePreferences} />
          <RecentActivityCard activity={recentActivity} onViewAll={() => setActiveTab('activity')} />
        </div>
      ) : null}

      {activeTab === 'security' ? (
        <div className="max-w-xl">
          <ChangePasswordCard onSubmit={handleChangePassword} />
        </div>
      ) : null}

      {activeTab === 'preferences' ? (
        <div className="max-w-xl">
          <ProfilePreferencesCard value={quickPreferences} onChange={setQuickPreferences} onSave={handleSavePreferences} />
        </div>
      ) : null}

      {activeTab === 'activity' ? <RecentActivityCard activity={recentActivity} /> : null}
    </div>
  )
}
