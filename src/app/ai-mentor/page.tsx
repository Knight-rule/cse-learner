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

export default function AIMentorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courseSlug, setCourseSlug] = useState("data-structures");
  const [problemId, setProblemId] = useState("");
  const [hintLevel, setHintLevel] = useState<"none" | "minimal" | "moderate" | "full">("moderate");
  const [showContext, setShowContext] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const selectedCourse = practiceData.find((p) => p.courseSlug === courseSlug);
  const problems = selectedCourse?.problems || [];
  const courseTitle = courseList.find((c) => c.slug === courseSlug)?.title || courseSlug;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickPrompts = [
    { icon: <BookOpen size={16} />, text: "Explain linked lists and when to use them" },
    { icon: <Code size={16} />, text: "How does binary search work step by step?" },
    { icon: <HelpCircle size={16} />, text: "What's the difference between stack and queue?" },
    { icon: <Sparkles size={16} />, text: "Help me understand recursion with an example" },
  ];

  const send = async (question?: string) => {
    const q = (question || input).trim();
    if (!q || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: q, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
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
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = { role: "assistant", content: data.response || "No response.", timestamp: Date.now() };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error reaching AI Mentor. Make sure GOOGLE_GENAI_API_KEY is set.", timestamp: Date.now() }]);
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
              AI-Powered <span className="text-gradient">Learning Assistant</span>
            </h1>
            <p className="mentor-hero-sub">
              Your personal AI tutor that explains concepts, hints at solutions, and adapts to your learning style.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="mentor-layout">
          {/* Sidebar */}
          <aside className="mentor-sidebar">
            {/* Context Card */}
            <div className="mentor-card">
              <div className="mentor-card-header" onClick={() => setShowContext(!showContext)}>
                <h3>Course Context</h3>
                <ChevronDown size={16} style={{ transform: showContext ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }} />
              </div>
              {showContext && (
                <div className="mentor-card-body">
                  <label className="mentor-label">Course</label>
                  <select className="mentor-select" value={courseSlug} onChange={(e) => { setCourseSlug(e.target.value); setProblemId(""); }}>
                    {courseList.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.title}</option>
                    ))}
                  </select>

                  {problems.length > 0 && (
                    <>
                      <label className="mentor-label">Problem (optional)</label>
                      <select className="mentor-select" value={problemId} onChange={(e) => setProblemId(e.target.value)}>
                        <option value="">Any Problem</option>
                        {problems.map((p) => (
                          <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                      </select>
                    </>
                  )}

                  <label className="mentor-label">Hint Level</label>
                  <div className="mentor-hint-pills">
                    {(["moderate", "full", "minimal", "none"] as const).map((level) => (
                      <button key={level} className={"mentor-hint-pill" + (hintLevel === level ? " active" : "")} onClick={() => setHintLevel(level)}>
                        {level === "moderate" ? "Hints" : level === "full" ? "Full Guide" : level === "minimal" ? "Quick" : "No Hints"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Start */}
            <div className="mentor-card">
              <div className="mentor-card-header">
                <h3>Quick Start</h3>
              </div>
              <div className="mentor-card-body">
                {quickPrompts.map((qp, i) => (
                  <button key={i} className="mentor-quick-btn" onClick={() => send(qp.text)}>
                    {qp.icon}
                    <span>{qp.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mentor-card">
              <div className="mentor-card-header">
                <h3>Tips</h3>
              </div>
              <div className="mentor-card-body">
                <div className="mentor-tip">💡 Ask for explanations of concepts you find confusing</div>
                <div className="mentor-tip">🔍 Get hints for specific problems you are stuck on</div>
                <div className="mentor-tip">🧠 Learn why a solution works, not just how</div>
                <div className="mentor-tip">📚 Explore related concepts to deepen understanding</div>
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
                <p>{courseTitle} &middot; {hintLevel} hints</p>
              </div>
            </div>

            {/* Messages */}
            <div className="mentor-messages">
              {messages.length === 0 && (
                <div className="mentor-empty">
                  <div className="mentor-empty-icon">
                    <Brain size={48} />
                  </div>
                  <h3>Ask me anything about CS</h3>
                  <p>Explain concepts, debug code, get hints, or explore topics in {courseTitle}.</p>
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
                      <span>Thinking...</span>
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
                  placeholder="Ask about course material, a specific problem, or any CS concept..."
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
                Press Enter to send &middot; Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
