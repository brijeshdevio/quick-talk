import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { ChatLayout } from "../layouts/ChatLayout";
import {
  ChatPage,
  LandingPage,
  LoginPage,
  MessagePage,
  SignupPage,
} from "@/pages";
import { PublicRoute } from "./PublicRoute";
import { ProtectRoute } from "./ProtectRoute";

export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectRoute />}>
          <Route element={<ChatLayout />}>
            <Route path="/c" element={<ChatPage />} />
            <Route path="/c/:conversationId" element={<MessagePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
