import Link from "next/link";
import { ChevronRight, BookOpen, ArrowRight } from "lucide-react";
import { courses } from "@/data/courses";

export default function CoursesPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Courses</span>
        </div>

        <div className="mb-12">
          <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>All Courses</span>
          <h1 className="heading-xl mb-4">
            Explore Our <span className="gradient-text">CS Courses</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: 560 }}>
            Choose a topic and start learning. Each course includes structured lessons, code examples, and quizzes.
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((course) => {
            const colors = course.color.split(" ");
            return (
              <Link
                key={course.slug}
                href={"/courses/" + course.slug}
                className="course-card-aiv glass-card-glow"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={{ height: 6, borderRadius: 6, background: "linear-gradient(90deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")", marginBottom: 24 }} />
                <div style={{ fontSize: 40, marginBottom: 16 }}>{course.icon}</div>
                <h2 className="course-title">{course.title}</h2>
                <p className="body-md" style={{ marginBottom: 16 }}>{course.description}</p>
                <ul className="course-features">
                  {course.lessons.slice(0, 3).map((l) => (
                    <li key={l.id}>{l.title}</li>
                  ))}
                </ul>
                <div className="flex items-center justify-between" style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <span className="body-sm"><BookOpen size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />{course.lessons.length} lessons</span>
                  <span className="flex items-center gap-2" style={{ color: "var(--accent)", fontWeight: 600, fontSize: 14 }}>
                    Start <ChevronRight size={14} />
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
