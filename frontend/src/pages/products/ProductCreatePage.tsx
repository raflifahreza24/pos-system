import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import { BasicInformationStep, type BasicInformationState } from '../../components/products/create/BasicInformationStep'
import {
  PricingInformationStep,
  type PricingInformationState,
} from '../../components/products/create/PricingInformationStep'
import {
  InventoryInformationStep,
  type InventoryInformationState,
} from '../../components/products/create/InventoryInformationStep'
import { ProductImageStep } from '../../components/products/create/ProductImageStep'
import { StatusStep } from '../../components/products/create/StatusStep'
import type { Status } from '../../components/ui/StatusBadge'

const initialBasicInfo: BasicInformationState = {
  name: '',
  sku: '',
  barcode: '',
  category: '',
  brand: '',
  description: '',
}

const initialPricingInfo: PricingInformationState = {
  purchasePrice: 0,
  sellingPrice: 0,
  costPrice: 0,
  tax: '',
  discountable: 'Yes',
  minimumPrice: 0,
}

const initialInventoryInfo: InventoryInformationState = {
  initialStock: 0,
  unit: '',
  reorderLevel: 0,
  location: '',
}

export function ProductCreatePage() {
  const [basicInfo, setBasicInfo] = useState(initialBasicInfo)
  const [pricingInfo, setPricingInfo] = useState(initialPricingInfo)
  const [inventoryInfo, setInventoryInfo] = useState(initialInventoryInfo)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('Active')

  function updateBasicInfo<K extends keyof BasicInformationState>(field: K, value: BasicInformationState[K]) {
    setBasicInfo((prev) => ({ ...prev, [field]: value }))
  }

  function updatePricingInfo<K extends keyof PricingInformationState>(field: K, value: PricingInformationState[K]) {
    setPricingInfo((prev) => ({ ...prev, [field]: value }))
  }

  function updateInventoryInfo<K extends keyof InventoryInformationState>(
    field: K,
    value: InventoryInformationState[K],
  ) {
    setInventoryInfo((prev) => ({ ...prev, [field]: value }))
  }

  function handleCancel() {
    window.location.hash = '#/products'
  }

  // TODO: submit the new product to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/products'
  }

  const canSubmit =
    basicInfo.name.trim() !== '' &&
    basicInfo.sku.trim() !== '' &&
    basicInfo.category.trim() !== '' &&
    inventoryInfo.unit.trim() !== ''

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BasicInformationStep
          value={basicInfo}
          onChange={updateBasicInfo}
          headerAction={
            <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
              Kembali
            </Button>
          }
        />
        <PricingInformationStep value={pricingInfo} onChange={updatePricingInfo} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <InventoryInformationStep value={inventoryInfo} onChange={updateInventoryInfo} />
        <ProductImageStep value={imageFile} onChange={setImageFile} />
      </div>

      <StatusStep value={status} onChange={setStatus} />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Save Product
        </Button>
      </div>
    </div>
  )
}
