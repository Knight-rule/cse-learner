"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, BookOpen, Search, Sparkles } from "lucide-react";
import { courses, type Course } from "@/data/courses";
import PremiumCourseCard from "@/components/PremiumCourseCard";

const categoryOrder: Course["category"][] = ["Core CS", "Languages", "Systems", "Software Dev", "AI & ML"];
const categoryIcons: Record<Course["category"], string> = {
  "Core CS": "🧮",
  "Languages": "💻",
  "Systems": "🖥️",
  "Software Dev": "🚀",
  "AI & ML": "🤖",

};

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState<Course["category"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = activeCategory === "all"
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  const searched = searchQuery
    ? filtered.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filtered;

  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);

  // Group courses by category for section view
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      icon: categoryIcons[cat],
      courses: searched.filter((c) => c.category === cat),
    }))
    .filter((g) => g.courses.length > 0);

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
      <div className="container-page">
        {/* Category filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          <button
            onClick={() => setActiveCategory("all")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 18px",
              borderRadius: "var(--radius-lg)",
              background: activeCategory === "all" ? "var(--gradient)" : "var(--bg-card)",
              border: `1px solid ${activeCategory === "all" ? "transparent" : "var(--border)"}`,
              color: activeCategory === "all" ? "#fff" : "var(--text-secondary)",
              fontSize: 14, fontWeight: activeCategory === "all" ? 600 : 500,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: activeCategory === "all" ? "0 4px 16px rgba(249, 115, 22, 0.2)" : "none",
            }}
          >
            📚 All
            <span style={{
              fontSize: 11, fontWeight: 700,
              padding: "2px 6px", borderRadius: 6,
              background: activeCategory === "all" ? "rgba(255,255,255,0.2)" : "var(--surface)",
              color: activeCategory === "all" ? "#fff" : "var(--text-muted)",
            }}>{courses.length}</span>
          </button>
          {categoryOrder.map((cat) => {
            const count = courses.filter((c) => c.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? "all" : cat)}
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
                <span>{categoryIcons[cat]}</span>
                {cat}
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

        {/* Grouped sections when "all" is active */}
        {activeCategory === "all" && !searchQuery ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {grouped.map((group) => (
              <div key={group.category}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 20 }}>{group.icon}</span>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)" }}>{group.category}</h2>
                  <span style={{
                    fontSize: 12, fontWeight: 600, color: "var(--text-muted)",
                    padding: "2px 8px", borderRadius: 6,
                    background: "var(--surface)",
                  }}>{group.courses.length}</span>
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
                  gap: 20,
                }}>
                  {group.courses.map((course) => (
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
              </div>
            ))}
          </div>
        ) : (
          /* Flat grid when filtering */
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
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
        )}

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
