"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Bookmark, Trash2, ExternalLink } from "lucide-react";

interface BookmarkItem { type: string; slug: string; lessonId?: string; title: string; courseTitle: string; }

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => { setBookmarks(JSON.parse(localStorage.getItem("cse-bookmarks") || "[]")); }, []);

  const remove = (index: number) => {
    const updated = [...bookmarks]; updated.splice(index, 1); setBookmarks(updated);
    localStorage.setItem("cse-bookmarks", JSON.stringify(updated));
  };

  return (
    <div className="section">
      <div className="container-sm">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Bookmarks</span>
        </div>

        <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}><Bookmark size={14} /> Bookmarks</span>
        <h1 className="heading-xl mb-12">Your Bookmarks</h1>

        {bookmarks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h2 className="heading-md mb-4">No bookmarks yet</h2>
            <p className="body-md mb-8">Save lessons you want to revisit later by clicking the bookmark icon.</p>
            <Link href="/courses" className="btn btn-primary">Browse Courses</Link>
          </div>
        ) : (
          <div className="lesson-list">
            {bookmarks.map((bm, i) => (
              <div key={i} className="lesson-item">
                <Bookmark size={18} style={{ color: "var(--accent)", flexShrink: 0 }} fill="currentColor" />
                <div className="flex-1 min-w-0">
                  <Link href={bm.lessonId ? "/courses/" + bm.slug + "/lessons/" + bm.lessonId : "/courses/" + bm.slug} className="heading-sm" style={{ fontSize: 15, display: "block" }}>
                    {bm.title}
                  </Link>
                  <p className="body-sm" style={{ marginTop: 4 }}>{bm.courseTitle}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={bm.lessonId ? "/courses/" + bm.slug + "/lessons/" + bm.lessonId : "/courses/" + bm.slug} className="btn btn-ghost" style={{ padding: 8 }}>
                    <ExternalLink size={16} />
                  </Link>
                  <button onClick={() => remove(i)} className="btn btn-ghost" style={{ padding: 8, color: "var(--accent-pink)" }}>
                    <Trash2 size={16} />
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
