import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../store/cartSlice'
import { placeOrder, clearLastOrder } from '../store/orderSlice'
import { paymentApi } from '../api/services'

export default function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart } = useSelector((state) => state.cart)
  const { loading, error, lastOrder } = useSelector((state) => state.orders)
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD')
  const [step, setStep] = useState('form')
  const [paymentResult, setPaymentResult] = useState(null)

  useEffect(() => {
    dispatch(fetchCart())
    return () => dispatch(clearLastOrder())
  }, [dispatch])

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    const result = await dispatch(placeOrder({ shippingAddress: address, paymentMethod }))
    if (placeOrder.fulfilled.match(result)) {
      setStep('payment')
    }
  }

  const handlePayment = async () => {
    if (!lastOrder) return
    try {
      const { data } = await paymentApi.process({ orderId: lastOrder.id, paymentMethod })
      setPaymentResult(data)
      setStep('done')
    } catch {
      setPaymentResult({ status: 'FAILED' })
      setStep('done')
    }
  }

  if (!cart?.items?.length) {
    return (
      <div className="text-center">
        <p className="text-gray-600">No items to checkout.</p>
        <button type="button" onClick={() => navigate('/')} className="mt-4 text-brand-600 hover:underline">
          Go shopping
        </button>
      </div>
    )
  }

  if (step === 'done') {
    return (
      <div className="mx-auto max-w-lg rounded-xl bg-white p-8 text-center ring-1 ring-gray-200">
        <h1 className="text-2xl font-bold text-green-700">Order Complete</h1>
        <p className="mt-2 text-gray-600">
          Payment status: <strong>{paymentResult?.status}</strong>
        </p>
        {paymentResult?.transactionId && (
          <p className="mt-1 text-sm text-gray-500">Transaction: {paymentResult.transactionId}</p>
        )}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 rounded-lg bg-brand-600 px-6 py-2 text-white hover:bg-brand-700"
        >
          Back to Home
        </button>
      </div>
    )
  }

  if (step === 'payment' && lastOrder) {
    return (
      <div className="mx-auto max-w-lg rounded-xl bg-white p-8 ring-1 ring-gray-200">
        <h1 className="text-2xl font-bold">Confirm Payment</h1>
        <p className="mt-2 text-gray-600">Order #{lastOrder.id} — ${Number(lastOrder.totalAmount).toFixed(2)}</p>
        <p className="mt-4 text-sm text-gray-500">Mock payment gateway (always succeeds in demo).</p>
        <button
          type="button"
          onClick={handlePayment}
          className="mt-6 w-full rounded-lg bg-brand-600 py-3 font-medium text-white hover:bg-brand-700"
        >
          Pay Now
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="space-y-4 rounded-xl bg-white p-6 ring-1 ring-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
          <textarea
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="123 Main St, City, State, ZIP"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="DEBIT_CARD">Debit Card</option>
            <option value="PAYPAL">PayPal</option>
          </select>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${Number(cart.total).toFixed(2)}</span>
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-600 py-3 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}
