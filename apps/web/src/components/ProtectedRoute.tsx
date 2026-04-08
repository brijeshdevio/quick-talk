import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export function ProtectedRoute() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const response = await api.get("/users/me");
      return response.data;
    },
    retry: false, // Don't retry on 401
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="h-8 w-8 animate-spin text-primary-brand" />
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
