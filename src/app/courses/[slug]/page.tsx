import Link from "next/link";
import { ChevronRight, BookOpen, Code, ArrowRight, ExternalLink } from "lucide-react";
import { courses, getCourse } from "@/data/courses";
import CertificateBadge from "@/components/CertificateBadge";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
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

        <div style={{ height: 8, borderRadius: 8, background: "linear-gradient(90deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")", marginBottom: 32 }} />

        <div className="mb-12">
          <div style={{ fontSize: 48, marginBottom: 16 }}>{course.icon}</div>
          <h1 className="heading-xl mb-4">{course.title}</h1>
          <p className="body-lg" style={{ maxWidth: 560 }}>{course.description}</p>
          <div className="flex items-center gap-4 mt-6">
            <span className="badge badge-accent"><BookOpen size={14} /> {course.lessons.length} Lessons</span>
            <Link href={"/practice/" + course.slug} className="badge badge-purple" style={{ textDecoration: "none" }}>
              <Code size={14} /> Practice Problems
            </Link>
            {course.notesUrl && (
              <a
                href={course.notesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="badge badge-purple"
                style={{ textDecoration: "none" }}
              >
                <ExternalLink size={14} /> View Notes
              </a>
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="heading-lg mb-6">Lessons</h2>
          <div className="lesson-list">
            {course.lessons.map((lesson, i) => (
              <Link
                key={lesson.id}
                href={"/courses/" + course.slug + "/lessons/" + lesson.id}
                className="lesson-item"
              >
                <div className="lesson-num" style={{ background: colors[0] + "20", color: colors[0] }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="heading-sm">{lesson.title}</h3>
                  <p className="body-sm" style={{ marginTop: 4 }}>
                    {lesson.content.split("\n")[0].substring(0, 100)}...
                  </p>
                </div>
                <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-card p-8" style={{ background: "var(--gradient-soft)", borderRadius: "var(--radius-xl)" }}>
          <div className="flex items-center gap-4 mb-4">
            <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Code size={24} color="#fff" />
            </div>
            <div>
              <h3 className="heading-sm">Ready to Practice?</h3>
              <p className="body-sm">Solve coding challenges to check your understanding</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={"/practice/" + course.slug} className="btn btn-primary">
              Start Practice <ArrowRight size={16} />
            </Link>
            <Link href={"/courses/" + course.slug + "/lessons/1"} className="btn btn-outline">
              Start Learning <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ marginTop: 16 }}>
            <CertificateBadge courseSlug={course.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
