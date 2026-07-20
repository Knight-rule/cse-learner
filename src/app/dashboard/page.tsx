"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Briefcase, ArrowRight, Brain, Zap, Target, TrendingUp, BookOpen, Terminal } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import ActivityFeed from "@/components/ActivityFeed";
import { courses } from "@/data/courses";
import { getStats, getSRSStatsForCourse, type LearnerStats } from "@/lib/tracker";

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

  // Generate smart recommendations based on progress
  const getRecommendations = (): Recommendation[] => {
    if (!stats) return [];

    const recommendations: Recommendation[] = [];
    const completedLessons = stats.activities.filter((a) => a.type === "lesson").length;
    const codeRuns = stats.codeRuns;

    // 1. Next course in learning path
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

    // 2. Courses with weak SRS performance
    for (const course of courses) {
      if (!stats.coursesStarted.includes(course.slug)) continue;
      const srsStats = getSRSStatsForCourse(course.slug);
      if (srsStats.due > 5) {
        recommendations.push({
          course,
          reason: `${srsStats.due} concepts need review`,
          priority: 80,
          icon: <Zap size={20} style={{ color: "var(--accent-amber)" }} />,
        });
      }
    }

    // 3. Suggest practice if code runs are low
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

    // 4. Next course in Core Systems track
    const coreSystems = ["operating-systems", "dbms", "computer-networks"];
    for (const slug of coreSystems) {
      const course = courses.find((c) => c.slug === slug);
      if (!course) continue;
      if (stats.coursesStarted.includes(slug)) continue;
      const prevIndex = coreSystems.indexOf(slug) - 1;
      if (prevIndex >= 0 && stats.coursesStarted.includes(coreSystems[prevIndex])) {
        recommendations.push({
          course,
          reason: `Continue Core Systems track`,
          priority: 60,
          icon: <Target size={20} />,
        });
        break;
      }
    }

    // 5. Suggest SRS review
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

  return (
    <div className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Dashboard</span>
        </div>

        <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>Dashboard</span>
        <h1 className="heading-xl mb-4">Your Dashboard</h1>
        <p className="body-lg mb-12">Track your learning progress and find opportunities</p>

        <div className="mb-12">
          <DashboardStats />
        </div>

        <div className="dashboard-layout">
          <div>
            <h2 className="heading-md mb-6">Enrolled Courses</h2>
            {enrolledCourses.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <p className="body-md mb-4">You haven&apos;t started any courses yet</p>
                <Link href="/courses" className="btn btn-primary">
                  Browse Courses <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="lesson-list">
                {enrolledCourses.map((course) => {
                  const colors = course.color.split(" ");
                  return (
                    <Link key={course.slug} href={"/courses/" + course.slug} className="lesson-item">
                      <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                        {course.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="heading-sm">{course.title}</h3>
                        <p className="body-sm" style={{ marginTop: 4 }}>{course.lessons.length} lessons</p>
                      </div>
                      <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    </Link>
                  );
                })}
              </div>
            )}

            {recommendations.length > 0 && (
              <div style={{ marginTop: 48 }}>
                <h2 className="heading-md mb-6 flex items-center gap-2">
                  <Target size={20} style={{ color: "var(--accent-primary)" }} />
                  Recommended for You
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendations.map((rec, i) => (
                    <Link
                      key={rec.course.slug}
                      href={rec.course.slug === "srs" ? "/review" : "/courses/" + rec.course.slug}
                      className="glass-card p-5 hover:border-accent-primary/50 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "var(--gradient)" }}>
                          {rec.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="heading-sm group-hover:text-accent-primary transition-colors">{rec.course.title}</h3>
                          <p className="body-sm text-text-muted mt-1">{rec.reason}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <span className="badge badge-sm badge-outline">{Math.round(rec.priority)}% match</span>
                          </div>
                        </div>
                        <ChevronRight size={18} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: 4 }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 48 }}>
              <h2 className="heading-md mb-6">Recent Activity</h2>
              <ActivityFeed />
            </div>
          </div>

          <div>
            <div className="glass-card p-6" style={{ position: "sticky", top: 80 }}>
              <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Briefcase size={24} color="#fff" />
              </div>
              <h3 className="heading-sm mb-2">Find Opportunities</h3>
              <p className="body-sm mb-4">Browse live internship and job listings updated automatically.</p>
              <Link href="/jobs" className="btn btn-primary w-full justify-center">
                View Jobs <ArrowRight size={16} />
              </Link>
            </div>

            <div className="glass-card p-6 mt-6">
              <h3 className="heading-sm mb-4 flex items-center gap-2">
                <TrendingUp size={18} style={{ color: "var(--accent-primary)" }} />
                Quick Stats
              </h3>
              <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Code runs</span>
                  <span className="font-medium">{stats?.codeRuns || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Courses started</span>
                  <span className="font-medium">{stats?.coursesStarted?.length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Lessons viewed</span>
                  <span className="font-medium">{stats?.lessonsViewed || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}