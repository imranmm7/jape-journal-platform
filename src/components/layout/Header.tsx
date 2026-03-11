import { Link, useLocation } from "react-router-dom";
import { Search, User, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Editorial", href: "/editorial-board" },
  { label: "Archives", href: "/archives" },
  { label: "Policies", href: "/policies" },
  { label: "Submission", href: "/submit" },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  return (
    <header className="journal-header sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-xl font-bold text-white">JAPE</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {!loading && (user ? (
              <>
                <Link to="/dashboard" className="text-sm hover:text-primary-foreground/80 flex items-center gap-1">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button onClick={signOut} className="text-sm hover:text-primary-foreground/80 flex items-center gap-1">
                  <LogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm hover:text-primary-foreground/80 flex items-center gap-1">
                  <User size={16} /> Login
                </Link>
                <Link to="/register" className="text-sm hover:text-primary-foreground/80">Register</Link>
              </>
            ))}
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-between py-3">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className={`journal-nav-link ${location.pathname === link.href ? "text-white border-b-2 border-white" : "text-white/80 hover:text-white"}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input type="search" placeholder="Search articles..." className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="block py-2 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded" onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-white/10 pt-2 mt-2">
                {user ? (
                  <>
                    <Link to="/dashboard" className="block py-2 px-4 text-white/80 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                    <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="block py-2 px-4 text-white/80 hover:text-white w-full text-left">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block py-2 px-4 text-white/80 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                    <Link to="/register" className="block py-2 px-4 text-white/80 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Register</Link>
                  </>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
