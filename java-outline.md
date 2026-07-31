# Java Tutorial Outline (W3Schools Style)

## 1. Introduction

### Overview
Learn Java — a powerful, object-oriented programming language used in enterprise applications, Android development, and backend systems. Java is "write once, run anywhere" thanks to the JVM.

### Chapter 1: Java Basics
- What is Java?
- Java vs C vs C++ — Key Differences
- Setting Up Java (JDK, JRE, JVM Overview)
- Installing and Configuring Java (IntelliJ IDEA, VS Code, Online Compilers)
- Your First Java Program (`public class Main` and `System.out.println`)
- Java Program Structure (Class, `main` Method, Compilation and Execution)
- Java Naming Conventions (PascalCase for classes, camelCase for variables)

**Example:**
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**Exercise:** Create a Java program that prints your name, age, and city using `System.out.println`.
**Quiz:**
1. What does JVM stand for?
2. Which method is the entry point of every Java program?
3. What keyword defines a class in Java?
4. What is the file name extension for Java source files?
5. What does `public static void main` mean?

---

### Chapter 2: Variables and Data Types
- Primitive Data Types (`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`)
- Declaring and Initializing Variables
- Variable Naming Rules and Conventions
- Constants (`final` keyword)
- Type Casting (Widening and Narrowing)
- Wrapper Classes
- `var` (Local Variable Type Inference — Java 10+)
- Strings as Objects (Not Primitive)

**Example:**
```java
int age = 25;
double salary = 50000.50;
char grade = 'A';
boolean isStudent = true;
final int MAX = 100;
String name = "Alice";

System.out.println("Name: " + name);
System.out.println("Age: " + age);
System.out.println("Size of int: " + Integer.BYTES + " bytes");
```

**Exercise:** Declare variables of 5 different primitive types and print their values and sizes.
**Quiz:**
1. What is the default value of an `int` variable?
2. Which is the largest primitive data type in Java?
3. What is the range of the `byte` data type?
4. How do you define a constant in Java?
5. Is `String` a primitive type in Java?

---

---

## 2. Operators and Control Flow

### Overview
Learn how to perform operations and control the flow of execution in Java.

### Chapter 3: Operators
- Arithmetic Operators (`+`, `-`, `*`, `/`, `%`)
- Comparison Operators (`==`, `!=`, `<`, `>`, `<=`, `>=`)
- Logical Operators (`&&`, `||`, `!`)
- Assignment Operators (`=`, `+=`, `-=`, `*=`, `/=`)
- Increment and Decrement (`++`, `--`)
- Bitwise Operators (`&`, `|`, `^`, `~`, `<<`, `>>`)
- Ternary Operator (`condition ? expr1 : expr2`)
- String Concatenation (`+` Operator)

**Example:**
```java
int a = 10, b = 3;
System.out.println("Sum: " + (a + b));
System.out.println("Modulo: " + (a % b));
System.out.println("AND result: " + (a > 5 && b < 5));
String result = a > 5 ? "Big" : "Small";
System.out.println("Ternary: " + result);
```

**Exercise:** Write a Java program that checks if a number is even or odd using the modulo operator.
**Quiz:**
1. What does the `==` operator do for numbers?
2. Which operator returns the remainder?
3. What is the ternary operator syntax in Java?
4. What does `&&` return?
5. How does Java handle string concatenation with `+`?

---

### Chapter 4: Conditionals
- `if` Statement
- `if...else` Statement
- `else if` Ladder
- Nested `if` Statements
- Ternary Operator
- `switch` Statement (with `break`, `default`)
- `switch` with Strings (Java 7+)

**Example:**
```java
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

// Switch statement
int day = 3;
switch (day) {
    case 1: System.out.println("Monday"); break;
    case 2: System.out.println("Tuesday"); break;
    case 3: System.out.println("Wednesday"); break;
    default: System.out.println("Other day");
}
```

**Exercise:** Write a program that categorizes a character as uppercase, lowercase, digit, or special character using `if/else`.
**Quiz:**
1. What keyword starts an if block?
2. Can the ternary operator replace simple if/else?
3. What does `default` do in a switch statement?
4. Is `break` required in a switch case?
5. What is the difference between `if/else if` and `switch`?

---

### Chapter 5: Loops
- `for` Loop
- Enhanced `for-each` Loop
- `while` Loop
- `do...while` Loop
- `break` and `continue`
- Nested Loops
- Infinite Loops

**Example:**
```java
// for loop
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}

// for-each loop
String[] fruits = {"apple", "banana", "orange"};
for (String fruit : fruits) {
    System.out.println(fruit);
}

// while loop
int count = 1;
while (count <= 5) {
    System.out.println(count);
    count++;
}

// do-while (executes at least once)
int x = 1;
do {
    System.out.println(x);
    x++;
} while (x <= 5);
```

**Exercise:** Print the Fibonacci sequence for the first 10 numbers using a `for` loop.
**Quiz:**
1. What is the enhanced for-each loop syntax?
2. What is the difference between `while` and `do...while`?
3. Which keyword exits a loop immediately in Java?
4. What is an infinite loop?
5. When would you use `do...while` over `for`?

---

---

