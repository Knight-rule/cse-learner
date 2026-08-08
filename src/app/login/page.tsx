"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Mail, Lock, ArrowRight, BookOpen, Code, Target, Shield, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      background: "var(--bg-primary)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        maxWidth: 960,
        width: "100%",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(45, 31, 20, 0.12)",
        border: "1px solid var(--border)",
      }}>
        {/* Left Panel - Branding */}
        <div style={{
          background: "linear-gradient(135deg, #f9f5f0, #f0e8df)",
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "var(--gradient)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            boxShadow: "0 4px 16px rgba(139, 94, 60, 0.25)",
          }}>
            <BookOpen size={28} color="#fff" />
          </div>

          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: 32,
            fontWeight: 800,
            color: "#2D1F14",
            marginBottom: 8,
            letterSpacing: "-0.5px",
          }}>
            CSE Learner
          </h1>
          <p style={{
            fontSize: 15,
            color: "#6B5A4E",
            marginBottom: 36,
            lineHeight: 1.6,
          }}>
            Master Computer Science with interactive lessons and practice
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: <Sparkles size={18} />, title: "AI-Powered Mentoring", desc: "Get instant help from AI tutor" },
              { icon: <Code size={18} />, title: "Interactive Practice", desc: "Solve problems with live code editor" },
              { icon: <Target size={18} />, title: "Track Progress", desc: "Monitor your learning journey" },
            ].map((item) => (
              <div key={item.title} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 16px",
                borderRadius: "var(--radius-md)",
                background: "rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(139, 94, 60, 0.08)",
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(139, 94, 60, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8B5E3C",
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#2D1F14" }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#9B8B7E" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: "flex",
            gap: 12,
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid rgba(139, 94, 60, 0.1)",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 100,
              background: "rgba(139, 94, 60, 0.06)",
              border: "1px solid rgba(139, 94, 60, 0.1)",
              fontSize: 12,
              color: "#6B5A4E",
            }}>
              <Shield size={12} /> 100% Free
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 100,
              background: "rgba(139, 94, 60, 0.06)",
              border: "1px solid rgba(139, 94, 60, 0.1)",
              fontSize: 12,
              color: "#6B5A4E",
            }}>
              <Lock size={12} /> Secure
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div style={{
          background: "#ffffff",
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#2D1F14",
            marginBottom: 6,
          }}>
            Welcome back
          </h2>
          <p style={{
            fontSize: 14,
            color: "#9B8B7E",
            marginBottom: 32,
          }}>
            Sign in to continue your learning journey
          </p>

          {/* Social Login Buttons */}
          <button style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            border: "1px solid #e8dfd8",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            fontSize: 14,
            fontWeight: 500,
            color: "#2D1F14",
            cursor: "pointer",
            transition: "all 0.2s",
            marginBottom: 10,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <button style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            border: "1px solid #2D1F14",
            background: "#2D1F14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            fontSize: 14,
            fontWeight: 500,
            color: "#fff",
            cursor: "pointer",
            transition: "all 0.2s",
            marginBottom: 24,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
            </svg>
            Continue with Microsoft
          </button>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}>
            <div style={{ flex: 1, height: 1, background: "#e8dfd8" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9B8B7E", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Or sign in with email
            </span>
            <div style={{ flex: 1, height: 1, background: "#e8dfd8" }} />
          </div>

          {error && (
            <div style={{
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              background: "rgba(139, 94, 60, 0.08)",
              border: "1px solid rgba(139, 94, 60, 0.2)",
              color: "#8B5E3C",
              fontSize: 13,
              marginBottom: 16,
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#6B5A4E", marginBottom: 6 }}>
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9B8B7E",
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 38px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid #e8dfd8",
                    background: "#faf7f4",
                    fontSize: 14,
                    color: "#2D1F14",
                    outline: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#8B5E3C"}
                  onBlur={(e) => e.target.style.borderColor = "#e8dfd8"}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#6B5A4E", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9B8B7E",
                }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 38px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid #e8dfd8",
                    background: "#faf7f4",
                    fontSize: 14,
                    color: "#2D1F14",
                    outline: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#8B5E3C"}
                  onBlur={(e) => e.target.style.borderColor = "#e8dfd8"}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: "var(--radius-md)",
                background: "var(--gradient)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 16px rgba(139, 94, 60, 0.25)",
                transition: "all 0.2s",
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p style={{
            textAlign: "center",
            marginTop: 24,
            fontSize: 14,
            color: "#9B8B7E",
          }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#8B5E3C", fontWeight: 600, textDecoration: "none" }}>
              Sign up
            </Link>
          </p>

          <p style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 12,
            color: "#9B8B7E",
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            background: "#faf7f4",
            border: "1px solid #e8dfd8",
          }}>
            Data is stored locally in your browser. No server required.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
