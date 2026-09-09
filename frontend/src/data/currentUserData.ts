import type { Status } from '../components/ui/StatusBadge'

export interface CurrentUserProfile {
  name: string
  role: string
  email: string
  phone: string
  branch: string
  memberSince: string
  lastLogin: string
  status: Status
}

// Mock "logged-in user" for the Profile/Preferences screens — no auth
// session exists yet (see src/services/authService.ts), so this stands in
// for whatever the real session payload will carry once that's wired up.
export const currentUser: CurrentUserProfile = {
  name: 'Rafli Fahreza',
  role: 'Operator',
  email: 'rafli.fahreza@company.com',
  phone: '0812 3456 7890',
  branch: 'Main Branch',
  memberSince: '12 January 2026',
  lastLogin: '5 September 2026, 09:24',
  status: 'Active',
}

export type ActivityType = 'login' | 'profile-update' | 'password-change'

export interface ActivityEntry {
  id: string
  type: ActivityType
  title: string
  description: string
  date: string
}

export const recentActivity: ActivityEntry[] = [
  { id: 'ACT-1', type: 'login', title: 'Logged in', description: 'From 192.168.1.10', date: '5 Sep 2026, 09:24' },
  { id: 'ACT-2', type: 'profile-update', title: 'Updated profile', description: 'Changed phone number', date: '3 Sep 2026, 14:12' },
  { id: 'ACT-3', type: 'password-change', title: 'Changed password', description: 'Password updated successfully', date: '1 Sep 2026, 10:05' },
  { id: 'ACT-4', type: 'login', title: 'Logged in', description: 'From 192.168.1.15', date: '1 Sep 2026, 08:17' },
]
