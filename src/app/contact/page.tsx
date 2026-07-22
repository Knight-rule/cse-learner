"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Mail, Github, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
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
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <CheckCircle2 size={48} style={{ color: "var(--accent-green, #22c55e)", marginBottom: 16 }} />
              <h3 className="heading-sm mb-2">Message Sent!</h3>
              <p className="body-md" style={{ color: "var(--text-secondary)" }}>Thanks for reaching out. We&apos;ll get back to you soon.</p>
              <button className="btn btn-outline" style={{ marginTop: 20 }} onClick={() => setSubmitted(false)}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="contact-form-grid">
                <div>
                  <label htmlFor="contact-name" className="body-sm" style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "var(--text-secondary)" }}>Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    required
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)",
                      background: "var(--surface)", border: "1px solid var(--border)",
                      color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit",
                      outline: "none", transition: "var(--transition)"
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="body-sm" style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "var(--text-secondary)" }}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    required
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
                <label htmlFor="contact-subject" className="body-sm" style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "var(--text-secondary)" }}>Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="How can we help?"
                  required
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit",
                    outline: "none", transition: "var(--transition)"
                  }}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="body-sm" style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "var(--text-secondary)" }}>Message</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  required
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
          )}
        </div>
      </div>
    </div>
  );
}
