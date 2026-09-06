import { StepCard } from '../../ui/StepCard'
import { cn } from '../../../utils/formatters'
import type { PriceDiscountType } from '../../../data/priceDiscountsData'

interface TypeStepProps {
  value: PriceDiscountType
  onChange: (type: PriceDiscountType) => void
}

const TYPE_OPTIONS: { value: PriceDiscountType; title: string; description: string }[] = [
  { value: 'Price', title: 'Price', description: 'Set a specific selling price for this product' },
  { value: 'Discount', title: 'Discount', description: 'Set a discount (percentage or fixed amount) for this product' },
]

export function TypeStep({ value, onChange }: TypeStepProps) {
  return (
    <StepCard step={2} title="Type" subtitle="Choose what you want to set.">
      <div className="flex flex-col gap-3">
        {TYPE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors duration-150',
              value === option.value ? 'border-primary bg-primary-light/40' : 'border-line hover:bg-canvas',
            )}
          >
            <input
              type="radio"
              name="price-discount-type"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-1 h-4 w-4 text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <span>
              <span className="block text-sm font-semibold text-ink">{option.title}</span>
              <span className="block text-sm text-ink-muted">{option.description}</span>
            </span>
          </label>
        ))}
      </div>
    </StepCard>
  )
}
