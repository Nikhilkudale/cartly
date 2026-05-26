import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { orderApi } from '../api/services'

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  const { data } = await orderApi.getMine()
  return data
})

export const placeOrder = createAsyncThunk('orders/place', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await orderApi.place(payload)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Order failed')
  }
})

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    lastOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearLastOrder(state) {
      state.lastOrder = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false
        state.lastOrder = action.payload
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearLastOrder } = orderSlice.actions
export default orderSlice.reducer
