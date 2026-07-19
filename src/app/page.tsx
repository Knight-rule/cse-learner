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
    <div className="classic-design">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/20 rounded-full px-6 py-2 mb-6 inline-block">
              <span className="flex items-center gap-2">
                <Code size={16} /> Free Learning Platform
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Master Computer Science
              <span className="block text-yellow-300">One Topic at a Time</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Interactive lessons, real code examples, and quizzes to help CSE students
              ace their courses and crack technical interviews.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/courses"
                className="bg-white text-blue-700 px-8 py-3 rounded font-bold hover:bg-blue-100 transition-colors inline-flex items-center gap-2"
              >
                Start Learning <ArrowRight size={20} />
              </Link>
              <Link
                href="/quiz"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded font-bold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                Take a Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A complete learning platform designed for CSE students
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Core Courses</h2>
              <p className="text-gray-600 text-lg">Master the fundamentals of CS</p>
            </div>
            <Link href="/courses" className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 block"
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl mb-4`}>
                  {course.icon}
                </div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{course.lessons.length} lessons</span>
                  <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Start <ChevronRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Start with any course and track your progress. All content is free and open.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-3 rounded font-bold text-lg hover:bg-blue-800 transition-colors shadow-md"
          >
            Browse All Courses <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
