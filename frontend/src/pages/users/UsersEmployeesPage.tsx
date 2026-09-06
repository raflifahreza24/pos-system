import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Pagination } from '../../components/ui/Pagination'
import { SearchToolbar } from '../../components/ui/SearchToolbar'
import { UsersTable } from '../../components/users/UsersTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { users } from '../../data/usersData'

const PAGE_SIZE = 10

export function UsersEmployeesPage() {
  const [search, setSearch] = useState('')

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return users
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query),
    )
  }, [search])

  const pagination = usePagination(filteredUsers, PAGE_SIZE)

  useEffect(() => {
    pagination.setPage(1)
  }, [search])

  function handleAddUser() {
    window.location.hash = '#/users-employees/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Users / Employees" subtitle="Manage staff accounts, roles, and branch access." />

      <SearchToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search user..."
        actionLabel="Add User"
        actionIcon={<IconPlus size={16} />}
        onAction={handleAddUser}
      />

      <UsersTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
