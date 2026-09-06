import { useEffect, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { StatCard } from '../../components/ui/StatCard'
import { ChartCard } from '../../components/ui/ChartCard'
import { Button } from '../../components/ui/Button'
import { SalesOverviewChart } from '../../components/dashboard/SalesOverviewChart'
import { SalesByBranchChart } from '../../components/dashboard/SalesByBranchChart'
import { TopSellingProducts } from '../../components/dashboard/TopSellingProducts'
import { RecentTransactions } from '../../components/dashboard/RecentTransactions'
import { RecentActivity } from '../../components/dashboard/RecentActivity'
import { IconPlus } from '../../components/ui/icons'
import { dashboardService } from '../../services/dashboardService'
import {
  statCards as fallbackStats,
  salesOverviewByPeriod,
  salesByBranch as fallbackBranch,
  topSellingProducts as fallbackTop,
  recentTransactions as fallbackTx,
  recentActivity as fallbackActivity,
  type PeriodFilter,
  type StatDatum,
} from '../../data/dashboardData'

export function DashboardPage() {
  const [stats, setStats] = useState<StatDatum[]>(fallbackStats)
  const [period, setPeriod] = useState<PeriodFilter>('7d')
  const [overview, setOverview] = useState(salesOverviewByPeriod['7d'])
  const [branch, setBranch] = useState(fallbackBranch)
  const [topProducts, setTopProducts] = useState(fallbackTop)
  const [transactions, setTransactions] = useState(fallbackTx)
  const [activity, setActivity] = useState(fallbackActivity)

  useEffect(() => {
    dashboardService.getStatCards().then(setStats)
    dashboardService.getSalesByBranch().then(setBranch)
    dashboardService.getTopSellingProducts().then(setTopProducts)
    dashboardService.getRecentTransactions().then(setTransactions)
    dashboardService.getRecentActivity().then(setActivity)
  }, [])

  useEffect(() => {
    dashboardService.getSalesOverview(period).then(setOverview)
  }, [period])

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Dashboard"
        subtitle="Monitor your business performance and recent activity."
        action={
          <Button icon={<IconPlus size={16} />} fullWidthOnMobile>
            Add New
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <ChartCard title="Sales Overview">
          <SalesOverviewChart period={period} onPeriodChange={setPeriod} data={overview} />
        </ChartCard>
        <ChartCard title="Top Selling Products">
          <TopSellingProducts items={topProducts} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <ChartCard title="Sales by Branch">
          <SalesByBranchChart data={branch} />
        </ChartCard>
        <ChartCard
          title="Recent Transactions"
          action={
            <Button variant="ghost" className="px-2! py-1! text-xs">
              View All
            </Button>
          }
        >
          <RecentTransactions rows={transactions} />
        </ChartCard>
      </div>

      <ChartCard title="Recent Activity" className="lg:max-w-xl">
        <RecentActivity items={activity} />
      </ChartCard>
    </div>
  )
}
