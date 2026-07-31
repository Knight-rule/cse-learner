# Python Tutorial Outline (W3Schools Style)

---

## 1. Introduction

### Overview
Learn the basics of Python programming — syntax, variables, data types, and your first programs.

---

### Chapter 1: Python Introduction
- What is Python?
- Why Learn Python?
- Installing Python
- Running Python (Interactive Shell, Script, IDLE, VS Code)
- Your First Program (`print`)
- Using the Python Interpreter

**Example:**
```python
print("Hello, World!")
```

**Exercise:** Write a Python script that prints your name, age, and city.
**Quiz:**
1. How do you run a Python script from the terminal?
2. What function prints output to the console?
3. What file extension does Python use?
4. Name two ways to run Python code.
5. What is the Python interactive shell called?

---

### Chapter 2: Variables and Data Types
- Variable Assignment
- Naming Rules and Conventions
- Data Types: int, float, str, bool
- `type()` Function
- Type Conversion (`int()`, `float()`, `str()`, `bool()`)
- `input()` Function

**Example:**
```python
name = "Alice"
age = 25
height = 5.6
is_student = True
```

**Exercise:** Write a program that asks for the user's name and age, then prints a greeting.
**Quiz:**
1. What function shows the type of a variable?
2. Which data type represents whole numbers?
3. How do you convert a string to an integer?
4. What is the correct way to assign a string to a variable?
5. What does `input()` return?

---

### Chapter 3: Operators
- Arithmetic Operators (`+`, `-`, `*`, `/`, `//`, `%`, `**`)
- Comparison Operators (`==`, `!=`, `<`, `>`, `<=`, `>=`)
- Logical Operators (`and`, `or`, `not`)
- Assignment Operators (`=`, `+=`, `-=`, `*=`, `/=`)
- Ternary Operator

**Example:**
```python
a = 10
b = 3
print(a + b)
print(a // b)
print(a % b)
print(a ** b)
```

**Exercise:** Write a program that checks whether a number is even or odd.
**Quiz:**
1. Which operator returns the remainder?
2. What does `//` do in Python?
3. Which operator means "not equal"?
4. What is the result of `10 ** 2`?
5. Which operator combines two conditions using "and"?

---

### Chapter 4: Strings
- Creating Strings (single, double, triple quotes)
- String Indexing and Slicing
- String Methods (`upper()`, `lower()`, `strip()`, `split()`, `join()`, `replace()`, `find()`)
- String Concatenation
- String Formatting (f-strings, `.format()`, `%` operator)
- String Length (`len()`)

**Example:**
```python
name = "Alice"
print(name.upper())
print(f"Hello, {name}!")
```

**Exercise:** Write a program that asks for a sentence and prints it in uppercase, lowercase, and reversed.
**Quiz:**
1. What method converts a string to uppercase?
2. How do you create a multi-line string?
3. What does `len("hello")` return?
4. Which method splits a string into a list?
5. What is an f-string?

---

### Chapter 5: Numbers and Math
- Built-in Math Functions (`abs()`, `round()`, `pow()`, `min()`, `max()`, `sum()`)
- The `math` Module
- Random Numbers (`random` module)
- Integer Division vs Float Division
- Type Conversion Between int and float

**Example:**
```python
import math
print(math.sqrt(16))
print(round(3.14159, 2))
print(abs(-7))
```

**Exercise:** Write a program that calculates the area and circumference of a circle given its radius.
**Quiz:**
1. Which module provides mathematical functions like `sqrt()`?
2. What does `round(3.14159, 2)` return?
3. How do you generate a random number between 1 and 10?
4. What is the result of `abs(-5)`?
5. What function returns the absolute value?

---

### Chapter 6: Boolean Logic and Comparison
- Boolean Values (`True`, `False`)
- Comparison Operators
- Logical Operators (`and`, `or`, `not`)
- Truthy and Falsy Values
- Identity Operators (`is`, `is not`)
- Membership Operators (`in`, `not in`)

**Example:**
```python
age = 20
print(age >= 18 and age < 120)
print("a" in "Python")
print(0 == False)
```

**Exercise:** Write a program that checks if a character is a vowel using membership operators.
**Quiz:**
1. What are the two boolean values in Python?
2. Which operator checks if an item exists in a sequence?
3. What does `not True` return?
4. Is `0` falsy or truthy in Python?
5. What is the difference between `==` and `is`?

---

---

## 2. Formatting

### Overview
Learn how to format and display output in Python cleanly and effectively.

---

