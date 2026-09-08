import type { Status } from '../components/ui/StatusBadge'
import { categoryNames } from './categoriesData'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: Status
}

const productNames = [
  'Kopi Susu',
  'Es Teh Manis',
  'Roti Bakar Coklat',
  'Nasi Goreng Spesial',
  'Sandwich Ayam',
  'Air Mineral 600ml',
  'Keripik Kentang',
  'Donat Coklat',
  'Teh Botol',
  'Mie Instan Cup',
  'Kue Lapis',
  'Susu UHT 250ml',
  'Kopi Hitam',
  'Jus Alpukat',
  'Biskuit Coklat',
  'Permen Mint',
  'Tisu Basah',
  'Sabun Cuci Tangan',
  'Masker Medis',
  'Baterai AA',
]

function generateProducts(count: number): Product[] {
  return Array.from({ length: count }, (_, index) => {
    // Every 6th product is out of rotation — gives the Status column a
    // realistic mostly-Active, occasionally-Inactive mix.
    const isActive = (index + 1) % 6 !== 0

    return {
      id: `PRD-${String(index + 1).padStart(3, '0')}`,
      name: productNames[index % productNames.length],
      category: categoryNames[index % categoryNames.length],
      price: 5000 + ((index * 1873) % 45000),
      stock: (index * 17) % 150,
      status: isActive ? 'Active' : 'Inactive',
    }
  })
}

export const products: Product[] = generateProducts(28)

// A product's real record has no separate SKU field, so every feature
// that needs one (Returns, Price & Discounts, ...) derives the same
// synthetic value from its product id instead of inventing its own.
export function getProductSku(productId: string): string {
  return productId.replace('PRD', 'SKU')
}

// Same idea as getProductSku, for the barcode shown on Price Detail: no
// real field for it yet, so a deterministic 13-digit value is derived
// from the product id instead of every caller making up its own.
export function getProductBarcode(productId: string): string {
  const index = Number(productId.replace(/\D/g, '')) || 0
  const digits = String(1_000_000_000 + index * 137).slice(0, 10)
  return `899${digits}`
}

// Options for the Add Product form.
export const productUnits = ['pcs', 'box', 'kg', 'liter', 'pack', 'cup']
export const taxOptions = ['No Tax', 'PPN 11%']

// A product's selling unit isn't stored on the record either — derived
// deterministically from productUnits the same way SKU and barcode are.
export function getProductUnit(productId: string): string {
  const index = Number(productId.replace(/\D/g, '')) || 0
  return productUnits[index % productUnits.length]
}
