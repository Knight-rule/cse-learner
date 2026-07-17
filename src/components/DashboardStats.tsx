"use client";

import { BookOpen, Brain, Code, Trophy, TrendingUp, Target } from "lucide-react";
import { getStats, getAvgScore } from "@/lib/tracker";

export default function DashboardStats() {
  const stats = getStats();
  const avgScore = getAvgScore();

  const cards = [
    { icon: BookOpen, label: "Courses Started", value: stats.coursesStarted.length, color: "bg-blue-100 text-blue-600" },
    { icon: Brain, label: "Quizzes Taken", value: stats.quizzesTaken, color: "bg-purple-100 text-purple-600" },
    { icon: Trophy, label: "Avg Score", value: `${avgScore}%`, color: "bg-green-100 text-green-600" },
    { icon: Code, label: "Code Runs", value: stats.codeRuns, color: "bg-amber-100 text-amber-600" },
    { icon: Target, label: "Lessons Viewed", value: stats.lessonsViewed, color: "bg-rose-100 text-rose-600" },
    { icon: TrendingUp, label: "Total Questions", value: stats.totalQuestions, color: "bg-cyan-100 text-cyan-600" },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-dark-500 font-medium">{card.label}</span>
            </div>
            <div className="text-3xl font-bold text-dark-900">{card.value}</div>
          </div>
        );
      })}
    </div>
  );
}
