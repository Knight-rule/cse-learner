"use client";
import Link from "next/link";
import { ChevronRight, ArrowRight, Mail, Github, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container-sm">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Contact</span>
        </div>

        <div className="text-center mb-12">
          <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}>Contact Us</span>
          <h1 className="heading-xl mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="body-lg mx-auto" style={{ maxWidth: 500 }}>
            Have questions, suggestions, or want to contribute? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="contact-cards-grid" style={{ marginBottom: 48 }}>
          <div className="glass-card p-8 text-center">
            <div style={{ width: 56, height: 56, borderRadius: "var(--radius-lg)", background: "var(--gradient-soft)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "var(--accent)" }}>
              <Mail size={24} />
            </div>
            <h3 className="heading-sm mb-2">Email Us</h3>
            <p className="body-md">support@cselearner.com</p>
            <p className="body-sm" style={{ marginTop: 8 }}>We typically respond within 24 hours</p>
          </div>
          <div className="glass-card p-8 text-center">
            <div style={{ width: 56, height: 56, borderRadius: "var(--radius-lg)", background: "var(--gradient-soft)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "var(--accent)" }}>
              <Github size={24} />
            </div>
            <h3 className="heading-sm mb-2">GitHub</h3>
            <p className="body-md">Open source &amp; community driven</p>
            <a href="https://github.com/Knight-rule/cse-learner" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" style={{ marginTop: 12, display: "inline-flex" }}>
              View Repository <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="heading-md mb-6">Send Us a Message</h2>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="contact-form-grid">
              <div>
                <label className="body-sm" style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "var(--text-secondary)" }}>Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit",
                    outline: "none", transition: "var(--transition)"
                  }}
                />
              </div>
              <div>
                <label className="body-sm" style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "var(--text-secondary)" }}>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit",
                    outline: "none", transition: "var(--transition)"
                  }}
                />
              </div>
            </div>
            <div>
              <label className="body-sm" style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "var(--text-secondary)" }}>Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)",
                  background: "var(--surface)", border: "1px solid var(--border)",
                  color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit",
                  outline: "none", transition: "var(--transition)"
                }}
              />
            </div>
            <div>
              <label className="body-sm" style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "var(--text-secondary)" }}>Message</label>
              <textarea
                rows={5}
                placeholder="Tell us what's on your mind..."
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)",
                  background: "var(--surface)", border: "1px solid var(--border)",
                  color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit",
                  outline: "none", transition: "var(--transition)", resize: "vertical"
                }}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Send Message <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
