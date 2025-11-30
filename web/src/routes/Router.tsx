import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { AuthLayout, BaseLayout, ChatLayout } from "@/layouts";
import { Chat, Home, Login, Message, Register } from "@/pages";

export function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Base Layout */}
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Auth Layout */}
          <Route element={<RestrictedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>

          {/* Chat Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<ChatLayout />}>
              <Route path="/c" element={<Chat />} />
              <Route path="/c/:chatID/:memberID" element={<Message />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
