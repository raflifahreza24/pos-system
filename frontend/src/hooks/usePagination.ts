import { useMemo, useState } from 'react'

/**
 * Generic client-side pagination over an already-filtered array. Reusable
 * for any future list/table page (Customers, Products, Inventory, ...) —
 * not tied to Transactions.
 */
export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(page, totalPages)

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, safePage, pageSize])

  const rangeStart = items.length === 0 ? 0 : (safePage - 1) * pageSize + 1
  const rangeEnd = Math.min(safePage * pageSize, items.length)

  return {
    page: safePage,
    totalPages,
    pageItems,
    setPage,
    rangeStart,
    rangeEnd,
    total: items.length,
  }
}
