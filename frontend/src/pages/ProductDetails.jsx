import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, clearSelectedProduct } from '../store/catalogSlice'
import { addToCart } from '../store/cartSlice'
import { formatPrice } from '../utils/format'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedProduct: product } = useSelector((state) => state.catalog)
  const { token } = useSelector((state) => state.auth)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(fetchProductById(id))
    return () => dispatch(clearSelectedProduct())
  }, [dispatch, id])

  const handleAddToCart = async () => {
    if (!token) {
      navigate('/login')
      return
    }
    await dispatch(addToCart({ productId: Number(id), quantity }))
    setMessage('Added to cart!')
    setTimeout(() => setMessage(''), 2000)
  }

  if (!product) {
    return <p className="text-gray-500">Loading product...</p>
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <img
          src={product.imageUrl || 'https://picsum.photos/600/400'}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="text-sm font-medium uppercase text-brand-600">{product.categoryName}</p>
        <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
        <p className="mt-4 text-2xl font-bold text-brand-700">{formatPrice(product.price)}</p>
        <p className="mt-4 text-gray-600">{product.description}</p>
        <p className="mt-2 text-sm text-gray-500">{product.stock} available</p>

        <div className="mt-6 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Qty
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="ml-2 w-20 rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="rounded-lg bg-brand-600 px-6 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>
        {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
      </div>
    </div>
  )
}
