export type DateRangeFilter = 'all' | 'today' | '7d' | '30d'

const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Shared "is this date within X" check used by every list/table page that
 * offers a Date Range filter (Transactions, Returns & Refunds, ...) so the
 * age-window logic lives in exactly one place.
 */
export function matchesDateRange(value: string | Date, filter: DateRangeFilter, now: number = Date.now()): boolean {
  if (filter === 'all') return true

  const date = typeof value === 'string' ? new Date(value) : value
  const ageMs = now - date.getTime()

  switch (filter) {
    case 'today':
      return ageMs <= DAY_MS
    case '7d':
      return ageMs <= 7 * DAY_MS
    case '30d':
      return ageMs <= 30 * DAY_MS
  }
}
