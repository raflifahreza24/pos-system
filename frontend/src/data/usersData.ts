import type { Status } from '../components/ui/StatusBadge'
import { branches, cashiers } from './transactionsData'

export type UserRole = 'Super Admin' | 'Manager' | 'Cashier'

export interface AppUser {
  id: string
  name: string
  email: string
  role: UserRole
  branch: string
  status: Status
}

const managerNames = ['Nadia', 'Farhan', 'Lina', 'Yusuf', 'Putri', 'Bayu']

function toEmail(name: string): string {
  return `${name.toLowerCase()}@pos.com`
}

// One Super Admin (all branches) plus a Manager + Cashier pair per branch —
// cashier names are pulled straight from `cashiers` in transactionsData.ts
// (not re-typed), so a name here always matches the same person's sales on
// the Transactions page.
function buildUsers(): AppUser[] {
  const users: AppUser[] = [
    { id: 'USR-001', name: 'Super Admin', email: 'super@pos.com', role: 'Super Admin', branch: 'All', status: 'Active' },
  ]

  branches.forEach((branch, index) => {
    const managerName = managerNames[index % managerNames.length]
    users.push({
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: managerName,
      email: toEmail(managerName),
      role: 'Manager',
      branch,
      status: 'Active',
    })

    const cashierName = cashiers[index % cashiers.length]
    users.push({
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: cashierName,
      email: toEmail(cashierName),
      role: 'Cashier',
      branch,
      status: index === branches.length - 1 ? 'Inactive' : 'Active',
    })
  })

  return users
}

export const users: AppUser[] = buildUsers()
