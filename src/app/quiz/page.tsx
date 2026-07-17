"use client";

import { useState, useMemo } from "react";
import { ChevronRight, BookOpen, Filter } from "lucide-react";
import Link from "next/link";
import { courses, getCourse, type QuizQuestion } from "@/data/courses";
import Quiz from "@/components/Quiz";

export default function QuizPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const course = selectedCourse ? getCourse(selectedCourse) : null;

  const chapters = useMemo(() => {
    if (!course) return [];
    return Array.from(new Set(course.quiz.map((q) => q.chapter).filter((c): c is string => !!c)));
  }, [course]);

  const filteredQuestions = useMemo(() => {
    if (!course) return [];
    let questions = course.quiz;
    if (selectedChapter !== "all") {
      questions = questions.filter((q) => q.chapter === selectedChapter);
    }
    if (selectedDifficulty !== "all") {
      questions = questions.filter((q) => q.difficulty === selectedDifficulty);
    }
    return questions;
  }, [course, selectedChapter, selectedDifficulty]);

  const getChapterQuestionCount = (chapter: string) => {
    if (!course) return 0;
    return course.quiz.filter((q) => q.chapter === chapter).length;
  };

  const getDifficultyCount = (difficulty: string) => {
    if (!course) return 0;
    let questions = course.quiz;
    if (selectedChapter !== "all") {
      questions = questions.filter((q) => q.chapter === selectedChapter);
    }
    return questions.filter((q) => q.difficulty === difficulty).length;
  };

  const resetFilters = () => {
    setSelectedChapter("all");
    setSelectedDifficulty("all");
  };

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-dark-400 text-sm mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Quiz</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">Quiz Center</h1>
        <p className="text-dark-500 text-lg mb-10">
          Test your knowledge chapter by chapter. Choose a course and filter by difficulty.
        </p>

        {!selectedCourse ? (
          <div className="space-y-4">
            {courses.map((c) => (
              <button
                key={c.slug}
                onClick={() => setSelectedCourse(c.slug)}
                className="w-full flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all text-left"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-xl shrink-0`}>
                  {c.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                  <p className="text-dark-400 text-sm">
                    {c.quiz.length} questions · {new Set(c.quiz.map((q) => q.chapter)).size} chapters
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-dark-300" />
              </button>
            ))}
          </div>
        ) : course ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <button
                  onClick={() => { setSelectedCourse(null); resetFilters(); }}
                  className="text-sm text-primary-600 hover:text-primary-700 mb-2"
                >
                  ← Change Course
                </button>
                <h2 className="text-2xl font-bold">{course.title} Quiz</h2>
              </div>
            </div>

            {/* Chapter Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-dark-500" />
                <span className="text-sm font-medium text-dark-600">Chapter</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedChapter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedChapter === "all"
                      ? "bg-primary-100 text-primary-700 ring-1 ring-primary-300"
                      : "bg-dark-50 text-dark-600 hover:bg-dark-100"
                  }`}
                >
                  All ({course.quiz.length})
                </button>
                {chapters.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setSelectedChapter(ch)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedChapter === ch
                        ? "bg-primary-100 text-primary-700 ring-1 ring-primary-300"
                        : "bg-dark-50 text-dark-600 hover:bg-dark-100"
                    }`}
                  >
                    {ch} ({getChapterQuestionCount(ch)})
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-dark-500" />
                <span className="text-sm font-medium text-dark-600">Difficulty</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDifficulty("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedDifficulty === "all"
                      ? "bg-primary-100 text-primary-700 ring-1 ring-primary-300"
                      : "bg-dark-50 text-dark-600 hover:bg-dark-100"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedDifficulty("easy")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedDifficulty === "easy"
                      ? "bg-green-100 text-green-700 ring-1 ring-green-300"
                      : "bg-dark-50 text-dark-600 hover:bg-dark-100"
                  }`}
                >
                  Easy ({getDifficultyCount("easy")})
                </button>
                <button
                  onClick={() => setSelectedDifficulty("medium")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedDifficulty === "medium"
                      ? "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300"
                      : "bg-dark-50 text-dark-600 hover:bg-dark-100"
                  }`}
                >
                  Medium ({getDifficultyCount("medium")})
                </button>
                <button
                  onClick={() => setSelectedDifficulty("hard")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedDifficulty === "hard"
                      ? "bg-red-100 text-red-700 ring-1 ring-red-300"
                      : "bg-dark-50 text-dark-600 hover:bg-dark-100"
                  }`}
                >
                  Hard ({getDifficultyCount("hard")})
                </button>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-dark-500">
              Showing {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""}
              {selectedChapter !== "all" && ` in ${selectedChapter}`}
              {selectedDifficulty !== "all" && ` (${selectedDifficulty})`}
            </div>

            {/* Quiz */}
            {filteredQuestions.length > 0 ? (
              <Quiz
                questions={filteredQuestions}
                courseSlug={course.slug}
                quizTitle={`${course.title} Quiz${selectedChapter !== "all" ? ` - ${selectedChapter}` : ""}${selectedDifficulty !== "all" ? ` (${selectedDifficulty})` : ""}`}
              />
            ) : (
              <div className="text-center py-10 text-dark-400">
                <p className="font-medium">No questions match your filters</p>
                <button onClick={resetFilters} className="mt-2 text-sm text-primary-600 hover:text-primary-700">
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
