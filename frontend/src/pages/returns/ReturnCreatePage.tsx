import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { SearchTransactionStep } from '../../components/returns/create/SearchTransactionStep'
import { OriginalTransactionStep } from '../../components/returns/create/OriginalTransactionStep'
import { ReturnDetailsStep, type ReturnLineState } from '../../components/returns/create/ReturnDetailsStep'
import { transactions, paymentMethods, type Transaction, type PaymentMethod } from '../../data/transactionsData'
import { getTransactionItems, getItemsSubtotal, type TransactionItem } from '../../data/transactionItemsData'
import type { ReturnCondition } from '../../data/returnsData'

function emptyLines(items: TransactionItem[]): ReturnLineState[] {
  return items.map((item) => ({ selected: false, returnQty: item.qty, reason: '' }))
}

export function ReturnCreatePage() {
  const [invoiceQuery, setInvoiceQuery] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [items, setItems] = useState<TransactionItem[]>([])
  const [lines, setLines] = useState<ReturnLineState[]>([])
  const [condition, setCondition] = useState<ReturnCondition>('restock')
  const [refundMethod, setRefundMethod] = useState<PaymentMethod>(paymentMethods[0])
  const [notes, setNotes] = useState('')

  const total = getItemsSubtotal(items)
  const refundAmount = lines.reduce(
    (sum, line, index) => sum + (line.selected ? line.returnQty * items[index].price : 0),
    0,
  )

  function handleSearch() {
    const match = transactions.find((row) => row.id.toLowerCase() === invoiceQuery.trim().toLowerCase())

    if (!match) {
      setNotFound(true)
      setTransaction(null)
      setItems([])
      setLines([])
      return
    }

    const matchItems = getTransactionItems(match.id)

    setNotFound(false)
    setTransaction(match)
    setItems(matchItems)
    setLines(emptyLines(matchItems))
    setCondition('restock')
    setRefundMethod(match.payment)
    setNotes('')
  }

  function handleToggleLine(index: number) {
    setLines((prev) => prev.map((line, i) => (i === index ? { ...line, selected: !line.selected } : line)))
  }

  function handleQtyChange(index: number, qty: number) {
    const maxQty = items[index].qty
    const clamped = Math.min(Math.max(qty, 1), maxQty)

    setLines((prev) => prev.map((line, i) => (i === index ? { ...line, returnQty: clamped } : line)))
  }

  function handleReasonChange(index: number, reason: string) {
    setLines((prev) => prev.map((line, i) => (i === index ? { ...line, reason } : line)))
  }

  function handleCancel() {
    window.location.hash = '#/returns-refunds'
  }

  // TODO: submit the return to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/returns-refunds'
  }

  const canSubmit = transaction !== null && lines.some((line) => line.selected)

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <SearchTransactionStep
        query={invoiceQuery}
        onQueryChange={setInvoiceQuery}
        onSearch={handleSearch}
        notFound={notFound}
      />

      {transaction ? <OriginalTransactionStep transaction={transaction} items={items} total={total} /> : null}

      {transaction ? (
        <ReturnDetailsStep
          items={items}
          lines={lines}
          onToggleLine={handleToggleLine}
          onQtyChange={handleQtyChange}
          onReasonChange={handleReasonChange}
          condition={condition}
          onConditionChange={setCondition}
          refundMethod={refundMethod}
          onRefundMethodChange={setRefundMethod}
          refundAmount={refundAmount}
          notes={notes}
          onNotesChange={setNotes}
        />
      ) : null}

      {transaction ? (
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
            Submit Return
          </Button>
        </div>
      ) : null}
    </div>
  )
}
