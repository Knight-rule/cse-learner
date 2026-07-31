# JavaScript Tutorial Outline (W3Schools Style)

## 1. Introduction

### Overview
Learn JavaScript — the programming language of the web. JavaScript makes web pages interactive by manipulating HTML and CSS dynamically.

### Chapter 1: JavaScript Basics
- What is JavaScript?
- JavaScript vs HTML vs CSS — Roles and Responsibilities
- Where JavaScript Runs (Browser, Node.js)
- Adding JavaScript to HTML (`<script>` tag, external file)
- Your First JavaScript Program (`console.log`)
- JavaScript Syntax Basics (Semicolons, Case Sensitivity)
- JavaScript Output Methods (`console.log`, `window.alert`, `document.write()`, ` innerHTML`)

**Example:**
```javascript
console.log("Hello, World!");
alert("Welcome!");
document.getElementById("demo").innerHTML = "JavaScript is running!";
```

**Exercise:** Create an HTML file linked to a JavaScript file that displays "Hello, JavaScript!" in a paragraph element using `innerHTML`.
**Quiz:**
1. What is JavaScript used for?
2. Which HTML tag is used to include JavaScript?
3. Which method prints to the browser console?
4. How do you write a string in JavaScript?
5. Is JavaScript the same as Java?

---

### Chapter 2: Variables and Data Types
- Declaring Variables (`var`, `let`, `const`)
- `let` vs `const` vs `var` — Scoping Differences
- String Data Type
- Number Data Type (integers and floats)
- Boolean Data Type (`true`, `false`)
- `null` and `undefined`
- `typeof` Operator
- Type Conversion (`String()`, `Number()`, `Boolean()`)
- Template Literals (Backtick Strings)

**Example:**
```javascript
let name = "Alice";
const age = 25;
var isStudent = true;
let city; // undefined
console.log(typeof name);
let message = `Hello, ${name}! You are ${age} years old.`;
```

**Exercise:** Declare variables for your name, age, and city using `let` and `const`. Print a template literal greeting.
**Quiz:**
1. What is the difference between `let` and `const`?
2. Which keyword should you prefer for variables that won't change?
3. What does `typeof null` return?
4. How do you convert a number to a string?
5. What does `undefined` mean?

---

---

## 2. Operators and Control Flow

### Overview
Learn how to perform operations and control the flow of execution in JavaScript.

### Chapter 3: Operators
- Arithmetic Operators (`+`, `-`, `*`, `/`, `%`, `**`)
- Assignment Operators (`=`, `+=`, `-=`, `*=`, `/=`)
- Comparison Operators (`==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`)
- Logical Operators (`&&`, `||`, `!`)
- Increment and Decrement (`++`, `--`)
- String Operators (`+` for concatenation, template literals)
- Truthy and Falsy Values
- Short-Circuit Evaluation

**Example:**
```javascript
let a = 10;
let b = 3;
console.log(a + b);  // 13
console.log(a % b);  // 1
console.log(a === b); // false
console.log(a > 5 && b < 5); // true
console.log(!false); // true
```

**Exercise:** Write a program that checks if a number is even using the modulo operator and logical operators.
**Quiz:**
1. What does the `===` operator check that `==` does not?
2. What is the result of `10 % 3`?
3. Which operator is used for string concatenation?
4. What is a falsy value in JavaScript?
5. What does short-circuit evaluation mean?

---

### Chapter 4: Conditionals
- `if` Statement
- `else` Statement
- `else if` Ladder
- Ternary Operator (`condition ? expr1 : expr2`)
- `switch` Statement
- `switch` with `break` and `default`
- Nested Conditionals
- Comparison vs Strict Equality

**Example:**
```javascript
let score = 85;
if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else {
  console.log("Grade C");
}

let day = new Date().getDay();
switch(day) {
  case 0: console.log("Sunday"); break;
  case 1: console.log("Monday"); break;
  default: console.log("Weekday");
}

let result = score >= 50 ? "Pass" : "Fail";
```

**Exercise:** Write a program that categorizes a number as positive, negative, or zero using `if/else if/else`.
**Quiz:**
1. What keyword starts an if block?
2. What is the ternary operator syntax?
3. How do you handle multiple conditions with `switch`?
4. What is the difference between `==` and `===`?
5. What does `default` do in a switch statement?

---

### Chapter 5: Loops
- `for` Loop
- `while` Loop
- `do...while` Loop
- `break` and `continue`
- `for...in` (Object keys)
- `for...of` (Array values)
- Nested Loops
- Infinite Loops (and how to avoid them)

**Example:**
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}

let arr = ["apple", "banana", "cherry"];
for (let fruit of arr) {
  console.log(fruit);
}

let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

**Exercise:** Print the multiplication table for a given number using a `for` loop.
**Quiz:**
1. What does a `for` loop consist of?
2. Which statement exits a loop immediately?
3. What is the difference between `for...in` and `for...of`?
4. What is a `do...while` loop good for?
5. How do you skip to the next iteration in a loop?

---

---

## 3. Functions and Arrays

### Overview
Learn how to write reusable code with functions and organize data with arrays and objects.

### Chapter 6: Functions
- Function Declaration
- Function Expression
- Arrow Functions (`() => {}`)
- Parameters and Arguments
- Default Parameters
- Return Values
- Scope: Local vs Global Variables
- The `this` Keyword (Basic)
- Arrow Functions and `this`

**Example:**
```javascript
// Declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Expression
const greetExpr = function(name) {
  return `Hello, ${name}!`;
};

// Arrow function
const greetArrow = (name) => `Hello, ${name}!`;

console.log(greet("Alice"));
console.log(greetArrow("Bob"));
```

