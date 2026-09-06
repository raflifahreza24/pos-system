import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { formatDate, formatCurrency } from '../../../utils/formatters'
import type { PurchaseOrder } from '../../../data/purchaseOrdersData'

export interface ReceivingInformationState {
  poNo: string
  receivingDate: string
  receivedBy: string
  notes: string
}

interface ReceivingInformationStepProps {
  grNo: string
  purchaseOrders: PurchaseOrder[]
  selectedPo: PurchaseOrder | null
  value: ReceivingInformationState
  onChange: <K extends keyof ReceivingInformationState>(field: K, value: ReceivingInformationState[K]) => void
}

function PoInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-32 shrink-0 font-medium text-ink">{label}</span>
      <span className="truncate text-ink-muted">: {value}</span>
    </div>
  )
}

export function ReceivingInformationStep({ grNo, purchaseOrders, selectedPo, value, onChange }: ReceivingInformationStepProps) {
  return (
    <StepCard step={1} title="Receiving Information" subtitle="Fill in the receiving details.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <FormFieldRow label="GR No" hint={<span className="shrink-0 whitespace-nowrap text-xs text-ink-muted">(Auto generated)</span>}>
            <Input value={grNo} disabled wrapperClassName="bg-canvas" />
          </FormFieldRow>

          <FormFieldRow label="PO No" required>
            <Select value={value.poNo} onChange={(event) => onChange('poNo', event.target.value)}>
              <option value="">Search or select PO...</option>
              {purchaseOrders.map((po) => (
                <option key={po.id} value={po.poNo}>
                  {po.poNo} - {po.supplier}
                </option>
              ))}
            </Select>
          </FormFieldRow>

          <FormFieldRow label="Supplier">
            <Input value={selectedPo?.supplier ?? '-'} disabled wrapperClassName="bg-canvas" />
          </FormFieldRow>

          <FormFieldRow label="Receiving Date" required>
            <Input type="date" value={value.receivingDate} onChange={(event) => onChange('receivingDate', event.target.value)} />
          </FormFieldRow>

          <FormFieldRow label="Received By" required>
            <Input value={value.receivedBy} onChange={(event) => onChange('receivedBy', event.target.value)} />
          </FormFieldRow>

          <FormFieldRow label="Notes" align="start">
            <Textarea placeholder="Enter notes (optional)" value={value.notes} onChange={(event) => onChange('notes', event.target.value)} />
          </FormFieldRow>
        </div>

        <div className="flex flex-col gap-3 rounded-xl bg-canvas p-4">
          <h3 className="text-sm font-semibold text-ink">Purchase Order Information</h3>
          <div className="flex flex-col gap-2">
            <PoInfoRow label="PO No" value={selectedPo?.poNo ?? '-'} />
            <PoInfoRow label="Order Date" value={selectedPo ? formatDate(selectedPo.date) : '-'} />
            <PoInfoRow label="Supplier" value={selectedPo?.supplier ?? '-'} />
            <PoInfoRow label="Expected Delivery" value={selectedPo ? formatDate(selectedPo.expectedDeliveryDate) : '-'} />
            <PoInfoRow label="Total Order" value={selectedPo ? formatCurrency(selectedPo.total) : '-'} />
          </div>
        </div>
      </div>
    </StepCard>
  )
}
