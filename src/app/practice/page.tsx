import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Code, BookOpen, Trophy, Zap, Target } from "lucide-react";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Practice Problems",
  description: "Solve coding challenges for every CS course topic. Practice DSA, algorithms, system design and more.",
};

export default function PracticePage() {
  const totalProblems = practiceData.reduce((sum, cp) => sum + cp.problems.length, 0);
  const totalCourses = practiceData.length;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ═══ Premium Hero ═══ */}
      <div style={{
        background: "linear-gradient(135deg, rgba(168, 85, 247, 0.06), rgba(59, 130, 246, 0.04), transparent)",
        borderBottom: "1px solid var(--border)",
        padding: "48px 0 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
          backgroundImage: "radial-gradient(circle at 60% 30%, rgba(168, 85, 247, 0.06), transparent 60%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.04), transparent 60%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="breadcrumb" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Practice</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "var(--radius-xl)",
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15))",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Code size={28} style={{ color: "var(--accent-purple)" }} />
            </div>
            <div>
              <h1 style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: 8,
                lineHeight: 1.2,
              }}>
                Solve <span className="gradient-text-premium">Practice Problems</span>
              </h1>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 520 }}>
                {totalProblems}+ coding challenges across {totalCourses} CS topics. Write code, run tests, and master fundamentals.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { icon: <Target size={16} />, label: `${totalProblems} Problems`, color: "var(--accent-purple)" },
              { icon: <BookOpen size={16} />, label: `${totalCourses} Topics`, color: "var(--accent-blue)" },
              { icon: <Zap size={16} />, label: "Instant Testing", color: "var(--accent)" },
              { icon: <Trophy size={16} />, label: "Track Progress", color: "var(--accent-green)" },
            ].map((stat, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 14px",
                borderRadius: "var(--radius-md)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                fontSize: 13, fontWeight: 500, color: stat.color,
              }}>
                {stat.icon}
                {stat.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Practice Grid ═══ */}
      <div className="container" style={{ padding: "32px 20px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 20,
        }}>
          {practiceData.map((cp) => {
            const course = courses.find((c) => c.slug === cp.courseSlug);
            if (!course) return null;
            const colors = course.color.split(" ");
            const difficulties = { easy: 0, medium: 0, hard: 0 };
            cp.problems.forEach((p) => { difficulties[p.difficulty]++; });

            return (
              <Link
                key={cp.courseSlug}
                href={`/practice/${cp.courseSlug}`}
                className="card-premium"
                style={{
                  display: "flex", flexDirection: "column",
                  textDecoration: "none", color: "inherit",
                  padding: 0,
                }}
              >
                {/* Top gradient line */}
                <div style={{
                  height: 3,
                  background: `linear-gradient(90deg, ${colors[0]}, ${colors[1] || colors[0]})`,
                }} />

                <div style={{ padding: 24 }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: "var(--radius-lg)",
                      background: `linear-gradient(135deg, ${colors[0]}15, ${colors[1] || colors[0]}15)`,
                      border: `1px solid ${colors[0]}22`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 26, flexShrink: 0,
                    }}>{course.icon}</div>
                    <div>
                      <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 3 }}>
                        {course.title}
                      </h2>
                      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                        {cp.problems.length} problems
                      </p>
                    </div>
                  </div>

                  {/* Difficulty badges */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                    {difficulties.easy > 0 && (
                      <span style={{
                        fontSize: 12, fontWeight: 600,
                        padding: "4px 10px", borderRadius: 8,
                        background: "rgba(16, 185, 129, 0.12)",
                        color: "#10b981",
                      }}>{difficulties.easy} Easy</span>
                    )}
                    {difficulties.medium > 0 && (
                      <span style={{
                        fontSize: 12, fontWeight: 600,
                        padding: "4px 10px", borderRadius: 8,
                        background: "rgba(249, 115, 22, 0.12)",
                        color: "#f97316",
                      }}>{difficulties.medium} Medium</span>
                    )}
                    {difficulties.hard > 0 && (
                      <span style={{
                        fontSize: 12, fontWeight: 600,
                        padding: "4px 10px", borderRadius: 8,
                        background: "rgba(168, 85, 247, 0.12)",
                        color: "#a855f7",
                      }}>{difficulties.hard} Hard</span>
                    )}
                  </div>

                  {/* CTA */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontSize: 14, fontWeight: 600, color: colors[0],
                  }}>
                    <Code size={15} /> Start Practice <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
