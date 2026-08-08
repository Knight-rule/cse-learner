"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/paths", label: "Paths" },
  { href: "/practice", label: "Practice" },
  { href: "/jobs", label: "Jobs" },
  { href: "/internships", label: "Internships" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contests", label: "Contests" },
  { href: "/notepad", label: "Notepad" },
  { href: "/ai-mentor", label: "AI Mentor" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = saved ? saved === "dark" : prefersDark;
      setDark(isDark);
      document.documentElement.classList.toggle("light", !isDark);
    } catch {}
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("light", !next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push("/");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <span className="cse">CSE</span>
          <span className="learner">Learner</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${isActive(link.href) ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="nav-actions">
          <button
            className="nav-theme"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted ? (dark ? <Sun size={16} /> : <Moon size={16} />) : <Sun size={16} />}
          </button>
          
          {user ? (
            <div className="relative">
              <button
                className="nav-user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label="User menu"
              >
                <div className="nav-user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="nav-user-name">{user.name}</span>
              </button>
              
              {showUserMenu && (
                <div className="nav-user-dropdown">
                  <div className="nav-user-dropdown-header">
                    <div className="nav-user-avatar-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="nav-user-dropdown-name">{user.name}</p>
                      <p className="nav-user-dropdown-email">{user.email}</p>
                    </div>
                  </div>
                  <div className="nav-user-dropdown-divider" />
                  <Link href="/dashboard" className="nav-user-dropdown-item" onClick={() => setShowUserMenu(false)}>
                    <User size={16} />
                    Dashboard
                  </Link>
                  <button className="nav-user-dropdown-item text-red-500" onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="nav-mobile-actions">
          <button
            className="nav-theme"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted ? (dark ? <Sun size={16} /> : <Moon size={16} />) : <Sun size={16} />}
          </button>
          <button
            className="nav-mobile"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="nav-mobile-menu">
          <div className="nav-mobile-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`nav-mobile-link${isActive(link.href) ? " active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-mobile-cta">
            {user ? (
              <>
                <div className="nav-mobile-user">
                  <div className="nav-user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="nav-mobile-user-name">{user.name}</p>
                    <p className="nav-mobile-user-email">{user.email}</p>
                  </div>
                </div>
                <Link href="/dashboard" className="btn btn-secondary" onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
                <button className="btn btn-ghost text-red-500" onClick={() => { handleLogout(); setMobileOpen(false); }}>
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-secondary" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link href="/signup" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
