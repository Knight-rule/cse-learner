import Link from "next/link";
import { ArrowRight, BookOpen, Code, Brain, Zap, ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";

const features = [
  { icon: BookOpen, title: "Structured Courses", desc: "6 core CSE topics with detailed lessons" },
  { icon: Code, title: "Code Examples", desc: "Every lesson includes practical code snippets" },
  { icon: Brain, title: "Interactive Quizzes", desc: "Test your knowledge with instant feedback" },
  { icon: Zap, title: "Learn at Your Pace", desc: "Progress through topics at your own speed" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Code className="w-4 h-4" /> Free Learning Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Master Computer Science
              <span className="block text-primary-200">One Topic at a Time</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl">
              Interactive lessons, real code examples, and quizzes to help CSE students
              ace their courses and crack technical interviews.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors shadow-lg"
              >
                Start Learning <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Take a Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-dark-500 dark:text-dark-400 text-lg max-w-2xl mx-auto">
              A complete learning platform designed for CSE students
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-dark-500 dark:text-dark-400 text-sm">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Core Courses</h2>
              <p className="text-dark-500 dark:text-dark-400 text-lg">Master the fundamentals of CS</p>
            </div>
            <Link href="/courses" className="hidden md:flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group bg-white dark:bg-dark-900 p-6 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl mb-4`}>
                  {course.icon}
                </div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{course.title}</h3>
                <p className="text-dark-500 dark:text-dark-400 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-400 dark:text-dark-500">{course.lessons.length} lessons</span>
                  <span className="text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Start <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-dark-500 dark:text-dark-400 text-lg mb-8">
            Start with any course and track your progress. All content is free and open.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors shadow-lg"
          >
            Browse All Courses <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
