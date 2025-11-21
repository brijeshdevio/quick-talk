import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <>
      <main className="w-full sm:w-[90%] max-w-[1200px] mx-auto py-10">
        <Outlet />
      </main>
    </>
  );
}
