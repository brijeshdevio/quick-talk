import { ChatSidebar } from "@/components";
import { Outlet } from "react-router-dom";

export function ChatLayout() {
  return (
    <>
      <div className="flex">
        <ChatSidebar />
        <main className="w-full h-screen bg-base-300">
          <Outlet />
        </main>
      </div>
    </>
  );
}
