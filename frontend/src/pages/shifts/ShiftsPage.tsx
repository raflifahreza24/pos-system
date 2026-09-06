import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { Pagination } from '../../components/ui/Pagination'
import { ShiftsToolbar } from '../../components/shifts/ShiftsToolbar'
import { ShiftsTable } from '../../components/shifts/ShiftsTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { shifts } from '../../data/shiftsData'
import { branches } from '../../data/transactionsData'

const PAGE_SIZE = 10

export function ShiftsPage() {
  const [date, setDate] = useState('')
  const [branch, setBranch] = useState('all')

  const filteredShifts = useMemo(() => {
    return shifts.filter((shift) => {
      const matchesDate = !date || shift.date === date
      const matchesBranch = branch === 'all' || shift.branch === branch
      return matchesDate && matchesBranch
    })
  }, [date, branch])

  const pagination = usePagination(filteredShifts, PAGE_SIZE)

  useEffect(() => {
    pagination.setPage(1)
  }, [date, branch])

  function handleOpenShift() {
    window.location.hash = '#/open-shift'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Shifts"
        subtitle="Track cashier shift hours and sales per session."
        action={
          <Button icon={<IconPlus size={16} />} onClick={handleOpenShift} fullWidthOnMobile>
            Open Shift
          </Button>
        }
      />

      <ShiftsToolbar date={date} onDateChange={setDate} branch={branch} onBranchChange={setBranch} branches={branches} />

      <ShiftsTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
