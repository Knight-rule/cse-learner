"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Search, CheckCircle2, Circle as CircleIcon, ArrowRight, BookOpen, Award } from "lucide-react";
import type { PracticeProblem } from "@/data/practice";
import { getSolvedProblems } from "@/lib/tracker";

interface Props {
  slug: string;
  courseTitle: string;
  courseIcon: string;
  courseColor: string;
  problems: PracticeProblem[];
}

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"] as const;

export default function PracticeCourseClient({ slug, courseTitle, courseIcon, courseColor, problems }: Props) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>("All");
  const [solved, setSolved] = useState<Set<string>>(() => getSolvedProblems());

  const color = courseColor.split(" ")[0] || "#f97316";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return problems.filter((p) => {
      if (difficulty !== "All" && p.difficulty !== difficulty.toLowerCase()) return false;
      if (q && !p.title.toLowerCase().includes(q) && !(p.chapter || "").toLowerCase().includes(q)) return false;
      return true;
    });
  }, [problems, query, difficulty]);

  // Group filtered problems by chapter
  const chapters = useMemo(() => {
    const map = new Map<string, PracticeProblem[]>();
    for (const p of filtered) {
      const ch = p.chapter || "General";
      if (!map.has(ch)) map.set(ch, []);
      map.get(ch)!.push(p);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const totalSolved = problems.filter((p) => solved.has(p.id)).length;
  const progress = problems.length > 0 ? Math.round((totalSolved / problems.length) * 100) : 0;
  const courseComplete = problems.length > 0 && totalSolved === problems.length;

  return (
    <div>
      {/* Header */}
      <div className="section-sm" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/practice">Practice</Link>
            <ChevronRight size={14} />
            <span>{courseTitle}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span style={{ fontSize: 40 }}>{courseIcon}</span>
            <div>
              <h1 className="heading-lg">{courseTitle}</h1>
              <p className="body-md">{problems.length} practice problems</p>
            </div>
          </div>

          {/* Progress */}
          <div className="practice-progress">
            <div className="practice-progress-bar" style={{ width: progress + "%", background: color }} />
          </div>
          <p className="body-sm" style={{ color: "var(--text-muted)", marginTop: 8 }}>
            <CheckCircle2 size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 4, color: "var(--accent-green)" }} />
            {totalSolved} / {problems.length} solved ({progress}%)
          </p>
          {courseComplete ? (
            <Link href={"/certificates/" + slug} className="btn btn-primary mt-4" style={{ display: "inline-flex" }}>
              <Award size={16} /> View Your Certificate
            </Link>
          ) : (
            <p className="body-sm" style={{ marginTop: 8 }}>
              <Award size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 4, color: "var(--text-muted)" }} />
              Solve all problems to earn your certificate
            </p>
          )}
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Controls */}
          <div className="practice-controls">
            <div className="practice-search">
              <Search size={16} style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search problems or chapters..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="practice-filters">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={"practice-filter-btn" + (difficulty === d ? " active" : "")}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {chapters.length === 0 && (
            <div className="text-center body-md" style={{ color: "var(--text-muted)", padding: "48px 0" }}>
              No problems match your filters.
            </div>
          )}

          {/* Chapter sections */}
          {chapters.map(([chapter, chapterProblems]) => {
            const chapterSolved = chapterProblems.filter((p) => solved.has(p.id)).length;
            return (
              <div key={chapter} className="practice-chapter">
                <div className="practice-chapter-header">
                  <h2 className="heading-sm">
                    <BookOpen size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: 8, color }} />
                    {chapter}
                  </h2>
                  <span className="body-sm" style={{ color: "var(--text-muted)" }}>
                    {chapterSolved}/{chapterProblems.length} solved
                  </span>
                </div>

                <div className="practice-table">
                  {/* Header row */}
                  <div className="practice-table-head">
                    <span style={{ width: 48 }}>#</span>
                    <span style={{ flex: 1 }}>Problem</span>
                    <span style={{ width: 110, textAlign: "center" }}>Difficulty</span>
                    <span style={{ width: 90, textAlign: "center" }}>Status</span>
                    <span style={{ width: 40 }} />
                  </div>

                  {chapterProblems.map((problem, i) => {
                    const isSolved = solved.has(problem.id);
                    const diffClass = problem.difficulty === "easy" ? "badge-green" : problem.difficulty === "medium" ? "badge-accent" : "badge-purple";
                    return (
                      <Link
                        key={problem.id}
                        href={`/practice/${slug}/${problem.id}`}
                        className="practice-table-row group"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <span style={{ width: 48, color: "var(--text-muted)", fontWeight: 700 }}>{i + 1}</span>
                        <span style={{ flex: 1, minWidth: 0 }} className="practice-problem-name">
                          <span className="heading-sm">{problem.title}</span>
                        </span>
                        <span style={{ width: 110, textAlign: "center" }}>
                          <span className={"badge " + diffClass} style={{ fontSize: 11 }}>
                            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                          </span>
                        </span>
                        <span style={{ width: 90, textAlign: "center" }}>
                          {isSolved ? (
                            <span style={{ color: "var(--accent-green)", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600 }}>
                              <CheckCircle2 size={14} /> Solved
                            </span>
                          ) : (
                            <span style={{ color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13 }}>
                              <CircleIcon size={14} /> Unsolved
                            </span>
                          )}
                        </span>
                        <span style={{ width: 40, textAlign: "center" }}>
                          <ArrowRight size={16} style={{ color: "var(--text-muted)" }} className="group-hover:text-accent transition-colors" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
