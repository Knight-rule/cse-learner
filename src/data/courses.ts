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
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export const courses: Course[] = [
  {
    slug: "data-structures",
    title: "Data Structures",
    description: "Master arrays, linked lists, trees, graphs, hash tables and more.",
    icon: "🌳",
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
  }
];

export function getCourse(slug: string): Course | undefined {
  return courses.find(c => c.slug === slug);
}

export function getLesson(slug: string, lessonId: string): Lesson | undefined {
  const course = getCourse(slug);
  return course?.lessons.find(l => l.id === lessonId);
}
