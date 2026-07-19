import Link from "next/link";
import { ChevronRight, BookOpen, Play, Brain, ArrowRight } from "lucide-react";
import { courses, getCourse } from "@/data/courses";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  const colors = course.color.split(" ");

  return (
    <div className="section">
      <div className="container-sm">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <Link href="/courses">Courses</Link>
          <ChevronRight size={14} />
          <span>{course.title}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div
            className="flex items-center justify-center mb-6"
            style={{
              width: 64,
              height: 64,
              borderRadius: "var(--radius-lg)",
              background: "linear-gradient(135deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")",
              fontSize: 32,
            }}
          >
            {course.icon}
          </div>
          <h1 className="heading-xl mb-4">{course.title}</h1>
          <p className="body-lg" style={{ maxWidth: 560 }}>{course.description}</p>
          <div className="flex items-center gap-6 mt-6">
            <span className="badge badge-cyan"><BookOpen size={14} /> {course.lessons.length} Lessons</span>
            <span className="badge badge-purple"><Brain size={14} /> {course.quiz.length} Quiz Questions</span>
          </div>
        </div>

        {/* Lessons */}
        <div className="mb-12">
          <h2 className="heading-md mb-6">Lessons</h2>
          <div className="lesson-list">
            {course.lessons.map((lesson, i) => (
              <Link
                key={lesson.id}
                href={"/courses/" + course.slug + "/lessons/" + lesson.id}
                className="lesson-item"
              >
                <div
                  className="lesson-num"
                  style={{ background: colors[0] + "20", color: colors[0] }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="heading-sm">{lesson.title}</h3>
                  <p className="body-sm mt-4" style={{ marginTop: 4 }}>
                    {lesson.content.split("\n")[0].substring(0, 100)}...
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {lesson.codeExample && (
                    <span className="badge badge-green"><Play size={12} /> Code</span>
                  )}
                  <ArrowRight size={16} style={{ color: "var(--text-muted)" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quiz CTA */}
        <div className="glass-strong p-8" style={{ borderRadius: "var(--radius-xl)" }}>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: "var(--radius-md)",
                background: "var(--accent-purple)",
              }}
            >
              <Brain size={24} color="#fff" />
            </div>
            <div>
              <h3 className="heading-sm">Ready to Test Yourself?</h3>
              <p className="body-sm">{course.quiz.length} questions to check your understanding</p>
            </div>
          </div>
          <Link
            href={"/quiz?course=" + course.slug}
            className="btn btn-primary"
            style={{ marginTop: 16 }}
          >
            Take Quiz <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
