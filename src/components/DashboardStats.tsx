"use client";

import { useState, useEffect } from "react";
import { BookOpen, Code, Target, Flame, Calendar } from "lucide-react";
import { getStats, getStreak, getHeatmapData, type LearnerStats } from "@/lib/tracker";

export default function DashboardStats() {
  const [stats, setStats] = useState<LearnerStats>({
    coursesStarted: [], codeRuns: 0, lessonsViewed: 0, activities: [],
    dailyActivity: {}, lastActiveDate: "", currentStreak: 0, longestStreak: 0,
  });
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [heatmap, setHeatmap] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    setStats(getStats());
    setStreak(getStreak());
    setHeatmap(getHeatmapData(84)); // 12 weeks
  }, []);

  const cards = [
    { icon: BookOpen, label: "Courses Started", value: stats.coursesStarted.length, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
    { icon: Code, label: "Code Runs", value: stats.codeRuns, color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" },
    { icon: Target, label: "Lessons Viewed", value: stats.lessonsViewed, color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" },
  ];

  // Streak card
  const streakColor = streak.current > 0 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";

  return (
    <div className="space-y-6">
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-100 dark:border-dark-700 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${streakColor}`}>
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-sm text-dark-500 dark:text-dark-400 font-medium">Current Streak</span>
          </div>
          <div className="text-3xl font-bold text-dark-900 dark:text-dark-100">{streak.current} days</div>
          <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">Longest: {streak.longest} days</p>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <div className="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-100 dark:border-dark-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                <span className="text-sm text-dark-500 dark:text-dark-400 font-medium">Activity (12 weeks)</span>
              </div>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-2" style={{ minWidth: "100%" }}>
              {heatmap.map((day) => {
                const intensity = day.count > 0 ? Math.min(4, Math.ceil(day.count / 2)) : 0;
                const colors = [
                  "bg-gray-100 dark:bg-gray-800",
                  "bg-emerald-100 dark:bg-emerald-900/30",
                  "bg-emerald-300 dark:bg-emerald-700",
                  "bg-emerald-500 dark:bg-emerald-600",
                  "bg-emerald-700 dark:bg-emerald-500",
                ];
                return (
                  <div
                    key={day.date}
                    className={`w-3 h-3 rounded ${colors[intensity]} flex-shrink-0 cursor-help`}
                    title={`${day.date}: ${day.count} activit${day.count === 1 ? "y" : "ies"}`}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-dark-500 dark:text-dark-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-gray-100 dark:bg-gray-800"></span> None</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-100 dark:bg-emerald-900/30"></span> Low</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-300 dark:bg-emerald-700"></span> Med</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500 dark:bg-emerald-600"></span> High</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-700 dark:bg-emerald-500"></span> Peak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}