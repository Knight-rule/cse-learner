"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";

export default function PremiumCourseCard({ slug, title, description, icon, color, lessonCount }: {
  slug: string; title: string; description: string; icon: string; color: string; lessonCount: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const colors = color.split(" ");

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "translateY(-8px)" : ""}`,
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease",
        transformStyle: "preserve-3d",
      }}
    >
      <Link
        href={"/courses/" + slug}
        style={{
          display: "flex", flexDirection: "column", height: "100%",
          textDecoration: "none", color: "inherit",
          background: "var(--bg-card)",
          border: "1px solid " + (isHovered ? colors[0] + "55" : "var(--border)"),
          borderRadius: "var(--radius-xl)",
          padding: 28,
          position: "relative",
          overflow: "hidden",
          boxShadow: isHovered
            ? `0 20px 60px ${colors[0]}15, 0 0 40px ${colors[0]}08`
            : "var(--shadow-card)",
        }}
      >
        {/* Gradient glow on hover */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${colors[0]}, ${colors[1] || colors[0]})`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s",
        }} />

        {/* Background glow */}
        <div style={{
          position: "absolute", top: "-50%", right: "-30%",
          width: "60%", height: "100%",
          background: `radial-gradient(circle, ${colors[0]}08 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s",
          pointerEvents: "none",
        }} />

        <div style={{
          width: 56, height: 56, borderRadius: "var(--radius-lg)",
          background: `linear-gradient(135deg, ${colors[0]}18, ${colors[1] || colors[0]}18)`,
          border: `1px solid ${colors[0]}22`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, marginBottom: 20,
          transform: "translateZ(20px)",
        }}>
          {icon}
        </div>

        <h3 style={{
          fontSize: 18, fontWeight: 700, color: "var(--text-primary)",
          marginBottom: 8, lineHeight: 1.3,
          transform: "translateZ(15px)",
        }}>{title}</h3>

        <p style={{
          fontSize: 14, color: "var(--text-secondary)",
          lineHeight: 1.6, flex: 1, marginBottom: 16,
          transform: "translateZ(10px)",
        }}>{description}</p>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          transform: "translateZ(5px)",
        }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
            <BookOpen size={14} /> {lessonCount} lessons
            {lessonCount >= 8 && (
              <span style={{
                fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5,
                padding: "2px 6px", borderRadius: 4,
                background: `${colors[0]}15`, color: colors[0],
                border: `1px solid ${colors[0]}22`,
              }}>Deep Dive</span>
            )}
            {lessonCount > 0 && lessonCount < 5 && (
              <span style={{
                fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5,
                padding: "2px 6px", borderRadius: 4,
                background: "rgba(16, 185, 129, 0.1)", color: "#10b981",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}>Quick Start</span>
            )}
          </span>
          <span style={{
            fontSize: 13, fontWeight: 600, color: colors[0],
            display: "flex", alignItems: "center", gap: 4,
            opacity: isHovered ? 1 : 0.7,
            transition: "opacity 0.3s",
          }}>
            Start <ChevronRight size={14} style={{ transform: isHovered ? "translateX(3px)" : "none", transition: "transform 0.3s" }} />
          </span>
        </div>
      </Link>
    </div>
  );
}
