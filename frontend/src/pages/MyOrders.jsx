import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../store/orderSlice'

function StatusPill({ status }) {
  const color =
    status === 'DELIVERED'
      ? 'bg-green-100 text-green-800'
      : status === 'SHIPPED'
        ? 'bg-blue-100 text-blue-800'
        : status === 'CANCELLED'
          ? 'bg-red-100 text-red-800'
          : status === 'CONFIRMED'
            ? 'bg-amber-100 text-amber-800'
            : 'bg-gray-100 text-gray-800'

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>{status}</span>
}

export default function MyOrders() {
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="mt-1 text-gray-600">Track your recent purchases and payment status.</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center ring-1 ring-gray-200">
          <p className="text-gray-600">You have not placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl bg-white p-5 ring-1 ring-gray-200">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="mt-1 font-semibold">${Number(order.totalAmount).toFixed(2)}</p>
                  <p className="mt-1 text-sm text-gray-600">{order.shippingAddress}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status={order.status} />
                  <span className="text-xs text-gray-500">
                    {order.payment?.status ? `Payment: ${order.payment.status}` : 'Payment: PENDING'}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <p className="mb-2 text-sm font-semibold text-gray-900">Items</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-4">
                      <span className="line-clamp-1">
                        {item.productName} <span className="text-gray-500">x{item.quantity}</span>
                      </span>
                      <span className="font-medium">${Number(item.subtotal).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

