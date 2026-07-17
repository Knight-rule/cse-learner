"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Bookmark, Trash2, ExternalLink } from "lucide-react";

interface BookmarkItem {
  type: string;
  slug: string;
  lessonId?: string;
  title: string;
  courseTitle: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    setBookmarks(JSON.parse(localStorage.getItem("cse-bookmarks") || "[]"));
  }, []);

  const remove = (index: number) => {
    const updated = [...bookmarks];
    updated.splice(index, 1);
    setBookmarks(updated);
    localStorage.setItem("cse-bookmarks", JSON.stringify(updated));
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-dark-400 text-sm mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Bookmarks</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="w-8 h-8 text-yellow-500" fill="currentColor" />
          <h1 className="text-4xl font-bold">Bookmarks</h1>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
            <p className="text-dark-500 mb-6">
              Save lessons you want to revisit later by clicking the bookmark icon.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((bm, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <Bookmark className="w-5 h-5 text-yellow-500 shrink-0" fill="currentColor" />
                <div className="flex-1 min-w-0">
                  <Link
                    href={bm.lessonId ? `/courses/${bm.slug}/lessons/${bm.lessonId}` : `/courses/${bm.slug}`}
                    className="font-semibold hover:text-primary-600 transition-colors"
                  >
                    {bm.title}
                  </Link>
                  <p className="text-dark-400 text-sm">{bm.courseTitle}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={bm.lessonId ? `/courses/${bm.slug}/lessons/${bm.lessonId}` : `/courses/${bm.slug}`}
                    className="p-2 text-dark-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => remove(i)}
                    className="p-2 text-dark-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
