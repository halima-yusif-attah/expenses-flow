import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <p className="page-status">Loading...</p>

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}







// import { Navigate, useLocation } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore";

// function ProtectedRoute({ children }) {
//   const session = useAuthStore((state) => state.session);
//   const location = useLocation();

//   if (!session) {
//     return (
//       <Navigate
//         to="/login"
//         replace
//         state={{ from: location }}
//       />
//     );
//   }

//   return children;
// }

// export default ProtectedRoute;
