import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { branches } from '../../../data/transactionsData'
import { categoryNames } from '../../../data/categoriesData'

export type OpnameType = 'Full' | 'Partial'
export type OpnameFormStatus = 'Draft' | 'Completed'

export interface OpnameInformationState {
  branch: string
  date: string
  remarks: string
  opnameType: OpnameType
  category: string
  status: OpnameFormStatus
}

interface OpnameInformationStepProps {
  opnameNo: string
  value: OpnameInformationState
  onChange: <K extends keyof OpnameInformationState>(field: K, value: OpnameInformationState[K]) => void
}

export function OpnameInformationStep({ opnameNo, value, onChange }: OpnameInformationStepProps) {
  const isPartial = value.opnameType === 'Partial'

  return (
    <StepCard step={1} title="Opname Information" subtitle="Fill in the stock opname details.">
      <div className="grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <FormFieldRow
            label="Opname No"
            hint={<span className="shrink-0 whitespace-nowrap text-xs text-ink-muted">(Auto generated)</span>}
          >
            <Input value={opnameNo} disabled wrapperClassName="bg-canvas" />
          </FormFieldRow>

          <FormFieldRow label="Branch" required>
            <Select value={value.branch} onChange={(event) => onChange('branch', event.target.value)}>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </Select>
          </FormFieldRow>

          <FormFieldRow label="Date" required>
            <Input type="date" value={value.date} onChange={(event) => onChange('date', event.target.value)} />
          </FormFieldRow>

          <FormFieldRow label="Remarks" align="start">
            <Textarea
              placeholder="Enter remarks (optional)"
              value={value.remarks}
              onChange={(event) => onChange('remarks', event.target.value)}
            />
          </FormFieldRow>
        </div>

        <div className="flex flex-col gap-4 lg:border-l lg:border-line lg:pl-8">
          <FormFieldRow label="Opname Type">
            <Select value={value.opnameType} onChange={(event) => onChange('opnameType', event.target.value as OpnameType)}>
              <option value="Full">Full Stock Opname</option>
              <option value="Partial">Partial Stock Opname</option>
            </Select>
          </FormFieldRow>
          <p className="-mt-2.5 text-xs text-ink-muted sm:pl-[8.5rem]">Full: all products | Partial: selected category</p>

          <FormFieldRow label="Category (if Partial)">
            <Select value={value.category} disabled={!isPartial} onChange={(event) => onChange('category', event.target.value)}>
              <option value="">All Categories</option>
              {categoryNames.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormFieldRow>

          <FormFieldRow label="Status">
            <Select value={value.status} onChange={(event) => onChange('status', event.target.value as OpnameFormStatus)}>
              <option value="Draft">Draft</option>
              <option value="Completed">Completed</option>
            </Select>
          </FormFieldRow>
        </div>
      </div>
    </StepCard>
  )
}
