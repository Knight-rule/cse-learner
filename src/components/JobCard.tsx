"use client";

import { MapPin, Building2, Clock, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string | null;
  location: string;
  remote: boolean;
  type: string;
  category: string;
  salary: string | null;
  description: string;
  url: string;
  postedAt: string;
  source: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

const typeColors: Record<string, string> = {
  internship: "bg-green-100 text-green-700",
  "full-time": "bg-blue-100 text-blue-700",
  "part-time": "bg-purple-100 text-purple-700",
  contract: "bg-amber-100 text-amber-700",
};

export default function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("cse-saved-jobs") || "[]");
    setSaved(savedJobs.some((j: Job) => j.id === job.id));
  }, [job.id]);

  const toggleSave = () => {
    const savedJobs = JSON.parse(localStorage.getItem("cse-saved-jobs") || "[]");
    if (saved) {
      localStorage.setItem("cse-saved-jobs", JSON.stringify(savedJobs.filter((j: Job) => j.id !== job.id)));
      setSaved(false);
    } else {
      savedJobs.push(job);
      localStorage.setItem("cse-saved-jobs", JSON.stringify(savedJobs));
      setSaved(true);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-lg font-bold text-primary-700 shrink-0">
          {job.company.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-dark-900 group-hover:text-primary-600 transition-colors">{job.title}</h3>
              <p className="text-sm text-dark-500 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5" />
                {job.company}
              </p>
            </div>
            <button
              onClick={toggleSave}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
              title={saved ? "Unsave" : "Save job"}
            >
              {saved ? (
                <BookmarkCheck className="w-5 h-5 text-primary-600" fill="currentColor" />
              ) : (
                <Bookmark className="w-5 h-5 text-dark-400" />
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 text-xs text-dark-500 bg-dark-50 px-2.5 py-1 rounded-full">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
            {job.remote && (
              <span className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full font-medium">Remote</span>
            )}
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[job.type] || "bg-gray-100 text-gray-600"}`}>
              {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-dark-400">
              <Clock className="w-3 h-3" />
              {timeAgo(job.postedAt)}
            </span>
          </div>

          {job.description && (
            <p className="text-sm text-dark-500 mt-3 line-clamp-2">{job.description.replace(/<[^>]*>/g, "").slice(0, 150)}...</p>
          )}

          <div className="flex items-center gap-3 mt-4">
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Apply <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-xs text-dark-400">via {job.source}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
