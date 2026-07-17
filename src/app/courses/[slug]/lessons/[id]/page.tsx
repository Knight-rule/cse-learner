import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { courses, getCourse, getLesson } from "@/data/courses";
import { notFound } from "next/navigation";
import LessonContent from "@/components/LessonContent";
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
    <div className="py-12 dark:bg-dark-900 min-h-screen">
      <LessonTracker courseSlug={course.slug} courseTitle={course.title} lessonTitle={lesson.title} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-dark-400 dark:text-dark-500 text-sm mb-6">
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/courses" className="hover:text-primary-600 dark:hover:text-primary-400">Courses</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/courses/${course.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">{course.title}</Link>
          <ChevronRight className="w-4 h-4" />
          <span>{lesson.title}</span>
        </div>

        {/* Lesson Content */}
        <LessonContent
          lesson={lesson}
          course={{ slug: course.slug, title: course.title }}
          lessonIndex={lessonIndex}
          totalLessons={course.lessons.length}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-dark-700">
          {prevLesson ? (
            <Link
              href={`/courses/${course.slug}/lessons/${prevLesson.id}`}
              className="flex items-center gap-2 text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs text-dark-400 dark:text-dark-500">Previous</div>
                <div className="font-medium">{prevLesson.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/courses/${course.slug}/lessons/${nextLesson.id}`}
              className="flex items-center gap-2 text-right text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <div>
                <div className="text-xs text-dark-400 dark:text-dark-500">Next</div>
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
