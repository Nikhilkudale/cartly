import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(login(form))
    if (login.fulfilled.match(result)) {
      navigate('/')
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-bold">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 ring-1 ring-gray-200">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-600 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
        <p className="text-center text-sm text-gray-600">
          No account? <Link to="/register" className="text-brand-600 hover:underline">Register</Link>
        </p>
        <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
          <p><strong>Demo:</strong> user@shop.com / user123</p>
          <p><strong>Admin:</strong> admin@shop.com / admin123</p>
        </div>
      </form>
    </div>
  )
}
