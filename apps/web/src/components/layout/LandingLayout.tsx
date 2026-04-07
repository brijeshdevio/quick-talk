import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-primary-brand selection:bg-primary-brand/10">
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="font-semibold text-lg tracking-tight">QuickTalk</div>
        <div className="flex items-center gap-2">
          <Link to="/login" >
          <Button variant={"outline"} size={"sm"}>
              Sign In
          </Button>
          </Link>
         <Link to={"/register"}>
          <Button size={"sm"}>
            Create Account
          </Button>
         </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="flex items-center justify-between flex-col md:flex-row gap-6 md:gap-0 px-8 py-8 mt-auto max-w-7xl mx-auto w-full text-xs font-semibold tracking-wider text-tertiary-brand uppercase">
        <div>© {new Date().getFullYear()} QuickTalk</div>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-primary-brand transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary-brand transition-colors">Terms of Service</Link>
          <Link to="/contact" className="hover:text-primary-brand transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
