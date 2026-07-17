"use client";

import MarkdownContent from "./MarkdownContent";
import BookmarkButton from "./BookmarkButton";
import LessonCompletion from "./LessonCompletion";
import CodeEditor from "./CodeEditor";

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
}

export default function LessonContent({ lesson, course, lessonIndex, totalLessons }: LessonContentProps) {
  return (
    <>
      {/* Lesson Header */}
      <div className="flex items-start justify-between mb-8">
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
    </>
  );
}
