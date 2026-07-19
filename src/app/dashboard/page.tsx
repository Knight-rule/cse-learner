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

        <div className="mb-8">
          <h1 className="heading-xl mb-4">Your Dashboard</h1>
          <p className="body-lg">Track your learning progress and find opportunities</p>
        </div>

        <div className="mb-12">
          <DashboardStats />
        </div>

        <div className="grid grid-3" style={{ gap: 32 }}>
          <div style={{ gridColumn: "span 2" }}>
            <h2 className="heading-md mb-6">Enrolled Courses</h2>
            {enrolledCourses.length === 0 ? (
              <div className="glass p-8 text-center" style={{ borderRadius: "var(--radius-lg)" }}>
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
                      <div
                        className="flex items-center justify-center shrink-0"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "var(--radius-md)",
                          background: "linear-gradient(135deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")",
                          fontSize: 24,
                        }}
                      >
                        {course.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="heading-sm">{course.title}</h3>
                        <p className="body-sm" style={{ marginTop: 4 }}>{course.lessons.length} lessons · {quizzes} quizzes taken</p>
                      </div>
                      <ArrowRight size={16} style={{ color: "var(--text-muted)" }} />
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
            <div className="glass-strong p-6" style={{ borderRadius: "var(--radius-xl)", position: "sticky", top: 80 }}>
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  background: "var(--accent-cyan)",
                }}
              >
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
