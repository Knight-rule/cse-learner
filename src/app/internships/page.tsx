"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Briefcase, Search, ExternalLink, Building2 } from "lucide-react";
import { internships, internshipCompanies, internshipTypes } from "@/data/internships";

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    return internships.filter((i) => {
      const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()) || i.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCompany = !company || i.company === company;
      const matchType = !type || i.type === type;
      return matchSearch && matchCompany && matchType;
    });
  }, [search, company, type]);

  return (
    <div className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>Internships</span>
        </div>

        <span className="badge badge-accent mb-4" style={{ display: "inline-flex" }}><Briefcase size={14} /> Internships</span>
        <h1 className="heading-xl mb-3">
          Free <span className="gradient-text">Internships</span> & Programs
        </h1>
        <p className="body-lg mb-8" style={{ maxWidth: 640 }}>
          Curated internship opportunities, open source programs, and fellowships from top companies — remote, paid, and beginner-friendly.
        </p>

        {/* Search */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div style={{ position: "relative", flex: "1 1 280px", maxWidth: 400 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search internships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "10px 12px 10px 36px", borderRadius: "var(--radius-md)",
                background: "var(--surface)", border: "1px solid var(--border)",
                color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit", outline: "none"
              }}
            />
          </div>
        </div>

        {/* Type filter */}
        <div style={{ marginBottom: 12 }}>
          <p className="body-sm mb-2" style={{ color: "var(--text-muted)", fontWeight: 600 }}>Type</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <button
              onClick={() => setType("")}
              style={{
                padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid var(--border)",
                background: !type ? "var(--accent)" : "var(--surface)", color: !type ? "#fff" : "var(--text-secondary)", transition: "var(--transition)"
              }}
            >
              All
            </button>
            {internshipTypes.map((t) => (
              <button
                key={t}
                onClick={() => setType(type === t ? "" : t)}
                style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid var(--border)",
                  background: type === t ? "var(--accent)" : "var(--surface)", color: type === t ? "#fff" : "var(--text-secondary)", transition: "var(--transition)"
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Company filter */}
        <div style={{ marginBottom: 24 }}>
          <p className="body-sm mb-2" style={{ color: "var(--text-muted)", fontWeight: 600 }}>Company</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <button
              onClick={() => setCompany("")}
              style={{
                padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid var(--border)",
                background: !company ? "var(--accent)" : "var(--surface)", color: !company ? "#fff" : "var(--text-secondary)", transition: "var(--transition)"
              }}
            >
              All
            </button>
            {internshipCompanies.map((c) => (
              <button
                key={c}
                onClick={() => setCompany(company === c ? "" : c)}
                style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid var(--border)",
                  background: company === c ? "var(--accent)" : "var(--surface)", color: company === c ? "#fff" : "var(--text-secondary)", transition: "var(--transition)"
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="body-sm mb-4" style={{ color: "var(--text-muted)" }}>
          {filtered.length} opportunit{filtered.length === 1 ? "y" : "ies"} found
        </p>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: 16 }}>
          {filtered.map((intern, i) => (
            <a
              key={i}
              href={intern.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", flexDirection: "column", padding: 20, borderRadius: "var(--radius-xl)",
                background: "var(--bg-card)", border: "1px solid var(--border)", textDecoration: "none", color: "inherit",
                transition: "var(--transition)"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{intern.companyIcon}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5,
                  padding: "2px 8px", borderRadius: 12, background: "rgba(99, 102, 241, 0.1)", color: "#6366f1"
                }}>
                  {intern.type}
                </span>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{intern.company}</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>{intern.name}</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, flex: 1 }}>{intern.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10, marginBottom: 12 }}>
                {intern.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 8, background: "var(--surface)", color: "var(--text-muted)" }}>{tag}</span>
                ))}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", display: "flex", alignItems: "center", gap: 4 }}>
                Apply Now <ExternalLink size={13} />
              </span>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)" }}>
            <Building2 size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
            <p>No internships match your filters. Try different keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}
