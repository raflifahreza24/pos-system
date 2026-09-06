import type { Status } from '../components/ui/StatusBadge'

export interface Category {
  id: string
  name: string
  description: string
  status: Status
}

// Single source of truth for category names — src/data/productsData.ts
// imports categoryNames from here so a product's category always matches
// a real row on the Categories page.
export const categoryNames = ['Minuman', 'Makanan', 'Snack', 'Kebutuhan Harian']

const descriptions: Record<string, string> = {
  Minuman: 'Kopi, teh, jus, dan minuman kemasan.',
  Makanan: 'Menu makanan berat dan sarapan.',
  Snack: 'Camilan dan makanan ringan.',
  'Kebutuhan Harian': 'Perlengkapan dan kebutuhan rumah tangga.',
}

export const categories: Category[] = categoryNames.map((name, index) => ({
  id: `CAT-${String(index + 1).padStart(2, '0')}`,
  name,
  description: descriptions[name] ?? `Produk dalam kategori ${name}.`,
  status: 'Active',
}))
