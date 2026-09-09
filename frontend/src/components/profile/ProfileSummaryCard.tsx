import { StatusBadge } from '../ui/StatusBadge'
import { IconCalendar, IconCamera, IconClock, IconShieldCheck, IconStorefront, IconUser } from '../ui/icons'
import type { CurrentUserProfile } from '../../data/currentUserData'

/**
 * Top summary card on the Profile screen — avatar, name/role, email/branch
 * on the left; membership/login/status facts on the right. Purely
 * presentational (no local state) since every field here is either
 * read-only or edited via the cards below it.
 */
export function ProfileSummaryCard({ user }: { user: CurrentUserProfile }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-canvas text-ink-muted">
            <IconUser size={34} />
          </div>
          <button
            type="button"
            aria-label="Change profile photo"
            className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-sm ring-2 ring-surface transition-colors duration-150 hover:bg-primary-hover"
          >
            <IconCamera size={14} />
          </button>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-ink">{user.name}</h2>
            <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-medium text-primary">{user.role}</span>
          </div>
          <p className="mt-0.5 text-sm text-ink-muted">{user.email}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-muted">
            <IconStorefront size={14} className="shrink-0" />
            Branch: {user.branch}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 text-sm sm:items-end">
        <div className="flex items-center gap-2">
          <IconCalendar size={15} className="shrink-0 text-ink-muted" />
          <span className="text-ink-muted">Member since</span>
          <span className="font-medium text-ink">{user.memberSince}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconClock size={15} className="shrink-0 text-ink-muted" />
          <span className="text-ink-muted">Last login</span>
          <span className="font-medium text-ink">{user.lastLogin}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconShieldCheck size={15} className="shrink-0 text-ink-muted" />
          <span className="text-ink-muted">Account status</span>
          <StatusBadge status={user.status} />
        </div>
      </div>
    </div>
  )
}