### Chapter 7: Print Formatting
- `print()` with Multiple Arguments
- Separator and End Parameters (`sep`, `end`)
- f-Strings (Formatted String Literals)
- `.format()` Method
- Old-Style `%` Formatting
- String Alignment (`ljust()`, `rjust()`, `center()`)

**Example:**
```python
name = "Alice"
age = 25
print(f"Name: {name}, Age: {age}")
print("Name: {}, Age: {}".format(name, age))
print(f"{name:<10} | {age:>5}")
```

**Exercise:** Write a program that prints a formatted table of names and scores.
**Quiz:**
1. What is an f-string?
2. Which method uses `{}` placeholders for formatting?
3. What does the `sep` parameter in `print()` do?
4. How do you left-align a string to 10 characters?
5. What is old-style string formatting with `%` called?

---

### Chapter 8: f-Strings Deep Dive
- Basic Interpolation
- Expression Evaluation in f-Strings
- Format Specifiers (`.2f`, `:>10`, `:05d`)
- Calling Methods Inside f-Strings
- Nested f-Strings

**Example:**
```python
price = 19.99
print(f"The price is ${price:.2f}")
print(f"Result: {price * 2:.1f}")
print(f"{'hello'.upper()}")
```

**Exercise:** Write a program that formats monetary values to 2 decimal places using f-strings.
**Quiz:**
1. What does `f"{3.14159:.2f}"` output?
2. Can you call methods inside an f-string?
3. What does `:05d` do in an f-string?
4. How do you format a number with commas as thousands separators?
5. Can f-strings contain expressions?

---

---

## 3. Data Structures

### Overview
Learn Python's built-in data structures for storing and organizing data.

---

### Chapter 9: Lists
- Creating Lists
- Accessing Elements by Index
- Slicing Lists
- Common Methods (`append()`, `insert()`, `remove()`, `pop()`, `sort()`, `reverse()`, `clear()`)
- List Length (`len()`)
- Iterating Over Lists (`for` loop, `while` loop)
- List Comprehension
- Nested Lists
- Copying Lists (shallow vs deep)

**Example:**
```python
fruits = ["apple", "banana", "orange"]
fruits.append("grape")
for fruit in fruits:
    print(fruit)
squares = [x**2 for x in range(1, 6)]
```

**Exercise:** Create a list of numbers, find the largest element, and create a list of even numbers using list comprehension.
**Quiz:**
1. Which method adds an element to the end of a list?
2. How do you remove an element by value?
3. What does `list[1:3]` return?
4. What is list comprehension?
5. Which method sorts a list in place?

---

### Chapter 10: Tuples
- Creating Tuples
- Accessing Elements by Index
- Tuple Immutability
- Tuple Methods (`count()`, `index()`)
- Tuple Unpacking
- Nested Tuples
- When to Use Tuples vs Lists

**Example:**
```python
coordinates = (10, 20)
x, y = coordinates
print(x, y)
```

**Exercise:** Create a tuple of 5 numbers and unpack them into individual variables.
**Quiz:**
1. Can you modify a tuple after creation?
2. What does `my_tuple.count(value)` return?
3. What is tuple unpacking?
4. How do you access the last element of a tuple?
5. Name one advantage of tuples over lists.

---

### Chapter 11: Dictionaries
- Creating Dictionaries
- Accessing Values by Key
- Adding and Updating Key-Value Pairs
- Removing Items (`del`, `pop()`, `clear()`)
- Dictionary Methods (`keys()`, `values()`, `items()`, `get()`, `update()`)
- Iterating Over Dictionaries
- Nested Dictionaries
- Dictionary Comprehension

**Example:**
```python
student = {"name": "Alice", "age": 25, "grade": "A"}
print(student["name"])
for key, value in student.items():
    print(f"{key}: {value}")
```

**Exercise:** Create a dictionary of student grades and iterate over it to find the student with the highest grade.
**Quiz:**
1. How do you access a value in a dictionary?
2. What does `dict.keys()` return?
3. How do you add a new key-value pair?
4. What is the difference between `del` and `pop()`?
5. How do you check if a key exists in a dictionary?

---

### Chapter 12: Sets
- Creating Sets
- Set Operations (`union`, `intersection`, `difference`, `symmetric_difference`)
- Adding and Removing Elements (`add()`, `remove()`, `discard()`)
- Set Comprehension
- Frozensets (immutable sets)
- When to Use Sets

**Example:**
```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)       # union
print(a & b)       # intersection
print(a - b)       # difference
```

**Exercise:** Write a program that finds common elements between two lists using sets.
**Quiz:**
1. What does the `|` operator do on sets?
2. How do you add an element to a set?
3. What does `set.discard()` do that `set.remove()` doesn't?
4. Are sets ordered or unordered?
5. What is a frozenset?

