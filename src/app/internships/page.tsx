"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Search, ExternalLink, Building2, GraduationCap, Globe, Wifi, MapPin } from "lucide-react";
import { internships, internshipCompanies, internshipTypes } from "@/data/internships";

const modeFilters = [
  { value: "", label: "All Modes", icon: <Globe size={13} /> },
  { value: "Online", label: "Online", icon: <Wifi size={13} /> },
  { value: "Offline", label: "Offline", icon: <MapPin size={13} /> },
  { value: "Hybrid", label: "Hybrid", icon: <Globe size={13} /> },
];

const originFilters = [
  { value: "", label: "All Regions" },
  { value: "International", label: "International" },
  { value: "India", label: "India" },
];

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [origin, setOrigin] = useState("");

  const filtered = useMemo(() => {
    return internships.filter((i) => {
      const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()) || i.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCompany = !company || i.company === company;
      const matchType = !type || i.type === type;
      const matchMode = !mode || i.mode === mode;
      const matchOrigin = !origin || i.origin === origin;
      return matchSearch && matchCompany && matchType && matchMode && matchOrigin;
    });
  }, [search, company, type, mode, origin]);

  const onlineCount = internships.filter((i) => i.mode === "Online").length;
  const offlineCount = internships.filter((i) => i.mode === "Offline").length;
  const hybridCount = internships.filter((i) => i.mode === "Hybrid").length;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ═══ Hero ═══ */}
      <div style={{
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.06), rgba(59, 130, 246, 0.04), transparent)",
        borderBottom: "1px solid var(--border)", padding: "48px 0 40px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
          backgroundImage: "radial-gradient(circle at 60% 30%, rgba(16, 185, 129, 0.06), transparent 60%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="breadcrumb" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Internships</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <GraduationCap size={24} style={{ color: "var(--accent-green)" }} />
            <h1 style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
              Free <span className="gradient-text-premium">Internships</span> & Programs
            </h1>
          </div>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 520 }}>
            Curated internship opportunities, open source programs, and fellowships from top companies worldwide.
          </p>

          {/* Quick Stats */}
          <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
            {[
              { label: "Online", count: onlineCount, color: "var(--accent-green)" },
              { label: "Offline", count: offlineCount, color: "var(--accent)" },
              { label: "Hybrid", count: hybridCount, color: "var(--accent-purple)" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                <span style={{ color: "var(--text-muted)" }}>{s.label}:</span>
                <strong style={{ color: "var(--text-primary)" }}>{s.count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="container-page">
        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 16px", borderRadius: "var(--radius-lg)",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          marginBottom: 20, maxWidth: 480,
        }}>
          <Search size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search internships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: "var(--text-primary)", fontSize: 14 }}
          />
        </div>

        {/* Mode Filter */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Mode</div>
          <div className="internship-filter-group" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {modeFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setMode(f.value)}
                style={{
                  padding: "8px 16px", borderRadius: "var(--radius-lg)",
                  background: mode === f.value ? "var(--gradient)" : "var(--bg-card)",
                  border: `1px solid ${mode === f.value ? "transparent" : "var(--border)"}`,
                  color: mode === f.value ? "#fff" : "var(--text-secondary)",
                  fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Region Filter */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Region</div>
          <div className="internship-filter-group" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {originFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setOrigin(f.value)}
                style={{
                  padding: "8px 16px", borderRadius: "var(--radius-lg)",
                  background: origin === f.value ? "var(--gradient)" : "var(--bg-card)",
                  border: `1px solid ${origin === f.value ? "transparent" : "var(--border)"}`,
                  color: origin === f.value ? "#fff" : "var(--text-secondary)",
                  fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type filter */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Type</div>
          <div className="internship-filter-group" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button
              onClick={() => setType("")}
              style={{
                padding: "8px 16px", borderRadius: "var(--radius-lg)",
                background: !type ? "var(--gradient)" : "var(--bg-card)",
                border: `1px solid ${!type ? "transparent" : "var(--border)"}`,
                color: !type ? "#fff" : "var(--text-secondary)",
                fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
              }}
            >
              All
            </button>
            {internshipTypes.map((t) => (
              <button
                key={t}
                onClick={() => setType(type === t ? "" : t)}
                style={{
                  padding: "8px 16px", borderRadius: "var(--radius-lg)",
                  background: type === t ? "var(--gradient)" : "var(--bg-card)",
                  border: `1px solid ${type === t ? "transparent" : "var(--border)"}`,
                  color: type === t ? "#fff" : "var(--text-secondary)",
                  fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Company filter */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Company</div>
          <div className="internship-filter-group" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button
              onClick={() => setCompany("")}
              style={{
                padding: "8px 16px", borderRadius: "var(--radius-lg)",
                background: !company ? "var(--gradient)" : "var(--bg-card)",
                border: `1px solid ${!company ? "transparent" : "var(--border)"}`,
                color: !company ? "#fff" : "var(--text-secondary)",
                fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
              }}
            >
              All
            </button>
            {internshipCompanies.map((c) => (
              <button
                key={c}
                onClick={() => setCompany(company === c ? "" : c)}
                style={{
                  padding: "8px 16px", borderRadius: "var(--radius-lg)",
                  background: company === c ? "var(--gradient)" : "var(--bg-card)",
                  border: `1px solid ${company === c ? "transparent" : "var(--border)"}`,
                  color: company === c ? "#fff" : "var(--text-secondary)",
                  fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div style={{ marginBottom: 16, fontSize: 13, color: "var(--text-muted)" }}>
          {filtered.length} opportunit{filtered.length === 1 ? "y" : "ies"} found
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
          gap: 16,
        }}>
          {filtered.map((intern, i) => (
            <a
              key={i}
              href={intern.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-premium"
              style={{
                display: "flex", flexDirection: "column", padding: 24,
                textDecoration: "none", color: "inherit",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>{intern.companyIcon}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5,
                  padding: "3px 10px", borderRadius: 8,
                  background: "rgba(16, 185, 129, 0.1)", color: "var(--accent-green)",
                }}>
                  {intern.type}
                </span>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{intern.company}</span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.3 }}>
                {intern.name}
              </h3>

              {/* Description */}
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, marginBottom: 14 }}>
                {intern.description}
              </p>

              {/* Mode + Origin Badges */}
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 8,
                  background: intern.mode === "Online" ? "rgba(16,185,129,0.12)" : intern.mode === "Offline" ? "rgba(59,130,246,0.12)" : "rgba(139,92,246,0.12)",
                  color: intern.mode === "Online" ? "var(--accent-green)" : intern.mode === "Offline" ? "var(--accent)" : "var(--accent-purple)",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {intern.mode === "Online" ? <Wifi size={10} /> : intern.mode === "Offline" ? <MapPin size={10} /> : <Globe size={10} />}
                  {intern.mode}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 8,
                  background: "var(--surface)", color: "var(--text-muted)",
                }}>
                  {intern.origin}
                </span>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {intern.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: 11, padding: "3px 8px", borderRadius: 6,
                    background: "var(--surface)", color: "var(--text-muted)",
                  }}>{tag}</span>
                ))}
              </div>

              {/* CTA */}
              <span style={{
                fontSize: 14, fontWeight: 600, color: "var(--accent-green)",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                Apply Now <ExternalLink size={14} />
              </span>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
            <Building2 size={48} style={{ margin: "0 auto 16px", opacity: 0.4 }} />
            <div style={{ fontSize: 18, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
              No internships match your filters
            </div>
            <div style={{ fontSize: 14 }}>Try different keywords or adjust filters.</div>
          </div>
        )}
      </div>
    </div>
  );
}
