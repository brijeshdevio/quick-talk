import { useAuth } from "@/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function RestrictedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to="/c" replace />;

  return <Outlet />;
}
