import { useMemo, useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { Input } from '../components/ui/Input'
import { ProductGrid } from '../components/pos/ProductGrid'
import { CartPanel } from '../components/pos/CartPanel'
import { IconSearch } from '../components/ui/icons'
import { useCart } from '../hooks/useCart'
import { products } from '../data/posData'

export function PointOfSalePage() {
  const [query, setQuery] = useState('')
  const cart = useCart()

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter((product) => product.name.toLowerCase().includes(q))
  }, [query])

  function handlePay() {
    // TODO: send the cart to the transactions service once the backend endpoint exists.
    cart.clear()
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Point of Sale" subtitle="Scan or search a product to add it to the cart." />

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-4">
          <Input
            icon={<IconSearch size={17} className="text-ink-muted" />}
            placeholder="Scan / Search product..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ProductGrid products={filteredProducts} onAdd={cart.addItem} />
        </div>

        <div className="lg:sticky lg:top-0">
          <CartPanel
            lines={cart.lines}
            itemCount={cart.itemCount}
            subtotal={cart.subtotal}
            discount={cart.discount}
            tax={cart.tax}
            total={cart.total}
            onIncrement={cart.incrementItem}
            onDecrement={cart.decrementItem}
            onRemove={cart.removeItem}
            onCancel={cart.clear}
            onPay={handlePay}
          />
        </div>
      </div>
    </div>
  )
}
