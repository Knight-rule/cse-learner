"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

interface JobFiltersProps {
  query: string;
  onQueryChange: (q: string) => void;
  type: string;
  onTypeChange: (t: string) => void;
  remoteOnly: boolean;
  onRemoteChange: (r: boolean) => void;
}

const jobTypes = [
  { value: "", label: "All Types" },
  { value: "internship", label: "Internship" },
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" },
];

export default function JobFilters({ query, onQueryChange, type, onTypeChange, remoteOnly, onRemoteChange }: JobFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-dark-600 font-medium text-sm">
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <input
          type="text"
          placeholder="Search jobs, companies, skills..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-dark-50 rounded-lg text-sm border-0 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
        />
        {query && (
          <button onClick={() => onQueryChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div>
        <label className="text-xs text-dark-500 font-medium mb-2 block">Job Type</label>
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((jt) => (
            <button
              key={jt.value}
              onClick={() => onTypeChange(jt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                type === jt.value
                  ? "bg-primary-100 text-primary-700 ring-1 ring-primary-300"
                  : "bg-dark-50 text-dark-600 hover:bg-dark-100"
              }`}
            >
              {jt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-dark-600 font-medium">Remote Only</label>
        <button
          onClick={() => onRemoteChange(!remoteOnly)}
          className={`relative w-11 h-6 rounded-full transition-colors ${remoteOnly ? "bg-primary-600" : "bg-dark-200"}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${remoteOnly ? "left-6" : "left-1"}`} />
        </button>
      </div>
    </div>
  );
}
