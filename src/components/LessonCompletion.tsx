"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Circle } from "lucide-react";

interface LessonCompletionProps {
  courseSlug: string;
  lessonId: string;
  lessonTitle: string;
}

function safeGetCompleted(): string[] {
  try {
    return JSON.parse(localStorage.getItem("cse-completed-lessons") || "[]");
  } catch {
    return [];
  }
}

export default function LessonCompletion({ courseSlug, lessonId, lessonTitle }: LessonCompletionProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const completedLessons = safeGetCompleted();
    setCompleted(completedLessons.includes(`${courseSlug}/${lessonId}`));
  }, [courseSlug, lessonId]);

  const toggle = () => {
    const completedLessons = safeGetCompleted();
    const key = `${courseSlug}/${lessonId}`;
    const idx = completedLessons.indexOf(key);

    if (idx > -1) {
      completedLessons.splice(idx, 1);
      setCompleted(false);
    } else {
      completedLessons.push(key);
      setCompleted(true);
    }
    try {
      localStorage.setItem("cse-completed-lessons", JSON.stringify(completedLessons));
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
        completed
          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
          : "bg-dark-50 dark:bg-dark-700 text-dark-600 dark:text-dark-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600"
      }`}
    >
      {completed ? (
        <>
          <CheckCircle className="w-4 h-4" />
          Completed
        </>
      ) : (
        <>
          <Circle className="w-4 h-4" />
          Mark as Done
        </>
      )}
    </button>
  );
}
