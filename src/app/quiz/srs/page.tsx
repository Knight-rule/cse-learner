"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, RotateCcw, Brain, Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft, Zap, BookOpen, Target } from "lucide-react";
import { courses } from "@/data/courses";
import { getDueSRSCards, reviewSRSCard, getOrCreateSRSCard, getSRSStatsForCourse, getAllSRSStats } from "@/lib/tracker";

type Quality = 0 | 1 | 2 | 3 | 4 | 5;

const QUALITY_LABELS: Record<Quality, { label: string; color: string; desc: string }> = {
  0: { label: "Complete Blackout", color: "text-red-500", desc: "No clue at all" },
  1: { label: "Incorrect, Recalled", color: "text-red-400", desc: "Wrong, but knew it after seeing answer" },
  2: { label: "Incorrect, Easy Fix", color: "text-orange-400", desc: "Small mistake, easy to correct" },
  3: { label: "Hard, Correct", color: "text-yellow-400", desc: "Correct but took effort" },
  4: { label: "Good", color: "text-lime-400", desc: "Correct with minor hesitation" },
  5: { label: "Perfect", color: "text-green-400", desc: "Instant, effortless recall" },
};

const QUALITY_KEYS: Record<string, Quality> = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
};

export default function SRSQuizPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [mode, setMode] = useState<"review" | "new">("review");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<Quality | null>(null);
  const [dueCards, setDueCards] = useState<any[]>([]);
  const [newCards, setNewCards] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0, streak: 0 });

  useEffect(() => {
    loadCards();
  }, [selectedCourse, mode]);

  const loadCards = () => {
    if (mode === "review") {
      const due = getDueSRSCards(selectedCourse === "all" ? undefined : selectedCourse);
      setDueCards(due);
    } else {
      // Get all cards for this course, filter for new ones
      const allCards = require("@/lib/tracker").getSRSCards();
      const courseCards = selectedCourse === "all" ? allCards : allCards.filter((c: any) => c.courseSlug === selectedCourse);
      const newOnes = courseCards.filter((c: any) => c.repetition === 0).slice(0, 20);
      setNewCards(newOnes);
    }
    loadStats();
  };

  const loadStats = () => {
    if (selectedCourse === "all") {
      setStats(getAllSRSStats());
    } else {
      setStats(getSRSStatsForCourse(selectedCourse));
    }
  };

  const currentCard = mode === "review" ? dueCards[currentIndex] : newCards[currentIndex];
  const currentQuestion = currentCard
    ? courses.flatMap((c) => c.quiz).find((q) => q.id === currentCard.questionId)
    : null;

  const handleAnswer = (quality: Quality) => {
    if (!currentCard || answered) return;

    setSelectedQuality(quality);
    setShowAnswer(true);
    setAnswered(true);

    const result = reviewSRSCard(currentCard.questionId, currentCard.courseSlug, quality);
    if (result) {
      setSessionStats((prev) => ({
        reviewed: prev.reviewed + 1,
        correct: prev.correct + (quality >= 3 ? 1 : 0),
        streak: quality >= 3 ? prev.streak + 1 : 0,
      }));
    }

    setTimeout(() => nextCard(), 1500);
  };

  const nextCard = () => {
    if (mode === "review") {
      if (currentIndex < dueCards.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setMode("new");
        setCurrentIndex(0);
      }
    } else {
      if (currentIndex < newCards.length - 1) {
        setCurrentIndex((i) => i + 1);
      }
    }
    setShowAnswer(false);
    setAnswered(false);
    setSelectedQuality(null);
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setShowAnswer(false);
      setAnswered(false);
      setSelectedQuality(null);
    }
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    handleKeyDownNative(e.nativeEvent);
  }, [answered, currentCard]);

  const handleKeyDownNative = useCallback((e: KeyboardEvent) => {
    if (answered) {
      if (e.key === "Enter" || e.key === " ") {
        nextCard();
      }
      return;
    }

    if (QUALITY_KEYS[e.key]) {
      handleAnswer(QUALITY_KEYS[e.key]);
    }
  }, [answered, currentCard]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDownNative);
    return () => window.removeEventListener("keydown", handleKeyDownNative);
  }, [handleKeyDownNative]);

  if (!currentCard && mode === "review" && dueCards.length === 0) {
    return (
      <div className="section">
        <div className="container text-center py-20">
          <Brain size={64} className="mx-auto mb-6" style={{ color: "var(--accent-primary)" }} />
          <h1 className="heading-xl mb-4">All Caught Up! 🎉</h1>
          <p className="body-lg text-text-muted mb-8 max-w-md mx-auto">
            No cards due for review. Great job staying on top of your spaced repetition!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/quiz" className="btn btn-primary">
              Try Regular Quiz
            </Link>
            <Link href="/paths" className="btn btn-outline">
              Browse Learning Paths
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard && mode === "new" && newCards.length === 0) {
    return (
      <div className="section">
        <div className="container text-center py-20">
          <Zap size={64} className="mx-auto mb-6" style={{ color: "var(--accent-primary)" }} />
          <h1 className="heading-xl mb-4">No New Cards</h1>
          <p className="body-lg text-text-muted mb-8 max-w-md mx-auto">
            All questions for this course have been added to your review queue.
          </p>
          <Link href="/quiz" className="btn btn-primary">
            Try Regular Quiz
          </Link>
        </div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / (mode === "review" ? dueCards.length : newCards.length)) * 100;

  return (
    <div className="section" onKeyDown={handleKeyDown}>
      <div className="container">
        <Link href="/quiz" className="inline-flex items-center gap-2 text-text-muted hover:text-accent-primary mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Quiz
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 glass-card p-4">
          <div className="flex items-center gap-2">
            <Brain size={20} style={{ color: "var(--accent-primary)" }} />
            <span className="font-medium">SRS Review</span>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedCourse}
              onChange={(e) => { setSelectedCourse(e.target.value); setCurrentIndex(0); }}
              className="select select-sm"
            >
              <option value="all">All Courses</option>
              {courses.map((c) => (
                <option key={c.slug} value={c.slug}>{c.icon} {c.title}</option>
              ))}
            </select>

            <div className="flex gap-2 border-l border-border/50 pl-4 ml-2">
              <button
                onClick={() => { setMode("review"); setCurrentIndex(0); }}
                className={`px-3 py-1 rounded text-sm transition ${mode === "review" ? "btn-primary" : "btn-outline"}`}
              >
                Review ({dueCards.length})
              </button>
              <button
                onClick={() => { setMode("new"); setCurrentIndex(0); }}
                className={`px-3 py-1 rounded text-sm transition ${mode === "new" ? "btn-primary" : "btn-outline"}`}
              >
                New ({newCards.length})
              </button>
            </div>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>{stats.due}</div>
              <div className="text-xs text-text-muted">Due Now</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>{stats.learning}</div>
              <div className="text-xs text-text-muted">Learning</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>{stats.review}</div>
              <div className="text-xs text-text-muted">Review</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>{stats.mastered}</div>
              <div className="text-xs text-text-muted">Mastered</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>{stats.total}</div>
              <div className="text-xs text-text-muted">Total Cards</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>{sessionStats.reviewed}</div>
              <div className="text-xs text-text-muted">This Session</div>
            </div>
          </div>
        )}

        <div className="glass-card p-2 mb-6" style={{ height: 6, borderRadius: "var(--radius-full)", overflow: "hidden" }}>
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${progress}%`, background: "var(--gradient)", borderRadius: "var(--radius-full)" }}
          />
        </div>

        {currentCard && currentQuestion && (
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="badge badge-accent mb-3" style={{ display: "inline-block" }}>
                {currentQuestion.difficulty?.toUpperCase() || "MIXED"}
              </span>
              <h2 className="heading-lg">{currentQuestion.question}</h2>
            </div>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  disabled={answered}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    answered
                      ? i === currentQuestion.correctIndex
                        ? "bg-green-500/20 border-green-500/50"
                        : i === selectedQuality
                        ? "bg-red-500/20 border-red-500/50"
                        : "opacity-50"
                      : "hover:bg-accent-primary/10 border-border/50"
                  }`}
                  style={{ border: "1px solid var(--border)" }}
                  onClick={() => !answered && handleAnswer(i as Quality)}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {answered && i === currentQuestion.correctIndex && (
                      <CheckCircle size={20} style={{ color: "var(--accent-green)" }} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showAnswer && (
              <div className="p-4 rounded-lg mb-6" style={{ background: "var(--accent-primary)/10", border: "1px solid var(--accent-primary)/30" }}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={18} style={{ color: "var(--accent-primary)" }} />
                  <strong>Explanation:</strong>
                </div>
                <p className="body-md">{currentQuestion.explanation}</p>
              </div>
            )}

            {!answered && (
              <div className="space-y-4">
                <p className="text-center text-sm text-text-muted">
                  Press <kbd className="px-1.5 py-0.5 rounded glass-card">0-5</kbd> to rate your recall, or click buttons below
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {([0, 1, 2, 3, 4, 5] as Quality[]).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleAnswer(q)}
                      className={`p-3 rounded-lg text-sm transition-all border ${
                        QUALITY_LABELS[q].color
                      } hover:bg-current/10`}
                      style={{ borderColor: "currentColor" }}
                    >
                      <div className="font-medium">{QUALITY_LABELS[q].label}</div>
                      <div className="text-xs opacity-70">{QUALITY_LABELS[q].desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {answered && (
              <div className="text-center">
                <p className="text-sm text-text-muted mb-2">
                  Next review in: <strong>{currentCard.interval === 0 ? "Today" : currentCard.interval === 1 ? "1 day" : `${currentCard.interval} days`}</strong>
                </p>
                <button
                  onClick={nextCard}
                  className="btn btn-primary"
                  disabled={mode === "review" && currentIndex === dueCards.length - 1 && dueCards.length > 0}
                >
                  {mode === "review" && currentIndex === dueCards.length - 1 ? "Finish Review" : "Next Card"}
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {currentIndex > 0 && !answered && (
          <button onClick={prevCard} className="btn btn-outline mt-4">
            <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />
            Previous
          </button>
        )}
      </div>
    </div>
  );
}