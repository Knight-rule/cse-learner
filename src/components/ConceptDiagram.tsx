"use client";

import { useState } from "react";

interface ConceptNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  icon?: string;
}

interface ConceptEdge {
  from: string;
  to: string;
  label?: string;
}

export default function ConceptDiagram({ title, nodes, edges, description }: {
  title: string;
  nodes: ConceptNode[];
  edges: ConceptEdge[];
  description?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div className="concept-diagram" style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-xl)",
      padding: 24,
      margin: "24px 0",
    }}>
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{title}</h4>
        {description && <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6 }}>{description}</p>}
      </div>

      <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", borderRadius: "var(--radius-lg)", background: "rgba(0,0,0,0.2)" }}>
        {/* Grid background */}
        <svg viewBox="0 0 800 500" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}>
          {[...Array(20)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 25} x2="800" y2={i * 25} stroke="white" strokeWidth="0.5" />
          ))}
          {[...Array(32)].map((_, i) => (
            <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="500" stroke="white" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Edges */}
        <svg viewBox="0 0 800 500" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.3)" />
            </marker>
          </defs>
          {edges.map((edge, i) => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) return null;
            const isHighlighted = hovered === edge.from || hovered === edge.to;
            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={isHighlighted ? "rgba(249,115,22,0.6)" : "rgba(255,255,255,0.15)"}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeDasharray={isHighlighted ? "none" : "6 4"}
                  markerEnd="url(#arrow)"
                  style={{ transition: "all 0.3s" }}
                />
                {edge.label && (
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 8}
                    fill="rgba(255,255,255,0.4)"
                    fontSize="11"
                    textAnchor="middle"
                    fontFamily="system-ui"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isHovered = hovered === node.id;
          return (
            <div
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                left: `${(node.x / 800) * 100}%`,
                top: `${(node.y / 500) * 100}%`,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1})`,
                width: 64, height: 64,
                borderRadius: "var(--radius-lg)",
                background: `linear-gradient(135deg, ${node.color}22, ${node.color}44)`,
                border: `2px solid ${isHovered ? node.color : node.color + "55"}`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                boxShadow: isHovered ? `0 0 30px ${node.color}33` : `0 4px 20px rgba(0,0,0,0.3)`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: isHovered ? 10 : 2,
              }}
            >
              {node.icon && <span style={{ fontSize: 18 }}>{node.icon}</span>}
              <span style={{ fontSize: 10, fontWeight: 700, color: node.color, marginTop: node.icon ? 2 : 0 }}>{node.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
