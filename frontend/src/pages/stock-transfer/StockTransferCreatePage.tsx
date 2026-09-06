import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import {
  TransferInformationStep,
  type TransferInformationState,
} from '../../components/stock-transfer/create/TransferInformationStep'
import { AddItemsStep, type TransferItemRow } from '../../components/stock-transfer/create/AddItemsStep'
import { SummaryStep } from '../../components/stock-transfer/create/SummaryStep'
import { getNextTransferNo } from '../../data/stockTransferData'
import { inventoryItems } from '../../data/inventoryData'
import { branches } from '../../data/transactionsData'

const transferNo = getNextTransferNo()

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

const initialTransferInfo: TransferInformationState = {
  date: today(),
  fromBranch: branches[0],
  toBranch: '',
  notes: '',
  referenceNo: '',
}

export function StockTransferCreatePage() {
  const [transferInfo, setTransferInfo] = useState(initialTransferInfo)
  const [rows, setRows] = useState<TransferItemRow[]>([])

  function updateTransferInfo<K extends keyof TransferInformationState>(
    field: K,
    value: TransferInformationState[K],
  ) {
    if (field === 'fromBranch') {
      // Every added row's "Current Stock" is tied to the old From Branch,
      // so switching branches clears the list instead of showing stale
      // numbers. To Branch is reset too if it now matches the new value.
      setRows([])
      setTransferInfo((prev) => ({
        ...prev,
        fromBranch: value as string,
        toBranch: prev.toBranch === value ? '' : prev.toBranch,
      }))
      return
    }

    setTransferInfo((prev) => ({ ...prev, [field]: value }))
  }

  function handleAddRow(productId: string) {
    setRows((prev) => [...prev, { productId, qty: 1 }])
  }

  function handleRemoveRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  function handleQtyChange(index: number, qty: number) {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row
        const item = inventoryItems.find((entry) => entry.id === row.productId)
        const maxQty = item?.stock ?? qty
        return { ...row, qty: Math.min(Math.max(qty, 1), maxQty) }
      }),
    )
  }

  function handleCancel() {
    window.location.hash = '#/stock-transfer'
  }

  // TODO: submit the new transfer to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/stock-transfer'
  }

  const canSubmit = transferInfo.toBranch !== '' && rows.length > 0

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <TransferInformationStep transferNo={transferNo} value={transferInfo} onChange={updateTransferInfo} />

      <AddItemsStep
        fromBranch={transferInfo.fromBranch}
        rows={rows}
        onAddRow={handleAddRow}
        onRemoveRow={handleRemoveRow}
        onQtyChange={handleQtyChange}
      />

      <SummaryStep
        rows={rows}
        fromBranch={transferInfo.fromBranch}
        toBranch={transferInfo.toBranch}
        date={transferInfo.date}
      />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Submit Transfer
        </Button>
      </div>
    </div>
  )
}
