import api from './axios'

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
}

export const productApi = {
  getAll: (categoryId) => api.get('/products', { params: categoryId ? { categoryId } : {} }),
  getById: (id) => api.get(`/products/${id}`),
  adminGetAll: () => api.get('/admin/products'),
  create: (data) => api.post('/admin/products', data),
  update: (id, data) => api.put(`/admin/products/${id}`, data),
  delete: (id) => api.delete(`/admin/products/${id}`),
}

export const categoryApi = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/admin/categories', data),
  update: (id, data) => api.put(`/admin/categories/${id}`, data),
  delete: (id) => api.delete(`/admin/categories/${id}`),
}

export const catalogApi = {
  importDemo: () => api.post('/admin/catalog/import-demo'),
  importCsv: (file) => {
    const form = new FormData()
    form.append('file', file)
    return api.post('/admin/catalog/import-csv', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

export const cartApi = {
  get: () => api.get('/cart'),
  addItem: (data) => api.post('/cart/items', data),
  updateItem: (productId, quantity) => api.put(`/cart/items/${productId}`, null, { params: { quantity } }),
  removeItem: (productId) => api.delete(`/cart/items/${productId}`),
}

export const orderApi = {
  place: (data) => api.post('/orders', data),
  getMine: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, null, { params: { status } }),
}

export const paymentApi = {
  process: (data) => api.post('/payments/process', data),
  getByOrder: (orderId) => api.get(`/payments/order/${orderId}`),
}
