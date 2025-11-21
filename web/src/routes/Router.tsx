import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chat, Home, Login, Message, Register } from "@/pages";
import { AuthLayout, BaseLayout, ChatLayout } from "@/layouts";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Base Layout */}
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Chat Layout */}
        <Route element={<ChatLayout />}>
          <Route path="/c" element={<Chat />} />
          <Route path="/c/:channelId" element={<Message />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
