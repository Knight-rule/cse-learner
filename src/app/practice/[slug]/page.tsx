import Link from "next/link";
import { ChevronRight, Code, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";

export function generateStaticParams() {
  return practiceData.map((cp) => ({ slug: cp.courseSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  return { title: `${course?.title || "Course"} Practice - CSE Learner` };
}

export default async function PracticeCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  const cp = practiceData.find((p) => p.courseSlug === slug);

  if (!course || !cp) {
    return (
      <div className="section">
        <div className="container text-center">
          <h1 className="heading-lg mb-4">Course Not Found</h1>
          <Link href="/practice" className="btn btn-primary">Back to Practice</Link>
        </div>
      </div>
    );
  }

  const colors = course.color.split(" ");

  return (
    <div>
      <div className="section-sm" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/practice">Practice</Link>
            <ChevronRight size={14} />
            <span>{course.title}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span style={{ fontSize: 40 }}>{course.icon}</span>
            <div>
              <h1 className="heading-lg">{course.title}</h1>
              <p className="body-md">{cp.problems.length} practice problems</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cp.problems.map((problem, i) => {
              const diffColor = problem.difficulty === "easy" ? "badge-green" : problem.difficulty === "medium" ? "badge-accent" : "badge-purple";
              return (
                <Link
                  key={problem.id}
                  href={`/practice/${slug}/${problem.id}`}
                  className="glass-card p-6 flex items-center gap-6 group hover:border-accent transition-colors"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="body-sm" style={{ color: "var(--text-muted)", minWidth: 32, textAlign: "center", fontWeight: 700 }}>
                    {i + 1}
                  </span>
                  <div style={{ height: 4, width: 4, borderRadius: "50%", background: colors[0], flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <h3 className="heading-sm mb-1">{problem.title}</h3>
                    <p className="body-sm" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 500 }}>
                      {problem.description.split("\n")[0]}
                    </p>
                  </div>
                  <span className={"badge " + diffColor} style={{ flexShrink: 0 }}>
                    {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </span>
                  {problem.chapter && (
                    <span className="badge" style={{ flexShrink: 0, background: "var(--surface)", color: "var(--text-secondary)", textTransform: "none", letterSpacing: "normal" }}>
                      {problem.chapter}
                    </span>
                  )}
                  <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} className="group-hover:text-accent transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
