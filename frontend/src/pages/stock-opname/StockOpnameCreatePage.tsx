import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import {
  OpnameInformationStep,
  type OpnameInformationState,
} from '../../components/stock-opname/create/OpnameInformationStep'
import { CountItemsStep, type OpnameItemRow } from '../../components/stock-opname/create/CountItemsStep'
import { SummaryStep } from '../../components/stock-opname/create/SummaryStep'
import { getNextOpnameNo } from '../../data/stockOpnameData'
import { inventoryItems } from '../../data/inventoryData'
import { branches } from '../../data/transactionsData'

const opnameNo = getNextOpnameNo()

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

const initialOpnameInfo: OpnameInformationState = {
  branch: branches[0],
  date: today(),
  remarks: '',
  opnameType: 'Full',
  category: '',
  status: 'Draft',
}

export function StockOpnameCreatePage() {
  const [opnameInfo, setOpnameInfo] = useState(initialOpnameInfo)
  const [rows, setRows] = useState<OpnameItemRow[]>([])

  function updateOpnameInfo<K extends keyof OpnameInformationState>(field: K, value: OpnameInformationState[K]) {
    if (field === 'branch') {
      // Every counted row's System Stock is tied to the old branch, so
      // switching branches clears the list instead of showing stale numbers.
      setRows([])
    }

    setOpnameInfo((prev) => ({ ...prev, [field]: value }))
  }

  function handleAddRow(productId: string) {
    const item = inventoryItems.find((entry) => entry.id === productId)
    setRows((prev) => [...prev, { productId, actualStock: item?.stock ?? 0, notes: '' }])
  }

  function handleRemoveRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  function handleActualStockChange(index: number, actualStock: number) {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, actualStock: Math.max(actualStock, 0) } : row)))
  }

  function handleNotesChange(index: number, notes: string) {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, notes } : row)))
  }

  function handleCancel() {
    window.location.hash = '#/stock-opname'
  }

  // TODO: submit the new opname to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/stock-opname'
  }

  const canSubmit = rows.length > 0

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <OpnameInformationStep opnameNo={opnameNo} value={opnameInfo} onChange={updateOpnameInfo} />

      <CountItemsStep
        branch={opnameInfo.branch}
        category={opnameInfo.opnameType === 'Partial' ? opnameInfo.category : ''}
        rows={rows}
        onAddRow={handleAddRow}
        onRemoveRow={handleRemoveRow}
        onActualStockChange={handleActualStockChange}
        onNotesChange={handleNotesChange}
      />

      <SummaryStep
        rows={rows}
        branch={opnameInfo.branch}
        opnameType={opnameInfo.opnameType}
        date={opnameInfo.date}
        status={opnameInfo.status}
      />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={handleSubmit} disabled={!canSubmit}>
          Save as Draft
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Complete Opname
        </Button>
      </div>
    </div>
  )
}
