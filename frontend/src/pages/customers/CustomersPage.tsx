import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Pagination } from '../../components/ui/Pagination'
import { SearchToolbar } from '../../components/ui/SearchToolbar'
import { CustomersTable } from '../../components/customers/CustomersTable'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { useToast } from '../../hooks/useToast'
import { customers, type Customer } from '../../data/customersData'

const PAGE_SIZE = 10

export function CustomersPage() {
  const [search, setSearch] = useState('')
  const [customerPendingDelete, setCustomerPendingDelete] = useState<Customer | null>(null)
  const { showSuccess } = useToast()

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

  function handleAddCustomer() {
    window.location.hash = '#/customers/create'
  }

  function handleView(customer: Customer) {
    window.location.hash = `#/customers/${customer.id}`
  }

  function handleEdit(customer: Customer) {
    window.location.hash = `#/customers/${customer.id}/edit`
  }

  function handleDelete(customer: Customer) {
    setCustomerPendingDelete(customer)
  }

  // TODO: call the delete-customer endpoint once it exists.
  function handleConfirmDelete() {
    if (customerPendingDelete) {
      showSuccess('Customer deleted', `"${customerPendingDelete.name}" has been removed.`)
    }
    setCustomerPendingDelete(null)
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Customers" subtitle="Manage your customer directory and loyalty points." />

      <SearchToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search customer..."
        actionLabel="Add Customer"
        actionIcon={<IconPlus size={16} />}
        onAction={handleAddCustomer}
      />

      <CustomersTable
        rows={pagination.pageItems}
        startIndex={pagination.rangeStart}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConfirmDialog
        open={customerPendingDelete !== null}
        title="Delete this customer?"
        description={
          customerPendingDelete
            ? `"${customerPendingDelete.name}" (${customerPendingDelete.id}) will be permanently removed. This action cannot be undone.`
            : undefined
        }
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setCustomerPendingDelete(null)}
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
