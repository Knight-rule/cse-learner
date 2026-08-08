import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, ExternalLink, BookOpen, Code, CheckCircle2, Brain, Layers } from "lucide-react";
import { courses, getCourse } from "@/data/courses";
import { practiceData } from "@/data/practice";
import { notFound } from "next/navigation";
import LessonContent from "@/components/LessonContent";
import LessonTracker from "@/components/LessonTracker";

export const dynamic = "force-dynamic";

const prerequisiteMap: Record<string, { slug: string; title: string }[]> = {
  "algorithms": [{ slug: "data-structures", title: "Data Structures" }],
  "operating-systems": [{ slug: "data-structures", title: "Data Structures" }],
  "database-management": [{ slug: "data-structures", title: "Data Structures" }],
  "computer-networks": [{ slug: "operating-systems", title: "Operating Systems" }],
  "compiler-design": [{ slug: "data-structures", title: "Data Structures" }, { slug: "programming-cpp", title: "C++" }],
  "machine-learning": [{ slug: "python-fundamentals", title: "Python" }],
  "deep-learning": [{ slug: "machine-learning", title: "Machine Learning" }],
  "data-mining-warehousing": [{ slug: "data-structures", title: "Data Structures" }],
  "advanced-microprocessor": [{ slug: "digital-systems", title: "Digital Systems" }],
  "high-performance-computing": [{ slug: "multicore-programming", title: "Multicore Programming" }],
  "distributed-os": [{ slug: "operating-systems", title: "Operating Systems" }],
  "nlp": [{ slug: "machine-learning", title: "Machine Learning" }],
  "image-processing": [{ slug: "deep-learning", title: "Deep Learning" }],
  "automata-theory": [{ slug: "discrete-structures", title: "Discrete Structures" }],
  "probability-statistics": [{ slug: "discrete-structures", title: "Discrete Structures" }],
  "software-engineering": [{ slug: "object-oriented-programming", title: "OOP" }],
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string; id: string }> }): Promise<Metadata> {
  const { slug, id } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Not Found" };
  const lesson = course.lessons.find((l) => l.id === id);
  if (!lesson) return { title: "Not Found" };
  const raw = lesson.content.split("\n")[0];
  const truncated = raw.length <= 157 ? raw : raw.substring(0, 157).replace(/\s+\S*$/, "");
  const desc = truncated + (truncated.length < raw.length ? "..." : "");
  return {
    title: `${lesson.title} - ${course.title}`,
    description: desc,
    openGraph: { title: `${lesson.title} | ${course.title}`, description: desc, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: lesson.title }] },
    twitter: { card: "summary_large_image", title: `${lesson.title} | ${course.title}`, description: desc, images: ["/og-image.png"] },
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const lessonIndex = course.lessons.findIndex((l) => l.id === id);
  if (lessonIndex === -1) notFound();

  const lesson = course.lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;
  const colors = course.color.split(" ");
  const progress = Math.round(((lessonIndex + 1) / course.lessons.length) * 100);

  return (
    <div style={{ minHeight: "100vh" }}>
      <LessonTracker courseSlug={course.slug} courseTitle={course.title} lessonTitle={lesson.title} />

      {/* ═══ Premium Lesson Header ═══ */}
      <div style={{
        background: `linear-gradient(135deg, ${colors[0]}08, ${colors[1] || colors[0]}05)`,
        borderBottom: "1px solid var(--border)",
        padding: "32px 0 24px",
      }}>
        <div className="container-sm">
          {/* Breadcrumb */}
          <div className="breadcrumb" style={{ marginBottom: 20 }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/courses">Courses</Link>
            <ChevronRight size={14} />
            <Link href={"/courses/" + course.slug} style={{ color: colors[0] }}>{course.title}</Link>
            <ChevronRight size={14} />
            <span>{lesson.title}</span>
          </div>

          {/* Course context bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "var(--radius-md)",
                background: `linear-gradient(135deg, ${colors[0]}22, ${colors[1] || colors[0]}22)`,
                border: `1px solid ${colors[0]}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
              }}>{course.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{course.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <BookOpen size={12} /> Lesson {lessonIndex + 1} of {course.lessons.length}
                  </span>
                  <span>•</span>
                  <span>{progress}% complete</span>
                </div>
              </div>
            </div>

            {course.notesUrl && (
              <a
                href={course.notesUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  fontSize: 13, fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <ExternalLink size={14} /> View Notes
              </a>
            )}
          </div>

          {/* Progress bar */}
          <div style={{
            marginTop: 16,
            height: 3,
            borderRadius: 2,
            background: "var(--border)",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${colors[0]}, ${colors[1] || colors[0]})`,
              borderRadius: 2,
              transition: "width 0.5s ease",
            }} />
          </div>
        </div>
      </div>

      {/* ═══ Lesson Content ═══ */}
      {prerequisiteMap[course.slug] && lessonIndex === 0 && (
        <div className="container-sm" style={{ padding: "0 20px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 16px",
            marginTop: 24,
            borderRadius: "var(--radius-lg)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            fontSize: 13,
          }}>
            <Layers size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <span style={{ color: "var(--text-muted)" }}>Prerequisites:</span>
            {prerequisiteMap[course.slug].map((p) => (
              <Link
                key={p.slug}
                href={`/courses/${p.slug}`}
                style={{
                  padding: "3px 10px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  fontSize: 12, fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="container-sm" style={{ padding: "40px 20px 80px" }}>
        <LessonContent
          lesson={lesson}
          course={{ slug: course.slug, title: course.title }}
          lessonIndex={lessonIndex}
          totalLessons={course.lessons.length}
          prevLesson={prevLesson ? { id: prevLesson.id, title: prevLesson.title } : null}
          nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null}
        />

        {/* Practice This Topic */}
        {practiceData.some((p) => p.courseSlug === course.slug) && (
          <Link
            href={"/practice/" + course.slug}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              padding: "16px 24px",
              borderRadius: "var(--radius-lg)",
              background: "linear-gradient(135deg, rgba(92, 122, 107, 0.08), rgba(139, 94, 60, 0.06))",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              color: "var(--text-primary)",
              textDecoration: "none",
              fontSize: 15, fontWeight: 600,
              marginBottom: 32,
              transition: "all 0.2s",
            }}
          >
            <Brain size={18} style={{ color: "var(--accent-blue)" }} />
            Practice This Topic
            <ArrowRight size={16} style={{ color: "var(--accent-blue)" }} />
          </Link>
        )}

        {/* ═══ Lesson Sidebar Outline (below content on mobile) ═══ */}
        <div style={{
          marginTop: 48,
          padding: 24,
          borderRadius: "var(--radius-xl)",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
            Course Outline
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {course.lessons.map((l, i) => {
              const isCurrent = l.id === lesson.id;
              const isPast = i < lessonIndex;
              return (
                <Link
                  key={l.id}
                  href={"/courses/" + course.slug + "/lessons/" + l.id}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px",
                    borderRadius: "var(--radius-md)",
                    background: isCurrent ? `${colors[0]}12` : "transparent",
                    border: isCurrent ? `1px solid ${colors[0]}22` : "1px solid transparent",
                    color: isCurrent ? colors[0] : isPast ? "var(--text-muted)" : "var(--text-secondary)",
                    fontSize: 14, fontWeight: isCurrent ? 600 : 400,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: isPast ? `${colors[0]}22` : isCurrent ? colors[0] : "var(--surface)",
                    color: isPast ? colors[0] : isCurrent ? "#fff" : "var(--text-muted)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, flexShrink: 0,
                  }}>
                    {isPast ? "✓" : i + 1}
                  </span>
                  <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {l.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ═══ Navigation ═══ */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 48, paddingTop: 24,
          borderTop: "1px solid var(--border)",
        }}>
          {prevLesson ? (
            <Link
              href={"/courses/" + course.slug + "/lessons/" + prevLesson.id}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 16px",
                borderRadius: "var(--radius-lg)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <ArrowLeft size={16} />
              <div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Previous</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{prevLesson.title}</div>
              </div>
            </Link>
          ) : <div />}
          {nextLesson ? (
            <Link
              href={"/courses/" + course.slug + "/lessons/" + nextLesson.id}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 16px",
                borderRadius: "var(--radius-lg)",
                background: `linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]})`,
                color: "#fff",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, opacity: 0.8 }}>Next Lesson</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{nextLesson.title}</div>
              </div>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link
              href={"/practice/" + course.slug}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 20px",
                borderRadius: "var(--radius-lg)",
                background: "var(--gradient)",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Start Practice <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
