import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { getProfile } from "@/api/user.api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async function () {
      try {
        const response = await getProfile();
        if (response?.user) {
          setUser(response.user);
          setIsAuthenticated(true);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const value = { user, isAuthenticated, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
