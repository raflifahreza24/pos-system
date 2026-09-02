// Business logic for the dashboard screen. Currently backed by local mock
// data (see src/data/dashboardData.ts); swap the bodies below to call
// `apiClient` once the real endpoints exist — pages/components never talk
// to the API directly.
import {
  statCards,
  salesOverviewByPeriod,
  salesByBranch,
  topSellingProducts,
  recentTransactions,
  recentActivity,
  type PeriodFilter,
} from '../data/dashboardData'

function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export const dashboardService = {
  getStatCards: () => delay(statCards),
  getSalesOverview: (period: PeriodFilter) => delay(salesOverviewByPeriod[period]),
  getSalesByBranch: () => delay(salesByBranch),
  getTopSellingProducts: () => delay(topSellingProducts),
  getRecentTransactions: () => delay(recentTransactions),
  getRecentActivity: () => delay(recentActivity),
}
