"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Briefcase, ArrowRight, Brain, Zap, Target, TrendingUp, BookOpen, Terminal, LayoutDashboard, Trophy } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import ActivityFeed from "@/components/ActivityFeed";
import { courses } from "@/data/courses";
import { companies } from "@/lib/companies";
import { getStats, getSRSStatsForCourse, getCertificates, type LearnerStats } from "@/lib/tracker";

interface Recommendation {
  course: typeof courses[0];
  reason: string;
  priority: number;
  icon: React.ReactNode;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<LearnerStats | null>(null);

  useEffect(() => {
    const s = getStats();
    setStats(s);
  }, []);

  const enrolledCourses = stats ? courses.filter((c) => stats.coursesStarted.includes(c.slug)) : [];

  const getRecommendations = (): Recommendation[] => {
    if (!stats) return [];

    const recommendations: Recommendation[] = [];
    const codeRuns = stats.codeRuns;

    const csFundamentals = ["python", "c", "data-structures", "algorithms", "computer-organization"];
    for (const slug of csFundamentals) {
      const course = courses.find((c) => c.slug === slug);
      if (!course) continue;
      if (stats.coursesStarted.includes(slug)) continue;
      const isFirstNotStarted = !csFundamentals.slice(0, csFundamentals.indexOf(slug)).some((s) => !stats.coursesStarted.includes(s));
      if (isFirstNotStarted || csFundamentals.indexOf(slug) === 0) {
        recommendations.push({
          course,
          reason: csFundamentals.indexOf(slug) === 0 ? "Start your CS journey here" : `Next step after ${csFundamentals[csFundamentals.indexOf(slug) - 1]}`,
          priority: 100 - csFundamentals.indexOf(slug) * 10,
          icon: <Brain size={20} />,
        });
        break;
      }
    }

    for (const course of courses) {
      if (!stats.coursesStarted.includes(course.slug)) continue;
      const srsStats = getSRSStatsForCourse(course.slug);
      if (srsStats.due > 5) {
        recommendations.push({
          course,
          reason: `${srsStats.due} concepts need review`,
          priority: 80,
          icon: <Zap size={20} />,
        });
      }
    }

    if (codeRuns < 20 && stats.coursesStarted.length > 0) {
      const firstCourse = courses.find((c) => c.slug === stats.coursesStarted[0]);
      if (firstCourse) {
        recommendations.push({
          course: firstCourse,
          reason: "Build coding fluency with hands-on practice",
          priority: 70,
          icon: <Terminal size={20} />,
        });
      }
    }

    const coreSystems = ["operating-systems", "dbms", "computer-networks"];
    for (const slug of coreSystems) {
      const course = courses.find((c) => c.slug === slug);
      if (!course) continue;
      if (stats.coursesStarted.includes(slug)) continue;
      const prevIndex = coreSystems.indexOf(slug) - 1;
      if (prevIndex >= 0 && stats.coursesStarted.includes(coreSystems[prevIndex])) {
        recommendations.push({
          course,
          reason: "Continue Core Systems track",
          priority: 60,
          icon: <Target size={20} />,
        });
        break;
      }
    }

    const totalDue = courses
      .filter((c) => stats.coursesStarted.includes(c.slug))
      .reduce((sum, c) => sum + getSRSStatsForCourse(c.slug).due, 0);
    if (totalDue > 0) {
      recommendations.push({
        course: { slug: "srs", title: "Spaced Repetition Review", icon: "🧠", color: "from-purple-500 to-pink-600", lessons: [] } as any,
        reason: `${totalDue} concepts due for review`,
        priority: 90,
        icon: <Brain size={20} style={{ color: "var(--accent-purple)" }} />,
      });
    }

    return recommendations.sort((a, b) => b.priority - a.priority).slice(0, 4);
  };

