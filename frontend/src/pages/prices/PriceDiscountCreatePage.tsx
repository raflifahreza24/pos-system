import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Tabs } from '../../components/ui/Tabs'
import { IconChevronLeft } from '../../components/ui/icons'
import { ProductInformationStep } from '../../components/price-discounts/create/ProductInformationStep'
import { TypeStep } from '../../components/price-discounts/create/TypeStep'
import { DetailsStep, type DetailsState } from '../../components/price-discounts/create/DetailsStep'
import { priceDiscountTabs, type PriceDiscountType } from '../../data/priceDiscountsData'

const initialDetails: DetailsState = {
  sellingPrice: 0,
  discountValueKind: 'percentage',
  discountValue: 0,
  startDate: '',
  endDate: '',
  notes: '',
  status: 'Active',
}

export function PriceDiscountCreatePage() {
  const [type, setType] = useState<PriceDiscountType>('Price')
  const [productId, setProductId] = useState('')
  const [details, setDetails] = useState(initialDetails)

  function updateDetails<K extends keyof DetailsState>(field: K, value: DetailsState[K]) {
    setDetails((prev) => ({ ...prev, [field]: value }))
  }

  function handleCancel() {
    window.location.hash = '#/price-discounts'
  }

  // TODO: submit the new price/discount entry to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/price-discounts'
  }

  const canSubmit =
    productId !== '' && (type === 'Price' ? details.sellingPrice > 0 : details.discountValue > 0)

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <Tabs tabs={priceDiscountTabs} activeKey={type} onChange={(key) => setType(key as PriceDiscountType)} />

      <ProductInformationStep productId={productId} onProductChange={setProductId} />
      <TypeStep value={type} onChange={setType} />
      <DetailsStep type={type} value={details} onChange={updateDetails} />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Save
        </Button>
      </div>
    </div>
  )
}
