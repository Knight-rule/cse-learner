"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code, Home, Brain, Bookmark, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: Home, color: "#ff6b6b" },
  { href: "/courses", label: "Courses", icon: BookOpen, color: "#4ecdc4" },
  { href: "/languages", label: "Languages", icon: Code, color: "#9c27b0" },
  { href: "/playground", label: "Playground", icon: Code, color: "#ffb347" },
  { href: "/quiz", label: "Quiz", icon: Brain, color: "#42a5f5" },
  { href: "/dashboard", label: "Dashboard", icon: Home, color: "#66bb6a" },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark, color: "#ff6fa8" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("cse-theme", next ? "dark" : "light");
  };

  return (
    <nav className={`premium-nav ${scrolled ? "scrolled" : ""} ${dark ? "dark-mode" : ""}`}>
      <div className="nav-container">
        <Link href="/" className="logo">
          <span style={{ color: '#ff6b6b', fontWeight: '800' }}>CSE</span>
          <span style={{ color: '#4ecdc4', fontWeight: '600' }}>Learner</span>
        </Link>

        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? 
            <span className="text-xl text-dark font-bold">×</span> : 
            <span className="text-xl text-dark font-bold">☰</span>
          }
        </button>

        <div className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 px-3 py-2 transition-all rounded-lg 
                  ${active 
                    ? "text-white font-semibold shadow-sm" 
                    : "text-dark dark:text-gray-300 hover:text-white hover:shadow-md"
                  }
                  style={active ? { background: link.color, color: 'white' } : {}}
                `}
              >
                <Icon className="w-4 h-4" style={active ? { color: 'white' } : { color: link.color }} />
                <span style={active ? { color: 'white', fontWeight: '600' } : {}}>{link.label}</span>
              </Link>
            );
          })}
          <button
            onClick={toggleDark}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            aria-label="Toggle dark mode"
          >
            {dark ? 
              <Sun className="w-5 h-5 text-yellow-500 animate-pulse" /> : 
              <Moon className="w-5 h-5 text-blue-600 animate-pulse" />
            }
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-dark">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium border-l-4 ${active 
                  ? "border-blue bg-blue-50 dark:bg-blue-900/20 text-blue dark:text-blue-400" 
                  : "border-transparent text-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" style={active ? { color: link.color } : {}} />
                <span style={active ? { color: link.color, fontWeight: '600' } : {}}>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
