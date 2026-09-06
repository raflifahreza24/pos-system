import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { IconImage } from '../../ui/icons'
import { products, getProductSku } from '../../../data/productsData'
import { formatCurrency } from '../../../utils/formatters'

interface ProductInformationStepProps {
  productId: string
  onProductChange: (productId: string) => void
}

export function ProductInformationStep({ productId, onProductChange }: ProductInformationStepProps) {
  const product = products.find((item) => item.id === productId) ?? null

  return (
    <StepCard step={1} title="Product Information" subtitle="Select the product to set price or discount.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_220px]">
        <div className="flex flex-col gap-4">
          <FormFieldRow label="Product" required>
            <Select value={productId} onChange={(event) => onProductChange(event.target.value)}>
              <option value="">Search product...</option>
              {products.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormFieldRow>

          <FormFieldRow label="SKU">
            <Input value={product ? getProductSku(product.id) : '-'} disabled wrapperClassName="bg-canvas" />
          </FormFieldRow>

          <FormFieldRow label="Current Price">
            <Input value={formatCurrency(product?.price ?? 0)} disabled wrapperClassName="bg-canvas" />
          </FormFieldRow>
        </div>

        <div className="flex min-h-[160px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line text-center">
          <IconImage size={32} className="text-ink-muted" />
          <p className="text-sm text-ink-muted">No image</p>
        </div>
      </div>
    </StepCard>
  )
}
