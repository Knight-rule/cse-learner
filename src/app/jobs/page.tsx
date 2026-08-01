"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Loader2, Building2, Search, X, ExternalLink, Bookmark, BookmarkCheck, Briefcase, Sparkles } from "lucide-react";
import { Company, companies as allCompanies } from "@/lib/companies";

const popularCategories = [
  "FAANG+",
  "AI/ML",
  "Cloud & Infra",
  "DevTools",
  "Security",
  "SaaS",
  "Fintech",
  "India",
  "Europe",
  "Asia-Pacific",
  "Middle East",
  "Africa",
  "Latin America",
  "Startups",
  "Gaming",
  "Robotics",
];

export default function JobsPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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
      params.set("page", String(page));
      params.set("limit", "50");

      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCompanies(data.companies || []);
      setCategories(data.categories || []);
      setTotalPages(data.pagination?.totalPages || 1);
      if (data.pagination?.total) setTotal(data.pagination.total);
    } catch (err) {
      console.error("Failed to load companies:", err);
      setCompanies([]);
    }
    setLoading(false);
  }, [query, selectedCategory, page]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    try { setSavedCompanies(JSON.parse(localStorage.getItem("cse-saved-companies") || "[]")); } catch { setSavedCompanies([]); }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, selectedCategory]);

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

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ═══ Premium Hero ═══ */}
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
            <span>Companies & Careers</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <Briefcase size={24} style={{ color: "var(--accent-blue)" }} />
            <h1 style={{
              fontSize: "clamp(28px, 5vw, 36px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}>Companies & Careers</h1>
          </div>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 520 }}>
            Direct career page links — apply on the company site. {total}+ companies across every tech category.
          </p>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="container" style={{ padding: "32px 20px 80px" }}>
        {/* Search */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: 20,
          marginBottom: 20,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "12px 16px",
            borderRadius: "var(--radius-lg)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}>
            <Search size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search companies... (e.g. Google, AI, Fintech, India)"
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
                fontSize: 15,
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
          {popularCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
              style={{
                padding: "8px 16px", borderRadius: "var(--radius-lg)",
                background: selectedCategory === cat ? "var(--gradient)" : "var(--bg-card)",
                border: `1px solid ${selectedCategory === cat ? "transparent" : "var(--border)"}`,
                color: selectedCategory === cat ? "#fff" : "var(--text-secondary)",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tabs */}
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
            All Companies ({total})
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
              {savedTab ? "Bookmark companies to see them here" : "Try a different search term"}
            </div>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
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
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        padding: "2px 8px", borderRadius: 6,
                        background: "rgba(59, 130, 246, 0.1)",
                        color: "var(--accent-blue)",
                      }}>{company.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSave(company.slug)}
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
                  {company.tags.slice(0, 4).map((tag) => (
                    <span key={tag} style={{
                      fontSize: 11, fontWeight: 500,
                      padding: "3px 8px", borderRadius: 6,
                      background: "var(--surface)",
                      color: "var(--text-muted)",
                    }}>{tag}</span>
                  ))}
                  {company.tags.length > 4 && (
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>+{company.tags.length - 4}</span>
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