  const recommendations = getRecommendations();
  const certificateCount = getCertificates().length;

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
            <span>Dashboard</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <LayoutDashboard size={24} style={{ color: "var(--accent)" }} />
            <h1 style={{
              fontSize: "clamp(28px, 5vw, 36px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}>Your Dashboard</h1>
          </div>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 480 }}>
            Track your learning progress and discover opportunities.
          </p>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="container" style={{ padding: "32px 20px 80px" }}>
        {/* Stats */}
        <div style={{ marginBottom: 32 }}>
          <DashboardStats />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
          {/* Main column */}
          <div style={{ minWidth: 0 }}>
            {/* Enrolled Courses */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: 24,
              marginBottom: 24,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <BookOpen size={18} style={{ color: "var(--accent)" }} />
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>Enrolled Courses</h2>
              </div>

              {enrolledCourses.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
                    You haven&apos;t started any courses yet
                  </p>
                  <Link href="/courses" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 20px",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--gradient)",
                    color: "#fff", fontWeight: 600, fontSize: 14,
                    textDecoration: "none",
                  }}>
                    Browse Courses <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {enrolledCourses.map((course) => {
                    const colors = course.color.split(" ");
                    return (
                      <Link
                        key={course.slug}
                        href={"/courses/" + course.slug}
                        style={{
                          display: "flex", alignItems: "center", gap: 14,
                          padding: "14px 16px",
                          borderRadius: "var(--radius-lg)",
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          textDecoration: "none",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{
                          width: 44, height: 44, borderRadius: "var(--radius-md)",
                          background: `linear-gradient(135deg, ${colors[0]}20, ${colors[1] || colors[0]}20)`,
                          border: `1px solid ${colors[0]}22`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 22, flexShrink: 0,
                        }}>{course.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{course.title}</div>
                          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{course.lessons.length} lessons</div>
                        </div>
                        <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                padding: 24,
                marginBottom: 24,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <Target size={18} style={{ color: "var(--accent-purple)" }} />
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>Recommended for You</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                  {recommendations.map((rec) => (
                    <Link
                      key={rec.course.slug}
                      href={rec.course.slug === "srs" ? "/review" : "/courses/" + rec.course.slug}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 12,
                        padding: 16,
                        borderRadius: "var(--radius-lg)",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: "var(--radius-md)",
                        background: "var(--gradient)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", flexShrink: 0,
                      }}>{rec.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 3 }}>
                          {rec.course.title}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{rec.reason}</div>
                      </div>
                      <ChevronRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: 2 }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Activity */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: 24,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <TrendingUp size={18} style={{ color: "var(--accent-blue)" }} />
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>Recent Activity</h2>
              </div>
              <ActivityFeed />
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 80 }}>
            {/* Jobs CTA */}
            <div style={{
              background: "linear-gradient(135deg, rgba(249, 115, 22, 0.08), rgba(168, 85, 247, 0.06))",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: 24,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "var(--radius-md)",
                background: "var(--gradient)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 14,
              }}>
                <Briefcase size={22} color="#fff" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                Find Opportunities
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 14, lineHeight: 1.5 }}>
                Browse {companies.length}+ top tech companies with direct career page links.
              </p>
              <Link href="/jobs" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "10px 16px",
                borderRadius: "var(--radius-lg)",
                background: "var(--gradient)",
                color: "#fff", fontWeight: 600, fontSize: 14,
                textDecoration: "none",
                width: "100%",
              }}>
                View Jobs <ArrowRight size={16} />
              </Link>
            </div>

            {/* Quick Stats */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Zap size={16} style={{ color: "var(--accent)" }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Quick Stats</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Code runs", value: stats?.codeRuns || 0, color: "var(--accent)" },
                  { label: "Courses started", value: stats?.coursesStarted?.length || 0, color: "var(--accent-blue)" },
                  { label: "Lessons viewed", value: stats?.lessonsViewed || 0, color: "var(--accent-purple)" },
                  { label: "Certificates", value: certificateCount, color: "var(--accent-green)" },
                ].map((stat, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{stat.label}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            {certificateCount > 0 && (
              <div style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                padding: 20,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Trophy size={16} style={{ color: "var(--accent-green)" }} />
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Certificates Earned</h3>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  You have earned {certificateCount} certificate{certificateCount !== 1 ? "s" : ""} for completing courses.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
