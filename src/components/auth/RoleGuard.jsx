import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const roleHome = {
  employee: '/dashboard/employee',
  manager: '/dashboard/manager',
  finance: '/dashboard/finance',
  admin: '/dashboard/admin',
}

export default function RoleGuard({ allowedRoles }) {
  const { role, loading } = useAuth()

  if (loading) return <p className="page-status">Loading...</p>

  if (!allowedRoles.includes(role)) {
    return <Navigate to={roleHome[role] || '/login'} replace />
  }

  return <Outlet />
}
