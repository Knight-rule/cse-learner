"use client";

import MarkdownContent from "./MarkdownContent";
import BookmarkButton from "./BookmarkButton";
import LessonCompletion from "./LessonCompletion";
import CodeEditor from "./CodeEditor";
import LessonDiagram from "./LessonDiagram";

interface LessonContentProps {
  lesson: {
    id: string;
    title: string;
    content: string;
    codeExample?: string;
    language?: string;
  };
  course: {
    slug: string;
    title: string;
  };
  lessonIndex: number;
  totalLessons: number;
  prevLesson?: { id: string; title: string } | null;
  nextLesson?: { id: string; title: string } | null;
}

function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export default function LessonContent({ lesson, course, lessonIndex, totalLessons, prevLesson, nextLesson }: LessonContentProps) {
  const readingTime = estimateReadingTime(lesson.content);

  return (
    <>
      {/* Lesson Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2 block">
            Lesson {lessonIndex + 1} of {totalLessons}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold">{lesson.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <LessonCompletion
            courseSlug={course.slug}
            lessonId={lesson.id}
            lessonTitle={lesson.title}
          />
          <BookmarkButton
            data={{ type: "lesson", slug: course.slug, lessonId: lesson.id, title: lesson.title, courseTitle: course.title }}
          />
        </div>
      </div>

      {/* Meta bar: reading time + navigation */}
      <div className="flex items-center justify-between mb-8 pb-6" style={{ borderBottom: "1px solid var(--border, #333)" }}>
        <span style={{ fontSize: 13, color: "var(--text-secondary, #94a3b8)" }}>
          {readingTime}
        </span>
        <div className="flex items-center gap-4">
          {prevLesson && (
            <a
              href={`/courses/${course.slug}/lessons/${prevLesson.id}`}
              style={{ fontSize: 13, color: "var(--text-secondary, #94a3b8)", textDecoration: "none" }}
            >
              ← {prevLesson.title}
            </a>
          )}
          {nextLesson && (
            <a
              href={`/courses/${course.slug}/lessons/${nextLesson.id}`}
              style={{ fontSize: 13, color: "var(--text-primary, #e2e8f0)", fontWeight: 600, textDecoration: "none" }}
            >
              {nextLesson.title} →
            </a>
          )}
        </div>
      </div>

      {/* Concept Diagram */}
      <LessonDiagram courseSlug={course.slug} lessonId={lesson.id} />

      {/* Content */}
      <div className="mb-10">
        <MarkdownContent content={lesson.content} />
      </div>

      {/* Code Example */}
      {lesson.codeExample && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Code Example</h2>
          <CodeEditor code={lesson.codeExample} language={lesson.language} />
        </div>
      )}

      {/* Bottom navigation */}
      <div className="flex items-center justify-between mt-12 pt-6" style={{ borderTop: "1px solid var(--border, #333)" }}>
        {prevLesson ? (
          <a
            href={`/courses/${course.slug}/lessons/${prevLesson.id}`}
            style={{ fontSize: 14, color: "var(--text-secondary, #94a3b8)", textDecoration: "none" }}
          >
            ← {prevLesson.title}
          </a>
        ) : <span />}
        {nextLesson ? (
          <a
            href={`/courses/${course.slug}/lessons/${nextLesson.id}`}
            style={{ fontSize: 14, color: "var(--text-primary, #e2e8f0)", fontWeight: 600, textDecoration: "none" }}
          >
            {nextLesson.title} →
          </a>
        ) : <span />}
      </div>
    </>
  );
}
