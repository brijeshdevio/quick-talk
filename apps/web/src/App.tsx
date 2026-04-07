import { Routes, Route } from "react-router-dom"
import { LandingLayout } from "./components/layout/LandingLayout"
import { ChatLayout } from "./components/layout/ChatLayout"
import { LandingPage } from "./pages/LandingPage"
import { RegisterPage } from "./pages/RegisterPage"
import { LoginPage } from "./pages/LoginPage"
import { ChatPage } from "./pages/ChatPage"
import { EmptyChatPage } from "./pages/EmptyChatPage"

export function App() {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chat" element={<ChatLayout />}>
        <Route index element={<EmptyChatPage />} />
        <Route path=":id" element={<ChatPage />} />
      </Route>
    </Routes>
  )
}

export default App
