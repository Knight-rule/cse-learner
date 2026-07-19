"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code, Home, Brain, Bookmark, Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/languages", label: "Languages" },
  { href: "/playground", label: "Playground" },
  { href: "/quiz", label: "Quiz" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("theme");
      const isDark = saved ? saved === "dark" : true;
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

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("light", !next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <span className="cse">CSE</span>
          <span className="learner">Learner</span>
        </Link>

        <div className={"nav-center" + (mobileOpen ? " open" : "")}>
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={"nav-link" + (active ? " active" : "")}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-actions">
          <Link href="/dashboard" className="btn btn-outline btn-sm" style={{ display: "inline-flex" }}>
            Dashboard
          </Link>
          <Link href="/courses" className="btn btn-primary btn-sm" style={{ display: "inline-flex" }}>
            Get Started
          </Link>
          <button className="nav-theme" onClick={toggleTheme} aria-label="Toggle theme">
            {mounted ? (dark ? <Sun size={18} /> : <Moon size={18} />) : <Sun size={18} />}
          </button>
        </div>

        <button
          className="nav-mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}
