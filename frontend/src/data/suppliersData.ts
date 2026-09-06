import type { Status } from '../components/ui/StatusBadge'
import { branches } from './transactionsData'

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  status: Status
}

const contactPersonPool = ['Hendra Wijaya', 'Sri Lestari', 'Bambang Santoso', 'Yuni Kartika', 'Arief Rahman', 'Dian Puspita']

const supplierNames = [
  'Supplier A',
  'Supplier B',
  'Supplier C',
  'Supplier D',
  'Supplier E',
  'Supplier F',
  'Supplier G',
  'Supplier H',
  'Supplier I',
  'Supplier J',
  'Supplier K',
  'Supplier L',
]

function toEmail(name: string): string {
  // "Supplier A" -> "a@supplier.com"
  const initial = name.split(' ')[1]?.toLowerCase() ?? name.toLowerCase()
  return `${initial}@supplier.com`
}

function toPhone(index: number): string {
  return `08${String(1200000000 + index * 9876543).slice(0, 10)}`
}

// Mostly "Active", occasionally "Inactive" — same status-mix convention used
// for Products, Categories, and every other master-data list in the app.
const statusCycle: Status[] = ['Active', 'Active', 'Active', 'Inactive']

function buildSuppliers(): Supplier[] {
  return supplierNames.map((rawName, index) => {
    const name = `PT. ${rawName}`

    return {
      id: `SUP-${String(index + 1).padStart(3, '0')}`,
      name,
      contactPerson: contactPersonPool[index % contactPersonPool.length],
      phone: toPhone(index),
      email: toEmail(rawName),
      address: `Jl. Raya ${branches[index % branches.length]} No. ${index + 1}`,
      status: statusCycle[index % statusCycle.length],
    }
  })
}

export const suppliers: Supplier[] = buildSuppliers()

// Options for the Add Supplier form.
export const supplierCategories = ['Raw Materials', 'Packaging', 'Food & Beverage', 'Equipment', 'Services']
export const paymentTermsOptions = ['Cash', 'Net 7', 'Net 15', 'Net 30', 'Net 60']
