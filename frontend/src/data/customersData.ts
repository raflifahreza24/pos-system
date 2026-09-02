export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  totalPoints: number
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

function generateCustomers(count: number): Customer[] {
  return Array.from({ length: count }, (_, index) => {
    const name = namePool[index % namePool.length]
    const suffix = String(index + 1).padStart(2, '0')

    return {
      id: `CUST-${suffix}`,
      name,
      phone: `081${String(200000000 + index * 137).slice(0, 9)}`,
      email: `${name.toLowerCase()}${index + 1}@email.com`,
      totalPoints: 100 + ((index * 137) % 1500),
    }
  })
}

export const customers: Customer[] = generateCustomers(24)
