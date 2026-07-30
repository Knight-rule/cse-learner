export interface Lesson {

  id: string;

  title: string;

  content: string;

  codeExample?: string;

  language?: string;

}



export interface Course {

  slug: string;

  title: string;

  description: string;

  icon: string;

  color: string;

  category: "Core CS" | "Languages" | "Systems" | "AI & ML" | "Software Dev" | "Electives";

  notesUrl?: string;

  lessons: Lesson[];

}



export const courses: Course[] = [

  {

    slug: "data-structures",

    title: "Data Structures",

    description: "Master arrays, linked lists, trees, graphs, hash tables and more.",

    icon: "🌳",

    notesUrl: "https://noteslink.in/product/ds-data-structure-kiit/",

    color: "from-emerald-500 to-teal-600",
    category: "Core CS",

    lessons: [

      {

        id: "1",

        title: "Introduction to Data Structures",

        content: "Biggest struggle when starting out: your code works on small test data but crashes or crawls when the real input arrives. That's because you picked the wrong data structure for the job. Choosing the right one is like picking the right tool from a toolbox — you wouldn't use a sledgehammer to hang a picture frame.\n\nThink of data structures as contracts with the CPU: each one guarantees certain operations are fast in exchange for others being slow. Arrays give you O(1) random access but O(n) insert in the middle. Linked lists give O(1) insert at head but O(n) random access. Hash tables give O(1) average lookup but no ordering. There is no free lunch — every choice is a tradeoff.\n\nCommon mistake: assuming all O(n) operations are equally fast. An O(n) array traversal that hits CPU cache lines is 10-100x faster than an O(n) linked list traversal that jumps between random memory addresses. Big-O ignores constants, but constants matter in practice.\n\nInterview trap: \"Design a data structure that supports insert, delete, and getRandom in O(1) average.\" The trick is combining an array (for O(1) random access) with a hash map (for O(1) lookup of element positions). When deleting, swap with the last element before popping to avoid O(n) shift.\n\nEngineering mindset: don't memorize operation complexities — derive them. An array's O(1) index access comes from the formula base + index × elementSize. A linked list is O(n) for access because you must follow pointers one by one. Understanding the why makes the what obvious.",

        codeExample: `// Design a data structure for O(1) insert, delete, getRandom\nclass RandomizedSet {\n  private nums: number[] = [];\n  private indices = new Map<number, number>();\n\n  insert(val: number): boolean {\n    if (this.indices.has(val)) return false;\n    this.indices.set(val, this.nums.length);\n    this.nums.push(val);\n    return true;\n  }\n\n  remove(val: number): boolean {\n    if (!this.indices.has(val)) return false;\n    const i = this.indices.get(val)!;\n    const last = this.nums[this.nums.length - 1];\n    this.nums[i] = last;          // swap with last\n    this.indices.set(last, i);    // update last's index\n    this.nums.pop();              // O(1) removal\n    this.indices.delete(val);\n    return true;\n  }\n\n  getRandom(): number {\n    const i = Math.floor(Math.random() * this.nums.length);\n    return this.nums[i];          // O(1) random access\n  }\n}`,

        language: "typescript"

      },

      {

        id: "2",

        title: "Arrays & Dynamic Arrays",

        content: "Off-by-one errors are the #1 bug in array code. Every student writes `arr.length` when they meant `arr.length - 1`. Why? Zero-indexing. An array of 5 elements has valid indices 0 through 4. The last element is always at `arr[arr.length - 1]`, not `arr[arr.length]`.\n\nThe real problem: arrays have fixed size. You pre-allocate 100 slots but the input has 101 elements. Dynamic arrays (like JavaScript's Array, Python's list, or C++'s vector) solve this by doubling capacity when full. That single resize costs O(n) to copy everything, but because it happens rarely, the amortized cost of each insert is still O(1).\n\nCommon interview trap: Two Sum seems easy until they ask for O(1) space. The brute-force is O(n²), the hash map is O(n) with O(n) space. But what if the array is sorted? Two pointers — one at each end, move inward based on sum — O(n) time, O(1) space. Knowing the input constraint changes the optimal algorithm.\n\nAnalogy: An array is like a hotel with numbered rooms. You can walk directly to room 42 without checking rooms 1-41. That's O(1) random access. But adding a person between rooms requires everyone after to shuffle down the hall. That's O(n) insert.\n\nEngineering mindset: contiguous memory is both the superpower (cache locality, constant-time index) and the weakness (costly inserts/deletes). Every array problem reduces to managing this tradeoff.",

        codeExample: `// Two Sum II - Input Array Is Sorted\nfunction twoSumSorted(nums: number[], target: number): number[] {\n  let left = 0, right = nums.length - 1;\n  while (left < right) {\n    const sum = nums[left] + nums[right];\n    if (sum === target) return [left + 1, right + 1];\n    if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}\n\n// Dynamic array: doubling on resize\nclass DynamicArray {\n  private data: number[] = new Array(1);\n  private size = 0;\n\n  push(val: number): void {\n    if (this.size === this.data.length) {\n      const newArr = new Array(this.data.length * 2);\n      for (let i = 0; i < this.size; i++) newArr[i] = this.data[i];\n      this.data = newArr;\n    }\n    this.data[this.size++] = val;\n  }\n\n  get(i: number): number {\n    if (i < 0 || i >= this.size) throw new Error(\"Index out of bounds\");\n    return this.data[i];\n  }\n\n  get length(): number { return this.size; }\n}`,

        language: "typescript"

      },

      {

        id: "3",

        title: "Strings & Pattern Matching",

        content: "Every naive pattern matcher falls into the same trap: `indexOf(\"abc\")` in a string like \"aaaaabaaaaac\" takes much longer than expected. The naive O(n×m) algorithm scans from every position, doing redundant work when a partial match fails. For a 100KB text and a 1KB pattern, that's 100 million comparisons.\n\nKMP (Knuth-Morris-Pratt) solves this with a devastatingly simple insight: when a mismatch occurs, the pattern itself tells you how far to slide forward — no need to backtrack in the text. It precomputes an LPS (Longest Proper Prefix that is also Suffix) array once, then uses it to skip characters during search. O(n + m) guaranteed.\n\nCommon mistake: forgetting strings are immutable in most languages. `str1 + str2` in a loop creates a new string every iteration — O(n²) time. Use arrays or StringBuilder instead.\n\nInterview trap: \"Given two strings, check if they're one edit away (insert, delete, replace).\" Most candidates jump to edit distance DP. Simpler: if lengths differ by more than 1, return false. If same length, check for exactly one replacement. If off by one, check insert/delete by skipping one character in the longer string.\n\nAnalogy: Searching for a pattern in text is like finding a lost item in a dark room. Brute force covers every inch. KMP uses a \"memory\" of where you've already looked to avoid re-checking areas you know can't contain the target.\n\nEngineering mindset: when you see a mismatch, ask \"what do I already know about the characters I've seen?\" That information should never be thrown away.",

        codeExample: `// KMP pattern search\nfunction strStr(haystack: string, needle: string): number {\n  if (!needle) return 0;\n  const lps = buildLPS(needle);\n  let i = 0, j = 0;\n  while (i < haystack.length) {\n    if (haystack[i] === needle[j]) { i++; j++; }\n    if (j === needle.length) return i - j;\n    if (i < haystack.length && haystack[i] !== needle[j]) {\n      j > 0 ? j = lps[j - 1] : i++;\n    }\n  }\n  return -1;\n}\n\nfunction buildLPS(p: string): number[] {\n  const lps = Array(p.length).fill(0);\n  let len = 0, i = 1;\n  while (i < p.length) {\n    if (p[i] === p[len]) lps[i++] = ++len;\n    else if (len > 0) len = lps[len - 1];\n    else lps[i++] = 0;\n  }\n  return lps;\n}\n\n// One Edit Distance check\nfunction isOneEditDistance(s: string, t: string): boolean {\n  if (Math.abs(s.length - t.length) > 1) return false;\n  if (s.length === t.length) {\n    let diffs = 0;\n    for (let i = 0; i < s.length; i++) if (s[i] !== t[i]) diffs++;\n    return diffs === 1;\n  }\n  const [longer, shorter] = s.length > t.length ? [s, t] : [t, s];\n  for (let i = 0; i < shorter.length; i++) {\n    if (longer[i] !== shorter[i]) return longer.slice(i + 1) === shorter.slice(i);\n  }\n  return true;\n}`,

        language: "typescript"

      },

      {

        id: "4",

        title: "Linked Lists",

        content: "Biggest problem with arrays: inserting at the front costs O(n) because everything shifts. A linked list solves this — just flip a pointer and you've inserted in O(1). The cost? You lose random access. To find element #5, you must walk through elements 1 through 4.\n\nBut this freedom comes with its own nightmare: pointer management. The #1 bug with linked lists is losing the head pointer. If you assign `head = head.next` without saving the old head, you've just leaked that node. A close second is dereferencing `current.next` when `current` is null.\n\nCommon interview trap: \"Detect a cycle in a linked list.\" Floyd's Tortoise and Hare — a slow pointer moves one step, a fast pointer moves two. If they ever meet, there's a cycle. O(n) time, O(1) space. Follow-up: \"Find the node where the cycle begins.\" After the pointers meet, reset one pointer to head and move both one step at a time — they'll meet at the cycle start.\n\nAnalogy: A singly linked list is like a treasure hunt where each clue tells you where to find the next one. You can't jump to clue 5 — you must follow the chain. A doubly linked list adds a \"previous clue\" pointer, letting you backtrack.\n\nEngineering mindset: linked lists teach pointer thinking — every operation is simply reassigning references. The core skill is visualizing pointer positions before and after each operation. Draw it on a whiteboard before coding.",

        codeExample: `class ListNode {\n  constructor(\n    public val: number,\n    public next: ListNode | null = null\n  ) {}\n}\n\n// Floyd's Cycle Detection\nfunction hasCycle(head: ListNode | null): boolean {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow!.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}\n\n// Reverse a linked list iteratively\nfunction reverseList(head: ListNode | null): ListNode | null {\n  let prev: ListNode | null = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}\n\n// Find middle node using slow & fast\nfunction middleNode(head: ListNode | null): ListNode | null {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow!.next;\n    fast = fast.next.next;\n  }\n  return slow;\n}\n\n// Remove nth node from end (one pass)\nfunction removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {\n  const dummy = new ListNode(0, head);\n  let slow: ListNode | null = dummy;\n  let fast: ListNode | null = dummy;\n  for (let i = 0; i <= n; i++) fast = fast!.next;\n  while (fast) { slow = slow!.next; fast = fast.next; }\n  slow!.next = slow!.next!.next;\n  return dummy.next;\n}`,

        language: "typescript"

      },

      {

        id: "5",

        title: "Stacks",

        content: "Biggest struggle: how do compilers check if your code's parentheses match? `({[)]}` — unbalanced, but naive counting fails because each bracket type matters. A stack solves this: push opening brackets, pop and match on closing brackets. If the stack's empty at the end, you're balanced.\n\nA stack is LIFO (Last In, First Out). The plate dispenser at a cafeteria — you grab the top plate, which was the last one added. Push adds a plate, pop removes it, peek lets you see the top without taking it.\n\nCommon mistake: popping from an empty stack. This crashes your program. Always guard with `if (stack.length === 0) return` or similar check.\n\nInterview trap: \"Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.\" Most candidates think of scanning the stack to find the min, which is O(n). The trick: maintain a second stack that tracks the current minimum. On push, push `Math.min(val, currentMin)` onto the min-stack. On pop, pop both stacks. Now getMin() is just peeking at the min-stack.\n\nAnalogy: A stack is like a browser's back button. You navigate A → B → C. Each page pushed onto the stack. Hit back — C pops off, you return to B. This is exactly how the call stack works in recursion: functions push onto the call stack, and return pops them off.\n\nEngineering mindset: whenever you need to match things that enclose other things (brackets, HTML tags, function calls), or when the most recent item should be processed first — use a stack.",

        codeExample: `// Min Stack - O(1) getMin\nclass MinStack {\n  private stack: number[] = [];\n  private mins: number[] = [];\n\n  push(val: number): void {\n    this.stack.push(val);\n    const min = this.mins.length === 0\n      ? val : Math.min(val, this.mins[this.mins.length - 1]);\n    this.mins.push(min);\n  }\n\n  pop(): void {\n    this.stack.pop();\n    this.mins.pop();\n  }\n\n  top(): number {\n    return this.stack[this.stack.length - 1];\n  }\n\n  getMin(): number {\n    return this.mins[this.mins.length - 1];\n  }\n}\n\n// Valid Parentheses\nfunction isValid(s: string): boolean {\n  const stack: string[] = [];\n  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };\n  for (const c of s) {\n    if ('({['.includes(c)) {\n      stack.push(c);\n    } else if (stack.pop() !== pairs[c]) {\n      return false;\n    }\n  }\n  return stack.length === 0;\n}\n\n// Daily Temperatures — next greater element\nfunction dailyTemperatures(temps: number[]): number[] {\n  const result = Array(temps.length).fill(0);\n  const stack: number[] = [];\n  for (let i = 0; i < temps.length; i++) {\n    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {\n      const j = stack.pop()!;\n      result[j] = i - j;\n    }\n    stack.push(i);\n  }\n  return result;\n}`,

        language: "typescript"

      },

      {

        id: "6",

        title: "Queues & Deques",

        content: "Biggest problem: you're processing tasks, and the first task submitted should finish first. FIFO — First In, First Out. Like the checkout line at a grocery store. Arrays seem to work, but `shift()` on a JavaScript array is O(n) — every element moves down one index.\n\nA proper queue uses a linked list or circular buffer. For a circular queue, maintain front and rear pointers: `rear = (rear + 1) % capacity`. When front catches rear, the queue is full. This reuses space at the front of the array after elements are dequeued.\n\nCommon mistake: using `Array.shift()` and `Array.unshift()` in performance-critical code. These shift all elements, costing O(n) per operation. Use two stacks (push to one, pop from the other) or a dedicated deque implementation.\n\nInterview trap: \"Sliding window maximum.\" Given an array and window size k, find the maximum in each window. Brute force is O(n×k). A deque (double-ended queue) solves it in O(n): maintain indices in the deque such that values are decreasing. The front is always the window's maximum. When moving the window, remove indices outside the window from the front and remove smaller values from the back before adding the new element.\n\nAnalogy: A queue is like a printer spool — documents are printed in the order they were sent. A deque is like a hallway with doors at both ends — you can enter and exit from either side.\n\nEngineering mindset: queue for BFS, deque for sliding window problems, priority queue (heap) when you need items sorted by something other than arrival time.",

        codeExample: `// Queue using two stacks (amortized O(1))\nclass Queue<T> {\n  private inbox: T[] = [];\n  private outbox: T[] = [];\n\n  enqueue(item: T): void {\n    this.inbox.push(item);\n  }\n\n  dequeue(): T | undefined {\n    if (this.outbox.length === 0) {\n      while (this.inbox.length) this.outbox.push(this.inbox.pop()!);\n    }\n    return this.outbox.pop();\n  }\n\n  peek(): T | undefined {\n    if (this.outbox.length === 0) {\n      while (this.inbox.length) this.outbox.push(this.inbox.pop()!);\n    }\n    return this.outbox[this.outbox.length - 1];\n  }\n\n  isEmpty(): boolean { return this.inbox.length === 0 && this.outbox.length === 0; }\n}\n\n// Sliding Window Maximum - O(n) using deque\nfunction maxSlidingWindow(nums: number[], k: number): number[] {\n  const deque: number[] = [];\n  const result: number[] = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (deque.length && deque[0] < i - k + 1) deque.shift();\n    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();\n    deque.push(i);\n    if (i >= k - 1) result.push(nums[deque[0]]);\n  }\n  return result;\n}`,

        language: "typescript"

      },

      {

        id: "7",

        title: "Trees & Binary Trees",

        content: "Biggest problem with linear structures: they can't represent hierarchy. Your file system isn't a flat array — folders contain files and subfolders. HTML isn't a list — elements nest inside other elements. You need a tree.\n\nA binary tree has a root and at most two children (left and right). A Binary Search Tree (BST) adds one rule: all left descendants are smaller, all right descendants are larger. This magical property means in-order traversal yields sorted order. And search, insert, and delete become O(log n) — if the tree is balanced.\n\nCommon mistake: \"Validate BST.\" Most beginners check only immediate children — `root.left.val < root.val < root.right.val`. That's wrong! Every node in the left subtree must be less than the root, not just the immediate child. The right subtree of a left child could contain values larger than root. Pass down min and max bounds recursively.\n\nInterview trap: \"Lowest Common Ancestor of a BST.\" Most candidates overthink this. Since it's a BST, start at the root and walk down: if both nodes are smaller, go left. If both larger, go right. Otherwise, the current node is the LCA — one node is in the left subtree, the other in the right. O(h) time, O(1) space.\n\nAnalogy: A tree is like a company org chart. The CEO (root) has VPs (children), who have managers, who have ICs. To find someone, start at the CEO and follow the chain of command. A BST is like a phone book — you open to the middle and decide whether to go left (earlier names) or right (later names), halving the search space each time.",

        codeExample: `class TreeNode {\n  constructor(\n    public val: number = 0,\n    public left: TreeNode | null = null,\n    public right: TreeNode | null = null\n  ) {}\n}\n\n// Validate BST with min/max bounds\nfunction isValidBST(root: TreeNode | null, min = -Infinity, max = Infinity): boolean {\n  if (!root) return true;\n  if (root.val <= min || root.val >= max) return false;\n  return isValidBST(root.left, min, root.val)\n      && isValidBST(root.right, root.val, max);\n}\n\n// LCA in BST\nfunction lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {\n  while (root) {\n    if (p.val < root.val && q.val < root.val) root = root.left;\n    else if (p.val > root.val && q.val > root.val) root = root.right;\n    else return root;\n  }\n  return null;\n}\n\n// Level order traversal\nfunction levelOrder(root: TreeNode | null): number[][] {\n  if (!root) return [];\n  const result: number[][] = [];\n  const queue: TreeNode[] = [root];\n  while (queue.length) {\n    const level: number[] = [];\n    for (let i = queue.length; i > 0; i--) {\n      const node = queue.shift()!;\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n  }\n  return result;\n}`,

        language: "typescript"

      },

      {

        id: "8",

        title: "Heaps & Priority Queues",

        content: "Biggest struggle: you need the k largest elements from an array. Sorting the whole array is O(n log n) — wasteful when you only need the top 10 out of a million. A min-heap of size k does it in O(n log k).\n\nA heap is a complete binary tree with a special property: in a max-heap, every parent is larger than its children. The largest element is at the root. In a min-heap, every parent is smaller. It's stored in an array where index i has children at 2i+1 and 2i+2 — no pointers needed.\n\nCommon mistake: confusing heap property with BST property. In a BST, left < parent < right globally. In a heap, the only guarantee is parent-child comparison — a child can be larger or smaller than its sibling. You cannot search a heap efficiently (no O(log n) binary search).\n\nInterview trap: \"Top K Frequent Elements.\" Most candidates over-engineer. Step 1: build a frequency map (O(n)). Step 2: use a min-heap of size k — push each (frequency, element) pair. If heap size exceeds k, pop the smallest frequency. At the end, the heap contains the k most frequent. O(n log k).\n\nAnalogy: A priority queue is like an emergency room triage. Patients don't get treated FIFO — the one with the heart attack goes before the one with a paper cut. Priority determines order, not arrival time.\n\nEngineering mindset: whenever you need \"the top k\" or \"the smallest k\" — think heap. Whenever you need items processed by priority rather than order — think heap. Merge k sorted lists? Min-heap. Dijkstra's shortest path? Min-heap. Find median in a stream? Two heaps (one min, one max).",

        codeExample: `// Min-heap of size k for Top K elements\nfunction findKthLargest(nums: number[], k: number): number {\n  const heap: number[] = [];\n  for (const n of nums) {\n    heap.push(n);\n    heap.sort((a, b) => a - b); // simplifies to built-in sort (smallest first)\n    if (heap.length > k) heap.shift();\n  }\n  return heap[0];\n}\n\n// Priority queue for merging k sorted lists\nfunction mergeKLists(lists: number[][]): number[] {\n  const pq: [number, number, number][] = []; // [val, listIdx, elemIdx]\n  for (let i = 0; i < lists.length; i++) {\n    if (lists[i].length) pq.push([lists[i][0], i, 0]);\n  }\n  pq.sort((a, b) => a[0] - b[0]);\n  const result: number[] = [];\n  while (pq.length) {\n    const [val, li, ei] = pq.shift()!;\n    result.push(val);\n    if (ei + 1 < lists[li].length) {\n      pq.push([lists[li][ei + 1], li, ei + 1]);\n      pq.sort((a, b) => a[0] - b[0]);\n    }\n  }\n  return result;\n}\n\n// Find median from data stream (two heaps)\nclass MedianFinder {\n  private minHeap: number[] = [];\n  private maxHeap: number[] = [];\n  addNum(num: number): void {\n    this.maxHeap.push(num);\n    this.maxHeap.sort((a, b) => b - a);\n    this.minHeap.push(this.maxHeap.shift()!);\n    this.minHeap.sort((a, b) => a - b);\n    if (this.maxHeap.length < this.minHeap.length) {\n      this.maxHeap.push(this.minHeap.shift()!);\n      this.maxHeap.sort((a, b) => b - a);\n    }\n  }\n  findMedian(): number {\n    return this.maxHeap.length > this.minHeap.length\n      ? this.maxHeap[0]\n      : (this.maxHeap[0] + this.minHeap[0]) / 2;\n  }\n}`,

        language: "typescript"

      },

      {

        id: "9",

        title: "Graphs",

        content: "Biggest problem: how do I find the shortest route between two cities? Or whether two people on Facebook are connected? Or what order to take courses so prerequisites are satisfied? These are all graph problems — and students often can't recognize the pattern.\n\nA graph is just nodes (vertices) connected by edges. Edges can be directed (Twitter follow: A → B) or undirected (Facebook friend: A — B), weighted (distance in km) or unweighted.\n\nCommon mistake: forgetting to track visited nodes. Without a visited set, DFS/BFS loops forever in a cyclic graph. Always initialize `visited = new Set()` and check/mark when visiting a node.\n\nInterview trap: \"Clone a graph.\" Given a reference to a node in a graph, return a deep copy. The key insight: use a hash map from original node to cloned node. BFS or DFS from the start, and for each edge, either create a new neighbor or reuse an already-cloned one from the map. Without the map, you'd re-clone the same node multiple times, creating an infinite loop or a broken graph.\n\nAnalogy: BFS is like dropping ink on paper — it spreads outward evenly in all directions, reaching closest points first. That's why it finds the shortest path in unweighted graphs. DFS is like exploring a cave — you go as deep as possible down one tunnel before backing up and trying another.\n\nEngineering mindset: recognize graph problems by their keywords — \"connected\", \"shortest path\", \"reachable\", \"dependency order\". Choose BFS when distance matters (shortest path, levels). Choose DFS when structure matters (cycles, topo sort, connectivity).",

        codeExample: `// Clone graph using BFS + hash map\nclass GraphNode {\n  constructor(public val: number, public neighbors: GraphNode[] = []) {}\n}\n\nfunction cloneGraph(node: GraphNode | null): GraphNode | null {\n  if (!node) return null;\n  const map = new Map<GraphNode, GraphNode>();\n  const queue: GraphNode[] = [node];\n  map.set(node, new GraphNode(node.val));\n  while (queue.length) {\n    const curr = queue.shift()!;\n    for (const n of curr.neighbors) {\n      if (!map.has(n)) {\n        map.set(n, new GraphNode(n.val));\n        queue.push(n);\n      }\n      map.get(curr)!.neighbors.push(map.get(n)!);\n    }\n  }\n  return map.get(node)!;\n}\n\n// BFS shortest path in unweighted graph\nfunction shortestPath(graph: number[][], start: number, end: number): number {\n  const visited = new Set<number>();\n  const queue: [number, number][] = [[start, 0]];\n  visited.add(start);\n  while (queue.length) {\n    const [node, dist] = queue.shift()!;\n    if (node === end) return dist;\n    for (const n of graph[node]) {\n      if (!visited.has(n)) {\n        visited.add(n);\n        queue.push([n, dist + 1]);\n      }\n    }\n  }\n  return -1;\n}`,

        language: "typescript"

      },

      {

        id: "10",

        title: "Hash Tables",

        content: "Biggest struggling moment: arrays are indexed by integers (0, 1, 2…). But what if you need to look something up by name, not index? Searching an array by value is O(n). That's where hash tables come in — average O(1) lookup by any key.\n\nA hash table uses a hash function to convert a key (string, number, object) into an array index. Good hash functions distribute keys uniformly. Bad ones cause collisions — multiple keys mapping to the same index.\n\nCollision handling is crucial. Chaining stores a linked list at each index — multiple entries share the same bucket. Open addressing finds the next empty slot when a collision occurs. The load factor (elements / capacity) determines when to resize. At 0.75 load, the table doubles and all entries are rehashed. This resize costs O(n) but is amortized O(1) per insert.\n\nCommon mistake: using an object as a hash map with integer keys. JavaScript converts integer keys to strings. Use `Map<number, T>` instead. Also: `Map.prototype.has()` exists but beginners use `map[key] !== undefined` which gives false negatives for explicitly stored `undefined` values.\n\nInterview trap: \"Two Sum\" — O(n) with hash map. But the spin: \"Find all pairs that sum to target.\" Now you need to handle duplicates correctly. Use a frequency map: for each element, check if the complement exists with remaining count > 0. Decrement counts to avoid reusing the same element.\n\nAnalogy: A hash table is like a library with a card catalog. The hash function is the Dewey Decimal System — it tells you which shelf (bucket) a book should be on. Multiple books can share a shelf (collision), but you can still find yours quickly by checking the few books there.",

        codeExample: `// Two Sum — O(n) with hash map\nfunction twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement)!, i];\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\n// First non-repeating character\nfunction firstUniqChar(s: string): number {\n  const freq = new Map<string, number>();\n  for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);\n  for (let i = 0; i < s.length; i++) {\n    if (freq.get(s[i]) === 1) return i;\n  }\n  return -1;\n}\n\n// Group Anagrams\nfunction groupAnagrams(strs: string[]): string[][] {\n  const map = new Map<string, string[]>();\n  for (const s of strs) {\n    const key = s.split('').sort().join('');\n    if (!map.has(key)) map.set(key, []);\n    map.get(key)!.push(s);\n  }\n  return Array.from(map.values());\n}\n\n// Contains Duplicate II — within k distance\nfunction containsNearbyDuplicate(nums: number[], k: number): boolean {\n  const seen = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    if (seen.has(nums[i]) && i - seen.get(nums[i])! <= k) return true;\n    seen.set(nums[i], i);\n  }\n  return false;\n}`,

        language: "typescript"

      },

    ],

  },

  {

    slug: "algorithms",

    title: "Algorithms",

    description: "Learn sorting, searching, dynamic programming, and greedy algorithms.",

    icon: "⚡",

    notesUrl: "https://noteslink.in/product/daa-design-and-analysis-of-algorithm-kiit/",

    color: "from-amber-500 to-orange-600",
    category: "Core CS",

    lessons: [

      {

        id: "1",

        title: "Introduction to Algorithms",

        content: "Biggest mistake beginners make: treating algorithms as abstract math, not engineering tools. An algorithm isn't just code — it's a decision. Every algorithm you pick trades time against space, precision against performance, simplicity against speed.\n\nThe real problem: you have a working solution, but it times out on large inputs. You don't need a different language. You need to understand growth rates. O(n²) vs O(n log n) is the difference between 1 second and 17 minutes when n = 1,000,000.\n\nCommon trap: assuming lower Big-O always runs faster. O(n) with high constant factors can lose to O(n²) for small n. The hidden constant matters — that's why insertion sort beats quicksort on arrays under ~50 elements.\n\nEngineering mindset: analyze before you optimize. Profile first. Don't guess where the bottleneck is. Amdahl's Law: speeding up 50% of the code by 2x only gives 33% overall gain. Focus on the critical path.\n\nInterview trap: \"What's the time complexity?\" They're not testing if you can recite the answer. They're testing if you can derive it — trace the loops, count operations, explain your reasoning step by step.",

        codeExample: `// The growth rate trap: O(n^2) vs O(n log n)\n// For n=1,000,000:\n// n^2 = 1e12 operations (17 min at 1B ops/sec)\n// n log n ≈ 20e6 operations (0.02 sec at 1B ops/sec)\n\nfunction analyzeTime<T>(\n  label: string,\n  fn: () => T\n): { result: T; timeMs: number } {\n  const start = performance.now();\n  const result = fn();\n  return { result, timeMs: performance.now() - start };\n}\n\nfunction findDuplicatesBrute(arr: number[]): boolean {\n  for (let i = 0; i < arr.length; i++)       // O(n)\n    for (let j = i + 1; j < arr.length; j++) // O(n)\n      if (arr[i] === arr[j]) return true;     // Total: O(n^2)\n  return false;\n}\n\nfunction findDuplicatesSet(arr: number[]): boolean {\n  const seen = new Set<number>();\n  for (const x of arr) {          // O(n)\n    if (seen.has(x)) return true; // O(1)\n    seen.add(x);                  // O(1)\n  }\n  return false;                   // Total: O(n)\n}\n\n// Profile before optimizing\nconst data = Array.from({ length: 100000 }, (_, i) => i);\nconsole.log(\n  analyzeTime(\"brute\", () => findDuplicatesBrute(data)).timeMs,\n  analyzeTime(\"set\", () => findDuplicatesSet(data)).timeMs\n);`,

        language: "typescript"

      },

      {

        id: "2",

        title: "Sorting Algorithms",

        content: "Biggest sorting mistake: assuming QuickSort is always O(n log n). It isn't. Pivot selection is everything. Always picking first or last element on already-sorted data? That's O(n²). The fix: random pivot or median-of-three.\n\nReal problem: you need a stable sort (preserving original order of equal elements). QuickSort is unstable. Merge Sort is stable. Java's Collections.sort uses TimSort — a hybrid of merge sort and insertion sort — because real-world data often has runs of sorted elements.\n\nInterview trap: \"Implement insertion sort.\" Easy. But follow-up: \"When would you use it?\" Answer: small arrays (n < 50), nearly-sorted data (O(n) on best case), online sorting (sort as elements arrive).\n\nComparing sorts: Merge Sort needs O(n) extra space. QuickSort sorts in-place but its recursive stack is O(log n) on average, O(n) worst case. Heap Sort is in-place and guarantees O(n log n), but has poor cache locality — real-world performance is worse than QuickSort despite same Big-O.\n\nEngineering mindset: Never write your own sort. Use the language's built-in. But understand WHY your language picked its sort so you know when it'll hurt you.",

        codeExample: `// The pivot trap - bad QuickSort\nfunction badQuickSort(arr: number[]): number[] {\n  // First element pivot: O(n^2) on already-sorted data!\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0]; // Bad choice!\n  const left = arr.slice(1).filter(x => x < pivot);\n  const right = arr.slice(1).filter(x => x >= pivot);\n  return [...badQuickSort(left), pivot, ...badQuickSort(right)];\n}\n\n// Fixed: median-of-three pivot\nfunction goodQuickSort(arr: number[]): number[] {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const pivot = [arr[0], arr[mid], arr[arr.length - 1]].sort((a, b) => a - b)[1];\n  const left = arr.filter(x => x < pivot);\n  const right = arr.filter(x => x > pivot);\n  const equal = arr.filter(x => x === pivot);\n  return [...goodQuickSort(left), ...equal, ...goodQuickSort(right)];\n}\n\n// When insertion sort actually wins\nfunction hybridSort(arr: number[], threshold = 50): number[] {\n  if (arr.length <= threshold) {\n    for (let i = 1; i < arr.length; i++) {\n      const key = arr[i]; let j = i - 1;\n      while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }\n      arr[j + 1] = key;\n    }\n    return arr;\n  }\n  return goodQuickSort(arr);\n}`,

        language: "typescript"

      },

      {

        id: "3",

        title: "Searching Algorithms",

        content: "Most common interview trap on binary search: infinite loops and off-by-one errors. The root cause? Confusing inclusive vs exclusive bounds. Write `left + Math.floor((right - left) / 2)` not `(left + right) / 2` to avoid integer overflow.\n\nReal problem: binary search assumes sorted data. But what if the data isn't sorted? You can't just binary search. You must sort first (O(n log n)), then search. For single lookups, linear search is faster. For repeated lookups, sorting + binary wins.\n\nInterview trap: \"Search in a rotated sorted array.\" The trick: binary search still works. First determine which half is sorted (compare arr[left] vs arr[mid]), then check if target lies in that sorted range. Many candidates fail because they try to find the rotation point first — unnecessary.\n\nEngineering mindset: not all searches are equals. Hash-based lookups (Set, Map) give O(1) average but use more memory. Binary search gives O(log n) with zero extra memory. For production code, use TreeSet (balanced BST) when you need both search AND ordered traversal.\n\nCommon mistake: binary search on linked lists. Random access is O(n), so binary search is O(n log n) — worse than linear!",

        codeExample: `// Binary search - correct implementation\nfunction binarySearch(arr: number[], target: number): number {\n  let left = 0;\n  let right = arr.length - 1; // inclusive bound\n\n  while (left <= right) {     // <= not <, crucial!\n    const mid = left + Math.floor((right - left) / 2); // overflow-safe\n\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\n\n// Search in rotated sorted array - no pivot needed\nfunction searchRotated(nums: number[], target: number): number {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = l + Math.floor((r - l) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {                   // left half is sorted\n      if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n      else l = mid + 1;\n    } else {                                       // right half is sorted\n      if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n      else r = mid - 1;\n    }\n  }\n  return -1;\n}\n\n// Lower bound - first position where arr[i] >= target\nfunction lowerBound(arr: number[], target: number): number {\n  let l = 0, r = arr.length;  // exclusive upper bound\n  while (l < r) {\n    const mid = l + Math.floor((r - l) / 2);\n    if (arr[mid] < target) l = mid + 1;\n    else r = mid;\n  }\n  return l;\n}`,

        language: "typescript"

      },

      {

        id: "4",

        title: "Divide and Conquer",

        content: "Biggest divide-and-conquer mistake: thinking it's just recursion. It's not. Three-phase engineering: DIVIDE (split problem), CONQUER (solve subproblems), COMBINE (merge results). The hard part is always the COMBINE step.\n\nReal problem: Maximum subarray sum. Brute force is O(n³) → O(n²) with prefix sums. Divide and conquer gets it to O(n log n). But Kadane's algorithm (O(n) single pass) beats them all. The lesson: D&C isn't always the fastest. It's the pattern that works when linear scans can't.\n\nInterview trap: \"Write merge sort.\" Everyone memorizes the merge step. But the follow-up: \"What's the space complexity?\" If you answered O(n log n) because of recursion stack + arrays created at each level, you're wrong. Only O(n) extra space — merge arrays at same depth reuse memory.\n\nCommon mistake: ignoring the recursion tree depth. Every recursive call adds to the call stack. On n=1,000,000, merge sort needs ~20 stack frames. Recursive Quicksort could need 1,000,000 — stack overflow! That's why production sorts use iteration or tail recursion.\n\nEngineering mindset: D&C is parallelization-friendly. MapReduce is D&C at scale. Split across machines, solve independently, combine results.",

        codeExample: `// Maximum subarray sum - 3 approaches\nfunction maxSubarrayKadane(arr: number[]): number {\n  let max = -Infinity, curr = 0;\n  for (const x of arr) {\n    curr = Math.max(x, curr + x);\n    max = Math.max(max, curr);\n  }\n  return max; // O(n), impossible to beat\n}\n\n// D&C version - overkill but shows the pattern\nfunction maxSubarrayDC(arr: number[], l: number, r: number): number {\n  if (l === r) return arr[l];\n  const mid = Math.floor((l + r) / 2);\n\n  // Must cross mid - the COMBINE step\n  let leftSum = -Infinity, sum = 0;\n  for (let i = mid; i >= l; i--) { sum += arr[i]; leftSum = Math.max(leftSum, sum); }\n  let rightSum = -Infinity; sum = 0;\n  for (let i = mid + 1; i <= r; i++) { sum += arr[i]; rightSum = Math.max(rightSum, sum); }\n\n  return Math.max(\n    maxSubarrayDC(arr, l, mid),\n    maxSubarrayDC(arr, mid + 1, r),\n    leftSum + rightSum\n  ); // O(n log n) - the divide overhead costs\n}\n\n// Merge sort - O(n log n) time, O(n) space\nfunction mergeSort(arr: number[]): number[] {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));\n}\n\nfunction merge(l: number[], r: number[]): number[] {\n  const out: number[] = [];\n  let i = 0, j = 0;\n  while (i < l.length && j < r.length)\n    out.push(l[i] <= r[j] ? l[i++] : r[j++]);\n  return [...out, ...l.slice(i), ...r.slice(j)];\n}`,

        language: "typescript"

      },

      {

        id: "5",

        title: "Greedy Algorithms",

        content: "Biggest greedy mistake: assuming \"pick what looks best now\" always works. It doesn't. The greedy choice property must hold — and proving it is the actual interview.\n\nReal problem: Coin change (minimum coins to make amount). Greedy works for US coins (25, 10, 5, 1) — always pick the largest. But for arbitrary denominations like {1, 3, 4} to make 6? Greedy picks 4+1+1 (3 coins), optimal is 3+3 (2 coins). Greedy fails.\n\nInterview trap: \"Find minimum spanning tree.\" Candidates code Prim's but can't explain WHY the greedy choice works. The cut property: for any cut, the minimum crossing edge belongs to some MST. If you can't articulate the invariant, you haven't understood it.\n\nEngineering mindset: Greedy is for optimization problems with optimal substructure AND the greedy choice property. When both hold, greedy beats DP every time — O(n log n) vs O(n²). When only optimal substructure holds, you need DP. When neither, you need backtracking.\n\nCommon mistake: Activity selection — sorting by end time (correct) vs start time (wrong). If you sort by start time, you get a valid set but not necessarily maximum cardinality. The greedy choice is the activity that finishes earliest, giving the most room for remaining activities.",

        codeExample: `// Activity Selection - correct greedy\nfunction activitySelection(\n  start: number[], end: number[]\n): { count: number; selected: number[] } {\n  const activities = start\n    .map((s, i) => ({ s, e: end[i], i }))\n    .sort((a, b) => a.e - b.e); // Greedy: earliest finish first\n\n  const selected = [0];\n  let lastEnd = activities[0].e;\n\n  for (let i = 1; i < activities.length; i++) {\n    if (activities[i].s >= lastEnd) {\n      selected.push(i);\n      lastEnd = activities[i].e;\n    }\n  }\n\n  return { count: selected.length, selected };\n}\n\n// Coin change - greedy fails for {1, 3, 4}, amount = 6\nfunction coinChangeGreedy(coins: number[], amount: number): number {\n  const sorted = [...coins].sort((a, b) => b - a);\n  let remaining = amount, count = 0;\n  for (const coin of sorted) {\n    const take = Math.floor(remaining / coin);\n    count += take;\n    remaining -= take * coin;\n  }\n  return remaining === 0 ? count : -1;\n}\n\n// {1, 3, 4}, amount 6 => greedy picks 4+1+1=3, optimal is 3+3=2\nconsole.log(coinChangeGreedy([1, 3, 4], 6)); // 3 (WRONG)\n\n// Huffman coding - classic greedy\n// Merge the two smallest frequencies, repeat\nfunction huffmanCost(freqs: number[]): number {\n  const heap = [...freqs].sort((a, b) => a - b);\n  let total = 0;\n  while (heap.length > 1) {\n    const a = heap.shift()!, b = heap.shift()!;\n    total += a + b;\n    heap.push(a + b);\n    heap.sort((x, y) => x - y);\n  }\n  return total;\n}`,

        language: "typescript"

      },

      {

        id: "6",

        title: "Dynamic Programming",

        content: "Biggest DP mistake: trying to solve it from the problem statement without framing it as a recursion first. Rule: If brute force tries all subsets/combinations and subproblems repeat, use DP.\n\nDP is confusing because everyone starts with Fibonacci — it's too simple for the framework to click. Real DP struggles start with \"when to use it?\" Decision tree: 1) Can you express the answer in terms of smaller subproblems? 2) Do those subproblems overlap? If yes to both, DP applies.\n\nInterview trap: \"0/1 Knapsack.\" The canonical version: 2D DP where dp[i][w] = max value using first i items with capacity w. Follow-up: \"How do you solve this with 1D array?\" Realization: you iterate w backwards (capacity down to weight[i]) to avoid reusing items.\n\nCommon mistake: forgetting to initialize base cases correctly. In DP, the base case is not trivial — it's the first 1-2 rows/values that define the entire recurrence. Get the base wrong, everything cascades.\n\nEngineering mindset: Bottom-up (tabulation) is safer than top-down (memoization). No recursion depth issues, better cache locality, easier to debug. Use top-down only when the state space is sparse (few states reachable).",

        codeExample: `// Knapsack: 2D → 1D space optimization\nfunction knapsack2D(weights: number[], values: number[], cap: number): number {\n  const n = weights.length;\n  const dp = Array.from({ length: n + 1 }, () => Array(cap + 1).fill(0));\n  for (let i = 1; i <= n; i++)\n    for (let w = 0; w <= cap; w++)\n      if (weights[i - 1] <= w)\n        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);\n      else dp[i][w] = dp[i - 1][w];\n  return dp[n][cap];\n}\n\nfunction knapsack1D(weights: number[], values: number[], cap: number): number {\n  const dp = Array(cap + 1).fill(0);\n  for (let i = 0; i < weights.length; i++)\n    // MUST go backwards - otherwise reuses the same item!\n    for (let w = cap; w >= weights[i]; w--)\n      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);\n  return dp[cap];\n}\n\n// Longest Common Subsequence\nfunction lcs(a: string, b: string): number {\n  const m = a.length, n = b.length;\n  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n  for (let i = 1; i <= m; i++)\n    for (let j = 1; j <= n; j++)\n      dp[i][j] = a[i - 1] === b[j - 1]\n        ? 1 + dp[i - 1][j - 1]\n        : Math.max(dp[i - 1][j], dp[i][j - 1]);\n  return dp[m][n];\n}\n\nconsole.log(knapsack1D([2, 3, 4, 5], [3, 4, 5, 6], 5)); // 7\nconsole.log(lcs(\"ABCBDAB\", \"BDCAB\")); // 4 ("BDAB" or "BCAB")`,

        language: "typescript"

      },

      {

        id: "7",

        title: "Graph Algorithms",

        content: "Biggest graph mistake: using recursion (DFS) on a graph with cycles and getting a stack overflow. Always track visited nodes. Even for directed acyclic graphs, you need to avoid revisiting — the \"visited\" set isn't optional, it's necessary for correctness.\n\nReal problem: shortest path in a graph with negative weights. Dijkstra fails — it assumes positive weights. Bellman-Ford handles negatives by relaxing edges V-1 times. But O(VE) is expensive. The engineering tradeoff: use Dijkstra when you know weights are non-negative (95% of real-world cases), Bellman-Ford only when forced.\n\nInterview trap: \"Detect a cycle in a directed graph.\" Many candidates use visited only. But you need THREE states: unvisited (0), visiting (1), visited (2). A back edge to a visiting node means a cycle. A visited node already fully explored? Not a cycle.\n\nCommon mistake: Dijkstra with a priority queue implemented as an array. Each extract-min is O(n), making total O(V²) instead of O((V+E) log V). Always use a binary heap for the priority queue.\n\nEngineering mindset: graphs are everywhere — social networks, dependency resolution, routing, recommendation engines. BFS finds shortest paths in unweighted graphs level by level. DFS explores deep paths, useful for topological sorting and cycle detection.",

        codeExample: `// Dijkstra with proper priority queue\nfunction dijkstra(\n  graph: Map<number, [number, number][]>,\n  source: number\n): Map<number, number> {\n  const dist = new Map<number, number>();\n  const pq: [number, number][] = [];  // [dist, node]\n  dist.set(source, 0);\n  pq.push([0, source]);\n\n  while (pq.length > 0) {\n    pq.sort((a, b) => a[0] - b[0]); // poor man's heap\n    const [d, u] = pq.shift()!;\n    if (d > (dist.get(u) ?? Infinity)) continue; // stale entry\n\n    for (const [v, w] of graph.get(u) ?? []) {\n      const nd = d + w;\n      if (nd < (dist.get(v) ?? Infinity)) {\n        dist.set(v, nd);\n        pq.push([nd, v]);\n      }\n    }\n  }\n  return dist;\n}\n\n// Cycle detection in directed graph - 3 states\nenum State { Unvisited, Visiting, Visited }\n\nfunction hasCycle(graph: number[][]): boolean {\n  const state: State[] = Array(graph.length).fill(State.Unvisited);\n\n  function dfs(u: number): boolean {\n    if (state[u] === State.Visiting) return true;  // back edge = cycle!\n    if (state[u] === State.Visited) return false;\n    state[u] = State.Visiting;\n    for (const v of graph[u]) if (dfs(v)) return true;\n    state[u] = State.Visited;\n    return false;\n  }\n\n  return graph.some((_, i) => state[i] === State.Unvisited && dfs(i));\n}\n\n// Kahn's algorithm - topological sort (BFS-based)\nfunction topologicalSort(n: number, edges: [number, number][]): number[] {\n  const inDeg = Array(n).fill(0);\n  const adj: number[][] = Array.from({ length: n }, () => []);\n  for (const [u, v] of edges) { adj[u].push(v); inDeg[v]++; }\n  const q: number[] = [];\n  for (let i = 0; i < n; i++) if (inDeg[i] === 0) q.push(i);\n  const order: number[] = [];\n  while (q.length > 0) {\n    const u = q.shift()!;\n    order.push(u);\n    for (const v of adj[u]) if (--inDeg[v] === 0) q.push(v);\n  }\n  return order.length === n ? order : []; // empty = cycle exists\n}`,

        language: "typescript"

      },

      {

        id: "8",

        title: "Backtracking",

        content: "Biggest backtracking mistake: not pruning aggressively enough. Backtracking is brute force with pruning — if you're not pruning, you're just DFS on the entire search space. The performance gap between naive DFS and good backtracking is the difference between enumerating 10^12 and 10^3 states.\n\nReal problem: N-Queens. The naive approach generates all N! placements on the board and checks validity. The backtracking approach places one queen per row, checking column and diagonal conflicts incrementally. Pruning the moment a placement is invalid cuts the search space dramatically.\n\nInterview trap: \"Generate all subsets.\" Easy with backtracking. The subtlety: does order matter? [1,2] vs [2,1] — subsets ignore order, permutations don't. Subsets need a \"start index\" parameter to avoid generating the same set multiple times. Permutations need a \"used\" boolean array.\n\nCommon mistake: forgetting to undo the last choice (backtrack). After the recursive call returns, you must restore state. push → recurse → pop. mark → recurse → unmark. This undo step is the BACKTRACK part — skip it and your state bleeds across branches.\n\nEngineering mindset: backtracking solves constraint satisfaction problems — Sudoku, N-Queens, graph coloring, crossword puzzles. Constraint propagation (forward checking) prunes earlier by preemptively eliminating impossible values for future variables.",

        codeExample: `// N-Queens with aggressive pruning\nfunction solveNQueens(n: number): string[][] {\n  const result: string[][] = [];\n  const cols = new Set<number>();\n  const diag1 = new Set<number>(); // row - col (constant per diagonal)\n  const diag2 = new Set<number>(); // row + col\n  const board: number[] = [];      // board[row] = col\n\n  function backtrack(row: number): void {\n    if (row === n) {\n      result.push(board.map(\n        c => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)\n      ));\n      return;\n    }\n\n    for (let col = 0; col < n; col++) {\n      // Prune: O(1) conflict check\n      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;\n\n      board.push(col);\n      cols.add(col); diag1.add(row - col); diag2.add(row + col);\n\n      backtrack(row + 1);\n\n      // BACKTRACK: undo everything\n      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);\n      board.pop();\n    }\n  }\n\n  backtrack(0);\n  return result;\n}\n\n// Generate all subsets (combinations, not permutations)\nfunction subsets(nums: number[]): number[][] {\n  const result: number[][] = [];\n  function backtrack(start: number, curr: number[]) {\n    result.push([...curr]);\n    for (let i = start; i < nums.length; i++) {\n      curr.push(nums[i]);\n      backtrack(i + 1, curr); // i+1 = don't reuse elements\n      curr.pop();              // BACKTRACK undo\n    }\n  }\n  backtrack(0, []);\n  return result;\n}\n\nconsole.log(solveNQueens(4)); // 2 solutions\nconsole.log(subsets([1, 2, 3])); // 8 subsets`,

        language: "typescript"

      },

      {

        id: "9",

        title: "String Algorithms",

        content: "Biggest string algorithm mistake: using brute-force substring search (O(n·m)) when writing production parsers, log analyzers, or text editors. For large texts, the naive approach is unacceptable — and most interview candidates don't know KMP or why it works.\n\nReal problem: pattern matching in DNA sequences or log files. Naive O(n·m) means checking every position and, on mismatch, starting over — potentially rechecking characters you've already seen. KMP's insight: when a mismatch occurs, the pattern's prefix structure tells you how far to shift, so the text pointer never goes backward. O(n + m) guaranteed.\n\nInterview trap: \"Write a function that finds all occurrences of a pattern in a string.\" The easy answer is indexOf in a loop or RegExp. But the interviewer wants you to understand that when n = 10^6 and m = 10^4, naive is 10^10 operations — too slow. This is why KMP and Rabin-Karp exist.\n\nCommon mistake: implementing KMP but getting the failure function wrong. The LPS (longest proper prefix that is also a suffix) array is where KMP's entire complexity lives. If LPS construction isn't O(m), the whole algorithm breaks.\n\nEngineering mindset: strings are arrays of characters. All array tricks apply — two pointers, sliding window, prefix sums. Rolling hash (Rabin-Karp) trades correctness probability for speed — use double hashing to avoid collisions.",

        codeExample: `// KMP: text pointer never backtracks\nfunction kmpSearch(text: string, pattern: string): number[] {\n  const lps = buildLPS(pattern);\n  const matches: number[] = [];\n  let i = 0, j = 0; // i = text index, j = pattern index\n\n  while (i < text.length) {\n    if (text[i] === pattern[j]) { i++; j++; }\n    if (j === pattern.length) {\n      matches.push(i - j);\n      j = lps[j - 1]; // keep searching, don't reset\n    } else if (i < text.length && text[i] !== pattern[j]) {\n      if (j > 0) j = lps[j - 1]; // shift pattern using LPS\n      else i++;                   // no match possible, move on\n    }\n  }\n  return matches;\n}\n\n// LPS: the heart of KMP\nfunction buildLPS(pattern: string): number[] {\n  const lps = Array(pattern.length).fill(0);\n  let len = 0, i = 1; // len = length of previous longest prefix suffix\n  while (i < pattern.length) {\n    if (pattern[i] === pattern[len]) { lps[i++] = ++len; }\n    else if (len > 0) { len = lps[len - 1]; } // fallback, don't increment i\n    else { lps[i++] = 0; }\n  }\n  return lps;\n}\n\n// Rabin-Karp with rolling hash\nfunction rabinKarp(text: string, pattern: string): number[] {\n  const base = 256n, mod = 10n ** 9n + 7n;\n  const matches: number[] = [];\n  if (pattern.length > text.length) return matches;\n\n  // hash = Σ char * base^(len-1-i)\n  const hash = (s: string, len: number): bigint => {\n    let h = 0n;\n    for (let i = 0; i < len; i++) h = (h * base + BigInt(s.charCodeAt(i))) % mod;\n    return h;\n  };\n\n  const patHash = hash(pattern, pattern.length);\n  let txtHash = hash(text, pattern.length);\n  const power = base ** BigInt(pattern.length - 1) % mod;\n\n  for (let i = 0; i <= text.length - pattern.length; i++) {\n    if (txtHash === patHash && text.slice(i, i + pattern.length) === pattern)\n      matches.push(i);\n    if (i < text.length - pattern.length) {\n      // Rolling: remove left char, add right char\n      txtHash = ((txtHash - BigInt(text.charCodeAt(i)) * power % mod + mod) * base\n        + BigInt(text.charCodeAt(i + pattern.length))) % mod;\n    }\n  }\n  return matches;\n}`,

        language: "typescript"

      },

      {

        id: "10",

        title: "Complexity Theory & NP",

        content: "Biggest misconception: \"NP means non-polynomial.\" Wrong. NP = Nondeterministic Polynomial time — problems whose solutions can be VERIFIED in polynomial time, not necessarily SOLVED in polynomial time. If you get this wrong in an interview, the conversation is over.\n\nReal problem: you're asked to build a scheduling system for 100 employees with 50 constraints (shift preferences, certifications, max hours). This is a constraint satisfaction problem — likely NP-complete. If you try to solve it exactly, it won't scale. Engineering reality: prove it's NP-complete, then apply approximation algorithms or SAT solvers.\n\nInterview trap: \"Prove this problem is NP-complete.\" Two steps: 1) Show it's in NP (verify in poly time). 2) Reduce a known NP-complete problem to it (show it's NP-hard). Common mistake: reducing to the wrong direction. You must reduce FROM known NPC TO your problem, not the other way.\n\nCommon mistake: treating \"intractable\" as \"impossible.\" NP-hardness doesn't mean you can't solve practical instances. SAT solvers handle millions of variables. TSP is solved optimally for thousands of cities. Branch-and-bound, heuristics, and approximation algorithms make NP-hard problems tractable in practice.\n\nEngineering mindset: complexity theory is about classification, not paralysis. Classify the problem, then apply the right tool: polynomial algorithm if P, exact solver if small instance, approximation if large instance, heuristic if time is tight.",

        codeExample: `// SAT solver using DPLL (simplified backtracking)\ntype Clause = number[]; // positive = true, negative = false\n\nfunction dpll(clauses: Clause[], assignment: Map<number, boolean>): boolean {\n  // Unit propagation: if a clause has one literal, assign it\n  function simplify(): Clause[] {\n    let changed = true;\n    let current = clauses;\n    while (changed && current.length > 0) {\n      changed = false;\n      const unit = current.find(c => c.length === 1);\n      if (!unit) break;\n      const lit = unit[0];\n      const var_ = Math.abs(lit);\n      assignment.set(var_, lit > 0);\n      current = current\n        .filter(c => !c.includes(lit))        // remove satisfied\n        .map(c => c.filter(l => l !== -lit)); // shorten falsified\n      changed = true;\n    }\n    return current;\n  }\n\n  clauses = simplify();\n  if (clauses.length === 0) return true;  // all satisfied\n  if (clauses.some(c => c.length === 0)) return false; // conflict\n\n  // Choose unassigned variable\n  const var_ = Math.abs(clauses[0][0]);\n  for (const val of [true, false]) {\n    const newAssign = new Map(assignment);\n    newAssign.set(var_, val);\n    const reduced: Clause[] = clauses\n      .map(c => c.filter(l => Math.abs(l) !== var_))\n      .filter(c => c.length > 0);\n    if (dpll(reduced, newAssign)) {\n      assignment.clear();\n      newAssign.forEach((v, k) => assignment.set(k, v));\n      return true;\n    }\n  }\n  return false;\n}\n\n// Reduction: Vertex Cover → SAT\n// For each vertex, var_i = in cover. Clause (u ∨ v) per edge.\nfunction vertexCoverToSAT(edges: [number, number][], k: number): Clause[] {\n  const clauses: Clause[] = edges.map(([u, v]) => [u, v]); // edge must be covered\n  // At most k vertices: for each subset of size k+1, forbid all\n  // (¬v_i1 ∨ ¬v_i2 ∨ ... ∨ ¬v_i(k+1))\n  const n = Math.max(...edges.flat()) + 1;\n  // Generate cardinality constraint (simplified)\n  return clauses;\n}`,

        language: "typescript"

      },

    ],

  },

  {

    slug: "operating-systems",

    title: "Operating Systems",

    description: "Understand processes, threads, memory management, and file systems.",

    icon: "🖥️",

    notesUrl: "https://noteslink.in/product/os-notes/",

    color: "from-violet-500 to-purple-600",
    category: "Systems",

    lessons: [

      {

        id: "1",

        title: "Introduction to Operating Systems",

        content: "Your code runs. You never thank the OS. But when malloc() returns NULL, your app crashes. When another browser tab freezes your editor, the scheduler made a choice. When a file save corrupts, the filesystem driver failed. The OS is not theory — it's the referee between your code and the hardware. Every printf() triggers a write() syscall. Every variable access goes through virtual memory translation. Every thread you spawn competes for CPU time. Common exam trap: 'The OS just manages hardware.' Wrong — it also enforces protection between processes, so one app can't read another's memory. Engineering mindset: Students who skip OS fundamentals write apps that silently leak resources and deadlock under load. The OS doesn't care about your code — it just enforces the rules. Learn the rules and your code stops fighting the system.",

        codeExample: `// Every program interacts with the OS through system calls\nconst fs = require("fs");\nconst os = require("os");\n\nconsole.log("CPU cores:", os.cpus().length);\nconsole.log("Free memory:", os.freemem() / 1024 / 1024, "MB");\nconsole.log("Home dir:", os.homedir());\n\n// Each file read is a syscall — userspace -> kernel -> userspace\nconst start = Date.now();\nfs.readFileSync("test.txt", "utf-8");\nconsole.log("Syscall took:", Date.now() - start, "ms");\n\n// The OS doesn't give you the real memory address\n// It gives you a VIRTUAL address mapped through a page table\nconst mem = Buffer.alloc(1024 * 1024, "A");\nconsole.log("Allocated 1MB — all virtual until actually accessed");`,

        language: "typescript"

      },

      {

        id: "2",

        title: "Processes & Threads",

        content: "Every exam answer says 'process has own memory, thread shares memory.' True. But the real struggle is RACE CONDITIONS. You write two threads updating a shared counter. It works 1000 times locally. Then in production, counter = 1 when it should be 2. Both threads read 0, both write 1. Common exam trap: 'Threads share the heap but have their own stack.' Yes — but the real question is WHAT data can race. Any variable reachable from two threads is a candidate. Trap: thinking context switching is slow. It's microsecond overhead — the real cost is CPU cache misses after switching. Engineering mindset: Every time you reach for a global variable in multi-threaded code, you're creating a potential race. If you can't prove it's thread-safe, it isn't.",

        codeExample: `// Two threads incrementing a shared counter — classic race\nlet counter = 0;\nconst ITERATIONS = 10000;\n\nasync function increment(label: string) {\n  for (let i = 0; i < ITERATIONS; i++) {\n    // Read counter, increment, write back — NOT atomic\n    // Thread can be preempted between read and write\n    counter++;\n  }\n  console.log(\`\${label} done\`);\n}\n\n// Run both concurrently — interleaving is unpredictable\nawait Promise.all([\n  increment("Thread A"),\n  increment("Thread B")\n]);\n\nconsole.log(\`Counter: \${counter}\`);\n// Expected: 20000, Actual: ~11000-19000\nconsole.log(\`Lost updates: \${20000 - counter}\`);`,

        language: "typescript"

      },

      {

        id: "3",

        title: "CPU Scheduling",

        content: "Exam problem: 'Calculate average waiting time for FCFS.' You nail it. But they never ask WHY Round Robin exists. Answer: A long process hogs the CPU for 5 seconds. Your music app stutters. The UI freezes. Users think your app is garbage. Preemptive scheduling fixes this by FORCING processes to share the CPU. Common exam trap: 'SJF is optimal.' Trap: 'optimal' means minimum AVERAGE waiting time, assuming you know future burst times — you don't. That's why SJF is theoretically perfect but practically impossible. Engineering mindset: Scheduling is about user EXPERIENCE, not math. The metric that matters is RESPONSE TIME — how fast does the app react when the user types. No user cares about 'average turnaround time' from an exam problem.",

        codeExample: `// Multi-Level Feedback Queue — what real OSes use\nclass MLFQ {\n  private queues: number[][] = [[], [], []];\n  private timeQuanta = [5, 10, 20];\n\n  enqueue(pid: number, priority: number) {\n    this.queues[priority].push(pid);\n  }\n\n  schedule(): number[] {\n    const order: number[] = [];\n    for (let level = 0; level < 3; level++) {\n      while (this.queues[level].length > 0) {\n        const pid = this.queues[level].shift()!;\n        order.push(pid);\n        // Process that uses entire quantum gets demoted\n        const nextLevel = Math.min(level + 1, 2);\n        this.queues[nextLevel].push(pid);\n      }\n    }\n    return order;\n  }\n}\n\n// Interactive processes stay in high-priority queue\n// CPU-bound processes sink to lower priority`,

        language: "typescript"

      },

      {

        id: "4",

        title: "Memory Management",

        content: "Your app needs 2GB. The machine has 4GB. Why does it crash with 'out of memory' at 1.5GB? Because memory is FRAGMENTED. Paging breaks memory into fixed 4KB chunks so any free page satisfies any request. Segmentation groups related data (code vs stack vs heap) for protection. Common exam trap: 'Paging eliminates external fragmentation.' True. 'Paging has no fragmentation.' False — internal fragmentation exists (last page is partially used, wasting bytes). Engineering mindset: When your server runs at 90% memory, fragmentation can cause allocation failures even though enough total memory is free. That's why memory pools and slab allocators exist — they pre-carve fixed sizes to eliminate fragmentation entirely. The TLB (translation lookaside buffer) caches recent page mappings — missing it doubles memory access time.",

        codeExample: `// Simulating paged memory allocation\nclass PagedAllocator {\n  private pageSize = 4096;\n  private freePages: number[] = [];\n\n  constructor(totalMemory: number) {\n    const pageCount = Math.floor(totalMemory / this.pageSize);\n    this.freePages = Array.from({ length: pageCount }, (_, i) => i);\n  }\n\n  allocate(size: number): number | null {\n    const pagesNeeded = Math.ceil(size / this.pageSize);\n    if (pagesNeeded > this.freePages.length) return null;\n    return this.freePages.splice(0, pagesNeeded)[0];\n  }\n\n  free(page: number): void {\n    this.freePages.push(page);\n  }\n\n  // Internal fragmentation: allocated page may have unused bytes\n  internalWaste(size: number): number {\n    return this.pageSize - (size % this.pageSize || this.pageSize);\n  }\n}\n\nconst mem = new PagedAllocator(4096 * 64);\nmem.allocate(1);       // Uses 1 page, wastes 4095 bytes\nmem.allocate(4097);    // Uses 2 pages, wastes 4095 bytes\nconsole.log("Waste for 1 byte:", mem.internalWaste(1));`,

        language: "typescript"

      },

      {

        id: "5",

        title: "Virtual Memory & Page Replacement",

        content: "Your app uses 2GB. The machine has 512MB RAM. How? Virtual memory keeps only active pages in RAM; the rest sit on disk. Access a missing page → PAGE FAULT → OS fetches from disk (~10ms vs ~100ns RAM hit). When your working set exceeds RAM, the system THRASHES — constantly swapping pages in and out, dropping performance 100x. Common exam trap: 'FIFO is simple and fair.' Trap: Belady's Anomaly — adding MORE RAM can INCREASE page faults with FIFO. LRU doesn't have this problem. Engineering mindset: Your database scans 10GB of data with a 1GB buffer pool. That's 90% page faults. The query is slow not because of CPU but because every miss is a disk read. Measure page fault rate, not CPU, to find the real bottleneck.",

        codeExample: `// FIFO vs LRU page replacement — watch Belady's Anomaly\nfunction pageFaults(\n  pages: number[], frames: number, algo: "fifo" | "lru"\n): number {\n  const memory: number[] = [];\n  let faults = 0;\n\n  for (const page of pages) {\n    const idx = memory.indexOf(page);\n    if (idx === -1) {\n      faults++;  // Page fault — fetch from disk\n      if (memory.length >= frames) {\n        algo === "fifo" ? memory.shift() : memory.shift();\n      }\n    } else if (algo === "lru") {\n      memory.splice(idx, 1);  // Move to front\n    }\n    if (idx === -1 || algo === "lru") memory.push(page);\n  }\n  return faults;\n}\n\nconst refs = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];\nconsole.log(\"FIFO 3 frames:\", pageFaults(refs, 3, \"fifo\"));\nconsole.log(\"FIFO 4 frames:\", pageFaults(refs, 4, \"fifo\")); // May increase!\nconsole.log(\"LRU  3 frames:\", pageFaults(refs, 3, \"lru\"));`,

        language: "typescript"

      },

      {

        id: "6",

        title: "Deadlocks",

        content: "Transaction A locks Row 1. Transaction B locks Row 2. A needs Row 2. B needs Row 1. Both wait forever. That's a deadlock. The four Coffman conditions aren't exam trivia — they're your debugging checklist: (1) Mutual exclusion — resource can't be shared, (2) Hold and wait — processes hold resources while waiting, (3) No preemption — can't force a release, (4) Circular wait — cycle in the wait graph. Break ANY ONE and the deadlock dissolves. Common exam trap: 'Banker's algorithm prevents deadlock.' No — it AVOIDS deadlock by checking safety before allocation. Prevention means structurally breaking conditions (e.g., enforcing total resource ordering). Engineering mindset: In production, you don't prevent deadlocks — you DETECT and recover. Set lock timeouts. If a transaction waits >5s, abort and retry. That's real-world deadlock handling.",

        codeExample: `// Wait-for graph deadlock detection using DFS cycle check\nclass WaitForGraph {\n  private graph = new Map<number, Set<number>>();\n\n  wait(process: number, resource: number) {\n    if (!this.graph.has(process))\n      this.graph.set(process, new Set());\n    this.graph.get(process)!.add(resource);\n  }\n\n  release(process: number, resource: number) {\n    this.graph.get(process)?.delete(resource);\n  }\n\n  detectDeadlock(): number[] | null {\n    const visited = new Set<number>();\n    const inStack = new Set<number>();\n\n    const dfs = (node: number): number[] | null => {\n      visited.add(node);\n      inStack.add(node);\n      for (const next of this.graph.get(node) || []) {\n        if (!visited.has(next)) {\n          const cycle = dfs(next);\n          if (cycle) return [...cycle, node];\n        } else if (inStack.has(next)) {\n          return [node, next];  // Cycle found\n        }\n      }\n      inStack.delete(node);\n      return null;\n    };\n\n    for (const node of this.graph.keys()) {\n      if (!visited.has(node)) {\n        const cycle = dfs(node);\n        if (cycle) return cycle;\n      }\n    }\n    return null;\n  }\n}\n\nconst wfg = new WaitForGraph();\nwfg.wait(1, 2); wfg.wait(2, 3);\nwfg.wait(3, 1);  // Creates cycle\nconsole.log(\"Deadlock:\", wfg.detectDeadlock());`,

        language: "typescript"

      },

      {

        id: "7",

        title: "File Systems",

        content: "You delete a file. Run recovery software. Get garbled text. Why? Because 'deleting' just marks the inode as free. The data blocks stay — until overwritten. File systems are data structures on disk: inodes store metadata (size, permissions, block pointers), directories map names to inodes, and the block bitmap tracks free space. Common exam trap: 'A file is just a name for data.' No — a file is an inode pointed to by directory entries (hard links). Different names, same inode, same data. Deleting one 'name' doesn't delete the data until the last link is removed. Engineering mindset: Ext4 uses journaling to prevent corruption — write the intent first, then the data. If the system crashes mid-write, the journal replays incomplete operations. Without journaling, a crash corrupts the entire filesystem metadata structure.",

        codeExample: `// Inode-based filesystem simulation\nclass Inode {\n  constructor(\n    public id: number,\n    public size: number = 0,\n    public blocks: number[] = [],\n    public links: number = 1  // Hard link count\n  ) {}\n}\n\nclass SimpleFS {\n  private inodes = new Map<number, Inode>();\n  private dir = new Map<string, number>();\n  private nextId = 1;\n\n  create(name: string): Inode {\n    const inode = new Inode(this.nextId++);\n    this.inodes.set(inode.id, inode);\n    this.dir.set(name, inode.id);\n    return inode;\n  }\n\n  link(existing: string, newName: string): boolean {\n    const id = this.dir.get(existing);\n    if (!id) return false;\n    this.dir.set(newName, id);\n    this.inodes.get(id)!.links++;\n    return true;  // Same inode — hard link, not copy\n  }\n\n  delete(name: string): boolean {\n    const id = this.dir.get(name);\n    if (!id) return false;\n    const inode = this.inodes.get(id)!;\n    inode.links--;\n    if (inode.links === 0) this.inodes.delete(id);  // Actually freed\n    this.dir.delete(name);\n    return true;\n  }\n}\n\nconst fs = new SimpleFS();\nconst f = fs.create(\"data.txt\");\nfs.link(\"data.txt\", \"backup.txt\");  // Same file, two names\nconsole.log(\"Links after delete:\", f.links);  // Still 2\nfs.delete(\"data.txt\");\nconsole.log(\"Links after one delete:\", f.links);  // Still 1 — data alive`,

        language: "typescript"

      },

      {

        id: "8",

        title: "Synchronization & Concurrency",

        content: "Two threads increment a counter. Thread 1 reads 0, Thread 2 reads 0, Thread 1 writes 1, Thread 2 writes 1. Final value: 1 instead of 2. That's a race condition — and it breaks everything from bank balances to game state. Mutexes fix this by ensuring only one thread enters the critical section at a time. Semaphores generalize this to N threads accessing N identical resources. Common exam trap: 'A mutex and a binary semaphore are the same.' Wrong. A mutex has OWNERSHIP — the same thread must lock and unlock it. A semaphore can be signaled by any thread. Use the wrong one and your code silently corrupts data. Engineering mindset: Lock-free programming (atomic compare-and-swap) avoids mutexes entirely. Databases, kernel schedulers, and high-frequency trading rely on it. But unless you're writing kernel code, just use a mutex. Correctness first, optimization later.",

        codeExample: `// Race condition vs mutex-protected counter\nlet sharedCounter = 0;\nlet safeCounter = 0;\nlet locked = false;\n\nasync function lock() {\n  while (locked) await Promise.resolve();\n  locked = true;\n}\nfunction unlock() { locked = false; }\n\nasync function unsafeIncrement() {\n  for (let i = 0; i < 5000; i++) sharedCounter++;\n}\n\nasync function safeIncrement() {\n  for (let i = 0; i < 5000; i++) {\n    await lock();\n    safeCounter++;  // Only one thread here at a time\n    unlock();\n  }\n}\n\nawait Promise.all([unsafeIncrement(), unsafeIncrement()]);\nawait Promise.all([safeIncrement(), safeIncrement()]);\n\nconsole.log(\"Unsafe:\", sharedCounter);  // ~5000-9000\nconsole.log(\"Safe:\",   safeCounter);     // 10000\n\n// Real mutexes (Pthreads, std::mutex) do this in hardware\n// with atomic compare-and-swap — no busy-waiting loop`,

        language: "typescript"

      },

    ],

  },

  {

    slug: "dbms",

    title: "Database Systems",

    description: "SQL, normalization, indexing, transactions, and query optimization.",

    icon: "🗄️",

    notesUrl: "https://noteslink.in/product/dbms-notes-kiit/",

    color: "from-rose-500 to-pink-600",
    category: "Systems",

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

      },

    ],

  },

  {

    slug: "computer-networks",

    title: "Computer Networks",

    description: "TCP/IP, OSI model, routing, HTTP, and network security.",

    icon: "🌐",

    notesUrl: "https://noteslink.in/product/cn-computer-networks-notes-kiit-copy/",

    color: "from-cyan-500 to-blue-600",
    category: "Systems",

    lessons: [

      {

        id: "1",

        title: "Introduction to Networking",

        content: "Networking is the practice of connecting computers to share resources and communicate.\n\nLAN (Local Area Network):\n- Covers a small area (home, office, campus)\n- High speed (100 Mbps - 10 Gbps)\n- Low latency, low cost\n\nWAN (Wide Area Network):\n- Spans large geographic areas\n- Uses leased lines, MPLS, or the internet\n- Lower speed, higher latency\n\nTopologies:\n- Star: All nodes connect to a central hub\n- Bus: All nodes share a single backbone\n- Ring: Nodes form a closed loop\n- Mesh: Every node connects to every other node\n\nKey Metrics:\n- Bandwidth: Maximum data transfer rate (bits per second)\n- Latency: Time for data to travel source to destination\n- Throughput: Actual data transferred successfully\n- Jitter: Variation in latency over time\n- Packet Loss: Percentage of packets that fail to arrive\n\nNetwork devices: Hubs (broadcast), Switches (MAC-based), Routers (IP-based), Bridges (segment networks).",

        codeExample: `// Network metrics measurement tool\ninterface NetworkMetrics {\n  bandwidth: number;    // Mbps\n  latency: number;      // ms\n  jitter: number;       // ms\n  packetLoss: number;   // percentage\n}\n\nasync function measureLatency(host: string): Promise<number> {\n  const start = performance.now();\n  await fetch(\`https://\${host}/ping\`, { mode: 'no-cors' });\n  return performance.now() - start;\n}\n\nfunction calculateThroughput(\n  bytesTransferred: number,\n  timeSeconds: number\n): number {\n  return (bytesTransferred * 8) / timeSeconds / 1_000_000;\n}\n\nfunction classifyNetwork(metrics: NetworkMetrics): string {\n  const score =\n    (metrics.bandwidth / 100) * 0.4 +\n    (100 / metrics.latency) * 0.3 +\n    ((100 - metrics.packetLoss) / 100) * 0.3;\n  if (score > 0.8) return 'Excellent';\n  if (score > 0.5) return 'Good';\n  return 'Poor';\n}\n\nconst metrics: NetworkMetrics = {\n  bandwidth: 100, latency: 15, jitter: 2, packetLoss: 0.1\n};\nconsole.log(classifyNetwork(metrics));`,

        language: "typescript"

      },

      {

        id: "2",

        title: "OSI & TCP/IP Models",

        content: "OSI Model (7 layers):\n7. Application — HTTP, FTP, DNS, SMTP\n6. Presentation — Encryption, compression, encoding\n5. Session — Session management, sockets, NetBIOS\n4. Transport — TCP, UDP, port numbers\n3. Network — IP, ICMP, routing\n2. Data Link — MAC, Ethernet, switches, ARP\n1. Physical — Cables, signals, hubs, NICs\n\nData encapsulation: each layer adds a header (and sometimes a trailer) as data moves down the stack. Decapsulation reverses this on the receiving side.\n\nTCP/IP Model (4 layers):\n4. Application — Combines OSI layers 5-7\n3. Transport — TCP/UDP\n2. Internet — IP, ICMP, routing\n1. Network Access — Combines OSI layers 1-2\n\nComparison: OSI is a theoretical reference model; TCP/IP is the practical implementation used on the internet. Both help reason about where protocols and technologies fit in the networking stack.",

        codeExample: `// OSI Layer simulation\ninterface Packet {\n  data: string;\n  headers: Record<string, string>;\n}\n\nclass NetworkLayer {\n  encapsulate(data: string): Packet {\n    return {\n      data,\n      headers: { type: 'HTTP', version: '1.1' }\n    };\n  }\n}\n\nclass TransportLayer {\n  encapsulate(packet: Packet): Packet {\n    return {\n      data: packet.data,\n      headers: { ...packet.headers, srcPort: '49152', dstPort: '80' }\n    };\n  }\n}\n\nclass InternetLayer {\n  encapsulate(packet: Packet): Packet {\n    return {\n      data: packet.data,\n      headers: { ...packet.headers, srcIP: '192.168.1.5', dstIP: '93.184.216.34' }\n    };\n  }\n}\n\nconst network = new NetworkLayer();\nconst transport = new TransportLayer();\nconst internet = new InternetLayer();\n\nlet pkt = network.encapsulate('Hello World');\npkt = transport.encapsulate(pkt);\npkt = internet.encapsulate(pkt);\nconsole.log(pkt.headers);`,

        language: "typescript"

      },

      {

        id: "3",

        title: "Physical & Data Link Layer",

        content: "Physical Layer handles raw bit transmission over a medium:\n- Encoding: NRZ, NRZI, Manchester, 4B/5B\n- Signaling: electrical (copper), light (fiber), radio (wireless)\n- Bandwidth and throughput limits\n\nData Link Layer provides node-to-node delivery:\n- Frames: packets with header, payload, and trailer\n- MAC addresses: 48-bit unique hardware identifiers\n- Error detection: CRC (Cyclic Redundancy Check)\n\nMedia Access Control:\n- CSMA/CD (Collision Detection) — used in wired Ethernet\n  1. Listen before transmitting\n  2. If collision detected, send jam signal\n  3. Wait random backoff time, retry\n- CSMA/CA (Collision Avoidance) — used in Wi-Fi (802.11)\n  1. Listen before transmitting\n  2. If channel idle, wait DIFS then send\n  3. Receiver sends ACK; if no ACK, exponential backoff\n\nSwitches operate at Layer 2, forwarding frames based on MAC address tables learned from source addresses.",

        codeExample: `// CRC-32 implementation\ndef crc32(data: string): string {\n  let crc = 0xFFFFFFFF;\n  const polynomial = 0xEDB88320;\n\n  for (const char of data) {\n    crc ^= char.charCodeAt(0);\n    for (let i = 0; i < 8; i++) {\n      crc = (crc >>> 1) ^ (crc & 1 ? polynomial : 0);\n    }\n  }\n  return ((crc ^ 0xFFFFFFFF) >>> 0).toString(16).padStart(8, '0');\n}\n\n// MAC address validator\nfunction isValidMAC(mac: string): boolean {\n  const pattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;\n  return pattern.test(mac);\n}\n\n// Simple frame structure\ninterface Frame {\n  preamble: string;\n  dstMAC: string;\n  srcMAC: string;\n  payload: string;\n  fcs: string;\n}\n\nfunction createFrame(dst: string, src: string, data: string): Frame {\n  return {\n    preamble: '10101010'.repeat(7),\n    dstMAC: dst, srcMAC: src,\n    payload: data,\n    fcs: crc32(data)\n  };\n}\n\nconsole.log(crc32('Hello Network'));\nconsole.log(isValidMAC('AA:BB:CC:DD:EE:FF'));`,

        language: "typescript"

      },

      {

        id: "4",

        title: "Network Layer - IP",

        content: "IPv4 (32-bit addresses):\n- Dotted decimal: 192.168.1.1\n- Classful: A (0-127), B (128-191), C (192-223), D (multicast), E (reserved)\n- CIDR replaced classful with variable-length prefix (e.g., /24)\n- Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16\n\nSubnetting: divides a network into smaller subnets using subnet masks.\nHosts = 2^(32 - prefix) - 2 (network + broadcast addresses reserved).\n\nIPv6 (128-bit addresses):\n- Colon hexagonal: 2001:0db8:85a3::8a2e:0370:7334\n- Eliminates NAT, enables end-to-end connectivity\n- Built-in IPSec support, flow labels for QoS\n\nRouting Algorithms:\n- Distance Vector (RIP): hop count, max 15 hops\n- Link State (OSPF): Dijkstra shortest path, cost-based\n- Path Vector (BGP): policy-based, inter-domain routing\n- Static routing for simple topologies, dynamic for large networks",

        codeExample: `// IP address utilities\nclass IPAddress {\n  static toBinary(ip: string): string {\n    return ip.split('.').map(octet =>\n      parseInt(octet).toString(2).padStart(8, '0')\n    ).join('.');\n  }\n\n  static subnetMask(cidr: number): string {\n    const mask = ~(2 ** (32 - cidr) - 1);\n    return [\n      (mask >>> 24) & 255, (mask >>> 16) & 255,\n      (mask >>> 8) & 255, mask & 255\n    ].join('.');\n  }\n\n  static networkAddress(ip: string, cidr: number): string {\n    const ipNum = ip.split('.').reduce((acc, o) => (acc << 8) + parseInt(o), 0);\n    const mask = ~(2 ** (32 - cidr) - 1) >>> 0;\n    const network = (ipNum & mask) >>> 0;\n    return [(network >>> 24) & 255, (network >>> 16) & 255,\n            (network >>> 8) & 255, network & 255].join('.');\n  }\n\n  static totalHosts(cidr: number): number {\n    return 2 ** (32 - cidr) - 2;\n  }\n\n  static isPrivate(ip: string): boolean {\n    const parts = ip.split('.').map(Number);\n    return (parts[0] === 10) ||\n      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||\n      (parts[0] === 192 && parts[1] === 168);\n  }\n}\n\nconsole.log(IPAddress.subnetMask(24));  // 255.255.255.0\nconsole.log(IPAddress.totalHosts(26));  // 62\nconsole.log(IPAddress.isPrivate('192.168.1.1')); // true`,

        language: "typescript"

      },

      {

        id: "5",

        title: "Transport Layer - TCP & UDP",

        content: "TCP (Transmission Control Protocol):\n- Three-way handshake: SYN → SYN-ACK → ACK\n- Reliable delivery: sequence numbers, acknowledgments, retransmission\n- Flow control: sliding window protocol\n- Congestion control: slow start, congestion avoidance, fast retransmit\n- Four-way termination: FIN → ACK → FIN → ACK\n\nUDP (User Datagram Protocol):\n- Connectionless, no handshake\n- No ordering, no reliability guarantees\n- Lower latency and overhead\n- Checksum optional (IPv4), mandatory (IPv6)\n\nTCP Congestion Control:\n- Slow Start: exponential window growth until threshold\n- Congestion Avoidance: linear growth after threshold\n- Fast Retransmit: resend after 3 duplicate ACKs\n- Fast Recovery: halve window, skip slow start\n\nComparison:\nTCP suits: HTTP, SMTP, FTP, SSH\nUDP suits: DNS queries, VoIP, video streaming, gaming, DHCP",

        codeExample: `// TCP server with connection tracking\nimport net from 'net';\n\ninterface ClientInfo {\n  id: string;\n  socket: net.Socket;\n  connectedAt: Date;\n}\n\nconst clients = new Map<string, ClientInfo>();\nlet clientCounter = 0;\n\nconst server = net.createServer((socket) => {\n  const clientId = \`client-\${++clientCounter}\`;\n  clients.set(clientId, {\n    id: clientId, socket, connectedAt: new Date()\n  });\n\n  console.log(\`\${clientId} connected from \${socket.remoteAddress}\`);\n  socket.write(\`Welcome! You are \${clientId}\\n\`);\n\n  socket.on('data', (data) => {\n    const msg = data.toString().trim();\n    console.log(\`[\${clientId}]: \${msg}\`);\n    if (msg === 'quit') {\n      socket.end('Goodbye!\\n');\n    } else {\n      socket.write(\`Echo: \${msg}\\n\`);\n    }\n  });\n\n  socket.on('close', () => {\n    clients.delete(clientId);\n    console.log(\`\${clientId} disconnected\`);\n  });\n});\n\nserver.listen(8080, () => console.log('TCP server on :8080'));`,

        language: "typescript"

      },

      {

        id: "6",

        title: "Application Layer",

        content: "HTTP/HTTPS:\n- Request-response model over TCP\n- Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS\n- Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error\n- HTTP/2: multiplexing, header compression, server push\n- HTTP/3: QUIC protocol, 0-RTT, runs over UDP\n\nDNS (Domain Name System):\n- Hierarchical naming: root → TLD → authoritative\n- Record types: A, AAAA, CNAME, MX, NS, TXT, SOA\n- Resolution: recursive resolver → root → TLD → authoritative → IP\n\nWebSocket:\n- Full-duplex communication over a single TCP connection\n- Starts as HTTP upgrade, then switches protocol\n- Real-time applications: chat, live feeds, gaming\n\nREST (Representational State Transfer):\n- Stateless, resource-based URLs\n- Standard HTTP methods map to CRUD operations\n- JSON or XML payloads\n- HATEOAS for discoverability",

        codeExample: `// DNS resolver using Node.js dns module\nimport dns from 'dns';\nimport { promisify } from 'util';\n\nconst resolve4 = promisify(dns.resolve4);\nconst resolve6 = promisify(dns.resolve6);\nconst resolveMx = promisify(dns.resolveMx);\nconst resolveTxt = promisify(dns.resolveTxt);\n\nasync function fullDNSLookup(domain: string) {\n  const results: Record<string, unknown> = {};\n\n  try {\n    results.ipv4 = await resolve4(domain);\n  } catch { results.ipv4 = 'N/A'; }\n\n  try {\n    results.ipv6 = await resolve6(domain);\n  } catch { results.ipv6 = 'N/A'; }\n\n  try {\n    results.mx = await resolveMx(domain);\n  } catch { results.mx = 'N/A'; }\n\n  try {\n    results.txt = await resolveTxt(domain);\n  } catch { results.txt = 'N/A'; }\n\n  return results;\n}\n\n// REST client\ninterface RESTClient {\n  get: <T>(url: string) => Promise<T>;\n  post: <T>(url: string, body: unknown) => Promise<T>;\n}\n\nconst api: RESTClient = {\n  get: async (url) => (await fetch(url)).json(),\n  post: async (url, body) => (await fetch(url, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(body)\n  })).json()\n};\n\nfullDNSLookup('google.com').then(console.log);`,

        language: "typescript"

      },

      {

        id: "7",

        title: "Network Security",

        content: "TLS (Transport Layer Security):\n- Encrypts data in transit between client and server\n- Handshake: client hello → server hello + certificate → key exchange → encrypted\n- TLS 1.3: faster handshake (1-RTT), removes weak ciphers\n\nFirewalls:\n- Packet filtering: inspect headers (IP, port, protocol)\n- Stateful inspection: track connection states\n- Application layer firewall (WAF): inspect payload\n- Next-gen: deep packet inspection, threat intelligence\n\nCommon Attacks:\n- DDoS: overwhelm with traffic (volumetric, protocol, application)\n- Man-in-the-Middle: intercept and alter communications\n- DNS Spoofing: redirect to malicious IP\n- SQL Injection: inject SQL via user input\n- XSS: inject malicious scripts into web pages\n- Brute Force: systematic password guessing\n\nDefenses: encryption (TLS), input validation, rate limiting, MFA, network segmentation, IDS/IPS systems.",

        codeExample: `// TLS server with certificate\nimport https from 'https';\nimport fs from 'fs';\n\n// Generate self-signed cert with:\n// openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem\n\nconst options = {\n  key: fs.readFileSync('key.pem'),\n  cert: fs.readFileSync('cert.pem'),\n  minVersion: 'TLSv1.3' as const\n};\n\n// Simple WAF-like input sanitizer\nfunction sanitizeInput(input: string): string {\n  return input\n    .replace(/<script[^>]*>.*?<\\/script>/gi, '')\n    .replace(/[<>\"']/g, (char) => {\n      const map: Record<string, string> = {\n        '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#x27;'\n      };\n      return map[char];\n    });\n}\n\n// Rate limiter\nclass RateLimiter {\n  private requests = new Map<string, number[]>();\n\n  constructor(private limit: number, private window: number) {}\n\n  isAllowed(key: string): boolean {\n    const now = Date.now();\n    const timestamps = this.requests.get(key) ?? [];\n    const recent = timestamps.filter(t => now - t < this.window);\n    if (recent.length >= this.limit) return false;\n    recent.push(now);\n    this.requests.set(key, recent);\n    return true;\n  }\n}\n\nconst limiter = new RateLimiter(100, 60000);\nconsole.log(limiter.isAllowed('192.168.1.1'));`,

        language: "typescript"

      },

      {

        id: "8",

        title: "Modern Networking",

        content: "CDN (Content Delivery Network):\n- Distributes content to edge servers near users\n- Reduces latency, handles traffic spikes\n- Providers: Cloudflare, AWS CloudFront, Akamai\n- Caching strategies: pull vs push, cache invalidation\n\nLoad Balancing:\n- Distributes traffic across multiple servers\n- Algorithms: Round Robin, Least Connections, IP Hash, Weighted\n- Layer 4 (transport) vs Layer 7 (application) load balancing\n- Health checks remove unhealthy backends\n\ngRPC:\n- Google's RPC framework using HTTP/2 and Protocol Buffers\n- Streaming: unary, server-streaming, client-streaming, bidirectional\n- Strongly typed contracts via .proto files\n- Used for microservice-to-microservice communication\n\nIoT Networking:\n- MQTT: lightweight publish/subscribe for constrained devices\n- CoAP: RESTful protocol over UDP for IoT\n- Zigbee, LoRa, NB-IoT for low-power wide-area networks\n- Edge computing: processing data near the source\n\nZero Trust: never trust, always verify — authenticate every request regardless of network location.",

        codeExample: `// Load balancer simulation\ninterface Server {\n  id: string;\n  url: string;\n  healthy: boolean;\n  activeConnections: number;\n}\n\nclass LoadBalancer {\n  private servers: Server[];\n  private currentIndex = 0;\n\n  constructor(servers: Server[]) {\n    this.servers = servers;\n  }\n\n  // Round Robin\n  nextRoundRobin(): Server {\n    const healthy = this.servers.filter(s => s.healthy);\n    const server = healthy[this.currentIndex % healthy.length];\n    this.currentIndex++;\n    return server;\n  }\n\n  // Least Connections\n  nextLeastConnections(): Server {\n    return this.servers\n      .filter(s => s.healthy)\n      .reduce((a, b) =>\n        a.activeConnections <= b.activeConnections ? a : b\n      );\n  }\n\n  // Health check simulation\n  async checkHealth(server: Server): Promise<boolean> {\n    try {\n      const res = await fetch(\`\${server.url}/health\`,\n        { signal: AbortSignal.timeout(3000) });\n      return res.ok;\n    } catch {\n      return false;\n    }\n  }\n}\n\nconst lb = new LoadBalancer([\n  { id: 's1', url: 'http://10.0.0.1:3000', healthy: true, activeConnections: 5 },\n  { id: 's2', url: 'http://10.0.0.2:3000', healthy: true, activeConnections: 2 },\n  { id: 's3', url: 'http://10.0.0.3:3000', healthy: false, activeConnections: 0 }\n]);\n\nconsole.log(lb.nextLeastConnections().id);`,

        language: "typescript"

      },

    ],

  },

  {

    slug: "web-development",

    title: "Web Development",

    description: "HTML, CSS, JavaScript, React, and modern web technologies.",

    icon: "💻",

    color: "from-indigo-500 to-blue-600",
    category: "Software Dev",

    lessons: [

      {

        id: "1",

        title: "HTML & Semantic Web",

        content: "Student trap: you built a page with all <div>s and it renders fine — so why use semantic tags? Screen readers rely on semantic landmarks (<nav>, <main>, <aside>) to navigate. A blind user can jump between them with a single keystroke — <div> soup offers no such landmarks. Search engines also rank semantic content higher because they understand your structure. The #1 issue engineers see in junior portfolios is a page that's 50 nested <div>s with zero semantic meaning.",

        codeExample: `<!-- ❌ Non-semantic (div soup) -->\n<div class="header">\n  <div class="nav">\n    <div class="nav-item">Home</div>\n  </div>\n</div>\n<div class="main">\n  <div class="article">\n    <div class="title">Blog Post</div>\n    <div class="content">Text here</div>\n  </div>\n</div>\n<div class="footer">\n  <div>Copyright 2024</div>\n</div>\n\n<!-- ✅ Semantic HTML5 -->\n<header>\n  <nav aria-label="Main navigation">\n    <ul><li><a href="/">Home</a></li></ul>\n  </nav>\n</header>\n<main>\n  <article>\n    <h1>Blog Post</h1>\n    <p>Text here</p>\n  </article>\n</main>\n<footer>\n  <small>&copy; 2024</small>\n</footer>`,

        language: "html"

      },

      {

        id: "2",

        title: "CSS Fundamentals & Layout",

        content: "CSS struggle: 'Why is my div not centered?' You wrote text-align: center but nothing moved. That's because text-align only works on inline/inline-block content — it does nothing to block elements like <div>. For horizontal centering of a block, use margin: 0 auto. For both directions, reach for flexbox: display: flex + justify-content: center + align-items: center. Another trap: forgetting box-sizing: border-box. Add padding to a 400px div and it becomes 440px, breaking your layout. Set *, *::before, *::after { box-sizing: border-box; } at the top of every stylesheet.",

        codeExample: `/* Universal reset — prevents layout-breaking padding */\n*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n/* Flexbox centering (both axes) */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n/* Block-level horizontal centering */\n.card {\n  width: 300px;\n  margin: 0 auto;\n}\n\n/* Grid: two-column layout */\n.layout {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  gap: 1rem;\n}`,

        language: "css"

      },

      {

        id: "3",

        title: "JavaScript Core Concepts",

        content: "JS trap #1: == vs ===. Students use == because 'it works', until 0 == false evaluates to true, '' == 0 is true, and your form validation lets empty strings through. Always use === unless you explicitly need type coercion. Trap #2: closures in loops. for (var i = 0; i < 5; i++) { setTimeout(() => console.log(i), 100); } — you expect 0,1,2,3,4 but get 5,5,5,5,5. var has function scope, not block scope. By the time the timeout runs, the loop finished and i is 5. Fix: use let (block-scoped) or wrap in an IIFE.",

        codeExample: `// ❌ Trap: == vs ===\nconsole.log(0 == false);   // true — breaks validation\nconsole.log(0 === false);  // false — correct\nconsole.log('' == 0);      // true\nconsole.log('' === 0);     // false\n\n// ❌ Trap: var in loop\nfor (var i = 0; i < 5; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 5, 5, 5, 5, 5\n\n// ✅ Fix: use let (block scope)\nfor (let i = 0; i < 5; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 0, 1, 2, 3, 4\n\n// ✅ Alternative: closure with IIFE\nfor (var i = 0; i < 5; i++) {\n  ((j) => setTimeout(() => console.log(j), 100))(i);\n}`,

        language: "javascript"

      },

      {

        id: "4",

        title: "Advanced JavaScript",

        content: "The this keyword: 'Why does this become undefined inside my event handler?' Because this depends on how a function is called, not where it's defined. In a regular function call (strict mode), this is undefined. In a method call (obj.method()), this is the object. Arrow functions don't have their own this — they inherit from the enclosing scope. Engineering rule: if you see this behaving unexpectedly, check what's left of the dot at the call site. Use .bind(), arrow functions, or a self = this reference to control the binding.",

        codeExample: `const user = {\n  name: 'Alice',\n  greet: function() {\n    console.log('Hello, ' + this.name);\n  },\n  greetArrow: () => {\n    // ❌ Arrow function — this is NOT user\n    console.log('Hello, ' + this.name);\n  },\n  greetDelayed: function() {\n    // ❌ this will be undefined (or window) in the callback\n    setTimeout(function() {\n      console.log('Hello, ' + this.name);\n    }, 100);\n  },\n  greetFixed: function() {\n    // ✅ Fix 1: arrow function inherits this\n    setTimeout(() => {\n      console.log('Hello, ' + this.name);\n    }, 100);\n  },\n  greetFixed2: function() {\n    // ✅ Fix 2: .bind()\n    setTimeout(function() {\n      console.log('Hello, ' + this.name);\n    }.bind(this), 100);\n  }\n};\n\nuser.greet();        // Hello, Alice\nuser.greetArrow();   // Hello, undefined\nuser.greetDelayed(); // Hello, undefined\nuser.greetFixed();   // Hello, Alice`,

        language: "javascript"

      },

      {

        id: "5",

        title: "React Fundamentals",

        content: "React mistake #1: directly mutating state. Students write arr.push(item) or obj.name = 'new' and wonder why the UI doesn't update. React uses reference equality to detect changes — mutating an existing object keeps the same reference, so React skips the re-render. Always return a new reference: setItems([...items, newItem]) for arrays, setUser({...user, name: 'new'}) for objects. Another trap: calling setState in a loop without the functional updater — stale closure bug: setCount(count + 1) called 5 times increments by 1, not 5. Use setCount(prev => prev + 1).",

        codeExample: `import { useState } from 'react';\n\nfunction TodoList() {\n  const [todos, setTodos] = useState(['Learn React']);\n  const [count, setCount] = useState(0);\n\n  // ✅ Correct: new array reference\n  const addTodo = (todo: string) => {\n    setTodos([...todos, todo]);\n  };\n\n  // ❌ Wrong: mutating directly\n  // todos.push(todo);    // no re-render!\n  // setTodos(todos);     // same reference!\n\n  // ❌ Stale closure: increments by only 1\n  const brokenIncrement = () => {\n    for (let i = 0; i < 5; i++) {\n      setCount(count + 1); // uses same count\n    }\n  };\n\n  // ✅ Functional updater: increments by 5\n  const fixedIncrement = () => {\n    for (let i = 0; i < 5; i++) {\n      setCount(prev => prev + 1);\n    }\n  };\n\n  return (\n    <div>\n      <ul>{todos.map(t => <li key={t}>{t}</li>)}</ul>\n      <p>Count: {count}</p>\n      <button onClick={fixedIncrement}>+5</button>\n    </div>\n  );\n}`,

        language: "tsx"

      },

      {

        id: "6",

        title: "React Advanced Patterns",

        content: "Prop drilling trap: you pass user data through 5 intermediate components that don't use it, just to reach a deeply nested child. Every intermediate component re-renders on every user change, killing performance. Solutions: (1) Context API — great for truly global state (theme, auth, locale). (2) Component composition — pass JSX as children instead of drilling props: <Parent><Child data={x} /></Parent> avoids intermediate renders. (3) For complex state, reach for Zustand or Redux Toolkit, but don't import Redux until you actually feel the pain of prop drilling first.",

        codeExample: `import { createContext, useContext, useState, ReactNode } from 'react';\n\ninterface User {\n  name: string;\n  avatar: string;\n}\n\nconst UserContext = createContext<User | null>(null);\n\nfunction UserProvider({ children, user }: { children: ReactNode; user: User }) {\n  return (\n    <UserContext.Provider value={user}>\n      {children}\n    </UserContext.Provider>\n  );\n}\n\nfunction Avatar() {\n  const user = useContext(UserContext);\n  return <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full" />;\n}\n\nfunction Header() {\n  return (\n    <header>\n      <Avatar /> {/* No prop drilling needed */}\n    </header>\n  );\n}\n\nfunction App({ user }: { user: User }) {\n  return (\n    <UserProvider user={user}>\n      <Header />\n    </UserProvider>\n  );\n}`,

        language: "tsx"

      },

      {

        id: "7",

        title: "Backend Development with Node.js",

        content: "Unhandled promise rejections kill servers. Your Express handler is async, throws an error, but you forgot the .catch() — and Node.js 15+ exits the process on unhandled rejections. The fix: wrap every async route handler. const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next); then wrap all routes. Another trap: putting CPU-intensive work (image processing, JSON parsing) in a request handler — it blocks the single-threaded event loop and freezes all concurrent requests. Offload to worker threads or a job queue (Bull/BullMQ).",

        codeExample: `import express, { Request, Response, NextFunction } from 'express';\n\nconst app = express();\n\n// ✅ Must-have: async error wrapper\nconst asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>\n  (req: Request, res: Response, next: NextFunction) =>\n    Promise.resolve(fn(req, res, next)).catch(next);\n\n// Centralized error middleware\napp.use((err: Error, req: Request, res: Response, next: NextFunction) => {\n  console.error('[ERROR]', err.message);\n  res.status(500).json({ error: 'Internal server error' });\n});\n\n// ❌ This crashes the process on error\napp.get('/user/:id', async (req, res) => {\n  const user = await db.findUser(req.params.id); // throws -> process exits\n  res.json(user);\n});\n\n// ✅ Wrapped — error goes to middleware\napp.get('/user/:id', asyncHandler(async (req, res) => {\n  const user = await db.findUser(req.params.id);\n  if (!user) return res.status(404).json({ error: 'Not found' });\n  res.json(user);\n}));\n\napp.listen(3000, () => console.log('Server running on port 3000'));`,

        language: "typescript"

      },

      {

        id: "8",

        title: "Full-Stack & Deployment",

        content: "'It works on my machine' — the most dangerous phrase in engineering. Root cause: environment inconsistency. Different Node versions, missing .env variables, hardcoded API URLs pointing to localhost. Three-layered fix: (1) .env.example tracked in git with all required keys documented. (2) Docker ensures the same OS, Node version, and dependencies across dev and prod. (3) CI/CD pipeline runs tests before deploy. Common deployment mistake: shipping with NODE_ENV=development, which exposes full stack traces and debug logs to end users. Always set NODE_ENV=production in your deployment config.",

        codeExample: `# 1. .env.example — tracked in git, documents every required key\nPORT=3000\nDATABASE_URL=postgres://user:pass@host:5432/db\nNODE_ENV=development\nCORS_ORIGIN=http://localhost:5173\n\n# 2. Dockerfile — reproducible environment\nFROM node:20-alpine\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "dist/server.js"]\n\n# 3. docker-compose.yml — full stack\nservices:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=production\n    depends_on:\n      - db\n  db:\n    image: postgres:16-alpine\n\nvolumes:\n  pgdata:`,

        language: "yaml"

      },

    ],

  },

  {

    slug: "oop",

    title: "Object-Oriented Programming",

    description: "Encapsulation, inheritance, polymorphism, and design patterns.",

    icon: "🏗️",

    notesUrl: "https://noteslink.in/product/oopj-notes-kiit/",

    color: "from-teal-500 to-emerald-600",
    category: "Core CS",

    lessons: [

      {

        id: "1",

        title: "Introduction to OOP",

        content: "OOP mistake #1: Students create classes for everything. 'I need to print Hello World.' 'Let me make a HelloWorldPrinter class first.' Not everything is an object. Start simple, add abstraction when you have REPETITION.\n\nOOP exists because procedural code breaks down when you have multiple things sharing the same behavior. A class is just a blueprint — it lets you create many objects with the same methods but different data.\n\nConstructor trap: Forgetting that constructors run every time you use `new`. Put setup logic there, not in the class body.\n\nInterview trap: 'What's the difference between a class and an object?' Class = cookie cutter. Object = cookie. One blueprint, many instances.\n\nEngineering mindset: OOP is a TOOL, not a religion. If you only have one of something (one logger, one config), you probably don't need a class. A function is fine. OOP earns its keep when you have 5+ things sharing the same shape.",

        codeExample: `// Bad: class for everything
class HelloPrinter {
  print() { console.log("Hello"); }
}
new HelloPrinter().print(); // Wasteful

// Good: class when you need multiple instances
class User {
  constructor(
    public name: string,
    public role: "admin" | "viewer"
  ) {}
  canEdit(): boolean {
    return this.role === "admin";
  }
}

const users = [
  new User("Alice", "admin"),
  new User("Bob", "viewer"),
  new User("Charlie", "viewer"),
];
const editors = users.filter(u => u.canEdit());
console.log(editors.length); // 1`,

        language: "typescript"

      },

      {

        id: "2",

        title: "Encapsulation",

        content: "Encapsulation trap: Students make everything public 'for flexibility'. Then in a team project, changing a field name breaks 30 files. That's why private exists — it communicates 'this is internal, don't touch' to other developers.\n\nGetters/setters are NOT just for Java. They let you ADD validation later without changing the API. Start with public fields, but when you need rules (no negative balance, no empty name), switch to getters.\n\nReadonly trap: Students forget readonly exists and rely on convention. Use readonly for anything set once in the constructor. The compiler enforces what comments can't.\n\nInterview trap: 'Why not just make everything public?' Because encapsulation is about contracts, not secrecy. A public field says 'callers depend on this existing forever'. A private field says 'I can change this tomorrow'.\n\nEngineering mindset: Every public member is a binding promise. Make promises sparingly. If a teammate could misuse a field, lock it down now — before it's in 50 files.",

        codeExample: `class Timer {
  private _elapsed = 0;
  private _running = false;
  readonly startedAt: Date;

  constructor() {
    this.startedAt = new Date();
  }

  get elapsed(): number {
    return this._elapsed;
  }

  start(): void {
    if (this._running) return;
    this._running = true;
  }

  stop(): void {
    this._running = false;
    this._elapsed += 100;
  }
}

const t = new Timer();
t.start();
t.stop();
console.log(t.elapsed); // 100
// t.startedAt = new Date(); // Error! readonly
// t._elapsed = 999; // Error! private`,

        language: "typescript"

      },

      {

        id: "3",

        title: "Inheritance",

        content: "Inheritance abuse: Students love inheritance. 'Cat extends Animal, Dog extends Animal'. Then they need a Robot. Does Robot extend Animal? Suddenly the hierarchy falls apart. Enter composition: Robot has-a Brain, has-a Body. Favor HAS-A over IS-A.\n\nLSP trap (Liskov Substitution): If a child class CHANGES parent behavior instead of EXTENDING it, inheritance is wrong. 'Square extends Rectangle' breaks when Rectangle has setWidth() and Square needs to set both dimensions.\n\nInterview trap: 'Why is multiple inheritance dangerous?' Diamond problem — if A extends B and C, and both B and C have a method doStuff(), which one does A use? TypeScript's interfaces avoid this by having NO implementation.\n\nEngineering mindset: Inheritance creates the tightest coupling in OOP — a child class is permanently tied to its parent. Before you write 'extends', ask: Is this a hierarchy that will NEVER change? If the answer isn't 'yes', use interfaces + composition instead.",

        codeExample: `// Bad: forces artificial hierarchy
interface Switchable {
  on(): void;
  off(): void;
}

class LightBulb implements Switchable {
  on() { console.log("Light ON"); }
  off() { console.log("Light OFF"); }
}

class Fan implements Switchable {
  on() { console.log("Fan ON"); }
  off() { console.log("Fan OFF"); }
}

// Composition over inheritance
class RemoteControl {
  constructor(private device: Switchable) {}

  toggle(on: boolean): void {
    on ? this.device.on() : this.device.off();
  }
}

const remote = new RemoteControl(new LightBulb());
remote.toggle(true);  // Light ON
remote.toggle(false); // Light OFF`,

        language: "typescript"

      },

      {

        id: "4",

        title: "Polymorphism",

        content: "Polymorphism trap: Students write if-else chains for every type check. `if (animal.type === 'dog') bark(); else if (animal.type === 'cat') meow()`. This is the OPPOSITE of polymorphism. Real polymorphism means you write code that works with ANY type — and each type handles its own behavior.\n\nThe 'new' keyword trap: When you write `new Dog()`, `new Cat()` in your business logic, you've already lost. Polymorphism requires programming to an INTERFACE, not a concrete class.\n\nInterview trap: 'Overloading vs overriding?' Overloading = same name, different params (compile-time). Overriding = child replaces parent method (runtime). TypeScript has REAL overriding — overloading is just type annotations.\n\nEngineering mindset: Polymorphism allows your code to be OPEN for extension without being OPEN for modification. Adding a new type never requires changing existing code that depends on the interface. That's how production systems stay stable while growing.",

        codeExample: `// Bad: manual type checking
function saveJson(data: string | number) {
  if (typeof data === "string") return JSON.parse(data);
  return data; // fine for numbers, what about objects?
}

// Good: polymorphic serializer
interface Serializable {
  serialize(): string;
}

class UserData implements Serializable {
  constructor(private name: string, private age: number) {}
  serialize(): string {
    return JSON.stringify({ name: this.name, age: this.age });
  }
}

class Config implements Serializable {
  constructor(private theme: string) {}
  serialize(): string {
    return JSON.stringify({ theme: this.theme });
  }
}

function persist(item: Serializable): void {
  const data = item.serialize();
  console.log("Saving:", data);
}

persist(new UserData("Alice", 30));
persist(new Config("dark"));`,

        language: "typescript"

      },

      {

        id: "5",

        title: "Abstraction",

        content: "Abstraction trap: Students assume one interface implementation will always be enough. 'Why use an interface if I only have one database?' Six months later you're migrating from MongoDB to Postgres and every file references Mongo-specific types. The interface costs nothing today and saves a rewrite tomorrow.\n\nAbstract class vs interface confusion: Use abstract when classes SHARE STATE (both have a `connection` field). Use interface when they only SHARE BEHAVIOR (both have `connect()`, `query()`).\n\nInterview trap: 'Is abstraction the same as encapsulation?' No — encapsulation hides INTERNAL DATA, abstraction hides IMPLEMENTATION DETAILS. Encapsulation says 'you can't touch this'. Abstraction says 'you don't need to know how this works'.\n\nEngineering mindset: The goal of abstraction isn't to make code 'clean' — it's to make change cheap. Every concrete dependency in your business logic is a future cost. Put an interface in front of anything that could change: databases, APIs, file systems, external services.",

        codeExample: `abstract class NotificationSender {
  abstract send(message: string): Promise<boolean>;

  async notify(message: string): Promise<void> {
    const sent = await this.send(message);
    if (!sent) {
      console.error(\`Failed to send: \${message}\`);
      this.fallback(message);
    }
  }

  private fallback(message: string): void {
    console.log(\`Stored for retry: \${message}\`);
  }
}

class EmailSender extends NotificationSender {
  async send(message: string): Promise<boolean> {
    console.log(\`Email: \${message}\`);
    return true;
  }
}

class SmsSender extends NotificationSender {
  async send(message: string): Promise<boolean> {
    console.log(\`SMS: \${message}\`);
    return false;
  }
}

new EmailSender().notify("Welcome!");
new SmsSender().notify("OTP: 1234");`,

        language: "typescript"

      },

      {

        id: "6",

        title: "SOLID Principles",

        content: "SOLID trap: Students try to apply all five principles to a 50-line script. SOLID exists for applications that will be maintained for YEARS by multiple people. A single-file utility doesn't need dependency inversion. Apply SOLID proportionally to the code's lifespan and team size.\n\nSRP is the most violated: 'This Utility class handles formatting, file I/O, and API calls.' When the utility file hits 2000 lines, you can't find anything. One responsibility = one reason to change.\n\nOCP trap: 'I modified the existing class instead of extending it.' The OCP violation that haunts teams — every feature sprint modifies the same 5 core files, creating merge conflict hell.\n\nInterview trap: 'Which SOLID principle is most important?' DIP (Dependency Inversion). Because if your high-level code depends on abstractions, the other four principles become achievable. If everything is hard-coded to concrete classes, SRP and OCP are impossible.\n\nEngineering mindset: SOLID is a smell detector, not a checklist. If you violate SRP and nothing breaks for months, fine. If you violate DIP and need to swap a database, you'll pay. Learn which violations hurt, not which rules to follow blindly.",

        codeExample: `// SRP violation: one class does everything
// ISP violation: fat interface with unused methods
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

// ISP fix: segregated interfaces
interface Workable {
  work(): void;
}
interface Eatable {
  eat(): void;
}
interface Sleepable {
  sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
  work() { console.log("Thinking..."); }
  eat() { console.log("Eating..."); }
  sleep() { console.log("Sleeping..."); }
}

class Robot implements Workable {
  work() { console.log("Processing..."); }
  // Robot doesn't need eat() or sleep()
}`,

        language: "typescript"

      },

      {

        id: "7",

        title: "Creational Design Patterns",

        content: "Design pattern trap: Students try to memorize all 23 Gang of Four patterns. Real engineers know ~5 patterns deeply and recognize when to reach for them. The rest are vocabulary for code review conversations.\n\nSingleton trap: Students make EVERYTHING a singleton. Logger, config, DB — fine. UserService, PaymentService — BAD. Singletons hide dependencies and make testing impossible. Your unit tests shouldn't need a real database just because Logger is a singleton.\n\nFactory trap: Creating a factory 'in case we need it later'. YAGNI (You Ain't Gonna Need It). Add a factory when you actually have multiple concrete implementations, not when you imagine you might.\n\nBuilder trap: Using Builder for objects with 2 parameters. Builder is for objects with 8+ optional parameters where constructor calls look like encrypted data.\n\nInterview trap: 'Why not just use new everywhere?' Because new couples your code to a concrete class. Factory Method lets the CALLER decide what to create, keeping your library code decoupled.\n\nEngineering mindset: Patterns are proven solutions to REPEATING problems. If you haven't felt the PAIN a pattern solves (god object, constructor explosion, untestable singletons), don't use it. The pattern will still be there when you actually need it.",

        codeExample: `// Singleton: for infrastructure, NOT business logic
class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info(msg: string) { console.log(\`[INFO] \${msg}\`); }
}

// Factory: when creation logic is non-trivial
interface Cache {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

class MemoryCache implements Cache {
  private store = new Map<string, string>();
  get(k: string) { return this.store.get(k) ?? null; }
  set(k: string, v: string) { this.store.set(k, v); }
}

class RedisCache implements Cache {
  get(k: string) { return null; } /* stub */
  set(k: string, v: string) {}
}

function createCache(type: "memory" | "redis"): Cache {
  return type === "memory" ? new MemoryCache() : new RedisCache();
}`,

        language: "typescript"

      },

      {

        id: "8",

        title: "Structural & Behavioral Patterns",

        content: "Pattern paralysis: Students memorize pattern names but can't spot real-world problems. Here's the shortcut: ask 'WHAT problem am I solving?'\n\nAdapter: You have an external library with a weird interface and can't change it. Wrap it.\n\nDecorator: You need to add behavior to an object WITHOUT changing its class. Adding logging, timing, rate-limiting — decorator wraps, doesn't modify.\n\nObserver/EventEmitter: One thing happens, many things need to react. UI events, state changes, webhooks. If you're polling or chaining callbacks, you need Observer.\n\nStrategy: You have multiple ways to do the same thing (sorting, pricing, auth). Instead of if-else chains, each strategy is a pluggable class.\n\nAnti-pattern to watch: 'Let's use Observer for everything!' — then debugging becomes impossible because you can't trace who's listening. Use patterns surgically.\n\nInterview trap: 'When NOT to use a pattern?' When you can solve the problem with a plain function or a simpler abstraction. Patterns add complexity. Prove you need that complexity.\n\nEngineering mindset: Patterns are the VOCABULARY of design discussions, not the CODE itself. When you say 'this needs an Adapter' in a code review, every engineer immediately knows what you mean. Use patterns to communicate, not to impress.",

        codeExample: `// Adapter: make an external API fit your interface
interface UserApi {
  getUser(id: string): { name: string; email: string };
}

class LegacyUserService {
  fetch(id: number): { fullName: string; mail: string } {
    return { fullName: "Alice", mail: "alice@example.com" };
  }
}

class UserAdapter implements UserApi {
  constructor(private legacy: LegacyUserService) {}

  getUser(id: string): { name: string; email: string } {
    const result = this.legacy.fetch(parseInt(id));
    return { name: result.fullName, email: result.mail };
  }
}

// Strategy: interchangeable algorithms
interface AuthStrategy {
  authenticate(token: string): boolean;
}

class JwtAuth implements AuthStrategy {
  authenticate(token: string): boolean {
    return token.length > 10;
  }
}

class ApiKeyAuth implements AuthStrategy {
  authenticate(key: string): boolean {
    return key.startsWith("sk-");
  }
}

function login(strategy: AuthStrategy, cred: string) {
  return strategy.authenticate(cred) ? "Access granted" : "Access denied";
}

console.log(login(new JwtAuth(), "eyJhbGci..."));`,

        language: "typescript"

      },

    ],

  },

  {

    slug: "python",

    title: "Python",

    description: "Learn Python from basics to advanced concepts with real examples.",

    icon: "🐍",

    color: "from-yellow-400 to-yellow-600",
    category: "Languages",

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

      },

    ],

  },

  {

    slug: "java",

    title: "Java",

    description: "Master Java programming from OOP to collections and multithreading.",

    icon: "☕",

    color: "from-red-500 to-red-700",
    category: "Languages",

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

      },

    ],

  },

  {

    slug: "c-language",

    title: "C Language",

    description: "Master C programming from fundamentals to pointers, memory management, and data structures.",

    icon: "⚙️",

    color: "from-blue-500 to-indigo-600",
    category: "Languages",

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

      },

    ],

  },

  {

    slug: "cpp",

    title: "C++",

    description: "Master C++ with OOP, STL, templates, and modern C++ features.",

    icon: "🔷",

    color: "from-indigo-500 to-purple-600",
    category: "Languages",

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

      },

    ],

  },

  {

    slug: "javascript",

    title: "JavaScript",

    description: "Modern JavaScript from ES6+ to async programming and DOM manipulation.",

    icon: "📜",

    color: "from-yellow-400 to-amber-500",
    category: "Languages",

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

      },

    ],

  },

  {

    slug: "computer-architecture",

    title: "Computer Architecture (COA)",

    description: "Understand CPU design, memory hierarchy, pipelining, and instruction set architectures.",

    icon: "🖥️",

    notesUrl: "https://noteslink.in/product/coa-computer-architecture-notes/",

    color: "from-cyan-500 to-blue-600",
    category: "Core CS",

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

      },

    ],

  },

  {

    slug: "discrete-structures",

    title: "Discrete Structures (DSS)",

    description: "Explore logic, sets, relations, graph theory, combinatorics, and Boolean algebra.",

    icon: "🔗",

    notesUrl: "https://noteslink.in/product/de-la-notes-kiit/",

    color: "from-violet-500 to-purple-600",
    category: "Core CS",

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

      },

    ],

  },

  {

    slug: "digital-system-design",

    title: "Digital System Design (DSD)",

    description: "Learn number systems, logic gates, combinational and sequential circuit design.",

    icon: "⚡",

    notesUrl: "https://noteslink.in/product/dsd-digital-system-design-notes-kiit/",

    color: "from-amber-500 to-orange-600",
    category: "Systems",

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

      },

    ],

  },

  {

    slug: "automata-formal-languages",

    title: "Automata & Formal Languages (AFL)",

    description: "Study finite automata, regular expressions, context-free grammars, and Turing machines.",

    icon: "🔀",

    notesUrl: "https://noteslink.in/product/afl-automata-formal-language-kiit/",

    color: "from-rose-500 to-pink-600",
    category: "Electives",

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

      },

    ],

  },

  {

    slug: "probability-statistics",

    title: "Probability & Statistics (PS)",

    description: "Master probability rules, distributions, hypothesis testing, and regression.",

    icon: "📊",

    notesUrl: "https://noteslink.in/product/ps-probability-and-statics-notes-kiit-copy/",

    color: "from-lime-500 to-green-600",
    category: "Core CS",

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

      },

    ],

  },

  {

    slug: "artificial-intelligence",

    title: "Artificial Intelligence (AI)",

    description: "Explore search algorithms, knowledge representation, planning, and NLP.",

    icon: "🤖",

    notesUrl: "https://noteslink.in/product/artificial-intelligence-notes-kiit/",

    color: "from-fuchsia-500 to-pink-600",
    category: "AI & ML",

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

      },

    ],

  },

  {

    slug: "machine-learning",

    title: "Machine Learning (ML)",

    description: "Learn supervised and unsupervised learning, neural networks, and model evaluation.",

    icon: "🧠",

    notesUrl: "https://noteslink.in/product/machine-learning-notes-kiit/",

    color: "from-sky-500 to-indigo-600",
    category: "AI & ML",

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

      },

    ],

  },

  {

    slug: "compiler-design",

    title: "Compiler Design (CD)",

    description: "Learn lexical analysis, parsing, semantic analysis, code optimization, and generation.",

    icon: "⚙️",

    notesUrl: "https://noteslink.in/product/compiler-design-kiit/",

    color: "from-teal-500 to-emerald-600",
    category: "Electives",

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

      },

    ],

  },

  {

    slug: "software-engineering",

    title: "Software Engineering (SE)",

    description: "Master SDLC, requirements engineering, design patterns, testing, and agile.",

    icon: "🛠️",

    notesUrl: "https://noteslink.in/product/se-software-engineering-kiit/",

    color: "from-orange-500 to-red-600",
    category: "Software Dev",

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

      },

    ],

  },

  {

    slug: "data-mining-warehousing",

    title: "Data Mining & Warehousing (DMDW)",

    description: "Learn ETL processes, OLAP, association rules, classification, and clustering.",

    icon: "⛏️",

    notesUrl: "https://noteslink.in/product/dmdw-data-mining-data-warehousing-kiit/",

    color: "from-yellow-500 to-amber-600",
    category: "AI & ML",

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

      },

    ],

  },

  {

    slug: "distributed-os",

    title: "Distributed Operating Systems (DOS)",

    description: "Learn distributed systems concepts, consensus algorithms, replication, and MapReduce.",

    icon: "🌐",

    notesUrl: "https://noteslink.in/product/dos-distributed-operating-system-kiit/",

    color: "from-indigo-500 to-violet-600",
    category: "Systems",

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

      },

    ],

  },

  {

    slug: "hpc",

    title: "High Performance Computing (HPC)",

    description: "Learn parallel computing, GPU programming, MPI, OpenMP, and performance analysis.",

    icon: "🚀",

    notesUrl: "https://noteslink.in/product/hpc-high-performances-computing-notes-kiit/",

    color: "from-red-500 to-rose-600",
    category: "Electives",

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

      },

    ],

  },

  {

    slug: "image-processing",

    title: "Image Processing & Applications (IPA)",

    description: "Learn digital image fundamentals, filtering, transformations, segmentation, and feature extraction.",

    icon: "🖼️",

    notesUrl: "https://noteslink.in/product/ipa-image-processing-applications-notes-kiit/",

    color: "from-pink-500 to-fuchsia-600",
    category: "AI & ML",

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

      },

    ],

  },

  {

    slug: "multicore-programming",

    title: "Multicore Programming (MCP)",

    description: "Learn parallelism, threading, synchronization, lock-free algorithms, and OpenMP.",

    icon: "🧵",

    notesUrl: "https://noteslink.in/product/mcp-multicore-programming-notes-kiit/",

    color: "from-emerald-500 to-teal-600",
    category: "Electives",

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

      },

    ],

  },

  {

    slug: "advanced-microprocessor",

    title: "ARM & Advanced Microprocessor",

    description: "Learn ARM architecture, assembly language, interrupts, pipeline, and memory management.",

    icon: "🔧",

    notesUrl: "https://noteslink.in/product/arm-advanced-microprocessor-notes-kiit/",

    color: "from-zinc-500 to-gray-600",
    category: "Electives",

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

      },

    ],

  },

  {

    slug: "software-project-management",

    title: "Software Project Management (SPM)",

    description: "Master project planning, estimation, scheduling, risk management, and agile methods.",

    icon: "📋",

    notesUrl: "https://noteslink.in/product/software-project-management-notes-kiit/",

    color: "from-cyan-500 to-blue-600",
    category: "Software Dev",

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

      },

    ],

  },

  {

    slug: "industry-4-0",

    title: "Industry 4.0",

    description: "Explore IoT, cyber-physical systems, cloud computing, big data, and AI in manufacturing.",

    icon: "🏭",

    notesUrl: "https://noteslink.in/product/ind-4-0-noteskiit/",

    color: "from-violet-500 to-purple-600",
    category: "Electives",

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

      },

    ],

  }

];



export function getCourse(slug: string): Course | undefined {

  return courses.find(c => c.slug === slug);

}



export function getLesson(slug: string, lessonId: string): Lesson | undefined {

  const course = getCourse(slug);

  return course?.lessons.find(l => l.id === lessonId);

}



