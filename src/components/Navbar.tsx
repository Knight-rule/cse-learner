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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <button className="nav-theme" aria-label="Toggle theme">
            <Sun size={18} />
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
