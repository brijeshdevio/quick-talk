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

export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ChatLayout />}>
          <Route path="/c" element={<ChatPage />} />
          <Route path="/c/:conversationId" element={<MessagePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
