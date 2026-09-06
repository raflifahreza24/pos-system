import type { ReactNode } from 'react'
import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { FormField } from '../../ui/FormField'
import { StepCard } from '../../ui/StepCard'
import { customerTypes, genders, customerStatuses } from '../../../data/customersData'
import type { Status } from '../../ui/StatusBadge'

export interface BasicInformationState {
  name: string
  phone: string
  email: string
  dateOfBirth: string
  customerType: string
  gender: string
  status: Status
}

interface BasicInformationStepProps {
  value: BasicInformationState
  onChange: <K extends keyof BasicInformationState>(field: K, value: BasicInformationState[K]) => void
  headerAction?: ReactNode
}

export function BasicInformationStep({ value, onChange, headerAction }: BasicInformationStepProps) {
  return (
    <StepCard
      step={1}
      title="Basic Information"
      subtitle="Enter the customer's basic details."
      headerAction={headerAction}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Customer Name" required>
          <Input
            placeholder="Enter customer name"
            value={value.name}
            onChange={(event) => onChange('name', event.target.value)}
          />
        </FormField>

        <FormField label="Customer Code">
          <Input value="" placeholder="Auto generated (optional)" disabled wrapperClassName="bg-canvas" />
        </FormField>

        <FormField label="Phone" required>
          <Input
            placeholder="Enter phone number"
            value={value.phone}
            onChange={(event) => onChange('phone', event.target.value)}
          />
        </FormField>

        <FormField label="Customer Type">
          <Select value={value.customerType} onChange={(event) => onChange('customerType', event.target.value)}>
            {customerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Email">
          <Input
            type="email"
            placeholder="Enter email address"
            value={value.email}
            onChange={(event) => onChange('email', event.target.value)}
          />
        </FormField>

        <FormField label="Gender">
          <Select value={value.gender} onChange={(event) => onChange('gender', event.target.value)}>
            <option value="">Select gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Date of Birth">
          <Input
            type="date"
            value={value.dateOfBirth}
            onChange={(event) => onChange('dateOfBirth', event.target.value)}
          />
        </FormField>

        <FormField label="Status">
          <Select value={value.status} onChange={(event) => onChange('status', event.target.value as Status)}>
            {customerStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </FormField>
      </div>
    </StepCard>
  )
}
