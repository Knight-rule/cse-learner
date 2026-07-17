"use client";

import { BookOpen, Brain, Code, GraduationCap, Clock } from "lucide-react";
import { getRecentActivity, type Activity } from "@/lib/tracker";

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const typeConfig: Record<string, { icon: typeof Brain; color: string; label: string }> = {
  quiz: { icon: Brain, color: "bg-purple-100 text-purple-600", label: "Quiz" },
  practice: { icon: Code, color: "bg-amber-100 text-amber-600", label: "Practice" },
  lesson: { icon: BookOpen, color: "bg-blue-100 text-blue-600", label: "Lesson" },
  course_start: { icon: GraduationCap, color: "bg-green-100 text-green-600", label: "Course Started" },
};

export default function ActivityFeed() {
  const activities = getRecentActivity(15);

  if (activities.length === 0) {
    return (
      <div className="text-center py-12 text-dark-400">
        <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p className="font-medium">No activity yet</p>
        <p className="text-sm mt-1">Start learning to see your progress here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((act) => {
        const cfg = typeConfig[act.type] || typeConfig.lesson;
        const Icon = cfg.icon;
        return (
          <div key={act.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark-800 truncate">{act.title}</p>
              <p className="text-xs text-dark-400">{cfg.label} {act.score !== undefined ? `· Score: ${act.score}` : ""}</p>
            </div>
            <span className="text-xs text-dark-400 shrink-0">{timeAgo(act.timestamp)}</span>
          </div>
        );
      })}
    </div>
  );
}
