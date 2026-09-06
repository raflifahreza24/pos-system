import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Pagination } from '../../components/ui/Pagination'
import { SearchToolbar } from '../../components/ui/SearchToolbar'
import { ProductsTable } from '../../components/products/ProductsTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { products } from '../../data/productsData'

const PAGE_SIZE = 10

export function ProductsPage() {
  const [search, setSearch] = useState('')

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return products
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query),
    )
  }, [search])

  const pagination = usePagination(filteredProducts, PAGE_SIZE)

  useEffect(() => {
    pagination.setPage(1)
  }, [search])

  function handleAddProduct() {
    window.location.hash = '#/products/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Products" subtitle="Manage your product catalog, pricing, and stock status." />

      <SearchToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search product..."
        actionLabel="Add Product"
        actionIcon={<IconPlus size={16} />}
        onAction={handleAddProduct}
      />

      <ProductsTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
