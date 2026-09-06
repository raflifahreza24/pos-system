import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import {
  CashierInformationStep,
  type CashierInformationState,
} from '../../components/shifts/create/CashierInformationStep'
import { ShiftDetailsStep, type ShiftDetailsState } from '../../components/shifts/create/ShiftDetailsStep'
import { ConfirmationStep } from '../../components/shifts/create/ConfirmationStep'
import { ShiftSummaryPanel } from '../../components/shifts/create/ShiftSummaryPanel'

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function now(): string {
  return new Date().toTimeString().slice(0, 5)
}

const initialCashierInfo: CashierInformationState = {
  cashierId: '',
  branch: '',
}

const initialShiftDetails: ShiftDetailsState = {
  openDate: today(),
  openTime: now(),
  startingCash: 0,
  notes: '',
}

export function OpenShiftPage() {
  const [cashierInfo, setCashierInfo] = useState(initialCashierInfo)
  const [shiftDetails, setShiftDetails] = useState(initialShiftDetails)

  function updateCashierInfo<K extends keyof CashierInformationState>(field: K, value: CashierInformationState[K]) {
    setCashierInfo((prev) => ({ ...prev, [field]: value }))
  }

  function updateShiftDetails<K extends keyof ShiftDetailsState>(field: K, value: ShiftDetailsState[K]) {
    setShiftDetails((prev) => ({ ...prev, [field]: value }))
  }

  function handleCancel() {
    window.location.hash = '#/shifts'
  }

  // TODO: submit the new shift to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/shifts'
  }

  const canSubmit =
    cashierInfo.cashierId !== '' &&
    cashierInfo.branch !== '' &&
    shiftDetails.openDate !== '' &&
    shiftDetails.openTime !== '' &&
    shiftDetails.startingCash > 0

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="flex flex-col gap-5">
          <CashierInformationStep value={cashierInfo} onChange={updateCashierInfo} />
          <ShiftDetailsStep value={shiftDetails} onChange={updateShiftDetails} />
          <ConfirmationStep />
        </div>

        <ShiftSummaryPanel
          cashierId={cashierInfo.cashierId}
          branch={cashierInfo.branch}
          openDate={shiftDetails.openDate}
          openTime={shiftDetails.openTime}
          startingCash={shiftDetails.startingCash}
          notes={shiftDetails.notes}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Open Shift
        </Button>
      </div>
    </div>
  )
}
