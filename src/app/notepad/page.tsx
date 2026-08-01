"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { StickyNote, Plus, Trash2, Edit3, Clock, Play, Pause, RotateCcw, BookOpen, Timer, CheckCircle, Save, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════ */

interface StudyNote {
  id: string;
  title: string;
  content: string;
  subject: string;
  color: string;
  createdAt: number;
  updatedAt: number;
}

interface QuickNote {
  id: string;
  text: string;
  color: string;
  createdAt: number;
}

interface StudySession {
  id: string;
  date: string;
  focusMinutes: number;
  subject: string;
}

/* ═══════════════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════════════ */

const NOTE_COLORS = [
  { name: "Blue", value: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)" },
  { name: "Green", value: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" },
  { name: "Purple", value: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
  { name: "Orange", value: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)" },
  { name: "Pink", value: "rgba(236,72,153,0.12)", border: "rgba(236,72,153,0.3)" },
  { name: "Teal", value: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.3)" },
];

const SUBJECTS = ["All", "DSA", "OS", "DBMS", "CN", "Web Dev", "AI/ML", "System Design", "General"];

const QUICK_COLORS = [
  "rgba(255,237,100,0.25)",
  "rgba(167,243,208,0.25)",
  "rgba(196,181,253,0.25)",
  "rgba(254,202,202,0.25)",
  "rgba(191,219,254,0.25)",
];

/* ═══════════════════════════════════════════════════════════════════
   localStorage helpers
   ═══════════════════════════════════════════════════════════════════ */

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, data: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

/* ═══════════════════════════════════════════════════════════════════
   Pomodoro Timer Component
   ═══════════════════════════════════════════════════════════════════ */

function PomodoroTimer({ onSessionComplete }: { onSessionComplete: (minutes: number) => void }) {
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          setMinutes((m) => {
            if (m === 0) {
              setRunning(false);
              if (mode === "focus") {
                setSessions((s) => s + 1);
                onSessionComplete(focusDuration);
                setMode("break");
                setMinutes(breakDuration);
              } else {
                setMode("focus");
                setMinutes(focusDuration);
              }
              return m;
            }
            return m - 1;
          });
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode, focusDuration, breakDuration, onSessionComplete]);

  const reset = () => {
    setRunning(false);
    setMode("focus");
    setMinutes(focusDuration);
    setSeconds(0);
  };

  const totalSeconds = minutes * 60 + seconds;
  const maxSeconds = (mode === "focus" ? focusDuration : breakDuration) * 60;
  const progress = maxSeconds > 0 ? ((maxSeconds - totalSeconds) / maxSeconds) * 100 : 0;

  return (
    <div style={{ textAlign: "center" }}>
      {/* Mode Toggle */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, justifyContent: "center" }}>
        <button
          onClick={() => { if (!running) { setMode("focus"); setMinutes(focusDuration); setSeconds(0); } }}
          style={{
            padding: "6px 16px", borderRadius: 8, border: "none", cursor: running ? "default" : "pointer",
            background: mode === "focus" ? "var(--gradient)" : "var(--surface)",
            color: mode === "focus" ? "#fff" : "var(--text-secondary)",
            fontSize: 12, fontWeight: 600, opacity: running ? 0.6 : 1,
          }}
        >
          Focus
        </button>
        <button
          onClick={() => { if (!running) { setMode("break"); setMinutes(breakDuration); setSeconds(0); } }}
          style={{
            padding: "6px 16px", borderRadius: 8, border: "none", cursor: running ? "default" : "pointer",
            background: mode === "break" ? "var(--gradient)" : "var(--surface)",
            color: mode === "break" ? "#fff" : "var(--text-secondary)",
            fontSize: 12, fontWeight: 600, opacity: running ? 0.6 : 1,
          }}
        >
          Break
        </button>
      </div>

      {/* Timer Display */}
      <div style={{
        width: 160, height: 160, borderRadius: "50%", margin: "0 auto 20px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `conic-gradient(var(--accent) ${progress}%, var(--surface) ${progress}%)`,
        position: "relative",
      }}>
        <div style={{
          width: 140, height: 140, borderRadius: "50%",
          background: "var(--bg-primary)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>
            {mode === "focus" ? "Focus" : "Break"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 }}>
        <button
          onClick={() => setRunning(!running)}
          style={{
            padding: "10px 28px", borderRadius: 10, border: "none", cursor: "pointer",
            background: "var(--gradient)", color: "#fff", fontSize: 14, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          style={{
            padding: "10px 16px", borderRadius: 10, border: "1px solid var(--border)", cursor: "pointer",
            background: "var(--bg-card)", color: "var(--text-secondary)", fontSize: 14,
          }}
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Sessions */}
      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
        Sessions completed: <strong style={{ color: "var(--accent)" }}>{sessions}</strong>
      </div>

      {/* Duration Settings */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
        <label style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
          Focus:
          <input
            type="number" min={1} max={60} value={focusDuration}
            onChange={(e) => { const v = parseInt(e.target.value) || 25; setFocusDuration(v); if (!running && mode === "focus") setMinutes(v); }}
            style={{ width: 50, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-primary)", fontSize: 13, textAlign: "center" }}
          /> min
        </label>
        <label style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
          Break:
          <input
            type="number" min={1} max={30} value={breakDuration}
            onChange={(e) => { const v = parseInt(e.target.value) || 5; setBreakDuration(v); if (!running && mode === "break") setMinutes(v); }}
            style={{ width: 50, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-primary)", fontSize: 13, textAlign: "center" }}
          /> min
        </label>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════════════════════ */

export default function NotepadPage() {
  const [mounted, setMounted] = useState(false);

  // Study Notes state
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [noteFilter, setNoteFilter] = useState("All");
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteSubject, setNoteSubject] = useState("General");
  const [noteColor, setNoteColor] = useState(NOTE_COLORS[0].value);

  // Quick Notes state
  const [quickNotes, setQuickNotes] = useState<QuickNote[]>([]);
  const [quickText, setQuickText] = useState("");

  // Study Sessions state
  const [sessions, setSessions] = useState<StudySession[]>([]);

  // Load from localStorage
  useEffect(() => {
    setMounted(true);
    setNotes(loadJSON<StudyNote[]>("cse-notes", []));
    setQuickNotes(loadJSON<QuickNote[]>("cse-quick-notes", []));
    setSessions(loadJSON<StudySession[]>("cse-study-sessions", []));
  }, []);

  // Save notes
  useEffect(() => { if (mounted) saveJSON("cse-notes", notes); }, [notes, mounted]);
  useEffect(() => { if (mounted) saveJSON("cse-quick-notes", quickNotes); }, [quickNotes, mounted]);
  useEffect(() => { if (mounted) saveJSON("cse-study-sessions", sessions); }, [sessions, mounted]);

  /* ── Study Notes CRUD ── */

  const addNote = () => {
    setEditingNote(null);
    setNoteTitle("");
    setNoteContent("");
    setNoteSubject("General");
    setNoteColor(NOTE_COLORS[0].value);
    setShowEditor(true);
  };

  const editNote = (note: StudyNote) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteSubject(note.subject);
    setNoteColor(note.color);
    setShowEditor(true);
  };

  const saveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;
    const now = Date.now();
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id
            ? { ...n, title: noteTitle.trim(), content: noteContent.trim(), subject: noteSubject, color: noteColor, updatedAt: now }
            : n
        )
      );
    } else {
      const newNote: StudyNote = {
        id: `note-${now}`,
        title: noteTitle.trim(),
        content: noteContent.trim(),
        subject: noteSubject,
        color: noteColor,
        createdAt: now,
        updatedAt: now,
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    setShowEditor(false);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotes = noteFilter === "All" ? notes : notes.filter((n) => n.subject === noteFilter);

  /* ── Quick Notes ── */

  const addQuickNote = () => {
    if (!quickText.trim()) return;
    const color = QUICK_COLORS[quickNotes.length % QUICK_COLORS.length];
    setQuickNotes((prev) => [{ id: `qn-${Date.now()}`, text: quickText.trim(), color, createdAt: Date.now() }, ...prev]);
    setQuickText("");
  };

  const deleteQuickNote = (id: string) => {
    setQuickNotes((prev) => prev.filter((n) => n.id !== id));
  };

  /* ── Pomodoro Session Handler ── */

  const handleSessionComplete = useCallback((minutes: number) => {
    const today = new Date().toISOString().split("T")[0];
    setSessions((prev) => {
      const existing = prev.find((s) => s.date === today);
      if (existing) {
        return prev.map((s) => s.date === today ? { ...s, focusMinutes: s.focusMinutes + minutes } : s);
      }
      return [...prev, { id: `sess-${today}`, date: today, focusMinutes: minutes, subject: "Focus" }];
    });
  }, []);

  /* ── Stats ── */

  const totalMinutes = sessions.reduce((acc, s) => acc + s.focusMinutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMin = totalMinutes % 60;
  const thisWeek = sessions.filter((s) => {
    const d = new Date(s.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  }).reduce((acc, s) => acc + s.focusMinutes, 0);

  if (!mounted) return null;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ═══ Hero ═══ */}
      <div style={{
        background: "linear-gradient(135deg, rgba(139,92,246,0.06), rgba(59,130,246,0.04), transparent)",
        borderBottom: "1px solid var(--border)", padding: "48px 0 40px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
          backgroundImage: "radial-gradient(circle at 60% 30%, rgba(139,92,246,0.06), transparent 60%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <StickyNote size={24} style={{ color: "var(--accent)" }} />
            <h1 style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
              Study <span className="gradient-text-premium">Notepad</span>
            </h1>
          </div>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 520 }}>
            Take notes, track study sessions, and stay focused with the Pomodoro timer.
          </p>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="container" style={{ padding: "32px 20px 80px" }}>
        {/* Stats Row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 12, marginBottom: 32,
        }}>
          {[
            { icon: <BookOpen size={18} />, label: "Notes", value: notes.length, color: "var(--accent)" },
            { icon: <Timer size={18} />, label: "Total Focus", value: totalHours > 0 ? `${totalHours}h ${remainingMin}m` : `${totalMinutes}m`, color: "var(--accent-green)" },
            { icon: <Clock size={18} />, label: "This Week", value: `${thisWeek}m`, color: "var(--accent-orange)" },
            { icon: <CheckCircle size={18} />, label: "Sessions", value: sessions.length, color: "var(--accent-purple)" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: "16px 18px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ color: stat.color }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ Cards Grid ═══ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))",
          gap: 24,
        }}>

          {/* ─── Pomodoro Timer Card ─── */}
          <div className="card-premium" style={{ padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Timer size={20} style={{ color: "var(--accent)" }} />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>Pomodoro Timer</h2>
            </div>
            <PomodoroTimer onSessionComplete={handleSessionComplete} />
          </div>

          {/* ─── Quick Notes Card ─── */}
          <div className="card-premium" style={{ padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <StickyNote size={20} style={{ color: "var(--accent-orange)" }} />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>Quick Notes</h2>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>{quickNotes.length} notes</span>
            </div>

            {/* Input */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input
                type="text"
                placeholder="Type a quick note and press Enter..."
                value={quickText}
                onChange={(e) => setQuickText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addQuickNote()}
                style={{
                  flex: 1, padding: "10px 14px", borderRadius: 10,
                  border: "1px solid var(--border)", background: "var(--surface)",
                  color: "var(--text-primary)", fontSize: 14, outline: "none",
                }}
              />
              <button
                onClick={addQuickNote}
                style={{
                  padding: "10px 14px", borderRadius: 10, border: "none",
                  background: "var(--gradient)", color: "#fff", cursor: "pointer",
                  display: "flex", alignItems: "center",
                }}
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Quick Notes List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, overflowY: "auto" }}>
              {quickNotes.length === 0 && (
                <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-muted)", fontSize: 13 }}>
                  No quick notes yet. Type above to add one.
                </div>
              )}
              {quickNotes.map((qn) => (
                <div key={qn.id} style={{
                  padding: "10px 14px", borderRadius: 10,
                  background: qn.color, border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span style={{ flex: 1, fontSize: 14, color: "var(--text-primary)", lineHeight: 1.5 }}>{qn.text}</span>
                  <button
                    onClick={() => deleteQuickNote(qn.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, flexShrink: 0 }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Study Notes Section ═══ */}
        <div style={{ marginTop: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <BookOpen size={20} style={{ color: "var(--accent-green)" }} />
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }}>Study Notes</h2>
            <button
              onClick={addNote}
              style={{
                marginLeft: "auto", padding: "8px 16px", borderRadius: 10, border: "none",
                background: "var(--gradient)", color: "#fff", fontSize: 13, fontWeight: 600,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <Plus size={16} /> New Note
            </button>
          </div>

          {/* Subject Filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setNoteFilter(s)}
                style={{
                  padding: "6px 14px", borderRadius: 8, border: "none",
                  background: noteFilter === s ? "var(--gradient)" : "var(--surface)",
                  color: noteFilter === s ? "#fff" : "var(--text-secondary)",
                  fontSize: 12, fontWeight: 500, cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Notes Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
            gap: 16,
          }}>
            {filteredNotes.map((note) => (
              <div key={note.id} style={{
                background: note.color, border: `1px solid ${NOTE_COLORS.find((c) => c.value === note.color)?.border || "var(--border)"}`,
                borderRadius: "var(--radius-lg)", padding: 20,
                display: "flex", flexDirection: "column",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5,
                    padding: "2px 8px", borderRadius: 6, background: "rgba(0,0,0,0.15)",
                    color: "var(--text-secondary)",
                  }}>
                    {note.subject}
                  </span>
                  <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-muted)" }}>
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{note.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, whiteSpace: "pre-wrap" }}>
                  {note.content.length > 200 ? note.content.slice(0, 200) + "..." : note.content}
                </p>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button
                    onClick={() => editNote(note)}
                    style={{
                      padding: "6px 12px", borderRadius: 8, border: "1px solid var(--border)",
                      background: "var(--bg-card)", color: "var(--text-secondary)",
                      fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                    }}
                  >
                    <Edit3 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    style={{
                      padding: "6px 12px", borderRadius: 8, border: "1px solid var(--border)",
                      background: "var(--bg-card)", color: "var(--text-muted)",
                      fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                    }}
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
              <BookOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
              <p style={{ fontSize: 15 }}>No notes{noteFilter !== "All" ? ` for ${noteFilter}` : ""}. Click &quot;New Note&quot; to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* ═══ Note Editor Modal ═══ */}
      {showEditor && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowEditor(false); }}
        >
          <div style={{
            background: "var(--bg-primary)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: 28,
            width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>
                {editingNote ? "Edit Note" : "New Note"}
              </h3>
              <button onClick={() => setShowEditor(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <X size={20} />
              </button>
            </div>

            {/* Title */}
            <input
              type="text"
              placeholder="Note title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10,
                border: "1px solid var(--border)", background: "var(--surface)",
                color: "var(--text-primary)", fontSize: 15, fontWeight: 600,
                outline: "none", marginBottom: 12,
              }}
            />

            {/* Subject */}
            <select
              value={noteSubject}
              onChange={(e) => setNoteSubject(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10,
                border: "1px solid var(--border)", background: "var(--surface)",
                color: "var(--text-primary)", fontSize: 14, outline: "none", marginBottom: 12,
              }}
            >
              {SUBJECTS.filter((s) => s !== "All").map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Color */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {NOTE_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setNoteColor(c.value)}
                  style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: c.value, border: `2px solid ${noteColor === c.value ? c.border : "transparent"}`,
                    cursor: "pointer", transition: "border-color 0.2s",
                  }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Content */}
            <textarea
              placeholder="Write your note here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={10}
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 10,
                border: "1px solid var(--border)", background: "var(--surface)",
                color: "var(--text-primary)", fontSize: 14, lineHeight: 1.6,
                outline: "none", resize: "vertical", fontFamily: "inherit",
              }}
            />

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowEditor(false)}
                style={{
                  padding: "10px 20px", borderRadius: 10, border: "1px solid var(--border)",
                  background: "var(--bg-card)", color: "var(--text-secondary)",
                  fontSize: 14, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveNote}
                style={{
                  padding: "10px 20px", borderRadius: 10, border: "none",
                  background: "var(--gradient)", color: "#fff",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <Save size={16} /> {editingNote ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
