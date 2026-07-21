"use client";

import { useState, useEffect, useRef } from "react";
import { Brain, Send, Sparkles, ChevronDown, BookOpen, Code, HelpCircle, Loader2, Bot, User } from "lucide-react";
import { practiceData } from "@/data/practice";
import { courses as courseList } from "@/data/courses";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const GREETINGS = [
  "Hey! What are you working on today?",
  "Stuck on something? I can help.",
  "Let's figure this out together.",
  "What's on your mind?",
];

export default function AIMentorPage() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courseSlug, setCourseSlug] = useState("data-structures");
  const [problemId, setProblemId] = useState("");
  const [hintLevel, setHintLevel] = useState<"none" | "minimal" | "moderate" | "full">("moderate");
  const [showContext, setShowContext] = useState(true);
  const [greeting] = useState(() => GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const selectedCourse = practiceData.find((p) => p.courseSlug === courseSlug);
  const problems = selectedCourse?.problems || [];
  const courseTitle = courseList.find((c) => c.slug === courseSlug)?.title || courseSlug;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickPrompts = [
    { icon: <BookOpen size={16} />, text: "I keep confusing stacks and queues — can you break it down?", label: "Concepts" },
    { icon: <Code size={16} />, text: "Walk me through binary search like I'm 12", label: "Algorithms" },
    { icon: <HelpCircle size={16} />, text: "Why does my linked list insert crash?", label: "Debugging" },
    { icon: <Sparkles size={16} />, text: "Give me a trick to remember time complexities", label: "Tips & Tricks" },
  ];

  const send = async (question?: string) => {
    const q = (question || input).trim();
    if (!q || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: q, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const res = await fetch("/api/ai-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          hintLevel,
          context: {
            courseSlug,
            problemId: problemId || undefined,
            problemTitle: problems.find((p) => p.id === problemId)?.title,
            language: problems.find((p) => p.id === problemId)?.language,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = { role: "assistant", content: data.response || "Hmm, I didn't get a response. Try rephrasing.", timestamp: Date.now() };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error && err.name === "AbortError"
        ? "Took too long — try a shorter question."
        : "Oops — couldn't reach the AI. Check your connection and try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: msg, timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mentor-page">
      {/* Hero */}
      <div className="mentor-hero">
        <div className="mentor-hero-glow" />
        <div className="container">
          <div className="mentor-hero-content">
            <div className="mentor-hero-icon">
              <Brain size={32} />
            </div>
            <h1 className="mentor-hero-title">
              Your CS Study <span className="text-gradient">Buddy</span>
            </h1>
            <p className="mentor-hero-sub">
              Ask anything — concepts, code, debugging, or "explain this like I'm new."
              No question is too basic or too weird.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {!mounted ? (
          <div className="mentor-loading">
            <Loader2 size={32} className="animate-spin" />
            <p>Loading...</p>
          </div>
        ) : (
        <div className="mentor-layout">
          {/* Sidebar */}
          <aside className="mentor-sidebar">
            {/* Context Card */}
            <div className="mentor-card">
              <div className="mentor-card-header" onClick={() => setShowContext(!showContext)}>
                <h3>What are you studying?</h3>
                <ChevronDown size={16} style={{ transform: showContext ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }} />
              </div>
              {showContext && (
                <div className="mentor-card-body">
                  <label className="mentor-label">Subject</label>
                  <select className="mentor-select" value={courseSlug} onChange={(e) => { setCourseSlug(e.target.value); setProblemId(""); }}>
                    {courseList.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.title}</option>
                    ))}
                  </select>

                  {problems.length > 0 && (
                    <>
                      <label className="mentor-label">Stuck on a problem?</label>
                      <select className="mentor-select" value={problemId} onChange={(e) => setProblemId(e.target.value)}>
                        <option value="">Nah, just chatting</option>
                        {problems.map((p) => (
                          <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                      </select>
                    </>
                  )}

                  <label className="mentor-label">How much help do you want?</label>
                  <div className="mentor-hint-pills">
                    {(["moderate", "full", "minimal", "none"] as const).map((level) => (
                      <button key={level} className={"mentor-hint-pill" + (hintLevel === level ? " active" : "")} onClick={() => setHintLevel(level)}>
                        {level === "moderate" ? "Nudge me" : level === "full" ? "Show everything" : level === "minimal" ? "Just answer" : "I'll figure it out"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Start */}
            <div className="mentor-card">
              <div className="mentor-card-header">
                <h3>Try asking</h3>
              </div>
              <div className="mentor-card-body">
                {quickPrompts.map((qp, i) => (
                  <button key={i} className="mentor-quick-btn" onClick={() => send(qp.text)}>
                    {qp.icon}
                    <div>
                      <span className="mentor-quick-label">{qp.label}</span>
                      <span>{qp.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mentor-card">
              <div className="mentor-card-header">
                <h3>Pro tip</h3>
              </div>
              <div className="mentor-card-body">
                <div className="mentor-tip">Paste your broken code and say "why doesn't this work?" — way better than guessing.</div>
                <div className="mentor-tip">Pick a specific problem above and I'll give you hints tailored to it.</div>
                <div className="mentor-tip">Use "Nudge me" when you want to learn, "Show everything" when you're stuck for real.</div>
              </div>
            </div>
          </aside>

          {/* Chat Area */}
          <div className="mentor-chat">
            <div className="mentor-chat-header">
              <div className="mentor-chat-avatar">
                <Sparkles size={18} />
              </div>
              <div>
                <h3>AI Mentor</h3>
                <p>{courseTitle} &middot; {hintLevel === "moderate" ? "nudge mode" : hintLevel === "full" ? "full guide" : hintLevel === "minimal" ? "quick answers" : "no hints"}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="mentor-messages">
              {messages.length === 0 && (
                <div className="mentor-empty">
                  <div className="mentor-empty-icon">
                    <Brain size={48} />
                  </div>
                  <h3>{greeting}</h3>
                  <p>I can help with {courseTitle} — or anything else CS-related. Just type below.</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={"mentor-msg " + msg.role}>
                  <div className="mentor-msg-avatar">
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className="mentor-msg-content">
                    <div className="mentor-msg-meta">
                      <span>{msg.role === "user" ? "You" : "AI Mentor"}</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    <div className="mentor-msg-text">
                      <pre>{msg.content}</pre>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="mentor-msg assistant">
                  <div className="mentor-msg-avatar"><Bot size={16} /></div>
                  <div className="mentor-msg-content">
                    <div className="mentor-typing">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Let me think about that...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="mentor-input-area">
              <div className="mentor-input-row">
                <textarea
                  className="mentor-input"
                  placeholder="Type your question here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  rows={2}
                />
                <button className="mentor-send-btn" onClick={() => send()} disabled={isLoading || !input.trim()}>
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
              <div className="mentor-input-hint">
                Enter to send &middot; Shift+Enter for a new line
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
