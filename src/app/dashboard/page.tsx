"use client";

import Link from "next/link";
import { ChevronRight, Briefcase, ArrowRight } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import ActivityFeed from "@/components/ActivityFeed";
import { courses } from "@/data/courses";
import { getStats } from "@/lib/tracker";

export default function DashboardPage() {
  const stats = getStats();
  const enrolledCourses = courses.filter((c) => stats.coursesStarted.includes(c.slug));

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

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
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
                  const quizzes = stats.activities.filter((a) => a.type === "quiz" && a.courseSlug === course.slug).length;
                  return (
                    <Link key={course.slug} href={"/courses/" + course.slug} className="lesson-item">
                      <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                        {course.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="heading-sm">{course.title}</h3>
                        <p className="body-sm" style={{ marginTop: 4 }}>{course.lessons.length} lessons · {quizzes} quizzes taken</p>
                      </div>
                      <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    </Link>
                  );
                })}
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
          </div>
        </div>
      </div>
    </div>
  );
}
