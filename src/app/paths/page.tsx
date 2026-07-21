"use client";

import Link from "next/link";
import { ChevronRight, Clock, BookOpen, Target, Users } from "lucide-react";
import { learningPaths } from "@/data/learning-paths";
import { courses } from "@/data/courses";

export default function PathsPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Learning Paths</span>
        </div>

        <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>Guided Curriculum</span>
        <h1 className="heading-xl mb-4">Learning Paths</h1>
        <p className="body-lg mb-12 max-w-2xl">
          Structured, semester-based roadmaps to guide you from beginner to job-ready.
          Each path combines courses in the optimal learning order with time estimates.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(400px, 100%), 1fr))", gap: 24 }}>
          {learningPaths.map((path) => {
            const pathCourses = path.courses.map((pc) =>
              courses.find((c) => c.slug === pc.slug)
            ).filter(Boolean);

            const completedCount = pathCourses.filter((c) => {
              if (!c) return false;
              if (typeof window !== "undefined") {
                try {
                  const data = localStorage.getItem("cse-learner-progress");
                  if (data) {
                    const progress = JSON.parse(data);
                    return progress.lessonsCompleted?.includes(`${c.slug}-1`);
                  }
                } catch {}
              }
              return false;
            }).length;

            return (
              <Link key={path.id} href={`/paths/${path.id}`} className="glass-card p-6 group hover:border-accent transition-colors" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "var(--radius-lg)", background: `var(--${path.color.replace("from-", "gradient-").replace("to-", "")})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                    {path.icon}
                  </div>
                  <div>
                    <h3 className="heading-md">{path.title}</h3>
                    <p className="body-sm" style={{ color: "var(--text-muted)", marginTop: 4 }}>{path.targetAudience}</p>
                  </div>
                </div>

                <p className="body-md mb-6" style={{ color: "var(--text-secondary)", flex: 1 }}>{path.description}</p>

                <div className="mb-6" style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                    {path.courses.map((pc, i) => {
                      const course = courses.find((c) => c.slug === pc.slug);
                      return (
                        <span
                          key={pc.slug}
                          className={`badge badge-sm ${pc.required ? "badge-primary" : "badge-outline"}`}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 12,
                            transition: "all 0.2s",
                          }}
                        >
                          <span style={{ opacity: 0.6 }}>{i + 1}.</span>
                          {course?.title || pc.slug}
                          {!pc.required && <span style={{ fontSize: 10, opacity: 0.7 }}>(optional)</span>}
                        </span>
                      );
                    })}
                  </div>

                  <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--text-muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={14} /> {path.estimatedTotalHours}h total
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <BookOpen size={14} /> {path.courses.length} courses
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Target size={14} /> {path.courses.filter((c) => c.required).length} required
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <span className="btn btn-outline btn-sm" style={{ opacity: 0.8 }}>
                    View Details <ChevronRight size={12} />
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {completedCount}/{path.courses.length} started
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}