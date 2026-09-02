import { IconChevronLeft, IconChevronRight } from '../ui/icons'
import { cn } from '../../utils/formatters'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const SIBLING_WINDOW = 1

function getPageNumbers(page: number, totalPages: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = []

  for (let i = 1; i <= totalPages; i++) {
    const isEdge = i === 1 || i === totalPages
    const isNearCurrent = Math.abs(i - page) <= SIBLING_WINDOW

    if (isEdge || isNearCurrent) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis')
    }
  }

  return pages
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(page, totalPages)

  return (
    <nav className="flex items-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-ink disabled:pointer-events-none disabled:opacity-40"
      >
        <IconChevronLeft size={16} />
      </button>

      {pages.map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-1.5 text-sm text-ink-muted">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors duration-150',
              item === page ? 'bg-primary text-white' : 'text-ink-muted hover:bg-canvas hover:text-ink',
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-ink disabled:pointer-events-none disabled:opacity-40"
      >
        <IconChevronRight size={16} />
      </button>
    </nav>
  )
}
