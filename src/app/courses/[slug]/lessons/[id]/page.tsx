import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, Bookmark } from "lucide-react";
import { courses, getCourse, getLesson } from "@/data/courses";
import { notFound } from "next/navigation";
import CodeEditor from "@/components/CodeEditor";
import BookmarkButton from "@/components/BookmarkButton";
import LessonTracker from "@/components/LessonTracker";

export function generateStaticParams() {
  const params: { slug: string; id: string }[] = [];
  courses.forEach((c) => {
    c.lessons.forEach((l) => {
      params.push({ slug: c.slug, id: l.id });
    });
  });
  return params;
}

export default async function LessonPage({ params }: { params: { slug: string; id: string } }) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  const lessonIndex = course.lessons.findIndex((l) => l.id === params.id);
  if (lessonIndex === -1) notFound();

  const lesson = course.lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

  return (
    <div className="py-12">
      <LessonTracker courseSlug={course.slug} courseTitle={course.title} lessonTitle={lesson.title} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-dark-400 text-sm mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/courses" className="hover:text-primary-600">Courses</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/courses/${course.slug}`} className="hover:text-primary-600">{course.title}</Link>
          <ChevronRight className="w-4 h-4" />
          <span>{lesson.title}</span>
        </div>

        {/* Lesson Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <span className="text-sm text-primary-600 font-medium mb-2 block">
              Lesson {lessonIndex + 1} of {course.lessons.length}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold">{lesson.title}</h1>
          </div>
          <BookmarkButton
            data={{ type: "lesson", slug: course.slug, lessonId: lesson.id, title: lesson.title, courseTitle: course.title }}
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-10">
          {lesson.content.split("\n").map((para, i) => {
            if (para.startsWith("- ")) {
              return (
                <li key={i} className="text-dark-600 ml-4">
                  {para.substring(2)}
                </li>
              );
            }
            if (para.match(/^\d+\./)) {
              return (
                <li key={i} className="text-dark-600 ml-4">
                  {para.replace(/^\d+\.\s*/, "")}
                </li>
              );
            }
            if (para.trim() === "") return <br key={i} />;
            return (
              <p key={i} className="text-dark-600 leading-relaxed">
                {para}
              </p>
            );
          })}
        </div>

        {/* Code Example */}
        {lesson.codeExample && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">Code Example</h2>
            <CodeEditor code={lesson.codeExample} language={lesson.language} />
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t">
          {prevLesson ? (
            <Link
              href={`/courses/${course.slug}/lessons/${prevLesson.id}`}
              className="flex items-center gap-2 text-dark-500 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs text-dark-400">Previous</div>
                <div className="font-medium">{prevLesson.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/courses/${course.slug}/lessons/${nextLesson.id}`}
              className="flex items-center gap-2 text-right text-dark-500 hover:text-primary-600 transition-colors"
            >
              <div>
                <div className="text-xs text-dark-400">Next</div>
                <div className="font-medium">{nextLesson.title}</div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={`/quiz?course=${course.slug}`}
              className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              Take Quiz <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
