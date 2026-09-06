import { StepCard } from '../../ui/StepCard'
import { ImageDropzone } from '../../ui/ImageDropzone'

interface ProductImageStepProps {
  value: File | null
  onChange: (file: File | null) => void
}

export function ProductImageStep({ value, onChange }: ProductImageStepProps) {
  return (
    <StepCard step={4} title="Product Image">
      <ImageDropzone value={value} onChange={onChange} previewAlt="Product preview" />
    </StepCard>
  )
}
