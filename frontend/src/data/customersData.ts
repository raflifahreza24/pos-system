import { activeInactiveStatuses, type Status } from '../components/ui/StatusBadge'
import { branches } from './branchesData'

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  totalPoints: number
  status: Status
  addressLine: string
  city: string
  province: string
  postalCode: string
  joinDate: string
  notes: string
}

const namePool = [
  'Budi',
  'Siti',
  'Andi',
  'Rina',
  'Dewi',
  'Fajar',
  'Maya',
  'Rizky',
  'Putri',
  'Agus',
  'Wulan',
  'Hendra',
  'Lestari',
  'Bayu',
  'Indah',
  'Yusuf',
  'Sari',
  'Dimas',
  'Ayu',
  'Eko',
  'Nadia',
  'Rian',
  'Citra',
  'Wahyu',
]

// Same city/province each branch's store address already uses (not
// re-typed) so a customer's home city always names a real branch city.
const provinceByCity: Record<string, string> = {
  Surabaya: 'Jawa Timur',
  Sidoarjo: 'Jawa Timur',
  Malang: 'Jawa Timur',
  Jakarta: 'DKI Jakarta',
  Bandung: 'Jawa Barat',
  Semarang: 'Jawa Tengah',
}

interface CustomerAddress {
  addressLine: string
  city: string
  province: string
  postalCode: string
}

function buildAddress(index: number): CustomerAddress {
  const branch = branches[index % branches.length]
  const city = branch.name.replace(' Store', '')
  const province = provinceByCity[city] ?? city
  const postalCode = String(60111 + (index % 40))
  return { addressLine: `Jl. Raya ${city} No. ${index + 1}`, city, province, postalCode }
}

function buildJoinDate(index: number): string {
  const start = new Date('2026-01-05T00:00:00')
  return new Date(start.getTime() + index * 9 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

function generateCustomers(count: number): Customer[] {
  return Array.from({ length: count }, (_, index) => {
    const name = namePool[index % namePool.length]
    const suffix = String(index + 1).padStart(2, '0')

    const address = buildAddress(index)

    return {
      id: `CUST-${suffix}`,
      name,
      phone: `081${String(200000000 + index * 137).slice(0, 9)}`,
      email: `${name.toLowerCase()}${index + 1}@email.com`,
      totalPoints: 100 + ((index * 137) % 1500),
      // Mostly Active, occasionally Inactive — same status-mix convention
      // used across the app's other lifecycle lists.
      status: (index + 1) % 7 === 0 ? 'Inactive' : 'Active',
      ...address,
      joinDate: buildJoinDate(index),
      notes: '',
    }
  })
}

export const customers: Customer[] = generateCustomers(24)

// Joins a customer's separate address fields back into the single display
// line every read-only view (Customer Detail, ...) shows.
export function formatCustomerAddress(customer: Pick<Customer, 'addressLine' | 'city' | 'province' | 'postalCode'>): string {
  return `${customer.addressLine}, ${customer.city}, ${customer.province} ${customer.postalCode}`
}

// Options for the Add Customer form.
export const customerTypes = ['Individual', 'Business']
export const genders = ['Male', 'Female']
export const customerStatuses: Status[] = activeInactiveStatuses