## 3. Object-Oriented Programming

### Overview
Learn Java's core paradigm — Object-Oriented Programming with classes, objects, inheritance, and more.

### Chapter 6: Classes and Objects
- Defining a Class
- Creating Objects (with `new` Keyword)
- Instance Variables and Methods
- The `this` Keyword
- Constructors (Default and Parameterized)
- Access Modifiers (`public`, `private`, `protected`, default)
- Getter and Setter Methods
- Static Members (`static` keyword)
- The `main` Method in a Class

**Example:**
```java
public class Dog {
    String name;
    int age;

    // Constructor
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Method
    public void bark() {
        System.out.println(name + " says woof!");
    }

    public static void main(String[] args) {
        Dog myDog = new Dog("Rex", 3);
        myDog.bark();
        System.out.println("Age: " + myDog.age);
    }
}
```

**Exercise:** Create a `Car` class with attributes `make`, `model`, `year` and a method `getDescription()`. Instantiate and use two `Car` objects.
**Quiz:**
1. What keyword is used to create a new object?
2. What is the purpose of the `this` keyword?
3. What is a constructor in Java?
4. What does the `static` keyword mean?
5. Name the four access modifiers in Java.

---

### Chapter 7: Inheritance and Interfaces
- Inheritance (`extends` keyword)
- The `super` Keyword
- Method Overriding
- The `final` Keyword (Final Classes, Final Methods, Final Variables)
- Interfaces (`interface` keyword)
- Implementing Interfaces (`implements`)
- Multiple Interface Implementation
- Abstract Classes (Basic)

**Example:**
```java
class Animal {
    void sound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark!");
    }
}

interface Printable {
    void print();
}

class Document implements Printable {
    public void print() {
        System.out.println("Printing document...");
    }
}
```

**Exercise:** Create a base class `Shape` with an `area()` method, then create `Circle` and `Rectangle` subclasses that override `area()`.
**Quiz:**
1. Which keyword creates a subclass in Java?
2. What is method overriding?
3. What does `super` refer to?
4. Can a class implement multiple interfaces?
5. What happens when a class is marked `final`?

---

---

## 4. Data Structures and Advanced Topics

### Overview
Explore Java's built-in collections, exception handling, and modern Java features.

### Chapter 8: ArrayLists and Lists
- Arrays vs ArrayLists
- Importing `ArrayList`
- Creating and Initializing ArrayLists
- Adding Elements (`add`), Removing (`remove`), Accessing (`get`)
- ArrayList Size (`size()`)
- Iterating Over ArrayLists (for, for-each, Iterator)
- Sorting ArrayLists (`Collections.sort()`)
- Comparing ArrayList with Arrays

**Example:**
```java
import java.util.ArrayList;
import java.util.Collections;

ArrayList<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Charlie");
names.remove("Bob");

for (String name : names) {
    System.out.println(name);
}

Collections.sort(names);
```

**Exercise:** Create an ArrayList of integers, add 5 numbers, remove one by index, and find the maximum value.
**Quiz:**
1. What is the difference between an array and an ArrayList in Java?
2. Which method adds an element to an ArrayList?
3. How do you get the size of an ArrayList?
4. What does `Collections.sort()` do?
5. Which Java package contains `ArrayList`?

---

### Chapter 9: Exception Handling
- `try...catch` Block
- Multiple `catch` Blocks
- `finally` Block
- `throw` Statement
- Custom Exceptions (Basic)
- Common Exception Types (`NullPointerException`, `ArithmeticException`, `ArrayIndexOutOfBoundsException`)
- Checked vs Unchecked Exceptions (Concept)

**Example:**
```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
} finally {
    System.out.println("This always runs.");
}

// Throwing an exception
public void setAge(int age) {
    if (age < 0) throw new IllegalArgumentException("Age cannot be negative");
}
```

**Exercise:** Write a program that reads two integers from the user, divides them, and handles `ArithmeticException` and `NumberFormatException`.
**Quiz:**
1. Which block catches exceptions?
2. What does the `finally` block always do?
3. What is the difference between checked and unchecked exceptions?
4. Which keyword throws an exception manually?
5. What does `NullPointerException` indicate?

---

---

## Cross-Language Exercises

### Project 1: Student Management System
Build a Java program with a `Student` class (name, id, grade), an ArrayList of students, and methods to add, display, and search students.

### Project 2: Bank Account Simulator
Create a `BankAccount` class with balance, deposit, and withdraw methods. Implement exception handling for insufficient funds.

### Project 3: Number Guessing Game
Build a command-line number guessing game where the computer generates a random number (Java's `Random` class), the user guesses, and the program provides higher/lower hints with a guess counter.

---

## Progress Tracking
- Each chapter ends with a summary and key takeaways
- Exercises are rated Easy / Medium / Hard
- Each chapter has a 5-question quiz for self-assessment
- Completion badges for each section

---

## Additional Resources
- W3Schools Java Tutorial (w3schools.com/java)
- Oracle Java Tutorials (docs.oracle.com/javase/tutorial)
- Java Documentation (Oracle JDK Docs)
- Baeldung (baeldung.com)
- Jetbrains Academy (hyperskill.org)
'''