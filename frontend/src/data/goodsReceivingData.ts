import type { Status } from '../components/ui/StatusBadge'
import { purchaseOrders } from './purchaseOrdersData'

export interface GoodsReceiving {
  id: string
  grNo: string
  poNo: string
  supplier: string
  date: string
  status: Status
}

// Mostly "Completed", occasionally "Pending" — same status-mix convention
// used across the app's other lifecycle lists.
const statusCycle: Status[] = ['Completed', 'Completed', 'Completed', 'Pending']

// One receiving record per purchase order — PO No and Supplier are pulled
// straight from `purchaseOrders` (not re-typed), so every GR always traces
// back to a real PO row, arriving a day after it was placed.
function buildGoodsReceivings(): GoodsReceiving[] {
  return purchaseOrders.map((po, index) => {
    const receivedDate = new Date(new Date(po.date).getTime() + 24 * 60 * 60 * 1000)

    return {
      id: `goods-receiving-${index + 1}`,
      grNo: `GR-${String(index + 1).padStart(4, '0')}`,
      poNo: po.poNo,
      supplier: po.supplier,
      date: receivedDate.toISOString(),
      status: statusCycle[index % statusCycle.length],
    }
  })
}

export const goodsReceivings: GoodsReceiving[] = buildGoodsReceivings()

// Next GR number the create form should show — one past the last
// generated mock record, in the same GR-#### shape as `buildGoodsReceivings`.
export function getNextGrNo(): string {
  return `GR-${String(goodsReceivings.length + 1).padStart(4, '0')}`
}
