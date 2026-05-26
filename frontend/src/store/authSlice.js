import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../api/services'

const storedUser = localStorage.getItem('user')
const initialState = {
  token: localStorage.getItem('token'),
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
}

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await authApi.login(credentials)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed')
  }
})

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await authApi.register(payload)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Registration failed')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true
      state.error = null
    }
    const handleFulfilled = (state, action) => {
      state.loading = false
      state.token = action.payload.token
      state.user = {
        userId: action.payload.userId,
        email: action.payload.email,
        fullName: action.payload.fullName,
        role: action.payload.role,
      }
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(state.user))
    }
    const handleRejected = (state, action) => {
      state.loading = false
      state.error = action.payload
    }

    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(login.rejected, handleRejected)
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleFulfilled)
      .addCase(register.rejected, handleRejected)
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
