import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, Code, ArrowRight, ExternalLink, Clock, GraduationCap, Target } from "lucide-react";
import { courses, getCourse } from "@/data/courses";
import CertificateBadge from "@/components/CertificateBadge";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: course.title,
    description: course.description,
    openGraph: { title: course.title + " | CSE Learner", description: course.description, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: course.title }] },
    twitter: { card: "summary_large_image", title: course.title + " | CSE Learner", description: course.description, images: ["/og-image.png"] },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const colors = course.color.split(" ");
  const estimatedMinutes = course.lessons.length * 12;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ═══ Premium Hero ═══ */}
      <div style={{
        background: `linear-gradient(135deg, ${colors[0]}10, ${colors[1] || colors[0]}08, transparent)`,
        borderBottom: "1px solid var(--border)",
        padding: "48px 0 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background pattern */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
          backgroundImage: `radial-gradient(circle at 80% 30%, ${colors[0]}08, transparent 60%), radial-gradient(circle at 20% 80%, ${colors[1] || colors[0]}06, transparent 60%)`,
          pointerEvents: "none",
        }} />

        <div className="container-sm" style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <div className="breadcrumb" style={{ marginBottom: 28 }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/courses">Courses</Link>
            <ChevronRight size={14} />
            <span>{course.title}</span>
          </div>

          {/* Course header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            <div style={{
              width: 72, height: 72,
              borderRadius: "var(--radius-xl)",
              background: `linear-gradient(135deg, ${colors[0]}22, ${colors[1] || colors[0]}22)`,
              border: `1px solid ${colors[0]}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36, flexShrink: 0,
              boxShadow: `0 8px 32px ${colors[0]}15`,
            }}>{course.icon}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: 8,
                lineHeight: 1.2,
              }}>{course.title}</h1>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 560, marginBottom: 20 }}>
                {course.description}
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { icon: <BookOpen size={15} />, label: `${course.lessons.length} Lessons`, color: colors[0] },
                  { icon: <Clock size={15} />, label: `~${estimatedMinutes} min`, color: "var(--text-muted)" },
                  { icon: <Target size={15} />, label: "Practice Available", color: "var(--accent-purple)" },
                ].map((stat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: stat.color }}>
                    {stat.icon}
                    <span style={{ fontWeight: 500 }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <Link
              href={"/courses/" + course.slug + "/lessons/1"}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px",
                borderRadius: "var(--radius-lg)",
                background: `linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]})`,
                color: "#fff", fontWeight: 600, fontSize: 14,
                textDecoration: "none",
                boxShadow: `0 4px 20px ${colors[0]}30`,
                transition: "all 0.3s",
              }}
            >
              Start Learning <ArrowRight size={16} />
            </Link>
            <Link
              href={"/practice/" + course.slug}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 20px",
                borderRadius: "var(--radius-lg)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)", fontWeight: 500, fontSize: 14,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <Code size={16} /> Practice Problems
            </Link>
            {course.notesUrl && (
              <a
                href={course.notesUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "12px 20px",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)", fontWeight: 500, fontSize: 14,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <ExternalLink size={16} /> Notes
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ═══ Course Lessons ═══ */}
      <div className="container-sm" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <GraduationCap size={20} style={{ color: colors[0] }} />
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)" }}>Course Lessons</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {course.lessons.map((lesson, i) => (
            <Link
              key={lesson.id}
              href={"/courses/" + course.slug + "/lessons/" + lesson.id}
              className="course-lesson-item"
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 18px",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Lesson number */}
              <div style={{
                width: 36, height: 36, borderRadius: "var(--radius-md)",
                background: `${colors[0]}15`,
                color: colors[0],
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>{i + 1}</div>

              {/* Title + preview */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 3 }}>
                  {lesson.title}
                </div>
                <div style={{
                  fontSize: 13, color: "var(--text-muted)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {lesson.content.split("\n")[0].substring(0, 80)}...
                </div>
              </div>

              <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            </Link>
          ))}
        </div>

        {/* ═══ CTA ═══ */}
        <div style={{
          marginTop: 48,
          padding: 32,
          borderRadius: "var(--radius-xl)",
          background: `linear-gradient(135deg, ${colors[0]}08, ${colors[1] || colors[0]}06)`,
          border: `1px solid ${colors[0]}15`,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎯</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
            Ready to Test Your Knowledge?
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, maxWidth: 400, margin: "0 auto 20px" }}>
            Apply what you've learned with coding challenges designed for this course.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href={"/practice/" + course.slug}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px",
                borderRadius: "var(--radius-lg)",
                background: `linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]})`,
                color: "#fff", fontWeight: 600, fontSize: 14,
                textDecoration: "none",
              }}
            >
              Start Practice <ArrowRight size={16} />
            </Link>
            <CertificateBadge courseSlug={course.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
