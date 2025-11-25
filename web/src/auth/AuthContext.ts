import type { AuthContextType } from "@/types";
import { createContext } from "react";

const initialState: AuthContextType = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const AuthContext = createContext<AuthContextType>(initialState);
