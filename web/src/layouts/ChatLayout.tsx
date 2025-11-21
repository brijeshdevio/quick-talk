import { Outlet } from "react-router-dom";

export function ChatLayout() {
  return (
    <>
      <main className="w-full h-screen">
        <Outlet />
      </main>
    </>
  );
}
