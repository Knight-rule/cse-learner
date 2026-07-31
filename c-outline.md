# C Programming Tutorial Outline (W3Schools Style)

## 1. Introduction

### Overview
Learn C — the foundational programming language. C is a powerful, efficient, and widely-used language that forms the basis of modern programming concepts like pointers, memory management, and structured programming.

### Chapter 1: Getting Started with C
- What is C? History and Overview
- Why Learn C? (Efficiency, System Programming, Foundation for Other Languages)
- Installing a C Compiler (GCC/MinGW, Clang, Online Compilers)
- Writing Your First C Program (`Hello, World!`)
- Understanding the `main()` Function
- Compiling and Running a C Program (`gcc hello.c -o hello && ./hello`)
- Anatomy of a C Program (`#include`, declarations, `main`, return)

**Example:**
```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

**Exercise:** Write a C program that prints your name, age, and city on separate lines using `printf`.
**Quiz:**
1. What does `#include <stdio.h>` do?
2. What function is the entry point of every C program?
3. What does `printf` do?
4. What is the standard return value of `main`?
5. Is C a high-level or low-level language?

---

### Chapter 2: Variables and Data Types
- Writing and Declaring Variables
- Data Types: `int`, `float`, `double`, `char`
- `sizeof()` Operator
- Signed vs Unsigned Types
- Constants (`const` keyword)
- Variable Naming Rules and Conventions
- Type Casting (Implicit and Explicit)

**Example:**
```c
#include <stdio.h>

int main() {
    int age = 25;
    float height = 5.6;
    double pi = 3.14159;
    char grade = 'A';
    const int MAX = 100;

    printf("Age: %d\n", age);
    printf("Height: %.2f\n", height);
    printf("Pi: %.5f\n", pi);
    printf("Grade: %c\n", grade);
    printf("Size of int: %lu bytes\n", sizeof(int));
    return 0;
}
```

**Exercise:** Write a program that declares variables of each data type (`int`, `float`, `double`, `char`) and prints them with appropriate format specifiers.
**Quiz:**
1. What format specifier is used for `int` in `printf`?
2. Which data type stores a single character?
3. What does `sizeof()` return?
4. What is the keyword for defining a constant in C?
5. What is the difference between `float` and `double`?

---

---

## 2. Operators and Control Flow

### Overview
Learn how to perform operations and control the flow of execution in C.

### Chapter 3: Operators
- Arithmetic Operators (`+`, `-`, `*`, `/`, `%`)
- Increment and Decrement (`++`, `--`)
- Relational Operators (`==`, `!=`, `<`, `>`, `<=`, `>=`)
- Logical Operators (`&&`, `||`, `!`)
- Assignment Operators (`=`, `+=`, `-=`, `*=`, `/=`)
- Bitwise Operators (`&`, `|`, `^`, `~`, `<<`, `>>`)
- Ternary Operator (`condition ? expr1 : expr2`)
- `sizeof` Operator
- Operator Precedence and Associativity

**Example:**
```c
int a = 10, b = 3;
printf("Sum: %d\n", a + b);
printf("Modulo: %d\n", a % b);
printf("Bitwise AND: %d\n", a & b);
printf("Ternary: %d\n", a > b ? 1 : 0);
```

**Exercise:** Write a program that checks whether a number is even or odd using the modulo operator.
**Quiz:**
1. Which operator returns the remainder of a division?
2. What does the bitwise AND operator (`&`) do at the bit level?
3. What is the ternary operator syntax in C?
4. Which operator increments a variable by 1?
5. Name the three logical operators in C.

---

### Chapter 4: Conditionals (`if`, `else if`, `else`)
- `if` Statement
- `if...else` Statement
- `else if` Ladder
- Nested `if` Statements
- Ternary Operator (One-Line `if/else`)
- Comparison and Logical Operators in Conditions

**Example:**
```c
int score = 85;
if (score >= 90) {
    printf("Grade A\n");
} else if (score >= 80) {
    printf("Grade B\n");
} else if (score >= 70) {
    printf("Grade C\n");
} else {
    printf("Grade F\n");
}
```

