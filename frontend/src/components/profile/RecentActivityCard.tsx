import type { ComponentType } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { IconClock, IconEdit, IconLock, IconLogIn, type IconProps } from '../ui/icons'
import type { ActivityEntry, ActivityType } from '../../data/currentUserData'

const ACTIVITY_ICON: Record<ActivityType, ComponentType<IconProps>> = {
  login: IconLogIn,
  'profile-update': IconEdit,
  'password-change': IconLock,
}

interface RecentActivityCardProps {
  activity: ActivityEntry[]
  onViewAll?: () => void
}

export function RecentActivityCard({ activity, onViewAll }: RecentActivityCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <SectionHeader
        icon={<IconClock size={18} />}
        title="Recent Activity"
        subtitle="Your latest account activity."
        action={
          onViewAll ? (
            <Button variant="secondary" onClick={onViewAll} className="px-3 py-1.5 text-xs">
              View All
            </Button>
          ) : undefined
        }
      />

      <ul className="flex flex-col gap-4">
        {activity.map((item) => {
          const Icon = ACTIVITY_ICON[item.type]
          return (
            <li key={item.id} className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-canvas text-ink-muted">
                <Icon size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">{item.title}</p>
                <p className="truncate text-xs text-ink-muted">{item.description}</p>
              </div>
              <span className="shrink-0 whitespace-nowrap text-xs text-ink-muted">{item.date}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
