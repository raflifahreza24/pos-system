import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { Pagination } from '../../components/ui/Pagination'
import { CategoriesTable } from '../../components/categories/CategoriesTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { categories } from '../../data/categoriesData'

const PAGE_SIZE = 10

export function CategoriesPage() {
  const pagination = usePagination(categories, PAGE_SIZE)

  function handleAddCategory() {
    window.location.hash = '#/categories/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Categories"
        subtitle="Organize your products into categories."
        action={
          <Button icon={<IconPlus size={16} />} onClick={handleAddCategory} fullWidthOnMobile>
            Add Category
          </Button>
        }
      />

      <CategoriesTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
