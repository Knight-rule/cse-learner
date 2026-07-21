"use client";

import { useState, useEffect } from "react";
import { Brain, Wrench, Lightbulb, Send, Sparkles, X } from "lucide-react";
import { practiceData } from "@/data/practice";
import { getLearnerName } from "@/lib/tracker";

interface AIMentorPrompt {
  id: string;
  userId?: string;
  question: string;
  context: {
    courseSlug: string;
    problemId?: string;
    problemTitle?: string;
    difficulty?: string;
    language?: string;
    code?: string;
  };
  hintLevel: "none" | "minimal" | "moderate" | "full";
  createdAt: number;
  updatedAt: number;
}

interface AIMentorResponse {
  id: string;
  promptId: string;
  userId?: string;
  response: string;
  explanation?: string;
  relatedConcepts?: string[];
  difficultyLevel: "easy" | "medium" | "hard";
  codeSnippet?: string;
  createdAt: number;
}

export default function AIMentorPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<AIMentorPrompt['context']>({ courseSlug: 'data-structures' });
  const [promptText, setPromptText] = useState('');
  const [hintLevel, setHintLevel] = useState<AIMentorPrompt['hintLevel']>('moderate');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIMentorResponse | null>(null);
  const [learnerName, setLearnerName] = useState('');

  useEffect(() => {
    setLearnerName(getLearnerName());
  }, []);

  const courses = practiceData.map((p) => p.courseSlug);
  const selectedCourse = practiceData.find((p) => p.courseSlug === context.courseSlug);
  const problems = selectedCourse?.problems || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const prompt: AIMentorPrompt = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 10),
        question: promptText,
        context,
        hintLevel,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const res = await fetch('/api/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prompt),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || 'Failed to get AI mentor response');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error('Error:', err);
      setResponse({
        id: Date.now().toString(36),
        promptId: '',
        response: `⚠️ Error: ${(err as Error).message}\n\n` +
          'This feature requires a Gemini API key. If you have one, please configure it in the environment.\n\n' +
          'In the meantime, you can try asking a simpler question like \"How do I reverse an array?\"',
        explanation: undefined,
        relatedConcepts: [],
        difficultyLevel: 'medium',
        createdAt: Date.now(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container container-narrow">
        <div className="page-head">
          <span className="eyebrow">
            <Sparkles size={14} /> AI Mentor
          </span>
          <h1 className="heading-xl">AI-Powered Learning Assistant</h1>
          <p className="lede">
            Your personal AI tutor that explains concepts, hints at solutions, and adapts to your learning style.
            Ask anything about your course material, programming problems, or CS concepts.
          </p>
        </div>

        <div className="ai-mentor-layout">
          <aside className="ai-mentor-sidebar">
            <div className="ai-card">
              <h3 className="heading-sm">Quick Start</h3>
              <ul className="ai-tips">
                <li>💡 Ask for explanations of concepts you find confusing</li>
                <li>🔍 Get hints for specific problems</li>
                <li>🧠 Learn why a solution works, not just how</li>
                <li>📚 Get related concepts to explore</li>
              </ul>
            </div>

            <div className="ai-card">
              <h3 className="heading-sm">Course Context</h3>
              <div className="ai-context-select">
                <label>Course</label>
                <select
                  value={context.courseSlug}
                  onChange={(e) => setContext((c) => ({ ...c, courseSlug: e.target.value }))}
                >
                  {courses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {problems.length > 0 && (
                <div className="ai-context-select">
                  <label>Problem (optional)</label>
                  <select
                    value={context.problemId || ''}
                    onChange={(e) => setContext((c) => ({
                      ...c,
                      problemId: e.target.value || undefined,
                      problemTitle: e.target.value ? problems.find(p => p.id === e.target.value)?.title : undefined,
                    }))}
                  >
                    <option value="">-- Any Problem --</option>
                    {problems.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="ai-context-select">
                <label>Hint Level</label>
                <select
                  value={hintLevel}
                  onChange={(e) => setHintLevel(e.target.value as any)}
                >
                  <option value="none">None - Get full solution</option>
                  <option value="minimal">Minimal - Just the answer</option>
                  <option value="moderate">Moderate - Strategic hints</option>
                  <option value="full">Full - Step-by-step guidance</option>
                </select>
              </div>
            </div>

            <div className="ai-card">
              <h3 className="heading-sm">Example Prompts</h3>
              <ul className="ai-examples">
                <li>\"Explain what a linked list is and when to use it\"</li>
                <li>\"How do I solve binary search problems?\"</li>
                <li>\"Why does quicksort have O(n log n) average case?\"</li>
                <li>\"Help me debug this code: [paste code]\"</li>
                <li>\"What's the difference between tree and graph traversal?\"</li>
              </ul>
            </div>
          </aside>

          <main className="ai-mentor-main">
            <button
              className="ai-mentor-toggle"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Brain size={20} />}
              <span>{isOpen ? 'Close' : 'Open'} AI Mentor</span>
            </button>

            <div className={`ai-mentor-window ${isOpen ? 'open' : ''}`}
                 style={{ transition: 'all 0.3s ease' }}
            >
              <div className="ai-mentor-header">
                <div className="ai-avatar">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3>AI Mentor</h3>
                  <p>Here to help you learn CS concepts</p>
                </div>
              </div>

              {response && (
                <div className="ai-response-container">
                  <div className="ai-response-header">
                    <span className="ai-response-label">AI Response</span>
                    <span className="ai-difficulty-tag" style={{
                      backgroundColor: response.difficultyLevel === 'easy' ? '#dcfce7' :
                        response.difficultyLevel === 'medium' ? '#fed7aa' : '#fca5a5',
                      color: response.difficultyLevel === 'easy' ? '#166534' :
                        response.difficultyLevel === 'medium' ? '#92400e' : '#991b1b'
                    }}>
                      {response.difficultyLevel} difficulty
                    </span>
                  </div>
                  <div className="ai-response-content">
                    <pre>{response.response}</pre>
                  </div>

                  {response.explanation && (
                    <div className="ai-response-section">
                      <h4>Detailed Explanation</h4>
                      <pre>{response.explanation}</pre>
                    </div>
                  )}

                  {response.relatedConcepts && response.relatedConcepts.length > 0 && (
                    <div className="ai-response-section">
                      <h4>Related Concepts to Explore</h4>
                      <ul className="ai-concepts-list">
                        {response.relatedConcepts.map((concept, i) => (
                          <li key={i}>📚 {concept}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {response.codeSnippet && (
                    <div className="ai-response-section">
                      <h4>Code Example</h4>
                      <pre className="code-snippet">{response.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              )}

              <div className="ai-input-container">
                <textarea
                  className="ai-textarea"
                  placeholder="Ask about your course material, a specific problem, or any CS concept..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  rows={3}
                />

                <div className="ai-input-footer">
                  <span className="ai-input-help">
                    Hint level: {hintLevel} {hintLevel === 'none' ? '(full solution)' : hintLevel === 'minimal' ? '(just answer)' : hintLevel === 'moderate' ? '(strategic hints)' : '(step-by-step)'}
                  </span>

                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={isLoading || !promptText.trim()}
                  >
                    {isLoading ? (
                      <Wrench size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    <span>{isLoading ? 'Thinking...' : 'Ask AI'}</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
