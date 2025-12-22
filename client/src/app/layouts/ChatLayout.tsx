import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components";

export function ChatLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="w-full h-screen bg-base-300">
        <Outlet />
      </main>
    </div>
  );
}
