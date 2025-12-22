import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { LandingPage, LoginPage, SignupPage } from "@/pages";

export function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
