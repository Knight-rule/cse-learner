"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Trophy, Flame, CheckCircle2, Award, Medal, BarChart3 } from "lucide-react";
import { practiceData } from "@/data/practice";
import { courses } from "@/data/courses";
import { getSolvedProblems, getStreak, getStats, getCertificates } from "@/lib/tracker";

interface Row {
  courseSlug: string;
  title: string;
  icon: string;
  color: string;
  solved: number;
  total: number;
}

export default function LeaderboardPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [totals, setTotals] = useState({ solved: 0, total: 0 });
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [coursesStarted, setCoursesStarted] = useState(0);
  const [certs, setCerts] = useState(0);

  useEffect(() => {
    const solved = getSolvedProblems();
    const built: Row[] = practiceData.map((cp) => {
      const course = courses.find((c) => c.slug === cp.courseSlug);
      const s = cp.problems.filter((p) => solved.has(p.id)).length;
      return {
        courseSlug: cp.courseSlug,
        title: course?.title || cp.courseSlug,
        icon: course?.icon || "📚",
        color: course?.color || "#8B5E3C #A67B5B",
        solved: s,
        total: cp.problems.length,
      };
    });
    built.sort((a, b) => b.solved - a.solved || b.total - a.total);
    setRows(built);
    setTotals({
      solved: built.reduce((acc, r) => acc + r.solved, 0),
      total: built.reduce((acc, r) => acc + r.total, 0),
    });
    setStreak(getStreak());
    setCoursesStarted(getStats().coursesStarted.length);
    setCerts(getCertificates().length);
  }, []);

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ═══ Premium Hero ═══ */}
      <div style={{
        background: "linear-gradient(135deg, rgba(166, 123, 91, 0.06), rgba(139, 94, 60, 0.04), transparent)",
        borderBottom: "1px solid var(--border)",
        padding: "48px 0 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
          backgroundImage: "radial-gradient(circle at 60% 30%, rgba(245, 158, 11, 0.06), transparent 60%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="breadcrumb" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Leaderboard</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <Trophy size={24} style={{ color: "#f59e0b" }} />
            <h1 style={{
              fontSize: "clamp(28px, 5vw, 36px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}>Leaderboard</h1>
          </div>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 520 }}>
            Your standings across every course. Solve more problems to climb the board.
          </p>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="container" style={{ padding: "32px 20px 80px", maxWidth: 900 }}>
        {/* Stats grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 32,
        }}>
          {[
            { icon: <CheckCircle2 size={20} />, value: totals.solved, label: "Problems Solved", color: "var(--accent-green)" },
            { icon: <Flame size={20} />, value: streak.current, label: "Day Streak", color: "var(--accent)" },
            { icon: <BarChart3 size={20} />, value: coursesStarted, label: "Courses Started", color: "var(--accent-blue)" },
            { icon: <Award size={20} />, value: certs, label: "Certificates", color: "var(--accent-purple)" },
          ].map((stat, i) => (
            <div key={i} style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: 20,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "var(--radius-md)",
                background: `${stat.color}12`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: stat.color, flexShrink: 0,
              }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Top 3 Podium */}
        {top3.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 32,
          }}>
            {top3.map((r, i) => {
              const colors = r.color.split(" ");
              const medals = ["🥇", "🥈", "🥉"];
              const heights = [200, 170, 150];
              return (
                <Link
                  key={r.courseSlug}
                  href={`/practice/${r.courseSlug}`}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    textDecoration: "none", color: "inherit",
                    background: "var(--bg-card)",
                    border: `1px solid ${i === 0 ? "#f59e0b33" : "var(--border)"}`,
                    borderRadius: "var(--radius-xl)",
                    padding: 24,
                    textAlign: "center",
                    transition: "all 0.3s",
                    order: i === 0 ? 0 : i === 1 ? -1 : 1,
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 8 }}>{medals[i]}</div>
                  <div style={{
                    width: 56, height: 56, borderRadius: "var(--radius-lg)",
                    background: `linear-gradient(135deg, ${colors[0]}20, ${colors[1] || colors[0]}20)`,
                    border: `1px solid ${colors[0]}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, marginBottom: 12,
                  }}>{r.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: colors[0] }}>
                    {r.solved}/{r.total}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                    problems solved
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Full Table */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "50px 1fr 80px 120px",
            gap: 12,
            padding: "14px 20px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
            fontSize: 12, fontWeight: 600, color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}>
            <span>#</span>
            <span>Course</span>
            <span style={{ textAlign: "right" }}>Solved</span>
            <span>Progress</span>
          </div>

          {/* Rows */}
          {rows.map((r, i) => {
            const colors = r.color.split(" ");
            const pct = r.total ? (r.solved / r.total) * 100 : 0;
            return (
              <Link
                key={r.courseSlug}
                href={`/practice/${r.courseSlug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "50px 1fr 80px 120px",
                  gap: 12,
                  padding: "14px 20px",
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none", color: "inherit",
                  transition: "background 0.2s",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-muted)" }}>
                  {i < 3 ? <Medal size={16} style={{ color: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : "#cd7f32" }} /> : i + 1}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{r.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{r.title}</span>
                </span>
                <span style={{ textAlign: "right", fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
                  {r.solved}/{r.total}
                </span>
                <span>
                  <div style={{
                    height: 6, borderRadius: 3,
                    background: "var(--border)",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${colors[0]}, ${colors[1] || colors[0]})`,
                      borderRadius: 3,
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
