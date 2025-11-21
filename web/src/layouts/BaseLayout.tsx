import { Outlet } from "react-router-dom";
import { Navbar } from "@/components";

export function BaseLayout() {
  return (
    <>
      <Navbar />
      <main className="w-full sm:w-[90%] max-w-[1200px] mx-auto py-10">
        <Outlet />
      </main>
    </>
  );
}