**Exercise:** Write an arrow function that accepts any number of arguments using rest parameters and returns their average.
**Quiz:**
1. How do you define a function using the `function` keyword?
2. What is the difference between a function declaration and function expression?
3. What does an arrow function look like?
4. What does the `return` keyword do?
5. What is a default parameter?

---

### Chapter 7: Arrays
- Creating Arrays (`[]` and `new Array()`)
- Accessing Elements by Index
- Array Length (`length`)
- Adding Elements (`push`, `unshift`)
- Removing Elements (`pop`, `shift`)
- Array Methods (`slice`, `splice`, `concat`, `join`)
- Iterating Arrays (`for`, `for...of`, `.forEach()`)
- Array Destructuring
- Array Methods: `map()`, `filter()`, `reduce()`
- Array Sorting (`sort()`, `reverse()`)
- Nested Arrays

**Example:**
```javascript
let fruits = ["apple", "banana", "orange"];
fruits.push("grape");
for (let fruit of fruits) {
  console.log(fruit);
}
let doubled = fruits.map(f => f.toUpperCase());
let nums = [3, 1, 4, 1, 5];
nums.sort((a, b) => a - b);
```

**Exercise:** Create an array of 5 numbers, filter out the even ones, and sort the result in descending order.
**Quiz:**
1. Which method adds an element to the end of an array?
2. What does `array.length` return?
3. How do you remove the first element of an array?
4. What does `Array.prototype.map()` do?
5. How do you sort numbers correctly in JavaScript?

---

---

## 4. Objects and DOM

### Overview
Learn how to work with JavaScript objects and manipulate the HTML DOM (Document Object Model).

### Chapter 8: JavaScript Objects
- Creating Objects (Object Literal, `new Object()`)
- Object Properties and Methods
- Accessing Properties (Dot Notation, Bracket Notation)
- Adding and Removing Properties
- Object Destructuring
- `Object.keys()`, `Object.values()`, `Object.entries()`
- `for...in` Loop for Objects
- Nested Objects
- Spread Operator for Objects (`{...obj}`)

**Example:**
```javascript
let student = {
  name: "Alice",
  age: 25,
  getGreeting() {
    return `Hi, I'm ${this.name}.`;
  }
};
console.log(student.name);
console.log(student["age"]);
student.grade = "A";
```

**Exercise:** Create an object representing a car with properties `make`, `model`, `year` and a method `getInfo()` that returns a formatted string.
**Quiz:**
1. How do you access an object property using bracket notation?
2. What is `this` inside a method?
3. How do you add a new property to an object?
4. What does `Object.keys()` return?
5. What is object destructuring?

---

### Chapter 9: DOM Manipulation
- What is the DOM?
- `document.getElementById()`
- `document.querySelector()` and `querySelectorAll()`
- Changing Element Content (`textContent`, `innerHTML`)
- Changing Element Styles (`element.style`)
- Changing Attributes (`setAttribute`, `getAttribute`)
- Adding and Removing Classes (`classList.add`, `classList.remove`, `classList.toggle`)
- Creating and Appending Elements (`document.createElement`, `appendChild`)
- Event Listeners (`addEventListener`)
- Event Object and `event.target`

**Example:**
```javascript
let btn = document.getElementById("myBtn");
btn.addEventListener("click", function() {
  document.getElementById("demo").textContent = "Button clicked!";
  btn.classList.toggle("active");
});

let newDiv = document.createElement("div");
newDiv.textContent = "New element";
document.body.appendChild(newDiv);
```

**Exercise:** Create a button that changes the background color of the page when clicked. Use `querySelector` instead of `getElementById`.
**Quiz:**
1. What is the DOM?
2. Which method selects the first matching element?
3. How do you change text content of an element?
4. Which method adds an event listener?
5. What is the difference between `textContent` and `innerHTML`?

---

---

## 5. Advanced JavaScript

### Overview
Level up your JavaScript skills with async patterns, error handling, and modern features.

### Chapter 10: Error Handling
- `try...catch` Block
- `finally` Block
- `throw` Statement
- Custom Errors
- Common Error Types (`TypeError`, `ReferenceError`, `SyntaxError`)
- Graceful Error Messages

**Example:**
```javascript
try {
  let result = riskyOperation();
} catch (error) {
  console.error("Something went wrong:", error.message);
} finally {
  console.log("This always runs.");
}
```

**Exercise:** Write a function that divides two numbers and handles `TypeError` for non-numeric inputs and `ZeroDivisionError` for zero divisors.
**Quiz:**
1. Which block catches exceptions?
2. What does the `finally` block always do?
3. Which keyword throws an exception manually?
4. What happens if no exception occurs inside a `try` block?
5. What is the type of error when a variable is not defined?

---

---

## Cross-Language Exercises

### Project 1: Interactive Quiz App
Build a quiz app in JavaScript: use variables for questions, arrays for options, conditionals for answer checking, DOM manipulation for display, and event listeners for interaction.

### Project 2: To-Do List
Create a to-do list application: add tasks via an input field, display tasks using DOM manipulation, delete tasks with event listeners, and save tasks to `localStorage`.

### Project 3: Calculator
Build a calculator that accepts two numbers and an operator via prompts and displays the result using `console.log` or DOM elements.

---

## Progress Tracking
- Each chapter ends with a summary and key takeaways
- Exercises are rated Easy / Medium / Hard
- Each chapter has a 5-question quiz for self-assessment
- Completion badges for each section

---

## Additional Resources
- W3Schools JavaScript Tutorial (w3schools.com/js)
- MDN Web Docs JavaScript Guide (developer.mozilla.org/en-US/docs/Web/JavaScript)
- JavaScript.info (javascript.info)
- You Don't Know JS (github.com/getify/You-Dont-Know-JS)
'''