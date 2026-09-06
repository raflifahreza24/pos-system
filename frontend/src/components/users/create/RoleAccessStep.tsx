import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { activeInactiveStatuses, type Status } from '../../ui/StatusBadge'
import { roles } from '../../../data/rolesPermissionsData'
import { branches } from '../../../data/transactionsData'

export interface RoleAccessState {
  role: string
  branch: string
  status: Status
  employeeId: string
  position: string
}

interface RoleAccessStepProps {
  value: RoleAccessState
  onChange: <K extends keyof RoleAccessState>(field: K, value: RoleAccessState[K]) => void
}

export function RoleAccessStep({ value, onChange }: RoleAccessStepProps) {
  return (
    <StepCard step={2} title="Role & Access" subtitle="Set the role and branch access for this user.">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Role" required>
          <Select value={value.role} onChange={(event) => onChange('role', event.target.value)}>
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </Select>
        </FormFieldRow>

        <FormFieldRow label="Branch" required>
          <Select value={value.branch} onChange={(event) => onChange('branch', event.target.value)}>
            <option value="">Select branch</option>
            <option value="All">All Branches</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </Select>
        </FormFieldRow>

        <FormFieldRow label="Status" required>
          <Select value={value.status} onChange={(event) => onChange('status', event.target.value as Status)}>
            {activeInactiveStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </FormFieldRow>

        <FormFieldRow label="Employee ID">
          <Input placeholder="Enter employee ID (optional)" value={value.employeeId} onChange={(event) => onChange('employeeId', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Position">
          <Input placeholder="Enter position (optional)" value={value.position} onChange={(event) => onChange('position', event.target.value)} />
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
