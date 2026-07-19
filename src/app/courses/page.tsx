import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
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
          <h1 className="heading-xl mb-4">
            All <span className="gradient-text">Courses</span>
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
                className="course-card glow-border"
              >
                <div
                  className="course-thumb"
                  style={{ background: "linear-gradient(135deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")" }}
                >
                  <span>{course.icon}</span>
                </div>
                <div className="course-body">
                  <h2 className="heading-sm mb-2">{course.title}</h2>
                  <p className="body-md" style={{ marginBottom: 16 }}>{course.description}</p>
                  <div className="course-meta">
                    <span className="body-sm flex items-center gap-2">
                      <BookOpen size={14} /> {course.lessons.length} lessons
                    </span>
                    <span className="badge badge-cyan">
                      Start <ChevronRight size={12} />
                    </span>
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
