import { ChatList, ContactModal } from "@/components";
import { Outlet } from "react-router-dom";

export function ChatLayout() {
  return (
    <>
      <ContactModal />
      <div className="flex">
        <ChatList />
        <main className="w-full h-screen bg-base-300">
          <Outlet />
        </main>
      </div>
    </>
  );
}
