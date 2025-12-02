import { Navigate } from "react-router-dom";

/**
 * Protege rotas por autenticação e por papel (role)
 *
 * Uso:
 * <ProtectedRoute user={user} allowedRoles={["admin"]}>
 *   <AdminDashboard />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ user, allowedRoles, children }) {
  // Não está logado
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // Está logado, mas não tem permissão
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // Autorizado
  return children;
}