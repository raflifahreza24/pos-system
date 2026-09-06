import type { Status } from '../components/ui/StatusBadge'

export interface Branch {
  id: string
  name: string
  code: string
  address: string
  phone: string
  status: Status
}

const branchSeeds = [
  { city: 'Surabaya', code: 'SBY', phone: '031-1234567' },
  { city: 'Sidoarjo', code: 'SDO', phone: '031-7654321' },
  { city: 'Malang', code: 'MLG', phone: '0341-123456' },
  { city: 'Jakarta', code: 'JKT', phone: '021-5551234' },
  { city: 'Bandung', code: 'BDG', phone: '022-4445678' },
  { city: 'Semarang', code: 'SMG', phone: '024-3332211' },
]

function buildBranches(): Branch[] {
  return branchSeeds.map((seed, index) => ({
    id: `BR-${String(index + 1).padStart(2, '0')}`,
    name: `${seed.city} Store`,
    code: seed.code,
    address: `Jl. Raya ${seed.city}`,
    phone: seed.phone,
    status: 'Active',
  }))
}

export const branches: Branch[] = buildBranches()
