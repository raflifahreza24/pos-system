import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import { POInformationStep, type POInformationState } from '../../components/purchase-orders/create/POInformationStep'
import { SupplierInformationStep } from '../../components/purchase-orders/create/SupplierInformationStep'
import { AddItemsStep, type POItemRow } from '../../components/purchase-orders/create/AddItemsStep'
import { SummaryStep } from '../../components/purchase-orders/create/SummaryStep'
import { getNextPoNo } from '../../data/purchaseOrdersData'
import { suppliers } from '../../data/suppliersData'

const poNo = getNextPoNo()

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

const initialPoInfo: POInformationState = {
  supplierId: '',
  orderDate: today(),
  expectedDeliveryDate: '',
  referenceNo: '',
  notes: '',
}

export function PurchaseOrderCreatePage() {
  const [poInfo, setPoInfo] = useState(initialPoInfo)
  const [rows, setRows] = useState<POItemRow[]>([])

  const selectedSupplier = suppliers.find((supplier) => supplier.id === poInfo.supplierId) ?? null

  function updatePoInfo<K extends keyof POInformationState>(field: K, value: POInformationState[K]) {
    setPoInfo((prev) => ({ ...prev, [field]: value }))
  }

  function handleAddRow(productId: string, unitPrice: number) {
    setRows((prev) => [...prev, { productId, unitPrice, quantity: 1 }])
  }

  function handleRemoveRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  function handleUnitPriceChange(index: number, unitPrice: number) {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, unitPrice: Math.max(unitPrice, 0) } : row)))
  }

  function handleQuantityChange(index: number, quantity: number) {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, quantity: Math.max(quantity, 1) } : row)))
  }

  function handleCancel() {
    window.location.hash = '#/purchase-orders'
  }

  // TODO: submit the new purchase order to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/purchase-orders'
  }

  const canSubmit = poInfo.supplierId !== '' && poInfo.orderDate !== '' && rows.length > 0

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <POInformationStep poNo={poNo} value={poInfo} onChange={updatePoInfo} />
        <SupplierInformationStep supplier={selectedSupplier} />
      </div>

      <AddItemsStep
        rows={rows}
        onAddRow={handleAddRow}
        onRemoveRow={handleRemoveRow}
        onUnitPriceChange={handleUnitPriceChange}
        onQuantityChange={handleQuantityChange}
      />

      <SummaryStep rows={rows} />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={handleSubmit} disabled={!canSubmit}>
          Save as Draft
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Submit PO
        </Button>
      </div>
    </div>
  )
}
