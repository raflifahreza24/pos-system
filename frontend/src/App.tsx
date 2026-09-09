import { ThemeProvider } from './context/ThemeContext'
import { SidebarProvider } from './context/SidebarContext'
import { ToastProvider } from './context/ToastContext'
import { MainLayout } from './components/layout/MainLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { PointOfSalePage } from './pages/point-of-sale/PointOfSalePage'
import { TransactionsPage } from './pages/transaction/TransactionsPage'
import { ReturnsPage } from './pages/returns/ReturnsPage'
import { ReturnCreatePage } from './pages/returns/ReturnCreatePage'
import { CustomersPage } from './pages/customers/CustomersPage'
import { CustomerCreatePage } from './pages/customers/CustomerCreatePage'
import { CustomerDetailPage } from './pages/customers/CustomerDetailPage'
import { CustomerEditPage } from './pages/customers/CustomerEditPage'
import { ProductsPage } from './pages/products/ProductsPage'
import { ProductCreatePage } from './pages/products/ProductCreatePage'
import { CategoriesPage } from './pages/categories/CategoriesPage'
import { CategoryCreatePage } from './pages/categories/CategoryCreatePage'
import { PriceDiscountsPage } from './pages/prices/PriceDiscountsPage'
import { PriceDiscountCreatePage } from './pages/prices/PriceDiscountCreatePage'
import { PriceDetailPage } from './pages/prices/PriceDetailPage'
import { PriceEditPage } from './pages/prices/PriceEditPage'
import { DiscountDetailPage } from './pages/prices/discount/DiscountDetailPage'
import { DiscountEditPage } from './pages/prices/discount/DiscountEditPage'
import { InventoryPage } from './pages/inventory/InventoryPage'
import { StockMovementsPage } from './pages/stock-movement/StockMovementsPage'
import { StockTransferPage } from './pages/stock-transfer/StockTransferPage'
import { StockTransferCreatePage } from './pages/stock-transfer/StockTransferCreatePage'
import { StockOpnamePage } from './pages/stock-opname/StockOpnamePage'
import { StockOpnameCreatePage } from './pages/stock-opname/StockOpnameCreatePage'
import { LowStockPage } from './pages/low-stock/LowStockPage'
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
import { ReportsPage } from './pages/reports/ReportsPage'
import { BranchesPage } from './pages/branches/BranchesPage'
import { BranchCreatePage } from './pages/branches/BranchCreatePage'
import { SettingsPage } from './pages/settings/SettingsPage'
import { ProfilePage } from './pages/profile/ProfilePage'
import { PreferencesPage } from './pages/preferences/PreferencesPage'
import { LoginPage } from './pages/auth/LoginPage'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { useHashRoute } from './hooks/useHashRoute'
import { navItems } from './data/navigation'

function AppRoutes() {
  const path = useHashRoute()

  // The route table below is a plain switch on exact paths (see
  // useHashRoute's own comment) — the one exception is this customer
  // detail page, which needs the `:id` segment out of the path.
  const customerEditId = /^\/customers\/([^/]+)\/edit$/.exec(path)?.[1]
  if (customerEditId) {
    return <CustomerEditPage customerId={customerEditId} />
  }

  const customerDetailId = /^\/customers\/(?!create$)([^/]+)$/.exec(path)?.[1]
  if (customerDetailId) {
    return <CustomerDetailPage customerId={customerDetailId} />
  }

  const priceEditId = /^\/price-discounts\/prices\/([^/]+)\/edit$/.exec(path)?.[1]
  if (priceEditId) {
    return <PriceEditPage entryId={priceEditId} />
  }

  const priceDetailId = /^\/price-discounts\/prices\/([^/]+)$/.exec(path)?.[1]
  if (priceDetailId) {
    return <PriceDetailPage entryId={priceDetailId} />
  }

  const discountEditId = /^\/price-discounts\/discounts\/([^/]+)\/edit$/.exec(path)?.[1]
  if (discountEditId) {
    return <DiscountEditPage entryId={discountEditId} />
  }

  const discountDetailId = /^\/price-discounts\/discounts\/([^/]+)$/.exec(path)?.[1]
  if (discountDetailId) {
    return <DiscountDetailPage entryId={discountDetailId} />
  }

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
    case '/profile':
      return <ProfilePage />
    case '/preferences':
      return <PreferencesPage />
    default: {
      const title = navItems.find((item) => item.href === `#${path}`)?.label ?? 'Page'
      return <ComingSoonPage title={title} />
    }
  }
}

function App() {
  // /login and /reset-password are intercepted here, before MainLayout,
  // so they render full-screen with no sidebar/topbar — every other
  // route still goes through AppRoutes' switch below, unchanged.
  const path = useHashRoute()

  if (path === '/login') {
    return (
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    )
  }

  if (path === '/reset-password') {
    return (
      <ThemeProvider>
        <ResetPasswordPage />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <SidebarProvider>
        <ToastProvider>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </ToastProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