**Exercise:** Write a program that classifies a character as uppercase letter, lowercase letter, digit, or special character using `if/else if/else`.
**Quiz:**
1. What keyword starts an if block in C?
2. How do you chain multiple conditions with `else if`?
3. What is the ternary operator in C?
4. Can you nest if statements inside each other?
5. Which operator tests equality in C?

---

### Chapter 5: Loops
- `for` Loop
- `while` Loop
- `do...while` Loop (Executes at Least Once)
- `break` and `continue` Statements
- Nested Loops
- Infinite Loops (`for(;;)`, `while(1)`)

**Example:**
```c
// for loop
for (int i = 1; i <= 5; i++) {
    printf("%d\n", i);
}

// while loop
int count = 1;
while (count <= 5) {
    printf("%d\n", count);
    count++;
}

// do...while (executes at least once)
int x = 1;
do {
    printf("Value: %d\n", x);
    x++;
} while (x <= 5);
```

**Exercise:** Write a program that prints the Fibonacci sequence for the first 10 numbers using a `for` loop.
**Quiz:**
1. What is the difference between `while` and `do...while`?
2. Which keyword exits a loop immediately?
3. What does `continue` do in a loop?
4. How do you create an infinite loop?
5. When is a `do...while` loop preferred over a `for` loop?

---

---

## 3. Functions, Arrays, and Strings

### Overview
Learn how to organize code with functions, store collections of data with arrays, and work with strings in C.

### Chapter 6: Functions
- Function Declaration (Prototype) and Definition
- Parameters and Arguments
- Return Values (`return`)
- Void Functions (No Return Value)
- Scope: Local vs Global Variables
- Recursion (Basic)
- Passing Arguments by Value

**Example:**
```c
#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

void greet() {
    printf("Hello from a function!\n");
}

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

**Exercise:** Write a function named `max` that accepts two integers and returns the larger one. Add a `main` function that calls it.
**Quiz:**
1. What keyword is used to define a function?
2. What does `void` before a function name mean?
3. How are values passed to functions in C?
4. What does `return` do inside a function?
5. What is recursion in C?

---

### Chapter 7: Arrays
- Declaring and Initializing Arrays
- Accessing Elements by Index (Zero-Based)
- Array Length and `sizeof`
- Iterating Over Arrays (`for` loop)
- Multi-Dimensional Arrays (2D Arrays)
- Arrays and Functions (Passing Arrays)
- Common Array Mistakes (Out of Bounds)

**Example:**
```c
int numbers[5] = {10, 20, 30, 40, 50};
printf("First element: %d\n", numbers[0]);
printf("Array size: %lu\n", sizeof(numbers) / sizeof(numbers[0]));

// 2D array
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
printf("Element at [0][1]: %d\n", matrix[0][1]);
```

**Exercise:** Create an array of 10 integers, find the largest element, and calculate the average of all elements.
**Quiz:**
1. What is the index of the first element in a C array?
2. How do you calculate the number of elements in an array?
3. How do you declare a 2D array?
4. What happens if you access an array index out of bounds?
5. How do you pass an array to a function?

---

### Chapter 8: Strings
- What is a String in C? (Character Arrays)
- Null Terminator (`'\0'`)
- Declaring and Initializing Strings
- String Input (`scanf`, `fgets`)
- String Output (`printf`, `puts`)
- `strlen`, `strcpy`, `strcat`, `strcmp` (from `<string.h>`)
- Common String Functions Reference

**Example:**
```c
#include <stdio.h>
#include <string.h>

int main() {
    char name[50] = "Alice";
    printf("Name: %s\n", name);
    printf("Length: %lu\n", strlen(name));

    char surname[20];
    strcpy(surname, "Smith");
    strcat(name, " ");
    strcat(name, surname);
    printf("Full name: %s\n", name);

    int result = strcmp("abc", "abc");
    printf("Compare result: %d\n", result);
    return 0;
}
```

**Exercise:** Write a program that reads a string from the user, reverses it, and prints both the original and reversed strings.
**Quiz:**
1. What is the null terminator in C strings?
2. Which function calculates the length of a string?
3. How do you copy one string into another?
4. What header file is needed for string functions?
5. Why does `scanf` stop reading a string at a space?

---

---

## 4. Pointers and Memory

### Overview
Understand pointers — one of the most powerful and challenging features of C.

### Chapter 9: Pointers Basics
- What is a Pointer? (Memory Address)
- Declaring and Initializing Pointers
- Address-of Operator (`&`)
- Dereference Operator (`*`)
- NULL Pointer
- Pointer Arithmetic
- Pointers and Arrays Relationship

**Example:**
```c
int number = 42;
int *ptr = &number;
printf("Value: %d\n", *ptr);
printf("Address: %p\n", ptr);

