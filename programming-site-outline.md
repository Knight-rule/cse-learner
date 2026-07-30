# Beginner Programming Website Outline (W3Schools Style)

## Table of Contents

---

## 1. CSS (Cascading Style Sheets)

### Description
CSS is used to style and layout web pages. This section covers basic styling, selectors, layout, and responsive design.

### Chapters

---

### Chapter 1: CSS Introduction
- What is CSS?
- CSS Syntax
- How CSS Works (Selector + Declaration)
- How to Add CSS (Inline, Internal, External)

**Example:**
```css
body {
  background-color: lightblue;
}
```

**Exercise:** Create a simple HTML file and add CSS to change the background color and font.
**Quiz:** What are the three ways to add CSS to an HTML document?

---

### Chapter 2: CSS Selectors
- Element Selectors (p, h1, div)
- Class Selectors (.myClass)
- ID Selectors (#myId)
- Universal Selector (*)
- Grouping Selectors (h1, h2 { ... })

**Example:**
```css
.highlight { background-color: yellow; }
#main-title { color: navy; }
```

**Exercise:** Style three different paragraphs using element, class, and ID selectors.
**Quiz:** What is the difference between a class selector and an ID selector?

---

### Chapter 3: CSS Colors and Backgrounds
- Color Keywords (red, blue, green)
- Hex Colors (#FF0000)
- RGB (rgb(255, 0, 0))
- HSL (hsl(0, 100%, 50%))
- background-color, background-image, background-repeat

**Example:**
```css
.box {
  background-color: #f0f0f0;
  background-image: url("pattern.png");
}
```

**Exercise:** Create a colored card with a background image and solid background color.
**Quiz:** Name three ways to specify a color in CSS.

---

### Chapter 4: CSS Text and Fonts
- font-family, font-size, font-weight
- font-style (italic, normal)
- text-align, text-decoration
- line-height, letter-spacing
- Google Fonts

**Example:**
```css
p {
  font-family: "Arial", sans-serif;
  font-size: 16px;
  line-height: 1.5;
}
```

**Exercise:** Create a styled paragraph using Google Fonts with custom size, weight, and spacing.
**Quiz:** What CSS property changes the font size?

---

### Chapter 5: CSS Box Model
- Margin, Border, Padding
- Content area
- box-sizing (content-box vs border-box)
- Width and Height

**Example:**
```css
.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  margin: 10px;
  box-sizing: border-box;
}
```

**Exercise:** Create a box with specific margin, border, padding, and width using box-sizing.
**Quiz:** What is the difference between margin and padding?

---

### Chapter 6: CSS Display and Positioning
- display: block, inline, inline-block, none
- position: static, relative, absolute, fixed, sticky
- top, right, bottom, left
- z-index

**Example:**
```css
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
```

**Exercise:** Create a fixed navigation bar and an absolutely positioned badge.
**Quiz:** What is the difference between relative and absolute positioning?

---

### Chapter 7: CSS Flexbox
- Flex Container (display: flex)
- Flex Direction (row, column)
- Justify Content (flex-start, center, space-between)
- Align Items (flex-start, center, stretch)
- Flex Grow, Flex Shrink, Flex Basis

**Example:**
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
```

**Exercise:** Create a responsive navigation bar using flexbox with evenly spaced items.
**Quiz:** Which property centers items along the main axis in flexbox?

---

### Chapter 8: CSS Grid
- Grid Container (display: grid)
- Grid Template Columns and Rows
- Grid Gap
- Grid Areas
- Responsive Grid Layouts

**Example:**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

**Exercise:** Create a 3-column layout using CSS Grid with a header and footer.
**Quiz:** What property defines the number of columns in a CSS Grid?

---

### Chapter 9: CSS Responsive Design
- Media Queries (@media)
- Breakpoints
- Responsive Units (%, vw, vh, rem, em)
- Mobile-First Design

**Example:**
```css
@media (max-width: 768px) {
  .menu { flex-direction: column; }
}
```

**Exercise:** Make a responsive layout that switches from 2 columns to 1 column on mobile.
**Quiz:** What is a media query used for?

---

### Chapter 10: CSS Animations and Transitions
- transition: property, duration, easing
- @keyframes and animation
- animation-duration, animation-timing-function
- transform (rotate, scale, translate)

**Example:**
```css
.button {
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: darkblue;
}
```

**Exercise:** Create a hover effect that smoothly changes color and scales an element.
**Quiz:** What CSS property is used to define custom animation keyframes?

---

---

## 2. JavaScript

### Description
JavaScript is the programming language of the web. This section covers basics, DOM manipulation, functions, and ES6+ features.

### Chapters

---

### Chapter 1: JavaScript Introduction
- What is JavaScript?
- How to Add JavaScript (script tag)
- Your First JavaScript Program (console.log)
- Using the Browser Console

**Example:**
```javascript
console.log("Hello, World!");
```

**Exercise:** Create an HTML file with a script tag and display "Hello" in the console.
**Quiz:** How do you write a comment in JavaScript?

---

### Chapter 2: JavaScript Variables and Data Types
- var, let, const
- String, Number, Boolean
- null, undefined
- typeof operator
- Type Casting (String(), Number(), Boolean())

**Example:**
```javascript
let name = "Alice";
const age = 25;
let isStudent = true;
```

**Exercise:** Declare and use variables of each data type. Check types with typeof.
**Quiz:** What is the difference between let and const?

---

### Chapter 3: JavaScript Operators
- Arithmetic Operators (+, -, *, /, %)
- Comparison Operators (==, ===, !=, !==, <, >)
- Logical Operators (&&, ||, !)
- Assignment Operators (=, +=, -=)
- Ternary Operator (?)

**Example:**
```javascript
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";
```

**Exercise:** Write a program that checks if a number is even or odd.
**Quiz:** What operator checks for strict equality?

---

### Chapter 4: JavaScript Conditionals
- if, else if, else
- switch statement
- Truthy and Falsy Values
- Logical Short-Circuiting

**Example:**
```javascript
let score = 85;
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}
```

**Exercise:** Write a grading system that outputs letter grades.
**Quiz:** What keyword is used to check multiple conditions in JavaScript?

---

### Chapter 5: JavaScript Loops
- for loop
- while loop
- do...while loop
- for...of loop
- break and continue

**Example:**
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

**Exercise:** Print the multiplication table of a given number using a for loop.
**Quiz:** Which loop always executes at least once?

---

### Chapter 6: JavaScript Functions
- Function Declaration
- Function Expression
- Arrow Functions (=>)
- Parameters and Arguments
- Default Parameters
- Return Values

**Example:**
```javascript
function greet(name) {
  return "Hello, " + name;
}
const greetArrow = (name) => "Hello, " + name;
```

**Exercise:** Create a function that calculates the area of a rectangle and an arrow function version.
**Quiz:** What keyword is used to declare a function?

---

### Chapter 7: JavaScript Arrays
- Creating Arrays
- Accessing Elements (index)
- Array Methods (push, pop, shift, unshift, slice, splice)
- Array Length
- Iterating Arrays (forEach, map)

**Example:**
```javascript
let fruits = ["apple", "banana", "orange"];
fruits.push("grape");
fruits.forEach(f => console.log(f));
```

**Exercise:** Create an array of numbers, add elements, and print each using a loop.
**Quiz:** Which method adds an element to the end of an array?

---

### Chapter 8: JavaScript Objects
- Creating Objects
- Accessing Properties (dot notation, bracket notation)
- Object Methods
- Object.keys(), Object.values()
- JSON (JavaScript Object Notation)

**Example:**
```javascript
let person = {
  name: "Alice",
  age: 25,
  greet() { console.log("Hi, I am " + this.name); }
};
```

**Exercise:** Create a student object with name, age, and grades. Add a method to calculate average.
**Quiz:** How do you access an object property with a variable name?

---

### Chapter 9: DOM Manipulation
- What is the DOM?
- Selecting Elements (getElementById, querySelector)
- Changing Content (innerHTML, textContent)
- Changing Styles
- Adding and Removing Elements (createElement, appendChild, remove)
- Event Listeners (addEventListener)

**Example:**
```javascript
document.getElementById("btn").addEventListener("click", function() {
  alert("Button clicked!");
});
```

**Exercise:** Create a button that changes the text and color of a paragraph when clicked.
**Quiz:** Which method selects an element by its ID?

---

### Chapter 10: JavaScript ES6+ Features
- Template Literals (backticks)
- Destructuring (arrays, objects)
- Spread Operator (... )
- Arrow Functions (detailed)
- Promises (intro)
- let and const (detailed)
- Modules (import/export)

**Example:**
```javascript
const colors = ["red", "green", "blue"];
const [first, , third] = colors;
const message = `Hello, ${first}!`;
```

**Exercise:** Use destructuring to extract values from an object and template literals to format a string.
**Quiz:** What ES6 feature allows you to use backticks to embed expressions in strings?

---

---

## 3. C Programming

### Description
C is a foundational programming language. This section covers basic syntax, data types, control flow, and pointers.

### Chapters

---

### Chapter 1: C Introduction and Setup
- What is C?
- History of C
- Installing a C Compiler (GCC)
- Your First Program (Hello World)
- Compilation Process (Preprocessing, Compiling, Assembling, Linking)

**Example:**
```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

**Exercise:** Write a C program that prints your name and age.
**Quiz:** What function is the entry point of a C program?

---

### Chapter 2: Variables and Data Types
- int, float, double, char
- short, long, long long
- signed vs unsigned
- sizeof operator
- Variable Declaration and Initialization

**Example:**
```c
int age = 25;
float price = 19.99;
char grade = 'A';
```

**Exercise:** Declare variables of each data type and print their sizes using sizeof().
**Quiz:** What is the difference between int and float in C?

---

### Chapter 3: Operators and Expressions
- Arithmetic Operators (+, -, *, /, %)
- Relational Operators (==, !=, <, >, <=, >=)
- Logical Operators (&&, ||, !)
- Bitwise Operators (&, |, ^, ~, <<, >>)
- Assignment Operators (=, +=, -=)
- Precedence and Associativity

**Example:**
```c
int a = 10, b = 3;
printf("%d\n", a / b);
printf("%d\n", a % b);
```

**Exercise:** Write a program that checks whether a number is divisible by both 3 and 5.
**Quiz:** What does the % operator do in C?

---

### Chapter 4: Control Flow — If/Else and Switch
- if statement
- if...else statement
- nested if
- switch statement
- break and continue in switch
- Ternary Operator

**Example:**
```c
int score = 85;
switch(score / 10) {
    case 9: printf("A"); break;
    case 8: printf("B"); break;
    default: printf("C");
}
```

**Exercise:** Write a program that classifies a character as a vowel, consonant, or digit.
**Quiz:** What happens if you forget break in a switch case?

---

### Chapter 5: Loops in C
- for loop
- while loop
- do...while loop
- Nested Loops
- break and continue

**Example:**
```c
for (int i = 1; i <= 5; i++) {
    printf("%d\n", i * i);
}
```

**Exercise:** Print a pattern of asterisks forming a right triangle.
**Quiz:** Which loop is guaranteed to run at least once in C?

---

### Chapter 6: Arrays in C
- One-Dimensional Arrays
- Two-Dimensional Arrays (Matrices)
- Array Initialization
- Array Length Calculation
- Character Arrays and Strings

**Example:**
```c
int numbers[5] = {1, 2, 3, 4, 5};
char name[] = "C Programming";
```

**Exercise:** Write a program to find the largest element in an array.
**Quiz:** How do you determine the length of an array in C?

---

### Chapter 7: Functions in C
- Function Declaration (Prototype)
- Function Definition
- Parameters and Arguments
- Return Values
- Recursion (intro)
- Scope of Variables (local vs global)

**Example:**
```c
int add(int a, int b) {
    return a + b;
}
```

**Exercise:** Write a recursive function to calculate factorial of a number.
**Quiz:** What is a function prototype in C?

---

### Chapter 8: Pointers
- What is a Pointer?
- Address-of Operator (&)
- Dereference Operator (*)
- Pointer Arithmetic
- Pointers and Arrays
- Pointer to Functions (intro)
- NULL Pointers

**Example:**
```c
int num = 10;
int *ptr = &num;
printf("%d\n", *ptr);
```

**Exercise:** Write a program that swaps two numbers using pointers.
**Quiz:** What is the difference between *ptr (dereference) and &num (address-of)?

---

### Chapter 9: Strings in C
- Character Arrays
- String Input/Output (scanf, printf, gets, puts)
- String Functions (strlen, strcpy, strcat, strcmp)
- String Manipulation

**Example:**
```c
char str1[20] = "Hello";
char str2[] = "World";
strcpy(str1, str2);
printf("%s\n", str1);
```

**Exercise:** Write a program that counts the number of vowels in a string.
**Quiz:** Which function compares two strings in C?

---

### Chapter 10: Structures and File Handling
- Structures (struct)
- Nested Structures
- Structure Arrays
- File I/O (fopen, fclose, fprintf, fscanf)
- Reading and Writing Files

**Example:**
```c
struct Student {
    char name[50];
    int age;
    float marks;
};
```

**Exercise:** Create a structure for a Book and write/read book data to/from a file.
**Quiz:** What is the difference between fopen mode "r" and "w"?

---

---

## 4. Python

### Description
Python is a versatile, beginner-friendly language. This section covers basics, data structures, OOP, and modules.

### Chapters

---

### Chapter 1: Python Introduction and Setup
- What is Python?
- Installing Python
- Running Python (Interactive Shell, Script, IDLE)
- Your First Program (print)
- Python Version Differences (2 vs 3)

**Example:**
```python
print("Hello, World!")
```

**Exercise:** Write a Python script that prints a greeting with your name.
**Quiz:** What command prints output in Python?

---

### Chapter 2: Variables and Data Types
- Variable Assignment
- Data Types: int, float, str, bool
- type() Function
- Type Conversion (int(), float(), str())
- Input() Function

**Example:**
```python
name = "Alice"
age = 25
height = 5.6
is_student = True
```

**Exercise:** Write a program that takes user input and prints the type of each variable.
**Quiz:** What function converts a string to an integer in Python?

---

### Chapter 3: Python Operators
- Arithmetic Operators (+, -, *, /, //, %, **)
- Comparison Operators (==, !=, <, >, <=, >=)
- Logical Operators (and, or, not)
- Assignment Operators (=, +=, -=)
- Membership Operators (in, not in)
- Identity Operators (is, is not)

**Example:**
```python
age = 20
can_vote = age >= 18 and age < 120
```

**Exercise:** Write a program that checks if a number is in a given range using membership operators.
**Quiz:** Which operator checks if two variables refer to the same object?

---

### Chapter 4: Python Conditionals
- if statement
- elif and else
- Nested if
- Ternary Operator
- Truthy and Falsy Values

**Example:**
```python
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C"
```

**Exercise:** Write a program that classifies a number as positive, negative, or zero.
**Quiz:** What keyword starts an elif block?

---

### Chapter 5: Python Loops
- for loop (with range())
- while loop
- Nested Loops
- break and continue
- pass statement

**Example:**
```python
for i in range(1, 6):
    print(i * i)
```

**Exercise:** Write a program to calculate the factorial of a number using a while loop.
**Quiz:** What function generates a sequence of numbers in Python?

---

### Chapter 6: Python Strings
- String Creation and Concatenation
- String Indexing and Slicing
- String Methods (upper, lower, split, join, strip, replace, find)
- f-Strings (Formatted String Literals)
- String Formatting (.format())

**Example:**
```python
name = "Alice"
greeting = f"Hello, {name}!"
```

**Exercise:** Write a program that reverses a string using slicing.
**Quiz:** What is an f-string in Python?

---

### Chapter 7: Python Lists
- Creating Lists
- Indexing and Slicing
- List Methods (append, insert, remove, pop, sort, reverse)
- List Comprehension
- Nested Lists

**Example:**
```python
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
```

**Exercise:** Create a list of numbers, find the max using a loop, and create a squared list using comprehension.
**Quiz:** Which method adds an element to the end of a list?

---

### Chapter 8: Python Dictionaries and Tuples
- Dictionaries (key-value pairs)
- Accessing and Modifying Dictionaries
- Dictionary Methods (keys, values, items, get, update)
- Tuples (immutable lists)
- Tuple Packing and Unpacking
- When to Use Lists vs Tuples

**Example:**
```python
student = {"name": "Alice", "age": 25}
coordinates = (10, 20)
x, y = coordinates
```

**Exercise:** Create a dictionary of student grades and iterate over it to find the highest score.
**Quiz:** What is the main difference between a list and a tuple?

---

### Chapter 9: Python Functions
- Function Definition (def)
- Parameters and Arguments
- Default Parameters
- Return Values
- Scope (local vs global)
- Lambda Functions
- *args and **kwargs

**Example:**
```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

add = lambda a, b: a + b
```

**Exercise:** Write a function that accepts any number of arguments and returns their sum using *args.
**Quiz:** What symbol is used to define a lambda function?

---

### Chapter 10: Python Modules and File Handling
- Importing Modules (import, from...import)
- Standard Library Modules (os, math, random)
- Installing Packages (pip)
- Reading Files (open, read, readlines)
- Writing Files
- Exception Handling (try, except, finally)

**Example:**
```python
import random
with open("data.txt", "r") as file:
    content = file.read()
```

**Exercise:** Write a program that reads a text file, counts the number of words, and writes the result to a new file.
**Quiz:** Which keyword is used to handle exceptions in Python?

---

---

## 5. Java

### Description
Java is a widely-used object-oriented programming language. This section covers basics, OOP, and core Java features.

### Chapters

---

### Chapter 1: Java Introduction and Setup
- What is Java?
- Java Virtual Machine (JVM)
- Installing JDK
- Your First Program (Hello World)
- Compilation and Execution (javac, java)
- Java Architecture (JDK, JRE, JVM)

**Example:**
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**Exercise:** Write a Java program that prints your name, age, and city.
**Quiz:** What is the entry point method in Java?

---

### Chapter 2: Java Variables and Data Types
- Primitive Types (byte, short, int, long, float, double, char, boolean)
- Reference Types (String, Arrays)
- Variable Declaration and Initialization
- Constants (final)
- Type Casting (implicit and explicit)

**Example:**
```java
int age = 25;
double price = 19.99;
char grade = 'A';
final String SCHOOL = "CSE Learner";
```

**Exercise:** Declare variables of each primitive type and print their sizes using .length or Wrapper classes.
**Quiz:** What is the default value of a boolean variable in Java?

---

### Chapter 3: Java Operators and Expressions
- Arithmetic Operators (+, -, *, /, %)
- Relational Operators (==, !=, <, >, <=, >=)
- Logical Operators (&&, ||, !)
- Bitwise Operators (&, |, ^, ~, <<, >>)
- Assignment Operators (=, +=, -=)
- Ternary Operator (? :)
- Operator Precedence

**Example:**
```java
int a = 10, b = 3;
System.out.println(a / b);
System.out.println(a % b);
```

**Exercise:** Write a program that checks whether a number is divisible by both 3 and 5.
**Quiz:** What does % do in Java?

---

### Chapter 4: Java Conditionals
- if statement
- if...else statement
- Nested if...else
- switch statement
- Enhanced switch (Java 14+)

**Example:**
```java
int score = 85;
switch (score / 10) {
    case 9: System.out.println("A"); break;
    case 8: System.out.println("B"); break;
    default: System.out.println("C");
}
```

**Exercise:** Write a program that classifies a character as uppercase, lowercase, digit, or special character.
**Quiz:** What happens if you forget break in a switch case?

---

### Chapter 5: Java Loops
- for loop
- while loop
- do...while loop
- Enhanced for loop (for-each)
- Nested Loops
- break and continue

**Example:**
```java
for (int i = 1; i <= 5; i++) {
    System.out.println(i * i);
}
```

**Exercise:** Print a multiplication table for a given number using a for loop.
**Quiz:** Which loop is guaranteed to execute at least once in Java?

---

### Chapter 6: Java Arrays
- One-Dimensional Arrays
- Two-Dimensional Arrays
- Array Initialization
- Array Length (arr.length)
- Arrays Utility Class (java.util.Arrays)

**Example:**
```java
int[] numbers = {1, 2, 3, 4, 5};
System.out.println(numbers.length);
```

**Exercise:** Write a program that finds the second largest element in an array.
**Quiz:** How do you get the length of an array in Java?

---

### Chapter 7: Java Methods (Functions)
- Method Declaration
- Parameters and Return Types
- Method Overloading
- Variable Scope (local vs instance)
- Recursion (intro)
- static Methods

**Example:**
```java
public static int add(int a, int b) {
    return a + b;
}
```

**Exercise:** Write a recursive method to calculate the Fibonacci sequence.
**Quiz:** What keyword makes a method belong to the class rather than an instance?

---

### Chapter 8: Object-Oriented Programming (OOP) Basics
- Classes and Objects
- Instance Variables
- Constructors (default and parameterized)
- this Keyword
- Encapsulation (private, public, getters/setters)

**Example:**
```java
public class Car {
    private String brand;
    public Car(String brand) {
        this.brand = brand;
    }
    public String getBrand() { return brand; }
}
```

**Exercise:** Create a Car class with brand, model, and year. Add getter and setter methods.
**Quiz:** What is encapsulation in Java?

---

### Chapter 9: OOP — Inheritance and Polymorphism
- extends Keyword
- Method Overriding
- super Keyword
- final Keyword (classes, methods)
- Abstract Classes (intro)
- Polymorphism (compile-time and runtime)

**Example:**
```java
class Animal {
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
}
```

**Exercise:** Create a Vehicle base class and Car subclass that overrides a method.
**Quiz:** Which keyword is used to inherit a class in Java?

---

### Chapter 10: Java Exception Handling and Strings
- Exception Handling (try, catch, finally, throw, throws)
- Common Exceptions (NullPointerException, ArrayIndexOutOfBoundsException)
- String Class and Methods
- StringBuilder and StringBuffer
- Reading User Input (Scanner)

**Example:**
```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}
```

**Exercise:** Write a program that reads two numbers and divides them, handling division by zero.
**Quiz:** Which block is always executed whether an exception occurs or not?

---

---

## Cross-Language Exercises

### Project 1: Calculator
Build a simple calculator that takes two numbers and an operator (+, -, *, /) and outputs the result. Implement in all 5 languages.

### Project 2: To-Do List
Create a command-line to-do list application with add, view, and delete functionality.

### Project 3: Quiz Application
Build a quiz program that asks 5 questions, tracks the score, and displays results at the end.

---

## Progress Tracking
- Each chapter ends with a summary and key takeaways
- Exercises are rated Easy / Medium / Hard
- Each chapter has a 5-question quiz for self-assessment
- Completion badges for each language section

---

## Additional Resources
- Practice problem sets for each language
- Mini-projects for each language
- Glossary of key terms
- Recommended next steps after completing each section
