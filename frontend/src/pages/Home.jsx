import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, fetchCategories, setCategoryFilter } from '../store/catalogSlice'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const dispatch = useDispatch()
  const { products, categories, loading, selectedCategoryId } = useSelector((state) => state.catalog)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchProducts(selectedCategoryId))
  }, [dispatch, selectedCategoryId])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shop our collection</h1>
        <p className="mt-2 text-gray-600">Browse products across electronics, clothing, and home essentials.</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => dispatch(setCategoryFilter(null))}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            !selectedCategoryId ? 'bg-brand-600 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => dispatch(setCategoryFilter(cat.id))}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              selectedCategoryId === cat.id ? 'bg-brand-600 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
