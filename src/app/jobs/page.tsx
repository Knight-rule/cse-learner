"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, RefreshCw, Loader2, Building2, Clock, Search, X, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import { Company } from "@/lib/companies";

const popularCategories = [
  "FAANG+",
  "AI/ML",
  "Cloud & Infra",
  "Database",
  "DevTools",
  "Security",
  "SaaS",
  "Fintech",
  "India",
  "Startups",
  "Gaming",
  "Robotics",
];

export default function JobsPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savedTab, setSavedTab] = useState(false);
  const [savedCompanies, setSavedCompanies] = useState<string[]>([]);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (selectedCategory) params.set("category", selectedCategory);
      params.set("page", String(page));
      params.set("limit", "50");

      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      setCompanies(data.companies || []);
      setCategories(data.categories || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch {
      setCompanies([]);
    }
    setLoading(false);
  }, [query, selectedCategory, page]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cse-saved-companies") || "[]");
    setSavedCompanies(saved);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, selectedCategory]);

  const handleSearch = (value: string) => {
    setInputValue(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setQuery(value), 300);
  };

  const clearSearch = () => {
    setInputValue("");
    setQuery("");
  };

  const toggleSave = (slug: string) => {
    const updated = savedCompanies.includes(slug)
      ? savedCompanies.filter((s) => s !== slug)
      : [...savedCompanies, slug];
    setSavedCompanies(updated);
    localStorage.setItem("cse-saved-companies", JSON.stringify(updated));
  };

  const filteredCompanies = savedTab
    ? companies.filter((c) => savedCompanies.includes(c.slug))
    : companies;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-dark-400 text-sm mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Companies & Careers</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold">Companies & Careers</h1>
          </div>
          <p className="text-dark-500 text-lg">Direct career page links — apply on the company site</p>
        </div>

        <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl p-6 mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              placeholder="Search companies... (e.g. Google, AI, Fintech, India)"
              value={inputValue}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (searchTimer.current) clearTimeout(searchTimer.current);
                  setQuery(inputValue);
                }
              }}
              className="w-full pl-12 pr-12 py-4 bg-white rounded-xl text-base border-0 shadow-lg focus:ring-2 focus:ring-primary-500 transition-shadow"
            />
            {inputValue && (
              <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-primary-100 text-primary-700 ring-1 ring-primary-300"
                : "bg-white text-dark-600 hover:bg-dark-50 border border-gray-200"
            }`}
          >
            All ({total})
          </button>
          {popularCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary-100 text-primary-700 ring-1 ring-primary-300"
                  : "bg-white text-dark-600 hover:bg-dark-50 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSavedTab(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !savedTab ? "bg-primary-100 text-primary-700" : "bg-dark-50 text-dark-600 hover:bg-dark-100"
            }`}
          >
            All Companies ({total})
          </button>
          <button
            onClick={() => setSavedTab(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              savedTab ? "bg-primary-100 text-primary-700" : "bg-dark-50 text-dark-600 hover:bg-dark-100"
            }`}
          >
            Saved ({savedCompanies.length})
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-20 text-dark-400">
            <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium text-lg">{savedTab ? "No saved companies" : "No companies found"}</p>
            <p className="text-sm mt-1">{savedTab ? "Bookmark companies to see them here" : "Try a different search term"}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map((company) => (
              <div
                key={company.slug}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-12 h-12 rounded-lg object-contain bg-dark-50"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="%23e5e7eb"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="18" font-weight="600" fill="%236b7280">${company.name.charAt(0)}</text></svg>`)}`;
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-dark-900">{company.name}</h3>
                      <span className="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{company.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSave(company.slug)}
                    className="text-dark-400 hover:text-primary-600 transition-colors"
                  >
                    {savedCompanies.includes(company.slug) ? (
                      <BookmarkCheck className="w-5 h-5 text-primary-600" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-sm text-dark-500 mb-3 flex-1">{company.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {company.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-dark-50 text-dark-600 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={company.careers}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-dark-700 rounded-lg text-sm font-medium hover:bg-dark-50 transition-colors"
                  >
                    Careers
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={company.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    Apply Now
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-dark-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-dark-500 px-4">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-dark-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
