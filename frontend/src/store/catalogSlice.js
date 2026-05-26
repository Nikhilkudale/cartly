import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productApi, categoryApi } from '../api/services'

export const fetchProducts = createAsyncThunk('catalog/fetchProducts', async (categoryId) => {
  const { data } = await productApi.getAll(categoryId)
  return data
})

export const fetchCategories = createAsyncThunk('catalog/fetchCategories', async () => {
  const { data } = await categoryApi.getAll()
  return data
})

export const fetchProductById = createAsyncThunk('catalog/fetchProductById', async (id) => {
  const { data } = await productApi.getById(id)
  return data
})

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    products: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null,
    selectedCategoryId: null,
  },
  reducers: {
    setCategoryFilter(state, action) {
      state.selectedCategoryId = action.payload
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload
      })
  },
})

export const { setCategoryFilter, clearSelectedProduct } = catalogSlice.actions
export default catalogSlice.reducer
