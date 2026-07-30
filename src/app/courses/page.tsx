"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, BookOpen, Search, Sparkles } from "lucide-react";
import { courses } from "@/data/courses";
import PremiumCourseCard from "@/components/PremiumCourseCard";

const courseCategories: Record<string, { label: string; slugs: string[]; icon: string }> = {
  "all": { label: "All Courses", slugs: [], icon: "📚" },
  "core-cs": {
    label: "Core CS", icon: "🧮",
    slugs: ["data-structures", "algorithms", "computer-architecture", "discrete-structures", "digital-system-design", "automata-formal-languages", "probability-statistics"],
  },
  "systems": {
    label: "Systems", icon: "🖥️",
    slugs: ["operating-systems", "dbms", "computer-networks", "compiler-design", "distributed-os", "hpc", "multicore-programming"],
  },
  "programming": {
    label: "Programming", icon: "💻",
    slugs: ["python", "java", "c-language", "cpp", "javascript", "oop"],
  },
  "ai-ml": {
    label: "AI & ML", icon: "🤖",
    slugs: ["artificial-intelligence", "machine-learning", "data-mining-warehousing", "image-processing"],
  },
  "software-dev": {
    label: "Software Dev", icon: "🚀",
    slugs: ["web-development", "software-engineering", "software-project-management"],
  },
  "advanced": {
    label: "Advanced", icon: "⚡",
    slugs: ["advanced-microprocessor", "industry-4-0"],
  },
};

const categoryKeys = Object.keys(courseCategories);

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = activeCategory === "all"
    ? courses
    : courses.filter((c) => courseCategories[activeCategory].slugs.includes(c.slug));

  const searched = searchQuery
    ? filtered.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filtered;

  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ═══ Premium Hero ═══ */}
      <div style={{
        background: "linear-gradient(135deg, rgba(249, 115, 22, 0.06), rgba(168, 85, 247, 0.04), transparent)",
        borderBottom: "1px solid var(--border)",
        padding: "48px 0 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
          backgroundImage: "radial-gradient(circle at 70% 30%, rgba(249, 115, 22, 0.06), transparent 60%), radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.04), transparent 60%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="breadcrumb" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Courses</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Sparkles size={20} style={{ color: "var(--accent)" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1 }}>Course Library</span>
              </div>
              <h1 style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: 8,
                lineHeight: 1.2,
              }}>
                Master <span className="gradient-text-premium">Computer Science</span>
              </h1>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 480 }}>
                {courses.length} courses with {totalLessons}+ structured lessons covering every CSE topic.
              </p>
            </div>

            {/* Search */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 16px",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              minWidth: 260,
              transition: "border-color 0.2s",
            }}>
              <Search size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1, border: "none", outline: "none",
                  background: "transparent", color: "var(--text-primary)",
                  fontSize: 14,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="container" style={{ padding: "32px 20px 80px" }}>
        {/* Category filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {categoryKeys.map((key) => {
            const cat = courseCategories[key];
            const isActive = activeCategory === key;
            const count = key === "all" ? courses.length : cat.slugs.length;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "10px 18px",
                  borderRadius: "var(--radius-lg)",
                  background: isActive ? "var(--gradient)" : "var(--bg-card)",
                  border: `1px solid ${isActive ? "transparent" : "var(--border)"}`,
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  fontSize: 14, fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: isActive ? "0 4px 16px rgba(249, 115, 22, 0.2)" : "none",
                }}
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  padding: "2px 6px", borderRadius: 6,
                  background: isActive ? "rgba(255,255,255,0.2)" : "var(--surface)",
                  color: isActive ? "#fff" : "var(--text-muted)",
                }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div style={{ marginBottom: 20, fontSize: 13, color: "var(--text-muted)" }}>
          Showing {searched.length} of {courses.length} courses
          {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
        </div>

        {/* Course grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}>
          {searched.map((course) => (
            <PremiumCourseCard
              key={course.slug}
              slug={course.slug}
              title={course.title}
              description={course.description}
              icon={course.icon}
              color={course.color}
              lessonCount={course.lessons.length}
            />
          ))}
        </div>

        {searched.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            color: "var(--text-muted)",
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
              No courses found
            </div>
            <div style={{ fontSize: 14 }}>
              Try a different search term or category.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
