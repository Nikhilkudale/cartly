import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'

export default function Navbar() {
  const { user, token } = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const isAdmin = user?.role === 'ROLE_ADMIN'

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-xl font-bold text-brand-700">
          Cartly
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600')}>
            Home
          </NavLink>
          {token && (
            <NavLink to="/cart" className={({ isActive }) => (isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600')}>
              Cart ({cart?.itemCount || 0})
            </NavLink>
          )}
          {token && (
            <NavLink to="/orders" className={({ isActive }) => (isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600')}>
              My Orders
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600')}>
              Admin
            </NavLink>
          )}
          {token ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-gray-500 sm:inline">{user?.fullName}</span>
              <button
                type="button"
                onClick={() => dispatch(logout())}
                className="rounded-lg bg-gray-100 px-3 py-1.5 text-gray-700 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
