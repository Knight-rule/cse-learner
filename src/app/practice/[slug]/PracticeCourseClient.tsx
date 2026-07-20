"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Search, CheckCircle2, Circle as CircleIcon, ArrowRight, BookOpen, Award, Layers } from "lucide-react";
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
const SORTS = [
  { value: "default", label: "Default" },
  { value: "difficulty", label: "Difficulty" },
  { value: "name", label: "Name (A-Z)" },
  { value: "status", label: "Status (Unsolved first)" },
] as const;
const PAGE_SIZE = 25;

export default function PracticeCourseClient({ slug, courseTitle, courseIcon, courseColor, problems }: Props) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]["value"]>("default");
  const [chapterFilter, setChapterFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [solved, setSolved] = useState<Set<string>>(() => getSolvedProblems());

  const color = courseColor.split(" ")[0] || "#f97316";

  useEffect(() => {
    setPage(1);
  }, [query, difficulty, chapterFilter, sort]);

  const allChapters = useMemo(() => {
    const list: string[] = [];
    for (const p of problems) {
      const ch = p.chapter || "General";
      if (!list.includes(ch)) list.push(ch);
    }
    return list;
  }, [problems]);

  // Chapter counts (from full set, for the sidebar)
  const chapterCounts = useMemo(() => {
    const map = new Map<string, { total: number; solved: number }>();
    for (const p of problems) {
      const ch = p.chapter || "General";
      const entry = map.get(ch) || { total: 0, solved: 0 };
      entry.total++;
      if (solved.has(p.id)) entry.solved++;
      map.set(ch, entry);
    }
    return map;
  }, [problems, solved]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return problems.filter((p) => {
      if (difficulty !== "All" && p.difficulty !== difficulty.toLowerCase()) return false;
      if (chapterFilter && (p.chapter || "General") !== chapterFilter) return false;
      if (q && !p.title.toLowerCase().includes(q) && !(p.chapter || "").toLowerCase().includes(q)) return false;
      return true;
    });
  }, [problems, query, difficulty, chapterFilter]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "name") arr.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "difficulty") {
      const order = { easy: 0, medium: 1, hard: 2 };
      arr.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    } else if (sort === "status") {
      arr.sort((a, b) => (solved.has(a.id) ? 1 : 0) - (solved.has(b.id) ? 1 : 0));
    }
    return arr;
  }, [filtered, sort, solved]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
          <div className="practice-layout-2">
            {/* Chapter sidebar */}
            <aside className="practice-sidebar">
              <h3 className="practice-sidebar-title"><Layers size={14} /> Chapters</h3>
              <button
                className={"practice-chapter-pill" + (chapterFilter === null ? " active" : "")}
                onClick={() => setChapterFilter(null)}
              >
                <span>All Chapters</span>
                <span className="practice-chapter-count">{problems.length}</span>
              </button>
              {allChapters.map((ch) => {
                const c = chapterCounts.get(ch) || { total: 0, solved: 0 };
                return (
                  <button
                    key={ch}
                    className={"practice-chapter-pill" + (chapterFilter === ch ? " active" : "")}
                    onClick={() => setChapterFilter(chapterFilter === ch ? null : ch)}
                  >
                    <span className="practice-chapter-pill-name">{ch}</span>
                    <span className="practice-chapter-count">{c.solved}/{c.total}</span>
                  </button>
                );
              })}
            </aside>

            {/* Main */}
            <div className="practice-main">
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
                <select className="practice-sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {sorted.length === 0 && (
                <div className="text-center body-md" style={{ color: "var(--text-muted)", padding: "48px 0" }}>
                  No problems match your filters.
                </div>
              )}

              {sorted.length > 0 && (
                <div className="practice-table">
                  <div className="practice-table-head">
                    <span style={{ width: 48 }}>#</span>
                    <span style={{ flex: 1 }}>Problem</span>
                    <span className="practice-col-chapter">Chapter</span>
                    <span style={{ width: 110, textAlign: "center" }}>Difficulty</span>
                    <span style={{ width: 90, textAlign: "center" }}>Status</span>
                    <span style={{ width: 40 }} />
                  </div>

                  {pageItems.map((problem, i) => {
                    const isSolved = solved.has(problem.id);
                    const diffClass = problem.difficulty === "easy" ? "badge-green" : problem.difficulty === "medium" ? "badge-accent" : "badge-purple";
                    const globalIndex = (currentPage - 1) * PAGE_SIZE + i + 1;
                    return (
                      <Link
                        key={problem.id}
                        href={`/practice/${slug}/${problem.id}`}
                        className="practice-table-row group"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <span style={{ width: 48, color: "var(--text-muted)", fontWeight: 700 }}>{globalIndex}</span>
                        <span style={{ flex: 1, minWidth: 0 }} className="practice-problem-name">
                          <span className="heading-sm">{problem.title}</span>
                        </span>
                        <span className="practice-col-chapter">
                          <span className="practice-chapter-badge">{problem.chapter || "General"}</span>
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
              )}

              {totalPages > 1 && (
                <div className="practice-pagination">
                  <button
                    className="practice-page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setPage(currentPage - 1)}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      className={"practice-page-btn" + (p === currentPage ? " active" : "")}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    className="practice-page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
