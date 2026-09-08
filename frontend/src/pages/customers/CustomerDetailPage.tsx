import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { CustomerInformationCard } from '../../components/customers/detail/CustomerInformationCard'
import { LoyaltyInformationCard } from '../../components/customers/detail/LoyaltyInformationCard'
import { PurchaseSummaryCard } from '../../components/customers/detail/PurchaseSummaryCard'
import { RecentTransactionsCard } from '../../components/customers/detail/RecentTransactionsCard'
import { IconChevronLeft, IconEdit } from '../../components/ui/icons'
import { customers } from '../../data/customersData'
import { getCustomerPurchaseSummary, getCustomerRecentTransactions } from '../../data/customerTransactionsData'

interface CustomerDetailPageProps {
  customerId: string
}

export function CustomerDetailPage({ customerId }: CustomerDetailPageProps) {
  const customer = customers.find((entry) => entry.id === customerId)

  function handleBack() {
    window.location.hash = '#/customers'
  }

  function handleEdit() {
    window.location.hash = `#/customers/${customerId}/edit`
  }

  // The Transactions page doesn't support filtering by customer yet, so
  // this opens the full list rather than a dead button.
  function handleViewAllTransactions() {
    window.location.hash = '#/transactions'
  }

  if (!customer) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-ink-muted">Customer "{customerId}" was not found.</p>
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleBack}>
          Back
        </Button>
      </div>
    )
  }

  const purchaseSummary = getCustomerPurchaseSummary(customer.id)
  const recentTransactions = getCustomerRecentTransactions(customer.id)

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Customer Detail"
        action={
          <div className="flex gap-2.5">
            <Button variant="secondary" icon={<IconEdit size={16} />} onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleBack}>
              Back
            </Button>
          </div>
        }
      />

      <CustomerInformationCard customer={customer} />
      <LoyaltyInformationCard totalPoints={customer.totalPoints} memberSince={customer.joinDate} />
      <PurchaseSummaryCard summary={purchaseSummary} />
      <RecentTransactionsCard transactions={recentTransactions} onViewAll={handleViewAllTransactions} />
    </div>
  )
}
