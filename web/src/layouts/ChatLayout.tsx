import { ChatList } from "@/components";
import { Outlet } from "react-router-dom";

export function ChatLayout() {
  return (
    <>
      <div className="flex">
        <ChatList />
        <main className="w-full h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
}