int arr[] = {10, 20, 30};
int *arrPtr = arr;
printf("First element: %d\n", *arrPtr);
printf("Second element: %d\n", *(arrPtr + 1));
```

**Exercise:** Write a program that swaps two integers using pointers and a function `swap(int *a, int *b)`.
**Quiz:**
1. What does the `&` operator do?
2. What does the `*` operator do on a pointer?
3. What is a NULL pointer?
4. How are pointers related to arrays?
5. What is pointer arithmetic?

---

---

## 5. Structures and File Handling

### Overview
Learn how to create custom data types and work with files in C.

### Chapter 10: Structures
- Declaring a `struct`
- Creating Struct Variables
- Accessing Members (`.` Operator, `->` with Pointers)
- Arrays of Structures
- Pointers to Structures
- Typedef for Structures
- Nested Structures

**Example:**
```c
#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
    float salary;
} Employee;

int main() {
    Employee e1 = {"Alice", 30, 50000.0};
    printf("Name: %s, Age: %d\n", e1.name, e1.age);
    printf("Salary: %.2f\n", e1.salary);

    Employee *ptr = &e1;
    printf("Access via pointer: %s\n", ptr->name);
    return 0;
}
```

**Exercise:** Create a `Point` structure with `x` and `y` coordinates and a function that calculates the distance between two points.
**Quiz:**
1. How do you declare a structure in C?
2. What does the `.` operator do?
3. What does the `->` operator do?
4. What is `typedef` used for in structures?
5. How do you pass a structure to a function?

---

### Chapter 11: File Handling
- Opening Files (`fopen`)
- File Modes (`"r"`, `"w"`, `"a"`, `"r+"`)
- Reading from Files (`fscanf`, `fgets`)
- Writing to Files (`fprintf`, `fputs`)
- Closing Files (`fclose`)
- Checking for End-of-File (`feof`)
- Error Handling with `NULL` Check

**Example:**
```c
#include <stdio.h>

int main() {
    FILE *file = fopen("data.txt", "w");
    if (file == NULL) {
        printf("Error opening file!\n");
        return 1;
    }
    fprintf(file, "Hello, File!\n");
    fprintf(file, "Second line\n");
    fclose(file);

    // Read back
    file = fopen("data.txt", "r");
    char line[100];
    while (fgets(line, 100, file) != NULL) {
        printf("%s", line);
    }
    fclose(file);
    return 0;
}
```

**Exercise:** Write a program that writes the user's input lines to a file until the user types "quit", then reads and displays the file contents.
**Quiz:**
1. Which function opens a file in C?
2. What does mode `"w"` do?
3. Which function reads a line from a file?
4. Why should you check if `fopen` returns `NULL`?
5. What function closes a file in C?

---

---

## Cross-Language Exercises

### Project 1: Student Record System
Build a C program that manages student records (name, age, grade) using structures and arrays. Implement add, display, and search functions.

### Project 2: Text File Analyzer
Create a program that reads a text file, counts the number of words, lines, and characters, and writes the summary to another file.

### Project 3: Simple Calculator CLI
Build a command-line calculator that accepts two numbers and an operator (`+`, `-`, `*`, `/`) from the user and prints the result, handling division by zero.

---

## Progress Tracking
- Each chapter ends with a summary and key takeaways
- Exercises are rated Easy / Medium / Hard
- Each chapter has a 5-question quiz for self-assessment
- Completion badges for each section

---

## Additional Resources
- W3Schools C Tutorial (w3schools.com/c)
- C Programming Language, 2nd Edition (K&R)
- GeeksforGeeks C Programming (geeksforgeeks.org/c-programming-language)
- Learn-C.org (learn-c.org)
- OnlineGDB (onlinegdb.com) for online C compilation
'''