---

---

## 4. Control Flow

### Overview
Learn how to control the flow of execution in Python using conditionals and loops.

---

### Chapter 13: Conditionals — if/elif/else
- `if` Statement
- `elif` (else if)
- `else`
- Nested Conditionals
- Ternary Operator (One-Line if/else)
- Truthy and Falsy Values in Conditionals

**Example:**
```python
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"

result = "Pass" if score >= 50 else "Fail"
```

**Exercise:** Write a program that classifies a number as positive, negative, or zero.
**Quiz:**
1. Which keyword starts an if block?
2. What keyword is used for additional conditions?
3. What is the Python ternary operator syntax?
4. Can you nest if statements inside if statements?
5. Which value is falsy in Python: `0`, `1`, `"hello"`, or `True`?

---

### Chapter 14: Loops — for
- `for` Loop with `range()`
- Iterating Over Lists, Tuples, Dictionaries
- `enumerate()` for Index and Value
- `break` and `continue`
- `else` Clause on Loops
- Nested Loops

**Example:**
```python
for i in range(1, 6):
    print(i)

for index, fruit in enumerate(["apple", "banana", "orange"]):
    print(f"{index}: {fruit}")
```

**Exercise:** Print the multiplication table for a given number using a for loop.
**Quiz:**
1. What does `range(1, 5)` generate?
2. Which keyword exits a loop immediately?
3. Which keyword skips to the next iteration?
4. What does `enumerate()` return?
5. What does the `else` clause on a loop do?

---

### Chapter 15: Loops — while
- `while` Loop
- Infinite Loops
- `break` and `continue` in while Loops
- `else` Clause on while Loops
- Loop Control Patterns

**Example:**
```python
count = 0
while count < 5:
    print(count)
    count += 1
```

**Exercise:** Write a program that guesses a number using a while loop with user input.
**Quiz:**
1. What happens if the condition in a while loop is always True?
2. Which keyword is used to exit a while loop?
3. When is using a while loop better than a for loop?
4. What does `else` do after a while loop completes normally?
5. How do you increment a counter in a while loop?

---

---

## 5. Functions

### Overview
Learn how to define and use reusable functions in Python.

---

### Chapter 16: Function Basics
- Function Definition (`def`)
- Parameters and Arguments
- Return Values (`return`)
- Default Parameter Values
- Keyword Arguments
- `*args` and `**kwargs`
- Docstrings

**Example:**
```python
def greet(name, greeting="Hello"):
    """Returns a greeting message."""
    return f"{greeting}, {name}!"

print(greet("Alice"))
print(greet("Bob", greeting="Hi"))
```

**Exercise:** Write a function that accepts any number of numbers and returns their average using `*args`.
**Quiz:**
1. What keyword defines a function?
2. What does `return` do?
3. What does `*args` allow a function to accept?
4. What is a docstring?
5. How do you call a function with a default parameter?

---

### Chapter 17: Scope andLambda
- Local vs Global Variables
- `global` Keyword
- `nonlocal` Keyword
- Lambda Functions
- `map()`, `filter()`, `sorted()` with Lambdas
- Variable Scope Rules (LEGB)

**Example:**
```python
x = 10
def my_func():
    x = 5
    return x

double = lambda x: x * 2
numbers = [3, 1, 4, 1, 5]
sorted_numbers = sorted(numbers, key=lambda x: -x)
```

**Exercise:** Write a lambda function that returns the absolute value of a number. Use `map()` to apply it to a list.
**Quiz:**
1. What does `lambda` create?
2. What does the `global` keyword do?
3. In what order does Python search for variable scope (LEGB)?
4. What does `map()` return?
5. Why are lambda functions limited to a single expression?

---

---

## 6. File Handling

### Overview
Learn how to read from and write to files in Python.

---

### Chapter 18: Reading Files
- Opening Files (`open()`)
- `with` Statement
- `read()`, `readline()`, `readlines()`
- File Modes (`r`, `r+`, `rb`)
- Iterating Over Lines in a File

**Example:**
```python
with open("data.txt", "r") as file:
    content = file.read()
    print(content)
```

**Exercise:** Write a program that reads a text file and counts the number of words.
**Quiz:**
1. What does the `with` statement do when working with files?
2. Which mode opens a file for reading?
3. What does `readlines()` return?
4. How do you read a file line by line?
5. What happens if you forget to close a file manually?

---

### Chapter 19: Writing Files
- Writing Files (`"w"`, `"a"`, `"x"` modes)
- `write()` Method
- `writelines()` Method
- Overwriting vs Appending
- Creating Directories (`os.makedirs()`)

