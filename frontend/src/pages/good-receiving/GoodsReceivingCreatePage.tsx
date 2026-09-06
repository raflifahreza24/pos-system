import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import {
  ReceivingInformationStep,
  type ReceivingInformationState,
} from '../../components/goods-receiving/create/ReceivingInformationStep'
import { ItemsStep, type GoodsReceivingItemRow } from '../../components/goods-receiving/create/ItemsStep'
import { SummaryStep } from '../../components/goods-receiving/create/SummaryStep'
import { getNextGrNo } from '../../data/goodsReceivingData'
import { purchaseOrders } from '../../data/purchaseOrdersData'
import { users } from '../../data/usersData'

const grNo = getNextGrNo()
const defaultReceivedBy = users.find((user) => user.role === 'Super Admin')?.name ?? 'Super Admin'

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

const initialReceivingInfo: ReceivingInformationState = {
  poNo: '',
  receivingDate: today(),
  receivedBy: defaultReceivedBy,
  notes: '',
}

export function GoodsReceivingCreatePage() {
  const [receivingInfo, setReceivingInfo] = useState(initialReceivingInfo)
  const [rows, setRows] = useState<GoodsReceivingItemRow[]>([])

  const selectedPo = purchaseOrders.find((po) => po.poNo === receivingInfo.poNo) ?? null

  function updateReceivingInfo<K extends keyof ReceivingInformationState>(field: K, value: ReceivingInformationState[K]) {
    if (field === 'poNo') {
      // Switching the PO reloads the item list from scratch — received
      // quantities default to the ordered quantity, same convention as
      // Stock Opname defaulting Actual Stock to System Stock.
      const po = purchaseOrders.find((entry) => entry.poNo === value) ?? null
      setRows(po ? po.items.map((item) => ({ productId: item.productId, orderedQty: item.quantity, receivedQty: item.quantity, remarks: '' })) : [])
    }

    setReceivingInfo((prev) => ({ ...prev, [field]: value }))
  }

  function handleReceivedQtyChange(index: number, receivedQty: number) {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, receivedQty: Math.max(receivedQty, 0) } : row)))
  }

  function handleRemarksChange(index: number, remarks: string) {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, remarks } : row)))
  }

  function handleCancel() {
    window.location.hash = '#/goods-receiving'
  }

  // TODO: submit the new goods receiving record to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/goods-receiving'
  }

  const canSubmit = receivingInfo.poNo !== '' && receivingInfo.receivingDate !== '' && rows.length > 0

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <ReceivingInformationStep
        grNo={grNo}
        purchaseOrders={purchaseOrders}
        selectedPo={selectedPo}
        value={receivingInfo}
        onChange={updateReceivingInfo}
      />

      <ItemsStep rows={rows} onReceivedQtyChange={handleReceivedQtyChange} onRemarksChange={handleRemarksChange} />

      <SummaryStep rows={rows} supplier={selectedPo?.supplier ?? ''} poNo={selectedPo?.poNo ?? ''} receivingDate={receivingInfo.receivingDate} />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={handleSubmit} disabled={!canSubmit}>
          Save as Draft
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Complete Receiving
        </Button>
      </div>
    </div>
  )
}
