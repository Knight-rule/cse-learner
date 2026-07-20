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
            Choose a topic and start learning. Each course includes structured lessons and code examples.
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((course) => {
            const colors = course.color.split(" ");
            return (
              <div key={course.slug} className="course-card-vertical glass-card-glow">
                <Link
                  href={"/courses/" + course.slug}
                  style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}
                >
                  <div className="course-card-vertical-icon" style={{ background: "linear-gradient(135deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")" }}>
                    {course.icon}
                  </div>
                  <h2 className="course-title">{course.title}</h2>
                  <p className="body-md course-card-desc">{course.description}</p>
                  <div className="course-card-meta">
                    <span><BookOpen size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 5 }} />{course.lessons.length} lessons</span>
                  </div>
                </Link>
                <Link href={"/courses/" + course.slug} className="btn btn-primary course-card-start">
                  Start <ChevronRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