**Example:**
```python
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("Second line\n")
```

**Exercise:** Write a program that writes user input to a file until the user types "quit".
**Quiz:**
1. What does mode `"w"` do if the file already exists?
2. Which mode appends to a file instead of overwriting?
3. What is the difference between `write()` and `writelines()`?
4. How do you write a newline character to a file?
5. What does mode `"x"` do?

---

### Chapter 20: CSV and JSON Files
- Reading and Writing CSV Files (`csv` module)
- Reading and Writing JSON Files (`json` module)
- `json.dump()` and `json.load()`
- Converting Between Python Objects and JSON

**Example:**
```python
import json
data = {"name": "Alice", "age": 25}
with open("data.json", "w") as file:
    json.dump(data, file)
```

**Exercise:** Write a program that reads a JSON file of student records and prints all names.
**Quiz:**
1. Which module handles JSON files in Python?
2. What function writes JSON to a file?
3. What Python type does JSON `object` map to?
4. What does `json.load()` return?
5. Name one difference between CSV and JSON formats.

---

---

## 7. Object-Oriented Programming (OOP)

### Overview
Learn the fundamentals of object-oriented programming in Python.

---

### Chapter 21: Classes and Objects
- Defining Classes (`class`)
- Creating Objects (Instances)
- The `__init__()` Constructor
- Instance Attributes and `self`
- Instance Methods
- The `__str__()` and `__repr__()` Methods

**Example:**
```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says woof!"

my_dog = Dog("Rex", "Labrador")
print(my_dog.bark())
```

**Exercise:** Create a `Car` class with attributes `make`, `model`, and `year`. Add a method that returns a formatted description.
**Quiz:**
1. What is the purpose of `__init__()`?
2. What is `self` in Python classes?
3. How do you create an instance of a class?
4. What does the `self` parameter refer to?
5. Which method returns a string representation of an object?

---

### Chapter 22: Inheritance and Polymorphism
- Inheritance (`super()`)
- Method Overriding
- The `isinstance()` Function
- Multiple Inheritance
- Polymorphism
- Abstract Classes (`abc` module)

**Example:**
```python
class Animal:
    def sound(self):
        return "Some sound"

class Dog(Animal):
    def sound(self):
        return "Bark"

my_dog = Dog()
print(my_dog.sound())
```

**Exercise:** Create a `Shape` base class with a `area()` method, then create `Circle` and `Rectangle` subclasses that override it.
**Quiz:**
1. Which function is used to call a parent class method?
2. What is method overriding?
3. What does `isinstance()` do?
4. Can a class inherit from multiple classes in Python?
5. What is polymorphism in OOP?

---

### Chapter 23: Encapsulation and Properties
- Public, Protected, and Private Attributes (`_`, `__`)
- Getter and Setter Methods
- The `@property` Decorator
- Data Validation in Setters
- Name Mangling

**Example:**
```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, value):
        if value >= 0:
            self.__balance = value
```

**Exercise:** Create a `Temperature` class with a private Celsius attribute and property-based getter/setter with validation.
**Quiz:**
1. What does the `@property` decorator do?
2. How do you make an attribute private in Python?
3. What is name mangling?
4. Why is encapsulation important?
5. Which convention indicates a protected attribute?

---

---

## 8. Modules and Packages

### Overview
Learn how to organize and reuse Python code using modules and packages.

---

### Chapter 24: Importing Modules
- `import` Statement
- `from ... import`
- `import ... as` (Alias)
- The `standard library` (os, math, random, datetime, json)
- Installing Third-Party Packages (`pip`)

**Example:**
```python
import math
from random import randint
import datetime as dt
```

**Exercise:** Write a program that uses the `random` module to simulate rolling a dice 100 times and counts the results.
**Quiz:**
1. What is a module in Python?
2. How do you import a module with a different name?
3. Which package manager installs Python packages?
4. Name two modules from the Python standard library.
5. How do you import only a specific function from a module?

---

### Chapter 25: Creating Your Own Modules
- Creating a `.py` File as a Module
- The `__name__` Variable
- The `__all__` List
- `__init__.py` in Packages
- Organizing Code into Packages

**Example:**
```python
# mymodule.py
def greet(name):
    return f"Hello, {name}!"

# main.py
from mymodule import greet
print(greet("Alice"))
```

**Exercise:** Create a module called `utils.py` with a function to calculate the area of a circle. Import and use it in another file.
**Quiz:**
1. What is the value of `__name__` when a file is run directly?
2. What is `__init__.py` used for?
3. How do you create your own Python module?
4. What does the `__all__` list control?
5. What is the difference between a module and a package?

---

---

## 9. Exception Handling

