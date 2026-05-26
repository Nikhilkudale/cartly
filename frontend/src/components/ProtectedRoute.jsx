import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { token, user } = useSelector((state) => state.auth)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user?.role !== 'ROLE_ADMIN') {
    return <Navigate to="/" replace />
  }

  return children
}
