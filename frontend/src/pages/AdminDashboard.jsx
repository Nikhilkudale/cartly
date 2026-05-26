import { useEffect, useState } from 'react'
import { productApi, categoryApi, catalogApi } from '../api/services'

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  stock: '',
  imageUrl: '',
  categoryId: '',
}

const emptyCategory = { name: '', description: '' }

export default function AdminDashboard() {
  const [tab, setTab] = useState('products')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productForm, setProductForm] = useState(emptyProduct)
  const [categoryForm, setCategoryForm] = useState(emptyCategory)
  const [editingProductId, setEditingProductId] = useState(null)
  const [editingCategoryId, setEditingCategoryId] = useState(null)
  const [message, setMessage] = useState('')

  const load = async () => {
    const [pRes, cRes] = await Promise.all([productApi.adminGetAll(), categoryApi.getAll()])
    setProducts(pRes.data)
    setCategories(cRes.data)
  }

  useEffect(() => {
    load()
  }, [])

  const showMessage = (text) => {
    setMessage(text)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      categoryId: Number(productForm.categoryId),
    }
    if (editingProductId) {
      await productApi.update(editingProductId, payload)
      showMessage('Product updated')
    } else {
      await productApi.create(payload)
      showMessage('Product created')
    }
    setProductForm(emptyProduct)
    setEditingProductId(null)
    load()
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    if (editingCategoryId) {
      await categoryApi.update(editingCategoryId, categoryForm)
      showMessage('Category updated')
    } else {
      await categoryApi.create(categoryForm)
      showMessage('Category created')
    }
    setCategoryForm(emptyCategory)
    setEditingCategoryId(null)
    load()
  }

  const editProduct = (p) => {
    setEditingProductId(p.id)
    setProductForm({
      name: p.name,
      description: p.description || '',
      price: p.price,
      stock: p.stock,
      imageUrl: p.imageUrl || '',
      categoryId: p.categoryId,
    })
  }

  const editCategory = (c) => {
    setEditingCategoryId(c.id)
    setCategoryForm({ name: c.name, description: c.description || '' })
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Admin Dashboard</h1>
      <p className="mb-4 text-gray-600">Manage products and categories.</p>
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={async () => {
            const { data } = await catalogApi.importDemo()
            showMessage(`Imported: ${data.added} added, ${data.updated} updated, ${data.skipped} skipped`)
            load()
          }}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          Import Flipkart-style demo catalog (40+ products)
        </button>
        <p className="self-center text-xs text-gray-500">
          Legal demo data with matched images — not scraped from Flipkart.
        </p>
        <label className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Upload CSV
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              const { data } = await catalogApi.importCsv(file)
              showMessage(`CSV: ${data.added} added, ${data.updated} updated`)
              load()
              e.target.value = ''
            }}
          />
        </label>
        <a
          href="/data/cartly-products.csv"
          download
          className="self-center text-sm text-brand-600 hover:underline"
        >
          Download sample CSV
        </a>
      </div>
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <div className="mb-6 flex gap-2">
        {['products', 'categories'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
              tab === t ? 'bg-brand-600 text-white' : 'bg-white ring-1 ring-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'products' && (
        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={handleProductSubmit} className="space-y-3 rounded-xl bg-white p-6 ring-1 ring-gray-200">
            <h2 className="font-semibold">{editingProductId ? 'Edit Product' : 'New Product'}</h2>
            {['name', 'description', 'price', 'stock', 'imageUrl'].map((field) => (
              <input
                key={field}
                required={field !== 'description' && field !== 'imageUrl'}
                placeholder={field}
                value={productForm[field]}
                onChange={(e) => setProductForm({ ...productForm, [field]: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 capitalize"
              />
            ))}
            <select
              required
              value={productForm.categoryId}
              onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
                {editingProductId ? 'Update' : 'Create'}
              </button>
              {editingProductId && (
                <button
                  type="button"
                  onClick={() => { setEditingProductId(null); setProductForm(emptyProduct) }}
                  className="rounded-lg bg-gray-100 px-4 py-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3">${Number(p.price).toFixed(2)}</td>
                    <td className="px-4 py-3">{p.stock}</td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => editProduct(p)} className="mr-2 text-brand-600">Edit</button>
                      <button
                        type="button"
                        onClick={async () => { await productApi.delete(p.id); load() }}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'categories' && (
        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={handleCategorySubmit} className="space-y-3 rounded-xl bg-white p-6 ring-1 ring-gray-200">
            <h2 className="font-semibold">{editingCategoryId ? 'Edit Category' : 'New Category'}</h2>
            <input
              required
              placeholder="Name"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
            <input
              placeholder="Description"
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
            <div className="flex gap-2">
              <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
                {editingCategoryId ? 'Update' : 'Create'}
              </button>
              {editingCategoryId && (
                <button
                  type="button"
                  onClick={() => { setEditingCategoryId(null); setCategoryForm(emptyCategory) }}
                  className="rounded-lg bg-gray-100 px-4 py-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          <ul className="divide-y rounded-xl bg-white ring-1 ring-gray-200">
            {categories.map((c) => (
              <li key={c.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.description}</p>
                </div>
                <div>
                  <button type="button" onClick={() => editCategory(c)} className="mr-2 text-brand-600">Edit</button>
                  <button
                    type="button"
                    onClick={async () => { await categoryApi.delete(c.id); load() }}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
