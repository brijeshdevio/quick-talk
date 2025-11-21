import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="w-full bg-base-200 border-b border-white/10">
      <div className="w-full sm:w-[90%] max-w-[1200px] flex items-center justify-between mx-auto py-3">
        <Link to="/" className="">
          <span className="logo text-2xl ml-2 text-primary">QuickTalk</span>
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="btn btn-sm btn-ghost">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
