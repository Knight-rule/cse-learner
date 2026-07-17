import Link from "next/link";
import { ChevronRight, BookOpen, Play, Brain, ArrowRight } from "lucide-react";
import { courses, getCourse } from "@/data/courses";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-dark-400 text-sm mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/courses" className="hover:text-primary-600">Courses</Link>
          <ChevronRight className="w-4 h-4" />
          <span>{course.title}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-3xl mb-6`}>
            {course.icon}
          </div>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-dark-500 text-lg max-w-2xl">{course.description}</p>
          <div className="flex items-center gap-6 mt-6 text-sm text-dark-400">
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {course.lessons.length} Lessons</span>
            <span className="flex items-center gap-1"><Brain className="w-4 h-4" /> {course.quiz.length} Quiz Questions</span>
          </div>
        </div>

        {/* Lessons */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Lessons</h2>
          <div className="space-y-3">
            {course.lessons.map((lesson, i) => (
              <Link
                key={lesson.id}
                href={`/courses/${course.slug}/lessons/${lesson.id}`}
                className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg group-hover:text-primary-600 transition-colors">{lesson.title}</h3>
                  <p className="text-dark-400 text-sm truncate mt-0.5">
                    {lesson.content.split("\n")[0].substring(0, 100)}...
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {lesson.codeExample && (
                    <span className="hidden sm:flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                      <Play className="w-3 h-3" /> Code
                    </span>
                  )}
                  <ArrowRight className="w-5 h-5 text-dark-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quiz */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Ready to Test Yourself?</h3>
              <p className="text-primary-600 text-sm">{course.quiz.length} questions to check your understanding</p>
            </div>
          </div>
          <Link
            href={`/quiz?course=${course.slug}`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
          >
            Take Quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
