import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { Pagination } from '../../components/ui/Pagination'
import { BranchesTable } from '../../components/branches/BranchesTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { branches } from '../../data/branchesData'

const PAGE_SIZE = 10

export function BranchesPage() {
  const pagination = usePagination(branches, PAGE_SIZE)

  function handleAddBranch() {
    window.location.hash = '#/branches/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Branches"
        subtitle="Manage the store locations that use this POS."
        action={
          <Button icon={<IconPlus size={16} />} onClick={handleAddBranch} fullWidthOnMobile>
            Add Branch
          </Button>
        }
      />

      <BranchesTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
