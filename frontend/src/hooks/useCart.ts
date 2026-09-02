import { useMemo, useState } from 'react'
import type { Product } from '../data/posData'

export interface CartLine {
  product: Product
  quantity: number
}

const TAX_RATE = 0.11

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([])

  function addItem(product: Product) {
    setLines((prev) => {
      const existing = prev.find((line) => line.product.id === product.id)
      if (existing) {
        return prev.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  function incrementItem(productId: string) {
    setLines((prev) =>
      prev.map((line) => (line.product.id === productId ? { ...line, quantity: line.quantity + 1 } : line)),
    )
  }

  function decrementItem(productId: string) {
    setLines((prev) =>
      prev
        .map((line) => (line.product.id === productId ? { ...line, quantity: line.quantity - 1 } : line))
        .filter((line) => line.quantity > 0),
    )
  }

  function removeItem(productId: string) {
    setLines((prev) => prev.filter((line) => line.product.id !== productId))
  }

  function clear() {
    setLines([])
  }

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [lines],
  )
  const discount = 0
  const tax = useMemo(() => Math.round((subtotal - discount) * TAX_RATE), [subtotal])
  const total = subtotal - discount + tax
  const itemCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines])

  return {
    lines,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clear,
    subtotal,
    discount,
    tax,
    total,
    itemCount,
  }
}
