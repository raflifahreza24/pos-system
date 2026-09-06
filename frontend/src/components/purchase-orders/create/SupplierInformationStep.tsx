import { Button } from '../../ui/Button'
import { StepCard } from '../../ui/StepCard'
import { IconExternalLink } from '../../ui/icons'
import type { Supplier } from '../../../data/suppliersData'

interface SupplierInformationStepProps {
  supplier: Supplier | null
}

function SupplierRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-32 shrink-0 font-medium text-ink">{label}</span>
      <span className="truncate text-ink-muted">: {value}</span>
    </div>
  )
}

export function SupplierInformationStep({ supplier }: SupplierInformationStepProps) {
  return (
    <StepCard step={2} title="Supplier Information" subtitle="Supplier details will be filled automatically.">
      <div className="flex flex-col gap-2 rounded-xl bg-canvas p-4">
        <SupplierRow label="Supplier Name" value={supplier?.name ?? '-'} />
        <SupplierRow label="Contact Person" value={supplier?.contactPerson ?? '-'} />
        <SupplierRow label="Phone" value={supplier?.phone ?? '-'} />
        <SupplierRow label="Email" value={supplier?.email ?? '-'} />
        <SupplierRow label="Address" value={supplier?.address ?? '-'} />
      </div>

      {/* TODO: link to the supplier detail page once it exists. */}
      <Button variant="secondary" icon={<IconExternalLink size={15} />} disabled={!supplier}>
        View Supplier Details
      </Button>
    </StepCard>
  )
}
