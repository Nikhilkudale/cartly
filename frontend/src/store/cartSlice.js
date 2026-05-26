import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cartApi } from '../api/services'

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const { data } = await cartApi.get()
  return data
})

export const addToCart = createAsyncThunk('cart/add', async ({ productId, quantity }) => {
  const { data } = await cartApi.addItem({ productId, quantity })
  return data
})

export const updateCartItem = createAsyncThunk('cart/update', async ({ productId, quantity }) => {
  const { data } = await cartApi.updateItem(productId, quantity)
  return data
})

export const removeFromCart = createAsyncThunk('cart/remove', async (productId) => {
  const { data } = await cartApi.removeItem(productId)
  return data
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const setCart = (state, action) => {
      state.loading = false
      state.cart = action.payload
    }
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCart.fulfilled, setCart)
      .addCase(addToCart.fulfilled, setCart)
      .addCase(updateCartItem.fulfilled, setCart)
      .addCase(removeFromCart.fulfilled, setCart)
  },
})

export default cartSlice.reducer
