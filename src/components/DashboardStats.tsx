"use client";

import { useState, useEffect } from "react";
import { BookOpen, Brain, Code, Trophy, TrendingUp, Target } from "lucide-react";
import { getStats, getAvgScore, type LearnerStats } from "@/lib/tracker";

export default function DashboardStats() {
  const [stats, setStats] = useState<LearnerStats>({ coursesStarted: [], quizzesTaken: 0, totalScore: 0, totalQuestions: 0, codeRuns: 0, lessonsViewed: 0, activities: [] });
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    setStats(getStats());
    setAvgScore(getAvgScore());
  }, []);

  const cards = [
    { icon: BookOpen, label: "Courses Started", value: stats.coursesStarted.length, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
    { icon: Brain, label: "Quizzes Taken", value: stats.quizzesTaken, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
    { icon: Trophy, label: "Avg Score", value: `${avgScore}%`, color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
    { icon: Code, label: "Code Runs", value: stats.codeRuns, color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" },
    { icon: Target, label: "Lessons Viewed", value: stats.lessonsViewed, color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" },
    { icon: TrendingUp, label: "Total Questions", value: stats.totalQuestions, color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400" },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-100 dark:border-dark-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-dark-500 dark:text-dark-400 font-medium">{card.label}</span>
            </div>
            <div className="text-3xl font-bold text-dark-900 dark:text-dark-100 animate-count-up">{card.value}</div>
          </div>
        );
      })}
    </div>
  );
}
