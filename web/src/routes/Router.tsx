import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chat, Home, Login, Message, Register } from "@/pages";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/c" element={<Chat />} />
        <Route path="/c/:channel" element={<Message />} />
      </Routes>
    </BrowserRouter>
  );
}
