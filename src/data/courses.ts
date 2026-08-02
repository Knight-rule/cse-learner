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
      content: `## Definition

A **data structure** is a specialized format for organizing, processing, retrieving, and storing data in a computer so that it can be used efficiently. It defines the relationship between data elements, the operations that can be performed on them, and the algorithms that implement those operations.

## Introduction

Data structures are the backbone of every software application. Whether you're building a search engine, a social media feed, or a banking system, the way you organize data directly impacts performance, memory usage, and scalability. Choosing the right data structure is like choosing the right tool — you wouldn't use a hammer to cut wood.

## History and Establishment

- **1960s**: Arrays and linked lists were formalized in early programming languages like FORTRAN and ALGOL
- **1970s**: Donald Knuth published "The Art of Computer Programming," systematically cataloging data structures
- **1970s**: Hash tables were invented by Hans Peter Luhn at IBM
- **1980s**: B-trees and red-black trees became standard for database indexing
- **1990s**: The Java Collections Framework and C++ STL standardized data structure libraries

## Advantages

- **Efficiency**: Correct data structure can reduce time complexity from O(n²) to O(n) or O(log n)
- **Reusability**: Generic implementations work across applications
- **Abstraction**: Hides complex implementation details behind simple interfaces
- **Scalability**: Handles growing data volumes gracefully
- **Memory optimization**: Specialized structures minimize wasted space

## Disadvantages

- **Complexity**: Advanced structures (tries, skip lists) have steep learning curves
- **Overhead**: Some structures use extra memory for pointers, balancing, or hashing
- **Trade-offs**: No single structure is optimal for all operations
- **Implementation bugs**: Pointer errors, off-by-one, and memory leaks are common
- **Cache unfriendly**: Pointer-based structures (linked lists) suffer from poor cache locality

## Applications

| Application | Data Structure Used |
|-------------|-------------------|
| Phone contacts | Hash table (O(1) lookup) |
| File system | Tree (hierarchical) |
| Browser history | Stack (LIFO navigation) |
| Print queue | Queue (FIFO processing) |
| GPS routing | Graph (shortest path) |
| Database indexing | B-tree (disk-friendly) |
| Autocomplete | Trie (prefix matching) |
| Task scheduling | Priority queue / Heap |

## Time Complexity Summary

| Structure | Access | Search | Insert | Delete |
|-----------|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1) | O(1) |
| Stack | O(n) | O(n) | O(1) | O(1) |
| Queue | O(n) | O(n) | O(1) | O(1) |
| Hash Table | O(1)* | O(1)* | O(1)* | O(1)* |
| BST (balanced) | O(log n) | O(log n) | O(log n) | O(log n) |

*Average case; worst case is O(n) for hash tables.`,
      codeExample: `// Choosing the right data structure\n\n// Need fast lookup by key? → Hash Map\nconst userMap = new Map();\nuserMap.set("alice", { name: "Alice", age: 25 });\nconsole.log(userMap.get("alice")); // O(1)\n\n// Need FIFO processing? → Queue\nconst printQueue = ["doc1", "doc2", "doc3"];\nconst next = printQueue.shift(); // "doc1"\n\n// Need LIFO (most recent first)? → Stack\nconst undoStack = [];\nundoStack.push("action1");\nundoStack.push("action2");\nconst last = undoStack.pop(); // "action2"\n\n// Need sorted data with fast insert? → BST\n// (See tree lessons for implementation)\n\n// Need to find shortest path? → Graph\n// (See graph lessons for implementation)`,
      language: "typescript"
    },
    {
      id: "2",
      title: "Arrays & Dynamic Arrays",
      content: `## Definition

An **array** is a collection of elements stored at contiguous memory locations, where each element can be accessed directly using its index. A **dynamic array** automatically resizes itself when it runs out of allocated space.

## Introduction

Arrays are the most fundamental data structure. Every other data structure either uses arrays internally or can be implemented using arrays. They provide constant-time access to any element by index, making them ideal when you know the position of the data you need.

## History and Establishment

- **1960s**: Arrays were introduced in FORTRAN (1957), the first high-level language to support them
- **1970s**: C language formalized array-pointer equivalence: \`arr[i]\` is equivalent to \`*(arr + i)\`
- **1990s**: Dynamic arrays became standard: C++ \`std::vector\` (1994), Java \`ArrayList\` (1998)
- **2000s**: Languages like Python and JavaScript made dynamic arrays the default (no fixed-size arrays)

## Advantages

- **O(1) random access**: Access any element in constant time using index
- **Cache-friendly**: Contiguous memory means CPU prefetching works efficiently
- **Memory efficient**: No overhead for pointers or metadata
- **Simple implementation**: Easy to understand and debug
- **Binary search compatible**: Sorted arrays enable O(log n) search

## Disadvantages

- **Fixed size** (static arrays): Must know size in advance
- **Costly insertion/deletion**: Inserting/deleting in the middle requires shifting O(n) elements
- **Wasted memory**: Static arrays may allocate more space than needed
- **Resizing cost**: Dynamic arrays occasionally double in size, copying all elements (O(n) amortized O(1))
- **No efficient search**: Unsorted arrays require O(n) linear search

## Syntax

\`\`\`javascript
// Static array (fixed size)
const arr = new Array(5);        // [empty × 5]
const arr = [1, 2, 3, 4, 5];    // initialized

// Dynamic array
const dynamic = [];
dynamic.push(1);                  // add to end
dynamic.pop();                    // remove from end
dynamic.splice(2, 1);            // remove at index 2
dynamic.unshift(0);              // add to beginning
\`\`\`

## Memory Layout

Arrays store elements sequentially in memory. If the base address is \`B\` and each element takes \`S\` bytes:

\`\`\`
Element at index i is at address: B + (i × S)
\`\`\`

This formula is why array access is O(1) — it's a single arithmetic calculation.

## Dynamic Array Doubling

When a dynamic array is full and you add an element:
1. Allocate a new array with double the capacity
2. Copy all existing elements to the new array
3. Add the new element
4. Free the old array

The copy costs O(n), but since it happens only when the array doubles, the amortized cost per insertion is O(1).`,
      codeExample: `// Two Sum — O(n) with hash map (array + hash map combo)\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}\nconsole.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]\n\n// Dynamic array implementation\nclass DynamicArray {\n  constructor() {\n    this.data = new Array(1);\n    this.size = 0;\n  }\n\n  push(val) {\n    if (this.size === this.data.length) {\n      const newArr = new Array(this.data.length * 2);\n      for (let i = 0; i < this.size; i++) newArr[i] = this.data[i];\n      this.data = newArr;\n    }\n    this.data[this.size++] = val;\n  }\n\n  get(i) {\n    if (i < 0 || i >= this.size) throw new Error("Index out of bounds");\n    return this.data[i];\n  }\n}\n\nconst arr = new DynamicArray();\nfor (let i = 0; i < 10; i++) arr.push(i * 10);\nconsole.log(arr.get(5)); // 50`,
      language: "typescript"
    },
    {
      id: "3",
      title: "Linked Lists",
      content: `## Definition

A **linked list** is a linear data structure where elements (nodes) are stored in non-contiguous memory locations. Each node contains data and a reference (pointer) to the next node in the sequence.

## Introduction

Linked lists solve the main limitation of arrays: you can insert and delete elements in O(1) time without shifting other elements. The trade-off is losing random access — to reach the 5th element, you must traverse the first 4.

## History and Establishment

- **1955**: First proposed by Allen Newell and Cliff Shaw in their Information Processing Language
- **1960s**: Used extensively in LISP (List Processing language)
- **1970s**: Became a standard teaching data structure in CS curricula
- **1980s**: Variants emerged: doubly linked lists, circular linked lists, skip lists

## Types

| Type | Description | Use Case |
|------|-------------|----------|
| Singly linked | Each node points to next | Simple stacks, queues |
| Doubly linked | Each node points to next AND previous | Browser history, LRU cache |
| Circular | Last node points back to first | Round-robin scheduling |

## Advantages

- **O(1) insertion/deletion** at head: Just update pointers
- **Dynamic size**: No need to pre-allocate memory
- **Memory efficient**: Only allocates memory for actual elements
- **Easy insertion in middle**: No shifting needed, just update pointers
- **Foundation for other structures**: Stacks, queues, and graphs often use linked lists

## Disadvantages

- **O(n) random access**: Must traverse from head to reach element at index i
- **Extra memory**: Each node stores a pointer (8 bytes on 64-bit systems)
- **Cache unfriendly**: Nodes scattered in memory cause cache misses
- **No binary search**: Can't jump to middle element
- **Pointer management**: Easy to lose head pointer or create cycles

## Syntax

\`\`\`javascript
// Node structure
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// Create: 1 → 2 → 3
const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
\`\`\`

## Visual Representation

\`\`\`
head
  ↓
[1|→] → [2|→] → [3|→] → null
\`\`\`

Each box is a node: [data | pointer]. The last node points to null.`,
      codeExample: `class Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n  }\n}\n\n// Reverse a linked list\nfunction reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}\n\n// Floyd's cycle detection\nfunction hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}\n\n// Find middle node\nfunction middleNode(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n  }\n  return slow;\n}\n\n// Usage\nconst head = new Node(1);\nhead.next = new Node(2);\nhead.next.next = new Node(3);\nhead.next.next.next = new Node(4);\n\nconst reversed = reverseList(head);\nconsole.log(hasCycle(reversed)); // false\nconsole.log(middleNode(reversed)?.val); // 3`,
      language: "typescript"
    },
    {
      id: "4",
      title: "Stacks",
      content: `## Definition

A **stack** is a linear data structure that follows the **LIFO (Last In, First Out)** principle. The last element added is the first one removed.

## Introduction

Stacks are everywhere in computing: function call stacks, undo/redo in text editors, browser back buttons, expression evaluation, and syntax parsing. They're simple but powerful — any problem involving "most recent" or "matching" patterns screams "use a stack."

## History and Establishment

- **1940s**: Stacks were used in early computers for subroutine call management
- **1957**: The term "stack" was coined by Friedrich Bauer
- **1960s**: Pushdown automata (stack-based machines) became theoretical foundations of computation
- **1970s**: Stacks became standard for expression parsing and recursion implementation

## Advantages

- **O(1) push and pop**: Adding and removing from the top is constant time
- **Memory efficient**: Only stores what's needed, no wasted space
- **Simple implementation**: Easy to understand and implement
- **Natural fit for recursion**: Function calls use the call stack implicitly
- **Easy to reverse**: Push elements, then pop them to get reverse order

## Disadvantages

- **No random access**: Can't access middle elements without popping everything above
- **Limited operations**: Only top element is accessible
- **Stack overflow**: Fixed-size stacks can run out of space (recursion depth)
- **No search**: Must pop elements one by one to find a specific value
- **LIFO limitation**: Not suitable for FIFO scenarios

## Syntax

\`\`\`javascript
// Array-based stack
const stack = [];
stack.push(1);    // Push: add to top
stack.push(2);
stack.push(3);
stack.pop();      // Pop: remove from top → 3
stack[stack.length - 1]; // Peek: view top → 2

// Stack class
class Stack {
  constructor() { this.items = []; }
  push(val) { this.items.push(val); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
}
\`\`\`

## Common Applications

1. **Parenthesis matching**: Push opening brackets, pop and match on closing
2. **Expression evaluation**: Convert infix to postfix, then evaluate
3. **Undo/redo**: Push actions, pop to undo
4. **Backtracking**: DFS uses stack (or recursion)
5. **Function calls**: Call stack tracks active functions`,
      codeExample: `// Valid Parentheses\nfunction isValid(s) {\n  const stack = [];\n  const pairs = { ')': '(', ']': '[', '}': '{' };\n  for (const c of s) {\n    if ('({['.includes(c)) {\n      stack.push(c);\n    } else if (stack.pop() !== pairs[c]) {\n      return false;\n    }\n  }\n  return stack.length === 0;\n}\nconsole.log(isValid("({[]})")); // true\nconsole.log(isValid("([)]"));   // false\n\n// Min Stack - O(1) getMin\nclass MinStack {\n  constructor() {\n    this.stack = [];\n    this.mins = [];\n  }\n  push(val) {\n    this.stack.push(val);\n    const min = this.mins.length === 0 ? val : Math.min(val, this.mins[this.mins.length - 1]);\n    this.mins.push(min);\n  }\n  pop() {\n    this.stack.pop();\n    this.mins.pop();\n  }\n  getMin() { return this.mins[this.mins.length - 1]; }\n}\n\nconst ms = new MinStack();\nms.push(3); ms.push(1); ms.push(4);\nconsole.log(ms.getMin()); // 1`,
      language: "typescript"
    },
    {
      id: "5",
      title: "Queues & Deques",
      content: `## Definition

A **queue** is a linear data structure that follows the **FIFO (First In, First Out)** principle. The first element added is the first one removed. A **deque (double-ended queue)** allows insertion and deletion at both ends.

## Introduction

Queues model real-world scenarios: customers waiting in line, tasks in a printer queue, messages in a message broker. BFS (Breadth-First Search) uses queues to explore nodes level by level. Deques are more flexible — they can function as both stacks and queues.

## History and Establishment

- **1960s**: Queues were formalized in operations research and simulation
- **1970s**: Circular queues became standard for buffer management
- **1980s**: Priority queues (heaps) became essential for scheduling algorithms
- **1990s**: Deques were added to C++ STL and Java Collections Framework

## Types

| Type | Description | Use Case |
|------|-------------|----------|
| Simple queue | FIFO, front and rear only | Print queue |
| Circular queue | Rear wraps to front | Buffer, ring buffer |
| Priority queue | Highest priority dequeues first | Task scheduling |
| Deque | Insert/delete at both ends | Sliding window |
| Double-ended queue | Same as deque | Palindrome checking |

## Advantages

- **O(1) enqueue/dequeue**: Both operations are constant time
- **FIFO ordering**: Natural fit for sequential processing
- **Flexible deque**: Can function as stack or queue
- **BFS foundation**: Essential for level-order traversal
- **Thread-safe**: Concurrent queues enable producer-consumer patterns

## Disadvantages

- **No random access**: Can't access middle elements directly
- **Fixed size** (simple arrays): Circular queue has capacity limit
- **No search**: Must dequeue elements to find specific values
- **Memory overhead**: Linked list implementation uses extra pointer memory
- **Dequeue from empty**: Must handle underflow gracefully

## Syntax

\`\`\`javascript
// Array-based queue (inefficient for dequeue)\nconst queue = [];\nqueue.push(1);       // Enqueue: add to rear\nqueue.push(2);\nqueue.shift();      // Dequeue: remove from front → 1\n\n// Deque\nclass Deque {\n  constructor() { this.items = []; }\n  addFront(val) { this.items.unshift(val); }\n  addRear(val) { this.items.push(val); }\n  removeFront() { return this.items.shift(); }\n  removeRear() { return this.items.pop(); }\n}\n\`\`\``,
      codeExample: `// Queue using two stacks (amortized O(1))\nclass Queue {\n  constructor() {\n    this.inbox = [];\n    this.outbox = [];\n  }\n  enqueue(item) { this.inbox.push(item); }\n  dequeue() {\n    if (this.outbox.length === 0) {\n      while (this.inbox.length) this.outbox.push(this.inbox.pop());\n    }\n    return this.outbox.pop();\n  }\n  peek() {\n    if (this.outbox.length === 0) {\n      while (this.inbox.length) this.outbox.push(this.inbox.pop());\n    }\n    return this.outbox[this.outbox.length - 1];\n  }\n}\n\n// Sliding Window Maximum - O(n) using deque\nfunction maxSlidingWindow(nums, k) {\n  const deque = [];\n  const result = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (deque.length && deque[0] < i - k + 1) deque.shift();\n    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();\n    deque.push(i);\n    if (i >= k - 1) result.push(nums[deque[0]]);\n  }\n  return result;\n}\nconsole.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]`,
      language: "typescript"
    },
    {
      id: "6",
      title: "Trees & Binary Trees",
      content: `## Definition

A **tree** is a hierarchical data structure consisting of nodes connected by edges. A **binary tree** is a tree where each node has at most two children (left and right). A **Binary Search Tree (BST)** is a binary tree where left child < parent < right child.

## Introduction

Trees represent hierarchical data naturally: file systems, HTML DOM, organization charts, database indexes. BSTs enable O(log n) search, insert, and delete when balanced. The magic of BSTs: in-order traversal visits nodes in sorted order.

## History and Establishment

- **1960s**: Binary trees were formalized in computer science theory
- **1970s**: B-trees invented by Bayer and McCreight for database indexing
- **1978**: Red-black trees invented by Guibas and Sedgewick
- **1980s**: AVL trees became standard for self-balancing implementations
- **2000s**: Trees became essential for search engines (trie-based autocomplete)

## Types

| Type | Property | Use Case |
|------|----------|----------|
| Binary Tree | ≤ 2 children | General hierarchy |
| BST | Left < Parent < Right | Search, sort |
| AVL Tree | Height-balanced BST | Fast lookup |
| Red-Black Tree | Approximately balanced | Maps, sets |
| B-Tree | Multi-way, disk-friendly | Database indexes |
| Trie | Prefix tree | Autocomplete |
| Heap | Parent ≥ children | Priority queue |

## Advantages

- **O(log n) operations**: Search, insert, delete (when balanced)
- **Sorted order**: In-order traversal of BST gives sorted data
- **Hierarchical**: Natural representation of nested data
- **Flexible**: Many variants for different use cases
- **Cache-friendly**: Arrays can represent complete trees compactly

## Disadvantages

- **Unbalanced BST degrades to O(n)**: Sorted input creates a linked list
- **Complex balancing**: AVL and red-black trees are tricky to implement
- **No O(1) operations**: Every operation requires traversal from root
- **Memory overhead**: Each node stores pointers to children
- **Not great for range queries**: Segment trees or Fenwick trees are better

## Syntax

\`\`\`javascript
class TreeNode {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n  }\n}\n\n// BST Insert\nfunction insert(root, val) {\n  if (!root) return new TreeNode(val);\n  if (val < root.val) root.left = insert(root.left, val);\n  else if (val > root.val) root.right = insert(root.right, val);\n  return root;\n}\n\`\`\``,
      codeExample: `class TreeNode {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n  }\n}\n\n// Validate BST\nfunction isValidBST(root, min = -Infinity, max = Infinity) {\n  if (!root) return true;\n  if (root.val <= min || root.val >= max) return false;\n  return isValidBST(root.left, min, root.val) &&\n         isValidBST(root.right, root.val, max);\n}\n\n// Level order traversal\nfunction levelOrder(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length) {\n    const level = [];\n    for (let i = queue.length; i > 0; i--) {\n      const node = queue.shift();\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n  }\n  return result;\n}\n\n// Build BST and traverse\nlet root = null;\n[5, 3, 7, 1, 4, 6, 8].forEach(val => root = insert(root, val));\nconsole.log("Level order:", levelOrder(root));\nconsole.log("Valid BST:", isValidBST(root));`,
      language: "typescript"
    },
    {
      id: "7",
      title: "Heaps & Priority Queues",
      content: `## Definition

A **heap** is a complete binary tree where every parent is greater than or equal to its children (**max-heap**) or less than or equal to its children (**min-heap**). A **priority queue** is an abstract data type where each element has a priority, and the highest-priority element is dequeued first.

## Introduction

Heaps are the underlying data structure for priority queues. They're perfect when you need "the largest" or "the smallest" element quickly — like finding the top K elements, merging sorted lists, or implementing Dijkstra's algorithm. The key insight: heaps don't maintain full sorted order, only the heap property (parent-child relationship).

## History and Establishment

- **1964**: Heapsort algorithm invented by J.W.J. Williams
- **1964**: Robert Floyd proposed the linear-time heap construction
- **1970s**: Heaps became standard for priority queue implementations
- **1980s**: Fibonacci heaps invented for faster decrease-key operations
- **2000s**: Binary heaps remain the most practical choice for most applications

## Types

| Type | Property | Use Case |
|------|----------|----------|
| Binary Heap | Complete binary tree, array-based | General priority queue |
| Binomial Heap | Collection of binomial trees | Mergeable priority queue |
| Fibonacci Heap | Amortized O(1) decrease-key | Dijkstra's algorithm |
| Min-heap | Parent ≤ children | Find minimum |
| Max-heap | Parent ≥ children | Find maximum |

## Advantages

- **O(1) find-min/find-max**: Root is always the extreme element
- **O(log n) insert and delete**: Efficient operations
- **Memory efficient**: Array representation, no pointer overhead
- **Simple implementation**: Easier than balanced BSTs
- **Excellent for top-K**: Find k largest/smallest in O(n log k)

## Disadvantages

- **No O(1) search**: Must scan O(n) to find arbitrary element
- **Not sorted**: Only root is guaranteed to be extreme
- **Poor cache behavior**: For large heaps, array traversal causes misses
- **No efficient delete**: Deleting arbitrary element is O(n)
- **Merge is O(n)**: Combining two binary heaps requires reconstruction

## Syntax

\`\`\`javascript
// Array-based binary heap
// Parent of i: Math.floor((i-1)/2)
// Left child of i: 2*i + 1
// Right child of i: 2*i + 2

class MinHeap {\n  constructor() { this.heap = []; }\n  peek() { return this.heap[0]; }\n  push(val) {\n    this.heap.push(val);\n    this.bubbleUp(this.heap.length - 1);\n  }\n  pop() {\n    const min = this.heap[0];\n    const last = this.heap.pop();\n    if (this.heap.length > 0) {\n      this.heap[0] = last;\n      this.sinkDown(0);\n    }\n    return min;\n  }\n}\n\`\`\``,
      codeExample: `class MinHeap {\n  constructor() { this.heap = [];\n  }\n  peek() { return this.heap[0]; }\n  push(val) {\n    this.heap.push(val);\n    this.bubbleUp(this.heap.length - 1);\n  }\n  pop() {\n    const min = this.heap[0];\n    const last = this.heap.pop();\n    if (this.heap.length > 0) {\n      this.heap[0] = last;\n      this.sinkDown(0);\n    }\n    return min;\n  }\n  bubbleUp(i) {\n    while (i > 0) {\n      const parent = Math.floor((i - 1) / 2);\n      if (this.heap[parent] <= this.heap[i]) break;\n      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];\n      i = parent;\n    }\n  }\n  sinkDown(i) {\n    const n = this.heap.length;\n    while (true) {\n      let smallest = i;\n      const left = 2 * i + 1, right = 2 * i + 2;\n      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;\n      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;\n      if (smallest === i) break;\n      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];\n      i = smallest;\n    }\n  }\n}\n\nconst pq = new MinHeap();\n[5, 3, 7, 1, 4].forEach(n => pq.push(n));\nconsole.log("Min:", pq.pop()); // 1\nconsole.log("Next:", pq.pop()); // 3`,
      language: "typescript"
    },
    {
      id: "8",
      title: "Graphs",
      content: `## Definition

A **graph** is a non-linear data structure consisting of **vertices** (nodes) connected by **edges** (links). Edges can be directed (one-way) or undirected (two-way), and weighted (with a cost) or unweighted.

## Introduction

Graphs model relationships: social networks (friends), road maps (cities and distances), web pages (hyperlinks), dependencies (package managers), and more. Graph problems are among the most challenging in CS — many are NP-hard, and even polynomial algorithms require careful design.

## History and Establishment

- **1736**: Leonhard Euler invented graph theory with the Seven Bridges of Königsberg problem
- **1950s**: Graph algorithms became central to operations research
- **1956**: Edsger Dijkstra invented the shortest-path algorithm
- **1970s**: Graph databases emerged for network analysis
- **2000s**: Social networks made graph algorithms mainstream (PageRank, community detection)

## Types

| Type | Description | Example |
|------|-------------|---------|
| Directed | Edges have direction | Twitter follow |
| Undirected | Edges are bidirectional | Facebook friend |
| Weighted | Edges have costs | Road distance |
| Cyclic | Contains cycles | Web pages |
| Acyclic | No cycles (DAG) | Task dependencies |
| Connected | All nodes reachable | Single network |
| Disconnected | Some nodes isolated | Multiple networks |

## Advantages

- **Model relationships**: Natural representation of connected data
- **Flexible**: Can represent almost any relational data
- **Powerful algorithms**: BFS, DFS, Dijkstra, topological sort
- **Foundation for other structures**: Trees are special graphs
- **Real-world applicability**: Social networks, GPS, compilers all use graphs

## Disadvantages

- **Complex implementation**: Adjacency lists vs matrices, directed vs undirected
- **Memory intensive**: Adjacency matrix is O(V²), even for sparse graphs
- **Slow traversal**: BFS/DFS are O(V + E), can be slow on large graphs
- **Hard to visualize**: Large graphs are impossible to draw
- **NP-hard problems**: Many graph problems (TSP, graph coloring) are intractable

## Representations

\`\`\`
// Adjacency List (space-efficient for sparse graphs)
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A"],
  D: ["B"]
};

// Adjacency Matrix (O(1) edge check)
const matrix = [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [1, 0, 0, 0],
  [0, 1, 0, 0]
];
\`\`\``,
      codeExample: `// BFS - Level order traversal\nfunction bfs(graph, start) {\n  const visited = new Set();\n  const queue = [start];\n  visited.add(start);\n  while (queue.length) {\n    const node = queue.shift();\n    for (const neighbor of graph[node]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  return visited;\n}\n\n// DFS - Depth first traversal\nfunction dfs(graph, start, visited = new Set()) {\n  visited.add(start);\n  for (const neighbor of graph[start]) {\n    if (!visited.has(neighbor)) dfs(graph, neighbor, visited);\n  }\n  return visited;\n}\n\n// Topological sort (DAG)\nfunction topologicalSort(graph) {\n  const inDegree = {};\n  for (const node in graph) inDegree[node] = 0;\n  for (const node in graph) {\n    for (const neighbor of graph[node]) inDegree[neighbor]++;\n  }\n  const queue = Object.keys(inDegree).filter(n => inDegree[n] === 0);\n  const result = [];\n  while (queue.length) {\n    const node = queue.shift();\n    result.push(node);\n    for (const neighbor of graph[node]) {\n      if (--inDegree[neighbor] === 0) queue.push(neighbor);\n    }\n  }\n  return result;\n}\n\nconst graph = { A: ["B", "C"], B: ["D"], C: [], D: [] };\nconsole.log("BFS:", [...bfs(graph, "A")]);\nconsole.log("Topo:", topologicalSort(graph));`,
      language: "typescript"
    },
    {
      id: "9",
      title: "Hash Tables",
      content: `## Definition

A **hash table** (hash map) is a data structure that maps keys to values using a **hash function**. The hash function converts a key into an array index, enabling average O(1) lookup, insert, and delete.

## Introduction

Hash tables are the most widely used data structure in practice. Dictionaries in Python, objects in JavaScript, HashMaps in Java, and unordered_maps in C++ all use hash tables. They provide O(1) average-case performance for key-value operations, making them indispensable for caching, counting, and lookup tables.

## History and Establishment

- **1953**: Hans Peter Luhn at IBM first proposed hash tables for information retrieval
- **1954**: IBM used hash tables for keyword indexing
- **1960s**: Multiple hashing techniques developed (linear probing, quadratic probing, chaining)
- **1970s**: Cryptographic hash functions developed for security applications
- **2000s**: Lock-free concurrent hash tables enabled high-performance parallel computing

## Types

| Type | Collision Resolution | Use Case |
|------|---------------------|----------|
| Chaining | Each bucket holds a linked list | General purpose |
| Open Addressing | Find next empty slot | Memory-constrained |
| Robin Hood | Steal from richer buckets | Reduced variance |
| Cuckoo | Two hash functions | High load factors |

## Advantages

- **O(1) average**: Lookup, insert, delete in constant time
- **Flexible keys**: Can hash strings, numbers, objects
- **Simple API**: get, set, delete operations
- **Cache-friendly**: Arrays provide good locality
- **No ordering needed**: When you just need key-value lookup

## Disadvantages

- **O(n) worst case**: All keys hash to same bucket (degenerate case)
- **No ordering**: Can't iterate in sorted order
- **Memory overhead**: Pre-allocated buckets may be wasted
- **Hash collisions**: Performance degrades with poor hash functions
- **No range queries**: Can't efficiently find all keys in a range

## Collision Resolution

\`\`\`
Chaining:  bucket → [key1,val1] → [key2,val2] → null
Open Addressing:  bucket[0]=key1, bucket[1]=key2 (probed)
\`\`\`

## Load Factor

\`\`\`
loadFactor = numElements / numBuckets
\`\`\`

When load factor exceeds threshold (typically 0.75), the table resizes (doubles buckets) and rehashes all entries.`,
      codeExample: `// Two Sum — O(n) with hash map\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}\nconsole.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]\n\n// First non-repeating character\nfunction firstUniqChar(s) {\n  const freq = new Map();\n  for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);\n  for (let i = 0; i < s.length; i++) {\n    if (freq.get(s[i]) === 1) return i;\n  }\n  return -1;\n}\nconsole.log(firstUniqChar("leetcode")); // 0\n\n// Group Anagrams\nfunction groupAnagrams(strs) {\n  const map = new Map();\n  for (const s of strs) {\n    const key = s.split('').sort().join('');\n    if (!map.has(key)) map.set(key, []);\n    map.get(key).push(s);\n  }\n  return Array.from(map.values());\n}\nconsole.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));`,
      language: "typescript"
    },
    {
      id: "10",
      title: "Strings & Pattern Matching",
      content: `## Definition

A **string** is a sequence of characters. **Pattern matching** is the problem of finding occurrences of a pattern within a text string. Efficient pattern matching algorithms are critical for text search, DNA sequence analysis, and compiler design.

## Introduction

Every naive pattern matcher uses O(n×m) time — comparing the pattern at every position in the text. For large texts (DNA sequences, log files), this is too slow. KMP (Knuth-Morris-Pratt) achieves O(n+m) by precomputing how much of the pattern can be skipped after a mismatch.

## History and Establishment

- **1970s**: String matching was formalized in automata theory
- **1977**: Knuth, Morris, and Pratt published the KMP algorithm
- **1977**: Boyer and Moore published a faster practical algorithm
- **1980s**: Rabin-Karp introduced hash-based pattern matching
- **2000s**: Suffix trees and arrays became standard for advanced string problems

## Types

| Algorithm | Time | Preprocessing | Use Case |
|-----------|------|---------------|----------|
| Naive | O(nm) | None | Small texts |
| KMP | O(n+m) | O(m) LPS array | General purpose |
| Boyer-Moore | O(nm) | O(m) bad character | Practical text search |
| Rabin-Karp | O(n+m) | O(m) hash | Multiple patterns |
| Suffix Tree | O(n) build, O(m) search | O(n) | Many queries |

## Advantages

- **KMP guarantees O(n+m)**: No degenerate cases
- **Boyer-Moore is fastest in practice**: Skips characters, often sublinear
- **Rabin-Karp handles multiple patterns**: Hash-based, easy to parallelize
- **Suffix arrays**: Space-efficient for repeated queries

## Disadvantages

- **Preprocessing overhead**: KMP and Boyer-Moore need precomputation
- **Space for suffix trees**: O(n) but with large constant factors
- **Complexity of implementation**: Boyer-Moore is notoriously tricky
- **Not needed for small texts**: Naive is fine for short strings

## KMP Key Insight

When a mismatch occurs at position j in the pattern, the LPS (Longest Proper Prefix that is also Suffix) array tells you the next position to check. You never need to backtrack in the text.

\`\`\`
Pattern: ABABC
LPS:     [0, 0, 1, 2, 0]
\`\`\``,
      codeExample: `// KMP Pattern Search\nfunction kmpSearch(text, pattern) {\n  const lps = buildLPS(pattern);\n  let i = 0, j = 0;\n  while (i < text.length) {\n    if (text[i] === pattern[j]) { i++; j++; }\n    if (j === pattern.length) return i - j;\n    if (i < text.length && text[i] !== pattern[j]) {\n      j > 0 ? j = lps[j - 1] : i++;\n    }\n  }\n  return -1;\n}\n\nfunction buildLPS(pattern) {\n  const lps = Array(pattern.length).fill(0);\n  let len = 0, i = 1;\n  while (i < pattern.length) {\n    if (pattern[i] === pattern[len]) lps[i++] = ++len;\n    else if (len > 0) len = lps[len - 1];\n    else lps[i++] = 0;\n  }\n  return lps;\n}\n\nconsole.log(kmpSearch("ABABDABACDABABCABAB", "ABABCABAB")); // 10\n\n// Rabin-Karp\nfunction rabinKarp(text, pattern) {\n  const n = text.length, m = pattern.length;\n  let textHash = 0, patternHash = 0;\n  for (let i = 0; i < m; i++) {\n    patternHash += pattern.charCodeAt(i);\n    textHash += text.charCodeAt(i);\n  }\n  for (let i = 0; i <= n - m; i++) {\n    if (textHash === patternHash && text.slice(i, i + m) === pattern) return i;\n    textHash = textHash - text.charCodeAt(i) + text.charCodeAt(i + m);\n  }\n  return -1;\n}\nconsole.log(rabinKarp("hello world", "world")); // 6`,
      language: "typescript"
    }
  ]
},
{
  slug: "algorithms",
  title: "Algorithms",
  description: "Master sorting, searching, graph algorithms, dynamic programming, and complexity analysis.",
  icon: "🧮",
  color: "from-blue-500 to-indigo-600",
  category: "Core CS",
  lessons: [
    {
      id: "1",
      title: "Introduction to Algorithms",
      content: `## Definition

An **algorithm** is a finite, well-defined sequence of instructions for solving a problem or performing a computation. It must terminate (not run forever), be deterministic (same input → same output), and be effective (each step is feasible).

## Introduction

Algorithms are the heart of computer science. They transform problems into solutions efficiently. A good algorithm can make the difference between a program that runs in milliseconds and one that takes years.

## History and Establishment

- **300 BC**: Euclid's algorithm for GCD — the oldest known algorithm
- **820 AD**: Al-Khwarizmi wrote "On the Calculation with Hindu Numerals" — the word "algorithm" derives from his name
- **1936**: Alan Turing formalized the concept of algorithms with the Turing machine
- **1960s**: Big-O notation formalized by Bachmann and Landau
- **1970s**: Complexity classes (P, NP, NP-complete) were defined

## Advantages

- **Efficiency**: Well-designed algorithms minimize time and space usage
- **Scalability**: Handle growing input sizes gracefully
- **Reusability**: Same algorithm solves many similar problems
- **Predictability**: Deterministic behavior enables reliable systems
- **Optimality**: Some algorithms provably cannot be improved

## Disadvantages

- **Complexity**: Advanced algorithms (FFT, network flow) are hard to understand
- **Implementation difficulty**: Subtle bugs can produce wrong results
- **Overhead**: Some algorithms have high constant factors despite good asymptotic behavior
- **Approximation**: Some problems have no efficient exact solution (NP-hard)

## Time Complexity

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Array access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear scan |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Bubble sort |
| O(2ⁿ) | Exponential | Brute-force subsets |

## Space Complexity

The amount of memory an algorithm uses relative to input size. An algorithm using O(n) extra space has O(n) space complexity.`,
      codeExample: `// Comparing algorithm efficiency\n\n// O(n²) — Bubble Sort\nfunction bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++)\n    for (let j = 0; j < arr.length - i - 1; j++)\n      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n  return arr;\n}\n\n// O(n log n) — Quick Sort\nfunction quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = arr.slice(1).filter(x => x < pivot);\n  const right = arr.slice(1).filter(x => x >= pivot);\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}\n\nconst data = [5, 3, 8, 1, 9, 2, 7, 4, 6];\nconsole.log("Bubble:", bubbleSort([...data]));\nconsole.log("Quick:", quickSort([...data]));`,
      language: "typescript"
    },
    {
      id: "2",
      title: "Sorting Algorithms",
      content: `## Definition

**Sorting** is the process of arranging elements in a specific order (ascending or descending). Sorting algorithms are fundamental because many other problems (searching, merging, duplicate detection) become easy once data is sorted.

## Introduction

Sorting is the most-studied problem in computer science. Over 400 sorting algorithms have been invented. In practice, only a few matter: quicksort for general use, mergesort for stability, heapsort for guaranteed O(n log n), and counting/radix sort for special cases.

## Types

| Algorithm | Time (avg) | Time (worst) | Space | Stable? |
|-----------|-----------|-------------|-------|---------|
| Bubble Sort | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No |
| Counting Sort | O(n+k) | O(n+k) | O(k) | Yes |
| Radix Sort | O(d×n) | O(d×n) | O(n+k) | Yes |

## Stable vs Unstable

A sorting algorithm is **stable** if equal elements maintain their relative order. This matters when sorting by multiple criteria (e.g., sort by name, then by age — stable sort preserves name order within same age).

## Advantages

- **Merge sort**: Guaranteed O(n log n), stable, predictable
- **Quick sort**: Fastest in practice, cache-friendly, in-place variant exists
- **Heap sort**: O(n log n) guaranteed, in-place
- **Insertion sort**: Fast for small or nearly-sorted arrays

## Disadvantages

- **Merge sort**: O(n) extra space
- **Quick sort**: O(n²) worst case (mitigated by randomization)
- **Heap sort**: Poor cache performance, not stable
- **All comparison sorts**: Ω(n log n) lower bound — no comparison sort can do better`,
      codeExample: `// Merge Sort — O(n log n), stable\nfunction mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) result.push(left[i++]);\n    else result.push(right[j++]);\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n}\n\n// Quick Sort — O(n log n) average\nfunction quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[Math.floor(Math.random() * arr.length)];\n  const left = arr.filter(x => x < pivot);\n  const mid = arr.filter(x => x === pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), ...mid, ...quickSort(right)];\n}\n\n// Insertion Sort — O(n²), best for small arrays\nfunction insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let j = i;\n    while (j > 0 && arr[j - 1] > arr[j]) {\n      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];\n      j--;\n    }\n  }\n  return arr;\n}\n\nconst data = [38, 27, 43, 3, 9, 82, 10];\nconsole.log("Merge:", mergeSort([...data]));\nconsole.log("Quick:", quickSort([...data]));\nconsole.log("Insertion:", insertionSort([...data]));`,
      language: "typescript"
    },
    {
      id: "3",
      title: "Searching Algorithms",
      content: `## Definition

**Searching** is the process of finding a specific element or determining its existence within a data structure. The efficiency of searching directly impacts application performance.

## Introduction

Searching is the most common operation in computing. Every database query, web search, and file lookup is a search problem. The choice of search algorithm depends on whether the data is sorted, the data structure used, and the frequency of searches.

## Types

| Algorithm | Time | Requirement | Use Case |
|-----------|------|-------------|----------|
| Linear Search | O(n) | None | Unsorted data |
| Binary Search | O(log n) | Sorted data | Sorted arrays |
| Ternary Search | O(log₃ n) | Sorted, unimodal | Peak finding |
| Exponential Search | O(log n) | Sorted data | Unbounded arrays |
| Interpolation Search | O(log log n) | Uniform distribution | Uniform data |

## Binary Search Insight

Binary search halves the search space each step. For an array of 1 billion elements, it finds any element in at most 30 comparisons (log₂ 10⁹ ≈ 30).

## Advantages

- **Binary search**: O(log n) — extremely efficient for large sorted data
- **Linear search**: Simple, works on any data structure
- **Interpolation search**: Near O(1) for uniformly distributed data
- **Exponential search**: Good for unbounded/infinite arrays

## Disadvantages

- **Binary search**: Requires sorted data
- **Linear search**: Slow for large datasets
- **Interpolation search**: Degrades to O(n) for non-uniform data
- **All search algorithms**: Cannot beat O(1) — you must check at least one element

## Common Pitfalls

1. **Off-by-one errors**: \\**mid = Math.floor((lo + hi) / 2)\\** vs \\**mid = lo + (hi - lo) / 2\\** (avoids overflow)
2. **Infinite loops**: Forgetting to update \\**lo\\** or \\**hi\\** correctly
3. **Not handling duplicates**: Binary search may return any matching index`,
      codeExample: `// Linear Search — O(n)\nfunction linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\n\n// Binary Search — O(log n)\nfunction binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = lo + Math.floor((hi - lo) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\n\n// First and Last Position\nfunction searchRange(arr, target) {\n  const first = binarySearch(arr, target);\n  if (first === -1) return [-1, -1];\n  let lo = first, hi = first;\n  while (lo > 0 && arr[lo - 1] === target) lo--;\n  while (hi < arr.length - 1 && arr[hi + 1] === target) hi++;\n  return [lo, hi];\n}\n\nconst sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\nconsole.log("Linear:", linearSearch(sorted, 5));  // 4\nconsole.log("Binary:", binarySearch(sorted, 5));  // 4\nconsole.log("Range:", searchRange([1,2,3,3,3,4,5], 3)); // [1,3]`,
      language: "typescript"
    },
    {
      id: "4",
      title: "Divide and Conquer",
      content: `## Definition

**Divide and Conquer** is an algorithmic paradigm that breaks a problem into smaller subproblems, solves each recursively, and combines the results. It's the foundation for many efficient algorithms.

## Introduction

The key insight: solving two halves of a problem independently is often faster than solving the whole problem at once. When combined with the "combine" step being efficient, this yields O(n log n) algorithms.

## History and Establishment

- **300 BC**: Euclid's GCD algorithm is a divide-and-conquer approach
- **1962**: Karatsuba multiplication — first algorithm faster than grade-school multiplication
- **1960s**: Merge sort and quick sort formalized as divide-and-conquer
- **1970s**: Strassen matrix multiplication, FFT (Fast Fourier Transform)
- **2000s**: Used in parallel computing (MapReduce is essentially divide-and-conquer)

## The Master Theorem

For recurrences of the form T(n) = aT(n/b) + O(nᵈ):

| Condition | Complexity |
|-----------|-----------|
| d < log_b(a) | O(n^(log_b(a))) |
| d = log_b(a) | O(nᵈ log n) |
| d > log_b(a) | O(nᵈ) |

## Advantages

- **Efficient**: Often achieves optimal time complexity
- **Parallelizable**: Subproblems are independent
- **Cache-friendly**: Recursive calls on contiguous subarrays
- **Natural recursion**: Elegant, easy-to-understand code

## Disadvantages

- **Recursion overhead**: Function calls have overhead (stack frames)
- **Space complexity**: O(log n) to O(n) stack space
- **Overkill for small inputs**: Simple algorithms may be faster for n < 100
- **Not always applicable**: Some problems don't decompose nicely

## Classic Algorithms

| Algorithm | Problem | Complexity |
|-----------|---------|-----------|
| Merge Sort | Sorting | O(n log n) |
| Quick Sort | Sorting | O(n log n) avg |
| Binary Search | Searching | O(log n) |
| Strassen | Matrix multiplication | O(n^2.807) |
| Karatsuba | Multiplication | O(n^1.585) |
| FFT | Polynomial evaluation | O(n log n) |`,
      codeExample: `// Merge Sort — classic divide and conquer\nfunction mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    result.push(left[i] <= right[j] ? left[i++] : right[j++]);\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n}\n\n// Maximum subarray (Kadane's via divide and conquer)\nfunction maxSubarray(arr, lo = 0, hi = arr.length - 1) {\n  if (lo === hi) return arr[lo];\n  const mid = Math.floor((lo + hi) / 2);\n  const leftMax = maxSubarray(arr, lo, mid);\n  const rightMax = maxSubarray(arr, mid + 1, hi);\n  let crossMax = arr[mid], sum = arr[mid];\n  for (let i = mid - 1; i >= lo; i--) crossMax = Math.max(crossMax, sum += arr[i]);\n  sum = 0;\n  for (let i = mid + 1; i <= hi; i++) crossMax = Math.max(crossMax, sum += arr[i]);\n  return Math.max(leftMax, rightMax, crossMax);\n}\n\nconsole.log("Sorted:", mergeSort([38, 27, 43, 3, 9, 82, 10]));\nconsole.log("Max subarray:", maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6`,
      language: "typescript"
    },
    {
      id: "5",
      title: "Dynamic Programming",
      content: `## Definition

**Dynamic Programming (DP)** is an algorithmic technique that solves complex problems by breaking them into overlapping subproblems, solving each subproblem only once, and storing the results to avoid redundant computation.

## Introduction

DP is the most powerful algorithmic paradigm for optimization problems. If a problem has **optimal substructure** (optimal solution contains optimal solutions to subproblems) and **overlapping subproblems** (same subproblems solved repeatedly), DP is the answer.

## History and Establishment

- **1950s**: Richard Bellman coined "dynamic programming" to hide military research from his secretary
- **1950s**: Bellman-Ford shortest path algorithm
- **1960s**: Floyd-Warshall all-pairs shortest path
- **1970s**: Knapsack problem, sequence alignment (edit distance)
- **2000s**: DP became central to bioinformatics, NLP, and machine learning

## Two Approaches

| Approach | Description | Example |
|----------|-------------|---------|
| Top-down (Memoization) | Recursion + cache | Fibonacci |
| Bottom-up (Tabulation) | Iterative + table fill | Knapsack |

## Advantages

- **Optimal solutions**: Guarantees best possible answer
- **Efficient**: Eliminates redundant computation
- **Flexible**: Can solve a wide range of optimization problems
- **Foundation**: Used in algorithms, AI, bioinformatics, economics

## Disadvantages

- **High space complexity**: Tables can be O(n²) or worse
- **Complex to design**: Identifying subproblems and recurrence is non-trivial
- **Not always intuitive**: Solution often seems like magic until understood
- **Overkill**: If subproblems don't overlap, recursion is simpler

## Steps to Solve a DP Problem

1. **Define state**: What does dp[i] represent?
2. **Find recurrence**: How does dp[i] relate to dp[i-1], dp[i-2], etc.?
3. **Base cases**: What are the initial values?
4. **Compute order**: Fill the table in the right order
5. **Extract answer**: What's the final answer from the table?`,
      codeExample: `// Fibonacci — naive O(2^n) vs DP O(n)\nfunction fibNaive(n) {\n  if (n <= 1) return n;\n  return fibNaive(n - 1) + fibNaive(n - 2);\n}\n\nfunction fibDP(n) {\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];\n  return dp[n];\n}\n\n// 0/1 Knapsack\nfunction knapsack(weights, values, capacity) {\n  const n = weights.length;\n  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));\n  for (let i = 1; i <= n; i++) {\n    for (let w = 0; w <= capacity; w++) {\n      dp[i][w] = dp[i-1][w];\n      if (weights[i-1] <= w) {\n        dp[i][w] = Math.max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1]);\n      }\n    }\n  }\n  return dp[n][capacity];\n}\n\n// Longest Common Subsequence\nfunction lcs(s1, s2) {\n  const m = s1.length, n = s2.length;\n  const dp = Array(m+1).fill(null).map(() => Array(n+1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      dp[i][j] = s1[i-1] === s2[j-1] ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j], dp[i][j-1]);\n    }\n  }\n  return dp[m][n];\n}\n\nconsole.log("Fib(10):", fibDP(10));  // 55\nconsole.log("Knapsack:", knapsack([2,3,4,5], [3,4,5,6], 5)); // 7\nconsole.log("LCS:", lcs("abcde", "ace"));  // 3`,
      language: "typescript"
    },
    {
      id: "6",
      title: "Greedy Algorithms",
      content: `## Definition

A **greedy algorithm** makes the locally optimal choice at each step, hoping to find a global optimum. It builds a solution piece by piece, always choosing the next piece that offers the most immediate benefit.

## Introduction

Greedy algorithms are simpler and faster than DP when they work. The key is proving that the local optimum leads to the global optimum — not all problems have this property.

## History and Establishment

- **1950s**: Huffman coding — optimal prefix codes using greedy tree construction
- **1970s**: Dijkstra's shortest path — greedy on edge weights
- **1970s**: Kruskal's and Prim's MST algorithms
- **1980s**: Greedy heuristics for NP-hard problems (set cover approximation)

## Advantages

- **Simple to implement**: Usually straightforward logic
- **Fast**: Often O(n log n) or better
- **Intuitive**: Easy to understand and explain
- **Optimal for many problems**: Huffman, MST, activity selection

## Disadvantages

- **Not always optimal**: Knapsack, TSP are not greedily solvable
- **Hard to prove correctness**: Greedy choice property must be proven
- **No backtracking**: Once a choice is made, it can't be undone
- **May need sorting**: Pre-processing step adds overhead

## When Greedy Works

A problem is suitable for greedy if it has:
1. **Greedy choice property**: A local optimum leads to a global optimum
2. **Optimal substructure**: Optimal solution contains optimal solutions to subproblems

## When Greedy Fails

The 0/1 Knapsack problem: greedy by value-to-weight ratio fails. Items: {(60, 10), (100, 20), (120, 30)}, capacity 50. Greedy picks (120,30) + (100,20) = 220, but optimal is (100,20) + (60,10) = 160... wait, optimal is actually (120,30) + (100,20) = 220. Actually greedy works here too. The classic failure is items: {(60,10), (100,20), (120,30)}, capacity 50 — greedy by ratio gives 160, optimal is 220.`,
      codeExample: `// Activity Selection — sort by end time, greedily pick\nfunction activitySelection(activities) {\n  activities.sort((a, b) => a.end - b.end);\n  const selected = [activities[0]];\n  let lastEnd = activities[0].end;\n  for (let i = 1; i < activities.length; i++) {\n    if (activities[i].start >= lastEnd) {\n      selected.push(activities[i]);\n      lastEnd = activities[i].end;\n    }\n  }\n  return selected;\n}\n\n// Huffman-like: minimize cost\nfunction minCostToMerge(stones) {\n  stones.sort((a, b) => a - b);\n  let cost = 0;\n  while (stones.length > 1) {\n    const first = stones.shift();\n    const second = stones.shift();\n    cost += first + second;\n    stones.push(first + second);\n    stones.sort((a, b) => a - b);\n  }\n  return cost;\n}\n\n// Fractional Knapsack — greedy works!\nfunction fractionalKnapsack(items, capacity) {\n  items.sort((a, b) => (b.val / b.wt) - (a.val / a.wt));\n  let total = 0;\n  for (const {val, wt} of items) {\n    if (capacity >= wt) { total += val; capacity -= wt; }\n    else { total += val * (capacity / wt); break; }\n  }\n  return total;\n}\n\nconst acts = [{start:1,end:3},{start:2,end:5},{start:4,end:7},{start:6,end:8}];\nconsole.log("Activities:", activitySelection(acts));\nconsole.log("Merge stones:", minCostToMerge([1, 2, 3])); // 9`,
      language: "typescript"
    },
    {
      id: "7",
      title: "Graph Algorithms",
      content: `## Definition

**Graph algorithms** operate on graph data structures to find paths, detect cycles, determine connectivity, and solve optimization problems on networks.

## Introduction

Graph algorithms are among the most important in computer science. Social networks, GPS navigation, web crawlers, compilers, and network routing all rely on graph algorithms.

## History and Establishment

- **1736**: Euler's Seven Bridges — birth of graph theory
- **1956**: Dijkstra's shortest path algorithm
- **1959**: Prim's MST algorithm
- **1959**: Kruskal's MST algorithm
- **1970s**: Bellman-Ford, Floyd-Warshall
- **2000s**: Google's PageRank — graph algorithm on the web

## Types

| Algorithm | Purpose | Complexity |
|-----------|---------|-----------|
| BFS | Shortest path (unweighted) | O(V + E) |
| DFS | Cycle detection, topological sort | O(V + E) |
| Dijkstra | Shortest path (weighted, non-negative) | O((V+E) log V) |
| Bellman-Ford | Shortest path (negative weights) | O(VE) |
| Floyd-Warshall | All-pairs shortest path | O(V³) |
| Kruskal's | Minimum spanning tree | O(E log E) |
| Prim's | Minimum spanning tree | O(E log V) |

## Advantages

- **BFS**: Finds shortest path in unweighted graphs
- **Dijkstra**: Optimal for weighted graphs with non-negative edges
- **Bellman-Ford**: Handles negative edge weights
- **Floyd-Warshall**: Solves all-pairs shortest path

## Disadvantages

- **Dijkstra**: Doesn't work with negative edges
- **Bellman-Ford**: O(VE) — slow for dense graphs
- **Floyd-Warshall**: O(V³) — too slow for large graphs
- **All**: Memory-intensive for large graphs

## When to Use What

- **Unweighted graph shortest path**: BFS
- **Weighted graph (non-negative)**: Dijkstra
- **Weighted graph (negative edges)**: Bellman-Ford
- **All-pairs shortest path**: Floyd-Warshall
- **Minimum spanning tree**: Kruskal's or Prim's`,
      codeExample: `// Dijkstra's Algorithm\ndef dijkstra(graph, start) {\n  const dist = {};\n  for (const node in graph) dist[node] = Infinity;\n  dist[start] = 0;\n  const pq = [[0, start]];\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [d, u] = pq.shift();\n    if (d > dist[u]) continue;\n    for (const [v, w] of graph[u]) {\n      if (dist[u] + w < dist[v]) {\n        dist[v] = dist[u] + w;\n        pq.push([dist[v], v]);\n      }\n    }\n  }\n  return dist;\n}\n\n// BFS shortest path\nfunction bfsShortest(graph, start, end) {\n  const visited = new Set();\n  const queue = [[start, 0]];\n  visited.add(start);\n  while (queue.length) {\n    const [node, dist] = queue.shift();\n    if (node === end) return dist;\n    for (const neighbor of graph[node]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push([neighbor, dist + 1]);\n      }\n    }\n  }\n  return -1;\n}\n\nconst g = { A: [["B",1],["C",4]], B: [["C",2]], C: [] };\nconsole.log("Dijkstra:", dijkstra(g, "A"));`,
      language: "typescript"
    },
    {
      id: "8",
      title: "Backtracking",
      content: `## Definition

**Backtracking** is a systematic method for exploring all possible solutions by building candidates incrementally and abandoning a candidate ("backtracking") as soon as it's determined to be invalid.

## Introduction

Backtracking is brute force with pruning. Instead of generating all possible solutions and checking each, it builds solutions step by step and stops exploring a branch the moment it can't lead to a valid solution.

## History and Establishment

- **1850s**: Eight Queens puzzle by Carl Friedrich Gauss
- **1960s**: Formalized by Lehmer and Wells for combinatorial problems
- **1970s**: Applied to constraint satisfaction problems (CSPs)
- **2000s**: Used in SAT solvers, Sudoku solvers, and constraint programming

## Advantages

- **Complete**: Finds all solutions if they exist
- **Pruning**: Eliminates large portions of search space
- **Flexible**: Works for many constraint satisfaction problems
- **Intuitive**: "Try, fail, undo" is easy to understand

## Disadvantages

- **Exponential worst case**: Can still explore O(2ⁿ) paths
- **Memory intensive**: Must track current state for backtracking
- **Not always optimal**: Doesn't guarantee shortest/best solution
- **Hard to optimize**: Pruning heuristics are problem-specific

## When to Use

- Permutations and combinations
- Constraint satisfaction (Sudoku, N-Queens)
- Subsets and subsequence problems
- Path finding with constraints
- Game playing (minimax)`,
      codeExample: `// N-Queens\ndef solveNQueens(n) {\n  const solutions = [];\n  const board = Array(n).fill(-1);\n  \n  function isValid(row, col) {\n    for (let i = 0; i < row; i++) {\n      if (board[i] === col || Math.abs(board[i] - col) === row - i) return false;\n    }\n    return true;\n  }\n  \n  function backtrack(row) {\n    if (row === n) { solutions.push([...board]); return; }\n    for (let col = 0; col < n; col++) {\n      if (isValid(row, col)) {\n        board[row] = col;\n        backtrack(row + 1);\n        board[row] = -1;\n      }\n    }\n  }\n  backtrack(0);\n  return solutions;\n}\n\n// Subsets\ndef subsets(nums) {\n  const result = [];\n  function backtrack(start, current) {\n    result.push([...current]);\n    for (let i = start; i < nums.length; i++) {\n      current.push(nums[i]);\n      backtrack(i + 1, current);\n      current.pop();\n    }\n  }\n  backtrack(0, []);\n  return result;\n}\n\nconsole.log("4-Queens solutions:", solveNQueens(4).length); // 2\nconsole.log("Subsets:", subsets([1,2,3]).length); // 8`,
      language: "typescript"
    },
    {
      id: "9",
      title: "Bit Manipulation",
      content: `## Definition

**Bit manipulation** involves performing operations directly on individual bits of integers. It's the most fundamental level of computation — everything in a computer is ultimately bits.

## Introduction

Bit manipulation is essential for low-level programming, cryptography, networking, and competitive programming. Understanding bits gives you superpowers: O(1) parity checks, fast power-of-two tests, and elegant subset enumeration.

## History and Establishment

- **1940s**: Bitwise operations were built into the first computers
- **1960s**: Bit manipulation techniques became standard in assembly language
- **1970s**: Cryptography (DES, RSA) relies heavily on bit operations
- **2000s**: Hash functions, bloom filters, and bitsets use bit manipulation

## Common Operations

| Operation | Symbol | Example |
|-----------|--------|---------|
| AND | \\**&\\** | \\**5 & 3 = 1\\** (0101 & 0011 = 0001) |
| OR | \\**|\\** | \\**5 | 3 = 7\\** (0101 \| 0011 = 0111) |
| XOR | \\**^\\** | \\**5 ^ 3 = 6\\** (0101 ^ 0011 = 0110) |
| NOT | \\**~\\** | \\**~5 = -6\\** (in two's complement) |
| Left shift | \\**<<\\** | \\**5 << 1 = 10\\** |
| Right shift | \\**>>\\** | \\**5 >> 1 = 2\\** |

## Advantages

- **Speed**: Bitwise operations are the fastest possible operations
- **Space**: Bitsets pack 32 or 64 boolean values into one integer
- **Elegant solutions**: Many problems have beautiful bit-based solutions
- **Cryptography**: Essential for encryption and hashing algorithms

## Disadvantages

- **Low readability**: Bitwise code is hard to read and maintain
- **Limited to integers**: Can't apply to floats or strings directly
- **Platform dependent**: Bit width varies across systems
- **Error-prone**: Off-by-one errors are common with bit shifts`,
      codeExample: `// Check if number is power of 2\nfunction isPowerOfTwo(n) {\n  return n > 0 && (n & (n - 1)) === 0;\n}\n\n// Count set bits (Hamming weight)\nfunction countBits(n) {\n  let count = 0;\n  while (n) { count++; n &= n - 1; }\n  return count;\n}\n\n// Single number (all appear twice except one)\nfunction singleNumber(nums) {\n  return nums.reduce((acc, n) => acc ^ n, 0);\n}\n\n// Swap without temp\nfunction swap(a, b) {\n  a ^= b; b ^= a; a ^= b;\n  return [a, b];\n}\n\nconsole.log(isPowerOfTwo(16)); // true\nconsole.log(countBits(7));     // 3\nconsole.log(singleNumber([4,1,2,1,2])); // 4`,
      language: "typescript"
    },
    {
      id: "10",
      title: "Complexity Analysis",
      content: `## Definition

**Complexity analysis** is the method of measuring the resources (time and space) an algorithm uses as a function of input size. It provides a theoretical framework for comparing algorithms independently of hardware and implementation.

## Introduction

Without complexity analysis, we can only measure an algorithm by running it — which depends on the computer, input data, and implementation. Big-O notation gives us a universal language to discuss efficiency.

## History and Establishment

- **1894**: Paul Bachmann introduced Big-O notation
- **1906**: Edmund Landau contributed Landau notation (Little-o)
- **1960s**: Complexity theory formalized by Hartmanis and Stearns
- **1970s**: P vs NP problem posed (one of the millennium prize problems)
- **2000s**: Fine-grained complexity (SETH, OVC) for practical algorithm design

## Big-O Notation

| Notation | Name | Growth | Example |
|----------|------|--------|---------|
| O(1) | Constant | Doesn't grow | Array access |
| O(log n) | Logarithmic | Very slow growth | Binary search |
| O(n) | Linear | Proportional | Linear scan |
| O(n log n) | Linearithmic | Slightly superlinear | Merge sort |
| O(n²) | Quadratic | Grows fast | Bubble sort |
| O(2ⁿ) | Exponential | Doubles each step | Brute-force subsets |
| O(n!) | Factorial | Impossible for large n | Permutations |

## Amortized Analysis

Some operations are expensive occasionally but cheap on average. Dynamic array push is O(n) when resizing, but O(1) amortized because resizing happens rarely.

## Space Complexity

- **O(1)**: In-place (swap variables, iterative algorithms)
- **O(n)**: Linear space (hash map, copy of input)
- **O(n²)**: Quadratic space (adjacency matrix)
- **O(log n)**: Recursive algorithms (call stack)

## Best, Worst, Average Case

- **Best case**: Minimum time over all inputs of size n
- **Worst case**: Maximum time (most useful for guarantees)
- **Average case**: Expected time over all inputs (most realistic)`,
      codeExample: `// Comparing complexities in practice\n\n// O(1) — Constant time\nfunction getFirst(arr) { return arr[0]; }\n\n// O(log n) — Binary search\nfunction binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = lo + Math.floor((hi - lo) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\n\n// O(n) — Linear scan\nfunction linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\n\n// O(n²) — Nested loops\nfunction hasDuplicate(arr) {\n  for (let i = 0; i < arr.length; i++)\n    for (let j = i + 1; j < arr.length; j++)\n      if (arr[i] === arr[j]) return true;\n  return false;\n}\n\n// O(2^n) — Subsets\nfunction subsets(arr) {\n  if (arr.length === 0) return [[]];\n  const [first, ...rest] = arr;\n  const withFirst = subsets(rest).map(s => [first, ...s]);\n  return [...subsets(rest), ...withFirst];\n}\n\nconst n = 1000;\nconsole.log("O(1):", getFirst([1,2,3]));\nconsole.log("O(log n): binary search on", n, "elements");\nconsole.log("O(n): linear scan on", n, "elements");\nconsole.log("O(n²): nested loops on", n, "elements");`,
      language: "typescript"
    }
  ]
},

  {
  slug: "operating-systems",
  title: "Operating Systems",
  description: "Understand OS fundamentals, processes, memory management, file systems, and concurrency.",
  icon: "🖥️",
  color: "from-sky-500 to-cyan-600",
  category: "Systems",
  lessons: [
    {
      id: "1",
      title: "Introduction to Operating Systems",
      content: `## Definition

An **operating system (OS)** is system software that manages computer hardware and provides common services for computer programs. It acts as an intermediary between users and the computer hardware.

## Introduction

Operating systems are the foundation of all computing. They provide the environment in which all other software runs. Modern OSes have evolved from simple batch systems to complex, multitasking, distributed systems that power everything from smartphones to supercomputers.

## History and Establishment

- **1950s**: Early batch systems (IBM 704)
- **1960s**: Timesharing systems (MIT CTSS)
- **1970s**: Unix and Windows developed
- **1980s**: Windows became dominant on PCs, Unix dominated servers
- **1990s**: Linux kernel development started
- **2000s**: Mobile OSes (iOS, Android) became important
- **2010s**: Cloud computing and containerization (Docker, Kubernetes)

## Monolithic vs Microkernel

| Architecture | Description | Example |
|--------------|-------------|---------|
| Monolithic | All OS services run in kernel space | Windows NT, older Unix |
| Microkernel | Minimal kernel, most services are user processes | Mach, modern Linux (via modules) |

## Advantages

- **Monolithic**: Direct system calls, high performance
- **Microkernel**: Modularity, easier to maintain, more secure
- **Hybrid**: Many modern OSes use hybrid approaches

## Disadvantages

- **Monolithic**: Single point of failure, harder to debug
- **Microkernel**: Inter-process communication overhead

## Key Functions

1. **Process Management**: Creating, scheduling, terminating processes
2. **Memory Management**: Managing physical and virtual memory
3. **File System Management**: Organizing and accessing files
4. **Device Management**: Controlling I/O devices
5. **Security and Access Control**: Managing permissions and authentication
6. **System Calls**: Interface between applications and OS

## Modern OS Challenges

- **Concurrency**: Supporting multiple processes and threads
- **Scalability**: Handling increasing numbers of users and devices
- **Security**: Protecting against malware and unauthorized access
- **Cloud Integration**: Supporting virtualization and containerization
- **Mobile Optimization**: Power efficiency and touch interfaces

## Examples

- **Desktop**: Windows 11, macOS, Linux
- **Mobile**: iOS, Android
- **Servers**: Windows Server, Linux distributions
- **Embedded**: FreeRTOS, VxWorks

## Future Trends

- **Wasm (WebAssembly)**: New execution environment for OS services
- **Quantum OS**: Operating systems for quantum computers
- **Edge Computing**: OSes for IoT and edge devices
- **Declarative OS**: Configuration-based OS management`,
      codeExample: `// Simple process creation example in C
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();
    
    if (pid < 0) {
        fprintf(stderr, "Fork failed!\n");
        return 1;
    } else if (pid == 0) {
        // Child process
        printf("Child process running\n");
        printf("Child PID: %d\n", getpid());
        execlp("ls", "ls", "-l", NULL);
        fprintf(stderr, "Exec failed!\n");
        return 1;
    } else {
        // Parent process
        int status;
        waitpid(pid, &status, 0);
        printf("Parent process waiting for child to complete\n");
        printf("Child exited with status: %d\n", WEXITSTATUS(status));
    }
    
    return 0;
}

// Output example:
// Child process running
// Child PID: 12345
// -rw-r--r--  1 user  group  4096 Aug 10 10:00 file.txt
// Parent process waiting for child to complete
// Child exited with status: 0`,
      language: "c"
    },
    {
      id: "2",
      title: "Processes and Threads",
      content: `## Definition

A **process** is an instance of a program being executed. It contains the program code, data, stack, and system resources. A **thread** (or lightweight process) is a single sequence of instructions within a process.

## Introduction

Modern operating systems support multitasking — running multiple processes and threads concurrently. Processes are isolated from each other, while threads within the same process share memory and resources.

## History and Establishment

- **1960s**: Multics and early time-sharing systems introduced processes
- **1970s**: Unix V6 formalized the process concept
- **1980s**: Threads emerged (Java threads, POSIX threads)
- **1990s**: Windows NT introduced symmetric multiprocessing (SMP)
- **2000s**: User-level vs kernel-level threads became standard

## Types

| Type | Description | Example |
|------|-------------|---------|
| Process | Heavy-weight, separate address space | Windows Notepad, Safari |
| Thread | Lightweight, shares process memory | Web page rendering, video decoding |
| Kernel Thread | Managed by OS kernel | Linux kernel threads |
| User Thread | Managed by user-level library | Java threads (pre-Java 5) |

## Process States

| State | Description |
|-------|-------------|
| New | Process created, not yet running |
| Ready | Ready to run, waiting for CPU |
| Running | Currently executing |
| Blocked | Waiting for I/O or event |
| Terminated | Finished execution |

## Thread States

| State | Description |
|-------|-------------|
| Runnable | Ready to execute |
| Running | Currently executing |
| Blocked | Waiting for monitor lock or I/O |
| Dead | Terminated |

## Process Management Functions

1. **Creation**: Fork, exec, spawn, create process
2. **Scheduling**: Decide which process runs next
3. **Synchronization**: Wait for process termination
4. **Communication**: Pipes, sockets, shared memory
5. **Termination**: Clean up resources

## Thread Management Functions

1. **Creation**: spawn thread, create thread
2. **Scheduling**: Thread scheduler decides which thread runs
3. **Synchronization**: Mutexes, semaphores, condition variables
4. **Communication**: Shared memory, message queues

## Process vs Thread Comparison

| Aspect | Process | Thread |
|--------|---------|--------|
| Memory | Separate address space | Shared address space |
| Isolation | Fully isolated | Can communicate easily |
| Overhead | High (context switch cost) | Low (fast context switch) |
| Creation | Expensive | Cheap |
| Usage | Main program entry point | Concurrent execution within program |

## Practical Examples

1. **Web Browser**: One process per tab, multiple threads per tab
2. **Database Server**: Multiple processes handling different clients
3. **Video Player**: One process, multiple threads (decoding, rendering, networking)
4. **IDE**: One process with multiple threads (code editing, compilation, debugging)`,
      codeExample: `// Creating and managing processes in C
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <string.h>

int main() {
    // Example 1: Simple child process creation
    pid_t pid = fork();
    if (pid == 0) {
        // Child process
        printf("Child process with PID: %d\n", getpid());
        // Execute new program (ls)
        execlp("ls", "ls", "-la", NULL);
        return 0;
    } else if (pid > 0) {
        // Parent process
        waitpid(pid, NULL, 0);
        printf("Parent process waiting completed\n");
    }
    
    // Example 2: Multiple child processes
    printf("Creating multiple child processes...\n");
    for (int i = 0; i < 3; i++) {
        pid = fork();
        if (pid == 0) {
            printf("Child %d with PID: %d\n", i + 1, getpid());
            printf("I am child %d\n", i + 1);
            exit(i + 1);
        }
    }
    
    // Parent continues
    for (int i = 0; i < 3; i++) {
        waitpid(-1, NULL, 0);
    }
    
    printf("All children completed\n");
    return 0;
}

// Example 3: Thread creation (pthreads)
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

void* thread_function(void* arg) {
    int thread_id = *(int*)arg;
    printf("Thread %d started\n", thread_id);
    sleep(1);
    printf("Thread %d finished\n", thread_id);
    return NULL;
}

int main() {
    const int NUM_THREADS = 3;
    pthread_t threads[NUM_THREADS];
    int thread_ids[NUM_THREADS];
    
    for (int i = 0; i < NUM_THREADS; i++) {
        thread_ids[i] = i;
        pthread_create(&threads[i], NULL, thread_function, &thread_ids[i]);
    }
    
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }
    
    printf("All threads joined\n");
    return 0;
}

// Expected output:
// Thread 0 started
// Thread 1 started
// Thread 2 started
// Thread 0 finished
// Thread 1 finished
// Thread 2 finished
// All threads joined`,
      language: "c"
    },
    {
      id: "3",
      title: "Memory Management",
      content: `## Definition

**Memory management** is the process of allocating, tracking, and deallocating memory in a computer system. It includes both physical memory (RAM) and virtual memory.

## Introduction

Memory is the most expensive resource in computing. Efficient memory management determines how many programs can run simultaneously, how large they can be, and how fast they perform. Modern OSes provide virtual memory abstraction to simplify programming and make memory usage more efficient.

## History and Establishment

- **1950s**: Early memory allocation (first-fit, best-fit algorithms)
- **1960s**: Virtual memory and paging introduced
- **1970s**: Demand paging became standard (IBM System/370)
- **1980s**: Protected memory and memory protection units (MPU)
- **1990s**: Large address space support (32-bit -> 64-bit)
- **2000s**: Transparent huge pages, memory overcommit

## Memory Management Techniques

### 1. Allocation Algorithms

| Algorithm | Description | Example |
|-----------|-------------|---------|
| First-Fit | Use first available block | Common in malloc() implementations |
| Best-Fit | Find smallest suitable block | Minimizes fragmentation |
| Worst-Fit | Find largest block | Reduces fragmentation for small allocations |

### 2. Memory Protection

- **Bounds checking**: Prevent buffer overflows
- **Segmentation**: Divide memory into segments
- **Paging**: Fixed-size blocks
- **Virtual memory**: Abstraction of physical memory

### 3. Swap Space

- **Definition**: Disk space used as overflow memory
- **Page swapping**: Moving unused pages to disk
- **Thrashing prevention**: Balancing between memory and disk usage

## Memory Allocation Schemes

### Static Allocation

- **Definition**: Memory size determined at compile time
- **Advantages**: Simple, no runtime overhead
- **Disadvantages**: Rigid, can't adapt to varying workloads
- **Usage**: Global variables, static arrays

### Dynamic Allocation

- **Definition**: Memory allocated at runtime
- **Advantages**: Flexible, can handle varying data sizes
- **Disadvantages**: Memory fragmentation, allocation/deallocation overhead
- **Usage**: Heap allocation via malloc/free, new/delete

### Virtual Memory

- **Concept**: Each process has its own address space
- **Benefits**:
  - Larger address space than physical memory
  - Memory protection between processes
  - Shared memory between processes
  - Simplified memory management for programmers
- **Implementation**:
  - Page tables
  - Translation lookaside buffer (TLB)
  - Demand paging
  - Page replacement algorithms

## Memory Management Functions

1. **Allocation**: allocate(), malloc(), new()
2. **Deallocation**: free(), delete()
3. **Reallocation**: realloc()
4. **Protection**: mprotect()
5. **Querying**: brk(), sbrk()

## Page Replacement Algorithms

| Algorithm | Description | Effectiveness |
|-----------|-------------|--------------|
| FIFO | First-In, First-Out | Poor for working sets |
| LRU | Least Recently Used | Good for most cases |
| Optimal | Replace farthest in future | Theoretical best |
| Second Chance | Enhanced FIFO | Better than FIFO |

## Memory Fragmentation

### External Fragmentation

- **Definition**: Many small free blocks between allocated blocks
- **Problem**: Can't satisfy large allocation requests
- **Solution**: Compaction, paging, better allocation algorithms

### Internal Fragmentation

- **Definition**: Wasted space within allocated blocks
- **Problem**: Fixed-size allocation units
- **Solution**: Multiple allocation sizes, buddy system

## Practical Examples

1. **Malloc in C**: Implementation of malloc, free, realloc
2. **Memory pools**: Pre-allocated blocks for performance-critical applications
3. **Smart pointers**: Automatic memory management in C++
4. **Garbage collection**: Automatic memory reclamation in managed languages

## Memory Management APIs

- **Unix/Linux**: malloc(), free(), mmap(), mprotect()
- **Windows**: VirtualAlloc(), HeapAlloc(), HeapFree()
- **POSIX Threads**: pthread_attr_setstack()
- **Java**: System.gc(), Memory.allocate()
- **C++**: new, delete, std::allocator

## Future Trends

- **Memory pooling**: Reducing allocation overhead
- **NUMA optimization**: Handling non-uniform memory architectures
- **Memory persistence**: Persistent memory (NVMe, Intel Optane)
- **AI-driven management**: Machine learning for memory optimization`,
      codeExample: `// Memory allocation in C
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr1 = (int*)malloc(10 * sizeof(int));
    if (!arr1) {
        fprintf(stderr, "Memory allocation failed!\n");
        return 1;
    }
    
    for (int i = 0; i < 10; i++) arr1[i] = i * 2;
    
    for (int i = 0; i < 10; i++) printf("%d ", arr1[i]);
    printf("\n");
    
    // Reallocation
    int *arr2 = (int*)realloc(arr1, 20 * sizeof(int));
    if (!arr2) {
        free(arr1);
        fprintf(stderr, "Memory reallocation failed!\n");
        return 1;
    }
    arr1 = arr2;
    
    for (int i = 10; i < 20; i++) arr1[i] = i * 3;
    
    for (int i = 0; i < 20; i++) printf("%d ", arr1[i]);
    printf("\n");
    
    free(arr1);
    return 0;
}

// Buddy System Implementation
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define MAX_ORDER 10  // Maximum block order (2^10 = 1024 bytes)

typedef struct Block {
    size_t size;    // Size of the block (including header)
    int order;     // Order of the block (2^order bytes)
    struct Block* next;  // Next free block
    struct Block* prev;  // Previous free block
    int free;      // 1 if free, 0 if allocated
    void* data;     // Actual data
} Block;

Block* buddy_pool = NULL;

Block* get_buddy(Block* block, int order) {
    size_t offset = block->size * (1 << order);
    if ((size_t)block + offset == (size_t)block - block->size) {
        return (Block*)((size_t)block + offset);
    }
    return (Block*)((size_t)block - offset);
}

void* my_malloc(size_t size) {
    // Round up size to nearest power of 2
    int order = 0;
    while ((1 << order) < size + sizeof(Block)) order++;
    
    // Find suitable block
    Block *curr = buddy_pool;
    while (curr) {
        if (curr->free && curr->order == order) {
            // Found suitable block
            curr->free = 0;
            return curr->data;
        }
        curr = curr->next;
    }
    
    // Need to allocate new block
    size_t total_size = 1 << (order + 3);  // Add header overhead
    Block* new_block = (Block*)malloc(total_size);
    if (!new_block) return NULL;
    
    new_block->size = total_size;
    new_block->order = order;
    new_block->free = 0;
    new_block->data = (void*)((size_t)new_block + sizeof(Block));
    new_block->next = buddy_pool;
    if (buddy_pool) buddy_pool->prev = new_block;
    buddy_pool = new_block;
    
    return new_block->data;
}

void my_free(void* ptr) {
    if (!ptr) return;
    
    Block* block = (Block*)((size_t)ptr - sizeof(Block));
    block->free = 1;
    
    // Merge with buddies
    int order = block->order;
    Block* buddy = get_buddy(block, order);
    while (buddy && buddy->free && buddy->order == order) {
        if ((size_t)block < (size_t)buddy) {
            Block* temp = buddy->next;
            block->next = temp;
            if (temp) temp->prev = block;
            buddy->next = NULL;
            buddy->prev = NULL;
            buddy->free = 0;
            block->size += buddy->size;
            block->order++;
        } else {
            Block* temp = block->next;
            buddy->next = temp;
            if (temp) temp->prev = buddy;
            block->next = NULL;
            block->prev = NULL;
            block->free = 0;
            buddy->size += block->size;
            buddy->order++;
            block = buddy;
        }
    }
}

int main() {
    int *ptr1 = (int*)my_malloc(100);
    int *ptr2 = (int*)my_malloc(200);
    int *ptr3 = (int*)my_malloc(50);
    
    *ptr1 = 10; *ptr2 = 20; *ptr3 = 30;
    
    printf("Values: %d, %d, %d\n", *ptr1, *ptr2, *ptr3);
    
    my_free(ptr3);
    my_free(ptr2);
    my_free(ptr1);
    
    return 0;
}

// Output:
// Values: 10, 20, 30`,
      language: "c"
    },
    {
      id: "4",
      title: "File Systems",
      content: `## Definition

A **file system** is a method of organizing and storing computer files on a storage device. It provides a logical view of physical data on a block device or partition.

## Introduction

File systems are the backbone of modern computing. They organize data, manage access permissions, support directories and hierarchical structures, and ensure data integrity and recovery. Every operating system includes a file system to manage persistent storage.

## History and Establishment

- **1950s**: First file systems (IBM 350 RAMAC)
- **1960s**: UNIX file system (UFS) became standard
- **1970s**: NTFS developed by Microsoft
- **1980s**: HFS+ (Mac OS Extended)
- **1990s**: ext4, NTFS, exFAT became widespread
- **2000s**: Case-sensitive vs case-insensitive file systems
- **2010s**: APFS, ReFS, exFAT improved for large files

## File System Components

### 1. Superblock

- **Definition**: Metadata about the file system
- **Contents**: Block size, total blocks, free blocks, inodes
- **Importance**: Critical for file system integrity and recovery

### 2. Inodes (Index Nodes)

- **Definition**: Data structure storing file metadata
- **Contents**: Permissions, ownership, size, timestamps, block pointers
- **Example**: Inode number for "file.txt" in ext4: 12345

### 3. Data Blocks

- **Definition**: Actual file data storage
- **Types**:
  - Direct blocks: Direct file pointers
  - Indirect blocks: Single-level indirect pointers
  - Double indirect blocks: Two-level indirect pointers
  - Triple indirect blocks: Three-level indirect pointers

### 4. Directories

- **Definition**: Special files containing entries mapping filenames to inodes
- **Structure**: DOT (.), DOTDOT (..) entries, file entries
- **Permissions**: Read, write, execute permissions

## File System Types

### 1. Hierarchical File Systems

- **Definition**: Tree-like directory structure
- **Examples**: Unix-like systems, Windows
- **Advantages**:
  - Logical organization
  - Easy navigation
  - Support for long file names

### 2. Flat File Systems

- **Definition**: All files stored directly in root directory
- **Advantages**:
  - Simpler implementation
  - Faster directory operations
- **Disadvantages**:
  - Hard to organize large numbers of files
  - Poor support for nested structures

### atosensory File Systems

- **Definition**: File system that presents a uniform view across storage devices
- **Examples**: NFS, SMB, FTP
- **Advantages**:
  - Remote file access
  - Network collaboration
  - Transparent access to distributed files

### 4. journaling File Systems

- **Definition**: File system that maintains transaction log
- **Examples**: ext3, ext4, NTFS
- **Advantages**:
  - Faster recovery after crashes
  - Reduced file system corruption

## File Operations

### 1. Creation

- **Purpose**: Create new files
- **Functions**: creat(), fopen(), open()
- **Parameters**: Path, permissions, flags

### 2. Reading

- **Purpose**: Read file content
- **Functions**: read(), fread(), open() with read
- **Methods**: Buffered, unbuffered

### 3. Writing

- **Purpose**: Write file content
- **Functions**: write(), fwrite(), open() with write
- **Methods**: Append, overwrite

### 4. Deletion

- **Purpose**: Remove files
- **Functions**: remove(), unlink(), delete()

### 5. Renaming/Moving

- **Purpose**: Change file names or locations
- **Functions**: rename(), mv(), renameat()

## File Permissions

### UNIX/Linux Permissions

| Character | Owner | Group | Others |
|-----------|-------|-------|--------|
| r | Read | Read | Read |
| w | Write | Write | Write |
| x | Execute | Execute | Execute |

### Windows Permissions

- **Security Descriptor**: ACL-based permissions
- **Access Control Entries**: User/group permissions
- **Inheritable Permissions**: Propagated to sub-objects

## File System Metadata

### 1. timestamps

- **Creation Time**: When file was first created
- **Modification Time**: When file was last modified
- **Access Time**: When file was last read
- **Change Time**: When file's metadata was last changed

### 2. File Size

- **Bytes**: Total file size in bytes
- **Blocks**: Number of disk blocks used

### 3. Ownership

- **User ID**: ID of file owner
- **Group ID**: ID of file group
- **Permissions**: Read, write, execute bits

## File System Structures

### 1. FAT (File Allocation Table)

- **Structure**: Simple, easily damaged
- **Usage**: USB drives, embedded systems
- **Limitations**: File size limits (4GB for FAT32)

### 2. ext4 (Fourth Extended)

- **Structure**: Journaling file system
- **Features**: Extent-based allocation, large files, fast directories
- **Usage**: Linux default file system

### 3. NTFS (New Technology File System)

- **Structure**: Advanced features
- **Features**: Encryption (EFS), compression, disk quotas
- **Usage**: Windows NT/2000/XP/Vista/7/8/10/11

### 4. APFS (Apple File System)

- **Structure**: Designed for Apple devices
- **Features**: Space efficiency, crash protection, snapshots
- **Usage**: macOS, iOS

## File System Operations

### 1. File Creation

\**\**\`c
int fd = open("file.txt", O_CREAT | O_WRONLY, 0644);
\**\**\`

### 2. Writing to File

\**\**\`c
write(fd, buffer, size, 0);
\**\**\`

### 3. Reading from File

\**\**\`c
char buffer[100];
read(fd, buffer, sizeof(buffer), 0);
\**\**\`

### 4. Closing File

\**\**\`c
close(fd);
\**\**\`

## File System Examples

### 1. ls Command

\**\**\`bash
ls -la          # List all files with permissions
ls -la /home    # List home directory files
\**\**\`

### 2. mkdir Command

\**\**\`bash
mkdir directory_name    # Create directory
mkdir -p path/to/dir    # Create parent directories
\**\**\`

### 3. rm Command

\**\**\`bash
rm file.txt                    # Remove file
rm -r directory_name           # Remove directory and contents
\**\**\`

### 4. cp Command

\**\**\`bash
cp source.txt destination.txt    # Copy file
cp -r source_dir destination_dir  # Copy directory
\**\**\`

## File System Security

### 1. Access Control

- **File Permissions**: Restrict who can read, write, execute
- **Capabilities**: Additional security mechanism
- **SELinux**: Mandatory Access Control

### 2. File System Encryption

- **LUKS**: Linux Unified Key Setup
- **FileVault**: Windows encryption
- **APFS Cipher**: Apple file system encryption

### 3. Digital Signatures

- **Timestamps**: Prove file existence at a specific time
- **Checksums**: Verify file integrity
- **Hashes**: Create file fingerprints

## File System Monitoring

### 1. df Command

\**\**\`bash
df -h               # Show disk free space
df -i              # Show inode free space
\**\**\`

### 2. du Command

\**\**\`bash
du -sh directory_name           # Show directory size
du -sh --apparent directory_name  # Show apparent size
\**\**\`

## File System Recovery

### 1. fsck Command

\**\**\`bash
fsck /dev/sda1              # Check file system
\**\**\`

### 2. Data Recovery

- **Tools**: TestDisk, Photorec
- **Techniques**: Sector-by-sector recovery
- **Limitations**: Cannot recover from hardware damage

## Future Trends

- **Overlay File Systems**: Virtual file systems on top of others
- **Distributed File Systems**: HDFS, Ceph
- **Software-Defined Storage**: Storage virtualization
- **Quantum File Systems**: Quantum computing integration

## File System APIs

### 1. POSIX File API

- **Functions**: open(), close(), read(), write(), seek()
- **Headers**: <fcntl.h>, <unistd.h>, <sys/types.h>

### 2. Windows API

- **Functions**: CreateFile(), ReadFile(), WriteFile()
- **Headers**: <windows.h>, <fileapi.h>

### 3. Python File API

- **Functions**: open(), read(), write(), close()
- **Example**: \**with open("file.txt") as f: f.write("Hello")\**

## File System Performance Considerations

### 1. Block Size

- **Small blocks**: Efficient for small files
- **Large blocks**: Efficient for large files
- **Trade-off**: Space efficiency vs. fragmentation

### 2. Directory Structure

- **Deep directories**: Slower access
- **Wide directories**: Hard to manage
- **Trade-off**: Organization vs. performance

### 3. Journaling

- **Trade-off**: Safety vs. performance
- **Options**: Force journaling, write-back, read-only

## File System Examples

### 1. Simple File Operations in C

\**\**\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *file = fopen("example.txt", "w");
    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    fprintf(file, "Hello, World!\n");
    
    fclose(file);
    return 0;
}
\**\**\`

### 2. File Operations in Python

\**\**\`python
def file_operations():
    # Write to file
    with open("example.txt", "w") as f:
        f.write("Hello, World!\n")
    
    # Read from file
    with open("example.txt", "r") as f:
        content = f.read()
        print(content)
\**\**\`

### 3. File Operations in Java

\**\**\`java
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.BufferedReader;

public class FileExample {
    public static void main(String[] args) throws Exception {
        FileWriter fw = new FileWriter("example.txt");
        BufferedWriter bw = new BufferedWriter(fw);
        
        bw.write("Hello, World!");
        bw.newLine();
        
        bw.close();
        
        FileReader fr = new FileReader("example.txt");
        BufferedReader br = new BufferedReader(fr);
        
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
        
        br.close();
    }
}
\**\**\`

## Conclusion

File systems are fundamental to modern computing. They provide the foundation for data storage, organization, and access. Understanding file system concepts is essential for developing robust, efficient, and secure applications.`,
      codeExample: `// File operations in C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    FILE *file = fopen("example.txt", "w");
    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    // Write to file
    fprintf(file, "Hello, World!\n");
    fprintf(file, "This is a test file.\n");
    
    fclose(file);
    
    // Read from file
    file = fopen("example.txt", "r");
    if (file == NULL) {
        perror("Error opening file for reading");
        return 1;
    }
    
    char buffer[100];
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("%s", buffer);
    }
    
    fclose(file);
    return 0;
}

// Output:
// Hello, World!
// This is a test file.

// File operations in Python

def file_operations():
    # Write to file
    with open("example.txt", "w") as f:
        f.write("Hello, World!\n")
        f.write("This is a test file.\n")
    
    # Read from file
    with open("example.txt", "r") as f:
        content = f.read()
        print(content)

// Output:
// Hello, World!
// This is a test file.

// File operations in Java

import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;

public class FileExample {
    public static void main(String[] args) {
        try {
            FileWriter fw = new FileWriter("example.txt");
            BufferedWriter bw = new BufferedWriter(fw);
            
            bw.write("Hello, World!");
            bw.newLine();
            bw.write("This is a test file.");
            
            bw.close();
            
            FileReader fr = new FileReader("example.txt");
            BufferedReader br = new BufferedReader(fr);
            
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
            
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// Output:
// Hello, World!
// This is a test file.

// File system commands example

// Create a directory
mkdir -p directory_name

// Copy a file
cp source.txt destination.txt

// List directory contents
ls -la
ds -sh directory_name

// Check disk space
df -h

// Remove a file
rm file.txt

// Rename a file
mv old_name.txt new_name.txt`,
      language: "c"
    },
    {
      id: "5",
      title: "Virtual Memory",
      content: `## Definition

**Virtual memory** is a memory management technique that provides an idealized, uniform view of memory to processes. It allows a process to have a larger address space than physically available in RAM.

## Introduction

Virtual memory is a fundamental concept in modern operating systems. It enables programs to use more memory than physically available by using disk space as an extension of RAM. It also provides memory isolation between processes and simplifies memory allocation.

## History and Establishment

- **1960s**: Introduction of virtual memory (IBM System/360 Model 67)
- **1970s**: Demand paging became standard
- **1980s**: Paging hardware support in microprocessors
- **1990s**: Large address space support (32-bit -> 64-bit)
- **2000s**: Transparent huge pages, memory overcommit
- **2010s**: Software-defined memory, memory pooling

## Virtual Memory Concepts

### 1. Page-Based Virtual Memory

- **Definition**: Memory divided into fixed-size pages (typically 4KB)
- **Advantage**: Simple, efficient, and easy to manage
- **Typical Page Size**: 4KB (x86), 8KB (ARM)

### 2. Address Translation

- **Definition**: Mapping virtual addresses to physical addresses
- **Mechanism**: Page tables, translation lookaside buffer (TLB)
- **Process**: Every memory access requires address translation

### 3. Demand Paging

- **Definition**: Load pages only when needed (not in advance)
- **Trigger**: Page fault when accessing non-existent page
- **Performance Impact**: Page faults cause context switches

## Virtual Memory Components

### 1. Page Table

- **Definition**: Data structure mapping virtual page numbers to physical frames
- **Structure**: Contains page frame number, valid bit, protection bits
- **Types**:
  - Single-level page table
  - Multi-level page table (hierarchical)
  - Hashed page table
  - Inverted page table

### 2. Translation Lookaside Buffer (TLB)

- **Definition**: Cache for page table entries
- **Purpose**: Speed up address translation
- **Structure**: associative memory (content-addressable memory)

### 3. Swap Space

- **Definition**: Disk space used for page out (swap out)
- **Location**: Usually a dedicated partition or file
- **Management**: OS decides when to swap pages

### 4. Memory Management Unit (MMU)

- **Definition**: Hardware component for address translation
- **Functions**: Page table management, protection, caching
- **Location**: Integrated into most modern CPUs

## Virtual Memory Operations

### 1. Page Fault Handling

1. Trigger: Access to non-present page
2. Find free frame or evict existing page
3. Load page from swap/disk into frame
4. Update page table
5. Resume process

### 2. Page Replacement

- **Goal**: Choose victim page when no free frame available
- **Algorithms**:
  - FIFO: First-In-First-Out
  - LRU: Least Recently Used
  - Optimal: Replace page used farthest in future
  - Second Chance: Enhanced FIFO
  - Clock: Circular scan algorithm

### 3. Belady's Anomaly

- **Definition**: Some page replacement algorithms perform worse with more frames
- **Example**: FIFO algorithm

## Virtual Memory Functions

### 1. Page Allocation

- **Function**: Allocate frames for pages
- **API**: mmap(), brk(), sbrk()
- **Management**: Page frame allocation

### 2. Page Deallocation

- **Function**: Return frames to free pool
- **API**: munmap(), brk()
- **Management**: Frame reuse

### 3. Page Protection

- **Function**: Set protection attributes for pages
- **API**: mprotect()
- **Protection**: Read, write, execute permissions

### 4. Address Space Management

- **Function**: Manage process address spaces
- **API**: exec(), fork()
- **Management**: Process creation, destruction

## Virtual Memory Algorithms

### 1. Optimal Page Replacement (Belady's Algorithm)

\**\**\`c
int optimal_page_replacement(int pages[], int n, int frames) {
    int hits = 0;
    vector<int> frames;
    
    for (int i = 0; i < n; i++) {
        int page = pages[i];
        if (find(frames.begin(), frames.end(), page) != frames.end()) {
            hits++;
        } else {
            if (frames.size() < frames) {
                frames.push_back(page);
            } else {
                int future_idx = -1;
                for (int j = i + 1; j < n; j++) {
                    if (find(frames.begin(), frames.end(), pages[j]) != frames.end()) {
                        future_idx = j;
                        break;
                    }
                }
                if (future_idx == -1) {
                    frames[0] = page;
                } else {
                    int pos = find(frames.begin(), frames.end(), pages[future_idx]) - frames.begin();
                    frames[pos] = page;
                }
            }
        }
    }
    
    return hits;
}
\**\**\`

### 2. LRU Page Replacement

\**\**\`c
#include <unordered_map>
#include <list>

class LRUCache {
private:
    int capacity;
    list<pair<int, int>> lru_list;
    unordered_map<int, list<pair<int, int>>::iterator> cache_map;
    
public:
    LRUCache(int cap) : capacity(cap) {}
    
    int get(int key) {
        if (cache_map.find(key) == cache_map.end()) return -1;
        
        int value = cache_map[key]->second;
        lru_list.splice(lru_list.begin(), lru_list, cache_map[key]);
        return value;
    }
    
    void put(int key, int value) {
        if (cache_map.find(key) != cache_map.end()) {
            lru_list.splice(lru_list.begin(), lru_list, cache_map[key]);
            cache_map[key]->second = value;
            return;
        }
        
        if (cache_map.size() >= capacity) {
            int lru_key = lru_list.back().first;
            lru_list.pop_back();
            cache_map.erase(lru_key);
        }
        
        lru_list.emplace_front(key, value);
        cache_map[key] = lru_list.begin();
    }
};
\**\**\`

### 3. Working Set Model

\**\**\`c
struct WorkingSet {
    int min_time;
    int max_time;
    bool contains(int page) {
        return page >= min_time && page <= max_time;
    }
};
\**\**\`

### 4. Clock Page Replacement Algorithm

\**\**\`c
class ClockAlgorithm {
private:
    vector<bool> referenced_bits;
    int pointer;
    int frame_count;
    
public:
    ClockAlgorithm(int frames) {
        referenced_bits = vector<bool>(frames, false);
        pointer = 0;
        frame_count = frames;
    }
    
    int reference_page(int page) {
        int victim = -1;
        bool found_free = false;
        
        while (victim == -1 && !found_free) {
            if (!referenced_bits[pointer]) {
                victim = pointer;
                referenced_bits[pointer] = true;
                found_free = true;
            } else {
                referenced_bits[pointer] = false;
                pointer = (pointer + 1) % frame_count;
            }
        }
        
        if (found_free) {
            return -1; // No replacement, just marked referenced
        } else {
            return victim;
        }
    }
};
\**\**\`

## Virtual Memory Issues

### 1. Thrashing

- **Definition**: Excessive paging causing severe performance degradation
- **Symptoms**: High page fault rate, low CPU utilization
- **Causes**: Insufficient memory, poor page replacement algorithm
- **Solutions**: Working set model, page fault frequency

### 2. Belady's Anomaly

- **Definition**: Some page replacement algorithms perform worse with more frames
- **Example**: FIFO algorithm
- **Impact**: Non-monotonic behavior

### 3. TLB Miss

- **Definition**: Page table miss when looking up TLB
- **Impact**: Additional memory access required
- **Solution**: Large TLB entries, software-managed TLB

## Virtual Memory Architectures

### 1. Two-Level Paging

- **Structure**: Page directory + page tables
- **Benefit**: Reduced page table memory usage
- **Example**: x86 architecture

### 2. Three-Level Paging

- **Structure**: Page directory + page middle directory + page tables
- **Benefit**: Even larger virtual address spaces
- **Example**: 64-bit architectures

### 3. Inverted Page Table

- **Structure**: Hash table mapping physical frames to virtual pages
- **Benefit**: Reduced memory usage
- **Example**: Some RISC architectures

## Virtual Memory APIs

### 1. POSIX Shared Memory

\**\**\`c
#include <sys/mman.h>

// Create shared memory
void *ptr = mmap(NULL, SIZE, PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);

// Use shared memory
memcpy(ptr, data, SIZE);

// Destroy shared memory
munmap(ptr, SIZE);
\**\**\`

### 2. Windows Virtual Memory

\**\**\`c
#include <windows.h>

// Allocate virtual memory
LPVOID ptr = VirtualAlloc(NULL, SIZE, MEM_RESERVE | MEM_COMMIT, PAGE_READWRITE);

// Use virtual memory
memcpy(ptr, data, SIZE);

// Free virtual memory
VirtualFree(ptr, SIZE, MEM_RELEASE);
\**\**\`

### 3. Java Virtual Memory

\**\**\`java
// Use ByteBuffer for virtual memory-like operations
ByteBuffer buffer = ByteBuffer.allocateDirect(SIZE);

// Use memory-mapped file
FileChannel channel = FileChannel.open(Paths.get("file.txt"), StandardOpenOption.READ);
MappedByteBuffer mapped = channel.map(MapMode.READ_ONLY, 0, channel.size());

// Use direct buffer
DirectByteBuffer buf = (DirectByteBuffer) mapped;
\**\**\`

## Virtual Memory Optimization

### 1. Page Size Optimization

- **Small Pages**: Better for small working sets
- **Large Pages**: Better for large working sets
- **Trade-off**: Memory waste vs. TLB efficiency

### 2. TLB Optimization

- **Large TLB Entries**: Reduced TLB misses
- **Software-Managed TLB**: Dynamic TLB management
- **Multi-Level TLB**: Hierarchical TLB organization

### 3. Working Set Optimization

- **Working Set Size**: Estimating process memory requirements
- **Page Fault Frequency**: Controlling page fault rate
- **Load Management**: Balancing memory demand and supply

## Virtual Memory Examples

### 1. Page Fault Example

\**\**\`c
// Program that triggers page fault
int main() {
    int size = 1000000; // Large array
    int *array = new int[size]; // This may cause page fault
    
    for (int i = 0; i < size; i++) {
        array[i] = i * i; // Access elements
    }
    
    return 0;
}
\**\**\`

### 2. TLB Miss Example

\**\**\`c
// Program that causes TLB miss
void process_large_array(int size) {
    int *array = new int[size];
    
    for (int i = 0; i < size; i++) {
        // This causes TLB miss
        printf("%d ", array[i]);
    }
    
    delete[] array;
}
\**\**\`

### 3. Page Replacement Example

\**\**\`c
void page_replacement_example() {
    int pages[] = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2};
    int frames = 4;
    int faults = 0;
    
    int current_frames[4] = {-1, -1, -1, -1};
    
    for (int i = 0; i < 12; i++) {
        int page = pages[i];
        bool found = false;
        
        for (int j = 0; j < frames; j++) {
            if (current_frames[j] == page) {
                found = true;
                break;
            }
        }
        
        if (!found) {
            int lru_idx = 0;
            for (int j = 1; j < frames; j++) {
                // Find LRU
            }
            
            current_frames[lru_idx] = page;
            faults++;
        }
    }
    
    printf("Page faults: %d\n", faults);
}
\**\**\`

## Virtual Memory Programming

### 1. Memory Mapping

\**\**\`c
#include <sys/mman.h>
#include <fcntl.h>
#include <stdio.h>

int main() {
    const char *filename = "data.bin";
    size_t file_size = 1024; // 1KB
    
    int fd = open(filename, O_RDWR | O_CREAT, 0644);
    if (fd == -1) {
        perror("open");
        return 1;
    }
    
    // Resize file
    if (ftruncate(fd, file_size) == -1) {
        perror("ftruncate");
        close(fd);
        return 1;
    }
    
    // Memory map file
    void *ptr = mmap(NULL, file_size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (ptr == MAP_FAILED) {
        perror("mmap");
        close(fd);
        return 1;
    }
    
    // Use mapped memory
    char *data = (char *)ptr;
    for (size_t i = 0; i < file_size; i++) {
        data[i] = i % 256;
    }
    
    // Unmap memory
    munmap(ptr, file_size);
    
    close(fd);
    
    return 0;
}
\**\**\`

### 2. Custom Allocator

\**\**\`c
#include <stdlib.h>
#include <stdio.h>

#define ALIGNMENT 16  // 16-byte alignment

typedef struct Block {
    size_t size;
    int free;
    struct Block *next;
} Block;

Block *head = NULL;

void *my_malloc(size_t size) {
    size_t total_size = size + sizeof(Block) + ALIGNMENT - 1;
    size_t aligned_size = (total_size + ALIGNMENT - 1) & ~(ALIGNMENT - 1);
    
    Block *current = head;
    Block *prev = NULL;
    
    while (current != NULL) {
        if (current->free && current->size >= aligned_size) {
            if (current->size == aligned_size) {
                current->free = 0;
                return (void *)(current + 1);
            } else {
                Block *new_block = (Block *)((char *)current + aligned_size);
                new_block->size = current->size - aligned_size;
                new_block->free = 1;
                new_block->next = current->next;
                
                current->size = aligned_size;
                current->free = 0;
                current->next = new_block;
                
                return (void *)(current + 1);
            }
        }
        
        prev = current;
        current = current->next;
    }
    
    Block *new_block = (Block *)malloc(aligned_size);
    if (!new_block) return NULL;
    
    new_block->size = aligned_size;
    new_block->free = 0;
    new_block->next = NULL;
    
    if (prev) prev->next = new_block;
    else head = new_block;
    
    return (void *)(new_block + 1);
}

void my_free(void *ptr) {
    if (!ptr) return;
    
    Block *block = (Block *)ptr - 1;
    block->free = 1;
    
    Block *current = head;
    while (current != NULL && current->next != NULL) {
        if (current->next == block) {
            current->next = block->next;
            break;
        }
        current = current->next;
    }
    
    // Try to merge with next free block
    if (block->next && block->next->free) {
        block->size += block->next->size;
        block->next = block->next->next;
    }
}

int main() {
    int *a = (int *)my_malloc(sizeof(int) * 10);
    int *b = (int *)my_malloc(sizeof(int) * 20);
    int *c = (int *)my_malloc(sizeof(int) * 5);
    
    for (int i = 0; i < 10; i++) a[i] = i;
    for (int i = 0; i < 20; i++) b[i] = i * 2;
    for (int i = 0; i < 5; i++) c[i] = i * 3;
    
    printf("Array a: ");
    for (int i = 0; i < 10; i++) printf("%d ", a[i]);
    printf("\n");
    
    my_free(c);
    my_free(b);
    my_free(a);
    
    return 0;
}
\**\**\`

### 3. Page Fault Handler

\**\**\`c
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/mman.h>

void page_fault_handler(int sig, siginfo_t *info, void *context) {
    printf("Page fault at address: %p\n", info->si_addr);
    
    // Allocate page
    void *page = mmap(NULL, 4096, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
    if (page == MAP_FAILED) {
        perror("mmap");
        exit(1);
    }
    
    // Handle page fault
    // ...
    
    // Return from handler
    sigreturn(context);
}

int main() {
    struct sigaction sa;
    sa.sa_sigaction = page_fault_handler;
    sa.sa_flags = SA_SIGINFO;
    
    if (sigaction(SIGSEGV, &sa, NULL) == -1) {
        perror("sigaction");
        return 1;
    }
    
    // Trigger page fault
    int *arr = (int *)mmap(NULL, sizeof(int) * 1000000, 
                           PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
    
    if (arr == MAP_FAILED) {
        perror("mmap");
        return 1;
    }
    
    // Access array to trigger page fault
    for (int i = 0; i < 1000000; i++) {
        arr[i] = i;
    }
    
    munmap(arr, sizeof(int) * 1000000);
    
    return 0;
}
\**\**\`

## Virtual Memory Best Practices

### 1. Use Appropriate Allocation Functions

- **malloc/free**: General-purpose memory allocation
- **calloc**: Allocate and initialize to zero
- **realloc**: Resize allocated memory
- **mmap**: Memory map files

### 2. Use Virtual Memory Wisely

- **mmap**: Use for large files, shared memory
- **munmap**: Always unmap memory when done
- **mprotect**: Control memory permissions
- **mlock**: Lock memory in RAM (for real-time applications)

### 3. Handle Errors

- **Check return values**: Always check malloc, mmap return values
- **Handle signals**: Handle SIGSEGV for custom page fault handling
- **Use safe functions**: Use bounds checking functions

### 4. Performance Optimization

- **Minimize allocations**: Allocate memory in large blocks
- **Reuse memory**: Reuse memory when possible
- **Use pools**: Use memory pools for performance-critical code

## Virtual Memory Summary

Virtual memory is a fundamental OS feature that provides:

1. **Abstraction**: Simplifies memory management
2. **Protection**: Isolates processes from each other
3. **Efficiency**: Optimizes memory usage
4. **Flexibility**: Supports large applications

Key concepts:

- **Paging**: Memory divided into fixed-size pages
- **Demand Paging**: Load pages only when needed
- **Page Replacement**: Choose victim pages when memory is full
- **Address Translation**: Map virtual to physical addresses
- **TLB**: Speed up address translation

Future trends:

- **Persistent Memory**: Non-volatile memory with byte-addressability
- **Memory Disaggregation**: Separate memory from compute
- **Software-Defined Memory**: Dynamic memory management
- **Memory QoS**: Quality of service for memory allocation

Virtual memory programming requires understanding of:

- **Memory allocation**: malloc, calloc, realloc, mmap
- **Memory protection**: mprotect, mlock
- **Page faults**: Handling and recovery
- **Memory mapping**: File mapping, shared memory
- **Error handling**: Robust error handling

In conclusion, virtual memory is a complex but essential OS feature. It requires deep understanding of memory management, paging, and address translation. Proper use of virtual memory APIs and best practices can lead to more efficient and robust applications.`,
      codeExample: `// Virtual memory example with custom allocator and page fault handling
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/mman.h>
#include <signal.h>
#include <unistd.h>

// Custom allocator
#define ALIGNMENT 16
typedef struct Block { size_t size; int free; struct Block *next; } Block;
Block *head = NULL;

void* my_malloc(size_t size) {
    size_t total = size + sizeof(Block) + ALIGNMENT - 1;
    size_t aligned = (total + ALIGNMENT - 1) & ~(ALIGNMENT - 1);
    Block *cur = head, *prev = NULL;
    while (cur) {
        if (cur->free && cur->size >= aligned) {
            if (cur->size == aligned) { cur->free = 0; return (void*)(cur + 1); }
            Block *nb = (Block*)((char*)cur + aligned);
            nb->size = cur->size - aligned; nb->free = 1; nb->next = cur->next;
            cur->size = aligned; cur->free = 0; cur->next = nb;
            return (void*)(cur + 1);
        }
        prev = cur; cur = cur->next;
    }
    Block *nb = (Block*)malloc(aligned);
    if (!nb) return NULL;
    nb->size = aligned; nb->free = 0; nb->next = NULL;
    if (prev) prev->next = nb; else head = nb;
    return (void*)(nb + 1);
}
void my_free(void *p) {
    if (!p) return;
    Block *b = (Block*)p - 1; b->free = 1;
    Block *cur = head;
    while (cur && cur->next) {
        if (cur->next == b) { cur->next = b->next; break; }
        cur = cur->next;
    }
    if (b->next && b->next->free) {
        b->size += b->next->size;
        b->next = b->next->next;
    }
}

// Page fault handler for custom allocation demonstration
void page_fault_handler(int sig, siginfo_t *si, void *ctx) {
    printf("Page fault at: %p\n", si->si_addr);
    // In production, you'd track page usage and implement LRU
    // Here we just demonstrate the concept
}

int main() {
    // Setup page fault handler
    struct sigaction sa = { .sa_sigaction = page_fault_handler, .sa_flags = SA_SIGINFO };
    sigaction(SIGSEGV, &sa, NULL);
    
    // Use custom allocator to demonstrate virtual memory
    int *arr = (int*)my_malloc(sizeof(int) * 1000000);
    if (!arr) { printf("Alloc failed\n"); return 1; }
    
    // This will cause page faults as we access pages
    for (int i = 0; i < 1000000; i++) arr[i] = i;
    
    printf("Successfully allocated and accessed 1M integers\n");
    my_free(arr);
    return 0;
}`,
      language: "c"
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
    category: "Systems",
    lessons: [
  {
    id: "dbms-001",
    title: "Introduction to DBMS",
    language: "sql",
    content: `
## Introduction to Database Management Systems (DBMS)

### Definition
A **Database Management System (DBMS)** is a software package designed to define, manipulate, retrieve, and manage data in a database. A DBMS generally manipulates the data itself, the data format, field names, file structure, and record structure. It also allows users to create, read, update, and delete data in a systematic way. Examples include MySQL, PostgreSQL, Oracle Database, Microsoft SQL Server, and MongoDB.

### Introduction
A DBMS sits between the user and the database, providing an interface for users to interact with data without needing to understand the underlying physical storage. It serves as an abstraction layer that simplifies data management tasks. Without a DBMS, developers would need to write complex low-level code to store and retrieve data from files, handling concurrency, security, and integrity manually. The DBMS automates all of these concerns, allowing developers and analysts to focus on the business logic and data analysis rather than data mechanics.

### History
The concept of databases dates back to the 1960s. The **hierarchical model** was introduced by IBM with their Information Management System (IMS) in 1966. The **network model** followed shortly after, standardized by the CODASYL group in 1969. In 1970, Dr. Edgar F. Codd of IBM published his landmark paper describing the **relational model**, which organized data into tables (relations). The first commercial relational DBMS, Oracle, was released in 1979. The 1980s saw the rise of SQL as a standard language, with DB2, Ingres, and MySQL following. The 2000s brought **NoSQL** databases like MongoDB, Cassandra, and Redis to handle big data and unstructured data needs. Today, modern systems often use polyglot persistence, combining relational and non-relational databases.

### Advantages
- **Data Redundancy Control**: A DBMS eliminates duplicate data by normalizing and centralizing storage.
- **Data Consistency**: Changes propagate across all views and queries, ensuring consistency.
- **Data Integrity**: Constraints and rules ensure data accuracy and validity.
- **Data Security**: User authentication, authorization, and encryption protect sensitive data.
- **Concurrent Access**: Multiple users can access data simultaneously without conflicts.
- **Backup and Recovery**: Built-in mechanisms automate data backup and disaster recovery.
- **Data Independence**: Applications are insulated from changes in data storage structure.
- **Efficient Data Access**: Query optimization engines retrieve data faster than manual file access.

### Disadvantages
- **Cost**: Licensing fees for commercial DBMS can be expensive.
- **Complexity**: Setting up and maintaining a DBMS requires skilled administrators.
- **Performance Overhead**: The abstraction layer adds overhead compared to direct file access.
- **Single Point of Failure**: If the DBMS server fails, all dependent applications may go down.
- **Vendor Lock-In**: Migrating from one DBMS to another can be costly and complex.
- **Size**: DBMS software requires significant disk space and memory.

### Uses and Applications
- **Banking and Finance**: Managing accounts, transactions, and customer records.
- **Healthcare**: Storing patient records, medical history, and treatment plans.
- **E-commerce**: Product catalogs, inventory management, and order processing.
- **Education**: Student information systems, grades, and enrollment records.
- **Social Media**: User profiles, posts, messages, and friend connections.
- **Telecommunications**: Call records, subscriber data, and network management.
- **Government**: Tax records, census data, and public service databases.
    `,
    codeExample: `
-- Creating a simple database and table in MySQL
CREATE DATABASE school_db;

USE school_db;

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    gpa DECIMAL(3, 2) CHECK (gpa >= 0.00 AND gpa <= 4.00)
);

-- Insert sample data
INSERT INTO students (first_name, last_name, email, date_of_birth, gpa)
VALUES
    ('John', 'Doe', 'john.doe@school.edu', '2002-05-15', 3.75),
    ('Jane', 'Smith', 'jane.smith@school.edu', '2001-09-22', 3.92),
    ('Bob', 'Johnson', 'bob.j@school.edu', '2003-01-10', 2.88);

-- Query the data
SELECT first_name, last_name, gpa
FROM students
WHERE gpa >= 3.5
ORDER BY gpa DESC;
    `
  },
  {
    id: "dbms-002",
    title: "Relational Database Concepts",
    language: "sql",
    content: `
## Relational Database Concepts

### Definition
A **relational database** is a type of database that stores and provides access to data points that are related to one another. The relational model organizes data into one or more **tables** (or **relations**) of columns and rows, with a unique key identifying each row. Relationships between tables are established through **foreign keys**, creating a structured and logical data model based on relational algebra and first-order predicate logic.

### Introduction
The relational model is the most widely used data model for databases today. It was introduced by Edgar F. Codd in 1970 and remains the foundation of systems like MySQL, PostgreSQL, SQL Server, and Oracle. In a relational database, every piece of data is connected through relationships. For example, a customer can place many orders, and each order can contain many products. These relationships are expressed through primary keys and foreign keys, enabling complex queries that join data from multiple tables. Understanding relational concepts is essential for anyone working with databases.

### History
Edgar F. Codd published his seminal paper "A Relational Model of Data for Large Shared Data Banks" in 1970 while working at IBM. The paper proposed organizing data into relations (tables) and using a formal algebra to manipulate them. Early implementations included System R (IBM, 1974), Ingres (UC Berkeley, 1976), and Oracle (1979). The SQL language emerged from System R and was standardized by ANSI in 1986 and ISO in 1987. The relational model evolved with additions like **referential integrity** (foreign keys), **transaction support** (ACID properties), and **query optimization**. The model has proven so robust that even modern NoSQL databases are adopting relational concepts.

### Key Concepts

**Tables (Relations)**: Data is stored in tables with rows (tuples) and columns (attributes). Each table represents an entity like students, orders, or products.

**Primary Key**: A column or set of columns that uniquely identifies each row in a table. No two rows can have the same primary key value, and it cannot be NULL.

**Foreign Key**: A column in one table that references the primary key of another table, creating a relationship between the two tables.

**Relationships**:
- **One-to-One (1:1)**: Each record in Table A relates to exactly one record in Table B.
- **One-to-Many (1:N)**: Each record in Table A can relate to many records in Table B.
- **Many-to-Many (M:N)**: Records in Table A can relate to many records in Table B and vice versa. This requires a junction table.

**Schema**: The logical structure of the database, including table definitions, column data types, constraints, and relationships.

**Data Types**: Each column has a defined data type such as INT, VARCHAR, DATE, DECIMAL, BOOLEAN, TEXT, BLOB, and TIMESTAMP.

### Advantages
- **Structured Data Organization**: Data is organized in a clear, tabular format.
- **ACID Compliance**: Supports transactions with Atomicity, Consistency, Isolation, and Durability.
- **Data Integrity**: Constraints enforce rules at the database level.
- **Flexible Querying**: SQL allows complex joins, aggregations, and subqueries.
- **Mature Technology**: Decades of optimization, tooling, and best practices.
- **Standardization**: SQL is a well-defined standard across implementations.

### Disadvantages
- **Rigid Schema**: Changes to table structure can require migrations and downtime.
- **Horizontal Scaling Difficulty**: Scaling across multiple servers is complex.
- **Object-Relational Impedance Mismatch**: Mapping objects to tables can be cumbersome.
- **Performance with Deep Joins**: Queries joining many tables can become slow.
- **Overhead for Simple Data**: For simple key-value data, relational databases may be overkill.

### Uses and Applications
- **Enterprise Resource Planning (ERP)**: SAP, Oracle ERP, and similar systems rely on relational databases.
- **Customer Relationship Management (CRM)**: Salesforce and similar platforms use relational models.
- **Financial Systems**: Ledger management, transaction processing, and reporting.
- **Inventory Management**: Tracking products, warehouses, and stock levels.
- **Human Resources**: Employee records, payroll, and benefits management.
    `,
    codeExample: `
-- Creating tables with relationships

CREATE DATABASE company_db;
USE company_db;

-- Departments table (parent)
CREATE TABLE departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

-- Employees table (child with foreign key)
CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10, 2),
    hire_date DATE,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Projects table
CREATE TABLE projects (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(150) NOT NULL,
    start_date DATE,
    end_date DATE
);

-- Junction table for Many-to-Many relationship (employees to projects)
CREATE TABLE employee_projects (
    emp_id INT,
    project_id INT,
    role VARCHAR(50) DEFAULT 'Member',
    assigned_date DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (emp_id, project_id),
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
        ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO departments (dept_name, location) VALUES
    ('Engineering', 'Building A'),
    ('Marketing', 'Building B'),
    ('Finance', 'Building C');

INSERT INTO employees (first_name, last_name, email, salary, hire_date, dept_id) VALUES
    ('Alice', 'Williams', 'alice@company.com', 95000.00, '2021-03-15', 1),
    ('Charlie', 'Brown', 'charlie@company.com', 72000.00, '2022-06-01', 2),
    ('Diana', 'Prince', 'diana@company.com', 105000.00, '2020-01-10', 1);

INSERT INTO projects (project_name, start_date, end_date) VALUES
    ('Website Redesign', '2024-01-01', '2024-06-30'),
    ('Mobile App', '2024-03-01', '2024-12-31');

INSERT INTO employee_projects (emp_id, project_id, role) VALUES
    (1, 1, 'Lead Developer'),
    (1, 2, 'Architect'),
    (3, 2, 'Backend Engineer');

-- Query with JOIN to retrieve related data
SELECT
    e.first_name,
    e.last_name,
    d.dept_name,
    p.project_name,
    ep.role
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
JOIN employee_projects ep ON e.emp_id = ep.emp_id
JOIN projects p ON ep.project_id = p.project_id
ORDER BY e.last_name, p.project_name;
    `
  },
  {
    id: "dbms-003",
    title: "SQL Fundamentals and DDL",
    language: "sql",
    content: `
## SQL Fundamentals and Data Definition Language (DDL)

### Definition
**SQL (Structured Query Language)** is a standardized programming language used to manage and manipulate relational databases. **DDL (Data Definition Language)** is a subset of SQL used to define, modify, and delete database structures such as tables, indexes, and schemas. DDL commands include **CREATE**, **ALTER**, **DROP**, **TRUNCATE**, and **RENAME**. These commands define the structure (schema) of the database rather than the data within it.

### Introduction
SQL is the universal language of relational databases. Whether you use MySQL, PostgreSQL, SQL Server, or Oracle, SQL is the primary way to interact with data. DDL is the first step in building any database application. Before you can insert, query, or update data, you must first create the database structure. DDL commands define what tables exist, what columns they have, what data types those columns accept, and what constraints enforce data integrity. Mastering DDL is essential for database designers and developers.

### History
SQL originated from IBM's System R project in the 1970s. The original language was called SEQUEL (Structured English Query Language), designed by Donald D. Chamberlin and Raymond F. Boyce. IBM released it commercially as SQL/DS in 1981. Oracle (then Relational Software, Inc.) released the first commercial SQL RDBMS in 1979. The American National Standards Institute (ANSI) adopted SQL as a standard in 1986, and the International Organization for Standardization (ISO) followed in 1987. SQL-86 was the first standard, followed by SQL-89, SQL-92 (a major revision), SQL:1999 (adding object-relational features), SQL:2003, SQL:2006, SQL:2008, SQL:2011, SQL:2016, and SQL:2023. Each version added new features like window functions, JSON support, and temporal data.

### DDL Commands in Detail

**CREATE**: Creates new database objects. You can create databases, tables, views, indexes, stored procedures, triggers, and users. The CREATE TABLE statement defines column names, data types, and constraints.

**ALTER**: Modifies existing database objects. You can add, modify, or drop columns. You can also add or remove constraints, change data types, and rename objects. ALTER TABLE is one of the most commonly used DDL commands.

**DROP**: Permanently deletes database objects. When you DROP a table, all data, indexes, and constraints are removed. The object ceases to exist in the database.

**TRUNCATE**: Removes all rows from a table but keeps the table structure intact. It is faster than DELETE because it does not log individual row deletions. The table structure, columns, indexes, and constraints remain.

**RENAME**: Changes the name of an existing database object.

### Data Types in SQL
- **Numeric**: INT, SMALLINT, BIGINT, DECIMAL, NUMERIC, FLOAT, REAL
- **String**: CHAR, VARCHAR, TEXT, BINARY, VARBINARY, BLOB
- **Date/Time**: DATE, TIME, DATETIME, TIMESTAMP, INTERVAL
- **Boolean**: BOOLEAN (TRUE, FALSE, NULL)
- **JSON**: JSON, JSONB (PostgreSQL)
- **UUID**: UUID (universally unique identifier)

### Constraints
- **NOT NULL**: Column cannot contain NULL values.
- **UNIQUE**: All values in the column must be different.
- **PRIMARY KEY**: Combines NOT NULL and UNIQUE; uniquely identifies each row.
- **FOREIGN KEY**: Enforces referential integrity between tables.
- **CHECK**: Ensures values satisfy a specific condition.
- **DEFAULT**: Provides a default value when no value is specified.

### Advantages of DDL
- **Declarative Syntax**: You describe what you want, not how to do it.
- **Portability**: SQL DDL is largely portable across database systems.
- **Data Integrity**: Constraints are enforced at the database level.
- **Self-Documenting**: Schema definitions serve as documentation.
- **Centralized Control**: All data structure changes go through DDL.

### Disadvantages of DDL
- **Schema Changes Can Be Expensive**: ALTER TABLE on large tables can lock the table.
- **Limited Expressiveness**: Complex business rules may require application code.
- **Vendor Differences**: While standardized, each DBMS has proprietary extensions.
- **Migration Complexity**: DDL changes across environments need careful versioning.

### Uses and Applications
- **Database Design**: Creating the initial schema for new applications.
- **Schema Migrations**: Modifying tables as requirements evolve.
- **Database Versioning**: Tracking schema changes with migration tools like Flyway or Liquibase.
- **Environment Setup**: Creating development, testing, and production databases.
- **Data Modeling**: Translating ER diagrams into physical database schemas.
    `,
    codeExample: `
-- DDL Examples: Creating and modifying database structures

-- Create a database
CREATE DATABASE IF NOT EXISTS bookstore;

USE bookstore;

-- Create tables with various data types and constraints
CREATE TABLE genres (
    genre_id INT PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(50),
    website VARCHAR(200)
);

CREATE TABLE books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    publication_date DATE,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT DEFAULT 0 CHECK (stock_quantity >= 0),
    genre_id INT,
    author_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Alter table: add a new column
ALTER TABLE books ADD COLUMN pages INT CHECK (pages > 0);

-- Alter table: modify a column data type
ALTER TABLE books MODIFY COLUMN isbn VARCHAR(17);

-- Alter table: drop a column
ALTER TABLE books DROP COLUMN website;

-- Create an index for faster searches
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_isbn ON books(isbn);
CREATE INDEX idx_authors_name ON authors(last_name, first_name);

-- Rename a table
-- RENAME TABLE books TO library_books;

-- Truncate a table (remove all rows, keep structure)
-- TRUNCATE TABLE books;

-- Drop a table (permanently delete)
-- DROP TABLE IF EXISTS old_table;
    `
  },
  {
    id: "dbms-004",
    title: "SQL DML and Queries",
    language: "sql",
  content: `
## SQL Data Manipulation Language (DML) and Queries

### Definition
**DML (Data Manipulation Language)** is the subset of SQL used to insert, retrieve, update, and delete data within database tables. The primary DML commands are **SELECT**, **INSERT**, **UPDATE**, and **DELETE**. These commands operate on the data itself rather than the database structure. The SELECT statement is the most powerful and complex DML command, supporting filtering, sorting, aggregation, joining, subqueries, and window functions.

### Introduction
While DDL defines the structure of a database, DML is where the real work happens. DML commands are used millions of times per day in production systems. Every time a user loads a page, places an order, or searches for information, DML queries execute behind the scenes. Understanding how to write efficient DML queries is critical for application performance. A poorly written SELECT query can bring a production database to its knees, while an optimized query can retrieve millions of rows in milliseconds. DML mastery separates novice developers from experienced database engineers.

### History
DML commands have been part of SQL since its inception in the 1970s. The SELECT statement was originally designed to be simple, but it has grown enormously in capability. SQL-92 introduced subqueries and joins. SQL:1999 added common table expressions (CTEs) and recursive queries. SQL:2003 introduced window functions (OVER clause, ROW_NUMBER, RANK, LEAD, LAG), which revolutionized analytical queries. SQL:2011 added temporal query support. Each SQL standard has expanded DML capabilities, making it one of the most feature-rich query languages in existence.

### SELECT Statement in Depth

The SELECT statement retrieves data from one or more tables. Its clauses include:

**FROM**: Specifies the table(s) to query. Supports JOIN operations.
**WHERE**: Filters rows based on conditions. Uses operators like =, <>, <, >, <=, >=, IN, BETWEEN, LIKE, IS NULL.
**GROUP BY**: Groups rows by column values for aggregation.
**HAVING**: Filters groups (used with GROUP BY, like WHERE for groups).
**ORDER BY**: Sorts the result set by one or more columns. ASC for ascending, DESC for descending.
**LIMIT/OFFSET**: Restricts the number of rows returned (pagination).
**JOIN**: Combines rows from two or more tables based on related columns.
  - **INNER JOIN**: Returns rows with matching values in both tables.
  - **LEFT JOIN**: Returns all rows from the left table and matched rows from the right.
  - **RIGHT JOIN**: Returns all rows from the right table and matched rows from the left.
  - **FULL JOIN**: Returns all rows when there is a match in either table.
  - **CROSS JOIN**: Returns the Cartesian product of both tables.
  - **SELF JOIN**: A table joined with itself.

**Subqueries**: Queries nested inside other queries. Can appear in SELECT, FROM, WHERE, or HAVING clauses.

**Common Table Expressions (CTEs)**: Named temporary result sets defined with WITH clause. Improve readability of complex queries.

**Window Functions**: Perform calculations across a set of rows related to the current row without collapsing them. Functions include ROW_NUMBER, RANK, DENSE_RANK, NTILE, SUM, AVG, MIN, MAX with OVER clause.

### INSERT Statement
Adds new rows to a table. Supports single-row inserts, multi-row inserts, and INSERT ... SELECT (insert from query results).

### UPDATE Statement
Modifies existing rows in a table. Uses SET to specify new values and WHERE to filter which rows to update. Without WHERE, all rows are updated.

### DELETE Statement
Removes rows from a table. Uses WHERE to filter which rows to delete. Without WHERE, all rows are deleted.

### Advantages
- **Declarative**: You describe what data you want, not how to get it.
- **Powerful Aggregation**: Built-in functions like COUNT, SUM, AVG, MIN, MAX.
- **Flexible Joins**: Combine data from multiple tables in a single query.
- **Subqueries and CEs**: Nest queries for complex logic.
- **Window Functions**: Advanced analytics without self-joins.
- **Standardization**: SQL DML works across all relational databases.

### Disadvantages
- **Performance Complexity**: Bad queries can be very slow on large datasets.
- **SQL Injection Risk**: Dynamic SQL construction can lead to security vulnerabilities.
- **Readability**: Complex queries with many joins and subqueries can be hard to understand.
- **Limited Procedural Logic**: While improving, SQL is not ideal for complex procedural logic.
- **Debugging Difficulty**: Analyzing query execution plans requires specialized knowledge.

### Uses and Applications
- **Reporting**: Generating business reports and analytics dashboards.
- **CRUD Operations**: Creating, reading, updating, and deleting application data.
- **Data Migration**: Moving data between systems using INSERT ... SELECT.
- **ETL Processes**: Extracting, transforming, and loading data in data warehouses.
- **Real-time Analytics**: Running aggregations on live production data.
    `,
    codeExample: `
-- DML Examples: Working with data

-- INSERT: Adding data
INSERT INTO genres (genre_name, description) VALUES
    ('Science Fiction', 'Fiction dealing with imaginative concepts'),
    ('Mystery', 'Fiction dealing with puzzling events'),
    ('Non-Fiction', 'Factual writing');

INSERT INTO authors (first_name, last_name, birth_date, nationality) VALUES
    ('Isaac', 'Asimov', '1920-01-02', 'American'),
    ('Agatha', 'Christie', '1890-09-15', 'British'),
    ('Stephen', 'Hawking', '1942-01-08', 'British');

INSERT INTO books (title, isbn, publication_date, price, stock_quantity, pages, genre_id, author_id) VALUES
    ('Foundation', '9780553293357', '1951-06-01', 12.99, 45, 244, 1, 1),
    ('Murder on the Orient Express', '9780062073501', '1934-01-01', 11.99, 30, 256, 2, 2),
    ('A Brief History of Time', '9780553380163', '1988-04-01', 15.99, 60, 212, 3, 3),
    ('The Caves of Steel', '9780553293340', '1954-01-01', 10.99, 25, 206, 1, 1);

-- SELECT: Basic querying
SELECT title, price, stock_quantity FROM books;

-- SELECT with WHERE clause
SELECT title, price
FROM books
WHERE price < 15.00
ORDER BY price ASC;

-- SELECT with JOIN
SELECT
    b.title,
    b.price,
    a.first_name || ' ' || a.last_name AS author_name,
    g.genre_name
FROM books b
INNER JOIN authors a ON b.author_id = a.author_id
LEFT JOIN genres g ON b.genre_id = g.genre_id;

-- Aggregation with GROUP BY
SELECT
    g.genre_name,
    COUNT(b.book_id) AS book_count,
    AVG(b.price) AS avg_price,
    SUM(b.stock_quantity) AS total_stock
FROM books b
JOIN genres g ON b.genre_id = g.genre_id
GROUP BY g.genre_name
HAVING COUNT(b.book_id) >= 1;

-- Subquery
SELECT title, price
FROM books
WHERE price > (SELECT AVG(price) FROM books);

-- Window function
SELECT
    title,
    price,
    genre_id,
    ROW_NUMBER() OVER (PARTITION BY genre_id ORDER BY price DESC) AS price_rank,
    RANK() OVER (ORDER BY price DESC) AS overall_rank
FROM books;

-- Common Table Expression (CTE)
WITH expensive_books AS (
    SELECT book_id, title, price
    FROM books
    WHERE price > 12.00
)
SELECT eb.title, eb.price, a.first_name || ' ' || a.last_name AS author
FROM expensive_books eb
JOIN authors a ON eb.book_id = a.author_id;

-- UPDATE: Modifying data
UPDATE books
SET price = price * 1.10
WHERE genre_id = 1;

-- DELETE: Removing data
DELETE FROM books
WHERE stock_quantity < 20;
    `
  },
  {
    id: "dbms-005",
    title: "Normalization",
    language: "sql",
    content: `
## Normalization

### Definition
**Normalization** is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves decomposing tables into smaller, well-structured tables and defining relationships between them. The goal is to isolate data so that additions, deletions, and modifications of a field can be made in just one table and propagate through the rest of the database via relationships. Normalization is guided by **normal forms**, which are a series of progressively stricter rules.

### Introduction
Normalization is one of the most important concepts in relational database design. Without normalization, databases suffer from anomalies that make data maintenance difficult and error-prone. Consider a table storing customer orders with customer details repeated for every order. If a customer changes their address, you must update every row containing that customer's information. Missing even one row creates inconsistency. Normalization eliminates this problem by ensuring each piece of data is stored in exactly one place. The process was developed by Edgar F. Codd and further refined by Raymond F. Boyce and C.J. Date. While over-normalization can hurt performance (due to excessive joins), proper normalization is essential for data correctness.

### History
Normalization theory was introduced by Edgar F. Codd in 1970 alongside the relational model. His initial paper described the first three normal forms. In 1974, Codd introduced a stronger version of the third normal form. C.J. Date and others further developed the theory in the 1970s and 1980s. The Boyce-Codd Normal Form (BCNF) was introduced in 1974 by Codd and Boyce. Fourth Normal Form (4NF) was introduced by Ronald Fagin in 1977, and Fifth Normal Form (5NF) was described by him in 1979. The concept of Sixth Normal Form (6NF) was developed for temporal databases. The theory has evolved to address increasingly complex data modeling challenges.

### Normal Forms

**First Normal Form (1NF)**: Each column contains atomic (indivisible) values. There are no repeating groups or arrays. Each row is unique, identified by a primary key.

**Second Normal Form (2NF)**: The table is in 1NF, and every non-key column is fully functionally dependent on the entire primary key. This eliminates partial dependencies (where a non-key column depends on only part of a composite primary key).

**Third Normal Form (3NF)**: The table is in 2NF, and no non-key column is transitively dependent on the primary key. In other words, non-key columns should depend only on the primary key, not on other non-key columns.

**Boyce-Codd Normal Form (BCNF)**: A stricter version of 3NF. For every functional dependency X -> Y, X must be a superkey. This handles cases where 3NF is not sufficient.

**Fourth Normal Form (4NF)**: The table is in BCNF and has no multi-valued dependencies. A multi-valued dependency exists when one column determines a set of values for another column, independent of other columns.

**Fifth Normal Form (5NF)**: The table is in 4NF and cannot be decomposed into smaller tables without loss of data. This addresses join dependencies.

### Anomalies Prevented by Normalization
- **Insertion Anomaly**: Cannot insert data about an entity without other unrelated data.
- **Update Anomaly**: Updating one piece of data requires updating multiple rows.
- **Deletion Anomaly**: Deleting one piece of data inadvertently deletes other important data.

### Advantages
- **Reduced Data Redundancy**: Data is stored only once.
- **Improved Data Integrity**: Consistent data across the database.
- **Easier Maintenance**: Changes need to be made in only one place.
- **Better Query Optimization**: Smaller tables are faster to scan and index.
- **Logical Data Organization**: Clear relationships between entities.

### Disadvantages
- **Complex Queries**: More joins are needed to retrieve related data.
- **Performance Impact**: Excessive normalization can slow down read-heavy applications.
- **Design Complexity**: Proper normalization requires careful analysis.
- **Over-Normalization**: Sometimes denormalization is better for performance.
- **Migration Effort**: Restructuring a normalized schema can be difficult.

### Uses and Applications
- **OLTP Systems**: Online transaction processing benefits greatly from normalization.
- **Data Warehouses**: While often denormalized for performance, the design process starts with normalization.
- **Enterprise Applications**: ERP, CRM, and HR systems use normalized schemas.
- **Any Relational Database**: Normalization is a fundamental principle of good database design.
    `,
    codeExample: `
-- Normalization Example: From Unnormalized to 3NF

-- UNNORMALIZED TABLE (has repeating groups and redundancy)
-- This is what we want to avoid:
-- orders_unnorm (order_id, customer_name, customer_email, product1, product2, product3)

-- Step 1: Create properly normalized tables

CREATE DATABASE normalization_demo;
USE normalization_demo;

-- Customers table (3NF)
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(50),
    state VARCHAR(50)
);

-- Products table (3NF)
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price > 0)
);

-- Orders table (3NF - each row is one order)
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Order items (3NF - junction table for orders and products)
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Insert normalized data
INSERT INTO customers (customer_name, customer_email, city, state) VALUES
    ('Alice Johnson', 'alice@email.com', 'New York', 'NY'),
    ('Bob Smith', 'bob@email.com', 'Los Angeles', 'CA'),
    ('Carol White', 'carol@email.com', 'Chicago', 'IL');

INSERT INTO products (product_name, category, unit_price) VALUES
    ('Laptop', 'Electronics', 999.99),
    ('Mouse', 'Electronics', 29.99),
    ('Desk', 'Furniture', 249.99),
    ('Chair', 'Furniture', 149.99);

INSERT INTO orders (customer_id, order_date) VALUES
    (1, '2024-01-15'),
    (1, '2024-02-20'),
    (2, '2024-01-18');

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
    (1, 1, 1, 999.99),
    (1, 2, 2, 29.99),
    (2, 3, 1, 249.99),
    (3, 4, 1, 149.99);

-- Query normalized data using JOINs
SELECT
    o.order_id,
    c.customer_name,
    c.city,
    o.order_date,
    p.product_name,
    oi.quantity,
    oi.price_at_purchase,
    (oi.quantity * oi.price_at_purchase) AS line_total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_date;
    `
  },
  {
    id: "dbms-006",
    title: "Indexing and Query Optimization",
    language: "sql",
  content: `
## Indexing and Query Optimization

### Definition
**Indexing** is a technique used to speed up data retrieval operations in a database at the cost of additional storage space and slower writes. An **index** is a data structure that provides quick lookup of data in a column or columns of a table. It works similarly to a book's index, which lets you find a topic without reading every page. **Query optimization** is the process of improving the performance of SQL queries by choosing the most efficient execution plan. Most relational databases use a **query optimizer** that automatically selects the best plan, but understanding indexing helps developers write queries that the optimizer can handle efficiently.

### Introduction
As databases grow to millions or billions of rows, query performance becomes critical. Without indexes, every SELECT query must scan the entire table (a full table scan), which is extremely slow for large datasets. Indexes allow the database engine to jump directly to the relevant rows. However, indexes are not free. They consume disk space, slow down INSERT, UPDATE, and DELETE operations (because the index must also be updated), and can become fragmented over time. The art of database optimization lies in choosing the right indexes for the right columns. Most performance problems in database applications are caused by missing or poorly designed indexes.

### History
The concept of indexing predates computers. Libraries have used indexing systems for centuries. In databases, early systems used simple hash indexes. The **B-tree** index, invented by Rudolf Bayer and Edward McCreight in 1970 at Boeing Research Labs, became the dominant index structure for relational databases. B-trees provide O(log n) lookup time and are efficient for range queries. The **B+ tree** variant, which stores all data in leaf nodes, is used by most modern databases. In the 1990s, **bitmap indexes** were developed for data warehousing. **Hash indexes** are used for exact-match lookups. More recently, **GiST** (Generalized Search Tree), **GIN** (Generalized Inverted Index), and **BRIN** (Block Range Index) have been added to PostgreSQL. **Partial indexes** and **expression indexes** provide more targeted indexing options.

### Types of Indexes

**B-Tree Index**: The default index type. Balanced tree structure efficient for equality and range queries. Suitable for columns with high cardinality (many distinct values).

**Hash Index**: Uses a hash function for O(1) lookup. Only supports equality comparisons (=), not range queries (<, >, BETWEEN). Good for exact-match lookups.

**Composite Index**: An index on two or more columns. Useful for queries that filter on multiple columns. The order of columns matters (leftmost prefix rule).

**Unique Index**: Ensures all values in the indexed column(s) are unique. Automatically creates a constraint.

**Partial Index**: Indexes only rows that satisfy a condition. Saves space when you frequently query a subset of rows.

**Expression Index**: Indexes the result of a function or expression. Useful when queries filter on computed values.

**Covering Index**: An index that contains all columns needed by a query, eliminating the need to access the table data (index-only scan).

### Query Optimization Techniques
- **Use WHERE clauses** to filter data early.
- **Avoid SELECT *** and only retrieve needed columns.
- **Use JOINs** instead of subqueries when possible.
- **Add indexes** on columns used in WHERE, JOIN, ORDER BY, and GROUP BY.
- **Analyze execution plans** using EXPLAIN or EXPLAIN ANALYZE.
- **Avoid functions on indexed columns** in WHERE clauses (prevents index usage).
- **Use LIMIT** for pagination and debugging.
- **Batch inserts** instead of inserting one row at a time.

### Advantages of Indexing
- **Faster Data Retrieval**: Queries can find rows in milliseconds instead of seconds.
- **Efficient Sorting**: ORDER BY can use indexes to avoid sorting operations.
- **Enforced Uniqueness**: Unique indexes prevent duplicate values.
- **Faster JOINs**: Indexed foreign keys speed up join operations.
- **Covering Indexes**: Can satisfy queries entirely from the index.

### Disadvantages of Indexing
- **Storage Overhead**: Each index consumes disk space.
- **Write Performance**: INSERT, UPDATE, DELETE are slower due to index maintenance.
- **Maintenance**: Indexes can become fragmented and need rebuilding.
- **Over-Indexing**: Too many indexes hurt write performance.
- **Index Misuse**: Wrong indexes provide no benefit.

### Uses and Applications
- **Search Functionality**: Full-text search indexes for product search, content search.
- **Reporting Queries**: Indexes on date ranges and category filters.
- **Foreign Key Performance**: Indexing foreign key columns for faster joins.
- **Unique Constraints**: Enforcing business rules like unique emails or usernames.
- **Data Warehouse**: Bitmap indexes for low-cardinality columns in star schemas.
    `,
    codeExample: `
-- Indexing and Query Optimization Examples

CREATE DATABASE optimization_demo;
USE optimization_demo;

-- Create a large table for demonstration
CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    hire_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create various indexes
CREATE INDEX idx_emp_department ON employees(department);
CREATE INDEX idx_emp_salary ON employees(salary);
CREATE INDEX idx_emp_hire_date ON employees(hire_date);
CREATE INDEX idx_emp_active_dept ON employees(is_active, department);
CREATE INDEX idx_emp_name ON employees(last_name, first_name);

-- Composite index for common query patterns
CREATE INDEX idx_emp_dept_salary ON employees(department, salary);

-- Partial index (PostgreSQL syntax, MySQL uses a different approach)
-- CREATE INDEX idx_emp_active ON employees(department) WHERE is_active = TRUE;

-- Expression index (PostgreSQL syntax)
-- CREATE INDEX idx_emp_email_domain ON employees(SUBSTRING_INDEX(email, '@', -1));

-- Insert sample data
INSERT INTO employees (first_name, last_name, email, department, salary, hire_date, is_active)
SELECT
    CONCAT('First', n),
    CONCAT('Last', n),
    CONCAT('user', n, '@company.com'),
    CASE
        WHEN n % 5 = 0 THEN 'Engineering'
        WHEN n % 5 = 1 THEN 'Marketing'
        WHEN n % 5 = 2 THEN 'Sales'
        WHEN n % 5 = 3 THEN 'Finance'
        ELSE 'HR'
    END,
    ROUND(50000 + (RAND() * 100000), 2),
    DATE_ADD('2020-01-01', INTERVAL FLOOR(RAND() * 1460) DAY),
    IF(RAND() > 0.1, TRUE, FALSE)
FROM (
    SELECT @row := @row + 1 AS n
    FROM information_schema.columns a,
         information_schema.columns b,
         (SELECT @row := 0) r
    LIMIT 1000
) numbers;

-- Use EXPLAIN to analyze query execution
EXPLAIN SELECT * FROM employees WHERE department = 'Engineering';

EXPLAIN SELECT first_name, last_name, salary
FROM employees
WHERE department = 'Engineering' AND salary > 75000
ORDER BY salary DESC;

-- This query benefits from the composite index
SELECT first_name, last_name, salary
FROM employees
WHERE department = 'Engineering' AND salary > 75000
ORDER BY salary DESC
LIMIT 20;

-- Query using covering index (all columns in index)
SELECT department, salary
FROM employees
WHERE department = 'Sales' AND salary > 80000;

-- Avoid this: function on indexed column prevents index usage
SELECT * FROM employees WHERE YEAR(hire_date) = 2023;

-- Do this instead: keep the column bare so index can be used
SELECT * FROM employees
WHERE hire_date >= '2023-01-01' AND hire_date < '2024-01-01';

-- Analyze query performance
EXPLAIN ANALYZE
SELECT d.department, COUNT(*) AS emp_count, AVG(e.salary) AS avg_salary
FROM employees e
WHERE e.is_active = TRUE
GROUP BY d.department
HAVING COUNT(*) > 10
ORDER BY avg_salary DESC;
    `
  },
  {
    id: "dbms-007",
    title: "Transactions and ACID Properties",
    language: "sql",
  content: `
## Transactions and ACID Properties

### Definition
A **transaction** is a logical unit of work that consists of one or more SQL statements that must be executed atomically. Either all statements in the transaction succeed, or none of them take effect. **ACID** stands for **Atomicity**, **Consistency**, **Isolation**, and **Durability** — the four properties that guarantee database transactions are processed reliably. These properties ensure that even in the event of system failures, power outages, or concurrent access, the database remains in a valid state.

### Introduction
In any multi-user database system, transactions are essential for maintaining data integrity. Consider a bank transfer: moving money from Account A to Account B requires two operations — debiting Account A and crediting Account B. If the system crashes after debiting Account A but before crediting Account B, money would vanish. Transactions prevent this by grouping these operations into an atomic unit. If either operation fails, the entire transaction is rolled back, and both accounts remain unchanged. The ACID properties formalize these guarantees, and every major relational database implements them. Understanding transactions is critical for building reliable applications.

### History
The concept of transactions emerged in the 1960s with airline reservation systems (like SABRE) that needed to handle concurrent bookings. Jim Gray at IBM formalized the concept of transactions in the 1970s and received the Turing Award in 1998 for his work on transaction processing. The term "ACID" was coined by Andreas Reuter and Theo Härder in 1983, though the concepts predate the acronym. Early transaction processing systems included IBM's CICS (1969) and Tandem's NonStop SQL (1979). The two-phase commit protocol was developed in the 1980s for distributed transactions. Modern databases implement sophisticated concurrency control mechanisms like Multi-Version Concurrency Control (MVCC) to handle high-traffic transactional workloads.

### ACID Properties in Detail

**Atomicity**: A transaction is treated as a single, indivisible unit. Either all operations within the transaction complete successfully, or none of them are applied. If any part fails, the entire transaction is rolled back to its state before the transaction began. This is implemented using transaction logs that record all changes, allowing the database to undo incomplete transactions.

**Consistency**: A transaction brings the database from one valid state to another. All constraints, rules, and cascades must be satisfied at the beginning and end of a transaction. If a transaction violates any constraint, it is rolled back. For example, a CHECK constraint ensuring salary > 0 must be true after every transaction.

**Isolation**: Concurrent transactions execute as if they were running sequentially. One transaction's intermediate state is not visible to other transactions. Isolation levels control the degree to which transactions are isolated: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALIZABLE. Higher isolation provides more safety but reduces concurrency.

**Durability**: Once a transaction is committed, its effects are permanent even in the event of system failure. This is achieved through write-ahead logging (WAL), where changes are written to stable storage before being applied to the database. Crash recovery mechanisms replay the log to restore committed transactions.

### Transaction Control Statements
- **BEGIN TRANSACTION** (or BEGIN): Starts a new transaction.
- **COMMIT**: Permanently saves all changes made during the transaction.
- **ROLLBACK**: Undoes all changes made during the transaction.
- **SAVEPOINT**: Creates a point within a transaction to which you can roll back.
- **ROLLBACK TO SAVEPOINT**: Rolls back to a specific savepoint without aborting the entire transaction.
- **SET TRANSACTION ISOLATION LEVEL**: Sets the isolation level for the transaction.

### Isolation Levels
- **READ UNCOMMITTED**: Lowest isolation. Allows dirty reads (reading uncommitted data from other transactions).
- **READ COMMITTED**: Prevents dirty reads. Only committed data is visible. Most common default.
- **REPEATABLE READ**: Ensures that if you read a row twice in the same transaction, you get the same values. Prevents non-repeatable reads.
- **SERIALIZABLE**: Highest isolation. Transactions execute as if serialized (one after another). Prevents phantom reads but has the lowest concurrency.

### Concurrency Problems
- **Dirty Read**: Reading data that has been modified by another transaction but not yet committed.
- **Non-Repeatable Read**: Reading the same row twice in one transaction yields different values because another transaction modified it between reads.
- **Phantom Read**: A query returns different rows because another transaction inserted or deleted rows between executions.
- **Lost Update**: Two transactions read the same row and update it based on the read, causing one update to overwrite the other.

### Advantages
- **Data Integrity**: Guarantees consistent database state.
- **Reliability**: Changes survive system failures.
- **Concurrency**: Multiple users can work simultaneously without conflicts.
- **Error Recovery**: Failed operations can be rolled back cleanly.
- **Trust**: Applications can rely on the database for correctness.

### Disadvantages
- **Performance Overhead**: Transaction management adds processing cost.
- **Locking**: High isolation levels can cause lock contention and deadlocks.
- **Complexity**: Distributed transactions across multiple databases are complex.
- **Reduced Concurrency**: Stronger isolation limits parallelism.
- **Recovery Time**: Large transactions can take time to roll back.

### Uses and Applications
- **Banking**: Transferring funds between accounts.
- **E-commerce**: Processing orders (inventory check, payment, shipping).
- **Booking Systems**: Reserving flights, hotels, or tickets.
- **Inventory Management**: Processing stock movements.
- **Any Multi-Step Operation**: Where partial completion would leave the system in an invalid state.
    `,
    codeExample: `
-- Transaction and ACID Examples

CREATE DATABASE transaction_demo;
USE transaction_demo;

CREATE TABLE accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    account_name VARCHAR(100) NOT NULL,
    balance DECIMAL(15, 2) NOT NULL CHECK (balance >= 0),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE transaction_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    from_account INT,
    to_account INT,
    amount DECIMAL(15, 2),
    status ENUM('COMMITTED', 'ROLLED_BACK', 'PENDING'),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_account) REFERENCES accounts(account_id),
    FOREIGN KEY (to_account) REFERENCES accounts(account_id)
);

-- Insert sample accounts
INSERT INTO accounts (account_name, balance) VALUES
    ('Alice Savings', 5000.00),
    ('Bob Checking', 3000.00),
    ('Charlie Business', 10000.00);

-- Basic transaction: Transfer money between accounts
START TRANSACTION;

UPDATE accounts SET balance = balance - 500.00 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 500.00 WHERE account_id = 2;

-- Log the transaction
INSERT INTO transaction_log (from_account, to_account, amount, status)
VALUES (1, 2, 500.00, 'COMMITTED');

COMMIT;

-- Verify the transfer
SELECT account_name, balance FROM accounts WHERE account_id IN (1, 2);

-- Transaction with ROLLBACK
START TRANSACTION;

UPDATE accounts SET balance = balance - 20000.00 WHERE account_id = 2;

-- This will fail due to CHECK constraint (balance >= 0)
-- The entire transaction rolls back
ROLLBACK;

-- Verify Alice's balance is unchanged
SELECT account_name, balance FROM accounts WHERE account_id = 2;

-- Transaction with SAVEPOINT
START TRANSACTION;

UPDATE accounts SET balance = balance - 100.00 WHERE account_id = 3;

SAVEPOINT after_first_deduction;

UPDATE accounts SET balance = balance - 100.00 WHERE account_id = 3;

-- Oops, second deduction was a mistake. Rollback to savepoint.
ROLLBACK TO SAVEPOINT after_first_deduction;

-- Only the first deduction is applied
COMMIT;

SELECT account_name, balance FROM accounts WHERE account_id = 3;

-- Batch transaction with error handling (MySQL syntax)
DELIMITER //
CREATE PROCEDURE safe_transfer(
    IN from_acct INT,
    IN to_acct INT,
    IN transfer_amount DECIMAL(15,2)
)
BEGIN
    DECLARE insufficient_funds CONDITION FOR SQLSTATE '45000';

    DECLARE EXIT HANDLER FOR sqlexception
    BEGIN
        ROLLBACK;
        INSERT INTO transaction_log (from_account, to_account, amount, status)
        VALUES (from_acct, to_acct, transfer_amount, 'ROLLED_BACK');
    END;

    START TRANSACTION;

    -- Check balance first
    IF (SELECT balance FROM accounts WHERE account_id = from_acct) < transfer_amount THEN
        SIGNAL sqlstate '45000'
        SET message_text = 'Insufficient funds';
    END IF;

    UPDATE accounts SET balance = balance - transfer_amount WHERE account_id = from_acct;
    UPDATE accounts SET balance = balance + transfer_amount WHERE account_id = to_acct;

    INSERT INTO transaction_log (from_account, to_account, amount, status)
    VALUES (from_acct, to_acct, transfer_amount, 'COMMITTED');

    COMMIT;
END //
DELIMITER ;

-- Use the stored procedure
CALL safe_transfer(1, 3, 250.00);

-- Check results
SELECT * FROM transaction_log ORDER BY transaction_date DESC;
    `
  },
  {
    id: "dbms-008",
    title: "Views and Stored Procedures",
    language: "sql",
    content: `
## Views and Stored Procedures

### Definition
A **view** is a virtual table based on the result set of a SQL statement. It contains no data itself but retrieves data from underlying tables when queried. Views can simplify complex queries, restrict access to specific columns or rows, and provide a consistent interface even when the underlying schema changes. A **stored procedure** is a prepared SQL code that you can save and reuse. It can accept parameters, perform operations, and return results. Stored procedures are stored in the database and executed by calling them by name.

### Introduction
Views and stored procedures are powerful database objects that improve code organization, security, and maintainability. Views abstract complex queries into simple, reusable objects. A developer can query a view just like a table, without needing to write complex JOINs every time. For example, a view named **employee_details** could join employees, departments, and locations into a single virtual table. Stored procedures encapsulate business logic at the database level. Instead of sending multiple SQL statements from the application, you can call a single procedure. This reduces network traffic, ensures consistent logic, and allows database administrators to optimize performance independently. Both views and stored procedures are fundamental to enterprise database development.

### History
Views have been part of the relational model since Codd's original work. SQL-86 included CREATE VIEW syntax. Views became widely used for security (restricting column/row access) and for simplifying complex queries in data warehouses. Stored procedures evolved from early mainframe systems. Oracle's PL/SQL (1988) and Microsoft's T-SQL (1984) brought stored procedures to mainstream relational databases. The concept was influenced by the need to reduce network round-trips in client-server architectures. Modern databases support stored procedures with procedural language features including variables, loops, conditionals, exception handling, and cursors.

### Views in Detail

**Simple Views**: Based on a single table. Can be used for INSERT, UPDATE, and DELETE operations (with restrictions).

**Complex Views**: Based on multiple tables with JOINs, aggregations, or subqueries. Generally read-only.

**Materialized Views**: Physical copies of query results stored on disk. Must be refreshed periodically. Used in data warehouses for expensive queries.

**Updatable Views**: Views that allow modification of underlying data through the view. Rules include no aggregate functions, no DISTINCT, no GROUP BY, and the view must include the primary key.

**WITH CHECK OPTION**: A constraint that ensures INSERT and UPDATE operations through the view produce rows that satisfy the view's WHERE clause.

### Stored Procedures in Detail

**Parameters**: Procedures can accept IN (input), OUT (output), and INOUT (both) parameters.

**Variables**: Local variables for intermediate calculations.

**Control Flow**: IF/ELSE, CASE, WHILE loops, FOR loops, and cursor-based iteration.

**Exception Handling**: TRY/CATCH blocks or DECLARE HANDLER for error management.

**Return Values**: Can return result sets, output parameters, or status codes.

**Transactions**: Procedures can manage transactions (BEGIN, COMMIT, ROLLBACK).

**Permissions**: Procedures can execute with the privileges of the procedure owner (EXECUTE AS).

### Advantages
- **Code Reusability**: Write once, use many times.
- **Security**: Grant access to views/procedures without exposing underlying tables.
- **Abstraction**: Hide complexity from application developers.
- **Performance**: Stored procedures are compiled and cached by the database.
- **Maintainability**: Business logic changes in one place (the database).
- **Reduced Network Traffic**: Single call instead of multiple SQL statements.

### Disadvantages
- **Vendor Lock-In**: Stored procedure syntax varies between databases.
- **Debugging Difficulty**: Debugging stored procedures is harder than application code.
- **Version Control**: Database objects need separate version control strategies.
- **Testing Complexity**: Unit testing stored procedures requires specialized tools.
- **Resource Usage**: Complex procedures can consume significant database resources.
- **Migration Challenges**: Moving stored procedures between databases is non-trivial.

### Uses and Applications
- **Data Security**: Views restrict sensitive columns (e.g., hiding salary data).
- **Report Generation**: Views pre-join tables for reporting queries.
- **Business Logic**: Stored procedures implement order processing, calculations, and validations.
- **Batch Processing**: Procedures handle large data transformations.
- **API Layer**: Stored procedures serve as an API for the database.
- **Data Warehousing**: Materialized views pre-compute expensive aggregations.
    `,
    codeExample: `
-- Views and Stored Procedures Examples

CREATE DATABASE views_sp_demo;
USE views_sp_demo;

-- Create base tables
CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10, 2),
    department_id INT,
    hire_date DATE
);

CREATE TABLE departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

CREATE TABLE projects (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(150) NOT NULL,
    budget DECIMAL(15, 2)
);

CREATE TABLE employee_projects (
    emp_id INT,
    project_id INT,
    hours_allocated INT,
    PRIMARY KEY (emp_id, project_id),
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

-- Insert sample data
INSERT INTO departments (dept_name, location) VALUES
    ('Engineering', 'Building A'),
    ('Marketing', 'Building B'),
    ('Finance', 'Building C');

INSERT INTO employees (first_name, last_name, email, salary, department_id, hire_date) VALUES
    ('Alice', 'Williams', 'alice@co.com', 95000, 1, '2021-03-15'),
    ('Bob', 'Jones', 'bob@co.com', 72000, 2, '2022-06-01'),
    ('Carol', 'Davis', 'carol@co.com', 110000, 1, '2019-01-10'),
    ('David', 'Wilson', 'david@co.com', 88000, 3, '2023-02-20');

INSERT INTO projects (project_name, budget) VALUES
    ('Website Redesign', 50000),
    ('Mobile App', 120000),
    ('Data Migration', 30000);

INSERT INTO employee_projects (emp_id, project_id, hours_allocated) VALUES
    (1, 1, 120), (1, 2, 80), (3, 2, 200), (3, 3, 60), (4, 3, 100);

-- ==========================================
-- VIEWS
-- ==========================================

-- Simple view: employee details with department
CREATE VIEW v_employee_details AS
SELECT
    e.emp_id,
    e.first_name,
    e.last_name,
    e.email,
    e.salary,
    d.dept_name,
    d.location,
    e.hire_date
FROM employees e
JOIN departments d ON e.department_id = d.dept_id;

-- Query the view like a table
SELECT * FROM v_employee_details WHERE dept_name = 'Engineering';

-- View with aggregation: department statistics
CREATE VIEW v_dept_stats AS
SELECT
    d.dept_name,
    COUNT(e.emp_id) AS employee_count,
    ROUND(AVG(e.salary), 2) AS avg_salary,
    MIN(e.salary) AS min_salary,
    MAX(e.salary) AS max_salary
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.department_id
GROUP BY d.dept_name;

SELECT * FROM v_dept_stats ORDER BY avg_salary DESC;

-- View with computed columns: project workload
CREATE VIEW v_project_workload AS
SELECT
    p.project_name,
    p.budget,
    COUNT(ep.emp_id) AS team_size,
    SUM(ep.hours_allocated) AS total_hours,
    ROUND(p.budget / NULLIF(SUM(ep.hours_allocated), 0), 2) AS cost_per_hour
FROM projects p
LEFT JOIN employee_projects ep ON p.project_id = ep.project_id
GROUP BY p.project_id, p.project_name, p.budget;

SELECT * FROM v_project_workload;

-- Materialized view equivalent (PostgreSQL syntax, MySQL uses summary tables)
-- CREATE MATERIALIZED VIEW mv_dept_summary AS
-- SELECT dept_name, COUNT(*), AVG(salary)
-- FROM v_employee_details
-- GROUP BY dept_name;

-- ==========================================
-- STORED PROCEDENCES
-- ==========================================

DELIMITER //

-- Simple stored procedure: get employees by department
CREATE PROCEDURE sp_get_employees_by_dept(
    IN p_dept_name VARCHAR(100)
)
BEGIN
    SELECT first_name, last_name, salary, hire_date
    FROM v_employee_details
    WHERE dept_name = p_dept_name
    ORDER BY last_name;
END //

-- Procedure with output parameter
CREATE PROCEDURE sp_get_dept_count(
    OUT p_total_depts INT
)
BEGIN
    SELECT COUNT(*) INTO p_total_depts FROM departments;
END //

-- Procedure with business logic: give a raise
CREATE PROCEDURE sp_give_raise(
    IN p_emp_id INT,
    IN p_percent DECIMAL(5, 2),
    OUT p_new_salary DECIMAL(10, 2)
)
BEGIN
    DECLARE v_current_salary DECIMAL(10, 2);

    SELECT salary INTO v_current_salary
    FROM employees WHERE emp_id = p_emp_id;

    IF v_current_salary IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Employee not found';
    END IF;

    SET p_new_salary = v_current_salary * (1 + p_percent / 100);

    UPDATE employees
    SET salary = p_new_salary
    WHERE emp_id = p_emp_id;
END //

-- Procedure with cursor: process all employees
CREATE PROCEDURE sp_generate_salary_report()
BEGIN
    DECLARE v_done INT DEFAULT FALSE;
    DECLARE v_name VARCHAR(100);
    DECLARE v_salary DECIMAL(10, 2);
    DECLARE v_dept VARCHAR(100);

    DECLARE emp_cursor CURSOR FOR
        SELECT first_name || ' ' || last_name, salary, dept_name
        FROM v_employee_details;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;

    CREATE TEMPORARY TABLE IF NOT EXISTS salary_report (
        employee_name VARCHAR(100),
        salary DECIMAL(10, 2),
        department VARCHAR(100),
        salary_grade VARCHAR(20)
    );

    OPEN emp_cursor;

    read_loop: LOOP
        FETCH emp_cursor INTO v_name, v_salary, v_dept;
        IF v_done THEN
            LEAVE read_loop;
        END IF;

        INSERT INTO salary_report VALUES (
            v_name,
            v_salary,
            v_dept,
            CASE
                WHEN v_salary >= 100000 THEN 'Senior'
                WHEN v_salary >= 75000 THEN 'Mid-Level'
                ELSE 'Junior'
            END
        );
    END LOOP;

    CLOSE emp_cursor;

    SELECT * FROM salary_report;
    DROP TEMPORARY TABLE salary_report;
END //

DELIMITER ;

-- Call stored procedures
CALL sp_get_employees_by_dept('Engineering');

CALL sp_get_dept_count(@total);
SELECT @total AS total_departments;

CALL sp_give_raise(1, 10.00, @new_sal);
SELECT @new_sal AS updated_salary;

CALL sp_generate_salary_report();
    `
  },
  {
    id: "dbms-009",
    title: "Database Security",
    language: "sql",
    content: `
## Database Security

### Definition
**Database security** encompasses the mechanisms, processes, and policies used to protect a database from unauthorized access, misuse, data breaches, and cyberattacks. It includes **authentication** (verifying user identity), **authorization** (granting permissions), **encryption** (protecting data at rest and in transit), **auditing** (tracking who did what), and **network security** (restricting access to database servers). Database security is a critical component of any organization's overall security posture.

### Introduction
Databases store an organization's most valuable assets: customer data, financial records, intellectual property, and operational information. A database breach can result in millions of dollars in damages, regulatory fines, legal liability, and reputational damage. The 2017 Equifax breach exposed 147 million records. The 2019 Capital One breach exposed 100 million records. These incidents underscore the importance of robust database security. Modern database security is multi-layered, involving network-level controls, database-level permissions, encryption, monitoring, and compliance with regulations like GDPR, HIPAA, PCI DSS, and SOX. Every developer and DBA must understand these concepts.

### History
Database security has evolved alongside the threats it addresses. In the 1970s and 1980s, security was primarily physical (locking the server room). The 1990s brought network-based attacks and the need for authentication and authorization mechanisms. SQL injection was first described by Jeff Forristal in 1998. The early 2000s saw a surge in data breaches, leading to regulations like SOX (2002), PCI DSS (2004), and HIPAA (enforced from 1996). The OWASP Top 10 has consistently listed injection attacks as a top threat. Today, database security includes advanced techniques like data masking, tokenization, database activity monitoring (DAM), and cloud-native security features.

### Security Layers

**Network Security**: Firewall rules, VPNs, network segmentation, and TLS/SSL for data in transit. Restrict which IP addresses can connect to the database server.

**Authentication**: Verify user identity. Methods include passwords, certificate-based authentication, LDAP/Active Directory integration, multi-factor authentication (MFA), and IAM roles (for cloud databases).

**Authorization**: Control what authenticated users can do. Uses GRANT and REVOKE to assign privileges at the database, table, column, and row levels. The principle of least privilege states that users should have only the minimum permissions needed.

**Encryption**: Protect data from being read if storage is compromised. **At-rest encryption** encrypts data on disk (Transparent Data Encryption, column-level encryption). **In-transit encryption** uses TLS/SSL for network communication. **Application-level encryption** encrypts data before it reaches the database.

**Auditing and Monitoring**: Track all database activities. Audit logs record who accessed what data, when, and from where. Database Activity Monitoring (DAM) tools provide real-time alerting on suspicious activities.

**Data Masking**: Replaces sensitive data with realistic but fake data for non-production environments. Static masking creates a masked copy. Dynamic masking hides data at query time based on user privileges.

### SQL Injection
SQL injection is an attack where malicious SQL code is inserted into application queries. It occurs when user input is concatenated directly into SQL strings without sanitization. Prevention methods include **parameterized queries** (prepared statements), **stored procedures**, **input validation**, and **ORM frameworks**.

### Common Vulnerabilities
- **Default credentials**: Using default usernames/passwords.
- **Excessive privileges**: Users with more access than needed.
- **Unpatched databases**: Known vulnerabilities left unpatched.
- **Unencrypted data**: Sensitive data stored in plain text.
- **SQL injection**: Dynamic SQL with unsanitized input.
- **Insufficient auditing**: No logging of access or changes.
- **Backup exposure**: Backups stored without encryption.

### Advantages of Database Security
- **Data Protection**: Prevents unauthorized access to sensitive data.
- **Regulatory Compliance**: Meets requirements of GDPR, HIPAA, PCI DSS.
- **Business Continuity**: Prevents data loss and corruption.
- **Trust**: Customers trust organizations with their data.
- **Reduced Liability**: Fewer breaches mean less legal and financial risk.

### Disadvantages
- **Performance Overhead**: Encryption and auditing slow down operations.
- **Complexity**: Multi-layered security is complex to implement and manage.
- **Cost**: Security tools and skilled personnel are expensive.
- **Usability Impact**: Strong security can frustrate legitimate users.
- **False Positives**: Monitoring tools may generate excessive alerts.

### Uses and Applications
- **Healthcare**: HIPAA compliance for patient records.
- **Financial Services**: PCI DSS for payment card data, SOX for financial reporting.
- **E-commerce**: Protecting customer payment information.
- **Government**: classified data protection and compliance.
- **Cloud Databases**: AWS RDS, Azure SQL, and GCP Cloud SQL security features.
    `,
    codeExample: `
-- Database Security Examples

CREATE DATABASE security_demo;
USE security_demo;

-- ==========================================
-- USER MANAGEMENT AND AUTHENTICATION
-- ==========================================

-- Create users with different access levels
CREATE USER 'app_readonly'@'localhost' IDENTIFIED BY 'SecureP@ss123!';
CREATE USER 'app_readwrite'@'localhost' IDENTIFIED BY 'SecureP@ss456!';
CREATE USER 'db_admin'@'localhost' IDENTIFIED BY 'AdminP@ss789!';

-- ==========================================
-- AUTHORIZATION: GRANT AND REVOKE
-- ==========================================

-- Grant specific privileges to readonly user
GRANT SELECT ON security_demo.* TO 'app_readonly'@'localhost';

-- Grant read/write privileges to application user
GRANT SELECT, INSERT, UPDATE, DELETE ON security_demo.* TO 'app_readwrite'@'localhost';

-- Grant full privileges to admin
GRANT ALL PRIVILEGES ON security_demo.* TO 'db_admin'@'localhost';

-- Grant column-level privileges (very specific)
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    credit_card VARCHAR(20),
    ssn VARCHAR(11),
    phone VARCHAR(20)
);

-- Readonly user can see name and email but NOT credit card or SSN
GRANT SELECT (customer_id, name, email, phone) ON security_demo.customers TO 'app_readonly'@'localhost';

-- ==========================================
-- ROW-LEVEL SECURITY (PostgreSQL syntax)
-- ==========================================

-- PostgreSQL row-level security example
-- CREATE TABLE orders (
--     order_id INT PRIMARY KEY,
--     customer_id INT,
--     order_amount DECIMAL(10,2),
--     order_date DATE
-- );
--
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY orders_customer_isolation ON orders
--     USING (customer_id = current_setting('app.current_customer_id')::INT);

-- ==========================================
-- ENCRYPTION
-- ==========================================

-- Column-level encryption (MySQL example)
CREATE TABLE sensitive_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100),
    -- Encrypted password using AES encryption
    encrypted_password VARBINARY(255),
    -- Encrypted SSN
    encrypted_ssn VARBINARY(255)
);

-- Insert with encryption
INSERT INTO sensitive_data (user_name, encrypted_password, encrypted_ssn)
VALUES
    ('alice', AES_ENCRYPT('mypassword', 'secret_key_123'), AES_ENCRYPT('123-45-6789', 'secret_key_123')),
    ('bob', AES_ENCRYPT('bobspass', 'secret_key_123'), AES_ENCRYPT('987-65-4321', 'secret_key_123'));

-- Query with decryption
SELECT
    user_name,
    CAST(AES_DECRYPT(encrypted_password, 'secret_key_123') AS CHAR) AS decrypted_password,
    CAST(AES_DECRYPT(encrypted_ssn, 'secret_key_123') AS CHAR) AS decrypted_ssn
FROM sensitive_data;

-- ==========================================
-- AUDIT LOGGING
-- ==========================================

-- Create audit log table
CREATE TABLE audit_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    table_name VARCHAR(100),
    action VARCHAR(10), -- INSERT, UPDATE, DELETE
    record_id INT,
    old_values JSON,
    new_values JSON,
    changed_by VARCHAR(100),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger-based audit logging
DELIMITER //
CREATE TRIGGER trg_customers_audit
AFTER UPDATE ON customers
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, action, record_id, old_values, new_values, changed_by)
    VALUES (
        'customers',
        'UPDATE',
        OLD.customer_id,
        JSON_OBJECT('name', OLD.name, 'email', OLD.email),
        JSON_OBJECT('name', NEW.name, 'email', NEW.email),
        CURRENT_USER()
    );
END //
DELIMITER ;

-- ==========================================
-- VIEWS FOR SECURED ACCESS
-- ==========================================

-- Create a view that hides sensitive columns
CREATE VIEW v_customer_safe AS
SELECT
    customer_id,
    name,
    email,
    phone
FROM customers;

-- Grant access only to the view, not the base table
REVOKE ALL ON security_demo.customers FROM 'app_readonly'@'localhost';
GRANT SELECT ON security_demo.v_customer_safe TO 'app_readonly'@'localhost';

-- ==========================================
-- PASSWORD POLICIES (MySQL)
-- ==========================================

-- Enforce password expiration
ALTER USER 'app_readwrite'@'localhost' PASSWORD EXPIRE INTERVAL 90 DAY;

-- Failed login attempts and account locking (MySQL 8.0+)
ALTER USER 'app_readwrite'@'localhost'
    FAILED_LOGIN_ATTEMPTS 5
    PASSWORD_LOCK_TIME 1;

-- ==========================================
-- TLS/SSL ENFORCEMENT (MySQL)
-- ==========================================

-- Require SSL for all connections
-- ALTER USER 'app_readonly'@'localhost' REQUIRE SSL;
-- ALTER USER 'app_readwrite'@'localhost' REQUIRE X509;

-- View user privileges
SHOW GRANTS FOR 'app_readonly'@'localhost';
SHOW GRANTS FOR 'app_readwrite'@'localhost';

-- Revoke privileges when no longer needed
REVOKE INSERT, UPDATE, DELETE ON security_demo.* FROM 'app_readwrite'@'localhost';
    `
  },
  {
    id: "dbms-010",
    title: "NoSQL and Modern Databases",
    language: "javascript",
    content: `
## NoSQL and Modern Databases

### Definition
**NoSQL (Not Only SQL)** refers to a broad class of database management systems that differ from traditional relational databases in their data models, query languages, and scalability characteristics. NoSQL databases are designed to handle large volumes of unstructured, semi-structured, or rapidly changing data. The four main types are **document stores** (MongoDB, CouchDB), **key-value stores** (Redis, DynamoDB), **column-family stores** (Cassandra, HBase), and **graph databases** (Neo4j, Amazon Neptune). Modern databases also include **NewSQL** systems (CockroachDB, TiDB) that combine NoSQL scalability with SQL compatibility.

### Introduction
The rise of big data, real-time web applications, cloud computing, and microservices architecture drove the development of NoSQL databases. Traditional relational databases excel at structured data with well-defined schemas, but they struggle with massive scale, flexible data models, and high-velocity writes. Social media platforms generate billions of posts, IoT devices produce terabytes of sensor data, and e-commerce sites need sub-millisecond response times. NoSQL databases address these challenges by offering horizontal scalability, flexible schemas, and specialized data models. However, NoSQL is not a replacement for relational databases. Many modern applications use **polyglot persistence**, combining multiple database types to leverage the strengths of each. Understanding when to use which database type is a critical skill for modern developers.

### History
The term NoSQL was popularized in 2009 by Johan Oskarsson during a meetup in San Francisco. However, the underlying concepts predate the name. **Object databases** in the 1980s and 1990s challenged the relational model. **Google's Bigtable** (2006) and **Amazon's Dynamo** (2007) were influential papers that inspired many NoSQL systems. MongoDB was created in 2007, Cassandra in 2008, and Redis in 2009. The early 2010s saw rapid NoSQL adoption driven by companies like Facebook, Twitter, Netflix, and Uber. By the mid-2010s, the industry recognized that both relational and non-relational databases have their place. The term **NewSQL** emerged for databases that aim to provide NoSQL scalability with ACID guarantees. Today, cloud providers offer managed versions of both SQL and NoSQL databases.

### Types of NoSQL Databases

**Document Stores**: Store data as JSON-like documents (BSON, JSON). Each document can have a different structure. Ideal for content management, user profiles, and product catalogs. Examples: MongoDB, CouchDB, Firebase Firestore.

**Key-Value Stores**: Simplest NoSQL model. Data stored as key-value pairs with O(1) lookup. Ideal for caching, session storage, and real-time leaderboards. Examples: Redis, Amazon DynamoDB, Memcached.

**Column-Family Stores**: Store data in columns rather than rows. Optimized for queries over large datasets with high write throughput. Ideal for time-series data, IoT, and analytics. Examples: Apache Cassandra, HBase, ScyllaDB.

**Graph Databases**: Store data as nodes (entities) and edges (relationships). Optimized for traversing relationships. Ideal for social networks, recommendation engines, and fraud detection. Examples: Neo4j, Amazon Neptune, ArangoDB.

### Comparison: SQL vs NoSQL

**Schema**: SQL has fixed schemas; NoSQL has dynamic/flexible schemas.
**Scaling**: SQL scales vertically (bigger server); NoSQL scales horizontally (more servers).
**Transactions**: SQL supports ACID transactions; most NoSQL databases offer eventual consistency.
**Query Language**: SQL uses structured query language; NoSQL uses API-specific queries.
**Data Model**: SQL uses tables with rows and columns; NoSQL uses documents, key-value pairs, columns, or graphs.
**Joins**: SQL supports JOINs across tables; NoSQL typically denormalizes data.

### CAP Theorem
The **CAP theorem** (Brewer's theorem) states that a distributed data store can provide only two of three guarantees simultaneously:
- **Consistency**: Every read receives the most recent write.
- **Availability**: Every request receives a response (success or failure).
- **Partition Tolerance**: The system continues to operate despite network partitions.

In practice, network partitions are unavoidable, so the real choice is between CP (consistent but may not be available during partitions) and AP (available but may return stale data during partitions).

### Advantages of NoSQL
- **Horizontal Scalability**: Easily add more servers to handle increased load.
- **Flexible Schema**: Add new fields without migrating existing data.
- **High Performance**: Optimized for specific data access patterns.
- **High Availability**: Built-in replication and fault tolerance.
- **Cost Effective**: Open-source options and commodity hardware support.
- **Developer Friendly**: Schema-less models are easier to iterate on.

### Disadvantages of NoSQL
- **Eventual Consistency**: Data may be temporarily inconsistent across nodes.
- **Limited Query Capabilities**: No JOINs, limited aggregation support.
- **No Standardized Language**: Each database has its own query API.
- **Data Duplication**: Denormalization leads to redundant data.
- **Maturity**: Some NoSQL databases lack the tooling and community of relational databases.
- **ACID Limitations**: Many NoSQL databases sacrifice transactions for performance.

### Modern Database Trends
- **Multi-Model Databases**: Support multiple data models (document + graph + key-value).
- **Serverless Databases**: Auto-scaling with pay-per-use pricing (Aurora Serverless, PlanetScale).
- **Time-Series Databases**: Specialized for IoT and metrics (InfluxDB, TimescaleDB).
- **Vector Databases**: Optimized for AI/ML embeddings (Pinecone, Weaviate, pgvector).
- **NewSQL**: SQL compatibility with NoSQL scalability (CockroachDB, TiDB, YugabyteDB).
- **Edge Databases**: Databases running at the network edge (SQLite, Durable Objects).

### Uses and Applications
- **Social Networks**: Graph databases for friend connections and feed generation.
- **E-commerce**: Document stores for product catalogs with varying attributes.
- **Gaming**: Key-value stores for leaderboards, sessions, and real-time state.
- **IoT**: Column-family stores for high-volume sensor data ingestion.
- **Content Management**: Document stores for articles, media, and metadata.
- **Real-time Analytics**: Time-series databases for monitoring and metrics.
- **AI/ML**: Vector databases for similarity search and recommendation systems.
    `,
    codeExample: `
// NoSQL Database Examples using MongoDB (via MongoDB Shell / Node.js)

// ==========================================
// MongoDB: Document Store Operations
// ==========================================

// Connect to MongoDB
// mongosh "mongodb://localhost:27017"

// Create database and collection
use ecommerce_db;

// Insert a single document
db.products.insertOne({
  name: "Wireless Mouse",
  category: "Electronics",
  price: 29.99,
  inStock: true,
  tags: ["wireless", "ergonomic", "bluetooth"],
  specs: {
    dpi: 1600,
    battery: "AA",
    weight: "120g"
  },
  reviews: [
    { user: "alice", rating: 5, comment: "Great mouse!" },
    { user: "bob", rating: 4, comment: "Good value" }
  ],
  createdAt: new Date()
});

// Insert multiple documents
db.products.insertMany([
  {
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    inStock: true,
    tags: ["mechanical", "rgb", "gaming"],
    specs: { switches: "Cherry MX Blue", layout: "Full" }
  },
  {
    name: "Desk Lamp",
    category: "Office",
    price: 45.00,
    inStock: false,
    tags: ["led", "adjustable"],
    specs: { lumens: 800, colorTemp: "3000K-6000K" }
  },
  {
    name: "USB-C Hub",
    category: "Electronics",
    price: 59.99,
    inStock: true,
    tags: ["usb-c", "multiport"],
    specs: { ports: 7, powerDelivery: true }
  }
]);

// Query documents
db.products.find({ category: "Electronics" });

db.products.find({
  price: { $lt: 60 },
  inStock: true
});

// Projection: select specific fields
db.products.find(
  { category: "Electronics" },
  { name: 1, price: 1, _id: 0 }
);

// Update documents
db.products.updateOne(
  { name: "Wireless Mouse" },
  {
    $set: { price: 24.99 },
    $push: { tags: "on-sale" }
  }
);

db.products.updateMany(
  { category: "Electronics" },
  { $inc: { price: -5.00 } }
);

// Aggregation pipeline
db.products.aggregate([
  { $match: { inStock: true } },
  { $unwind: "$tags" },
  { $group: {
      _id: "$tags",
      avgPrice: { $avg: "$price" },
      count: { $sum: 1 }
  }},
  { $sort: { count: -1 } },
  { $limit: 5 }
]);

// Delete documents
db.products.deleteOne({ name: "Desk Lamp" });

// ==========================================
// Redis: Key-Value Store (Node.js example)
// ==========================================

// const redis = require('redis');
// const client = redis.createClient();
//
// async function runRedisExamples() {
//   await client.connect();
//
//   // Set and Get
//   await client.set('user:1:name', 'Alice');
//   const name = await client.get('user:1:name');
//   console.log(name); // Alice
//
//   // Hash: Store object
//   await client.hSet('user:1', {
//     name: 'Alice',
//     email: 'alice@example.com',
//     age: '30'
//   });
//   const user = await client.hGetAll('user:1');
//   console.log(user);
//
//   // List: Queue operations
//   await client.rPush('task_queue', 'task1', 'task2', 'task3');
//   const task = await client.lPop('task_queue');
//   console.log(task); // task1
//
//   // Sorted Set: Leaderboard
//   await client.zAdd('leaderboard', [
//     { score: 1500, value: 'player1' },
//     { score: 2300, value: 'player2' },
//     { score: 1800, value: 'player3' }
//   ]);
//   const topPlayers = await client.zRangeWithScores('leaderboard', 0, -1, { REV: true });
//   console.log(topPlayers);
//
//   // Set: Unique items
//   await client.sAdd('user:1:interests', 'coding', 'gaming', 'reading');
//   const interests = await client.sMembers('user:1:interests');
//   console.log(interests);
//
//   // Expiration (TTL)
//   await client.set('session:abc123', 'active', { EX: 3600 });
//   const ttl = await client.ttl('session:abc123');
//   console.log(ttl); // seconds until expiration
//
//   await client.quit();
// }
//
// runRedisExamples();

// ==========================================
// Neo4j: Graph Database (Cypher queries)
// ==========================================

// CREATE (alice:Person {name: 'Alice', age: 30})
// CREATE (bob:Person {name: 'Bob', age: 25})
// CREATE (carol:Person {name: 'Carol', age: 35})
// CREATE (alice)-[:FRIENDS_WITH {since: 2020}]->(bob)
// CREATE (bob)-[:FRIENDS_WITH {since: 2021}]->(carol)
// CREATE (alice)-[:WORKS_AT]->(company:Company {name: 'TechCorp'})
// CREATE (bob)-[:WORKS_AT]->(company)

// Find friends of friends
// MATCH (person:Person {name: 'Alice'})-[:FRIENDS_WITH]->(friend)-[:FRIENDS_WITH]->(fof)
// WHERE NOT (person)-[:FRIENDS_WITH]->(fof) AND person <> fof
// RETURN fof.name, fof.age

// Find shortest path between two people
// MATCH path = shortestPath(
//   (alice:Person {name: 'Alice'})-[*]-(target:Person {name: 'Carol'})
// )
// RETURN path
    `
  }
]
  },

  {
    slug: "computer-networks",
    title: "Computer Networks",
    description: "TCP/IP, OSI model, routing, HTTP, and network security.",
    icon: "🌐",
    color: "from-cyan-500 to-blue-600",
    category: "Systems",
    lessons: [
  {
    id: "1",
    title: "Introduction to Computer Networks",
    content: `## Definition

A **Computer Network** is a collection of interconnected computing devices (such as computers, servers, routers, switches, and other hardware) that share resources and communicate with each other using defined protocols and communication channels. The fundamental purpose of a network is to enable **data exchange** and **resource sharing** between nodes.

A network can be as small as two devices connected via a cable or as massive as the **Internet**, which connects billions of devices worldwide. The defining characteristics of a network include: **interconnected nodes**, **shared communication protocols**, **resource sharing capability**, and **managed data flow**.

## Introduction

Computer networking forms the backbone of modern digital infrastructure. Every email sent, every webpage loaded, every video streamed, and every file transferred relies on computer networks. Understanding networking is essential for any computer science professional because it explains **how data travels** from one point to another, **how devices discover each other**, and **how security is maintained** across communication channels.

At its core, networking involves understanding several key concepts: **protocols** (rules for communication), **addresses** (unique identifiers for devices), **topologies** (physical or logical arrangement of nodes), **transmission media** (wired or wireless channels), and **network models** (frameworks that organize communication layers). This lesson lays the groundwork for all subsequent topics in computer networks.

## History

The history of computer networks spans over five decades of rapid innovation:

- **1960s - ARPANET**: The U.S. Department of Defense's Advanced Research Projects Agency (ARPA) developed ARPANET, the first wide-area packet-switching network. On October 29, 1969, the first message was sent between UCLA and Stanford Research Institute. ARPANET used **NCP** (Network Control Protocol) as its initial communication protocol.

- **1970s - Ethernet and TCP/IP**: Robert Metcalfe invented **Ethernet** in 1973 at Xerox PARC, enabling local area networking. Simultaneously, Vint Cerf and Bob Kahn developed the **TCP/IP** protocol suite, which would become the universal standard for network communication.

- **1980s - Expansion**: ARPANET adopted TCP/IP on January 1, 1983 (known as "flag day"), marking the birth of the modern Internet. The **Domain Name System (DNS)** was introduced in 1984, replacing numeric IP addresses with human-readable names.

- **1990s - The World Wide Web**: Tim Berners-Lee invented the **World Wide Web** in 1991, and with the release of the **Mosaic** browser in 1993, the Internet became accessible to the general public. Commercial ISPs began offering Internet access to households.

- **2000s - Broadband and Wireless**: High-speed broadband replaced dial-up connections. **Wi-Fi** (IEEE 802.11) became ubiquitous. Social media, cloud computing, and mobile Internet fundamentally changed how networks were used.

- **2010s-Present - Cloud, IoT, and 5G**: Cloud computing, the Internet of Things (IoT), software-defined networking (SDN), and **5G** wireless technology have pushed network capabilities to new heights.

## Advantages

1. **Resource Sharing**: Networks allow multiple users to share hardware (printers, storage), software (applications, databases), and data files, reducing costs and improving efficiency.

2. **Communication**: Email, instant messaging, video conferencing, and VoIP enable rapid communication across any distance.

3. **Centralized Management**: System administrators can manage, update, and secure all networked devices from a central location.

4. **Scalability**: Networks can grow from two devices to thousands by adding new nodes and infrastructure incrementally.

5. **Reliability and Redundancy**: Multiple paths between nodes ensure that if one link fails, data can be rerouted through alternative paths.

6. **Cost Efficiency**: Sharing resources and centralizing management significantly reduces hardware and personnel costs.

7. **Collaboration**: Multiple users can work on shared documents, databases, and projects simultaneously.

## Disadvantages

1. **Security Vulnerabilities**: Networks are susceptible to hacking, malware, phishing, denial-of-service attacks, and data breaches.

2. **Setup and Maintenance Costs**: Initial infrastructure investment (cables, switches, routers, servers) and ongoing maintenance can be expensive.

3. **Dependency and Downtime**: Network failures can halt business operations, cause data loss, and disrupt communication.

4. **Complexity**: Large networks require skilled administrators and sophisticated monitoring tools to manage effectively.

5. **Privacy Concerns**: Data transmitted across networks can be intercepted, raising concerns about user privacy and data protection.

6. **Spread of Malware**: Viruses and worms can propagate rapidly across a network, infecting multiple systems simultaneously.

## Uses and Applications

- **Internet Access and Browsing**: The most widespread use of networking, connecting billions of users to web services.
- **Enterprise LANs and WANs**: Businesses use local and wide area networks to connect offices, data centers, and remote workers.
- **Cloud Computing**: Networks connect users to cloud services (AWS, Azure, GCP) for scalable computing and storage.
- **Streaming Services**: Netflix, YouTube, Spotify, and other platforms deliver content over high-speed networks.
- **IoT and Smart Devices**: Smart homes, industrial sensors, and wearable devices all communicate through networks.
- **Healthcare**: Telemedicine, remote patient monitoring, and electronic health records rely on secure networks.
- **Education**: Online learning platforms, virtual classrooms, and digital libraries depend on network connectivity.
- **Financial Services**: Online banking, stock trading, and payment processing all require fast, secure networks.`,
    codeExample: `# ===========================================
# LESSON 1: Introduction to Computer Networks
# Basic Network Commands and Concepts
# ===========================================

# ----- Checking Network Interfaces -----
# Display all network interfaces and their IP addresses
ipconfig /all          # Windows
ifconfig -a            # Linux/macOS

# ----- Testing Network Connectivity -----
# Ping a remote host to test connectivity
ping google.com

# Ping with a specific number of packets (5 packets)
ping -n 5 google.com          # Windows
ping -c 5 google.com          # Linux/macOS

# ----- Viewing Network Routing Table -----
# Display the routing table
route print              # Windows
netstat -rn              # Linux/macOS

# ----- DNS Lookups -----
# Query DNS for a domain name
nslookup google.com

# Using dig for detailed DNS information
dig google.com           # Linux/macOS

# ----- Tracing the Path to a Remote Host -----
# Trace the route packets take to reach a destination
tracert google.com       # Windows
traceroute google.com    # Linux/macOS

# ----- Checking Active Network Connections -----
# Display all active connections and listening ports
netstat -an

# ----- Viewing Your Public IP Address -----
# Using curl to fetch your public IP
curl ifconfig.me

# ----- Network Configuration Display -----
# Show current network configuration
ipconfig                 # Windows
ip addr show             # Linux
networksetup -getinfo "Wi-Fi"  # macOS`,
    language: "bash"
  },
  {
    id: "2",
    title: "OSI & TCP/IP Models",
    content: `## Definition

The **OSI (Open Systems Interconnection) Model** is a conceptual framework developed by the International Organization for Standardization (ISO) in 1984 that standardizes the functions of a communication system into **seven abstraction layers**. The **TCP/IP (Transmission Control Protocol/Internet Protocol) Model** is the practical, four-layer model that forms the foundation of the modern Internet. Both models serve as reference architectures for understanding how data flows through a network.

The OSI model is often called the **reference model** because it provides a universal standard for network communication. The TCP/IP model, also known as the **Internet Protocol Suite**, is the actual implementation that powers the Internet. While the OSI model is more granular with seven layers, the TCP/IP model consolidates some layers into four, reflecting real-world protocol implementations.

## Introduction

Understanding network models is critical because they provide a **structured way to think about communication**. Each layer has specific responsibilities and communicates with the layers directly above and below it through well-defined interfaces. This **layered approach** allows:

- **Modularity**: Each layer can be developed, tested, and updated independently.
- **Interoperability**: Different vendors can implement different layers that work together.
- **Troubleshooting**: Problems can be isolated to specific layers.
- **Abstraction**: Higher layers don't need to understand the implementation details of lower layers.

The relationship between the two models is important: the **OSI 7-layer model** maps to the **TCP/IP 4-layer model** roughly as follows. OSI Layers 5-7 (Session, Presentation, Application) combine into TCP/IP's Application Layer. OSI Layer 4 (Transport) maps directly to TCP/IP's Transport Layer. OSI Layers 3 (Network) maps to TCP/IP's Internet Layer. OSI Layers 1-2 (Physical, Data Link) combine into TCP/IP's Network Access Layer.

## History

The development of these models was driven by different needs at different times:

**OSI Model History:**
- In the late 1970s, the **ISO** began working on a universal networking standard to replace the fragmented landscape of proprietary protocols.
- In 1984, the OSI model was published as **ISO 7498**.
- The model was designed to be protocol-independent, meaning it could describe any communication system.
- Despite its theoretical elegance, the OSI model was slow to gain adoption because TCP/IP was already widely deployed.
- Today, the OSI model is primarily used as a **teaching and reference framework** rather than a practical implementation guide.

**TCP/IP Model History:**
- In the 1970s, **Vint Cerf and Bob Kahn** developed TCP/IP as part of the ARPANET project.
- The original TCP/IP had four layers: Network Access, Internet, Transport, and Application.
- On **January 1, 1983**, ARPANET switched from NCP to TCP/IP, a moment known as "flag day."
- TCP/IP was designed to be **robust and fault-tolerant**, able to survive partial network failures.
- The Internet Engineering Task Force (IETF) continues to evolve TCP/IP through **RFCs** (Requests for Comments).

## OSI Model Layers (7 Layers)

1. **Layer 7 - Application Layer**: Provides network services directly to end-user applications. Protocols include HTTP, FTP, SMTP, DNS, and SNMP. This layer handles high-level APIs, resource identification, and communication initialization.

2. **Layer 6 - Presentation Layer**: Handles data translation, encryption/decryption, compression, and formatting. It ensures that data from the application layer of one system is readable by the application layer of another. Examples include SSL/TLS encryption, JPEG/MPEG encoding, and ASCII/Unicode translation.

3. **Layer 5 - Session Layer**: Manages sessions (dialogues) between applications. It establishes, maintains, synchronizes, and terminates connections. Examples include NetBIOS, RPC (Remote Procedure Call), and SQL session management.

4. **Layer 4 - Transport Layer**: Provides end-to-end communication, flow control, error recovery, and data segmentation. Key protocols are **TCP** (reliable, connection-oriented) and **UDP** (unreliable, connectionless). Uses **port numbers** to identify applications.

5. **Layer 3 - Network Layer**: Handles logical addressing and routing. Determines the best path for data to travel from source to destination across multiple networks. Key protocols include **IP** (IPv4, IPv6), **ICMP**, and routing protocols like **OSPF** and **BGP**.

6. **Layer 2 - Data Link Layer**: Provides node-to-node data transfer and handles error detection/correction from the physical layer. Uses **MAC addresses** for device identification. Key technologies include **Ethernet** (IEEE 802.3), **Wi-Fi** (IEEE 802.11), and switches.

7. **Layer 1 - Physical Layer**: Deals with the physical transmission of raw bits over a communication channel. Covers cables (fiber, copper), connectors (RJ-45, SC), signaling (voltage levels, light pulses), and data rates.

## TCP/IP Model Layers (4 Layers)

1. **Network Access Layer**: Combines OSI Layers 1-2. Handles the physical transmission of data and the data link layer protocols (Ethernet, Wi-Fi, ARP).

2. **Internet Layer**: Maps to OSI Layer 3. Responsible for logical addressing (IP) and routing packets across network boundaries. Key protocols: **IPv4**, **IPv6**, **ICMP**, **ARP**.

3. **Transport Layer**: Maps to OSI Layer 4. Provides end-to-end communication services. **TCP** for reliable delivery, **UDP** for fast, lightweight delivery.

4. **Application Layer**: Combines OSI Layers 5-7. Contains all high-level protocols: HTTP, HTTPS, FTP, SMTP, DNS, SSH, Telnet, SNMP, and DHCP.

## Advantages

1. **Standardization**: Both models provide a universal framework that enables different systems and vendors to communicate.
2. **Modularity**: Each layer can be modified or upgraded without affecting other layers.
3. **Troubleshooting**: The layered approach allows network engineers to isolate problems to specific layers.
4. **Interoperability**: Different hardware and software from various vendors can work together using standardized protocols.
5. **Educational Value**: The OSI model provides an excellent framework for teaching and understanding networking concepts.
6. **Abstraction**: Layers hide implementation details, allowing developers to focus on their specific layer.

## Disadvantages

1. **Theoretical Nature of OSI**: The OSI model is largely theoretical; no network strictly implements all seven layers as described.
2. **Complexity**: The 7-layer OSI model can be overly complex for simple networking tasks.
3. **Protocol Overhead**: Each layer adds headers and potentially trailers to data, increasing overhead.
4. **Performance Impact**: Processing at multiple layers introduces latency compared to a monolithic design.
5. **TCP/IP Dominance**: The TCP/IP model's practical nature has made the OSI model somewhat redundant in industry.
6. **Layer Boundaries Are Blurry**: In practice, some protocols operate across multiple layers, making strict layering difficult.

## Uses and Applications

- **Network Design**: Architects use these models to design scalable, modular network infrastructures.
- **Protocol Development**: Engineers use the models as frameworks when developing new networking protocols.
- **Troubleshooting**: Network administrators use the layered approach to systematically diagnose issues (starting from Layer 1 and working up).
- **Certification Studies**: Both models are fundamental to certifications like CompTIA Network+, CCNA, and CISSP.
- **Vendor Communication**: The models provide a common language for discussing network architecture across organizations.
- **Security Analysis**: Security professionals analyze vulnerabilities at each layer to build defense-in-depth strategies.`,
    codeExample: `# ===========================================
# LESSON 2: OSI & TCP/IP Models
# Layered Network Diagnostics
# ===========================================

# ----- LAYER 1 (Physical) Diagnostics -----
# Check if network adapter is detected and active
ipconfig | findstr "Adapter"          # Windows
ip link show                         # Linux

# Check link status (speed, duplex, connection)
ethtool eth0                         # Linux
Get-NetAdapter                       # PowerShell

# ----- LAYER 2 (Data Link) Diagnostics -----
# View ARP cache (IP-to-MAC mappings)
arp -a

# Clear the ARP cache
arp -d *                             # Windows (run as admin)

# ----- LAYER 3 (Network) Diagnostics -----
# Test basic IP connectivity
ping 8.8.8.8

# Trace the route to a destination
tracert 8.8.8.8                      # Windows
traceroute 8.8.8.8                   # Linux/macOS

# Display the routing table
route print                          # Windows
ip route show                        # Linux

# ----- LAYER 4 (Transport) Diagnostics -----
# Test TCP connectivity on a specific port
Test-NetConnection google.com -Port 443    # PowerShell
telnet google.com 443                      # If telnet installed

# Check listening ports
netstat -an | findstr LISTENING       # Windows
ss -tlnp                             # Linux

# ----- LAYER 5-7 (Application) Diagnostics -----
# Test HTTP connectivity
curl -I https://google.com

# Test DNS resolution (Application Layer)
nslookup google.com
dig google.com A                     # Linux/macOS

# Test SMTP connectivity
Test-NetConnection mail.example.com -Port 25

# ----- OSI Model Layer Visualization -----
# Display the 7 OSI layers with their functions
Write-Host "OSI Model Reference:"
Write-Host "Layer 7: Application  - HTTP, FTP, SMTP, DNS"
Write-Host "Layer 6: Presentation - SSL/TLS, JPEG, ASCII"
Write-Host "Layer 5: Session      - NetBIOS, RPC"
Write-Host "Layer 4: Transport    - TCP, UDP"
Write-Host "Layer 3: Network      - IP, ICMP, OSPF"
Write-Host "Layer 2: Data Link    - Ethernet, Wi-Fi, ARP"
Write-Host "Layer 1: Physical     - Cables, Signals, Bits"

# ----- TCP/IP Model Reference -----
Write-Host ""
Write-Host "TCP/IP Model Reference:"
Write-Host "Layer 4: Application    = OSI Layers 5-7"
Write-Host "Layer 3: Transport      = OSI Layer 4"
Write-Host "Layer 2: Internet       = OSI Layer 3"
Write-Host "Layer 1: Network Access = OSI Layers 1-2"`,
    language: "bash"
  },
  {
    id: "3",
    title: "Physical & Data Link Layer",
    content: `## Definition

The **Physical Layer (Layer 1)** is the lowest layer of the OSI model, responsible for the transmission and reception of **raw unstructured bit streams** over a physical medium. It defines the electrical, mechanical, and procedural specifications for activating and maintaining the physical link. The **Data Link Layer (Layer 2)** provides **reliable node-to-node data transfer** across a physical link, detecting and possibly correcting errors that may occur at the Physical Layer.

The Physical Layer deals with voltages, cable specifications, connector types, data rates, and signal encoding. The Data Link Layer introduces the concept of **frames** (structured data units), **MAC addresses** (hardware addresses), and **error detection** mechanisms. Together, these two layers form the foundation of all network communication.

## Introduction

Without a solid understanding of the Physical and Data Link layers, higher-level networking concepts cannot be fully grasped. These layers answer the fundamental question: **How do bits actually travel from one device to another?**

At the Physical Layer, data exists as **electrical signals** (in copper cables), **light pulses** (in fiber optics), or **radio waves** (in wireless). At the Data Link Layer, bits are organized into **frames**, and devices are identified by their unique **MAC addresses**. Switches operate at the Data Link Layer, forwarding frames based on MAC address tables.

Key concepts include: **encoding schemes** (NRZ, Manchester, 4B/5B), **transmission modes** (simplex, duplex, multiplexing), **media types** (UTP, fiber, wireless), **error detection** (CRC, checksums), and **media access control** (CSMA/CD, CSMA/CA).

## History

The evolution of these layers reflects the history of telecommunications and computing:

**Physical Layer History:**
- **1830s - Telegraph**: Samuel Morse's telegraph was the first electrical communication system, encoding information as dots and dashes (a simple Physical Layer protocol).
- **1876 - Telephone**: Alexander Graham Bell's telephone introduced analog voice transmission over copper wires.
- **1970s - Ethernet**: Robert Metcalfe developed Ethernet at Xerox PARC, initially at 2.94 Mbps over coaxial cable.
- **1990s - Fiber Optics**: Fiber optic technology matured, enabling gigabit and terabit data rates over long distances.
- **2000s - Wi-Fi Revolution**: IEEE 802.11 standards made wireless networking mainstream.
- **2010s-Present**: Technologies like **Li-Fi** (light-based communication), **5G NR** (New Radio), and **Wi-Fi 6/7** push physical layer capabilities further.

**Data Link Layer History:**
- **1973 - Ethernet**: The original Ethernet protocol defined the CSMA/CD (Carrier Sense Multiple Access with Collision Detection) access method.
- **1979 - IEEE 802 Committee**: Formed to standardize local area networks.
- **1983 - IEEE 802.3**: Published the first Ethernet standard.
- **1997 - IEEE 802.11**: Released the first Wi-Fi standard.
- **1990s - Switches Replaced Hubs**: The transition from shared media (hubs) to switched networks dramatically improved performance by eliminating collisions.
- **2000s - VLANs**: IEEE 802.1Q introduced Virtual LANs, allowing logical segmentation at the Data Link Layer.

## Physical Layer Details

### Transmission Media
1. **Twisted Pair Cable (UTP/STP)**: Most common LAN cable. Categories include Cat5e (1 Gbps), Cat6 (10 Gbps up to 55m), Cat6a (10 Gbps up to 100m), and Cat8 (25-40 Gbps).
2. **Coaxial Cable**: Used for cable TV and early Ethernet (10BASE2, 10BASE5). Features a copper conductor surrounded by insulation and a metal shield.
3. **Fiber Optic Cable**: Uses light pulses for transmission. **Single-mode fiber** (long distance, up to 100km) and **multi-mode fiber** (short distance, up to 2km). Speeds up to 400 Gbps.
4. **Wireless (Radio)**: IEEE 802.11 standards (Wi-Fi), Bluetooth, cellular (4G/5G), satellite.

### Key Physical Layer Concepts
- **Bit Rate**: The number of bits transmitted per second (e.g., 1 Gbps, 10 Gbps).
- **Bandwidth**: The range of frequencies available for transmission.
- **Signal Encoding**: Methods like NRZ, Manchester, 4B/5B, 8B/10B that convert bits to signals.
- **Modulation**: Varying a carrier signal's amplitude, frequency, or phase to encode data.
- **Multiplexing**: FDM, TDM, WDM allow multiple signals to share a single medium.

## Data Link Layer Details

### Sub-layers
The Data Link Layer is divided into two sub-layers by IEEE:
1. **LLC (Logical Link Control - IEEE 802.2)**: Provides flow control, error detection, and multiplexing of protocols.
2. **MAC (Media Access Control)**: Handles physical addressing (MAC addresses) and controls how devices access the shared medium.

### MAC Addresses
- **48-bit** (6-byte) hardware address, typically written as **XX:XX:XX:XX:XX:XX** in hexadecimal.
- First 3 bytes identify the manufacturer (**OUI - Organizationally Unique Identifier**).
- Last 3 bytes are assigned by the manufacturer.
- **Unicast**: Frames sent to a single device (destination MAC has bit 0 of first byte = 0).
- **Broadcast**: Frames sent to all devices (destination MAC = FF:FF:FF:FF:FF:FF).
- **Multicast**: Frames sent to a group of devices (destination MAC has bit 0 of first byte = 1).

### Key Data Link Layer Protocols
- **Ethernet (IEEE 802.3)**: The dominant LAN technology. Uses CSMA/CD for shared media or full-duplex switching.
- **Wi-Fi (IEEE 802.11)**: Wireless LAN standard using CSMA/CA (Collision Avoidance).
- **PPP (Point-to-Point Protocol)**: Used for direct connections between two nodes.
- **ARP (Address Resolution Protocol)**: Maps IP addresses to MAC addresses (bridges Layers 2 and 3).

### Error Detection
- **CRC (Cyclic Redundancy Check)**: Applied to the frame trailer. The sender computes a CRC value and appends it; the receiver recomputes and compares.
- **Checksum**: Simpler but less robust than CRC.
- **FCS (Frame Check Sequence)**: The CRC field in Ethernet frames.

## Advantages

1. **Foundation of Communication**: All higher-layer protocols depend on these layers for actual data transmission.
2. **Error Detection**: The Data Link Layer catches transmission errors before they propagate upward.
3. **Hardware Independence**: Higher layers don't need to know the specifics of the physical medium.
4. **Standardization**: Well-defined standards (Ethernet, Wi-Fi) ensure interoperability between vendors.
5. **Efficiency**: Hardware-based switching at the Data Link Layer provides wire-speed forwarding.
6. **Security Features**: MAC address filtering, port security, and VLAN segmentation provide basic security.

## Disadvantages

1. **Limited Range**: Physical layer technologies are constrained by cable length and signal attenuation.
2. **Bandwidth Limitations**: Each medium has a maximum theoretical data rate.
3. **Vulnerability to Interference**: Electromagnetic interference (EMI), crosstalk, and environmental factors can corrupt signals.
4. **MAC Spoofing**: MAC addresses can be spoofed, undermining security based on hardware addresses.
5. **Complexity of Wireless**: Wireless signals are prone to interference, multipath fading, and security threats.
6. **Collision Domain Issues**: In shared media environments (hubs), collisions reduce effective throughput.

## Uses and Applications

- **Local Area Networks (LANs)**: Ethernet connects devices within a building or campus.
- **Wide Area Networks (WANs)**: Fiber optic links connect distant networks.
- **Wireless Networking**: Wi-Fi provides wireless connectivity in homes, offices, and public spaces.
- **Data Centers**: High-speed Ethernet (25G, 40G, 100G, 400G) connects servers and storage.
- **Home Networking**: Routers, switches, and access points form home networks.
- **Industrial Networks**: Industrial Ethernet and specialized protocols connect factory equipment.
- **Telecommunications**: Fiber optic backbones carry Internet traffic across continents and oceans.`,
    codeExample: `# ===========================================
# LESSON 3: Physical & Data Link Layer
# Hardware and Link Layer Diagnostics
# ===========================================

# ----- Physical Layer Diagnostics -----
# View all network adapters and their status
Get-NetAdapter                           # PowerShell
ip link show                             # Linux

# Check link speed and status for a specific adapter
Get-NetAdapter -Name "Ethernet" | Select-Object Name, LinkSpeed, Status
ethtool eth0                             # Linux (shows speed, duplex, link detected)

# Check cable type and physical connection
Get-NetAdapterAdvancedProperty -Name "Ethernet" -DisplayName "Speed & Duplex"

# ----- Data Link Layer (MAC Address) -----
# Display MAC addresses for all interfaces
getmac                                   # Windows
ip link show                             # Linux/macOS

# View the ARP table (IP-to-MAC mappings)
arp -a

# Ping a device to populate ARP cache, then check
ping 192.168.1.1
arp -a | findstr 192.168.1.1

# ----- Switch and VLAN Information -----
# Display VLAN configuration
Get-NetAdapter -Name "Ethernet" | Get-NetAdapterAdvancedProperty -DisplayName "VLAN ID"

# Show MAC address table on a Cisco switch (if accessible)
# show mac address-table

# ----- Wi-Fi Physical Layer -----
# Show wireless network details
netsh wlan show interfaces                # Windows
iwconfig                                  # Linux

# List available wireless networks
netsh wlan show networks                  # Windows
iwlist wlan scanning                      # Linux

# Show Wi-Fi signal strength and channel
netsh wlan show interfaces | findstr "Signal Channel"

# ----- Frame Analysis with PowerShell -----
# Capture and analyze network frames (requires admin)
# Using built-in tools for link-layer inspection
Get-NetAdapter | Format-Table Name, MacAddress, LinkSpeed, Status

# ----- Diagnosing Physical Layer Issues -----
# Test cable connectivity
Test-Connection -ComputerName 192.168.1.1 -Count 4

# Check for network adapter errors
Get-NetAdapterStatistics -Name "Ethernet"

# View detailed adapter properties
Get-NetAdapter -Name "Ethernet" | Format-List *`,
    language: "bash"
  },
  {
    id: "4",
    title: "Network Layer & IP Addressing",
    content: `## Definition

The **Network Layer (Layer 3)** is responsible for **logical addressing**, **routing**, and **packet forwarding** across multiple networks. It determines the best path for data to travel from source to destination, potentially crossing multiple intermediate networks. The primary protocol at this layer is the **Internet Protocol (IP)**, which comes in two versions: **IPv4** (32-bit addresses) and **IPv6** (128-bit addresses).

IP addressing is the mechanism by which every device on a network is assigned a unique numerical identifier. An **IPv4 address** is written in **dotted-decimal notation** (e.g., **192.168.1.100**), with each octet ranging from 0 to 255. An **IPv6 address** is written in **hexadecimal notation** with colons (e.g., **2001:0db8:85a3::8a2e:0370:7334**). Subnetting, CIDR notation, and routing protocols all operate at this layer.

## Introduction

The Network Layer is where the magic of **internetworking** happens. While the Data Link Layer handles communication within a single network segment, the Network Layer enables communication **across** network segments. This is achieved through:

- **Logical Addressing (IP)**: Every device gets a unique address that identifies its network and host position.
- **Routing**: Routers use routing tables and protocols to determine the optimal path for packets.
- **Fragmentation and Reassembly**: Large packets are broken into smaller fragments that can traverse different network types.
- **Quality of Service (QoS)**: Different types of traffic can be prioritized.

Key concepts include **subnetting**, **CIDR (Classless Inter-Domain Routing)**, **NAT (Network Address Translation)**, **DHCP (Dynamic Host Configuration Protocol)**, **ICMP (Internet Control Message Protocol)**, and routing protocols like **OSPF**, **BGP**, and **RIP**.

## History

The development of IP addressing has evolved through several key milestones:

- **1981 - IPv4 Introduced**: The Internet Protocol version 4 was standardized in **RFC 791** by Jon Postel. It provided 32-bit addresses, allowing approximately **4.3 billion** unique addresses.
- **1980s - Classful Addressing**: Initially, IP addresses were divided into classes (A, B, C, D, E) with fixed network/host boundaries. Class A networks had 8-bit prefixes, Class B had 16-bit, and Class C had 24-bit.
- **1993 - CIDR**: **RFC 1519** introduced Classless Inter-Domain Routing, replacing classful addressing with variable-length subnet masks. This dramatically improved address utilization.
- **1998 - NAT**: **RFC 1631** (later updated to RFC 3022) introduced Network Address Translation, allowing multiple private devices to share a single public IP address.
- **1998 - IPv6 Designed**: **RFC 2460** (later updated to RFC 8200) introduced IPv6 with 128-bit addresses, providing approximately **3.4 x 10^38** addresses.
- **2000s-Present**: IPv6 adoption has been gradual but accelerating. As of 2024, approximately 40% of Internet traffic uses IPv6.

## IPv4 Addressing

### Address Structure
An IPv4 address is 32 bits, written as four decimal numbers separated by dots. Each octet represents 8 bits.

Example: **192.168.1.100**
- Binary: **11000000.10101000.00000001.01100100**
- First part (192.168.1) = **Network portion**
- Last part (100) = **Host portion**

### CIDR Notation
CIDR (Classless Inter-Domain Routing) uses a suffix to indicate the number of network bits:
- **192.168.1.0/24**: Network mask is 255.255.255.0 (24 network bits, 8 host bits)
- **10.0.0.0/8**: Network mask is 255.0.0.0 (8 network bits, 24 host bits)
- **172.16.0.0/12**: Network mask is 255.240.0.0 (12 network bits, 20 host bits)

### Private IP Address Ranges
- **10.0.0.0/8** (10.0.0.0 to 10.255.255.255)
- **172.16.0.0/12** (172.16.0.0 to 172.31.255.255)
- **192.168.0.0/16** (192.168.0.0 to 192.168.255.255)

### Special Addresses
- **127.0.0.1**: Loopback (localhost)
- **0.0.0.0**: Default route / unspecified
- **255.255.255.255**: Limited broadcast
- **169.254.x.x**: Link-local (APIPA)

## IPv6 Addressing

### Address Structure
IPv6 addresses are 128 bits, written in hexadecimal with colon separators. Leading zeros within a group can be omitted, and consecutive zero groups can be replaced with **::** (only once).

Example: **2001:0db8:85a3:0000:0000:8a2e:0370:7334**
Compressed: **2001:db8:85a3::8a2e:370:7334**

### Key Improvements Over IPv4
- **Larger Address Space**: 128 bits vs 32 bits (3.4 x 10^38 vs 4.3 billion addresses).
- **Simplified Header**: Fixed 40-byte header reduces processing overhead.
- **No NAT Required**: Every device can have a globally unique address.
- **Built-in Security**: IPsec support is mandatory in IPv6.
- **Auto-Configuration**: SLAAC (Stateless Address Auto-Configuration) allows devices to configure themselves.
- **No Broadcast**: Uses multicast and anycast instead.

## Subnetting

Subnetting is the practice of dividing a network into smaller sub-networks (subnets) for improved performance, security, and management.

**Example Subnetting:**
Given **192.168.1.0/24**, create 4 subnets:
- Each subnet needs 2 bits from the host portion (2^2 = 4 subnets)
- New mask: **/26** (255.255.255.192)
- Subnet 1: **192.168.1.0/26** (hosts: 1-62)
- Subnet 2: **192.168.1.64/26** (hosts: 65-126)
- Subnet 3: **192.168.1.128/26** (hosts: 129-190)
- Subnet 4: **192.168.1.192/26** (hosts: 193-254)

## Routing

Routing is the process of selecting the best path for network traffic:

- **Static Routing**: Manually configured routes. Simple but doesn't adapt to changes.
- **Dynamic Routing**: Routers exchange information and automatically adjust routes.
  - **RIP (Routing Information Protocol)**: Distance-vector protocol, max 15 hops.
  - **OSPF (Open Shortest Path First)**: Link-state protocol, uses Dijkstra's algorithm.
  - **BGP (Border Gateway Protocol)**: Path-vector protocol, the protocol of the Internet backbone.
  - **EIGRP (Enhanced Interior Gateway Routing Protocol)**: Cisco proprietary, hybrid protocol.

## Advantages

1. **Logical Addressing**: Enables unique identification of devices across the entire Internet.
2. **Routing**: Multiple paths between networks provide redundancy and load balancing.
3. **Subnetting**: Allows efficient address allocation and network segmentation.
4. **NAT**: Conserves public IP addresses by allowing multiple devices to share one address.
5. **Interoperability**: IP works across all types of physical networks (Ethernet, Wi-Fi, fiber, satellite).
6. **Scalability**: The Internet's hierarchical routing structure scales to billions of devices.

## Disadvantages

1. **IPv4 Address Exhaustion**: The 32-bit address space is insufficient for modern demands (mitigated by NAT and IPv6).
2. **Complexity**: Subnetting and routing protocols require significant expertise.
3. **Security Vulnerabilities**: IP spoofing, routing attacks (BGP hijacking), and ICMP-based attacks.
4. **NAT Limitations**: Breaks end-to-end connectivity, complicates peer-to-peer applications.
5. **IPv6 Adoption Challenges**: Dual-stack requirements, legacy equipment, and training needs slow adoption.
6. **Latency**: Routing decisions and packet processing add overhead.

## Uses and Applications

- **Internet Routing**: BGP routers across the Internet exchange routing information to deliver packets globally.
- **Enterprise Networks**: Large organizations use OSPF or EIGRP for internal routing and BGP for Internet connectivity.
- **Cloud Networking**: VPCs (Virtual Private Clouds) use IP addressing and routing for isolated cloud environments.
- **VPN Tunnels**: IP-in-IP encapsulation enables secure remote access across public networks.
- **IoT Networks**: Many IoT protocols (CoAP, MQTT) operate over IP, enabling smart device communication.
- **Content Delivery Networks (CDNs)**: DNS-based routing directs users to the nearest content server.`,
    codeExample: `# ===========================================
# LESSON 4: Network Layer & IP Addressing
# IP Configuration, Subnetting, and Routing
# ===========================================

# ----- View Current IP Configuration -----
# Windows
ipconfig /all

# Linux
ip addr show
ifconfig -a

# ----- Assign a Static IP Address -----
# Windows (PowerShell - Run as Administrator)
New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 192.168.1.100 -PrefixLength 24 -DefaultGateway 192.168.1.1
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 8.8.8.8, 8.8.4.4

# Linux
sudo ip addr add 192.168.1.100/24 dev eth0
sudo ip route add default via 192.168.1.1

# ----- Subnetting Calculator -----
# Calculate subnet information from a CIDR notation
# Example: For 192.168.1.0/26
Write-Host "Network: 192.168.1.0/26"
Write-Host "Subnet Mask: 255.255.255.192"
Write-Host "Host Range: 192.168.1.1 - 192.168.1.62"
Write-Host "Broadcast: 192.168.1.63"
Write-Host "Usable Hosts: 62"

# ----- Convert IP to Binary -----
function ConvertTo-BinaryIP {
    param([string]$ip)
    $octets = $ip.Split('.')
    $binary = $octets | ForEach-Object {
        [Convert]::ToString([int]$_ , 2).PadLeft(8, '0')
    }
    return $binary -join '.'
}
Write-Host (ConvertTo-BinaryIP "192.168.1.100")

# ----- Routing Table Commands -----
# View routing table
route print                            # Windows
ip route show                          # Linux
netstat -rn                            # macOS

# Add a static route
route add 10.0.0.0 mask 255.0.0.0 192.168.1.1       # Windows
sudo ip route add 10.0.0.0/8 via 192.168.1.1         # Linux

# Remove a static route
route delete 10.0.0.0                               # Windows
sudo ip route del 10.0.0.0/8                        # Linux

# ----- Traceroute (Path Discovery) -----
tracert google.com                     # Windows
traceroute google.com                  # Linux/macOS

# ----- DHCP Operations -----
# Release and renew IP address
ipconfig /release                      # Windows
ipconfig /renew                        # Windows

# Linux
sudo dhclient -r eth0                  # Release
sudo dhclient eth0                     # Renew

# ----- DNS Resolution -----
nslookup google.com
Resolve-DnsName google.com             # PowerShell

# ----- IP Conflict Detection -----
# Test if an IP is already in use
Test-Connection -ComputerName 192.168.1.100 -Count 1 -Quiet`,
    language: "bash"
  },
  {
    id: "5",
    title: "Transport Layer (TCP/UDP)",
    content: `## Definition

The **Transport Layer (Layer 4)** provides **end-to-end communication** between applications running on different hosts. It is responsible for **segmentation**, **flow control**, **error recovery**, and **multiplexing** (using port numbers). The two primary protocols at this layer are **TCP (Transmission Control Protocol)** and **UDP (User Datagram Protocol)**.

**TCP** is a **connection-oriented**, **reliable** protocol that ensures data is delivered in order, without errors, and without duplication. **UDP** is a **connectionless**, **unreliable** protocol that provides fast, lightweight delivery without guarantees. The choice between TCP and UDP depends on the application's requirements for reliability versus speed.

## Introduction

The Transport Layer bridges the gap between the Network Layer (which handles packet routing) and the Application Layer (which uses data). While the Network Layer is responsible for getting packets from source to destination, the Transport Layer ensures that the data is **usable by the receiving application**.

Key responsibilities of the Transport Layer include:

- **Segmentation and Reassembly**: Breaking large messages into smaller segments (TCP) or datagrams (UDP) and reassembling them at the destination.
- **Port Multiplexing**: Using port numbers (0-65535) to distinguish between different applications on the same host.
- **Flow Control**: Preventing a fast sender from overwhelming a slow receiver (TCP uses sliding window).
- **Error Detection**: Detecting corrupted data using checksums (both TCP and UDP).
- **Connection Management**: TCP establishes connections through a three-way handshake and terminates them gracefully.

Understanding the difference between TCP and UDP is fundamental to network programming and application design.

## History

The Transport Layer protocols evolved alongside the Internet:

- **1974 - TCP Concept**: Vint Cerf and Bob Kahn published their seminal paper describing the concepts of TCP in their paper "A Protocol for Packet Network Intercommunication."
- **1981 - TCP/IP Standardized**: TCP and IP were separated into distinct protocols. TCP was defined in **RFC 793**, and UDP was defined in **RFC 768**.
- **1988 - TCP Congestion Control**: Van Jacobson introduced congestion control algorithms to prevent network collapse, addressing the "congestion collapse" problem.
- **1990s - TCP Variants**: Various TCP implementations emerged to optimize for different network conditions: **TCP Tahoe** (1988), **TCP Reno** (1990), **TCP NewReno** (1999), and **TCP SACK** (Selective Acknowledgment).
- **2000s - Modern TCP**: **TCP CUBIC** (2006) became the default congestion control algorithm in Linux and Windows. **QUIC** was developed by Google in 2012, running over UDP to reduce latency.
- **2010s-Present**: **QUIC** became an IETF standard (**RFC 9000**) in 2021, forming the basis of **HTTP/3**. **BBR** (Bottleneck Bandwidth and Round-trip propagation time) congestion control was developed by Google.

## TCP (Transmission Control Protocol)

### Connection Establishment: Three-Way Handshake
1. **SYN**: Client sends a SYN (Synchronize) segment with an initial sequence number (ISN).
2. **SYN-ACK**: Server responds with SYN-ACK (Synchronize-Acknowledgment), acknowledging the client's ISN and sending its own.
3. **ACK**: Client sends an ACK, completing the connection establishment.

### Connection Termination: Four-Way Handshake
1. **FIN**: One side sends a FIN (Finish) segment.
2. **ACK**: Other side acknowledges the FIN.
3. **FIN**: Other side sends its own FIN.
4. **ACK**: Original side acknowledges and connection closes.

### TCP Header Fields
- **Source Port** (16 bits): Port number of the sender.
- **Destination Port** (16 bits): Port number of the receiver.
- **Sequence Number** (32 bits): Byte offset of the first data byte in this segment.
- **Acknowledgment Number** (32 bits): Next expected byte from the sender.
- **Header Length** (4 bits): Size of the TCP header in 32-bit words.
- **Flags** (6 bits): SYN, ACK, FIN, RST, PSH, URG.
- **Window Size** (16 bits): Flow control window (number of bytes the receiver is willing to accept).
- **Checksum** (16 bits): Error detection for header and data.
- **Urgent Pointer** (16 bits): Points to urgent data (if URG flag set).

### Key TCP Features
- **Reliable Delivery**: ACKs, retransmissions, and sequence numbers guarantee data arrives correctly.
- **Ordered Delivery**: Segments are reassembled in order using sequence numbers.
- **Flow Control**: Sliding window mechanism prevents buffer overflow.
- **Congestion Control**: Algorithms (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery) prevent network congestion.

## UDP (User Datagram Protocol)

### UDP Header (8 bytes - much simpler than TCP)
- **Source Port** (16 bits): Sender's port (optional, set to 0 if unused).
- **Destination Port** (16 bits): Receiver's port.
- **Length** (16 bits): Length of the UDP header and data.
- **Checksum** (16 bits): Error detection (optional in IPv4, mandatory in IPv6).

### Key UDP Features
- **Connectionless**: No handshake; data is sent immediately.
- **No Ordering**: Segments may arrive out of order.
- **No Reliability**: Lost packets are not retransmitted.
- **No Flow Control**: Sender can overwhelm the receiver.
- **Low Overhead**: 8-byte header vs TCP's minimum 20-byte header.
- **Fast**: Minimal processing at both sender and receiver.

## Port Numbers

Port numbers identify specific applications or services:
- **Well-Known Ports (0-1023)**: Reserved for standard services (HTTP=80, HTTPS=443, SSH=22, DNS=53, SMTP=25, FTP=21).
- **Registered Ports (1024-49151)**: Assigned to specific applications by IANA.
- **Dynamic/Private Ports (49152-65535)**: Used for临时 client connections.

## Advantages

### TCP Advantages
1. **Reliability**: Guaranteed delivery with acknowledgments and retransmissions.
2. **Ordered Data**: Data arrives in the correct sequence.
3. **Flow Control**: Prevents overwhelming slow receivers.
4. **Congestion Control**: Prevents network congestion and ensures fairness.
5. **Error Recovery**: Detects and corrects corrupted data.

### UDP Advantages
1. **Speed**: No connection setup or acknowledgment overhead.
2. **Low Latency**: Ideal for real-time applications.
3. **Simplicity**: Minimal protocol overhead.
4. **Multicast Support**: Efficiently sends data to multiple recipients.
5. **Stateless**: No connection state to maintain.

## Disadvantages

### TCP Disadvantages
1. **Higher Latency**: Three-way handshake adds connection setup delay.
2. **Overhead**: Larger header and ACK traffic consume bandwidth.
3. **Head-of-Line Blocking**: One lost segment blocks all subsequent segments.
4. **Complexity**: More complex implementation than UDP.

### UDP Disadvantages
1. **Unreliable**: No guarantee of delivery or ordering.
2. **No Flow Control**: Can overwhelm receivers.
3. **Application Responsibility**: Reliability must be implemented in the application if needed.
4. **Susceptible to Packet Loss**: Real-time applications may experience quality degradation.

## Uses and Applications

### TCP Applications
- **Web Browsing**: HTTP/HTTPS uses TCP for reliable page delivery.
- **Email**: SMTP, POP3, and IMAP all use TCP.
- **File Transfer**: FTP and SFTP use TCP for reliable file transfer.
- **Remote Access**: SSH and Telnet use TCP for reliable terminal sessions.
- **Database Connections**: MySQL, PostgreSQL, and other databases use TCP.

### UDP Applications
- **Video Streaming**: YouTube, Netflix, and Twitch use UDP-based protocols for low-latency streaming.
- **Online Gaming**: Real-time games require low latency, making UDP ideal.
- **VoIP**: Voice over IP (Skype, Zoom) uses UDP for real-time voice transmission.
- **DNS**: Domain Name System lookups use UDP for fast queries.
- **DHCP**: Dynamic IP assignment uses UDP.
- **SNMP**: Network management queries use UDP.
- **QUIC/HTTP3**: Modern web protocol uses UDP as its transport.`,
    codeExample: `# ===========================================
# LESSON 5: Transport Layer (TCP/UDP)
# Port Scanning, Connections, and Diagnostics
# ===========================================

# ----- Viewing Active Connections -----
# Display all active TCP/UDP connections
netstat -an                               # Windows/Linux/macOS
ss -tunap                                 # Linux (more detailed)

# Show connections with process IDs
netstat -ano                              # Windows
ss -tunap | grep ESTABLISHED              # Linux

# ----- Port Scanning -----
# Check if a specific port is open
Test-NetConnection google.com -Port 443   # PowerShell
telnet google.com 443                     # If telnet installed

# Simple port scan using PowerShell
1..1024 | ForEach-Object {
    $result = Test-NetConnection -ComputerName 127.0.0.1 -Port $_ -WarningAction SilentlyContinue
    if ($result.TcpTestSucceeded) { Write-Host "Port $_ is open" }
}

# ----- TCP Connection Testing -----
# Ping with TCP (useful when ICMP is blocked)
Test-NetConnection google.com -Port 80

# Test multiple common ports
$ports = @(22, 80, 443, 3306, 5432, 8080)
foreach ($port in $ports) {
    $result = Test-NetConnection -ComputerName 127.0.0.1 -Port $port -WarningAction SilentlyContinue
    Write-Host "Port \${port}: $($result.TcpTestSucceeded)"
}

# ----- UDP Communication (PowerShell) -----
# Send a UDP datagram
$udpClient = New-Object System.Net.Sockets.UdpClient
$remoteEP = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Parse("127.0.0.1"), 53)
$bytes = [System.Text.Encoding]::ASCII.GetBytes("Hello UDP")
$udpClient.Send($bytes, $bytes.Length, $remoteEP)
$udpClient.Close()

# ----- Checking Well-Known Ports -----
# List common service ports
Write-Host "Common TCP/UDP Ports:"
Write-Host "HTTP: 80 (TCP)"
Write-Host "HTTPS: 443 (TCP)"
Write-Host "SSH: 22 (TCP)"
Write-Host "DNS: 53 (TCP/UDP)"
Write-Host "SMTP: 25 (TCP)"
Write-Host "FTP: 20/21 (TCP)"
Write-Host "Telnet: 23 (TCP)"
Write-Host "MySQL: 3306 (TCP)"
Write-Host "PostgreSQL: 5432 (TCP)"
Write-Host "RDP: 3389 (TCP)"

# ----- Connection State Statistics -----
# Count connections by state
netstat -an | Select-String "ESTABLISHED" | Measure-Object | Select-Object Count
netstat -an | Select-String "TIME_WAIT" | Measure-Object | Select-Object Count
netstat -an | Select-String "LISTENING" | Measure-Object | Select-Object Count

# ----- TCP Window and Performance -----
# View TCP statistics
netstat -s                                # Windows/Linux
nstat -s                                  # Linux (more detailed)`,
    language: "bash"
  },
  {
    id: "6",
    title: "Application Layer Protocols",
    content: `## Definition

The **Application Layer (Layer 7)** is the topmost layer of the OSI model, providing **network services directly to end-user applications**. It is not about the applications themselves, but about the **protocols and services** that applications use to communicate over a network. The Application Layer in the TCP/IP model corresponds to OSI Layers 5-7 (Session, Presentation, Application).

Application Layer protocols define how applications exchange data, including **message formats**, **authentication methods**, **error handling**, and **data encoding**. Key protocols include **HTTP/HTTPS** (web), **DNS** (domain resolution), **SMTP/POP3/IMAP** (email), **FTP** (file transfer), **SSH** (secure remote access), **DHCP** (dynamic IP assignment), and **SNMP** (network management).

## Introduction

The Application Layer is where users directly interact with networking. Every time you browse a website, send an email, transfer a file, or stream a video, Application Layer protocols are at work. Understanding these protocols is essential because:

- **They define the rules** that applications follow to communicate.
- **Security vulnerabilities** often exist at this layer (SQL injection, XSS, man-in-the-middle attacks).
- **Performance optimization** requires understanding protocol behavior (HTTP/2 multiplexing, DNS caching, connection keep-alive).
- **Troubleshooting** often involves analyzing Application Layer traffic (packet captures, HTTP logs, DNS query logs).

The Application Layer is also the most rapidly evolving layer, with new protocols like **HTTP/3**, **QUIC**, **gRPC**, and **WebSocket** being developed to meet modern demands.

## History

Application Layer protocols have evolved with the Internet:

- **1971 - Email (SMTP precursors)**: The first email program was written by Ray Tomlinson. SMTP was later standardized in **RFC 822** (1982).
- **1973 - FTP**: The File Transfer Protocol was developed by Abhay Bhushan and standardized in **RFC 114** (1971), later revised as **RFC 959** (1985).
- **1983 - DNS**: The Domain Name System was introduced in **RFC 882/883**, replacing the need to maintain a centralized hosts file.
- **1991 - HTTP**: Tim Berners-Lee created the Hypertext Transfer Protocol at CERN. HTTP/1.0 was formalized in **RFC 1945** (1996).
- **1996 - HTTP/1.1**: Defined in **RFC 2068** (later RFC 2616, then RFC 7230-7235). Introduced persistent connections, chunked transfer encoding, and host headers.
- **2000 - SOAP/XML Web Services**: Enterprise web services standardized using SOAP over HTTP.
- **2015 - HTTP/2**: Based on Google's SPDY protocol, HTTP/2 introduced multiplexing, header compression, and server push (**RFC 7540**).
- **2016 - QUIC**: Google developed QUIC as a UDP-based transport protocol to reduce connection latency.
- **2022 - HTTP/3**: Standardized as **RFC 9114**, HTTP/3 runs over QUIC instead of TCP, providing faster connections and better performance on unreliable networks.

## Key Application Layer Protocols

### HTTP/HTTPS (Hypertext Transfer Protocol/Secure)
- **Purpose**: Transfer web pages and resources between clients (browsers) and servers.
- **Default Ports**: HTTP=80, HTTPS=443.
- **Methods**: GET (retrieve), POST (create), PUT (update), DELETE (remove), PATCH (partial update), HEAD (metadata), OPTIONS (capabilities).
- **Status Codes**: 2xx (success), 3xx (redirection), 4xx (client error), 5xx (server error).
- **HTTPS** adds TLS encryption for secure communication.
- **HTTP/2**: Multiplexing, header compression, server push.
- **HTTP/3**: Runs over QUIC (UDP), eliminating head-of-line blocking.

### DNS (Domain Name System)
- **Purpose**: Translates domain names (google.com) to IP addresses (142.250.80.46).
- **Default Port**: 53 (UDP for queries, TCP for zone transfers).
- **Record Types**: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail exchange), NS (name server), TXT (text), SOA (start of authority).
- **Hierarchy**: Root servers -> TLD servers (.com, .org) -> Authoritative name servers.
- **Caching**: DNS responses are cached at multiple levels (browser, OS, resolver, ISP).

### SMTP (Simple Mail Transfer Protocol)
- **Purpose**: Sending email from clients to servers and between mail servers.
- **Default Port**: 25 (server-to-server), 587 (submission with authentication), 465 (SMTPS).
- **Features**: Supports text, attachments (MIME encoding), authentication (SMTP AUTH).
- **Related Protocols**: POP3 (retrieval, port 110/995), IMAP (retrieval, port 143/993).

### SSH (Secure Shell)
- **Purpose**: Secure remote command-line access and file transfer.
- **Default Port**: 22.
- **Features**: Encrypted communication, public key authentication, port forwarding, tunneling.
- **Replaced**: Telnet (port 23), which transmitted data in plaintext.

### DHCP (Dynamic Host Configuration Protocol)
- **Purpose**: Automatically assigns IP addresses and network configuration to devices.
- **Default Port**: 67 (server), 68 (client) - UDP.
- **Process (DORA)**: Discover (client broadcasts), Offer (server offers IP), Request (client requests), Acknowledge (server confirms).

### FTP (File Transfer Protocol)
- **Purpose**: Transfer files between client and server.
- **Default Ports**: 21 (control), 20 (data transfer).
- **Modes**: Active (server connects to client) and Passive (client connects to server).
- **Variants**: SFTP (over SSH, port 22), FTPS (over TLS, port 990).

### SNMP (Simple Network Management Protocol)
- **Purpose**: Monitor and manage network devices.
- **Default Ports**: 161 (queries), 162 (traps) - UDP.
- **Versions**: v1 (basic), v2c (improved), v3 (adds encryption and authentication).

## Advantages

1. **Standardized Communication**: Protocols ensure interoperability between different applications and platforms.
2. **Security Options**: HTTPS, SSH, and SFTP provide encrypted alternatives to insecure protocols.
3. **Rich Functionality**: Application Layer protocols support complex operations (authentication, encryption, compression).
4. **User-Friendly**: Domain names, URLs, and email addresses abstract away complex network addresses.
5. **Extensibility**: Protocols like HTTP are highly extensible through headers and content types.
6. **Caching and Optimization**: DNS caching, HTTP caching, and connection pooling improve performance.

## Disadvantages

1. **Security Vulnerabilities**: This layer is the most targeted by attackers (XSS, CSRF, SQL injection, phishing).
2. **Performance Overhead**: Encryption (TLS), encoding, and protocol negotiation add latency.
3. **Complexity**: Modern protocols (HTTP/2, HTTP/3) are complex to implement correctly.
4. **Legacy Protocol Issues**: Many applications still use outdated, insecure protocols (HTTP, FTP, Telnet).
5. **Interoperability Challenges**: Different implementations of the same protocol may have subtle differences.
6. **Dependency on Lower Layers**: Application Layer protocols are only as reliable as the layers below.

## Uses and Applications

- **Web Browsing**: HTTP/HTTPS enables the World Wide Web.
- **Email Communication**: SMTP, POP3, and IMAP power global email systems.
- **Cloud Services**: APIs (REST, GraphQL, gRPC) communicate over HTTP/HTTPS.
- **Content Delivery**: CDNs use DNS and HTTP to deliver content efficiently.
- **IoT Communication**: MQTT, CoAP, and AMQP are lightweight Application Layer protocols for IoT devices.
- **Streaming**: HLS (HTTP Live Streaming) and DASH deliver video content over HTTP.
- **Authentication**: OAuth 2.0, SAML, and OpenID Connect operate at this layer.`,
    codeExample: `# ===========================================
# LESSON 6: Application Layer Protocols
# HTTP, DNS, SSH, DHCP, and More
# ===========================================

# ----- HTTP/HTTPS Requests -----
# Fetch a web page using curl
curl -I https://google.com                    # View headers only
curl -v https://google.com                    # Verbose output
curl -o page.html https://example.com         # Save to file

# Using PowerShell
Invoke-WebRequest -Uri "https://google.com" -Method Head
(Invoke-WebRequest -Uri "https://google.com").StatusCode

# ----- DNS Operations -----
# Basic DNS lookup
nslookup google.com
nslookup -type=MX gmail.com                   # Mail exchange records
nslookup -type=AAAA google.com                # IPv6 addresses

# Using dig (more detailed - Linux/macOS)
dig google.com A                              # A record
dig google.com MX                             # MX records
dig google.com NS                             # Name server records
dig +short google.com                         # Short answer only

# Using PowerShell
Resolve-DnsName google.com
Resolve-DnsName -Type AAAA google.com

# ----- SSH Operations -----
# Connect to a remote server
ssh user@192.168.1.100

# SSH with specific port
ssh -p 2222 user@192.168.1.100

# SSH with key authentication
ssh -i ~/.ssh/mykey.pem user@192.168.1.100

# Copy files using SCP
scp file.txt user@192.168.1.100:/remote/path/
scp user@192.168.1.100:/remote/file.txt ./

# ----- DHCP Operations -----
# Release current IP and request new one
ipconfig /release                            # Windows
ipconfig /renew                              # Windows

# Linux
sudo dhclient -r eth0                        # Release
sudo dhclient eth0                           # Renew

# View DHCP configuration
ipconfig /all | findstr "DHCP"               # Windows

# ----- FTP Operations -----
# Connect to FTP server (interactive)
ftp ftp.example.com

# Download file using curl (supports FTP)
curl -u user:password ftp://ftp.example.com/file.txt -o file.txt

# ----- Email Testing -----
# Test SMTP connectivity
Test-NetConnection mail.example.com -Port 587

# Test POP3 connectivity
Test-NetConnection mail.example.com -Port 993

# ----- SNMP Queries -----
# Query SNMP agent (if snmpwalk is installed)
snmpwalk -v2c -c public 192.168.1.1 system

# ----- Analyzing Application Traffic -----
# Capture HTTP traffic (requires Wireshark/tshark)
# tshark -i "Ethernet" -f "tcp port 80" -Y "http"

# Check what DNS server is being used
Get-DnsClientServerAddress                    # PowerShell
cat /etc/resolv.conf                          # Linux

# ----- Protocol Port Reference -----
Write-Host "Application Layer Protocol Ports:"
Write-Host "HTTP: 80 | HTTPS: 443"
Write-Host "DNS: 53 | DHCP: 67/68"
Write-Host "SMTP: 25/587 | POP3: 110/995"
Write-Host "IMAP: 143/993 | SSH: 22"
Write-Host "FTP: 20/21 | SNMP: 161/162"
Write-Host "Telnet: 23 | RDP: 3389"`,
    language: "bash"
  },
  {
    id: "7",
    title: "Routing Algorithms",
    content: `## Definition

**Routing Algorithms** are the computational procedures used by routers to determine the **optimal path** for forwarding packets from source to destination across a network. These algorithms analyze network topology, link costs (bandwidth, latency, hop count, congestion), and policy constraints to compute routing tables that guide packet forwarding.

Routing algorithms answer the fundamental question: **Which path should a packet take through the network?** The choice of algorithm affects network performance, convergence speed, scalability, and fault tolerance. The two primary categories are **static routing** (manually configured paths) and **dynamic routing** (algorithms that automatically adapt to network changes).

## Introduction

Routing is the backbone of network communication. Without routing algorithms, routers would not know how to forward packets beyond their directly connected networks. The Internet itself is a collection of thousands of autonomous systems (AS) that use routing algorithms to exchange reachability information.

Key concepts in routing include:

- **Convergence**: The process by which all routers agree on the network topology.
- **Hop Count**: The number of routers a packet must traverse.
- **Metric**: The value used to evaluate path quality (delay, bandwidth, cost, reliability).
- **Administrative Distance**: A value indicating the trustworthiness of a routing source.
- **Load Balancing**: Distributing traffic across multiple equal-cost paths.
- **Convergence Time**: How quickly routers update their tables after a topology change.

Understanding routing algorithms is essential for designing scalable, resilient networks and for troubleshooting connectivity issues.

## History

The history of routing algorithms mirrors the growth of the Internet:

- **1960s - Static Routing**: Early networks used manually configured routes. This worked for small networks but didn't scale.
- **1969 - Distance Vector Concepts**: The original ARPANET used a distributed routing algorithm based on distance vectors.
- **1979 - LS Routing Emerges**: The ARPANET transitioned to a link-state routing algorithm, which provided better convergence and loop prevention.
- **1982 - RIP**: The Routing Information Protocol was defined, becoming the first widely deployed distance-vector protocol.
- **1988 - OSPF Development**: The Open Shortest Path First protocol was developed as a scalable link-state alternative to RIP.
- **1989 - BGP**: The Border Gateway Protocol was introduced to connect autonomous systems on the Internet.
- **1990s - EIGRP**: Cisco developed the Enhanced Interior Gateway Routing Protocol as a hybrid protocol.
- **2000s - MPLS**: Multi-Protocol Label Switching introduced label-based forwarding alongside traditional IP routing.
- **2010s - SDN**: Software-Defined Networking separated the control plane from the data plane, enabling centralized routing decisions.

## Distance Vector Algorithms

Distance vector algorithms share routing information only with directly connected neighbors. Each router maintains a table of destinations and the distance (metric) to reach them.

### RIP (Routing Information Protocol)
- **Type**: Distance vector
- **Metric**: Hop count (maximum 15 hops; 16 = unreachable)
- **Algorithm**: Bellman-Ford
- **Update Frequency**: Every 30 seconds (broadcast)
- **Convergence**: Slow (count-to-infinity problem)
- **Use Case**: Small, simple networks
- **Variants**: RIPv1 (classful), RIPv2 (classless with subnet masks)

### How RIP Works
1. Each router shares its entire routing table with neighbors every 30 seconds.
2. When a router receives an update, it adds 1 to each distance and compares with its current table.
3. If the new distance is shorter, the router updates its table.
4. If the update is from the same next-hop with a higher metric, the route is updated (poison reverse).

### Problems with Distance Vector
- **Count-to-Infinity**: Routers may incrementally increase metric values, taking a long time to converge.
- **Split Horizon**: Prevents sending routing information back in the direction it came from.
- **Route Poisoning**: Sets unreachable routes to metric 16 (infinity).
- **Hold-down Timers**: Prevents accepting new routes for a period after a route becomes unavailable.

## Link-State Algorithms

Link-state algorithms share information about their directly connected links with all routers in the network. Each router builds a complete topology map and independently computes the best routes.

### OSPF (Open Shortest Path First)
- **Type**: Link-state
- **Metric**: Cost (based on bandwidth; higher bandwidth = lower cost)
- **Algorithm**: Dijkstra's Shortest Path First (SPF)
- **Update Frequency**: Only when topology changes (triggered updates)
- **Convergence**: Fast
- **Features**: Area hierarchy, VLSM support, authentication, multicast updates
- **Use Case**: Large enterprise networks, ISP backbones

### How OSPF Works
1. **Neighbor Discovery**: Routers discover neighbors using Hello packets ( multicast 224.0.0.5).
2. **LSA Exchange**: Routers exchange Link-State Advertisements (LSAs) describing their links and neighbors.
3. **LSA Database**: Each router builds a complete Link-State Database (LSDB) of the entire area.
4. **SPF Calculation**: Each router independently runs Dijkstra's algorithm to compute shortest paths.
5. **Route Installation**: Best routes are installed in the routing table.

### OSPF Areas
- **Area 0 (Backbone)**: Required; all other areas must connect to it.
- **Standard Areas**: Receive routes from the backbone.
- **Stub Areas**: Receive only a default route from the backbone.
- **NSSA (Not-So-Stubby Areas)**: Can receive external routes from within the area.

### IS-IS (Intermediate System to Intermediate System)
- **Type**: Link-state (similar to OSPF)
- **Algorithm**: Dijkstra's SPF
- **Features**: Protocol-independent (can carry multiple network layer protocols)
- **Use Case**: Large ISP backbones (used by major ISPs like AT&T and NTT)

## Path-Vector Algorithms

### BGP (Border Gateway Protocol)
- **Type**: Path vector
- **Metric**: AS-path length, policy, and attributes
- **Use Case**: Inter-domain routing (between autonomous systems on the Internet)
- **Variants**: eBGP (between ASes), iBGP (within an AS)
- **Features**: Policy-based routing, path attributes, community strings

### How BGP Works
1. BGP speakers establish TCP connections (port 179) with neighbors.
2. They exchange full routing tables initially, then incremental updates.
3. Each route includes the AS-path (sequence of autonomous systems it traverses).
4. Routers select the best path based on attributes like AS-path length, LOCAL_PREF, MED, and weight.

## Hybrid Algorithms

### EIGRP (Enhanced Interior Gateway Routing Protocol)
- **Type**: Hybrid (distance vector with link-state features)
- **Algorithm**: Diffusing Update Algorithm (DUAL)
- **Metric**: Composite (bandwidth, delay, reliability, load)
- **Features**: Fast convergence, unequal-cost load balancing, bounded updates
- **Use Case**: Cisco-dominated enterprise networks

## Advantages

1. **Automated Path Selection**: Dynamic algorithms automatically find and use the best paths.
2. **Adaptability**: Routers automatically adjust to topology changes (link failures, new routes).
3. **Scalability**: Modern protocols (OSPF, BGP) scale to thousands of routers.
4. **Load Balancing**: Multiple equal-cost paths can be used simultaneously.
5. **Fault Tolerance**: Algorithms detect failures and reroute traffic automatically.
6. **Optimization**: Metrics like bandwidth and delay ensure efficient path selection.

## Disadvantages

1. **Convergence Time**: Some algorithms (RIP) converge slowly, causing temporary black holes.
2. **Resource Consumption**: Link-state algorithms require significant CPU and memory for SPF calculations.
3. **Complexity**: OSPF and BGP are complex to configure and troubleshoot.
4. **Routing Loops**: Distance vector protocols are susceptible to loops (mitigated by split horizon, route poisoning).
5. **Security Risks**: Routing protocols can be attacked (BGP hijacking, OSPF spoofing).
6. **Inconsistent Metrics**: Different protocols use different metrics, making multi-protocol routing challenging.

## Uses and Applications

- **Enterprise LANs**: OSPF is commonly used within organizations to route traffic across departments and buildings.
- **Internet Backbone**: BGP connects the thousands of autonomous systems that form the Internet.
- **Data Centers**: OSPF and IS-IS route traffic between server racks and data center segments.
- **Service Provider Networks**: BGP and IS-IS manage routing for ISPs with millions of customers.
- **Branch Office Connectivity**: RIP or OSPF connects remote offices to headquarters.
- **Cloud Networking**: Cloud providers use custom routing to manage virtual networks across regions.`,
    codeExample: `# ===========================================
# LESSON 7: Routing Algorithms
# Routing Table Inspection and Protocol Diagnostics
# ===========================================

# ----- View Routing Table -----
# Windows
route print

# Linux
ip route show
route -n

# macOS
netstat -rn

# ----- Static Route Management -----
# Add a static route (Windows)
route add 10.0.0.0 mask 255.0.0.0 192.168.1.1
route add 10.0.0.0 mask 255.0.0.0 192.168.1.1 metric 10

# Add a static route (Linux)
sudo ip route add 10.0.0.0/8 via 192.168.1.1
sudo ip route add 172.16.0.0/12 via 192.168.1.1 metric 100

# Delete a static route
route delete 10.0.0.0                      # Windows
sudo ip route del 10.0.0.0/8              # Linux

# ----- OSPF Diagnostics (Cisco-style) -----
# These commands work on Cisco routers/switches
# show ip ospf neighbor
# show ip ospf interface
# show ip ospf database
# show ip route ospf

# ----- BGP Diagnostics -----
# show ip bgp summary
# show ip bgp neighbors
# show ip bgp paths

# ----- RIP Diagnostics -----
# show ip rip
# show ip route rip

# ----- Tracing Route Path -----
# Trace the path packets take through routers
tracert google.com                        # Windows
traceroute google.com                     # Linux/macOS

# Trace with DNS resolution disabled (faster)
tracert -d google.com                     # Windows
traceroute -n google.com                  # Linux/macOS

# ----- Pathping (Combines Ping and Traceroute) -----
pathping google.com                       # Windows

# ----- Routing Protocol Verification -----
# Check if OSPF is running (Linux)
cat /etc/quagga/ospfd.conf 2>/dev/null || echo "Quagga not installed"

# Check routing daemon status
systemctl status bird                     # Linux (BIRD routing daemon)
systemctl status frr                      # Linux (FRRouting)

# ----- Network Reachability Tests -----
# Test connectivity to specific subnets
Test-Connection -ComputerName 10.0.0.1 -Count 2
Test-Connection -ComputerName 172.16.0.1 -Count 2

# ----- Route Summary Information -----
Write-Host "Routing Protocol Comparison:"
Write-Host "RIP:    Distance Vector | Metric: Hop Count | Max Hops: 15"
Write-Host "OSPF:   Link State      | Metric: Cost     | Fast Convergence"
Write-Host "BGP:    Path Vector     | Metric: Policy   | Internet Backbone"
Write-Host "EIGRP:  Hybrid          | Metric: Composite| Cisco Proprietary"`,
    language: "bash"
  },
  {
    id: "8",
    title: "Network Security",
    content: `## Definition

**Network Security** encompasses the policies, practices, and technologies designed to protect the **confidentiality**, **integrity**, and **availability** (the CIA triad) of network resources and data. It involves defending against unauthorized access, misuse, modification, or denial of network services and data. Network security operates at every layer of the OSI model, from physical security to application-level protections.

Effective network security requires a **defense-in-depth** strategy, implementing multiple layers of protection so that if one layer fails, others continue to provide security. This includes **firewalls**, **encryption**, **authentication**, **intrusion detection/prevention systems**, **access control lists**, **VPNs**, and **security policies**.

## Introduction

In today's interconnected world, network security is not optional—it is a fundamental requirement for any organization. Cyber threats are constantly evolving, from simple viruses to sophisticated state-sponsored attacks. Understanding network security is essential because:

- **Data is valuable**: Personal information, financial data, intellectual property, and trade secrets are all targets.
- **Attacks are increasingly sophisticated**: Modern attacks use advanced techniques like zero-day exploits, advanced persistent threats (APTs), and AI-powered attacks.
- **Regulations require it**: Laws like GDPR, HIPAA, PCI DSS, and SOX mandate specific security measures.
- **Business continuity depends on it**: A successful attack can halt operations, damage reputation, and cause financial losses.
- **Remote work increases attack surface**: With more people working remotely, the traditional network perimeter has dissolved.

Network security professionals must understand both the theoretical foundations and practical implementations of security controls.

## History

Network security has evolved alongside the Internet:

- **1970s - The First Worms**: The **Creeper** program (1971) is considered the first computer worm, displaying "I'm the creeper, catch me if you can!" on ARPANET terminals. **Reaper** was created to chase and remove Creeper.
- **1980s - Viruses Emerge**: The **Brain** virus (1986) was the first IBM PC virus. Morris Worm (1988) infected approximately 6,000 computers (10% of the Internet at the time).
- **1990s - Firewalls and Encryption**: First-generation firewalls (packet filters) appeared. **DES** (Data Encryption Standard) was adopted. **PGP** (Pretty Good Privacy) was released for email encryption.
- **1999 - SSL/TLS**: Netscape developed SSL, which evolved into TLS (Transport Layer Security), enabling secure web transactions.
- **2000s - Advanced Threats**: **SQL Slammer** (2003) and **Conficker** (2008) demonstrated the speed of worm propagation. **Stuxnet** (2010) showed nation-state cyber capabilities.
- **2010s - Ransomware and APTs**: **RSA SecurID breach** (2011), **Target breach** (2013), **WannaCry ransomware** (2017), and **SolarWinds supply chain attack** (2020) highlighted evolving threats.
- **2020s - AI-Powered Attacks**: Adversarial machine learning, deepfakes, and automated vulnerability exploitation represent the cutting edge of cyber threats.

## Security Threats

### Malware
- **Virus**: Self-replicating code that attaches to legitimate programs.
- **Worm**: Self-propagating malware that spreads across networks without human interaction.
- **Trojan Horse**: Malicious code disguised as legitimate software.
- **Ransomware**: Encrypts victim's files and demands payment for decryption.
- **Spyware**: Covertly monitors user activity and steals information.
- **Rootkit**: Provides hidden, privileged access while concealing its presence.

### Network Attacks
- **Man-in-the-Middle (MitM)**: Attacker intercepts and potentially alters communications between two parties.
- **Denial of Service (DoS)**: Overwhelms a target with traffic to make it unavailable.
- **Distributed DoS (DDoS)**: DoS attack originating from multiple sources.
- **DNS Spoofing/Poisoning**: Redirects DNS queries to malicious servers.
- **ARP Spoofing**: Associates attacker's MAC address with a legitimate IP.
- **Packet Sniffing**: Captures and analyzes network traffic.

### Social Engineering
- **Phishing**: Deceptive emails or websites designed to steal credentials.
- **Spear Phishing**: Targeted phishing aimed at specific individuals or organizations.
- **Pretexting**: Creating a fabricated scenario to obtain information.

## Security Technologies

### Firewalls
- **Packet Filtering**: Examines packet headers (source/destination IP, port) and decides to allow or block.
- **Stateful Inspection**: Tracks the state of active connections and makes decisions based on context.
- **Application Layer Firewall**: Inspects the payload of packets, understanding application protocols.
- **Next-Generation Firewall (NGFW)**: Combines traditional firewall with intrusion prevention, application awareness, and threat intelligence.

### Encryption
- **Symmetric Encryption**: Same key for encryption and decryption (AES, DES, 3DES). Fast but key distribution is challenging.
- **Asymmetric Encryption**: Public/private key pair (RSA, ECC, Diffie-Hellman). Enables secure key exchange.
- **TLS/SSL**: Provides encrypted communication over HTTP (HTTPS), email (SMTPS), and other protocols.
- **IPsec**: Network-layer encryption for VPNs and secure site-to-site communication.

### Authentication and Access Control
- **Multi-Factor Authentication (MFA)**: Requires multiple forms of verification (password + token + biometric).
- **RADIUS/TACACS+**: Centralized authentication, authorization, and accounting (AAA) protocols.
- **802.1X**: Port-based network access control requiring authentication before network access.
- **Zero Trust Architecture**: Never trust, always verify—every access request is authenticated regardless of location.

### Intrusion Detection and Prevention
- **IDS (Intrusion Detection System)**: Monitors network traffic for suspicious activity and alerts administrators.
- **IPS (Intrusion Prevention System)**: Detects and actively blocks malicious traffic in real-time.
- **SIEM (Security Information and Event Management)**: Aggregates and analyzes security logs from across the network.

### VPN (Virtual Private Network)
- **Remote Access VPN**: Individual users connect to the corporate network over the Internet.
- **Site-to-Site VPN**: Connects two networks (e.g., branch office to headquarters).
- **Protocols**: IPsec, OpenVPN, WireGuard, SSL/TLS VPN.

## Advantages

1. **Data Protection**: Encryption and access controls protect sensitive data from unauthorized access.
2. **Business Continuity**: Security measures prevent disruptions from attacks and failures.
3. **Regulatory Compliance**: Proper security helps meet legal and industry requirements.
4. **Trust and Reputation**: Strong security builds customer confidence and protects brand reputation.
5. **Cost Reduction**: Preventing breaches avoids costly remediation, legal fees, and lost business.
6. **Risk Management**: Systematic security reduces the overall risk profile of the organization.

## Disadvantages

1. **Cost**: Security infrastructure and expertise require significant investment.
2. **Complexity**: Implementing and managing multiple security layers is complex.
3. **Performance Impact**: Encryption, inspection, and logging add latency and overhead.
4. **User Friction**: Security measures (MFA, strong passwords, access restrictions) can inconvenience users.
5. **False Positives**: Security systems may flag legitimate traffic as malicious, causing disruptions.
6. **Evolution of Threats**: New attack techniques constantly emerge, requiring ongoing vigilance.
7. **Insider Threats**: Malicious or negligent employees can bypass external security measures.

## Uses and Applications

- **Enterprise Networks**: Firewalls, IDS/IPS, and SIEM protect corporate networks.
- **E-commerce**: TLS encryption secures online transactions and customer data.
- **Healthcare**: HIPAA compliance requires encryption and access controls for patient data.
- **Government**: Classified networks use advanced encryption and strict access controls.
- **Remote Work**: VPNs and zero-trust architectures secure remote access.
- **Cloud Security**: CASB (Cloud Access Security Broker) and CSPM (Cloud Security Posture Management) protect cloud resources.
- **IoT Security**: Network segmentation and device authentication protect IoT deployments.`,
    codeExample: `# ===========================================
# LESSON 8: Network Security
# Security Diagnostics, Encryption, and Monitoring
# ===========================================

# ----- Firewall Configuration (Windows) -----
# View firewall status
Get-NetFirewallProfile | Format-Table Name, Enabled

# Block incoming traffic on a specific port
New-NetFirewallRule -DisplayName "Block Telnet" -Direction Inbound -Protocol TCP -LocalPort 23 -Action Block

# Allow incoming SSH traffic
New-NetFirewallRule -DisplayName "Allow SSH" -Direction Inbound -Protocol TCP -LocalPort 22 -Action Allow

# ----- Firewall Configuration (Linux) -----
# Check firewall status (UFW)
sudo ufw status verbose

# Enable firewall and allow SSH
sudo ufw allow ssh
sudo ufw enable

# Block a specific IP address
sudo ufw deny from 10.0.0.50

# ----- Encryption Operations -----
# Generate an SSH key pair
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Encrypt a file using OpenSSL
openssl enc -aes-256-cbc -salt -in plaintext.txt -out encrypted.bin

# Decrypt a file
openssl enc -aes-256-cbc -d -in encrypted.bin -out plaintext.txt

# ----- TLS/SSL Certificate Check -----
# Verify SSL certificate of a website
openssl s_client -connect google.com:443 -servername google.com

# Check certificate expiry
openssl s_client -connect google.com:443 2>/dev/null | openssl x509 -noout -dates

# ----- Network Monitoring -----
# Monitor active connections in real-time
netstat -an | findstr ESTABLISHED         # Windows
ss -tunap | grep ESTABLISHED              # Linux

# Check for suspicious listening ports
netstat -an | findstr LISTENING

# ----- IP Blocking -----
# Block an IP using Windows Firewall
New-NetFirewallRule -DisplayName "Block Malicious IP" -Direction Inbound -RemoteAddress 203.0.113.50 -Action Block

# Block an IP using Linux (iptables)
sudo iptables -A INPUT -s 203.0.113.50 -j DROP

# ----- VPN Connection -----
# Connect to a VPN (Windows built-in)
rasdial "VPN Connection" username password

# ----- Password Security -----
# Generate a strong random password
-join ((1..20) | ForEach-Object { [char](Get-Random -Minimum 33 -Maximum 126) })

# ----- Security Audit Commands -----
# Check for open ports
Test-NetConnection -ComputerName 127.0.0.1 -Port 80
Test-NetConnection -ComputerName 127.0.0.1 -Port 443

# View security event logs (Windows)
Get-EventLog -LogName Security -Newest 20

# ----- Common Security Ports to Monitor -----
Write-Host "Security-Sensitive Ports:"
Write-Host "22 - SSH (should be allowed only from trusted IPs)"
Write-Host "23 - Telnet (should be BLOCKED - insecure)"
Write-Host "80 - HTTP (consider redirecting to HTTPS)"
Write-Host "443 - HTTPS (should be allowed)"
Write-Host "3389 - RDP (restrict access)"
Write-Host "3306 - MySQL (should not be public)"
Write-Host "5432 - PostgreSQL (should not be public)"`,
    language: "bash"
  },
  {
    id: "9",
    title: "Wireless & Mobile Networks",
    content: `## Definition

**Wireless Networks** use electromagnetic waves (radio, microwave, infrared) to transmit data without physical cables. **Mobile Networks** enable communication for devices that move between coverage areas, maintaining connectivity as users travel. Together, these technologies have revolutionized how people access information and communicate, enabling the anytime, anywhere connectivity that defines the modern era.

Wireless networks include **Wi-Fi (IEEE 802.11)** for local area wireless networking, **Bluetooth (IEEE 802.15)** for short-range personal area networks, **cellular networks** (4G LTE, 5G) for wide area mobile communication, and **satellite networks** for global coverage. Mobile networks use a **cellular architecture** where geographic areas are divided into cells, each served by a base station, enabling frequency reuse and continuous coverage.

## Introduction

Wireless and mobile networks are among the most transformative technologies of the past three decades. They have changed how billions of people access the Internet, communicate, work, and entertain themselves. Understanding wireless and mobile networks is essential because:

- **Ubiquitous Connectivity**: Over 5.3 billion people use mobile phones globally, and Wi-Fi is available in most homes, offices, and public spaces.
- **Unique Challenges**: Wireless media introduce challenges not present in wired networks: **signal attenuation**, **interference**, **multipath fading**, **security vulnerabilities**, and **limited bandwidth**.
- **Mobility Management**: Mobile networks must handle handoffs between cells, roaming across networks, and maintaining sessions while moving at high speeds.
- **Rapid Evolution**: Wireless standards evolve quickly (Wi-Fi 6/7, 5G/6G), each bringing significant improvements in speed, capacity, and latency.
- **IoT Enablement**: Wireless technologies connect billions of IoT devices, from smart home sensors to industrial equipment.

The wireless landscape is diverse, with different technologies optimized for different use cases: Wi-Fi for high-speed local access, Bluetooth for personal devices, cellular for wide area mobility, and satellite for remote coverage.

## History

The evolution of wireless and mobile networks has been rapid and transformative:

**Wi-Fi History:**
- **1997 - IEEE 802.11**: The original standard supported 1-2 Mbps wireless LAN.
- **1999 - 802.11b**: Introduced 11 Mbps using the 2.4 GHz band, making Wi-Fi commercially viable.
- **2003 - 802.11g**: Achieved 54 Mbps backward-compatible with 802.11b.
- **2009 - 802.11n (Wi-Fi 4)**: Introduced MIMO (Multiple-Input Multiple-Output), achieving up to 600 Mbps.
- **2014 - 802.11ac (Wi-Fi 5)**: Used wider channels and beamforming for multi-gigabit speeds.
- **2019 - 802.11ax (Wi-Fi 6)**: Introduced OFDMA, improved MU-MIMO, and better performance in dense environments.
- **2024 - 802.11be (Wi-Fi 7)**: Expected to deliver up to 46 Gbps with 320 MHz channels and 4096-QAM.

**Cellular History:**
- **1979 - 1G (NMT)**: The first generation of cellular networks used analog signals for voice.
- **1991 - 2G (GSM)**: Digital cellular networks enabled SMS text messaging and improved voice quality.
- **2001 - 3G (UMTS/CDMA2000)**: Enabled mobile Internet access and data services at speeds up to 2 Mbps.
- **2009 - 4G (LTE)**: Achieved 100 Mbps-1 Gbps, enabling mobile broadband, video streaming, and app ecosystems.
- **2019 - 5G NR**: Delivers up to 20 Gbps, sub-1ms latency, and support for 1 million devices per square kilometer.
- **2030s - 6G**: Under development, expected to deliver 1 Tbps and support holographic communication.

**Bluetooth History:**
- **1998 - Bluetooth 1.0**: Created by Ericsson for short-range wireless communication (1 Mbps, 10m range).
- **2004 - Bluetooth 2.0 + EDR**: Enhanced Data Rate (3 Mbps).
- **2010 - Bluetooth 4.0 (BLE)**: Bluetooth Low Energy for IoT devices with minimal power consumption.
- **2016 - Bluetooth 5.0**: Extended range (300m), higher speed (2 Mbps), and larger broadcast capacity.

## Wi-Fi (IEEE 802.11) Architecture

### Components
- **Station (STA)**: Any device with a wireless network interface (laptop, phone, IoT device).
- **Access Point (AP)**: Device that provides wireless connectivity to the wired network (router, wireless access point).
- **Basic Service Set (BSS)**: A group of stations communicating through a single AP.
- **Extended Service Set (ESS)**: Multiple BSSs connected through a distribution system (wired backbone).
- **Distribution System (DS)**: The wired backbone connecting multiple APs.

### Wi-Fi Operating Modes
- **Infrastructure Mode**: Stations communicate through an AP (most common).
- **Ad-Hoc Mode**: Stations communicate directly without an AP (peer-to-peer).
- **Mesh Mode**: Multiple APs form a mesh network for extended coverage.

### Wi-Fi Frequency Bands
- **2.4 GHz**: Longer range, more interference (microwaves, Bluetooth), 3 non-overlapping channels (1, 6, 11).
- **5 GHz**: Shorter range, less interference, more non-overlapping channels, higher speeds.
- **6 GHz (Wi-Fi 6E)**: New band with 1200 MHz of spectrum, minimal interference, ultra-high speeds.

## Cellular Network Architecture

### Components
- **User Equipment (UE)**: Mobile device (smartphone, tablet, IoT device).
- **Base Station (eNodeB/gNodeB)**: Tower or antenna that provides wireless coverage (4G/5G).
- **Evolved Packet Core (EPC)**: Core network handling authentication, routing, and session management.
- **Mobility Management Entity (MME)**: Handles signaling and mobility management.
- **Serving Gateway (S-GW)**: Routes data packets between base stations.
- **Packet Data Network Gateway (P-GW)**: Connects to the Internet and external networks.

### Cellular Concepts
- **Cells**: Geographic areas served by a base station. Cell sizes range from macro (several km) to femto (a few meters).
- **Frequency Reuse**: The same frequencies can be used in non-adjacent cells, maximizing spectrum efficiency.
- **Handoff/Handover**: Seamless transfer of a connection from one base station to another as the user moves.
- **Roaming**: Using another carrier's network when outside your home coverage area.

## Advantages

1. **Mobility**: Users can access network resources from anywhere within coverage areas.
2. **Convenience**: No cables mean easier setup and reconfiguration.
3. **Scalability**: Wireless networks can easily add new devices without physical infrastructure.
4. **Cost-Effective**: Reduces cabling costs, especially in older buildings or temporary setups.
5. **Accessibility**: Enables connectivity in remote areas where wired infrastructure is impractical.
6. **IoT Enablement**: Wireless technologies connect billions of devices that would be impractical to wire.
7. **Rapid Deployment**: Wireless networks can be set up quickly, useful for disaster recovery and temporary events.

## Disadvantages

1. **Security Vulnerabilities**: Wireless signals can be intercepted, making encryption (WPA3, TLS) essential.
2. **Interference**: Other wireless devices, microwaves, and physical obstacles can disrupt signals.
3. **Limited Bandwidth**: Wireless typically offers lower throughput than wired connections.
4. **Range Limitations**: Signal strength decreases with distance and obstacles.
5. **Latency**: Wireless connections often have higher latency than wired equivalents.
6. **Reliability**: Weather, interference, and congestion can cause intermittent connectivity.
7. **Power Consumption**: Wireless radios consume battery power, limiting device battery life.

## Uses and Applications

- **Home Networking**: Wi-Fi provides Internet access throughout the home.
- **Enterprise WLANs**: Large organizations use Wi-Fi for employee connectivity and IoT devices.
- **Public Hotspots**: Airports, cafes, hotels, and cities offer public Wi-Fi access.
- **Mobile Internet**: 4G/5G provides high-speed Internet access on the go.
- **IoT and Smart Cities**: Wireless sensors monitor traffic, environment, utilities, and infrastructure.
- **Healthcare**: Wireless medical devices and telemedicine rely on reliable wireless networks.
- **Industrial IoT**: Wi-Fi and 5G connect sensors and actuators in factories and warehouses.
- **Education**: Schools and universities use Wi-Fi for digital learning and campus connectivity.`,
    codeExample: `# ===========================================
# LESSON 9: Wireless & Mobile Networks
# Wi-Fi Configuration and Diagnostics
# ===========================================

# ----- View Wi-Fi Information (Windows) -----
# Show current Wi-Fi connection details
netsh wlan show interfaces

# Show available Wi-Fi networks
netsh wlan show networks

# Show Wi-Fi profile (saved network settings)
netsh wlan show profile name="NetworkName" key=clear

# ----- View Wi-Fi Information (Linux) -----
# Show wireless interface information
iwconfig
iw dev wlan0 info

# Scan for available networks
sudo iwlist wlan0 scan | grep -E "ESSID|Channel|Signal"

# Show connection status
nmcli device wifi list
nmcli connection show

# ----- Wi-Fi Signal Strength -----
# Check signal strength in dBm and percentage
netsh wlan show interfaces | findstr "Signal"
iwconfig wlan0 | grep -i "signal level"

# Signal strength reference:
# -30 dBm: Maximum (excellent)
# -50 dBm: Excellent
# -60 dBm: Good
# -70 dBm: Fair
# -80 dBm: Weak
# -90 dBm: Very weak/unusable

# ----- Connect to Wi-Fi Network -----
# Windows - Connect to a saved network
netsh wlan connect name="NetworkName"

# Linux
nmcli device wifi connect "NetworkName" password "your_password"

# ----- Disconnect from Wi-Fi -----
netsh wlan disconnect                     # Windows
nmcli device disconnect wlan0            # Linux

# ----- Wi-Fi Diagnostics -----
# Ping test through wireless connection
ping 8.8.8.8

# Test throughput (using speedtest-cli if installed)
speedtest-cli

# Check for channel interference
netsh wlan show networks mode=bssid | findstr "Channel"
iwlist wlan0 scan | grep "Channel"

# ----- Bluetooth Status -----
# Windows
Get-Service bthserv
Get-Device | Where-Object { $_.Class -eq "Bluetooth" }

# Linux
bluetoothctl show
bluetoothctl devices

# ----- Cellular Network Info (PowerShell) -----
# Get network adapter info for cellular
Get-NetAdapter | Where-Object { $_.InterfaceDescription -like "*Cellular*" -or $_.InterfaceDescription -like "*Mobile*" }

# ----- Wi-Fi Security Check -----
# Verify WPA3/WPA2 security
netsh wlan show profile name="NetworkName" | findstr "Authentication"

# Common security types:
# WPA3-Personal (SAE) - Most secure
# WPA2-Personal (PSK) - Widely used
# WPA2-Enterprise (802.1X) - Business use
# Open (None) - Insecure, avoid

# ----- Wi-Fi Channel Optimization -----
Write-Host "Wi-Fi Channel Recommendations:"
Write-Host "2.4 GHz Band: Use channels 1, 6, or 11 (non-overlapping)"
Write-Host "5 GHz Band: Choose channels in UNII-1 (36-48) or UNII-3 (149-165)"
Write-Host "6 GHz Band: All channels are available with minimal interference"

# ----- Network Speed Test -----
# Test download and upload speed
Write-Host "Testing network speed..."
Test-Connection -ComputerName google.com -Count 5 | Measure-Object -Property ResponseTime -Average`,
    language: "bash"
  },
  {
    id: "10",
    title: "Modern Networking",
    content: `## Definition

**Modern Networking** refers to the current generation of networking technologies, architectures, and paradigms that have emerged to address the demands of cloud computing, massive-scale applications, IoT, and evolving security requirements. Key technologies include **Software-Defined Networking (SDN)**, **Network Function Virtualization (NFV)**, **Cloud Networking**, **Content Delivery Networks (CDNs)**, **Edge Computing**, **Zero Trust Architecture**, **HTTP/3**, and **5G Network Slicing**.

Modern networking represents a fundamental shift from traditional hardware-centric, manually configured networks to **software-driven, automated, and programmable** infrastructure. This shift enables unprecedented agility, scalability, and efficiency in how networks are designed, deployed, and managed.

## Introduction

The networking landscape has undergone a dramatic transformation in the past decade. Traditional approaches—where network engineers manually configured routers and switches using command-line interfaces—are giving way to **automated, programmable, and software-defined** approaches. Understanding modern networking is essential because:

- **Cloud is Dominant**: Most organizations now run workloads in public clouds (AWS, Azure, GCP), requiring new networking paradigms.
- **Automation is Essential**: The scale of modern networks (thousands of devices, millions of endpoints) makes manual management impossible.
- **Security Has Evolved**: The traditional perimeter-based security model is obsolete; zero-trust principles are now standard.
- **Performance Demands are Extreme**: Applications like AI/ML training, real-time gaming, and video conferencing demand ultra-low latency and high bandwidth.
- **New Protocols Are Emerging**: QUIC, HTTP/3, gRPC, and eBPF represent the cutting edge of networking technology.

Modern networking professionals must understand both the foundational concepts (covered in earlier lessons) and the emerging technologies that are reshaping the industry.

## History

The evolution of modern networking has been driven by cloud computing, scalability challenges, and security threats:

- **2008 - SDN Concept**: Martin Casado et al. published "OpenFlow: Enabling Innovation in Campus Networks," laying the foundation for Software-Defined Networking.
- **2010 - OpenFlow Protocol**: The Open Networking Foundation released OpenFlow 1.0, enabling centralized control of network switches.
- **2012 - OpenStack Networking**: OpenStack's Neutron project provided programmable networking for cloud environments.
- **2013 - Container Revolution**: Docker's rise created new networking requirements for container orchestration (Kubernetes networking).
- **2014 - NFV**: ETSI published Network Function Virtualization standards, enabling virtual firewalls, load balancers, and routers.
- **2016 - Kubernetes Networking**: Kubernetes became the standard for container orchestration, requiring sophisticated networking (CNI plugins, service meshes).
- **2017 - eBPF**: The Linux kernel's extended Berkeley Packet Filter (eBPF) technology emerged as a revolutionary programmable data plane.
- **2019 - QUIC Standardization**: IETF began standardizing QUIC as the next-generation transport protocol.
- **2020 - SASE**: Gartner coined Secure Access Service Edge (SASE), combining networking and security in the cloud.
- **2021 - HTTP/3**: RFC 9114 standardized HTTP/3 over QUIC, becoming the new web standard.
- **2022-Present - AI Networking**: Large-scale AI/ML training clusters demand specialized high-bandwidth, low-latency networks (RDMA, InfiniBand, RoCE).

## Software-Defined Networking (SDN)

SDN separates the **control plane** (decision-making) from the **data plane** (packet forwarding), enabling centralized, programmable network management.

### SDN Architecture
- **Application Layer**: Network applications (firewalls, load balancers, traffic engineering).
- **Control Layer**: SDN controller (OpenDaylight, ONOS, Cisco ACI) that makes forwarding decisions.
- **Infrastructure Layer**: Physical and virtual switches that forward packets based on controller instructions.

### OpenFlow Protocol
- Communication protocol between SDN controller and switches.
- Enables the controller to program forwarding tables in switches.
- Supports flow-based forwarding (not just destination-based).

### Benefits of SDN
- Centralized management and visibility.
- Programmable network behavior.
- Rapid provisioning and changes.
- Vendor neutrality (open standards).

## Network Function Virtualization (NFV)

NFV replaces dedicated hardware appliances (firewalls, load balancers, routers) with **software running on commodity servers**.

### NFV Components
- **Virtualized Network Functions (VNFs)**: Software implementations of network functions (e.g., virtual firewall, virtual router).
- **NFV Infrastructure (NFVI)**: Compute, storage, and networking resources that host VNFs.
- **NFV Orchestrator**: Manages the lifecycle of VNFs (deployment, scaling, healing).

### Benefits of NFV
- Reduced hardware costs (commodity servers vs. specialized appliances).
- Faster deployment (minutes vs. weeks for hardware).
- Elastic scaling (add/remove instances based on demand).
- Reduced physical footprint and power consumption.

## Cloud Networking

Cloud networking extends traditional networking concepts to virtual environments:

### Key Concepts
- **Virtual Private Cloud (VPC)**: Isolated virtual network within a cloud provider.
- **Subnets**: Segments within a VPC for organizing resources.
- **Security Groups**: Virtual firewalls controlling inbound/outbound traffic.
- **Load Balancers**: Distribute traffic across multiple instances.
- **VPN Gateway**: Encrypted connection between on-premises and cloud networks.
- **Direct Connect/ExpressRoute**: Dedicated private connections to cloud providers.

### Cloud Networking Models
- **Overlay Networks**: Virtual networks built on top of physical infrastructure using encapsulation (VXLAN, GRE).
- **Underlay Network**: The physical network that carries overlay traffic.
- **Service Mesh**: Infrastructure layer for service-to-service communication (Istio, Linkerd).

## Content Delivery Networks (CDNs)

CDNs distribute content across geographically distributed servers to reduce latency and improve performance.

### How CDNs Work
1. User requests content (e.g., a video).
2. DNS resolves to the nearest CDN edge server.
3. Edge server serves the cached content (cache hit) or fetches from origin (cache hit miss).
4. Content is cached at the edge for future requests.

### Major CDN Providers
- **Cloudflare**: CDN, DDoS protection, and security.
- **Akamai**: One of the largest CDNs with global coverage.
- **AWS CloudFront**: Integrated with AWS services.
- **Google Cloud CDN**: Google's global CDN.

## Edge Computing

Edge computing processes data **closer to the source** (IoT devices, users) rather than in centralized data centers.

### Benefits
- **Reduced Latency**: Processing at the edge eliminates round-trip to cloud.
- **Bandwidth Savings**: Only relevant data is sent to the cloud.
- **Privacy**: Sensitive data can be processed locally.
- **Reliability**: Continues working even if cloud connectivity is lost.

### Edge Technologies
- **Multi-access Edge Computing (MEC)**: Computing at the edge of cellular networks.
- **AWS Greengrass**: Lambda functions running on edge devices.
- **Azure IoT Edge**: Modular systems for IoT edge computing.

## Zero Trust Architecture

Zero Trust is a security model based on the principle: **"Never trust, always verify."**

### Core Principles
- **Verify Explicitly**: Always authenticate and authorize based on all available data points.
- **Use Least Privilege Access**: Limit access to only what is needed.
- **Assume Breach**: Design systems as if attackers are already inside the network.

### Zero Trust Components
- **Identity Provider (IdP)**: Centralized authentication and authorization.
- **Micro-segmentation**: Isolate workloads and applications.
- **Software-Defined Perimeter (SDP)**: Hide infrastructure from unauthorized users.
- **Continuous Monitoring**: Real-time verification of user and device trust.

## Modern Protocols

### QUIC and HTTP/3
- **QUIC**: UDP-based transport protocol with built-in TLS 1.3, 0-RTT connection establishment, and no head-of-line blocking.
- **HTTP/3**: Runs over QUIC instead of TCP, providing faster connections and better performance on unreliable networks.

### gRPC
- High-performance RPC framework using Protocol Buffers and HTTP/2.
- Used extensively in microservices architectures.

### WireGuard
- Modern, lightweight VPN protocol.
- Simpler and faster than IPsec and OpenVPN.

## Advantages

1. **Agility**: Software-defined approaches enable rapid network changes and provisioning.
2. **Scalability**: Cloud networking scales elastically with demand.
3. **Cost Efficiency**: NFV and cloud reduce hardware and operational costs.
4. **Programmability**: APIs and automation enable infrastructure-as-code.
5. **Security**: Zero Trust and micro-segmentation provide stronger security.
6. **Performance**: CDNs, edge computing, and modern protocols reduce latency.
7. **Visibility**: Centralized controllers provide comprehensive network monitoring.

## Disadvantages

1. **Complexity**: Modern architectures are complex and require specialized skills.
2. **Vendor Lock-in**: Cloud providers may create dependencies.
3. **Security Risks**: Software-defined infrastructure introduces new attack surfaces.
4. **Migration Challenges**: Transitioning from legacy to modern architectures is difficult.
5. **Performance Overhead**: Virtualization and overlay networks add processing overhead.
6. **Cost at Scale**: Cloud costs can escalate quickly without proper management.
7. **Skills Gap**: The demand for modern networking skills exceeds supply.

## Uses and Applications

- **Cloud-Native Applications**: Kubernetes networking, service meshes, and container networking.
- **Enterprise WAN**: SD-WAN connects branch offices to cloud services efficiently.
- **Data Center Networking**: Leaf-spine architectures with VXLAN and EVPN.
- **Telecom 5G**: Network slicing and MEC enable new mobile services.
- **IoT Deployments**: Edge computing processes sensor data locally.
- **Remote Work**: SASE and Zero Trust secure remote access.
- **AI/ML Infrastructure**: High-performance networking for GPU clusters (RDMA, InfiniBand).
- **Gaming**: Low-latency networking for competitive gaming and cloud gaming.`,
    codeExample: `# ===========================================
# LESSON 10: Modern Networking
# SDN, Cloud Networking, and Automation
# ===========================================

# ----- Kubernetes Networking -----
# View Kubernetes services and their cluster IPs
kubectl get services

# View all pods and their IP addresses
kubectl get pods -o wide

# View network policies
kubectl get networkpolicies

# Describe a specific service
kubectl describe service my-service

# ----- Docker Networking -----
# List Docker networks
docker network ls

# Inspect a Docker network
docker network inspect bridge

# Create a custom Docker network
docker network create --driver bridge my-network

# Run a container on a specific network
docker run -d --name my-container --network my-network nginx

# ----- Cloud CLI Operations (AWS) -----
# View VPC configurations
aws ec2 describe-vpcs

# List subnets
aws ec2 describe-subnets

# View security groups
aws ec2 describe-security-groups

# List load balancers
aws elbv2 describe-load-balancers

# ----- Cloud CLI Operations (Azure) -----
# View virtual networks
az network vnet list

# View subnets
az network vnet subnet list --resource-group myRG --vnet-name myVNet

# View network security groups
az network nsg list --resource-group myRG

# ----- Network Automation (Ansible-style) -----
# Example Ansible playbook for network configuration
# (Written as a reference - actual Ansible files use YAML)
Write-Host "Network Automation Example:"
Write-Host "Playbook: Configure switch ports"
Write-Host "  - Set VLAN 10 for access ports"
Write-Host "  - Enable port security"
Write-Host "  - Configure storm control"

# ----- SDN/OpenFlow Reference -----
# OpenFlow controller commands (OVS)
# ovs-ofctl add-flow bridge "in_port=1,actions=output:2"
# ovs-ofctl dump-flows bridge

# Check Open vSwitch status
sudo ovs-vsctl show                     # Linux

# ----- Performance Testing -----
# Test network throughput using iperf3
# Server: iperf3 -s
# Client: iperf3 -c server-ip -t 10

# Test latency
ping -c 10 8.8.8.8

# ----- Modern Protocol Check -----
# Verify HTTP/3 support (requires curl with HTTP/3 support)
# curl --http3 https://example.com

# Check QUIC support
# nmap --script ssl-enum-ciphers -p 443 example.com

# ----- Network Monitoring Tools -----
# Install and use nload for real-time bandwidth monitoring
# sudo apt install nload
# nload eth0

# Using iftop for per-connection bandwidth
# sudo apt install iftop
# sudo iftop -i eth0

# ----- Infrastructure as Code (Terraform Reference) -----
Write-Host "Terraform Network Resources:"
Write-Host "  - aws_vpc: Create virtual private cloud"
Write-Host "  - aws_subnet: Create subnets"
Write-Host "  - aws_security_group: Define firewall rules"
Write-Host "  - aws_route_table: Configure routing"
Write-Host "  - aws_nat_gateway: Enable internet access for private subnets"

# ----- Service Mesh Check -----
# Verify Istio service mesh
kubectl get pods -n istio-system
istioctl analyze

# Check Linkerd service mesh
linkerd check`,
    language: "bash"
  }
]
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
  description: "Master Java from object-oriented programming to collections and concurrency.",
  icon: "☕",
  color: "from-red-400 to-orange-500",
  category: "Languages",
  notesUrl: "https://github.com/Knight-rule/cse-learner/blob/main/docs/java-notes.md",
  lessons: [
    {
      id: "java-1",
      title: "Java Fundamentals",
      content: `## Introduction to Java

Java is a class-based, object-oriented programming language designed for portability — "write once, run anywhere." Java programs compile to bytecode that runs on the Java Virtual Machine (JVM).

### Setting Up

- Install the JDK (Java Development Kit)
- Use an IDE: IntelliJ IDEA, Eclipse, or VS Code
- Compile: \`javac Main.java\`
- Run: \`java Main\`

### Basic Syntax

Every Java file contains a class. The entry point is the \`main\` method:

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

### Variables and Data Types

| Type | Size | Default | Range |
|------|------|---------|-------|
| \`byte\` | 1 byte | 0 | -128 to 127 |
| \`short\` | 2 bytes | 0 | -32,768 to 32,767 |
| \`int\` | 4 bytes | 0 | ±2.1 billion |
| \`long\` | 8 bytes | 0L | ±9 quintillion |
| \`float\` | 4 bytes | 0.0f | 7 decimal digits |
| \`double\` | 8 bytes | 0.0 | 15 decimal digits |
| \`char\` | 2 bytes | '\\u0000' | 0 to 65,535 |
| \`boolean\` | 1 bit | false | true/false |

### Type Casting

\`\`\`java
int x = 10;
double y = x;        // implicit (widening) — safe
int z = (int) 3.14;  // explicit (narrowing) — loses precision
\`\`\`

### Strings

Strings in Java are objects, not primitives:

\`\`\`java
String name = "Alice";
String greeting = "Hello, " + name + "!";  // concatenation
int len = name.length();
String upper = name.toUpperCase();
char ch = name.charAt(0);   // 'A'
\`\`\``,
      codeExample: `public class Main {\n    public static void main(String[] args) {\n        // Variables\n        String name = "Alice";\n        int age = 25;\n        double gpa = 3.85;\n        boolean active = true;\n\n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n        System.out.println("GPA: " + gpa);\n        System.out.println("Active: " + active);\n\n        // String operations\n        System.out.println("\\nName length: " + name.length());\n        System.out.println("Uppercase: " + name.toUpperCase());\n        System.out.println("First char: " + name.charAt(0));\n        System.out.println("Contains 'lic': " + name.contains("lic"));\n\n        // Type casting\n        int x = 10;\n        double y = x;  // implicit\n        System.out.println("\\nImplicit: int " + x + " → double " + y);\n\n        double pi = 3.14159;\n        int truncated = (int) pi;  // explicit\n        System.out.println("Explicit: double " + pi + " → int " + truncated);\n\n        // String formatting\n        String formatted = String.format("Name: %s, Age: %d, GPA: %.2f", name, age, gpa);\n        System.out.println("\\n" + formatted);\n    }\n}`,
      language: "java"
    },
    {
      id: "java-2",
      title: "Control Flow",
      content: `## Control Flow — Making Decisions

### if / else if / else

\`\`\`java
int score = 85;

if (score >= 90) {
    System.out.println("Grade A");
} else if (score >= 80) {
    System.out.println("Grade B");
} else if (score >= 70) {
    System.out.println("Grade C");
} else {
    System.out.println("Grade F");
}
\`\`\`

### Ternary Operator

\`\`\`java
String result = (score >= 50) ? "Pass" : "Fail";
\`\`\`

### switch Statement

\`\`\`java
String day = "Monday";

switch (day) {
    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
        System.out.println("Weekday");
        break;
    case "Saturday":
    case "Sunday":
        System.out.println("Weekend");
        break;
    default:
        System.out.println("Invalid day");
}
\`\`\`

### for Loop

\`\`\`java
// Traditional for loop
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// Enhanced for-each loop
int[] nums = {1, 2, 3, 4, 5};
for (int n : nums) {
    System.out.println(n);
}
\`\`\`

### while and do-while

\`\`\`java
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}

// do-while: runs at least once
do {
    System.out.println(count);
    count--;
} while (count > 0);
\`\`\`

### break and continue

\`\`\`java
// break: exit loop early
for (int i = 0; i < 10; i++) {
    if (i == 5) break;
    System.out.println(i);
}

// continue: skip to next iteration
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    System.out.println(i);  // prints odd numbers only
}
\`\`\``,
      codeExample: `public class Main {\n    public static void main(String[] args) {\n        // if/else\n        int score = 85;\n        String grade;\n        if (score >= 90) grade = "A";\n        else if (score >= 80) grade = "B";\n        else if (score >= 70) grade = "C";\n        else grade = "F";\n        System.out.println("Score " + score + " → Grade " + grade);\n\n        // switch\n        String day = "Wednesday";\n        switch (day) {\n            case "Monday": case "Tuesday": case "Wednesday":\n            case "Thursday": case "Friday":\n                System.out.println(day + " is a weekday"); break;\n            case "Saturday": case "Sunday":\n                System.out.println(day + " is weekend"); break;\n            default:\n                System.out.println("Invalid day");\n        }\n\n        // for loop\n        System.out.println("\\nMultiplication table for 7:");\n        for (int i = 1; i <= 10; i++) {\n            System.out.printf("7 × %d = %d%n", i, 7 * i);\n        }\n\n        // for-each\n        String[] fruits = {"Apple", "Banana", "Cherry"};\n        System.out.println("\\nFruits:");\n        for (String fruit : fruits) {\n            System.out.println("  - " + fruit);\n        }\n\n        // while\n        System.out.println("\\nCountdown:");\n        int count = 5;\n        while (count > 0) {\n            System.out.println(count);\n            count--;\n        }\n        System.out.println("Liftoff!");\n    }\n}`,
      language: "java"
    },
    {
      id: "java-3",
      title: "Object-Oriented Programming",
      content: `## OOP — Java's Core Paradigm

Java is fundamentally object-oriented. Everything lives inside a class.

### Classes and Objects

\`\`\`java
public class Student {
    // Fields (instance variables)
    private String name;
    private double gpa;

    // Constructor
    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    // Methods
    public String getName() { return name; }
    public double getGpa() { return gpa; }

    public boolean isHonors() {
        return gpa >= 3.5;
    }

    @Override
    public String toString() {
        return name + " (GPA: " + gpa + ")";
    }
}
\`\`\`

### Creating Objects

\`\`\`java
Student alice = new Student("Alice", 3.85);
System.out.println(alice.getName());     // "Alice"
System.out.println(alice.isHonors());    // true
\`\`\`

### Encapsulation

Use \`private\` fields with \`public\` getters/setters:

\`\`\`java
private String name;

public String getName() { return name; }
public void setName(String name) {
    if (name == null || name.isBlank()) {
        throw new IllegalArgumentException("Name cannot be empty");
    }
    this.name = name;
}
\`\`\`

### Inheritance

\`\`\`java
public class Animal {
    protected String name;
    public void speak() { System.out.println("..."); }
}

public class Dog extends Animal {
    @Override
    public void speak() {
        System.out.println(name + " barks!");
    }
}
\`\`\`

### Polymorphism

\`\`\`java
Animal a = new Dog();
a.name = "Rex";
a.speak();  // "Rex barks!" (Dog's version runs)
\`\`\``,
      codeExample: `public class Student {\n    private String name;\n    private double gpa;\n\n    // Constructor\n    public Student(String name, double gpa) {\n        this.name = name;\n        this.gpa = gpa;\n    }\n\n    // Getters\n    public String getName() { return name; }\n    public double getGpa() { return gpa; }\n\n    // Methods\n    public boolean isHonors() { return gpa >= 3.5; }\n\n    @Override\n    public String toString() {\n        return String.format("%s (GPA: %.2f)%s", name, gpa, isHonors() ? " ★" : "");\n    }\n\n    public static void main(String[] args) {\n        // Create objects\n        Student alice = new Student("Alice", 3.85);\n        Student bob = new Student("Bob", 2.90);\n        Student carol = new Student("Carol", 3.95);\n\n        System.out.println(alice);\n        System.out.println(bob);\n        System.out.println(carol);\n\n        // Polymorphism with arrays\n        Student[] students = {alice, bob, carol};\n        System.out.println("\\nHonors students:");\n        for (Student s : students) {\n            if (s.isHonors()) {\n                System.out.println("  ★ " + s.getName());\n            }\n        }\n\n        // Average GPA\n        double sum = 0;\n        for (Student s : students) sum += s.getGpa();\n        System.out.printf("\\nAverage GPA: %.2f%n", sum / students.length);\n    }\n}`,
      language: "java"
    },
    {
      id: "java-4",
      title: "Interfaces and Abstract Classes",
      content: `## Interfaces and Abstract Classes

### Abstract Classes

A class that cannot be instantiated — designed to be extended:

\`\`\`java
public abstract class Shape {
    protected String color;

    public Shape(String color) { this.color = color; }

    // Abstract method — must be implemented by subclasses
    public abstract double area();

    // Concrete method — shared implementation
    public String getColor() { return color; }
}

public class Circle extends Shape {
    private double radius;
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    @Override
    public double area() { return Math.PI * radius * radius; }
}
\`\`\`

### Interfaces

A contract of methods that a class must implement:

\`\`\`java
public interface Drawable {
    void draw();  // implicitly public and abstract
}

public interface Resizable {
    void resize(double factor);
}

// A class can implement multiple interfaces
public class Button implements Drawable, Resizable {
    @Override
    public void draw() { System.out.println("Drawing button"); }

    @Override
    public void resize(double factor) { System.out.println("Resizing by " + factor); }
}
\`\`\`

### Default Methods

Interfaces can provide default implementations:

\`\`\`java
public interface Logger {
    void log(String message);

    default void logError(String message) {
        log("ERROR: " + message);
    }
}
\`\`\`

### When to Use What

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Multiple inheritance | No | Yes |
| Constructors | Yes | No |
| Instance variables | Yes | Only constants |
| Method implementations | Yes | Default methods only |
| Access modifiers | Any | public |`,
      codeExample: `// Abstract class\nabstract class Animal {\n    protected String name;\n\n    public Animal(String name) { this.name = name; }\n    public abstract void speak();\n    public String getName() { return name; }\n}\n\nclass Dog extends Animal {\n    public Dog(String name) { super(name); }\n    @Override\n    public void speak() { System.out.println(name + " says: Woof!"); }\n}\n\nclass Cat extends Animal {\n    public Cat(String name) { super(name); }\n    @Override\n    public void speak() { System.out.println(name + " says: Meow!"); }\n}\n\n// Interface\ninterface Swimmable {\n    void swim();\n    default String getMedium() { return "water"; }\n}\n\n// Multiple interfaces\nclass Duck extends Animal implements Swimmable {\n    public Duck(String name) { super(name); }\n    @Override\n    public void speak() { System.out.println(name + " says: Quack!"); }\n    @Override\n    public void swim() { System.out.println(name + " is swimming in " + getMedium()); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal[] animals = {\n            new Dog("Rex"),\n            new Cat("Whiskers"),\n            new Duck("Donald")\n        };\n\n        for (Animal a : animals) {\n            a.speak();\n            if (a instanceof Swimmable) {\n                ((Swimmable) a).swim();\n            }\n        }\n    }\n}`,
      language: "java"
    },
    {
      id: "java-5",
      title: "Collections Framework",
      content: `## Collections — Managing Groups of Objects

Java's Collections Framework provides ready-made data structures.

### Core Interfaces

\`\`\`java
Collection (root interface)
├── List (ordered, allows duplicates)
│   ├── ArrayList (fast random access)
│   └── LinkedList (fast insert/delete)
├── Set (no duplicates)
│   ├── HashSet (fast, unordered)
│   ├── LinkedHashSet (insertion order)
│   └── TreeSet (sorted)
└── Queue (FIFO)
    ├── PriorityQueue
    └── ArrayDeque
\`\`\`

### ArrayList

\`\`\`java
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Charlie");

names.get(0);           // "Alice"
names.remove("Bob");    // returns true
names.contains("Alice"); // true
names.size();            // 2
\`\`\`

### HashSet

\`\`\`java
Set<Integer> numbers = new HashSet<>();
numbers.add(1);
numbers.add(2);
numbers.add(2);  // duplicate ignored
numbers.size();   // 2
\`\`\`

### HashMap

\`\`\`java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);

scores.get("Alice");      // 95
scores.containsKey("Bob"); // true
scores.remove("Bob");

// Iterate
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
\`\`\`

### Collections Utility

\`\`\`java
Collections.sort(list);           // sort
Collections.reverse(list);        // reverse
Collections.shuffle(list);        // shuffle
Collections.unmodifiableList(list); // make immutable
\`\`\``,
      codeExample: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // ArrayList\n        List<String> fruits = new ArrayList<>();\n        fruits.add("Apple");\n        fruits.add("Banana");\n        fruits.add("Cherry");\n        fruits.add("Date");\n        System.out.println("Fruits: " + fruits);\n        System.out.println("First: " + fruits.get(0));\n        fruits.remove("Banana");\n        System.out.println("After remove: " + fruits);\n\n        // HashSet\n        Set<Integer> nums = new HashSet<>();\n        nums.add(10); nums.add(20); nums.add(30); nums.add(20);\n        System.out.println("\\nSet (no dupes): " + nums);\n\n        // HashMap\n        Map<String, Integer> ages = new HashMap<>();\n        ages.put("Alice", 25);\n        ages.put("Bob", 30);\n        ages.put("Carol", 28);\n        System.out.println("\\nAges: " + ages);\n        System.out.println("Alice's age: " + ages.get("Alice"));\n\n        // Iterating\n        System.out.println("\\nIterating map:");\n        for (Map.Entry<String, Integer> entry : ages.entrySet()) {\n            System.out.printf("  %s → %d%n", entry.getKey(), entry.getValue());\n        }\n\n        // Sorting\n        List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));\n        Collections.sort(numbers);\n        System.out.println("\\nSorted: " + numbers);\n\n        // Streaming\n        long count = ages.values().stream()\n            .filter(age -> age > 25)\n            .count();\n        System.out.println("Ages > 25: " + count);\n    }\n}`,
      language: "java"
    },
    {
      id: "java-6",
      title: "Exception Handling",
      content: `## Exception Handling — Managing Errors

Java uses checked and unchecked exceptions to handle errors gracefully.

### Exception Hierarchy

\`\`\`java
Throwable
├── Error (serious, don't catch: OutOfMemoryError)
└── Exception
    ├── IOException, SQLException (checked — must handle)
    └── RuntimeException
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        ├── IllegalArgumentException
        └── ClassCastException
\`\`\`

### try-catch-finally

\`\`\`java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Always runs");
}
\`\`\`

### Multiple Catch Blocks

\`\`\`java
try {
    // risky code
} catch (FileNotFoundException e) {
    System.out.println("File not found");
} catch (IOException e) {
    System.out.println("IO error");
} catch (Exception e) {
    System.out.println("Something else went wrong");
}
\`\`\`

### Custom Exceptions

\`\`\`java
public class InsufficientFundsException extends Exception {
    private double deficit;

    public InsufficientFundsException(double deficit) {
        super("Insufficient funds. Deficit: " + deficit);
        this.deficit = deficit;
    }

    public double getDeficit() { return deficit; }
}
\`\`\`

### try-with-resources

Automatically closes resources:

\`\`\`java
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
    System.out.println(line);
} // br is automatically closed here
\`\`\`

### Best Practices
- Catch specific exceptions, not generic \`Exception\`
- Don't catch \`Error\` — let the JVM handle it
- Use try-with-resources for auto-closeable resources
- Always include meaningful messages in custom exceptions`,
      codeExample: `import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    // Custom exception\n    static class AgeException extends Exception {\n        public AgeException(String msg) { super(msg); }\n    }\n\n    static void validateAge(int age) throws AgeException {\n        if (age < 0) throw new AgeException("Age cannot be negative: " + age);\n        if (age > 150) throw new AgeException("Age too high: " + age);\n    }\n\n    public static void main(String[] args) {\n        // Basic try-catch\n        try {\n            int result = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println("Caught: " + e.getMessage());\n        }\n\n        // Multiple catch\n        try {\n            int[] arr = {1, 2, 3};\n            System.out.println(arr[5]);\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println("Index error: " + e.getMessage());\n        } catch (Exception e) {\n            System.out.println("Other error: " + e.getMessage());\n        }\n\n        // Custom exception\n        try {\n            validateAge(25);\n            validateAge(-5);\n        } catch (AgeException e) {\n            System.out.println("Validation: " + e.getMessage());\n        }\n\n        // try-with-resources\n        try (Scanner sc = new Scanner("Hello World")) {\n            while (sc.hasNext()) {\n                System.out.print(sc.next() + " ");\n            }\n        }\n        System.out.println("\\n\\nScanner auto-closed!");\n    }\n}`,
      language: "java"
    },
    {
      id: "java-7",
      title: "Generics",
      content: `## Generics — Type-Safe Code

Generics let you write classes, interfaces, and methods that work with any type while maintaining type safety.

### Generic Class

\`\`\`java
public class Box<T> {
    private T content;

    public void set(T content) { this.content = content; }
    public T get() { return content; }
}

Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String value = stringBox.get();  // no casting needed
\`\`\`

### Multiple Type Parameters

\`\`\`java
public class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) { this.key = key; this.value = value; }
    public K getKey() { return key; }
    public V getValue() { return value; }
}

Pair<String, Integer> entry = new Pair<>("age", 25);
\`\`\`

### Bounded Types

\`\`\`java
// T must be a Number
public class Stats<T extends Number> {
    private T[] nums;
    public Stats(T[] nums) { this.nums = nums; }
    public double average() {
        double sum = 0;
        for (T num : nums) sum += num.doubleValue();
        return sum / nums.length;
    }
}
\`\`\`

### Wildcards

\`\`\`java
// ? extends Number: read-only, accepts Number or subclass
public void printList(List<? extends Number> list) {
    for (Number n : list) System.out.println(n);
}

// ? super Integer: write-only, accepts Integer or superclass
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}
\`\`\`

### Type Erasure

At runtime, generics are erased — \`List<String>\` and \`List<Integer>\` both become \`List\`. This means:
- You can't use \`new T()\` or \`instanceof T\`
- Primitive types can't be used (\`List<int>\` is invalid — use \`List<Integer>\`)`,
      codeExample: "import java.util.*;\n\npublic class Main {\n    // Generic class\n    static class Box<T> {\n        private T content;\n        public void set(T content) { this.content = content; }\n        public T get() { return content; }\n        @Override\n        public String toString() { return \"Box[\" + content + \"]\"; }\n    }\n\n    // Generic method\n    public static <T> List<T> arrayToList(T[] array) {\n        List<T> list = new ArrayList<>();\n        for (T item : array) list.add(item);\n        return list;\n    }\n\n    // Bounded type\n    static <T extends Comparable<T>> T findMax(T[] array) {\n        T max = array[0];\n        for (T item : array) {\n            if (item.compareTo(max) > 0) max = item;\n        }\n        return max;\n    }\n\n    public static void main(String[] args) {\n        Box<String> strBox = new Box<>();\n        strBox.set(\"Hello\");\n        System.out.println(strBox);\n\n        Box<Integer> intBox = new Box<>();\n        intBox.set(42);\n        System.out.println(intBox);\n\n        // Generic method\n        String[] words = {\"apple\", \"banana\", \"cherry\"};\n        List<String> wordList = arrayToList(words);\n        System.out.println(\"Words: \" + wordList);\n\n        Integer[] numbers = {5, 2, 8, 1, 9};\n        System.out.println(\"Max: \" + findMax(numbers));\n\n        String[] names = {\"Alice\", \"Bob\", \"Charlie\"};\n        System.out.println(\"Max: \" + findMax(names));\n    }\n}",
      language: "java"
    },
    {
      id: "java-8",
      title: "Lambda Expressions",
      content: `## Lambda Expressions — Concise Functions

Lambdas provide a short syntax for writing anonymous functions. Introduced in Java 8.

### Basic Syntax

\`\`\`java
// Traditional
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running");
    }
};

// Lambda
Runnable r = () -> System.out.println("Running");
\`\`\`

### With Parameters

\`\`\`java
// One parameter
Comparator<String> comp = (a, b) -> a.compareTo(b);

// Multiple parameters
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// No parameters
Supplier<Double> random = () -> Math.random();
\`\`\`

### Method References

Shorthand for lambdas that call a method:

\`\`\`java
// Lambda
list.forEach(item -> System.out.println(item));

// Method reference
list.forEach(System.out::println);

// Types of method references
String::valueOf          // static method
String::length           // instance method on parameter
System.out::println      // instance method on specific object
\`\`\`

### Functional Interfaces

Interfaces with a single abstract method:

\`\`\`java
@FunctionalInterface
interface Transformer<T, R> {
    R transform(T input);
}

Transformer<String, Integer> len = String::length;
len.transform("Hello");  // 5
\`\`\`

### Common Functional Interfaces

| Interface | Method | Description |
|-----------|--------|-------------|
| \`Predicate<T>\` | \`boolean test(T)\` | Tests a condition |
| \`Function<T, R>\` | \`R apply(T)\` | Transforms a value |
| \`Consumer<T>\` | \`void accept(T)\` | Consumes a value |
| \`Supplier<T>\` | \`T get()\` | Produces a value |

### Chaining

\`\`\`java
Function<String, String> trim = String::trim;
Function<String, String> upper = String::toUpperCase;
Function<String, String> pipeline = trim.andThen(upper);
pipeline.apply("  hello  ");  // "HELLO"
\`\`\``,
      codeExample: "import java.util.*;\nimport java.util.stream.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Lambda basics\n        Runnable greet = () -> System.out.println(\"Hello!\");\n        greet.run();\n\n        // With parameters\n        java.util.function.BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;\n        System.out.println(\"5 + 3 = \" + add.apply(5, 3));\n\n        // Method references\n        List<String> names = Arrays.asList(\"Alice\", \"Bob\", \"Charlie\");\n        names.forEach(System.out::println);\n\n        // Stream operations with lambdas\n        List<String> result = names.stream()\n            .filter(name -> name.length() > 3)\n            .map(String::toUpperCase)\n            .sorted()\n            .collect(Collectors.toList());\n        System.out.println(\"\\nFiltered: \" + result);\n\n        // Predicate\n        java.util.function.Predicate<Integer> isEven = n -> n % 2 == 0;\n        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);\n        List<Integer> evens = numbers.stream()\n            .filter(isEven)\n            .collect(Collectors.toList());\n        System.out.println(\"Evens: \" + evens);\n\n        // Reducing\n        int sum = numbers.stream()\n            .reduce(0, Integer::sum);\n        System.out.println(\"Sum: \" + sum);\n\n        // Chaining\n        java.util.function.Function<String, String> trim = String::trim;\n        java.util.function.Function<String, String> upper = String::toUpperCase;\n        java.util.function.Function<String, String> pipeline = trim.andThen(upper);\n        System.out.println(\"Pipeline: \" + pipeline.apply(\"  hello  \"));\n    }\n}",
      language: "java"
    },
    {
      id: "java-9",
      title: "Concurrency Basics",
      content: `## Concurrency — Doing Multiple Things at Once

Java provides built-in support for multithreading and concurrent programming.

### Creating Threads

\`\`\`java
// 1. Extending Thread
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + getName());
    }
}

// 2. Implementing Runnable
Runnable task = () -> {
    System.out.println("Task running");
};
new Thread(task).start();

// 3. ExecutorService (preferred)
ExecutorService executor = Executors.newFixedThreadPool(3);
executor.submit(() -> System.out.println("Pool task"));
executor.shutdown();
\`\`\`

### Synchronization

Prevent race conditions when multiple threads access shared data:

\`\`\`java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public int getCount() { return count; }
}
\`\`\`

### volatile Keyword

Ensures visibility of changes across threads:

\`\`\`java
private volatile boolean running = true;

public void stop() { running = false; }

public void run() {
    while (running) { /* work */ }
}
\`\`\`

### Locks

More flexible than synchronized:

\`\`\`java
private final ReentrantLock lock = new ReentrantLock();

public void safeMethod() {
    lock.lock();
    try {
        // critical section
    } finally {
        lock.unlock();
    }
}
\`\`\`

### Concurrent Collections

\`\`\`java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
\`\`\`

### Best Practices
- Prefer \`ExecutorService\` over manual thread creation
- Keep synchronized blocks small
- Use \`volatile\` for flags, \`synchronized\` for compound operations
- Avoid shared mutable state when possible`,
      codeExample: "import java.util.concurrent.*;\nimport java.util.concurrent.atomic.*;\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        // Thread basics\n        Thread t = new Thread(() -> {\n            System.out.println(\"Thread: \" + Thread.currentThread().getName());\n        });\n        t.start();\n        t.join();\n\n        // ExecutorService\n        System.out.println(\"\\nExecutorService:\");\n        ExecutorService executor = Executors.newFixedThreadPool(3);\n        for (int i = 0; i < 5; i++) {\n            int taskNum = i;\n            executor.submit(() -> {\n                System.out.printf(\"  Task %d on %s%n\", taskNum, Thread.currentThread().getName());\n            });\n        }\n        executor.shutdown();\n        executor.awaitTermination(5, TimeUnit.SECONDS);\n\n        // AtomicInteger for thread-safe counter\n        AtomicInteger counter = new AtomicInteger(0);\n        Runnable incrementTask = () -> {\n            for (int i = 0; i < 1000; i++) counter.incrementAndGet();\n        };\n\n        Thread t1 = new Thread(incrementTask);\n        Thread t2 = new Thread(incrementTask);\n        t1.start(); t2.start();\n        t1.join(); t2.join();\n        System.out.println(\"\\nCounter (atomic): \" + counter.get()); // 2000\n\n        // CompletableFuture\n        System.out.println(\"\\nCompletableFuture:\");\n        CompletableFuture.supplyAsync(() -> {\n            try { Thread.sleep(500); } catch (Exception e) {}\n            return \"Data loaded\";\n        }).thenAccept(result -> {\n            System.out.println(\"Result: \" + result);\n        }).join();\n    }\n}",
      language: "java"
    }
  ]
},

  {

    slug: "c-language",
    title: "C Language",

    description: "Master C programming from its origins to advanced topics — pointers, memory management, data structures, and system-level programming.",

    icon: "⚙️",

    color: "from-blue-500 to-indigo-600",
    category: "Languages",

    lessons: [
      {
        id: "1",
        title: "History, Origin & Why Learn C",
        content: `## Origin of C Language

C was developed between 1969 and 1973 at **Bell Labs** by **Dennis Ritchie**. It evolved from an earlier language called **B** (written by Ken Thompson), which itself came from **BCPL** (Basic Combined Programming Language by Martin Richards).

### Timeline
- **1969**: Ken Thompson writes B language at Bell Labs for Unix development
- **1971**: Dennis Ritchie begins developing C to add data types to B
- **1973**: C language is fully realized; Unix kernel is rewritten in C
- **1978**: "The C Programming Language" book (K&R C) published by Kernighan & Ritchie
- **1989**: ANSI C standard (C89/C90) established
- **1999**: C99 standard — added inline functions, variable-length arrays, // comments
- **2011**: C11 standard — added _Generic, _Static_assert, threads
- **2018**: C18 standard — bug fixes for C11
- **2023**: C23 standard — latest standard with new features

### Why C Was Created
Unix was originally written in assembly language. Assembly is:
- Platform-dependent (tied to specific hardware)
- Hard to read and maintain
- Not portable across machines

Ritchie wanted a language that was:
- Close to the hardware (like assembly)
- Portable across different machines
- High-level enough to be readable

C solved all three problems. The Unix kernel was rewritten in C, proving that an operating system could be written in a high-level language.

## Why Learn C?

### 1. Foundation of Modern Programming
C is the "mother language" of programming. Many languages borrow from C:
- **C++**: Direct extension of C
- **Java**: Syntax derived from C
- **Python**: Written in C (CPython interpreter)
- **JavaScript**: Syntax influenced by C
- **Go, Rust, Swift**: All heavily influenced by C

### 2. Operating Systems
Nearly all operating system kernels are written in C:
- **Linux** kernel: ~95% C
- **Windows**: Core written in C
- **macOS/iOS**: Darwin kernel in C
- **Android**: Linux kernel (C)

### 3. Embedded Systems & IoT
C dominates embedded programming because:
- Minimal runtime overhead
- Direct hardware access
- Predictable performance
- Small binary size

### 4. Performance
C compiles directly to machine code. No virtual machine, no garbage collector. This makes C one of the fastest languages available.

### 5. Portability
C code can run on virtually any platform with a C compiler — from microcontrollers to supercomputers.

### 6. Understanding How Computers Work
Learning C teaches you:
- How memory actually works (stack vs heap)
- How data is stored in memory
- How function calls work at the machine level
- How operating systems manage processes

## Advantages of C
- **Speed**: One of the fastest compiled languages
- **Portability**: Runs on almost any platform
- **Minimal runtime**: Small executable size
- **Direct memory access**: Pointers allow low-level control
- **Rich library**: Standard library covers I/O, strings, math, memory
- **Extensible**: Can call assembly, be called from other languages
- **Battle-tested**: 50+ years of use in production systems

## Disadvantages of C
- **No built-in OOP**: No classes, inheritance, polymorphism
- **Manual memory management**: Risk of leaks, dangling pointers
- **No bounds checking**: Array out-of-bounds causes undefined behavior
- **No garbage collector**: Must manually free memory
- **Verbose error handling**: No exceptions; must check return codes
- **No built-in data structures**: No hash maps, trees, etc. — must implement your own`,
        codeExample: `#include <stdio.h>

// C was created to rewrite Unix in a portable language.
// This simple program demonstrates C's syntax and philosophy:
// small, efficient, close to the hardware.

int main() {
    // C has a minimal runtime — this is the simplest valid program
    printf("C Language — Created by Dennis Ritchie at Bell Labs (1972)\\n");
    printf("Unix was rewritten in C, proving high-level languages could build OS\\n\\n");

    // C's philosophy: trust the programmer
    // You have full control, but also full responsibility

    // Data types — C is statically typed
    int year = 1972;           // Integer
    float pi = 3.14f;         // Single precision float
    double precise = 3.141592653589793; // Double precision
    char letter = 'C';        // Single character
    int isAlive = 1;          // Boolean (C99 has _Bool)

    printf("C was born in %d\\n", year);
    printf("Pi: %.10f\\n", precise);
    printf("Language: %c\\n", letter);
    printf("Still relevant: %s\\n", isAlive ? "Yes" : "No");

    // sizeof — C lets you inspect type sizes at compile time
    printf("\\nType sizes on this system:\\n");
    printf("char: %lu byte\\n", sizeof(char));
    printf("int: %lu bytes\\n", sizeof(int));
    printf("float: %lu bytes\\n", sizeof(float));
    printf("double: %lu bytes\\n", sizeof(double));
    printf("pointer: %lu bytes\\n", sizeof(void*));

    return 0;
}`,
        language: "c"
      },
      {
        id: "2",
        title: "Environment Setup & First Program",
        content: `## Setting Up Your C Development Environment

### On Windows
1. Install **MinGW-w64** (GCC compiler for Windows)
   - Download from: https://www.mingw-w64.org/
   - Or use MSYS2: https://www.msys2.org/
2. Add MinGW bin directory to your PATH
3. Verify: open Command Prompt and type \`gcc --version\`

### On macOS
1. Install Xcode Command Line Tools:
   \`xcode-select --install\`
2. Verify: \`gcc --version\` (uses Apple Clang)

### On Linux (Ubuntu/Debian)
\`\`\`bash
sudo apt update
sudo apt install build-essential
gcc --version
\`\`\`

### Using an Online Compiler
For quick testing, use:
- https://onlinegdb.com/online_c_compiler
- https://www.programiz.com/c-programming/online-compiler

## Compiling and Running

### Basic Compilation
\`\`\`bash
gcc program.c -o program
./program
\`\`\`

### With Warnings (Recommended)
\`\`\`bash
gcc -Wall -Wextra program.c -o program
\`\`\`

### With Debug Symbols
\`\`\`bash
gcc -g program.c -o program
\`\`\`

## The Compilation Process
1. **Preprocessing**: Handles #include, #define, macros
2. **Compilation**: Converts C code to assembly
3. **Assembly**: Converts assembly to object code (.o)
4. **Linking**: Combines object files with libraries to create executable

## Anatomy of a C Program
- \`#include\` — Preprocessor directive to include header files
- \`int main()\` — Entry point of every C program
- \`return 0\` — Tells the OS the program ran successfully
- Semicolons \`;\` — End every statement
- Curly braces \`{}\` — Define code blocks`,
        codeExample: `// program.c — Your first C program
// Compile: gcc program.c -o program
// Run: ./program (Linux/Mac) or program.exe (Windows)

#include <stdio.h>   // Standard Input/Output library
#include <string.h>  // String manipulation
#include <stdlib.h>  // Standard library (malloc, free, etc.)
#include <math.h>    // Math functions (compile with -lm)

int main() {
    // ============================================
    // C PROGRAM STRUCTURE
    // ============================================
    // 1. Preprocessor directives (#include)
    // 2. Global declarations (optional)
    // 3. main() function — entry point
    // 4. Other functions (optional)

    printf("=== C Program Structure ===\\n\\n");

    // ============================================
    // BASIC OUTPUT
    // ============================================
    printf("Hello, World!\\n");
    printf("Welcome to C Programming\\n\\n");

    // ============================================
    // FORMATTED OUTPUT (printf)
    // ============================================
    printf("=== Formatted Output ===\\n");
    int age = 25;
    float gpa = 3.85;
    char grade = 'A';

    printf("Age: %d\\n", age);           // %d = integer
    printf("GPA: %.2f\\n", gpa);        // %.2f = float with 2 decimals
    printf("Grade: %c\\n", grade);      // %c = character
    printf("Name: %s\\n", "Alice");     // %s = string
    printf("Address: %p\\n", (void*)&age); // %p = pointer address
    printf("Size of int: %lu bytes\\n", sizeof(int)); // %lu = unsigned long

    // ============================================
    // BASIC INPUT (scanf)
    // ============================================
    printf("\\n=== Input ===\\n");
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);  // & is the address-of operator
    printf("You entered: %d\\n", num);

    // ============================================
    // COMMENTS
    // ============================================
    // This is a single-line comment

    /*
       This is a
       multi-line comment
    */

    // ============================================
    // RETURN VALUE
    // ============================================
    // return 0 tells the OS the program succeeded
    // Non-zero return values indicate errors
    return 0;
}`,
        language: "c"
      },
      {
        id: "3",
        title: "Data Types & Variables",
        content: `## C Data Types

C is a **statically typed** language — you must declare the type of every variable before using it.

### Fundamental Data Types

| Type | Size | Range | Format Specifier |
|------|------|-------|-----------------|
| char | 1 byte | -128 to 127 | %c |
| unsigned char | 1 byte | 0 to 255 | %c |
| short | 2 bytes | -32,768 to 32,767 | %hd |
| unsigned short | 2 bytes | 0 to 65,535 | %hu |
| int | 4 bytes | -2.1B to 2.1B | %d |
| unsigned int | 4 bytes | 0 to 4.2B | %u |
| long | 8 bytes | Very large | %ld |
| unsigned long | 8 bytes | 0 to very large | %lu |
| float | 4 bytes | 6-7 decimal digits | %f |
| double | 8 bytes | 15-16 decimal digits | %lf |
| long double | 16 bytes | 18-19 digits | %Lf |

### Type Modifiers
- \`unsigned\` — Only positive values (doubles the positive range)
- \`signed\` — Can be positive or negative (default)
- \`short\` — Smaller storage
- \`long\` — Larger storage
- \`long long\` — Even larger (C99)

### Constants
- \`#define PI 3.14159\` — Preprocessor constant (no type checking)
- \`const int MAX = 100;\` — Typed constant (type-safe, preferred)
- \`enum Color { RED, GREEN, BLUE };\` — Enumeration constants

### Variable Naming Rules
1. Must start with a letter or underscore
2. Can contain letters, digits, underscores
3. Case-sensitive (\`count\` ≠ \`Count\` ≠ \`COUNT\`)
4. Cannot use C keywords (\`int\`, \`return\`, \`if\`, etc.)
5. No spaces or special characters
6. Descriptive names are best practice

### Variable Scope
- **Local variables**: Declared inside a function, exist only during function execution
- **Global variables**: Declared outside all functions, accessible everywhere
- **Static variables**: \`static\` keyword — persists between function calls`,
        codeExample: `#include <stdio.h>
#include <limits.h>   // For integer limits
#include <float.h>    // For float limits

int main() {
    // ============================================
    // INTEGER TYPES
    // ============================================
    printf("=== Integer Types ===\\n");

    char c = 'A';                    // 1 byte
    unsigned char uc = 255;          // 1 byte, unsigned
    short s = -32000;                // 2 bytes
    unsigned short us = 65000;       // 2 bytes, unsigned
    int n = 1000000;                 // 4 bytes
    unsigned int un = 3000000000U;   // 4 bytes, unsigned
    long l = 9999999999L;            // 8 bytes
    long long ll = 9999999999999LL;  // 8 bytes

    printf("char: %c (%d bytes)\\n", c, sizeof(char));
    printf("short: %d (%lu bytes)\\n", s, sizeof(short));
    printf("int: %d (%lu bytes)\\n", n, sizeof(int));
    printf("long: %ld (%lu bytes)\\n", l, sizeof(long));
    printf("long long: %lld (%lu bytes)\\n", ll, sizeof(long long));

    // ============================================
    // FLOATING POINT TYPES
    // ============================================
    printf("\\n=== Floating Point Types ===\\n");

    float f = 3.14f;                    // 4 bytes, ~7 digits precision
    double d = 3.141592653589793;       // 8 bytes, ~15 digits precision
    long double ld = 3.141592653589793238L; // 16 bytes

    printf("float: %.10f (%lu bytes)\\n", f, sizeof(float));
    printf("double: %.15lf (%lu bytes)\\n", d, sizeof(double));
    printf("long double: %.18Lf (%lu bytes)\\n", ld, sizeof(long double));

    // ============================================
    // TYPE LIMITS
    // ============================================
    printf("\\n=== Type Limits ===\\n");
    printf("int range: %d to %d\\n", INT_MIN, INT_MAX);
    printf("unsigned int range: 0 to %u\\n", UINT_MAX);
    printf("float range: %e to %e\\n", FLT_MIN, FLT_MAX);
    printf("double range: %e to %e\\n", DBL_MIN, DBL_MAX);

    // ============================================
    // CONSTANTS
    // ============================================
    printf("\\n=== Constants ===\\n");

    const double PI = 3.14159265358979;
    const int MAX_SIZE = 100;
    const char NEWLINE = '\\n';

    printf("PI = %.10f\\n", PI);
    printf("MAX_SIZE = %d\\n", MAX_SIZE);
    printf("sizeof(PI) = %lu bytes\\n", sizeof(PI));

    // ============================================
    // TYPE CONVERSION (Implicit)
    // ============================================
    printf("\\n=== Implicit Type Conversion ===\\n");

    int intVal = 10;
    double doubleVal = 3.14;

    // int is automatically promoted to double
    double result = intVal + doubleVal;
    printf("%d + %.2f = %.2f\\n", intVal, doubleVal, result);

    // char is promoted to int in arithmetic
    char a = 'A';
    printf("'A' = %d (ASCII value)\\n", a);
    printf("'A' + 1 = %d = '%c'\\n", a + 1, a + 1);

    // ============================================
    // EXPLICIT TYPE CASTING
    // ============================================
    printf("\\n=== Explicit Casting ===\\n");

    int x = 7, y = 2;
    printf("Integer division: %d / %d = %d\\n", x, y, x / y);
    printf("Float division: %d / %d = %.2f\\n", x, y, (double)x / y);

    return 0;
}`,
        language: "c"
      },
      {
        id: "4",
        title: "Operators",
        content: `## Operators in C

Operators are symbols that perform operations on variables and values.

### 1. Arithmetic Operators
- \`+\` Addition
- \`-\` Subtraction
- \`*\` Multiplication
- \`/\` Division (integer division if both operands are int)
- \`%\` Modulus (remainder, integers only)
- \`++\` Increment (prefix and postfix)
- \`--\` Decrement (prefix and postfix)

**Prefix vs Postfix:**
- \`++x\` — Increments first, then uses the value
- \`x++\` — Uses the value first, then increments

### 2. Relational (Comparison) Operators
- \`==\` Equal to
- \`!=\` Not equal to
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal to
- \`<=\` Less than or equal to

**Important:** \`==\` (comparison) vs \`=\` (assignment). Using \`=\` in an if condition is a common bug.

### 3. Logical Operators
- \`&&\` Logical AND — true if both operands are true
- \`||\` Logical OR — true if at least one operand is true
- \`!\` Logical NOT — reverses the boolean value

**Short-circuit evaluation:**
- In \`a && b\`, if \`a\` is false, \`b\` is not evaluated
- In \`a || b\`, if \`a\` is true, \`b\` is not evaluated

### 4. Bitwise Operators
- \`&\` AND
- \`|\` OR
- \`^\` XOR
- \`~\` NOT (complement)
- \`<<\` Left shift
- \`>>\` Right shift

### 5. Assignment Operators
- \`=\` Simple assignment
- \`+=\` Add and assign
- \`-=\` Subtract and assign
- \`*=\` Multiply and assign
- \`/=\` Divide and assign
- \`%=\` Modulus and assign
- \`&=\`, \`|=\`, \`^=\`, \`<<=\`, \`>>=\` Bitwise assignments

### 6. Ternary (Conditional) Operator
\`condition ? expr_if_true : expr_if_false\`

Shorthand for simple if-else statements.

### 7. Sizeof Operator
\`sizeof(type)\` — Returns the size in bytes of a data type or variable.

### Operator Precedence (Highest to Lowest)
1. \`()\` \`[]\` \`->\` \`.\` (postfix)
2. \`++\` \`--\` (postfix)
3. \`!\` \`~\` \`++\` \`--\` (unary)
4. \`*\` \`/\` \`%\` (multiplicative)
5. \`+\` \`-\` (additive)
6. \`<<\` \`>>\` (shift)
7. \`<\` \`<=\` \`>\` \`>=\` (relational)
8. \`==\` \`!=\` (equality)
9. \`&\` (bitwise AND)
10. \`^\` (bitwise XOR)
11. \`|\` (bitwise OR)
12. \`&&\` (logical AND)
13. \`||\` (logical OR)
14. \`?:\` (ternary)
15. \`=\` \`+=\` etc. (assignment)`,
        codeExample: `#include <stdio.h>

int main() {
    // ============================================
    // ARITHMETIC OPERATORS
    // ============================================
    printf("=== Arithmetic Operators ===\\n");
    int a = 17, b = 5;

    printf("%d + %d = %d\\n", a, b, a + b);    // 22
    printf("%d - %d = %d\\n", a, b, a - b);    // 12
    printf("%d * %d = %d\\n", a, b, a * b);    // 85
    printf("%d / %d = %d\\n", a, b, a / b);    // 3 (integer division)
    printf("%d %% %d = %d\\n", a, b, a % b);   // 2 (remainder)

    // Increment / Decrement
    int x = 5;
    printf("\\nx = %d\\n", x);
    printf("x++ = %d (postfix, uses then increments)\\n", x++);
    printf("Now x = %d\\n", x);
    printf("++x = %d (prefix, increments then uses)\\n", ++x);

    // ============================================
    // RELATIONAL OPERATORS
    // ============================================
    printf("\\n=== Relational Operators ===\\n");
    int p = 10, q = 20;

    printf("%d == %d: %d\\n", p, q, p == q);   // 0 (false)
    printf("%d != %d: %d\\n", p, q, p != q);   // 1 (true)
    printf("%d > %d: %d\\n", p, q, p > q);     // 0
    printf("%d < %d: %d\\n", p, q, p < q);     // 1
    printf("%d >= %d: %d\\n", p, q, p >= q);   // 0
    printf("%d <= %d: %d\\n", p, q, p <= q);   // 1

    // ============================================
    // LOGICAL OPERATORS
    // ============================================
    printf("\\n=== Logical Operators ===\\n");
    int t = 1, f = 0;

    printf("true && true = %d\\n", t && t);     // 1
    printf("true && false = %d\\n", t && f);    // 0
    printf("true || false = %d\\n", t || f);    // 1
    printf("!true = %d\\n", !t);                // 0
    printf("!false = %d\\n", !f);               // 1

    // Short-circuit evaluation
    int val = 0;
    // Second expression won't execute because first is false
    if (val != 0 && 10 / val > 2) {
        printf("Safe division\\n");
    } else {
        printf("Short-circuit prevented division by zero\\n");
    }

    // ============================================
    // BITWISE OPERATORS
    // ============================================
    printf("\\n=== Bitwise Operators ===\\n");
    unsigned int m = 12, n = 10;  // 12=1100, 10=1010

    printf("%u & %u = %u\\n", m, n, m & n);     // 8  (1000)
    printf("%u | %u = %u\\n", m, n, m | n);     // 14 (1110)
    printf("%u ^ %u = %u\\n", m, n, m ^ n);     // 6  (0110)
    printf("~%u = %u\\n", m, ~m);                // Complement
    printf("%u << 2 = %u\\n", m, m << 2);       // 48 (110000)
    printf("%u >> 2 = %u\\n", m, m >> 2);       // 3  (11)

    // ============================================
    // TERNARY OPERATOR
    // ============================================
    printf("\\n=== Ternary Operator ===\\n");
    int age = 20;
    printf("Age %d: %s\\n", age, (age >= 18) ? "Adult" : "Minor");

    // ============================================
    // OPERATOR PRECEDENCE
    // ============================================
    printf("\\n=== Precedence Matters ===\\n");
    int result1 = 2 + 3 * 4;    // 14 (multiplication first)
    int result2 = (2 + 3) * 4;  // 20 (parentheses override)
    printf("2 + 3 * 4 = %d\\n", result1);
    printf("(2 + 3) * 4 = %d\\n", result2);

    return 0;
}`,
        language: "c"
      },
      {
        id: "5",
        title: "Control Flow — if, else, switch",
        content: `## Control Flow in C

Control flow determines the order in which statements are executed.

### if Statement
Executes a block of code only if the condition is true.

### if-else Statement
Provides an alternative block when the condition is false.

### if-else if-else Ladder
Tests multiple conditions in sequence.

### Nested if
An if statement inside another if statement.

### switch Statement
A multi-way branch based on the value of an integer expression.

**switch rules:**
- The expression must evaluate to an integer or character
- Each case must be a constant expression
- Use \`break\` after each case (otherwise execution "falls through")
- \`default\` handles unmatched cases
- Cases can be in any order

### When to Use switch vs if-else
- **switch**: When comparing a single variable against multiple constant values
- **if-else**: When conditions are complex or involve ranges`,
        codeExample: `#include <stdio.h>

int main() {
    // ============================================
    // IF STATEMENT
    // ============================================
    printf("=== if Statement ===\\n");
    int temperature = 35;

    if (temperature > 30) {
        printf("It's hot outside! (%d°C)\\n", temperature);
    }

    // ============================================
    // IF-ELSE
    // ============================================
    printf("\\n=== if-else ===\\n");
    int age = 16;

    if (age >= 18) {
        printf("You can vote\\n");
    } else {
        printf("You cannot vote yet (need %d more years)\\n", 18 - age);
    }

    // ============================================
    // IF-ELSE IF-ELSE LADDER
    // ============================================
    printf("\\n=== Grading System ===\\n");
    int marks = 78;

    if (marks >= 90) {
        printf("Grade: A+ (Excellent)\\n");
    } else if (marks >= 80) {
        printf("Grade: A (Very Good)\\n");
    } else if (marks >= 70) {
        printf("Grade: B (Good)\\n");
    } else if (marks >= 60) {
        printf("Grade: C (Average)\\n");
    } else if (marks >= 50) {
        printf("Grade: D (Pass)\\n");
    } else {
        printf("Grade: F (Fail)\\n");
    }

    // ============================================
    // NESTED IF
    // ============================================
    printf("\\n=== Nested if ===\\n");
    int num = 15;

    if (num > 0) {
        printf("%d is positive\\n", num);
        if (num % 2 == 0) {
            printf("%d is even\\n", num);
        } else {
            printf("%d is odd\\n", num);
        }
    } else if (num < 0) {
        printf("%d is negative\\n", num);
    } else {
        printf("The number is zero\\n");
    }

    // ============================================
    // SWITCH STATEMENT
    // ============================================
    printf("\\n=== switch Statement ===\\n");
    int day = 3;

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        case 4:
            printf("Thursday\\n");
            break;
        case 5:
            printf("Friday\\n");
            break;
        case 6:
            printf("Saturday\\n");
            break;
        case 7:
            printf("Sunday\\n");
            break;
        default:
            printf("Invalid day (%d)\\n", day);
    }

    // ============================================
    // SWITCH — FALL THROUGH (grouping cases)
    // ============================================
    printf("\\n=== Weekday vs Weekend ===\\n");
    switch (day) {
        case 1: case 2: case 3: case 4: case 5:
            printf("It's a weekday\\n");
            break;
        case 6: case 7:
            printf("It's the weekend!\\n");
            break;
        default:
            printf("Invalid day\\n");
    }

    // ============================================
    // SWITCH — CHARACTER MATCHING
    // ============================================
    printf("\\n=== Character switch ===\\n");
    char grade = 'B';

    switch (grade) {
        case 'A':
            printf("Excellent\\n");
            break;
        case 'B':
            printf("Good\\n");
            break;
        case 'C':
            printf("Average\\n");
            break;
        default:
            printf("Unknown grade\\n");
    }

    // ============================================
    // TERNARY AS SHORTHAND
    // ============================================
    printf("\\n=== Ternary Operator ===\\n");
    int x = 42;
    printf("%d is %s\\n", x, (x % 2 == 0) ? "even" : "odd");

    return 0;
}`,
        language: "c"
      },
      {
        id: "6",
        title: "Loops — for, while, do-while",
        content: `## Loops in C

Loops execute a block of code repeatedly until a condition is met.

### for Loop
\`for (initialization; condition; update) { ... }\`
- Best when you know the number of iterations
- The three parts are separated by semicolons
- All three parts are optional

### while Loop
\`while (condition) { ... }\`
- Tests the condition BEFORE each iteration
- May execute zero times if condition is initially false
- Best when the number of iterations is unknown

### do-while Loop
\`do { ... } while (condition);\`
- Tests the condition AFTER each iteration
- Always executes at least once
- Note the semicolon after while

### Loop Control
- \`break\` — Immediately exits the loop
- \`continue\` — Skips to the next iteration
- \`goto\` — Jumps to a label (generally avoided, but used in error handling)

### Nested Loops
A loop inside another loop. The inner loop completes all its iterations for each iteration of the outer loop.

### Infinite Loops
Loops that never end. Can be intentional (event loops, servers) or accidental (missing update).

**Common mistake:** Using \`=\` (assignment) instead of \`==\` (comparison) in the loop condition.`,
        codeExample: `#include <stdio.h>

int main() {
    // ============================================
    // FOR LOOP
    // ============================================
    printf("=== for Loop ===\\n");

    // Count from 1 to 10
    for (int i = 1; i <= 10; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    // Count backwards
    for (int i = 10; i >= 1; i--) {
        printf("%d ", i);
    }
    printf("\\n");

    // Multiplication table
    printf("\\nMultiplication table for 7:\\n");
    for (int i = 1; i <= 10; i++) {
        printf("7 x %2d = %2d\\n", i, 7 * i);
    }

    // ============================================
    // WHILE LOOP
    // ============================================
    printf("\\n=== while Loop ===\\n");

    // Sum of first N natural numbers
    int n = 100;
    int sum = 0;
    int i = 1;

    while (i <= n) {
        sum += i;
        i++;
    }
    printf("Sum of 1 to %d = %d\\n", n, sum);

    // Reverse a number
    int num = 12345;
    int reversed = 0;
    int temp = num;

    while (temp != 0) {
        reversed = reversed * 10 + temp % 10;
        temp /= 10;
    }
    printf("Reversed %d -> %d\\n", num, reversed);

    // ============================================
    // DO-WHILE LOOP
    // ============================================
    printf("\\n=== do-while Loop ===\\n");

    // Menu-driven program (runs at least once)
    int choice;
    do {
        printf("\\n1. Add\\n2. Subtract\\n3. Multiply\\n0. Exit\\n");
        printf("Enter choice: ");
        // In real programs, use scanf here
        choice = 0; // Simulating exit for demo
        if (choice != 0) {
            printf("You chose option %d\\n", choice);
        }
    } while (choice != 0);
    printf("Program exited\\n");

    // ============================================
    // BREAK AND CONTINUE
    // ============================================
    printf("\\n=== break ===\\n");

    // Find the first number divisible by both 3 and 7
    for (int i = 1; i <= 100; i++) {
        if (i % 3 == 0 && i % 7 == 0) {
            printf("First number divisible by 3 and 7: %d\\n", i);
            break;  // Exit loop once found
        }
    }

    printf("\\n=== continue ===\\n");

    // Print only odd numbers (skip even)
    printf("Odd numbers from 1 to 20: ");
    for (int i = 1; i <= 20; i++) {
        if (i % 2 == 0) {
            continue;  // Skip even numbers
        }
        printf("%d ", i);
    }
    printf("\\n");

    // ============================================
    // NESTED LOOPS
    // ============================================
    printf("\\n=== Nested Loops — Pattern ===\\n");

    int rows = 5;
    for (int r = 1; r <= rows; r++) {
        for (int c = 1; c <= r; c++) {
            printf("* ");
        }
        printf("\\n");
    }

    // ============================================
    // FIBONACCI SEQUENCE
    // ============================================
    printf("\\n=== Fibonacci (first 15 terms) ===\\n");
    int a = 0, b = 1;
    for (int i = 0; i < 15; i++) {
        printf("%d ", a);
        int next = a + b;
        a = b;
        b = next;
    }
    printf("\\n");

    // ============================================
    // PRIME NUMBER CHECK
    // ============================================
    printf("\\n=== Prime Numbers (1 to 50) ===\\n");
    for (int num = 2; num <= 50; num++) {
        int isPrime = 1;
        for (int j = 2; j * j <= num; j++) {
            if (num % j == 0) {
                isPrime = 0;
                break;
            }
        }
        if (isPrime) {
            printf("%d ", num);
        }
    }
    printf("\\n");

    return 0;
}`,
        language: "c"
      },
      {
        id: "7",
        title: "Functions",
        content: `## Functions in C

A function is a reusable block of code that performs a specific task.

### Function Syntax
\`\`\`c
return_type function_name(parameters) {
    // body
    return value;
}
\`\`\`

### Function Declaration (Prototype)
Declares the function before main() so the compiler knows about it.
\`\`\`c
int add(int a, int b);  // Prototype
\`\`\`

### Pass by Value vs Pass by Reference
- **Pass by value**: A copy of the variable is passed. Changes inside the function don't affect the original.
- **Pass by reference**: A pointer to the variable is passed. Changes inside the function affect the original.

### Recursion
A function that calls itself. Must have:
1. **Base case** — stops the recursion
2. **Recursive case** — makes progress toward the base case

### Storage Classes
- \`auto\` — Default for local variables (automatic storage)
- \`static\` — Persists between function calls, initialized once
- \`extern\` — Declares a variable defined in another file
- \`register\` — Suggests storing in a CPU register (rarely used today)`,
        codeExample: `#include <stdio.h>

// ============================================
// FUNCTION DECLARATIONS (Prototypes)
// ============================================
int add(int a, int b);
void swap(int *a, int *b);
int factorial(int n);
int fibonacci(int n);
void printArray(int arr[], int size);
int isPrime(int num);

// ============================================
// BASIC FUNCTIONS
// ============================================
int add(int a, int b) {
    return a + b;
}

// Pass by reference — modifies the original variables
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// ============================================
// RECURSIVE FUNCTIONS
// ============================================
int factorial(int n) {
    if (n <= 1) return 1;       // Base case
    return n * factorial(n - 1); // Recursive case
}

int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
void printArray(int arr[], int size) {
    printf("[");
    for (int i = 0; i < size; i++) {
        printf("%d", arr[i]);
        if (i < size - 1) printf(", ");
    }
    printf("]\\n");
}

int isPrime(int num) {
    if (num < 2) return 0;
    for (int i = 2; i * i <= num; i++) {
        if (num % i == 0) return 0;
    }
    return 1;
}

// ============================================
// MAIN FUNCTION
// ============================================
int main() {
    // ============================================
    // BASIC FUNCTION CALLS
    // ============================================
    printf("=== Basic Functions ===\\n");
    int result = add(15, 27);
    printf("15 + 27 = %d\\n", result);

    // ============================================
    // PASS BY VALUE vs REFERENCE
    // ============================================
    printf("\\n=== Pass by Value vs Reference ===\\n");
    int x = 10, y = 20;

    printf("Before swap: x=%d, y=%d\\n", x, y);

    // This won't work (pass by value)
    // swap(x, y);  // Only swaps local copies

    // This works (pass by reference)
    swap(&x, &y);  // Pass addresses
    printf("After swap:  x=%d, y=%d\\n", x, y);

    // ============================================
    // RECURSION
    // ============================================
    printf("\\n=== Recursion ===\\n");

    printf("5! = %d\\n", factorial(5));   // 120
    printf("10! = %d\\n", factorial(10)); // 3628800

    printf("Fibonacci(10) = %d\\n", fibonacci(10)); // 55

    // Print first 10 Fibonacci numbers
    printf("Fibonacci sequence: ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");

    // ============================================
    // FUNCTION AS UTILITY
    // ============================================
    printf("\\n=== Prime Numbers ===\\n");
    printf("Primes up to 30: ");
    for (int i = 2; i <= 30; i++) {
        if (isPrime(i)) {
            printf("%d ", i);
        }
    }
    printf("\\n");

    // ============================================
    // STATIC VARIABLES IN FUNCTIONS
    // ============================================
    printf("\\n=== Static Variable ===\\n");

    // Static variable persists between calls
    // (demonstrated via a counter function concept)
    printf("Static variables retain their value between function calls\\n");
    printf("Useful for: counters, caches, state machines\\n");

    return 0;
}`,
        language: "c"
      },
      {
        id: "8",
        title: "Arrays",
        content: `## Arrays in C

An array is a collection of elements of the same type stored in contiguous memory.

### Array Declaration
\`\`\`c
int numbers[10];           // Declares an array of 10 integers
int nums[] = {1, 2, 3};   // Declaration with initialization
int arr[5] = {1, 2};      // Remaining elements initialized to 0
\`\`\`

### Array Access
- Indexing starts at 0
- Access: \`arr[index]\`
- Size: \`sizeof(arr) / sizeof(arr[0])\`

### Array Memory
- Arrays are stored in contiguous memory locations
- Array name acts as a pointer to the first element
- \`arr\` is equivalent to \`&arr[0]\`
- \`arr[i]\` is equivalent to \`*(arr + i)\`

### Arrays as Function Parameters
When passing arrays to functions:
- Arrays always decay to pointers
- You must pass the size separately
- Changes to the array inside the function affect the original

### Multidimensional Arrays
- 2D array: \`int matrix[3][4];\` — 3 rows, 4 columns
- Stored in row-major order (row by row in memory)
- Access: \`matrix[row][col]\`

### Common Array Operations
- Traversal: Visit each element
- Search: Find an element (linear or binary search)
- Insert: Add an element at a position
- Delete: Remove an element from a position
- Sort: Arrange elements in order
- Reverse: Reverse the order of elements`,
        codeExample: `#include <stdio.h>

// Function to print array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Function to find maximum
int findMax(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Function to reverse array
void reverseArray(int arr[], int size) {
    for (int i = 0; i < size / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}

// Linear search
int linearSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main() {
    // ============================================
    // ARRAY DECLARATION & INITIALIZATION
    // ============================================
    printf("=== Array Basics ===\\n");

    int numbers[5] = {10, 20, 30, 40, 50};
    int zeros[5] = {0};                    // All zeros
    int mixed[] = {1, 2, 3, 4, 5};         // Size inferred

    printf("Size of numbers: %lu elements\\n", sizeof(numbers) / sizeof(numbers[0]));
    printf("First element: %d\\n", numbers[0]);
    printf("Last element: %d\\n", numbers[4]);

    // ============================================
    // ARRAY TRAVERSAL
    // ============================================
    printf("\\n=== Traversal ===\\n");
    printf("Elements: ");
    printArray(numbers, 5);

    // ============================================
    // ARRAY OPERATIONS
    // ============================================
    printf("\\n=== Operations ===\\n");
    printf("Max value: %d\\n", findMax(numbers, 5));

    // Linear search
    int target = 30;
    int index = linearSearch(numbers, 5, target);
    printf("Search %d: found at index %d\\n", target, index);

    // Reverse
    reverseArray(numbers, 5);
    printf("Reversed: ");
    printArray(numbers, 5);

    // ============================================
    // 2D ARRAYS
    // ============================================
    printf("\\n=== 2D Array — Matrix ===\\n");

    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    // Print matrix
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("\\n");
    }

    // Transpose
    printf("\\nTranspose:\\n");
    for (int j = 0; j < 4; j++) {
        for (int i = 0; i < 3; i++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("\\n");
    }

    // ============================================
    // ARRAY & POINTER RELATIONSHIP
    // ============================================
    printf("\\n=== Array & Pointer ===\\n");
    int arr[] = {10, 20, 30, 40, 50};

    printf("Array name (address): %p\\n", (void*)arr);
    printf("&arr[0]:              %p\\n", (void*)&arr[0]);
    printf("arr[2] = %d\\n", arr[2]);
    printf("*(arr + 2) = %d\\n", *(arr + 2));  // Same thing

    // ============================================
    // BUBBLE SORT
    // ============================================
    printf("\\n=== Bubble Sort ===\\n");
    int data[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(data) / sizeof(data[0]);

    printf("Before: ");
    printArray(data, n);

    // Bubble sort algorithm
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (data[j] > data[j + 1]) {
                int temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
            }
        }
    }

    printf("After:  ");
    printArray(data, n);

    return 0;
}`,
        language: "c"
      },
      {
        id: "9",
        title: "Strings",
        content: `## Strings in C

A string in C is an array of characters terminated by a null character \`\\0\`.

### String Declaration
\`\`\`c
char str1[] = "Hello";          // Array form (6 bytes including \\0)
char str2[10] = "Hello";       // Fixed-size array
char *str3 = "Hello";          // Pointer to string literal
\`\`\`

### String vs Character Array
- \`char arr[] = {'H', 'i', '\\0'};\` — Character array (manually null-terminated)
- \`char str[] = "Hi";\` — String (automatically null-terminated)

### String Functions (string.h)
- \`strlen(str)\` — Length (excluding \\0)
- \`strcpy(dest, src)\` — Copy string
- \`strcat(dest, src)\` — Concatenate
- \`strcmp(s1, s2)\` — Compare (0 if equal, <0 if s1<s2, >0 if s1>s2)
- \`strchr(str, ch)\` — Find first occurrence of character
- \`strstr(haystack, needle)\` — Find substring
- \`strrev(str)\` — Reverse (non-standard, not in all compilers)

### String Input
- \`scanf("%s", str)\` — Reads until whitespace
- \`fgets(str, size, stdin)\` — Reads a full line (recommended)
- \`gets(str)\` — **Dangerous, never use** (buffer overflow)

### Common String Operations
- Length calculation
- Copying
- Concatenation
- Comparison
- Reversal
- Case conversion
- Substring extraction
- Tokenization (strtok)`,
        codeExample: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Custom string length
int myStrlen(const char *str) {
    int len = 0;
    while (str[len] != '\\0') {
        len++;
    }
    return len;
}

// Custom string copy
void myStrcpy(char *dest, const char *src) {
    while (*src != '\\0') {
        *dest = *src;
        dest++;
        src++;
    }
    *dest = '\\0';
}

// Reverse string in place
void strReverse(char *str) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

// Check palindrome
int isPalindrome(const char *str) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) {
            return 0;
        }
    }
    return 1;
}

// Count vowels
int countVowels(const char *str) {
    int count = 0;
    for (int i = 0; str[i] != '\\0'; i++) {
        char ch = tolower(str[i]);
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            count++;
        }
    }
    return count;
}

int main() {
    // ============================================
    // STRING BASICS
    // ============================================
    printf("=== String Basics ===\\n");

    char greeting[] = "Hello, World!";
    printf("String: %s\\n", greeting);
    printf("Length: %lu\\n", strlen(greeting));
    printf("Size in memory: %lu bytes\\n", sizeof(greeting));

    // Character by character access
    printf("Characters: ");
    for (int i = 0; greeting[i] != '\\0'; i++) {
        printf("%c ", greeting[i]);
    }
    printf("\\n");

    // ============================================
    // STRING FUNCTIONS
    // ============================================
    printf("\\n=== String Functions ===\\n");

    char str1[50] = "Hello";
    char str2[] = " World";

    // Concatenate
    strcat(str1, str2);
    printf("After strcat: %s\\n", str1);

    // Copy
    char dest[50];
    strcpy(dest, "Programming");
    printf("After strcpy: %s\\n", dest);

    // Compare
    printf("strcmp(\"abc\", \"abc\") = %d\\n", strcmp("abc", "abc"));
    printf("strcmp(\"abc\", \"abd\") = %d\\n", strcmp("abc", "abd"));

    // Find substring
    char *pos = strstr("Hello, World!", "World");
    if (pos) {
        printf("Found '%s' at position %ld\\n", "World", pos - "Hello, World!");
    }

    // ============================================
    // STRING OPERATIONS
    // ============================================
    printf("\\n=== Custom Operations ===\\n");

    char text[] = "racecar";
    printf("'%s' length: %d\\n", text, myStrlen(text));
    printf("'%s' is palindrome: %s\\n", text, isPalindrome(text) ? "Yes" : "No");
    printf("Vowels in 'Hello World': %d\\n", countVowels("Hello World"));

    // Reverse
    char rev[] = "abcdef";
    printf("Before reverse: %s\\n", rev);
    strReverse(rev);
    printf("After reverse:  %s\\n", rev);

    // ============================================
    // STRING INPUT
    // ============================================
    printf("\\n=== String Input ===\\n");

    char name[50];
    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);
    name[strcspn(name, "\\n")] = '\\0';  // Remove trailing newline
    printf("Hello, %s!\\n", name);

    // ============================================
    // STRING TOKENIZATION
    // ============================================
    printf("\\n=== Tokenization (strtok) ===\\n");

    char sentence[] = "C is a powerful language";
    char *token = strtok(sentence, " ");

    printf("Tokens: ");
    while (token != NULL) {
        printf("[%s] ", token);
        token = strtok(NULL, " ");
    }
    printf("\\n");

    return 0;
}`,
        language: "c"
      },
      {
        id: "10",
        title: "Pointers — The Heart of C",
        content: `## Pointers in C

A pointer is a variable that stores the memory address of another variable. Pointers are what make C powerful and unique.

### Pointer Basics
- \`int *ptr;\` — Declares a pointer to an integer
- \`ptr = &x;\` — Stores the address of x in ptr
- \`*ptr\` — Dereferences the pointer (accesses the value at that address)

### Key Operators
- \`&\` (Address-of): Gets the memory address of a variable
- \`*\` (Dereference): Gets the value at a memory address

### Pointer Arithmetic
- \`ptr + 1\` — Moves to the next element (size depends on type)
- \`ptr - 1\` — Moves to the previous element
- \`ptr++\` / \`ptr--\` — Increment/decrement pointer
- \`ptr1 - ptr2\` — Number of elements between two pointers

### Pointers and Arrays
- Array name decays to a pointer to the first element
- \`arr[i]\` is equivalent to \`*(arr + i)\`
- You can use pointer arithmetic to traverse arrays

### Pointers and Functions
- **Pass by value**: Function gets a copy
- **Pass by reference**: Function gets a pointer (can modify original)
- Functions can return pointers

### Common Pointer Pitfalls
1. **Dangling pointer**: Points to freed/invalid memory
2. **NULL pointer**: Points to nothing (\`ptr = NULL\`)
3. **Wild pointer**: Uninitialized pointer (points to random memory)
4. **Memory leak**: Lost all references to allocated memory
5. **Buffer overflow**: Writing past array bounds`,
        codeExample: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // ============================================
    // POINTER BASICS
    // ============================================
    printf("=== Pointer Basics ===\\n");

    int x = 42;
    int *ptr = &x;  // ptr stores the address of x

    printf("Value of x: %d\\n", x);
    printf("Address of x: %p\\n", (void*)&x);
    printf("Value of ptr (address): %p\\n", (void*)ptr);
    printf("Value at ptr (dereference): %d\\n", *ptr);

    // Modify through pointer
    *ptr = 100;
    printf("After *ptr = 100, x = %d\\n", x);

    // ============================================
    // POINTER ARITHMETIC
    // ============================================
    printf("\\n=== Pointer Arithmetic ===\\n");

    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;  // Points to first element

    printf("p points to: %d\\n", *p);     // 10
    printf("p+1 points to: %d\\n", *(p+1)); // 20
    printf("p+2 points to: %d\\n", *(p+2)); // 30

    // Traverse array with pointer
    printf("Array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", *(p + i));
    }
    printf("\\n");

    // Increment pointer
    p++;  // Now points to arr[1]
    printf("After p++, *p = %d\\n", *p);  // 20

    // ============================================
    // POINTERS AND ARRAYS
    // ============================================
    printf("\\n=== Array-Pointer Equivalence ===\\n");

    int nums[] = {1, 2, 3, 4, 5};

    // These are equivalent:
    printf("nums[2] = %d\\n", nums[2]);
    printf("*(nums + 2) = %d\\n", *(nums + 2));

    // Pointer to last element
    int *last = &nums[4];
    int *first = nums;
    printf("Distance: %ld elements\\n", last - first);

    // ============================================
    // POINTERS AND FUNCTIONS
    // ============================================
    printf("\\n=== Pass by Reference ===\\n");

    int a = 10, b = 20;
    printf("Before swap: a=%d, b=%d\\n", a, b);

    // Swap using pointers
    int *pa = &a, *pb = &b;
    int temp = *pa;
    *pa = *pb;
    *pb = temp;

    printf("After swap:  a=%d, b=%d\\n", a, b);

    // ============================================
    // NULL AND DYNAMIC POINTERS
    // ============================================
    printf("\\n=== NULL Pointer ===\\n");

    int *nullPtr = NULL;
    if (nullPtr == NULL) {
        printf("Pointer is NULL (safe to check before dereferencing)\\n");
    }

    // ============================================
    // POINTER TO POINTER
    // ============================================
    printf("\\n=== Pointer to Pointer ===\\n");

    int val = 100;
    int *ptr1 = &val;
    int **ptr2 = &ptr1;  // Pointer to pointer

    printf("val = %d\\n", val);
    printf("*ptr1 = %d\\n", *ptr1);
    printf("**ptr2 = %d\\n", **ptr2);

    **ptr2 = 200;
    printf("After **ptr2 = 200, val = %d\\n", val);

    // ============================================
    // COMMON PITFALLS
    // ============================================
    printf("\\n=== Common Pitfalls ===\\n");

    // 1. Dangling pointer (demonstration)
    int *dangling;
    {
        int local = 42;
        dangling = &local;
    }
    // local is out of scope — dangling is now invalid
    printf("Dangling pointer: points to invalid memory\\n");

    // 2. Wild pointer
    int *wild;  // Uninitialized — could point anywhere
    printf("Wild pointer: uninitialized, could be anywhere\\n");

    // 3. Safe practice: always initialize pointers
    int safe = 0;
    int *safePtr = &safe;
    printf("Safe pointer: initialized to &safe (%d)\\n", *safePtr);

    return 0;
}`,
        language: "c"
      },
      {
        id: "11",
        title: "Dynamic Memory Management",
        content: `## Dynamic Memory Allocation in C

C provides functions to allocate and free memory at runtime from the heap.

### Why Dynamic Memory?
- Stack size is limited (typically 1-8 MB)
- Need memory whose size is determined at runtime
- Data structures that grow and shrink (linked lists, trees)
- Long-lived data that outlives the function that created it

### Memory Functions (stdlib.h)
- \`malloc(size)\` — Allocates \`size\` bytes, uninitialized (may contain garbage)
- \`calloc(n, size)\` — Allocates \`n\` elements of \`size\` bytes each, initialized to 0
- \`realloc(ptr, newSize)\` — Resizes previously allocated memory
- \`free(ptr)\` — Deallocates memory (makes it available for reuse)

### Important Rules
1. Always check if malloc/calloc returned NULL (out of memory)
2. Always free memory when done
3. Set pointer to NULL after freeing (avoid dangling pointer)
4. Never use memory after freeing it (undefined behavior)
5. Never free memory twice (double free = crash/bug)
6. malloc and calloc return \`void*\` — cast is optional in C

### Memory Layout
- **Code/Text segment**: Program instructions
- **Data segment**: Global and static variables
- **Heap**: Dynamic memory (grows upward)
- **Stack**: Local variables and function calls (grows downward)`,
        codeExample: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // ============================================
    // MALLOC — Allocate Uninitialized Memory
    // ============================================
    printf("=== malloc ===\\n");

    int n = 5;
    int *arr = (int*)malloc(n * sizeof(int));

    // Always check for NULL
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Initialize and use
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    printf("Allocated %d integers (%lu bytes)\\n", n, n * sizeof(int));
    printf("Values: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    arr = NULL;  // Good practice: set to NULL after freeing

    // ============================================
    // CALLOC — Allocate Zero-Initialized Memory
    // ============================================
    printf("\\n=== calloc ===\\n");

    int *zeros = (int*)calloc(5, sizeof(int));

    if (zeros == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    printf("calloc values (all zero): ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", zeros[i]);
    }
    printf("\\n");

    free(zeros);
    zeros = NULL;

    // ============================================
    // REALLOC — Resize Allocation
    // ============================================
    printf("\\n=== realloc ===\\n");

    int size = 3;
    int *data = (int*)malloc(size * sizeof(int));

    if (data == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < size; i++) {
        data[i] = i * 100;
    }
    printf("Original: ");
    for (int i = 0; i < size; i++) printf("%d ", data[i]);
    printf("\\n");

    // Resize to 6 elements
    size = 6;
    int *temp = (int*)realloc(data, size * sizeof(int));

    if (temp == NULL) {
        printf("Realloc failed! Original data preserved.\\n");
        free(data);
        return 1;
    }
    data = temp;

    // Initialize new elements
    for (int i = 3; i < size; i++) {
        data[i] = i * 100;
    }
    printf("After realloc: ");
    for (int i = 0; i < size; i++) printf("%d ", data[i]);
    printf("\\n");

    free(data);
    data = NULL;

    // ============================================
    // DYNAMIC 2D ARRAY
    // ============================================
    printf("\\n=== Dynamic 2D Array ===\\n");

    int rows = 3, cols = 4;

    // Allocate array of row pointers
    int **matrix = (int**)malloc(rows * sizeof(int*));
    if (matrix == NULL) { return 1; }

    // Allocate each row
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
        if (matrix[i] == NULL) { return 1; }
    }

    // Fill matrix
    int val = 1;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = val++;
        }
    }

    // Print matrix
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("\\n");
    }

    // Free each row, then the pointer array
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);

    // ============================================
    // COMMON MEMORY ERRORS (Educational)
    // ============================================
    printf("\\n=== Common Memory Errors ===\\n");
    printf("1. Memory leak: Forgetting to free()\\n");
    printf("2. Double free: Freeing same memory twice\\n");
    printf("3. Use-after-free: Using pointer after free()\\n");
    printf("4. Dangling pointer: Pointer to freed memory\\n");
    printf("5. Buffer overflow: Writing past allocated size\\n");

    return 0;
}`,
        language: "c"
      },
      {
        id: "12",
        title: "Structures & Unions",
        content: `## Structures & Unions in C

### Structures (struct)
A structure groups variables of different types under one name.

### Structure Declaration
\`\`\`c
struct Person {
    char name[50];
    int age;
    float height;
};
\`\`\`

### Accessing Members
- Dot operator: \`person.name\`
- Arrow operator (via pointer): \`ptr->name\`

### typedef
Creates an alias for a type, making code cleaner:
\`\`\`c
typedef struct { ... } Person;
Person p;  // instead of struct Person p
\`\`\`

### Unions
A union shares the same memory location for all members. Only one member can hold a value at a time. Size = size of the largest member.

### Enums (enum)
Named integer constants for readability:
\`\`\`c
enum Color { RED, GREEN, BLUE };
enum Color c = RED;  // c = 0
\`\`\``,
        codeExample: `#include <stdio.h>
#include <string.h>

// ============================================
// STRUCTURE DECLARATION
// ============================================
struct Student {
    char name[50];
    int age;
    float gpa;
    char grade;
};

// Using typedef for cleaner syntax
typedef struct {
    char title[100];
    char author[50];
    int year;
    float price;
} Book;

// Nested structure
typedef struct {
    char street[100];
    char city[50];
    char state[30];
    int zip;
} Address;

typedef struct {
    char name[50];
    int age;
    Address address;  // Nested structure
} Person;

// ============================================
// STRUCTURE FUNCTIONS
// ============================================
void printStudent(struct Student *s) {
    printf("Name: %s | Age: %d | GPA: %.2f | Grade: %c\\n",
           s->name, s->age, s->gpa, s->grade);
}

void printBook(Book *b) {
    printf("\"%s\" by %s (%d) - $%.2f\\n",
           b->title, b->author, b->year, b->price);
}

// ============================================
// UNION
// ============================================
union Data {
    int i;
    float f;
    char str[20];
};

// ============================================
// ENUM
// ============================================
enum Day { MON=1, TUE, WED, THU, FRI, SAT, SUN };

const char* dayName(enum Day d) {
    switch (d) {
        case MON: return "Monday";
        case TUE: return "Tuesday";
        case WED: return "Wednesday";
        case THU: return "Thursday";
        case FRI: return "Friday";
        case SAT: return "Saturday";
        case SUN: return "Sunday";
        default: return "Unknown";
    }
}

int main() {
    // ============================================
    // STRUCTURE BASICS
    // ============================================
    printf("=== Structure Basics ===\\n");

    struct Student s1 = {"Alice", 20, 3.85, 'A'};
    struct Student s2;
    strcpy(s2.name, "Bob");
    s2.age = 22;
    s2.gpa = 3.50;
    s2.grade = 'B';

    printStudent(&s1);
    printStudent(&s2);

    // ============================================
    // ARRAY OF STRUCTURES
    // ============================================
    printf("\\n=== Array of Structures ===\\n");

    struct Student class[] = {
        {"Charlie", 21, 3.92, 'A'},
        {"Diana", 23, 3.70, 'B'},
        {"Eve", 20, 3.55, 'B'},
        {"Frank", 22, 3.88, 'A'}
    };
    int numStudents = sizeof(class) / sizeof(class[0]);

    printf("Class roster (%d students):\\n", numStudents);
    for (int i = 0; i < numStudents; i++) {
        printf("  %d. ", i + 1);
        printStudent(&class[i]);
    }

    // ============================================
    // BOOK STRUCTURE
    // ============================================
    printf("\\n=== Book Library ===\\n");

    Book library[] = {
        {"The C Programming Language", "Kernighan & Ritchie", 1978, 49.99},
        {"Clean Code", "Robert Martin", 2008, 39.99},
        {"Design Patterns", "Gang of Four", 1994, 54.99}
    };

    for (int i = 0; i < 3; i++) {
        printBook(&library[i]);
    }

    // ============================================
    // NESTED STRUCTURES
    // ============================================
    printf("\\n=== Nested Structures ===\\n");

    Person people[] = {
        {"John", 30, {"123 Main St", "New York", "NY", 10001}},
        {"Jane", 25, {"456 Oak Ave", "Boston", "MA", 02101}}
    };

    for (int i = 0; i < 2; i++) {
        printf("%s, Age %d\\n", people[i].name, people[i].age);
        printf("  Address: %s, %s, %s %d\\n",
               people[i].address.street,
               people[i].address.city,
               people[i].address.state,
               people[i].address.zip);
    }

    // ============================================
    // UNIONS
    // ============================================
    printf("\\n=== Unions ===\\n");

    union Data d;
    printf("Size of union: %lu bytes\\n", sizeof(d));

    d.i = 42;
    printf("d.i = %d\\n", d.i);

    d.f = 3.14f;
    printf("d.f = %f (d.i is now corrupted: %d)\\n", d.f, d.i);

    strcpy(d.str, "Hello");
    printf("d.str = %s\\n", d.str);

    // ============================================
    // ENUMS
    // ============================================
    printf("\\n=== Enums ===\\n");

    enum Day today = WED;
    printf("Today is %s (value: %d)\\n", dayName(today), today);

    for (int d = MON; d <= SUN; d++) {
        printf("  %d = %s\\n", d, dayName(d));
    }

    return 0;
}`,
        language: "c"
      },
      {
        id: "13",
        title: "File Handling",
        content: `## File Handling in C

C provides functions for reading from and writing to files.

### File Operations
1. **fopen** — Open a file
2. **fclose** — Close a file
3. **fprintf/fprintf** — Write formatted output
4. **fscanf** — Read formatted input
5. **fgets/fputs** — Read/write strings
6. **fread/fwrite** — Read/write binary data
7. **fseek** — Move file position
8. **ftell** — Get current file position
9. **rewind** — Reset to beginning
10. **feof** — Check end of file
11. **ferror** — Check for errors

### File Modes
- \`"r"\` — Read (file must exist)
- \`"w"\` — Write (creates new or truncates)
- \`"a"\` — Append (creates new or appends)
- \`"r+"\` — Read + Write (file must exist)
- \`"w+"\` — Read + Write (creates new or truncates)
- \`"a+"\` — Read + Append (creates new or appends)
- Add \`b\` for binary: \`"rb"\`, \`"wb"\`, etc.

### Error Handling
Always check if fopen returns NULL. Common reasons:
- File doesn't exist (for "r" mode)
- Permission denied
- Disk full`,
        codeExample: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure for student data
typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

int main() {
    // ============================================
    // WRITING TO A FILE
    // ============================================
    printf("=== Writing to File ===\\n");

    FILE *fp = fopen("students.txt", "w");
    if (fp == NULL) {
        printf("Error opening file for writing!\\n");
        return 1;
    }

    // Write using fprintf
    fprintf(fp, "Name,Age,GPA\\n");
    fprintf(fp, "Alice,20,3.85\\n");
    fprintf(fp, "Bob,22,3.50\\n");
    fprintf(fp, "Charlie,21,3.92\\n");

    fclose(fp);
    printf("Written to students.txt\\n");

    // ============================================
    // READING FROM A FILE
    // ============================================
    printf("\\n=== Reading from File ===\\n");

    fp = fopen("students.txt", "r");
    if (fp == NULL) {
        printf("Error opening file for reading!\\n");
        return 1;
    }

    char line[100];
    int lineNum = 0;

    while (fgets(line, sizeof(line), fp) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';  // Remove newline
        printf("Line %d: %s\\n", lineNum++, line);
    }
    fclose(fp);

    // ============================================
    // READ STRUCTURES FROM FILE
    // ============================================
    printf("\\n=== Reading Structured Data ===\\n");

    fp = fopen("students.txt", "r");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    char name[50];
    int age;
    float gpa;

    // Skip header
    fgets(line, sizeof(line), fp);

    printf("Students:\\n");
    while (fscanf(fp, "%49[^,],%d,%f\\n", name, &age, &gpa) == 3) {
        printf("  Name: %s, Age: %d, GPA: %.2f\\n", name, age, gpa);
    }
    fclose(fp);

    // ============================================
    // APPEND TO FILE
    // ============================================
    printf("\\n=== Appending to File ===\\n");

    fp = fopen("students.txt", "a");
    if (fp == NULL) {
        printf("Error opening file for appending!\\n");
        return 1;
    }

    fprintf(fp, "Diana,23,3.70\\n");
    fclose(fp);
    printf("Appended Diana's record\\n");

    // Verify append
    fp = fopen("students.txt", "r");
    printf("Updated file contents:\\n");
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("  %s", line);
    }
    fclose(fp);

    // ============================================
    // BINARY FILE I/O
    // ============================================
    printf("\\n=== Binary File I/O ===\\n");

    // Write binary
    Student students[] = {
        {"Eve", 20, 3.60},
        {"Frank", 22, 3.88}
    };

    fp = fopen("students.bin", "wb");
    if (fp != NULL) {
        fwrite(students, sizeof(Student), 2, fp);
        fclose(fp);
        printf("Written 2 students in binary format\\n");
    }

    // Read binary
    Student readStudents[2];
    fp = fopen("students.bin", "rb");
    if (fp != NULL) {
        fread(readStudents, sizeof(Student), 2, fp);
        fclose(fp);

        printf("Read from binary file:\\n");
        for (int i = 0; i < 2; i++) {
            printf("  %s, Age: %d, GPA: %.2f\\n",
                   readStudents[i].name,
                   readStudents[i].age,
                   readStudents[i].gpa);
        }
    }

    // ============================================
    // FILE POSITIONING
    // ============================================
    printf("\\n=== File Positioning ===\\n");

    fp = fopen("students.txt", "r");
    if (fp != NULL) {
        printf("Current position: %ld\\n", ftell(fp));

        fseek(fp, 0, SEEK_END);  // Move to end
        printf("File size: %ld bytes\\n", ftell(fp));

        rewind(fp);  // Move to beginning
        printf("After rewind: %ld\\n", ftell(fp));

        fclose(fp);
    }

    return 0;
}`,
        language: "c"
      },
      {
        id: "14",
        title: "Preprocessor Directives",
        content: `## Preprocessor Directives in C

The preprocessor processes directives before compilation begins. They start with \`#\`.

### Common Directives
- \`#include\` — Include header files
- \`#define\` — Define macros and constants
- \`#undef\` — Undefine a macro
- \`#ifdef\` / \`#ifndef\` — Conditional compilation
- \`#if\` / \`#elif\` / \`#else\` / \`#endif\` — Conditional compilation
- \`#pragma\` — Compiler-specific instructions
- \`#error\` — Generate a compilation error
- \`#warning\` — Generate a compilation warning (C23)

### Object-like Macros
\`#define PI 3.14159\` — Simple text replacement

### Function-like Macros
\`#define MAX(a,b) ((a)>(b)?(a):(b))\`

**Important:** Always wrap macro parameters in parentheses to avoid operator precedence bugs.

### Include Guards
Prevent headers from being included multiple times:
\`\`\`c
#ifndef MYHEADER_H
#define MYHEADER_H
// ... header content ...
#endif
\`\`\`

### Conditional Compilation
Useful for platform-specific code, debugging, and feature flags.`,
        codeExample: `#include <stdio.h>

// ============================================
// OBJECT-LIKE MACROS
// ============================================
#define PI 3.14159265358979
#define MAX_SIZE 100
#define GREETING "Hello from the preprocessor!"

// ============================================
// FUNCTION-LIKE MACROS
// ============================================
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define ABS(x) ((x) < 0 ? -(x) : (x))

// Safe swap macro (with type checking)
#define SWAP(a, b) do { \\
    __typeof__(a) temp = a; \\
    a = b; \\
    b = temp; \\
} while(0)

// ============================================
// STRINGIFY AND CONCATENATE
// ============================================
#define STRINGIFY(x) #x
#define CONCAT(a, b) a##b

// ============================================
// CONDITIONAL COMPILATION
// ============================================
#define DEBUG 1
#define PLATFORM_WINDOWS 0
#define PLATFORM_LINUX 1

// ============================================
// INCLUDE GUARD (would be in a .h file)
// ============================================
#ifndef MYHEADER_H
#define MYHEADER_H
// Header content would go here
#endif

// ============================================
// PRAGMA
// ============================================
// #pragma once — Alternative to include guards (non-standard but widely supported)
// #pragma GCC warning "This is a custom warning"

int main() {
    // ============================================
    // MACRO USAGE
    // ============================================
    printf("=== Object-like Macros ===\\n");
    printf("PI = %.10f\\n", PI);
    printf("MAX_SIZE = %d\\n", MAX_SIZE);
    printf("%s\\n", GREETING);

    printf("\\n=== Function-like Macros ===\\n");
    printf("SQUARE(5) = %d\\n", SQUARE(5));
    printf("SQUARE(2+3) = %d\\n", SQUARE(2+3));
    printf("MAX(10, 20) = %d\\n", MAX(10, 20));
    printf("MIN(10, 20) = %d\\n", MIN(10, 20));
    printf("ABS(-42) = %d\\n", ABS(-42));

    // SWAP macro
    int x = 10, y = 20;
    printf("\\nBefore SWAP: x=%d, y=%d\\n", x, y);
    SWAP(x, y);
    printf("After SWAP:  x=%d, y=%d\\n", x, y);

    // ============================================
    // STRINGIFY AND CONCATENATE
    // ============================================
    printf("\\n=== Stringify & Concatenate ===\\n");
    printf("STRINGIFY(Hello) = %s\\n", STRINGIFY(Hello));

    int ab = 100;
    printf("CONCAT(a, b) = %d\\n", CONCAT(a, b));

    // ============================================
    // CONDITIONAL COMPILATION
    // ============================================
    printf("\\n=== Conditional Compilation ===\\n");

    #if DEBUG
    printf("DEBUG mode is ON\\n");
    #else
    printf("DEBUG mode is OFF\\n");
    #endif

    #if PLATFORM_LINUX
    printf("Compiling for Linux\\n");
    #elif PLATFORM_WINDOWS
    printf("Compiling for Windows\\n");
    #else
    printf("Unknown platform\\n");
    #endif

    // ============================================
    // PREDEFINED MACROS
    // ============================================
    printf("\\n=== Predefined Macros ===\\n");
    printf("__FILE__: %s\\n", __FILE__);
    printf("__LINE__: %d\\n", __LINE__);
    printf("__DATE__: %s\\n", __DATE__);
    printf("__TIME__: %s\\n", __TIME__);
    printf("__func__: %s\\n", __func__);

    return 0;
}`,
        language: "c"
      },
      {
        id: "15",
        title: "Bitwise Operations",
        content: `## Bitwise Operations in C

Bitwise operators manipulate individual bits of integers.

### Operators
- \`&\` (AND): Both bits must be 1 → result is 1
- \`|\` (OR): At least one bit is 1 → result is 1
- \`^\` (XOR): Bits are different → result is 1
- \`~\` (NOT): Flips all bits (complement)
- \`<<\` (Left shift): Shifts bits left (multiply by 2^n)
- \`>>\` (Right shift): Shifts bits right (divide by 2^n)

### Common Bitwise Tricks
- **Check if even/odd**: \`n & 1\` (1 if odd, 0 if even)
- **Set bit**: \`n | (1 << pos)\`
- **Clear bit**: \`n & ~(1 << pos)\`
- **Toggle bit**: \`n ^ (1 << pos)\`
- **Check bit**: \`(n >> pos) & 1\`
- **Multiply by 2**: \`n << 1\`
- **Divide by 2**: \`n >> 1\`
- **Swap without temp**: \`a ^= b; b ^= a; a ^= b;\`

### Bit Masks
Used to represent sets of flags or options.`,
        codeExample: `#include <stdio.h>

// Helper to print binary representation
void printBinary(unsigned int n, int bits) {
    for (int i = bits - 1; i >= 0; i--) {
        printf("%d", (n >> i) & 1);
    }
}

int main() {
    unsigned int a = 12;  // 1100
    unsigned int b = 10;  // 1010

    // ============================================
    // BASIC BITWISE OPERATIONS
    // ============================================
    printf("=== Bitwise Operations ===\\n");
    printf("a = %u (", a); printBinary(a, 8); printf(")\\n");
    printf("b = %u (", b); printBinary(b, 8); printf(")\\n\\n");

    printf("a & b  = %u (", a & b); printBinary(a & b, 8); printf(")  // AND\\n");
    printf("a | b  = %u (", a | b); printBinary(a | b, 8); printf(")  // OR\\n");
    printf("a ^ b  = %u (", a ^ b); printBinary(a ^ b, 8); printf(")  // XOR\\n");
    printf("~a     = %u (", ~a); printBinary(~a, 8); printf(") // NOT\\n");
    printf("a << 2 = %u (", a << 2); printBinary(a << 2, 8); printf(")  // Left shift\\n");
    printf("a >> 2 = %u (", a >> 2); printBinary(a >> 2, 8); printf(")  // Right shift\\n");

    // ============================================
    // BIT MANIPULATION TRICKS
    // ============================================
    printf("\\n=== Bit Tricks ===\\n");

    unsigned int n = 42;

    // Check even/odd
    printf("%u is %s\\n", n, (n & 1) ? "odd" : "even");

    // Set bit at position 3
    unsigned int set = n | (1 << 3);
    printf("Set bit 3:    %u -> %u\\n", n, set);

    // Clear bit at position 3
    unsigned int clear = n & ~(1 << 3);
    printf("Clear bit 3:  %u -> %u\\n", n, clear);

    // Toggle bit at position 3
    unsigned int toggle = n ^ (1 << 3);
    printf("Toggle bit 3: %u -> %u\\n", n, toggle);

    // Check bit at position 3
    printf("Check bit 3:  %s\\n", ((n >> 3) & 1) ? "set" : "not set");

    // Multiply/Divide by powers of 2
    printf("\\nMultiply by 4: %u << 2 = %u\\n", n, n << 2);
    printf("Divide by 4:   %u >> 2 = %u\\n", n, n >> 2);

    // ============================================
    // SWAP WITHOUT TEMPORARY
    // ============================================
    printf("\\n=== Swap Without Temp ===\\n");
    unsigned int x = 25, y = 37;
    printf("Before: x=%u, y=%u\\n", x, y);

    x ^= y;
    y ^= x;
    x ^= y;
    printf("After:  x=%u, y=%u\\n", x, y);

    // ============================================
    // COUNT SET BITS
    // ============================================
    printf("\\n=== Count Set Bits ===\\n");
    unsigned int val = 0b10110101;  // 181
    int count = 0;
    unsigned int temp = val;

    while (temp > 0) {
        count += temp & 1;
        temp >>= 1;
    }
    printf("%u has %d set bits\\n", val, count);

    // ============================================
    // BIT FLAGS (Practical Use)
    // ============================================
    printf("\\n=== Bit Flags ===\\n");

    #define READ    (1 << 0)  // 0001
    #define WRITE   (1 << 1)  // 0010
    #define EXECUTE (1 << 2)  // 0100
    #define ADMIN   (1 << 3)  // 1000

    unsigned int permissions = 0;

    // Grant permissions
    permissions |= READ;
    permissions |= WRITE;
    permissions |= EXECUTE;

    printf("Permissions: ");
    if (permissions & READ)    printf("READ ");
    if (permissions & WRITE)   printf("WRITE ");
    if (permissions & EXECUTE) printf("EXECUTE ");
    if (permissions & ADMIN)   printf("ADMIN ");
    printf("\\n");

    // Check specific permission
    printf("Has READ? %s\\n", (permissions & READ) ? "Yes" : "No");
    printf("Has ADMIN? %s\\n", (permissions & ADMIN) ? "Yes" : "No");

    // Revoke WRITE
    permissions &= ~WRITE;
    printf("After revoking WRITE: ");
    if (permissions & READ)    printf("READ ");
    if (permissions & WRITE)   printf("WRITE ");
    if (permissions & EXECUTE) printf("EXECUTE ");
    printf("\\n");

    return 0;
}`,
        language: "c"
      },
      {
        id: "16",
        title: "Linked Lists",
        content: `## Linked Lists in C

A linked list is a data structure where elements (nodes) are connected via pointers.

### Types of Linked Lists
1. **Singly Linked List**: Each node points to the next
2. **Doubly Linked List**: Each node points to both next and previous
3. **Circular Linked List**: Last node points back to the first

### Node Structure
\`\`\`c
struct Node {
    int data;
    struct Node *next;
};
\`\`\`

### Operations
- **Insert**: At beginning, end, or middle
- **Delete**: By value or position
- **Search**: Find a node
- **Traversal**: Visit all nodes

### Advantages over Arrays
- Dynamic size (no fixed capacity)
- Efficient insertion/deletion (O(1) at known position)
- No memory waste (allocates as needed)

### Disadvantages
- No random access (must traverse)
- Extra memory for pointers
- Cache unfriendly (non-contiguous memory)`,
        codeExample: `#include <stdio.h>
#include <stdlib.h>

// ============================================
// NODE STRUCTURE
// ============================================
struct Node {
    int data;
    struct Node *next;
};

// ============================================
// CREATE NEW NODE
// ============================================
struct Node* createNode(int data) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        exit(1);
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// ============================================
// INSERT AT BEGINNING
// ============================================
void insertAtBeginning(struct Node **head, int data) {
    struct Node *newNode = createNode(data);
    newNode->next = *head;
    *head = newNode;
}

// ============================================
// INSERT AT END
// ============================================
void insertAtEnd(struct Node **head, int data) {
    struct Node *newNode = createNode(data);

    if (*head == NULL) {
        *head = newNode;
        return;
    }

    struct Node *current = *head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = newNode;
}

// ============================================
// DELETE BY VALUE
// ============================================
void deleteNode(struct Node **head, int data) {
    struct Node *temp = *head;
    struct Node *prev = NULL;

    // If head node holds the data
    if (temp != NULL && temp->data == data) {
        *head = temp->next;
        free(temp);
        return;
    }

    // Search for the data
    while (temp != NULL && temp->data != data) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) return;  // Not found

    prev->next = temp->next;
    free(temp);
}

// ============================================
// SEARCH
// ============================================
int search(struct Node *head, int data) {
    int position = 0;
    struct Node *current = head;

    while (current != NULL) {
        if (current->data == data) {
            return position;
        }
        current = current->next;
        position++;
    }
    return -1;  // Not found
}

// ============================================
// REVERSE LIST
// ============================================
void reverseList(struct Node **head) {
    struct Node *prev = NULL;
    struct Node *current = *head;
    struct Node *next = NULL;

    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    *head = prev;
}

// ============================================
// PRINT LIST
// ============================================
void printList(struct Node *head) {
    struct Node *current = head;
    while (current != NULL) {
        printf("%d", current->data);
        if (current->next) printf(" -> ");
        current = current->next;
    }
    printf(" -> NULL\\n");
}

// ============================================
// FREE LIST
// ============================================
void freeList(struct Node *head) {
    struct Node *temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp);
    }
}

// ============================================
// MAIN
// ============================================
int main() {
    struct Node *head = NULL;

    // Insert elements
    printf("=== Building List ===\\n");
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    insertAtBeginning(&head, 5);
    insertAtBeginning(&head, 1);

    printf("List: ");
    printList(head);

    // Search
    printf("\\n=== Search ===\\n");
    int pos = search(head, 20);
    printf("20 found at position: %d\\n", pos);
    pos = search(head, 99);
    printf("99 found at position: %d\\n", pos);

    // Delete
    printf("\\n=== Delete ===\\n");
    deleteNode(&head, 1);
    printf("After deleting 1: ");
    printList(head);

    deleteNode(&head, 20);
    printf("After deleting 20: ");
    printList(head);

    // Reverse
    printf("\\n=== Reverse ===\\n");
    reverseList(&head);
    printf("Reversed: ");
    printList(head);

    // Free memory
    freeList(head);
    head = NULL;

    return 0;
}`,
        language: "c"
      },
      {
        id: "17",
        title: "Stacks & Queues",
        content: `## Stacks & Queues in C

### Stack (LIFO — Last In, First Out)
A stack is like a stack of plates — you can only add or remove from the top.

**Operations:**
- \`push\` — Add element to top
- \`pop\` — Remove element from top
- \`peek/top\` — View top element without removing
- \`isEmpty\` — Check if stack is empty

**Implementations:**
1. **Array-based**: Simple, fixed size
2. **Linked list-based**: Dynamic size

### Queue (FIFO — First In, First Out)
A queue is like a line at a store — first person in line is served first.

**Operations:**
- \`enqueue\` — Add element to rear
- \`dequeue\` — Remove element from front
- \`front\` — View front element
- \`isEmpty\` — Check if queue is empty

**Implementations:**
1. **Array-based**: Simple but wasteful (need to shift)
2. **Circular array**: Efficient use of space
3. **Linked list-based**: Dynamic size`,
        codeExample: `#include <stdio.h>
#include <stdlib.h>

// ============================================
// STACK IMPLEMENTATION (Array-based)
// ============================================
#define STACK_SIZE 100

typedef struct {
    int items[STACK_SIZE];
    int top;
} Stack;

void initStack(Stack *s) {
    s->top = -1;
}

int isEmpty(Stack *s) {
    return s->top == -1;
}

int isFull(Stack *s) {
    return s->top == STACK_SIZE - 1;
}

void push(Stack *s, int value) {
    if (isFull(s)) {
        printf("Stack overflow!\\n");
        return;
    }
    s->items[++(s->top)] = value;
}

int pop(Stack *s) {
    if (isEmpty(s)) {
        printf("Stack underflow!\\n");
        return -1;
    }
    return s->items[(s->top)--];
}

int peek(Stack *s) {
    if (isEmpty(s)) {
        printf("Stack is empty!\\n");
        return -1;
    }
    return s->items[s->top];
}

// ============================================
// QUEUE IMPLEMENTATION (Circular Array)
// ============================================
#define QUEUE_SIZE 100

typedef struct {
    int items[QUEUE_SIZE];
    int front;
    int rear;
    int count;
} Queue;

void initQueue(Queue *q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

int queueIsEmpty(Queue *q) {
    return q->count == 0;
}

int queueIsFull(Queue *q) {
    return q->count == QUEUE_SIZE;
}

void enqueue(Queue *q, int value) {
    if (queueIsFull(q)) {
        printf("Queue overflow!\\n");
        return;
    }
    q->rear = (q->rear + 1) % QUEUE_SIZE;
    q->items[q->rear] = value;
    q->count++;
}

int dequeue(Queue *q) {
    if (queueIsEmpty(q)) {
        printf("Queue underflow!\\n");
        return -1;
    }
    int value = q->items[q->front];
    q->front = (q->front + 1) % QUEUE_SIZE;
    q->count--;
    return value;
}

int queueFront(Queue *q) {
    if (queueIsEmpty(q)) {
        printf("Queue is empty!\\n");
        return -1;
    }
    return q->items[q->front];
}

// ============================================
// PRACTICAL: BALANCED PARENTHESES CHECK
// ============================================
int isBalanced(const char *expr) {
    Stack s;
    initStack(&s);

    for (int i = 0; expr[i] != '\\0'; i++) {
        char ch = expr[i];

        if (ch == '(' || ch == '{' || ch == '[') {
            push(&s, ch);
        } else if (ch == ')' || ch == '}' || ch == ']') {
            if (isEmpty(&s)) return 0;

            char top = pop(&s);
            if ((ch == ')' && top != '(') ||
                (ch == '}' && top != '{') ||
                (ch == ']' && top != '[')) {
                return 0;
            }
        }
    }
    return isEmpty(&s);
}

// ============================================
// MAIN
// ============================================
int main() {
    // ============================================
    // STACK DEMO
    // ============================================
    printf("=== Stack Operations ===\\n");

    Stack stack;
    initStack(&stack);

    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);

    printf("Top: %d\\n", peek(&stack));
    printf("Pop: %d\\n", pop(&stack));
    printf("Pop: %d\\n", pop(&stack));
    printf("Top: %d\\n", peek(&stack));

    // ============================================
    // QUEUE DEMO
    // ============================================
    printf("\\n=== Queue Operations ===\\n");

    Queue queue;
    initQueue(&queue);

    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);

    printf("Front: %d\\n", queueFront(&queue));
    printf("Dequeue: %d\\n", dequeue(&queue));
    printf("Dequeue: %d\\n", dequeue(&queue));
    printf("Front: %d\\n", queueFront(&queue));

    // ============================================
    // BALANCED PARENTHESES
    // ============================================
    printf("\\n=== Balanced Parentheses ===\\n");

    printf("\"(([]))\"  → %s\\n", isBalanced("(([]))") ? "Balanced" : "Not balanced");
    printf("\"([{}])\"  → %s\\n", isBalanced("([{}])") ? "Balanced" : "Not balanced");
    printf("\"([)]\"    → %s\\n", isBalanced("([)]") ? "Balanced" : "Not balanced");
    printf("\"{\"       → %s\\n", isBalanced("{") ? "Balanced" : "Not balanced");

    return 0;
}`,
        language: "c"
      },
      {
        id: "18",
        title: "Trees & Graphs",
        content: `## Trees & Graphs in C

### Binary Tree
A tree where each node has at most two children (left and right).

**Key concepts:**
- **Root**: Topmost node
- **Leaf**: Node with no children
- **Height**: Longest path from root to leaf
- **Depth**: Distance from root to a node

### Binary Search Tree (BST)
A binary tree where:
- Left subtree values < node value
- Right subtree values > node value

**Operations:** Insert, Search, Delete, Traversals

### Tree Traversals
- **Inorder** (Left, Root, Right): Gives sorted order for BST
- **Preorder** (Root, Left, Right): Used to copy/serialize tree
- **Postorder** (Left, Right, Root): Used to delete tree
- **Level-order** (BFS): Visit level by level

### Graph
A collection of vertices (nodes) and edges (connections).

**Representations:**
1. **Adjacency Matrix**: 2D array — O(V²) space
2. **Adjacency List**: Array of lists — O(V+E) space

**Types:**
- Directed vs Undirected
- Weighted vs Unweighted
- Cyclic vs Acyclic

**Traversal:**
- **BFS** (Breadth-First Search): Uses queue
- **DFS** (Depth-First Search): Uses stack or recursion`,
        codeExample: `#include <stdio.h>
#include <stdlib.h>

// ============================================
// BINARY SEARCH TREE NODE
// ============================================
struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
};

struct TreeNode* createNode(int data) {
    struct TreeNode *node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// ============================================
// BST INSERT
// ============================================
struct TreeNode* insert(struct TreeNode *root, int data) {
    if (root == NULL) return createNode(data);

    if (data < root->data)
        root->left = insert(root->left, data);
    else if (data > root->data)
        root->right = insert(root->right, data);

    return root;
}

// ============================================
// BST SEARCH
// ============================================
struct TreeNode* search(struct TreeNode *root, int data) {
    if (root == NULL || root->data == data)
        return root;

    if (data < root->data)
        return search(root->left, data);
    return search(root->right, data);
}

// ============================================
// TREE TRAVERSALS
// ============================================
void inorder(struct TreeNode *root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

void preorder(struct TreeNode *root) {
    if (root != NULL) {
        printf("%d ", root->data);
        preorder(root->left);
        preorder(root->right);
    }
}

void postorder(struct TreeNode *root) {
    if (root != NULL) {
        postorder(root->left);
        postorder(root->right);
        printf("%d ", root->data);
    }
}

// ============================================
// TREE HEIGHT
// ============================================
int height(struct TreeNode *root) {
    if (root == NULL) return 0;
    int leftH = height(root->left);
    int rightH = height(root->right);
    return 1 + (leftH > rightH ? leftH : rightH);
}

// ============================================
// FREE TREE
// ============================================
void freeTree(struct TreeNode *root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

// ============================================
// GRAPH (Adjacency List)
// ============================================
struct Graph {
    int numVertices;
    int *visited;
    struct AdjListNode {
        int dest;
        struct AdjListNode *next;
    } **adjLists;
};

struct Graph* createGraph(int vertices) {
    struct Graph *graph = (struct Graph*)malloc(sizeof(struct Graph));
    graph->numVertices = vertices;
    graph->adjLists = (struct AdjListNode**)malloc(vertices * sizeof(struct AdjListNode*));
    graph->visited = (int*)calloc(vertices, sizeof(int));

    for (int i = 0; i < vertices; i++) {
        graph->adjLists[i] = NULL;
    }
    return graph;
}

void addEdge(struct Graph *graph, int src, int dest) {
    struct AdjListNode *newNode = (struct AdjListNode*)malloc(sizeof(struct AdjListNode));
    newNode->dest = dest;
    newNode->next = graph->adjLists[src];
    graph->adjLists[src] = newNode;

    // For undirected graph, add reverse edge
    struct AdjListNode *newNode2 = (struct AdjListNode*)malloc(sizeof(struct AdjListNode));
    newNode2->dest = src;
    newNode2->next = graph->adjLists[dest];
    graph->adjLists[dest] = newNode2;
}

void DFS(struct Graph *graph, int vertex) {
    graph->visited[vertex] = 1;
    printf("%d ", vertex);

    struct AdjListNode *temp = graph->adjLists[vertex];
    while (temp) {
        if (!graph->visited[temp->dest]) {
            DFS(graph, temp->dest);
        }
        temp = temp->next;
    }
}

// ============================================
// MAIN
// ============================================
int main() {
    // ============================================
    // BINARY SEARCH TREE
    // ============================================
    printf("=== Binary Search Tree ===\\n");

    struct TreeNode *root = NULL;
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 70);
    insert(root, 20);
    insert(root, 40);
    insert(root, 60);
    insert(root, 80);

    printf("Inorder (sorted): ");
    inorder(root);
    printf("\\n");

    printf("Preorder: ");
    preorder(root);
    printf("\\n");

    printf("Postorder: ");
    postorder(root);
    printf("\\n");

    printf("Tree height: %d\\n", height(root));

    struct TreeNode *found = search(root, 40);
    printf("Search 40: %s\\n", found ? "Found" : "Not found");

    freeTree(root);

    // ============================================
    // GRAPH
    // ============================================
    printf("\\n=== Graph (DFS Traversal) ===\\n");

    struct Graph *graph = createGraph(6);
    addEdge(graph, 0, 1);
    addEdge(graph, 0, 2);
    addEdge(graph, 1, 3);
    addEdge(graph, 1, 4);
    addEdge(graph, 2, 5);

    printf("DFS from vertex 0: ");
    DFS(graph, 0);
    printf("\\n");

    return 0;
}`,
        language: "c"
      },
      {
        id: "19",
        title: "Sorting & Searching Algorithms",
        content: `## Sorting & Searching Algorithms in C

### Sorting Algorithms

**Bubble Sort**: Repeatedly swap adjacent elements if they're in wrong order.
- Time: O(n²), Space: O(1)
- Stable: Yes
- Best for: Small datasets, educational purposes

**Selection Sort**: Find minimum and place it at the beginning.
- Time: O(n²), Space: O(1)
- Stable: No
- Best for: Small datasets, minimal swaps

**Insertion Sort**: Build sorted portion one element at a time.
- Time: O(n²), Space: O(1)
- Stable: Yes
- Best for: Nearly sorted data, small datasets

**Merge Sort**: Divide array in half, sort each half, merge.
- Time: O(n log n), Space: O(n)
- Stable: Yes
- Best for: General-purpose, guaranteed O(n log n)

**Quick Sort**: Partition around pivot, sort partitions recursively.
- Time: O(n log n) average, O(n²) worst, Space: O(log n)
- Stable: No
- Best for: General-purpose, fastest in practice

### Searching Algorithms

**Linear Search**: Check each element one by one.
- Time: O(n)
- Works on: Any array (sorted or unsorted)

**Binary Search**: Divide sorted array in half each step.
- Time: O(log n)
- Works on: Sorted arrays only`,
        codeExample: `#include <stdio.h>

// Helper to print array
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

// ============================================
// BUBBLE SORT
// ============================================
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;  // Already sorted
    }
}

// ============================================
// SELECTION SORT
// ============================================
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}

// ============================================
// INSERTION SORT
// ============================================
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// ============================================
// MERGE SORT
// ============================================
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

// ============================================
// QUICK SORT
// ============================================
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// ============================================
// LINEAR SEARCH
// ============================================
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// ============================================
// BINARY SEARCH
// ============================================
int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

// ============================================
// MAIN
// ============================================
int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    int temp[7];

    // Bubble Sort
    for (int i = 0; i < n; i++) temp[i] = arr[i];
    bubbleSort(temp, n);
    printf("Bubble Sort:    "); printArray(temp, n);

    // Selection Sort
    for (int i = 0; i < n; i++) temp[i] = arr[i];
    selectionSort(temp, n);
    printf("Selection Sort: "); printArray(temp, n);

    // Insertion Sort
    for (int i = 0; i < n; i++) temp[i] = arr[i];
    insertionSort(temp, n);
    printf("Insertion Sort: "); printArray(temp, n);

    // Merge Sort
    for (int i = 0; i < n; i++) temp[i] = arr[i];
    mergeSort(temp, 0, n - 1);
    printf("Merge Sort:     "); printArray(temp, n);

    // Quick Sort
    for (int i = 0; i < n; i++) temp[i] = arr[i];
    quickSort(temp, 0, n - 1);
    printf("Quick Sort:     "); printArray(temp, n);

    // Searching
    printf("\\n=== Searching ===\\n");
    printf("Original array: ");
    printArray(arr, n);

    int target = 22;
    int idx = linearSearch(arr, n, target);
    printf("Linear search %d: found at index %d\\n", target, idx);

    int sorted[] = {11, 12, 22, 25, 34, 64, 90};
    idx = binarySearch(sorted, 7, target);
    printf("Binary search %d: found at index %d\\n", target, idx);

    return 0;
}`,
        language: "c"
      },
      {
        id: "20",
        title: "Best Practices & Common Mistakes",
        content: `## C Best Practices & Common Mistakes

### Best Practices

1. **Always initialize variables**
   - Uninitialized variables contain garbage values

2. **Check return values**
   - Always check if malloc/calloc/fopen return NULL
   - Check scanf return value

3. **Use const for read-only data**
   - \`const int MAX = 100;\` prevents accidental modification

4. **Use meaningful variable names**
   - Bad: \`int x, y, z;\`
   - Good: \`int studentCount, totalScore, maxGrade;\`

5. **Always free allocated memory**
   - Match every malloc/calloc with free
   - Set pointer to NULL after freeing

6. **Use size_t for sizes and indices**
   - \`size_t\` is the correct type for array sizes

7. **Avoid buffer overflows**
   - Use fgets instead of gets
   - Use strncpy instead of strcpy
   - Always specify buffer sizes

8. **Use limits.h constants**
   - \`INT_MAX\`, \`INT_MIN\`, \`UINT_MAX\` instead of magic numbers

9. **Write comments for complex logic**
   - Explain WHY, not WHAT

10. **Use compiler warnings**
    - \`gcc -Wall -Wextra\` catches many bugs

### Common Mistakes

1. **Using = instead of == in conditions**
   \`\`\`c
   if (x = 5)  // WRONG: assigns 5 to x
   if (x == 5) // CORRECT: compares
   \`\`\`

2. **Forgetting & in scanf**
   \`\`\`c
   scanf("%d", x);    // WRONG
   scanf("%d", &x);   // CORRECT
   \`\`\`

3. **Array index out of bounds**
   \`\`\`c
   int arr[5] = {1,2,3,4,5};
   arr[5] = 10;  // WRONG: valid indices are 0-4
   \`\`\`

4. **Dereferencing NULL pointer**
   \`\`\`c
   int *ptr = NULL;
   *ptr = 10;  // WRONG: segfault
   \`\`\`

5. **Memory leaks**
   \`\`\`c
   int *p = malloc(sizeof(int));
   // forgot to free(p) before p goes out of scope
   \`\`\`

6. **Using string literals as modifiable arrays**
   \`\`\`c
   char *str = "Hello";
   str[0] = 'h';  // WRONG: string literals are read-only
   \`\`\`

7. **Integer overflow**
   \`\`\`c
   int big = INT_MAX;
   big++;  // Undefined behavior
   \`\`\`

8. **Off-by-one errors in loops**
   \`\`\`c
   for (int i = 0; i <= n; i++)  // Iterates n+1 times
   for (int i = 0; i < n; i++)   // Correctly iterates n times
   \`\`\`

9. **Forgetting return statement**
   \`\`\`c
   int add(int a, int b) {
       a + b;  // WRONG: no return
   }
   \`\`\`

10. **Not checking for division by zero**
    \`\`\`c
    int result = a / b;  // WRONG if b is 0
    if (b != 0) result = a / b;  // CORRECT
    \`\`\``,
        codeExample: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>
#include <errno.h>

int main() {
    printf("=== C Best Practices & Common Mistakes ===\\n\\n");

    // ============================================
    // 1. ALWAYS INITIALIZE
    // ============================================
    printf("--- 1. Initialize Variables ---\\n");
    int initialized = 0;     // Good
    // int uninitialized;     // Bad: contains garbage
    printf("Initialized: %d\\n", initialized);

    // ============================================
    // 2. CHECK RETURN VALUES
    // ============================================
    printf("\\n--- 2. Check Return Values ---\\n");

    FILE *fp = fopen("nonexistent.txt", "r");
    if (fp == NULL) {
        printf("fopen failed (expected): %s\\n", strerror(errno));
    }

    int *p = (int*)malloc(sizeof(int));
    if (p != NULL) {
        *p = 42;
        printf("malloc succeeded: %d\\n", *p);
        free(p);
        p = NULL;
    }

    // ============================================
    // 3. USE CONST
    // ============================================
    printf("\\n--- 3. Use const ---\\n");
    const int MAX = 100;
    const char *name = "Alice";
    printf("MAX = %d, name = %s\\n", MAX, name);
    // MAX = 200;  // Would cause compilation error

    // ============================================
    // 4. AVOID BUFFER OVERFLOWS
    // ============================================
    printf("\\n--- 4. Safe String Handling ---\\n");

    char safe[20];
    // strncpy(safe, "This is a long string", sizeof(safe) - 1);
    // safe[sizeof(safe) - 1] = '\\0';
    strncpy(safe, "Hello", sizeof(safe) - 1);
    safe[sizeof(safe) - 1] = '\\0';
    printf("Safe copy: %s\\n", safe);

    // ============================================
    // 5. COMMON MISTAKES (Educational)
    // ============================================
    printf("\\n--- 5. Common Mistakes ---\\n");

    // Mistake: = vs ==
    int x = 5;
    if (x == 5) {
        printf("Correct comparison (==)\\n");
    }

    // Mistake: Array bounds
    int arr[5] = {1, 2, 3, 4, 5};
    printf("arr[4] = %d (last valid index)\\n", arr[4]);
    // arr[5] = 10;  // WRONG: out of bounds!

    // Mistake: NULL dereference
    int *nullPtr = NULL;
    if (nullPtr != NULL) {
        printf("Safe dereference\\n");
    } else {
        printf("NULL pointer check passed\\n");
    }

    // ============================================
    // 6. SAFE MEMORY PATTERN
    // ============================================
    printf("\\n--- 6. Safe Memory Pattern ---\\n");

    int *data = (int*)malloc(5 * sizeof(int));
    if (data == NULL) {
        printf("Allocation failed\\n");
        return 1;
    }

    // Use the memory...
    for (int i = 0; i < 5; i++) data[i] = i * 10;

    // Always free when done
    free(data);
    data = NULL;  // Prevent dangling pointer

    printf("Memory safely allocated, used, and freed\\n");

    // ============================================
    // 7. USEFUL MACROS
    // ============================================
    printf("\\n--- 7. Useful Patterns ---\\n");

    // Array size macro
    #define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

    int numbers[] = {10, 20, 30, 40, 50};
    printf("Array size: %lu elements\\n", ARRAY_SIZE(numbers));

    // Safe max/min
    #define SAFE_MAX(a, b) ((a) > (b) ? (a) : (b))
    #define SAFE_MIN(a, b) ((a) < (b) ? (a) : (b))

    printf("Max(10, 20) = %d\\n", SAFE_MAX(10, 20));
    printf("Min(10, 20) = %d\\n", SAFE_MIN(10, 20));

    // ============================================
    // SUMMARY
    // ============================================
    printf("\\n=== Summary ===\\n");
    printf("1. Always initialize variables\\n");
    printf("2. Check return values (malloc, fopen, scanf)\\n");
    printf("3. Use const for read-only data\\n");
    printf("4. Use meaningful variable names\\n");
    printf("5. Always free allocated memory\\n");
    printf("6. Use safe string functions (strncpy, fgets)\\n");
    printf("7. Compile with -Wall -Wextra\\n");
    printf("8. Test edge cases (empty, null, overflow)\\n");

    return 0;
}`,
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
  description: "Master JavaScript from variables and functions to DOM manipulation and async programming.",
  icon: "⚡",
  color: "from-yellow-400 to-orange-500",
  category: "Languages",
  lessons: [
    {
      id: "js-1",
      title: "JavaScript Basics",
      content: `## What is JavaScript?

JavaScript is the programming language of the web. It makes web pages interactive — animating elements, validating forms, fetching data, and updating content without reloading the page.

### Where JavaScript Runs

- **Browser** — Chrome, Firefox, Safari, Edge all have JavaScript engines
- **Node.js** — server-side JavaScript (backend, CLI tools, APIs)

### Adding JavaScript to HTML

\`\`\`html
<!-- Internal script -->
<script>
  console.log("Hello!");
</script>

<!-- External file (preferred) -->
<script src="app.js"></script>
\`\`\`

Place scripts at the end of \`<body>\` or use \`defer\` to avoid blocking page render.

### Output Methods

| Method | Purpose |
|--------|---------|
| \`console.log()\` | Debug output in browser console |
| \`alert()\` | Popup dialog (avoid in production) |
| \`document.write()\` | Writes directly to the page (avoid) |
| \`innerHTML\` | Sets HTML content of an element |
| \`textContent\` | Sets text content of an element |

### JavaScript is NOT Java

Despite the name, they're completely different languages. JavaScript is a high-level, dynamically-typed, interpreted language. Java is statically-typed and compiled.`,
      codeExample: `// Your first JavaScript program\nconsole.log("Hello, World!");\nconsole.log("JavaScript is fun!");\n\n// Variables\nlet name = "Alice";\nlet age = 25;\nconsole.log(name, age);\n\n// Template literals\nconsole.log(\`Hello, \${name}! You are \${age} years old.\`);\n\n// Arrow function\nconst greet = (name) => \`Hello, \${name}!\`;\nconsole.log(greet("Bob"));`,
      language: "javascript"
    },
    {
      id: "js-2",
      title: "Variables and Data Types",
      content: `## Variables — Storing Data

JavaScript has three ways to declare variables:

| Keyword | Scope | Reassignable | Hoisted |
|---------|-------|-------------|---------|
| \`var\` | Function | Yes | Yes (undefined) |
| \`let\` | Block | Yes | Yes (TDZ) |
| \`const\` | Block | No | Yes (TDZ) |

**Always use \`const\` by default.** Use \`let\` only when you need to reassign. Avoid \`var\`.

### Data Types

**Primitives** (immutable, stored by value):
- \`string\`: \`"hello"\`, \`'world'\`, \`\\\`template\\\`\`
- \`number\`: \`42\`, \`3.14\`, \`Infinity\`, \`NaN\`
- \`boolean\`: \`true\`, \`false\`
- \`undefined\`: declared but no value
- \`null\`: intentional absence of value
- \`symbol\`: unique identifier
- \`bigint\`: \`9007199254740991n\`

**Reference types** (mutable, stored by reference):
- \`object\`: \`{ name: "Alice", age: 25 }\`
- \`array\`: \`[1, 2, 3]\`
- \`function\`: \`() => {}\`

### typeof Operator

\`\`\`javascript
typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (historical bug)
typeof {}         // "object"
typeof []         // "object" (use Array.isArray())
\`\`\`

### Template Literals

Backtick strings with embedded expressions:

\`\`\`javascript
const name = "Alice";
const msg = \`Hello, \${name}! \${1 + 1} = 2\`;
\`\`\``,
      codeExample: `// Variables\nconst name = "Alice";     // const — can't reassign\nlet age = 25;              // let — can reassign\nlet isStudent;             // undefined\n\n// Reassignment\nage = 26;\n// name = "Bob";  // TypeError!\n\n// Data types\nconst str = "Hello";       // string\nconst num = 42;            // number\nconst pi = 3.14;           // number\nconst bool = true;         // boolean\nconst nothing = null;      // null\nconst undef = undefined;   // undefined\n\n// typeof\nconsole.log(typeof str);    // "string"\nconsole.log(typeof num);    // "number"\nconsole.log(typeof bool);   // "boolean"\nconsole.log(typeof undef);  // "undefined"\nconsole.log(typeof null);   // "object" (bug!)\n\n// Template literals\nconst greeting = \`Hello, \${name}! You are \${age} years old.\`;\nconsole.log(greeting);\n\n// Multi-line strings\nconst html = \`\n  <div>\n    <h1>\${name}</h1>\n    <p>Age: \${age}</p>\n  </div>\n\`;\nconsole.log(html);`,
      language: "javascript"
    },
    {
      id: "js-3",
      title: "Operators",
      content: `## Operators — Performing Operations

### Arithmetic Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| \`+\` | Addition | \`10 + 3\` → 13 |
| \`-\` | Subtraction | \`10 - 3\` → 7 |
| \`*\` | Multiplication | \`10 * 3\` → 30 |
| \`/\` | Division | \`10 / 3\` → 3.333 |
| \`%\` | Modulo | \`10 % 3\` → 1 |
| \`**\` | Exponent | \`2 ** 3\` → 8 |

### Comparison Operators

| Operator | Meaning | \`"5" == 5\` | \`"5" === 5\` |
|----------|---------|-------------|--------------|
| \`==\` | Loose equality | \`true\` | — |
| \`===\` | Strict equality | — | \`false\` |
| \`!=\` | Loose inequality | \`false\` | — |
| \`!==\` | Strict inequality | — | \`true\` |

**Always use \`===\` and \`!==\`.** Loose equality does type coercion, which causes bugs.

### Logical Operators

\`\`\`javascript
true && false   // false (AND)
true || false   // true  (OR)
!true           // false (NOT)
\`\`\`

### Truthy and Falsy Values

**Falsy** values (evaluate to \`false\` in boolean context):
\`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`

Everything else is **truthy**, including:
\`"0"\`, \`"false"\`, \`[]\`, \`{}\`, \`new Number(0)\`

### Short-Circuit Evaluation

\`\`\`javascript
const name = user && user.name;     // returns user.name or falsy value
const value = input || "default";   // returns input if truthy, else "default"
const name = user?.name ?? "Guest"; // nullish coalescing
\`\`\``,
      codeExample: `// Arithmetic\nconsole.log(10 + 3);   // 13\nconsole.log(10 - 3);   // 7\nconsole.log(10 * 3);   // 30\nconsole.log(10 / 3);   // 3.333...\nconsole.log(10 % 3);   // 1\nconsole.log(2 ** 3);   // 8\n\n// Strict vs Loose equality\nconsole.log("5" == 5);    // true (type coercion)\nconsole.log("5" === 5);   // false (no coercion)\nconsole.log(null == undefined);  // true\nconsole.log(null === undefined); // false\n\n// Logical operators\nconst age = 25;\nconst hasID = true;\nconsole.log(age >= 18 && hasID);  // true\nconsole.log(age < 18 || !hasID);  // false\n\n// Truthy/Falsy\nif ("hello") console.log("truthy");  // runs\nif (0) console.log("never runs");    // skipped\nif ("0") console.log("also truthy"); // runs!\n\n// Short-circuit\nconst user = null;\nconst name = user && user.name;       // null\nconst fallback = user || "Anonymous"; // "Anonymous"\n\n// Nullish coalescing\nconst input = 0;\nconst val1 = input || 10;   // 10 (0 is falsy!)\nconst val2 = input ?? 10;   // 0  (0 is not null/undefined)`,
      language: "javascript"
    },
    {
      id: "js-4",
      title: "Conditionals",
      content: `## Conditionals — Making Decisions

### if / else if / else

\`\`\`javascript
const score = 85;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Grade F");
}
\`\`\`

### Ternary Operator

\`\`\`javascript
const result = score >= 50 ? "Pass" : "Fail";
\`\`\`

Use for simple assignments. Don't nest ternaries — it hurts readability.

### switch Statement

Best when comparing one value against many constants:

\`\`\`javascript
const day = "Monday";

switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log("Weekday");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Invalid day");
}
\`\`\`

**Remember:** Each case needs \`break\`. Without it, execution falls through to the next case.

### Logical Patterns

\`\`\`javascript
// Guard clauses
function getDiscount(age, isStudent) {
  if (age < 18) return 0.25;
  if (isStudent) return 0.15;
  if (age > 65) return 0.20;
  return 0;
}
\`\`\``,
      codeExample: `// if/else if/else\nconst score = 85;\nlet grade;\n\nif (score >= 90) grade = "A";\nelse if (score >= 80) grade = "B";\nelse if (score >= 70) grade = "C";\nelse grade = "F";\n\nconsole.log(\`Score: \${score} → Grade: \${grade}\`);\n\n// Ternary\nconst pass = score >= 50 ? "Pass" : "Fail";\nconsole.log(pass);\n\n// switch\nconst month = new Date().getMonth();\nlet season;\n\nswitch (month) {\n  case 11: case 0: case 1:\n    season = "Winter"; break;\n  case 2: case 3: case 4:\n    season = "Spring"; break;\n  case 5: case 6: case 7:\n    season = "Summer"; break;\n  case 8: case 9: case 10:\n    season = "Fall"; break;\n}\nconsole.log(\`Month \${month} is \${season}\`);\n\n// Guard clauses\nfunction canVote(age) {\n  if (age < 0) return "Invalid age";\n  if (age < 18) return "Too young";\n  return "Can vote!";\n}\nconsole.log(canVote(25));  // "Can vote!"\nconsole.log(canVote(15));  // "Too young"`,
      language: "javascript"
    },
    {
      id: "js-5",
      title: "Loops",
      content: `## Loops — Repeating Actions

### for Loop

Best when you know the iteration count:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// Output: 0 1 2 3 4
\`\`\`

### while Loop

Best when you don't know when to stop:

\`\`\`javascript
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
\`\`\`

### do...while Loop

Guarantees at least one execution:

\`\`\`javascript
let num;
do {
  num = Math.floor(Math.random() * 10);
} while (num !== 5);
console.log("Got 5!");\n\`\`\`

### for...in and for...of

\`\`\`javascript
// for...in — iterates over object KEYS
const person = { name: "Alice", age: 25 };
for (let key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}

// for...of — iterates over ITERABLE VALUES
const colors = ["red", "green", "blue"];
for (let color of colors) {
  console.log(color);
}
\`\`\`

### Array Iteration Methods

\`\`\`javascript
const nums = [1, 2, 3, 4, 5];

nums.forEach(n => console.log(n));        // iterate
const doubled = nums.map(n => n * 2);     // transform
const evens = nums.filter(n => n % 2 === 0); // filter
const sum = nums.reduce((acc, n) => acc + n, 0); // accumulate
\`\`\``,
      codeExample: `// for loop\nconsole.log("=== For Loop ===");\nfor (let i = 1; i <= 5; i++) {\n  console.log(\`\${i} × 5 = \${i * 5}\`);\n}\n\n// while loop\nconsole.log("\\n=== While Loop ===");\nlet n = 16;\nwhile (n > 0) {\n  process.stdout.write(\`\${n} \`);\n  n = Math.floor(n / 2);\n}\nconsole.log();\n\n// for...of\nconsole.log("\\n=== For...of ===");\nconst fruits = ["apple", "banana", "cherry"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n\n// for...in\nconsole.log("\\n=== For...in ===");\nconst person = { name: "Alice", age: 25, city: "NYC" };\nfor (const key in person) {\n  console.log(\`\${key}: \${person[key]}\`);\n}\n\n// Array methods\nconsole.log("\\n=== Array Methods ===");\nconst nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log("Evens:", evens);\n\nconst doubled = nums.map(n => n * 2);\nconsole.log("Doubled:", doubled);\n\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log("Sum:", sum);\n\nconst firstBig = nums.find(n => n > 7);\nconsole.log("First > 7:", firstBig);\n\nconst hasNegative = nums.some(n => n < 0);\nconsole.log("Has negative:", hasNegative);`,
      language: "javascript"
    },
    {
      id: "js-6",
      title: "Functions",
      content: `## Functions — Reusable Code Blocks

### Three Ways to Define Functions

\`\`\`javascript
// 1. Function Declaration (hoisted)
function greet(name) {
  return \`Hello, \${name}!\`;
}

// 2. Function Expression (not hoisted)
const greet = function(name) {
  return \`Hello, \${name}!\`;
};

// 3. Arrow Function (concise, lexical \`this\`)
const greet = (name) => \`Hello, \${name}!\`;
\`\`\`

### Parameters and Defaults

\`\`\`javascript
function createUser(name, role = "user", active = true) {
  return { name, role, active };
}
createUser("Alice");           // { name: "Alice", role: "user", active: true }
createUser("Bob", "admin");    // { name: "Bob", role: "admin", active: true }
\`\`\`

### Rest Parameters

\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4);  // 10
\`\`\`

### Callback Functions

A function passed as an argument to another function:

\`\`\`javascript
function fetchData(url, callback) {
  // simulate API call
  callback(null, { data: "result" });
}

fetchData("/api/users", (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});
\`\`\`

### Closures

A function that remembers its outer scope:

\`\`\`javascript
function counter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  };
}
const c = counter();
c.increment();  // 1
c.increment();  // 2
c.getCount();   // 2
\`\`\``,
      codeExample: `// Function declaration\nfunction add(a, b) {\n  return a + b;\n}\nconsole.log(add(5, 3));  // 8\n\n// Arrow function\nconst multiply = (a, b) => a * b;\nconsole.log(multiply(5, 3));  // 15\n\n// Default parameters\nfunction greet(name = "World") {\n  return \`Hello, \${name}!\`;\n}\nconsole.log(greet());        // "Hello, World!"\nconsole.log(greet("Alice")); // "Hello, Alice!"\n\n// Rest parameters\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nconsole.log(sum(1, 2, 3, 4));  // 10\n\n// Higher-order function\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);  // [2, 4, 6, 8, 10]\n\n// Closure\nfunction createCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter.increment()); // 1\nconsole.log(counter.increment()); // 2\nconsole.log(counter.decrement()); // 1\nconsole.log(counter.getCount());  // 1`,
      language: "javascript"
    },
    {
      id: "js-7",
      title: "Arrays",
      content: `## Arrays — Ordered Collections

Arrays are ordered lists of values. They can hold any type and can be mixed.

### Creating Arrays

\`\`\`javascript
const arr1 = [1, 2, 3];
const arr2 = new Array(3);       // [,,] (3 empty slots)
const arr3 = Array.from("hello"); // ["h","e","l","l","o"]
\`\`\`

### Essential Methods

| Method | Purpose | Mutates? |
|--------|---------|----------|
| \`push()\` | Add to end | Yes |
| \`pop()\` | Remove from end | Yes |
| \`shift()\` | Remove from start | Yes |
| \`unshift()\` | Add to start | Yes |
| \`splice()\` | Add/remove at index | Yes |
| \`slice()\` | Copy portion | No |
| \`concat()\` | Combine arrays | No |
| \`indexOf()\` | Find index | No |
| \`includes()\` | Check existence | No |
| \`join()\` | Array to string | No |
| \`reverse()\` | Reverse order | Yes |
| \`sort()\` | Sort (lexicographic!) | Yes |

### Functional Methods (don't mutate)

| Method | Purpose | Returns |
|--------|---------|---------|
| \`map()\` | Transform each element | New array |
| \`filter()\` | Keep elements matching condition | New array |
| \`reduce()\` | Accumulate into single value | Single value |
| \`find()\` | First element matching condition | Element |
| \`some()\` | Does any element match? | Boolean |
| \`every()\` | Do all elements match? | Boolean |

### Spread Operator

\`\`\`javascript
const arr = [1, 2, 3];
const copy = [...arr];          // copy
const merged = [...arr, 4, 5];  // merge
\`\`\`

### Destructuring

\`\`\`javascript
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]
\`\`\``,
      codeExample: `// Creating arrays\nconst fruits = ["apple", "banana", "orange"];\nconsole.log(fruits[0]);  // "apple"\nconsole.log(fruits.length); // 3\n\n// Adding/removing\nfruits.push("grape");      // ["apple","banana","orange","grape"]\nfruits.pop();               // ["apple","banana","orange"]\nfruits.unshift("mango");   // ["mango","apple","banana","orange"]\nfruits.shift();             // ["apple","banana","orange"]\n\n// map — transform\nconst upper = fruits.map(f => f.toUpperCase());\nconsole.log(upper);  // ["APPLE","BANANA","ORANGE"]\n\n// filter — select\nconst nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens);  // [2, 4, 6, 8, 10]\n\n// reduce — accumulate\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log("Sum:", sum);  // 55\n\n// find — first match\nconst firstBig = nums.find(n => n > 7);\nconsole.log("First > 7:", firstBig);  // 8\n\n// spread\nconst arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst merged = [...arr1, ...arr2];\nconsole.log(merged);  // [1, 2, 3, 4, 5, 6]\n\n// destructuring\nconst [a, b, ...rest] = [10, 20, 30, 40, 50];\nconsole.log(a, b, rest);  // 10 20 [30, 40, 50]\n\n// sort (careful — lexicographic by default!)\nconst numbers = [10, 1, 21, 2];\nnumbers.sort((a, b) => a - b);  // numeric sort\nconsole.log(numbers);  // [1, 2, 10, 21]`,
      language: "javascript"
    },
    {
      id: "js-8",
      title: "JavaScript Objects",
      content: `## Objects — Key-Value Pairs

Objects store data as properties (key-value pairs) and can include methods (functions).

### Creating Objects

\`\`\`javascript
// Object literal (preferred)
const user = {
  name: "Alice",
  age: 25,
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
};

// Constructor
const user = new Object();
user.name = "Alice";
\`\`\`

### Accessing Properties

\`\`\`javascript
user.name          // dot notation (preferred)
user["name"]       // bracket notation (required for dynamic keys)
user.greet()       // method call
\`\`\`

Bracket notation is required when:
- The key is dynamic: \`user[variable]\`
- The key has special characters: \`user["first-name"]\`
- The key is a number: \`user[0]\`

### Object Methods

\`\`\`javascript
const calculator = {
  add(a, b) { return a + b; },
  subtract(a, b) { return a - b; },
  multiply(a, b) { return a * b; }
};
calculator.add(2, 3);  // 5
\`\`\`

### Destructuring

\`\`\`javascript
const { name, age, city = "NYC" } = user;
// name="Alice", age=25, city="NYC" (default)
\`\`\`

### Spread for Objects

\`\`\`javascript
const updated = { ...user, age: 26, role: "admin" };
\`\`\`

### Useful Static Methods

\`\`\`javascript
Object.keys(user)     // ["name", "age"]
Object.values(user)   // ["Alice", 25]
Object.entries(user)  // [["name","Alice"], ["age",25]]
Object.assign({}, user, { age: 26 })  // merge
\`\`\``,
      codeExample: `// Object literal\nconst person = {\n  name: "Alice",\n  age: 25,\n  hobbies: ["reading", "coding"],\n  address: {\n    city: "New York",\n    state: "NY"\n  },\n  greet() {\n    return \`Hi, I'm \${this.name} from \${this.address.city}\`;\n  }\n};\n\n// Access properties\nconsole.log(person.name);       // "Alice"\nconsole.log(person.address.city); // "New York"\nconsole.log(person.greet());     // "Hi, I'm Alice from New York"\n\n// Add/remove properties\nperson.email = "alice@example.com";\ndelete person.age;\nconsole.log(person);\n\n// Destructuring\nconst { name, hobbies, address: { city } } = person;\nconsole.log(name, city, hobbies);\n\n// Object methods\nconst calculator = {\n  result: 0,\n  add(n) { this.result += n; return this; },\n  subtract(n) { this.result -= n; return this; },\n  getValue() { return this.result; }\n};\n\nconst value = calculator.add(10).add(5).subtract(3).getValue();\nconsole.log(value);  // 12\n\n// Spread\nconst user1 = { name: "Alice", role: "user" };\nconst admin = { ...user1, role: "admin", active: true };\nconsole.log(admin);\n\n// Static methods\nconsole.log(Object.keys(person));\nconsole.log(Object.values(person));\nconsole.log(Object.entries(person));`,
      language: "javascript"
    },
    {
      id: "js-9",
      title: "DOM Manipulation",
      content: `## DOM — Making Pages Interactive

The DOM (Document Object Model) is a tree representation of your HTML page. JavaScript can read, add, remove, and change any element in this tree.

### Selecting Elements

\`\`\`javascript
document.getElementById("myId")           // single element
document.querySelector(".myClass")       // first match
document.querySelectorAll("p.highlight") // all matches (NodeList)
\`\`\`

### Changing Content

\`\`\`javascript
element.textContent = "New text";        // plain text (safe)
element.innerHTML = "<b>Bold</b>";       // HTML (careful with XSS)
element.innerText = "Visible text";      // respects CSS visibility
\`\`\`

### Changing Styles

\`\`\`javascript
element.style.color = "red";
element.style.fontSize = "20px";
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("visible");
\`\`\`

### Changing Attributes

\`\`\`javascript
element.setAttribute("href", "https://example.com");
element.getAttribute("href");
element.removeAttribute("disabled");
\`\`\`

### Creating Elements

\`\`\`javascript
const div = document.createElement("div");
div.textContent = "Hello!";
div.classList.add("card");
document.body.appendChild(div);
\`\`\`

### Event Listeners

\`\`\`javascript
button.addEventListener("click", (event) => {
  event.target.textContent = "Clicked!";
});
\`\`\`

Common events: \`click\`, \`input\`, \`submit\`, \`keydown\`, \`keyup\`, \`mouseover\`, \`mouseout\`, \`load\`, \`scroll\``,
      codeExample: `// Selecting elements\nconst title = document.querySelector("h1");\nconst items = document.querySelectorAll(".item");\n\n// Changing content\ntitle.textContent = "New Title!";\ntitle.innerHTML = "<em>Emphasized</em> Title";\n\n// Changing styles\ntitle.style.color = "#667eea";\ntitle.style.fontSize = "2.5rem";\n\n// classList\nconst card = document.querySelector(".card");\ncard.classList.add("active", "highlighted");\ncard.classList.remove("hidden");\ncard.classList.toggle("visible");\n\n// Event listeners\nconst button = document.querySelector("#myBtn");\nbutton.addEventListener("click", () => {\n  alert("Button clicked!");\n});\n\n// Form handling\nconst form = document.querySelector("form");\nform.addEventListener("submit", (e) => {\n  e.preventDefault();  // don't reload page\n  const input = form.querySelector("input");\n  console.log("Submitted:", input.value);\n});\n\n// Creating elements dynamically\nfunction createCard(title, description) {\n  const card = document.createElement("div");\n  card.className = "card";\n  card.innerHTML = \`\n    <h3>\${title}</h3>\n    <p>\${description}</p>\n    <button onclick="this.parentElement.remove()">Delete</button>\n  \`;\n  return card;\n}\n\ndocument.body.appendChild(createCard("New Card", "This was created with JS"));`,
      language: "javascript"
    },
    {
      id: "js-10",
      title: "Error Handling",
      content: `## Error Handling — Managing Failures

Runtime errors are inevitable. Good error handling prevents crashes and provides meaningful feedback.

### try...catch...finally

\`\`\`javascript
try {
  const data = JSON.parse(invalidJSON);
} catch (error) {
  console.error("Parse failed:", error.message);
} finally {
  console.log("This always runs");
}
\`\`\`

### Throwing Errors

\`\`\`javascript
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Arguments must be numbers");
  }
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
\`\`\`

### Error Types

| Type | Cause |
|------|-------|
| \`TypeError\` | Wrong type: \`null.toFixed()\` |
| \`ReferenceError\` | Undefined variable: \`console.log(x)\` |
| \`SyntaxError\` | Bad syntax: \`const = 5\` |
| \`RangeError\` | Out of range: \`(-1).toFixed(100)\` |

### Async Error Handling

\`\`\`javascript
// Promises
fetch("/api/data")
  .then(res => res.json())
  .catch(err => console.error("Fetch failed:", err));

// Async/await
async function getData() {
  try {
    const res = await fetch("/api/data");
    return await res.json();
  } catch (err) {
    console.error("Failed:", err);
  }
}
\`\`\`

### Best Practices
- Always handle errors you can anticipate
- Use specific error types, not generic \`Error\`
- Log errors for debugging but show user-friendly messages
- Never silently swallow errors`,
      codeExample: `// try...catch\ntry {\n  const result = JSON.parse("{ invalid json }");\n} catch (error) {\n  console.error("Parse error:", error.message);\n} finally {\n  console.log("Cleanup here");\n}\n\n// Throwing errors\nfunction setAge(age) {\n  if (typeof age !== "number") {\n    throw new TypeError("Age must be a number");\n  }\n  if (age < 0 || age > 150) {\n    throw new RangeError("Age must be 0-150");\n  }\n  return age;\n}\n\ntry {\n  console.log(setAge(25));\n  console.log(setAge(-5));  // RangeError\n} catch (error) {\n  console.error(error.constructor.name + ":", error.message);\n}\n\n// Practical example: safe JSON parsing\nfunction safeParse(json) {\n  try {\n    return { data: JSON.parse(json), error: null };\n  } catch (e) {\n    return { data: null, error: e.message };\n  }\n}\n\nconst result1 = safeParse('{"name": "Alice"}');\nconst result2 = safeParse("not json");\nconsole.log(result1); // { data: {name: "Alice"}, error: null }\nconsole.log(result2); // { data: null, error: "..." }\n\n// Async error handling\nasync function fetchUser(id) {\n  try {\n    const res = await fetch(\\\`/api/users/\\\${id}\\\`);\n    if (!res.ok) throw new Error(\\\`HTTP \\\${res.status}\\\`);\n    return await res.json();\n  } catch (err) {\n    console.error("Failed to fetch user:", err.message);\n    return null;\n  }\n}`,
      language: "javascript"
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

  },

  {

    slug: "c-pointers-memory",

    title: "C Pointers & Memory",

    description: "Master pointers, memory management, and low-level C programming concepts.",

    icon: "📍",

    color: "from-orange-500 to-red-600",
    category: "Languages",

    lessons: [

      {

        id: "1",

        title: "What Are Pointers",

        content: "A pointer is a variable that stores the memory address of another variable, not the value itself. Think of it like a street address — the address tells you where to find the house, but it is not the house. In C, every variable lives at a specific address in RAM, and the address-of operator & gives you that location. The dereference operator * reads the value stored at that address. Declaration: `int x = 10; int *p = &x;` — here p holds the address of x, and *p reads 10.\n\nCommon confusion: the * means two different things depending on context. In declaration `int *p`, it says \"p is a pointer to int.\" In expression `*p = 20`, it means \"write to the address p points to.\" This dual meaning trips up every beginner.\n\nNULL pointers are critical: a pointer that does not point to anything valid is dangerous. Dereferencing NULL causes a segmentation fault — your program crashes. Always initialize pointers: either assign them a valid address or set them to NULL. Check for NULL before dereferencing.\n\nInterview trap: \"What is a void pointer?\" A void* can point to any data type but cannot be dereferenced directly — you must cast it first. It is used extensively in malloc's return type and generic functions.\n\nMemory layout insight: local variables live on the stack (fast, automatic cleanup), while dynamically allocated memory lives on the heap (manual management). Pointers let you cross the boundary between these regions — understanding this distinction prevents 90% of memory bugs in C.",

        codeExample: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *p = &x;       // p stores address of x\n\n    printf("x value: %d\\n", x);       // 42\n    printf("x address: %p\\n", &x);    // some address\n    printf("p value: %p\\n", p);       // same address\n    printf("p dereference: %d\\n", *p); // 42\n\n    *p = 100;          // write through pointer\n    printf("x now: %d\\n", x);         // 100\n\n    // NULL pointer check\n    int *q = NULL;\n    if (q != NULL) {\n        printf("%d\\n", *q);\n    } else {\n        printf("q is NULL, cannot dereference\\n");\n    }\n\n    return 0;\n}`,

        language: "c"

      },

      {

        id: "2",

        title: "Pointer Arithmetic",

        content: "Pointer arithmetic is not regular math — it scales by the size of the pointed-to type. When you increment an int* by 1, the address advances by sizeof(int), typically 4 bytes. An increment of char* moves by 1 byte. This is why `p + 1` does not always mean \"next byte\" — it means \"next element.\" Understanding this is essential for traversing arrays and buffers.\n\nSubtracting two pointers of the same type gives you the number of elements between them, not bytes. If p1 points to arr[3] and p2 points to arr[7], then p2 - p1 equals 4 (elements), even though the byte difference might be 16 bytes for ints. This is one of the few cases where pointer subtraction is defined by the C standard.\n\nDanger zone: pointer arithmetic on different arrays is undefined behavior. You can only meaningfully compare or subtract pointers that point into the same array (or one past the end). Comparing pointers from different malloc calls or different stack variables is meaningless and may produce garbage.\n\nCommon bug: iterating past array bounds. If arr has 5 elements (indices 0-4), then `p = arr + 5` points one past the end — this is valid to create but never to dereference. Dereferencing arr[5] reads random memory. Valgrind and AddressSanitizer catch these.\n\nInterview question: \"What does `*(arr + i)` equal?\" It equals arr[i]. The array name decays to a pointer to its first element, so arr + i points to the i-th element, and dereferencing it gives the value. This equivalence is fundamental to understanding C arrays.\n\nPractical tip: pointer arithmetic is the engine behind efficient string parsing, buffer processing, and implementing your own memory allocators.",

        codeExample: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int *p = arr;       // points to arr[0]\n\n    // Traverse with pointer arithmetic\n    for (int i = 0; i < 5; i++) {\n        printf("arr[%d] = %d (addr: %p)\\n", i, *(p + i), (void*)(p + i));\n    }\n\n    // Increment pointer directly\n    printf("\\nFirst: %d\\n", *p);    // 10\n    p++;                              // now points to arr[1]\n    printf("After ++: %d\\n", *p);   // 20\n\n    // Pointer difference = element count\n    int *start = &arr[0];\n    int *end = &arr[4];\n    printf("Distance: %ld elements\\n", end - start); // 4\n\n    // char pointer arithmetic (moves by 1 byte)\n    char str[] = "Hello";\n    char *cp = str;\n    printf("Char: %c, next: %c\\n", *cp, *(cp + 1)); // H, e\n\n    // ⚠ DANGER: pointer comparison across arrays is undefined\n    // int a[5], b[5]; if (&a[4] > &b[0]) ... // UNDEFINED\n\n    return 0;\n}`,

        language: "c"

      },

      {

        id: "3",

        title: "Dynamic Memory (malloc/free)",

        content: "Stack memory is limited and automatically freed when a function returns. Heap memory, allocated with malloc, calloc, or realloc, persists until you explicitly free it. This gives you flexibility — arrays sized at runtime, data structures that grow and shrink — but demands discipline. Every malloc must have exactly one matching free. Miss the free and you leak memory. Free twice and you corrupt the heap.\n\nmalloc(size) allocates size bytes and returns a void* — always check for NULL before using it. If the system runs out of memory, malloc returns NULL. calloc(n, size) allocates n elements of size bytes each, initialized to zero — useful for arrays where zero-initialization matters. realloc(ptr, newSize) resizes a previous allocation; it may move the data to a new location, so always use the returned pointer, never the old one.\n\nCommon trap: allocating inside a function and returning the pointer. If you allocate on the stack (int arr[100]), it is destroyed when the function returns. You must malloc for heap allocation. Another trap: forgetting to free in error paths. If malloc succeeds but a later operation fails, you must free before returning.\n\nInterview question: \"What is a memory leak?\" It is allocated memory that is no longer reachable — no pointer references it. The program cannot free it, and the memory is wasted. Tools like Valgrind's memcheck detect leaks.\n\nPractical rule: always have a clear ownership model. Who allocated the memory? Who is responsible for freeing it? Document this in comments or use a consistent pattern (caller frees, or library frees). Mixed ownership causes 80% of memory bugs.",

        codeExample: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nchar* create_greeting(const char* name) {\n    // +1 for null terminator\n    size_t len = strlen("Hello, ") + strlen(name) + 2;\n    char* greeting = malloc(len);\n    if (!greeting) {\n        fprintf(stderr, "malloc failed\\n");\n        return NULL;\n    }\n    snprintf(greeting, len, "Hello, %s!", name);\n    return greeting;  // caller must free()\n}\n\nint main() {\n    // malloc: raw allocation\n    int *arr = malloc(5 * sizeof(int));\n    if (!arr) return 1;\n    for (int i = 0; i < 5; i++) arr[i] = i * 10;\n\n    // realloc: resize\n    int *tmp = realloc(arr, 10 * sizeof(int));\n    if (!tmp) { free(arr); return 1; }\n    arr = tmp;\n\n    // calloc: zero-initialized\n    int *zeros = calloc(5, sizeof(int));\n    if (!zeros) { free(arr); return 1; }\n    // zeros[0] through zeros[4] are all 0\n\n    char *msg = create_greeting("World");\n    if (msg) {\n        printf("%s\\n", msg);\n        free(msg);    // must free what malloc returned\n    }\n\n    free(arr);\n    free(zeros);\n    return 0;\n}`,

        language: "c"

      },

      {

        id: "4",

        title: "Arrays & Pointers Relationship",

        content: "In C, an array name decays into a pointer to its first element in most contexts. When you write `int arr[5]`, arr behaves like `int* const arr` — a constant pointer to arr[0]. This is why you can pass arr to a function expecting int*: the decay happens automatically. But there are critical exceptions: sizeof(arr) returns the full array size (5 * sizeof(int)), not the pointer size. Once decayed to a pointer, sizeof gives you 4 or 8 bytes (pointer size), losing the array length.\n\nThis decay is the root cause of the \"arrays don't know their own size\" problem. When you pass an array to a function, you must also pass the length. Functions like `void process(int arr[], int len)` — the arr[] syntax is just syntactic sugar for int*.\n\nPointer-to-array vs array-of-pointers: `int (*p)[5]` is a pointer to an array of 5 ints. `int *p[5]` is an array of 5 int pointers. The parentheses change the meaning entirely. This distinction matters for 2D arrays and dynamic allocation.\n\nCommon bug: using sizeof on a pointer parameter. If you write `void foo(int arr[]) { int n = sizeof(arr); }`, n will be 4 or 8 (pointer size), not the array size. This is the most common array bug in C.\n\nInterview trap: \"What is the difference between arr and &arr?\" Both point to the same address, but arr decays to int* (pointer to first element), while &arr is int (*)[5] (pointer to the entire array). Pointer arithmetic behaves differently: arr + 1 moves by sizeof(int), &arr + 1 moves by 5*sizeof(int).\n\nEngineering tip: when allocating 2D arrays, malloc a single block and compute indices manually — this avoids pointer chasing and improves cache performance.",

        codeExample: `#include <stdio.h>\n\nvoid print_array(int *arr, int len) {\n    // arr is a pointer here, sizeof(arr) = 8 (ptr size)\n    for (int i = 0; i < len; i++) {\n        printf("%d ", arr[i]);\n    }\n    printf("\\n");\n}\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n\n    // Array decays to pointer\n    int *p = arr;        // decay: arr -> &arr[0]\n    printf("arr[2] = %d\\n", arr[2]);     // 30\n    printf("*(p+2) = %d\\n", *(p + 2));   // 30\n    printf("p[2] = %d\\n", p[2]);         // 30\n\n    // sizeof trap\n    printf("sizeof(arr) = %zu\\n", sizeof(arr));   // 20 (5*4)\n    printf("sizeof(p) = %zu\\n", sizeof(p));       // 8  (pointer)\n\n    // &arr vs arr\n    printf("arr   = %p\\n", (void*)arr);\n    printf("&arr  = %p\\n", (void*)&arr);  // same address\n    printf("arr+1 = %p\\n", (void*)(arr + 1));   // +4 bytes\n    printf("&arr+1= %p\\n", (void*)(&arr + 1));  // +20 bytes\n\n    // Pass to function (decays to pointer)\n    print_array(arr, 5);\n\n    return 0;\n}`,

        language: "c"

      },

      {

        id: "5",

        title: "Structs & Pointers",

        content: "Structs group related data under one name. When you pass a struct by value, the entire struct is copied — expensive for large structs. Passing by pointer avoids the copy and allows the function to modify the original. The arrow operator -> combines dereference and member access: `p->name` is equivalent to `(*p).name`. This syntax is everywhere in C codebases.\n\nDefining a struct creates a new type, but memory is not allocated until you declare a variable of that type. A common pattern is defining a struct and a pointer to it simultaneously:\n\nStruct layout in memory matters for performance. Members are laid out in declaration order with padding for alignment. A struct with char, int, char uses 12 bytes (1 + 3 padding + 4 + 1 + 3 padding), not 6. Reorder members from largest to smallest to minimize padding.\n\nLinked list nodes are the classic use case for struct pointers: each node contains data and a pointer to the next node. Without pointers, you would need a contiguous array — linked lists exist precisely because pointers let you connect scattered heap allocations.\n\nCommon mistake: returning a pointer to a local struct. The struct lives on the stack and is destroyed when the function returns — the pointer becomes dangling. Always malloc the struct if you need to return it.\n\nInterview question: \"Implement a linked list insert at head.\" You allocate a new node, set its next to the current head, and update head to point to the new node. Three pointer assignments, all O(1).\n\nPractical tip: in large C projects, structs are often accessed through pointers exclusively. You will see function signatures like `void update_employee(Employee *emp)` everywhere — this is idiomatic C for pass-by-reference.",

        codeExample: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct {\n    char name[50];\n    int age;\n    double salary;\n} Employee;\n\n// Pass by pointer to avoid copy\nvoid print_employee(const Employee *e) {\n    printf("%s (age %d): $%.2f\\n", e->name, e->age, e->salary);\n}\n\nvoid give_raise(Employee *e, double amount) {\n    e->salary += amount;  // modifies original\n}\n\n// Linked list node\ntypedef struct Node {\n    int data;\n    struct Node *next;    // pointer to same type\n} Node;\n\nNode* insert_head(Node *head, int val) {\n    Node *new_node = malloc(sizeof(Node));\n    if (!new_node) return head;\n    new_node->data = val;\n    new_node->next = head;\n    return new_node;     // new head\n}\n\nint main() {\n    Employee emp = {"Alice", 30, 75000.0};\n    print_employee(&emp);        // pass address\n    give_raise(&emp, 5000.0);\n    print_employee(&emp);        // salary increased\n\n    // Build linked list: 3 -> 2 -> 1\n    Node *list = NULL;\n    for (int i = 1; i <= 3; i++) {\n        list = insert_head(list, i);\n    }\n    for (Node *cur = list; cur; cur = cur->next) {\n        printf("%d -> ", cur->data);\n    }\n    printf("NULL\\n");\n\n    return 0;\n}`,

        language: "c"

      },

      {

        id: "6",

        title: "Common Memory Bugs",

        content: "Memory bugs in C are silent — your program compiles and runs, producing wrong results or crashing intermittently. The four most common bugs are memory leaks, dangling pointers, double frees, and buffer overflows.\n\nMemory leak: you malloc but never free. The memory is lost forever. Leaks accumulate over time; a server with a 1-byte-per-request leak serving 1000 requests/second loses ~86 MB/day. Valgrind's memcheck tool reports leaks with exact line numbers.\n\nDangling pointer: you free memory but continue using the pointer. The pointer still holds the old address, but that memory may now be used by something else. Reading it gives garbage; writing it corrupts another variable. Set pointers to NULL after freeing — dereferencing NULL crashes immediately (good), while dereferencing dangling memory silently corrupts data (bad).\n\nDouble free: calling free() on the same pointer twice. The heap manager tracks free blocks in a linked list; freeing twice corrupts this list, enabling heap exploitation attacks. This is a real security vulnerability.\n\nBuffer overflow: writing past the end of an allocated block. `malloc(10); arr[10] = 5;` writes into memory you do not own. This can corrupt adjacent heap data, overwrite return addresses (stack overflow), or cause crashes. It is the #1 exploited vulnerability in C code.\n\nPrevention checklist: (1) always check malloc return for NULL, (2) always pair malloc with free, (3) set pointers to NULL after free, (4) use size_t for indices and lengths (never signed), (5) always pass array length separately, (6) use AddressSanitizer (-fsanitize=address) during development.\n\nInterview question: \"What is use-after-free?\" It is accessing memory after it has been freed. Modern browsers (Chrome, Firefox) have had critical vulnerabilities from use-after-free in their C++ codebases. Understanding this bug is essential for both systems programming and security.",

        codeExample: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    // 1. Memory leak\n    char *leak = malloc(100);\n    strcpy(leak, "I am leaked");\n    // forgot free(leak) -- memory lost!\n\n    // 2. Dangling pointer\n    int *p = malloc(sizeof(int));\n    *p = 42;\n    free(p);\n    // p is now dangling -- *p is UNDEFINED\n    p = NULL;   // FIX: nullify after free\n\n    // 3. Double free (AVOID THIS)\n    int *q = malloc(sizeof(int));\n    *q = 10;\n    free(q);\n    // free(q);  // ⚠ DOUBLE FREE -- heap corruption!\n    q = NULL;   // FIX: nullify\n\n    // 4. Buffer overflow\n    int *buf = malloc(5 * sizeof(int));\n    for (int i = 0; i < 5; i++) buf[i] = i;\n    // buf[5] = 100;  // ⚠ OVERFLOW -- writes past allocation\n    free(buf);\n\n    // Safe pattern: always check malloc + track size\n    size_t capacity = 10;\n    int *safe_buf = malloc(capacity * sizeof(int));\n    if (!safe_buf) {\n        fprintf(stderr, "Out of memory\\n");\n        return 1;\n    }\n    size_t len = 0;\n    // Grow if needed\n    if (len == capacity) {\n        capacity *= 2;\n        int *tmp = realloc(safe_buf, capacity * sizeof(int));\n        if (!tmp) { free(safe_buf); return 1; }\n        safe_buf = tmp;\n    }\n    safe_buf[len++] = 42;\n\n    free(safe_buf);\n    return 0;\n}`,

        language: "c"

      },

    ],

  },

  {

    slug: "sql-mastery",

    title: "SQL Mastery",

    description: "Write efficient SQL queries from basics to advanced analytics.",

    icon: "🗃️",

    color: "from-blue-500 to-indigo-600",
    category: "Systems",

    lessons: [

      {

        id: "1",

        title: "SELECT & Filtering",

        content: "SQL queries always follow the same structure: SELECT what you want, FROM where it lives, WHERE which rows to keep, and ORDER BY how to sort. The database engine executes in a different order internally — FROM first, then WHERE, then SELECT, then ORDER BY. Understanding this execution order prevents logical errors.\n\nWHERE clauses support comparison operators (=, !=, <, >, <=, >=), logical operators (AND, OR, NOT), and special predicates: LIKE for pattern matching (% matches any string, _ matches one character), BETWEEN for ranges (inclusive on both ends), IN for set membership, and IS NULL / IS NOT NULL for missing values.\n\nCommon mistake: writing `WHERE salary = NULL`. NULL represents missing data, and nothing equals NULL — not even NULL. You must use IS NULL. This is because NULL is not a value; it is the absence of a value. Three-valued logic (TRUE, FALSE, UNKNOWN) governs all NULL comparisons.\n\nDISTINCT eliminates duplicate rows from results. But DISTINCT applies to the entire SELECT list, not individual columns. If you want unique combinations of (department, role), use `SELECT DISTINCT department, role` — not DISTINCT on just one.\n\nInterview tip: LIMIT and OFFSET control result pagination. `LIMIT 10 OFFSET 20` skips 20 rows and returns the next 10. But OFFSET-based pagination degrades for large offsets because the database still scans and discards skipped rows. Keyset pagination (WHERE id > last_seen_id) is faster for large datasets.",

        codeExample: `-- Basic SELECT with filtering\nSELECT \n    employee_id,\n    first_name,\n    last_name,\n    salary,\n    department\nFROM employees\nWHERE department = 'Engineering'\n    AND salary >= 80000\n    AND hire_date BETWEEN '2022-01-01' AND '2024-12-31'\nORDER BY salary DESC\nLIMIT 20;\n\n-- Pattern matching with LIKE\nSELECT * FROM employees\nWHERE last_name LIKE 'Sm%'      -- starts with Sm\n   OR email LIKE '%@gmail.com'; -- Gmail users\n\n-- NULL checks\nSELECT * FROM employees\nWHERE manager_id IS NULL        -- top-level employees\n  AND termination_date IS NULL; -- still active\n\n-- DISTINCT for unique values\nSELECT DISTINCT department, role\nFROM employees\nORDER BY department;\n\n-- Pagination: page 3 (items 21-30)\nSELECT * FROM products\nWHERE category = 'Electronics'\nORDER BY product_id\nLIMIT 10 OFFSET 20;\n\n-- Keyset pagination (faster for large datasets)\nSELECT * FROM products\nWHERE category = 'Electronics'\n    AND product_id > 12345  -- last seen ID\nORDER BY product_id\nLIMIT 10;`,

        language: "javascript"

      },

      {

        id: "2",

        title: "JOINs (INNER, LEFT, RIGHT, FULL)",

        content: "JOINs combine rows from two tables based on a related column. The JOIN type determines which rows appear in the result when there is no match on one side.\n\nINNER JOIN returns only rows with matches in both tables. If a customer has no orders, they disappear from the result. This is the most common join and the default in most queries.\n\nLEFT JOIN (or LEFT OUTER JOIN) returns all rows from the left table and matched rows from the right. When there is no match, right-side columns are NULL. Use this when you need all customers, even those without orders — the order columns will be NULL.\n\nRIGHT JOIN is the mirror: all rows from the right table, matched from the left. You can always rewrite a RIGHT JOIN as a LEFT JOIN by swapping table order, so RIGHT JOIN is rarely used in practice.\n\nFULL OUTER JOIN returns all rows from both tables. Unmatched rows from either side get NULL. This is useful for reconciliation — finding records that exist in one system but not the other.\n\nCROSS JOIN produces the Cartesian product: every row from table A paired with every row from table B. A table with 100 rows CROSS JOINed with 50 rows produces 5,000 rows. Useful for generating combinations (e.g., all product-size-color variants).\n\nCommon mistake: forgetting the ON clause. `FROM A JOIN B` without ON produces a CROSS JOIN, which is usually not what you want. Always specify the join condition.\n\nInterview trap: \"Find customers who placed no orders.\" This is a LEFT JOIN + WHERE right-side IS NULL pattern. People often say \"use NOT EXISTS\" — both work, but LEFT JOIN + IS NULL is often clearer and sometimes faster.",

        codeExample: `-- INNER JOIN: only matching rows\nSELECT c.name, o.order_date, o.total\nFROM customers c\nINNER JOIN orders o ON c.id = o.customer_id\nWHERE o.total > 100;\n\n-- LEFT JOIN: all customers, even without orders\nSELECT c.name, COALESCE(SUM(o.total), 0) AS lifetime_value\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name;\n\n-- Find customers with NO orders\nSELECT c.name\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.id IS NULL;\n\n-- CROSS JOIN: all combinations\nSELECT p.name AS product, s.size\nFROM products p\nCROSS JOIN sizes s;\n\n-- SELF JOIN: find employees and their managers\nSELECT \n    e.name AS employee,\n    m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;\n\n-- JOIN 3 tables\nSELECT \n    o.id AS order_id,\n    c.name AS customer,\n    p.name AS product,\n    oi.quantity\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id\nWHERE o.order_date >= '2024-01-01';`,

        language: "javascript"

      },

      {

        id: "3",

        title: "GROUP BY & Aggregation",

        content: "GROUP BY collapses rows with the same value in the grouped column(s) into single summary rows. Aggregate functions (COUNT, SUM, AVG, MIN, MAX) then operate on each group. The result has one row per group.\n\nRule: every column in SELECT must either be in the GROUP BY clause or wrapped in an aggregate function. `SELECT department, name FROM employees GROUP BY department` is invalid in standard SQL because name varies within each department. You can GROUP BY department, name (both columns) or use an aggregate on name.\n\nHAVING filters after grouping, while WHERE filters before. `WHERE salary > 50000` filters individual rows before grouping. `HAVING COUNT(*) > 5` filters groups after aggregation. You cannot use WHERE to filter on aggregate results — that requires HAVING.\n\nCOUNT(*) counts all rows including NULLs. COUNT(column) counts only non-NULL values. COUNT(DISTINCT column) counts unique non-NULL values. This distinction matters: a table with 10 rows where 3 have NULL department gives COUNT(*) = 10 but COUNT(department) = 7.\n\nGROUP BY with multiple columns creates nested groups: `GROUP BY department, role` groups by unique (department, role) combinations. ROLLUP and CUBE extensions add subtotals: ROLLUP creates hierarchical totals (department total, grand total), while CUBE creates all possible subtotal combinations.\n\nInterview question: \"What is the difference between WHERE and HAVING?\" WHERE filters individual rows before grouping; HAVING filters groups after aggregation. You cannot use aggregate functions in WHERE (except in subqueries). This is the most common SQL interview question.\n\nPractical tip: always alias aggregates for readability: `SELECT department, COUNT(*) AS headcount FROM employees GROUP BY department`. Future you will thank present you.",

        codeExample: `-- Basic aggregation\nSELECT \n    department,\n    COUNT(*) AS headcount,\n    AVG(salary) AS avg_salary,\n    MAX(salary) AS top_salary,\n    MIN(salary) AS min_salary\nFROM employees\nGROUP BY department\nORDER BY headcount DESC;\n\n-- HAVING filters groups\nSELECT \n    department,\n    AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department\nHAVING AVG(salary) > 90000;\n\n-- COUNT(*) vs COUNT(column)\nSELECT \n    COUNT(*) AS total_rows,        -- counts all\n    COUNT(manager_id) AS has_manager -- NULLs excluded\nFROM employees;\n\n-- GROUP BY multiple columns\nSELECT \n    department,\n    role,\n    COUNT(*) AS count,\n    AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department, role\nHAVING COUNT(*) >= 3\nORDER BY department, avg_salary DESC;\n\n-- ROLLUP for subtotals\nSELECT \n    COALESCE(department, 'ALL') AS department,\n    COALESCE(role, 'ALL') AS role,\n    COUNT(*) AS headcount,\n    SUM(salary) AS total_salary\nFROM employees\nGROUP BY ROLLUP (department, role)\nORDER BY department, role;`,

        language: "javascript"

      },

      {

        id: "4",

        title: "Subqueries & CTEs",

        content: "A subquery (nested query) is a SELECT statement inside another query. Subqueries can appear in WHERE, FROM, and SELECT clauses. In WHERE, they filter results: `WHERE salary > (SELECT AVG(salary) FROM employees)`. The inner query runs first, producing a single value or set that the outer query uses.\n\nScalar subqueries return a single value and work anywhere a value is expected. Correlated subqueries reference the outer query and execute once per outer row — they are powerful but slow on large datasets because the database cannot optimize them easily. Always prefer JOINs over correlated subqueries when possible.\n\nEXISTS returns TRUE if the subquery finds any row: `WHERE EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.id)`. EXISTS short-circuits — it stops at the first match, making it faster than IN for large result sets. Use NOT EXISTS to find rows with no matching records.\n\nCTEs (Common Table Expressions), introduced with the WITH keyword, are named temporary result sets that exist for one query. They make complex queries readable by breaking them into logical steps. `WITH regional_sales AS (...), top_regions AS (...) SELECT ... FROM regional_sales JOIN top_regions ...`. Each CTE can reference previous CTEs.\n\nRecursive CTEs use UNION ALL with a base case and recursive step to traverse hierarchical data (org charts, tree structures, graph paths). They are the standard way to query parent-child relationships in relational databases.\n\nInterview question: \"Find the second highest salary.\" Classic approaches: subquery with MAX, LIMIT/OFFSET, or CTE with DENSE_RANK. The CTE approach is most general and handles ties correctly.\n\nPractical tip: use CTEs to make complex queries self-documenting. A query with 5 CTEs reads like a narrative: \"first compute this, then join with that, finally filter.\" Future maintainers will understand your intent.",

        codeExample: `-- Subquery in WHERE\nSELECT name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees)\nORDER BY salary DESC;\n\n-- Correlated subquery: employees earning more than their dept avg\nSELECT name, department, salary\nFROM employees e1\nWHERE salary > (\n    SELECT AVG(salary)\n    FROM employees e2\n    WHERE e2.department = e1.department\n);\n\n-- EXISTS\nSELECT c.name\nFROM customers c\nWHERE EXISTS (\n    SELECT 1 FROM orders o\n    WHERE o.customer_id = c.id\n    AND o.total > 500\n);\n\n-- CTE: step-by-step readable query\nWITH dept_stats AS (\n    SELECT \n        department,\n        COUNT(*) AS headcount,\n        AVG(salary) AS avg_salary\n    FROM employees\n    GROUP BY department\n),\ntop_depts AS (\n    SELECT department\n    FROM dept_stats\n    WHERE headcount > 5\n)\nSELECT e.name, e.department, e.salary\nFROM employees e\nJOIN top_depts t ON e.department = t.department\nWHERE e.salary > 100000;\n\n-- Recursive CTE: org chart\nWITH RECURSIVE org AS (\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees\n    WHERE manager_id IS NULL\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org o ON e.manager_id = o.id\n)\nSELECT * FROM org ORDER BY level, name;`,

        language: "javascript"

      },

      {

        id: "5",

        title: "Indexes & Performance",

        content: "An index is a data structure (usually B-tree) that speeds up data retrieval at the cost of extra storage and slower writes. Without an index, every SELECT with a WHERE clause scans the entire table (full table scan). With an index on the filtered column, the database jumps directly to matching rows.\n\nB-tree indexes work by maintaining a sorted tree of values. Looking up a value is O(log n) instead of O(n). They support equality (=), range (<, >, BETWEEN), and ORDER BY on the indexed column. A composite index on (department, salary) supports queries filtering on department alone or (department, salary) together, but not salary alone — the leftmost prefix rule.\n\nEXPLAIN (or EXPLAIN ANALYZE in PostgreSQL) shows the query plan. Look for sequential scans on large tables — that usually means a missing index. Key fields: rows examined vs rows returned (high ratio = inefficient), type of join (nested loop vs hash vs merge), and whether the index is actually used.\n\nCovering indexes include all columns needed by the query, so the database never touches the table data. `CREATE INDEX idx ON employees(department, salary)` covers `SELECT salary FROM employees WHERE department = 'Eng'` entirely from the index.\n\nWhen NOT to index: small tables (< 1000 rows), columns with low cardinality (boolean, gender), and tables with heavy write load where index maintenance overhead is significant. Every index slows INSERT/UPDATE/DELETE because the index must be updated too.\n\nInterview question: \"When would you use a hash index vs B-tree?\" Hash indexes are faster for exact equality lookups (O(1) vs O(log n)) but cannot do range queries. Most databases default to B-tree because it handles both.\n\nPractical tip: before adding an index, measure with EXPLAIN. After adding it, measure query time before and after. Numbers beat intuition.",

        codeExample: `-- Create indexes\nCREATE INDEX idx_emp_dept ON employees(department);\nCREATE INDEX idx_emp_salary ON employees(salary);\n\n-- Composite index (leftmost prefix rule)\nCREATE INDEX idx_emp_dept_salary ON employees(department, salary);\n-- ✅ This query uses the index:\nSELECT * FROM employees WHERE department = 'Engineering';\n-- ✅ This too:\nSELECT * FROM employees WHERE department = 'Engineering' AND salary > 100000;\n-- ❌ This does NOT (skips leftmost column):\nSELECT * FROM employees WHERE salary > 100000;\n\n-- Covering index: all data in the index\nCREATE INDEX idx_covering ON employees(department, salary, name);\n-- Query is satisfied entirely from index (no table access):\nSELECT name, salary FROM employees WHERE department = 'Engineering';\n\n-- EXPLAIN to check query plan\nEXPLAIN ANALYZE\nSELECT e.name, d.budget\nFROM employees e\nJOIN departments d ON e.department = d.name\nWHERE e.salary > 90000;\n-- Look for: Seq Scan (bad on large tables) vs Index Scan (good)\n\n-- Unique index: enforces no duplicates\nCREATE UNIQUE INDEX idx_unique_email ON users(email);\n\n-- Partial index (PostgreSQL)\nCREATE INDEX idx_active ON employees(salary)\nWHERE termination_date IS NULL;\n-- Index only active employees -- smaller, faster`,

        language: "javascript"

      },

    ],

  },

  {

    slug: "linux-command-line",

    title: "Linux Command Line",

    description: "Navigate, manipulate files, and automate tasks in the Linux terminal.",

    icon: "🐧",

    color: "from-gray-500 to-slate-600",
    category: "Software Dev",

    lessons: [

      {

        id: "1",

        title: "File Operations (ls, cd, pwd, mkdir)",

        content: "The Linux filesystem is a single tree rooted at /, unlike Windows with separate drive letters. Everything — files, directories, devices, processes — is a file in this tree. The pwd command shows your current location (print working directory). cd changes directory: `cd /home/user` goes to an absolute path, `cd ..` goes up one level, `cd ~` goes to your home directory, and `cd -` toggles between the current and previous directory.\n\nls lists directory contents. Key flags: -l (long format with permissions, size, date), -a (show hidden files starting with .), -h (human-readable sizes like 4K, 2M), -t (sort by modification time), -R (recursive listing). The output of ls -l shows file type, permissions, owner, group, size, date, and name.\n\nmkdir creates directories. Use -p to create nested directories in one command: `mkdir -p projects/web/src` creates all three levels. Without -p, it fails if the parent does not exist. rmdir removes empty directories; rm -rf removes directories and their contents recursively (dangerous — no undo).\n\nCommon pattern: `ls -lah` to see everything with human sizes, `tree -L 2` to visualize directory structure (install tree if missing). Tab completion is your best friend — press Tab to auto-complete file and directory names. Double-Tab shows all possibilities.\n\nFile creation shortcuts: touch creates an empty file or updates the timestamp. cp copies files (cp -r for directories). mv moves or renames. rm deletes permanently (no trash can).\n\nInterview/OS tip: understand the Filesystem Hierarchy Standard. /etc has config files, /var has logs and variable data, /tmp has temporary files, /usr has user programs, /home has user directories. Knowing where things live makes you efficient.",

        codeExample: `# Navigate filesystem\npwd                          # /home/user\nls                           # list current directory\nls -lah                      # long format, hidden, human sizes\ncd projects                  # go into projects\ncd ..                        # go up one level\ncd /var/log                  # absolute path\ncd -                         # toggle previous directory\n\n# Create and remove directories\nmkdir myproject\nmkdir -p src/components/utils  # nested creation\nrmdir empty_dir               # only if empty\n\n# Copy, move, rename\ncp file.txt backup.txt\ncp -r src/ src_backup/        # recursive directory copy\nmv old_name.txt new_name.txt  # rename\nmv file.txt /tmp/             # move\n\n# Remove files (CAREFUL!)\nrm temp.txt\ncache/\nrm -rf old_project/           # ⚠ recursive force delete\n\n# View file contents\ncat README.md                 # print entire file\nhead -20 log.txt              # first 20 lines\ntail -20 log.txt              # last 20 lines\ntail -f /var/log/syslog       # follow new lines in real-time\n\n# File info\nfile mystery.dat              # identify file type\nstat file.txt                 # detailed metadata\ndu -sh *                      # disk usage per item`,

        language: "javascript"

      },

      {

        id: "2",

        title: "Text Processing (grep, sed, awk)",

        content: "Linux text processing tools are the Swiss Army knife of data manipulation. They excel at filtering, transforming, and extracting text from files and streams. Master these three and you can handle almost any text task without writing a program.\n\ngrep searches for patterns in text. Basic syntax: `grep 'pattern' file`. Key flags: -i (case-insensitive), -r (recursive search in directories), -n (show line numbers), -v (invert match — show non-matching lines), -c (count matches), -E (extended regex for +, ?, |, ()). The pattern supports regular expressions: `grep -E 'error|warning' log.txt` finds lines containing either word.\n\nsed (stream editor) performs find-and-replace on text streams. The basic form is `sed 's/old/new/g' file` — substitute 'old' with 'new' globally on each line. Use -i to edit files in place. sed can delete lines (`sed '/pattern/d' file`), insert text, and extract specific lines (`sed -n '10,20p' file` prints lines 10-20).\n\nawk is a full text-processing language. It splits each line by whitespace (or a custom delimiter), assigns fields to $1, $2, etc., and executes actions on matching patterns. `awk '{print $1, $3}' file` prints the first and third columns. `awk -F: '{print $1}' /etc/passwd` uses colon as delimiter.\n\nPiping these tools together is the Unix philosophy: `grep 'ERROR' app.log | awk '{print $4}' | sort | uniq -c | sort -rn` — find errors, extract timestamps, count unique, sort by frequency.\n\nInterview tip: know the difference between grep -E and egrep (they are the same), and between sed 's///' and sed -i 's///'. The -i flag modifies the file; without it, output goes to stdout.\n\nPractical example: quickly clean a CSV: `sed 's/,/|/g' data.csv` replaces commas with pipes.",

        codeExample: `# grep: search patterns\ngrep 'error' /var/log/syslog           # basic search\ngrep -i 'warning' app.log              # case-insensitive\ngrep -rn 'TODO' src/                    # recursive with line numbers\ngrep -c '404' access.log                # count matches\ngrep -v 'DEBUG' app.log                 # exclude lines\ngrep -E 'error|panic|fatal' app.log     # extended regex\n\n# sed: stream editor\nsed 's/foo/bar/g' file.txt              # replace foo with bar\nsed -i 's/old/new/g' config.txt         # edit in-place\nsed -n '10,20p' file.txt                # print lines 10-20\nsed '/^#/d' config.txt                  # remove comment lines\necho 'hello world' | sed 's/world/!/'\n\n# awk: column processing\ncat data.csv | awk -F, '{print $1, $3}' # columns 1 and 3\nawk '$3 > 100 {print $1, $3}' sales.txt # filter by column value\nawk '{print NR, $0}' file.txt           # add line numbers\nawk '/pattern/ {count++} END {print count}' log.txt  # count\n\n# Pipes: combine tools\n# Find top 5 error types in a log\ngrep -oE 'Error\\[[A-Z]+\\]' app.log | sort | uniq -c | sort -rn | head -5\n\n# Extract IPs from access logs and count unique\nawk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10`,

        language: "javascript"

      },

      {

        id: "3",

        title: "Permissions & Users",

        content: "Linux is a multi-user system where every file and process belongs to a user and a group. Permissions control who can read (r), write (w), and execute (x) a file. Understanding the permission model is essential for system administration, deployment, and security.\n\nls -l shows permissions as a 10-character string: first char is file type (- for file, d for directory, l for link), followed by three sets of rwx for user (owner), group, and others. `rwxr-xr--` means owner can read/write/execute, group can read/execute, others can read only. Octal notation: r=4, w=2, x=1, so rwx=7, r-x=5, r--=4. `chmod 755 file` sets rwxr-xr-x.\n\nchmod changes permissions: `chmod +x script.sh` adds execute. `chmod 644 file.txt` sets rw-r--r--. Recursive: `chmod -R 755 directory/` applies to all files inside. chown changes ownership: `chown user:group file`. You need root (sudo) to change ownership.\n\nThe sticky bit (chmod +t or 1xxx) on directories like /tmp means only the file owner can delete their own files inside. The setuid bit (4xxx) on executables runs them as the file owner — this is how sudo works. The setgid bit (2xxx) on directories makes new files inherit the directory's group.\n\nCommon scenario: a deploy script fails because the web server user (www-data or nginx) cannot read files owned by the deploy user. Fix: either chown the files to the web server user, or add the user to the file's group and grant group read permission.\n\nInterview question: \"What does chmod 777 do?\" It gives everyone full access — read, write, execute. This is a security anti-pattern. Files should have the minimum permissions needed. Use 644 for files, 755 for directories.\n\nSecurity tip: never use 777 in production. Use named groups to manage access: create a webteam group, add users to it, and set group permissions on shared directories.",

        codeExample: `# View permissions\nls -la /etc/passwd\n# -rw-r--r-- 1 root root 2847 Jan 15 10:30 /etc/passwd\n\n# chmod: change permissions\nchmod 755 script.sh          # rwxr-xr-x\nchmod 644 config.txt         # rw-r--r--\nchmod +x deploy.sh           # add execute\nchmod -R 600 secrets/        # owner read/write only\n\n# Octal reference\n# r=4 w=2 x=1\n# 755 = rwxr-xr-x (dirs)\n# 644 = rw-r--r-- (files)\n# 700 = rwx------ (private dir)\n# 600 = rw------- (private file)\n\n# chown: change ownership\nsudo chown alice:developers app.log\nsudo chown -R www-data:www-data /var/www/html\n\n# Special bits\nchmod +t /tmp              # sticky bit: only owner can delete\nchmod u+s /usr/bin/passwd  # setuid: run as root\nchmod g+s shared/          # setgid: inherit group\n\n# Find files with specific permissions\nfind / -perm -777 -type f 2>/dev/null  # world-writable files\nfind . -perm 755 -type d              # directories with 755\n\n# Safe deployment pattern\nsudo useradd -r -s /bin/false appuser\nsudo chown -R appuser:appuser /opt/app\nsudo chmod -R 750 /opt/app`,

        language: "javascript"

      },

      {

        id: "4",

        title: "Process Management (ps, kill, background jobs)",

        content: "Every running program is a process with a unique Process ID (PID). The ps command lists processes: `ps aux` shows all processes with user, CPU%, MEM%, and command. `ps aux | grep nginx` finds nginx processes. top (or htop) shows real-time process monitoring sorted by CPU or memory usage.\n\nKilling processes: `kill PID` sends SIGTERM (15) — a polite request to terminate. The process can clean up and exit gracefully. `kill -9 PID` sends SIGKILL — an immediate forced kill with no cleanup. Always try SIGTERM first; only use SIGKILL if the process is unresponsive. `killall name` kills all processes with that name.\n\nBackground jobs: append & to run a command in the background: `python server.py &`. The shell returns the PID. Jobs lists background jobs with job numbers. `fg %1` brings job 1 to the foreground. `bg %1` resumes a stopped job in the background. Ctrl+Z suspends the current foreground job; bg then resumes it.\n\nnohup runs a command immune to hangups (survives terminal close): `nohup python server.py &`. Output goes to nohup.out by default. For production processes, use systemd or pm2 instead — they handle auto-restart, logging, and monitoring.\n\nProcess signals: SIGTERM (15) graceful shutdown, SIGKILL (9) force kill, SIGHUP (1) reload config (for servers that support it), SIGSTOP (19) pause, SIGCONT (18) resume.\n\nPractical workflow: start a long-running task, realize you need the terminal, Ctrl+Z to suspend, bg to run in background, disown to detach from the shell. Or just use nohup from the start.\n\nInterview question: \"How do you find what process is using a port?\" `lsof -i :8080` or `ss -tlnp | grep 8080` shows the process using that port. Essential for debugging \"port already in use\" errors.",

        codeExample: `# List processes\nps aux                           # all processes\nps aux | grep node               # find node processes\nps -ef --forest                  # process tree\n\n# Real-time monitoring\ntop                              # live process monitor\nhtop                             # better top (install if needed)\n\n# Kill processes\nkill 1234                        # SIGTERM (graceful)\nkill -9 1234                     # SIGKILL (force)\nkillall node                     # kill all node processes\npkill -f \"python server\"        # kill by pattern\n\n# Background jobs\npython server.py &               # run in background\njobs                             # list background jobs\nfg %1                            # bring job 1 to foreground\nbg %1                            # resume job 1 in background\ndisown %1                        # detach from terminal\n\n# nohup: survive terminal close\nnohup python worker.py &         # output to nohup.out\nnohup python worker.py > out.log 2>&1 &  # custom output\n\n# Check port usage\nlsof -i :8080                   # who uses port 8080\nss -tlnp | grep 8080            # alternative\nnetstat -tlnp | grep 8080       # another alternative\n\n# System resource info\nfree -h                          # memory usage\ndf -h                            # disk usage\nuptime                           # load average`,

        language: "javascript"

      },

      {

        id: "5",

        title: "Shell Scripting Basics",

        content: "Shell scripts combine commands into reusable programs. A script starts with a shebang line: `#!/bin/bash` tells the system which interpreter to use. Without it, the script runs in the current shell, which may have different behavior. Always start with the shebang.\n\nVariables: `NAME=\"Alice\"` (no spaces around =), `echo $NAME` or `echo ${NAME}` to use them. Quoting matters: `\"$NAME\"` preserves spaces, `$NAME` without quotes splits on whitespace. Use double quotes around variables 99% of the time to prevent word splitting.\n\nConditionals: `if [ \"$NAME\" = \"Alice\" ]; then echo hi; fi`. Test commands use brackets: -f checks if file exists, -d checks directory, -z checks empty string, -n checks non-empty. The [[ ]] construct is safer than [ ] — it handles empty variables and pattern matching without quoting.\n\nLoops: `for f in *.txt; do echo $f; done` iterates over files. `while read -r line; do echo $line; done < file.txt` reads a file line by line. `while true; do sleep 1; done` creates an infinite loop.\n\nFunctions: `greet() { echo \"Hello $1\"; }` — $1 is the first argument. Call with `greet Alice`. Functions share the global scope by default; use local for variables: `local x=5`.\n\nError handling: `set -e` exits on any error. `set -u` errors on undefined variables. `set -o pipefail` catches errors in piped commands. Use these at the top of every serious script.\n\nInterview/production tip: use shellcheck (shellcheck.net) to catch common bugs: unquoted variables, missing shebang, deprecated syntax. It catches 80% of shell script bugs statically.",

        codeExample: `#!/bin/bash\nset -euo pipefail  # exit on error, undefined vars, pipe errors\n\n# Variables\nNAME=\"Alice\"\nAGE=30\necho \"Hello $NAME, you are $AGE years old\"\n\n# Conditional\nif [ -f \"/etc/passwd\" ]; then\n    echo \"Password file exists\"\nelif [ -d \"/opt\" ]; then\n    echo \"/opt exists\"\nelse\n    echo \"Neither found\"\nfi\n\n# String comparison\nif [[ \"$NAME\" == \"Alice\" ]]; then\n    echo \"Welcome back, Alice\"\nfi\n\n# For loop\nfor file in *.txt; do\n    echo \"Processing: $file\"\n    wc -l \"$file\"\ndone\n\n# While loop\nCOUNT=0\nwhile [ $COUNT -lt 5 ]; do\n    echo \"Count: $COUNT\"\n    ((COUNT++))\ndone\n\n# Function\ncalculate() {\n    local a=$1\n    local b=$2\n    echo $((a + b))\n}\n\nRESULT=$(calculate 3 4)\necho \"3 + 4 = $RESULT\"\n\n# Read file line by line\nwhile IFS= read -r line; do\n    echo \"Line: $line\"\ndone < data.txt`,

        language: "javascript"

      },

    ],

  },

  {

    slug: "git-version-control",

    title: "Git & Version Control",

    description: "Track changes, collaborate, and manage code history with Git.",

    icon: "🔀",

    color: "from-amber-500 to-orange-600",
    category: "Software Dev",

    lessons: [

      {

        id: "1",

        title: "Init, Add, Commit",

        content: "Git is a distributed version control system that tracks snapshots of your project, not diffs. Every commit captures the entire state of tracked files at that moment. This makes branching, merging, and history inspection fast and reliable.\n\n`git init` creates a .git directory that stores all version history. `git clone` copies an existing repository. `git add file.txt` stages changes — Git only commits what you stage, giving you precise control over each commit. `git commit -m \"description\"` creates a snapshot of staged changes with a message.\n\nThe three-file model: Working Directory (your files), Staging Area (index — what will be committed), Repository (.git — committed history). `git status` shows all three states. `git diff` shows unstaged changes, `git diff --staged` shows staged changes.\n\nCommit messages matter. A good message explains WHY, not WHAT. `\"Fix login validation\"` is better than `\"Update index.js\"` because the code shows what changed. Use imperative mood: \"Add feature\" not \"Added feature\". Keep under 72 characters for the first line.\n\n.gitignore prevents files from being tracked. Essential entries: node_modules/, .env, *.log, dist/, .DS_Store. Create .gitignore before your first commit — removing tracked files later is messy.\n\nCommon mistake: committing too many changes in one commit or committing too often with trivial changes. Aim for logical commits: each commit should be a complete, self-contained change that could be reverted independently.\n\nInterview question: \"What is the difference between git reset and git revert?\" Reset moves HEAD backward (rewrites history), revert creates a new commit that undoes changes (preserves history). On shared branches, always use revert.",

        codeExample: `# Initialize repository\ngit init\n\n# Check status\ngit status\n\n# Stage specific files\ngit add README.md\n\n# Stage all changes\ngit add .\n\n# Commit with message\ngit commit -m \"Initial commit: project setup\"\n\n# See what changed\ngit diff                    # unstaged changes\ngit diff --staged           # staged changes\ngit diff HEAD               # all changes since last commit\n\n# View history\ngit log --oneline           # compact log\ngit log --graph --oneline   # with branch graph\ngit log --stat              # with file changes\n\n# Amend last commit\ngit commit --amend -m \"Better message\"\n\n# Undo working directory changes\ngit checkout -- file.txt    # discard changes\ngit restore file.txt        # modern equivalent\n\n# Unstage a file\ngit reset HEAD file.txt     # keep changes, unstage\ngit restore --staged file.txt  # modern equivalent\n\n# .gitignore example\necho \"node_modules/\" > .gitignore\necho \".env\" >> .gitignore\necho \"*.log\" >> .gitignore\ngit add .gitignore\ngit commit -m \"Add .gitignore\"`,

        language: "javascript"

      },

      {

        id: "2",

        title: "Branching & Merging",

        content: "Branches are lightweight pointers to commits. The default branch is main (or master). Creating a branch copies this pointer — it does not copy the entire codebase. This is why branching in Git is nearly instant.\n\n`git branch feature` creates a new branch. `git checkout feature` (or `git switch feature`) switches to it. All new commits go to the current branch. `git branch -d feature` deletes a merged branch. `git branch -D feature` force-deletes an unmerged branch.\n\nFast-forward merge: when the target branch has no new commits since the source branched off, Git simply moves the pointer forward. `git checkout main; git merge feature` — if main has not moved, the merge is instant with no merge commit.\n\nThree-way merge: when both branches have new commits, Git creates a merge commit with two parents. This preserves the history of both branches. Git automatically resolves non-conflicting changes; conflicting changes require manual resolution.\n\nRebase replays commits from one branch onto another, creating a linear history. `git checkout feature; git rebase main` moves feature's commits to sit on top of main. This avoids merge commits but rewrites history — never rebase shared branches.\n\nBranch strategy: feature branches for new work, develop for integration, main for production. Create feature branches from develop, merge back via pull request. Release branches for version stabilization.\n\nCommon mistake: committing directly to main. Always work on a feature branch — even for small fixes. This protects the main branch and enables code review.\n\nInterview question: \"When would you use merge vs rebase?\" Merge preserves history and is safe for shared branches. Rebase creates clean linear history and is ideal for local feature branches before sharing.",

        codeExample: `# Create and switch to branch\ngit switch -c feature-login    # create + switch\n\n# List branches\ngit branch                     # local branches\ngit branch -r                  # remote branches\ngit branch -a                  # all branches\n\n# Work on feature branch\ngit add .\ngit commit -m \"Add login form\"\ngit commit -m \"Add validation\"\n\n# Merge to main\ngit switch main\ngit merge feature-login        # fast-forward or 3-way merge\n\n# Delete branch after merge\ngit branch -d feature-login\n\n# Rebase: linear history\ngit switch feature-login\ngit rebase main                # replay on top of main\n# resolve any conflicts, then:\ngit push origin feature-login --force-with-lease\n\n# Interactive rebase: clean up commits\ngit rebase -i HEAD~3           # last 3 commits\n# pick   = keep commit\n# squash = combine with previous\n# drop   = remove commit\n\n# Merge conflicts (see next lesson)\ngit merge feature-branch\n# CONFLICT (content): Merge conflict in file.js\ngit status                     # shows conflicted files\n# edit files, then:\ngit add .\ngit commit                     # complete the merge`,

        language: "javascript"

      },

      {

        id: "3",

        title: "Remote Repos & Push/Pull",

        content: "A remote is a version of your repository hosted elsewhere (GitHub, GitLab, Bitbucket). `git remote -v` shows configured remotes. The default remote is origin, set when you clone a repository. You can add multiple remotes for different purposes.\n\n`git push origin main` uploads your local commits to the remote. `git push -u origin feature` pushes and sets upstream tracking — future pushes from that branch need only `git push`. `git push` without arguments pushes the current branch to its upstream.\n\n`git pull` is fetch + merge: it downloads remote changes and merges them into your current branch. `git fetch` downloads changes without merging — inspect them with `git log main..origin/main` before merging. This two-step approach gives you control over when to integrate.\n\n`git clone` copies the entire repository history. `git clone --depth 1 repo` creates a shallow clone with only the latest commit — useful for CI/CD where you do not need full history.\n\nTracking branches: `git branch -vv` shows which remote branch each local branch tracks. When you push, Git updates the remote tracking branch. When you fetch, Git updates remote tracking branches to reflect the remote's current state.\n\nCommon scenario: you pull and get a merge commit that says \"Merge origin/main into main.\" This happens when you committed locally while the remote had new commits. To avoid this, rebase before pushing: `git pull --rebase origin main` replays your local commits on top of remote changes.\n\nSecurity: never hardcode credentials in code. Use SSH keys or credential managers. GitHub's CLI (gh) simplifies authentication.\n\nInterview question: \"What is the difference between git fetch and git pull?\" Fetch downloads changes to remote tracking branches without modifying your working directory. Pull fetches AND merges into your current branch. Fetch is safer for inspection.",

        codeExample: `# Remote management\ngit remote -v                     # list remotes\ngit remote add upstream https://github.com/org/repo.git\ngit remote remove old-origin\n\n# Push\ngit push origin main              # push main\ngit push origin feature-login     # push branch\n\n# First time: set upstream\ngit push -u origin feature-login  # push + track\n# Now just: git push\n\n# Fetch and merge\ngit fetch origin                  # download changes\ngit log main..origin/main         # preview remote changes\ngit merge origin/main             # merge remote changes\n\n# Or: pull with rebase (cleaner)\ngit pull --rebase origin main     # rebase on remote\n\n# Shallow clone (for CI)\ngit clone --depth 1 https://github.com/org/repo.git\ngit clone --depth 50 --single-branch https://github.com/org/repo.git\n\n# See all branches and tracking\ngit branch -vv\n# * feature-login abc1234 [origin/feature-login] Add login\n#   main          def5678 [origin/main] Latest main\n\n# Force push (use carefully)\ngit push --force-with-lease origin feature  # safer than --force\n\n# Pull with autostash (saves uncommitted work)\ngit pull --autostash origin main`,

        language: "javascript"

      },

      {

        id: "4",

        title: "Merge Conflicts & Resolution",

        content: "Merge conflicts occur when Git cannot automatically reconcile changes from two branches. This happens when the same line is modified in both branches, when one branch deletes a file the other modifies, or when both branches add a file with the same name.\n\nWhen a conflict happens, Git marks the conflicting sections with conflict markers: <<<<<<< HEAD (your changes), ======= (separator), >>>>>>> branch-name (their changes). Your job is to manually choose the correct version, remove the markers, and commit the result.\n\nResolution workflow: (1) Open the conflicted file, (2) find all <<<<<<< markers, (3) decide which version to keep (or combine both), (4) remove all conflict markers, (5) git add the resolved files, (6) git commit to complete the merge.\n\nPreventing conflicts: keep feature branches short-lived. The longer a branch lives, the more likely it conflicts with main. Pull main into your feature branch frequently (git pull --rebase origin main) to resolve conflicts incrementally.\n\nMerge vs rebase conflict handling: merge creates a merge commit and may produce multiple conflict points resolved in one commit. Rebase replays commits one by one, so you resolve conflicts per commit — this is often easier because each conflict is smaller.\n\nTools for conflict resolution: VS Code highlights conflicts inline with Accept Current/Accept Incoming buttons. Git mergetool launches a visual diff tool. For simple conflicts, VS Code or vim is fine; for complex ones, a visual tool helps.\n\nCommon mistake: accidentally keeping both versions (left the conflict markers in). Always search for <<<<<<< before committing. Some CI pipelines have a pre-commit check for conflict markers.\n\nInterview question: \"How do you abort a merge in progress?\" `git merge --abort` resets to the state before the merge started. For rebase: `git rebase --abort`.",

        codeExample: `# Start a merge that conflicts\ngit merge feature-new-ui\n# CONFLICT (content): Merge conflict in src/App.js\n# Automatic merge failed; fix conflicts and then commit.\n\n# See conflicted files\ngit status\n# both modified: src/App.js\n\n# Open file and resolve conflicts\n# File shows:\n# <<<<<<< HEAD\n# const theme = 'dark';\n# =======\n# const theme = 'light';\n# >>>>>>> feature-new-ui\n\n# After manual edit, file becomes:\n# const theme = getPreferredTheme();\n\n# Complete the merge\ngit add src/App.js\ngit commit -m \"Merge feature-new-ui, resolve theme conflict\"\n\n# Or abort if too messy\ngit merge --abort\n\n# For rebase conflicts\ngit rebase main\n# CONFLICT in file.js\n# edit file, then:\ngit add file.js\ngit rebase --continue          # or --abort\n\n# See conflict history\ngit log --merge --oneline      # commits involved in merges\ngit diff --name-only --diff-filter=U  # conflicted files\n\n# rerere: remember conflict resolutions\nrerere                         # reuse recorded resolution\ngit config rerere.enabled true # auto-apply past resolutions`,

        language: "javascript"

      },

      {

        id: "5",

        title: "Git Workflow (Feature Branch, PR)",

        content: "The feature branch workflow is the standard for team development. Every change lives on a dedicated branch, gets reviewed via a pull request (PR), and merges into main after approval. This keeps main always deployable.\n\nWorkflow: (1) Create a feature branch from main: `git switch -c feature/user-profile`. (2) Make commits with clear messages. (3) Push the branch: `git push -u origin feature/user-profile`. (4) Open a PR in GitHub/GitLab. (5) Address review comments with additional commits. (6) Merge after approval (squash merge or merge commit).\n\nSquash merge compresses all feature branch commits into one commit on main. This keeps main history clean: each PR is one commit. Use rebase merge for preserving individual commits when they tell a story. Avoid regular merge commits for features — they pollute main history with merge noise.\n\nPR best practices: keep PRs small (under 400 lines), write descriptive titles and descriptions, link to issues, add screenshots for UI changes, request specific reviewers, and ensure CI passes before requesting review.\n\nConventional commits format: `feat: add user profile page`, `fix: resolve login timeout`, `docs: update API reference`, `refactor: extract validation logic`. Tools like commitlint enforce this format and auto-generate changelogs.\n\nBranch naming conventions: feature/user-auth, bugfix/login-error, hotfix/security-patch, chore/update-deps. Include the ticket number: feature/PROJ-123-user-auth.\n\nCode review checklist: does it work? Is it tested? Is it readable? Does it follow conventions? Are there security concerns? Is error handling complete? Review the diff, not just the final state — context matters.\n\nInterview question: \"Describe your Git workflow.\" Feature branch from main, small focused PRs, code review, squash merge, CI/CD pipeline, deploy from main. Mention specific practices: conventional commits, branch naming, PR templates.",

        codeExample: `# Feature branch workflow\ngit switch main\ngit pull origin main\ngit switch -c feature/user-profile\n\n# Make changes and commit\ngit add .\ngit commit -m \"feat: add user profile page\"\ngit commit -m \"feat: add profile editing\"\ngit commit -m \"fix: validate avatar upload size\"\n\n# Push and create PR\ngit push -u origin feature/user-profile\n# Then create PR on GitHub/GitLab\n\n# Address review feedback\ngit add .\ngit commit -m \"fix: address review comments\"\ngit push  # PR updates automatically\n\n# After PR is approved, merge via UI (squash merge)\n\n# Clean up after merge\ngit switch main\ngit pull origin main\ngit branch -d feature/user-profile\n\n# Branch naming examples\n# feature/PROJ-123-user-auth\n# bugfix/fix-login-timeout\n# hotfix/security-patch-v2\n# chore/update-dependencies\n\n# Conventional commits\ngit commit -m \"feat(auth): add OAuth2 support\"\ngit commit -m \"fix(api): handle null response\"\ngit commit -m \"docs(readme): add setup instructions\"\ngit commit -m \"refactor(db): optimize query builder\"\n\n# Stash work-in-progress\ngit stash push -m \"WIP: profile form\"\ngit stash list\ngit stash pop                    # apply and remove`,

        language: "javascript"

      },

    ],

  },

  {

    slug: "html",

    title: "HTML",

    description: "Master HTML from basics to semantic markup, forms, and modern web standards.",

    icon: "📄",

    color: "from-orange-500 to-red-600",

    category: "Software Dev",

    lessons: [

      {

        id: "1",

        title: "What is HTML",

        content: `HTML stands for HyperText Markup Language. It is not a programming language — it is a markup language that tells the browser how to structure content on a web page. Think of it as the skeleton of every website you visit. Without HTML, there is no web page — just raw text with no meaning.\n\nHTML was created by Tim Berners-Lee in 1991. Over the years it evolved through several versions: HTML 2.0 (1995), HTML 3.2 (1997), HTML 4.01 (1999), XHTML (2000), and finally HTML5 (2014). Each version added new features — HTML5 brought semantic elements, audio/video tags, canvas drawing, and form validation that previously required JavaScript.\n\nHow does a browser render HTML? When you visit a webpage, the browser downloads the .html file, parses the markup into a DOM tree (Document Object Model), applies CSS styles to that tree, and executes JavaScript to make it interactive. The three pillars of the web are HTML (structure), CSS (presentation), and JavaScript (behavior). HTML alone gives you unstyled content — CSS makes it beautiful, and JS makes it dynamic.\n\nEvery HTML file uses the .html or .htm extension. The browser reads this file from top to bottom, rendering each element as it encounters it. Common beginner mistake: thinking HTML runs in any special order — it does not. Elements render sequentially, which is why your header appears before your footer. Interview tip: know the difference between HTML and a programming language — HTML cannot perform logic, loops, or calculations. It is purely structural.`,

        codeExample: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is rendered by the browser from HTML.</p>\n</body>\n</html>`,

        language: "html"

      },

      {

        id: "2",

        title: "Your First HTML Page",

        content: `Every HTML page follows a specific structure. The first line is always \`<!DOCTYPE html>\` — this tells the browser to use HTML5 mode. Without it, browsers enter quirks mode and render your page inconsistently across different browsers.\n\nThe \`<html>\` element is the root of the page. Everything else goes inside it. It typically has a \`lang\` attribute set to \"en\" for English, which helps screen readers and search engines understand the page language.\n\nInside \`<html>\`, you have two main sections: \`<head>\` and \`<body>\`. The \`<head>\` contains metadata that the user does not see directly — the page title (shown in the browser tab), character encoding, linked stylesheets, and JavaScript files. The \`<body>\` contains everything visible on the page — headings, paragraphs, images, links, and forms.\n\nThe \`<title>\` element is mandatory. It appears in the browser tab, bookmarks, and search engine results. A missing or empty title is a common mistake that hurts SEO and confuses users who have multiple tabs open.\n\nTo create your first page: open a text editor (VS Code, Notepad, Sublime), type the HTML structure, save the file with a .html extension, and double-click it to open in your browser. That is it — no server, no build step, no compilation. HTML runs directly in the browser.\n\nCommon mistake: saving the file as .txt instead of .html. The browser will not render it as a webpage. Another mistake: forgetting the closing tags. While HTML5 is forgiving about some unclosed tags, always close your elements to avoid rendering bugs.`,

        codeExample: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My First Web Page</title>\n</head>\n<body>\n  <h1>Welcome to My Website</h1>\n  <p>This is my very first HTML page. It works!</p>\n</body>\n</html>`,

        language: "html"

      },

      {

        id: "3",

        title: "HTML Editors & Tools",

        content: `You can write HTML in any text editor — even Notepad. But a proper code editor saves time and catches errors. Visual Studio Code (VS Code) is the most popular choice: it is free, has syntax highlighting for HTML, auto-closes tags, and shows errors in real time.\n\nInstall the Live Server extension in VS Code. It creates a local development server that auto-reloads your page when you save changes. Without it, you must manually refresh the browser after every edit — a small annoyance that slows you down significantly when learning.\n\nBrowser DevTools are essential for debugging HTML. Right-click any element on a webpage and select Inspect. You will see the HTML structure, the CSS applied, and the computed layout. DevTools let you edit HTML live, test changes without modifying files, and measure performance. Chrome, Firefox, and Edge all have excellent DevTools.\n\nOnline editors like CodePen, JSFiddle, and W3Schools Try It let you write HTML in the browser with instant preview. They are great for quick experiments and sharing code snippets, but not for building real projects.\n\nGit is worth learning early. Initialize a repository with \`git init\`, stage files with \`git add .\`, and commit with \`git commit\`. This gives you version history so you can undo mistakes. Many beginners skip this and regret losing their work.\n\nCommon mistake: using a word processor like Microsoft Word to write HTML. Word adds invisible formatting that corrupts your code. Always use a plain text editor or code editor.`,

        codeExample: `<!-- VS Code Live Server: install extension, then right-click HTML file -->\n<!-- Select "Open with Live Server" -->\n\n<!-- DevTools: right-click element > Inspect -->\n<!-- You can edit HTML live in the Elements tab -->\n\n<!-- Git basics for tracking your HTML projects -->\n<!-- Open terminal in your project folder: -->\n<!-- git init -->\n<!-- git add . -->\n<!-- git commit -m "Initial HTML page" -->`,

        language: "html"

      },

      {

        id: "4",

        title: "HTML Elements & Tags",

        content: `An HTML element consists of an opening tag, content, and a closing tag. For example, \`<p>Hello</p>\` — the opening tag is \`<p>\`, the content is \"Hello\", and the closing tag is \`</p>\`. The slash in the closing tag tells the browser this element ends here.\n\nSome elements are self-closing (void elements) and have no content or closing tag. Examples include \`<br>\` (line break), \`<img>\` (image), \`<hr>\` (horizontal rule), and \`<input>\` (form input). In XHTML style, you may see \`<br />\` with a slash, but HTML5 does not require it.\n\nElements can be block-level or inline. Block elements start on a new line and take the full width available — examples include \`<div>\`, \`<p>\`, \`<h1>\` through \`<h6>\`, and \`<section>\`. Inline elements flow within the text without breaking the line — examples include \`<span>\`, \`<a>\`, \`<strong>\`, and \`<em>\`. Understanding this distinction is critical for layout control.\n\nNesting hierarchy matters. Elements can contain other elements, creating a tree structure. Always close elements in the correct order — the most recently opened tag must close first. Incorrect nesting like \`<p><strong>Hello</p></strong>\` causes unpredictable rendering.\n\nThink of HTML as a set of Russian dolls — each element wraps content and can contain smaller elements inside it. The \`<body>\` contains \`<div>\`s, which contain \`<p>\`s, which contain \`<span>\`s.\n\nCommon mistake: overlapping tags. \`<b>Bold <i>and italic</b></i>\` is wrong. The correct order is \`<b>Bold <i>and italic</i></b>\`. The browser tries to fix this, but the result is unpredictable.`,

        codeExample: `<!-- Block elements: start on new line -->\n<div>\n  <h1>Main Heading</h1>\n  <p>This is a paragraph.</p>\n</div>\n\n<!-- Inline elements: flow within text -->\n<p>This is a <strong>bold</strong> and <em>italic</em> sentence.</p>\n\n<!-- Self-closing (void) elements -->\n<img src="photo.jpg" alt="A photo">\n<br>\n<hr>\n\n<!-- Nesting: close inner tags first -->\n<div>\n  <p>\n    <strong>Correct nesting:</strong> close strong before p.\n  </p>\n</div>`,

        language: "html"

      },

      {

        id: "5",

        title: "HTML Attributes",

        content: `Attributes provide additional information about HTML elements. They go inside the opening tag as name-value pairs. The name identifies the attribute, and the value (in quotes) specifies the setting. For example, \`<a href=\"https://google.com\">\` — href is the attribute, and the URL is its value.\n\nThe \`id\` attribute gives an element a unique identifier within the page. Only one element can have a given id. JavaScript uses \`document.getElementById()\` to select it, and CSS uses \`#idName\` to style it. The \`class\` attribute groups elements for styling and scripting — multiple elements can share the same class, and one element can have multiple classes separated by spaces.\n\nThe \`style\` attribute applies inline CSS directly to an element. While convenient for quick tests, inline styles are hard to maintain and override external stylesheets. Use classes instead for production code.\n\nCommon attributes include \`href\` (links), \`src\` (images and scripts), \`alt\` (image descriptions for accessibility), \`title\` (tooltip text), and \`placeholder\` (form input hints).\n\nAttribute values must always be in quotes. Both single and double quotes work, but be consistent — most teams use double quotes. Boolean attributes like \`disabled\`, \`required\`, \`readonly\`, and \`checked\` do not need a value. Writing \`<input disabled>\` or \`<input disabled=\"disabled\">\` are both valid.\n\nCommon mistake: forgetting quotes around attribute values. \`<input type=text>\` might work in some browsers, but \`<input type=\"text\">\` is the correct syntax. Another mistake: using spaces in class names — CSS selectors cannot handle them. Use hyphens or underscores instead.`,

        codeExample: `<!-- id: unique identifier -->\n<div id="main-content">Only one element can have this id.</div>\n\n<!-- class: shared group -->\n<p class="intro highlight">This paragraph has two classes.</p>\n<p class="intro">This paragraph has one class.</p>\n\n<!-- href: link destination -->\n<a href="https://google.com" target="_blank">Visit Google</a>\n\n<!-- src and alt: image with fallback text -->\n<img src="photo.jpg" alt="A sunset over the mountains" width="300">\n\n<!-- Boolean attributes -->\n<input type="text" required disabled>\n<button disabled>Click Me</button>\n\n<!-- style: inline CSS (avoid in production) -->\n<p style="color: red; font-size: 18px;">Red text</p>`,

        language: "html"

      },

      {

        id: "6",

        title: "HTML Headings",

        content: `HTML provides six levels of headings: \`<h1>\` through \`<h6>\`. The \`<h1>\` is the most important and largest, while \`<h6>\` is the least important and smallest. Headings create a document outline that helps both users and search engines understand your content hierarchy.\n\nSEO (Search Engine Optimization) relies heavily on proper heading structure. Search engines use headings to understand what your page is about. The \`<h1>\` should describe the main topic of the page — it is like the title of a book. Use \`<h2>\` for major sections, \`<h3>\` for subsections within those, and so on. Never skip heading levels — jumping from \`<h1>\` to \`<h4>\` confuses screen readers and search engines.\n\nThe golden rule: one \`<h1>\` per page. This is the most common heading mistake students make. Having multiple \`<h1>\` elements dilutes the page's main topic. Some older advice allowed multiple \`<h1>\` tags, but Google and accessibility standards now strongly recommend exactly one.\n\nHeadings are not just for styling. Do not use \`<h1>\` because you want large text — use CSS for that. Headings define structure and meaning. If you want large text without semantic importance, use a \`<span>\` with a CSS class.\n\nInterview question: \"What is the difference between \`<h1>\` and \`<b>\`?\" Answer: \`<h1>\` is semantic — it tells the browser and screen reader this is the main heading. \`<b>\` is presentational — it only makes text bold with no semantic meaning. Always prefer semantic elements.\n\nCommon mistake: using headings purely for visual styling. A heading that says \"Click here\" tells search engines nothing about your content. Write descriptive headings that summarize the section.`,

        codeExample: `<!-- Correct heading hierarchy -->\n<h1>Complete Guide to HTML</h1>\n\n<h2>Introduction</h2>\n  <h3>What is HTML?</h3>\n  <h3>History of HTML</h3>\n\n<h2>Elements and Tags</h2>\n  <h3>Block vs Inline</h3>\n    <h4>Block Elements</h4>\n    <h4>Inline Elements</h4>\n  <h3>Self-closing Tags</h3>\n\n<h2>Forms and Inputs</h2>\n  <h3>Text Inputs</h3>\n  <h3>Checkboxes and Radios</h3>\n\n<!-- WRONG: don't skip levels or use multiple h1 -->\n<!-- <h1>Title</h1> -->\n<!-- <h4>Skipped h2 and h3!</h4> -->\n\n<!-- WRONG: using headings for styling only -->\n<!-- <h1 style="font-size: 14px;">Small heading</h1> -->\n<!-- Use CSS instead: <p class="large">Large text</p> -->`,

        language: "html"

      },

      {

        id: "7",

        title: "HTML Paragraphs",

        content: `The \`<p>\` element defines a paragraph of text. Browsers automatically add spacing before and after paragraphs, which is why they are the most common way to display text blocks. Every piece of body text should be wrapped in a \`<p>\` tag — never just floating bare text inside the body.\n\nThe \`<br>\` element creates a line break within text. It is a self-closing tag with no closing counterpart. Use it sparingly — in poetry, addresses, or when you specifically need a line break without starting a new paragraph. Overusing \`<br>\` is a sign that you should be using separate \`<p>\` elements instead.\n\nThe \`<hr>\` element creates a horizontal rule — a thematic break between sections. Visually it appears as a horizontal line. Semantic HTML5 uses it to separate content sections, not just as a decorative line. Do not use \`<hr>\` purely for visual styling — use CSS borders instead.\n\nThe \`<pre>\` element displays preformatted text. It preserves both spaces and line breaks exactly as written in the HTML source. This is useful for displaying code, ASCII art, or any content where whitespace matters. Text inside \`<pre>\` renders in a monospace font by default.\n\nCommon mistake: using multiple \`<br>\` tags for spacing. \`<p>First</p><br><br><br><p>Second</p>\` is wrong — use CSS margin on the \`<p>\` elements instead. Another mistake: putting block elements inside \`<p>\` tags. A \`<div>\` inside a \`<p>\` is invalid HTML.\n\nInterview tip: understand the CSS box model — paragraphs have default margin that creates the visual spacing. Removing default margins with a CSS reset is a common first step in styling.`,

        codeExample: `<!-- Paragraphs -->\n<p>This is the first paragraph. Browsers add spacing around it automatically.</p>\n<p>This is the second paragraph. Each paragraph starts on a new line.</p>\n\n<!-- Line break within a paragraph -->\n<p>Ram Janaki Mandir<br>Mithila, Nepal<br>Nepal 44600</p>\n\n<!-- Horizontal rule as section divider -->\n<h2>Section One</h2>\n<p>Content of section one.</p>\n<hr>\n<h2>Section Two</h2>\n<p>Content of section two.</p>\n\n<!-- Preformatted text: preserves spacing and line breaks -->\n<pre>\n  function greet(name) {\n    console.log("Hello, " + name);\n  }\n\n  greet("World");\n</pre>`,

        language: "html"

      },

      {

        id: "8",

        title: "HTML Comments",

        content: `HTML comments start with \`<!--\` and end with \`-->\`. Everything between these markers is ignored by the browser. Comments are invisible to users but visible to anyone who views the page source. They are your documentation tool in HTML.\n\nUse comments to explain why something is done a certain way, not what the code does. Writing \`<!-- This is a heading -->\` above an \`<h1>\` tag adds no value — the code is self-explanatory. But writing \`<!-- SEO: heading kept short for mobile search snippets -->\` explains the reasoning.\n\nComments are also useful for temporarily disabling code during debugging. Instead of deleting a section and potentially losing it, wrap it in comments. This is faster than undoing changes and preserves your work. Remove commented-out code before committing to version control — it clutters the codebase.\n\nA common pattern is commenting out sections during development: \`<!-- <div class="debug">Debug info here</div> -->\`. When you are done debugging, either uncomment or delete the section entirely. Do not leave commented-out debug code in production.\n\nComments cannot be nested. Writing \`<!-- outer <!-- inner --> -->\` will break because the first \`-->\` closes the comment, leaving the rest as visible text. If you need to comment out a section that already contains comments, you will have to remove the inner comments first.\n\nCommon mistake: leaving comments that are no longer accurate. If you change the code and forget to update the comment, it becomes misleading. An outdated comment is worse than no comment — it actively misleads future developers.\n\nInterview tip: code reviewers look for meaningful comments that explain business logic or non-obvious decisions. Comment noise is a red flag that shows you do not understand your own code well enough.`,

        codeExample: `<!-- This is a comment - invisible to users -->\n\n<!--\n  Multi-line comments work too.\n  Useful for explaining complex sections.\n-->\n\n<h1>Welcome</h1>\n\n<!-- TODO: Add navigation menu here -->\n<!-- <nav>\n  <a href="/home">Home</a>\n  <a href="/about">About</a>\n</nav> -->\n\n<p>This paragraph is visible.</p>\n\n<!-- WARNING: Do not remove - referenced by analytics script -->\n<div id="tracking-pixel" style="display:none;"></div>\n\n<!-- Common mistake: nested comments DON'T work -->\n<!-- outer <!-- inner --> BROKEN --><!-- this text is visible! -->`,

        language: "html"

      },

      {

        id: "9",

        title: "Bold & Italic Text",

        content: `HTML provides two pairs of tags for emphasis: \`<strong>\` and \`<b>\` for bold, \`<em>\` and \`<i>\` for italic. The difference between them is semantic versus visual — and this distinction is critical for accessibility.\n\n\`<strong>\` indicates strong importance, seriousness, or urgency. Screen readers announce it with emphasis (usually a voice change). \`<b>\` is purely visual — it makes text bold but carries no semantic meaning. Search engines give slightly more weight to \`<strong>\` content because it signals importance.\n\n\`<em>\` indicates stress emphasis — text that changes the meaning of a sentence when stressed. For example, \"I *never* said he stole the money\" — the emphasis changes which word is stressed. \`<i>\` is purely visual and has no semantic meaning. It is used for technical terms, foreign words, or ship names in nautical contexts.\n\nRule of thumb: use \`<strong>\` when you want to convey importance, use \`<b>\` only when bold is the visual intent with no importance implied. Use \`<em>\` for emphasis that changes meaning, use \`<i>\` for taxonomic names, technical terms, or foreign phrases.\n\nIn practice, \`<strong>\` and \`<em>\` cover 95% of use cases. Modern HTML best practice says: if you are unsure, use the semantic version (\`<strong>\` over \`<b>\`, \`<em>\` over \`<i>\`). The semantic tags are never wrong, while the visual tags might be.\n\nCommon mistake: nesting \`<strong>\` inside \`<em>\` or vice versa for extra emphasis. This is valid HTML but adds no extra emphasis — screen readers do not double-emphasize. Use CSS for custom emphasis styling instead.\n\nInterview tip: \"What is the difference between \`<strong>\` and \`<b>\`?\" This is a classic accessibility question. The answer is semantics — \`<strong>\` means important, \`<b>\` means visually bold.`,

        codeExample: `<!-- Semantic: conveys meaning -->\n<p><strong>Warning:</strong> This action cannot be undone.</p>\n<p>Please <em>read</em> the terms carefully.</p>\n\n<!-- Visual only: no semantic meaning -->\n<p>The <b>CEO</b> announced the results.</p>\n<p>The species <i>Homo sapiens</i> originated in Africa.</p>\n\n<!-- Practical examples -->\n<p>The <strong>total cost</strong> is <strong>$499</strong>.</p>\n<p>He <em>never</em> said he would help.</p>\n<p>The <i>RMS Titanic</i> sank in 1912.</p>\n\n<!-- WRONG: using b/i for emphasis -->\n<!-- <p>This is <b>important</b>.</p> -->\n<!-- Use <strong> instead for semantic importance -->`,

        language: "html"

      },

      {

        id: "10",

        title: "Deleted & Inserted Text",

        content: `The \`<del>\` element marks text that has been deleted from a document, and \`<ins>\` marks text that has been inserted. Together they form a revision system — showing what changed and when. This is invaluable for showing price updates, editing drafts, or tracking document changes.\n\nWhen you display a product price change, \`<del>$49.99</del> <ins>$39.99</ins>\` shows the old price with a strikethrough and the new price underlined. Browsers style \`<del>\` with a line-through and \`<ins>\` with an underline by default, but you can override this with CSS.\n\nBoth elements accept \`cite\` and \`datetime\` attributes. The \`cite\` attribute points to a URL explaining the change, and \`datetime\` records when the change happened in ISO format. These attributes are not displayed but are useful for machine-readable metadata.\n\nUse cases beyond e-commerce: legal documents showing amendments, collaborative writing showing edits, changelogs displaying version differences, and TODO lists crossing off completed items.\n\nCommon mistake: using \`<del>\` and \`<ins>\` purely for visual styling. If you want strikethrough text for decorative purposes (like a price that was never actually $49.99), use CSS \`text-decoration: line-through\` on a \`<span>\` instead. \`<del>\` and \`<ins>\` carry semantic meaning about document revision.\n\nInterview tip: understand that HTML5 added many semantic elements like these because search engines and assistive technologies need to understand content meaning, not just visual appearance.\n\nAnother practical use: showing corrections in educational content. Display the common mistake with \`<del>\` and the correct answer with \`<ins>\`.`,

        codeExample: `<!-- Price change example -->\n<p>\n  Original price: <del cite="/pricing-update" datetime="2024-01-15">$49.99</del>\n  <ins cite="/pricing-update" datetime="2024-01-15">$39.99</ins>\n  Save 20% today!\n</p>\n\n<!-- Document revision -->\n<p>\n  The meeting is on <del datetime="2024-03-10">Monday</del>\n  <ins datetime="2024-03-11">Tuesday</ins> at 3 PM.\n</p>\n\n<!-- Editorial correction -->\n<p>\n  The capital of Australia is\n  <del>Sydney</del>\n  <ins>Canberra</ins>.\n</p>\n\n<!-- Custom styling with CSS -->\n<style>\n  del { color: #999; text-decoration: line-through; }\n  ins { color: #d32; text-decoration: none; background: #ffe0e0; }\n</style>`,

        language: "html"

      },

      {

        id: "11",

        title: "Subscript & Superscript",

        content: `The \`<sub>\` element defines subscript text — characters displayed below the baseline and in a smaller font. It is essential for chemical formulas like H₂O (written as \`<sub>H2O</sub>\`) and mathematical expressions like log base 10 (log₁₀).\n\nThe \`<sup>\` element defines superscript text — characters displayed above the baseline in a smaller font. Use it for exponents like x² (\`<sup>2</sup>\`), footnotes like reference markers [1], and ordinal numbers like 1st and 2nd.\n\nThe \`<mark>\` element highlights text with a yellow background by default. It draws attention to specific content, like search result keywords or important passages. Screen readers may announce highlighted text differently, so use it sparingly and purposefully.\n\nThese elements are inline, meaning they flow within text without breaking the line. You can nest them — for example, H₂O uses \`<sub>\` inside a paragraph, and mathematical notation like x²⁺¹ combines \`<sup>\` elements.\n\nPractical applications: chemistry courses displaying molecular formulas (CO₂, NaCl), math tutorials showing equations (a² + b² = c²), footnotes and citations, and scientific papers with units (kg·m/s²).\n\nCommon mistake: using \`<sup>\` for footnote markers without linking them. The number [1] should be a link to the footnote at the bottom of the page. Simply styling a number as superscript does not make it a proper footnote.\n\nAnother mistake: using subscript/superscript for decorative purposes. If you want small text that is not semantically subscript, use CSS \`font-size\` and \`vertical-align\` on a \`<span>\` instead.\n\nInterview tip: these elements matter for accessibility. Screen readers announce subscript and superscript differently, helping visually impaired users understand chemical formulas and mathematical expressions.`,

        codeExample: `<!-- Chemical formulas with subscript -->\n<p>Water is <strong>H<sub>2</sub>O</strong>.</p>\n<p>Carbon dioxide: <strong>CO<sub>2</sub></strong></p>\n<p>Sulfuric acid: <strong>H<sub>2</sub>SO<sub>4</sub></strong></p>\n\n<!-- Exponents with superscript -->\n<p>If a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>, it is a right triangle.</p>\n<p>Einstein: E = mc<sup>2</sup></p>\n\n<!-- Footnotes -->\n<p>This study was conducted in 2024<sup><a href="#fn1">[1]</a></sup>.</p>\n\n<!-- Mark for highlighting -->\n<p>Search results for \"HTML\":</p>\n<p>Learn <mark>HTML</mark> basics and build your first <mark>HTML</mark> page.</p>\n\n<!-- Combined: chemical equation -->\n<p>2H<sub>2</sub> + O<sub>2</sub> → 2H<sub>2</sub>O</p>`,

        language: "html"

      },

      {

        id: "12",

        title: "Abbreviations & Citations",

        content: `The \`<abbr>\` element marks an abbreviation or acronym. Adding a \`title\` attribute provides the full expansion — when users hover over the abbreviation, they see the complete term. This improves accessibility because screen readers can announce the full form.\n\nThe \`<cite>\` element marks the title of a creative work — a book, song, film, or painting. It does not mark who created the work, only the title itself. Browsers typically render \`<cite>\` in italics by default. \"As stated in <cite>The Great Gatsby</cite>...\" is correct usage.\n\nThe \`<q>\` element marks inline quotations. It automatically adds quotation marks around the text. For block-level quotations, use \`<blockquote>\`, which browsers typically indent. Both elements can use the \`cite\` attribute to reference the source URL.\n\n\`<blockquote>\` is for extended quotations that form their own paragraph. It should contain the quoted content and optionally a \`<cite>\` element and a \`<footer>\` with attribution. Browsers indent blockquotes by default, but you should style them with CSS for visual distinction.\n\nCommon mistake: using \`<cite>\` for the author instead of the work title. \"Written by J.K. Rowling\" is not a cite — \"Harry Potter\" is. Another mistake: using \`<q>\` for emphasis. Quotation marks are for actual quotations, not for highlighting words.\n\nUsing semantic elements for citations and abbreviations helps search engines understand your content better and makes your pages more accessible. It also ensures consistent rendering across browsers.\n\nInterview tip: know the difference between \`<q>\` (inline) and \`<blockquote>\` (block). Both serve different purposes and should not be interchanged.`,

        codeExample: `<!-- Abbreviations -->\n<p>\n  The <abbr title=\"HyperText Markup Language\">HTML</abbr> specification\n  is maintained by the <abbr title=\"World Wide Web Consortium\">W3C</abbr>.\n</p>\n\n<!-- Citations: titles of works -->\n<p>As George Orwell wrote in <cite>1984</cite>:</p>\n<p>My favorite book is <cite>The Pragmatic Programmer</cite>.</p>\n\n<!-- Inline quotations -->\n<p>She said, <q>The meeting is at 3 PM.</q></p>\n\n<!-- Block quotations -->\n<blockquote cite=\"https://example.com/source\">\n  <p>HTML is the backbone of every web page on the internet.</p>\n  <footer>— <cite>MDN Web Docs</cite></footer>\n</blockquote>\n\n<!-- Nested blockquote -->\n<blockquote>\n  <p>Web development is fun.</p>\n  <blockquote>\n    <p>Especially CSS centering.</p>\n  </blockquote>\n</blockquote>`,

        language: "html"

      },

      {

        id: "13",

        title: "Code & Keyboard",

        content: `The \`<code>\` element represents a fragment of computer code. Browsers render it in a monospace font by default. It is used for inline code references like function names, variables, or commands. For example: \"Use the \`<code>console.log()</code>\` function to debug.\"\n\nFor multi-line code blocks, combine \`<pre>\` with \`<code>\`. The \`<pre>\` preserves formatting (spaces and line breaks), while \`<code>\` provides the semantic meaning of \"this is code.\" This combination is what every code documentation site uses for displaying code snippets.\n\nThe \`<kbd>\` element represents keyboard input — text the user types on a keyboard. It visually distinguishes user actions from code output. Browsers typically render it with a border or background to look like a physical key. Use it for instructions like \"Press \`<kbd>Ctrl</kbd>\` + \`<kbd>C</kbd>\` to copy.\"\n\nThe \`<samp>\` element represents sample output from a computer program. It shows what the program produces, distinguishing it from the code that generates it. For example: \"Running the program produces \`<samp>Hello, World!</samp>\`\".\n\nThe \`<var>\` element represents a mathematical variable or a programming variable. It distinguishes variable names from surrounding text. In math: \"If \`<var>x</var>\` = 5, then \`<var>x</var>\`² = 25\". In programming documentation: \"The \`<var>response</var>\` object contains the API result.\"\n\nCommon mistake: using \`<code>\` for everything code-related. A keyboard shortcut is \`<kbd>\`, not \`<code>\`. Sample output is \`<samp>\`, not \`<code>\`. Each element has a specific semantic purpose.\n\nInterview tip: \"What is the difference between \`<code>\` and \`<kbd>\`?\" Answer: \`<code>\` is for code that a developer wrote, \`<kbd>\` is for input that a user types. This distinction matters for accessibility — screen readers announce them differently.`,

        codeExample: `<!-- Inline code -->\n<p>Use the <code>Array.map()</code> function to transform arrays.</p>\n\n<!-- Multi-line code block -->\n<pre><code>function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("World"));</code></pre>\n\n<!-- Keyboard input -->\n<p>To copy text, press <kbd>Ctrl</kbd> + <kbd>C</kbd>.</p>\n<p>To save a file, press <kbd>Ctrl</kbd> + <kbd>S</kbd>.</p>\n<p>On Mac, use <kbd>Cmd</kbd> + <kbd>S</kbd> instead.</p>\n\n<!-- Sample output -->\n<p>Running the program produces: <samp>Hello, World!</samp></p>\n<p>Error message: <samp>File not found: index.html</samp></p>\n\n<!-- Variables -->\n<p>Let <var>x</var> = 5 and <var>y</var> = 10.</p>\n<p>Then <var>x</var> + <var>y</var> = 15.</p>\n\n<!-- Combined example: code with output -->\n<pre><code>const x = 5;\nconst y = 10;\nconsole.log(x + y);</code></pre>\n<p>Output: <samp>15</samp></p>`,

        language: "html"

      },
      {

        id: "14",
        title: "HTML Entities & Special Characters",
        content: "HTML entities are special codes that represent characters reserved in HTML or characters not available on a standard keyboard. They begin with & and end with ;. The most common scenario: you want to display a less-than sign (<) but the browser interprets it as the start of a tag. That is where entities save you.\n\nCritical entities every developer must memorize: &lt; for <, &gt; for >, &amp; for &, &quot; for double quote, and &nbsp; for non-breaking space. These five cover 90% of entity needs. The non-breaking space is useful when you want two words to stay on the same line — \"10 km\" will never break between the number and unit.\n\nNamed entities exist for common symbols: &copy; (©), &reg; (®), &trade; (™), &euro; (€), &pound; (£), &yen; (¥). There are hundreds of named entities covering arrows, math symbols, and international characters.\n\nFor characters not available as named entities, use numeric references. &#8364; is the euro sign (same as &euro;). Unicode code points work too — &#x1F600; is the grinning face emoji (😀). Decimal and hexadecimal formats both work.\n\nCommon mistake: using & without escaping it. In a URL parameter or query string, the ampersand separates parameters: ?q=hello&lang=en. In HTML text, always write &amp; instead of bare & or the parser gets confused.\n\nInterview tip: \"How do you display HTML tags as text on a page?\" Use &lt;h1&gt; to show <h1> as visible text. This is essential for code documentation sites.",
        codeExample: "<!-- Common entities -->\n<p>Use &amp;lt; to display &lt;h1&gt; as text.</p>\n<p>Copyright &amp;copy; 2024 My Company</p>\n<p>Price: &amp;euro;50 &amp;pound;40 &amp;yen;5000</p>\n<p>Trade Mark: &amp;trade; Registered: &amp;reg;</p>\n\n<!-- Non-breaking space prevents line break -->\n<p>10&nbsp;km &mdash; This stays on one line</p>\n<p>Section&nbsp;5 &mdash; Never breaks between words</p>\n\n<!-- Numeric references -->\n<p>Euro sign (decimal): &#8364;</p>\n<p>Euro sign (hex): &#x20AC;</p>\n<p>Greek alpha: &#913; &#x391;</p>\n<p>Smiley emoji: &#x1F600;</p>\n\n<!-- Combined example -->\n<p>&amp;lt;div&amp;gt; means &lt;div&gt; in HTML</p>\n<p>&amp;nbsp; creates a&nbsp;non-breaking&nbsp;space.</p>\n<p>&amp;quot;Hello&amp;quot; renders as &quot;Hello&quot;</p>",
        language: "html"
      },

      {
        id: "15",
        title: "Block vs Inline Elements",
        content: "HTML elements fall into two fundamental categories: block-level and inline. This distinction controls how elements behave in the document flow — their default width, line behavior, and permitted nesting.\n\nBlock-level elements start on a new line and take up the full width available. They create a \"block\" in the page layout. Examples: <div>, <p>, <h1>-<h6>, <ul>, <ol>, <li>, <table>, <form>, <header>, <footer>, <section>, <article>. Block elements stack vertically like building blocks.\n\nInline elements do not start a new line and only take up as much width as necessary. They flow within text like words in a sentence. Examples: <span>, <a>, <strong>, <em>, <img>, <code>, <input>, <label>, <button>. Inline elements sit next to each other horizontally.\n\nCritical rule: inline elements can be nested inside block elements, but block elements should not be nested inside inline elements (with limited exceptions in HTML5). Specifically, you cannot put a <div> inside an <a> in HTML4, but HTML5 allows it if the <a> wraps phrasing content.\n\nThe CSS display property can override default behavior: display: block makes an inline element behave like a block, display: inline makes a block element behave like inline, and display: inline-block gives the best of both — inline flow with block-level box properties.\n\nCommon mistake: wrapping block elements inside an <a> tag in older code. HTML5 allows it, but ensure the anchor does not wrap other interactive elements. Another mistake: expecting inline elements to respect width and height properties — they do not by default unless you set display: inline-block.\n\nInterview tip: \"Difference between block and inline?\" State three differences: (1) line behavior — block starts new line, inline does not, (2) width — block fills parent, inline shrinks to content, (3) box model — block respects all box properties, inline ignores width/height.",
        codeExample: "<!-- Block elements: each starts on new line, full width -->\n<div style=\"background: #eee;\">\n  This div is a block element.\n  <p>This paragraph is also a block element.</p>\n  <h3>Headings are blocks too</h3>\n</div>\n\n<!-- Inline elements: flow within text -->\n<p>This is a <strong>strong</strong> word inside a paragraph.\nAn <a href=\"#\">anchor</a> is inline. <span style=\"color:red\">Span</span> is inline.</p>\n\n<!-- Block inside inline: INVALID in HTML4, allowed in HTML5 -->\n<a href=\"#\">\n  <div>This div inside anchor is HTML5 valid</div>\n</a>\n\n<!-- display: inline-block -- best of both worlds -->\n<div style=\"display: inline-block; width: 100px; height: 50px; background: #ddd;\">\n  Inline-block boxes sit side by side\n</div>\n<div style=\"display: inline-block; width: 100px; height: 50px; background: #ccc;\">\n  but respect width and height\n</div>",
        language: "html"
      },

      {
        id: "16",
        title: "HTML Div & Span Containers",
        content: "The <div> and <span> elements are generic containers with no semantic meaning — they are pure hooks for styling and scripting. They are the most commonly used HTML elements because they allow grouping and targeting without adding semantics.\n\n<div> is a block-level container that groups larger sections of content. It is the go-to element for layout: a page header div, a sidebar div, a content wrapper div. Before semantic HTML5, every layout was built from nested divs before HTML5 introduced semantic elements like <header>, <nav>, <main>, and <footer>.\n\n<span> is an inline container that groups text or inline elements. It does not change the appearance by itself — you must apply CSS or attach JavaScript to affect it. Spans are ideal for: coloring parts of text, applying specific fonts, hiding/showing inline content, or wrapping substrings for event handling.\n\nBoth div and span are meaningless without attributes. The class attribute groups elements for CSS and JavaScript targeting. The id attribute provides a unique identifier for a single element. The style attribute applies inline CSS.\n\nModern best practice: use semantic HTML5 elements where possible, but divs remain essential for wrappers, grids, and containers where no semantic element fits. Never use a div when a semantic element exists — but also never force a semantic element where a simple container is more appropriate.\n\nCommon mistake: divitis — wrapping everything in unnecessary divs. Before semantic HTML5, pages were soup of nested div elements. Today, many divs can be replaced with semantic elements. But do not overcorrect — a <div class=\"grid\"> is perfectly appropriate.\n\nInterview tip: \"When to use div vs span?\" Answer: div for layout blocks and sections, span for inline text hooks. \"What about semantic elements?\" Use those instead of div when the content has meaning — header, nav, main, article, section, aside, footer.",
        codeExample: "<!-- Div: block-level container for layout -->\n<div class=\"header\">\n  <h1>My Website</h1>\n  <p>Welcome to my site</p>\n</div>\n\n<div class=\"content\">\n  <p>Main content area.</p>\n</div>\n\n<div class=\"footer\">\n  <p>&amp;copy; 2024 My Website</p>\n</div>\n\n<!-- Span: inline container for text styling -->\n<p>This text has <span style=\"color: red;\">red</span> and\n<span style=\"color: blue;\">blue</span> words.</p>\n\n<p>Product: <span class=\"price\">$49.99</span>\n<span class=\"status available\">In Stock</span></p>\n\n<!-- Divs for grid layouts -->\n<div class=\"grid\">\n  <div class=\"card\">Card 1</div>\n  <div class=\"card\">Card 2</div>\n  <div class=\"card\">Card 3</div>\n</div>\n\n<!-- Semantic alternative (preferred when applicable) -->\n<header>\n  <h1>Site Title</h1>\n</header>\n<main>\n  <p>Main content</p>\n</main>\n<footer>\n  <p>Footer</p>\n</footer>",
        language: "html"
      },

      {
        id: "17",
        title: "HTML Links - Anchor Tags",
        content: "The <a> element (anchor) is how the web links pages together. Without links, the web would be isolated documents. The href attribute defines the destination URL — it is the only required attribute for a functional link.\n\nAbsolute URLs specify the full web address: href=\"https://example.com/page\". Use these when linking to external websites. Relative URLs specify a path relative to the current page: href=\"/about\" (site root relative) or href=\"page.html\" (document relative). Relative URLs keep your site portable — they work on localhost, staging, and production without changes.\n\nLink text should be descriptive and meaningful out of context. \"Click here\" is bad — screen readers navigate by link text. \"Read our pricing guide\" is good. Never use raw URLs as link text; they are hard to read and screen readers pronounce them character by character.\n\nThe mailto: scheme creates a link that opens the default email client: href=\"mailto:info@example.com\". The tel: scheme opens the dialer on mobile devices: href=\"tel:+15551234567\". These are protocol-based links that trigger system actions.\n\nThe download attribute makes the browser download the linked file instead of navigating to it: href=\"file.pdf\" download. Optionally, set a custom filename: download=\"guide.pdf\".\n\nCommon mistake: empty href — href=\"\" links to the current page, which causes a page reload. Use href=\"#\" for placeholder links (scrolls to top) or href=\"javascript:void(0)\" to prevent navigation.\n\nInterview tip: \"Absolute vs relative URLs?\" Relative URLs are shorter, portable across environments, and do not break when the domain changes. Use absolute only for external resources.",
        codeExample: "<!-- Absolute URL - link to external site -->\n<a href=\"https://www.google.com\">Visit Google</a>\n\n<!-- Relative URL - link within your site -->\n<a href=\"/about\">About Us</a>\n<a href=\"contact.html\">Contact</a>\n<a href=\"../index.html\">Back to Home</a>\n\n<!-- Descriptive link text (good) -->\n<a href=\"/pricing\">View our pricing plans</a>\n\n<!-- Bad link text (avoid) -->\n<a href=\"/pricing\">Click here</a>\n\n<!-- Email and phone links -->\n<a href=\"mailto:info@example.com\">Email us</a>\n<a href=\"tel:+15551234567\">Call +1 (555) 123-4567</a>\n\n<!-- Download link -->\n<a href=\"/files/guide.pdf\" download>Download PDF Guide</a>\n\n<!-- Link with custom filename on download -->\n<a href=\"/files/report-q3.pdf\" download=\"quarterly-report.pdf\">Download Report</a>\n\n<!-- Icon link (accessible) -->\n<a href=\"/settings\" aria-label=\"Settings\">\n  ⚙ Settings\n</a>",
        language: "html"
      },

      {
        id: "18",
        title: "Link Targets & Attributes",
        content: "The target attribute controls where a link opens. The default is _self (opens in the same tab). _blank opens in a new tab or window. _parent opens in the parent frame (used with iframes), and _top opens in the full window (breaking out of frames).\n\nWhen using target=\"_blank\", always include rel=\"noopener noreferrer\" for security. Without it, the opened page can access window.opener and redirect your page to a malicious site. Modern browsers default to noopener behavior, but explicitly setting it is still best practice.\n\nThe title attribute provides additional information about the link, displayed as a tooltip on hover. Screen readers announce it. Use it to clarify ambiguous link destinations: title=\"Opens in new tab\" or title=\"PDF, 2.4 MB\".\n\nThe rel attribute defines the relationship between the current page and the linked page. Common values: noopener (prevents opener access), noreferrer (hides referrer info), nofollow (tells search engines not to follow), sponsored (marks paid links for Google), ugc (user-generated content).\n\nBookmark links use the # symbol to link to page sections. The linked element needs an id attribute: href=\"#section2\" scrolls to <div id=\"section2\">. Smooth scrolling via CSS (scroll-behavior: smooth) makes this feel native.\n\nCommon mistake: forgetting the # prefix in bookmark links. href=\"section2\" looks for a page named section2, not a section within the current page.\n\nInterview tip: always mention the security reason for noopener — the opened page's window.opener API allows tab-napping attacks where a malicious site redirects the original tab.",
        codeExample: "<!-- Self (default) - opens in same tab -->\n<a href=\"/about\" target=\"_self\">About (same tab)</a>\n\n<!-- Blank - opens new tab (with security attributes) -->\n<a href=\"https://example.com\" target=\"_blank\" rel=\"noopener noreferrer\">\n  External link (new tab)\n</a>\n\n<!-- Title attribute for tooltips -->\n<a href=\"/large-file.pdf\" title=\"PDF, 5.2 MB\">Download Report</a>\n<a href=\"/external\" title=\"Opens in new tab\" target=\"_blank\">View on GitHub</a>\n\n<!-- rel values -->\n<a href=\"https://sponsored.com\" rel=\"sponsored\">Sponsored link</a>\n<a href=\"https://untrusted.com\" rel=\"nofollow noopener\">Untrusted link</a>\n\n<!-- Bookmark links - navigate within page -->\n<nav>\n  <a href=\"#introduction\">Introduction</a>\n  <a href=\"#features\">Features</a>\n  <a href=\"#pricing\">Pricing</a>\n</nav>\n\n<section id=\"introduction\">\n  <h2>Introduction</h2>\n  <p>Section content here.</p>\n</section>\n\n<section id=\"pricing\">\n  <h2>Pricing</h2>\n  <p>Section content here.</p>\n</section>",
        language: "html"
      },

      {
        id: "19",
        title: "HTML Images - The img Element",
        content: "The <img> element embeds an image in the page. It is a self-closing, replaced element — its appearance is controlled by the external resource it loads, not by its HTML content. The src attribute specifies the image URL, and alt provides text alternatives.\n\nImage paths work like link paths: absolute (https://example.com/photo.jpg), relative (/images/photo.jpg), or same-directory (photo.jpg). Always use relative paths for your own images to keep the site portable.\n\nSupported formats: JPEG for photographs (lossy compression, small file size), PNG for graphics with transparency (lossless), GIF for simple animations (limited to 256 colors), WebP for modern compression (better than JPEG and PNG combined), and SVG for vector graphics (scales infinitely, text-based).\n\nImage sizing: always specify width and height attributes. Without them, the browser reserves no space for the image, causing layout shifts as images load. This is a Core Web Vital metric (CLS). Set width and height to the intrinsic dimensions of the image.\n\nLoading behavior: loading=\"lazy\" defers loading off-screen images until the user scrolls near them. This saves bandwidth and improves initial page load. Use lazy loading for images below the fold, but keep loading=\"eager\" (default) for above-the-fold images.\n\nThe style attribute or CSS class makes images responsive: style=\"max-width: 100%; height: auto\" ensures the image scales down on smaller screens without exceeding its natural dimensions.\n\nCommon mistake: missing alt attribute. This fails accessibility validation (WCAG failure). Even decorative images need an empty alt (alt=\"\") to be ignored by screen readers — a missing alt causes the screen reader to announce the image file name.\n\nInterview tip: \"How do you prevent layout shift with images?\" Always set width and height attributes. The browser calculates the aspect ratio and reserves the space before the image loads.",
        codeExample: "<!-- Basic image with relative path -->\n<img src=\"/images/logo.png\" alt=\"Company Logo\" width=\"200\" height=\"50\">\n\n<!-- Image with absolute URL -->\n<img src=\"https://example.com/photos/sunset.jpg\" alt=\"Sunset over mountains\" width=\"800\" height=\"600\">\n\n<!-- Responsive image with CSS -->\n<img src=\"photo.jpg\" alt=\"Description\" style=\"max-width: 100%; height: auto;\">\n\n<!-- Lazy loading for off-screen images -->\n<img src=\"gallery/photo1.jpg\" alt=\"Gallery photo 1\" loading=\"lazy\" width=\"400\" height=\"300\">\n<img src=\"gallery/photo2.jpg\" alt=\"Gallery photo 2\" loading=\"lazy\" width=\"400\" height=\"300\">\n\n<!-- Decorative image - empty alt text -->\n<img src=\"divider.svg\" alt=\"\" width=\"100%\" height=\"2\">\n\n<!-- Image formats comparison -->\n<img src=\"photo.jpg\" alt=\"JPEG photo\" width=\"640\" height=\"480\">\n<img src=\"graphic.png\" alt=\"PNG with transparency\" width=\"200\" height=\"200\">\n<img src=\"icon.svg\" alt=\"SVG icon\" width=\"32\" height=\"32\">\n<img src=\"animation.gif\" alt=\"Animated illustration\" width=\"300\" height=\"200\">",
        language: "html"
      },

      {
        id: "20",
        title: "Image Alt Text & Accessibility",
        content: "The alt attribute is the most important accessibility feature of images. It provides a text alternative that is used when the image cannot be displayed, read by screen readers, indexed by search engines, and shown when images fail to load.\n\nGood alt text describes the content and function of the image — what information it conveys, not what it looks like. For a chart showing revenue growth, write \"alt=Line chart showing revenue growing from $1M to $5M over 2024\". For a photo of a product, write \"alt=Blue ceramic coffee mug on wooden table\".\n\nDecorative images — those that add no informational content — must have alt=\"\" (empty alt). This tells screen readers to skip the image entirely. Without an empty alt attribute, screen readers announce the image file name, which is useless noise.\n\nFunctional images — images that act as links or buttons — need alt text that describes the function, not the image. An image inside a link to the homepage: alt=\"Home\". A search icon button: alt=\"Search\". The alt text must convey the action the link performs.\n\nImages of text should be avoided — use real text with CSS styling instead. If unavoidable, the alt text must contain the exact same text shown in the image. Search engines penalize text-in-image approaches.\n\nThe longdesc attribute (deprecated in HTML5) provided a link to a detailed description. Modern approach: put the detailed description in visible text near the image or link to it from the caption.\n\nCommon mistake: alt=\"image\" or alt=\"photo\" — these add zero value. Another mistake: leaving alt attribute empty for images that convey critical information like charts or diagrams. Always distinguish decorative (alt=\"\") from informative (descriptive alt).\n\nInterview tip: \"What are the four rules for alt text?\" (1) Informative images: describe content and function, (2) Decorative images: alt=\"\", (3) Functional images: describe the function, (4) Text images: replicate the text verbatim.",
        codeExample: "<!-- Informative image: describes content -->\n<img src=\"sales-chart.png\" alt=\"Bar chart comparing Q1 sales: $50K, Q2: $75K, Q3: $90K, Q4: $120K\">\n\n<!-- Decorative image: empty alt -->\n<img src=\"background-pattern.svg\" alt=\"\" width=\"100%\" height=\"400\">\n<img src=\"horizontal-line.png\" alt=\"\" width=\"100%\" height=\"1\">\n\n<!-- Functional image: describes the action -->\n<a href=\"/\">\n  <img src=\"logo.png\" alt=\"Home\" width=\"150\" height=\"40\">\n</a>\n\n<a href=\"/search\">\n  <img src=\"search-icon.svg\" alt=\"Search\" width=\"24\" height=\"24\">\n</a>\n\n<!-- Image of text: replicate the text -->\n<img src=\"banner-text.png\" alt=\"Summer Sale: 50% Off All Items\" width=\"600\" height=\"100\">\n\n<!-- Bad alt text examples -->\n<img src=\"photo.jpg\" alt=\"image\">\n<img src=\"logo.png\" alt=\"\">\n\n<!-- Complex image with nearby description -->\n<figure>\n  <img src=\"org-chart.png\" alt=\"Company org chart\" width=\"800\" height=\"600\">\n  <figcaption>Full organization hierarchy with reporting structure</figcaption>\n</figure>",
        language: "html"
      },

      {
        id: "21",
        title: "Image Sizing & Responsive Images",
        content: "Responsive images adapt to different screen sizes, device resolutions, and bandwidth conditions. The core technique uses HTML attributes and the <picture> element to serve the right image for every device.\n\nThe width and height attributes set intrinsic dimensions. Combined with CSS max-width: 100% and height: auto, images scale down on small screens without distortion. Always set these attributes to prevent Cumulative Layout Shift (CLS).\n\nThe srcset attribute provides multiple image candidates for different display widths: srcset=\"small.jpg 600w, medium.jpg 1200w, large.jpg 2000w\". The browser selects the best option based on viewport width, device pixel ratio, and bandwidth. The sizes attribute tells the browser what display size the image will occupy: sizes=\"(max-width: 600px) 100vw, 50vw\".\n\nThe <picture> element provides art direction — serving completely different images at different breakpoints, not just scaled versions. Use it when an image needs cropping differently on mobile: a wide landscape shot on desktop becomes a portrait crop on mobile.\n\nThe <picture> element also handles format fallbacks. Serve modern WebP images with JPEG/PNG fallbacks for older browsers: <source srcset=\"image.webp\" type=\"image/webp\"> followed by <img src=\"image.jpg\">.\n\nDevice Pixel Ratio (DPR): Retina and high-DPI screens need 2x or 3x resolution images. The srcset with x descriptors handles this: srcset=\"photo.jpg, photo@2x.jpg 2x\".\n\nCommon mistake: using srcset without sizes — the browser defaults to 100vw which wastes bandwidth on large screens. Always specify sizes to match your layout.\n\nInterview tip: \"Difference between srcset and picture?\" srcset serves different resolutions of the same image; <picture> serves completely different images for art direction. Use srcset for responsive scaling, <picture> for format fallback and art direction.",
        codeExample: "<!-- Basic responsive image with max-width -->\n<img src=\"photo.jpg\" alt=\"Description\" style=\"max-width: 100%; height: auto;\" width=\"1600\" height=\"900\">\n\n<!-- srcset with sizes for responsive resolution -->\n<img\n  src=\"photo-800.jpg\"\n  srcset=\"photo-400.jpg 400w,\n          photo-800.jpg 800w,\n          photo-1200.jpg 1200w,\n          photo-1600.jpg 1600w\"\n  sizes=\"(max-width: 600px) 100vw,\n         (max-width: 1200px) 50vw,\n         33vw\"\n  alt=\"Mountain landscape\"\n  width=\"1600\" height=\"900\">\n\n<!-- High DPI (retina) support with x descriptors -->\n<img\n  src=\"icon.png\"\n  srcset=\"icon.png 1x, icon@2x.png 2x, icon@3x.png 3x\"\n  alt=\"Icon\"\n  width=\"100\" height=\"100\">\n\n<!-- Picture element for art direction -->\n<picture>\n  <source media=\"(max-width: 600px)\" srcset=\"photo-mobile.jpg\">\n  <source media=\"(max-width: 1200px)\" srcset=\"photo-tablet.jpg\">\n  <img src=\"photo-desktop.jpg\" alt=\"Landscape\" width=\"1600\" height=\"900\">\n</picture>\n\n<!-- Picture element for format fallback -->\n<picture>\n  <source srcset=\"image.webp\" type=\"image/webp\">\n  <source srcset=\"image.avif\" type=\"image/avif\">\n  <img src=\"image.jpg\" alt=\"Fallback description\" width=\"800\" height=\"600\">\n</picture>",
        language: "html"
      },

      {
        id: "22",
        title: "HTML Picture Element",
        content: "The <picture> element is a container that holds zero or more <source> elements and one fallback <img> element. The browser evaluates each <source> in order and uses the first matching one. If none match, the <img> fallback is used.\n\nThe <source> element has three key attributes: srcset (image URL or URLs), media (media query condition), and type (MIME type for format selection). These can be combined: <source media=\"(min-width: 800px)\" srcset=\"wide.webp\" type=\"image/webp\">.\n\nUse case 1 — Art direction: different screen sizes need different image crops. A group photo might show five people on desktop but only the speaker on mobile. <picture> makes this straightforward with media queries.\n\nUse case 2 — Format selection: serve next-gen formats like WebP and AVIF to supporting browsers, with JPEG/PNG fallback for legacy browsers. The type attribute checks MIME type support rather than parsing the file extension.\n\nUse case 3 — User preferences: respect prefers-color-scheme media queries to serve a dark-mode version of an image. This is an advanced pattern that shows awareness of user preferences.\n\nUse case 4 — Print vs screen: serve high-resolution images for print and compressed versions for screen. media=\"print\" ensures print-specific images are used.\n\nEach <source> is evaluated independently. Once a match is found, the rest are skipped. The order matters — put the most specific conditions first and the most general last.\n\nCommon mistake: forgetting the closing <img> tag. The <picture> element requires a fallback <img> — it is the source of the displayed image and provides accessibility through alt text.\n\nInterview tip: \"When to use picture vs srcset?\" Picture is for art direction (different images) and format fallback. srcset is for resolution switching (same image, different sizes). Use the simplest solution that works.",
        codeExample: "<!-- Art direction: different crops per breakpoint -->\n<picture>\n  <source media=\"(max-width: 480px)\" srcset=\"hero-mobile.jpg\" width=\"480\" height=\"600\">\n  <source media=\"(max-width: 1024px)\" srcset=\"hero-tablet.jpg\" width=\"1024\" height=\"500\">\n  <img src=\"hero-desktop.jpg\" alt=\"Hero banner\" width=\"1920\" height=\"600\">\n</picture>\n\n<!-- Format fallback: WebP with JPEG fallback -->\n<picture>\n  <source srcset=\"photo.webp\" type=\"image/webp\">\n  <source srcset=\"photo.avif\" type=\"image/avif\">\n  <img src=\"photo.jpg\" alt=\"Scenic view\" width=\"1200\" height=\"800\">\n</picture>\n\n<!-- Art direction + format combined -->\n<picture>\n  <source media=\"(max-width: 600px)\" srcset=\"small.webp\" type=\"image/webp\">\n  <source media=\"(max-width: 600px)\" srcset=\"small.jpg\" type=\"image/jpeg\">\n  <source media=\"(max-width: 1200px)\" srcset=\"medium.webp\" type=\"image/webp\">\n  <source media=\"(max-width: 1200px)\" srcset=\"medium.jpg\" type=\"image/jpeg\">\n  <img src=\"large.jpg\" alt=\"Full view\" width=\"1920\" height=\"1080\">\n</picture>\n\n<!-- Dark mode preference -->\n<picture>\n  <source srcset=\"dark-logo.png\" media=\"(prefers-color-scheme: dark)\">\n  <img src=\"light-logo.png\" alt=\"Logo\" width=\"200\" height=\"60\">\n</picture>",
        language: "html"
      },

      {
        id: "23",
        title: "HTML Figure & Figcaption",
        content: "The <figure> element represents self-contained content that is referenced from the main content but can be moved to an appendix or sidebar without affecting the flow. Common uses: images with captions, code snippets, diagrams, pull quotes, and illustrations.\n\nThe <figcaption> element is the caption for the figure content. It can be placed as the first or last child of the <figure> element. It provides a visible label that describes or explains the figure. It is optional — a figure does not require a figcaption.\n\nThe <figure> element is not just for images. It works for any self-contained piece of content: a block of code, a table, an audio player, a video, a poem, a chart rendered as SVG. If the content is referenced in the main text and could be moved elsewhere, it belongs in a figure.\n\nWhen an image has a caption, the image and its caption together form a figure. Screen readers treat the <figcaption> as part of the figure — users can navigate from the image to its caption. This is better than using a heading or paragraph near the image.\n\nThe aria-labelledby attribute can connect a figure to its caption: <figure aria-labelledby=\"cap1\"> with <figcaption id=\"cap1\">. This is helpful for complex figures where the caption serves as an accessible label.\n\nCommon mistake: wrapping every image in <figure> — use it only when the image needs a caption or is referenced from the text. A standalone decorative image without caption does not need figure. Overusing figure adds unnecessary markup.\n\nInterview tip: \"Difference between alt text and figcaption?\" Alt text replaces the image when it cannot be displayed — it is functional and machine-readable. Figcaption is visible text that labels the figure — it is presentational and seen by all users. Both are important but serve different purposes.",
        codeExample: "<!-- Image with caption -->\n<figure>\n  <img src=\"team-photo.jpg\" alt=\"Engineering team 2024\" width=\"800\" height=\"500\">\n  <figcaption>Engineering team at the 2024 company retreat</figcaption>\n</figure>\n\n<!-- Code snippet as figure -->\n<figure>\n  <pre><code>function hello() {\n  console.log(\"Hello World\");\n}</code></pre>\n  <figcaption>JavaScript hello world function</figcaption>\n</figure>\n\n<!-- Figure with multiple images (gallery) -->\n<figure>\n  <img src=\"photo1.jpg\" alt=\"Sunrise\" width=\"300\" height=\"200\">\n  <img src=\"photo2.jpg\" alt=\"Ocean view\" width=\"300\" height=\"200\">\n  <img src=\"photo3.jpg\" alt=\"Forest path\" width=\"300\" height=\"200\">\n  <figcaption>Trip photo collection</figcaption>\n</figure>\n\n<!-- Figure without caption (rare, but valid) -->\n<figure>\n  <img src=\"decoration.jpg\" alt=\"Decorative artwork\" width=\"400\" height=\"300\">\n</figure>\n\n<!-- Pull quote as figure -->\n<figure>\n  <blockquote>\n    <p>The best time to plant a tree was 20 years ago. The second best time is now.</p>\n  </blockquote>\n  <figcaption>Chinese proverb</figcaption>\n</figure>",
        language: "html"
      },

      {
        id: "24",
        title: "HTML Tables - Basics & Structure",
        content: "Tables display data in rows and columns — tabular data like spreadsheets, schedules, pricing grids, and comparison charts. HTML tables use a row-first structure: each <tr> element defines a row, and within each row, <td> elements define cells.\n\nThe basic structure: <table> wraps the entire table, <tr> creates a row, <td> creates a data cell, and <th> creates a header cell (bold and centered by default). Headers should be used for column or row labels, not for styling.\n\nUse <thead>, <tbody>, and <tfoot> to group rows logically. <thead> contains header rows, <tbody> contains the main data, and <tfoot> contains summary rows (like totals). These elements help screen readers navigate and allow scrolling the body independently.\n\nThe scope attribute on <th> specifies whether the header applies to a column (scope=\"col\"), row (scope=\"row\"), or group. This is essential for accessibility — screen readers use scope to associate headers with data cells.\n\nTable captions via <caption> provide a title or summary for the whole table. Place it immediately after the opening <table> tag. Captions are visible and read by screen readers.\n\nTables should NOT be used for page layout. In the 1990s, tables were used for visual layout, but CSS has long replaced that. Tables are for data only. Using tables for layout harms accessibility and responsiveness.\n\nCommon mistake: nested tables — placing a table inside another table cell. This was common in old-school layout but is now an anti-pattern. Use CSS Grid or Flexbox instead.\n\nInterview tip: \"When is a table the right choice?\" When you have data with multiple dimensions that relate to each other — products and their prices, schedules and their times, students and their grades. If the data looks natural in a spreadsheet, use a table.",
        codeExample: "<!-- Basic table structure -->\n<table>\n  <caption>Monthly Sales Report 2024</caption>\n  <thead>\n    <tr>\n      <th scope=\"col\">Month</th>\n      <th scope=\"col\">Revenue</th>\n      <th scope=\"col\">Cost</th>\n      <th scope=\"col\">Profit</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>January</td>\n      <td>$50,000</td>\n      <td>$30,000</td>\n      <td>$20,000</td>\n    </tr>\n    <tr>\n      <td>February</td>\n      <td>$55,000</td>\n      <td>$32,000</td>\n      <td>$23,000</td>\n    </tr>\n    <tr>\n      <td>March</td>\n      <td>$60,000</td>\n      <td>$35,000</td>\n      <td>$25,000</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope=\"row\">Total</th>\n      <td>$165,000</td>\n      <td>$97,000</td>\n      <td>$68,000</td>\n    </tr>\n  </tfoot>\n</table>\n\n<!-- Row headers example -->\n<table>\n  <caption>Employee Directory</caption>\n  <tbody>\n    <tr>\n      <th scope=\"row\">Alice</th>\n      <td>Engineer</td>\n      <td>alice@company.com</td>\n    </tr>\n    <tr>\n      <th scope=\"row\">Bob</th>\n      <td>Designer</td>\n      <td>bob@company.com</td>\n    </tr>\n  </tbody>\n</table>",
        language: "html"
      },

      {
        id: "25",
        title: "Table Headers & Captions",
        content: "Table headers (<th>) and captions (<caption>) provide semantic meaning and accessibility to HTML tables. They transform raw data into understandable information by labeling what each column or row represents.\n\nThe <th> element defines a header cell. By default, it renders bold and centered, but its real value is semantic — it tells assistive technology that this cell is a label. The scope attribute clarifies whether the header applies to the column (scope=\"col\"), row (scope=\"row\"), column group (scope=\"colgroup\"), or row group (scope=\"rowgroup\").\n\nColumn headers are the most common: a row of <th> elements at the top of the table, each labeling a column below. Row headers label each row's data — used when the first column contains categories or names. In complex tables, both column and row headers may exist.\n\nThe <caption> element provides the table's title or description. It must be the first child of <table>. It is visible by default (centered above the table) and provides context for all users. Screen readers announce the caption when entering the table.\n\nFor complex tables, use the headers attribute on <td> and <th> to explicitly associate cells with their headers. The value is a space-separated list of id values. This is verbose but ensures correct association in multi-level header tables.\n\nThe abbr attribute on <th> provides a short version of the header for screen readers to use when navigating quickly. Example: <th abbr=\"Name\">Full Name</th>. This speeds up screen reader navigation.\n\nCommon mistake: using <td> instead of <th> for headers. Bold text does not make a cell a header — only <th> provides the semantic meaning. Headers must be <th> elements.\n\nInterview tip: \"Why are table headers important for accessibility?\" They provide context for data cells. Screen readers announce the relevant header before each cell value. Without headers, users hear isolated numbers or text with no context.",
        codeExample: "<!-- Column headers with scope -->\n<table>\n  <caption>Employee Hours</caption>\n  <tr>\n    <th scope=\"col\">Employee</th>\n    <th scope=\"col\">Mon</th>\n    <th scope=\"col\">Tue</th>\n    <th scope=\"col\">Wed</th>\n    <th scope=\"col\">Total</th>\n  </tr>\n  <tr>\n    <th scope=\"row\">Alice</th>\n    <td>8</td><td>7</td><td>8</td><td>23</td>\n  </tr>\n  <tr>\n    <th scope=\"row\">Bob</th>\n    <td>6</td><td>8</td><td>7</td><td>21</td>\n  </tr>\n</table>\n\n<!-- Multi-level headers with id/headers -->\n<table>\n  <caption>Q1 Revenue by Region</caption>\n  <tr>\n    <th id=\"region\">Region</th>\n    <th id=\"q1\">Q1 2024</th>\n    <th id=\"q1-2023\">Q1 2023</th>\n  </tr>\n  <tr>\n    <td headers=\"region\">North</td>\n    <td headers=\"q1\">$100K</td>\n    <td headers=\"q1-2023\">$80K</td>\n  </tr>\n  <tr>\n    <td headers=\"region\">South</td>\n    <td headers=\"q1\">$120K</td>\n    <td headers=\"q1-2023\">$110K</td>\n  </tr>\n</table>\n\n<!-- Abbreviation for screen readers -->\n<table>\n  <tr>\n    <th abbr=\"Name\">Employee Full Name</th>\n    <th abbr=\"Dept\">Department</th>\n  </tr>\n  <tr>\n    <td>Alice Johnson</td>\n    <td>Engineering</td>\n  </tr>\n</table>",
        language: "html"
      },

      {
        id: "26",
        title: "Table Colspan & Rowspan",
        content: "The colspan and rowspan attributes allow a single cell to span multiple columns or rows. This is essential for complex data tables with merged categories, subcategories, and multi-level headers.\n\ncolspan=\"n\" makes a cell span n columns. The cell occupies the space of multiple columns and pushes subsequent cells to the right. This is commonly used for headings that span across subcolumns — like a \"Revenue\" header spanning Q1 through Q4 subtotals.\n\nrowspan=\"n\" makes a cell span n rows. The cell occupies the space of multiple rows and pushes subsequent cells in those rows to the right. This is used for categories that group multiple rows — like a \"Fiction\" label spanning multiple book entries.\n\nRow counting can be tricky. When a cell has rowspan, subsequent rows must account for the occupied space. Skipping the spanned cell in later rows is correct — do not add empty cells to fill the gap. The spanned cell already claims that space.\n\nColumn counting: colspan=\"3\" tells the browser the cell spans three of the grid's columns. The total number of columns in a table is determined by the row with the most cells (counting colspan values). Ensure all rows have the same total column count.\n\nAccessibility with spanned cells: screen readers handle colspan and rowspan, but complex merges can confuse navigation. Keep spanned cells for obvious cases like grouping headers. Avoid rowspan for data cells unless the relationship is clear.\n\nCommon mistake: colspan value exceeding the available columns. If a table has 4 columns and you set colspan=\"5\", the cell will overflow the table. Always verify the total column count matches.\n\nInterview tip: \"How does the browser calculate column count?\" It scans all rows and sums each row's cells plus their colspan values. The row with the highest total determines the table's column count. All rows must add up to this number.",
        codeExample: "<!-- Colspan for grouped headers -->\n<table border=\"1\">\n  <caption>Revenue Breakdown</caption>\n  <tr>\n    <th rowspan=\"2\">Product</th>\n    <th colspan=\"2\">Q1 2024</th>\n    <th colspan=\"2\">Q2 2024</th>\n    <th rowspan=\"2\">Total</th>\n  </tr>\n  <tr>\n    <th>Revenue</th>\n    <th>Cost</th>\n    <th>Revenue</th>\n    <th>Cost</th>\n  </tr>\n  <tr>\n    <td>Widget A</td>\n    <td>$50K</td>\n    <td>$30K</td>\n    <td>$55K</td>\n    <td>$32K</td>\n    <td>$105K</td>\n  </tr>\n  <tr>\n    <td>Widget B</td>\n    <td>$40K</td>\n    <td>$25K</td>\n    <td>$45K</td>\n    <td>$28K</td>\n    <td>$85K</td>\n  </tr>\n</table>\n\n<!-- Rowspan for category labels -->\n<table border=\"1\">\n  <caption>Book List by Genre</caption>\n  <tr>\n    <th>Title</th>\n    <th>Author</th>\n  </tr>\n  <tr>\n    <td rowspan=\"3\" style=\"font-weight: bold; background: #eee;\">Fiction</td>\n    <td>To Kill a Mockingbird</td>\n    <td>Harper Lee</td>\n  </tr>\n  <tr>\n    <td>1984</td>\n    <td>George Orwell</td>\n  </tr>\n  <tr>\n    <td>The Great Gatsby</td>\n    <td>F. Scott Fitzgerald</td>\n  </tr>\n  <tr>\n    <td rowspan=\"2\" style=\"font-weight: bold; background: #eee;\">Non-Fiction</td>\n    <td>Sapiens</td>\n    <td>Yuval Noah Harari</td>\n  </tr>\n  <tr>\n    <td>Atomic Habits</td>\n    <td>James Clear</td>\n  </tr>\n</table>",
        language: "html"
      },

      {
        id: "27",
        title: "Table Colgroup & Col",
        content: "The <colgroup> and <col> elements provide column-level styling and grouping for HTML tables. They allow you to apply styles to entire columns without adding classes to every cell.\n\n<colgroup> wraps one or more <col> elements and must appear inside <table> before any <tr> elements (after <caption> if present). It defines column properties that apply to the entire column.\n\n<col> represents a single column within the colgroup. Use the span attribute to apply properties to multiple consecutive columns: <col span=\"2\"> affects the first two columns. Without span, each <col> affects one column.\n\nStyling via <col> is limited to border, background, width, and visibility. The element cannot apply padding, text alignment, or font styles — those must go on <td> or <th> elements. Despite this limitation, <colgroup> is useful for column widths and backgrounds.\n\nGrouping columns: <colgroup span=\"3\" class=\"primary\"> groups three columns under the \"primary\" class. Use multiple <colgroup> elements to create separate column groups.\n\nThe <colgroup> element supports the dir attribute for right-to-left tables — dir=\"rtl\" reverses the column order.\n\nCommon mistake: putting <colgroup> after table rows. It must be before all <tr> elements. Invalid placement causes the browser to ignore column styling.\n\nInterview tip: \"Why use colgroup when CSS has nth-child selectors?\" <colgroup> is declarative and column-based. CSS :nth-child is row-based and recalculates for each row. For large tables or dynamic columns, <colgroup> is more maintainable and performant.",
        codeExample: "<!-- Basic colgroup for column widths -->\n<table>\n  <colgroup>\n    <col style=\"width: 30%;\">\n    <col style=\"width: 40%;\">\n    <col style=\"width: 30%;\">\n  </colgroup>\n  <tr>\n    <th>Product</th>\n    <th>Description</th>\n    <th>Price</th>\n  </tr>\n  <tr>\n    <td>Widget A</td>\n    <td>Standard widget</td>\n    <td>$19.99</td>\n  </tr>\n</table>\n\n<!-- Colgroup with span for grouped columns -->\n<table>\n  <colgroup>\n    <col style=\"background: #f0f0f0;\">\n    <col span=\"2\" style=\"background: #e6f3e6;\">\n    <col style=\"background: #f0f0f0;\">\n  </colgroup>\n  <tr>\n    <th>Product</th>\n    <th>Revenue</th>\n    <th>Cost</th>\n    <th>Profit</th>\n  </tr>\n  <tr>\n    <td>Widget A</td>\n    <td>$50K</td>\n    <td>$30K</td>\n    <td>$20K</td>\n  </tr>\n  <tr>\n    <td>Widget B</td>\n    <td>$40K</td>\n    <td>$25K</td>\n    <td>$15K</td>\n  </tr>\n</table>\n\n<!-- Multiple colgroup elements -->\n<table>\n  <colgroup span=\"2\" class=\"basic-info\"></colgroup>\n  <colgroup span=\"3\" class=\"financial-data\"></colgroup>\n  <tr>\n    <th>ID</th>\n    <th>Name</th>\n    <th>Revenue</th>\n    <th>Cost</th>\n    <th>Margin</th>\n  </tr>\n  <tr>\n    <td>001</td>\n    <td>Widget A</td>\n    <td>$50K</td>\n    <td>$30K</td>\n    <td>40%</td>\n  </tr>\n</table>",
        language: "html"
      },

      {
        id: "28",
        title: "HTML Lists - Ordered, Unordered & Description",
        content: "HTML provides three types of lists: ordered (<ol>), unordered (<ul>), and description (<dl>). Each serves a different semantic purpose and renders differently by default.\n\nOrdered lists (<ol>) represent items in a specific sequence where order matters. Default numbering is decimal (1, 2, 3...). The type attribute changes the numbering: 1 (numbers), A (uppercase letters), a (lowercase letters), I (uppercase Roman), i (lowercase Roman). The start attribute sets the starting number. The reversed attribute counts down.\n\nUnordered lists (<ul>) represent items where order does not matter. Default bullets are disc (filled circle). CSS list-style-type changes bullets to circle, square, or none. Navigation menus, feature lists, and grocery lists are typical unordered list use cases.\n\nDescription lists (<dl>) pair terms (<dt>) with their descriptions (<dd>). This is not a bullet list — it is a list of term-description pairs like a dictionary, FAQ, or metadata (file name, file size, author). One term can have multiple descriptions.\n\nList nesting: lists can be nested inside other list items (<li>). This creates sublists — a table of contents with subsections, or categories with subcategories. Nesting works with any list type. A nested list inside an <ol> automatically increments numbering.\n\nAccessibility: screen readers announce the list type and item count before reading. \"List of 5 items\" or \"Ordered list of 3 items.\" They provide navigation by list and by list item — users can jump from list to list.\n\nCommon mistake: using <br> between list items or manually numbering with text like \"1.\" instead of using <ol>. Let HTML handle the numbering — it is automatic, accessible, and maintainable.\n\nInterview tip: \"When would you use a description list?\" For glossaries, metadata displays (file properties), key-value data, and FAQ content. Anywhere you have a term and its explanation, use <dl> — it is the semantically correct choice and screen readers convey the pairing.",
        codeExample: "<!-- Ordered list: sequence matters -->\n<ol>\n  <li>Preheat oven to 350°F</li>\n  <li>Mix flour and sugar</li>\n  <li>Add eggs and vanilla</li>\n  <li>Pour batter into pan</li>\n  <li>Bake for 30 minutes</li>\n</ol>\n\n<!-- Ordered list with custom start and type -->\n<ol type=\"A\" start=\"3\">\n  <li>Option C</li>\n  <li>Option D</li>\n  <li>Option E</li>\n</ol>\n\n<!-- Reversed ordered list -->\n<ol reversed>\n  <li>Top reason</li>\n  <li>Second reason</li>\n  <li>Third reason</li>\n</ol>\n\n<!-- Unordered list: order does not matter -->\n<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n  <li>Milk</li>\n  <li>Bread</li>\n  <li>Eggs</li>\n</ul>\n\n<!-- Nested lists (topics with subtopics) -->\n<ul>\n  <li>Frontend\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n      <li>JavaScript</li>\n    </ul>\n  </li>\n  <li>Backend\n    <ul>\n      <li>Node.js</li>\n      <li>Python</li>\n    </ul>\n  </li>\n</ul>\n\n<!-- Description list: term-description pairs -->\n<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language - the standard language for web pages</dd>\n\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets - controls the visual presentation of HTML</dd>\n\n  <dt>JavaScript</dt>\n  <dd>A programming language that adds interactivity to web pages</dd>\n</dl>\n\n<!-- Multiple descriptions for one term -->\n<dl>\n  <dt>Task Manager</dt>\n  <dd>Web app for tracking daily tasks</dd>\n  <dd>Version 2.0 released June 2024</dd>\n  <dd>Supports team collaboration</dd>\n</dl>",
        language: "html"
      },
      {

        id: "29",

        title: "HTML Forms Basics",

        content: `Forms are the backbone of user interaction on the web. Without forms, there would be no login pages, no search bars, no checkout processes, and no contact forms. The <form> element wraps all input fields and defines how the data gets sent to a server. Two critical attributes control submission behavior: action specifies the URL where form data is sent, and method determines how it is transmitted.\n\nGET method appends form data to the URL as query parameters — visible in the address bar, bookmarkable, but limited to about 2000 characters. Use GET for search forms and anything that should be shareable via URL. POST method sends data in the HTTP request body — invisible in the URL, no size limit, and suitable for sensitive data like passwords or large uploads.\n\nWhen a user clicks the submit button, the browser collects all named form elements, formats them as key-value pairs, and sends an HTTP request to the action URL. The server processes the data and typically responds with a new page or a redirect.\n\nCommon mistake: omitting the action attribute. Without it, the form submits to the current page's URL — which might work for single-page apps but confuses beginners expecting server-side processing. Another mistake: using GET for sensitive data. Passwords and credit card numbers in the URL get logged in browser history, server logs, and referrer headers.\n\nInterview tip: understand the full submission flow — browser collects named inputs, encodes them (application/x-www-form-urlencoded or multipart/form-data for file uploads), sends the request, and waits for a response.`,

        codeExample: `<!-- GET form: search bar example -->\n<form action="/search" method="GET">\n  <label for="query">Search:</label>\n  <input type="search" id="query" name="q" placeholder="Enter keywords">\n  <button type="submit">Search</button>\n</form>\n\n<!-- POST form: contact form -->\n<form action="/contact" method="POST">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required>\n\n  <label for="message">Message:</label>\n  <textarea id="message" name="message" rows="5" required></textarea>\n\n  <button type="submit">Send Message</button>\n</form>\n\n<!-- Multiple submit buttons -->\n<form action="/save" method="POST">\n  <input type="text" name="title" required>\n  <button type="submit" name="action" value="draft">Save Draft</button>\n  <button type="submit" name="action" value="publish">Publish</button>\n</form>`,

        language: "html"

      },

      {

        id: "30",

        title: "Input Types",

        content: `HTML5 introduced numerous input types that replace the generic text field with purpose-built controls. Each type provides specific behavior — validation, mobile keyboard optimization, and native UI widgets — without writing JavaScript.\n\nThe core types: text (default, single-line), password (masks characters), email (validates email format on submit), number (restricts to numeric input with spinners), tel (shows phone keypad on mobile), url (validates URL format), and search (adds clear button and styled like a search field).\n\nDate and time types: date (calendar picker), time (time selector), datetime-local (date + time), month (month/year picker), and week (week picker). These replace the need for date picker libraries on mobile devices.\n\nChoice types: checkbox (multiple selections allowed), radio (single selection within a group — all radios with the same name form one group), and range (slider control with min/max/step).\n\nFile and special types: file (file upload with accept attribute to filter types), hidden (carries data without visual display), image (submit button with an image), and color (opens a color picker).\n\nThe submit, reset, and button types control form behavior — submit sends the form, reset clears all fields, and button does nothing by default (useful for JavaScript handlers).\n\nCommon mistake: using type=\"text\" for emails or phone numbers. The browser cannot validate email format or show the correct mobile keyboard without the proper type. Always use the most specific input type available.\n\nInterview tip: know which types trigger built-in validation — email, url, number, and date types validate format before form submission.`,

        codeExample: `<!-- Text and password -->\n<input type="text" name="username" placeholder="Username">\n<input type="password" name="password" placeholder="Password">\n\n<!-- Email, phone, URL -->\n<input type="email" name="email" placeholder="user@example.com">\n<input type="tel" name="phone" placeholder="+1 (555) 123-4567">\n<input type="url" name="website" placeholder="https://example.com">\n\n<!-- Number with constraints -->\n<input type="number" name="age" min="0" max="150" step="1">\n<input type="number" name="price" min="0" step="0.01">\n\n<!-- Date and time -->\n<input type="date" name="birthday">\n<input type="time" name="appointment">\n<input type="datetime-local" name="event">\n<input type="month" name="card-expiry">\n\n<!-- Checkboxes and radios -->\n<input type="checkbox" name="agree" id="agree">\n<label for="agree">I agree to terms</label>\n\n<input type="radio" name="color" id="red" value="red">\n<label for="red">Red</label>\n<input type="radio" name="color" id="blue" value="blue">\n<label for="blue">Blue</label>\n\n<!-- Range slider -->\n<input type="range" name="volume" min="0" max="100" value="50">\n\n<!-- File upload -->\n<input type="file" name="avatar" accept="image/*">\n\n<!-- Color picker -->\n<input type="color" name="theme-color" value="#ff0000">\n\n<!-- Hidden and submit -->\n<input type="hidden" name="user-id" value="12345">\n<button type="submit">Submit</button>\n<button type="reset">Clear Form</button>`,

        language: "html"

      },

      {

        id: "31",

        title: "Input Attributes",

        content: `Input attributes control behavior, validation, and appearance of form fields. Mastering them eliminates the need for most JavaScript validation and dramatically improves user experience.\n\nThe name attribute is essential — without it, the input's value is not included in form submission. The id attribute connects inputs to labels (label for=\"id\") and is used by JavaScript for selection. The value attribute sets the initial or current value of the field.\n\nPlaceholder provides hint text inside the field that disappears when the user starts typing. Never use placeholder as a substitute for a label — it vanishes on input and screen readers may not announce it consistently.\n\nValidation attributes: required (field must be filled), readonly (user cannot edit but value still submits), disabled (user cannot edit AND value does not submit). The difference between readonly and disabled is critical for form data.\n\nNumeric constraints: min and max set boundaries for number/date inputs, step defines the increment value. minlength and maxlength set character limits for text inputs. The pattern attribute accepts a regular expression for custom validation — pattern=\"[A-Za-z]{3}\" requires exactly three letters.\n\nThe autofocus attribute focuses the input on page load — only use one per page. The autocomplete attribute controls browser autofill behavior — on, off, or specific values like email, name, or current-password.\n\nCommon mistake: using disabled instead of readonly. Disabled inputs are not submitted with the form, which often causes server-side errors when expected data is missing. Use readonly when you want the value sent but not editable.\n\nInterview tip: understand the exact difference — readonly is visual (value submits), disabled is functional (value does not submit, input is grayed out, and tab-focus is skipped).`,

        codeExample: `<!-- name and id: both needed for different purposes -->\n<input type="text" name="fullName" id="fullName">\n\n<!-- placeholder: hint text (NOT a label replacement) -->\n<input type="email" name="email" placeholder="you@example.com">\n\n<!-- required: must be filled before submission -->\n<input type="text" name="username" required>\n\n<!-- readonly: editable but value submits -->\n<input type="text" name="account" value="ACC-12345" readonly>\n\n<!-- disabled: not editable, value does NOT submit -->\n<input type="text" name="locked" value="Cannot edit" disabled>\n\n<!-- min, max, step: numeric constraints -->\n<input type="number" name="quantity" min="1" max="100" step="1" value="1">\n<input type="range" name="rating" min="1" max="5" step="1">\n<input type="date" name="start" min="2024-01-01" max="2024-12-31">\n\n<!-- minlength and maxlength: text constraints -->\n<input type="text" name="username" minlength="3" maxlength="20" required>\n\n<!-- pattern: custom regex validation -->\n<input type="text" name="zip" pattern="[0-9]{5}" title="5-digit ZIP code">\n\n<!-- autofocus: focus on page load (one per page) -->\n<input type="text" name="search" autofocus>\n\n<!-- autocomplete: control browser autofill -->\n<input type="email" name="email" autocomplete="email">\n<input type="password" name="password" autocomplete="current-password">\n<input type="text" name="name" autocomplete="name">`,

        language: "html"

      },

      {

        id: "32",

        title: "Form Labels & Accessibility",

        content: `Every form input must have an associated label. This is not optional — it is a legal requirement under WCAG 2.1 AA and affects both accessibility and usability. Labels provide context for screen reader users, clickable targets for all users, and visible descriptions that never disappear like placeholders.\n\nThe for attribute on <label> matches the id of its input. This creates a programmatic association — clicking the label focuses the input, and screen readers announce the label when the input receives focus. This is the preferred method: <label for=\"email\">Email</label> <input id=\"email\" name=\"email\">.\n\nWrapping the input inside the label achieves the same association without the for/id pair, but the explicit association is more reliable across browsers and assistive technologies.\n\nFor groups of related inputs, use <fieldset> to group them and <legend> to label the group. Radio button groups especially need fieldsets — without them, screen reader users hear individual options without understanding what question they answer.\n\nARIA attributes enhance accessibility when native HTML is insufficient. aria-label provides a label when no visible label exists (use sparingly — visible labels are always preferred). aria-describedby links additional description text to an input. aria-required is the ARIA equivalent of the required attribute.\n\nCommon mistake: using placeholder as the only label. Placeholder text disappears when users start typing, and some screen readers do not announce it. This creates a cognitive burden — users must remember what the field was for while typing.\n\nAnother mistake: associating labels incorrectly. Putting a <label> next to an input without the for/id connection means clicking the label does nothing — the association is purely visual, not programmatic.\n\nInterview tip: \"Why are labels important for accessibility?\" Labels provide programmatic association between form controls and their descriptions. Without them, screen reader users cannot identify what each input is for.`,

        codeExample: `<!-- Explicit label association (preferred) -->\n<label for="email">Email Address</label>\n<input type="email" id="email" name="email" required>\n\n<!-- Wrapping label (also valid) -->\n<label>\n  Password\n  <input type="password" name="password" required>\n</label>\n\n<!-- Radio group with fieldset and legend -->\n<fieldset>\n  <legend>Preferred Contact Method</legend>\n  <input type="radio" id="contact-email" name="contact" value="email">\n  <label for="contact-email">Email</label>\n\n  <input type="radio" id="contact-phone" name="contact" value="phone">\n  <label for="contact-phone">Phone</label>\n\n  <input type="radio" id="contact-text" name="contact" value="text">\n  <label for="contact-text">Text Message</label>\n</fieldset>\n\n<!-- ARIA attributes for enhanced accessibility -->\n<label for="search">Search</label>\n<input type="search" id="search" name="q"\n       aria-describedby="search-hint"\n       aria-required="true">\n<p id="search-hint">Search by name, email, or phone number</p>\n\n<!-- Error message linked via aria-describedby -->\n<label for="age">Age</label>\n<input type="number" id="age" name="age"\n       aria-describedby="age-error"\n       aria-invalid="true">\n<p id="age-error" role="alert">Age must be between 18 and 120</p>\n\n<!-- Input group with visible label -->\n<div class="form-group">\n  <label for="password">Password</label>\n  <input type="password" id="password" name="password"\n         minlength="8" required\n         aria-describedby="password-help">\n  <small id="password-help">At least 8 characters with one uppercase letter</small>\n</div>`,

        language: "html"

      },

      {

        id: "33",

        title: "Select, Datalist & Textarea",

        content: `The <select> element creates a dropdown menu for choosing from predefined options. Each <option> represents a choice, and the selected option's value is submitted with the form. The selected attribute pre-selects an option, and the disabled attribute on <option> makes it unselectable.\n\n<optgroup> groups related options under a non-selectable heading. Use it for long lists — countries grouped by continent, products grouped by category. The label attribute on <optgroup> displays the group name.\n\nThe <datalist> element provides autocomplete suggestions for an <input>. Unlike <select>, users can type custom values — the datalist merely suggests options. This is perfect for search fields where users might pick from common terms or enter their own.\n\nThe <textarea> element creates a multi-line text input for longer content — comments, descriptions, code. The rows and cols attributes set the visible size, but CSS provides better control. The resize property (CSS) controls whether users can drag to resize.\n\n<textarea> preserves whitespace and line breaks — spaces and newlines in the HTML appear in the rendered text. This differs from <input type=\"text\"> which collapses whitespace.\n\nCommon mistake: not setting a name attribute on <select> or <textarea>. Without name, the selected value is not submitted. Another mistake: using <select> for fewer than 5 options — radio buttons are more usable for small choice sets because all options are visible without clicking.\n\nFor textarea, avoid using the value attribute — content goes between the opening and closing tags. Using value on a textarea does not work.\n\nInterview tip: know when to use each — <select> for many options where space is limited, radio buttons for 2-5 options where visibility matters, and <datalist> when users might want custom input alongside suggestions.`,

        codeExample: `<!-- Basic select -->\n<label for="country">Country</label>\n<select id="country" name="country" required>\n  <option value="" disabled selected>Choose a country</option>\n  <option value="us">United States</option>\n  <option value="uk">United Kingdom</option>\n  <option value="ca">Canada</option>\n  <option value="au" selected>Australia</option>\n</select>\n\n<!-- Select with optgroups -->\n<select name="fruit" id="fruit">\n  <optgroup label="Citrus">\n    <option value="orange">Orange</option>\n    <option value="lemon">Lemon</option>\n  </optgroup>\n  <optgroup label="Berries">\n    <option value="strawberry">Strawberry</option>\n    <option value="blueberry">Blueberry</option>\n  </optgroup>\n</select>\n\n<!-- Datalist: autocomplete with custom input -->\n<label for="browser">Browser</label>\n<input type="text" id="browser" name="browser" list="browsers" placeholder="Type or select">\n<datalist id="browsers">\n  <option value="Chrome">\n  <option value="Firefox">\n  <option value="Safari">\n  <option value="Edge">\n  <option value="Opera">\n</datalist>\n\n<!-- Textarea -->\n<label for="bio">Bio</label>\n<textarea id="bio" name="bio" rows="5" cols="50"\n          placeholder="Tell us about yourself..."\n          maxlength="500"></textarea>\n\n<!-- Textarea with specific sizing -->\n<label for="code">Code Snippet</label>\n<textarea id="code" name="code" rows="10"\n          style="font-family: monospace; width: 100%;"\n          placeholder="Paste your code here..."></textarea>`,

        language: "html"

      },

      {

        id: "34",

        title: "Form Validation",

        content: `HTML5 provides built-in form validation that eliminates most JavaScript validation code. When a user submits a form, the browser checks all validation attributes before sending data to the server. This gives instant feedback without network latency.\n\nThe required attribute makes any field mandatory. The browser prevents submission and displays a default error message when a required field is empty. Custom messages are not natively supported — you must use JavaScript's setCustomValidity() method.\n\nPattern validation uses regular expressions. The pattern attribute on an input checks the value against the regex on submission. Always pair pattern with title — the title appears in the default error message, giving users a hint about the expected format.\n\nThe :valid and :invalid CSS pseudo-classes style inputs based on their current validation state. :valid applies when the input meets all constraints, :invalid when it fails any. Use these to provide visual feedback — green borders for valid, red for invalid — without JavaScript.\n\nThe :required and :optional pseudo-classes distinguish required from optional fields. The :in-range and :out-of-range pseudo-classes work with number and date inputs that have min/max constraints.\n\nConstraint validation API: input.validity object contains boolean flags — valid, valueMissing, typeMismatch, patternMismatch, tooLong, tooShort, rangeUnderflow, rangeOverflow, stepMismatch, and customError. This enables precise error handling.\n\nCommon mistake: relying solely on client-side validation. HTML5 validation is a UX enhancement, not security — users can disable JavaScript or modify the DOM. Always validate on the server as well.\n\nAnother mistake: not providing clear error messages. The default browser messages are generic. Use JavaScript to show specific, actionable error messages near the relevant fields.\n\nInterview tip: describe the full validation pipeline — HTML5 attributes provide instant feedback, JavaScript provides custom messages and logic, and server-side validation ensures security.`,

        codeExample: `<!-- Basic validation attributes -->\n<form id="signup" novalidate>\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email" required>\n\n  <label for="password">Password</label>\n  <input type="password" id="password" name="password"\n         required minlength="8"\n         pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"\n         title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters">\n\n  <label for="age">Age</label>\n  <input type="number" id="age" name="age" min="18" max="120" required>\n\n  <label for="website">Website</label>\n  <input type="url" id="website" name="website">\n\n  <button type="submit">Sign Up</button>\n</form>\n\n<!-- CSS validation styling -->\n<style>\n  input:valid {\n    border-color: green;\n  }\n  input:invalid {\n    border-color: red;\n  }\n  input:required:invalid {\n    box-shadow: none;\n  }\n</style>\n\n<!-- JavaScript custom validation -->\n<script>\ndocument.getElementById('signup').addEventListener('submit', function(e) {\n  const password = document.getElementById('password');\n  if (password.validity.patternMismatch) {\n    password.setCustomValidity('Password must have 8+ chars, uppercase, lowercase, and number');\n  } else {\n    password.setCustomValidity('');\n  }\n});\n</script>`,

        language: "html"

      },

      {

        id: "35",

        title: "Why Semantic HTML",

        content: `Semantic HTML means using elements that describe the meaning of content, not just its appearance. The opposite is div soup — using <div> and <span> for everything, with classes like \"header\" and \"footer\" that convey meaning only to developers who read the CSS.\n\nWhy does semantics matter? Three reasons: accessibility, SEO, and maintainability. Screen readers rely on semantic elements to help blind users navigate. When a screen reader encounters <nav>, it announces \"navigation\" and lets the user jump directly to it. A <div class=\"nav\"> tells the screen reader nothing — the user must listen to every element sequentially.\n\nSearch engines crawl semantic HTML to understand page structure. Google uses <article> to identify self-contained content, <nav> to understand navigation, and heading hierarchy (h1-h6) to grasp content importance. Semantic markup directly impacts search rankings.\n\nFor developers, semantic HTML is self-documenting. <main> immediately communicates its purpose, while <div class=\"content-wrapper-main\"> requires reading CSS to understand the role. When teams scale, semantic elements reduce onboarding time.\n\nThe cost of div soup: a page with 50 nested <div>s is invisible to assistive technologies, harder for search engines to index, and confusing for new developers. The fix takes minutes — replace <div class=\"header\"> with <header>, <div class=\"nav\"> with <nav>, <div class=\"footer\"> with <footer>.\n\nCommon mistake: overthinking semantics. You do not need to memorize 100 elements — learn the 15 most common ones (header, nav, main, article, section, aside, footer, figure, figcaption, details, summary, time, mark, data, dialog) and use them consistently.\n\nInterview tip: \"Why use semantic HTML over divs?\" Accessibility for screen readers, better SEO for search engines, and self-documenting code for developers.`,

        codeExample: `<!-- ❌ Div soup: no meaning for machines -->\n<div class="page">\n  <div class="header">\n    <div class="nav">\n      <div class="nav-item"><a href="/">Home</a></div>\n      <div class="nav-item"><a href="/about">About</a></div>\n    </div>\n  </div>\n  <div class="content">\n    <div class="article">\n      <div class="title">My Blog Post</div>\n      <div class="text">Content here...</div>\n    </div>\n    <div class="sidebar">\n      <div class="widget">Related posts</div>\n    </div>\n  </div>\n  <div class="footer">\n    <div class="copyright">© 2024</div>\n  </div>\n</div>\n\n<!-- ✅ Semantic HTML: meaning is clear -->\n<header>\n  <nav aria-label=\"Main\">\n    <ul>\n      <li><a href=\"/\">Home</a></li>\n      <li><a href=\"/about\">About</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <article>\n    <h1>My Blog Post</h1>\n    <p>Content here...</p>\n  </article>\n  <aside aria-label=\"Related\">\n    <h2>Related Posts</h2>\n  </aside>\n</main>\n<footer>\n  <p>© 2024</p>\n</footer>`,

        language: "html"

      },

      {

        id: "36",

        title: "Page Structure Elements",

        content: `HTML5 introduced landmark elements that define page regions. These elements replace the generic <div> pattern and provide built-in semantics that screen readers and search engines understand natively.\n\n<header> represents introductory content or navigation aids. It typically contains logos, navigation, and search forms. A page can have multiple <header> elements — one for the page header and others inside <article> or <section> elements.\n\n<nav> wraps major navigation blocks. Not every group of links needs <nav> — use it for primary navigation, table of contents, and breadcrumbs. Sidebar links and footer links typically do not need <nav>.\n\n<main> contains the dominant content of the <body>. There should be exactly one <main> per page. It must not be nested inside <article>, <aside>, <header>, <footer>, or <nav>.\n\n<article> represents self-contained content that could be distributed independently — a blog post, news story, forum post, or user comment. It makes sense on its own without the surrounding page context.\n\n<section> groups thematic content, typically with a heading. Use <section> when you would add a heading to the content — if the content has no heading, it is probably <div> territory.\n\n<aside> represents content tangentially related to the content around it — sidebars, pull quotes, advertising, and groups of nav links. It can be placed inside <main> or at the page level.\n\n<footer> represents footer information for its nearest ancestor. Like <header>, it can appear at the page level and inside <article> or <section>. Typically contains copyright, contact info, and related links.\n\nCommon mistake: using <section> when you mean <div>. A <section> implies thematic grouping with a heading. If you cannot write a meaningful heading for the content, use <div>.\n\nInterview tip: know the nesting rules — <main> cannot be inside <article>, <aside>, <header>, <footer>, or <nav>. <article> can contain <header>, <footer>, and <section>.`,

        codeExample: `<!-- Complete page structure -->\n<body>\n  <header>\n    <nav aria-label=\"Main\">\n      <a href=\"/\">Logo</a>\n      <ul>\n        <li><a href=\"/home\">Home</a></li>\n        <li><a href=\"/about\">About</a></li>\n        <li><a href=\"/contact\">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n\n  <main>\n    <article>\n      <header>\n        <h1>Blog Post Title</h1>\n        <time datetime=\"2024-01-15\">January 15, 2024</time>\n      </header>\n\n      <section>\n        <h2>Introduction</h2>\n        <p>First section content...</p>\n      </section>\n\n      <section>\n        <h2>Main Content</h2>\n        <p>Detailed explanation...</p>\n      </section>\n\n      <footer>\n        <p>Posted in <a href=\"/tags/html\">HTML</a></p>\n      </footer>\n    </article>\n\n    <aside aria-label=\"Related\">\n      <h2>Related Articles</h2>\n      <ul>\n        <li><a href=\"/post1\">Post 1</a></li>\n        <li><a href=\"/post2\">Post 2</a></li>\n      </ul>\n    </aside>\n  </main>\n\n  <footer>\n    <p>&copy; 2024 My Website. All rights reserved.</p>\n  </footer>\n</body>`,

        language: "html"

      },

      {

        id: "37",

        title: "Content Sectioning",

        content: `HTML5 introduced several content sectioning elements that provide meaning beyond basic structure. These elements handle specific content patterns that previously required JavaScript or non-semantic markup.\n\nThe <figure> and <figcaption> elements pair visual content (images, code blocks, diagrams) with a caption. <figure> is a self-contained reference, and <figcaption> provides its caption. Multiple figures on a page help screen readers identify related image-text pairs.\n\n<details> and <summary> create disclosure widgets — clickable elements that expand or collapse content. The <summary> provides the visible label, and the content inside <details> is hidden until clicked. This replaces common JavaScript accordion patterns with zero code.\n\nThe <dialog> element creates native modal dialogs and popups. Unlike CSS-only modals, <dialog> handles focus trapping, escape key dismissal, and backdrop clicks automatically. The showModal() method displays it as a modal, and show() displays it as an inline dialog.\n\n<mark> highlights text for reference or emphasis. Screen readers may announce highlighted text differently, so use it purposefully — search result keywords, important passages, or text that changed since last visit.\n\n<time> represents a specific date or time in a machine-readable format. The datetime attribute uses ISO 8601 format, ensuring search engines and assistive technologies parse dates correctly regardless of how they are displayed visually.\n\n<data> associates content with a machine-readable value. Use it when the visible text differs from the machine value — displaying \"January\" while the value is \"1\" for sorting purposes.\n\nCommon mistake: using <details> for navigation menus. Disclosure widgets are for optional content, not primary navigation. Use <nav> for navigation.\n\nInterview tip: <dialog> is underutilized — most developers still build modals with JavaScript. Knowing native dialog semantics demonstrates modern HTML knowledge.`,

        codeExample: `<!-- Figure with caption -->\n<figure>\n  <img src=\"chart.png\" alt=\"Sales chart showing 20% growth\">\n  <figcaption>Figure 1: Quarterly sales growth (2024)</figcaption>\n</figure>\n\n<!-- Details/summary: disclosure widget -->\n<details>\n  <summary>Click to expand FAQ</summary>\n  <p>This is the answer to the frequently asked question.</p>\n  <p>It can contain multiple paragraphs and other elements.</p>\n</details>\n\n<!-- Multiple collapsible sections -->\n<details open>\n  <summary>Section 1 (open by default)</summary>\n  <p>Content visible on load.</p>\n</details>\n<details>\n  <summary>Section 2</summary>\n  <p>Hidden until clicked.</p>\n</details>\n\n<!-- Native dialog modal -->\n<dialog id=\"confirm-dialog\">\n  <h2>Confirm Action</h2>\n  <p>Are you sure you want to proceed?</p>\n  <button onclick=\"this.closest('dialog').close('cancel')\">Cancel</button>\n  <button onclick=\"this.closest('dialog').close('confirm')\">Confirm</button>\n</dialog>\n<button onclick=\"document.getElementById('confirm-dialog').showModal()\">Open Dialog</button>\n\n<!-- Mark for highlighting -->\n<p>Search results for \"HTML\":</p>\n<p>Learn <mark>HTML</mark> semantics and build accessible <mark>HTML</mark> forms.</p>\n\n<!-- Time element -->\n<article>\n  <h2>Event Announcement</h2>\n  <p>The conference starts on <time datetime=\"2024-06-15\">June 15th</time>.</p>\n  <p>Doors open at <time datetime=\"09:00\">9 AM</time>.</p>\n</article>\n\n<!-- Data element for machine-readable values -->\n<p>The winner is <data value=\"usa\">United States</data>.</p>`,

        language: "html"

      },

      {

        id: "38",

        title: "Semantic Best Practices",

        content: `Using semantic HTML correctly requires understanding when to use each element and the rules that govern them. These best practices ensure your markup is accessible, maintainable, and standards-compliant.\n\nThe div vs section decision: use <section> when the content has a logical heading. If you can write a meaningful <h2> for the content, use <section>. If the content is purely a container for styling with no thematic grouping, use <div>. A <section> without a heading is semantically incomplete.\n\nHeading hierarchy is critical. Never skip levels — h1 to h3 confuses screen readers that navigate by heading level. Each page should have exactly one <h1> that describes the page topic. Use h2 for major sections, h3 for subsections, and so on down to h6.\n\nLandmark roles are automatically assigned by semantic elements. <header> becomes banner, <nav> becomes navigation, <main> becomes main, <aside> becomes complementary, and <footer> becomes contentinfo. Screen readers let users jump between landmarks — your semantic choices directly affect navigation.\n\nMultiple landmarks of the same type need labels. If you have two <nav> elements, differentiate them with aria-label: <nav aria-label=\"Main\"> and <nav aria-label=\"Footer\">. Without labels, screen reader users hear \"navigation\" twice with no way to distinguish them.\n\nNesting rules matter. <main> cannot be inside <article>, <aside>, <header>, <footer>, or <nav>. <article> can contain <header>, <footer>, and <section>. <section> should not be a direct child of <article> without a heading.\n\nCommon mistake: using ARIA when native HTML works. ARIA is a repair tool, not a first choice. If a native element exists (button, nav, main), use it. ARIA roles like role=\"button\" are for elements that cannot be actual buttons.\n\nInterview tip: demonstrate understanding of the landmark model — screen readers provide shortcuts to navigate by landmark, and your semantic choices determine which landmarks exist.`,

        codeExample: `<!-- Heading hierarchy: never skip levels -->\n<h1>Complete Web Development Guide</h1>\n  <h2>HTML Fundamentals</h2>\n    <h3>Elements and Tags</h3>\n      <h4>Block Elements</h4>\n      <h4>Inline Elements</h4>\n    <h3>Forms and Inputs</h3>\n  <h2>CSS Layout</h2>\n    <h3>Flexbox</h3>\n    <h3>Grid</h3>\n\n<!-- Multiple labeled landmarks -->\n<header aria-label=\"Site\">\n  <nav aria-label=\"Main\">\n    <ul><li><a href=\"/\">Home</a></li></ul>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h1>Article Title</h1>\n    <p>Content...</p>\n  </article>\n\n  <nav aria-label=\"Article pagination\">\n    <a href=\"/prev\">Previous</a>\n    <a href=\"/next\">Next</a>\n  </nav>\n</main>\n\n<footer aria-label=\"Site\">\n  <nav aria-label=\"Footer links\">\n    <ul><li><a href=\"/privacy\">Privacy</a></li></ul>\n  </nav>\n</footer>\n\n<!-- Section with heading (correct) vs div (styling only) -->\n<section aria-labelledby=\"products-heading\">\n  <h2 id=\"products-heading\">Our Products</h2>\n  <div class=\"product-grid\">\n    <div class=\"product-card\">Product 1</div>\n    <div class=\"product-card\">Product 2</div>\n  </div>\n</section>\n\n<!-- ARIA only when native HTML is insufficient -->\n<div role=\"status\" aria-live=\"polite\">Form submitted successfully</div>\n<button aria-label=\"Close dialog\">×</button>`,

        language: "html"

      },

      {

        id: "39",

        title: "HTML5 Video",

        content: `The <video> element embeds video content directly in HTML without plugins. Before HTML5, embedding video required Flash or other third-party plugins — now browsers handle video natively with the <video> element.\n\nThe controls attribute adds play/pause, volume, fullscreen, and seek controls. Without controls, the video is silent and unplayable unless you provide JavaScript. Always include controls unless you have a specific reason to build custom playback UI.\n\nautoplay starts the video immediately on load. Most browsers block autoplay with sound — muted autoplay is allowed. The muted attribute mutes the video by default, and together with autoplay, the video plays silently on load. loop repeats the video when it ends.\n\nThe poster attribute specifies an image displayed before the video plays. Use a meaningful frame or custom thumbnail — the default shows the first frame, which is often black or uninformative.\n\nThe <source> element inside <video> specifies video files with different formats. Browsers try each source in order and play the first one they support. Common formats: MP4 (H.264) for universal support, WebM (VP9) for open-source alternative, and OGG for older browsers.\n\nCommon mistake: providing only one video format. Safari may not support WebM, and older browsers may not support MP4. Always provide at least MP4 and WebM for broad compatibility.\n\nAnother mistake: autoplaying with sound. Users hate unexpected audio, and browsers block it anyway. If you need autoplay, use muted and provide a unmute button.\n\nInterview tip: understand the video encoding tradeoff — MP4 has the best compatibility but largest file size, WebM is smaller and open but less supported, and OGG is for legacy. Always put MP4 first for maximum browser support.`,

        codeExample: `<!-- Basic video with controls -->\n<video src=\"intro.mp4\" controls width=\"640\" height=\"360\">\n  Your browser does not support the video element.\n</video>\n\n<!-- Video with multiple sources for compatibility -->\n<video controls width=\"640\" height=\"360\" poster=\"thumbnail.jpg\">\n  <source src=\"video.mp4\" type=\"video/mp4\">\n  <source src=\"video.webm\" type=\"video/webm\">\n  <source src=\"video.ogv\" type=\"video/ogg\">\n  Your browser does not support the video element.\n</video>\n\n<!-- Autoplay muted with loop -->\n<video autoplay muted loop playsinline width=\"100%\">\n  <source src=\"background.mp4\" type=\"video/mp4\">\n</video>\n\n<!-- Video with poster and multiple attributes -->\n<video controls\n       width=\"800\" height=\"450\"\n       poster=\"https://example.com/poster.jpg\"\n       preload=\"metadata\"\n       crossorigin=\"anonymous\">\n  <source src=\"movie.mp4\" type=\"video/mp4\">\n  <source src=\"movie.webm\" type=\"video/webm\">\n  <track kind=\"subtitles\" src=\"subs_en.vtt\" srclang=\"en\" label=\"English\" default>\n  <track kind=\"subtitles\" src=\"subs_es.vtt\" srclang=\"es\" label=\"Spanish\">\n  <p>Your browser does not support HTML5 video. <a href=\"movie.mp4\">Download the video</a>.</p>\n</video>\n\n<!-- CSS styling for responsive video -->\n<style>\n  video {\n    max-width: 100%;\n    height: auto;\n  }\n</style>`,

        language: "html"

      },

      {

        id: "40",

        title: "HTML5 Audio",

        content: `The <audio> element embeds sound content — music, podcasts, sound effects, and voice recordings. Like <video>, it supports multiple sources and provides native playback controls.\n\nThe controls attribute adds play/pause, volume, and seek controls. Without it, the audio is invisible and unplayable. The autoplay attribute starts playback immediately — browsers block autoplay with sound, so use muted if you need automatic playback.\n\nAudio formats have different browser support. MP3 (MPEG Audio Layer III) is universally supported and the safest choice for broad compatibility. WAV offers uncompressed, lossless quality but produces large files — suitable for short sound effects. OGG (Ogg Vorbis) is open-source and well-supported in Firefox and Chrome but not Safari.\n\nFor podcasts and music, MP3 at 128-192 kbps provides good quality at reasonable file sizes. For sound effects, WAV is acceptable because the files are short. For background music, consider OGG for smaller sizes if you can exclude Safari users.\n\nThe preload attribute hints how much audio to download: none (nothing), metadata (just duration and format), auto (download everything), or auto is the default. Use preload=\"metadata\" to avoid unnecessary bandwidth until the user clicks play.\n\nLoop repeats the audio when it finishes — useful for background music or ambient sounds. The muted attribute starts the audio silent — combine with autoplay for background music that users can unmute.\n\nCommon mistake: providing only OGG format. Safari does not support OGG audio. Always include MP4/AAC or MP3 as a fallback.\n\nAnother mistake: autoplaying audio on page load. This drives users away immediately. If you need background music, start it muted with a visible unmute button.\n\nInterview tip: know the format tradeoffs — MP3 for compatibility, WAV for quality, OGG for size. Always provide MP3 as a fallback.`,

        codeExample: `<!-- Basic audio player -->\n<audio controls src=\"podcast.mp3\">\n  Your browser does not support the audio element.\n</audio>\n\n<!-- Audio with multiple sources -->\n<audio controls preload=\"metadata\">\n  <source src=\"music.mp3\" type=\"audio/mpeg\">\n  <source src=\"music.ogg\" type=\"audio/ogg\">\n  <source src=\"music.wav\" type=\"audio/wav\">\n  Your browser does not support the audio element.\n</audio>\n\n<!-- Background music: autoplay, muted, loop -->\n<audio autoplay muted loop>\n  <source src=\"ambient.mp3\" type=\"audio/mpeg\">\n  <source src=\"ambient.ogg\" type=\"audio/ogg\">\n</audio>\n\n<!-- Sound effect with controls -->\n<audio id=\"notification-sound\" preload=\"auto\">\n  <source src=\"notification.mp3\" type=\"audio/mpeg\">\n  <source src=\"notification.ogg\" type=\"audio/ogg\">\n</audio>\n<button onclick=\"document.getElementById('notification-sound').play()\">\n  Play Notification\n</button>\n\n<!-- Multiple audio tracks -->\n<section aria-label=\"Audio tracks\">\n  <h3>Episode 1</h3>\n  <audio controls preload=\"none\">\n    <source src=\"ep1.mp3\" type=\"audio/mpeg\">\n    <source src=\"ep1.ogg\" type=\"audio/ogg\">\n  </audio>\n\n  <h3>Episode 2</h3>\n  <audio controls preload=\"none\">\n    <source src=\"ep2.mp3\" type=\"audio/mpeg\">\n    <source src=\"ep2.ogg\" type=\"audio/ogg\">\n  </audio>\n</section>`,

        language: "html"

      },

      {

        id: "41",

        title: "Iframes & Embedding",

        content: `The <iframe> element embeds another HTML document within the current page. It creates a browsing context — a nested browser window that loads content from a URL or inline HTML. Common uses include embedding YouTube videos, Google Maps, payment forms, and third-party widgets.\n\nThe src attribute specifies the URL to embed. Width and height set the dimensions in pixels or percentages. The title attribute is required for accessibility — screen readers announce it to describe the iframe's purpose.\n\nThe sandbox attribute restricts what the embedded content can do. Without sandbox, the embedded page has full access — it can execute scripts, submit forms, and navigate the parent page. With sandbox=\"\", all restrictions apply by default. You can selectively allow features: sandbox=\"allow-scripts allow-same-origin\" allows JavaScript and same-origin requests.\n\nThe allow attribute controls feature policies — camera, microphone, geolocation, payment, and more. This provides fine-grained control over what the embedded content can access.\n\nThe loading attribute supports lazy loading: loading=\"defers loading until the iframe scrolls into view, reducing initial page load. loading=\"eager\" loads immediately.\n\nFor responsive iframes, use the aspect-ratio CSS property or the padding-bottom trick. A 16:9 video iframe: style=\"width:100%; aspect-ratio:16/9\".\n\nCommon mistake: embedding untrusted content without sandbox. A sandboxed iframe prevents the embedded page from accessing the parent page's cookies, localStorage, and DOM. Always sandbox third-party content.\n\nAnother mistake: omitting the title attribute. Screen readers announce \"iframe\" with no context — users cannot determine the iframe's purpose.\n\nInterview tip: understand the security model — iframes create isolated browsing contexts, but same-origin policy still applies. Two iframes on different origins cannot access each other's DOM.`,

        codeExample: `<!-- YouTube video embed -->\n<iframe\n  width=\"560\"\n  height=\"315\"\n  src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\"\n  title=\"YouTube video player\"\n  frameborder=\"0\"\n  allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"\n  allowfullscreen>\n</iframe>\n\n<!-- Google Maps embed -->\n<iframe\n  width=\"100%\"\n  height=\"450\"\n  style=\"border:0\"\n  loading=\"lazy\"\n  allowfullscreen\n  referrerpolicy=\"no-referrer-when-downgrade\"\n  src=\"https://www.google.com/maps/embed?pb=...\"\n  title=\"Google Maps location\">\n</iframe>\n\n<!-- Sandboxed third-party widget -->\n<iframe\n  src=\"https://third-party-widget.com/embed\"\n  title=\"Customer reviews widget\"\n  sandbox=\"allow-scripts allow-same-origin\"\n  loading=\"lazy\"\n  width=\"100%\"\n  height=\"400\">\n</iframe>\n\n<!-- Responsive iframe with aspect ratio -->\n<div style=\"max-width: 800px; margin: 0 auto;\">\n  <iframe\n    src=\"https://example.com/chart\"\n    title=\"Sales chart\"\n    style=\"width:100%; aspect-ratio:16/9; border:0;\"\n    loading=\"lazy\">\n  </iframe>\n</div>\n\n<!-- Inline iframe for isolated content -->\n<iframe srcdoc=\"<html><body><h2>Sandboxed Content</h2><p>This HTML is inline.</p></body></html>\"\n        title=\"Inline sandboxed content\"\n        sandbox>\n</iframe>`,

        language: "html"

      },

      {

        id: "42",

        title: "SVG in HTML",

        content: `SVG (Scalable Vector Graphics) defines vector images using XML markup. Unlike raster formats (PNG, JPG), SVGs scale to any size without losing quality — making them ideal for logos, icons, charts, and responsive designs.\n\nInline SVG means writing SVG code directly in your HTML. This gives you full control with CSS and JavaScript — you can style individual shapes, animate elements, and respond to user events. The tradeoff is increased HTML size and complexity.\n\nThe <img> tag embeds SVG as an external file: <img src=\"logo.svg\" alt=\"Logo\">. This is simpler but prevents CSS styling and JavaScript interaction. Use this for decorative SVGs that do not need manipulation.\n\nBasic SVG shapes: <rect> creates rectangles, <circle> creates circles, <ellipse> creates ellipses, <line> creates straight lines, <polyline> creates connected line segments, <polygon> creates closed shapes, and <path> creates complex custom shapes.\n\nThe <text> element adds text to SVG. Unlike HTML text, SVG text can follow paths, rotate freely, and use vector effects. The x and y attributes position the text, and font properties work like CSS.\n\nThe viewBox attribute defines the coordinate system — viewBox=\"0 0 100 100\" creates a 100x100 coordinate space that scales to fit the SVG element. This is the key to responsive SVGs — combine viewBox with width=\"100%\" and the SVG scales to its container.\n\nCommon mistake: embedding raster images in SVG. SVGs should contain vector elements, not <image> tags with PNG/JPG files. The purpose of SVG is scalability — embedding a raster defeats the purpose.\n\nAnother mistake: not setting width and height on inline SVGs. Without dimensions, the SVG may collapse to 0x0 or overflow its container.\n\nInterview tip: know when to use inline SVG (interactive, styled, animated) vs img tag (decorative, static) vs CSS background-image (purely decorative, no accessibility needed).`,

        codeExample: `<!-- Inline SVG: fully styleable -->\n<svg width=\"200\" height=\"200\" viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\">\n  <!-- Rectangle -->\n  <rect x=\"10\" y=\"10\" width=\"80\" height=\"60\" fill=\"#3498db\" rx=\"8\"/>\n\n  <!-- Circle -->\n  <circle cx=\"150\" cy=\"40\" r=\"30\" fill=\"#e74c3c\"/>\n\n  <!-- Line -->\n  <line x1=\"10\" y1=\"100\" x2=\"190\" y2=\"100\" stroke=\"#2c3e50\" stroke-width=\"2\"/>\n\n  <!-- Text -->\n  <text x=\"100\" y=\"140\" text-anchor=\"middle\" font-size=\"16\" fill=\"#333\">\n    Hello SVG\n  </text>\n\n  <!-- Path: complex shapes -->\n  <path d=\"M10 160 Q100 120 190 160\" stroke=\"#9b59b6\" stroke-width=\"3\" fill=\"none\"/>\n</svg>\n\n<!-- SVG as image (no CSS/JS control) -->\n<img src=\"logo.svg\" alt=\"Company Logo\" width=\"150\" height=\"50\">\n\n<!-- Inline SVG with CSS styling -->\n<svg class=\"icon\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n  <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z\" fill=\"currentColor\"/>\n</svg>\n\n<style>\n  .icon { fill: #27ae60; transition: fill 0.2s; }\n  .icon:hover { fill: #2ecc71; }\n</style>\n\n<!-- SVG with animation -->\n<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\">\n  <circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"#3498db\">\n    <animate attributeName=\"r\" values=\"20;30;20\" dur=\"2s\" repeatCount=\"indefinite\"/>\n  </circle>\n</svg>`,

        language: "html"

      },

      {

        id: "43",

        title: "HTML Coding Standards",

        content: `Clean, consistent HTML is not just about aesthetics — it directly impacts maintainability, collaboration, and debugging. The foundation starts with proper indentation: use two or four spaces consistently (never mix tabs and spaces). This makes the document hierarchy immediately visible when scanning code. Every opening tag must have a closing tag except void elements like \`<br>\`, \`<img>\`, and \`<input>\`. Unclosed tags cause rendering bugs that are difficult to track down because browsers silently try to fix them, often producing unexpected results.\n\nAlways use lowercase tag names and attribute names. HTML5 is case-insensitive, but lowercase is the universal convention — \`<DIV>\` and \`<div>\` both work, but mixing cases creates confusion and looks unprofessional. Attribute values must always be quoted with either single or double quotes, though double quotes are the standard. Without quotes, attributes containing spaces break: \`<div class=my class>\` becomes invalid.\n\nThe \`<!DOCTYPE html>\` declaration at the top is mandatory. Without it, browsers enter quirks mode and render your page using outdated rules. The W3C Validator at validator.w3.org catches errors you might miss — run your HTML through it regularly. Common mistakes include missing closing tags, improperly nested elements like \`<p><strong>text</p></strong>\` (the inner tag must close first), and using \`<div>\` for everything when semantic elements exist. Always validate before deployment to catch structural issues early.`,

        codeExample: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Clean HTML Example</title>\n</head>\n<body>\n  <!-- Proper indentation: 2 spaces per level -->\n  <header>\n    <nav aria-label="Main navigation">\n      <ul>\n        <li><a href="/">Home</a></li>\n        <li><a href="/about">About</a></li>\n      </ul>\n    </nav>\n  </header>\n\n  <main>\n    <article>\n      <h1>Article Title</h1>\n      <p>This paragraph is properly nested and indented.</p>\n    </article>\n  </main>\n\n  <footer>\n    <p>&copy; 2024 My Website</p>\n  </footer>\n</body>\n</html>`,

        language: "html"

      },

      {

        id: "44",

        title: "Performance Optimization",

        content: `HTML performance directly affects user experience and SEO rankings. The DOM tree is the single biggest factor — every nested element adds to parsing time and memory usage. Flattening your DOM by reducing unnecessary wrapper \`<div>\`s can cut render time significantly. A deep DOM with 15+ levels forces the browser to perform more layout calculations, while a shallow structure with semantic elements renders faster.\n\nLazy loading images is now built into HTML with the \`loading=\"lazy\"\` attribute. Images below the fold load only when the user scrolls near them, reducing initial page load time by up to 50% on image-heavy pages. Always specify \`width\` and \`height\` attributes on \`<img>\` tags to prevent layout shifts — the browser reserves the correct space before the image loads.\n\nScript loading strategy matters enormously. The \`async\` attribute downloads the script in parallel and executes it immediately when ready — useful for analytics or ads. The \`defer\` attribute downloads in parallel but executes after HTML parsing completes — the safer choice for most scripts because it ensures the DOM is ready. Blocking scripts without either attribute halt parsing entirely, causing visible delays.\n\nResource hints like \`<link rel=\"preconnect\">\` tell the browser to establish early connections to critical third-party domains. \`<link rel=\"preload\">\` loads critical resources immediately rather than waiting for the parser to discover them. Use these for fonts, key CSS, and vital API endpoints to shave hundreds of milliseconds off load time.`,

        codeExample: `<!-- Lazy loading images -->\n<img src=\"hero.jpg\" alt=\"Hero banner\" width=\"1200\" height=\"600\">\n<img src=\"below-fold.jpg\" alt=\"Content image\" width=\"800\" height=\"400\"\n     loading=\"lazy\">\n\n<!-- Async vs Defer scripts -->\n<script src=\"analytics.js\" async></script>\n<script src=\"app.js\" defer></script>\n\n<!-- Preconnect to critical third-party domains -->\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://cdn.example.com\">\n\n<!-- Preload critical resources -->\n<link rel=\"preload\" href=\"fonts/main.woff2\" as=\"font\" type=\"font/woff2\"\n      crossorigin>\n<link rel=\"preload\" href=\"critical.css\" as=\"style\">\n\n<!-- Prefetch resources for next navigation -->\n<link rel=\"prefetch\" href=\"/next-page.html\">\n\n<!-- DNS Prefetch for less critical domains -->\n<link rel=\"dns-prefetch\" href=\"https://ads.example.com\">`,

        language: "html"

      },

      {

        id: "45",

        title: "SEO Fundamentals",

        content: `Search Engine Optimization begins with HTML — the markup you write directly determines how search engines understand and rank your page. The \`<title>\` tag is the single most important on-page SEO element. It appears in search results as the clickable headline, in browser tabs, and in bookmarks. Keep it under 60 characters, front-load the primary keyword, and make each page unique. A generic title like \"Home\" wastes your best ranking opportunity.\n\nThe meta description does not directly affect rankings but dramatically impacts click-through rates. Write a compelling 150-160 character summary that includes the target keyword and gives users a reason to click. Google may rewrite your description if it deems it irrelevant, so make it genuinely useful.\n\nHeading hierarchy matters for both accessibility and SEO. One \`<h1>\` per page containing the primary keyword, followed by \`<h2>\`s for major sections and \`<h3>\`s for subsections. Search engines use this hierarchy to understand content structure and topical relevance. Image \`alt\` text serves dual purposes: accessibility for screen readers and image SEO. Describe the image content and include keywords naturally — never keyword-stuff.\n\nOpen Graph meta tags control how your page appears when shared on social media. Without them, Facebook, LinkedIn, and Twitter display whatever they guess from your content. The \`og:title\`, \`og:description\`, and \`og:image\` tags ensure consistent, professional sharing cards. Always include a 1200x630 pixel image for social previews — the standard recommended size.`,

        codeExample: `<head>\n  <!-- Primary SEO tags -->\n  <title>HTML Best Practices Guide | Complete Tutorial 2024</title>\n  <meta name=\"description\"\n        content=\"Learn HTML best practices including coding standards,\n                 performance optimization, and SEO fundamentals.\n                 Complete guide with real examples.\">\n\n  <!-- Open Graph for social media -->\n  <meta property=\"og:title\" content=\"HTML Best Practices Guide\">\n  <meta property=\"og:description\"\n        content=\"Complete guide to writing clean, fast, SEO-friendly HTML.\">\n  <meta property=\"og:image\" content=\"https://example.com/og-image.jpg\">\n  <meta property=\"og:url\" content=\"https://example.com/html-best-practices\">\n  <meta property=\"og:type\" content=\"article\">\n\n  <!-- Twitter Card -->\n  <meta name=\"twitter:card\" content=\"summary_large_image\">\n  <meta name=\"twitter:title\" content=\"HTML Best Practices Guide\">\n  <meta name=\"twitter:description\"\n        content=\"Complete guide to clean, fast, SEO-friendly HTML.\">\n  <meta name=\"twitter:image\" content=\"https://example.com/twitter-card.jpg\">\n\n  <!-- Canonical URL -->\n  <link rel=\"canonical\" href=\"https://example.com/html-best-practices\">\n</head>`,

        language: "html"

      },

      {

        id: "46",

        title: "Security Basics",

        content: `HTML security vulnerabilities affect every web application. Cross-Site Scripting (XSS) is the most common attack — malicious scripts injected into your page through user input that is not properly escaped. If a comment field accepts \`<script>steal(cookies)</script>\` and your page renders it without escaping, every visitor becomes a victim. Always escape user input: convert \`<\` to \`&lt;\`, \`>\` to \`&gt;\`, \`\"\` to \`&quot;\`, and \`&\` to \`&amp;\`. Never trust client-side data.\n\nContent Security Policy (CSP) is your defense-in-depth layer against XSS. The \`<meta http-equiv=\"Content-Security-Policy\">\` header or HTTP response header restricts which scripts, styles, and resources the browser can load. A strict policy like \`script-src 'self'\` blocks all inline scripts and external sources, neutralizing most XSS attacks. Start restrictive and relax only as needed.\n\nIframes are a security risk when embedding untrusted content. The \`sandbox\` attribute restricts what the iframe can do — disable scripts, forms, and popups unless explicitly allowed. Without sandbox, an attacker-controlled iframe can redirect your page, access cookies, or perform actions on behalf of your users.\n\nHTTPS is non-negotiable. Browsers mark HTTP sites as \"Not Secure\", users distrust them, and search engines penalize them. HTTPS encrypts data in transit, preventing man-in-the-middle attacks. Use the \`Strict-Transport-Security\` header to force HTTPS and the \`X-Content-Type-Options: nosniff\` header to prevent MIME type sniffing attacks.`,

        codeExample: `<!-- Never render unescaped user input -->\n<!-- WRONG: allows XSS -->\n<!-- <div id=\"comments\"></div> -->\n\n<!-- RIGHT: escaped user content -->\n<div id=\"comments\">\n  <p>User said: &lt;script&gt;alert('xss')&lt;/script&gt;</p>\n</div>\n\n<!-- Content Security Policy -->\n<meta http-equiv=\"Content-Security-Policy\"\n      content=\"default-src 'self';\n               script-src 'self' https://cdn.example.com;\n               style-src 'self' 'unsafe-inline';\n               img-src 'self' data: https:;\">\n\n<!-- Secure iframe with sandbox -->\n<iframe src=\"https://untrusted-site.com\"\n        sandbox=\"allow-scripts allow-same-origin\"\n        width=\"600\" height=\"400\"\n        title=\"Embedded content\"></iframe>\n\n<!-- Security headers via meta tags -->\n<meta http-equiv=\"X-Content-Type-Options\" content=\"nosniff\">\n<meta http-equiv=\"X-Frame-Options\" content=\"DENY\">\n<meta http-equiv=\"Referrer-Policy\" content=\"strict-origin-when-cross-origin\">\n<meta http-equiv=\"Permissions-Policy\"\n      content=\"camera=(), microphone=(), geolocation=()\">`,

        language: "html"

      },

      {

        id: "47",

        title: "HTML Element Reference",

        content: `HTML elements fall into distinct categories, and knowing which category an element belongs to tells you where it can be placed and what content it can contain. Metadata elements live in the \`<head>\` and define how the document behaves — \`<title>\`, \`<meta>\`, \`<link>\`, \`<style>\`, and \`<script>\`. These are never visible to users directly but control rendering, SEO, and resource loading.\n\nContent sectioning elements define the document outline and layout — \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`, and \`<footer>\`. These semantic containers replace the generic \`<div>\` for structural purposes and are essential for accessibility and SEO. Screen readers use them as landmarks for navigation.\n\nInline text elements modify text without creating new blocks — \`<a>\`, \`<strong>\`, \`<em>\`, \`<code>\`, \`<span>\`, \`<abbr>\`, \`<time>\`, and \`<mark>\`. They flow within paragraphs and other inline contexts. Container elements like \`<div>\` and \`<span>\` are generic wrappers with no inherent semantic meaning — use them only when no semantic alternative exists.\n\nInteractive elements include \`<button>\`, \`<a>\`, \`<input>\`, \`<select>\`, \`<textarea>\`, and \`<details>\`. Form elements like \`<form>\`, \`<input>\`, \`<label>\`, \`<fieldset>\`, and \`<legend>\` handle user data collection. Self-closing (void) elements have no content and no closing tag — \`<img>\`, \`<br>\`, \`<hr>\`, \`<input>\`, \`<meta>\`, \`<link>\`, \`<source>\`, \`<area>\`, and \`<col>\`. Understanding these categories prevents invalid nesting and ensures your HTML is structurally sound.`,

        codeExample: `<!-- Metadata elements (head only) -->\n<head>\n  <title>Page Title</title>\n  <meta charset=\"UTF-8\">\n  <link rel=\"stylesheet\" href=\"style.css\">\n  <script src=\"app.js\" defer></script>\n</head>\n\n<!-- Content sectioning -->\n<header>Site header with navigation</header>\n<nav aria-label=\"Main\">Navigation links</nav>\n<main>\n  <article>Primary content</article>\n  <aside>Related sidebar content</aside>\n</main>\n<footer>Site footer</footer>\n\n<!-- Inline text elements -->\n<p>Text with <strong>bold</strong>, <em>italic</em>, and <code>code</code>.</p>\n\n<!-- Void (self-closing) elements -->\n<img src=\"photo.jpg\" alt=\"Photo\">\n<br>\n<hr>\n<input type=\"text\" placeholder=\"Type here\">\n<meta name=\"viewport\" content=\"width=device-width\">\n\n<!-- Container elements -->\n<div class=\"wrapper\">Generic container</div>\n<span class=\"highlight">Inline wrapper</span>`,

        language: "html"

      },

      {

        id: "48",

        title: "HTML Attribute Reference",

        content: `Global attributes work on every HTML element and provide universal functionality. The \`id\` attribute assigns a unique identifier — only one element per page can have a given id. It enables direct JavaScript access via \`document.getElementById()\` and CSS targeting with \`#id\`. The \`class\` attribute groups elements for shared styling and behavior — multiple elements can share a class, and one element can have multiple space-separated classes.\n\nThe \`style\` attribute applies inline CSS directly to an element. While useful for quick testing, inline styles override external stylesheets and make maintenance difficult — avoid them in production. The \`data-*\` attribute family stores custom data on elements: \`<div data-user-id=\"42\" data-role=\"admin\">\`. JavaScript accesses these via \`element.dataset.userId\`, making them invaluable for component-based frameworks.\n\nEvent handler attributes like \`onclick\`, \`onmouseover\`, \`onkeydown\`, and \`onfocus\` attach JavaScript directly to elements. While functional, they mix HTML and JavaScript and should be replaced with \`addEventListener()\` in modern code. The \`tabindex\` attribute controls keyboard navigation order — use \`tabindex=\"0\"\` to make non-interactive elements focusable, and \`tabindex=\"-1\"\` to remove elements from tab order.\n\nForm-specific attributes control input behavior: \`required\` prevents form submission if empty, \`placeholder\` shows hint text, \`pattern\` enforces validation with regex, \`min\` and \`max\` set numeric ranges, and \`readonly\` prevents editing without disabling the field. The \`disabled\` attribute completely prevents interaction and excludes the field from form submission. The \`hidden\` attribute removes elements from rendering and accessibility tree — equivalent to \`display: none\` in CSS.`,

        codeExample: `<!-- Global attributes -->\n<div id=\"main-content\" class=\"container primary\"\n     data-user-id=\"42\" data-role=\"admin\"\n     style=\"padding: 20px;\"\n     hidden>\n  Content here\n</div>\n\n<!-- Event handler attributes (use addEventListener instead) -->\n<button onclick=\"alert('Clicked!')\">Click Me</button>\n<input onfocus=\"this.style.borderColor='blue'\" type=\"text\">\n\n<!-- Keyboard navigation -->\n<div tabindex=\"0\" role=\"button\" onkeypress=\"handleKey(event)\">\n  Focusable div\n</div>\n\n<!-- Form attributes -->\n<form>\n  <input type=\"email\" required placeholder=\"user@example.com\"\n         pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$\">\n  <input type=\"number\" min=\"1\" max=\"100\" step=\"5\" value=\"50\">\n  <input type=\"text\" readonly value=\"Cannot edit this\">\n  <input type=\"text\" disabled value=\"Disabled field\">\n  <select required>\n    <option value=\"\">Choose one</option>\n    <option value=\"1\">Option 1</option>\n  </select>\n  <button type=\"submit\">Submit</button>\n</form>`,

        language: "html"

      },

      {

        id: "49",

        title: "HTML Colors & Media",

        content: `HTML supports colors in three formats: named colors, HEX, and RGB/HSL. Named colors are human-readable keywords — \`red\`, \`blue\`, \`green\`, \`coral\`, \`steelblue\`. There are 147 named colors defined in the HTML specification, from common ones like \`black\` and \`white\` to obscure ones like \`darkslategray\` and \`lightgoldenrodyellow\`. Named colors are convenient for prototyping but limited — you cannot express a specific brand color with them.\n\nHEX colors use hexadecimal notation: \`#RRGGBB\` where each pair represents red, green, and blue intensity (00-FF). \`#FF0000\` is pure red, \`#00FF00\` is pure green, \`#FFFFFF\` is white, and \`#000000\` is black. Short-hand HEX like \`#F00\` expands to \`#FF0000\`. HEX is compact and familiar to designers — most color pickers output HEX values.\n\nRGB and HSL formats offer more flexibility. \`rgb(255, 0, 0)\` is equivalent to \`#FF0000\`. Modern CSS also supports \`rgba()\` and \`hsla()\` for transparency: \`rgba(255, 0, 0, 0.5)\` creates a semi-transparent red. HSL (Hue, Saturation, Lightness) is more intuitive for humans: \`hsl(0, 100%, 50%)\` is red. HSL makes it easy to create color variations by adjusting only the lightness or saturation.\n\nColor contrast is critical for accessibility. WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. The WebAIM Contrast Checker tool lets you test your color combinations. Poor contrast makes text unreadable for users with visual impairments and fails accessibility audits. Always verify your color choices against WCAG standards.\n\nFor images, use \`<img>\` with \`srcset\` for responsive delivery — serve different image sizes based on device pixel ratio. The \`<picture>\` element provides art direction, allowing different crops or formats for different screen sizes. Use WebP format when possible — it offers 25-35% smaller file sizes than JPEG with comparable quality.`,

        codeExample: `<!-- Named colors -->\n<p style=\"color: red;\">Red text</p>\n<p style=\"color: coral;\">Coral text</p>\n<p style=\"background-color: lightgoldenrodyellow;\">Light goldenrod</p>\n\n<!-- HEX colors -->\n<p style=\"color: #FF0000;\">HEX red</p>\n<p style=\"color: #F00;\">Short HEX red</p>\n<p style=\"background-color: #1a1a2e; color: #eee;\">Dark background</p>\n\n<!-- RGB colors -->\n<p style=\"color: rgb(0, 128, 255);\">RGB blue</p>\n<p style=\"background-color: rgba(255, 0, 0, 0.3);\">Semi-transparent red</p>\n\n<!-- HSL colors -->\n<p style=\"color: hsl(120, 100%, 30%);\">HSL green</p>\n<p style=\"background-color: hsla(210, 80%, 60%, 0.8);\">HSLA blue</p>\n\n<!-- Responsive images with srcset -->\n<img src=\"photo-800.jpg\"\n     srcset=\"photo-400.jpg 400w,\n             photo-800.jpg 800w,\n             photo-1200.jpg 1200w\"\n     sizes=\"(max-width: 600px) 400px, 800px\"\n     alt=\"Responsive landscape photo\">\n\n<!-- Picture element for art direction -->\n<picture>\n  <source media=\"(min-width: 800px)\" srcset=\"wide-banner.webp\"\n          type=\"image/webp\">\n  <source media=\"(min-width: 800px)\" srcset=\"wide-banner.jpg\">\n  <img src=\"mobile-banner.jpg\" alt=\"Banner image\">\n</picture>`,

        language: "html"

      },

    ],

  },

{
  slug: "python-complete",

  title: "Python Complete",

  description: "Comprehensive Python course from variables to databases — 30 lessons covering everything you need.",

  icon: "🐍",

  color: "from-blue-500 to-green-600",

  category: "Languages",

  lessons: [
      {
        id: "py-1",
        title: "Python Introduction",
        content: `n\n- What is Python?\n- Why Learn Python?\n- Installing Python\n- Running Python (Interactive Shell, Script, IDLE, VS Code)\n- Your First Program (\`print\`)\n- Using the Python Interpreter\n\n**Example:**\n[Code]`,
        codeExample: `print(\"Hello, World!\")`,
        language: "python"
      },

      {
        id: "py-2",
        title: "Variables and Data Types",
        content: `s\n- Variable Assignment\n- Naming Rules and Conventions\n- Data Types: int, float, str, bool\n- \`type()\` Function\n- Type Conversion (\`int()\`, \`float()\`, \`str()\`, \`bool()\`)\n- \`input()\` Function\n\n**Example:**\n[Code]`,
        codeExample: `name = \"Alice\"\nage = 25\nheight = 5.6\nis_student = True`,
        language: "python"
      },

      {
        id: "py-3",
        title: "Operators",
        content: `s\n- Arithmetic Operators (\`+\`, \`-\`, \`*\`, \`/\`, \`//\`, \`%\`, \`**\`)\n- Comparison Operators (\`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`)\n- Logical Operators (\`and\`, \`or\`, \`not\`)\n- Assignment Operators (\`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`)\n- Ternary Operator\n\n**Example:**\n[Code]`,
        codeExample: `a = 10\nb = 3\nprint(a + b)\nprint(a // b)\nprint(a % b)\nprint(a ** b)`,
        language: "python"
      },

      {
        id: "py-4",
        title: "Strings",
        content: `s\n- Creating Strings (single, double, triple quotes)\n- String Indexing and Slicing\n- String Methods (\`upper()\`, \`lower()\`, \`strip()\`, \`split()\`, \`join()\`, \`replace()\`, \`find()\`)\n- String Concatenation\n- String Formatting (f-strings, \`.format()\`, \`%\` operator)\n- String Length (\`len()\`)\n\n**Example:**\n[Code]`,
        codeExample: `name = \"Alice\"\nprint(name.upper())\nprint(f\"Hello, {name}!\")`,
        language: "python"
      },

      {
        id: "py-5",
        title: "Numbers and Math",
        content: `h\n- Built-in Math Functions (\`abs()\`, \`round()\`, \`pow()\`, \`min()\`, \`max()\`, \`sum()\`)\n- The \`math\` Module\n- Random Numbers (\`random\` module)\n- Integer Division vs Float Division\n- Type Conversion Between int and float\n\n**Example:**\n[Code]`,
        codeExample: `import math\nprint(math.sqrt(16))\nprint(round(3.14159, 2))\nprint(abs(-7))`,
        language: "python"
      },

      {
        id: "py-6",
        title: "Boolean Logic and Comparison",
        content: `n\n- Boolean Values (\`True\`, \`False\`)\n- Comparison Operators\n- Logical Operators (\`and\`, \`or\`, \`not\`)\n- Truthy and Falsy Values\n- Identity Operators (\`is\`, \`is not\`)\n- Membership Operators (\`in\`, \`not in\`)\n\n**Example:**\n[Code]`,
        codeExample: `age = 20\nprint(age >= 18 and age < 120)\nprint(\"a\" in \"Python\")\nprint(0 == False)`,
        language: "python"
      },

      {
        id: "py-7",
        title: "Print Formatting",
        content: `g\n- \`print()\` with Multiple Arguments\n- Separator and End Parameters (\`sep\`, \`end\`)\n- f-Strings (Formatted String Literals)\n- \`.format()\` Method\n- Old-Style \`%\` Formatting\n- String Alignment (\`ljust()\`, \`rjust()\`, \`center()\`)\n\n**Example:**\n[Code]`,
        codeExample: `name = \"Alice\"\nage = 25\nprint(f\"Name: {name}, Age: {age}\")\nprint(\"Name: {}, Age: {}\".format(name, age))\nprint(f\"{name:<10} | {age:>5}\")`,
        language: "python"
      },

      {
        id: "py-8",
        title: "f-Strings Deep Dive",
        content: `e\n- Basic Interpolation\n- Expression Evaluation in f-Strings\n- Format Specifiers (\`.2f\`, \`:>10\`, \`:05d\`)\n- Calling Methods Inside f-Strings\n- Nested f-Strings\n\n**Example:**\n[Code]`,
        codeExample: `price = 19.99\nprint(f\"The price is \${price:.2f}\")\nprint(f\"Result: {price * 2:.1f}\")\nprint(f\"{'hello'.upper()}\")`,
        language: "python"
      },

      {
        id: "py-9",
        title: "Lists",
        content: `s\n- Creating Lists\n- Accessing Elements by Index\n- Slicing Lists\n- Common Methods (\`append()\`, \`insert()\`, \`remove()\`, \`pop()\`, \`sort()\`, \`reverse()\`, \`clear()\`)\n- List Length (\`len()\`)\n- Iterating Over Lists (\`for\` loop, \`while\` loop)\n- List Comprehension\n- Nested Lists\n- Copying Lists (shallow vs deep)\n\n**Example:**\n[Code]`,
        codeExample: `fruits = [\"apple\", \"banana\", \"orange\"]\nfruits.append(\"grape\")\nfor fruit in fruits:\n    print(fruit)\nsquares = [x**2 for x in range(1, 6)]`,
        language: "python"
      },

      {
        id: "py-10",
        title: "Tuples",
        content: `s\n- Creating Tuples\n- Accessing Elements by Index\n- Tuple Immutability\n- Tuple Methods (\`count()\`, \`index()\`)\n- Tuple Unpacking\n- Nested Tuples\n- When to Use Tuples vs Lists\n\n**Example:**\n[Code]`,
        codeExample: `coordinates = (10, 20)\nx, y = coordinates\nprint(x, y)`,
        language: "python"
      },

      {
        id: "py-11",
        title: "Dictionaries",
        content: `s\n- Creating Dictionaries\n- Accessing Values by Key\n- Adding and Updating Key-Value Pairs\n- Removing Items (\`del\`, \`pop()\`, \`clear()\`)\n- Dictionary Methods (\`keys()\`, \`values()\`, \`items()\`, \`get()\`, \`update()\`)\n- Iterating Over Dictionaries\n- Nested Dictionaries\n- Dictionary Comprehension\n\n**Example:**\n[Code]`,
        codeExample: `student = {\"name\": \"Alice\", \"age\": 25, \"grade\": \"A\"}\nprint(student[\"name\"])\nfor key, value in student.items():\n    print(f\"{key}: {value}\")`,
        language: "python"
      },

      {
        id: "py-12",
        title: "Sets",
        content: `s\n- Creating Sets\n- Set Operations (\`union\`, \`intersection\`, \`difference\`, \`symmetric_difference\`)\n- Adding and Removing Elements (\`add()\`, \`remove()\`, \`discard()\`)\n- Set Comprehension\n- Frozensets (immutable sets)\n- When to Use Sets\n\n**Example:**\n[Code]`,
        codeExample: `a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a | b)       # union\nprint(a & b)       # intersection\nprint(a - b)       # difference`,
        language: "python"
      },

      {
        id: "py-13",
        title: "Conditionals \u2014 if/elif/else",
        content: `e\n- \`if\` Statement\n- \`elif\` (else if)\n- \`else\`\n- Nested Conditionals\n- Ternary Operator (One-Line if/else)\n- Truthy and Falsy Values in Conditionals\n\n**Example:**\n[Code]`,
        codeExample: `score = 85\nif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"\nelse:\n    grade = \"C\"\n\nresult = \"Pass\" if score >= 50 else \"Fail\"`,
        language: "python"
      },

      {
        id: "py-14",
        title: "Loops \u2014 for",
        content: `r\n- \`for\` Loop with \`range()\`\n- Iterating Over Lists, Tuples, Dictionaries\n- \`enumerate()\` for Index and Value\n- \`break\` and \`continue\`\n- \`else\` Clause on Loops\n- Nested Loops\n\n**Example:**\n[Code]`,
        codeExample: `for i in range(1, 6):\n    print(i)\n\nfor index, fruit in enumerate([\"apple\", \"banana\", \"orange\"]):\n    print(f\"{index}: {fruit}\")`,
        language: "python"
      },

      {
        id: "py-15",
        title: "Loops \u2014 while",
        content: `e\n- \`while\` Loop\n- Infinite Loops\n- \`break\` and \`continue\` in while Loops\n- \`else\` Clause on while Loops\n- Loop Control Patterns\n\n**Example:**\n[Code]`,
        codeExample: `count = 0\nwhile count < 5:\n    print(count)\n    count += 1`,
        language: "python"
      },

      {
        id: "py-16",
        title: "Function Basics",
        content: `s\n- Function Definition (\`def\`)\n- Parameters and Arguments\n- Return Values (\`return\`)\n- Default Parameter Values\n- Keyword Arguments\n- \`*args\` and \`**kwargs\`\n- Docstrings\n\n**Example:**\n[Code]`,
        codeExample: `def greet(name, greeting=\"Hello\"):\n    \"\"\"Returns a greeting message.\"\"\"\n    return f\"{greeting}, {name}!\"\n\nprint(greet(\"Alice\"))\nprint(greet(\"Bob\", greeting=\"Hi\"))`,
        language: "python"
      },

      {
        id: "py-17",
        title: "Scope andLambda",
        content: `a\n- Local vs Global Variables\n- \`global\` Keyword\n- \`nonlocal\` Keyword\n- Lambda Functions\n- \`map()\`, \`filter()\`, \`sorted()\` with Lambdas\n- Variable Scope Rules (LEGB)\n\n**Example:**\n[Code]`,
        codeExample: `x = 10\ndef my_func():\n    x = 5\n    return x\n\ndouble = lambda x: x * 2\nnumbers = [3, 1, 4, 1, 5]\nsorted_numbers = sorted(numbers, key=lambda x: -x)`,
        language: "python"
      },

      {
        id: "py-18",
        title: "Reading Files",
        content: `s\n- Opening Files (\`open()\`)\n- \`with\` Statement\n- \`read()\`, \`readline()\`, \`readlines()\`\n- File Modes (\`r\`, \`r+\`, \`rb\`)\n- Iterating Over Lines in a File\n\n**Example:**\n[Code]`,
        codeExample: `with open(\"data.txt\", \"r\") as file:\n    content = file.read()\n    print(content)`,
        language: "python"
      },

      {
        id: "py-19",
        title: "Writing Files",
        content: `s\n- Writing Files (\`\"w\"\`, \`\"a\"\`, \`\"x\"\` modes)\n- \`write()\` Method\n- \`writelines()\` Method\n- Overwriting vs Appending\n- Creating Directories (\`os.makedirs()\`)\n\n**Example:**\n[Code]`,
        codeExample: `with open(\"output.txt\", \"w\") as file:\n    file.write(\"Hello, World!\\n\")\n    file.write(\"Second line\\n\")`,
        language: "python"
      },

      {
        id: "py-20",
        title: "CSV and JSON Files",
        content: `s\n- Reading and Writing CSV Files (\`csv\` module)\n- Reading and Writing JSON Files (\`json\` module)\n- \`json.dump()\` and \`json.load()\`\n- Converting Between Python Objects and JSON\n\n**Example:**\n[Code]`,
        codeExample: `import json\ndata = {\"name\": \"Alice\", \"age\": 25}\nwith open(\"data.json\", \"w\") as file:\n    json.dump(data, file)`,
        language: "python"
      },

      {
        id: "py-21",
        title: "Classes and Objects",
        content: `s\n- Defining Classes (\`class\`)\n- Creating Objects (Instances)\n- The \`__init__()\` Constructor\n- Instance Attributes and \`self\`\n- Instance Methods\n- The \`__str__()\` and \`__repr__()\` Methods\n\n**Example:**\n[Code]`,
        codeExample: `class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n\n    def bark(self):\n        return f\"{self.name} says woof!\"\n\nmy_dog = Dog(\"Rex\", \"Labrador\")\nprint(my_dog.bark())`,
        language: "python"
      },

      {
        id: "py-22",
        title: "Inheritance and Polymorphism",
        content: `m\n- Inheritance (\`super()\`)\n- Method Overriding\n- The \`isinstance()\` Function\n- Multiple Inheritance\n- Polymorphism\n- Abstract Classes (\`abc\` module)\n\n**Example:**\n[Code]`,
        codeExample: `class Animal:\n    def sound(self):\n        return \"Some sound\"\n\nclass Dog(Animal):\n    def sound(self):\n        return \"Bark\"\n\nmy_dog = Dog()\nprint(my_dog.sound())`,
        language: "python"
      },

      {
        id: "py-23",
        title: "Encapsulation and Properties",
        content: `s\n- Public, Protected, and Private Attributes (\`_\`, \`__\`)\n- Getter and Setter Methods\n- The \`@property\` Decorator\n- Data Validation in Setters\n- Name Mangling\n\n**Example:**\n[Code]`,
        codeExample: `class BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance\n\n    @property\n    def balance(self):\n        return self.__balance\n\n    @balance.setter\n    def balance(self, value):\n        if value >= 0:\n            self.__balance = value`,
        language: "python"
      },

      {
        id: "py-24",
        title: "Importing Modules",
        content: `s\n- \`import\` Statement\n- \`from ... import\`\n- \`import ... as\` (Alias)\n- The \`standard library\` (os, math, random, datetime, json)\n- Installing Third-Party Packages (\`pip\`)\n\n**Example:**\n[Code]`,
        codeExample: `import math\nfrom random import randint\nimport datetime as dt`,
        language: "python"
      },

      {
        id: "py-25",
        title: "Creating Your Own Modules",
        content: `s\n- Creating a \`.py\` File as a Module\n- The \`__name__\` Variable\n- The \`__all__\` List\n- \`__init__.py\` in Packages\n- Organizing Code into Packages\n\n**Example:**\n[Code]`,
        codeExample: `# mymodule.py\ndef greet(name):\n    return f\"Hello, {name}!\"\n\n# main.py\nfrom mymodule import greet\nprint(greet(\"Alice\"))`,
        language: "python"
      },

      {
        id: "py-26",
        title: "Try/Except/Finally",
        content: `y\n- \`try\` and \`except\` Blocks\n- Specific Exception Types (\`ValueError\`, \`TypeError\`, \`FileNotFoundError\`)\n- \`else\` Clause\n- \`finally\` Clause\n- Raising Exceptions (\`raise\`)\n- Custom Exceptions\n\n**Example:**\n[Code]`,
        codeExample: `try:\n    num = int(input(\"Enter a number: \"))\nexcept ValueError:\n    print(\"That's not a valid number!\")\nfinally:\n    print(\"This always runs.\")`,
        language: "python"
      },

      {
        id: "py-27",
        title: "List Comprehensions and Generators",
        content: `s\n- List Comprehension Syntax\n- Nested List Comprehensions\n- Generator Functions (\`yield\`)\n- Generator Expressions\n- Memory Efficiency of Generators\n\n**Example:**\n[Code]`,
        codeExample: `squares = [x**2 for x in range(10)]\nsquares_gen = (x**2 for x in range(10))`,
        language: "python"
      },

      {
        id: "py-28",
        title: "Decorators",
        content: `s\n- What is a Decorator?\n- Creating a Simple Decorator\n- Decorators with Arguments\n- \`@functools.wraps\`\n- Common Built-in Decorators (\`@staticmethod\`, \`@classmethod\`, \`@property\`)\n\n**Example:**\n[Code]`,
        codeExample: `def decorator(func):\n    def wrapper(*args, **kwargs):\n        print(\"Before function call\")\n        result = func(*args, **kwargs)\n        print(\"After function call\")\n        return result\n    return wrapper`,
        language: "python"
      },

      {
        id: "py-29",
        title: "Working with APIs",
        content: `s\n- What is an API?\n- Making HTTP Requests (\`requests\` library)\n- JSON Responses (\`json\` module)\n- REST APIs (GET, POST)\n- Error Handling for API Requests\n\n**Example:**\n[Code]`,
        codeExample: `import requests\nresponse = requests.get(\"https://api.github.com\")\ndata = response.json()`,
        language: "python"
      },

      {
        id: "py-30",
        title: "Introduction to Databases with Python",
        content: `n\n- SQLite Basics (\`sqlite3\` module)\n- Connecting to a Database\n- Creating Tables\n- Inserting, Querying, Updating, Deleting Records\n- Parameterized Queries (SQL Injection Prevention)\n\n**Example:**\n[Code]`,
        codeExample: `import sqlite3\nconn = sqlite3.connect(\"mydb.db\")\ncursor = conn.cursor()\ncursor.execute(\"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)\")\ncursor.execute(\"INSERT INTO users (name) VALUES (?)\", (\"Alice\",))\nconn.commit()\nconn.close()`,
        language: "python"
      }
  ]
},

{
  slug: "css",
  title: "CSS",
  description: "Master CSS from selectors and box model to Flexbox, Grid, and responsive design.",
  icon: "🎨",
  color: "from-blue-400 to-purple-600",
  category: "Languages",
  lessons: [
    {
      id: "css-1",
      title: "CSS Basics",
      content: `## What is CSS?

CSS (Cascading Style Sheets) is the language that controls how HTML elements look. While HTML structures content (headings, paragraphs, images), CSS handles colors, fonts, spacing, layout, and responsive design.

Think of HTML as the skeleton and CSS as the skin and clothes. Without CSS, every webpage would look like a plain Word document.

### How CSS Works

CSS follows a simple syntax: **selector + declaration block**. A selector targets an HTML element, and the declaration block contains property-value pairs.

\`\`\`css
selector {
  property: value;
  another-property: another-value;
}
\`\`\`

### Three Ways to Add CSS

1. **Inline** — directly on the element (avoid this):
   \`<p style="color: red;">Hello</p>\`

2. **Internal** — in a \`<style>\` tag inside \`<head>\`:
   \`<style> p { color: red; } </style>\`

3. **External** — a separate \`.css\` file linked via \`<link>\` (best practice):
   \`<link rel="stylesheet" href="styles.css">\`

External stylesheets are always preferred — they keep style separate from structure, can be cached by browsers, and apply across multiple pages.

### The Cascade

The "C" in CSS stands for Cascading. When multiple rules target the same element, CSS resolves conflicts using:
1. **Specificity** — \`#id\` beats \`.class\` beats \`element\`
2. **Source order** — later rules override earlier ones
3. **Importance** — \`!important\` overrides everything (avoid using it)

### Common Beginner Mistakes
- Forgetting the semicolon at the end of a declaration
- Using inline styles instead of external stylesheets
- Not understanding that CSS specificity determines which rule wins`,
      codeExample: `/* External stylesheet: styles.css */

/* Element selector — targets all <h1> */
h1 {
  color: #2d3748;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

/* Class selector — targets any element with class="card" */
.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* ID selector — targets the element with id="hero" */
#hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

/* Comma grouping — same style for multiple selectors */
h1, h2, h3 {
  font-family: 'Georgia', serif;
  line-height: 1.2;
}

/* Descendant selector — targets all <a> inside <nav> */
nav a {
  text-decoration: none;
  color: #4a5568;
}

/* Pseudo-class — styles on state change */
nav a:hover {
  color: #667eea;
  text-decoration: underline;
}

/* Pseudo-element — inserts virtual content */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
  color: #667eea;
}

/* Attribute selector */
a[target="_blank"]::after {
  content: " ↗";
}

/* Combined selectors */
.card.highlighted {
  border: 2px solid #667eea;
}

/* Universal reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`,
      language: "css"
    },
    {
      id: "css-2",
      title: "CSS Selectors",
      content: `## Selectors — Targeting HTML Elements

Selectors are the foundation of CSS. They tell the browser which elements to style. Mastering selectors means writing less, cleaner CSS.

### Basic Selectors

| Selector | Syntax | Targets | Specificity |
|----------|--------|---------|-------------|
| Element | \`p\` | All \`<p>\` elements | Low (0,0,1) |
| Class | \`.box\` | Elements with \`class="box"\` | Medium (0,1,0) |
| ID | \`#main\` | The element with \`id="main"\` | High (1,0,0) |
| Universal | \`*\` | Every element | None (0,0,0) |

### Combinators

| Combinator | Example | Meaning |
|------------|---------|---------|
| Descendant | \`div p\` | All \`<p>\` inside \`<div>\` (any depth) |
| Child | \`ul > li\` | Direct \`<li>\` children of \`<ul>\` |
| Adjacent sibling | \`h2 + p\` | First \`<p>\` right after \`<h2>\` |
| General sibling | \`h2 ~ p\` | All \`<p>\` after \`<h2>\` (same parent) |

### Pseudo-Classes

Pseudo-classes target elements based on state or position:

\`:hover\` — when mouse is over the element
\`:active\` — when element is being clicked
\`:focus\` — when element has keyboard focus
\`:first-child\` — the first child of its parent
\`:last-child\` — the last child of its parent
\`:nth-child(odd)\` — odd-positioned children (1st, 3rd, 5th...)
\`:nth-child(3n)\` — every 3rd child
\`:not(.active)\` — elements that do NOT have class "active"

### Pseudo-Elements

Pseudo-elements create virtual elements that don't exist in the HTML:

\`::before\` — inserts content before the element's content
\`::after\` — inserts content after the element's content
\`::first-line\` — targets the first line of text
\`::first-letter\` — targets the first letter
\`::selection\` — targets highlighted/selected text
\`::placeholder\` — styles input placeholder text

### Specificity Rules

Specificity is calculated as (ID, Class, Element):
- \`#nav .link a\` → (1, 1, 1) = beats \`div p\` → (0, 0, 2)
- \`!important\` overrides everything — use sparingly
- Same specificity? The last rule wins (source order)

### Common Mistakes
- Using \`#id\` for styling when \`.class\` would be more reusable
- Overusing \`!important\` — it creates specificity wars you can't win
- Forgetting that pseudo-classes need a colon (\`:\`), not two (\`::\`)`,
      codeExample: `/* Basic selectors */
p { color: #333; }               /* all paragraphs */
.container { max-width: 1200px; } /* class */
#header { background: #fff; }     /* id */

/* Descendant vs Child */
nav a { color: blue; }       /* all links inside nav, any depth */
nav > a { color: red; }      /* only direct child links of nav */

/* Adjacent sibling */
h2 + p { margin-top: 0; }    /* paragraph immediately after h2 */

/* Pseudo-classes */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f5f5f5; }
li:nth-child(3n) { color: #e53e3e; }

/* Dynamic states */
button:hover { background: #4299e1; }
button:active { transform: scale(0.98); }
input:focus { outline: 2px solid #667eea; }

/* :not pseudo-class */
.nav-item:not(.active) { opacity: 0.6; }

/* Pseudo-elements */
.quote::before {
  content: open-quote;
  font-size: 3em;
  line-height: 0;
  vertical-align: -0.4em;
  margin-right: 0.1em;
}

.card::after {
  content: "New";
  background: #e53e3e;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
}

::selection {
  background: #667eea;
  color: white;
}

/* Attribute selectors */
a[href^="https"]::after { content: " 🔗"; }
input[type="email"] { border-left: 3px solid #4299e1; }`,
      language: "css"
    },
    {
      id: "css-3",
      title: "CSS Fonts and Text",
      content: `## Typography in CSS

Typography makes or breaks a design. Good typography improves readability, establishes hierarchy, and creates visual rhythm.

### Font Families

\`font-family\` specifies which font to use. Browsers fall back to the next font if the previous one isn't available:

\`\`\`css
font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
\`\`\`

Always end with a generic family (\`serif\`, \`sans-serif\`, \`monospace\`) as a fallback.

### Font Sizes

- **Pixels** (\`16px\`) — absolute, precise
- **Rems** (\`1rem\`) — relative to root font size (preferred for accessibility)
- **Ems** (\`1em\`) — relative to parent font size

Best practice: set \`html { font-size: 16px; }\` and use \`rem\` for everything. This makes the entire layout scalable.

### Line Height

\`line-height\` controls the space between lines. This is the single most important typography property for readability.

\`\`\`css
body { line-height: 1.6; }  /* Recommended: 1.4-1.8 for body text */
\`\`\`

Use unitless values — they scale with font size.

### Text Properties

- \`text-align\`: \`left\`, \`center\`, \`right\`, \`justify\`
- \`text-decoration\`: \`none\`, \`underline\`, \`line-through\`
- \`text-transform\`: \`uppercase\`, \`lowercase\`, \`capitalize\`
- \`letter-spacing\`: space between characters
- \`word-spacing\`: space between words
- \`text-shadow\`: adds shadow to text

### Google Fonts

\`\`\`html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
\`\`\``,
      codeExample: `/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

/* Base typography */
html {
  font-size: 16px;  /* 1rem = 16px */
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1rem;          /* 16px */
  line-height: 1.6;         /* 25.6px line height */
  color: #2d3748;
  -webkit-font-smoothing: antialiased;
}

/* Heading hierarchy */
h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.5rem;       /* 40px */
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  color: #1a202c;
}

h2 {
  font-size: 1.75rem;      /* 28px */
  font-weight: 600;
  margin-bottom: 0.75rem;
}

/* Paragraph */
p {
  margin-bottom: 1rem;
  max-width: 65ch;  /* ~65 characters per line — optimal readability */
}

/* Links */
a {
  color: #4299e1;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

a:hover {
  border-bottom-color: #4299e1;
}

/* Text utilities */
.text-center { text-align: center; }
.text-uppercase { text-transform: uppercase; letter-spacing: 0.05em; }
.text-sm { font-size: 0.875rem; }  /* 14px */
.text-muted { color: #718096; }

/* Drop cap example */
.article p:first-of-type::first-letter {
  font-size: 3.5em;
  font-weight: 700;
  float: left;
  line-height: 1;
  margin-right: 0.1em;
  color: #667eea;
}

/* Blockquote */
blockquote {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 1.25rem;
  border-left: 4px solid #667eea;
  padding-left: 1.5rem;
  margin: 2rem 0;
  color: #4a5568;
}`,
      language: "css"
    },
    {
      id: "css-4",
      title: "The Box Model",
      content: `## Every Element Is a Box

The CSS box model is the most important concept to understand. Every HTML element is a rectangular box with four areas:

1. **Content** — the text, image, or child elements
2. **Padding** — transparent space inside the border
3. **Border** — a visible (or invisible) line around the padding
4. **Margin** — transparent space outside the border

### The \`box-sizing\` Problem

By default, \`width\` only sets the content width. If you set \`width: 300px\` and \`padding: 20px\`, the actual rendered width is 340px.

The fix: \`box-sizing: border-box\` makes \`width\` include padding and border. Now \`width: 300px\` always renders at 300px.

\`\`\`css
*, *::before, *::after { box-sizing: border-box; }
\`\`\`

Every modern CSS reset starts with this line.

### Margin Collapse

Vertical margins between adjacent elements collapse — the larger margin wins instead of adding. A \`margin-bottom: 30px\` on one element and \`margin-top: 20px\` on the next produces 30px of space, not 50px.

Margin collapse only happens vertically, never horizontally. It doesn't happen inside flex containers or grid items.

### Centering with Margin Auto

\`margin: 0 auto;\` centers a block element horizontally. The element must have a defined width for this to work.`,
      codeExample: `/* Universal box-sizing reset — ALWAYS include this */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Basic card with all box model properties */
.card {
  width: 300px;             /* content width */
  padding: 1.5rem;          /* 24px inside */
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin: 1rem auto;        /* centered horizontally */
  /* Total rendered width = 300px (border-box) */
}

/* Nested box model */
.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  margin: -1.5rem -1.5rem 1rem; /* negative margin to break out */
}

/* Shorthand padding */
padding: 10px;                    /* all sides */
padding: 10px 20px;               /* top/bottom left/right */
padding: 10px 20px 15px;          /* top left/right bottom */
padding: 10px 20px 15px 5px;      /* top right bottom left */

/* Outline vs Border */
input:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;  /* space between border and outline */
  /* outline doesn't take up space — it won't shift layout */
}

/* Responsive box model */
.container {
  width: min(90%, 1200px);  /* 90% viewport or 1200px max */
  margin: 0 auto;
  padding: 0 1rem;
}`,
      language: "css"
    },
    {
      id: "css-5",
      title: "Colors in CSS",
      content: `## Color Systems in CSS

Color sets mood, creates hierarchy, and guides the eye. CSS offers multiple color formats.

### Color Formats

| Format | Example | When to Use |
|--------|---------|-------------|
| Named | \`red\`, \`coral\` | Quick prototyping, 148 names |
| HEX | \`#FF5733\` | Most common, compact |
| RGB | \`rgb(255, 87, 51)\` | When you need decimal values |
| RGBA | \`rgba(255, 87, 51, 0.5)\` | RGB + transparency |
| HSL | \`hsl(14, 100%, 60%)\` | Most intuitive — Hue, Saturation, Lightness |
| HSLA | \`hsla(14, 100%, 60%, 0.5)\` | HSL + transparency |

### HSL — The Best Format

- **Hue** (0-360): the color wheel angle
- **Saturation** (0-100%): how vivid — 0% is gray, 100% is pure color
- **Lightness** (0-100%): how bright — 0% is black, 50% is normal, 100% is white

To create a color palette: pick one hue, then vary saturation and lightness. This guarantees visual harmony.

### Color Variables (CSS Custom Properties)

\`\`\`css
:root {
  --primary: #667eea;
  --text: #2d3748;
  --bg: #ffffff;
}

.button {
  background: var(--primary);
  color: var(--bg);
}
\`\`\`

### Accessibility — Color Contrast

WCAG 2.1 requires:
- **Normal text**: contrast ratio ≥ 4.5:1 against background
- **Large text** (≥18px bold or ≥24px): ≥ 3:1
- **UI components**: ≥ 3:1`,
      codeExample: `/* CSS Custom Properties for theming */
:root {
  --primary: #667eea;
  --primary-dark: #5a67d8;
  --secondary: #ed8936;
  --success: #48bb78;
  --danger: #f56565;
  --text: #2d3748;
  --bg: #ffffff;
}

/* All color formats */
.hex { color: #FF5733; }
.rgb { color: rgb(255, 87, 51); }
.rgba { background: rgba(102, 126, 234, 0.1); }
.hsl { color: hsl(225, 77%, 66%); }
.hsla { background: hsla(225, 77%, 66%, 0.15); }

/* HSL palette — same hue, different lightness */
.primary-50  { background: hsl(225, 77%, 95%); }
.primary-100 { background: hsl(225, 77%, 90%); }
.primary-500 { background: hsl(225, 77%, 55%); }
.primary-700 { background: hsl(225, 77%, 35%); }

/* Transparent overlays */
.overlay { background: rgba(0, 0, 0, 0.5); }
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
}

/* currentColor — inherits text color */
.icon { color: var(--primary); }
.icon svg { fill: currentColor; }`,
      language: "css"
    },
    {
      id: "css-6",
      title: "Backgrounds",
      content: `## Backgrounds — More Than Just Colors

Backgrounds create depth, set mood, and draw attention. CSS gives you powerful background options beyond a simple color.

### Background Properties

| Property | Purpose | Example Values |
|----------|---------|----------------|
| \`background-color\` | Solid color | \`#667eea\` |
| \`background-image\` | Image or gradient | \`url('bg.jpg')\` |
| \`background-size\` | How the image scales | \`cover\`, \`contain\` |
| \`background-position\` | Where the image sits | \`center\`, \`top left\` |
| \`background-repeat\` | Tiling behavior | \`no-repeat\` |

### \`cover\` vs \`contain\`

- **cover** — fills the entire container, may crop the image
- **contain** — fits the entire image inside, may leave empty space

### CSS Gradients

Gradients are \`background-image\` values:

- **Linear gradient**: \`linear-gradient(to right, red, blue)\`
- **Radial gradient**: \`radial-gradient(circle, red, blue)\`
- **Conic gradient**: \`conic-gradient(red, yellow, green, blue)\`

### Multiple Backgrounds

\`\`\`css
background: url('overlay.png'), linear-gradient(to bottom, transparent, #000);
\`\`\`

The first image listed appears on top.`,
      codeExample: `/* Hero section with overlay */
.hero {
  background: 
    linear-gradient(135deg, rgba(102,126,234,0.8) 0%, rgba(118,75,162,0.8) 100%),
    url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;  /* parallax effect */
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

/* Gradient button */
.btn-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

/* Text gradient */
.gradient-text {
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3rem;
  font-weight: 700;
}

/* Diagonal stripe pattern */
.pattern-bg {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(102,126,234,0.05) 10px,
    rgba(102,126,234,0.05) 20px
  );
}

/* Responsive background */
.cover-bg {
  background-image: url('photo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`,
      language: "css"
    },
    {
      id: "css-7",
      title: "Display Property",
      content: `## Display — How Elements Flow

\`display\` controls how an element generates boxes and participates in layout.

### The Three Core Display Values

| Value | Behavior | Examples |
|-------|----------|----------|
| \`block\` | Takes full width, starts on new line | \`div\`, \`p\`, \`h1-h6\`, \`section\` |
| \`inline\` | Flows with text, ignores width/height | \`span\`, \`a\`, \`strong\`, \`em\` |
| \`inline-block\` | Inline flow but accepts width/height | Custom buttons, badges |

### Block Elements

Block elements always start on a new line and stretch to fill their container's width. You can set width, height, margin, and padding on all sides.

### Inline Elements

Inline elements flow within text like words. They do NOT respond to \`width\` or \`height\` — only horizontal padding and margin work.

### Inline-Block

The hybrid: flows inline but behaves like a block internally. It accepts width, height, and all margins/padding.

### \`display: none\` vs \`visibility: hidden\`

- **\`none\`** — element is removed from the DOM entirely. Takes no space.
- **\`visibility: hidden\`** — element is invisible but still occupies its space.`,
      codeExample: `/* Block — full width, new line */
.block-example {
  display: block;
  width: 200px;
  background: #667eea;
  color: white;
  padding: 1rem;
  margin-bottom: 0.5rem;
}

/* Inline — flows like text, ignores width/height */
.inline-example {
  display: inline;
  width: 200px;       /* IGNORED */
  height: 50px;       /* IGNORED */
  background: #48bb78;
  padding: 0.5rem;
}

/* Inline-block — inline flow + block dimensions */
.inline-block-example {
  display: inline-block;
  width: 150px;
  height: 80px;
  background: #ed8936;
  color: white;
  text-align: center;
  line-height: 80px;  /* vertical centering */
  margin: 0.25rem;
  border-radius: 8px;
}

/* none vs visibility hidden */
.hidden-gone { display: none; }      /* removed from layout */
.hidden-space { visibility: hidden; } /* invisible but keeps space */

/* Badge */
.badge {
  display: inline-block;
  min-width: 1.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  background: #e53e3e;
  color: white;
}`,
      language: "css"
    },
    {
      id: "css-8",
      title: "Flexbox",
      content: `## Flexbox — One-Dimensional Layout

Flexbox is the go-to layout system for aligning items in a single row or column.

### How Flexbox Works

Set \`display: flex\` on a container — its direct children become **flex items** positioned along two axes:

- **Main axis** — the primary direction (horizontal by default)
- **Cross axis** — perpendicular to the main axis (vertical by default)

### Container Properties

| Property | Values | Effect |
|----------|--------|--------|
| \`flex-direction\` | \`row\`, \`column\`, \`row-reverse\`, \`column-reverse\` | Direction of main axis |
| \`flex-wrap\` | \`nowrap\`, \`wrap\`, \`wrap-reverse\` | Allow items to wrap |
| \`justify-content\` | \`flex-start\`, \`center\`, \`space-between\`, \`space-around\`, \`space-evenly\` | Spacing along main axis |
| \`align-items\` | \`flex-start\`, \`center\`, \`stretch\`, \`baseline\` | Alignment along cross axis |
| \`gap\` | \`1rem\`, \`10px 20px\` | Space between items |

### Item Properties

| Property | Effect |
|----------|--------|
| \`flex-grow\` | How much an item grows to fill space |
| \`flex-shrink\` | How much an item shrinks |
| \`flex-basis\` | Starting size before growing/shrinking |
| \`flex\` | Shorthand: \`flex: grow shrink basis\` |
| \`align-self\` | Override \`align-items\` for one item |
| \`order\` | Visual order (default 0, lower = earlier) |

### The Magic of \`flex: 1\`

\`flex: 1\` means \`flex: 1 1 0%\` — grow equally, shrink equally, start from zero width. All items share space equally.`,
      codeExample: `/* Flex container */
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Equal-width columns */
.equal-cols {
  display: flex;
  gap: 1rem;
}
.col {
  flex: 1;  /* each column takes equal space */
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
}

/* Sidebar + main layout */
.layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 250px;
  flex-shrink: 0;
  background: #1a202c;
  color: white;
  padding: 1rem;
}
.main {
  flex: 1;
  padding: 2rem;
}

/* Centering everything */
.center-all {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Card row that wraps */
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.card-row .card {
  flex: 1 1 300px;  /* grow, shrink, base width 300px */
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Footer pinned to bottom */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content { flex: 1; }`,
      language: "css"
    },
    {
      id: "css-9",
      title: "CSS Grid",
      content: `## CSS Grid — Two-Dimensional Layout

Grid is the most powerful CSS layout system. While Flexbox handles one dimension (row OR column), Grid handles both simultaneously.

### Grid Fundamentals

\`display: grid\` turns an element into a grid container. Its children become grid items placed into a grid of rows and columns.

### Defining Columns and Rows

\`\`\`css
grid-template-columns: 200px 1fr 2fr;   /* 3 columns */
grid-template-rows: 100px auto 1fr;     /* 3 rows */
\`\`\`

- **\`fr\`** (fraction): distributes remaining space proportionally
- **\`px\`**, **\`rem\`**: fixed sizes
- **\`auto\`**: sizes to content

### The \`repeat()\` Function

\`\`\`css
grid-template-columns: repeat(3, 1fr);    /* 3 equal columns */
\`\`\`

### The \`minmax()\` Function

\`minmax(200px, 1fr)\` means: at least 200px, at most 1fr.

\`\`\`css
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
\`\`\`

Creates as many 300px+ columns as will fit. On 1200px: 3 columns. On 800px: 2. On 400px: 1. All automatic.

### Grid Template Areas

\`\`\`css
grid-template-areas:
  "header header header"
  "sidebar main   main"
  "footer footer footer";
\`\`\`

### Grid vs Flexbox

- **Grid**: page-level layouts, 2D, rows AND columns
- **Flexbox**: component-level, 1D, row OR column`,
      codeExample: `/* Basic 3-column grid */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Responsive — no media queries */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Page layout with named areas */
.page-layout {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar content content"
    "footer  footer  footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header  { grid-area: header; background: #1a202c; color: white; padding: 1rem; }
.sidebar { grid-area: sidebar; background: #2d3748; color: white; padding: 1rem; }
.content { grid-area: content; padding: 2rem; }
.footer  { grid-area: footer; background: #edf2f7; padding: 1rem; text-align: center; }

/* Spanning columns */
.featured {
  grid-column: 1 / -1;  /* span all columns */
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 3rem;
  text-align: center;
}

/* Image gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
}
.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

/* Dashboard */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.stat-card.wide { grid-column: span 2; }`,
      language: "css"
    },
    {
      id: "css-10",
      title: "Media Queries",
      content: `## Responsive Design with Media Queries

Media queries let CSS respond to the device's characteristics — primarily screen width.

### How Media Queries Work

\`\`\`css
@media (min-width: 768px) {
  /* styles that apply only when viewport is ≥ 768px */
}
\`\`\`

### Mobile-First vs Desktop-First

**Mobile-first** (recommended):
\`\`\`css
/* Base styles = mobile styles */
.container { padding: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}
\`\`\`

Why mobile-first? Mobile devices have less CPU power and bandwidth. Starting with simpler mobile styles and progressively enhancing is more performant.

### Common Breakpoints

| Device | Width |
|--------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Laptop | 1024px - 1280px |
| Desktop | > 1280px |

### Viewport Meta Tag

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1">
\`\`\`

Without it, mobile browsers render the page at 960px and shrink it.`,
      codeExample: `/* Mobile-first base styles */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

.container {
  width: 100%;
  padding: 0 1rem;
}

/* Navigation */
.nav {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: white;
}
.nav-links {
  display: none;  /* hidden on mobile */
  list-style: none;
  gap: 1rem;
}
.nav-toggle { display: block; cursor: pointer; }

/* Grid: 1 column on mobile */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

h1 { font-size: 1.75rem; }

/* ===== Tablet (≥640px) ===== */
@media (min-width: 640px) {
  .container { max-width: 640px; margin: 0 auto; }
  .card-grid { grid-template-columns: repeat(2, 1fr); }
  h1 { font-size: 2rem; }
}

/* ===== Laptop (≥1024px) ===== */
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
  .nav { flex-direction: row; justify-content: space-between; align-items: center; }
  .nav-links { display: flex; }
  .nav-toggle { display: none; }
  .card-grid { grid-template-columns: repeat(3, 1fr); }
  h1 { font-size: 2.5rem; }
}

/* ===== Desktop (≥1280px) ===== */
@media (min-width: 1280px) {
  .container { max-width: 1200px; }
  h1 { font-size: 3rem; }
}

/* Print */
@media print {
  .nav, .footer { display: none; }
  body { font-size: 12pt; color: black; }
}

/* Clamp — smooth responsive typography */
.hero-title {
  font-size: clamp(1.5rem, 4vw, 3rem);
}`,
      language: "css"
    }
  ]
},

{
  slug: "c",
  title: "C Programming",
  description: "Master C programming from variables and pointers to memory management and file handling.",
  icon: "📘",
  color: "from-gray-500 to-gray-700",
  category: "Languages",
  lessons: [
    {
      id: "c-1",
      title: "Getting Started with C",
      content: `## What is C?

C is a general-purpose, procedural programming language created by Dennis Ritchie at Bell Labs in 1972. It has been the foundation of modern computing — operating systems (Linux, Windows, macOS kernels), databases (MySQL, PostgreSQL), compilers, and embedded systems are all written in C.

### Why Learn C?

1. **Understanding how computers work** — C gives you direct access to memory and hardware
2. **Performance** — no runtime overhead, no garbage collector
3. **Foundation for other languages** — C++, Java, Python, Go, Rust all borrow from C
4. **Embedded systems** — microcontrollers, IoT devices, firmware
5. **Operating systems** — the Linux kernel is ~28 million lines of C

### Your First C Program

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

**Line by line:**
- \`#include <stdio.h>\` — imports the Standard I/O library (printf lives here)
- \`int main()\` — the entry point. Every C program starts here
- \`printf("Hello, World!\\n");\` — prints text to the console
- \`return 0;\` — tells the OS the program ran successfully

### Compiling and Running

C is a **compiled language** — you must compile it before running:

\`\`\`bash
gcc hello.c -o hello    # compile
./hello                 # run
\`\`\`

Common compiler flags:
- \`gcc -Wall -Wextra\` — enable all warnings
- \`gcc -o name\` — set output filename
- \`gcc -std=c11\` — use C11 standard

### Common Mistakes
- Forgetting \`#include <stdio.h>\` — printf won't work
- Using \`printf\` without \`\\n\` — output may not flush
- Forgetting \`return 0;\` — C99+ defaults to 0, but explicit is better`,
      codeExample: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("Welcome to C programming!\\n");
    printf("C was created in %d at Bell Labs\\n", 1972);
    return 0;
}`,
      language: "c"
    },
    {
      id: "c-2",
      title: "Variables and Data Types",
      content: `## Variables — Storing Data

A variable is a named storage location in memory. Every variable has a **type** that determines what kind of data it can hold and how much memory it uses.

### Basic Data Types

| Type | Size | Range | Format Specifier |
|------|------|-------|-----------------|
| \`int\` | 4 bytes | ±2.1 billion | \`%d\` |
| \`float\` | 4 bytes | ±3.4 × 10³⁸ | \`%f\` |
| \`double\` | 8 bytes | ±1.7 × 10³⁰⁸ | \`%f\` or \`%lf\` |
| \`char\` | 1 byte | -128 to 127 | \`%c\` |

### Declaring and Initializing

\`\`\`c
int age = 25;          // declaration + initialization
float height = 5.9;
char grade = 'A';
double pi = 3.14159265358979;
\`\`\`

### sizeof() — Checking Memory Usage

\`\`\`c
printf("int: %lu bytes\\n", sizeof(int));
printf("char: %lu byte\\n", sizeof(char));
\`\`\`

### Constants

\`\`\`c
const int MAX_SCORE = 100;    // read-only variable
#define PI 3.14159            // preprocessor constant (no type checking)
\`\`\`

Use \`const\` over \`#define\` — it's type-safe and debuggable.

### Type Casting

\`\`\`c
int a = 7, b = 2;
float result = (float)a / b;  // explicit cast: 3.500000
\`\`\`

Without the cast: \`a / b\` = 3 (integer division truncates).

### Variable Naming Rules
- Must start with a letter or underscore (\`_\`)
- Can contain letters, digits, underscores
- Case-sensitive (\`age\` ≠ \`Age\` ≠ \`AGE\`)
- Cannot use keywords (\`int\`, \`return\`, \`if\`, etc.)
- Use descriptive names: \`student_count\` not \`sc\``,
      codeExample: `#include <stdio.h>

int main() {
    // Basic data types
    int age = 25;
    float height = 5.9f;
    double pi = 3.14159265358979;
    char grade = 'A';
    
    // Print values with format specifiers
    printf("Age: %d\\n", age);
    printf("Height: %.1f feet\\n", height);
    printf("Pi: %.15f\\n", pi);
    printf("Grade: %c\\n", grade);
    
    // sizeof() — memory usage
    printf("\\nMemory usage:\\n");
    printf("int:    %lu bytes\\n", sizeof(int));
    printf("float:  %lu bytes\\n", sizeof(float));
    printf("double: %lu bytes\\n", sizeof(double));
    printf("char:   %lu byte\\n", sizeof(char));
    
    // Type casting
    int a = 7, b = 2;
    printf("\\nInteger division: 7 / 2 = %d\\n", a / b);
    printf("Float division:   7 / 2 = %.2f\\n", (float)a / b);
    
    // Constants
    const int MAX = 100;
    printf("Max score: %d\\n", MAX);
    
    return 0;
}`,
      language: "c"
    },
    {
      id: "c-3",
      title: "Operators",
      content: `## Operators — Performing Operations

Operators tell the compiler what mathematical, logical, or bitwise operation to perform on values.

### Arithmetic Operators

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`+\` | Addition | \`10 + 3\` | 13 |
| \`-\` | Subtraction | \`10 - 3\` | 7 |
| \`*\` | Multiplication | \`10 * 3\` | 30 |
| \`/\` | Division | \`10 / 3\` | 3 (integer!) |
| \`%\` | Modulo (remainder) | \`10 % 3\` | 1 |

**Common trap:** Integer division truncates. \`7 / 2 = 3\`, not 3.5. Cast to float for decimal results.

### Increment/Decrement

\`\`\`c
int x = 5;
x++;    // x is now 6 (post-increment)
++x;    // x is now 7 (pre-increment)
x--;    // x is now 6
\`\`\`

Pre-increment (\`++x\`) returns the new value. Post-increment (\`x++\`) returns the old value.

### Relational Operators

\`\`\`c
10 == 10   // true (1)
10 != 5    // true (1)
10 > 5     // true (1)
10 < 5     // false (0)
10 >= 10   // true (1)
\`\`\`

### Logical Operators

\`\`\`c
(10 > 5) && (5 > 3)    // AND: both true → 1
(10 > 5) || (3 > 5)    // OR: one true → 1
!(10 > 5)               // NOT: flips → 0
\`\`\`

### Bitwise Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| \`&\` | AND | \`5 & 3 = 1\` (0101 & 0011 = 0001) |
| \`|\` | OR | \`5 | 3 = 7\` (0101 | 0011 = 0111) |
| \`^\` | XOR | \`5 ^ 3 = 6\` (0101 ^ 0011 = 0110) |
| \`~\` | NOT | \`~5 = -6\` (flips all bits) |
| \`<<\` | Left shift | \`5 << 1 = 10\` (multiply by 2) |
| \`>>\` | Right shift | \`5 >> 1 = 2\` (divide by 2) |

### Ternary Operator

\`\`\`c
int max = (a > b) ? a : b;  // if a > b, max = a; else max = b
\`\`\``,
      codeExample: `#include <stdio.h>

int main() {
    int a = 10, b = 3;
    
    // Arithmetic
    printf("=== Arithmetic ===\\n");
    printf("%d + %d = %d\\n", a, b, a + b);
    printf("%d - %d = %d\\n", a, b, a - b);
    printf("%d * %d = %d\\n", a, b, a * b);
    printf("%d / %d = %d  (integer division)\\n", a, b, a / b);
    printf("%d %% %d = %d  (remainder)\\n", a, b, a % b);
    printf("Float division: %d / %d = %.2f\\n", a, b, (float)a / b);
    
    // Increment/Decrement
    printf("\\n=== Increment ===\\n");
    int x = 5;
    printf("x = %d\\n", x);
    printf("x++ = %d (post, returns old value)\\n", x++);
    printf("x = %d\\n", x);
    printf("++x = %d (pre, returns new value)\\n", ++x);
    
    // Relational
    printf("\\n=== Relational ===\\n");
    printf("%d == %d: %d\\n", a, b, a == b);
    printf("%d != %d: %d\\n", a, b, a != b);
    printf("%d > %d:  %d\\n", a, b, a > b);
    
    // Logical
    printf("\\n=== Logical ===\\n");
    int p = 1, q = 0;
    printf("TRUE && FALSE = %d\\n", p && q);
    printf("TRUE || FALSE = %d\\n", p || q);
    printf("!TRUE = %d\\n", !p);
    
    // Bitwise
    printf("\\n=== Bitwise ===\\n");
    printf("5 & 3 = %d\\n", 5 & 3);
    printf("5 | 3 = %d\\n", 5 | 3);
    printf("5 ^ 3 = %d\\n", 5 ^ 3);
    printf("5 << 1 = %d (multiply by 2)\\n", 5 << 1);
    printf("5 >> 1 = %d (divide by 2)\\n", 5 >> 1);
    
    // Ternary
    printf("\\n=== Ternary ===\\n");
    int max = (a > b) ? a : b;
    printf("Max of %d and %d is %d\\n", a, b, max);
    
    return 0;
}`,
      language: "c"
    },
    {
      id: "c-4",
      title: "Conditionals",
      content: `## Conditionals — Making Decisions

Conditionals let your program choose different paths based on conditions.

### if / else if / else

\`\`\`c
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F';
}
\`\`\`

**Key rules:**
- Only one branch executes
- Conditions are checked top-to-bottom
- Braces \`{}\` are optional for single statements, but always use them

### Nested if

\`\`\`c
if (age >= 18) {
    if (hasLicense) {
        printf("You can drive");
    } else {
        printf("You need a license");
    }
} else {
    printf("Too young to drive");
}
\`\`\`

**Tip:** Avoid nesting deeper than 2-3 levels. Use early returns or helper functions instead.

### Ternary Operator (Short if/else)

\`\`\`c
int max = (a > b) ? a : b;
\`\`\`

Use for simple assignments. Don't use for complex logic — it hurts readability.

### switch Statement

Best when comparing one variable against many constant values:

\`\`\`c
switch (day) {
    case 1: printf("Monday"); break;
    case 2: printf("Tuesday"); break;
    case 6: case 7: printf("Weekend"); break;
    default: printf("Invalid day");
}
\`\`\`

**Remember:** Each case needs \`break\`. Without it, execution "falls through" to the next case.

### Common Mistakes
- Using \`=\` (assignment) instead of \`==\` (comparison) in conditions
- Forgetting \`break\` in switch cases
- Floating-point comparison with \`==\` (use \`fabs(a - b) < 0.001\`)`,
      codeExample: `#include <stdio.h>

int main() {
    // if/else if/else
    int score = 85;
    char grade;
    
    if (score >= 90) {
        grade = 'A';
    } else if (score >= 80) {
        grade = 'B';
    } else if (score >= 70) {
        grade = 'C';
    } else if (score >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }
    
    printf("Score: %d -> Grade: %c\\n", score, grade);
    
    // Nested if
    int age = 20;
    int hasLicense = 1;
    
    if (age >= 18) {
        if (hasLicense) {
            printf("Age %d: You can drive\\n", age);
        } else {
            printf("Age %d: You need a license\\n", age);
        }
    } else {
        printf("Age %d: Too young to drive\\n", age);
    }
    
    // Ternary operator
    int a = 10, b = 20;
    int max = (a > b) ? a : b;
    printf("Max of %d and %d is %d\\n", a, b, max);
    
    // switch statement
    int day = 3;
    printf("Day %d: ", day);
    
    switch (day) {
        case 1: printf("Monday\\n"); break;
        case 2: printf("Tuesday\\n"); break;
        case 3: printf("Wednesday\\n"); break;
        case 4: printf("Thursday\\n"); break;
        case 5: printf("Friday\\n"); break;
        case 6:
        case 7: printf("Weekend\\n"); break;
        default: printf("Invalid\\n");
    }
    
    // Multiple cases
    int month = 8;
    switch (month) {
        case 12: case 1: case 2:
            printf("Winter\\n"); break;
        case 3: case 4: case 5:
            printf("Spring\\n"); break;
        case 6: case 7: case 8:
            printf("Summer\\n"); break;
        case 9: case 10: case 11:
            printf("Fall\\n"); break;
    }
    
    return 0;
}`,
      language: "c"
    },
    {
      id: "c-5",
      title: "Loops",
      content: `## Loops — Repeating Actions

Loops execute a block of code repeatedly until a condition is met.

### for Loop

Best when you know how many times to repeat:

\`\`\`c
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
// Output: 0 1 2 3 4
\`\`\`

**Parts:** \`for (init; condition; update)\`
- \`int i = 0\` — runs once before the loop
- \`i < 5\` — checked before each iteration
- \`i++\` — runs after each iteration

### while Loop

Best when you don't know how many iterations:

\`\`\`c
int count = 0;
while (count < 5) {
    printf("%d ", count);
    count++;
}
// Output: 0 1 2 3 4
\`\`\`

**Warning:** If you forget \`count++\`, the loop runs forever.

### do...while Loop

Like \`while\`, but guarantees at least one execution:

\`\`\`c
int num;
do {
    printf("Enter a positive number: ");
    scanf("%d", &num);
} while (num <= 0);
\`\`\`

### break and continue

- **\`break\`** — exits the loop entirely
- **\`continue\`** — skips to the next iteration

\`\`\`c
for (int i = 0; i < 10; i++) {
    if (i == 3) continue;  // skip 3
    if (i == 7) break;     // stop at 7
    printf("%d ", i);
}
// Output: 0 1 2 4 5 6
\`\`\`

### Nested Loops

\`\`\`c
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        printf("(%d,%d) ", i, j);
    }
}
// Output: (0,0) (0,1) (0,2) (1,0) (1,1) (1,2) (2,0) (2,1) (2,2)
\`\`\`

### Common Mistakes
- Off-by-one errors: \`i <= n\` iterates n+1 times
- Infinite loops: forgetting to update the loop variable
- Using \`=\` instead of \`==\` in the condition`,
      codeExample: `#include <stdio.h>

int main() {
    // for loop — counting
    printf("=== For Loop ===\\n");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    
    // for loop — sum
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    printf("Sum of 1-100: %d\\n", sum);
    
    // while loop
    printf("\\n=== While Loop ===\\n");
    int n = 16;
    while (n > 0) {
        printf("%d ", n);
        n /= 2;
    }
    printf("\\n");
    
    // do...while
    printf("\\n=== Do-While ===\\n");
    int num = 1;
    do {
        printf("%d ", num);
        num *= 2;
    } while (num <= 100);
    printf("\\n");
    
    // break and continue
    printf("\\n=== Break & Continue ===\\n");
    for (int i = 0; i < 10; i++) {
        if (i == 3) continue;  // skip 3
        if (i == 7) break;     // stop at 7
        printf("%d ", i);
    }
    printf("\\n");
    
    // Nested loops — multiplication table
    printf("\\n=== Multiplication Table ===\\n");
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= 5; j++) {
            printf("%4d", i * j);
        }
        printf("\\n");
    }
    
    // Factorial
    printf("\\n=== Factorial ===\\n");
    int fact = 1;
    for (int i = 1; i <= 10; i++) {
        fact *= i;
        printf("%2d! = %d\\n", i, fact);
    }
    
    return 0;
}`,
      language: "c"
    },
    {
      id: "c-6",
      title: "Functions",
      content: `## Functions — Reusable Code Blocks

A function is a self-contained block of code that performs a specific task. Functions are the building blocks of organized programs.

### Function Structure

\`\`\`c
return_type function_name(parameters) {
    // body
    return value;
}
\`\`\`

### Declaring vs Defining

- **Declaration** (prototype): tells the compiler the function exists
- **Definition**: the actual implementation

\`\`\`c
int add(int a, int b);    // declaration
int add(int a, int b) {   // definition
    return a + b;
}
\`\`\`

### Pass by Value vs Pass by Value

In C, all arguments are **passed by value** — the function gets a copy. To modify the original, use pointers:

\`\`\`c
void doubleIt(int *x) {
    *x = *x * 2;
}
int main() {
    int n = 5;
    doubleIt(&n);  // n is now 10
}
\`\`\`

### Recursion

A function that calls itself:

\`\`\`c
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
\`\`\`

Every recursion needs a **base case** to stop. Without it, you get infinite recursion (stack overflow).

### Scope

- **Local variables**: declared inside a function, exist only during execution
- **Global variables**: declared outside all functions, accessible everywhere (avoid them)
- **Static variables**: \`static int count;\` — persists between function calls

### Common Mistakes
- Forgetting \`return\` in a non-void function
- Using \`int\` as the return type for functions that need decimals
- Modifying global state instead of passing parameters`,
      codeExample: `#include <stdio.h>

// Function declarations
int add(int a, int b);
float celsiusToFahrenheit(float c);
void swap(int *a, int *b);
int factorial(int n);
int fibonacci(int n);
void printArray(int arr[], int size);

// Main function
int main() {
    // Basic function calls
    printf("=== Basic Functions ===\\n");
    printf("5 + 3 = %d\\n", add(5, 3));
    printf("25°C = %.1f°F\\n", celsiusToFahrenheit(25));
    
    // Swap (pass by pointer)
    printf("\\n=== Swap ===\\n");
    int x = 10, y = 20;
    printf("Before: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After:  x=%d, y=%d\\n", x, y);
    
    // Recursion
    printf("\\n=== Recursion ===\\n");
    printf("5! = %d\\n", factorial(5));
    printf("Fibonacci(10) = %d\\n", fibonacci(10));
    
    // Array parameter
    printf("\\n=== Array Parameter ===\\n");
    int arr[] = {5, 3, 8, 1, 9};
    printArray(arr, 5);
    
    return 0;
}

// Function definitions
int add(int a, int b) {
    return a + b;
}

float celsiusToFahrenheit(float c) {
    return (c * 9.0 / 5.0) + 32;
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

void printArray(int arr[], int size) {
    printf("[");
    for (int i = 0; i < size; i++) {
        printf("%d", arr[i]);
        if (i < size - 1) printf(", ");
    }
    printf("]\\n");
}`,
      language: "c"
    },
    {
      id: "c-7",
      title: "Arrays",
      content: `## Arrays — Storing Multiple Values

An array is a collection of elements of the same type stored in contiguous memory.

### Declaration and Initialization

\`\`\`c
int numbers[5] = {10, 20, 30, 40, 50};
char name[] = "Alice";  // auto-size: 6 bytes (including \\0)
\`\`\`

### Accessing Elements

\`\`\`c
numbers[0] = 10;    // first element
numbers[4] = 50;    // last element
numbers[2] = 99;    // modify middle
\`\`\`

**Arrays are zero-indexed.** An array of size 5 has valid indices 0-4.

### Array Size

\`\`\`c
int arr[10];
printf("%lu\\n", sizeof(arr) / sizeof(arr[0]));  // 10
\`\`\`

### Passing Arrays to Functions

Arrays decay to pointers when passed to functions:

\`\`\`c
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
}
\`\`\`

**Important:** You must pass the size separately — the function can't determine it from the pointer.

### Multi-Dimensional Arrays

\`\`\`c
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
\`\`\`

### Common Mistakes
- Accessing beyond bounds: \`arr[5]\` in an array of size 5 is undefined behavior
- Forgetting that arrays are 0-indexed
- Not passing array size to functions
- Modifying array inside function modifies the original (arrays are passed by reference)`,
      codeExample: `#include <stdio.h>

void printArray(int arr[], int size);
void reverseArray(int arr[], int size);
int findMax(int arr[], int size);
void bubbleSort(int arr[], int size);

int main() {
    // Declaration and initialization
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    
    printf("=== Array Basics ===\\n");
    printf("Array: ");
    printArray(numbers, n);
    printf("Size: %lu bytes\\n", sizeof(numbers));
    printf("Elements: %lu\\n", n);
    
    // Finding max
    printf("\\n=== Find Max ===\\n");
    printf("Max element: %d\\n", findMax(numbers, n));
    
    // Reverse array
    printf("\\n=== Reverse ===\\n");
    reverseArray(numbers, n);
    printf("Reversed: ");
    printArray(numbers, n);
    
    // Bubble sort
    printf("\\n=== Sorting ===\\n");
    int unsorted[] = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(unsorted, n);
    printf("Sorted: ");
    printArray(unsorted, n);
    
    // 2D array
    printf("\\n=== 2D Array ===\\n");
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%4d", matrix[i][j]);
        }
        printf("\\n");
    }
    
    return 0;
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

void reverseArray(int arr[], int size) {
    for (int i = 0; i < size / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}

int findMax(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

void bubbleSort(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
      language: "c"
    },
    {
      id: "c-8",
      title: "Strings",
      content: `## Strings — Working with Text

In C, a string is an array of \`char\` terminated by a null character (\`\\0\`).

### String Declaration

\`\`\`c
char name[] = "Alice";     // { 'A', 'l', 'i', 'c', 'e', '\\0' }
char greeting[20] = "Hello"; // explicit size, zero-padded
\`\`\`

### String Length

\`strlen()\` from \`<string.h>\` counts characters before \`\\0\`:

\`\`\`c
char name[] = "Alice";
printf("%lu\\n", strlen(name));  // 5 (not 6 — \\0 isn't counted)
\`\`\`

### String Functions (\`<string.h>\`)

| Function | Purpose | Example |
|----------|---------|---------|
| \`strlen(s)\` | Length | \`strlen("Hi")\` → 2 |
| \`strcpy(dest, src)\` | Copy | \`strcpy(a, b)\` copies b to a |
| \`strcat(dest, src)\` | Concatenate | \`strcat(a, b)\` appends b to a |
| \`strcmp(a, b)\` | Compare | \`strcmp("a","b")\` → negative |
| \`strchr(s, c)\` | Find char | \`strchr("Hi", 'i')\` → pointer |
| \`strstr(h, n)\` | Find substring | \`strstr("Hello","ll")\` → pointer |

### strcmp Return Values

- **Negative**: first string comes before second
- **Zero**: strings are equal
- **Positive**: first string comes after second

\`\`\`c
strcmp("apple", "banana")  // negative
strcmp("apple", "apple")   // 0
\`\`\`

### Reading Strings

\`\`\`c
char name[50];
scanf("%49s", name);      // reads one word (stops at space)
fgets(name, 50, stdin);   // reads entire line (including spaces)
\`\`\`

### Common Mistakes
- Buffer overflow: \`strcpy\` doesn't check size — use \`strncpy\` instead
- Forgetting that strings are mutable arrays — you can modify them
- Comparing strings with \`==\` (compares addresses, not content) — use \`strcmp\`
- Not accounting for \`\\0\` when allocating space`,
      codeExample: `#include <stdio.h>
#include <string.h>

int main() {
    // String basics
    char name[] = "Alice";
    char greeting[20] = "Hello";
    
    printf("=== String Basics ===\\n");
    printf("Name: %s\\n", name);
    printf("Length: %lu\\n", strlen(name));
    printf("Size in memory: %lu bytes\\n", sizeof(name));
    
    // String functions
    printf("\\n=== String Functions ===\\n");
    
    // strcpy
    char dest[50];
    strcpy(dest, "Hello, World!");
    printf("Copied: %s\\n", dest);
    
    // strcat
    char str1[50] = "Hello";
    char str2[] = ", World!";
    strcat(str1, str2);
    printf("Concatenated: %s\\n", str1);
    
    // strcmp
    printf("\\nCompare 'apple' vs 'banana': %d\\n", strcmp("apple", "banana"));
    printf("Compare 'apple' vs 'apple': %d\\n", strcmp("apple", "apple"));
    printf("Compare 'zebra' vs 'apple': %d\\n", strcmp("zebra", "apple"));
    
    // String reversal
    printf("\\n=== Reverse String ===\\n");
    char original[] = "Hello";
    char reversed[50];
    int len = strlen(original);
    
    for (int i = 0; i < len; i++) {
        reversed[i] = original[len - 1 - i];
    }
    reversed[len] = '\\0';
    printf("Original: %s\\n", original);
    printf("Reversed: %s\\n", reversed);
    
    // Palindrome check
    printf("\\n=== Palindrome Check ===\\n");
    char word[] = "racecar";
    int isPalindrome = 1;
    len = strlen(word);
    
    for (int i = 0; i < len / 2; i++) {
        if (word[i] != word[len - 1 - i]) {
            isPalindrome = 0;
            break;
        }
    }
    printf("'%s' is %s\\n", word, isPalindrome ? "a palindrome" : "not a palindrome");
    
    // Character counting
    printf("\\n=== Character Count ===\\n");
    char text[] = "hello world";
    int count[26] = {0};
    len = strlen(text);
    
    for (int i = 0; i < len; i++) {
        if (text[i] >= 'a' && text[i] <= 'z') {
            count[text[i] - 'a']++;
        }
    }
    
    for (int i = 0; i < 26; i++) {
        if (count[i] > 0) {
            printf("'%c': %d\\n", 'a' + i, count[i]);
        }
    }
    
    return 0;
}`,
      language: "c"
    },
    {
      id: "c-9",
      title: "Pointers",
      content: `## Pointers — Memory Addresses

A pointer is a variable that stores the **memory address** of another variable. Pointers are C's most powerful and dangerous feature.

### Pointer Basics

\`\`\`c
int x = 42;
int *p = &x;      // p stores the address of x
printf("%d\\n", *p);  // 42 (dereferencing — reading the value)
printf("%p\\n", (void*)p);  // address of x
\`\`\`

- \`&x\` — "address of x"
- \`*p\` — "value at address p" (dereference)

### Pointer Arithmetic

\`\`\`c
int arr[] = {10, 20, 30, 40};
int *p = arr;      // points to first element
printf("%d\\n", *p);      // 10
printf("%d\\n", *(p+1));  // 20
printf("%d\\n", *(p+2));  // 30
\`\`\`

Pointer arithmetic advances by the size of the type: \`p+1\` jumps by \`sizeof(int)\` bytes.

### Pass by Pointer (Pass by Reference)

To modify a variable inside a function:

\`\`\`c
void doubleIt(int *x) {
    *x = *x * 2;
}
int main() {
    int n = 5;
    doubleIt(&n);
    printf("%d\\n", n);  // 10
}
\`\`\`

### Pointer and Arrays

Arrays decay to pointers when passed to functions:

\`\`\`c
void modify(int arr[], int size) {
    arr[0] = 999;  // modifies the original array
}
\`\`\`

### Common Pointer Patterns

\`\`\`c
int *p = NULL;     // always initialize to NULL
if (p != NULL) {
    printf("%d\\n", *p);  // safe to dereference
}
\`\`\`

### Common Mistakes
- Dereferencing NULL or uninitialized pointers (segfault)
- Dangling pointers: pointer to freed/stack memory
- Memory leaks: allocating but never freeing
- Pointer arithmetic beyond array bounds`,
      codeExample: `#include <stdio.h>

void doubleIt(int *x);
void swap(int *a, int *b);
void printAddress(int *p, char *name);

int main() {
    // Pointer basics
    printf("=== Pointer Basics ===\\n");
    int x = 42;
    int *p = &x;
    
    printf("Value of x: %d\\n", x);
    printf("Address of x: %p\\n", (void*)&x);
    printf("Value of p: %p\\n", (void*)p);
    printf("Value at p (*p): %d\\n", *p);
    
    // Modify via pointer
    *p = 100;
    printf("After *p = 100: x = %d\\n", x);
    
    // Swap using pointers
    printf("\\n=== Swap ===\\n");
    int a = 10, b = 20;
    printf("Before: a=%d, b=%d\\n", a, b);
    swap(&a, &b);
    printf("After:  a=%d, b=%d\\n", a, b);
    
    // Pointer arithmetic
    printf("\\n=== Pointer Arithmetic ===\\n");
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d (address: %p)\\n", i, *(ptr + i), (void*)(ptr + i));
    }
    
    // Pointer and arrays
    printf("\\n=== Array Decay ===\\n");
    printf("arr = %p\\n", (void*)arr);
    printf("ptr = %p\\n", (void*)ptr);
    printf("arr[2] = %d, *(ptr+2) = %d\\n", arr[2], *(ptr + 2));
    
    // NULL pointer safety
    printf("\\n=== NULL Safety ===\\n");
    int *safe = NULL;
    if (safe != NULL) {
        printf("Value: %d\\n", *safe);
    } else {
        printf("Pointer is NULL, cannot dereference\\n");
    }
    
    return 0;
}

void doubleIt(int *x) {
    *x = *x * 2;
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void printAddress(int *p, char *name) {
    printf("%s = %d (at %p)\\n", name, *p, (void*)p);
}`,
      language: "c"
    },
    {
      id: "c-10",
      title: "Structures",
      content: `## Structures — Custom Data Types

A \`struct\` groups related variables under one name, like a class without methods.

### Defining a Structure

\`\`\`c
struct Student {
    char name[50];
    int age;
    float gpa;
};
\`\`\`

### Creating Instances

\`\`\`c
struct Student s1 = {"Alice", 20, 3.85};
struct Student s2;
strcpy(s2.name, "Bob");  // can't assign strings directly
s2.age = 22;
s2.gpa = 3.50;
\`\`\`

### Accessing Members

Use the **dot operator** (\`.\`):

\`\`\`c
printf("%s (age %d)\\n", s1.name, s1.age);
\`\`\`

### typedef — Cleaner Syntax

\`\`\`c
typedef struct {
    char name[50];
    int age;
} Person;

Person p1 = {"Alice", 25};  // no "struct" keyword needed
\`\`\`

### Structures as Function Parameters

\`\`\`c
void printStudent(struct Student s) {
    printf("%s: %.2f\\n", s.name, s.gpa);
}

// Pass by pointer for large structures (avoids copying)
void updateGPA(struct Student *s, float newGPA) {
    s->gpa = newGPA;  // arrow operator for pointers
}
\`\`\`

**Dot** (\`.\`) for direct access. **Arrow** (\`->\`) for pointer access.

### Arrays of Structures

\`\`\`c
struct Student class[3] = {
    {"Alice", 20, 3.85},
    {"Bob", 22, 3.50},
    {"Charlie", 21, 3.92}
};
\`\`\`

### Nested Structures

\`\`\`c
typedef struct {
    char street[100];
    char city[50];
} Address;

typedef struct {
    char name[50];
    Address address;  // nested
} Person;
\`\`\``,
      codeExample: `#include <stdio.h>
#include <string.h>

// Structure definitions
struct Student {
    char name[50];
    int age;
    float gpa;
    char grade;
};

typedef struct {
    char title[100];
    char author[50];
    int year;
    float price;
} Book;

typedef struct {
    char street[100];
    char city[50];
    char state[30];
    int zip;
} Address;

typedef struct {
    char name[50];
    int age;
    Address address;
} Person;

// Function that works with structures
void printStudent(struct Student *s) {
    printf("Name: %s | Age: %d | GPA: %.2f | Grade: %c\\n",
           s->name, s->age, s->gpa, s->grade);
}

void printBook(Book *b) {
    printf("\"%s\" by %s (%d) - $%.2f\\n",
           b->title, b->author, b->year, b->price);
}

int main() {
    // Structure basics
    printf("=== Structure Basics ===\\n");
    struct Student s1 = {"Alice", 20, 3.85, 'A'};
    struct Student s2;
    strcpy(s2.name, "Bob");
    s2.age = 22;
    s2.gpa = 3.50;
    s2.grade = 'B';
    
    printStudent(&s1);
    printStudent(&s2);
    
    // Array of structures
    printf("\\n=== Array of Structures ===\\n");
    struct Student class[] = {
        {"Charlie", 21, 3.92, 'A'},
        {"Diana", 23, 3.70, 'B'},
        {"Eve", 20, 3.55, 'B'},
        {"Frank", 22, 3.88, 'A'}
    };
    int numStudents = sizeof(class) / sizeof(class[0]);
    
    for (int i = 0; i < numStudents; i++) {
        printf("%d. ", i + 1);
        printStudent(&class[i]);
    }
    
    // Book library
    printf("\\n=== Book Library ===\\n");
    Book library[] = {
        {"The C Programming Language", "Kernighan & Ritchie", 1978, 49.99},
        {"Clean Code", "Robert Martin", 2008, 39.99},
        {"Design Patterns", "Gang of Four", 1994, 54.99}
    };
    
    for (int i = 0; i < 3; i++) {
        printBook(&library[i]);
    }
    
    // Nested structures
    printf("\\n=== Nested Structures ===\\n");
    Person people[] = {
        {"John", 30, {"123 Main St", "New York", "NY", 10001}},
        {"Jane", 25, {"456 Oak Ave", "Boston", "MA", 02101}}
    };
    
    for (int i = 0; i < 2; i++) {
        printf("%s, Age %d\\n", people[i].name, people[i].age);
        printf("  Address: %s, %s, %s %d\\n",
               people[i].address.street,
               people[i].address.city,
               people[i].address.state,
               people[i].address.zip);
    }
    
    return 0;
}`,
      language: "c"
    },
    {
      id: "c-11",
      title: "File Handling",
      content: `## File Handling — Reading and Writing Files

C provides functions for reading from and writing to files through \`FILE\` pointers.

### File Operations

| Function | Purpose |
|----------|---------|
| \`fopen()\` | Open a file |
| \`fclose()\` | Close a file |
| \`fprintf()\` | Write formatted output |
| \`fscanf()\` | Read formatted input |
| \`fgets()\` | Read a line |
| \`fputs()\` | Write a string |
| \`fread()\` | Read binary data |
| \`fwrite()\` | Write binary data |
| \`fseek()\` | Move file position |
| \`ftell()\` | Get current position |

### File Modes

| Mode | Meaning |
|------|---------|
| \`"r"\` | Read (file must exist) |
| \`"w"\` | Write (creates new or truncates) |
| \`"a"\` | Append (creates new or appends) |
| \`"r+"\` | Read + Write (file must exist) |
| \`"w+"\` | Read + Write (creates new or truncates) |
| \`"a+"\` | Read + Append |
| Add \`b\` | Binary: \`"rb"\`, \`"wb"\` |

### Error Handling

Always check if \`fopen\` returns NULL:

\`\`\`c
FILE *fp = fopen("data.txt", "r");
if (fp == NULL) {
    perror("Error opening file");
    return 1;
}
// ... use the file ...
fclose(fp);
\`\`\`

### Reading Line by Line

\`\`\`c
char line[256];
while (fgets(line, sizeof(line), fp) != NULL) {
    printf("%s", line);
}
\`\`\`

### Writing Formatted Data

\`\`\`c
fprintf(fp, "Name: %s, Age: %d\\n", name, age);
\`\`\``,
      codeExample: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

int main() {
    // Writing to a file
    printf("=== Writing to File ===\\n");
    FILE *fp = fopen("students.txt", "w");
    if (fp == NULL) {
        printf("Error opening file for writing!\\n");
        return 1;
    }
    
    fprintf(fp, "Name,Age,GPA\\n");
    fprintf(fp, "Alice,20,3.85\\n");
    fprintf(fp, "Bob,22,3.50\\n");
    fprintf(fp, "Charlie,21,3.92\\n");
    fclose(fp);
    printf("Written to students.txt\\n");
    
    // Reading from a file
    printf("\\n=== Reading from File ===\\n");
    fp = fopen("students.txt", "r");
    if (fp == NULL) {
        printf("Error opening file for reading!\\n");
        return 1;
    }
    
    char line[100];
    int lineNum = 0;
    while (fgets(line, sizeof(line), fp) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';
        printf("Line %d: %s\\n", lineNum++, line);
    }
    fclose(fp);
    
    // Reading structured data
    printf("\\n=== Structured Reading ===\\n");
    fp = fopen("students.txt", "r");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    
    char name[50];
    int age;
    float gpa;
    
    fgets(line, sizeof(line), fp);  // skip header
    printf("Students:\\n");
    while (fscanf(fp, "%49[^,],%d,%f\\n", name, &age, &gpa) == 3) {
        printf("  Name: %s, Age: %d, GPA: %.2f\\n", name, age, gpa);
    }
    fclose(fp);
    
    // Append to file
    printf("\\n=== Appending ===\\n");
    fp = fopen("students.txt", "a");
    if (fp != NULL) {
        fprintf(fp, "Diana,23,3.70\\n");
        fclose(fp);
        printf("Appended Diana's record\\n");
    }
    
    // Verify
    fp = fopen("students.txt", "r");
    printf("Updated file:\\n");
    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("  %s", line);
    }
    fclose(fp);
    
    // Binary file I/O
    printf("\\n=== Binary I/O ===\\n");
    Student students[] = {
        {"Eve", 20, 3.60},
        {"Frank", 22, 3.88}
    };
    
    fp = fopen("students.bin", "wb");
    if (fp != NULL) {
        fwrite(students, sizeof(Student), 2, fp);
        fclose(fp);
        printf("Written 2 students in binary\\n");
    }
    
    Student readStudents[2];
    fp = fopen("students.bin", "rb");
    if (fp != NULL) {
        fread(readStudents, sizeof(Student), 2, fp);
        fclose(fp);
        printf("Read from binary:\\n");
        for (int i = 0; i < 2; i++) {
            printf("  %s, Age: %d, GPA: %.2f\\n",
                   readStudents[i].name, readStudents[i].age, readStudents[i].gpa);
        }
    }
    
    return 0;
}`,
      language: "c"
    }
  ]
},

  {
    slug: "deep-learning",
    title: "Deep Learning",
    description: "Master neural networks, CNNs, RNNs, transformers, and modern AI architectures.",
    icon: "🧠",
    color: "from-violet-500 to-purple-600",
    category: "AI & ML",
    lessons: [
      {
        id: "dl-1",
        title: "Introduction to Deep Learning",
        content: "Deep learning is a subset of machine learning that uses artificial neural networks with multiple layers to learn hierarchical representations of data. Unlike traditional ML algorithms that require manual feature engineering, deep learning models automatically learn features from raw input — images, text, audio, or any structured data.\n\nThe key insight: each layer transforms its input into a slightly more abstract representation. In image recognition, the first layer detects edges, the second detects shapes, the third detects objects, and the final layer classifies. This hierarchical feature learning is why deep networks outperform shallow ones on complex tasks.\n\nCommon mistake: treating deep learning as a magic solution. It requires large datasets, significant compute, and careful hyperparameter tuning. A well-tuned random forest often beats a poorly trained deep network on tabular data.\n\nWhen to use deep learning: unstructured data (images, text, audio), complex pattern recognition, tasks where manual feature engineering is impractical. When NOT to use: small datasets, tabular data with clear features, interpretability requirements, limited compute budget.\n\nThe math behind it: a neural network is a function approximator. Given input x, it computes f(x; θ) where θ are the learned weights. Training minimizes a loss function L(y, f(x; θ)) using gradient descent and backpropagation. The network learns by adjusting weights to reduce prediction error.",
        codeExample: `import numpy as np\n\n# Simple neural network from scratch\nclass NeuralNetwork:\n    def __init__(self, layers):\n        self.layers = layers\n        self.weights = []\n        self.biases = []\n        \n        # Initialize weights and biases\n        for i in range(len(layers) - 1):\n            w = np.random.randn(layers[i], layers[i+1]) * 0.01\n            b = np.zeros((1, layers[i+1]))\n            self.weights.append(w)\n            self.biases.append(b)\n    \n    def sigmoid(self, z):\n        return 1 / (1 + np.exp(-z))\n    \n    def forward(self, X):\n        self.activations = [X]\n        for i in range(len(self.weights)):\n            z = self.activations[-1] @ self.weights[i] + self.biases[i]\n            a = self.sigmoid(z)\n            self.activations.append(a)\n        return self.activations[-1]\n    \n    def backward(self, X, y, learning_rate=0.01):\n        m = X.shape[0]\n        output = self.activations[-1]\n        \n        # Output layer error\n        delta = (output - y) * output * (1 - output)\n        \n        for i in range(len(self.weights) - 1, -1, -1):\n            self.weights[i] -= learning_rate * self.activations[i].T @ delta / m\n            self.biases[i] -= learning_rate * np.mean(delta, axis=0)\n            if i > 0:\n                delta = (delta @ self.weights[i].T) * self.activations[i] * (1 - self.activations[i])\n\n# Example: XOR problem\nnn = NeuralNetwork([2, 4, 1])\nX = np.array([[0,0], [0,1], [1,0], [1,1]])\ny = np.array([[0], [1], [1], [0]])\n\nfor epoch in range(10000):\n    nn.forward(X)\n    nn.backward(X, y)\n\nprint("Predictions:", nn.forward(X).round())`,
        language: "python"
      },
      {
        id: "dl-2",
        title: "Neural Network Foundations",
        content: "A neural network is composed of neurons (nodes), layers, and connections (weights). Each neuron computes a weighted sum of its inputs, adds a bias, and applies an activation function. Stacking neurons into layers and layers into networks creates the capacity to learn complex functions.\n\nActivation functions introduce non-linearity. Without them, stacking layers is just linear algebra — no matter how deep the network, it can only learn linear relationships. ReLU (max(0, x)) is the default choice for hidden layers due to its simplicity and efficiency. Sigmoid and tanh are used for specific cases (binary output, bounded ranges).\n\nThe universal approximation theorem: a single hidden layer with enough neurons can approximate any continuous function. But 'enough' might mean exponentially many neurons. Deep networks are more parameter-efficient — they learn hierarchical features that shallow networks cannot.\n\nWeight initialization matters: initializing all weights to zero breaks symmetry (all neurons learn the same thing). Random initialization with small values (Xavier/Glorot or He initialization) prevents exploding/vanishing gradients.\n\nBias terms allow the activation function to shift. Without biases, the network can only learn functions that pass through the origin. Biases add flexibility without increasing the number of learnable parameters significantly.",
        codeExample: `import numpy as np\n\nclass NeuralNetwork:\n    def __init__(self, layer_sizes, activation='relu'):\n        self.layers = []\n        self.activation = activation\n        \n        # He initialization for ReLU\n        for i in range(len(layer_sizes) - 1):\n            scale = np.sqrt(2.0 / layer_sizes[i])  # He init\n            W = np.random.randn(layer_sizes[i], layer_sizes[i+1]) * scale\n            b = np.zeros((1, layer_sizes[i+1]))\n            self.layers.append({'W': W, 'b': b})\n    \n    def relu(self, z):\n        return np.maximum(0, z)\n    \n    def relu_derivative(self, z):\n        return (z > 0).astype(float)\n    \n    def forward(self, X):\n        self.z_values = []\n        self.a_values = [X]\n        \n        current = X\n        for i, layer in enumerate(self.layers):\n            z = current @ layer['W'] + layer['b']\n            self.z_values.append(z)\n            \n            if i < len(self.layers) - 1:  # Hidden layers\n                a = self.relu(z) if self.activation == 'relu' else self.sigmoid(z)\n            else:  # Output layer (linear for regression)\n                a = z\n            \n            self.a_values.append(a)\n            current = a\n        \n        return current\n    \n    def sigmoid(self, z):\n        return 1 / (1 + np.exp(-np.clip(z, -500, 500)))\n\n# Example: Learn a simple function\nnn = NeuralNetwork([1, 8, 8, 1])\nX = np.linspace(-np.pi, np.pi, 100).reshape(-1, 1)\ny = np.sin(X)\n\n# Training loop\nfor epoch in range(1000):\n    output = nn.forward(X)\n    loss = np.mean((output - y) ** 2)\n    if epoch % 200 == 0:\n        print(f"Epoch {epoch}, Loss: {loss:.4f}")`,
        language: "python"
      },
      {
        id: "dl-3",
        title: "Backpropagation & Gradient Descent",
        content: "Backpropagation is the algorithm that makes deep learning possible. It efficiently computes gradients of the loss function with respect to every weight in the network using the chain rule of calculus. Without it, training a deep network would require computing separate derivatives for each weight — computationally intractable.\n\nThe chain rule: if y = f(g(x)), then dy/dx = f'(g(x)) * g'(x). In a neural network, each layer is a function composition. Backpropagation applies the chain rule layer by layer, starting from the output and moving backward to the input.\n\nGradient descent: update weights in the direction that reduces loss. w_new = w_old - learning_rate * gradient. The learning rate controls step size — too large causes oscillation/divergence, too small causes slow convergence.\n\nBatch vs. Stochastic vs. Mini-batch: Full batch computes gradient on entire dataset (accurate but slow). Stochastic uses one sample (noisy but fast). Mini-batch (typically 32-256 samples) balances both — this is what everyone actually uses.\n\nCommon problems: vanishing gradients (deep networks stop learning early layers) solved by ReLU, batch normalization, residual connections. Exploding gradients solved by gradient clipping, proper initialization. Dead neurons (ReLU always outputs 0) solved by Leaky ReLU or careful initialization.\n\nAdam optimizer: combines momentum (accelerates in consistent gradient directions) with adaptive learning rates (per-parameter adjustment). Default choice for most problems.",
        codeExample: `import numpy as np\n\nclass AdamOptimizer:\n    def __init__(self, params, lr=0.001, beta1=0.9, beta2=0.999, eps=1e-8):\n        self.lr = lr\n        self.beta1 = beta1\n        self.beta2 = beta2\n        self.eps = eps\n        self.m = [np.zeros_like(p) for p in params]\n        self.v = [np.zeros_like(p) for p in params]\n        self.t = 0\n    \n    def step(self, params, grads):\n        self.t += 1\n        for i in range(len(params)):\n            self.m[i] = self.beta1 * self.m[i] + (1 - self.beta1) * grads[i]\n            self.v[i] = self.beta2 * self.v[i] + (1 - self.beta2) * grads[i]**2\n            \n            m_hat = self.m[i] / (1 - self.beta1**self.t)\n            v_hat = self.v[i] / (1 - self.beta2**self.t)\n            \n            params[i] -= self.lr * m_hat / (np.sqrt(v_hat) + self.eps)\n\n# Mini-batch gradient descent\ndef train(model, X, y, epochs=100, batch_size=32):\n    n_samples = X.shape[0]\n    \n    for epoch in range(epochs):\n        indices = np.random.permutation(n_samples)\n        X_shuffled = X[indices]\n        y_shuffled = y[indices]\n        \n        for start in range(0, n_samples, batch_size):\n            end = min(start + batch_size, n_samples)\n            X_batch = X_shuffled[start:end]\n            y_batch = y_shuffled[start:end]\n            \n            # Forward pass\n            output = model.forward(X_batch)\n            loss = np.mean((output - y_batch) ** 2)\n            \n            # Backward pass\n            grads = model.backward(X_batch, y_batch)\n            \n            # Update weights\n            model.optimizer.step(model.params, grads)\n        \n        if epoch % 10 == 0:\n            print(f"Epoch {epoch}, Loss: {loss:.4f}")`,
        language: "python"
      },
      {
        id: "dl-4",
        title: "Convolutional Neural Networks (CNNs)",
        content: "CNNs are the backbone of computer vision. They exploit a key insight: nearby pixels are more related than distant ones (local connectivity), and the same pattern can appear anywhere in an image (translation invariance). This allows CNNs to learn spatial hierarchies with far fewer parameters than fully connected networks.\n\nConvolution operation: a small filter (kernel) slides across the image, computing dot products at each position. A 3×3 filter detects local patterns like edges, corners, or textures. Stacking multiple convolutional layers builds increasingly complex features — from edges to shapes to objects.\n\nPooling: reduces spatial dimensions while retaining important features. Max pooling takes the maximum value in each window — it's the most common. Average pooling takes the mean. Pooling provides translation invariance and reduces computation.\n\nFeature maps: each filter produces a feature map showing where its pattern appears in the input. Early layers detect low-level features (edges, colors). Deeper layers detect high-level features (faces, objects, textures).\n\nArchitecture design: typical CNN = [Conv → ReLU → Pool] × N → Flatten → Dense → Output. Modern architectures (ResNet, EfficientNet) add skip connections, batch normalization, and attention mechanisms.\n\nCommon mistake: using too many filters too early. Start with 32-64 filters in early layers, increase in deeper layers. More filters = more parameters = more overfitting risk.",
        codeExample: `import numpy as np\n\nclass Conv2D:\n    def __init__(self, in_channels, out_channels, kernel_size=3, stride=1, padding=1):\n        self.kernel_size = kernel_size\n        self.stride = stride\n        self.padding = padding\n        \n        # He initialization\n        scale = np.sqrt(2.0 / (in_channels * kernel_size * kernel_size))\n        self.weights = np.random.randn(out_channels, in_channels, kernel_size, kernel_size) * scale\n        self.biases = np.zeros(out_channels)\n    \n    def forward(self, X):\n        batch, in_ch, h, w = X.shape\n        out_ch = self.weights.shape[0]\n        \n        # Pad input\n        if self.padding > 0:\n            X_padded = np.pad(X, ((0,0), (0,0), \n                                  (self.padding, self.padding), \n                                  (self.padding, self.padding)))\n        else:\n            X_padded = X\n        \n        # Output dimensions\n        out_h = (h + 2*self.padding - self.kernel_size) // self.stride + 1\n        out_w = (w + 2*self.padding - self.kernel_size) // self.stride + 1\n        \n        output = np.zeros((batch, out_ch, out_h, out_w))\n        \n        for i in range(out_h):\n            for j in range(out_w):\n                h_start = i * self.stride\n                w_start = j * self.stride\n                receptive_field = X_padded[:, :, h_start:h_start+self.kernel_size, \n                                                     w_start:w_start+self.kernel_size]\n                \n                for k in range(out_ch):\n                    output[:, k, i, j] = np.sum(receptive_field * self.weights[k]) + self.biases[k]\n        \n        return output\n\nclass MaxPool2D:\n    def __init__(self, pool_size=2, stride=2):\n        self.pool_size = pool_size\n        self.stride = stride\n    \n    def forward(self, X):\n        batch, ch, h, w = X.shape\n        out_h = (h - self.pool_size) // self.stride + 1\n        out_w = (w - self.pool_size) // self.stride + 1\n        \n        output = np.zeros((batch, ch, out_h, out_w))\n        \n        for i in range(out_h):\n            for j in range(out_w):\n                h_start = i * self.stride\n                w_start = j * self.stride\n                window = X[:, :, h_start:h_start+self.pool_size, \n                               w_start:w_start+self.pool_size]\n                output[:, :, i, j] = np.max(window, axis=(2, 3))\n        \n        return output\n\n# Example: Simple CNN for MNIST\nclass SimpleCNN:\n    def __init__(self):\n        self.conv1 = Conv2D(1, 32, kernel_size=3)\n        self.conv2 = Conv2D(32, 64, kernel_size=3)\n        self.pool = MaxPool2D()\n        \n        # Fully connected layer\n        self.fc1_weights = np.random.randn(64 * 7 * 7, 128) * 0.01\n        self.fc1_bias = np.zeros(128)\n        self.fc2_weights = np.random.randn(128, 10) * 0.01\n        self.fc2_bias = np.zeros(10)\n    \n    def forward(self, x):\n        x = np.maximum(0, self.conv1.forward(x))  # ReLU\n        x = self.pool.forward(x)\n        x = np.maximum(0, self.conv2.forward(x))  # ReLU\n        x = self.pool.forward(x)\n        \n        x = x.reshape(x.shape[0], -1)  # Flatten\n        x = np.maximum(0, x @ self.fc1_weights + self.fc1_bias)  # ReLU\n        x = x @ self.fc2_weights + self.fc2_bias  # Output\n        return x`,
        language: "python"
      },
      {
        id: "dl-5",
        title: "Recurrent Neural Networks (RNNs)",
        content: "RNNs are designed for sequential data — text, time series, audio, video. Unlike feedforward networks that process each input independently, RNNs maintain a hidden state that captures information from previous time steps. This gives them memory.\n\nThe recurrence: h_t = f(W_hh * h_{t-1} + W_xh * x_t + b). At each time step, the hidden state is updated based on the current input and the previous hidden state. The same weights are shared across all time steps — this is parameter sharing, which allows RNNs to generalize to variable-length sequences.\n\nVanishing gradients in RNNs: gradients must be multiplied by the same weight matrix at each time step. If the largest eigenvalue of W_hh is < 1, gradients shrink exponentially. If > 1, they explode. This makes it hard for vanilla RNNs to learn long-range dependencies.\n\nLSTM (Long-Term Short-Term Memory): solves vanishing gradients with a cell state and three gates (forget, input, output). The cell state acts as a conveyor belt — gradients can flow through it unchanged. Forget gate decides what to discard, input gate decides what to store, output gate decides what to output.\n\nGRU (Gated Recurrent Unit): simplified LSTM with two gates (reset, update). Fewer parameters, faster training, comparable performance on many tasks.\n\nSequence-to-sequence: encoder reads input sequence into a fixed-size vector, decoder generates output sequence from that vector. Used for machine translation, text summarization, question answering.\n\nCommon mistake: treating RNNs as the default for sequences. Transformers have largely replaced RNNs for most tasks due to parallelization and better long-range dependency handling.",
        codeExample: `import numpy as np\n\nclass LSTMCell:\n    def __init__(self, input_size, hidden_size):\n        self.hidden_size = hidden_size\n        \n        # Combined weights for all gates\n        scale = np.sqrt(2.0 / (input_size + hidden_size))\n        self.W = np.random.randn(input_size + hidden_size, 4 * hidden_size) * scale\n        self.b = np.zeros(4 * hidden_size)\n    \n    def forward(self, x, h_prev, c_prev):\n        # Concatenate input and previous hidden state\n        combined = np.concatenate([x, h_prev], axis=1)\n        \n        # Compute all gates at once\n        gates = combined @ self.W + self.b\n        \n        # Split into four gates\n        i = self.sigmoid(gates[:, :self.hidden_size])                    # Input gate\n        f = self.sigmoid(gates[:, self.hidden_size:2*self.hidden_size])  # Forget gate\n        o = self.sigmoid(gates[:, 2*self.hidden_size:3*self.hidden_size])# Output gate\n        g = np.tanh(gates[:, 3*self.hidden_size:])                      # Candidate\n        \n        # Update cell state and hidden state\n        c = f * c_prev + i * g\n        h = o * np.tanh(c)\n        \n        return h, c\n    \n    def sigmoid(self, z):\n        return 1 / (1 + np.exp(-np.clip(z, -500, 500)))\n\nclass LSTM:\n    def __init__(self, input_size, hidden_size, output_size):\n        self.lstm = LSTMCell(input_size, hidden_size)\n        self.Wy = np.random.randn(hidden_size, output_size) * 0.01\n        self.by = np.zeros(output_size)\n    \n    def forward(self, inputs):\n        h = np.zeros((inputs.shape[0], self.lstm.hidden_size))\n        c = np.zeros((inputs.shape[0], self.lstm.hidden_size))\n        \n        outputs = []\n        for t in range(inputs.shape[1]):\n            h, c = self.lstm.forward(inputs[:, t, :], h, c)\n            y = h @ self.Wy + self.by\n            outputs.append(y)\n        \n        return np.array(outputs)\n\n# Example: Sequence classification\nlstm = LSTM(input_size=10, hidden_size=64, output_size=2)\nsequence = np.random.randn(32, 20, 10)  # batch=32, seq_len=20, features=10\noutput = lstm.forward(sequence)\nprint(f"Output shape: {output.shape}")  # (20, 32, 2)`,
        language: "python"
      },
      {
        id: "dl-6",
        title: "Transformers & Attention Mechanisms",
        content: "The transformer architecture revolutionized deep learning by replacing recurrence with self-attention. The key insight: every token in a sequence can directly attend to every other token, regardless of distance. This enables parallelization (unlike sequential RNNs) and captures long-range dependencies more effectively.\n\nSelf-attention: for each token, compute a query (what am I looking for?), key (what do I contain?), and value (what information do I provide?). Attention weight between tokens i and j = softmax(query_i · key_j / sqrt(d_k)). The output is a weighted sum of all values, where weights are determined by query-key similarity.\n\nMulti-head attention: run multiple attention operations in parallel with different learned projections. Each head learns different relationship patterns — one might capture syntax, another semantics, another coreference. Concatenate heads and project.\n\nPositional encoding: transformers have no inherent notion of order. Positional encodings inject position information into the input. Sinusoidal encodings (original paper) or learned embeddings are common.\n\nLayer normalization: normalize activations across features for each sample. Stabilizes training and allows higher learning rates. Applied before or after attention/FFN blocks.\n\nFeed-forward network: each transformer block includes a position-wise FFN (two linear layers with ReLU/GELU). This is where most of the model's capacity resides.\n\nBERT: bidirectional encoder — uses mask language modeling (predict hidden tokens). Good for understanding tasks (classification, NER).\n\nGPT: autoregressive decoder — predicts next token. Good for generation tasks (text completion, summarization).\n\nCommon mistake: using full attention on long sequences. Attention is O(n²) in sequence length. For sequences > 1024 tokens, use sparse attention, linear attention, or chunking strategies.",
        codeExample: `import numpy as np\n\nclass MultiHeadAttention:\n    def __init__(self, d_model=512, n_heads=8):\n        self.d_model = d_model\n        self.n_heads = n_heads\n        self.d_k = d_model // n_heads\n        \n        # Linear projections for Q, K, V and output\n        scale = np.sqrt(2.0 / d_model)\n        self.W_q = np.random.randn(d_model, d_model) * scale\n        self.W_k = np.random.randn(d_model, d_model) * scale\n        self.W_v = np.random.randn(d_model, d_model) * scale\n        self.W_o = np.random.randn(d_model, d_model) * scale\n    \n    def forward(self, x, mask=None):\n        batch, seq_len, _ = x.shape\n        \n        # Linear projections and reshape to (batch, heads, seq_len, d_k)\n        Q = (x @ self.W_q).reshape(batch, seq_len, self.n_heads, self.d_k).transpose(1, 2)\n        K = (x @ self.W_k).reshape(batch, seq_len, self.n_heads, self.d_k).transpose(1, 2)\n        V = (x @ self.W_v).reshape(batch, seq_len, self.n_heads, self.d_k).transpose(1, 2)\n        \n        # Scaled dot-product attention\n        scores = Q @ K.transpose(-2, -1) / np.sqrt(self.d_k)\n        \n        if mask is not None:\n            scores = np.where(mask == 0, -1e9, scores)\n        \n        attn_weights = self.softmax(scores)\        output = attn_weights @ V\n        \n        # Reshape and project\n        output = output.transpose(1, 2).reshape(batch, seq_len, self.d_model)\n        return output @ self.W_o\n    \n    def softmax(self, z):\n        exp_z = np.exp(z - np.max(z, axis=-1, keepdims=True))\n        return exp_z / np.sum(exp_z, axis=-1, keepdims=True)\n\nclass TransformerBlock:\n    def __init__(self, d_model=512, n_heads=8, d_ff=2048):\n        self.attention = MultiHeadAttention(d_model, n_heads)\n        self.norm1 = LayerNorm(d_model)\n        self.norm2 = LayerNorm(d_model)\n        self.ffn = FeedForward(d_model, d_ff)\n    \n    def forward(self, x, mask=None):\n        attn_out = self.attention.forward(x, mask)\n        x = self.norm1.forward(x + attn_out)\n        ffn_out = self.ffn.forward(x)\n        x = self.norm2.forward(x + ffn_out)\n        return x\n\nclass LayerNorm:\n    def __init__(self, d_model, eps=1e-6):\n        self.gamma = np.ones(d_model)\n        self.beta = np.zeros(d_model)\n        self.eps = eps\n    \n    def forward(self, x):\n        mean = np.mean(x, axis=-1, keepdims=True)\n        var = np.var(x, axis=-1, keepdims=True)\n        x_norm = (x - mean) / np.sqrt(var + self.eps)\n        return self.gamma * x_norm + self.beta\n\nclass FeedForward:\n    def __init__(self, d_model, d_ff):\n        self.W1 = np.random.randn(d_model, d_ff) * np.sqrt(2.0/d_model)\n        self.W2 = np.random.randn(d_ff, d_model) * np.sqrt(2.0/d_ff)\n    \n    def forward(self, x):\n        return np.maximum(0, x @ self.W1) @ self.W2\n\n# Example usage\nblock = TransformerBlock(d_model=512, n_heads=8)\nx = np.random.randn(2, 10, 512)  # batch=2, seq_len=10\noutput = block.forward(x)\nprint(f"Output shape: {output.shape}")  # (2, 10, 512)`,
        language: "python"
      },
      {
        id: "dl-7",
        title: "Training & Optimization",
        content: "Training deep networks is as much art as science. The goal: find weights that minimize loss on unseen data (generalization), not just training data (overfitting). This requires careful choices of optimizer, learning rate, regularization, and data augmentation.\n\nLearning rate scheduling: the single most impactful hyperparameter. Too high: training diverges. Too low: training stalls. Common schedules: step decay (reduce by factor every N epochs), cosine annealing (smooth decrease), warmup + cosine (increase then decrease). Most practitioners start with cosine annealing.\n\nBatch normalization: normalizes activations within each mini-bort across features. Benefits: smoother loss landscape, higher learning rates, less sensitivity to initialization. Place after linear/conv layers, before activation.\n\nRegularization techniques: L2 weight decay (penalizes large weights), dropout (randomly zero neurons during training — prevents co-adaptation), data augmentation (artificially expand training set with transformations), early stopping (halt when validation loss plateaus).\n\nMixed precision training: use float16 for forward/backward passes, float32 for weight updates. Reduces memory usage by ~50% and speeds up training on modern GPUs with tensor cores.\n\nGradient clipping: cap gradient norm at a threshold (typically 1.0). Prevents exploding gradients in RNNs and transformers.\n\nCommon mistake: evaluating on training loss. Always monitor validation loss. If training loss decreases but validation loss increases, the model is overfitting.\n\nMonitoring: track loss, accuracy, learning rate, gradient norms, and weight statistics. TensorBoard, Weights & Biases, or MLflow help visualize training dynamics.",
        codeExample: `import numpy as np\n\nclass Trainer:\n    def __init__(self, model, optimizer, scheduler=None):\n        self.model = model\n        self.optimizer = optimizer\n        self.scheduler = scheduler\n        self.history = {'train_loss': [], 'val_loss': [], 'lr': []}\n    \n    def train_epoch(self, X, y, batch_size=32):\n        self.model.train()\n        n_samples = X.shape[0]\n        indices = np.random.permutation(n_samples)\n        total_loss = 0\n        n_batches = 0\n        \n        for start in range(0, n_samples, batch_size):\n            end = min(start + batch_size, n_samples)\n            X_batch = X[indices[start:end]]\n            y_batch = y[indices[start:end]]\n            \n            # Forward pass\n            output = self.model.forward(X_batch)\n            loss = self.compute_loss(output, y_batch)\n            \n            # Backward pass\n            grads = self.model.backward(X_batch, y_batch)\n            \n            # Gradient clipping\n            grads = self.clip_gradients(grads, max_norm=1.0)\n            \n            # Update weights\n            self.optimizer.step(self.model.params, grads)\n            \n            total_loss += loss\n            n_batches += 1\n        \n        return total_loss / n_batches\n    \n    def validate(self, X, y):\n        self.model.eval()\n        output = self.model.forward(X)\n        return self.compute_loss(output, y)\n    \n    def compute_loss(self, output, target):\n        return np.mean((output - target) ** 2)\n    \n    def clip_gradients(self, grads, max_norm=1.0):\n        total_norm = np.sqrt(sum(np.sum(g**2) for g in grads))\n        if total_norm > max_norm:\n            grads = [g * max_norm / total_norm for g in grads]\n        return grads\n    \n    def fit(self, X_train, y_train, X_val, y_val, epochs=100, batch_size=32):\n        best_val_loss = float('inf')\n        patience_counter = 0\n        \n        for epoch in range(epochs):\n            # Train\n            train_loss = self.train_epoch(X_train, y_train, batch_size)\n            \n            # Validate\n            val_loss = self.validate(X_val, y_val)\n            \n            # Learning rate scheduling\n            if self.scheduler:\n                self.scheduler.step(epoch)\n            \n            # Early stopping\n            if val_loss < best_val_loss:\n                best_val_loss = val_loss\n                patience_counter = 0\n                best_weights = [w.copy() for w in self.model.params]\n            else:\n                patience_counter += 1\n                if patience_counter >= 10:  # patience=10\n                    print(f"Early stopping at epoch {epoch}")\n                    self.model.params = best_weights\n                    break\n            \n            # Logging\n            self.history['train_loss'].append(train_loss)\n            self.history['val_loss'].append(val_loss)\n            \n            if epoch % 10 == 0:\n                print(f"Epoch {epoch}: train_loss={train_loss:.4f}, val_loss={val_loss:.4f}")\n        \n        return self.history\n\nclass CosineScheduler:\n    def __init__(self, lr_max=0.001, lr_min=0.0001, epochs=100):\n        self.lr_max = lr_max\n        self.lr_min = lr_min\n        self.epochs = epochs\n    \n    def step(self, epoch):\n        return self.lr_min + 0.5 * (self.lr_max - self.lr_min) * (1 + np.cos(np.pi * epoch / self.epochs))`,
        language: "python"
      },
      {
        id: "dl-8",
        title: "Transfer Learning & Fine-tuning",
        content: "Transfer learning reuses a pre-trained model as a starting point for a new task. Instead of training from scratch (which requires massive data and compute), you take a model trained on ImageNet or a large text corpus and adapt it to your specific problem. This is the dominant paradigm in modern deep learning.\n\nWhy it works: pre-trained models learn general features (edges, textures, word meanings) that transfer across tasks. The early layers are often task-agnostic — a CNN's edge detectors work for cats, cars, and medical images alike.\n\nFeature extraction: freeze the pre-trained layers, train only the new output layer. Use when: small dataset, similar domain to pre-training, limited compute.\n\nFine-tuning: unfreeze some or all pre-trained layers and train with a small learning rate. Use when: larger dataset, different domain, or need better performance. The small learning rate prevents catastrophic forgetting of pre-trained knowledge.\n\nDomain adaptation: when source domain (pre-training data) differs from target domain. Techniques: adversarial training (make features domain-invariant), feature alignment, gradual unfreezing.\n\nCommon mistake: fine-tuning with a high learning rate. This destroys pre-trained features. Use 1/10th to 1/100th of the original training rate.\n\nModel selection: use the smallest model that meets your accuracy requirements. A fine-tuned ResNet-50 often outperforms a fine-tuned ResNet-152 on small datasets due to less overfitting.\n\nKnowledge distillation: train a smaller 'student' model to mimic a larger 'teacher' model. Compresses knowledge from a big model into a smaller one for deployment.",
        codeExample: `import numpy as np\n\nclass TransferLearningModel:\n    def __init__(self, pre-trained_model, num_classes):\n        self.pre-trained = pre-trained_model\n        self.pre-trained.freeze()  # Freeze pre-trained layers\n        \n        # Add new classifier head\n        self.classifier = LinearLayer(pre-trained.output_dim, num_classes)\n        self.optimizer = Adam(lr=0.001)\n    \n    def forward(self, x):\n        features = self.pre-trained.forward(x)\n        return self.classifier.forward(features)\n    \n    def fine_tune(self, X, y, epochs=10, unfreeze_from_layer=6):\n        # Phase 1: Train only classifier\n        print("Phase 1: Training classifier head...")\n        self.pre-trained.freeze()\n        self.classifier.train(X, y, epochs=5)\n        \n        # Phase 2: Unfreeze later layers\n        print("Phase 2: Fine-tuning from layer", unfreeze_from_layer)\n        self.pre-trained.unfreeze_from(unfreeze_from_layer)\n        \n        # Use smaller learning rate for pre-trained layers\n        self.optimizer.set_lr(pre-trained_lr=0.0001, classifier_lr=0.001)\n        \n        for epoch in range(epochs):\n            output = self.forward(X)\n            loss = self.compute_loss(output, y)\n            grads = self.backward(X, y)\n            self.optimizer.step(self.params, grads)\n            \n            print(f"Epoch {epoch}, Loss: {loss:.4f}")\n\nclass PreTrainedCNN:\n    def __init__(self):\n        self.layers = []  # Pre-trained layers\n        self.frozen = True\n        self.output_dim = 512\n    \n    def freeze(self):\n        self.frozen = True\n    \n    def unfreeze_from(self, layer_idx):\n        for i, layer in enumerate(self.layers):\n            layer.trainable = (i >= layer_idx)\n    \n    def forward(self, x):\n        for layer in self.layers:\n            x = layer.forward(x)\n        return x\n\nclass LinearLayer:\n    def __init__(self, in_features, out_features):\n        self.W = np.random.randn(in_features, out_features) * 0.01\n        self.b = np.zeros(out_features)\n    \n    def forward(self, x):\n        return x @ self.W + self.b\n\n# Example: Fine-tune for binary classification\nmodel = TransferLearningModel(PreTrainedCNN(), num_classes=2)\n\n# Simulated data\nX_train = np.random.randn(100, 3, 224, 224)  # 100 images\ny_train = np.random.randint(0, 2, (100, 2))   # Binary labels\n\n# Fine-tune\nmodel.fine_tune(X_train, y_train, epochs=10)`,
        language: "python"
      },
      {
        id: "dl-9",
        title: "Generative Models (GANs & VAEs)",
        content: "Generative models learn the underlying distribution of training data to create new, similar samples. Two dominant architectures: GANs (Generative Adversarial Networks) and VAEs (Variational Autoencoders).\n\nGANs: two networks compete — generator creates fake samples, discriminator tries to distinguish real from fake. The generator improves by fooling the discriminator; the discriminator improves by catching fakes. At equilibrium, the generator produces samples indistinguishable from real data.\n\nGAN training challenges: mode collapse (generator produces limited variety), training instability (oscillation instead of convergence), vanishing gradients (discriminator too strong). Solutions: Wasserstein GAN (Earth Mover distance), progressive growing, spectral normalization.\n\nVAEs: encoder maps input to a latent distribution (mean + variance), decoder reconstructs from sampled latent vector. The loss = reconstruction error + KL divergence (penalizes divergence from prior). This forces the latent space to be smooth and continuous.\n\nVAEs vs GANs: VAEs produce blurry but stable outputs. GANs produce sharp but unstable outputs. VAEs provide explicit density estimation; GANs do not. VAEs are easier to train; GANs require careful balancing.\n\nApplications: image synthesis (StyleGAN), image-to-image translation (Pix2Pix), text generation, music composition, drug discovery, data augmentation.\n\nCommon mistake: evaluating generative models with training loss alone. Use FID (Fréchet Inception Distance), IS (Inception Score), or human evaluation.",
        codeExample: `import numpy as np\n\nclass Generator:\n    def __init__(self, latent_dim=100, output_dim=784):\n        self.latent_dim = latent_dim\n        # Simple feedforward generator\n        self.W1 = np.random.randn(latent_dim, 256) * 0.01\n        self.b1 = np.zeros(256)\n        self.W2 = np.random.randn(256, 512) * 0.01\n        self.b2 = np.zeros(512)\n        self.W3 = np.random.randn(512, output_dim) * 0.01\n        self.b3 = np.zeros(output_dim)\n    \n    def forward(self, z):\n        h1 = np.maximum(0, z @ self.W1 + self.b1)  # ReLU\n        h2 = np.maximum(0, h1 @ self.W2 + self.b2)  # ReLU\n        return np.tanh(h2 @ self.W3 + self.b3)  # Tanh output\n\nclass Discriminator:\n    def __init__(self, input_dim=784):\n        self.W1 = np.random.randn(input_dim, 512) * 0.01\n        self.b1 = np.zeros(512)\n        self.W2 = np.random.randn(512, 256) * 0.01\n        self.b2 = np.zeros(256)\n        self.W3 = np.random.randn(256, 1) * 0.01\n        self.b3 = np.zeros(1)\n    \n    def forward(self, x):\n        h1 = np.maximum(0.2 * (x @ self.W1 + self.b1), x @ self.W1 + self.b1)  # LeakyReLU\n        h2 = np.maximum(0.2 * (h1 @ self.W2 + self.b2), h1 @ self.W2 + self.b2)\n        return 1 / (1 + np.exp(-(h2 @ self.W3 + self.b3)))  # Sigmoid\n\nclass GAN:\n    def __init__(self, latent_dim=100, img_dim=784):\n        self.generator = Generator(latent_dim, img_dim)\n        self.discriminator = Discriminator(img_dim)\n        self.latent_dim = latent_dim\n    \n    def train(self, real_data, epochs=1000, batch_size=32, lr=0.0002):\n        for epoch in range(epochs):\n            # Train Discriminator\n            idx = np.random.randint(0, real_data.shape[0], batch_size)\n            real_imgs = real_data[idx]\n            \n            z = np.random.randn(batch_size, self.latent_dim)\n            fake_imgs = self.generator.forward(z)\n            \n            real_pred = self.discriminator.forward(real_imgs)\n            fake_pred = self.discriminator.forward(fake_imgs)\n            \n            d_loss = -np.mean(np.log(real_pred + 1e-8) + np.log(1 - fake_pred + 1e-8))\n            \n            # Train Generator\n            z = np.random.randn(batch_size, self.latent_dim)\n            fake_imgs = self.generator.forward(z)\n            fake_pred = self.discriminator.forward(fake_imgs)\n            g_loss = -np.mean(np.log(fake_pred + 1e-8))\n            \n            if epoch % 100 == 0:\n                print(f"Epoch {epoch}: D_loss={d_loss:.4f}, G_loss={g_loss:.4f}")\n\n# Example: Generate MNIST-like digits\ngan = GAN(latent_dim=100, img_dim=784)\nX_train = np.random.randn(1000, 784)  # Fake MNIST data\ngan.train(X_train, epochs=1000)`,
        language: "python"
      },
      {
        id: "dl-10",
        title: "Model Deployment & Optimization",
        content: "Deploying deep learning models to production requires optimization for inference speed, memory, and latency. A model that trains in hours must often infer in milliseconds.\n\nModel quantization: reduce precision from float32 to float16 or int8. Float16 halves memory and speeds up inference with minimal accuracy loss. Int8 reduces memory by 75% but requires calibration data. Post-training quantization is simpler; quantization-aware training preserves more accuracy.\n\nModel pruning: remove redundant weights or entire neurons/channels. Unstructured pruning sets small weights to zero, creating sparse matrices. Structured pruning removes entire filters — more hardware-friendly.\n\nKnowledge distillation: train a smaller 'student' model to mimic a larger 'teacher' model. The student learns soft probability distributions from the teacher, capturing 'dark knowledge' beyond hard labels.\n\nONNX (Open Neural Network Exchange): export models to a standard format for cross-framework deployment. PyTorch, TensorFlow, and scikit-learn all support ONNX export.\n\nTensorRT, CoreML, TFLite: framework-specific optimization tools that apply graph optimization, layer fusion, and hardware-specific compilation.\n\nEdge deployment: mobile devices, IoT, browsers. Constraints: limited memory, no GPU, battery life. Use MobileNet, EfficientNet-Lite, or quantized models.\n\nMonitoring in production: track prediction distributions, data drift, model performance over time. Retrain when performance degrades.\n\nCommon mistake: optimizing for accuracy only. In production, latency, throughput, memory, and power consumption matter as much as accuracy.",
        codeExample: `import numpy as np\n\nclass ModelQuantizer:\n    def __init__(self, model):\n        self.model = model\n    \n    def quantize_weights(self, bits=8):\n        \"\"\"Post-training weight quantization to INT8\"\"\"\n        quantized = []\n        for w in self.model.weights:\n            # Find min/max for scaling\n            w_min, w_max = w.min(), w.max()\n            \n            # Scale to INT8 range\n            scale = (w_max - w_min) / (2**bits - 1)\n            zero_point = np.round(-w_min / scale)\n            \n            # Quantize\n            w_quant = np.clip(np.round(w / scale + zero_point), 0, 2**bits - 1).astype(np.int8)\n            \n            quantized.append({\n                'weights': w_quant,\n                'scale': scale,\n                'zero_point': zero_point,\n                'dtype': 'int8'\n            })\n        \n        return quantized\n    \n    def quantize_activations(self, X, bits=8):\n        \"\"\"Dynamic activation quantization\"\"\"\n        X_min, X_max = X.min(), X.max()\n        scale = (X_max - X_min) / (2**bits - 1)\n        zero_point = np.round(-X_min / scale)\n        \n        X_quant = np.clip(np.round(X / scale + zero_point), 0, 2**bits - 1).astype(np.int8)\n        return X_quant, scale, zero_point\n\nclass ModelPruner:\n    def __init__(self, model, sparsity=0.5):\n        self.model = model\n        self.sparsity = sparsity\n    \n    def magnitude_prune(self):\n        \"\"\"Remove smallest weights by magnitude\"\"\"\n        all_weights = np.concatenate([w.flatten() for w in self.model.weights])\n        threshold = np.percentile(np.abs(all_weights), self.sparsity * 100)\n        \n        pruned_weights = []\n        for w in self.model.weights:\n            mask = np.abs(w) >= threshold\n            pruned = w * mask\n            pruned_weights.append(pruned)\n            \n            sparsity_actual = 1 - np.count_nonzero(pruned) / pruned.size\n            print(f"Layer: {sparsity_actual:.2%} sparse")\n        \n        self.model.weights = pruned_weights\n        return self.model\n\nclass KnowledgeDistillation:\n    def __init__(self, teacher, student, temperature=3.0, alpha=0.7):\n        self.teacher = teacher\n        self.student = student\n        self.temperature = temperature\n        self.alpha = alpha\n    \n    def soft_labels(self, logits):\n        \"\"\"Convert logits to soft probability distributions\"\"\"\n        return np.exp(logits / self.temperature) / np.sum(np.exp(logits / self.temperature))\n    \n    def distillation_loss(self, student_logits, teacher_logits, hard_labels):\n        \"\"\"Combined loss: soft targets + hard labels\"\"\"\n        student_soft = self.soft_labels(student_logits)\n        teacher_soft = self.soft_labels(teacher_logits)\n        \n        # KL divergence for soft targets\n        soft_loss = np.sum(teacher_soft * np.log(teacher_soft / (student_soft + 1e-8)))\n        \n        # Cross-entropy for hard labels\n        hard_loss = -np.sum(hard_labels * np.log(student_softmax(student_logits) + 1e-8))\n        \n        return self.alpha * soft_loss + (1 - self.alpha) * hard_loss\n\ndef student_softmax(z):\n    exp_z = np.exp(z - np.max(z, axis=-1, keepdims=True))\n    return exp_z / np.sum(exp_z, axis=-1, keepdims=True)\n\n# Example: Deploy quantized model\nmodel = NeuralNetwork([784, 256, 128, 10])\nquantizer = ModelQuantizer(model)\nquantized = quantizer.quantize_weights(bits=8)\n\nprint("Original model size:", sum(w.nbytes for w in model.weights) / 1024, "KB")\nprint("Quantized model size:", sum(q['weights'].nbytes for q in quantized) / 1024, "KB")`,
        language: "python"
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



