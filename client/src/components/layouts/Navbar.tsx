import { Link } from "react-router-dom";
import { Slack } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full px-3 py-2 bg-base-300 border-b border-primary/10 ">
      <div className="w-full sm:w-[90%] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Slack className="w-7 h-7 text-primary" />
          <span className="text-xl font-bold">QuickTalk</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link to="#features" className="px-4 hover:text-primary">
            Features
          </Link>
          <Link to="#how-it-works" className="px-4 hover:text-primary">
            How it works
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden md:block px-4 hover:text-primary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
