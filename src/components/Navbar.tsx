"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code, Home, Brain, Bookmark, Menu, X, LayoutDashboard, Briefcase } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/languages", label: "Languages", icon: Code },
  { href: "/playground", label: "Playground", icon: Code },
  { href: "/quiz", label: "Quiz", icon: Brain },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Companies", icon: Briefcase },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Code className="w-7 h-7 text-primary-600" />
            <span className="gradient-text">CSE Learner</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-primary-100 text-primary-700"
                      : "text-dark-600 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium border-l-4 ${
                  active
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-transparent text-dark-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
