"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code, Home, Brain, Bookmark, Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/languages", label: "Languages", icon: Code },
  { href: "/playground", label: "Playground", icon: Code },
  { href: "/quiz", label: "Quiz", icon: Brain },
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
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

  const navClass = ["nav", scrolled ? "scrolled" : ""].filter(Boolean).join(" ");

  return (
    <nav className={navClass}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <span className="cse">CSE</span>
          <span className="learner">Learner</span>
        </Link>

        <div className={"nav-links" + (mobileOpen ? " open" : "")}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={"nav-link" + (active ? " active" : "")}
              >
                <Icon size={15} />
                {link.label}
              </Link>
            );
          })}
          <button className="nav-theme-btn" aria-label="Toggle theme">
            <Sun size={18} />
          </button>
        </div>

        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}
