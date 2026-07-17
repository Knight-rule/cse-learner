import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { courses } from "@/data/courses";

export default function CoursesPage() {
  return (
    <div className="py-12 dark:bg-dark-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-dark-400 dark:text-dark-500 text-sm mb-4">
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Courses</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">All Courses</h1>
          <p className="text-dark-500 dark:text-dark-400 text-lg max-w-2xl">
            Choose a topic and start learning. Each course includes structured lessons, code examples, and quizzes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl mb-4`}>
                {course.icon}
              </div>
              <h2 className="font-bold text-xl mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{course.title}</h2>
              <p className="text-dark-500 dark:text-dark-400 text-sm mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-sm border-t border-gray-100 dark:border-dark-700 pt-4">
                <div className="flex items-center gap-4 text-dark-400 dark:text-dark-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.lessons.length} lessons
                  </span>
                  <span>{course.quiz.length} quiz Qs</span>
                </div>
                <span className="text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Start <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
