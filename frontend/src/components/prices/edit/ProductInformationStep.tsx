import { StepCard } from '../../ui/StepCard'
import { InfoRow } from '../../ui/InfoRow'
import { IconImage } from '../../ui/icons'
import { capitalize } from '../../../utils/formatters'
import { getProductBarcode, getProductSku, getProductUnit, type Product } from '../../../data/productsData'

interface ProductInformationStepProps {
  product: Product
}

export function ProductInformationStep({ product }: ProductInformationStepProps) {
  return (
    <StepCard step={1} title="Product Information" subtitle="Selected product details (cannot be changed).">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="mx-auto flex h-32 w-32 shrink-0 flex-col items-center justify-center gap-2 rounded-xl bg-canvas text-ink-muted sm:mx-0">
          <IconImage size={28} />
          <span className="text-xs">Product Image</span>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <InfoRow label="Product Name" value={product.name} />
          <InfoRow label="SKU" value={getProductSku(product.id)} />
          <InfoRow label="Barcode" value={getProductBarcode(product.id)} />
          <InfoRow label="Category" value={product.category} />
          <InfoRow label="Unit" value={capitalize(getProductUnit(product.id))} />
        </div>
      </div>
    </StepCard>
  )
}
