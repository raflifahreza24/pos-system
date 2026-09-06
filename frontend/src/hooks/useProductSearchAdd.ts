import { useState } from 'react'

interface SearchableCandidate {
  id: string
  product: string
  sku: string
}

/**
 * "Type a name/SKU, click Add" behavior shared by every create form that
 * builds a table by searching a product list (Stock Transfer's Add Items,
 * Stock Opname's Count Items, ...): tracks the query, matches it against
 * `candidates`, rejects a no-match or an already-added product, and calls
 * `onAdd` with the match. Each caller keeps its own row shape — this hook
 * only owns the search box's state.
 */
export function useProductSearchAdd<T extends SearchableCandidate>(
  candidates: T[],
  existingIds: string[],
  onAdd: (item: T) => void,
) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleAdd() {
    const term = query.trim().toLowerCase()
    if (!term) return

    const match = candidates.find(
      (item) => item.product.toLowerCase().includes(term) || item.sku.toLowerCase().includes(term),
    )

    if (!match) {
      setError('No matching product found.')
      return
    }

    if (existingIds.includes(match.id)) {
      setError('This product has already been added.')
      return
    }

    setError(null)
    setQuery('')
    onAdd(match)
  }

  return { query, setQuery, error, handleAdd }
}
