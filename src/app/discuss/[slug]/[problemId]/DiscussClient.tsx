"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageSquare, Send, CornerDownRight } from "lucide-react";
import {
  getDiscussThreadsByProblem,
  addDiscussThread,
  addDiscussReply,
  getLearnerName,
  type DiscussThread,
} from "@/lib/tracker";

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function DiscussClient({
  courseSlug,
  problemId,
  problemTitle,
}: {
  courseSlug: string;
  problemId: string;
  problemTitle: string;
}) {
  const [threads, setThreads] = useState<DiscussThread[]>([]);
  const [name, setName] = useState("Anonymous");
  const [newBody, setNewBody] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");

  const refresh = () => setThreads(getDiscussThreadsByProblem(problemId));

  useEffect(() => {
    setName(getLearnerName());
    refresh();
  }, [problemId]);

  const submitThread = () => {
    const body = newBody.trim();
    if (!body) return;
    addDiscussThread({ problemId, courseSlug, problemTitle, body, author: name });
    setNewBody("");
    refresh();
  };

  const submitReply = (threadId: string) => {
    const body = replyBody.trim();
    if (!body) return;
    addDiscussReply(threadId, body, name);
    setReplyBody("");
    setReplyTo(null);
    refresh();
  };

  return (
    <div className="section">
      <div className="container container-narrow">
        <Link href={`/practice/${courseSlug}/${problemId}`} className="discuss-back">
          ← Back to problem
        </Link>

        <div className="discuss-problem-head">
          <MessageSquare size={18} className="text-accent" />
          <h1 className="heading-md">{problemTitle}</h1>
        </div>

        <div className="discuss-compose">
          <textarea
            className="discuss-textarea"
            placeholder="Ask a question or share your approach…"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            rows={3}
          />
          <div className="discuss-compose-row">
            <span className="discuss-meta">Posting as <strong>{name}</strong></span>
            <button className="btn btn-primary btn-sm" onClick={submitThread} disabled={!newBody.trim()}>
              <Send size={14} className="mr-2" /> Post
            </button>
          </div>
        </div>

        {threads.length === 0 ? (
          <div className="discuss-empty">
            <p>No discussions for this problem yet. Be the first to post!</p>
          </div>
        ) : (
          <div className="discuss-threads">
            {threads.map((t) => (
              <div key={t.id} className="discuss-thread">
                <div className="discuss-thread-question">
                  <p className="discuss-thread-body">{t.body}</p>
                  <div className="discuss-thread-meta">
                    <span>{t.author}</span>
                    <span>· {timeAgo(t.createdAt)}</span>
                  </div>
                </div>

                {t.replies.map((r) => (
                  <div key={r.id} className="discuss-reply">
                    <CornerDownRight size={14} className="discuss-reply-icon" />
                    <div>
                      <p className="discuss-reply-body">{r.body}</p>
                      <div className="discuss-thread-meta">
                        <span>{r.author}</span>
                        <span>· {timeAgo(r.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {replyTo === t.id ? (
                  <div className="discuss-reply-compose">
                    <textarea
                      className="discuss-textarea"
                      placeholder="Write a reply…"
                      value={replyBody}
                      onChange={(e) => setReplyBody(e.target.value)}
                      rows={2}
                    />
                    <div className="discuss-compose-row">
                      <button className="btn btn-outline btn-sm" onClick={() => setReplyTo(null)}>Cancel</button>
                      <button className="btn btn-primary btn-sm" onClick={() => submitReply(t.id)} disabled={!replyBody.trim()}>
                        Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="discuss-reply-btn" onClick={() => { setReplyTo(t.id); setReplyBody(""); }}>
                    Reply
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
