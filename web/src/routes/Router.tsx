import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chat, Home, Login, Message, Register } from "@/pages";
import { AuthLayout, BaseLayout, ChatLayout } from "@/layouts";
import { RestrictedRoute } from "./RestrictedRoute";
import ProtectedRoute from "./ProtectedRoute";

export function Router() {
  return (
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
            <Route path="/c/:channelId" element={<Message />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
