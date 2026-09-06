import { ThemeProvider } from './context/ThemeContext'
import { SidebarProvider } from './context/SidebarContext'
import { MainLayout } from './components/layout/MainLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { PointOfSalePage } from './pages/point-of-sale/PointOfSalePage'
import { TransactionsPage } from './pages/TransactionsPage'
import { ReturnsPage } from './pages/returns/ReturnsPage'
import { ReturnCreatePage } from './pages/returns/ReturnCreatePage'
import { CustomersPage } from './pages/customers/CustomersPage'
import { CustomerCreatePage } from './pages/customers/CustomerCreatePage'
import { ProductsPage } from './pages/products/ProductsPage'
import { ProductCreatePage } from './pages/products/ProductCreatePage'
import { CategoriesPage } from './pages/categories/CategoriesPage'
import { CategoryCreatePage } from './pages/categories/CategoryCreatePage'
import { PriceDiscountsPage } from './pages/prices/PriceDiscountsPage'
import { PriceDiscountCreatePage } from './pages/prices/PriceDiscountCreatePage'
import { InventoryPage } from './pages/InventoryPage'
import { StockMovementsPage } from './pages/StockMovementsPage'
import { StockTransferPage } from './pages/stock-transfer/StockTransferPage'
import { StockTransferCreatePage } from './pages/stock-transfer/StockTransferCreatePage'
import { StockOpnamePage } from './pages/stock-opname/StockOpnamePage'
import { StockOpnameCreatePage } from './pages/stock-opname/StockOpnameCreatePage'
import { LowStockPage } from './pages/LowStockPage'
import { SuppliersPage } from './pages/suppliers/SuppliersPage'
import { SupplierCreatePage } from './pages/suppliers/SupplierCreatePage'
import { PurchaseOrdersPage } from './pages/purchase-order/PurchaseOrdersPage'
import { PurchaseOrderCreatePage } from './pages/purchase-order/PurchaseOrderCreatePage'
import { GoodsReceivingPage } from './pages/good-receiving/GoodsReceivingPage'
import { GoodsReceivingCreatePage } from './pages/good-receiving/GoodsReceivingCreatePage'
import { UsersEmployeesPage } from './pages/users/UsersEmployeesPage'
import { UserCreatePage } from './pages/users/UserCreatePage'
import { RolesPermissionsPage } from './pages/roles/RolesPermissionsPage'
import { RoleCreatePage } from './pages/roles/RoleCreatePage'
import { ShiftsPage } from './pages/shifts/ShiftsPage'
import { OpenShiftPage } from './pages/shifts/OpenShiftPage'
import { ReportsPage } from './pages/ReportsPage'
import { BranchesPage } from './pages/branches/BranchesPage'
import { BranchCreatePage } from './pages/branches/BranchCreatePage'
import { SettingsPage } from './pages/SettingsPage'
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
    case '/returns-refunds/create':
      return <ReturnCreatePage />
    case '/customers':
      return <CustomersPage />
    case '/customers/create':
      return <CustomerCreatePage />
    case '/products':
      return <ProductsPage />
    case '/products/create':
      return <ProductCreatePage />
    case '/categories':
      return <CategoriesPage />
    case '/categories/create':
      return <CategoryCreatePage />
    case '/price-discounts':
      return <PriceDiscountsPage />
    case '/price-discounts/create':
      return <PriceDiscountCreatePage />
    case '/inventory':
      return <InventoryPage />
    case '/stock-movements':
      return <StockMovementsPage />
    case '/stock-transfer':
      return <StockTransferPage />
    case '/stock-transfer/create':
      return <StockTransferCreatePage />
    case '/stock-opname':
      return <StockOpnamePage />
    case '/stock-opname/create':
      return <StockOpnameCreatePage />
    case '/low-stock':
      return <LowStockPage />
    case '/suppliers':
      return <SuppliersPage />
    case '/suppliers/create':
      return <SupplierCreatePage />
    case '/purchase-orders':
      return <PurchaseOrdersPage />
    case '/purchase-orders/create':
      return <PurchaseOrderCreatePage />
    case '/goods-receiving':
      return <GoodsReceivingPage />
    case '/goods-receiving/create':
      return <GoodsReceivingCreatePage />
    case '/users-employees':
      return <UsersEmployeesPage />
    case '/users-employees/create':
      return <UserCreatePage />
    case '/roles-permissions':
      return <RolesPermissionsPage />
    case '/roles-permissions/create':
      return <RoleCreatePage />
    case '/shifts':
      return <ShiftsPage />
    case '/open-shift':
      return <OpenShiftPage />
    case '/reports':
      return <ReportsPage />
    case '/branches':
      return <BranchesPage />
    case '/branches/create':
      return <BranchCreatePage />
    case '/settings':
      return <SettingsPage />
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
