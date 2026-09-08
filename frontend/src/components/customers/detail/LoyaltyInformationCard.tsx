import { IconGift } from '../../ui/icons'
import { formatDate, formatNumber } from '../../../utils/formatters'

interface LoyaltyInformationCardProps {
  totalPoints: number
  memberSince: string
}

export function LoyaltyInformationCard({ totalPoints, memberSince }: LoyaltyInformationCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <IconGift size={18} className="text-ink" />
        <h2 className="text-base font-semibold text-ink">Loyalty Information</h2>
      </div>

      <div className="grid grid-cols-2 divide-x divide-line">
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm text-ink-muted">Total Points</span>
          <span className="text-2xl font-bold text-ink">{formatNumber(totalPoints)}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm text-ink-muted">Member Since</span>
          <span className="text-lg font-semibold text-ink">{formatDate(memberSince)}</span>
        </div>
      </div>
    </div>
  )
}
