"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageSquare, ChevronRight, CornerDownRight } from "lucide-react";
import { getAllDiscussThreads, getDiscussThreadCount } from "@/lib/tracker";
import type { DiscussThread } from "@/lib/tracker";

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function DiscussPage() {
  const [threads, setThreads] = useState<DiscussThread[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setThreads(getAllDiscussThreads());
    setCount(getDiscussThreadCount());
  }, []);

  return (
    <div className="section">
      <div className="container container-narrow">
        <div className="page-head">
          <span className="eyebrow">
            <MessageSquare size={14} /> Community
          </span>
          <h1 className="heading-xl">Discuss</h1>
          <p className="lede">
            Ask questions and share approaches on practice problems. Discussions are saved locally on this device —
            {" "}
            {count === 0 ? "no threads yet. Start one below!" : `${count} thread${count === 1 ? "" : "s"} so far.`}
          </p>
        </div>

        {threads.length === 0 ? (
          <div className="discuss-empty">
            <MessageSquare size={28} />
            <p>No discussions yet. Open any practice problem and click <strong>“Discuss this problem”</strong> to start one.</p>
            <Link href="/practice" className="btn btn-primary btn-sm">Go to Practice</Link>
          </div>
        ) : (
          <div className="discuss-list">
            {threads.map((t) => (
              <Link key={t.id} href={`/discuss/${t.courseSlug}/${t.problemId}`} className="discuss-thread-card">
                <div className="discuss-thread-head">
                  <span className="discuss-thread-title">{t.problemTitle}</span>
                  <ChevronRight size={16} className="discuss-arrow" />
                </div>
                <p className="discuss-thread-body">{t.body}</p>
                <div className="discuss-thread-meta">
                  <span>{t.author}</span>
                  <span>· {timeAgo(t.createdAt)}</span>
                  <span className="discuss-replies">
                    <CornerDownRight size={13} /> {t.replies.length} {t.replies.length === 1 ? "reply" : "replies"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
