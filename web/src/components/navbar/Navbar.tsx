import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Register",
    path: "/register",
  },
  {
    name: "Login",
    path: "/login",
  },
];

function MobileMenu({
  onClose = () => {},
}: {
  onClose?: (value: boolean) => void;
}) {
  const handleCloseMenu = () => onClose(false);

  return (
    <div className="absolute top-0 left-0 z-50 w-full sm:hidden h-screen bg-base-300/60">
      <div className="absolute right-0 w-[300px] p-3 h-full bg-base-200 border-l border-white/10">
        <div className="flex justify-end">
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={handleCloseMenu}
          >
            <X size={20} />
          </button>
        </div>
        <ul className="w-full menu rounded-box">
          {links.map((link) => (
            <li key={link.name} onClick={handleCloseMenu}>
              <Link to={link.path} className="w-full text-center py-2">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DesktopMenu() {
  return (
    <ul className="menu menu-horizontal hidden sm:flex">
      {links.map((link) => (
        <li key={link.name}>
          <Link to={link.path}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenMenu = () => setIsOpen(true);

  return (
    <nav className="relative w-full p-3 bg-base-200 border-b border-white/10">
      <div className="flex items-center justify-between ">
        <Link to="/" className="logo text-2xl text-primary">
          QuickTalk
        </Link>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={handleOpenMenu}
          >
            <Menu size={20} />
          </button>
          {isOpen && <MobileMenu onClose={setIsOpen} />}
        </div>

        {/* Desktop Menu */}
        <DesktopMenu />
      </div>
    </nav>
  );
}
