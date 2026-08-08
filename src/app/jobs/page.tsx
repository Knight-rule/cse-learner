"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Loader2, Building2, Search, X, ExternalLink, Bookmark, BookmarkCheck, Briefcase, GraduationCap, UserCheck, Sparkles } from "lucide-react";
import { Company, companies as allCompanies } from "@/lib/companies";

const fresherCategories = [
  "India",
  "FAANG+",
  "DevTools",
  "Cloud & Infra",
  "AI/ML",
  "Consulting",
  "Media",
  "Startups",
];

const experiencedCategories = [
  "FAANG+",
  "AI/ML",
  "SaaS",
  "Security",
  "Fintech",
  "Cloud & Infra",
  "DevTools",
  "Robotics",
  "Gaming",
  "Media",
  "Consulting",
  "Europe",
  "Asia-Pacific",
  "Middle East",
  "Africa",
  "Latin America",
  "Startups",
];

export default function JobsPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [level, setLevel] = useState<"All" | "Fresher" | "Experienced">("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(allCompanies.length);
  const [loading, setLoading] = useState(true);
  const [savedTab, setSavedTab] = useState(false);
  const [savedCompanies, setSavedCompanies] = useState<string[]>([]);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (selectedCategory) params.set("category", selectedCategory);
      if (level !== "All") params.set("level", level);
      params.set("page", String(page));
      params.set("limit", "50");

      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCompanies(data.companies || []);
      setTotalPages(data.pagination?.totalPages || 1);
      if (data.pagination?.total) setTotal(data.pagination.total);
    } catch (err) {
      console.error("Failed to load companies:", err);
      setCompanies([]);
    }
    setLoading(false);
  }, [query, selectedCategory, level, page]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    try { setSavedCompanies(JSON.parse(localStorage.getItem("cse-saved-companies") || "[]")); } catch { setSavedCompanies([]); }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, selectedCategory, level]);

  const handleSearch = (value: string) => {
    setInputValue(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setQuery(value), 300);
  };

  const clearSearch = () => {
    setInputValue("");
    setQuery("");
  };

  const toggleSave = (slug: string) => {
    const updated = savedCompanies.includes(slug)
      ? savedCompanies.filter((s) => s !== slug)
      : [...savedCompanies, slug];
    setSavedCompanies(updated);
    try { localStorage.setItem("cse-saved-companies", JSON.stringify(updated)); } catch {}
  };

  const filteredCompanies = savedTab
    ? companies.filter((c) => savedCompanies.includes(c.slug))
    : companies;

  const currentCategories = level === "Fresher" ? fresherCategories : level === "Experienced" ? experiencedCategories : Array.from(new Set([...fresherCategories, ...experiencedCategories]));

  const fresherCount = allCompanies.filter((c) => c.level === "Fresher" || c.level === "Both").length;
  const experiencedCount = allCompanies.filter((c) => c.level === "Experienced" || c.level === "Both").length;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ═══ Hero ═══ */}
      <div style={{
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.06), rgba(16, 185, 129, 0.04), transparent)",
        borderBottom: "1px solid var(--border)",
        padding: "48px 0 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
          backgroundImage: "radial-gradient(circle at 60% 30%, rgba(59, 130, 246, 0.06), transparent 60%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="breadcrumb" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Jobs</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <Briefcase size={24} style={{ color: "var(--accent)" }} />
            <h1 style={{
              fontSize: "clamp(28px, 5vw, 36px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}>
              Jobs for <span className="gradient-text-premium">Every Level</span>
            </h1>
          </div>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 520 }}>
            {total}+ companies across every tech category. Pick your level and start applying.
          </p>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="container-page">

        {/* ═══ Level Tabs ═══ */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12, marginBottom: 28,
        }}>
          <button
            onClick={() => setLevel("All")}
            style={{
              padding: "18px 20px", borderRadius: "var(--radius-xl)",
              background: level === "All" ? "var(--gradient)" : "var(--bg-card)",
              border: `2px solid ${level === "All" ? "transparent" : "var(--border)"}`,
              color: level === "All" ? "#fff" : "var(--text-primary)",
              cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <Sparkles size={20} />
              <span style={{ fontSize: 16, fontWeight: 700 }}>All Companies</span>
            </div>
            <span style={{ fontSize: 13, opacity: 0.8 }}>{total}+ companies hiring</span>
          </button>

          <button
            onClick={() => setLevel("Fresher")}
            style={{
              padding: "18px 20px", borderRadius: "var(--radius-xl)",
              background: level === "Fresher" ? "linear-gradient(135deg, #10b981, #059669)" : "var(--bg-card)",
              border: `2px solid ${level === "Fresher" ? "transparent" : "var(--border)"}`,
              color: level === "Fresher" ? "#fff" : "var(--text-primary)",
              cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <GraduationCap size={20} />
              <span style={{ fontSize: 16, fontWeight: 700 }}>Freshers & New Grads</span>
            </div>
            <span style={{ fontSize: 13, opacity: 0.8 }}>{fresherCount} companies · No experience needed</span>
          </button>

          <button
            onClick={() => setLevel("Experienced")}
            style={{
              padding: "18px 20px", borderRadius: "var(--radius-xl)",
              background: level === "Experienced" ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" : "var(--bg-card)",
              border: `2px solid ${level === "Experienced" ? "transparent" : "var(--border)"}`,
              color: level === "Experienced" ? "#fff" : "var(--text-primary)",
              cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <UserCheck size={20} />
              <span style={{ fontSize: 16, fontWeight: 700 }}>Experienced Professionals</span>
            </div>
            <span style={{ fontSize: 13, opacity: 0.8 }}>{experiencedCount} companies · 3+ years experience</span>
          </button>
        </div>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 16px",
          borderRadius: "var(--radius-lg)",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          marginBottom: 20,
          maxWidth: 480,
        }}>
          <Search size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input
            type="text"
            placeholder={level === "Fresher" ? "Search fresher-friendly companies..." : level === "Experienced" ? "Search companies..." : "Search all companies..."}
            value={inputValue}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (searchTimer.current) clearTimeout(searchTimer.current);
                setQuery(inputValue);
              }
            }}
            style={{
              flex: 1, border: "none", outline: "none",
              background: "transparent", color: "var(--text-primary)",
              fontSize: 14,
            }}
          />
          {inputValue && (
            <button onClick={clearSearch} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text-muted)", padding: 4,
            }}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Categories */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <button
            onClick={() => setSelectedCategory("")}
            style={{
              padding: "8px 16px", borderRadius: "var(--radius-lg)",
              background: !selectedCategory ? "var(--gradient)" : "var(--bg-card)",
              border: `1px solid ${!selectedCategory ? "transparent" : "var(--border)"}`,
              color: !selectedCategory ? "#fff" : "var(--text-secondary)",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            All ({total})
          </button>
          {currentCategories.map((cat) => {
            const count = allCompanies.filter((c) => {
              const matchCat = c.category === cat;
              const matchLevel = level === "All" || c.level === level || c.level === "Both";
              return matchCat && matchLevel;
            }).length;
            if (count === 0) return null;
            return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                  className="jobs-category-pill"
                  style={{
                    padding: "8px 16px", borderRadius: "var(--radius-lg)",
                    background: selectedCategory === cat ? "var(--gradient)" : "var(--bg-card)",
                    border: `1px solid ${selectedCategory === cat ? "transparent" : "var(--border)"}`,
                    color: selectedCategory === cat ? "#fff" : "var(--text-secondary)",
                    fontSize: 13, fontWeight: 500, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Saved Tab */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <button
            onClick={() => setSavedTab(false)}
            style={{
              padding: "8px 16px", borderRadius: "var(--radius-lg)",
              background: !savedTab ? `${"var(--accent)"}15` : "transparent",
              border: "none",
              color: !savedTab ? "var(--accent)" : "var(--text-muted)",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            {level === "Fresher" ? "Fresher Companies" : level === "Experienced" ? "Experienced Companies" : "All Companies"} ({total})
          </button>
          <button
            onClick={() => setSavedTab(true)}
            style={{
              padding: "8px 16px", borderRadius: "var(--radius-lg)",
              background: savedTab ? `${"var(--accent)"}15` : "transparent",
              border: "none",
              color: savedTab ? "var(--accent)" : "var(--text-muted)",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            Saved ({savedCompanies.length})
          </button>
        </div>

        {/* Results */}
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
            <Loader2 size={32} style={{ color: "var(--accent)", animation: "spin 1s linear infinite" }} />
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
            <Building2 size={48} style={{ margin: "0 auto 16px", opacity: 0.4 }} />
            <div style={{ fontSize: 18, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
              {savedTab ? "No saved companies" : "No companies found"}
            </div>
            <div style={{ fontSize: 14 }}>
              {savedTab ? "Bookmark companies to see them here" : "Try a different search term or category"}
            </div>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
            gap: 16,
          }}>
            {filteredCompanies.map((company) => (
              <div
                key={company.slug}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 24,
                  display: "flex", flexDirection: "column",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img
                      src={company.logo}
                      alt={company.name}
                      style={{
                        width: 48, height: 48, borderRadius: "var(--radius-md)",
                        objectFit: "contain", background: "var(--surface)",
                        padding: 4,
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="%231a1a2e"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="18" font-weight="600" fill="%239898b0">${company.name.charAt(0)}</text></svg>`)}`;
                      }}
                    />
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{company.name}</h3>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginTop: 4 }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600,
                          padding: "2px 8px", borderRadius: 6,
                          background: "rgba(59, 130, 246, 0.1)",
                          color: "var(--accent-blue)",
                        }}>{company.category}</span>
                        {company.level === "Fresher" && (
                          <span style={{
                            fontSize: 10, fontWeight: 600,
                            padding: "2px 8px", borderRadius: 6,
                            background: "rgba(16, 185, 129, 0.1)",
                            color: "var(--accent-green)",
                          }}>
                            <GraduationCap size={10} style={{ display: "inline", verticalAlign: "middle", marginRight: 3 }} />
                            Fresher
                          </span>
                        )}
                        {company.level === "Experienced" && (
                          <span style={{
                            fontSize: 10, fontWeight: 600,
                            padding: "2px 8px", borderRadius: 6,
                            background: "rgba(139, 92, 246, 0.1)",
                            color: "var(--accent-purple)",
                          }}>
                            <UserCheck size={10} style={{ display: "inline", verticalAlign: "middle", marginRight: 3 }} />
                            Senior
                          </span>
                        )}
                        {company.level === "Both" && (
                          <span style={{
                            fontSize: 10, fontWeight: 600,
                            padding: "2px 8px", borderRadius: 6,
                            background: "rgba(139, 94, 60, 0.1)",
                            color: "var(--accent-orange)",
                          }}>
                            All Levels
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSave(company.slug)}
                    className="jobs-bookmark-btn"
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: savedCompanies.includes(company.slug) ? "var(--accent)" : "var(--text-muted)",
                      padding: 4,
                    }}
                  >
                    {savedCompanies.includes(company.slug) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                  </button>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, marginBottom: 14 }}>
                  {company.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {company.tags.filter((t) => t !== "new-grad" && t !== "senior").slice(0, 4).map((tag) => (
                    <span key={tag} style={{
                      fontSize: 11, fontWeight: 500,
                      padding: "3px 8px", borderRadius: 6,
                      background: "var(--surface)",
                      color: "var(--text-muted)",
                    }}>{tag}</span>
                  ))}
                  {company.tags.filter((t) => t !== "new-grad" && t !== "senior").length > 4 && (
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>+{company.tags.filter((t) => t !== "new-grad" && t !== "senior").length - 4}</span>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8 }}>
                  <a
                    href={company.careers}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      padding: "10px 14px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                      fontSize: 13, fontWeight: 500,
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    Careers <ExternalLink size={13} />
                  </a>
                  <a
                    href={company.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      padding: "10px 14px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--gradient)",
                      color: "#fff",
                      fontSize: 13, fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    Apply Now <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 32 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: "10px 20px", borderRadius: "var(--radius-lg)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                fontSize: 14, fontWeight: 500,
                cursor: page === 1 ? "not-allowed" : "pointer",
                opacity: page === 1 ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              Previous
            </button>
            <span style={{ fontSize: 13, color: "var(--text-muted)", padding: "0 12px" }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: "10px 20px", borderRadius: "var(--radius-lg)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                fontSize: 14, fontWeight: 500,
                cursor: page === totalPages ? "not-allowed" : "pointer",
                opacity: page === totalPages ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
