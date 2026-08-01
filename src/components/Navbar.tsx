"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/paths", label: "Learning Paths" },
  { href: "/practice", label: "Practice" },
];

const moreLinks = [
  { href: "/certificates", label: "Certificates" },
  { href: "/internships", label: "Internships" },
  { href: "/contests", label: "Contests" },
  { href: "/discuss", label: "Discuss" },
  { href: "/ai-mentor", label: "AI Mentor" },
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

          {/* More dropdown */}
          <div className="nav-dropdown">
            <button className="nav-link nav-dropdown-trigger">
              More
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="nav-dropdown-menu">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-dropdown-item${isActive(link.href) ? " active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="nav-actions">
          <button
            className="nav-theme"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted ? (dark ? <Sun size={18} /> : <Moon size={18} />) : <Sun size={18} />}
          </button>
          <Link href="/dashboard" className="btn btn-ghost btn-sm">
            Dashboard
          </Link>
          <Link href="/courses" className="btn btn-primary btn-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile: Theme toggle + Menu button */}
        <div className="nav-mobile-actions">
          <button
            className="nav-theme"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted ? (dark ? <Sun size={18} /> : <Moon size={18} />) : <Sun size={18} />}
          </button>
          <button
            className="nav-mobile"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
            <div className="nav-mobile-divider" />
            {moreLinks.map((link) => (
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

          {/* Mobile CTA */}
          <div className="nav-mobile-cta">
            <Link href="/dashboard" className="btn btn-secondary" onClick={() => setMobileOpen(false)}>
              Dashboard
            </Link>
            <Link href="/courses" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
