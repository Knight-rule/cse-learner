import Link from "next/link";
import { ChevronRight, Code, BookOpen, ChevronDown } from "lucide-react";
import { courses } from "@/data/courses";
import { practiceData } from "@/data/practice";

export const metadata = {
  title: "Practice Problems - CSE Learner",
  description: "Solve coding challenges for every CS course topic",
};

export default function PracticePage() {
  return (
    <div className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Practice</span>
        </div>

        <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}><Code size={14} /> Practice</span>
        <h1 className="heading-xl mb-4">
          Solve <span className="gradient-text">Practice Problems</span>
        </h1>
        <p className="body-lg mb-12" style={{ maxWidth: 600 }}>
          Apply what you learn with coding challenges for every course topic. Write code, run tests, and master CS fundamentals.
        </p>

        <div className="practice-grid">
          {practiceData.map((cp) => {
            const course = courses.find((c) => c.slug === cp.courseSlug);
            if (!course) return null;
            const colors = course.color.split(" ");
            const difficulties = { easy: 0, medium: 0, hard: 0 };
            cp.problems.forEach((p) => { difficulties[p.difficulty]++; });

            return (
              <Link key={cp.courseSlug} href={`/practice/${cp.courseSlug}`} className="glass-card glass-card-glow" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ height: 4, borderRadius: "4px 4px 0 0", background: "linear-gradient(90deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")" }} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span style={{ fontSize: 28 }}>{course.icon}</span>
                    <div>
                      <h2 className="heading-sm">{course.title}</h2>
                      <p className="body-sm">{cp.problems.length} problems</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {difficulties.easy > 0 && <span className="badge badge-green" style={{ fontSize: 11 }}>{difficulties.easy} Easy</span>}
                    {difficulties.medium > 0 && <span className="badge badge-accent" style={{ fontSize: 11 }}>{difficulties.medium} Medium</span>}
                    {difficulties.hard > 0 && <span className="badge badge-purple" style={{ fontSize: 11 }}>{difficulties.hard} Hard</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-4" style={{ color: "var(--accent)", fontWeight: 600, fontSize: 14 }}>
                    <Code size={14} /> Start Practice <ChevronRight size={14} />
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
