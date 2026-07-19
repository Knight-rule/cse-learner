import { cLanguageQuestions } from "./questions/c-all";
import { cppQuestions } from "./questions/cpp-all";

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  language?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: "easy" | "medium" | "hard";
  chapter?: string;
}

export interface Course {
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  tags?: string[];
  notesUrl?: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export const courses: Course[] = [
  {
    slug: "data-structures",
    title: "Data Structures",
    description: "Master arrays, linked lists, trees, graphs, hash tables and more.",
    icon: "🌳",
    notesUrl: "https://noteslink.in/product/ds-data-structure-kiit/",
    color: "from-emerald-500 to-teal-600",
    lessons: [
      {
        id: "1",
        title: "Arrays & Strings",
        content: "Arrays are the most fundamental data structure. They store elements in contiguous memory locations, providing O(1) random access. Strings in most languages are immutable arrays of characters.\n\nKey operations:\n- Access: O(1)\n- Search: O(n)\n- Insert/Delete at end: O(1) amortized\n- Insert/Delete at index: O(n)\n\nCommon patterns: Two pointers, sliding window, prefix sums.",
        codeExample: `// Two Sum using hash map - O(n)\nfunction twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement)!, i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Linked Lists",
        content: "A linked list is a linear data structure where elements are stored in nodes. Each node contains a data field and a reference (link) to the next node.\n\nTypes:\n- Singly Linked List\n- Doubly Linked List\n- Circular Linked List\n\nAdvantages over arrays:\n- Dynamic size\n- Efficient insertion/deletion at any position: O(1)\n\nDisadvantages:\n- No random access: O(n)\n- Extra memory for pointers",
        codeExample: `class ListNode<T> {\n  constructor(\n    public val: T,\n    public next: ListNode<T> | null = null\n  ) {}\n}\n\n// Reverse a linked list\nfunction reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {\n  let prev: ListNode<T> | null = null;\n  let current = head;\n  while (current) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n  return prev;\n}`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Stacks & Queues",
        content: "Stack (LIFO - Last In First Out):\n- push: O(1)\n- pop: O(1)\n- peek: O(1)\n\nQueue (FIFO - First In First Out):\n- enqueue: O(1)\n- dequeue: O(1)\n- peek: O(1)\n\nApplications:\n- Stack: function calls, undo operations, expression evaluation, bracket matching\n- Queue: BFS, task scheduling, print queue, buffer",
        codeExample: `// Valid Parentheses\nfunction isValid(s: string): boolean {\n  const stack: string[] = [];\n  const map: Record<string, string> = {\n    ')': '(', ']': '[', '}': '{'\n  };\n  for (const char of s) {\n    if (char in map) {\n      if (stack.pop() !== map[char]) return false;\n    } else {\n      stack.push(char);\n    }\n  }\n  return stack.length === 0;\n}`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Trees & BST",
        content: "A tree is a hierarchical data structure with a root node and child nodes.\n\nBinary Search Tree (BST):\n- Left child < Parent < Right child\n- Search: O(log n) average, O(n) worst\n- Insert: O(log n) average\n- Delete: O(log n) average\n\nTraversals:\n- Inorder (Left, Root, Right) - gives sorted order\n- Preorder (Root, Left, Right) - used for copying\n- Postorder (Left, Right, Root) - used for deletion\n- Level-order (BFS) - level by level",
        codeExample: `class TreeNode {\n  constructor(\n    public val: number,\n    public left: TreeNode | null = null,\n    public right: TreeNode | null = null\n  ) {}\n}\n\n// Insert into BST\nfunction insertBST(root: TreeNode | null, val: number): TreeNode {\n  if (!root) return new TreeNode(val);\n  if (val < root.val) {\n    root.left = insertBST(root.left, val);\n  } else {\n    root.right = insertBST(root.right, val);\n  }\n  return root;\n}\n\n// Inorder traversal\nfunction inorder(root: TreeNode | null): number[] {\n  if (!root) return [];\n  return [...inorder(root.left), root.val, ...inorder(root.right)];\n}`,
        language: "typescript"
      },
      {
        id: "5",
        title: "Graphs",
        content: "A graph is a collection of vertices (nodes) and edges connecting them.\n\nRepresentations:\n- Adjacency Matrix: O(V^2) space\n- Adjacency List: O(V + E) space\n\nKey algorithms:\n- BFS: Level-by-level traversal, shortest path in unweighted graphs\n- DFS: Deep traversal, cycle detection, topological sort\n- Dijkstra: Shortest path in weighted graphs\n- Union-Find: Connected components",
        codeExample: `// BFS - Shortest path in unweighted graph\nfunction bfs(graph: number[][], start: number): number[] {\n  const visited = new Set<number>();\n  const queue = [start];\n  visited.add(start);\n  const result: number[] = [];\n\n  while (queue.length > 0) {\n    const node = queue.shift()!;\n    result.push(node);\n    for (const neighbor of graph[node]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  return result;\n}`,
        language: "typescript"
      },
      {
        id: "6",
        title: "Hash Tables",
        content: "A hash table maps keys to values using a hash function.\n\nTime Complexity (average):\n- Insert: O(1)\n- Delete: O(1)\n- Search: O(1)\n\nCollision handling:\n- Chaining: Each bucket stores a linked list\n- Open Addressing: Find next empty slot\n\nLoad factor = n / m (elements / buckets)\nWhen load factor exceeds threshold, resize and rehash.",
        codeExample: `// Hash Map implementation\nclass HashMap<K, V> {\n  private buckets: [K, V][][];\n  private size = 0;\n\n  constructor(private capacity = 16) {\n    this.buckets = Array.from({ length: capacity }, () => []);\n  }\n\n  private hash(key: K): number {\n    const str = String(key);\n    let hash = 0;\n    for (let i = 0; i < str.length; i++) {\n      hash = (hash * 31 + str.charCodeAt(i)) % this.capacity;\n    }\n    return hash;\n  }\n\n  set(key: K, value: V): void {\n    const idx = this.hash(key);\n    const bucket = this.buckets[idx];\n    const existing = bucket.find(([k]) => k === key);\n    if (existing) existing[1] = value;\n    else bucket.push([key, value]);\n    this.size++;\n  }\n\n  get(key: K): V | undefined {\n    const idx = this.hash(key);\n    const found = this.buckets[idx].find(([k]) => k === key);\n    return found?.[1];\n  }\n}`,
        language: "typescript"
      }
    ],
    quiz: [
      {
        id: "ds1",
        question: "What is the time complexity of accessing an element in an array by index?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        correctIndex: 2,
        explanation: "Arrays provide constant-time O(1) random access because elements are stored in contiguous memory locations."
      },
      {
        id: "ds2",
        question: "Which data structure uses LIFO (Last In, First Out) principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correctIndex: 1,
        explanation: "A stack follows the LIFO principle where the last element pushed is the first one to be popped."
      },
      {
        id: "ds3",
        question: "What is the worst-case time complexity of search in a Binary Search Tree?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctIndex: 2,
        explanation: "A degenerate (skewed) BST becomes essentially a linked list, giving O(n) worst-case search."
      },
      {
        id: "ds4",
        question: "Which traversal of a BST gives elements in sorted order?",
        options: ["Preorder", "Postorder", "Inorder", "Level-order"],
        correctIndex: 2,
        explanation: "Inorder traversal (Left, Root, Right) visits BST nodes in ascending sorted order."
      }
    ]
  },
  {
    slug: "algorithms",
    title: "Algorithms",
    description: "Learn sorting, searching, dynamic programming, and greedy algorithms.",
    icon: "⚡",
    notesUrl: "https://noteslink.in/product/daa-design-and-analysis-of-algorithm-kiit/",
    color: "from-amber-500 to-orange-600",
    lessons: [
      {
        id: "1",
        title: "Sorting Algorithms",
        content: "Sorting is fundamental to computer science.\n\nComparison-based sorts (O(n log n) lower bound):\n- Quick Sort: O(n log n) avg, O(n²) worst\n- Merge Sort: O(n log n) guaranteed\n- Heap Sort: O(n log n) guaranteed\n\nNon-comparison sorts (can beat O(n log n)):\n- Counting Sort: O(n + k)\n- Radix Sort: O(d × (n + k))\n- Bucket Sort: O(n + k) average",
        codeExample: `// Quick Sort\nfunction quickSort(arr: number[]): number[] {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[Math.floor(arr.length / 2)];\n  const left = arr.filter(x => x < pivot);\n  const mid = arr.filter(x => x === pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), ...mid, ...quickSort(right)];\n}\n\n// Merge Sort\nfunction mergeSort(arr: number[]): number[] {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(l: number[], r: number[]): number[] {\n  const result: number[] = [];\n  let i = 0, j = 0;\n  while (i < l.length && j < r.length) {\n    result.push(l[i] <= r[j] ? l[i++] : r[j++]);\n  }\n  return result.concat(l.slice(i), r.slice(j));\n}`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Binary Search",
        content: "Binary search finds an element in a sorted array in O(log n) time.\n\nKey idea: eliminate half the search space at each step.\n\nVariants:\n- Standard: find exact match\n- Lower bound: find first position >= target\n- Upper bound: find first position > target\n- Search in rotated sorted array",
        codeExample: `// Standard Binary Search\nfunction binarySearch(arr: number[], target: number): number {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = left + Math.floor((right - left) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\n\n// Lower Bound\nfunction lowerBound(arr: number[], target: number): number {\n  let left = 0, right = arr.length;\n  while (left < right) {\n    const mid = left + Math.floor((right - left) / 2);\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid;\n  }\n  return left;\n}`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Dynamic Programming",
        content: "DP solves complex problems by breaking them into overlapping subproblems.\n\nTwo approaches:\n1. Top-down (Memoization): Recursion + cache\n2. Bottom-up (Tabulation): Iterative + table\n\nWhen to use DP:\n- Optimal substructure\n- Overlapping subproblems\n\nClassic problems:\n- Fibonacci, Coin Change, Longest Common Subsequence, Knapsack",
        codeExample: `// Fibonacci - DP\nfunction fib(n: number): number {\n  if (n <= 1) return n;\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}\n\n// 0/1 Knapsack\nfunction knapsack(weights: number[], values: number[], capacity: number): number {\n  const n = weights.length;\n  const dp = Array.from({ length: n + 1 }, () =>\n    Array(capacity + 1).fill(0)\n  );\n  for (let i = 1; i <= n; i++) {\n    for (let w = 0; w <= capacity; w++) {\n      dp[i][w] = dp[i - 1][w];\n      if (weights[i - 1] <= w) {\n        dp[i][w] = Math.max(\n          dp[i][w],\n          dp[i - 1][w - weights[i - 1]] + values[i - 1]\n        );\n      }\n    }\n  }\n  return dp[n][capacity];\n}`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Greedy Algorithms",
        content: "Greedy algorithms make locally optimal choices at each step.\n\nWhen greedy works:\n- Greedy choice property: local optimum leads to global optimum\n- Optimal substructure\n\nClassic problems:\n- Activity Selection\n- Fractional Knapsack\n- Huffman Coding\n- Minimum Spanning Tree (Prim's, Kruskal's)\n\nWhen greedy fails: 0/1 Knapsack, Longest Path",
        codeExample: `// Activity Selection\nfunction activitySelection(\n  start: number[], end: number[]\n): number {\n  const activities = start\n    .map((s, i) => ({ start: s, end: end[i] }))\n    .sort((a, b) => a.end - b.end);\n\n  let count = 1;\n  let lastEnd = activities[0].end;\n\n  for (let i = 1; i < activities.length; i++) {\n    if (activities[i].start >= lastEnd) {\n      count++;\n      lastEnd = activities[i].end;\n    }\n  }\n  return count;\n}`,
        language: "typescript"
      }
    ],
    quiz: [
      {
        id: "algo1",
        question: "What is the average time complexity of Quick Sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctIndex: 1,
        explanation: "Quick Sort has O(n log n) average time complexity due to its divide-and-conquer approach."
      },
      {
        id: "algo2",
        question: "Binary search requires the array to be:",
        options: ["Unsorted", "Sorted", "Reversed", "Any order"],
        correctIndex: 1,
        explanation: "Binary search works by eliminating half the search space, which requires the array to be sorted."
      },
      {
        id: "algo3",
        question: "Which paradigm does Dynamic Programming use?",
        options: ["Divide and Conquer", "Greedy", "Store solutions to subproblems", "Backtracking"],
        correctIndex: 2,
        explanation: "DP stores solutions to overlapping subproblems to avoid recomputation."
      }
    ]
  },
  {
    slug: "operating-systems",
    title: "Operating Systems",
    description: "Understand processes, threads, memory management, and file systems.",
    icon: "🖥️",
    notesUrl: "https://noteslink.in/product/os-notes/",
    color: "from-violet-500 to-purple-600",
    lessons: [
      {
        id: "1",
        title: "Processes & Threads",
        content: "Process: A program in execution with its own memory space.\nThread: A lightweight process sharing the same memory space.\n\nProcess states: New → Ready → Running → Waiting → Terminated\n\nContext switching: Saving and restoring the state of a process.\n\nProcess vs Thread:\n- Process isolation: separate address space\n- Thread: shared memory, cheaper to create/switch\n- Communication: IPC (pipes, shared memory, sockets) vs shared memory",
        codeExample: `// Process creation example in C\n#include <stdio.h>\n#include <unistd.h>\n\nint main() {\n  pid_t pid = fork();\n  if (pid == 0) {\n    printf("Child process\\n");\n  } else if (pid > 0) {\n    printf("Parent process, child PID: %d\\n", pid);\n    wait(NULL);\n  } else {\n    perror("fork failed");\n  }\n  return 0;\n}`,
        language: "c"
      },
      {
        id: "2",
        title: "CPU Scheduling",
        content: "Scheduling algorithms determine which process runs next.\n\nNon-preemptive:\n- FCFS: First Come First Served\n- SJF: Shortest Job First\n\nPreemptive:\n- SRTF: Shortest Remaining Time First\n- Round Robin: Time quantum based\n- Priority Scheduling\n\nMetrics:\n- Turnaround Time = Completion - Arrival\n- Waiting Time = Turnaround - Burst Time\n- Response Time = First Run - Arrival",
        codeExample: `// Round Robin Scheduling\nfunction roundRobin(\n  processes: { name: string; burst: number }[],\n  quantum: number\n): { name: string; completion: number }[] {\n  const remaining = processes.map(p => p.burst);\n  const completion = Array(processes.length).fill(0);\n  let time = 0;\n  let done = false;\n\n  while (!done) {\n    done = true;\n    for (let i = 0; i < processes.length; i++) {\n      if (remaining[i] > 0) {\n        done = false;\n        const exec = Math.min(quantum, remaining[i]);\n        time += exec;\n        remaining[i] -= exec;\n        if (remaining[i] === 0) {\n          completion[i] = time;\n        }\n      }\n    }\n  }\n  return processes.map((p, i) => ({\n    name: p.name,\n    completion: completion[i]\n  }));\n}`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Memory Management",
        content: "Virtual memory maps logical addresses to physical addresses.\n\nPaging:\n- Fixed-size blocks (pages)\n- Page table maps virtual → physical\n- TLB caches recent translations\n\nSegmentation:\n- Variable-size segments based on logical divisions\n\nPage replacement algorithms:\n- FIFO: Replace oldest page\n- LRU: Replace least recently used\n- Optimal: Replace page not used for longest time (theoretical)",
        codeExample: `// LRU Cache implementation\nclass LRUCache {\n  private cache: Map<number, number>;\n  private capacity: number;\n\n  constructor(capacity: number) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n\n  get(key: number): number {\n    if (!this.cache.has(key)) return -1;\n    const value = this.cache.get(key)!;\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n\n  put(key: number, value: number): void {\n    if (this.cache.has(key)) this.cache.delete(key);\n    this.cache.set(key, value);\n    if (this.cache.size > this.capacity) {\n      const firstKey = this.cache.keys().next().value!;\n      this.cache.delete(firstKey);\n    }\n  }\n}`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Deadlocks",
        content: "Deadlock: A situation where processes are permanently blocked.\n\nFour conditions (Coffman conditions):\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\n\nDeadlock handling:\n- Prevention: Break one of the four conditions\n- Avoidance: Banker's algorithm\n- Detection: Wait-for graph, resource allocation graph\n- Recovery: Kill processes, preempt resources",
        codeExample: `// Banker's Algorithm (simplified)\nfunction isSafe(\n  available: number[],\n  max: number[][],\n  allocation: number[][],\n  need: number[][],\n  n: number, m: number\n): boolean {\n  const work = [...available];\n  const finish = Array(n).fill(false);\n\n  for (let k = 0; k < n; k++) {\n    for (let i = 0; i < n; i++) {\n      if (!finish[i]) {\n        let canAllocate = true;\n        for (let j = 0; j < m; j++) {\n          if (need[i][j] > work[j]) {\n            canAllocate = false;\n            break;\n          }\n        }\n        if (canAllocate) {\n          for (let j = 0; j < m; j++) {\n            work[j] += allocation[i][j];\n          }\n          finish[i] = true;\n        }\n      }\n    }\n  }\n  return finish.every(f => f);\n}`,
        language: "typescript"
      }
    ],
    quiz: [
      {
        id: "os1",
        question: "Which of the following is NOT a condition for deadlock?",
        options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"],
        correctIndex: 2,
        explanation: "The four Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Preemption actually helps prevent deadlocks."
      },
      {
        id: "os2",
        question: "In Round Robin scheduling, what happens if the time quantum is very large?",
        options: ["More context switches", "FCFS behavior", "Starvation", "Deadlock"],
        correctIndex: 1,
        explanation: "With a very large time quantum, each process runs to completion before switching, making it equivalent to FCFS."
      },
      {
        id: "os3",
        question: "Which page replacement algorithm is theoretically optimal?",
        options: ["FIFO", "LRU", "Optimal (Belady's)", "Clock"],
        correctIndex: 2,
        explanation: "Belady's optimal algorithm replaces the page that won't be used for the longest time, but it's not implementable in practice."
      }
    ]
  },
  {
    slug: "dbms",
    title: "Database Systems",
    description: "SQL, normalization, indexing, transactions, and query optimization.",
    icon: "🗄️",
    notesUrl: "https://noteslink.in/product/dbms-notes-kiit/",
    color: "from-rose-500 to-pink-600",
    lessons: [
      {
        id: "1",
        title: "SQL Fundamentals",
        content: "SQL (Structured Query Language) is the standard for relational databases.\n\nDQL (Query): SELECT, WHERE, GROUP BY, HAVING, ORDER BY\nDML (Manipulation): INSERT, UPDATE, DELETE\nDDL (Definition): CREATE, ALTER, DROP\nDCL (Control): GRANT, REVOKE\n\nJoins:\n- INNER JOIN: Matching rows\n- LEFT/RIGHT JOIN: All from one side + matching\n- FULL OUTER JOIN: All from both sides\n- CROSS JOIN: Cartesian product",
        codeExample: `-- Complex SQL query\nSELECT \n  d.department_name,\n  COUNT(e.employee_id) as emp_count,\n  AVG(e.salary) as avg_salary\nFROM departments d\nLEFT JOIN employees e ON d.dept_id = e.dept_id\nWHERE e.hire_date >= '2023-01-01'\nGROUP BY d.department_name\nHAVING COUNT(e.employee_id) > 5\nORDER BY avg_salary DESC;\n\n-- Window function\nSELECT \n  employee_name,\n  salary,\n  RANK() OVER (ORDER BY salary DESC) as rank,\n  salary - LAG(salary) OVER (ORDER BY salary) as diff_from_prev\nFROM employees;`,
        language: "sql"
      },
      {
        id: "2",
        title: "Normalization",
        content: "Normalization reduces data redundancy and improves integrity.\n\nNormal Forms:\n- 1NF: Atomic values, no repeating groups\n- 2NF: 1NF + no partial dependencies\n- 3NF: 2NF + no transitive dependencies\n- BCNF: Every determinant is a candidate key\n\nBenefits:\n- Eliminates update anomalies\n- Reduces storage\n- Improves data consistency\n\nTrade-off: More joins may reduce query performance.",
        codeExample: `-- Unnormalized (repeating groups)\n-- Orders: {1, [A,B], 100}\n\n-- 1NF: Atomic values\n-- Orders: {1, A, 100}, {1, B, 100}\n\n-- 2NF: Remove partial dependencies\nCREATE TABLE Orders (\n  order_id INT PRIMARY KEY,\n  product_id INT,\n  quantity INT,\n  product_name VARCHAR(100),\n  price DECIMAL(10,2)\n);\n\n-- 3NF: Remove transitive dependencies\nCREATE TABLE Orders (\n  order_id INT PRIMARY KEY,\n  product_id INT,\n  quantity INT\n);\n\nCREATE TABLE Products (\n  product_id INT PRIMARY KEY,\n  product_name VARCHAR(100),\n  price DECIMAL(10,2)\n);`,
        language: "sql"
      },
      {
        id: "3",
        title: "Indexing",
        content: "Indexes improve query performance by allowing fast lookups.\n\nTypes:\n- B-Tree: Default, good for range queries\n- Hash: Exact match lookups, O(1)\n- Bitmap: Low-cardinality columns\n- Composite: Multiple columns\n\nWhen to index:\n- Columns in WHERE clause\n- Columns in JOIN conditions\n- Columns with high cardinality\n\nWhen NOT to index:\n- Small tables\n- Columns frequently updated\n- Columns with low cardinality",
        codeExample: `-- Create index\nCREATE INDEX idx_emp_name ON employees(last_name);\n\n-- Composite index\nCREATE INDEX idx_emp_dept ON employees(dept_id, last_name);\n\n-- Partial index (PostgreSQL)\nCREATE INDEX idx_active ON employees(dept_id)\nWHERE status = 'active';\n\n-- Analyze query plan\nEXPLAIN ANALYZE\nSELECT * FROM employees\nWHERE last_name = 'Smith' AND dept_id = 5;\n\n-- Covering index (includes all needed columns)\nCREATE INDEX idx_emp_cover ON employees(last_name, dept_id)\nINCLUDE (first_name, salary);`,
        language: "sql"
      },
      {
        id: "4",
        title: "Transactions & ACID",
        content: "A transaction is a logical unit of work.\n\nACID properties:\n- Atomicity: All or nothing\n- Consistency: Valid state transitions\n- Isolation: Concurrent transactions don't interfere\n- Durability: Committed data persists\n\nIsolation levels:\n- Read Uncommitted: Dirty reads possible\n- Read Committed: No dirty reads\n- Repeatable Read: No non-repeatable reads\n- Serializable: Full isolation",
        codeExample: `-- Transaction example\nBEGIN TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100\nWHERE account_id = 1;\n\nUPDATE accounts SET balance = balance + 100\nWHERE account_id = 2;\n\n-- Verify no negative balance\nIF EXISTS (SELECT 1 FROM accounts WHERE balance < 0)\n  ROLLBACK;\nELSE\n  COMMIT;\n\n-- Set isolation level\nSET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n\n-- Savepoint\nSAVEPOINT sp1;\nDELETE FROM orders WHERE order_id = 100;\n-- Rollback to savepoint\nROLLBACK TO sp1;`,
        language: "sql"
      }
    ],
    quiz: [
      {
        id: "dbms1",
        question: "Which normal form eliminates transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctIndex: 2,
        explanation: "3NF removes transitive dependencies where a non-key attribute depends on another non-key attribute."
      },
      {
        id: "dbms2",
        question: "Which ACID property ensures committed data survives crashes?",
        options: ["Atomicity", "Consistency", "Isolation", "Durability"],
        correctIndex: 3,
        explanation: "Durability guarantees that once a transaction is committed, its effects are permanent even in case of system failure."
      },
      {
        id: "dbms3",
        question: "A B-Tree index is best suited for:",
        options: ["Exact match only", "Range queries", "Full-text search", "Geospatial data"],
        correctIndex: 1,
        explanation: "B-Tree indexes maintain sorted order, making them efficient for range queries and ordered retrieval."
      }
    ]
  },
  {
    slug: "computer-networks",
    title: "Computer Networks",
    description: "TCP/IP, OSI model, routing, HTTP, and network security.",
    icon: "🌐",
    notesUrl: "https://noteslink.in/product/cn-computer-networks-notes-kiit-copy/",
    color: "from-cyan-500 to-blue-600",
    lessons: [
      {
        id: "1",
        title: "OSI & TCP/IP Model",
        content: "OSI Model (7 layers):\n7. Application (HTTP, FTP, DNS)\n6. Presentation (Encryption, Compression)\n5. Session (Sessions, Sockets)\n4. Transport (TCP, UDP)\n3. Network (IP, Routing)\n2. Data Link (MAC, Switching)\n1. Physical (Cables, Signals)\n\nTCP/IP Model (4 layers):\n4. Application\n3. Transport\n2. Internet\n1. Network Access",
        codeExample: `// HTTP Request/Response example\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  const { method, url } = req;\n  console.log(\`\${method} \${url}\`);\n\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({ message: 'Hello World' }));\n});\n\nserver.listen(3000, () => {\n  console.log('Server running on port 3000');\n});`,
        language: "javascript"
      },
      {
        id: "2",
        title: "TCP vs UDP",
        content: "TCP (Transmission Control Protocol):\n- Connection-oriented\n- Reliable delivery (acknowledgments, retransmission)\n- Flow control (sliding window)\n- Congestion control\n- Order guaranteed\n\nUDP (User Datagram Protocol):\n- Connectionless\n- No reliability guarantees\n- No flow/congestion control\n- Faster, lower overhead\n\nUse cases:\n- TCP: Web, email, file transfer\n- UDP: DNS, video streaming, gaming, VoIP",
        codeExample: `// TCP Client (Node.js)\nconst net = require('net');\n\nconst client = net.createConnection({ port: 8080 }, () => {\n  console.log('Connected to server');\n  client.write('Hello Server!');\n});\n\nclient.on('data', (data) => {\n  console.log('Received:', data.toString());\n  client.end();\n});\n\nclient.on('end', () => {\n  console.log('Disconnected');\n});`,
        language: "javascript"
      },
      {
        id: "3",
        title: "IP Addressing & Subnetting",
        content: "IPv4: 32-bit address (e.g., 192.168.1.1)\nIPv6: 128-bit address\n\nSubnet mask divides IP into network and host parts.\nCIDR notation: 192.168.1.0/24\n\nPrivate IP ranges:\n- 10.0.0.0/8\n- 172.16.0.0/12\n- 192.168.0.0/16\n\nSubnetting:\n/24 = 256 addresses, /25 = 128, /26 = 64\nFormula: 2^(32-mask) addresses",
        codeExample: `// IP to binary and subnet calculation\nfunction ipToBinary(ip: string): string {\n  return ip.split('.').map(octet =>\n    parseInt(octet).toString(2).padStart(8, '0')\n  ).join('.');\n}\n\nfunction calculateSubnet(cidr: number): string {\n  const mask = ~(2 ** (32 - cidr) - 1);\n  return [\n    (mask >>> 24) & 255,\n    (mask >>> 16) & 255,\n    (mask >>> 8) & 255,\n    mask & 255\n  ].join('.');\n}\n\nconsole.log(ipToBinary('192.168.1.1'));\nconsole.log(calculateSubnet(24)); // 255.255.255.0`,
        language: "typescript"
      },
      {
        id: "4",
        title: "HTTP & HTTPS",
        content: "HTTP (HyperText Transfer Protocol):\n- Request-Response model\n- Stateless\n- Methods: GET, POST, PUT, DELETE, PATCH\n\nHTTPS: HTTP + TLS/SSL encryption\n\nStatus Codes:\n- 2xx: Success (200 OK, 201 Created)\n- 3xx: Redirection (301, 304)\n- 4xx: Client Error (400, 401, 403, 404)\n- 5xx: Server Error (500, 502, 503)\n\nHTTP/2: Multiplexing, server push, header compression\nHTTP/3: QUIC protocol, 0-RTT connection",
        codeExample: `// Fetch API example with error handling\nasync function fetchData(url: string) {\n  try {\n    const response = await fetch(url, {\n      method: 'GET',\n      headers: {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer token123'\n      }\n    });\n\n    if (!response.ok) {\n      throw new Error(\`HTTP \${response.status}\`);\n    }\n\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error);\n    throw error;\n  }\n}\n\n// POST request\nasync function postData(url: string, body: object) {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(body)\n  });\n  return response.json();\n}`,
        language: "typescript"
      }
    ],
    quiz: [
      {
        id: "net1",
        question: "Which OSI layer is responsible for routing?",
        options: ["Transport", "Network", "Data Link", "Session"],
        correctIndex: 1,
        explanation: "The Network layer (Layer 3) handles logical addressing and routing of packets between networks."
      },
      {
        id: "net2",
        question: "Which protocol is used for secure web browsing?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        correctIndex: 2,
        explanation: "HTTPS (HTTP Secure) uses TLS/SSL encryption to secure web communications."
      },
      {
        id: "net3",
        question: "How many addresses does a /26 subnet provide?",
        options: ["256", "128", "64", "32"],
        correctIndex: 2,
        explanation: "2^(32-26) = 2^6 = 64 addresses in a /26 subnet."
      }
    ]
  },
  {
    slug: "web-development",
    title: "Web Development",
    description: "HTML, CSS, JavaScript, React, and modern web technologies.",
    icon: "💻",
    color: "from-indigo-500 to-blue-600",
    lessons: [
      {
        id: "1",
        title: "HTML & Semantic Web",
        content: "HTML5 semantic elements:\n- header, nav, main, article, section, aside, footer\n- form, fieldset, legend\n- figure, figcaption\n\nAccessibility:\n- ARIA attributes\n- Alt text for images\n- Semantic heading hierarchy\n- Keyboard navigation\n\nSEO:\n- Meta tags (title, description, og:tags)\n- Structured data (JSON-LD)\n- Canonical URLs",
        codeExample: `<!-- Semantic HTML5 -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Page description">\n  <title>Page Title</title>\n</head>\n<body>\n  <header>\n    <nav aria-label="Main navigation">\n      <ul>\n        <li><a href="/">Home</a></li>\n        <li><a href="/about">About</a></li>\n      </ul>\n    </nav>\n  </header>\n  <main>\n    <article>\n      <h1>Main Heading</h1>\n      <section>\n        <h2>Section Title</h2>\n        <p>Content here</p>\n      </section>\n    </article>\n  </main>\n  <footer>\n    <p>&copy; 2024</p>\n  </footer>\n</body>\n</html>`,
        language: "html"
      },
      {
        id: "2",
        title: "CSS Flexbox & Grid",
        content: "Flexbox (1D layout):\n- display: flex\n- justify-content: alignment along main axis\n- align-items: alignment along cross axis\n- flex-direction: row | column\n- flex-wrap: wrap items\n\nGrid (2D layout):\n- display: grid\n- grid-template-columns/rows\n- grid-gap\n- grid-area: named placement\n- fr unit: fractional sizing",
        codeExample: `/* Flexbox - Card Layout */\n.card-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  justify-content: center;\n}\n\n.card {\n  flex: 1 1 300px;\n  max-width: 400px;\n}\n\n/* Grid - Dashboard Layout */\n.dashboard {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    "sidebar header"\n    "sidebar main"\n    "sidebar footer";\n  min-height: 100vh;\n}\n\n.sidebar { grid-area: sidebar; }\n.header  { grid-area: header; }\n.main    { grid-area: main; }\n.footer  { grid-area: footer; }`,
        language: "css"
      },
      {
        id: "3",
        title: "JavaScript Essentials",
        content: "Core concepts:\n- Closures and scope\n- Prototypal inheritance\n- Event loop and async/await\n- Promises and callbacks\n- Destructuring and spread\n\nES6+ features:\n- Arrow functions\n- Template literals\n- Optional chaining (?.)\n- Nullish coalescing (??)\n- Modules (import/export)",
        codeExample: `// Async/Await with error handling\nasync function fetchUserData(userId: string) {\n  try {\n    const response = await fetch(\`/api/users/\${userId}\`);\n    if (!response.ok) throw new Error('Not found');\n    const user = await response.json();\n    return user;\n  } catch (error) {\n    console.error('Failed to fetch user:', error);\n    throw error;\n  }\n}\n\n// Closures\nfunction createCounter(initial = 0) {\n  let count = initial;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}\n\nconst counter = createCounter(10);\nconsole.log(counter.increment()); // 11\nconsole.log(counter.getCount());  // 11`,
        language: "typescript"
      },
      {
        id: "4",
        title: "React Fundamentals",
        content: "React core concepts:\n- Components (functional)\n- JSX\n- Props and State\n- Hooks (useState, useEffect, useContext, useRef)\n- Conditional rendering\n- Lists and keys\n\nReact patterns:\n- Container/Presentational\n- Custom hooks\n- Context API\n- Compound components",
        codeExample: `import { useState, useEffect } from 'react';\n\n// Custom Hook\nfunction useFetch<T>(url: string) {\n  const [data, setData] = useState<T | null>(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<Error | null>(null);\n\n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(setData)\n      .catch(setError)\n      .finally(() => setLoading(false));\n  }, [url]);\n\n  return { data, loading, error };\n}\n\n// Component\nfunction UserList() {\n  const { data: users, loading, error } = useFetch<User[]>('/api/users');\n\n  if (loading) return <Spinner />;\n  if (error) return <ErrorMessage error={error} />;\n\n  return (\n    <ul>\n      {users?.map(user => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n}`,
        language: "tsx"
      }
    ],
    quiz: [
      {
        id: "web1",
        question: "Which CSS layout is best for 2D layouts?",
        options: ["Flexbox", "Float", "Grid", "Position"],
        correctIndex: 2,
        explanation: "CSS Grid is designed for two-dimensional layouts, while Flexbox is primarily for one-dimensional layouts."
      },
      {
        id: "web2",
        question: "What does JSX stand for?",
        options: ["JavaScript XML", "Java Syntax Extension", "JSON Xchange", "None of these"],
        correctIndex: 0,
        explanation: "JSX stands for JavaScript XML and allows writing HTML-like syntax in JavaScript."
      },
      {
        id: "web3",
        question: "Which hook is used for side effects in React?",
        options: ["useState", "useEffect", "useContext", "useRef"],
        correctIndex: 1,
        explanation: "useEffect is used for side effects like data fetching, subscriptions, or manually changing the DOM."
      }
    ]
  },
  {
    slug: "oop",
    title: "Object-Oriented Programming",
    description: "Encapsulation, inheritance, polymorphism, and design patterns.",
    icon: "🏗️",
    notesUrl: "https://noteslink.in/product/oopj-notes-kiit/",
    color: "from-teal-500 to-emerald-600",
    lessons: [
      {
        id: "1",
        title: "四大 pillars of OOP",
        content: "1. Encapsulation: Bundling data with methods, hiding internals\n2. Inheritance: Creating new classes from existing ones\n3. Polymorphism: Same interface, different implementations\n4. Abstraction: Hiding complexity, showing only essentials\n\nSOLID Principles:\n- Single Responsibility\n- Open/Closed\n- Liskov Substitution\n- Interface Segregation\n- Dependency Inversion",
        codeExample: `// Encapsulation\nclass BankAccount {\n  private balance: number;\n\n  constructor(initialBalance: number) {\n    this.balance = initialBalance;\n  }\n\n  deposit(amount: number): void {\n    if (amount > 0) this.balance += amount;\n  }\n\n  withdraw(amount: number): boolean {\n    if (amount > 0 && amount <= this.balance) {\n      this.balance -= amount;\n      return true;\n    }\n    return false;\n  }\n\n  getBalance(): number {\n    return this.balance;\n  }\n}\n\n// Inheritance & Polymorphism\nclass Animal {\n  speak(): string { return '...'; }\n}\n\nclass Dog extends Animal {\n  speak(): string { return 'Woof!'; }\n}\n\nclass Cat extends Animal {\n  speak(): string { return 'Meow!'; }\n}\n\nfunction makeSound(animal: Animal): string {\n  return animal.speak(); // Polymorphism\n}`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Design Patterns",
        content: "Creational Patterns:\n- Singleton: Single instance\n- Factory: Object creation without specifying class\n- Builder: Complex object construction\n\nStructural Patterns:\n- Adapter: Interface compatibility\n- Decorator: Add behavior dynamically\n- Facade: Simplified interface\n\nBehavioral Patterns:\n- Observer: Event subscription\n- Strategy: Interchangeable algorithms\n- Command: Encapsulate requests",
        codeExample: `// Observer Pattern\nclass EventEmitter {\n  private listeners: Map<string, Function[]> = new Map();\n\n  on(event: string, callback: Function): void {\n    const callbacks = this.listeners.get(event) || [];\n    callbacks.push(callback);\n    this.listeners.set(event, callbacks);\n  }\n\n  emit(event: string, ...args: any[]): void {\n    const callbacks = this.listeners.get(event) || [];\n    callbacks.forEach(cb => cb(...args));\n  }\n}\n\n// Strategy Pattern\ninterface SortStrategy {\n  sort(data: number[]): number[];\n}\n\nclass BubbleSort implements SortStrategy {\n  sort(data: number[]): number[] {\n    // bubble sort implementation\n    return [...data].sort((a, b) => a - b);\n  }\n}\n\nclass QuickSort implements SortStrategy {\n  sort(data: number[]): number[] {\n    // quick sort implementation\n    return [...data].sort((a, b) => a - b);\n  }\n}`,
        language: "typescript"
      },
      {
        id: "3",
        title: "SOLID Principles",
        content: "S - Single Responsibility: One class, one job\nO - Open/Closed: Open for extension, closed for modification\nL - Liskov Substitution: Subtypes must be substitutable\nI - Interface Segregation: Many specific interfaces > one general\nD - Dependency Inversion: Depend on abstractions, not concretions\n\nBenefits:\n- Maintainable code\n- Testable code\n- Flexible to change\n- Clear architecture",
        codeExample: `// Single Responsibility\nclass UserService {\n  createUser(data: UserData): User {\n    // only user creation logic\n  }\n}\n\nclass EmailService {\n  sendWelcome(user: User): void {\n    // only email logic\n  }\n}\n\n// Dependency Inversion\ninterface Repository<T> {\n  find(id: string): Promise<T>;\n  save(entity: T): Promise<void>;\n}\n\nclass UserController {\n  constructor(private userRepo: Repository<User>) {}\n\n  async getUser(id: string) {\n    return this.userRepo.find(id);\n  }\n}\n\n// Usage\nconst repo = new PostgresUserRepository();\nconst controller = new UserController(repo);`,
        language: "typescript"
      }
    ],
    quiz: [
      {
        id: "oop1",
        question: "Which OOP principle exposes only necessary details?",
        options: ["Encapsulation", "Inheritance", "Abstraction", "Polymorphism"],
        correctIndex: 2,
        explanation: "Abstraction hides complex implementation details and exposes only the essential features."
      },
      {
        id: "oop2",
        question: "Which SOLID principle states classes should have only one reason to change?",
        options: ["Open/Closed", "Single Responsibility", "Liskov Substitution", "Interface Segregation"],
        correctIndex: 1,
        explanation: "Single Responsibility Principle means a class should have only one job or responsibility."
      },
      {
        id: "oop3",
        question: "Which pattern provides a simplified interface to a complex subsystem?",
        options: ["Adapter", "Decorator", "Facade", "Strategy"],
        correctIndex: 2,
        explanation: "The Facade pattern provides a simplified interface to a larger, more complex body of code."
      }
    ]
  },
  {
    slug: "python",
    title: "Python",
    description: "Learn Python from basics to advanced concepts with real examples.",
    icon: "🐍",
    color: "from-yellow-400 to-yellow-600",
    lessons: [
      {
        id: "1",
        title: "Python Basics",
        content: "Python is a high-level, interpreted language known for its simplicity.\n\nKey features:\n- Dynamic typing\n- Indentation-based scope\n- Extensive standard library\n- Multi-paradigm (OOP, functional, procedural)\n\nData types: int, float, str, bool, list, tuple, dict, set\n\nVariables don't need type declarations.",
        codeExample: `# Variables and basic operations\nname = "Alice"\nage = 25\nheight = 5.6\nis_student = True\n\n# Lists\nfruits = ["apple", "banana", "cherry"]\nfruits.append("date")\nprint(fruits[0])  # apple\n\n# Dictionaries\nstudent = {\n    "name": "Bob",\n    "age": 22,\n    "grades": [85, 90, 78]\n}\nprint(student["name"])  # Bob\n\n# List comprehension\nsquares = [x**2 for x in range(10)]\nprint(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]`,
        language: "python"
      },
      {
        id: "2",
        title: "Functions & Lambdas",
        content: "Functions in Python use the 'def' keyword.\n\nFeatures:\n- Default parameters\n- *args and **kwargs\n- Type hints\n- Lambda (anonymous) functions\n- Decorators",
        codeExample: `# Function with type hints\ndef greet(name: str, times: int = 1) -> str:\n    return (f"Hello, {name}! " * times).strip()\n\nprint(greet("Alice"))  # Hello, Alice!\nprint(greet("Bob", 3))  # Hello, Bob! Hello, Bob! Hello, Bob!\n\n# *args and **kwargs\ndef flexible(*args, **kwargs):\n    print(f"args: {args}")\n    print(f"kwargs: {kwargs}")\n\nflexible(1, 2, 3, name="Alice", age=25)\n\n# Lambda\nsquare = lambda x: x ** 2\nadd = lambda a, b: a + b\n\nprint(square(5))  # 25\nprint(add(3, 4))  # 7\n\n# Map and Filter\nnums = [1, 2, 3, 4, 5]\ndoubled = list(map(lambda x: x * 2, nums))\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(doubled)  # [2, 4, 6, 8, 10]\nprint(evens)    # [2, 4]`,
        language: "python"
      },
      {
        id: "3",
        title: "Classes & OOP",
        content: "Python supports OOP with classes and objects.\n\nKey concepts:\n- __init__ constructor\n- self parameter\n- Instance vs class variables\n- Inheritance\n- Magic methods (__str__, __repr__, __len__)\n- @property decorator",
        codeExample: `class Animal:\n    def __init__(self, name: str, sound: str):\n        self.name = name\n        self._sound = sound  # protected\n\n    def speak(self) -> str:\n        return f"{self.name} says {self._sound}!"\n\n    def __repr__(self) -> str:\n        return f"Animal('{self.name}')"\n\nclass Dog(Animal):\n    def __init__(self, name: str, breed: str):\n        super().__init__(name, "Woof")\n        self.breed = breed\n\n    @property\n    def info(self) -> str:\n        return f"{self.name} is a {self.breed}"\n\n# Usage\ndog = Dog("Rex", "German Shepherd")\nprint(dog.speak())   # Rex says Woof!\nprint(dog.info)      # Rex is a German Shepherd\nprint(repr(dog))     # Animal('Rex')`,
        language: "python"
      },
      {
        id: "4",
        title: "File Handling & Error Handling",
        content: "File operations use context managers (with statement).\n\nFile modes:\n- 'r': Read\n- 'w': Write (overwrites)\n- 'a': Append\n- 'rb': Read binary\n\nError handling:\n- try / except / else / finally\n- Custom exceptions\n- Exception chaining",
        codeExample: `# File reading\nwith open("data.txt", "r") as f:\n    content = f.read()\n    lines = f.readlines()\n\n# File writing\nwith open("output.txt", "w") as f:\n    f.write("Hello, World!\\n")\n    f.writelines(["Line 1\\n", "Line 2\\n"])\n\n# Error handling\ndef divide(a: float, b: float) -> float:\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print("Cannot divide by zero!")\n        return 0\n    except TypeError as e:\n        print(f"Type error: {e}")\n        raise\n    else:\n        print(f"Division successful: {result}")\n        return result\n    finally:\n        print("This always runs")\n\n# Custom exception\nclass ValidationError(Exception):\n    def __init__(self, field: str, message: str):\n        self.field = field\n        self.message = message\n        super().__init__(f"{field}: {message}")\n\n# Usage\ntry:\n    raise ValidationError("email", "Invalid format")\nexcept ValidationError as e:\n    print(e)  # email: Invalid format`,
        language: "python"
      }
    ],
    quiz: [
      {
        id: "py1",
        question: "What is the output of `print(type([]))`?",
        options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'dict'>"],
        correctIndex: 1,
        explanation: "[] creates an empty list in Python, so type([]) returns <class 'list'>."
      },
      {
        id: "py2",
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "func", "def", "define"],
        correctIndex: 2,
        explanation: "Python uses the 'def' keyword to define functions."
      },
      {
        id: "py3",
        question: "What does `self` represent in a Python class?",
        options: ["The class itself", "The parent class", "The current instance", "A global variable"],
        correctIndex: 2,
        explanation: "self refers to the current instance of the class and is used to access instance attributes and methods."
      }
    ]
  },
  {
    slug: "java",
    title: "Java",
    description: "Master Java programming from OOP to collections and multithreading.",
    icon: "☕",
    color: "from-red-500 to-red-700",
    lessons: [
      {
        id: "1",
        title: "Java Basics",
        content: "Java is a statically-typed, object-oriented language.\n\nKey features:\n- Platform independent (JVM)\n- Strongly typed\n- Automatic garbage collection\n- Rich standard library\n\nPrimitive types: byte, short, int, long, float, double, char, boolean\n\nEverything is a class in Java (except primitives).",
        codeExample: `public class Main {\n    public static void main(String[] args) {\n        // Variables\n        String name = "Alice";\n        int age = 25;\n        double height = 5.6;\n        boolean active = true;\n\n        // Arrays\n        int[] nums = {1, 2, 3, 4, 5};\n        System.out.println(nums[0]); // 1\n\n        // Strings\n        String greeting = "Hello, " + name;\n        System.out.println(greeting);\n        System.out.println(greeting.length());\n        System.out.println(greeting.toUpperCase());\n\n        // Conditionals\n        if (age >= 18) {\n            System.out.println("Adult");\n        } else {\n            System.out.println("Minor");\n        }\n\n        // Loops\n        for (int i = 0; i < nums.length; i++) {\n            System.out.print(nums[i] + " ");\n        }\n    }\n}`,
        language: "java"
      },
      {
        id: "2",
        title: "OOP in Java",
        content: "Java is purely object-oriented.\n\nKey concepts:\n- Classes and Objects\n- Constructors (default, parameterized, copy)\n- Inheritance (extends)\n- Polymorphism (method overriding)\n- Encapsulation (private fields + getters/setters)\n- Abstract classes and interfaces",
        codeExample: `// Abstract class\nabstract class Shape {\n    protected String color;\n\n    public Shape(String color) {\n        this.color = color;\n    }\n\n    public abstract double area();\n\n    public void display() {\n        System.out.println("Color: " + color + ", Area: " + area());\n    }\n}\n\n// Interface\ninterface Drawable {\n    void draw();\n    default void printInfo() {\n        System.out.println("Drawable shape");\n    }\n}\n\n// Concrete class\nclass Circle extends Shape implements Drawable {\n    private double radius;\n\n    public Circle(String color, double radius) {\n        super(color);\n        this.radius = radius;\n    }\n\n    @Override\n    public double area() {\n        return Math.PI * radius * radius;\n    }\n\n    @Override\n    public void draw() {\n        System.out.println("Drawing circle");\n    }\n}\n\n// Usage\nCircle c = new Circle("Red", 5.0);\nc.display();  // Color: Red, Area: 78.54\nc.draw();     // Drawing circle`,
        language: "java"
      },
      {
        id: "3",
        title: "Collections Framework",
        content: "Java Collections Framework provides data structures.\n\nKey interfaces:\n- List: Ordered, duplicates allowed (ArrayList, LinkedList)\n- Set: No duplicates (HashSet, TreeSet, LinkedHashSet)\n- Map: Key-value pairs (HashMap, TreeMap, LinkedHashMap)\n- Queue: FIFO (PriorityQueue, ArrayDeque)\n\nGenerics ensure type safety.",
        codeExample: `import java.util.*;\n\npublic class CollectionsDemo {\n    public static void main(String[] args) {\n        // ArrayList\n        List<String> names = new ArrayList<>();\n        names.add("Alice");\n        names.add("Bob");\n        names.add("Charlie");\n        names.remove("Bob");\n        System.out.println(names); // [Alice, Charlie]\n\n        // HashMap\n        Map<String, Integer> scores = new HashMap<>();\n        scores.put("Math", 95);\n        scores.put("Science", 88);\n        scores.get("Math"); // 95\n        scores.forEach((k, v) -> \n            System.out.println(k + ": " + v));\n\n        // HashSet\n        Set<Integer> uniqueNums = new HashSet<>();\n        uniqueNums.add(1);\n        uniqueNums.add(2);\n        uniqueNums.add(1); // ignored\n        System.out.println(uniqueNums); // [1, 2]\n\n        // Stream API\n        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);\n        int sum = numbers.stream()\n            .filter(n -> n % 2 == 0)\n            .mapToInt(n -> n)\n            .sum();\n        System.out.println("Even sum: " + sum); // 6\n    }\n}`,
        language: "java"
      },
      {
        id: "4",
        title: "Exception Handling & Generics",
        content: "Java has robust exception handling.\n\nException hierarchy:\n- Throwable\n  - Error (JVM errors, don't catch)\n  - Exception\n    - RuntimeException (unchecked)\n    - IOException, SQLException (checked)\n\nChecked exceptions MUST be caught or declared.\n\nGenerics provide type safety at compile time.",
        codeExample: `// Exception handling\npublic class ExceptionDemo {\n    public static int divide(int a, int b) {\n        try {\n            return a / b;\n        } catch (ArithmeticException e) {\n            System.out.println("Error: " + e.getMessage());\n            return 0;\n        } finally {\n            System.out.println("This always runs");\n        }\n    }\n\n    // Custom exception\n    public static class InsufficientFundsException extends Exception {\n        private double amount;\n\n        public InsufficientFundsException(double amount) {\n            super("Insufficient funds");\n            this.amount = amount;\n        }\n\n        public double getAmount() { return amount; }\n    }\n}\n\n// Generics\npublic class Box<T> {\n    private T content;\n\n    public Box(T content) {\n        this.content = content;\n    }\n\n    public T getContent() { return content; }\n    public void setContent(T content) { this.content = content; }\n}\n\n// Usage\nBox<Integer> intBox = new Box<>(42);\nBox<String> strBox = new Box<>("Hello");\nSystem.out.println(intBox.getContent()); // 42\nSystem.out.println(strBox.getContent()); // Hello`,
        language: "java"
      }
    ],
    quiz: [
      {
        id: "java1",
        question: "Which of these is NOT a Java primitive type?",
        options: ["int", "boolean", "String", "char"],
        correctIndex: 2,
        explanation: "String is a class in Java, not a primitive type. Primitives are: byte, short, int, long, float, double, char, boolean."
      },
      {
        id: "java2",
        question: "What does JVM stand for?",
        options: ["Java Virtual Machine", "Java Variable Manager", "Joint Virtual Method", "None of these"],
        correctIndex: 0,
        explanation: "JVM stands for Java Virtual Machine, which executes Java bytecode."
      },
      {
        id: "java3",
        question: "Which collection allows duplicate elements?",
        options: ["HashSet", "TreeSet", "ArrayList", "LinkedHashSet"],
        correctIndex: 2,
        explanation: "ArrayList (implements List) allows duplicate elements. Sets do not allow duplicates."
      }
    ]
  },
  {
    slug: "c-language",
    title: "C Language",
    description: "Master C programming from fundamentals to pointers, memory management, and data structures.",
    icon: "⚙️",
    color: "from-blue-500 to-indigo-600",
    lessons: [
      {
        id: "1",
        title: "C Fundamentals",
        content: "C is a low-level, procedural language.\n\nKey features:\n- Direct memory access (pointers)\n- Manual memory management\n- Preprocessor directives\n- Structured programming\n\nData types: char, int, float, double, void\n\nArrays and pointers are closely related in C.",
        codeExample: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    // Variables\n    int age = 25;\n    float height = 5.6f;\n    char grade = 'A';\n\n    // Arrays\n    int nums[] = {1, 2, 3, 4, 5};\n    int size = sizeof(nums) / sizeof(nums[0]);\n\n    // Pointers\n    int *ptr = &age;\n    printf("Age: %d\\n", *ptr);  // Dereference\n    *ptr = 30;  // Modify through pointer\n    printf("Age: %d\\n", age);   // 30\n\n    // Dynamic memory\n    int *arr = (int*)malloc(5 * sizeof(int));\n    for (int i = 0; i < 5; i++) {\n        arr[i] = i * 10;\n    }\n    free(arr);  // Always free!\n\n    // Strings\n    char str[50] = "Hello";\n    strcat(str, " World");\n    printf("%s\\n", str);  // Hello World\n    printf("Length: %lu\\n", strlen(str));\n\n    return 0;\n}`,
        language: "c"
      },
      {
        id: "2",
        title: "Pointers & Memory",
        content: "Pointers are variables that store memory addresses.\n\nKey concepts:\n- & (address-of operator)\n- * (dereference operator)\n- Pointer arithmetic\n- Arrays decay to pointers\n- NULL pointer\n- Dangling pointer\n\nMemory allocation:\n- malloc: allocate uninitialized memory\n- calloc: allocate zero-initialized memory\n- realloc: resize allocation\n- free: deallocate memory",
        codeExample: `#include <stdio.h>\n#include <stdlib.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x=%d, y=%d\\n", x, y);  // x=20, y=10\n\n    // Dynamic array\n    int n = 5;\n    int *arr = (int*)calloc(n, sizeof(int));\n    for (int i = 0; i < n; i++) {\n        arr[i] = i * i;\n    }\n\n    // Reallocate\n    n = 10;\n    arr = (int*)realloc(arr, n * sizeof(int));\n    for (int i = 5; i < n; i++) {\n        arr[i] = i * 2;\n    }\n\n    for (int i = 0; i < n; i++) {\n        printf("%d ", arr[i]);\n    }\n    free(arr);\n\n    return 0;\n}`,
        language: "c"
      },
      {
        id: "3",
        title: "Structures & Unions",
        content: "Structures group different data types under one name.\n\nKey concepts:\n- struct keyword\n- Dot operator (.) for access\n- Arrow operator (->) via pointer\n- typedef for aliasing\n- Nested structures\n- Unions (shared memory)\n- Enums (named constants)",
        codeExample: `#include <stdio.h>\n#include <string.h>\n\nstruct Student {\n    char name[50];\n    int age;\n    float gpa;\n};\n\nvoid printStudent(struct Student *s) {\n    printf("Name: %s, Age: %d, GPA: %.2f\\n",\n           s->name, s->age, s->gpa);\n}\n\nint main() {\n    struct Student s1 = {"Alice", 20, 3.8};\n    struct Student s2;\n    strcpy(s2.name, "Bob");\n    s2.age = 22;\n    s2.gpa = 3.5;\n\n    printStudent(&s1);\n    printStudent(&s2);\n\n    // Array of structs\n    struct Student class[3] = {\n        {"Charlie", 21, 3.9},\n        {"Diana", 23, 3.7},\n        {"Eve", 20, 3.6}\n    };\n\n    for (int i = 0; i < 3; i++) {\n        printStudent(&class[i]);\n    }\n\n    return 0;\n}`,
        language: "c"
      },
      {
        id: "4",
        title: "File Handling",
        content: "C provides functions for file operations.\n\nKey functions:\n- fopen: open a file\n- fclose: close a file\n- fprintf/fprintf: write formatted output\n- fscanf: read formatted input\n- fgets/fputs: read/write strings\n- feof: check end of file\n- fopen modes: r, w, a, r+, w+, a+",
        codeExample: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Student {\n    char name[50];\n    int age;\n    float gpa;\n};\n\nint main() {\n    // Write to file\n    FILE *fp = fopen("students.txt", "w");\n    if (fp == NULL) {\n        printf("Error opening file!\\n");\n        return 1;\n    }\n\n    struct Student students[] = {\n        {"Alice", 20, 3.8},\n        {"Bob", 22, 3.5},\n        {"Charlie", 21, 3.9}\n    };\n\n    for (int i = 0; i < 3; i++) {\n        fprintf(fp, "%s %d %.2f\\n",\n                students[i].name,\n                students[i].age,\n                students[i].gpa);\n    }\n    fclose(fp);\n\n    // Read from file\n    fp = fopen("students.txt", "r");\n    char name[50];\n    int age;\n    float gpa;\n\n    printf("Reading from file:\\n");\n    while (fscanf(fp, "%s %d %f", name, &age, &gpa) != EOF) {\n        printf("Name: %s, Age: %d, GPA: %.2f\\n", name, age, gpa);\n    }\n    fclose(fp);\n\n    return 0;\n}`,
        language: "c"
      },
      {
        id: "5",
        title: "Dynamic Memory & Linked Lists",
        content: "Dynamic memory allocation allows runtime memory management.\n\nKey concepts:\n- malloc, calloc, realloc, free\n- Memory leaks\n- Wild pointers\n\nLinked List in C:\n- Use struct with self-referential pointer\n- malloc for each node\n- free each node when done",
        codeExample: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nstruct Node* createNode(int data) {\n    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = data;\n    newNode->next = NULL;\n    return newNode;\n}\n\nvoid push(struct Node **head, int data) {\n    struct Node *newNode = createNode(data);\n    newNode->next = *head;\n    *head = newNode;\n}\n\nvoid printList(struct Node *head) {\n    struct Node *current = head;\n    while (current != NULL) {\n        printf("%d -> ", current->data);\n        current = current->next;\n    }\n    printf("NULL\\n");\n}\n\nvoid freeList(struct Node *head) {\n    struct Node *temp;\n    while (head != NULL) {\n        temp = head;\n        head = head->next;\n        free(temp);\n    }\n}\n\nint main() {\n    struct Node *head = NULL;\n    push(&head, 3);\n    push(&head, 2);\n    push(&head, 1);\n\n    printList(head);  // 1 -> 2 -> 3 -> NULL\n    freeList(head);\n\n    return 0;\n}`,
        language: "c"
      }
    ],
    quiz: cLanguageQuestions,
  },
  {
    slug: "cpp",
    title: "C++",
    description: "Master C++ with OOP, STL, templates, and modern C++ features.",
    icon: "🔷",
    color: "from-indigo-500 to-purple-600",
    lessons: [
      {
        id: "1",
        title: "C++ Basics & OOP",
        content: "C++ extends C with OOP features.\n\nKey features:\n- Classes and objects\n- Constructors / Destructors\n- Inheritance\n- Polymorphism (virtual functions)\n- References (&)\n- Namespaces\n- cout/cin for I/O",
        codeExample: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Animal {\nprotected:\n    string name;\npublic:\n    Animal(string n) : name(n) {}\n    virtual void speak() = 0;  // Pure virtual\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal {\n    string breed;\npublic:\n    Dog(string n, string b) : Animal(n), breed(b) {}\n    void speak() override {\n        cout << name << " says Woof!" << endl;\n    }\n};\n\nint main() {\n    Dog dog("Rex", "Labrador");\n    dog.speak();  // Rex says Woof!\n\n    // Polymorphism\n    Animal* animals[] = { new Dog("Max", "Poodle") };\n    for (Animal* a : animals) {\n        a->speak();\n    }\n    delete animals[0];\n\n    return 0;\n}`,
        language: "cpp"
      },
      {
        id: "2",
        title: "STL - Standard Template Library",
        content: "STL provides common data structures and algorithms.\n\nContainers:\n- vector: Dynamic array\n- list: Doubly linked list\n- deque: Double-ended queue\n- map/set: Balanced BST\n- unordered_map: Hash table\n- stack/queue: Adapters\n\nIterators: Begin, end, advance\n\nAlgorithms: sort, find, binary_search, etc.",
        codeExample: `#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <map>\n#include <stack>\nusing namespace std;\n\nint main() {\n    // Vector\n    vector<int> nums = {5, 2, 8, 1, 9};\n    sort(nums.begin(), nums.end());\n    for (int n : nums) cout << n << " ";  // 1 2 5 8 9\n\n    // Map\n    map<string, int> ages;\n    ages["Alice"] = 25;\n    ages["Bob"] = 30;\n    for (auto& [name, age] : ages) {\n        cout << name << ": " << age << endl;\n    }\n\n    // Stack\n    stack<int> st;\n    st.push(10);\n    st.push(20);\n    cout << st.top() << endl;  // 20\n    st.pop();\n    cout << st.top() << endl;  // 10\n\n    // Lambda with algorithm\n    vector<int> data = {1, 2, 3, 4, 5, 6};\n    int count = count_if(data.begin(), data.end(),\n        [](int x) { return x % 2 == 0; });\n    cout << "Even: " << count << endl;  // 3\n\n    return 0;\n}`,
        language: "cpp"
      },
      {
        id: "3",
        title: "Templates & Generics",
        content: "Templates enable generic programming in C++.\n\nKey concepts:\n- Function templates\n- Class templates\n- Template specialization\n- Variadic templates (C++11)\n- SFINAE\n- Concepts (C++20)",
        codeExample: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\n// Function template\ntemplate <typename T>\nT maxVal(T a, T b) {\n    return (a > b) ? a : b;\n}\n\n// Class template\ntemplate <typename T>\nclass Stack {\n    vector<T> elements;\npublic:\n    void push(T val) { elements.push_back(val); }\n    T pop() {\n        T val = elements.back();\n        elements.pop_back();\n        return val;\n    }\n    bool empty() { return elements.empty(); }\n};\n\nint main() {\n    cout << maxVal(3, 7) << endl;      // 7\n    cout << maxVal(3.5, 2.1) << endl;  // 3.5\n    cout << maxVal<string>("a", "b") << endl; // b\n\n    Stack<int> st;\n    st.push(10);\n    st.push(20);\n    cout << st.pop() << endl;  // 20\n\n    return 0;\n}`,
        language: "cpp"
      },
      {
        id: "4",
        title: "Modern C++ (C++11/14/17/20)",
        content: "Modern C++ introduces powerful features.\n\nKey features:\n- auto keyword\n- Range-based for loops\n- Lambda expressions\n- Smart pointers (unique_ptr, shared_ptr)\n- Move semantics\n- std::optional, std::variant\n- std::string_view\n- constexpr\n- Ranges (C++20)",
        codeExample: `#include <iostream>\n#include <memory>\n#include <vector>\n#include <optional>\nusing namespace std;\n\n// auto keyword\nauto add = [](int a, int b) { return a + b; };\n\n// Smart pointers\nunique_ptr<int> makeUnique(int val) {\n    return make_unique<int>(val);\n}\n\n// Lambda with capture\nint x = 10;\nauto lambda = [x](int y) { return x + y; };\n\n// Optional\noptional<int> findValue(bool found) {\n    if (found) return 42;\n    return nullopt;\n}\n\nint main() {\n    cout << add(3, 4) << endl;  // 7\n    cout << lambda(5) << endl;   // 15\n\n    auto ptr = makeUnique<int>(42);\n    cout << *ptr << endl;  // 42\n\n    auto result = findValue(true);\n    if (result.has_value()) {\n        cout << result.value() << endl;  // 42\n    }\n\n    // Range-based for\n    vector<int> nums = {1, 2, 3, 4, 5};\n    for (const auto& n : nums) {\n        cout << n << " ";\n    }\n    cout << endl;\n\n    return 0;\n}`,
        language: "cpp"
      }
    ],
    quiz: cppQuestions
  },
  {
    slug: "javascript",
    title: "JavaScript",
    description: "Modern JavaScript from ES6+ to async programming and DOM manipulation.",
    icon: "📜",
    color: "from-yellow-400 to-amber-500",
    lessons: [
      {
        id: "1",
        title: "ES6+ Features",
        content: "Modern JavaScript (ES6+) introduced major improvements.\n\nKey features:\n- let/const (block scoping)\n- Arrow functions\n- Template literals\n- Destructuring\n- Spread/rest operators\n- Optional chaining (?.)\n- Nullish coalescing (??)",
        codeExample: `// let and const\nconst PI = 3.14159;\nlet count = 0;\n\n// Arrow functions\nconst add = (a, b) => a + b;\nconst square = x => x * x;\n\n// Template literals\nconst name = "Alice";\nconsole.log(\`Hello, \${name}!\`);\n\n// Destructuring\nconst user = { name: "Bob", age: 25, city: "NYC" };\nconst { name: userName, age } = user;\nconsole.log(userName, age); // Bob 25\n\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\nconsole.log(first, second, rest); // 1 2 [3,4,5]\n\n// Optional chaining\nconst address = user?.address?.street ?? "N/A";\nconsole.log(address); // N/A\n\n// Spread\nconst arr1 = [1, 2, 3];\nconst arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]\n\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { ...obj1, c: 3 }; // {a:1,b:2,c:3}`,
        language: "javascript"
      },
      {
        id: "2",
        title: "Async JavaScript",
        content: "JavaScript is single-threaded but handles async via event loop.\n\nConcepts:\n- Callbacks (old way)\n- Promises (.then/.catch)\n- async/await\n- Promise.all, Promise.race\n- Error handling with try/catch",
        codeExample: `// Promises\nfunction fetchData(url) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (url) resolve({ data: "result" });\n      else reject(new Error("No URL"));\n    }, 1000);\n  });\n}\n\n// .then style\nfetchData("/api/users")\n  .then(res => console.log(res))\n  .catch(err => console.error(err));\n\n// async/await\nasync function getData() {\n  try {\n    const res = await fetchData("/api/users");\n    console.log(res);\n  } catch (err) {\n    console.error(err);\n  }\n}\n\n// Promise.all - run in parallel\nasync function getAll() {\n  const [users, posts] = await Promise.all([\n    fetchData("/users"),\n    fetchData("/posts")\n  ]);\n  return { users, posts };\n}\n\n// Promise.race - first to resolve\nasync function fastest() {\n  const result = await Promise.race([\n    fetchData("/server1"),\n    fetchData("/server2")\n  ]);\n  return result;\n}`,
        language: "javascript"
      },
      {
        id: "3",
        title: "DOM Manipulation",
        content: "The DOM (Document Object Model) represents the page structure.\n\nKey methods:\n- querySelector / querySelectorAll\n- getElementById\n- createElement / appendChild\n- addEventListener\n- classList.add/remove/toggle\n- innerHTML / textContent / value",
        codeExample: `// Selecting elements\nconst heading = document.querySelector("h1");\nconst buttons = document.querySelectorAll(".btn");\n\n// Creating elements\nconst div = document.createElement("div");\ndiv.className = "card";\ndiv.textContent = "Hello!";\ndocument.body.appendChild(div);\n\n// Event listeners\nbuttons.forEach(btn => {\n  btn.addEventListener("click", (e) => {\n    e.target.classList.toggle("active");\n    console.log("Clicked:", e.target.textContent);\n  });\n});\n\n// Form handling\nconst form = document.querySelector("form");\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const formData = new FormData(form);\n  const data = Object.fromEntries(formData);\n  console.log(data);\n});\n\n// DOM traversal\nconst parent = heading.parentElement;\nconst children = parent.children;\nconst next = heading.nextElementSibling;`,
        language: "javascript"
      },
      {
        id: "4",
        title: "Modules & Closures",
        content: "Modules organize code into separate files.\n\nModule systems:\n- CommonJS (require/module.exports)\n- ES Modules (import/export)\n\nClosures:\nA function that remembers its lexical scope even when executed outside that scope.",
        codeExample: `// ES Modules\n// math.js\nexport const add = (a, b) => a + b;\nexport const subtract = (a, b) => a - b;\nexport default class Calculator {\n  result = 0;\n  add(n) { this.result += n; return this; }\n  subtract(n) { this.result -= n; return this; }\n  getValue() { return this.result; }\n}\n\n// app.js\nimport Calculator, { add, subtract } from "./math.js";\nconst calc = new Calculator();\nconsole.log(calc.add(5).subtract(2).getValue()); // 3\n\n// Closures\nfunction createCounter(initial = 0) {\n  let count = initial;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}\n\nconst counter = createCounter(10);\nconsole.log(counter.increment()); // 11\nconsole.log(counter.increment()); // 12\nconsole.log(counter.getCount());  // 12\n\n// Module pattern\nconst singleton = (() => {\n  let instance;\n  return {\n    getInstance: () => {\n      if (!instance) instance = { data: [] };\n      return instance;\n    }\n  };\n})();`,
        language: "javascript"
      }
    ],
    quiz: [
      {
        id: "js1",
        question: "What is the difference between `let` and `var`?",
        options: ["No difference", "let is block-scoped, var is function-scoped", "var is newer", "let is faster"],
        correctIndex: 1,
        explanation: "let has block scope (limited to {} blocks), while var has function scope (accessible throughout the function)."
      },
      {
        id: "js2",
        question: "What does `async/await` return?",
        options: ["A string", "A Promise", "A callback", "undefined"],
        correctIndex: 1,
        explanation: "async functions always return a Promise. await pauses execution until the Promise resolves."
      },
      {
        id: "js3",
        question: "What is a closure in JavaScript?",
        options: ["A loop construct", "A function that remembers its lexical scope", "A way to close windows", "An error handler"],
        correctIndex: 1,
        explanation: "A closure is a function that retains access to variables from its outer scope even after the outer function has returned."
      }
    ]
  },
  {
    slug: "computer-architecture",
    title: "Computer Architecture (COA)",
    description: "Understand CPU design, memory hierarchy, pipelining, and instruction set architectures.",
    icon: "🖥️",
    notesUrl: "https://noteslink.in/product/coa-computer-architecture-notes/",
    color: "from-cyan-500 to-blue-600",
    lessons: [
      {
        id: "1",
        title: "Fundamentals of Computer Architecture",
        content: "Computer architecture defines the structure and behavior of a computer system. It encompasses the design of the CPU, memory system, and I/O mechanisms.\n\nKey concepts:\n- **Von Neumann Architecture**: Shared memory for instructions and data\n- **Harvard Architecture**: Separate memories for instructions and data\n- **Instruction Cycle**: Fetch → Decode → Execute → Store\n- **Bus**: Address bus, Data bus, Control bus\n\nPerformance equation:\n```\nExecution Time = Instruction Count × CPI × Clock Period\n```\n\nWhere CPI = Cycles Per Instruction.",
        codeExample: `// Simulating instruction cycle
const memory = [0x12, 0x34, 0x56, 0x78];
let PC = 0;
let IR;
let ACC = 0;

// Fetch
IR = memory[PC];
PC++;

// Decode & Execute (simplified ADD instruction)
if ((IR & 0xF0) === 0x10) {
  ACC += IR & 0x0F;
}

console.log("ACC:", ACC);`,
        language: "typescript"
      },
      {
        id: "2",
        title: "CPU Design & Instruction Sets",
        content: "**RISC vs CISC:**\n| Feature | RISC | CISC |\n|---------|------|------|\n| Instructions | Simple, fixed-length | Complex, variable-length |\n| Cycles | 1 per instruction | Multiple per instruction |\n| Registers | Large register file | Fewer registers |\n| Examples | ARM, MIPS, RISC-V | x86, VAX |\n\n**Pipelining** divides instruction execution into stages (IF, ID, EX, MEM, WB).\n\nHazards in pipelining:\n- **Data hazard**: Instruction depends on result of previous instruction\n- **Control hazard**: Branch instruction changes the flow\n- **Structural hazard**: Hardware resource conflict",
        codeExample: `// Simulating a 5-stage pipeline
class Pipeline {
  addInstruction(id: number) {
    const stages = ["IF", "ID", "EX", "MEM", "WB"];
    stages.forEach((stage, i) => {
      setTimeout(() => {
        console.log(\`Inst \${id}: \${stage} at cycle \${i + 1}\`);
      }, i * 100);
    });
  }
}

const pipe = new Pipeline();
pipe.addInstruction(1);
setTimeout(() => pipe.addInstruction(2), 100);`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Memory Hierarchy",
        content: "**Hierarchy (fastest to slowest):**\n1. Registers (CPU) - <1 ns\n2. L1 Cache - 1-2 ns\n3. L2 Cache - 3-10 ns\n4. L3 Cache - 10-20 ns\n5. Main Memory (RAM) - 50-100 ns\n6. SSD - 10-100 μs\n7. HDD - 5-10 ms\n\n**Cache Mapping:**\n- Direct Mapped: Each memory block maps to exactly one cache line\n- Fully Associative: A block can go anywhere\n- Set Associative: Block maps to a specific set\n\n**Cache Performance:**\n```\nEffective Access Time = Hit Time + Miss Rate × Miss Penalty\n```",
        codeExample: `// Simulating cache lookup
class Cache {
  private cache: Map<number, number> = new Map();
  private hits = 0;
  private misses = 0;

  access(address: number): number {
    if (this.cache.has(address)) {
      this.hits++;
      return this.cache.get(address)!;
    }
    this.misses++;
    const value = address * 10;
    this.cache.set(address, value);
    return value;
  }

  getStats() {
    const total = this.hits + this.misses;
    return {
      hitRate: (this.hits / total * 100).toFixed(1) + "%",
      missRate: (this.misses / total * 100).toFixed(1) + "%"
    };
  }
}

const cache = new Cache();
[1, 2, 3, 1, 2, 4, 1].forEach(addr => cache.access(addr));
console.log(cache.getStats());`,
        language: "typescript"
      },
      {
        id: "4",
        title: "I/O Systems & Interrupts",
        content: "**I/O Methods:**\n- **Programmed I/O**: CPU waits for I/O (busy waiting)\n- **Interrupt-Driven I/O**: Device signals CPU when ready\n- **DMA (Direct Memory Access)**: Device transfers data directly to/from memory\n\n**Interrupt Handling:**\n1. Device sends interrupt signal\n2. CPU completes current instruction\n3. CPU saves context (PC, registers)\n4. CPU jumps to interrupt handler (ISR)\n5. ISR services the device\n6. CPU restores context and resumes\n\n**I/O Performance:**\n```\nI/O Time = Seek Time + Rotational Latency + Transfer Time\n```",
        codeExample: `// Simulating interrupt-driven I/O
class CPU {
  private interruptQueue: string[] = [];

  onInterrupt(device: string, handler: () => void) {
    console.log(\`Registered handler for \${device}\`);
  }

  handleInterrupt() {
    const device = this.interruptQueue.shift();
    if (device) {
      console.log(\`Processing interrupt from \${device}\`);
    }
  }
}

const cpu = new CPU();
cpu.onInterrupt("keyboard", () => console.log("Key pressed"));
cpu.interruptQueue.push("keyboard");
cpu.handleInterrupt();`,
        language: "typescript"
      },
      {
        id: "5",
        title: "RISC-V & Modern Architectures",
        content: "**RISC-V Key Features:**\n- Open-source ISA (no licensing fees)\n- Modular: Base integer instructions + extensions (M, A, F, D, C)\n- Fixed-length 32-bit instructions\n- Load-store architecture\n- 32 general-purpose registers (x0-x31)\n\n**RISC-V Instruction Formats:**\n- R-type: Register operations\n- I-type: Immediate operations\n- S-type: Store operations\n- B-type: Branch operations\n- U-type: Upper immediate\n- J-type: Jump\n\n**Modern Trends:**\n- Superscalar: Multiple instructions per cycle\n- Out-of-order execution\n- Branch prediction\n- Hardware multithreading",
        codeExample: `// RISC-V assembly simulation
class RISCV {
  registers: number[] = new Array(32).fill(0);
  pc = 0;
  memory: number[] = [];

  add(rd: number, rs1: number, rs2: number) {
    this.registers[rd] = this.registers[rs1] + this.registers[rs2];
  }

  addi(rd: number, rs1: number, imm: number) {
    this.registers[rd] = this.registers[rs1] + imm;
  }
}

const cpu = new RISCV();
cpu.addi(1, 0, 10);
cpu.addi(2, 0, 20);
cpu.add(3, 1, 2);
console.log("x3 =", cpu.registers[3]);`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "coa1", question: "What does CPI stand for in computer architecture?", options: ["Computer Processing Interface", "Cycles Per Instruction", "Central Processing Index", "Cache Performance Indicator"], correctIndex: 1, explanation: "CPI measures how many clock cycles, on average, an instruction takes to execute.", difficulty: "easy", chapter: "Fundamentals" },
      { id: "coa2", question: "Which architecture uses separate memories for instructions and data?", options: ["Von Neumann", "Harvard", "RISC", "CISC"], correctIndex: 1, explanation: "Harvard architecture uses separate instruction and data memories/buses.", difficulty: "easy", chapter: "Fundamentals" },
      { id: "coa3", question: "What is the main advantage of pipelining?", options: ["Reduces clock speed", "Increases instruction throughput", "Eliminates all hazards", "Reduces instruction count"], correctIndex: 1, explanation: "Pipelining increases throughput by overlapping instruction execution stages.", difficulty: "medium", chapter: "CPU Design" },
      { id: "coa4", question: "Which cache mapping technique is the most flexible?", options: ["Direct mapped", "Set associative", "Fully associative", "Write-through"], correctIndex: 2, explanation: "Fully associative mapping allows a block to be placed anywhere in the cache.", difficulty: "medium", chapter: "Memory" },
      { id: "coa5", question: "What does DMA stand for?", options: ["Direct Memory Access", "Dynamic Memory Allocation", "Data Management Algorithm", "Direct Multiprocessing Architecture"], correctIndex: 0, explanation: "DMA allows devices to transfer data directly to/from memory without CPU intervention.", difficulty: "easy", chapter: "I/O Systems" },
      { id: "coa6", question: "Which hazard occurs when an instruction depends on a previous instruction in the pipeline?", options: ["Control hazard", "Structural hazard", "Data hazard", "Cache hazard"], correctIndex: 2, explanation: "A data hazard occurs when instructions that exhibit data dependence modify data in different pipeline stages.", difficulty: "medium", chapter: "CPU Design" },
      { id: "coa7", question: "RISC-V is an example of which type of architecture?", options: ["CISC", "RISC", "VLIW", "Stack-based"], correctIndex: 1, explanation: "RISC-V is a RISC architecture with a simple, fixed-length instruction format.", difficulty: "easy", chapter: "Modern Architectures" }
    ]
  },
  {
    slug: "discrete-structures",
    title: "Discrete Structures (DSS)",
    description: "Explore logic, sets, relations, graph theory, combinatorics, and Boolean algebra.",
    icon: "🔗",
    notesUrl: "https://noteslink.in/product/de-la-notes-kiit/",
    color: "from-violet-500 to-purple-600",
    lessons: [
      {
        id: "1",
        title: "Logic & Proofs",
        content: "Logic is the foundation of mathematical reasoning and computer science.\n\n**Propositional Logic:**\n- **Negation (¬p)**: NOT\n- **Conjunction (p ∧ q)**: AND\n- **Disjunction (p ∨ q)**: OR\n- **Implication (p → q)**: IF...THEN\n- **Biconditional (p ↔ q)**: IF AND ONLY IF\n\n**Truth Table for p → q:**\n| p | q | p → q |\n|---|---|-------|\n| T | T | T |\n| T | F | F |\n| F | T | T |\n| F | F | T |\n\n**Proof Techniques:**\n- Direct proof\n- Proof by contrapositive\n- Proof by contradiction\n- Mathematical induction\n- Proof by cases",
        codeExample: `// Evaluating logical expressions
const truthTable = (p: boolean, q: boolean) => ({
  notP: !p,
  pAndQ: p && q,
  pOrQ: p || q,
  pImpliesQ: !p || q,
  pIffQ: p === q
});

console.log("T → T:", truthTable(true, true));
console.log("T → F:", truthTable(true, false));

// Mathematical induction: sum of 1..n = n(n+1)/2
function sum(n: number): number {
  return n * (n + 1) / 2;
}
console.log("Sum 1..10:", sum(10));`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Sets, Relations & Functions",
        content: "**Sets** are collections of distinct objects.\n\nSet operations:\n- A ∪ B (union)\n- A ∩ B (intersection)\n- A - B (difference)\n- A' (complement)\n- |A| (cardinality)\n\n**Relations** on a set A are subsets of A × A.\nProperties:\n- Reflexive: (a,a) ∈ R for all a\n- Symmetric: (a,b) ∈ R → (b,a) ∈ R\n- Transitive: (a,b) ∈ R ∧ (b,c) ∈ R → (a,c) ∈ R\n- **Equivalence relation**: reflexive + symmetric + transitive\n\n**Functions** f: A → B:\n- Injective (one-to-one)\n- Surjective (onto)\n- Bijective: both injective and surjective",
        codeExample: `// Set operations
class DiscreteSet<T> {
  private elements: Set<T>;
  constructor(elements: T[]) {
    this.elements = new Set(elements);
  }
  union(other: DiscreteSet<T>): DiscreteSet<T> {
    return new DiscreteSet([...this.elements, ...other.elements]);
  }
  intersection(other: DiscreteSet<T>): DiscreteSet<T> {
    return new DiscreteSet([...this.elements].filter(e => other.elements.has(e)));
  }
  difference(other: DiscreteSet<T>): DiscreteSet<T> {
    return new DiscreteSet([...this.elements].filter(e => !other.elements.has(e)));
  }
  get size() { return this.elements.size; }
}

const A = new DiscreteSet([1, 2, 3, 4]);
const B = new DiscreteSet([3, 4, 5, 6]);
console.log("A ∪ B:", A.union(B).size);
console.log("A ∩ B:", A.intersection(B).size);`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Graph Theory",
        content: "A graph G = (V, E) consists of vertices V and edges E.\n\n**Types:**\n- **Undirected**: edges have no direction\n- **Directed (Digraph)**: edges have direction\n- **Weighted**: edges have associated weights\n- **Complete**: every pair of vertices is connected\n\n**Representations:**\n- Adjacency matrix: O(V²) space\n- Adjacency list: O(V + E) space\n\n**Traversal:**\n- BFS: Level-order, uses queue\n- DFS: Depth-first, uses stack/recursion\n\n**Key Concepts:**\n- Degree: number of edges incident to a vertex\n- Path: sequence of vertices connected by edges\n- Cycle: path that starts and ends at the same vertex\n- Euler path: visits every edge exactly once\n- Hamiltonian path: visits every vertex exactly once",
        codeExample: `// Graph using adjacency list
class Graph {
  private adj: Map<string, string[]> = new Map();

  addEdge(u: string, v: string) {
    if (!this.adj.has(u)) this.adj.set(u, []);
    if (!this.adj.has(v)) this.adj.set(v, []);
    this.adj.get(u)!.push(v);
    this.adj.get(v)!.push(u);
  }

  bfs(start: string): string[] {
    const visited = new Set<string>();
    const queue = [start];
    const result: string[] = [];
    visited.add(start);
    while (queue.length) {
      const v = queue.shift()!;
      result.push(v);
      for (const neighbor of this.adj.get(v) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }
}

const g = new Graph();
["A-B", "A-C", "B-D", "C-D"].forEach(e => {
  const [u, v] = e.split("-"); g.addEdge(u, v);
});
console.log("BFS:", g.bfs("A"));`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Combinatorics & Counting",
        content: "**Counting Principles:**\n\n**1. Addition Principle:** If task A can be done in m ways and task B in n ways, and they are mutually exclusive, total = m + n.\n\n**2. Multiplication Principle:** If task A has m ways and task B has n ways, total = m × n.\n\n**Permutations:**\n- P(n,r) = n! / (n-r)! — ordered selection\n\n**Combinations:**\n- C(n,r) = n! / (r!(n-r)!) — unordered selection\n\n**Pigeonhole Principle:** If n items are placed in m containers with n > m, at least one container has more than one item.\n\n**Inclusion-Exclusion:**\n|A ∪ B| = |A| + |B| - |A ∩ B|",
        codeExample: `// Factorial and combinations
function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

function combination(n: number, r: number): number {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

console.log("C(5,3):", combination(5, 3));
console.log("5!:", factorial(5));`,
        language: "typescript"
      },
      {
        id: "5",
        title: "Boolean Algebra & Logic Gates",
        content: "**Laws:**\n- Identity: A + 0 = A, A · 1 = A\n- Null: A + 1 = 1, A · 0 = 0\n- Complement: A + A' = 1, A · A' = 0\n- De Morgan's: (A + B)' = A' · B', (A · B)' = A' + B'\n\n**Logic Gates:**\n- AND, OR, NOT, NAND, NOR, XOR, XNOR\n\n**Canonical Forms:**\n- Sum of Products (SOP)\n- Product of Sums (POS)\n\n**Simplification:**\n- Karnaugh Maps (K-maps)\n- Quine-McCluskey algorithm",
        codeExample: `// Boolean algebra operations
const boolOps = (a: boolean, b: boolean) => ({
  AND: a && b,
  OR: a || b,
  NAND: !(a && b),
  NOR: !(a || b),
  XOR: a !== b,
  XNOR: a === b
});

// De Morgan's Law verification
const deMorgan = (a: boolean, b: boolean) => {
  const left = !(a || b);
  const right = !a && !b;
  console.log(\`!(\${a} || \${b}) = \${left}, !\${a} && !\${b} = \${right}\`);
};

deMorgan(true, false);
console.log(boolOps(true, false));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "dss1", question: "What is the negation of p → q?", options: ["¬p → ¬q", "p ∧ ¬q", "¬p ∨ q", "p ↔ q"], correctIndex: 1, explanation: "The negation of p → q is p ∧ ¬q.", difficulty: "medium", chapter: "Logic" },
      { id: "dss2", question: "How many subsets does a set with n elements have?", options: ["n", "n²", "2ⁿ", "n!"], correctIndex: 2, explanation: "A set with n elements has 2ⁿ subsets.", difficulty: "easy", chapter: "Sets" },
      { id: "dss3", question: "Transitivity means:", options: ["(a,a) ∈ R", "(a,b) ∈ R → (b,a) ∈ R", "(a,b) ∈ R ∧ (b,c) ∈ R → (a,c) ∈ R", "R is symmetric"], correctIndex: 2, explanation: "Transitivity means the relation can be chained.", difficulty: "easy", chapter: "Relations" },
      { id: "dss4", question: "In a complete graph with n vertices, how many edges are there?", options: ["n", "n-1", "n(n-1)/2", "n²"], correctIndex: 2, explanation: "A complete graph has C(n,2) = n(n-1)/2 edges.", difficulty: "medium", chapter: "Graph Theory" },
      { id: "dss5", question: "What is C(10,3)?", options: ["30", "120", "720", "210"], correctIndex: 1, explanation: "C(10,3) = 10!/(3!×7!) = 120.", difficulty: "medium", chapter: "Combinatorics" },
      { id: "dss6", question: "De Morgan's law states that (A ∪ B)' equals:", options: ["A' ∪ B'", "A' ∩ B'", "A ∩ B", "A' ∩ B"], correctIndex: 1, explanation: "(A ∪ B)' = A' ∩ B'.", difficulty: "easy", chapter: "Boolean Algebra" },
      { id: "dss7", question: "A bijective function is:", options: ["Only injective", "Only surjective", "Both injective and surjective", "Neither"], correctIndex: 2, explanation: "A bijective function is both one-to-one and onto.", difficulty: "easy", chapter: "Functions" },
      { id: "dss8", question: "BFS traversal uses which data structure?", options: ["Stack", "Queue", "Priority Queue", "Deque"], correctIndex: 1, explanation: "BFS uses a queue to explore vertices level by level.", difficulty: "easy", chapter: "Graph Theory" }
    ]
  },
  {
    slug: "digital-system-design",
    title: "Digital System Design (DSD)",
    description: "Learn number systems, logic gates, combinational and sequential circuit design.",
    icon: "⚡",
    notesUrl: "https://noteslink.in/product/dsd-digital-system-design-notes-kiit/",
    color: "from-amber-500 to-orange-600",
    lessons: [
      {
        id: "1",
        title: "Number Systems & Codes",
        content: "**Number Systems:**\n- Binary (base 2)\n- Octal (base 8)\n- Decimal (base 10)\n- Hexadecimal (base 16)\n\n**Conversions:**\n- Decimal to Binary: Divide by 2, read remainders\n- Binary to Decimal: Σ(dᵢ × 2ⁱ)\n- Binary to Hex: Group 4 bits\n\n**Complements:**\n- 1's complement: Flip all bits\n- 2's complement: 1's complement + 1\n\n**Codes:**\n- BCD (Binary-Coded Decimal)\n- Gray Code: adjacent values differ by 1 bit\n- ASCII: 7-bit character encoding\n- Parity: Even/Odd error detection",
        codeExample: `// Number system conversions
const toBinary = (n: number): string => n.toString(2);
const toHex = (n: number): string => n.toString(16).toUpperCase();
const fromBinary = (s: string): number => parseInt(s, 2);

// 2's complement (8-bit)
const twosComplement = (n: number): string => {
  if (n >= 0) return toBinary(n).padStart(8, "0");
  const pos = Math.abs(n);
  const bin = toBinary(pos).padStart(8, "0");
  const flipped = bin.split("").map(b => b === "0" ? "1" : "0").join("");
  return (parseInt(flipped, 2) + 1).toString(2).padStart(8, "0");
};

console.log("42 in binary:", toBinary(42));
console.log("42 in hex:", toHex(42));
console.log("-5 in 2's comp:", twosComplement(-5));`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Logic Gates & Boolean Functions",
        content: "**Basic Gates:**\n- AND: Output is 1 only if all inputs are 1\n- OR: Output is 1 if any input is 1\n- NOT: Inverts the input\n\n**Universal Gates:**\n- NAND: Can implement any Boolean function\n- NOR: Can implement any Boolean function\n\n**Derived Gates:**\n- XOR: Output is 1 if inputs are different\n- XNOR: Output is 1 if inputs are same\n\n**Boolean Function Implementation:**\n1. Write truth table\n2. Derive SOP or POS form\n3. Simplify using K-maps or algebra\n4. Implement with gates",
        codeExample: `// Implementing logic gates
const gate = {
  AND: (a: number, b: number) => a & b,
  OR: (a: number, b: number) => a | b,
  NOT: (a: number) => a ^ 1,
  NAND: (a: number, b: number) => (a & b) ^ 1,
  NOR: (a: number, b: number) => (a | b) ^ 1,
  XOR: (a: number, b: number) => a ^ b,
  XNOR: (a: number, b: number) => (a ^ b) ^ 1
};

console.log("AND(1,1):", gate.AND(1,1));
console.log("NAND(1,1):", gate.NAND(1,1));
console.log("XOR(1,0):", gate.XOR(1,0));`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Combinational Logic Design",
        content: "Combinational circuits produce outputs based solely on current inputs.\n\n**Key Components:**\n- **Multiplexer (MUX)**: Selects one of many inputs\n- **Demultiplexer (DEMUX)**: Routes one input to many\n- **Decoder**: n-to-2ⁿ lines\n- **Encoder**: 2ⁿ-to-n lines\n- **Adder**:\n  - Half Adder: Sum = A⊕B, Carry = A·B\n  - Full Adder: Adds 3 bits (A, B, Cin)\n- **Subtractor**: Using 2's complement addition\n\n**Design Steps:**\n1. Problem specification\n2. Truth table\n3. Boolean expression (SOP/POS)\n4. Simplification\n5. Circuit implementation",
        codeExample: `// 4:1 Multiplexer
function mux4to1(inputs: number[], sel: number[]): number {
  const index = sel[0] * 2 + sel[1];
  return inputs[index];
}

// Full Adder
function fullAdder(a: number, b: number, cin: number) {
  const sum = a ^ b ^ cin;
  const cout = (a & b) | (cin & (a ^ b));
  return { sum, cout };
}

console.log("MUX 4:1:", mux4to1([1,0,1,1], [1,0]));
console.log("Full Adder(1,1,1):", fullAdder(1,1,1));`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Sequential Logic Design",
        content: "Sequential circuits have memory — outputs depend on current state AND inputs.\n\n**Flip-Flops:**\n- **SR**: Set-Reset (invalid when S=R=1)\n- **D**: Data/Delay (stores input)\n- **JK**: Improved SR (toggle when J=K=1)\n- **T**: Toggle (T=1 flips state)\n\n**Registers:**\n- Shift Register: Serial/parallel data movement\n- Register File: Array of registers\n\n**Counters:**\n- Synchronous: All flip-flops clocked together\n- Asynchronous (ripple): Each FF triggers the next\n\n**State Machines:**\n- Mealy: Output depends on state + input\n- Moore: Output depends only on state",
        codeExample: `// D Flip-Flop simulation
class DFlipFlop {
  private q = 0;
  clock(d: number): number {
    this.q = d;
    return this.q;
  }
  get output() { return this.q; }
}

// 4-bit counter
class Counter4Bit {
  private count = 0;
  increment() {
    this.count = (this.count + 1) % 16;
  }
  get value() { return this.count; }
  get binary() { return this.count.toString(2).padStart(4, "0"); }
}

const counter = new Counter4Bit();
for (let i = 0; i < 6; i++) counter.increment();
console.log("Counter:", counter.value, counter.binary);`,
        language: "typescript"
      },
      {
        id: "5",
        title: "Memory & Programmable Logic",
        content: "**Memory Types:**\n- **RAM** (volatile): SRAM (fast), DRAM (dense)\n- **ROM** (non-volatile): PROM, EPROM, EEPROM\n- **Flash**: NAND (storage), NOR (execute-in-place)\n\n**Memory Organization:**\n- Address lines: 2ⁿ locations\n- Data lines: word size (8, 16, 32, 64 bits)\n\n**Programmable Logic:**\n- **PLA**: Programmable AND + OR\n- **PAL**: Fixed OR, programmable AND\n- **FPGA**: Configurable logic blocks\n  - Look-up tables (LUTs)\n  - Configurable interconnects\n  - I/O blocks\n\n**HDL:** Hardware Description Languages (Verilog, VHDL)",
        codeExample: `// Simple memory simulation
class Memory {
  private data: number[];
  private size: number;
  private wordSize: number;

  constructor(addressBits: number, wordSize: number) {
    this.size = Math.pow(2, addressBits);
    this.data = new Array(this.size).fill(0);
    this.wordSize = wordSize;
  }

  write(address: number, value: number) {
    if (address < this.size) {
      this.data[address] = value & ((1 << this.wordSize) - 1);
    }
  }

  read(address: number): number {
    return address < this.size ? this.data[address] : 0;
  }
}

const mem = new Memory(4, 8);
mem.write(0x00, 0xFF);
mem.write(0x05, 0x42);
console.log("Read 0x05:", mem.read(0x05).toString(16));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "dsd1", question: "What is 2's complement of 5 in 8-bit binary?", options: ["00000101", "11111011", "11111010", "00001010"], correctIndex: 1, explanation: "5 = 00000101. Invert: 11111010. Add 1: 11111011.", difficulty: "medium", chapter: "Number Systems" },
      { id: "dsd2", question: "Which gate is known as a universal gate?", options: ["AND", "OR", "NAND", "XOR"], correctIndex: 2, explanation: "NAND (and NOR) are universal gates.", difficulty: "easy", chapter: "Logic Gates" },
      { id: "dsd3", question: "A 4:1 multiplexer has how many select lines?", options: ["1", "2", "3", "4"], correctIndex: 1, explanation: "A 4:1 MUX requires log₂(4) = 2 select lines.", difficulty: "easy", chapter: "Combinational Logic" },
      { id: "dsd4", question: "In a full adder, how many inputs are there?", options: ["1", "2", "3", "4"], correctIndex: 2, explanation: "A full adder has 3 inputs: A, B, and Carry-in.", difficulty: "easy", chapter: "Combinational Logic" },
      { id: "dsd5", question: "Mealy machine output depends on:", options: ["Only state", "State + input", "Input only", "Clock only"], correctIndex: 1, explanation: "In Mealy machines, output depends on both current state and input.", difficulty: "medium", chapter: "Sequential Logic" },
      { id: "dsd6", question: "SR flip-flop is invalid when:", options: ["S=0, R=0", "S=0, R=1", "S=1, R=0", "S=1, R=1"], correctIndex: 3, explanation: "SR flip-flop has an invalid state when both S=1 and R=1.", difficulty: "easy", chapter: "Sequential Logic" },
      { id: "dsd7", question: "Which memory type is volatile?", options: ["ROM", "EPROM", "SRAM", "Flash"], correctIndex: 2, explanation: "SRAM is volatile — it loses data when power is removed.", difficulty: "easy", chapter: "Memory" },
      { id: "dsd8", question: "FPGA stands for:", options: ["Fast Programmable Gate Array", "Field-Programmable Gate Array", "Fixed Programmable Gate Array", "Flexible Programmable Gate Array"], correctIndex: 1, explanation: "FPGA stands for Field-Programmable Gate Array.", difficulty: "easy", chapter: "Programmable Logic" }
    ]
  },
  {
    slug: "automata-formal-languages",
    title: "Automata & Formal Languages (AFL)",
    description: "Study finite automata, regular expressions, context-free grammars, and Turing machines.",
    icon: "🔀",
    notesUrl: "https://noteslink.in/product/afl-automata-formal-language-kiit/",
    color: "from-rose-500 to-pink-600",
    lessons: [
      {
        id: "1",
        title: "Finite Automata & Regular Languages",
        content: "**Finite Automaton (FA):** A 5-tuple (Q, Σ, δ, q₀, F)\n- Q: finite set of states\n- Σ: input alphabet\n- δ: transition function\n- q₀: start state\n- F: set of accept states\n\n**Types:**\n- **DFA** (Deterministic): One transition per symbol per state\n- **NFA** (Nondeterministic): Multiple transitions, ε-moves\n\n**Equivalence:** Every NFA can be converted to an equivalent DFA.\n\n**Regular Languages:**\n- Recognized by finite automata\n- Described by regular expressions\n- Closed under: union, concatenation, Kleene star, intersection, complement\n\n**Pumping Lemma:** If L is regular, there exists p such that any string s with |s| ≥ p can be split as s = xyz where |xy| ≤ p, |y| > 0, and xyⁱz ∈ L for all i ≥ 0.",
        codeExample: `// Simple DFA simulator
class DFA {
  private state: string;
  private transitions: Map<string, Map<string, string>>;
  private acceptStates: Set<string>;

  constructor(startState: string, acceptStates: string[]) {
    this.state = startState;
    this.transitions = new Map();
    this.acceptStates = new Set(acceptStates);
  }

  addTransition(from: string, input: string, to: string) {
    if (!this.transitions.has(from)) this.transitions.set(from, new Map());
    this.transitions.get(from)!.set(input, to);
  }

  process(input: string): boolean {
    this.state = "q0";
    for (const char of input) {
      const next = this.transitions.get(this.state)?.get(char);
      if (!next) return false;
      this.state = next;
    }
    return this.acceptStates.has(this.state);
  }
}

const dfa = new DFA("q0", ["q2"]);
dfa.addTransition("q0", "a", "q1");
dfa.addTransition("q0", "b", "q0");
dfa.addTransition("q1", "a", "q1");
dfa.addTransition("q1", "b", "q2");
dfa.addTransition("q2", "a", "q1");
dfa.addTransition("q2", "b", "q0");

console.log("ab:", dfa.process("ab"));
console.log("aab:", dfa.process("aab"));
console.log("aba:", dfa.process("aba"));`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Regular Expressions",
        content: "**Operators:**\n- **Union**: A|B (A or B)\n- **Concatenation**: AB (A followed by B)\n- **Kleene Star**: A* (zero or more A's)\n- **Positive Closure**: A+ (one or more A's)\n- **Optional**: A? (zero or one A)\n\n**Precedence:** Kleene star > Concatenation > Union\n\n**Conversion:**\n- FA → Regex: State elimination method\n- Regex → FA: Thompson's construction\n\n**Examples:**\n- (a|b)* — all strings over {a,b}\n- (a|b)*abb — strings ending with 'abb'\n- a*b* — any number of a's followed by any number of b's",
        codeExample: `// Simple regex pattern matching
function matchesRegex(pattern: string, input: string): boolean {
  const regex = new RegExp("^" + pattern + "$");
  return regex.test(input);
}

console.log("(a|b)*abb:", matchesRegex("(a|b)*abb", "aabb"));
console.log("(a|b)*abb:", matchesRegex("(a|b)*abb", "ab"));
console.log("a*b*:", matchesRegex("a*b*", "aaabbb"));`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Context-Free Grammars & Languages",
        content: "**Context-Free Grammar (CFG):** A 4-tuple (V, Σ, R, S)\n- V: variables (non-terminals)\n- Σ: terminals\n- R: production rules (A → α)\n- S: start variable\n\n**Derivation:**\n- Leftmost: Replace leftmost variable first\n- Rightmost: Replace rightmost variable first\n- Parse tree: Tree representation of derivation\n\n**Normal Forms:**\n- **Chomsky Normal Form (CNF)**: A → BC or A → a\n- **Greibach Normal Form (GNF)**: A → aα\n\n**Ambiguity:** A CFG is ambiguous if some string has two different parse trees.\n\n**Pushdown Automata (PDA):**\n- Like FA but with a stack\n- Can recognize context-free languages\n- Equivalent to CFGs",
        codeExample: `// CFG parser (simple expression grammar)
class Parser {
  private input: string;
  private pos = 0;

  constructor(input: string) {
    this.input = input.replace(/\\s/g, "");
  }

  parseE(): string {
    let node = this.parseT();
    while (this.pos < this.input.length && this.input[this.pos] === "+") {
      this.pos++;
      const right = this.parseT();
      node = \`(\${node} + \${right})\`;
    }
    return node;
  }

  parseT(): string {
    let node = this.parseF();
    while (this.pos < this.input.length && this.input[this.pos] === "*") {
      this.pos++;
      const right = this.parseF();
      node = \`(\${node} * \${right})\`;
    }
    return node;
  }

  parseF(): string {
    if (this.input[this.pos] === "(") {
      this.pos++;
      const node = this.parseE();
      this.pos++;
      return node;
    }
    let id = "";
    while (this.pos < this.input.length && /[a-z]/.test(this.input[this.pos])) {
      id += this.input[this.pos++];
    }
    return id;
  }
}

const parser = new Parser("id + id * id");
console.log(parser.parseE());`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Turing Machines & Computability",
        content: "**Turing Machine (TM):** A 7-tuple (Q, Σ, Γ, δ, q₀, q_accept, q_reject)\n- Γ: tape alphabet (includes blank)\n- δ: Q × Γ → Q × Γ × {L, R}\n\n**Church-Turing Thesis:** Anything computable can be computed by a Turing Machine.\n\n**Variants:**\n- Multi-tape TM\n- Non-deterministic TM\n- All equivalent in power\n\n**Decidability:**\n- A language is **decidable** if a TM always halts and accepts/rejects\n- **Halting Problem**: No TM can decide if an arbitrary TM halts on input w\n- **Rice's Theorem**: Any non-trivial property of RE languages is undecidable\n\n**Complexity Classes:**\n- **P**: Decidable in polynomial time\n- **NP**: Verifiable in polynomial time\n- **NP-complete**: Hardest problems in NP",
        codeExample: `// Simple Turing Machine simulator
class TuringMachine {
  private tape: string[];
  private head: number;
  private state: string;
  private transitions: Map<string, Map<string, { write: string; move: "L" | "R"; next: string }>>;
  private acceptStates: Set<string>;

  constructor(input: string, acceptStates: string[]) {
    this.tape = input.split("");
    this.head = 0;
    this.state = "q0";
    this.transitions = new Map();
    this.acceptStates = new Set(acceptStates);
  }

  addTransition(state: string, read: string, write: string, move: "L" | "R", next: string) {
    if (!this.transitions.has(state)) this.transitions.set(state, new Map());
    this.transitions.get(state)!.set(read, { write, move, next });
  }

  step(): boolean {
    const symbol = this.tape[this.head] || "_";
    const trans = this.transitions.get(this.state)?.get(symbol);
    if (!trans) return false;
    this.tape[this.head] = trans.write;
    this.head += trans.move === "R" ? 1 : -1;
    this.state = trans.next;
    return true;
  }

  run(maxSteps = 1000): string {
    for (let i = 0; i < maxSteps; i++) {
      if (this.acceptStates.has(this.state)) return this.tape.join("");
      if (!this.step()) break;
    }
    return this.tape.join("");
  }
}

const tm = new TuringMachine("aab", ["q_accept"]);
tm.addTransition("q0", "a", "a", "R", "q0");
tm.addTransition("q0", "b", "b", "R", "q0");
tm.addTransition("q0", "_", "_", "R", "q_accept");
console.log("TM result:", tm.run());`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "afl1", question: "What is the difference between DFA and NFA?", options: ["DFA is faster", "NFA allows ε-transitions and multiple transitions per symbol", "DFA has more states", "NFA is more restrictive"], correctIndex: 1, explanation: "NFA allows ε-transitions and multiple transitions for the same symbol.", difficulty: "medium", chapter: "Finite Automata" },
      { id: "afl2", question: "The pumping lemma is used to:", options: ["Prove a language is regular", "Prove a language is not regular", "Convert NFA to DFA", "Minimize a DFA"], correctIndex: 1, explanation: "The pumping lemma provides a necessary condition for regular languages.", difficulty: "medium", chapter: "Regular Languages" },
      { id: "afl3", question: "Which automaton recognizes context-free languages?", options: ["DFA", "NFA", "Pushdown Automaton", "Turing Machine"], correctIndex: 2, explanation: "Pushdown automata recognize exactly the context-free languages.", difficulty: "easy", chapter: "Context-Free Languages" },
      { id: "afl4", question: "In Chomsky Normal Form, productions are of the form:", options: ["A → aB | a | ε", "A → BC | a", "A → aA | b", "A → AB"], correctIndex: 1, explanation: "CNF requires A → BC (two variables) or A → a (single terminal).", difficulty: "medium", chapter: "CFG" },
      { id: "afl5", question: "The Halting Problem is:", options: ["Decidable in polynomial time", "Decidable but not in P", "Undecidable", "NP-complete"], correctIndex: 2, explanation: "The Halting Problem is provably undecidable.", difficulty: "easy", chapter: "Computability" },
      { id: "afl6", question: "A CFG is ambiguous if:", options: ["It has ε-productions", "It has left recursion", "Some string has two different parse trees", "It has more than 5 variables"], correctIndex: 2, explanation: "Ambiguity means a string can be generated by two different derivations.", difficulty: "medium", chapter: "CFG" },
      { id: "afl7", question: "Which complexity class contains all problems solvable in polynomial time?", options: ["NP", "P", "NP-complete", "EXPTIME"], correctIndex: 1, explanation: "P is the class of decision problems solvable by a deterministic TM in polynomial time.", difficulty: "easy", chapter: "Complexity" }
    ]
  },
  {
    slug: "probability-statistics",
    title: "Probability & Statistics (PS)",
    description: "Master probability rules, distributions, hypothesis testing, and regression.",
    icon: "📊",
    notesUrl: "https://noteslink.in/product/ps-probability-and-statics-notes-kiit-copy/",
    color: "from-lime-500 to-green-600",
    lessons: [
      {
        id: "1",
        title: "Probability Basics",
        content: "**Probability** measures the likelihood of an event (0 to 1).\n\n**Axioms:**\n1. P(A) ≥ 0\n2. P(S) = 1 (sample space)\n3. P(A ∪ B) = P(A) + P(B) - P(A ∩ B)\n\n**Key Rules:**\n- **Addition**: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)\n- **Multiplication**: P(A ∩ B) = P(A) · P(B|A)\n- **Complement**: P(A') = 1 - P(A)\n- **Conditional**: P(A|B) = P(A ∩ B) / P(B)\n\n**Bayes' Theorem:**\n```\nP(A|B) = P(B|A) · P(A) / P(B)\n```\n\n**Independence**: P(A ∩ B) = P(A) · P(B)",
        codeExample: `// Probability calculations
class Probability {
  static addition(a: number, b: number, intersection: number): number {
    return a + b - intersection;
  }

  static conditional(intersection: number, b: number): number {
    return b !== 0 ? intersection / b : 0;
  }

  static bayes(pBA: number, pA: number, pB: number): number {
    return (pBA * pA) / pB;
  }
}

console.log("P(A∪B):", Probability.addition(0.3, 0.5, 0.15));

const pDisease = 0.01;
const pPositiveGivenDisease = 0.95;
const pPositive = 0.05;
console.log("P(Disease|Test+):",
  Probability.bayes(pPositiveGivenDisease, pDisease, pPositive));`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Random Variables & Distributions",
        content: "**Random Variable:** A function mapping outcomes to real numbers.\n\n**Types:**\n- Discrete: Countable values (e.g., dice rolls)\n- Continuous: Uncountable values (e.g., height)\n\n**Key Distributions:**\n| Distribution | Use Case | Parameters |\n|-------------|----------|------------|\n| Bernoulli | Single trial | p |\n| Binomial | n independent trials | n, p |\n| Poisson | Events per time unit | λ |\n| Normal | Natural phenomena | μ, σ² |\n| Uniform | Equal likelihood | a, b |\n| Exponential | Time between events | λ |\n\n**Expectation & Variance:**\n- E[X] = Σx · P(X=x)\n- Var(X) = E[X²] - (E[X])²",
        codeExample: `// Probability distributions
class Distributions {
  static binomial(n: number, p: number, k: number): number {
    const comb = (n: number, k: number) => {
      let c = 1;
      for (let i = 0; i < k; i++) c = c * (n - i) / (i + 1);
      return c;
    };
    return comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  }

  static poisson(lam: number, k: number): number {
    return (Math.pow(lam, k) * Math.exp(-lam)) / factorial(k);
  }

  static normal(x: number, mu: number, sigma: number): number {
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) *
           Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
  }

  static mean(data: number[]): number {
    return data.reduce((s, x) => s + x, 0) / data.length;
  }

  static variance(data: number[]): number {
    const m = this.mean(data);
    return data.reduce((s, x) => s + Math.pow(x - m, 2), 0) / data.length;
  }
}

function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

console.log("Binomial(10,0.5,5):", Distributions.binomial(10, 0.5, 5));
console.log("Poisson(3,2):", Distributions.poisson(3, 2));`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Statistical Inference",
        content: "**Estimation:**\n- **Point estimate**: Single value (sample mean x̄)\n- **Interval estimate**: Confidence interval\n\n**Confidence Interval (95%):**\n```\nx̄ ± z* × σ/√n\n```\n\n**Hypothesis Testing:**\n1. H₀ (null) vs H₁ (alternative)\n2. Choose significance level (α = 0.05)\n3. Calculate test statistic\n4. Determine p-value\n5. Reject or fail to reject H₀\n\n**Common Tests:**\n- **Z-test**: Known variance, large sample\n- **T-test**: Unknown variance, small sample\n- **Chi-square**: Categorical data\n- **ANOVA**: Compare multiple means\n\n**Errors:**\n- Type I (α): Reject true H₀\n- Type II (β): Fail to reject false H₀\n- Power = 1 - β",
        codeExample: `// Statistical inference
class Statistics {
  static confidenceInterval(
    mean: number, z: number, sigma: number, n: number
  ): [number, number] {
    const margin = z * (sigma / Math.sqrt(n));
    return [mean - margin, mean + margin];
  }

  static tTest(
    sample1: number[], sample2: number[]
  ): { t: number; df: number } {
    const n1 = sample1.length, n2 = sample2.length;
    const m1 = this.mean(sample1), m2 = this.mean(sample2);
    const v1 = this.variance(sample1), v2 = this.variance(sample2);
    const pooledSE = Math.sqrt(v1/n1 + v2/n2);
    const t = (m1 - m2) / pooledSE;
    const df = n1 + n2 - 2;
    return { t, df };
  }

  static mean(arr: number[]): number {
    return arr.reduce((s, x) => s + x, 0) / arr.length;
  }

  static variance(arr: number[]): number {
    const m = this.mean(arr);
    return arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1);
  }
}

const sample = [23, 25, 28, 22, 27, 24, 26, 29];
const ci = Statistics.confidenceInterval(
  Statistics.mean(sample), 1.96, 3, sample.length
);
console.log("95% CI:", ci.map(x => x.toFixed(2)));`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Regression & Correlation",
        content: "**Correlation** measures linear relationship strength (-1 to 1).\n\n**Pearson Correlation (r):**\n```\nr = Σ(xi - x̄)(yi - ȳ) / √(Σ(xi - x̄)² · Σ(yi - ȳ)²)\n```\n\n**Simple Linear Regression:** y = β₀ + β₁x + ε\n- β₁ = Σ(xi - x̄)(yi - ȳ) / Σ(xi - x̄)²\n- β₀ = ȳ - β₁x̄\n\n**R² (Coefficient of Determination):** Proportion of variance explained.\n\n**Multiple Regression:** y = β₀ + β₁x₁ + β₂x₂ + ... + ε\n\n**Assumptions:**\n1. Linearity\n2. Independence\n3. Homoscedasticity\n4. Normality of residuals",
        codeExample: `// Linear regression
class Regression {
  static linearRegression(x: number[], y: number[]) {
    const n = x.length;
    const sumX = x.reduce((s, v) => s + v, 0);
    const sumY = y.reduce((s, v) => s + v, 0);
    const sumXY = x.reduce((s, v, i) => s + v * y[i], 0);
    const sumX2 = x.reduce((s, v) => s + v * v, 0);

    const b1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b0 = (sumY - b1 * sumX) / n;

    return { slope: b1, intercept: b0,
      predict: (val: number) => b0 + b1 * val };
  }

  static correlation(x: number[], y: number[]): number {
    const n = x.length;
    const mx = x.reduce((s, v) => s + v, 0) / n;
    const my = y.reduce((s, v) => s + v, 0) / n;
    let num = 0, dx = 0, dy = 0;
    for (let i = 0; i < n; i++) {
      num += (x[i] - mx) * (y[i] - my);
      dx += (x[i] - mx) ** 2;
      dy += (y[i] - my) ** 2;
    }
    return num / Math.sqrt(dx * dy);
  }
}

const hours = [1, 2, 3, 4, 5, 6, 7, 8];
const scores = [45, 55, 65, 70, 78, 85, 89, 95];
const model = Regression.linearRegression(hours, scores);
console.log("Model: y =", model.intercept.toFixed(1), "+", model.slope.toFixed(1), "x");
console.log("Predict 9 hours:", model.predict(9).toFixed(1));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "ps1", question: "If P(A)=0.3 and P(B)=0.5, and A,B are independent, P(A∩B)=?", options: ["0.15", "0.8", "0.35", "0.50"], correctIndex: 0, explanation: "P(A∩B) = P(A)×P(B) = 0.3×0.5 = 0.15.", difficulty: "easy", chapter: "Probability Basics" },
      { id: "ps2", question: "Bayes' theorem is used to:", options: ["Calculate joint probability", "Update prior probability with new evidence", "Calculate marginal probability", "Test independence"], correctIndex: 1, explanation: "Bayes' theorem updates the probability of a hypothesis given new evidence.", difficulty: "medium", chapter: "Probability Basics" },
      { id: "ps3", question: "Which distribution models events in a fixed time interval?", options: ["Normal", "Binomial", "Poisson", "Uniform"], correctIndex: 2, explanation: "The Poisson distribution models event counts in a fixed interval.", difficulty: "easy", chapter: "Distributions" },
      { id: "ps4", question: "A 95% confidence interval means:", options: ["95% of data is in the interval", "95% of repeated intervals would contain the true mean", "95% chance the mean is in our interval", "95% of samples are correct"], correctIndex: 1, explanation: "In repeated sampling, approximately 95% of intervals would contain the true parameter.", difficulty: "hard", chapter: "Inference" },
      { id: "ps5", question: "Type I error is:", options: ["Failing to reject a false null", "Rejecting a true null hypothesis", "Accepting a true alternative", "Rejecting a false alternative"], correctIndex: 1, explanation: "Type I error is rejecting H₀ when it is actually true.", difficulty: "medium", chapter: "Inference" },
      { id: "ps6", question: "Correlation r = -0.9 indicates:", options: ["Strong positive", "Strong negative", "No relationship", "Weak negative"], correctIndex: 1, explanation: "r = -0.9 indicates a strong negative linear relationship.", difficulty: "easy", chapter: "Regression" },
      { id: "ps7", question: "In y = β₀ + β₁x, β₁ represents:", options: ["Intercept", "Slope", "Error term", "Mean"], correctIndex: 1, explanation: "β₁ is the slope — change in y per unit increase in x.", difficulty: "easy", chapter: "Regression" }
    ]
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence (AI)",
    description: "Explore search algorithms, knowledge representation, planning, and NLP.",
    icon: "🤖",
    notesUrl: "https://noteslink.in/product/artificial-intelligence-notes-kiit/",
    color: "from-fuchsia-500 to-pink-600",
    lessons: [
      {
        id: "1",
        title: "Introduction to AI & Search",
        content: "**AI** is the simulation of human intelligence by machines.\n\n**Search Problems:**\n- **State space**: All possible configurations\n- **Initial state**: Starting point\n- **Actions**: Possible moves\n- **Goal test**: Check if state is goal\n- **Path cost**: Cost of solution\n\n**Uninformed Search:**\n- BFS: Complete, optimal for unit costs, O(bᵈ) time/space\n- DFS: Not complete (cycles), not optimal, O(bᵐ) time, O(bm) space\n- Uniform Cost: Optimal, complete\n\n**Informed Search:**\n- Greedy Best-First: Uses heuristic h(n)\n- A*: Uses f(n) = g(n) + h(n)\n  - Optimal if h is admissible (never overestimates)\n\n**Heuristics:**\n- Manhattan distance (grid)\n- Euclidean distance\n- Misplaced tiles (8-puzzle)",
        codeExample: `// A* search implementation
interface Node {
  state: string;
  parent: Node | null;
  g: number;
  h: number;
  f: number;
}

function aStar(
  start: string, goal: string,
  neighbors: (s: string) => string[],
  h: (s: string) => number,
  cost: (a: string, b: string) => number
): string[] {
  const open: Node[] = [{
    state: start, parent: null, g: 0, h: h(start), f: h(start)
  }];
  const closed = new Set<string>();

  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift()!;
    if (current.state === goal) {
      const path: string[] = [];
      let node: Node | null = current;
      while (node) { path.unshift(node.state); node = node.parent; }
      return path;
    }
    closed.add(current.state);
    for (const neighbor of neighbors(current.state)) {
      if (closed.has(neighbor)) continue;
      const g = current.g + cost(current.state, neighbor);
      const existing = open.find(n => n.state === neighbor);
      if (existing && existing.g <= g) continue;
      const hVal = h(neighbor);
      if (existing) {
        existing.g = g; existing.f = g + hVal; existing.parent = current;
      } else {
        open.push({ state: neighbor, parent: current, g, h: hVal, f: g + hVal });
      }
    }
  }
  return [];
}

const path = aStar("A", "D",
  s => ({ A: ["B","C"], B: ["D"], C: ["D"] }[s] || []),
  s => ({ A: 3, B: 1, C: 2, D: 0 }[s] || 0),
  (a, b) => ({ "A-B": 1, "A-C": 2, "B-D": 1, "C-D": 1 }[a+"-"+b] || 1)
);
console.log("A* path:", path);`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Knowledge Representation",
        content: "**Knowledge Representation** encodes information for AI reasoning.\n\n**Propositional Logic:**\n- Simple, but limited expressiveness\n\n**First-Order Logic (FOL):**\n- Objects, predicates, quantifiers\n- ∀x (Human(x) → Mortal(x))\n- ∃x (Human(x) ∧ King(x))\n\n**Semantic Networks:**\n- Nodes = concepts, Edges = relationships\n- Inheritance: Properties flow down hierarchy\n\n**Ontologies:**\n- Define vocabulary and relationships\n- Enable knowledge sharing and reuse\n\n**Reasoning Methods:**\n- Forward chaining (data-driven)\n- Backward chaining (goal-driven)\n- Resolution (proof by contradiction)",
        codeExample: `// Simple inference engine
class KnowledgeBase {
  private facts: Map<string, Set<string>> = new Map();
  private rules: Array<{
    if: { pred: string; arg: string }[];
    then: { pred: string; arg: string };
  }> = [];

  addFact(predicate: string, entity: string) {
    if (!this.facts.has(predicate)) this.facts.set(predicate, new Set());
    this.facts.get(predicate)!.add(entity);
  }

  addRule(ifParts: { pred: string; arg: string }[], thenPart: { pred: string; arg: string }) {
    this.rules.push({ if: ifParts, then: thenPart });
  }

  query(predicate: string, entity: string): boolean {
    return this.facts.get(predicate)?.has(entity) ?? false;
  }

  infer(): void {
    let changed = true;
    while (changed) {
      changed = false;
      for (const rule of this.rules) {
        const allMatch = rule.if.every(f => this.query(f.pred, f.arg));
        if (allMatch && !this.query(rule.then.pred, rule.then.arg)) {
          this.addFact(rule.then.pred, rule.then.arg);
          changed = true;
        }
      }
    }
  }
}

const kb = new KnowledgeBase();
kb.addFact("human", "socrates");
kb.addRule(
  [{ pred: "human", arg: "x" }],
  { pred: "mortal", arg: "x" }
);
kb.infer();
console.log("Socrates mortal?", kb.query("mortal", "socrates"));`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Planning & Decision Making",
        content: "**AI Planning** finds a sequence of actions to achieve a goal.\n\n**STRIPS Planning:**\n- Preconditions: What must be true\n- Effects: What changes after action\n- Goal: Desired state\n\n**Planning Algorithms:**\n- Forward search (state space)\n- Backward search (regression)\n- GraphPlan\n\n**Markov Decision Processes (MDPs):**\n- States, actions, transitions, rewards\n- Discount factor γ (0 to 1)\n- Optimal policy: π*(s) = argmax Σ P(s'|s,a)[R(s,a,s') + γV*(s')]\n\n**Reinforcement Learning:**\n- Q-learning: Model-free, learns Q-values\n- Deep RL: Neural networks approximate value/policy",
        codeExample: `// Simple STRIPS planner
class Action {
  name: string;
  preconditions: string[];
  effects: string[];

  constructor(name: string, pre: string[], eff: string[]) {
    this.name = name;
    this.preconditions = pre;
    this.effects = eff;
  }
}

function plan(
  state: string[], goal: string[], actions: Action[]
): string[] | null {
  if (goal.every(g => state.includes(g))) return [];

  for (const action of actions) {
    if (action.preconditions.every(p => state.includes(p))) {
      const newState = [
        ...state.filter(s => !action.effects.some(e => e === "-" + s)),
        ...action.effects.filter(e => !e.startsWith("-"))
      ];
      const subPlan = plan(newState, goal, actions);
      if (subPlan !== null) return [action.name, ...subPlan];
    }
  }
  return null;
}

const actions = [
  new Action("walk-to-door", ["at-lobby"], ["at-door"]),
  new Action("open-door", ["at-door", "door-closed"], ["door-open"]),
  new Action("enter", ["at-door", "door-open"], ["at-room"]),
];

const result = plan(["at-lobby", "door-closed"], ["at-room"], actions);
console.log("Plan:", result);`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Natural Language Processing",
        content: "**NLP** enables computers to understand and generate human language.\n\n**Tasks:**\n- Tokenization: Split text into tokens\n- POS Tagging: Assign parts of speech\n- Named Entity Recognition (NER)\n- Sentiment Analysis\n- Machine Translation\n- Question Answering\n\n**Approaches:**\n- Rule-based: Hand-crafted grammar rules\n- Statistical: n-grams, HMMs, CRFs\n- Neural: RNNs, LSTMs, Transformers\n\n**Transformer Architecture:**\n- Self-attention mechanism\n- Multi-head attention\n- Positional encoding\n- Encoder-decoder structure\n\n**Modern NLP:**\n- BERT: Bidirectional encoder\n- GPT: Autoregressive decoder",
        codeExample: `// Simple NLP utilities
class NLP {
  static tokenize(text: string): string[] {
    return text.toLowerCase().match(/\\w+/g) || [];
  }

  static bagOfWords(documents: string[]): Map<string, number>[] {
    const vocab = new Set<string>();
    const tokenized = documents.map(d => this.tokenize(d));
    tokenized.forEach(tokens => tokens.forEach(t => vocab.add(t)));
    const vocabArr = Array.from(vocab);
    return tokenized.map(tokens => {
      const bag = new Map<string, number>();
      vocabArr.forEach(v => bag.set(v, 0));
      tokens.forEach(t => bag.set(t, (bag.get(t) || 0) + 1));
      return bag;
    });
  }

  static sentiment(text: string): { positive: number; negative: number } {
    const positive = ["good", "great", "love", "excellent", "amazing"];
    const negative = ["bad", "terrible", "hate", "awful", "horrible"];
    const tokens = this.tokenize(text);
    let pos = 0, neg = 0;
    tokens.forEach(t => {
      if (positive.includes(t)) pos++;
      if (negative.includes(t)) neg++;
    });
    const total = pos + neg || 1;
    return { positive: pos / total, negative: neg / total };
  }
}

const text = "I love this amazing product, it is great!";
console.log("Tokens:", NLP.tokenize(text));
console.log("Sentiment:", NLP.sentiment(text));`,
        language: "typescript"
      },
      {
        id: "5",
        title: "Machine Learning in AI",
        content: "ML is the core of modern AI — systems that learn from data.\n\n**Supervised Learning:**\n- Classification: Decision trees, SVM, Neural networks\n- Regression: Linear, Polynomial, Ridge\n\n**Unsupervised Learning:**\n- Clustering: K-means, DBSCAN, Hierarchical\n- Dimensionality Reduction: PCA, t-SNE\n\n**Neural Networks:**\n- Perceptron → Multi-layer → Deep Learning\n- Activation functions: ReLU, Sigmoid, Tanh\n- Backpropagation: Gradient descent for weight updates\n\n**Evaluation:**\n- Accuracy, Precision, Recall, F1-score\n- ROC curve, AUC\n- Cross-validation\n\n**Regularization:**\n- L1 (Lasso): Feature selection\n- L2 (Ridge): Weight shrinkage\n- Dropout: Random neuron removal",
        codeExample: `// Simple neural network
class NeuralNetwork {
  private weights: number[][][] = [];
  private biases: number[][] = [];

  constructor(layers: number[]) {
    for (let i = 0; i < layers.length - 1; i++) {
      this.weights.push(
        Array(layers[i]).fill(0).map(() =>
          Array(layers[i + 1]).fill(0).map(() => Math.random() - 0.5)
        )
      );
      this.biases.push(Array(layers[i + 1]).fill(0).map(() => Math.random() - 0.5));
    }
  }

  private sigmoid(x: number) { return 1 / (1 + Math.exp(-x)); }

  forward(input: number[]): number[] {
    let output = input;
    for (let l = 0; l < this.weights.length; l++) {
      output = output.map((_, j) => {
        const sum = output.reduce((s, val, i) => s + val * this.weights[l][i][j], 0);
        return this.sigmoid(sum + this.biases[l][j]);
      });
    }
    return output;
  }
}

const nn = new NeuralNetwork([2, 4, 1]);
console.log("Output:", nn.forward([0.5, 0.3]).map(x => x.toFixed(3)));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "ai1", question: "A* search is optimal when the heuristic is:", options: ["Consistent", "Admissible", "Complete", "Both A and B"], correctIndex: 3, explanation: "A* is optimal when h(n) is admissible and consistent.", difficulty: "medium", chapter: "Search" },
      { id: "ai2", question: "In FOL, ∀ means:", options: ["There exists", "For all", "Not", "Implies"], correctIndex: 1, explanation: "∀ is the universal quantifier meaning 'for all'.", difficulty: "easy", chapter: "Knowledge" },
      { id: "ai3", question: "Backward chaining advantage:", options: ["Faster", "Only explores relevant rules", "Uses less memory", "No knowledge base needed"], correctIndex: 1, explanation: "Backward chaining only explores rules that could lead to the goal.", difficulty: "medium", chapter: "Planning" },
      { id: "ai4", question: "Transformers use which mechanism?", options: ["Recurrent loops", "Self-attention", "Convolution", "Max pooling"], correctIndex: 1, explanation: "Transformers use self-attention to weigh input importance.", difficulty: "easy", chapter: "NLP" },
      { id: "ai5", question: "Overfitting means:", options: ["Model is too simple", "Good on training, poor on test", "Can't learn", "High bias"], correctIndex: 1, explanation: "Overfitting: model learns noise, performs well on training but poorly on unseen data.", difficulty: "easy", chapter: "ML" },
      { id: "ai6", question: "Backpropagation computes:", options: ["Initialize weights", "Gradients for weight updates", "Select features", "Split data"], correctIndex: 1, explanation: "Backpropagation computes gradients using the chain rule.", difficulty: "medium", chapter: "ML" },
      { id: "ai7", question: "Dropout prevents:", options: ["Speed issues", "Overfitting", "Underfitting", "Memory leaks"], correctIndex: 1, explanation: "Dropout randomly deactivates neurons to prevent overfitting.", difficulty: "easy", chapter: "ML" }
    ]
  },
  {
    slug: "machine-learning",
    title: "Machine Learning (ML)",
    description: "Learn supervised and unsupervised learning, neural networks, and model evaluation.",
    icon: "🧠",
    notesUrl: "https://noteslink.in/product/machine-learning-notes-kiit/",
    color: "from-sky-500 to-indigo-600",
    lessons: [
      {
        id: "1",
        title: "Supervised Learning: Classification",
        content: "**Classification** predicts discrete labels.\n\n**Algorithms:**\n\n**1. K-Nearest Neighbors (KNN):**\n- Classify by majority vote of k nearest points\n- Distance metrics: Euclidean, Manhattan\n- Simple but slow: O(n)\n\n**2. Decision Trees:**\n- Split data on feature thresholds\n- Information gain / Gini impurity\n- Prone to overfitting → Random Forest\n\n**3. Support Vector Machine (SVM):**\n- Find maximum margin hyperplane\n- Kernel trick for non-linear\n\n**4. Logistic Regression:**\n- sigmoid(z) = 1 / (1 + e⁻ᶻ)\n- Outputs probability [0,1]",
        codeExample: `// KNN classifier
class KNN {
  private data: { point: number[]; label: string }[] = [];

  train(points: number[][], labels: string[]) {
    this.data = points.map((p, i) => ({ point: p, label: labels[i] }));
  }

  private distance(a: number[], b: number[]): number {
    return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
  }

  predict(point: number[], k: number = 3): string {
    const sorted = [...this.data]
      .map(d => ({ ...d, dist: this.distance(point, d.point) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, k);
    const votes = new Map<string, number>();
    sorted.forEach(d => votes.set(d.label, (votes.get(d.label) || 0) + 1));
    return [...votes.entries()].sort((a, b) => b[1] - a[1])[0][0];
  }
}

const knn = new KNN();
knn.train([[1,2],[2,3],[3,1],[6,5],[7,7],[8,6]], ["A","A","A","B","B","B"]);
console.log("Predict [2,4]:", knn.predict([2,4]));
console.log("Predict [7,6]:", knn.predict([7,6]));`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Supervised Learning: Regression",
        content: "**Regression** predicts continuous values.\n\n**Linear Regression:**\n- y = β₀ + β₁x₁ + ... + βₙxₙ\n- Minimize MSE: (1/n)Σ(yᵢ - ŷᵢ)²\n\n**Ridge (L2) & Lasso (L1):**\n- Ridge: Adds λΣβᵢ² penalty\n- Lasso: Adds λΣ|βᵢ| penalty → can zero out features\n\n**Polynomial Regression:**\n- y = β₀ + β₁x + β₂x² + ...\n\n**Gradient Descent:**\n- Batch: Use all data\n- Stochastic (SGD): Use one sample\n- Mini-batch: Use subset",
        codeExample: `// Linear regression with gradient descent
class LinearRegression {
  private weights: number[] = [];
  private bias = 0;
  private lr: number;

  constructor(lr = 0.01) { this.lr = lr; }

  fit(X: number[][], y: number[], epochs = 1000) {
    const n = X.length;
    const d = X[0].length;
    this.weights = Array(d).fill(0);
    this.bias = 0;

    for (let e = 0; e < epochs; e++) {
      for (let i = 0; i < n; i++) {
        const pred = X[i].reduce((s, x, j) => s + x * this.weights[j], this.bias);
        const error = pred - y[i];
        for (let j = 0; j < d; j++) {
          this.weights[j] -= this.lr * error * X[i][j];
        }
        this.bias -= this.lr * error;
      }
    }
  }

  predict(X: number[][]): number[] {
    return X.map(x => x.reduce((s, v, j) => s + v * this.weights[j], this.bias));
  }
}

const lr = new LinearRegression(0.01);
lr.fit([[1],[2],[3],[4],[5]], [2,4,5,4,5], 1000);
console.log("Predict [6]:", lr.predict([[6]]));`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Unsupervised Learning",
        content: "**Clustering** groups similar data points.\n\n**K-Means:**\n1. Initialize k centroids randomly\n2. Assign points to nearest centroid\n3. Update centroids as cluster means\n4. Repeat until convergence\n\n**DBSCAN:**\n- Density-based clustering\n- Parameters: ε, minPts\n- Handles arbitrary shapes and noise\n\n**Dimensionality Reduction:**\n- **PCA**: Find directions of maximum variance\n- **t-SNE**: Non-linear, preserves local structure\n- **UMAP**: Faster alternative to t-SNE",
        codeExample: `// K-Means clustering
class KMeans {
  private centroids: number[][] = [];

  fit(data: number[][], k: number, maxIter = 100) {
    this.centroids = [data[Math.floor(Math.random() * data.length)]];
    for (let i = 1; i < k; i++) {
      const dists = data.map(p =>
        Math.min(...this.centroids.map(c =>
          Math.sqrt(p.reduce((s, v, j) => s + (v - c[j]) ** 2, 0))
        ))
      );
      const total = dists.reduce((s, d) => s + d, 0);
      let r = Math.random() * total;
      for (let j = 0; j < data.length; j++) {
        r -= dists[j];
        if (r <= 0) { this.centroids.push([...data[j]]); break; }
      }
    }

    for (let iter = 0; iter < maxIter; iter++) {
      const labels = data.map(p =>
        this.centroids.reduce((best, c, i) => {
          const dist = Math.sqrt(p.reduce((s, v, j) => s + (v - c[j]) ** 2, 0));
          return dist < best.dist ? { idx: i, dist } : best;
        }, { idx: 0, dist: Infinity }).idx
      );
      for (let i = 0; i < k; i++) {
        const members = data.filter((_, j) => labels[j] === i);
        if (members.length) {
          this.centroids[i] = members[0].map((_, j) =>
            members.reduce((s, m) => s + m[j], 0) / members.length
          );
        }
      }
    }
  }

  predict(point: number[]): number {
    return this.centroids.reduce((best, c, i) => {
      const dist = Math.sqrt(point.reduce((s, v, j) => s + (v - c[j]) ** 2, 0));
      return dist < best.dist ? { idx: i, dist } : best;
    }, { idx: 0, dist: Infinity }).idx;
  }
}

const km = new KMeans();
km.fit([[1,2],[2,1],[8,7],[9,8]], 2);
console.log("Cluster [1,2]:", km.predict([1,2]));
console.log("Cluster [9,8]:", km.predict([9,8]));`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Neural Networks & Deep Learning",
        content: "**Neural Network Structure:**\n- Input layer → Hidden layers → Output layer\n- Each neuron: z = Σ(wᵢxᵢ) + b, a = f(z)\n\n**Activation Functions:**\n- Sigmoid: σ(z) = 1/(1+e⁻ᶻ)\n- Tanh: outputs (-1,1)\n- ReLU: max(0, z) — most common\n\n**Training:**\n1. Forward pass: compute predictions\n2. Compute loss\n3. Backward pass (backpropagation)\n4. Update weights: w = w - α · ∂L/∂w\n\n**Architectures:**\n- **CNN**: Convolutional layers for images\n- **RNN/LSTM**: Recurrent layers for sequences\n- **Transformer**: Self-attention, parallelizable\n\n**Optimization:**\n- SGD with momentum\n- Adam: adaptive learning rates",
        codeExample: `// Neural network with backpropagation
class NeuralNet {
  private w1: number[][] = [];
  private b1: number[] = [];
  private w2: number[][] = [];
  private b2: number[] = [];
  private lr: number;

  constructor(inputSize: number, hiddenSize: number, outputSize: number, lr = 0.1) {
    this.lr = lr;
    this.w1 = Array(inputSize).fill(0).map(() =>
      Array(hiddenSize).fill(0).map(() => Math.random() - 0.5));
    this.b1 = Array(hiddenSize).fill(0);
    this.w2 = Array(hiddenSize).fill(0).map(() =>
      Array(outputSize).fill(0).map(() => Math.random() - 0.5));
    this.b2 = Array(outputSize).fill(0);
  }

  private sigmoid(x: number) { return 1 / (1 + Math.exp(-x)); }
  private sigmoidDeriv(x: number) { return x * (1 - x); }

  train(input: number[], target: number[], epochs = 1000) {
    for (let e = 0; e < epochs; e++) {
      const hidden = this.w1[0].map((_, j) =>
        this.sigmoid(input.reduce((s, x, i) => s + x * this.w1[i][j], this.b1[j])));
      const output = hidden.map((_, j) =>
        this.sigmoid(hidden.reduce((s, h, i) => s + h * this.w2[i][j], this.b2[j])));
      const outputDelta = output.map((o, i) => (o - target[i]) * this.sigmoidDeriv(o));
      const hiddenDelta = hidden.map((h, i) =>
        outputDelta.reduce((s, d, j) => s + d * this.w2[i][j], 0) * this.sigmoidDeriv(h));
      for (let i = 0; i < hidden.length; i++)
        for (let j = 0; j < output.length; j++)
          this.w2[i][j] -= this.lr * outputDelta[j] * hidden[i];
      for (let i = 0; i < input.length; i++)
        for (let j = 0; j < hidden.length; j++)
          this.w1[i][j] -= this.lr * hiddenDelta[j] * input[i];
    }
  }

  predict(input: number[]): number[] {
    const hidden = this.w1[0].map((_, j) =>
      this.sigmoid(input.reduce((s, x, i) => s + x * this.w1[i][j], this.b1[j])));
    return hidden.map((_, j) =>
      this.sigmoid(hidden.reduce((s, h, i) => s + h * this.w2[i][j], this.b2[j])));
  }
}

const nn = new NeuralNet(2, 4, 1, 0.5);
const xorData = [[[0,0],[0]],[[0,1],[1]],[[1,0],[1]],[[1,1],[0]]];
xorData.forEach(([x, y]) => nn.train(x as number[], y as number[], 5000));
xorData.forEach(([x, y]) =>
  console.log(\`\${x} → \${nn.predict(x as number[]).map(v => v.toFixed(2))}\`));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "ml1", question: "KNN main issue:", options: ["Cannot handle non-linear", "Slow prediction O(n)", "Requires labels", "Both B and C"], correctIndex: 1, explanation: "KNN must compare against all training data at prediction time.", difficulty: "medium", chapter: "Classification" },
      { id: "ml2", question: "Lasso regression adds which penalty?", options: ["L2", "L1 (absolute weights)", "L3", "No penalty"], correctIndex: 1, explanation: "Lasso uses L1 penalty, which can drive coefficients to zero.", difficulty: "medium", chapter: "Regression" },
      { id: "ml3", question: "K-means minimizes:", options: ["Between-cluster variance", "Within-cluster sum of squares", "Between-cluster distance", "Silhouette score"], correctIndex: 1, explanation: "K-means minimizes within-cluster sum of squares (WCSS).", difficulty: "medium", chapter: "Unsupervised" },
      { id: "ml4", question: "ReLU is defined as:", options: ["1/(1+e⁻ˣ)", "max(0, x)", "tanh(x)", "x²"], correctIndex: 1, explanation: "ReLU outputs max(0, x).", difficulty: "easy", chapter: "Neural Networks" },
      { id: "ml5", question: "Backpropagation computes:", options: ["Forward pass", "Gradients of loss w.r.t. weights", "Updated weights", "Accuracy"], correctIndex: 1, explanation: "Backpropagation computes gradients using the chain rule.", difficulty: "medium", chapter: "Neural Networks" },
      { id: "ml6", question: "Adam optimizer uses:", options: ["Batch GD", "SGD", "Adaptive learning rates", "Second-order"], correctIndex: 2, explanation: "Adam adapts learning rates using first and second moment estimates.", difficulty: "medium", chapter: "Optimization" },
      { id: "ml7", question: "Cross-validation evaluates:", options: ["Training speed", "Model generalization", "Overfitting", "Both B and C"], correctIndex: 1, explanation: "Cross-validation estimates performance on unseen data.", difficulty: "easy", chapter: "Evaluation" },
      { id: "ml8", question: "CNN is most suitable for:", options: ["Tabular data", "Text data", "Image data", "Time series only"], correctIndex: 2, explanation: "CNNs capture spatial patterns, ideal for images.", difficulty: "easy", chapter: "Deep Learning" }
    ]
  },
  {
    slug: "compiler-design",
    title: "Compiler Design (CD)",
    description: "Learn lexical analysis, parsing, semantic analysis, code optimization, and generation.",
    icon: "⚙️",
    notesUrl: "https://noteslink.in/product/compiler-design-kiit/",
    color: "from-teal-500 to-emerald-600",
    lessons: [
      {
        id: "1",
        title: "Lexical Analysis",
        content: "**Lexical Analyzer (Lexer/Scanner):**\n- Converts source code into tokens\n- Removes whitespace and comments\n- Handles string/number literals\n- Reports lexical errors\n\n**Token Types:**\n- Keywords: if, else, while, int\n- Identifiers: variable names\n- Literals: 42, 3.14, \"hello\"\n- Operators: +, -, *, /, ==\n- Delimiters: (, ), {, }, ;\n\n**Regular Expressions → DFA:**\n1. Regex → NFA (Thompson's construction)\n2. NFA → DFA (subset construction)\n3. DFA → Minimized DFA\n\n**Tools:**\n- Lex/Flex: Lexical analyzer generators",
        codeExample: `// Simple lexer
type TokenType = "NUMBER" | "PLUS" | "MINUS" | "MULT" | "DIV" | "LPAREN" | "RPAREN" | "EOF";

interface Token { type: TokenType; value: string; }

class Lexer {
  private tokens: Token[] = [];
  private pos = 0;

  constructor(private input: string) {}

  tokenize(): Token[] {
    while (this.pos < this.input.length) {
      const ch = this.input[this.pos];
      if (/\\s/.test(ch)) { this.pos++; continue; }
      if (/\\d/.test(ch)) {
        let num = "";
        while (this.pos < this.input.length && /[\\d.]/.test(this.input[this.pos])) {
          num += this.input[this.pos++];
        }
        this.tokens.push({ type: "NUMBER", value: num });
      } else {
        const charMap: Record<string, TokenType> = {
          "+": "PLUS", "-": "MINUS", "*": "MULT",
          "/": "DIV", "(": "LPAREN", ")": "RPAREN"
        };
        if (charMap[ch]) {
          this.tokens.push({ type: charMap[ch], value: ch });
        }
        this.pos++;
      }
    }
    this.tokens.push({ type: "EOF", value: "" });
    return this.tokens;
  }
}

const lexer = new Lexer("3 + 4 * (2 - 1)");
console.log(lexer.tokenize());`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Parsing & Syntax Analysis",
        content: "**Parser:** Checks token sequence against grammar, builds parse tree.\n\n**Grammar Types (Chomsky Hierarchy):**\n- Type 0: Unrestricted\n- Type 1: Context-sensitive\n- Type 2: Context-free (CFG) — used in parsing\n- Type 3: Regular\n\n**Parsing Methods:**\n\n**Top-Down:**\n- Recursive Descent: Each non-terminal → function\n- LL(1): Lookahead 1 token\n\n**Bottom-Up:**\n- Shift-Reduce: Shift tokens, reduce by productions\n- LR(0), SLR, LR(1), LALR\n\n**Conflicts:**\n- Shift-reduce: Can shift or reduce\n- Reduce-reduce: Can reduce by two productions\n\n**Tools:**\n- Yacc/Bison: Bottom-up parser generators\n- ANTLR: Top-down parser generator",
        codeExample: `// Recursive descent parser
class Parser {
  private tokens: { type: string; value: string }[];
  private pos = 0;

  constructor(tokens: { type: string; value: string }[]) {
    this.tokens = tokens;
  }

  private peek() { return this.tokens[this.pos]; }
  private consume() { return this.tokens[this.pos++]; }

  parseExpr(): number {
    let left = this.parseTerm();
    while (this.peek()?.type === "PLUS") {
      this.consume();
      left += this.parseTerm();
    }
    return left;
  }

  parseTerm(): number {
    let left = this.parseFactor();
    while (this.peek()?.type === "MULT") {
      this.consume();
      left *= this.parseFactor();
    }
    return left;
  }

  parseFactor(): number {
    if (this.peek()?.type === "LPAREN") {
      this.consume();
      const val = this.parseExpr();
      this.consume();
      return val;
    }
    return parseFloat(this.consume().value);
  }
}

const tokens = [
  { type: "NUMBER", value: "3" }, { type: "PLUS", value: "+" },
  { type: "NUMBER", value: "4" }, { type: "MULT", value: "*" },
  { type: "LPAREN", value: "(" }, { type: "NUMBER", value: "2" },
  { type: "MINUS", value: "-" }, { type: "NUMBER", value: "1" },
  { type: "RPAREN", value: ")" }
];
const parser = new Parser(tokens);
console.log("Result:", parser.parseExpr());`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Semantic Analysis & Type Checking",
        content: "**Semantic Analysis** verifies program meaning beyond syntax.\n\n**Key Tasks:**\n- Type checking\n- Scope resolution\n- Symbol table management\n- Control flow analysis\n\n**Symbol Table:**\n- Stores: name, type, scope, location\n- Nested scopes: block-structured languages\n- Lookup: inner scope hides outer\n\n**Type Systems:**\n- Static vs Dynamic typing\n- Strong vs Weak typing\n- Type inference: Deduce types automatically\n\n**Three-Address Code (TAC):**\n- t1 = a + b\n- t2 = t1 * c\n- if t2 > 0 goto L1",
        codeExample: `// Simple type checker
class SymbolTable {
  private scopes: Map<string, Map<string, string>>[] = [new Map()];

  pushScope() { this.scopes.push(new Map()); }
  popScope() { this.scopes.pop(); }

  declare(name: string, type: string): boolean {
    const current = this.scopes[this.scopes.length - 1];
    if (current.has(name)) return false;
    current.set(name, type);
    return true;
  }

  lookup(name: string): string | null {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      const type = this.scopes[i].get(name);
      if (type) return type;
    }
    return null;
  }
}

class TypeChecker {
  private table = new SymbolTable();

  checkBinaryOp(op: string, left: string, right: string): string {
    if (left !== "number" || right !== "number") {
      throw new TypeError(\`Cannot apply \${op} to \${left} and \${right}\`);
    }
    return "number";
  }

  checkAssignment(name: string, valueType: string): boolean {
    const declaredType = this.table.lookup(name);
    if (!declaredType) throw new Error(\`\${name} not declared\`);
    if (declaredType !== valueType) throw new TypeError(\`Type mismatch\`);
    return true;
  }
}

const checker = new TypeChecker();
console.log("int + int:", checker.checkBinaryOp("+", "number", "number"));`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Code Optimization & Generation",
        content: "**Code Optimization** improves intermediate code without changing output.\n\n**Optimization Techniques:**\n- **Constant folding**: 3 * 4 → 12\n- **Constant propagation**: x = 5; y = x + 1 → y = 6\n- **Dead code elimination**: Remove unused code\n- **Common subexpression elimination**: Reuse computed values\n- **Loop optimizations**: Invariant code motion, unrolling\n- **Strength reduction**: x * 2 → x << 1\n\n**Code Generation:**\n- Target machine: Registers, instructions\n- Register allocation: Graph coloring\n- Instruction selection: Tree matching\n- Peephole optimization: Local improvements",
        codeExample: `// Simple optimizer passes
class Optimizer {
  static foldConstants(code: string[]): string[] {
    return code.map(line => {
      const match = line.match(/(\\w+)\\s*=\\s*(\\d+)\\s*\\+\\s*(\\d+)/);
      if (match) {
        const result = parseInt(match[2]) + parseInt(match[3]);
        return \`\${match[1]} = \${result}\`;
      }
      return line;
    });
  }

  static removeDeadCode(code: string[], usedVars: Set<string>): string[] {
    return code.filter(line => {
      const assigned = line.split("=")[0]?.trim();
      return !assigned || usedVars.has(assigned);
    });
  }

  static strengthReduce(code: string[]): string[] {
    return code.map(line => {
      return line.replace(/\\*\\s*2/g, "<< 1")
                .replace(/\\/\\s*2/g, ">> 1");
    });
  }
}

const code = [
  "x = 3 + 4",
  "y = x * 2",
  "z = unused + 1"
];

console.log("Folded:", Optimizer.foldConstants(code));
console.log("Reduced:", Optimizer.strengthReduce(code));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "cd1", question: "Primary role of lexical analyzer:", options: ["Parse grammar", "Convert source to tokens", "Check types", "Generate machine code"], correctIndex: 1, explanation: "The lexer reads characters and groups them into tokens.", difficulty: "easy", chapter: "Lexical Analysis" },
      { id: "cd2", question: "Which parser is more powerful?", options: ["Top-down (LL)", "Bottom-up (LR)", "Both equal", "Neither"], correctIndex: 1, explanation: "Bottom-up parsers handle a larger class of grammars.", difficulty: "medium", chapter: "Parsing" },
      { id: "cd3", question: "Shift-reduce conflict occurs when:", options: ["Grammar is ambiguous", "Parser can shift or reduce", "Two reductions possible", "Token unknown"], correctIndex: 1, explanation: "The parser chooses between shifting or reducing.", difficulty: "medium", chapter: "Parsing" },
      { id: "cd4", question: "Constant folding:", options: ["Remove unused constants", "Evaluate constant expressions at compile time", "Replace variables", "Store in registers"], correctIndex: 1, explanation: "Evaluates expressions like 3*4 at compile time.", difficulty: "easy", chapter: "Optimization" },
      { id: "cd5", question: "Three-Address Code is:", options: ["Machine code", "Intermediate representation", "Regex type", "Parsing algorithm"], correctIndex: 1, explanation: "TAC is an intermediate representation with ≤3 operands per instruction.", difficulty: "easy", chapter: "Code Generation" },
      { id: "cd6", question: "Scope resolution is part of:", options: ["Lexical analysis", "Syntax analysis", "Semantic analysis", "Code generation"], correctIndex: 2, explanation: "Scope resolution is a semantic analysis task.", difficulty: "medium", chapter: "Semantic Analysis" },
      { id: "cd7", question: "Dead code elimination removes:", options: ["Comments", "Unreachable code", "Variables", "Functions"], correctIndex: 1, explanation: "Removes statements that can never be executed.", difficulty: "easy", chapter: "Optimization" }
    ]
  },
  {
    slug: "software-engineering",
    title: "Software Engineering (SE)",
    description: "Master SDLC, requirements engineering, design patterns, testing, and agile.",
    icon: "🛠️",
    notesUrl: "https://noteslink.in/product/se-software-engineering-kiit/",
    color: "from-orange-500 to-red-600",
    lessons: [
      {
        id: "1",
        title: "Software Development Life Cycle",
        content: "**SDLC** is a structured process for building software.\n\n**Models:**\n\n**1. Waterfall:**\nRequirements → Design → Implementation → Testing → Maintenance\n- Sequential, document-driven\n- Good for well-understood requirements\n\n**2. V-Model:**\n- Each phase has a corresponding test phase\n\n**3. Spiral Model:**\n- Risk-driven, iterative\n\n**4. Agile:**\n- Iterative, incremental\n- Respond to change over following plan\n- Working software over comprehensive documentation\n\n**Agile Frameworks:**\n- Scrum: Sprints, roles (PO, SM, Dev Team)\n- Kanban: Visual workflow, WIP limits\n- XP: Pair programming, TDD, CI",
        codeExample: `// Sprint backlog simulation
interface Task {
  id: string;
  title: string;
  storyPoints: number;
  status: "todo" | "in-progress" | "done";
}

class Sprint {
  private tasks: Task[] = [];
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  addTask(task: Task): boolean {
    const totalPoints = this.tasks.reduce((s, t) => s + t.storyPoints, 0);
    if (totalPoints + task.storyPoints > this.capacity) return false;
    this.tasks.push(task);
    return true;
  }

  getProgress() {
    const done = this.tasks.filter(t => t.status === "done").length;
    const inProgress = this.tasks.filter(t => t.status === "in-progress").length;
    return { total: this.tasks.length, done, inProgress, remaining: this.tasks.length - done - inProgress };
  }
}

const sprint = new Sprint(40);
sprint.addTask({ id: "S1", title: "Auth API", storyPoints: 8, status: "done" });
sprint.addTask({ id: "S2", title: "Dashboard UI", storyPoints: 13, status: "in-progress" });
console.log("Progress:", sprint.getProgress());`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Requirements Engineering",
        content: "**Requirements Engineering** captures what the system should do.\n\n**Types:**\n- **Functional**: What the system does\n- **Non-Functional**: Quality attributes\n  - Performance, security, usability, scalability\n\n**Elicitation Techniques:**\n- Interviews, Surveys, Workshops, Observation, Prototyping\n\n**Requirements Specification:**\n- SRS (Software Requirements Specification)\n- User stories: As a [role], I want [feature] so that [benefit]\n- Use cases: Actors, scenarios, pre/post conditions\n\n**Prioritization:**\n- MoSCoW: Must, Should, Could, Won't\n- Kano model: Basic, Performance, Excitement\n\n**Traceability:**\n- Track requirements from origin to implementation",
        codeExample: `// User story tracking
class UserStory {
  constructor(
    public id: string,
    public role: string,
    public feature: string,
    public benefit: string,
    public priority: "must" | "should" | "could" | "wont",
    public points: number
  ) {}

  toMarkdown(): string {
    return \`As a \${this.role}, I want \${this.feature} so that \${this.benefit}\`;
  }
}

class ProductBacklog {
  private stories: UserStory[] = [];

  add(story: UserStory) { this.stories.push(story); }

  prioritize(): UserStory[] {
    const order = { must: 0, should: 1, could: 2, wont: 3 };
    return [...this.stories].sort((a, b) =>
      order[a.priority] - order[b.priority] || a.points - b.points
    );
  }

  getSprintReady(maxPoints: number): UserStory[] {
    const sorted = this.prioritize();
    let total = 0;
    return sorted.filter(s => { total += s.points; return total <= maxPoints; });
  }
}

const backlog = new ProductBacklog();
backlog.add(new UserStory("US-1", "user", "login with email", "access my account", "must", 5));
backlog.add(new UserStory("US-2", "admin", "view analytics", "track usage", "should", 8));
console.log("Sprint ready:", backlog.getSprintReady(10).map(s => s.id));`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Design Patterns",
        content: "**Design Patterns** are reusable solutions to common problems.\n\n**Creational:**\n- **Singleton**: Only one instance exists\n- **Factory**: Create objects without specifying class\n- **Builder**: Construct complex objects step by step\n\n**Structural:**\n- **Adapter**: Interface compatibility\n- **Decorator**: Add behavior dynamically\n- **Facade**: Simplified interface to complex subsystem\n\n**Behavioral:**\n- **Observer**: Event notification system\n- **Strategy**: Interchangeable algorithms\n- **Command**: Encapsulate requests as objects\n\n**SOLID Principles:**\n- **S**ingle Responsibility\n- **O**pen/Closed\n- **L**iskov Substitution\n- **I**nterface Segregation\n- **D**ependency Inversion",
        codeExample: `// Observer Pattern
class EventEmitter {
  private listeners: Map<string, Function[]> = new Map();

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event)!.push(callback);
  }

  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach(cb => cb(...args));
  }
}

// Strategy Pattern
class Sorter {
  private strategy: (arr: number[]) => number[];

  constructor(strategy: (arr: number[]) => number[]) {
    this.strategy = strategy;
  }

  setStrategy(strategy: (arr: number[]) => number[]) {
    this.strategy = strategy;
  }

  sort(arr: number[]): number[] {
    return this.strategy(arr);
  }
}

const bubbleSort = (arr: number[]): number[] => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < a.length - i - 1; j++)
      if (a[j] > a[j + 1]) [a[j], a[j+1]] = [a[j+1], a[j]];
  return a;
};

const sorter = new Sorter(bubbleSort);
console.log("Sorted:", sorter.sort([5, 3, 8, 1]));`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Software Testing",
        content: "**Testing Levels:**\n1. **Unit Testing**: Test individual functions/classes\n2. **Integration Testing**: Test module interactions\n3. **System Testing**: Test complete system\n4. **Acceptance Testing**: Validate against requirements\n\n**Testing Types:**\n- **Black-box**: Test without knowing internals\n- **White-box**: Test based on code structure\n- **Regression**: Ensure changes don't break existing\n\n**Test Design Techniques:**\n- Equivalence partitioning\n- Boundary value analysis\n- Decision table testing\n\n**Test Coverage:**\n- Statement coverage\n- Branch coverage\n- Path coverage\n\n**Test-Driven Development (TDD):**\n1. Write failing test (Red)\n2. Write minimal code to pass (Green)\n3. Refactor (Blue)",
        codeExample: `// Simple test framework
class TestRunner {
  private tests: { name: string; fn: () => void; passed: boolean }[] = [];

  test(name: string, fn: () => void) {
    try {
      fn();
      this.tests.push({ name, fn, passed: true });
    } catch (e) {
      this.tests.push({ name, fn, passed: false });
    }
  }

  assertEqual(actual: any, expected: any, msg = "") {
    if (actual !== expected) throw new Error(\`\${msg}: \${actual} !== \${expected}\`);
  }

  assertDeepEqual(actual: any, expected: any, msg = "") {
    if (JSON.stringify(actual) !== JSON.stringify(expected))
      throw new Error(\`\${msg}: \${JSON.stringify(actual)} !== \${JSON.stringify(expected)}\`);
  }

  report() {
    const passed = this.tests.filter(t => t.passed).length;
    console.log(\`\${passed}/\${this.tests.length} tests passed\`);
    this.tests.filter(t => !t.passed).forEach(t => console.log(\`  FAIL: \${t.name}\`));
  }
}

const runner = new TestRunner();
runner.test("addition", () => runner.assertEqual(1 + 1, 2));
runner.test("array", () => runner.assertDeepEqual([1,2,3].map(x => x*2), [2,4,6]));
runner.report();`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "se1", question: "Best SDLC for well-understood requirements:", options: ["Agile", "Waterfall", "Spiral", "RAD"], correctIndex: 1, explanation: "Waterfall works best when requirements are clearly defined.", difficulty: "easy", chapter: "SDLC" },
      { id: "se2", question: "User stories follow which format?", options: ["Given-When-Then", "As a [role], I want [feature] so that [benefit]", "Precondition-Action-Postcondition", "Input-Process-Output"], correctIndex: 1, explanation: "User stories: 'As a [role], I want [feature] so that [benefit]'.", difficulty: "easy", chapter: "Requirements" },
      { id: "se3", question: "Singleton ensures:", options: ["One instance exists", "Efficient creation", "Simple interfaces", "Object observation"], correctIndex: 0, explanation: "Singleton guarantees exactly one instance.", difficulty: "easy", chapter: "Design Patterns" },
      { id: "se4", question: "TDD stands for:", options: ["Test-Driven Development", "Test Design Document", "Technical Design", "Test Data Definition"], correctIndex: 0, explanation: "Test-Driven Development: write tests first.", difficulty: "easy", chapter: "Testing" },
      { id: "se5", question: "Single Responsibility Principle:", options: ["Open/Closed", "One reason to change", "Liskov Substitution", "Interface Segregation"], correctIndex: 1, explanation: "A class should have only one job or reason to change.", difficulty: "easy", chapter: "Design Patterns" },
      { id: "se6", question: "Regression testing ensures:", options: ["New features work", "Existing functionality still works", "Code is optimized", "Docs updated"], correctIndex: 1, explanation: "Regression testing verifies existing functionality isn't broken.", difficulty: "easy", chapter: "Testing" }
    ]
  },
  {
    slug: "data-mining-warehousing",
    title: "Data Mining & Warehousing (DMDW)",
    description: "Learn ETL processes, OLAP, association rules, classification, and clustering.",
    icon: "⛏️",
    notesUrl: "https://noteslink.in/product/dmdw-data-mining-data-warehousing-kiit/",
    color: "from-yellow-500 to-amber-600",
    lessons: [
      {
        id: "1",
        title: "Data Warehousing Fundamentals",
        content: "**Data Warehouse:** A centralized repository of integrated data from multiple sources.\n\n**Characteristics (Inmon):**\n- Subject-oriented\n- Integrated\n- Non-volatile\n- Time-variant\n\n**Architecture:**\n- **OLTP** (Online Transaction Processing): Day-to-day operations\n- **OLAP** (Online Analytical Processing): Analysis and reporting\n- **ETL**: Extract, Transform, Load\n\n**Data Models:**\n- **Star Schema**: Fact table + dimension tables\n- **Snowflake Schema**: Normalized dimensions\n- **Galaxy Schema**: Multiple fact tables\n\n**Dimensions:**\n- Time, Product, Location, Customer\n- Slowly Changing Dimensions (SCD): Type 1, 2, 3",
        codeExample: `// Star schema simulation
class DataWarehouse {
  private facts: any[] = [];

  addFact(fact: any) {
    this.facts.push(fact);
  }

  olapQuery(dim: string, metric: string): any {
    const grouped = new Map<string, number>();
    this.facts.forEach(f => {
      const key = f[dim];
      grouped.set(key, (grouped.get(key) || 0) + f[metric]);
    });
    return Object.fromEntries(grouped);
  }
}

const dw = new DataWarehouse();
dw.addFact({ date: "2024-01", product: "A", region: "East", sales: 100 });
dw.addFact({ date: "2024-01", product: "B", region: "East", sales: 150 });
dw.addFact({ date: "2024-02", product: "A", region: "West", sales: 200 });
console.log("Sales by region:", dw.olapQuery("region", "sales"));`,
        language: "typescript"
      },
      {
        id: "2",
        title: "ETL Processes",
        content: "**ETL** moves data from source to warehouse.\n\n**Extract:**\n- Full extraction vs Incremental\n- Change Data Capture (CDC)\n\n**Transform:**\n- Data cleansing (remove duplicates, fix errors)\n- Data integration (merge schemas)\n- Data enrichment (add derived columns)\n- Aggregation\n\n**Load:**\n- Initial load vs Incremental load\n- Full refresh vs Slowly Changing Dimensions\n\n**Data Quality:**\n- Accuracy, Completeness, Consistency\n- Timeliness, Validity, Uniqueness\n\n**Data Marts:**\n- Subset of warehouse for specific department",
        codeExample: `// ETL pipeline simulation
class ETLPipeline {
  private extractors: Function[] = [];
  private transformers: Function[] = [];
  private loaders: Function[] = [];

  addExtract(fn: Function) { this.extractors.push(fn); }
  addTransform(fn: Function) { this.transformers.push(fn); }
  addLoad(fn: Function) { this.loaders.push(fn); }

  async run(): Promise<void> {
    console.log("Extracting...");
    let data = this.extractors.map(fn => fn()).flat();
    console.log(\`  Extracted \${data.length} records\`);

    console.log("Transforming...");
    for (const t of this.transformers) {
      data = data.map(t).filter(Boolean);
    }
    console.log(\`  Transformed to \${data.length} records\`);

    console.log("Loading...");
    this.loaders.forEach(fn => fn(data));
    console.log("  Done!");
  }
}

const pipeline = new ETLPipeline();
pipeline.addExtract(() => [
  { name: "Alice", age: 30, salary: 50000 },
  { name: "Bob", age: 25, salary: null },
  { name: "Charlie", age: 35, salary: 60000 },
]);
pipeline.addTransform((r: any) => r.salary ? { ...r, salary: r.salary * 1.1 } : null);
pipeline.addLoad((data: any[]) => console.log("Loaded:", data.length, "records"));
pipeline.run();`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Association Rule Mining",
        content: "**Association Rules** find interesting relationships in data.\n\n**Rule Format:** {A, B} → {C}\n- Support: P(A ∪ B ∪ C)\n- Confidence: P(C | A ∪ B)\n- Lift: Confidence / P(C)\n\n**Algorithms:**\n- **Apriori**: Generate frequent itemsets level by level\n  - Anti-monotone property: subsets of infrequent are infrequent\n- **FP-Growth**: Build FP-tree, mine patterns\n\n**Applications:**\n- Market basket analysis\n- Cross-selling\n- Recommendation systems\n- Medical diagnosis",
        codeExample: `// Simple Apriori implementation
function apriori(transactions: string[][], minSupport: number): Map<string, number> {
  const minCount = Math.ceil(transactions.length * minSupport);
  const itemCounts = new Map<string, number>();

  // Count individual items
  transactions.forEach(t => {
    t.forEach(item => {
      itemCounts.set(item, (itemCounts.get(item) || 0) + 1);
    });
  });

  // Filter by minimum support
  const frequent = new Map<string, number>();
  itemCounts.forEach((count, item) => {
    if (count >= minCount) frequent.set(item, count);
  });

  return frequent;
}

const transactions = [
  ["bread", "milk", "eggs"],
  ["bread", "butter"],
  ["milk", "butter", "eggs"],
  ["bread", "milk", "butter", "eggs"],
  ["bread", "milk"]
];

const result = apriori(transactions, 0.4);
console.log("Frequent items:", Object.fromEntries(result));`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Classification & Clustering",
        content: "**Classification** (supervised) predicts categorical labels.\n\n**Algorithms:**\n- Decision Tree (ID3, C4.5, CART)\n- Naive Bayes: P(class|features) ∝ P(features|class) × P(class)\n- k-NN: Instance-based learning\n- SVM: Maximum margin classifier\n\n**Clustering** (unsupervised) groups similar data.\n\n**Algorithms:**\n- K-Means: Minimize within-cluster variance\n- DBSCAN: Density-based, handles noise\n- Hierarchical: Agglomerative/Divisive\n\n**Evaluation:**\n- Accuracy, Precision, Recall, F1\n- Confusion matrix\n- Silhouette score (clustering)",
        codeExample: `// Naive Bayes classifier
class NaiveBayes {
  private classCounts = new Map<string, number>();
  private featureCounts = new Map<string, Map<string, number>>();
  private total = 0;

  train(data: { features: string[]; label: string }[]) {
    data.forEach(d => {
      this.total++;
      this.classCounts.set(d.label, (this.classCounts.get(d.label) || 0) + 1);
      if (!this.featureCounts.has(d.label)) {
        this.featureCounts.set(d.label, new Map());
      }
      const fc = this.featureCounts.get(d.label)!;
      d.features.forEach(f => fc.set(f, (fc.get(f) || 0) + 1));
    });
  }

  predict(features: string[]): string {
    let bestClass = "";
    let bestScore = -1;

    this.classCounts.forEach((count, cls) => {
      let score = count / this.total;
      const fc = this.featureCounts.get(cls)!;
      features.forEach(f => {
        score *= (fc.get(f) || 0) / count;
      });
      if (score > bestScore) {
        bestScore = score;
        bestClass = cls;
      }
    });

    return bestClass;
  }
}

const nb = new NaiveBayes();
nb.train([
  { features: ["sunny", "hot"], label: "no" },
  { features: ["sunny", "hot"], label: "no" },
  { features: ["overcast", "hot"], label: "yes" },
  { features: ["rainy", "mild"], label: "yes" },
]);
console.log("Predict:", nb.predict(["sunny", "hot"]));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "dmdw1", question: "Which schema has a fact table surrounded by dimension tables?", options: ["Snowflake", "Star", "Galaxy", "Flat"], correctIndex: 1, explanation: "Star schema has a central fact table with denormalized dimension tables.", difficulty: "easy", chapter: "Warehousing" },
      { id: "dmdw2", question: "ETL stands for:", options: ["Extract, Transform, Load", "Evaluate, Test, Launch", "Export, Transfer, List", "Encode, Transform, Load"], correctIndex: 0, explanation: "ETL = Extract, Transform, Load — the process of moving data to a warehouse.", difficulty: "easy", chapter: "ETL" },
      { id: "dmdw3", question: "Apriori algorithm finds:", options: ["Clusters", "Frequent itemsets", "Classification rules", "Regression models"], correctIndex: 1, explanation: "Apriori finds frequent itemsets using the anti-monotone property.", difficulty: "medium", chapter: "Association Rules" },
      { id: "dmdw4", question: "Support measures:", options: ["How often items appear together", "Confidence of a rule", "Lift of a rule", "Accuracy"], correctIndex: 0, explanation: "Support = P(A ∪ B ∪ C) — frequency of the itemset in all transactions.", difficulty: "easy", chapter: "Association Rules" },
      { id: "dmdw5", question: "Naive Bayes is based on:", options: ["Bayes' theorem", "Gradient descent", "Linear regression", "Decision trees"], correctIndex: 0, explanation: "Naive Bayes uses Bayes' theorem with the 'naive' independence assumption.", difficulty: "easy", chapter: "Classification" },
      { id: "dmdw6", question: "OLAP is used for:", options: ["Transaction processing", "Analytical processing", "Data extraction", "Data cleansing"], correctIndex: 1, explanation: "OLAP (Online Analytical Processing) supports complex analysis queries.", difficulty: "easy", chapter: "Warehousing" }
    ]
  },
  {
    slug: "distributed-os",
    title: "Distributed Operating Systems (DOS)",
    description: "Learn distributed systems concepts, consensus algorithms, replication, and MapReduce.",
    icon: "🌐",
    notesUrl: "https://noteslink.in/product/dos-distributed-operating-system-kiit/",
    color: "from-indigo-500 to-violet-600",
    lessons: [
      {
        id: "1",
        title: "Distributed Systems Concepts",
        content: "**Distributed System:** A collection of independent computers that appears as a single system.\n\n**Properties:**\n- Transparency (location, migration, replication)\n- Openness (standard interfaces)\n- Scalability\n- Fault tolerance\n\n**Models:**\n- Client-Server\n- Peer-to-Peer\n- Publish-Subscribe\n- Microservices\n\n**Challenges:**\n- Network partitions\n- Clock synchronization (NTP, Logical clocks)\n- Consistency vs Availability (CAP theorem)\n- Byzantine failures",
        codeExample: `// Logical clock simulation
class LogicalClock {
  private time = 0;

  increment() {
    this.time++;
    return this.time;
  }

  receive(senderTime: number) {
    this.time = Math.max(this.time, senderTime) + 1;
    return this.time;
  }

  get() { return this.time; }
}

const clock1 = new LogicalClock();
const clock2 = new LogicalClock();

console.log("Process 1 sends at:", clock1.increment());
console.log("Process 2 receives at:", clock2.receive(1));
console.log("Process 2 sends at:", clock2.increment());
console.log("Process 1 receives at:", clock1.receive(clock2.get()));`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Consensus Algorithms",
        content: "**Consensus:** Getting all nodes to agree on a value.\n\n**Paxos:**\n- Leader election\n- Proposal acceptance\n- Value learning\n- Fault-tolerant (minority failures)\n\n**Raft:**\n- More understandable than Paxos\n- Leader election\n- Log replication\n- Safety guarantees\n\n**Byzantine Fault Tolerance (BFT):**\n- Handles malicious nodes\n- Requires 3f+1 nodes for f faulty nodes\n\n**Applications:**\n- Distributed databases\n- Blockchain\n- Configuration management",
        codeExample: `// Simple Raft leader election
class RaftNode {
  private state: "follower" | "candidate" | "leader" = "follower";
  private currentTerm = 0;
  private votedFor: string | null = null;
  private id: string;

  constructor(id: string) { this.id = id; }

  startElection() {
    this.state = "candidate";
    this.currentTerm++;
    this.votedFor = this.id;
    console.log(\`Node \${this.id} started election for term \${this.currentTerm}\`);
    return { term: this.currentTerm, candidateId: this.id };
  }

  receiveVote(term: number, candidateId: string): boolean {
    if (term > this.currentTerm) {
      this.currentTerm = term;
      this.state = "follower";
      this.votedFor = candidateId;
      return true;
    }
    return false;
  }

  becomeLeader() {
    this.state = "leader";
    console.log(\`Node \${this.id} became leader for term \${this.currentTerm}\`);
  }
}

const node1 = new RaftNode("1");
const node2 = new RaftNode("2");
const node3 = new RaftNode("3");

const election = node1.startElection();
[node2, node3].forEach(n => n.receiveVote(election.term, election.candidateId));
node1.becomeLeader();`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Replication & Consistency",
        content: "**Replication** stores copies of data on multiple nodes.\n\n**Consistency Models:**\n- **Strong**: All replicas see same data at same time\n- **Eventual**: Replicas will eventually converge\n- **Causal**: Causally related operations seen in order\n\n**Protocols:**\n- **2PC** (Two-Phase Commit): Coordinator + participants\n- **3PC**: Adds pre-commit phase\n- **Paxos/Raft**: Leader-based replication\n\n**Quorum Systems:**\n- Read/Write quorums: R + W > N ensures consistency\n\n**Conflict Resolution:**\n- Last-Writer-Wins (LWW)\n- Vector clocks\n- CRDTs (Conflict-free Replicated Data Types)",
        codeExample: `// Quorum simulation
class ReplicatedStore {
  private replicas: Map<string, any>[] = [];
  private n: number;

  constructor(n: number) {
    this.n = n;
    for (let i = 0; i < n; i++) this.replicas.push(new Map());
  }

  write(key: string, value: any, quorum: number): boolean {
    let written = 0;
    for (let i = 0; i < this.n; i++) {
      this.replicas[i].set(key, value);
      written++;
    }
    return written >= quorum;
  }

  read(key: string, quorum: number): any {
    let reads = 0;
    for (let i = 0; i < this.n; i++) {
      if (this.replicas[i].has(key)) {
        reads++;
        if (reads >= quorum) return this.replicas[i].get(key);
      }
    }
    return null;
  }
}

const store = new ReplicatedStore(3);
store.write("x", 42, 2);
console.log("Read x:", store.read("x", 2));`,
        language: "typescript"
      },
      {
        id: "4",
        title: "MapReduce & Distributed Computing",
        content: "**MapReduce** is a programming model for processing large datasets.\n\n**Phases:**\n1. **Map**: Process input key-value pairs → intermediate pairs\n2. **Shuffle**: Group by key\n3. **Reduce**: Aggregate values for each key\n\n**Hadoop Ecosystem:**\n- HDFS: Distributed file system\n- YARN: Resource management\n- MapReduce: Processing engine\n- Hive: SQL-like queries\n- Pig: Scripting language\n\n**Spark:**\n- In-memory computing (10-100x faster)\n- RDDs, DataFrames, Datasets\n- MLlib, GraphX, Streaming\n\n**Applications:**\n- Log analysis\n- Web indexing\n- Machine learning at scale\n- Data warehousing",
        codeExample: `// MapReduce simulation
function mapReduce<T, K, V>(
  data: T[],
  map: (item: T) => [K, V][],
  reduce: (key: K, values: V[]) => any
): Map<K, any> {
  // Map phase
  const intermediate = new Map<K, V[]>();
  data.forEach(item => {
    map(item).forEach(([key, value]) => {
      if (!intermediate.has(key)) intermediate.set(key, []);
      intermediate.get(key)!.push(value);
    });
  });

  // Reduce phase
  const result = new Map<K, any>();
  intermediate.forEach((values, key) => {
    result.set(key, reduce(key, values));
  });

  return result;
}

// Word count example
const documents = [
  "hello world hello",
  "world hello world world",
  "hello hello hello"
];

const wordCount = mapReduce(
  documents,
  doc => doc.split(" ").map(w => [w, 1]),
  (_, values) => values.reduce((s, v) => s + v, 0)
);

console.log("Word count:", Object.fromEntries(wordCount));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "dos1", question: "CAP theorem states a distributed system can have at most:", options: ["1 of 3 properties", "2 of 3 properties", "All 3 properties", "None"], correctIndex: 1, explanation: "CAP: Consistency, Availability, Partition tolerance — only 2 can be guaranteed simultaneously.", difficulty: "medium", chapter: "Fundamentals" },
      { id: "dos2", question: "Raft is:", options: ["A consensus algorithm", "A replication protocol", "A file system", "A programming model"], correctIndex: 0, explanation: "Raft is a consensus algorithm designed to be more understandable than Paxos.", difficulty: "easy", chapter: "Consensus" },
      { id: "dos3", question: "Byzantine Fault Tolerance requires how many nodes for f faulty?", options: ["2f+1", "3f+1", "f+1", "4f"], correctIndex: 1, explanation: "BFT requires 3f+1 nodes to tolerate f Byzantine faults.", difficulty: "medium", chapter: "Consensus" },
      { id: "dos4", question: "Eventual consistency guarantees:", options: ["Immediate consistency", "Replicas will eventually converge", "No consistency", "Strong consistency"], correctIndex: 1, explanation: "Eventual consistency means replicas will converge to the same value over time.", difficulty: "easy", chapter: "Replication" },
      { id: "dos5", question: "MapReduce has which phases?", options: ["Map, Shuffle, Reduce", "Map, Sort, Reduce", "Map, Group, Reduce", "Map, Filter, Reduce"], correctIndex: 0, explanation: "MapReduce: Map → Shuffle (group by key) → Reduce.", difficulty: "easy", chapter: "MapReduce" },
      { id: "dos6", question: "Spark is faster than Hadoop because:", options: ["Better hardware", "In-memory computing", "More nodes", "Better language"], correctIndex: 1, explanation: "Spark uses in-memory computing, making it 10-100x faster for many workloads.", difficulty: "easy", chapter: "MapReduce" }
    ]
  },
  {
    slug: "hpc",
    title: "High Performance Computing (HPC)",
    description: "Learn parallel computing, GPU programming, MPI, OpenMP, and performance analysis.",
    icon: "🚀",
    notesUrl: "https://noteslink.in/product/hpc-high-performances-computing-notes-kiit/",
    color: "from-red-500 to-rose-600",
    lessons: [
      {
        id: "1",
        title: "Parallel Computing Fundamentals",
        content: "**Parallel Computing:** Using multiple processors simultaneously.\n\n**Types:**\n- **Instruction-level parallelism (ILP)**: Pipelining, superscalar\n- **Data-level parallelism (DLP)**: SIMD, vector processing\n- **Task-level parallelism (TLP)**: Multiple threads/processes\n\n**Architectures (Flynn's Taxonomy):**\n- SISD: Single instruction, single data\n- SIMD: Single instruction, multiple data\n- MISD: Multiple instruction, single data\n- MIMD: Multiple instruction, multiple data\n\n**Performance Metrics:**\n- Speedup: T₁/Tₚ\n- Efficiency: Speedup/p\n- Amdahl's Law: S = 1/((1-f) + f/p)\n- Gustafson's Law",
        codeExample: `// Parallel speedup calculation
function amdahlLaw(f: number, p: number): number {
  return 1 / ((1 - f) + f / p);
}

function gustafsonLaw(f: number, p: number): number {
  return p - f * (p - 1);
}

console.log("Amdahl (50% parallel, 4 cores):", amdahlLaw(0.5, 4).toFixed(2));
console.log("Amdahl (90% parallel, 4 cores):", amdahlLaw(0.9, 4).toFixed(2));
console.log("Gustafson (50% parallel, 4 cores):", gustafsonLaw(0.5, 4).toFixed(2));`,
        language: "typescript"
      },
      {
        id: "2",
        title: "MPI & Distributed Memory",
        content: "**MPI (Message Passing Interface):** Standard for distributed memory parallelism.\n\n**Key Operations:**\n- Point-to-point: Send, Receive\n- Collective: Broadcast, Reduce, Scatter, Gather\n- Synchronization: Barrier\n\n**Communication Patterns:**\n- Blocking vs Non-blocking\n- Synchronous vs Asynchronous\n- Collective vs Point-to-point\n\n**Topologies:**\n- Linear\n- 2D Grid\n- Torus\n- Hypercube\n\n**Best Practices:**\n- Minimize communication\n- Balance workload\n- Overlap computation and communication",
        codeExample: `// MPI simulation (simplified)
class MPIProcess {
  private rank: number;
  private size: number;
  private mailbox: Map<number, any[]> = new Map();

  constructor(rank: number, size: number) {
    this.rank = rank;
    this.size = size;
  }

  send(dest: number, data: any) {
    if (!this.mailbox.has(dest)) this.mailbox.set(dest, []);
    this.mailbox.get(dest)!.push({ from: this.rank, data });
  }

  receive(source: number): any {
    const messages = this.mailbox.get(source) || [];
    return messages.shift();
  }

  broadcast(data: any, root: number) {
    if (this.rank === root) {
      for (let i = 0; i < this.size; i++) {
        if (i !== this.rank) this.send(i, data);
      }
    } else {
      return this.receive(root);
    }
  }

  reduce(data: number, op: (a: number, b: number) => number, root: number): number {
    // Simplified: all processes send to root
    if (this.rank === root) {
      let result = data;
      for (let i = 0; i < this.size; i++) {
        if (i !== root) {
          const msg = this.receive(i);
          if (msg) result = op(result, msg.data);
        }
      }
      return result;
    } else {
      this.send(root, data);
      return data;
    }
  }
}

// Simulate 4 processes
const processes = Array(4).fill(0).map((_, i) => new MPIProcess(i, 4));
const localValue = processes[0].rank * 10 + 5;
const sum = processes[0].reduce(localValue, (a, b) => a + b, 0);
console.log("Sum:", sum);`,
        language: "typescript"
      },
      {
        id: "3",
        title: "OpenMP & Shared Memory",
        content: "**OpenMP** is an API for shared-memory parallel programming.\n\n**Directives:**\n- `#pragma omp parallel`: Create team of threads\n- `#pragma omp for`: Distribute loop iterations\n- `#pragma omp critical`: Mutual exclusion\n- `#pragma omp atomic`: Atomic operations\n\n**Clauses:**\n- `private`: Thread-local variables\n- `shared`: Variables shared across threads\n- `reduction`: Combine partial results\n- `schedule`: Loop scheduling (static, dynamic, guided)\n\n**Synchronization:**\n- `#pragma omp barrier`: Wait for all threads\n- `#pragma omp critical`: Mutual exclusion\n- `#pragma omp atomic`: Atomic update\n\n**Benefits:**\n- Incremental parallelization\n- Portable across platforms",
        codeExample: `// OpenMP simulation
class OpenMPSimulator {
  static parallelFor(n: number, fn: (i: number) => void, threads = 4) {
    const chunkSize = Math.ceil(n / threads);
    const promises: Promise<void>[] = [];

    for (let t = 0; t < threads; t++) {
      const start = t * chunkSize;
      const end = Math.min(start + chunkSize, n);
      promises.push(new Promise(resolve => {
        for (let i = start; i < end; i++) fn(i);
        resolve();
      }));
    }

    return Promise.all(promises);
  }

  static parallelSum(arr: number[], threads = 4): number {
    const chunkSize = Math.ceil(arr.length / threads);
    let total = 0;

    for (let t = 0; t < threads; t++) {
      const start = t * chunkSize;
      const end = Math.min(start + chunkSize, arr.length);
      for (let i = start; i < end; i++) total += arr[i];
    }

    return total;
  }
}

const arr = Array(1000).fill(0).map((_, i) => i + 1);
console.log("Sum 1..1000:", OpenMPSimulator.parallelSum(arr));
console.log("Expected:", 1000 * 1001 / 2);`,
        language: "typescript"
      },
      {
        id: "4",
        title: "GPU Programming & CUDA",
        content: "**GPU Computing:** Using GPUs for general-purpose computation (GPGPU).\n\n**CUDA (Compute Unified Device Architecture):**\n- NVIDIA's parallel computing platform\n- Host (CPU) + Device (GPU) programming model\n- Kernels: Functions executed on GPU threads\n\n**CUDA Memory:**\n- Global memory: Large, slow\n- Shared memory: Fast, per-block\n- Registers: Fastest, per-thread\n- Constant/Texture memory: Read-only cache\n\n**Programming Model:**\n- Threads → Blocks → Grid\n- Thread indexing: threadIdx, blockIdx, blockDim\n\n**Libraries:**\n- cuBLAS: Linear algebra\n- cuFFT: Fast Fourier Transform\n- cuDNN: Deep learning\n- Thrust: C++ template library",
        codeExample: `// GPU kernel simulation (conceptual)
class GPUSimulator {
  private memory: Float32Array;

  constructor(size: number) {
    this.memory = new Float32Array(size);
  }

  // Simulate CUDA kernel: vector addition
  vectorAdd(
    a: Float32Array, b: Float32Array,
    result: Float32Array, n: number
  ) {
    // Each thread handles one element
    for (let i = 0; i < n; i++) {
      result[i] = a[i] + b[i];
    }
  }

  // Simulate parallel reduction
  parallelReduce(data: Float32Array): number {
    let sum = 0;
    const chunkSize = Math.ceil(data.length / 4);

    // Simulate 4 thread blocks
    const partialSums = new Array(4).fill(0);
    for (let t = 0; t < 4; t++) {
      const start = t * chunkSize;
      const end = Math.min(start + chunkSize, data.length);
      for (let i = start; i < end; i++) {
        partialSums[t] += data[i];
      }
    }

    return partialSums.reduce((a, b) => a + b, 0);
  }
}

const gpu = new GPUSimulator(1024);
const a = new Float32Array([1, 2, 3, 4]);
const b = new Float32Array([5, 6, 7, 8]);
const result = new Float32Array(4);
gpu.vectorAdd(a, b, result, 4);
console.log("GPU result:", Array.from(result));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "hpc1", question: "Amdahl's Law limits speedup by:", options: ["Number of processors", "Sequential fraction of the program", "Memory bandwidth", "Network speed"], correctIndex: 1, explanation: "Amdahl's Law: speedup is limited by the sequential fraction (1-f).", difficulty: "medium", chapter: "Fundamentals" },
      { id: "hpc2", question: "MPI is used for:", options: ["Shared memory", "Distributed memory", "GPU computing", "Single processor"], correctIndex: 1, explanation: "MPI is the standard for distributed memory parallel programming.", difficulty: "easy", chapter: "MPI" },
      { id: "hpc3", question: "OpenMP uses which type of memory?", options: ["Distributed", "Shared", "GPU", "Disk"], correctIndex: 1, explanation: "OpenMP is designed for shared-memory parallel programming.", difficulty: "easy", chapter: "OpenMP" },
      { id: "hpc4", question: "CUDA is developed by:", options: ["AMD", "Intel", "NVIDIA", "IBM"], correctIndex: 2, explanation: "CUDA is NVIDIA's parallel computing platform for GPU programming.", difficulty: "easy", chapter: "GPU" },
      { id: "hpc5", question: "In CUDA, threads are organized into:", options: ["Warps only", "Blocks and grids", "Streams", "Processes"], correctIndex: 1, explanation: "CUDA threads are organized into blocks, which form a grid.", difficulty: "medium", chapter: "GPU" },
      { id: "hpc6", question: "SIMD stands for:", options: ["Single Instruction Multiple Data", "Single Index Multiple Dispatch", "Simple Instruction Memory Design", "Synchronized Input Multiple Device"], correctIndex: 0, explanation: "SIMD: One instruction operates on multiple data elements simultaneously.", difficulty: "easy", chapter: "Fundamentals" }
    ]
  },
  {
    slug: "image-processing",
    title: "Image Processing & Applications (IPA)",
    description: "Learn digital image fundamentals, filtering, transformations, segmentation, and feature extraction.",
    icon: "🖼️",
    notesUrl: "https://noteslink.in/product/ipa-image-processing-applications-notes-kiit/",
    color: "from-pink-500 to-fuchsia-600",
    lessons: [
      {
        id: "1",
        title: "Digital Image Fundamentals",
        content: "**Digital Image:** A 2D array of pixels (picture elements).\n\n**Image Types:**\n- Binary: 1-bit (black/white)\n- Grayscale: 8-bit (0-255)\n- Color: RGB (3 channels)\n- Multispectral/Hyperspectral\n\n**Image Properties:**\n- Resolution: Width × Height\n- Bit depth: Bits per pixel\n- Color space: RGB, HSV, CMYK, YCbCr\n\n**Image Operations:**\n- Point operations: Pixel-by-pixel\n- Neighborhood operations: Filter kernels\n- Geometric: Rotation, scaling, translation\n\n**Histogram:**\n- Distribution of pixel intensities\n- Histogram equalization: Improve contrast",
        codeExample: `// Image histogram and equalization
class ImageProcessor {
  static histogram(image: number[][]): number[] {
    const hist = new Array(256).fill(0);
    image.forEach(row => row.forEach(pixel => hist[pixel]++));
    return hist;
  }

  static equalize(image: number[][]): number[][] {
    const rows = image.length, cols = image[0].length;
    const totalPixels = rows * cols;
    const hist = this.histogram(image);

    // Compute CDF
    const cdf = new Array(256).fill(0);
    cdf[0] = hist[0];
    for (let i = 1; i < 256; i++) cdf[i] = cdf[i-1] + hist[i];

    // Normalize CDF
    const cdfMin = cdf.find(v => v > 0) || 0;
    const equalized = image.map(row =>
      row.map(pixel => Math.round((cdf[pixel] - cdfMin) / (totalPixels - cdfMin) * 255))
    );

    return equalized;
  }

  static threshold(image: number[][], t: number): number[][] {
    return image.map(row => row.map(p => p >= t ? 255 : 0));
  }
}

const image = [[50,100,150],[200,50,100],[150,200,50]];
console.log("Histogram:", ImageProcessor.histogram(image));
console.log("Thresholded:", ImageProcessor.threshold(image, 128));`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Image Filtering",
        content: "**Spatial Filters:**\n- **Smoothing**: Reduce noise (mean, Gaussian, median)\n- **Sharpening**: Enhance edges (Laplacian, Sobel)\n\n**Convolution:**\n- Flip kernel 180° and slide over image\n- Output = Σ(kernel[i][j] × image[i+x][j+y])\n\n**Common Kernels:**\n- Mean: [[1,1,1],[1,1,1],[1,1,1]] / 9\n- Gaussian: Weighted average\n- Sobel: Edge detection (horizontal/vertical)\n- Laplacian: Second derivative\n\n**Frequency Domain:**\n- Fourier Transform: spatial → frequency\n- Low-pass: Blur\n- High-pass: Sharpen\n- Band-pass: Select specific frequencies",
        codeExample: `// Image convolution
class ImageFilter {
  static convolve(image: number[][], kernel: number[][]): number[][] {
    const rows = image.length, cols = image[0].length;
    const kRows = kernel.length, kCols = kernel[0].length;
    const padR = Math.floor(kRows / 2), padC = Math.floor(kCols / 2);

    const result = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let sum = 0;
        for (let ki = 0; ki < kRows; ki++) {
          for (let kj = 0; kj < kCols; kj++) {
            const ii = i + ki - padR;
            const jj = j + kj - padC;
            if (ii >= 0 && ii < rows && jj >= 0 && jj < cols) {
              sum += image[ii][jj] * kernel[ki][kj];
            }
          }
        }
        result[i][j] = Math.min(255, Math.max(0, Math.round(sum)));
      }
    }
    return result;
  }
}

const meanKernel = [
  [1/9, 1/9, 1/9],
  [1/9, 1/9, 1/9],
  [1/9, 1/9, 1/9]
];

const sobelX = [[-1,0,1],[-2,0,2],[-1,0,1]];
const image = [[100,100,100],[100,200,100],[100,100,100]];
console.log("Smoothed:", ImageFilter.convolve(image, meanKernel));`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Morphological Operations & Segmentation",
        content: "**Morphological Operations** process images based on shape.\n\n**Binary Morphology:**\n- **Erosion**: Shrink bright regions\n- **Dilation**: Expand bright regions\n- **Opening**: Erosion then Dilation (remove noise)\n- **Closing**: Dilation then Erosion (fill holes)\n\n**Segmentation** divides images into regions.\n\n**Methods:**\n- **Thresholding**: Global/adaptive\n- **Region-based**: Growing, splitting, merging\n- **Edge-based**: Sobel, Canny\n- **Watershed**: Treat as topographic surface\n\n**Applications:**\n- Object detection\n- Medical imaging\n- OCR",
        codeExample: `// Morphological operations
class Morphology {
  static erode(binary: number[][], structSize: number): number[][] {
    const rows = binary.length, cols = binary[0].length;
    const half = Math.floor(structSize / 2);
    const result = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let i = half; i < rows - half; i++) {
      for (let j = half; j < cols - half; j++) {
        let allOne = true;
        for (let di = -half; di <= half; di++) {
          for (let dj = -half; dj <= half; dj++) {
            if (binary[i + di][j + dj] === 0) allOne = false;
          }
        }
        result[i][j] = allOne ? 1 : 0;
      }
    }
    return result;
  }

  static dilate(binary: number[][], structSize: number): number[][] {
    const rows = binary.length, cols = binary[0].length;
    const half = Math.floor(structSize / 2);
    const result = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let i = half; i < rows - half; i++) {
      for (let j = half; j < cols - half; j++) {
        let anyOne = false;
        for (let di = -half; di <= half; di++) {
          for (let dj = -half; dj <= half; dj++) {
            if (binary[i + di][j + dj] === 1) anyOne = true;
          }
        }
        result[i][j] = anyOne ? 1 : 0;
      }
    }
    return result;
  }
}

const binary = [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]];
console.log("Eroded:", Morphology.erode(binary, 3));
console.log("Dilated:", Morphology.dilate(binary, 3));`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Feature Extraction & Recognition",
        content: "**Feature Extraction** identifies key image characteristics.\n\n**Edge Detection:**\n- Sobel: Gradient approximation\n- Canny: Multi-stage (blur, gradient, NMS, threshold)\n- Laplacian of Gaussian (LoG)\n\n**Corner Detection:**\n- Harris corner detector\n- FAST (Features from Accelerated Segment Test)\n- SIFT, SURF, ORB\n\n**Blob Detection:**\n- Laplacian of Gaussian\n- Difference of Gaussians (DoG)\n\n**Feature Descriptors:**\n- SIFT: Scale-invariant\n- HOG: Histogram of Oriented Gradients\n- LBP: Local Binary Patterns\n\n**Applications:**\n- Object recognition\n- Image matching\n- Panorama stitching",
        codeExample: `// Simple edge detection
class FeatureExtractor {
  static sobel(image: number[][]): number[][] {
    const rows = image.length, cols = image[0].length;
    const gx = [[-1,0,1],[-2,0,2],[-1,0,1]];
    const gy = [[-1,-2,-1],[0,0,0],[1,2,1]];
    const edges = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let i = 1; i < rows - 1; i++) {
      for (let j = 1; j < cols - 1; j++) {
        let sumX = 0, sumY = 0;
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            sumX += image[i + di][j + dj] * gx[di + 1][dj + 1];
            sumY += image[i + di][j + dj] * gy[di + 1][dj + 1];
          }
        }
        edges[i][j] = Math.min(255, Math.round(Math.sqrt(sumX * sumX + sumY * sumY)));
      }
    }
    return edges;
  }

  static histogramOfGradients(image: number[][], cellSize: number): number[] {
    // Simplified HOG: compute gradient magnitude histogram per cell
    const edges = this.sobel(image);
    const bins = 9;
    const histogram = new Array(bins).fill(0);

    for (let i = 0; i < edges.length; i++) {
      for (let j = 0; j < edges[0].length; j++) {
        if (edges[i][j] > 50) {
          const bin = Math.floor((edges[i][j] / 255) * bins) % bins;
          histogram[bin]++;
        }
      }
    }
    return histogram;
  }
}

const image = [[100,150,100],[150,200,150],[100,150,100]];
console.log("Edges:", FeatureExtractor.sobel(image));
console.log("HOG:", FeatureExtractor.histogramOfGradients(image, 1));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "ipa1", question: "Grayscale images have how many channels?", options: ["1", "3", "4", "8"], correctIndex: 0, explanation: "Grayscale images have a single channel (intensity values 0-255).", difficulty: "easy", chapter: "Fundamentals" },
      { id: "ipa2", question: "Histogram equalization is used for:", options: ["Noise removal", "Contrast enhancement", "Edge detection", "Segmentation"], correctIndex: 1, explanation: "Histogram equalization spreads intensities to improve contrast.", difficulty: "easy", chapter: "Fundamentals" },
      { id: "ipa3", question: "Gaussian filter is used for:", options: ["Sharpening", "Smoothing/blur", "Edge detection", "Thresholding"], correctIndex: 1, explanation: "Gaussian filter smooths images by averaging with weighted kernel.", difficulty: "easy", chapter: "Filtering" },
      { id: "ipa4", question: "Sobel operator detects:", options: ["Corners", "Edges", "Blobs", "Textures"], correctIndex: 1, explanation: "Sobel computes gradient approximation for edge detection.", difficulty: "easy", chapter: "Filtering" },
      { id: "ipa5", question: "Erosion in morphology:", options: ["Expands bright regions", "Shrinks bright regions", "Removes noise", "Fills holes"], correctIndex: 1, explanation: "Erosion shrinks bright regions by requiring all neighbors to be foreground.", difficulty: "medium", chapter: "Morphology" },
      { id: "ipa6", question: "Canny edge detector uses:", options: ["Single threshold", "Multi-stage with NMS", "Only gradient", "Only Laplacian"], correctIndex: 1, explanation: "Canny uses blur, gradient, non-maximum suppression, and dual thresholding.", difficulty: "medium", chapter: "Feature Extraction" }
    ]
  },
  {
    slug: "multicore-programming",
    title: "Multicore Programming (MCP)",
    description: "Learn parallelism, threading, synchronization, lock-free algorithms, and OpenMP.",
    icon: "🧵",
    notesUrl: "https://noteslink.in/product/mcp-multicore-programming-notes-kiit/",
    color: "from-emerald-500 to-teal-600",
    lessons: [
      {
        id: "1",
        title: "Parallelism & Threading",
        content: "**Parallelism vs Concurrency:**\n- Parallelism: Doing multiple things simultaneously\n- Concurrency: Handling multiple things at once\n\n**Thread Basics:**\n- Lightweight process sharing address space\n- Thread-local vs shared data\n- Thread lifecycle: New → Ready → Running → Blocked → Terminated\n\n**Creation Models:**\n- Fork-Join: Create threads, join at barrier\n- Task Pool: Distribute tasks to worker threads\n- Pipeline: Stages connected by queues\n\n**Challenges:**\n- Race conditions\n- Deadlocks\n- Starvation\n- False sharing",
        codeExample: `// Thread simulation
class ThreadPool {
  private tasks: (() => void)[] = [];
  private running = false;

  submit(task: () => void) {
    this.tasks.push(task);
  }

  async runAll(): Promise<void> {
    const promises = this.tasks.map(task =>
      new Promise<void>(resolve => {
        task();
        resolve();
      })
    );
    await Promise.all(promises);
    this.tasks = [];
  }
}

let counter = 0;
const pool = new ThreadPool();
for (let i = 0; i < 1000; i++) {
  pool.submit(() => { counter++; });
}
pool.runAll().then(() => console.log("Counter:", counter));`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Synchronization Primitives",
        content: "**Mutual Exclusion:**\n- **Mutex**: Lock/unlock critical section\n- **Semaphore**: Counting mutex (supports multiple instances)\n- **Spinlock**: Busy-wait mutex\n\n**Condition Variables:**\n- wait(): Release lock and sleep\n- signal(): Wake one waiting thread\n- broadcast(): Wake all waiting threads\n\n**Barriers:**\n- Wait until all threads reach the barrier\n\n**Read-Write Locks:**\n- Multiple readers OR one writer\n- Better concurrency for read-heavy workloads\n\n**Monitors:**\n- High-level synchronization construct\n- Combines mutex + condition variables",
        codeExample: `// Mutex simulation
class Mutex {
  private locked = false;
  private queue: (() => void)[] = [];

  lock(): Promise<void> {
    return new Promise(resolve => {
      if (!this.locked) {
        this.locked = true;
        resolve();
      } else {
        this.queue.push(resolve);
      }
    });
  }

  unlock() {
    if (this.queue.length > 0) {
      const next = this.queue.shift()!;
      next();
    } else {
      this.locked = false;
    }
  }
}

// Semaphore simulation
class Semaphore {
  private count: number;
  private queue: (() => void)[] = [];

  constructor(count: number) { this.count = count; }

  async acquire(): Promise<void> {
    if (this.count > 0) {
      this.count--;
    } else {
      await new Promise<void>(resolve => this.queue.push(resolve));
    }
  }

  release() {
    if (this.queue.length > 0) {
      this.queue.shift()!();
    } else {
      this.count++;
    }
  }
}

const mutex = new Mutex();
mutex.lock().then(() => {
  console.log("Acquired lock");
  mutex.unlock();
  console.log("Released lock");
});`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Lock-Free & Wait-Free Algorithms",
        content: "**Lock-Free:** At least one thread makes progress.\n- Compare-and-Swap (CAS)\n- Load-Linked/Store-Conditional (LL/SC)\n\n**Wait-Free:** Every thread makes progress in bounded steps.\n- More complex but better guarantees\n\n**CAS Algorithm:**\n```\nCAS(address, expected, new_value):\n  if *address == expected:\n    *address = new_value\n    return true\n  else:\n    return false\n```\n\n**Data Structures:**\n- Lock-free stack (CAS on top pointer)\n- Lock-free queue (Michael-Scott queue)\n- Lock-free linked list\n\n**ABA Problem:**\n- Value changes A→B→A between read and CAS\n- Solution: Tagged pointers, hazard pointers",
        codeExample: `// Lock-free stack using CAS
class LockFreeStack<T> {
  private head: { value: T; next: any } | null = null;

  push(value: T) {
    let current = this.head;
    let newNode = { value, next: current };
    // Simulate CAS (in real code, this would be atomic)
    while (true) {
      if (current === this.head) {
        this.head = newNode;
        return;
      }
      current = this.head;
      newNode.next = current;
    }
  }

  pop(): T | null {
    let current = this.head;
    while (current) {
      // Simulate CAS
      if (current === this.head) {
        this.head = current.next;
        return current.value;
      }
      current = this.head;
    }
    return null;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

const stack = new LockFreeStack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Pop:", stack.pop());
console.log("Stack:", stack.toArray());`,
        language: "typescript"
      },
      {
        id: "4",
        title: "OpenMP & Parallel Patterns",
        content: "**OpenMP Directives:**\n- `#pragma omp parallel`: Thread team\n- `#pragma omp for`: Parallel for loop\n- `#pragma omp sections`: Parallel sections\n- `#pragma omp single`: Execute by one thread\n\n**Parallel Patterns:**\n- **Map**: Apply function to each element\n- **Reduce**: Combine elements with operator\n- **Scan**: Prefix sum\n- **Stencil**: Neighborhood computation\n\n**Scheduling:**\n- Static: Equal chunks\n- Dynamic: Small chunks, load balanced\n- Guided: Decreasing chunk size\n\n**Nested Parallelism:**\n- Parallel regions within parallel regions\n- Often overhead-heavy",
        codeExample: `// Parallel patterns simulation
class ParallelPatterns {
  static map<T, R>(arr: T[], fn: (item: T) => R, threads = 4): R[] {
    const chunkSize = Math.ceil(arr.length / threads);
    const results: R[] = [];

    for (let t = 0; t < threads; t++) {
      const start = t * chunkSize;
      const end = Math.min(start + chunkSize, arr.length);
      for (let i = start; i < end; i++) {
        results.push(fn(arr[i]));
      }
    }
    return results;
  }

  static reduce<T>(arr: T[], fn: (a: T, b: T) => T, threads = 4): T {
    const chunkSize = Math.ceil(arr.length / threads);
    const partials: T[] = [];

    for (let t = 0; t < threads; t++) {
      const start = t * chunkSize;
      const end = Math.min(start + chunkSize, arr.length);
      let partial = arr[start];
      for (let i = start + 1; i < end; i++) {
        partial = fn(partial, arr[i]);
      }
      partials.push(partial);
    }

    return partials.reduce(fn);
  }

  static scan(arr: number[]): number[] {
    const result = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
      result.push(result[i-1] + arr[i]);
    }
    return result;
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log("Map x2:", ParallelPatterns.map(arr, x => x * 2));
console.log("Reduce +:", ParallelPatterns.reduce(arr, (a, b) => a + b));
console.log("Scan:", ParallelPatterns.scan(arr));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "mcp1", question: "Parallelism means:", options: ["Handling multiple things at once", "Doing multiple things simultaneously", "Single-threaded execution", "Sequential processing"], correctIndex: 1, explanation: "Parallelism is doing multiple things simultaneously on multiple cores.", difficulty: "easy", chapter: "Fundamentals" },
      { id: "mcp2", question: "A mutex provides:", options: ["Condition signaling", "Mutual exclusion", "Atomic operations", "Memory ordering"], correctIndex: 1, explanation: "A mutex ensures only one thread can enter a critical section at a time.", difficulty: "easy", chapter: "Synchronization" },
      { id: "mcp3", question: "CAS stands for:", options: ["Compare and Swap", "Critical Area Section", "Concurrent Access System", "Central Allocation Service"], correctIndex: 0, explanation: "Compare-and-Swap is the foundation of lock-free algorithms.", difficulty: "easy", chapter: "Lock-Free" },
      { id: "mcp4", question: "ABA problem occurs when:", options: ["Two threads access same data", "Value changes A→B→A between read and CAS", "Deadlock happens", "Starvation occurs"], correctIndex: 1, explanation: "ABA: value looks unchanged but was modified in between.", difficulty: "medium", chapter: "Lock-Free" },
      { id: "mcp5", question: "OpenMP 'schedule(dynamic)' is best for:", options: ["Equal workload loops", "Unequal workload loops", "Sequential code", "Memory-bound code"], correctIndex: 1, explanation: "Dynamic scheduling distributes small chunks, balancing uneven workloads.", difficulty: "medium", chapter: "OpenMP" },
      { id: "mcp6", question: "False sharing is caused by:", options: ["Shared variables", "Cache line contention between threads", "Deadlocks", "Insufficient memory"], correctIndex: 1, explanation: "False sharing occurs when threads modify different variables on the same cache line.", difficulty: "medium", chapter: "Parallelism" }
    ]
  },
  {
    slug: "advanced-microprocessor",
    title: "ARM & Advanced Microprocessor",
    description: "Learn ARM architecture, assembly language, interrupts, pipeline, and memory management.",
    icon: "🔧",
    notesUrl: "https://noteslink.in/product/arm-advanced-microprocessor-notes-kiit/",
    color: "from-zinc-500 to-gray-600",
    lessons: [
      {
        id: "1",
        title: "ARM Architecture Fundamentals",
        content: "**ARM (Advanced RISC Machine):**\n- RISC architecture, most used in mobile/embedded\n- 32-bit (ARMv7) and 64-bit (ARMv8-A)\n\n**Key Features:**\n- Load-store architecture\n- Conditional execution (most instructions)\n- Barrel shifter (operand 2 processing)\n- 16 general-purpose registers (R0-R15)\n- CPSR (Current Program Status Register)\n\n**ARM Registers:**\n- R0-R12: General purpose\n- R13 (SP): Stack pointer\n- R14 (LR): Link register\n- R15 (PC): Program counter\n- CPSR: Status flags (N, Z, C, V)\n\n**Instruction Sets:**\n- ARM: 32-bit instructions\n- Thumb: 16-bit compact instructions\n- Thumb-2: Mixed 16/32-bit",
        codeExample: `// ARM instruction simulation
class ARMProcessor {
  registers: number[] = new Array(16).fill(0);
  cpsr = { N: false, Z: false, C: false, V: false };

  // MOV Rd, Operand2
  mov(rd: number, operand2: number) {
    this.registers[rd] = operand2;
    this.updateFlags(this.registers[rd]);
  }

  // ADD Rd, Rn, Operand2
  add(rd: number, rn: number, operand2: number) {
    this.registers[rd] = this.registers[rn] + operand2;
    this.updateFlags(this.registers[rd]);
  }

  // SUB Rd, Rn, Operand2
  sub(rd: number, rn: number, operand2: number) {
    this.registers[rd] = this.registers[rn] - operand2;
    this.updateFlags(this.registers[rd]);
  }

  // MUL Rd, Rm, Rs
  mul(rd: number, rm: number, rs: number) {
    this.registers[rd] = this.registers[rm] * this.registers[rs];
    this.updateFlags(this.registers[rd]);
  }

  updateFlags(result: number) {
    this.cpsr.N = result < 0;
    this.cpsr.Z = result === 0;
  }

  // Conditional execution
  executeIf(condition: string, fn: () => void) {
    const condMap: Record<string, boolean> = {
      "EQ": this.cpsr.Z,
      "NE": !this.cpsr.Z,
      "LT": this.cpsr.N !== this.cpsr.V,
      "GT": !this.cpsr.Z && this.cpsr.N === this.cpsr.V,
    };
    if (condMap[condition]) fn();
  }
}

const arm = new ARMProcessor();
arm.mov(0, 10);    // R0 = 10
arm.mov(1, 20);    // R1 = 20
arm.add(2, 0, 1);  // R2 = R0 + R1 = 30
console.log("R2 =", arm.registers[2]);`,
        language: "typescript"
      },
      {
        id: "2",
        title: "ARM Assembly Programming",
        content: "**ARM Assembly Syntax:**\n```\nADD  R0, R1, R2    ; R0 = R1 + R2\nLDR  R0, [R1]      ; R0 = *R1\nSTR  R0, [R1]      ; *R1 = R0\nBL   function       ; Branch with link\nCMP  R0, R1        ; Compare and set flags\nBEQ  label          ; Branch if equal\n```\n\n**Addressing Modes:**\n- Immediate: #value\n- Register: Rn\n- Register indirect: [Rn]\n- Base+offset: [Rn, #offset]\n- Pre/Post-indexed: [Rn, #offset]!\n\n**Stack Operations:**\n- STMFD: Store Multiple (push)\n- LDMFD: Load Multiple (pop)\n\n**Calling Convention:**\n- R0-R3: Arguments/return values\n- R4-R11: Callee-saved\n- R12 (IP): Intra-procedure call",
        codeExample: `// ARM assembly simulator
class ARMAssembly {
  private memory: Map<number, number> = new Map();
  private stack: number[] = [];

  // LDR Rd, [Rn, #offset]
  ldr(rd: number, rn: number, offset = 0) {
    const addr = this.registers[rn] + offset;
    this.registers[rd] = this.memory.get(addr) || 0;
  }

  // STR Rd, [Rn, #offset]
  str(rd: number, rn: number, offset = 0) {
    const addr = this.registers[rn] + offset;
    this.memory.set(addr, this.registers[rd]);
  }

  // PUSH (STMFD)
  push(...regs: number[]) {
    regs.forEach(r => this.stack.push(this.registers[r]));
  }

  // POP (LDMFD)
  pop(...regs: number[]) {
    regs.reverse().forEach(r => this.registers[r] = this.stack.pop() || 0);
  }

  // BL (branch with link)
  bl(address: number) {
    this.registers[14] = this.registers[15]; // Save return address
    this.registers[15] = address;            // Jump
  }

  // BX LR (return)
  bxlr() {
    this.registers[15] = this.registers[14];
  }

  registers: number[] = new Array(16).fill(0);
}`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Interrupts & Exception Handling",
        content: "**ARM Exception Types:**\n- **IRQ**: Normal interrupt\n- **FIQ**: Fast interrupt (dedicated registers)\n- **SWI/SVC**: Software interrupt (system call)\n- **Undefined**: Invalid instruction\n- **Abort**: Memory access error\n- **Reset**: System reset\n\n**Exception Handling:**\n1. CPU finishes current instruction\n2. Save CPSR to SPSR of exception mode\n3. Set CPSR to exception mode\n4. Save return address to LR of mode\n5. Set PC to exception vector\n\n**Vector Table:**\n- 0x00: Reset\n- 0x04: Undefined instruction\n- 0x08: SWI\n- 0x0C: Prefetch abort\n- 0x10: Data abort\n- 0x14: Reserved\n- 0x18: IRQ\n- 0x1C: FIQ\n\n**Nested Interrupts:**\n- Save context, enable higher priority\n- Return with restored context",
        codeExample: `// Interrupt controller simulation
class InterruptController {
  private pendingIRQ = 0;
  private pendingFIQ = 0;
  private enabled = false;

  enable() { this.enabled = true; }
  disable() { this.enabled = false; }

  raiseIRQ(source: number) {
    this.pendingIRQ |= (1 << source);
    if (this.enabled) this.handleIRQ();
  }

  raiseFIQ(source: number) {
    this.pendingFIQ |= (1 << source);
    if (this.enabled) this.handleFIQ();
  }

  private handleIRQ() {
    console.log("IRQ Handler: saving context");
    console.log("Processing IRQ source:", Math.log2(this.pendingIRQ));
    this.pendingIRQ = 0;
    console.log("IRQ Handler: restoring context");
  }

  private handleFIQ() {
    console.log("FIQ Handler: fast processing");
    this.pendingFIQ = 0;
  }

  acknowledge(source: number) {
    this.pendingIRQ &= ~(1 << source);
  }
}

const intc = new InterruptController();
intc.enable();
intc.raiseIRQ(3);`,
        language: "typescript"
      },
      {
        id: "4",
        title: "ARM Pipeline & Memory Management",
        content: "**ARM Pipeline:**\n- ARM7: 3-stage (Fetch, Decode, Execute)\n- ARM9: 5-stage\n- Cortex-A: 8-13 stage (out-of-order)\n\n**Pipeline Hazards:**\n- Data hazard: Forwarding/bypassing\n- Control hazard: Branch prediction\n- Structural hazard: Resource duplication\n\n**Memory Management Unit (MMU):**\n- Virtual → Physical address translation\n- Page tables: 4KB pages\n- TLB (Translation Lookaside Buffer)\n- Page faults: Invalid access\n\n**ARM Memory Model:**\n- Little-endian (default) or Big-endian\n- Normal, Device, Strongly-ordered memory\n- Cacheable vs Non-cacheable\n\n**Cache in ARM:**\n- L1: I-Cache + D-Cache (Harvard)\n- L2: Unified\n- Cache policies: Write-back, Write-through",
        codeExample: `// TLB simulation
class TLB {
  private entries: Map<number, number> = new Map();
  private hitCount = 0;
  private missCount = 0;

  lookup(virtualPage: number): number | null {
    if (this.entries.has(virtualPage)) {
      this.hitCount++;
      return this.entries.get(virtualPage)!;
    }
    this.missCount++;
    return null;
  }

  addEntry(virtualPage: number, physicalPage: number) {
    this.entries.set(virtualPage, physicalPage);
  }

  getStats() {
    const total = this.hitCount + this.missCount;
    return {
      hitRate: total > 0 ? (this.hitCount / total * 100).toFixed(1) + "%" : "N/A",
      entries: this.entries.size
    };
  }
}

const tlb = new TLB();
tlb.addEntry(0x1000, 0x5000);
tlb.addEntry(0x2000, 0x7000);
console.log("TLB lookup 0x1000:", tlb.lookup(0x1000));
console.log("TLB lookup 0x3000:", tlb.lookup(0x3000));
console.log("Stats:", tlb.getStats());`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "arm1", question: "ARM stands for:", options: ["Advanced RISC Machine", "Automatic Register Memory", "Array Processing Machine", "Application Runtime Module"], correctIndex: 0, explanation: "ARM = Advanced RISC Machine.", difficulty: "easy", chapter: "Fundamentals" },
      { id: "arm2", question: "In ARM, R13 is typically used as:", options: ["Program counter", "Link register", "Stack pointer", "General purpose"], correctIndex: 2, explanation: "R13 (SP) is conventionally the stack pointer in ARM.", difficulty: "easy", chapter: "Registers" },
      { id: "arm3", question: "FIQ is faster than IRQ because:", options: ["Higher priority", "Dedicated registers", "Faster clock", "More memory"], correctIndex: 1, explanation: "FIQ has dedicated registers (R8-R14), reducing context switch overhead.", difficulty: "medium", chapter: "Interrupts" },
      { id: "arm4", question: "TLB stores:", options: ["Data cache", "Page table entries", "Instructions", "Register values"], correctIndex: 1, explanation: "TLB caches virtual-to-physical page translations for fast lookup.", difficulty: "easy", chapter: "Memory Management" },
      { id: "arm5", question: "ARM is:", options: ["CISC architecture", "RISC architecture", "VLIW architecture", "Stack architecture"], correctIndex: 1, explanation: "ARM is a RISC (Reduced Instruction Set Computer) architecture.", difficulty: "easy", chapter: "Fundamentals" },
      { id: "arm6", question: "CPSR flags are:", options: ["N, Z, C, V", "A, B, C, D", "X, Y, Z, W", "R0, R1, R2, R3"], correctIndex: 0, explanation: "CPSR contains Negative, Zero, Carry, and oVerflow flags.", difficulty: "easy", chapter: "Registers" }
    ]
  },
  {
    slug: "software-project-management",
    title: "Software Project Management (SPM)",
    description: "Master project planning, estimation, scheduling, risk management, and agile methods.",
    icon: "📋",
    notesUrl: "https://noteslink.in/product/software-project-management-notes-kiit/",
    color: "from-cyan-500 to-blue-600",
    lessons: [
      {
        id: "1",
        title: "Project Planning & Estimation",
        content: "**Project Planning:**\n- Define scope, objectives, deliverables\n- Work Breakdown Structure (WBS)\n- Resource allocation\n- Timeline and milestones\n\n**Estimation Techniques:**\n- **Expert Judgment**: Experience-based\n- **Analogous Estimation**: Compare to similar projects\n- **Parametric**: COCOMO, Function Point Analysis\n- **Three-Point (PERT)**: (O + 4M + P) / 6\n\n**COCOMO Model:**\n- Effort = a × (KLOC)ᵇ\n- Time = c × (Effort)ᵈ\n\n**WBS:**\n- Decompose project into manageable tasks\n- Hierarchical structure\n- 100% rule: sum of children = parent",
        codeExample: `// PERT estimation
function pertEstimate(
  optimistic: number,
  mostLikely: number,
  pessimistic: number
): { estimate: number; standardDeviation: number } {
  const estimate = (optimistic + 4 * mostLikely + pessimistic) / 6;
  const standardDeviation = (pessimistic - optimistic) / 6;
  return { estimate, standardDeviation };
}

// WBS simulation
interface WBSTask {
  id: string;
  name: string;
  estimate: number;
  children?: WBSTask[];
}

function totalEstimate(task: WBSTask): number {
  if (task.children) {
    return task.children.reduce((sum, child) => sum + totalEstimate(child), 0);
  }
  return task.estimate;
}

const project: WBSTask = {
  id: "1", name: "Project", children: [
    { id: "1.1", name: "Planning", estimate: 40 },
    { id: "1.2", name: "Development", children: [
      { id: "1.2.1", name: "Backend", estimate: 120 },
      { id: "1.2.2", name: "Frontend", estimate: 80 },
    ]},
    { id: "1.3", name: "Testing", estimate: 60 },
  ]
};

console.log("PERT:", pertEstimate(10, 20, 40));
console.log("Total estimate:", totalEstimate(project), "hours");`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Scheduling & Resource Management",
        content: "**Scheduling Techniques:**\n- **Gantt Charts**: Bar chart showing tasks over time\n- **Network Diagrams**: PERT/CPM charts\n- **Critical Path Method (CPM)**: Longest path = minimum project duration\n\n**Critical Path:**\n1. Identify all paths through the network\n2. Calculate path durations\n3. Longest path = critical path\n4. Zero slack on critical path\n\n**Resource Leveling:**\n- Resolve resource conflicts\n- Delay non-critical tasks\n- Trade time for resources\n\n**Earned Value Management (EVM):**\n- PV (Planned Value): Budgeted cost of work scheduled\n- EV (Earned Value): Budgeted cost of work performed\n- AC (Actual Cost): Actual cost of work performed\n- SPI = EV/PV, CPI = EV/AC",
        codeExample: `// Critical Path Method
interface Activity {
  id: string;
  duration: number;
  predecessors: string[];
}

function criticalPath(activities: Activity[]): { path: string[]; duration: number } {
  const earliest: Map<string, number> = new Map();
  const latest: Map<string, number> = new Map();

  // Forward pass
  activities.forEach(a => {
    const maxPred = a.predecessors.reduce((max, pred) =>
      Math.max(max, earliest.get(pred) || 0), 0);
    earliest.set(a.id, maxPred + a.duration);
  });

  // Backward pass
  const maxDuration = Math.max(...Array.from(earliest.values()));
  [...activities].reverse().forEach(a => {
    const successors = activities.filter(act => act.predecessors.includes(a.id));
    const minSucc = successors.length > 0
      ? Math.min(...successors.map(s => latest.get(s.id) || maxDuration))
      : maxDuration;
    latest.set(a.id, minSucc - a.duration);
  });

  // Find critical path (zero slack)
  const critical = activities.filter(a =>
    (latest.get(a.id)! - earliest.get(a.id)!) === 0
  );

  return { path: critical.map(a => a.id), duration: maxDuration };
}

const activities: Activity[] = [
  { id: "A", duration: 3, predecessors: [] },
  { id: "B", duration: 5, predecessors: ["A"] },
  { id: "C", duration: 2, predecessors: ["A"] },
  { id: "D", duration: 4, predecessors: ["B", "C"] },
];

console.log("Critical Path:", criticalPath(activities));`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Risk Management",
        content: "**Risk Management Process:**\n1. **Identification**: Brainstorm, checklists, interviews\n2. **Analysis**: Qualitative and quantitative\n3. **Response Planning**: Avoid, mitigate, transfer, accept\n4. **Monitoring**: Track risks, update plans\n\n**Risk Assessment Matrix:**\n- Probability: Low, Medium, High\n- Impact: Low, Medium, High\n- Risk Score = Probability × Impact\n\n**Risk Response Strategies:**\n- **Avoid**: Eliminate the threat\n- **Mitigate**: Reduce probability or impact\n- **Transfer**: Shift to third party (insurance, outsourcing)\n- **Accept**: Acknowledge and prepare contingency\n\n**Risk Register:**\n- Risk ID, description, probability, impact\n- Owner, response strategy, status",
        codeExample: `// Risk assessment
interface Risk {
  id: string;
  description: string;
  probability: number; // 0-1
  impact: number; // 0-1
  owner: string;
  response: "avoid" | "mitigate" | "transfer" | "accept";
}

function assessRisks(risks: Risk[]): Risk[] {
  return risks
    .map(r => ({ ...r, score: r.probability * r.impact }))
    .sort((a, b) => b.score - a.score);
}

function riskMatrix(probability: string, impact: string): string {
  const matrix: Record<string, Record<string, string>> = {
    low: { low: "Low", medium: "Low", high: "Medium" },
    medium: { low: "Low", medium: "Medium", high: "High" },
    high: { low: "Medium", medium: "High", high: "Critical" },
  };
  return matrix[probability][impact];
}

const risks: Risk[] = [
  { id: "R1", description: "Key developer leaves", probability: 0.3, impact: 0.8, owner: "PM", response: "mitigate" },
  { id: "R2", description: "Requirements change", probability: 0.7, impact: 0.5, owner: "PO", response: "mitigate" },
  { id: "R3", description: "Server outage", probability: 0.1, impact: 0.9, owner: "DevOps", response: "transfer" },
];

console.log("Risk matrix (high, medium):", riskMatrix("high", "medium"));
console.log("Assessed risks:", assessRisks(risks).map(r => \`\${r.id}: \${r.score.toFixed(2)}\`));`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Quality Assurance & Metrics",
        content: "**Quality Assurance:**\n- Process-focused: Prevent defects\n- Reviews, inspections, testing\n- Standards compliance (ISO 9001)\n\n**Software Metrics:**\n- **Process Metrics**: Effort, time, defects\n- **Product Metrics**: Size, complexity, quality\n- **Project Metrics**: Schedule, cost, scope\n\n**Code Metrics:**\n- Lines of Code (LOC)\n- Cyclomatic Complexity\n- Coupling and Cohesion\n- Defect density\n\n**Quality Models:**\n- McCall's Quality Model\n- ISO 9126\n- Boehm's Quality Model\n\n**Cost of Quality:**\n- Prevention + Appraisal + Internal Failure + External Failure",
        codeExample: `// Code metrics calculator
class CodeMetrics {
  static cyclomaticComplexity(code: string): number {
    // Count decision points
    const decisionKeywords = /\\b(if|else if|while|for|case|catch|&&|\\?\\?)\\b/g;
    const matches = code.match(decisionKeywords) || [];
    return matches.length + 1;
  }

  static linesOfCode(code: string): { total: number; blank: number; comment: number; code: number } {
    const lines = code.split("\\n");
    const total = lines.length;
    const blank = lines.filter(l => l.trim() === "").length;
    const comment = lines.filter(l => l.trim().startsWith("//") || l.trim().startsWith("/*")).length;
    return { total, blank, comment, code: total - blank - comment };
  }

  static halsteadMetrics(operators: string[], operands: string[]): {
    vocabulary: number; length: number; volume: number; difficulty: number
  } {
    const uniqueOperators = new Set(operators).size;
    const uniqueOperands = new Set(operands).size;
    const n1 = uniqueOperators, n2 = uniqueOperands;
    const N1 = operators.length, N2 = operands.length;
    const vocabulary = n1 + n2;
    const length = N1 + N2;
    const volume = length * Math.log2(vocabulary || 1);
    const difficulty = (n1 / 2) * (N2 / (n2 || 1));
    return { vocabulary, length, volume, difficulty };
  }
}

const code = \`function example(x) {
  if (x > 0) {
    return x * 2;
  } else if (x < 0) {
    return -x;
  }
  return 0;
}\`;

console.log("Cyclomatic:", CodeMetrics.cyclomaticComplexity(code));
console.log("LOC:", CodeMetrics.linesOfCode(code));`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "spm1", question: "PERT uses which formula?", options: ["(O+M+P)/3", "(O+4M+P)/6", "(O+2M+P)/4", "O+M+P"], correctIndex: 1, explanation: "PERT estimate = (Optimistic + 4×MostLikely + Pessimistic) / 6.", difficulty: "easy", chapter: "Estimation" },
      { id: "spm2", question: "Critical path is:", options: ["Shortest path", "Longest path", "Any path", "Random path"], correctIndex: 1, explanation: "The critical path is the longest path, determining minimum project duration.", difficulty: "easy", chapter: "Scheduling" },
      { id: "spm3", question: "SPI > 1 means:", options: ["Behind schedule", "Ahead of schedule", "On budget", "Over budget"], correctIndex: 1, explanation: "SPI (Schedule Performance Index) > 1 means ahead of schedule.", difficulty: "medium", chapter: "EVM" },
      { id: "spm4", question: "Risk transfer means:", options: ["Eliminate risk", "Reduce risk", "Shift risk to third party", "Ignore risk"], correctIndex: 2, explanation: "Transfer shifts the risk impact to another party (e.g., insurance).", difficulty: "easy", chapter: "Risk" },
      { id: "spm5", question: "Cyclomatic complexity measures:", options: ["Lines of code", "Decision points in code", "Function count", "Variable count"], correctIndex: 1, explanation: "Cyclomatic complexity counts the number of decision points (branches).", difficulty: "easy", chapter: "Quality" },
      { id: "spm6", question: "WBS stands for:", options: ["Work Breakdown Structure", "Weekly Budget Summary", "Weighted Balanced Scorecard", "Workflow Base System"], correctIndex: 0, explanation: "WBS = Work Breakdown Structure — decomposes project into manageable tasks.", difficulty: "easy", chapter: "Planning" }
    ]
  },
  {
    slug: "industry-4-0",
    title: "Industry 4.0",
    description: "Explore IoT, cyber-physical systems, cloud computing, big data, and AI in manufacturing.",
    icon: "🏭",
    notesUrl: "https://noteslink.in/product/ind-4-0-noteskiit/",
    color: "from-violet-500 to-purple-600",
    lessons: [
      {
        id: "1",
        title: "Introduction to Industry 4.0",
        content: "**Industry 4.0** = Fourth Industrial Revolution\n\n**Revolutions:**\n1. Mechanization (steam power)\n2. Mass production (electricity)\n3. Automation (computers, IT)\n4. Smart manufacturing (IoT, AI, cyber-physical)\n\n**Key Technologies:**\n- Industrial Internet of Things (IIoT)\n- Cyber-Physical Systems (CPS)\n- Cloud Computing\n- Big Data Analytics\n- Artificial Intelligence / Machine Learning\n- Additive Manufacturing (3D printing)\n- Robotics\n- Augmented Reality\n\n**Pillars:**\n- Interoperability\n- Information transparency\n- Technical assistance\n- Decentralized decisions",
        codeExample: `// IoT sensor simulation
class IoTSensor {
  private readings: { timestamp: number; value: number }[] = [];

  constructor(
    public id: string,
    public type: string,
    private min: number,
    private max: number
  ) {}

  read(): number {
    const value = Math.random() * (this.max - this.min) + this.min;
    this.readings.push({ timestamp: Date.now(), value });
    return value;
  }

  getAverage(window = 10): number {
    const recent = this.readings.slice(-window);
    return recent.reduce((s, r) => s + r.value, 0) / recent.length;
  }

  detectAnomaly(threshold = 2): boolean {
    if (this.readings.length < 10) return false;
    const avg = this.getAverage();
    const stdDev = Math.sqrt(
      this.readings.slice(-10).reduce((s, r) => s + (r.value - avg) ** 2, 0) / 10
    );
    const latest = this.readings[this.readings.length - 1].value;
    return Math.abs(latest - avg) > threshold * stdDev;
  }
}

const tempSensor = new IoTSensor("TEMP-001", "temperature", 18, 35);
for (let i = 0; i < 20; i++) tempSensor.read();
console.log("Average temp:", tempSensor.getAverage().toFixed(1));
console.log("Anomaly detected:", tempSensor.detectAnomaly());`,
        language: "typescript"
      },
      {
        id: "2",
        title: "Cyber-Physical Systems & IoT",
        content: "**Cyber-Physical Systems (CPS):** Integration of computation with physical processes.\n\n**Components:**\n- Sensors (data collection)\n- Actuators (physical action)\n- Controllers (decision making)\n- Communication networks\n\n**IoT Architecture:**\n- Perception Layer: Sensors and actuators\n- Network Layer: Communication protocols\n- Application Layer: Data processing and services\n\n**Protocols:**\n- MQTT: Lightweight pub/sub messaging\n- CoAP: Constrained Application Protocol\n- AMQP: Advanced Message Queuing Protocol\n- Zigbee, LoRa: Low-power wireless\n\n**Edge Computing:**\n- Process data near the source\n- Reduce latency and bandwidth\n- Real-time decision making",
        codeExample: `// MQTT-like pub/sub system
class MQTTSimulator {
  private brokers: Map<string, Set<(msg: string) => void>> = new Map();

  subscribe(topic: string, callback: (msg: string) => void) {
    if (!this.brokers.has(topic)) this.brokers.set(topic, new Set());
    this.brokers.get(topic)!.add(callback);
  }

  publish(topic: string, message: string) {
    this.brokers.get(topic)?.forEach(cb => cb(message));
  }

  unsubscribe(topic: string, callback: (msg: string) => void) {
    this.brokers.get(topic)?.delete(callback);
  }
}

const mqtt = new MQTTSimulator();

// Subscribe to temperature topic
mqtt.subscribe("factory/sensors/temp", (msg) => {
  console.log("Received temperature:", msg);
});

// Publish sensor reading
mqtt.publish("factory/sensors/temp", "25.5");

// Edge computing simulation
class EdgeNode {
  private buffer: any[] = [];
  private processingInterval = 1000;

  addData(data: any) {
    this.buffer.push(data);
  }

  processLocally(): any[] {
    const results = this.buffer.map(d => ({
      ...d,
      processed: true,
      timestamp: Date.now()
    }));
    this.buffer = [];
    return results;
  }
}`,
        language: "typescript"
      },
      {
        id: "3",
        title: "Big Data & Analytics in Industry",
        content: "**Big Data Characteristics (5Vs):**\n- Volume: Large amounts of data\n- Velocity: High-speed data generation\n- Variety: Structured, semi-structured, unstructured\n- Veracity: Data quality and trustworthiness\n- Value: Business insights\n\n**Data Pipeline:**\n1. Collection: Sensors, logs, transactions\n2. Ingestion: Kafka, Flume, Sqoop\n3. Storage: HDFS, S3, Data Lake\n4. Processing: Spark, Flink, MapReduce\n5. Analysis: SQL, ML, Visualization\n6. Action: Alerts, automation, dashboards\n\n**Predictive Maintenance:**\n- Collect sensor data from equipment\n- ML models predict failure\n- Schedule maintenance before breakdown\n- Reduce downtime and costs\n\n**Digital Twin:**\n- Virtual replica of physical system\n- Real-time monitoring and simulation\n- What-if analysis",
        codeExample: `// Predictive maintenance simulation
class PredictiveMaintenance {
  private failureThreshold = 0.7;

  analyzeSensorData(data: {
    vibration: number;
    temperature: number;
    pressure: number;
   运行小时: number;
  }): { risk: string; confidence: number; action: string } {
    // Simple rule-based prediction
    let riskScore = 0;

    if (data.vibration > 5) riskScore += 0.3;
    if (data.temperature > 80) riskScore += 0.2;
    if (data.pressure > 100) riskScore += 0.2;
    if (data.运行小时 > 10000) riskScore += 0.3;

    const risk = riskScore > this.failureThreshold ? "HIGH" :
                 riskScore > 0.4 ? "MEDIUM" : "LOW";

    const action = risk === "HIGH" ? "Schedule immediate maintenance" :
                   risk === "MEDIUM" ? "Monitor closely" : "Continue operation";

    return {
      risk,
      confidence: Math.min(riskScore, 0.95),
      action
    };
  }
}

const pm = new PredictiveMaintenance();
const result = pm.analyzeSensorData({
  vibration: 6, temperature: 85, pressure: 110, 运行小时: 12000
});
console.log("Maintenance analysis:", result);`,
        language: "typescript"
      },
      {
        id: "4",
        title: "Smart Manufacturing & Robotics",
        content: "**Smart Factory:** Fully connected manufacturing environment.\n\n**Key Concepts:**\n- **Lean Manufacturing**: Eliminate waste\n- **Six Sigma**: Reduce defects to 3.4 per million\n- **Just-In-Time (JIT)**: Produce only what's needed\n- **Kaizen**: Continuous improvement\n\n**Industrial Robotics:**\n- Articulated robots (6-axis)\n- SCARA robots (selective compliance)\n- Collaborative robots (cobots)\n- AGVs (Automated Guided Vehicles)\n\n**Additive Manufacturing:**\n- 3D printing: FDM, SLA, SLS\n- Rapid prototyping\n- Custom production\n- Reduced material waste\n\n**AR in Manufacturing:**\n- Assembly guidance\n- Maintenance support\n- Quality inspection\n- Training",
        codeExample: `// Production line simulation
class ProductionLine {
  private stations: { name: string; cycleTime: number; status: string }[] = [];
  private output: { product: string; time: number }[] = [];

  addStation(name: string, cycleTime: number) {
    this.stations.push({ name, cycleTime, status: "idle" });
  }

  run(units: number): { product: string; time: number }[] {
    for (let i = 0; i < units; i++) {
      let totalTime = 0;
      for (const station of this.stations) {
        station.status = "working";
        totalTime += station.cycleTime;
        station.status = "idle";
      }
      this.output.push({ product: \`Unit-\${i + 1}\`, time: totalTime });
    }
    return this.output;
  }

  getMetrics() {
    const times = this.output.map(o => o.time);
    const bottleneck = this.stations.reduce((slow, s) =>
      s.cycleTime > slow.cycleTime ? s : slow
    );
    return {
      totalUnits: this.output.length,
      avgCycleTime: times.reduce((a, b) => a + b, 0) / times.length,
      bottleneck: bottleneck.name,
      throughput: 60 / bottleneck.cycleTime // units per hour
    };
  }
}

const line = new ProductionLine();
line.addStation("Cutting", 2);
line.addStation("Assembly", 5);
line.addStation("Welding", 3);
line.addStation("Painting", 4);
line.run(10);
console.log("Metrics:", line.getMetrics());`,
        language: "typescript"
      }
    ],
    quiz: [
      { id: "ind1", question: "Industry 4.0 is also known as:", options: ["Digital Revolution", "Fourth Industrial Revolution", "Smart Age", "AI Revolution"], correctIndex: 1, explanation: "Industry 4.0 = Fourth Industrial Revolution — smart manufacturing with IoT, AI, CPS.", difficulty: "easy", chapter: "Introduction" },
      { id: "ind2", question: "MQTT is used for:", options: ["Database queries", "Lightweight pub/sub messaging", "File transfer", "Video streaming"], correctIndex: 1, explanation: "MQTT is a lightweight publish-subscribe messaging protocol for IoT.", difficulty: "easy", chapter: "IoT" },
      { id: "ind3", question: "Edge computing processes data:", options: ["In the cloud only", "Near the data source", "On a single server", "Offline only"], correctIndex: 1, explanation: "Edge computing processes data near where it's generated, reducing latency.", difficulty: "easy", chapter: "Edge Computing" },
      { id: "ind4", question: "Digital Twin is:", options: ["A physical replica", "A virtual replica of a physical system", "A backup system", "A sensor"], correctIndex: 1, explanation: "A digital twin is a virtual model that mirrors a physical system in real-time.", difficulty: "easy", chapter: "Smart Manufacturing" },
      { id: "ind5", question: "Six Sigma aims for:", options: ["10 defects per million", "3.4 defects per million", "Zero defects", "100 defects per million"], correctIndex: 1, explanation: "Six Sigma targets 3.4 defects per million opportunities.", difficulty: "easy", chapter: "Quality" },
      { id: "ind6", question: "Cobots are:", options: ["Industrial robots", "Collaborative robots working with humans", "Military robots", "Space robots"], correctIndex: 1, explanation: "Cobots (collaborative robots) are designed to work safely alongside humans.", difficulty: "easy", chapter: "Robotics" }
    ]
  }
];

export function getCourse(slug: string): Course | undefined {
  return courses.find(c => c.slug === slug);
}

export function getLesson(slug: string, lessonId: string): Lesson | undefined {
  const course = getCourse(slug);
  return course?.lessons.find(l => l.id === lessonId);
}