### Overview
Learn how to handle errors gracefully in Python programs.

---

### Chapter 26: Try/Except/Finally
- `try` and `except` Blocks
- Specific Exception Types (`ValueError`, `TypeError`, `FileNotFoundError`)
- `else` Clause
- `finally` Clause
- Raising Exceptions (`raise`)
- Custom Exceptions

**Example:**
```python
try:
    num = int(input("Enter a number: "))
except ValueError:
    print("That's not a valid number!")
finally:
    print("This always runs.")
```

**Exercise:** Write a program that reads two numbers and divides them, handling `ValueError` and `ZeroDivisionError`.
**Quiz:**
1. Which block catches exceptions?
2. What does the `finally` block always do?
3. Which keyword raises an exception manually?
4. What happens if no exception occurs in a `try` block?
5. How do you create a custom exception?

---

---

## 10. Advanced Topics

### Overview
Continue your Python journey with more advanced concepts.

---

### Chapter 27: List Comprehensions and Generators
- List Comprehension Syntax
- Nested List Comprehensions
- Generator Functions (`yield`)
- Generator Expressions
- Memory Efficiency of Generators

**Example:**
```python
squares = [x**2 for x in range(10)]
squares_gen = (x**2 for x in range(10))
```

**Exercise:** Write a generator that yields Fibonacci numbers up to a limit.
**Quiz:**
1. What is the difference between a list comprehension and a generator expression?
2. Which keyword is used in generator functions?
3. What is a benefit of using generators over lists?
4. How do you create a nested list comprehension?
5. Does a generator produce all values at once or on demand?

---

### Chapter 28: Decorators
- What is a Decorator?
- Creating a Simple Decorator
- Decorators with Arguments
- `@functools.wraps`
- Common Built-in Decorators (`@staticmethod`, `@classmethod`, `@property`)

**Example:**
```python
def decorator(func):
    def wrapper(*args, **kwargs):
        print("Before function call")
        result = func(*args, **kwargs)
        print("After function call")
        return result
    return wrapper
```

**Exercise:** Write a decorator that times how long a function takes to execute.
**Quiz:**
1. What does a decorator do in Python?
2. Which decorator marks a method to be called on the class itself?
3. What does `*args` in a wrapper function do?
4. Why use `@functools.wraps`?
5. Can decorators take arguments?

---

### Chapter 29: Working with APIs
- What is an API?
- Making HTTP Requests (`requests` library)
- JSON Responses (`json` module)
- REST APIs (GET, POST)
- Error Handling for API Requests

**Example:**
```python
import requests
response = requests.get("https://api.github.com")
data = response.json()
```

**Exercise:** Write a program that fetches weather data from an API and displays it.
**Quiz:**
1. What does `response.json()` return?
2. Which library is commonly used for making HTTP requests?
3. What does the GET method do in a REST API?
4. How do you handle API request errors?
5. What is an API endpoint?

---

### Chapter 30: Introduction to Databases with Python
- SQLite Basics (`sqlite3` module)
- Connecting to a Database
- Creating Tables
- Inserting, Querying, Updating, Deleting Records
- Parameterized Queries (SQL Injection Prevention)

**Example:**
```python
import sqlite3
conn = sqlite3.connect("mydb.db")
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
cursor.execute("INSERT INTO users (name) VALUES (?)", ("Alice",))
conn.commit()
conn.close()
```

**Exercise:** Create a SQLite database for a simple library system with books and authors.
**Quiz:**
1. Which module is used for SQLite in Python?
2. What does `conn.commit()` do?
3. How do you prevent SQL injection in Python?
4. What method executes a SQL query?
5. How do you close a database connection?

---

---

## Cross-Language Exercises

### Project 1: Contact Book
Build a command-line contact book application that can add, view, search, and delete contacts. Store data in a JSON file. Implement in Python.

### Project 2: Calculator CLI
Create a command-line calculator that supports basic arithmetic operations and stores calculation history in a file.

### Project 3: Number Guessing Game
Build a number guessing game where the computer picks a random number and the user tries to guess it with hints (higher/lower). Track high scores.

---

## Progress Tracking
- Each chapter ends with a summary and key takeaways
- Exercises are rated Easy / Medium / Hard
- Each chapter has a 5-question quiz for self-assessment
- Completion badges for each section

---

## Additional Resources
- Python documentation (docs.python.org)
- Practice problem sets
- Mini-projects for each section
- Recommended next steps after completing the tutorial
'''

with open("python-outline.md", "w", encoding="utf-8") as f:
    f.write(outline)

print("Python outline written to python-outline.md")
print(f"Total length: {len(outline)} characters")