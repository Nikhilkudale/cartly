import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, updateCartItem, removeFromCart } from '../store/cartSlice'

export default function Cart() {
  const dispatch = useDispatch()
  const { cart, loading } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  if (loading && !cart) {
    return <p className="text-gray-500">Loading cart...</p>
  }

  const items = cart?.items || []

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center ring-1 ring-gray-200">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block text-brand-600 hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-xl bg-white p-4 ring-1 ring-gray-200">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.productName}</h3>
                  <p className="text-sm text-gray-500">${Number(item.unitPrice).toFixed(2)} each</p>
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(updateCartItem({ productId: item.productId, quantity: Number(e.target.value) }))
                      }
                      className="w-20 rounded border border-gray-300 px-2 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.productId))}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-bold">${Number(item.subtotal).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="h-fit rounded-xl bg-white p-6 ring-1 ring-gray-200">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="mt-4 flex justify-between text-gray-600">
              <span>Subtotal ({cart.itemCount} items)</span>
              <span>${Number(cart.total).toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 block w-full rounded-lg bg-brand-600 py-3 text-center font-medium text-white hover:bg-brand-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
