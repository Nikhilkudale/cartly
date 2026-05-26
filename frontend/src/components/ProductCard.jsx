import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/format'

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl || 'https://picsum.photos/400/300'}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-brand-600">{product.categoryName}</p>
        <h3 className="mt-1 font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="mt-2 text-lg font-bold text-brand-700">{formatPrice(product.price)}</p>
        <p className="mt-1 text-xs text-gray-500">{product.stock} in stock</p>
      </div>
    </Link>
  )
}
