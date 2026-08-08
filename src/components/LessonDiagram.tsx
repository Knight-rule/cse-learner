"use client";

const diagrams: Record<string, Record<string, React.ReactNode>> = {
  "data-structures": {
    "1": (
      <svg viewBox="0 0 600 280" style={{ width: "100%", height: "auto" }}>
        <defs>
          <linearGradient id="ds-g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect x="20" y="20" width="560" height="240" rx="16" fill="url(#ds-g1)" stroke="#f97316" strokeWidth="1" strokeOpacity="0.3" />
        <text x="300" y="55" textAnchor="middle" fill="#f97316" fontSize="15" fontWeight="700" fontFamily="system-ui">Data Structure Categories</text>
        <rect x="60" y="80" width="140" height="70" rx="10" fill="#3b82f620" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="130" y="110" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="600" fontFamily="system-ui">Linear</text>
        <text x="130" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">Array, List, Stack, Queue</text>
        <rect x="230" y="80" width="140" height="70" rx="10" fill="#10b98120" stroke="#10b981" strokeWidth="1.5" />
        <text x="300" y="110" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="600" fontFamily="system-ui">Non-Linear</text>
        <text x="300" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">Tree, Graph, Heap</text>
        <rect x="400" y="80" width="140" height="70" rx="10" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="470" y="110" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="600" fontFamily="system-ui">Hash-Based</text>
        <text x="470" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">Hash Table, Map</text>
        <rect x="60" y="175" width="480" height="60" rx="10" fill="#f59e0b15" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3" />
        <text x="300" y="200" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="600" fontFamily="system-ui">Abstract Data Types (ADT)</text>
        <text x="300" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">Define behavior (interface) — Implementation chooses the data structure</text>
        <line x1="130" y1="150" x2="300" y2="175" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
        <line x1="300" y1="150" x2="300" y2="175" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
        <line x1="470" y1="150" x2="300" y2="175" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
      </svg>
    ),
    "2": (
      <svg viewBox="0 0 600 200" style={{ width: "100%", height: "auto" }}>
        <defs>
          <linearGradient id="arr-g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <text x="300" y="25" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="700" fontFamily="system-ui">Array — Contiguous Memory</text>
        {[0,1,2,3,4,5,6,7].map(i => (
          <g key={i}>
            <rect x={60 + i * 65} y="50" width="58" height="50" rx="6" fill="url(#arr-g)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x={60 + i * 65 + 29} y="80" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="600" fontFamily="monospace">{[10,25,37,42,58,63,79,91][i]}</text>
            <text x={60 + i * 65 + 29} y="118" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">[{i}]</text>
          </g>
        ))}
        <text x="300" y="150" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui">Address: base + index × size → O(1) random access</text>
        <rect x="60" y="165" width="520" height="25" rx="4" fill="#3b82f610" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.3" />
        <text x="300" y="182" textAnchor="middle" fill="#3b82f6" fontSize="10" fontFamily="system-ui">Static: fixed size | Dynamic (vector): auto-resize with doubling strategy</text>
      </svg>
    ),
    "3": (
      <svg viewBox="0 0 600 220" style={{ width: "100%", height: "auto" }}>
        <text x="300" y="25" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="700" fontFamily="system-ui">Linked List — Nodes with Pointers</text>
        {[0,1,2,3].map(i => {
          const x = 40 + i * 140;
          const vals = ["10","25","37","∞"];
          return (
            <g key={i}>
              <rect x={x} y="50" width="120" height="55" rx="8" fill="#10b98118" stroke="#10b981" strokeWidth="1.5" />
              <line x1={x + 80} y1="50" x2={x + 80} y2="105" stroke="#10b981" strokeWidth="1" strokeOpacity="0.5" />
              <text x={x + 40} y="82" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="600" fontFamily="monospace">{vals[i]}</text>
              <text x={x + 100} y="82" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="system-ui">{i < 3 ? "→" : "null"}</text>
            </g>
          );
        })}
        {[0,1,2].map(i => (
          <line key={`arrow-${i}`} x1={40 + i * 140 + 120} y1="77" x2={40 + (i+1) * 140} y2="77" stroke="#10b981" strokeWidth="2" markerEnd="url(#ll-arrow)" />
        ))}
        <defs>
          <marker id="ll-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
          </marker>
        </defs>
        <text x="300" y="145" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui">Non-contiguous memory — each node stores data + next pointer</text>
        <rect x="40" y="160" width="240" height="45" rx="8" fill="#10b98110" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
        <text x="160" y="180" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600" fontFamily="system-ui">Singly Linked</text>
        <text x="160" y="195" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="system-ui">next → null at tail</text>
        <rect x="320" y="160" width="240" height="45" rx="8" fill="#f59e0b10" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />
        <text x="440" y="180" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600" fontFamily="system-ui">Doubly Linked</text>
        <text x="440" y="195" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="system-ui">prev ← node → next</text>
      </svg>
    ),
    "4": (
      <svg viewBox="0 0 600 260" style={{ width: "100%", height: "auto" }}>
        <text x="300" y="25" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="system-ui">Stack — LIFO (Last In, First Out)</text>
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x="200" y={50 + i * 45} width="200" height="40" rx="6" fill={i === 3 ? "#f59e0b25" : "#f59e0b12"} stroke="#f59e0b" strokeWidth={i === 3 ? 2 : 1} />
            <text x="300" y={76 + i * 45} textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600" fontFamily="monospace">{["push(40)","push(25)","push(10)","push(37)"][i]}</text>
          </g>
        ))}
        <text x="440" y="76" fill="#f59e0b" fontSize="12" fontWeight="600" fontFamily="system-ui">← top</text>
        <text x="440" y="216" fill="#94a3b8" fontSize="11" fontFamily="system-ui">← bottom</text>
        <rect x="40" y="50" width="130" height="180" rx="10" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.4" />
        <text x="105" y="95" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600" fontFamily="system-ui">Operations</text>
        <text x="105" y="118" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">push — O(1)</text>
        <text x="105" y="138" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">pop — O(1)</text>
        <text x="105" y="158" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">peek — O(1)</text>
        <text x="105" y="178" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">search — O(n)</text>
        <rect x="430" y="50" width="130" height="80" rx="10" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.4" />
        <text x="495" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="600" fontFamily="system-ui">Use Cases</text>
        <text x="495" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">Call stack</text>
        <text x="495" y="112" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">Undo/Redo</text>
      </svg>
    ),
    "5": (
      <svg viewBox="0 0 600 220" style={{ width: "100%", height: "auto" }}>
        <text x="300" y="25" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="700" fontFamily="system-ui">Queue — FIFO (First In, First Out)</text>
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x={100 + i * 105} y="55" width="95" height="50" rx="6" fill={i === 0 ? "#8b5cf625" : "#8b5cf612"} stroke="#8b5cf6" strokeWidth={i === 0 ? 2 : 1} />
            <text x={100 + i * 105 + 47} y="86" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600" fontFamily="monospace">{["A","B","C","D"][i]}</text>
          </g>
        ))}
        <text x="70" y="85" textAnchor="end" fill="#10b981" fontSize="11" fontWeight="600" fontFamily="system-ui">dequeue ←</text>
        <text x="535" y="85" fill="#f97316" fontSize="11" fontWeight="600" fontFamily="system-ui">← enqueue</text>
        <line x1="100" y1="130" x2="520" y2="130" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
        <text x="310" y="148" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">Time: enqueue O(1) | dequeue O(1) | peek O(1)</text>
        <rect x="40" y="165" width="160" height="40" rx="8" fill="#10b98110" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
        <text x="120" y="190" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600" fontFamily="system-ui">Simple Queue</text>
        <rect x="220" y="165" width="160" height="40" rx="8" fill="#f59e0b10" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />
        <text x="300" y="190" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600" fontFamily="system-ui">Priority Queue</text>
        <rect x="400" y="165" width="160" height="40" rx="8" fill="#3b82f610" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" />
        <text x="480" y="190" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="600" fontFamily="system-ui">Deque (Double-Ended)</text>
      </svg>
    ),
    "6": (
      <svg viewBox="0 0 600 280" style={{ width: "100%", height: "auto" }}>
        <text x="300" y="25" textAnchor="middle" fill="#ec4899" fontSize="14" fontWeight="700" fontFamily="system-ui">Binary Search Tree (BST)</text>
        {[{x:300,y:60,v:"50",c:"#ec4899"},{x:170,y:130,v:"30",c:"#3b82f6"},{x:430,y:130,v:"70",c:"#3b82f6"},{x:100,y:200,v:"20",c:"#10b981"},{x:240,y:200,v:"40",c:"#10b981"},{x:360,y:200,v:"60",c:"#10b981"},{x:500,y:200,v:"80",c:"#10b981"}].map((n,i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="22" fill={n.c + "20"} stroke={n.c} strokeWidth="1.5" />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600" fontFamily="monospace">{n.v}</text>
          </g>
        ))}
        <line x1="285" y1="78" x2="185" y2="112" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="315" y1="78" x2="415" y2="112" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="155" y1="148" x2="115" y2="182" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="185" y1="148" x2="225" y2="182" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="415" y1="148" x2="375" y2="182" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="445" y1="148" x2="485" y2="182" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="300" y="250" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui">BST Property: left &lt; root &lt; right — enables O(log n) search</text>
        <text x="300" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui">Balanced BST (AVL, Red-Black) guarantees O(log n) worst case</text>
      </svg>
    ),
    "7": (
      <svg viewBox="0 0 600 280" style={{ width: "100%", height: "auto" }}>
        <text x="300" y="25" textAnchor="middle" fill="#f97316" fontSize="14" fontWeight="700" fontFamily="system-ui">Max-Heap — Parent ≥ Children</text>
        {[{x:300,y:65,v:"90"},{x:170,y:135,v:"75"},{x:430,y:135,v:"80"},{x:100,y:210,v:"50"},{x:240,y:210,v:"65"},{x:360,y:210,v:"70"},{x:500,y:210,v:"55"}].map((n,i) => (
          <g key={i}>
            <rect x={n.x - 22} y={n.y - 18} width="44" height="36" rx="8" fill={i === 0 ? "#f9731625" : "#f9731612"} stroke="#f97316" strokeWidth={i === 0 ? 2 : 1} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600" fontFamily="monospace">{n.v}</text>
          </g>
        ))}
        <line x1="285" y1="83" x2="185" y2="117" stroke="#f97316" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="315" y1="83" x2="415" y2="117" stroke="#f97316" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="155" y1="153" x2="115" y2="192" stroke="#f97316" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="185" y1="153" x2="225" y2="192" stroke="#f97316" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="415" y1="153" x2="375" y2="192" stroke="#f97316" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="445" y1="153" x2="485" y2="192" stroke="#f97316" strokeWidth="1" strokeOpacity="0.5" />
        <rect x="40" y="248" width="200" height="22" rx="4" fill="#10b98110" stroke="#10b981" strokeWidth="0.5" />
        <text x="140" y="263" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="system-ui">Min-Heap: parent ≤ children</text>
        <rect x="360" y="248" width="200" height="22" rx="4" fill="#3b82f610" stroke="#3b82f6" strokeWidth="0.5" />
        <text x="460" y="263" textAnchor="middle" fill="#3b82f6" fontSize="10" fontFamily="system-ui">Array: parent=i, children=2i+1, 2i+2</text>
      </svg>
    ),
    "8": (
      <svg viewBox="0 0 600 260" style={{ width: "100%", height: "auto" }}>
        <text x="300" y="25" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="700" fontFamily="system-ui">Graph — Vertices + Edges</text>
        {[{x:300,y:70,l:"A"},{x:150,y:140,l:"B"},{x:450,y:140,l:"C"},{x:150,y:230,l:"D"},{x:450,y:230,l:"E"}].map((n,i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="24" fill="#06b6d420" stroke="#06b6d4" strokeWidth="1.5" />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill="#e2e8f0" fontSize="15" fontWeight="700" fontFamily="system-ui">{n.l}</text>
          </g>
        ))}
        <line x1="280" y1="85" x2="170" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="320" y1="85" x2="430" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="150" y1="164" x2="150" y2="206" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="450" y1="164" x2="450" y2="206" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="170" y1="155" x2="430" y2="215" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 3" />
        <text x="300" y="195" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="system-ui">weighted edge</text>
        <rect x="40" y="245" width="520" height="18" rx="3" fill="#06b6d410" />
        <text x="300" y="258" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="system-ui">Directed: A→B | Undirected: A—B | Weighted: edge has cost</text>
      </svg>
    ),
    "9": (
      <svg viewBox="0 0 600 240" style={{ width: "100%", height: "auto" }}>
        <text x="300" y="25" textAnchor="middle" fill="#14b8a6" fontSize="14" fontWeight="700" fontFamily="system-ui">Hash Table — Key → Hash → Index → Bucket</text>
        <text x="80" y="65" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui">Key</text>
        <text x="80" y="85" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600" fontFamily="monospace">"name"</text>
        <path d="M 110 75 L 160 75" stroke="#14b8a6" strokeWidth="1.5" markerEnd="url(#ht-arrow)" />
        <rect x="165" y="55" width="80" height="40" rx="6" fill="#14b8a618" stroke="#14b8a6" strokeWidth="1" />
        <text x="205" y="72" textAnchor="middle" fill="#14b8a6" fontSize="9" fontFamily="system-ui">hash()</text>
        <text x="205" y="88" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">→ 7</text>
        <path d="M 250 75 L 300 75" stroke="#14b8a6" strokeWidth="1.5" markerEnd="url(#ht-arrow)" />
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <g key={i}>
            <rect x={305} y={45 + i * 21} width="50" height="18" rx="3" fill={i === 7 ? "#14b8a625" : "#14b8a608"} stroke="#14b8a6" strokeWidth={i === 7 ? 1.5 : 0.5} />
            <text x={330} y={58 + i * 21} textAnchor="middle" fill={i === 7 ? "#14b8a6" : "#64748b"} fontSize="9" fontFamily="monospace">[{i}]</text>
          </g>
        ))}
        <rect x={355 + 5} y={45 + 7 * 21} width="120" height="18" rx="3" fill="#14b8a618" stroke="#14b8a6" strokeWidth="1" />
        <text x={355 + 65} y={58 + 7 * 21} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">"Alice" → 32</text>
        <defs>
          <marker id="ht-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#14b8a6" />
          </marker>
        </defs>
        <rect x="40" y="215" width="520" height="18" rx="3" fill="#14b8a610" />
        <text x="300" y="228" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="system-ui">Collision: chaining (linked list per bucket) or open addressing (probing)</text>
      </svg>
    ),
    "10": (
      <svg viewBox="0 0 600 200" style={{ width: "100%", height: "auto" }}>
        <text x="300" y="25" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="700" fontFamily="system-ui">Pattern Matching — KMP Algorithm</text>
        <text x="60" y="65" fill="#94a3b8" fontSize="12" fontFamily="system-ui">Text:</text>
        {["A","B","A","B","C","A","B","C","A","B"].map((c,i) => (
          <g key={`t${i}`}>
            <rect x={100 + i * 48} y="50" width="44" height="30" rx="4" fill="#f43f5e12" stroke="#f43f5e" strokeWidth="1" />
            <text x={100 + i * 48 + 22} y="71" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600" fontFamily="monospace">{c}</text>
          </g>
        ))}
        <text x="60" y="115" fill="#94a3b8" fontSize="12" fontFamily="system-ui">Pattern:</text>
        {["A","B","C","A"].map((c,i) => (
          <g key={`p${i}`}>
            <rect x={100 + i * 48} y="100" width="44" height="30" rx="4" fill={i === 0 || i === 3 ? "#3b82f625" : "#3b82f612"} stroke="#3b82f6" strokeWidth={i === 0 || i === 3 ? 1.5 : 1} />
            <text x={100 + i * 48 + 22} y="121" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600" fontFamily="monospace">{c}</text>
          </g>
        ))}
        <text x="300" y="160" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui">Naive: O(n×m) | KMP: O(n+m) using failure function to skip comparisons</text>
        <rect x="40" y="172" width="240" height="18" rx="3" fill="#3b82f610" />
        <text x="160" y="185" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="system-ui">Boyer-Moore: scans right-to-left, faster in practice</text>
        <rect x="320" y="172" width="240" height="18" rx="3" fill="#10b98110" />
        <text x="440" y="185" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="system-ui">Rabin-Karp: rolling hash for multiple patterns</text>
      </svg>
    ),
  },
};

interface LessonDiagramProps {
  courseSlug: string;
  lessonId: string;
}

export default function LessonDiagram({ courseSlug, lessonId }: LessonDiagramProps) {
  const courseDiagrams = diagrams[courseSlug];
  if (!courseDiagrams) return null;
  const diagram = courseDiagrams[lessonId];
  if (!diagram) return null;

  return (
    <div style={{
      background: "var(--bg-card, #1e1e2e)",
      border: "1px solid var(--border, #333)",
      borderRadius: "var(--radius-xl, 16px)",
      padding: "20px 24px",
      marginBottom: 24,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary, #94a3b8)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Concept Diagram
      </div>
      {diagram}
    </div>
  );
}
