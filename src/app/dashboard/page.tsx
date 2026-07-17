"use client";

import Link from "next/link";
import { ChevronRight, Briefcase, ArrowRight } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import ActivityFeed from "@/components/ActivityFeed";
import { courses } from "@/data/courses";
import { getStats } from "@/lib/tracker";

export default function DashboardPage() {
  const stats = getStats();
  const enrolledCourses = courses.filter((c) => stats.coursesStarted.includes(c.slug));

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-dark-400 text-sm mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Dashboard</span>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-dark-500 text-lg">Track your learning progress and find opportunities</p>
        </div>

        <div className="mb-10">
          <DashboardStats />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
              {enrolledCourses.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
                  <p className="text-dark-500 mb-4">You haven&apos;t started any courses yet</p>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Browse Courses <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrolledCourses.map((course) => {
                    const courseQuizzes = stats.activities.filter(
                      (a) => a.type === "quiz" && a.courseSlug === course.slug
                    ).length;
                    return (
                      <Link
                        key={course.slug}
                        href={`/courses/${course.slug}`}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl shrink-0`}>
                          {course.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-dark-900">{course.title}</h3>
                          <p className="text-sm text-dark-400">{course.lessons.length} lessons · {courseQuizzes} quizzes taken</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-dark-300 shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Recent Activity</h2>
              </div>
              <ActivityFeed />
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 sticky top-20">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Find Opportunities</h3>
              <p className="text-primary-700 text-sm mb-4">
                Browse live internship and job listings updated automatically from top job boards.
              </p>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors w-full justify-center"
              >
                View Jobs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
