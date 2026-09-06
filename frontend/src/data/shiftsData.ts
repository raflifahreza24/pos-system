import type { Status } from '../components/ui/StatusBadge'
import { branches, cashiers } from './transactionsData'

export interface Shift {
  id: string
  cashier: string
  branch: string
  date: string
  openTime: string
  closeTime: string | null
  status: Status
  sales: number
}

const openTimes = ['08:00', '08:15', '08:05', '13:00', '13:15']
const shiftLengthHours = [8, 8.25, 8.1, 7.5, 7.75]

function addHours(time: string, hours: number): string {
  const [hour, minute] = time.split(':').map(Number)
  const totalMinutes = hour * 60 + minute + Math.round(hours * 60)
  const closeHour = Math.floor(totalMinutes / 60) % 24
  const closeMinute = totalMinutes % 60
  return `${String(closeHour).padStart(2, '0')}:${String(closeMinute).padStart(2, '0')}`
}

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

// Cashier and branch names come straight from `cashiers` / `branches` in
// transactionsData.ts (not re-typed), so a shift always names a real
// cashier working a real branch. Only the most recent shift is left "Open".
function buildShifts(count: number): Shift[] {
  const start = new Date('2026-09-02T00:00:00')

  return Array.from({ length: count }, (_, index) => {
    const dayOffset = Math.floor(index / cashiers.length)
    const date = new Date(start.getTime() - dayOffset * 24 * 60 * 60 * 1000)
    const openTime = openTimes[index % openTimes.length]
    const isOpenShift = index === 0
    const closeTime = isOpenShift ? null : addHours(openTime, shiftLengthHours[index % shiftLengthHours.length])

    return {
      id: `shift-${index + 1}`,
      cashier: cashiers[index % cashiers.length],
      branch: branches[index % branches.length],
      date: toDateKey(date),
      openTime,
      closeTime,
      status: isOpenShift ? 'Open' : 'Closed',
      sales: 350000 + ((index * 91700) % 1450000),
    }
  })
}

export const shifts: Shift[] = buildShifts(30)
