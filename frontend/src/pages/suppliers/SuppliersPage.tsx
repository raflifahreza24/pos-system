import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Pagination } from '../../components/ui/Pagination'
import { SearchToolbar } from '../../components/ui/SearchToolbar'
import { SuppliersTable } from '../../components/suppliers/SuppliersTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { suppliers } from '../../data/suppliersData'

const PAGE_SIZE = 10

export function SuppliersPage() {
  const [search, setSearch] = useState('')

  const filteredSuppliers = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return suppliers
    return suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(query) ||
        supplier.email.toLowerCase().includes(query) ||
        supplier.phone.includes(query),
    )
  }, [search])

  const pagination = usePagination(filteredSuppliers, PAGE_SIZE)

  useEffect(() => {
    pagination.setPage(1)
  }, [search])

  function handleAddSupplier() {
    window.location.hash = '#/suppliers/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Suppliers" subtitle="Manage the vendors you purchase stock from." />

      <SearchToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search supplier..."
        actionLabel="Add Supplier"
        actionIcon={<IconPlus size={16} />}
        onAction={handleAddSupplier}
      />

      <SuppliersTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
