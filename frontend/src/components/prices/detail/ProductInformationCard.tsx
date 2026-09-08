import { IconBox, IconImage } from '../../ui/icons'
import { InfoRow } from '../../ui/InfoRow'
import { StatusBadge } from '../../ui/StatusBadge'
import { capitalize } from '../../../utils/formatters'
import { getProductBarcode, getProductSku, getProductUnit, type Product } from '../../../data/productsData'

interface ProductInformationCardProps {
  product: Product
  // Discount Detail doesn't show the product's own Active/Inactive status
  // (that's covered by the discount's own Status field instead), so this
  // shared card lets that row be opted out of.
  showStatus?: boolean
}

export function ProductInformationCard({ product, showStatus = true }: ProductInformationCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <IconBox size={18} className="text-ink" />
        <h2 className="text-base font-semibold text-ink">Product Information</h2>
      </div>

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
          {showStatus ? <InfoRow label="Status" value={<StatusBadge status={product.status} />} /> : null}
        </div>
      </div>
    </div>
  )
}
