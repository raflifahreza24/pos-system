import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { branches } from '../../../data/transactionsData'

export interface TransferInformationState {
  date: string
  fromBranch: string
  toBranch: string
  notes: string
  referenceNo: string
}

interface TransferInformationStepProps {
  transferNo: string
  value: TransferInformationState
  onChange: <K extends keyof TransferInformationState>(field: K, value: TransferInformationState[K]) => void
}

export function TransferInformationStep({ transferNo, value, onChange }: TransferInformationStepProps) {
  return (
    <StepCard step={1} title="Transfer Information" subtitle="Fill in the transfer details.">
      <div className="grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <FormFieldRow
            label="Transfer No"
            hint={<span className="shrink-0 whitespace-nowrap text-xs text-ink-muted">(Auto generated)</span>}
          >
            <Input value={transferNo} disabled wrapperClassName="bg-canvas" />
          </FormFieldRow>

          <FormFieldRow label="Date" required>
            <Input type="date" value={value.date} onChange={(event) => onChange('date', event.target.value)} />
          </FormFieldRow>

          <FormFieldRow label="From Branch" required>
            <Select value={value.fromBranch} onChange={(event) => onChange('fromBranch', event.target.value)}>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </Select>
          </FormFieldRow>

          <FormFieldRow label="To Branch" required>
            <Select value={value.toBranch} onChange={(event) => onChange('toBranch', event.target.value)}>
              <option value="">Select branch</option>
              {branches
                .filter((branch) => branch !== value.fromBranch)
                .map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
            </Select>
          </FormFieldRow>
        </div>

        <div className="flex flex-col gap-4 lg:border-l lg:border-line lg:pl-8">
          <FormFieldRow label="Notes" align="start">
            <Textarea
              placeholder="Enter notes (optional)"
              value={value.notes}
              onChange={(event) => onChange('notes', event.target.value)}
            />
          </FormFieldRow>

          <FormFieldRow label="Reference No">
            <Input
              placeholder="Enter reference number (optional)"
              value={value.referenceNo}
              onChange={(event) => onChange('referenceNo', event.target.value)}
            />
          </FormFieldRow>
        </div>
      </div>
    </StepCard>
  )
}
