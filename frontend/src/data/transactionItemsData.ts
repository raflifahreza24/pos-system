import { products, getProductSku } from './productsData'
import { transactions } from './transactionsData'

export interface TransactionItem {
  product: string
  sku: string
  qty: number
  price: number
}

// Each invoice's line items are derived deterministically from `products`
// (not re-typed) and keyed off the transaction's own position in
// `transactions`, so looking up the same invoice number always returns the
// same items — needed for the Returns & Refunds "Search Transaction" flow.
export function getTransactionItems(transactionId: string): TransactionItem[] {
  const index = transactions.findIndex((transaction) => transaction.id === transactionId)
  if (index === -1) return []

  const itemCount = 1 + (index % 3)

  return Array.from({ length: itemCount }, (_, itemIndex) => {
    const product = products[(index * 5 + itemIndex * 7) % products.length]
    const qty = 1 + ((index + itemIndex) % 3)

    return {
      product: product.name,
      sku: getProductSku(product.id),
      qty,
      price: product.price,
    }
  })
}

export function getItemsSubtotal(items: TransactionItem[]): number {
  return items.reduce((sum, item) => sum + item.qty * item.price, 0)
}
