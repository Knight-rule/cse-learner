"use client";

import { useEffect, useRef } from "react";

export default function FloatingCodeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let animId: number;
    let t = 0;
    const nodes = el.querySelectorAll(".float-node");

    const animate = () => {
      t += 0.008;
      nodes.forEach((node, i) => {
        const phase = i * 1.2;
        const x = Math.sin(t + phase) * 12;
        const y = Math.cos(t * 0.7 + phase) * 8;
        const r = Math.sin(t * 0.5 + phase) * 3;
        (node as HTMLElement).style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
      });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={containerRef} className="hero-3d-visual" style={{
      width: "100%", maxWidth: 520, aspectRatio: "1",
      position: "relative", perspective: "1200px",
    }}>
      {/* Central glow */}
      <div style={{
        position: "absolute", inset: "15%",
        background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)",
        borderRadius: "50%", filter: "blur(40px)",
      }} />

      {/* Grid lines */}
      <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }}>
        {[...Array(9)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 40} x2="400" y2={(i + 1) * 40} stroke="white" strokeWidth="0.5" />
        ))}
        {[...Array(9)].map((_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 40} y1="0" x2={(i + 1) * 40} y2="400" stroke="white" strokeWidth="0.5" />
        ))}
      </svg>

      {/* Floating nodes - data structures concept */}
      {[
        { x: "50%", y: "18%", size: 56, color: "#f97316", label: "DS", delay: 0 },
        { x: "22%", y: "42%", size: 48, color: "#a855f7", label: "Algo", delay: 0.3 },
        { x: "78%", y: "42%", size: 48, color: "#3b82f6", label: "OS", delay: 0.6 },
        { x: "30%", y: "70%", size: 44, color: "#10b981", label: "DB", delay: 0.9 },
        { x: "70%", y: "70%", size: 44, color: "#ec4899", label: "Net", delay: 1.2 },
        { x: "50%", y: "50%", size: 64, color: "#f97316", label: "CSE", delay: 0.15 },
      ].map((node, i) => (
        <div
          key={i}
          className="float-node"
          style={{
            position: "absolute",
            left: node.x, top: node.y,
            width: node.size, height: node.size,
            transform: "translate(-50%, -50%)",
            borderRadius: "var(--radius-lg)",
            background: `linear-gradient(135deg, ${node.color}22, ${node.color}44)`,
            border: `1.5px solid ${node.color}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: node.size > 50 ? 14 : 11,
            fontWeight: 700, color: node.color,
            boxShadow: `0 0 30px ${node.color}15, inset 0 1px 0 ${node.color}22`,
            backdropFilter: "blur(8px)",
            zIndex: i === 5 ? 3 : 2,
          }}
        >
          {node.label}
        </div>
      ))}

      {/* Connecting lines */}
      <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}>
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* DS → Algo */}
        <line x1="200" y1="72" x2="88" y2="168" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
        {/* DS → OS */}
        <line x1="200" y1="72" x2="312" y2="168" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
        {/* Algo → DB */}
        <line x1="88" y1="168" x2="120" y2="280" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
        {/* OS → Net */}
        <line x1="312" y1="168" x2="280" y2="280" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
        {/* DS → CSE (center) */}
        <line x1="200" y1="72" x2="200" y2="200" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
        {/* CSE → DB */}
        <line x1="200" y1="200" x2="120" y2="280" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
        {/* CSE → Net */}
        <line x1="200" y1="200" x2="280" y2="280" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Orbital ring */}
      <div style={{
        position: "absolute", inset: "8%",
        border: "1px solid rgba(249,115,22,0.08)",
        borderRadius: "50%",
        animation: "spin 30s linear infinite",
      }} />
      <div style={{
        position: "absolute", inset: "20%",
        border: "1px solid rgba(168,85,247,0.06)",
        borderRadius: "50%",
        animation: "spin 20s linear infinite reverse",
      }} />
    </div>
  );
}
