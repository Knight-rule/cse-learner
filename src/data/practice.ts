export interface PracticeProblem {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  starterCode: string;
  language: "javascript" | "python" | "c" | "cpp";
  testCases: { input: string; expected: string }[];
  hints: string[];
  chapter?: string;
}

export interface CoursePractice {
  courseSlug: string;
  problems: PracticeProblem[];
}

import { cPracticeProblems } from "./c_practice";

export const practiceData: CoursePractice[] = [
  // ─── Data Structures ───
  {
    courseSlug: "data-structures",
    problems: [
      { id: "ds-1", title: "Find the Maximum in an Array", description: "Write a function that finds the maximum value in an integer array.\n\n**Example:**\n- Input: `[3, 7, 2, 9, 5]`\n- Output: `9`", difficulty: "easy", language: "javascript", starterCode: "function findMax(arr) {\n  // Your code here\n  \n}", testCases: [{ input: "[3, 7, 2, 9, 5]", expected: "9" }, { input: "[-1, -5, -3]", expected: "-1" }, { input: "[42]", expected: "42" }], hints: ["Initialize max with the first element.", "Compare each element and update max if larger."] },
      { id: "ds-2", title: "Reverse an Array In-Place", description: "Reverse an array without using a second array.\n\n**Example:**\n- Input: `[1, 2, 3, 4, 5]`\n- Output: `[5, 4, 3, 2, 1]`", difficulty: "easy", language: "javascript", starterCode: "function reverseArray(arr) {\n  // Your code here\n  \n  return arr;\n}", testCases: [{ input: "[1, 2, 3, 4, 5]", expected: "[5, 4, 3, 2, 1]" }, { input: "[10, 20]", expected: "[20, 10]" }, { input: "[7]", expected: "[7]" }], hints: ["Use two pointers — one at the start, one at the end.", "Swap elements and move pointers toward the center."] },
      { id: "ds-3", title: "Check for Duplicate Elements", description: "Determine if an array contains any duplicate values.\n\n**Example:**\n- Input: `[1, 2, 3, 4, 5]` → `false`\n- Input: `[1, 2, 3, 2, 5]` → `true`", difficulty: "easy", language: "javascript", starterCode: "function hasDuplicates(arr) {\n  // Your code here\n  \n}", testCases: [{ input: "[1, 2, 3, 4, 5]", expected: "false" }, { input: "[1, 2, 3, 2, 5]", expected: "true" }, { input: "[]", expected: "false" }], hints: ["Use a Set to track seen elements.", "If an element already exists in the Set, return true."] },
      { id: "ds-4", title: "Matrix Transpose", description: "Transpose a 2D matrix (swap rows and columns).\n\n**Example:**\n- Input: `[[1,2,3],[4,5,6]]`\n- Output: `[[1,4],[2,5],[3,6]]`", difficulty: "medium", language: "javascript", starterCode: "function transpose(matrix) {\n  // Your code here\n  \n}", testCases: [{ input: "[[1,2,3],[4,5,6]]", expected: "[[1,4],[2,5],[3,6]]" }, { input: "[[1],[2],[3]]", expected: "[[1,2,3]]" }], hints: ["The result has as many rows as the original has columns.", "Use nested loops: result[j][i] = matrix[i][j]."] },
    ],
  },
  // ─── Algorithms ───
  {
    courseSlug: "algorithms",
    problems: [
      { id: "algo-1", title: "Binary Search", description: "Implement binary search on a sorted array.\n\n**Example:**\n- Input: `arr=[1,3,5,7,9]`, `target=5`\n- Output: `2`", difficulty: "easy", language: "javascript", starterCode: "function binarySearch(arr, target) {\n  // Your code here\n  \n}", testCases: [{ input: "[1,3,5,7,9], 5", expected: "2" }, { input: "[1,3,5,7,9], 6", expected: "-1" }, { input: "[2], 2", expected: "0" }], hints: ["Compare target with the middle element.", "Eliminate half the search space each step."] },
      { id: "algo-2", title: "Bubble Sort", description: "Implement bubble sort to sort an array in ascending order.\n\n**Example:**\n- Input: `[64, 34, 25, 12, 22]`\n- Output: `[12, 22, 25, 34, 64]`", difficulty: "easy", language: "javascript", starterCode: "function bubbleSort(arr) {\n  // Your code here\n  \n  return arr;\n}", testCases: [{ input: "[64,34,25,12,22]", expected: "[12,22,25,34,64]" }, { input: "[5,1,4,2,8]", expected: "[1,2,4,5,8]" }], hints: ["Compare adjacent elements and swap if out of order.", "After each pass, the largest element bubbles to the end."] },
      { id: "algo-3", title: "Merge Two Sorted Arrays", description: "Merge two sorted arrays into one sorted array.\n\n**Example:**\n- Input: `[1,3,5]`, `[2,4,6]`\n- Output: `[1,2,3,4,5,6]`", difficulty: "medium", language: "javascript", starterCode: "function mergeSorted(a, b) {\n  // Your code here\n  \n}", testCases: [{ input: "[1,3,5], [2,4,6]", expected: "[1,2,3,4,5,6]" }, { input: "[], [1,2]", expected: "[1,2]" }, { input: "[1,1], [1,1]", expected: "[1,1,1,1]" }], hints: ["Use two pointers, one for each array.", "Always pick the smaller element."] },
      { id: "algo-4", title: "Fibonacci (Iterative)", description: "Return the nth Fibonacci number iteratively.\n\n**Example:**\n- Input: `n=6`\n- Output: `8` (sequence: 0,1,1,2,3,5,8)", difficulty: "easy", language: "javascript", starterCode: "function fibonacci(n) {\n  // Your code here\n  \n}", testCases: [{ input: "0", expected: "0" }, { input: "6", expected: "8" }, { input: "10", expected: "55" }], hints: ["Only keep track of the last two values.", "Loop from 2 to n, computing the next value."] },
    ],
  },
  // ─── Operating Systems ───
  {
    courseSlug: "operating-systems",
    problems: [
      { id: "os-1", title: "FCFS Scheduling", description: "Implement First-Come-First-Served CPU scheduling. Given process burst times in arrival order, compute average waiting time.\n\n**Example:**\n- Input: `[4, 3, 1]` (burst times)\n- Output: `2.67` (average waiting time)", difficulty: "easy", language: "python", starterCode: "def fcfs_scheduling(burst_times):\n    # Your code here\n    pass", testCases: [{ input: "[4, 3, 1]", expected: "2.67" }, { input: "[10]", expected: "0.0" }], hints: ["Waiting time for process i = sum of burst times of all previous processes.", "Compute cumulative sum, then average."] },
      { id: "os-2", title: "Round Robin Scheduling", description: "Simulate Round Robin scheduling with a given time quantum. Return the average waiting time.\n\n**Example:**\n- Input: `processes=[4,3,1]`, `quantum=2`\n- Output: `3.0`", difficulty: "medium", language: "python", starterCode: "def round_robin(processes, quantum):\n    # Your code here\n    pass", testCases: [{ input: "[4,3,1], 2", expected: "3.0" }, { input: "[5], 2", expected: "0.0" }], hints: ["Use a queue to manage processes.", "Subtract quantum from each process; re-enqueue if not finished."] },
      { id: "os-3", title: "Banker's Algorithm (Safety Check)", description: "Given available resources, maximum needs, and current allocation, check if the system is in a safe state.\n\n**Example:**\n- Input: `available=[3,3,2]`, `max=[[7,5,3],[3,2,2]]`, `alloc=[[0,1,0],[2,0,0]]`\n- Output: `true` (safe)", difficulty: "hard", language: "python", starterCode: "def is_safe(available, max_matrix, alloc):\n    # Your code here\n    pass", testCases: [{ input: "[3,3,2], [[7,5,3],[3,2,2]], [[0,1,0],[2,0,0]]", expected: "true" }], hints: ["Compute need = max - alloc for each process.", "Try to find a sequence where each process can get its needed resources."] },
    ],
  },
  // ─── DBMS ───
  {
    courseSlug: "dbms",
    problems: [
      { id: "db-1", title: "Normalize to 1NF", description: "Given a denormalized table with repeating groups, flatten it to First Normal Form (1NF).\n\n**Input (JSON rows):**\n```json\n[{\"name\":\"Alice\",\"courses\":\"Math,Science\"},{\"name\":\"Bob\",\"courses\":\"English\"}]\n```\n**Output:** One row per course per student.", difficulty: "easy", language: "javascript", starterCode: "function to1NF(rows) {\n  // Your code here\n  \n}", testCases: [{ input: '[{"name":"Alice","courses":"Math,Science"},{"name":"Bob","courses":"English"}]', expected: '[{"name":"Alice","courses":"Math"},{"name":"Alice","courses":"Science"},{"name":"Bob","courses":"English"}]' }], hints: ["Split the 'courses' string by comma.", "Create a new row for each split value."] },
      { id: "db-2", title: "SQL WHERE Clause Builder", description: "Build a WHERE clause from a filters object. Each key is a column, each value is the filter value.\n\n**Example:**\n- Input: `{ age: 25, city: \"Delhi\" }`\n- Output: `\"age = 25 AND city = 'Delhi'\"`", difficulty: "easy", language: "javascript", starterCode: "function buildWhere(filters) {\n  // Your code here\n  \n}", testCases: [{ input: '{ age: 25, city: "Delhi" }', expected: "age = 25 AND city = 'Delhi'" }, { input: "{}", expected: "" }], hints: ["String values need single quotes.", "Join conditions with ' AND '."] },
      { id: "db-3", title: "Find Second Highest Salary", description: "Given an array of salaries, find the second highest distinct salary.\n\n**Example:**\n- Input: `[100000, 80000, 90000, 80000]`\n- Output: `90000`", difficulty: "medium", language: "javascript", starterCode: "function secondHighest(salaries) {\n  // Your code here\n  \n}", testCases: [{ input: "[100000,80000,90000,80000]", expected: "90000" }, { input: "[50000,50000]", expected: "-1" }], hints: ["Use a Set to get unique values.", "Sort in descending order and pick index 1."] },
    ],
  },
  // ─── Computer Networks ───
  {
    courseSlug: "computer-networks",
    problems: [
      { id: "cn-1", title: "IP Address Validator", description: "Validate whether a string is a valid IPv4 address.\n\n**Example:**\n- Input: `\"192.168.1.1\"` → `true`\n- Input: `\"256.1.1.1\"` → `false`", difficulty: "easy", language: "javascript", starterCode: "function isValidIP(ip) {\n  // Your code here\n  \n}", testCases: [{ input: '"192.168.1.1"', expected: "true" }, { input: '"256.1.1.1"', expected: "false" }, { input: '"1.2.3"', expected: "false" }], hints: ["Split by dot and check there are exactly 4 parts.", "Each part must be 0-255 and contain only digits."] },
      { id: "cn-2", title: "Subnet Calculator", description: "Given an IP and CIDR prefix length, compute the network address and broadcast address.\n\n**Example:**\n- Input: `ip=\"192.168.1.100\"`, `prefix=24`\n- Output: `network=\"192.168.1.0\"`, `broadcast=\"192.168.1.255\"`", difficulty: "medium", language: "javascript", starterCode: "function subnetCalc(ip, prefix) {\n  // Your code here\n  \n}", testCases: [{ input: '"192.168.1.100", 24', expected: '"192.168.1.0","192.168.1.255"' }, { input: '"10.0.0.1", 8', expected: '"10.0.0.0","10.255.255.255"' }], hints: ["Convert IP to a 32-bit integer.", "AND with the mask for network, OR with inverted mask for broadcast."] },
      { id: "cn-3", title: "CRC Checksum", description: "Compute a simple XOR-based checksum for a data packet.\n\n**Example:**\n- Input: `[0x12, 0x34, 0x56]`\n- Output: `0x12 ^ 0x34 ^ 0x56`", difficulty: "easy", language: "javascript", starterCode: "function crcChecksum(packet) {\n  // Your code here\n  \n}", testCases: [{ input: "[0x12, 0x34, 0x56]", expected: String(0x12 ^ 0x34 ^ 0x56) }, { input: "[0xFF, 0xFF]", expected: "0" }], hints: ["Initialize checksum to 0.", "XOR each byte with the running checksum."] },
    ],
  },
  // ─── Web Development ───
  {
    courseSlug: "web-development",
    problems: [
      { id: "web-1", title: "Debounce Function", description: "Implement a debounce function that delays invoking a function until after `wait` ms of inactivity.\n\n**Behavior:** If called multiple times within `wait` ms, only the last call executes.", difficulty: "medium", language: "javascript", starterCode: "function debounce(fn, wait) {\n  // Your code here\n  \n}", testCases: [{ input: "fn, 300", expected: "returns a function" }], hints: ["Use setTimeout and clearTimeout.", "Return a wrapper that clears the previous timer."] },
      { id: "web-2", title: "Deep Clone Object", description: "Deep clone a nested object (no references to original).\n\n**Example:**\n- Input: `{ a: 1, b: { c: 2 } }`\n- Output: `{ a: 1, b: { c: 2 } }` (but not same reference)", difficulty: "medium", language: "javascript", starterCode: "function deepClone(obj) {\n  // Your code here\n  \n}", testCases: [{ input: '{ a: 1, b: { c: 2 } }', expected: "{ a: 1, b: { c: 2 } }" }], hints: ["Handle null and non-object types first.", "Recursively clone nested objects and arrays."] },
      { id: "web-3", title: "URL Query Parser", description: "Parse a query string into a key-value object.\n\n**Example:**\n- Input: `\"?name=John&age=30&city=Delhi\"`\n- Output: `{ name: \"John\", age: \"30\", city: \"Delhi\" }`", difficulty: "easy", language: "javascript", starterCode: "function parseQuery(qs) {\n  // Your code here\n  \n}", testCases: [{ input: '"?name=John&age=30"', expected: '{ name: "John", age: "30" }' }, { input: '""', expected: "{}" }], hints: ["Strip the leading '?' first.", "Split by '&' then split each pair by '='."] },
    ],
  },
  // ─── OOP ───
  {
    courseSlug: "oop",
    problems: [
      { id: "oop-1", title: "Implement a Stack Class", description: "Create a Stack class with `push`, `pop`, `peek`, and `isEmpty` methods.\n\n**Constraints:**\n- `pop` on empty stack returns `null`\n- `peek` on empty stack returns `null`", difficulty: "easy", language: "javascript", starterCode: "class Stack {\n  constructor() {\n    // Your code here\n  }\n  \n  push(val) {}\n  pop() {}\n  peek() {}\n  isEmpty() {}\n}", testCases: [{ input: "push(1), push(2), peek()", expected: "2" }, { input: "pop(), isEmpty()", expected: "true" }], hints: ["Use an internal array to store elements.", "push/pop map to array push/pop."] },
      { id: "oop-2", title: "Implement a Queue Class", description: "Create a Queue class with `enqueue`, `dequeue`, `front`, and `isEmpty` methods.\n\n**Constraints:**\n- `dequeue` on empty queue returns `null`", difficulty: "easy", language: "javascript", starterCode: "class Queue {\n  constructor() {\n    // Your code here\n  }\n  \n  enqueue(val) {}\n  dequeue() {}\n  front() {}\n  isEmpty() {}\n}", testCases: [{ input: "enqueue(1), enqueue(2), front()", expected: "1" }, { input: "dequeue(), dequeue()", expected: "null" }], hints: ["Use an internal array.", "dequeue shifts from the front (index 0)."] },
      { id: "oop-3", title: "Shape Hierarchy", description: "Create a `Shape` base class and `Circle` and `Rectangle` subclasses. Each should have an `area()` method.\n\n**Circle area:** π * r²\n**Rectangle area:** width * height", difficulty: "medium", language: "javascript", starterCode: "class Shape {\n  // Your code here\n}\n\nclass Circle extends Shape {\n  // Your code here\n}\n\nclass Rectangle extends Shape {\n  // Your code here\n}", testCases: [{ input: "new Circle(5).area()", expected: String(Math.PI * 25) }, { input: "new Rectangle(3, 4).area()", expected: "12" }], hints: ["Shape should have a base area() that returns 0.", "Override area() in each subclass."] },
    ],
  },
  // ─── Python ───
  {
    courseSlug: "python",
    problems: [
      { id: "py-1", title: "List Comprehension: Filter Evens", description: "Use a list comprehension to return only even numbers from a list.\n\n**Example:**\n- Input: `[1, 2, 3, 4, 5, 6]`\n- Output: `[2, 4, 6]`", difficulty: "easy", language: "python", starterCode: "def filter_evens(nums):\n    # Your code here\n    pass", testCases: [{ input: "[1,2,3,4,5,6]", expected: "[2, 4, 6]" }, { input: "[1,3,5]", expected: "[]" }], hints: ["Use `[x for x in nums if ...]`.", "Check `x % 2 == 0`."] },
      { id: "py-2", title: "Dictionary Word Count", description: "Count the frequency of each word in a string.\n\n**Example:**\n- Input: `\"hello world hello\"`\n- Output: `{\"hello\": 2, \"world\": 1}`", difficulty: "easy", language: "python", starterCode: "def word_count(text):\n    # Your code here\n    pass", testCases: [{ input: '"hello world hello"', expected: "{'hello': 2, 'world': 1}" }, { input: '""', expected: "{}" }], hints: ["Split the string by spaces.", "Use a dict to count occurrences."] },
      { id: "py-3", title: "Flatten Nested List", description: "Flatten a arbitrarily nested list into a single-level list.\n\n**Example:**\n- Input: `[1, [2, 3], [4, [5, 6]]`\n- Output: `[1, 2, 3, 4, 5, 6]`", difficulty: "medium", language: "python", starterCode: "def flatten(lst):\n    # Your code here\n    pass", testCases: [{ input: "[1, [2, 3], [4, [5, 6]]", expected: "[1, 2, 3, 4, 5, 6]" }, { input: "[[1, 2], [3]]", expected: "[1, 2, 3]" }], hints: ["Check if each element is a list using `isinstance`.", "Recursively flatten sub-lists."] },
      { id: "py-4", title: "Prime Number Generator", description: "Generate all prime numbers up to n using the Sieve of Eratosthenes.\n\n**Example:**\n- Input: `20`\n- Output: `[2, 3, 5, 7, 11, 13, 17, 19]`", difficulty: "medium", language: "python", starterCode: "def sieve(n):\n    # Your code here\n    pass", testCases: [{ input: "20", expected: "[2, 3, 5, 7, 11, 13, 17, 19]" }, { input: "2", expected: "[2]" }], hints: ["Create a boolean array of size n+1, all True initially.", "Mark multiples of each prime as False."] },
    ],
  },
  // ─── Java ───
  {
    courseSlug: "java",
    problems: [
      { id: "java-1", title: "String Palindrome Checker", description: "Check if a string is a palindrome (reads the same forwards and backwards), ignoring case.\n\n**Example:**\n- Input: `\"Racecar\"` → `true`\n- Input: `\"Hello\"` → `false`", difficulty: "easy", language: "javascript", starterCode: "function isPalindrome(s) {\n  // Your code here\n  \n}", testCases: [{ input: '"Racecar"', expected: "true" }, { input: '"Hello"', expected: "false" }, { input: '"A man a plan a canal Panama"', expected: "true" }], hints: ["Convert to lowercase first.", "Compare the string with its reverse."] },
      { id: "java-2", title: "FizzBuzz", description: "Print numbers 1 to n, but:\n- Print \"Fizz\" if divisible by 3\n- Print \"Buzz\" if divisible by 5\n- Print \"FizzBuzz\" if divisible by both\n- Otherwise print the number", difficulty: "easy", language: "javascript", starterCode: "function fizzBuzz(n) {\n  // Your code here\n  \n}", testCases: [{ input: "15", expected: "1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz" }], hints: ["Check divisibility by 15 first (both 3 and 5).", "Then check 3 and 5 individually."] },
      { id: "java-3", title: "Anagram Checker", description: "Check if two strings are anagrams of each other.\n\n**Example:**\n- Input: `\"listen\"`, `\"silent\"` → `true`\n- Input: `\"hello\"`, `\"world\"` → `false`", difficulty: "easy", language: "javascript", starterCode: "function isAnagram(a, b) {\n  // Your code here\n  \n}", testCases: [{ input: '"listen", "silent"', expected: "true" }, { input: '"hello", "world"', expected: "false" }], hints: ["Convert both to lowercase and remove spaces.", "Sort characters and compare."] },
    ],
  },
  // ─── C Language (250 problems across 5 chapters) ───
  {
    courseSlug: "c-language",
    problems: cPracticeProblems,
  },
  // ─── C++ ───
  {
    courseSlug: "cpp",
    problems: [
      { id: "cpp-1", title: "Vector Sum", description: "Given an array, compute the sum of all elements using C++.\n\n**Example:**\n- Input: `[1, 2, 3, 4, 5]`\n- Output: `15`", difficulty: "easy", language: "cpp", starterCode: "#include <vector>\n#include <numeric>\n\nint vectorSum(const std::vector<int>& nums) {\n    // Your code here\n    \n}", testCases: [{ input: "[1,2,3,4,5]", expected: "15" }, { input: "[-1,1]", expected: "0" }], hints: ["Use std::accumulate from <numeric>.", "Or loop and sum manually."] },
      { id: "cpp-2", title: "String Reverse (STL)", description: "Reverse a string using STL algorithms.\n\n**Example:**\n- Input: `\"hello\"`\n- Output: `\"olleh\"`", difficulty: "easy", language: "cpp", starterCode: "#include <string>\n#include <algorithm>\n\nstd::string reverseStr(std::string s) {\n    // Your code here\n    \n}", testCases: [{ input: '"hello"', expected: '"olleh"' }, { input: '""', expected: '""' }], hints: ["Use std::reverse from <algorithm>.", "Or use std::reverse_copy."] },
      { id: "cpp-3", title: "Map Word Frequency", description: "Count word frequencies using a std::map.\n\n**Example:**\n- Input: `\"hello world hello\"`\n- Output: `{hello: 2, world: 1}`", difficulty: "medium", language: "cpp", starterCode: "#include <string>\n#include <map>\n#include <sstream>\n\nstd::map<std::string, int> wordFreq(const std::string& text) {\n    // Your code here\n    \n}", testCases: [{ input: '"hello world hello"', expected: "{hello: 2, world: 1}" }], hints: ["Use stringstream to split by spaces.", "Increment the count in the map for each word."] },
    ],
  },
  // ─── JavaScript ───
  {
    courseSlug: "javascript",
    problems: [
      { id: "js-1", title: "Promise.all Implementation", description: "Implement a simplified version of `Promise.all`.\n\n**Behavior:**\n- Takes an array of promises\n- Returns a promise that resolves with an array of results\n- Rejects if any promise rejects", difficulty: "hard", language: "javascript", starterCode: "function promiseAll(promises) {\n  // Your code here\n  \n}", testCases: [{ input: "[Promise.resolve(1), Promise.resolve(2)]", expected: "[1, 2]" }], hints: ["Track the number of resolved promises.", "Use .then() on each promise to collect results."] },
      { id: "js-2", title: "Event Emitter", description: "Implement a simple Event Emitter with `on`, `off`, and `emit` methods.", difficulty: "medium", language: "javascript", starterCode: "class EventEmitter {\n  constructor() {\n    // Your code here\n  }\n  \n  on(event, cb) {}\n  off(event, cb) {}\n  emit(event, ...args) {}\n}", testCases: [{ input: 'emitter.on("test", fn); emitter.emit("test", 42)', expected: "fn called with 42" }], hints: ["Use a Map of event name to Set of callbacks.", "off removes a specific callback from the Set."] },
      { id: "js-3", title: "Curry Function", description: "Implement a curry function that converts a multi-arg function into a chain of single-arg calls.\n\n**Example:**\n- `curry(add)(1)(2)(3)` → `6`", difficulty: "medium", language: "javascript", starterCode: "function curry(fn) {\n  // Your code here\n  \n}", testCases: [{ input: "curry((a,b,c) => a+b+c)(1)(2)(3)", expected: "6" }, { input: "curry((a,b) => a*b)(4)(5)", expected: "20" }], hints: ["Return a function that collects args.", "When the number of args matches fn.length, call fn."] },
    ],
  },
  // ─── Computer Architecture ───
  {
    courseSlug: "computer-architecture",
    problems: [
      { id: "ca-1", title: "Binary to Decimal", description: "Convert a binary string to its decimal equivalent.\n\n**Example:**\n- Input: `\"1011\"`\n- Output: `11`", difficulty: "easy", language: "javascript", starterCode: "function binToDec(bin) {\n  // Your code here\n  \n}", testCases: [{ input: '"1011"', expected: "11" }, { input: '"0"', expected: "0" }, { input: '"11111111"', expected: "255" }], hints: ["Each digit's value is digit * 2^position.", "Or use parseInt(bin, 2)."] },
      { id: "ca-2", title: "Two's Complement", description: "Compute the two's complement of an 8-bit binary number.\n\n**Example:**\n- Input: `\"00000101\"` (5)\n- Output: `\"11111011\"` (-5)", difficulty: "medium", language: "javascript", starterCode: "function twosComplement(bin) {\n  // Your code here\n  \n}", testCases: [{ input: '"00000101"', expected: '"11111011"' }, { input: '"00000000"', expected: '"00000000"' }], hints: ["Invert all bits, then add 1.", "Work with the binary as a string, flip 0s and 1s."] },
      { id: "ca-3", title: "Cache Hit Ratio", description: "Calculate the cache hit ratio given hits and total accesses.\n\n**Example:**\n- Input: `hits=950`, `total=1000`\n- Output: `0.95`", difficulty: "easy", language: "javascript", starterCode: "function cacheHitRatio(hits, total) {\n  // Your code here\n  \n}", testCases: [{ input: "950, 1000", expected: "0.95" }, { input: "0, 100", expected: "0" }], hints: ["Simple division: hits / total.", "Handle division by zero."] },
    ],
  },
  // ─── Discrete Structures ───
  {
    courseSlug: "discrete-structures",
    problems: [
      { id: "ds-1", title: "Permutations of a Set", description: "Generate all permutations of a given set of elements.\n\n**Example:**\n- Input: `[1, 2, 3]`\n- Output: All 6 permutations", difficulty: "medium", language: "javascript", starterCode: "function permutations(arr) {\n  // Your code here\n  \n}", testCases: [{ input: "[1,2,3]", expected: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }], hints: ["Use backtracking: swap each element with the first, then recurse.", "Base case: when index reaches the end."] },
      { id: "ds-2", title: "Power Set", description: "Generate the power set (all subsets) of a set.\n\n**Example:**\n- Input: `[1, 2, 3]`\n- Output: `[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]`", difficulty: "medium", language: "javascript", starterCode: "function powerSet(arr) {\n  // Your code here\n  \n}", testCases: [{ input: "[1,2,3]", expected: "[[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]" }], hints: ["Each element can either be included or excluded.", "Use bitmasks from 0 to 2^n - 1."] },
      { id: "ds-3", title: "GCD (Euclidean Algorithm)", description: "Find the Greatest Common Divisor using the Euclidean algorithm.\n\n**Example:**\n- Input: `a=48, b=18`\n- Output: `6`", difficulty: "easy", language: "javascript", starterCode: "function gcd(a, b) {\n  // Your code here\n  \n}", testCases: [{ input: "48, 18", expected: "6" }, { input: "7, 13", expected: "1" }], hints: ["gcd(a, b) = gcd(b, a % b).", "Base case: when b === 0, return a."] },
    ],
  },
  // ─── Digital System Design ───
  {
    courseSlug: "digital-system-design",
    problems: [
      { id: "dig-1", title: "Decimal to Binary", description: "Convert a decimal number to its binary representation.\n\n**Example:**\n- Input: `13`\n- Output: `\"1101\"`", difficulty: "easy", language: "javascript", starterCode: "function decToBin(n) {\n  // Your code here\n  \n}", testCases: [{ input: "13", expected: '"1101"' }, { input: "0", expected: '"0"' }, { input: "255", expected: '"11111111"' }], hints: ["Repeatedly divide by 2 and collect remainders.", "Reverse the remainders."] },
      { id: "dig-2", title: "Boolean Simplifier", description: "Evaluate a boolean expression given variable assignments.\n\n**Example:**\n- Input: `expr=\"A AND B OR NOT C\"`, `vars={A:true, B:false, C:true}`\n- Output: `false`", difficulty: "medium", language: "javascript", starterCode: "function evalBool(expr, vars) {\n  // Your code here\n  \n}", testCases: [{ input: '"A AND B OR NOT C", {A:true, B:false, C:true}', expected: "false" }], hints: ["Replace variable names with their values.", "Evaluate NOT before AND before OR."] },
      { id: "dig-3", title: "4-to-1 Multiplexer", description: "Implement a 4-to-1 multiplexer. Given 4 inputs and 2 select lines, return the selected input.\n\n**Example:**\n- Input: `inputs=[10,20,30,40]`, `sel=2`\n- Output: `30`", difficulty: "easy", language: "javascript", starterCode: "function mux4to1(inputs, sel) {\n  // Your code here\n  \n}", testCases: [{ input: "[10,20,30,40], 2", expected: "30" }, { input: "[1,2,3,4], 0", expected: "1" }], hints: ["sel directly indexes into the inputs array.", "Return inputs[sel]."] },
    ],
  },
  // ─── Automata & Formal Languages ───
  {
    courseSlug: "automata-formal-languages",
    problems: [
      { id: "auto-1", title: "Regex: Email Validator", description: "Write a function that checks if a string matches a basic email pattern: `word@word.word`.\n\n**Example:**\n- Input: `\"user@domain.com\"` → `true`\n- Input: `\"invalid@\"` → `false`", difficulty: "easy", language: "javascript", starterCode: "function isValidEmail(s) {\n  // Your code here\n  \n}", testCases: [{ input: '"user@domain.com"', expected: "true" }, { input: '"invalid@"', expected: "false" }, { input: '"@no-user.com"', expected: "false" }], hints: ["Use a regex: /^[\\w]+@[\\w]+\\.[\\w]+$/.", "Check the pattern matches the entire string."] },
      { id: "auto-2", title: "String Reversal with Stack", description: "Simulate reversing a string using a stack (push all chars, then pop).\n\n**Example:**\n- Input: `\"abc\"`\n- Output: `\"cba\"`", difficulty: "easy", language: "javascript", starterCode: "function reverseWithStack(s) {\n  // Your code here\n  \n}", testCases: [{ input: '"abc"', expected: '"cba"' }, { input: '""', expected: '""' }], hints: ["Push each character onto an array.", "Pop from the array to build the reversed string."] },
      { id: "auto-3", title: "DFA: Accept Strings Ending in 'ab'", description: "Determine if a string of 'a's and 'b's ends with \"ab\".\n\n**Example:**\n- Input: `\"aab\"` → `true`\n- Input: `\"baa\"` → `false`", difficulty: "easy", language: "javascript", starterCode: "function endsWithAB(s) {\n  // Your code here\n  \n}", testCases: [{ input: '"aab"', expected: "true" }, { input: '"baa"', expected: "false" }, { input: '"ab"', expected: "true" }], hints: ["Check if the last two characters are 'a' and 'b'.", "Use s.endsWith('ab')."] },
    ],
  },
  // ─── Probability & Statistics ───
  {
    courseSlug: "probability-statistics",
    problems: [
      { id: "prob-1", title: "Mean, Median, Mode", description: "Compute mean, median, and mode of a list of numbers.\n\n**Example:**\n- Input: `[1, 2, 2, 3, 4]`\n- Output: `mean=2.4, median=2, mode=2`", difficulty: "easy", language: "javascript", starterCode: "function stats(nums) {\n  // Your code here\n  \n}", testCases: [{ input: "[1,2,2,3,4]", expected: "{mean:2.4, median:2, mode:2}" }, { input: "[5,5,5]", expected: "{mean:5, median:5, mode:5}" }], hints: ["Mean = sum / count.", "Median = middle value (sort first).", "Mode = most frequent value."] },
      { id: "prob-2", title: "Standard Deviation", description: "Calculate the standard deviation of a list of numbers.\n\n**Example:**\n- Input: `[2, 4, 4, 4, 5, 5, 7, 9]`\n- Output: `2.0`", difficulty: "medium", language: "javascript", starterCode: "function stdDev(nums) {\n  // Your code here\n  \n}", testCases: [{ input: "[2,4,4,4,5,5,7,9]", expected: "2.0" }], hints: ["First compute the mean.", "Then compute variance: mean of squared differences from the mean.", "Std dev = sqrt(variance)."] },
      { id: "prob-3", title: "Binomial Coefficient", description: "Compute C(n, k) — the number of ways to choose k items from n.\n\n**Example:**\n- Input: `n=5, k=2`\n- Output: `10`", difficulty: "easy", language: "javascript", starterCode: "function binomial(n, k) {\n  // Your code here\n  \n}", testCases: [{ input: "5, 2", expected: "10" }, { input: "10, 0", expected: "1" }, { input: "6, 6", expected: "1" }], hints: ["Use the formula: n! / (k! * (n-k)!).", "Or use Pascal's triangle / iterative multiplication."] },
    ],
  },
  // ─── Artificial Intelligence ───
  {
    courseSlug: "artificial-intelligence",
    problems: [
      { id: "ai-1", title: "A* Search", description: "Implement A* search on a grid. Find the shortest path from start to goal avoiding obstacles.\n\n**Grid:** 0 = open, 1 = obstacle\n**Heuristic:** Manhattan distance", difficulty: "hard", language: "python", starterCode: "import heapq\n\ndef astar(grid, start, goal):\n    # Your code here\n    pass", testCases: [{ input: "grid=[[0,0,0],[0,1,0],[0,0,0]], start=(0,0), goal=(2,2)", expected: "[(0,0),(1,0),(2,0),(2,1),(2,2)] or equivalent shortest path" }], hints: ["Use a priority queue sorted by f = g + h.", "g = cost so far, h = heuristic estimate to goal."] },
      { id: "ai-2", title: "Minimax Algorithm", description: "Implement minimax for a simple game tree.\n\n**Given:** A tree where leaves have scores. The maximizing player picks the best score, minimizing player picks the worst.", difficulty: "hard", language: "python", starterCode: "def minimax(node, depth, is_maximizing):\n    # Your code here\n    pass", testCases: [{ input: "tree with leaves [3,5,6,9,1,2,0,-1], maximizer first", expected: "6" }], hints: ["Base case: if depth == 0 or leaf node, return the value.", "Maximizing: return max of children. Minimizing: return min of children."] },
      { id: "ai-3", title: "Naive Bayes Classifier", description: "Implement a simple Naive Bayes classifier for text.\n\n**Task:** Given training data (words + label), predict the label for a new text.", difficulty: "hard", language: "python", starterCode: "def naive_bayes_train(texts, labels):\n    # Your code here\n    pass\n\ndef naive_bayes_predict(model, text):\n    # Your code here\n    pass", testCases: [{ input: "texts=['good great', 'bad poor'], labels=['pos','neg']", expected: "predict('good') → 'pos'" }], hints: ["Count word frequencies per class.", "Use log probabilities to avoid underflow."] },
    ],
  },
  // ─── Machine Learning ───
  {
    courseSlug: "machine-learning",
    problems: [
      { id: "ml-1", title: "Linear Regression (SGD)", description: "Implement simple linear regression using stochastic gradient descent.\n\n**Given:** Pairs (x, y)\n**Find:** slope `m` and intercept `b` such that y ≈ mx + b", difficulty: "hard", language: "python", starterCode: "def linear_regression_sgd(data, lr=0.01, epochs=1000):\n    # Your code here\n    pass", testCases: [{ input: "[(1,2),(2,4),(3,6)]", expected: "m≈2.0, b≈0.0" }], hints: ["Initialize m and b to 0.", "For each point: compute prediction, error, update m and b."] },
      { id: "ml-2", title: "K-Means Clustering", description: "Implement one step of K-Means clustering.\n\n**Given:** Points and K centroids\n**Task:** Assign points to nearest centroid, then recompute centroids.", difficulty: "hard", language: "python", starterCode: "def kmeans_step(points, centroids):\n    # Your code here\n    pass", testCases: [{ input: "points=[(1,1),(2,2),(10,10)], centroids=[(0,0),(5,5)]", expected: "assignments=[0,0,1], new_centroids=[(1.5,1.5),(10,10)]" }], hints: ["For each point, find the closest centroid using Euclidean distance.", "New centroid = mean of assigned points."] },
      { id: "ml-3", title: "Sigmoid Function", description: "Implement the sigmoid activation function.\n\n**Formula:** σ(x) = 1 / (1 + e^(-x))\n\n**Example:**\n- Input: `0` → `0.5`\n- Input: `2` → `0.88`", difficulty: "easy", language: "python", starterCode: "import math\n\ndef sigmoid(x):\n    # Your code here\n    pass", testCases: [{ input: "0", expected: "0.5" }, { input: "2", expected: "0.88" }], hints: ["Use math.exp().", "Be careful with overflow for large negative x."] },
    ],
  },
  // ─── Compiler Design ───
  {
    courseSlug: "compiler-design",
    problems: [
      { id: "comp-1", title: "Infix to Postfix", description: "Convert an infix expression to postfix (Reverse Polish Notation).\n\n**Example:**\n- Input: `\"3 + 4 * 2\"`\n- Output: `\"3 4 2 * +\"`", difficulty: "medium", language: "javascript", starterCode: "function infixToPostfix(expr) {\n  // Your code here\n  \n}", testCases: [{ input: '"3 + 4 * 2"', expected: '"3 4 2 *+"' }, { input: '"( 1 + 2 ) * 3"', expected: '"1 2 + 3 *"' }], hints: ["Use a stack for operators.", "Pop operators with higher or equal precedence first."] },
      { id: "comp-2", title: "Simple Lexer", description: "Tokenize a simple arithmetic expression into tokens (numbers and operators).\n\n**Example:**\n- Input: `\"3 + 4 * 2\"`\n- Output: `[\"3\", \"+\", \"4\", \"*\", \"2\"]`", difficulty: "easy", language: "javascript", starterCode: "function tokenize(expr) {\n  // Your code here\n  \n}", testCases: [{ input: '"3 + 4 * 2"', expected: '["3","+","4","*","2"]' }, { input: '"10-2"', expected: '["10","-","2"]' }], hints: ["Use regex to match numbers and operators.", "/\\d+|[+\\-*/()]/g"] },
      { id: "comp-3", title: "Balanced Parentheses", description: "Check if a string has balanced parentheses: `()`, `[]`, `{}`.\n\n**Example:**\n- Input: `\"{[()]}\"` → `true`\n- Input: `\"{(})\"` → `false`", difficulty: "medium", language: "javascript", starterCode: "function isBalanced(s) {\n  // Your code here\n  \n}", testCases: [{ input: '"{[()]}"', expected: "true" }, { input: '"{(})"', expected: "false" }, { input: '"("', expected: "false" }], hints: ["Use a stack to track opening brackets.", "Pop when you find a matching closing bracket."] },
    ],
  },
  // ─── Software Engineering ───
  {
    courseSlug: "software-engineering",
    problems: [
      { id: "se-1", title: "Dependency Sort (Topological)", description: "Given tasks and their dependencies, return a valid execution order (topological sort).\n\n**Example:**\n- Input: `{A: [], B: [\"A\"], C: [\"A\"], D: [\"B\", \"C\"]}`\n- Output: `[\"A\", \"B\", \"C\", \"D\"]` (or equivalent)", difficulty: "medium", language: "javascript", starterCode: "function topoSort(deps) {\n  // Your code here\n  \n}", testCases: [{ input: '{A:[], B:["A"], C:["A"], D:["B","C"]}', expected: '["A","B","C","D"] or valid order' }], hints: ["Use Kahn's algorithm with in-degree counting.", "Start with tasks having no dependencies."] },
      { id: "se-2", title: "Version Comparator", description: "Compare two semantic version strings (MAJOR.MINOR.PATCH).\n\n**Example:**\n- Input: `\"1.0.0\"`, `\"1.1.0\"`\n- Output: `-1` (first is older)", difficulty: "easy", language: "javascript", starterCode: "function compareVersions(a, b) {\n  // Your code here\n  \n}", testCases: [{ input: '"1.0.0", "1.1.0"', expected: "-1" }, { input: '"2.0.0", "1.9.9"', expected: "1" }, { input: '"1.0.0", "1.0.0"', expected: "0" }], hints: ["Split by '.', convert to numbers.", "Compare from left to right: major, then minor, then patch."] },
      { id: "se-3", title: "TODO Parser", description: "Parse a TODO list in the format:\n```\n- [x] Done task\n- [ ] Pending task\n```\nReturn an array of `{ task, done }` objects.", difficulty: "easy", language: "javascript", starterCode: "function parseTodos(text) {\n  // Your code here\n  \n}", testCases: [{ input: '"- [x] Done\\n- [ ] Pending"', expected: '[{task:"Done",done:true},{task:"Pending",done:false}]' }], hints: ["Split by newlines.", "Check if the checkbox contains 'x'."] },
    ],
  },
  // ─── Data Mining & Warehousing ───
  {
    courseSlug: "data-mining-warehousing",
    problems: [
      { id: "dm-1", title: "Min-Max Normalization", description: "Normalize a value using Min-Max normalization to [0, 1] range.\n\n**Formula:** `(value - min) / (max - min)`\n\n**Example:**\n- Input: `value=50, min=0, max=100`\n- Output: `0.5`", difficulty: "easy", language: "javascript", starterCode: "function minMaxNorm(value, min, max) {\n  // Your code here\n  \n}", testCases: [{ input: "50, 0, 100", expected: "0.5" }, { input: "0, 0, 100", expected: "0" }, { input: "100, 0, 100", expected: "1" }], hints: ["Direct formula application.", "Handle max == min to avoid division by zero."] },
      { id: "dm-2", title: "Apriori: Support Count", description: "Compute the support count of an itemset in a transaction database.\n\n**Example:**\n- Input: `transactions=[[1,2,3],[2,3],[1,2]], itemset=[2,3]`\n- Output: `2` (appears in 2 transactions)", difficulty: "easy", language: "javascript", starterCode: "function supportCount(transactions, itemset) {\n  // Your code here\n  \n}", testCases: [{ input: "[[1,2,3],[2,3],[1,2]], [2,3]", expected: "2" }], hints: ["For each transaction, check if all items in the itemset are present.", "Count how many transactions satisfy this."] },
      { id: "dm-3", title: "KNN Classifier", description: "Implement K-Nearest Neighbors classification.\n\n**Given:** Training points with labels, a test point, and K.\n**Return:** The majority label among K nearest neighbors.", difficulty: "medium", language: "python", starterCode: "def knn(train_points, train_labels, test_point, k):\n    # Your code here\n    pass", testCases: [{ input: "train=[(1,1),(2,2),(9,9)], labels=['A','A','B'], test=(3,3), k=2", expected: "'A'" }], hints: ["Compute Euclidean distance from test_point to each training point.", "Sort by distance, take the top K, return majority vote."] },
    ],
  },
  // ─── Distributed OS ───
  {
    courseSlug: "distributed-os",
    problems: [
      { id: "dos-1", title: "Consistent Hashing", description: "Implement basic consistent hashing. Given N nodes and a key, return which node handles the key.\n\n**Example:**\n- Input: `nodes=[\"A\",\"B\",\"C\"]`, `key=\"user123\"`\n- Output: One of the nodes", difficulty: "medium", language: "javascript", starterCode: "function consistentHash(nodes, key) {\n  // Your code here\n  \n}", testCases: [{ input: '["A","B","C"], "user123"', expected: "one of A, B, C" }], hints: ["Hash each node and the key to a ring (0-360).", "The key is assigned to the next node clockwise."] },
      { id: "dos-2", title: "Lamport Timestamp", description: "Simulate Lamport logical clocks. Given a list of events with send/receive, return the logical timestamps.\n\n**Rules:**\n- Increment clock on local event\n- On send, increment and attach timestamp\n- On receive, set clock = max(local, received) + 1", difficulty: "medium", language: "javascript", starterCode: "function lamportTimestamps(events) {\n  // Your code here\n  \n}", testCases: [{ input: '[{type:"send",proc:0},{type:"receive",proc:1}]', expected: "[1, 2]" }], hints: ["Maintain a clock per process.", "On receive, take max of both clocks + 1."] },
      { id: "dos-3", title: "MapReduce: Word Count", description: "Implement the MapReduce pattern for word counting.\n\n**Map phase:** Split text into words, emit (word, 1).\n**Reduce phase:** Sum counts per word.", difficulty: "medium", language: "javascript", starterCode: "function mapReduce(text) {\n  // Your code here\n  \n}", testCases: [{ input: '"hello world hello"', expected: '{hello:2, world:1}' }], hints: ["Map: split by spaces, return array of [word, 1] pairs.", "Reduce: group by word, sum the counts."] },
    ],
  },
  // ─── HPC ───
  {
    courseSlug: "hpc",
    problems: [
      { id: "hpc-1", title: "Parallel Reduction (Sum)", description: "Given an array, compute the sum using a parallel reduction approach.\n\n**Sequential:** Sum all elements.\n**Parallel simulation:** Pair-wise sum in rounds.", difficulty: "medium", language: "javascript", starterCode: "function parallelSum(arr) {\n  // Simulate parallel reduction\n  // Your code here\n  \n}", testCases: [{ input: "[1,2,3,4,5,6,7,8]", expected: "36" }, { input: "[10]", expected: "10" }], hints: ["Pair elements: [0+1, 2+3, 4+5, ...].", "Repeat until one element remains."] },
      { id: "hpc-2", title: "Matrix Multiplication", description: "Multiply two NxN matrices.\n\n**Example:**\n- A = [[1,2],[3,4]], B = [[5,6],[7,8]]\n- Result = [[19,22],[43,50]]", difficulty: "medium", language: "javascript", starterCode: "function matMul(A, B) {\n  // Your code here\n  \n}", testCases: [{ input: "[[1,2],[3,4]], [[5,6],[7,8]]", expected: "[[19,22],[43,50]]" }], hints: ["Result[i][j] = sum of A[i][k] * B[k][j] for all k.", "Triple nested loop."] },
      { id: "hpc-3", title: "FLOPS Calculator", description: "Calculate FLOPS (Floating Point Operations Per Second) given operations count and time.\n\n**Formula:** `ops / time_in_seconds`\n\n**Example:**\n- Input: `ops=1e9`, `time=2.0`\n- Output: `500000000` (500 MFLOPS)", difficulty: "easy", language: "javascript", starterCode: "function calcFLOPS(ops, timeSeconds) {\n  // Your code here\n  \n}", testCases: [{ input: "1e9, 2.0", expected: "500000000" }, { input: "1e12, 1.0", expected: "1000000000000" }], hints: ["Simple division: ops / timeSeconds.", "Consider formatting the result with units (MFLOPS, GFLOPS)."] },
    ],
  },
  // ─── Image Processing ───
  {
    courseSlug: "image-processing",
    problems: [
      { id: "ip-1", title: "Grayscale Conversion", description: "Convert an RGB pixel to grayscale using the luminosity method.\n\n**Formula:** `0.299*R + 0.587*G + 0.114*B`\n\n**Example:**\n- Input: `R=100, G=150, B=200`\n- Output: `152.55`", difficulty: "easy", language: "javascript", starterCode: "function toGrayscale(r, g, b) {\n  // Your code here\n  \n}", testCases: [{ input: "100, 150, 200", expected: "152.55" }, { input: "255, 255, 255", expected: "255" }], hints: ["Apply the formula directly.", "0.299*R + 0.587*G + 0.114*B"] },
      { id: "ip-2", title: "Image Histogram", description: "Compute the intensity histogram of a grayscale image (256 bins).\n\n**Example:**\n- Input: `[0, 0, 128, 255, 128]`\n- Output: `{0:2, 128:2, 255:1}` (others 0)", difficulty: "easy", language: "javascript", starterCode: "function histogram(pixels) {\n  // Your code here\n  \n}", testCases: [{ input: "[0,0,128,255,128]", expected: "{0:2,128:2,255:1}" }], hints: ["Create an array of 256 zeros.", "Increment bin[pixel] for each pixel."] },
      { id: "ip-3", title: "Convolution Kernel", description: "Apply a 3x3 convolution kernel to a 5x5 matrix.\n\n**Kernel (Sharpen):**\n```\n[[ 0, -1,  0],\n [-1,  5, -1],\n [ 0, -1,  0]]\n```", difficulty: "medium", language: "javascript", starterCode: "function convolve(matrix, kernel) {\n  // Your code here\n  \n}", testCases: [{ input: "5x5 matrix of 1s, sharpen kernel", expected: "5x5 matrix (center 1s unchanged, edges may vary)" }], hints: ["Output is 3x3 (valid convolution).", "For each position, multiply kernel with the overlapping 3x3 sub-matrix and sum."] },
    ],
  },
  // ─── Multicore Programming ───
  {
    courseSlug: "multicore-programming",
    problems: [
      { id: "mp-1", title: "Parallel Array Sum (Simulated)", description: "Simulate dividing an array across N threads and summing in parallel.\n\n**Example:**\n- Input: `[1,2,3,4,5,6]`, `threads=3`\n- Thread 0: [1,2], Thread 1: [3,4], Thread 2: [5,6]\n- Output: `21`", difficulty: "easy", language: "javascript", starterCode: "function parallelArraySum(arr, numThreads) {\n  // Your code here\n  \n}", testCases: [{ input: "[1,2,3,4,5,6], 3", expected: "21" }, { input: "[10], 1", expected: "10" }], hints: ["Split the array into numThreads chunks.", "Sum each chunk, then sum the results."] },
      { id: "mp-2", title: "Producer-Consumer Simulation", description: "Simulate a bounded buffer with producer-consumer pattern.\n\n**Given:** Buffer size, a list of produce/consume operations.\n**Return:** Final buffer state and total items consumed.", difficulty: "medium", language: "javascript", starterCode: "function producerConsumer(bufferSize, operations) {\n  // Your code here\n  \n}", testCases: [{ input: "size=3, ops=[\"produce A\",\"produce B\",\"consume\",\"produce C\"]", expected: 'buffer:["A","C"], consumed:1' }], hints: ["Use an array as the buffer.", "Produce: push if buffer not full. Consume: shift if buffer not empty."] },
      { id: "mp-3", title: "Race Condition Detector", description: "Given a log of concurrent operations, detect potential race conditions.\n\n**Rule:** A race occurs if two operations access the same variable and at least one is a write, with no synchronization between them.", difficulty: "hard", language: "javascript", starterCode: "function detectRaces(operations) {\n  // Your code here\n  \n}", testCases: [{ input: '[{op:"read",var:"x",time:1},{op:"write",var:"x",time:2},{op:"read",var:"x",time:3}]', expected: "[{var:'x',ops:[1,3]}]" }], hints: ["Group operations by variable.", "Check for overlapping read/write without locks."] },
    ],
  },
  // ─── Advanced Microprocessor ───
  {
    courseSlug: "advanced-microprocessor",
    problems: [
      { id: "amp-1", title: "Pipeline Stall Calculator", description: "Calculate the number of pipeline stalls for a sequence of instructions.\n\n**Rules:**\n- Data hazard: if instruction i+1 reads a register written by instruction i\n- No forwarding assumed\n- Pipeline: IF, ID, EX, MEM, WB", difficulty: "medium", language: "javascript", starterCode: "function pipelineStalls(instructions) {\n  // Your code here\n  \n}", testCases: [{ input: '[{op:"ADD",dest:"R1",src1:"R2",src2:"R3"},{op:"SUB",dest:"R4",src1:"R1",src2:"R5"}]', expected: "2" }], hints: ["Check if any source register of instruction i+1 matches the dest of instruction i.", "Each hazard causes 2 stalls (without forwarding)."] },
      { id: "amp-2", title: "Cache Associativity", description: "Given cache parameters, determine which set a memory address maps to.\n\n**Parameters:** Cache size, block size, associativity\n**Example:** Cache=1024B, block=16B, 2-way, address=0x1A3 → set = ?", difficulty: "medium", language: "javascript", starterCode: "function cacheSet(address, cacheSize, blockSize, associativity) {\n  // Your code here\n  \n}", testCases: [{ input: "0x1A3, 1024, 16, 2", expected: "10" }], hints: ["Number of sets = cacheSize / (blockSize * associativity).", "Set index = (address / blockSize) % numSets."] },
      { id: "amp-3", title: "Branch Prediction Accuracy", description: "Calculate branch prediction accuracy given a trace of predictions and actual outcomes.\n\n**Example:**\n- Predictions: `[1, 1, 0, 1, 0]`\n- Actual: `[1, 0, 0, 1, 1]`\n- Matches: 3 out of 5 → `60%`", difficulty: "easy", language: "javascript", starterCode: "function branchAccuracy(predictions, actual) {\n  // Your code here\n  \n}", testCases: [{ input: "[1,1,0,1,0], [1,0,0,1,1]", expected: "0.6" }], hints: ["Compare predictions[i] === actual[i] for each index.", "Count matches, divide by total."] },
    ],
  },
  // ─── Software Project Management ───
  {
    courseSlug: "software-project-management",
    problems: [
      { id: "spm-1", title: "Story Point Velocity", description: "Calculate average velocity from sprint data.\n\n**Example:**\n- Input: `[20, 25, 30, 22, 28]` (story points per sprint)\n- Output: `25.0`", difficulty: "easy", language: "javascript", starterCode: "function avgVelocity(sprints) {\n  // Your code here\n  \n}", testCases: [{ input: "[20,25,30,22,28]", expected: "25" }, { input: "[10]", expected: "10" }], hints: ["Sum all sprint points.", "Divide by number of sprints."] },
      { id: "spm-2", title: "PERT Estimator", description: "Calculate PERT estimate for a task.\n\n**Formula:** `(optimistic + 4*mostLikely + pessimistic) / 6`\n\n**Example:**\n- Input: `opt=2, ml=5, pess=14`\n- Output: `6.0`", difficulty: "easy", language: "javascript", starterCode: "function pert(opt, ml, pess) {\n  // Your code here\n  \n}", testCases: [{ input: "2, 5, 14", expected: "6" }, { input: "1, 1, 1", expected: "1" }], hints: ["Apply the PERT formula directly."] },
      { id: "spm-3", title: "Gantt Chart Data", description: "Given tasks with start/end days, generate a simple Gantt chart representation.\n\n**Output:** Array of `{ task, start, end, duration }` sorted by start date.", difficulty: "easy", language: "javascript", starterCode: "function ganttChart(tasks) {\n  // Your code here\n  \n}", testCases: [{ input: '[{task:"A",start:1,end:5},{task:"B",start:3,end:7}]', expected: '[{task:"A",start:1,end:5,duration:4},{task:"B",start:3,end:7,duration:4}]' }], hints: ["Sort tasks by start date.", "Calculate duration = end - start."] },
    ],
  },
  // ─── Industry 4.0 ───
  {
    courseSlug: "industry-4-0",
    problems: [
      { id: "i4-1", title: "IoT Sensor Aggregator", description: "Given readings from multiple IoT sensors, compute average, min, and max for each sensor type.\n\n**Example:**\n- Input: `[{type:\"temp\",val:25},{type:\"temp\",val:30},{type:\"humid\",val:60}]`\n- Output: `{temp:{avg:27.5,min:25,max:30},humid:{avg:60,min:60,max:60}}`", difficulty: "easy", language: "javascript", starterCode: "function aggregateSensors(readings) {\n  // Your code here\n  \n}", testCases: [{ input: '[{type:"temp",val:25},{type:"temp",val:30},{type:"humid",val:60}]', expected: '{temp:{avg:27.5,min:25,max:30},humid:{avg:60,min:60,max:60}}' }], hints: ["Group readings by type.", "For each group, compute avg, min, max."] },
      { id: "i4-2", title: "Digital Twin Diff", description: "Compare two states of a digital twin (as objects) and report changed fields.\n\n**Example:**\n- Input: `prev={temp:25, status:\"on\"}`, `curr={temp:28, status:\"on\"}`\n- Output: `[{field:\"temp\", from:25, to:28}]`", difficulty: "easy", language: "javascript", starterCode: "function twinDiff(prev, curr) {\n  // Your code here\n  \n}", testCases: [{ input: '{temp:25, status:"on"}, {temp:28, status:"on"}', expected: '[{field:"temp",from:25,to:28}]' }], hints: ["Iterate over keys of one object.", "Compare prev[key] !== curr[key]."] },
      { id: "i4-3", title: "Predictive Maintenance Score", description: "Calculate a health score for equipment based on sensor readings.\n\n**Formula:** `score = 100 - (vibration*2 + temperature*0.5 + errorCount*10)`\n**Clamp to [0, 100].**", difficulty: "easy", language: "javascript", starterCode: "function healthScore(vibration, temperature, errorCount) {\n  // Your code here\n  \n}", testCases: [{ input: "5, 80, 2", expected: "70" }, { input: "20, 100, 10", expected: "0" }], hints: ["Apply the formula.", "Use Math.max(0, Math.min(100, score)) to clamp."] },
    ],
  },
];
