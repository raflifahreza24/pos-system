import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { Pagination } from '../components/ui/Pagination'
import { CustomersToolbar } from '../components/customers/CustomersToolbar'
import { CustomersTable } from '../components/customers/CustomersTable'
import { usePagination } from '../hooks/usePagination'
import { customers, type Customer } from '../data/customersData'

const PAGE_SIZE = 10

export function CustomersPage() {
  const [search, setSearch] = useState('')

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return customers
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.includes(query),
    )
  }, [search])

  const pagination = usePagination(filteredCustomers, PAGE_SIZE)

  useEffect(() => {
    pagination.setPage(1)
  }, [search])

  // TODO: wire these up once the customer create/detail screens exist.
  function handleAddCustomer() {}
  function handleView(_customer: Customer) {}
  function handleEdit(_customer: Customer) {}

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Customers" subtitle="Manage your customer directory and loyalty points." />

      <CustomersToolbar search={search} onSearchChange={setSearch} onAddCustomer={handleAddCustomer} />

      <CustomersTable
        rows={pagination.pageItems}
        startIndex={pagination.rangeStart}
        onView={handleView}
        onEdit={handleEdit}
      />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
