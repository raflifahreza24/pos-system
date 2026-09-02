import { ThemeProvider } from './context/ThemeContext'
import { SidebarProvider } from './context/SidebarContext'
import { MainLayout } from './components/layout/MainLayout'
import { DashboardPage } from './pages/DashboardPage'
import { PointOfSalePage } from './pages/PointOfSalePage'
import { TransactionsPage } from './pages/TransactionsPage'
import { ReturnsPage } from './pages/ReturnsPage'
import { CustomersPage } from './pages/CustomersPage'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { useHashRoute } from './hooks/useHashRoute'
import { navItems } from './data/navigation'

function AppRoutes() {
  const path = useHashRoute()

  switch (path) {
    case '/dashboard':
      return <DashboardPage />
    case '/point-of-sale':
      return <PointOfSalePage />
    case '/transactions':
      return <TransactionsPage />
    case '/returns-refunds':
      return <ReturnsPage />
    case '/customers':
      return <CustomersPage />
    default: {
      const title = navItems.find((item) => item.href === `#${path}`)?.label ?? 'Page'
      return <ComingSoonPage title={title} />
    }
  }
}

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
