"use client";

import { useState, useMemo } from "react";
import { ChevronRight, BookOpen, Filter } from "lucide-react";
import Link from "next/link";
import { courses, getCourse } from "@/data/courses";
import Quiz from "@/components/Quiz";

export default function QuizPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const course = selectedCourse ? getCourse(selectedCourse) : null;

  const chapters = useMemo(() => {
    if (!course) return [];
    return Array.from(new Set(course.quiz.map((q) => q.chapter).filter(Boolean))) as string[];
  }, [course]);

  const filteredQuestions = useMemo(() => {
    if (!course) return [];
    let questions = course.quiz;
    if (selectedChapter !== "all") questions = questions.filter((q) => q.chapter === selectedChapter);
    if (selectedDifficulty !== "all") questions = questions.filter((q) => q.difficulty === selectedDifficulty);
    return questions;
  }, [course, selectedChapter, selectedDifficulty]);

  const getChapterCount = (ch: string) => course ? course.quiz.filter((q) => q.chapter === ch).length : 0;
  const getDiffCount = (d: string) => {
    if (!course) return 0;
    let q = course.quiz;
    if (selectedChapter !== "all") q = q.filter((x) => x.chapter === selectedChapter);
    return q.filter((x) => x.difficulty === d).length;
  };

  const resetFilters = () => { setSelectedChapter("all"); setSelectedDifficulty("all"); };

  return (
    <div className="section">
      <div className="container-sm">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Quiz</span>
        </div>

        <h1 className="heading-xl mb-4">
          Quiz <span className="gradient-text">Center</span>
        </h1>
        <p className="body-lg mb-12">
          Test your knowledge chapter by chapter. Choose a course and filter by difficulty.
        </p>

        {!selectedCourse ? (
          <div className="lesson-list">
            {courses.map((c) => {
              const colors = c.color.split(" ");
              return (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCourse(c.slug)}
                  className="lesson-item"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-md)",
                      background: "linear-gradient(135deg, " + colors[0] + ", " + (colors[1] || colors[0]) + ")",
                      fontSize: 24,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="heading-sm">{c.title}</h3>
                    <p className="body-sm" style={{ marginTop: 4 }}>
                      {c.quiz.length} questions · {new Set(c.quiz.map((q) => q.chapter)).size} chapters
                    </p>
                  </div>
                  <ChevronRight size={18} style={{ color: "var(--text-muted)" }} />
                </button>
              );
            })}
          </div>
        ) : course ? (
          <div className="glass-strong p-8" style={{ borderRadius: "var(--radius-xl)" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <button
                  onClick={() => { setSelectedCourse(null); resetFilters(); }}
                  className="body-sm mb-4"
                  style={{ color: "var(--accent-cyan)", cursor: "pointer", display: "block", marginBottom: 8 }}
                >
                  ← Change Course
                </button>
                <h2 className="heading-md">{course.title} Quiz</h2>
              </div>
            </div>

            {/* Chapter Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={14} style={{ color: "var(--text-muted)" }} />
                <span className="body-sm" style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Chapter</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setSelectedChapter("all")} className={"filter-pill" + (selectedChapter === "all" ? " active" : "")}>
                  All ({course.quiz.length})
                </button>
                {chapters.map((ch) => (
                  <button key={ch} onClick={() => setSelectedChapter(ch)} className={"filter-pill" + (selectedChapter === ch ? " active" : "")}>
                    {ch} ({getChapterCount(ch)})
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter size={14} style={{ color: "var(--text-muted)" }} />
                <span className="body-sm" style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Difficulty</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["all", "easy", "medium", "hard"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDifficulty(d)}
                    className={"filter-pill" + (selectedDifficulty === d ? " active" : "")}
                  >
                    {d === "all" ? "All" : d.charAt(0).toUpperCase() + d.slice(1)} {d !== "all" ? "(" + getDiffCount(d) + ")" : ""}
                  </button>
                ))}
              </div>
            </div>

            <div className="body-sm mb-4">
              Showing {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""}
              {selectedChapter !== "all" && " in " + selectedChapter}
              {selectedDifficulty !== "all" && " (" + selectedDifficulty + ")"}
            </div>

            {filteredQuestions.length > 0 ? (
              <Quiz
                questions={filteredQuestions}
                courseSlug={course.slug}
                quizTitle={course.title + " Quiz" + (selectedChapter !== "all" ? " - " + selectedChapter : "") + (selectedDifficulty !== "all" ? " (" + selectedDifficulty + ")" : "")}
              />
            ) : (
              <div className="empty-state" style={{ padding: 40 }}>
                <p className="heading-sm" style={{ color: "var(--text-muted)" }}>No questions match your filters</p>
                <button onClick={resetFilters} className="btn btn-ghost mt-4" style={{ color: "var(--accent-cyan)" }}>
                  Reset filters
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
