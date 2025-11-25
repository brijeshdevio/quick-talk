import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth";

export function RestrictedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to="/c" replace />;

  return <Outlet />;
}
