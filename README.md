# CSE Learner - Classic Design

## Overview

A comprehensive computer science learning platform with structured courses covering Data Structures, Algorithms, Operating Systems, Databases, Computer Networks, and Web Development. The platform provides interactive lessons with code examples, quizzes, and tracks your learning progress.

[Live Site](https://cse-learner.onrender.com/)

## Core Features

### 📚 Structured Learning Paths
- **6 Major CS Disciplines**
  - Data Structures & Algorithms
  - Operating Systems
  - Databases
  - Computer Networks
  - Web Development
  - Object-Oriented Programming

### 🎯 Hands-on Learning
- **Interactive Code Examples** - Learn by writing real code
- **Quizzes & Assessments** - Test your knowledge with instant feedback
- **Progress Tracking** - Monitor your learning journey

### 🏅 Learning Outcomes
- **Master CS Fundamentals** - Build strong theoretical foundation
- **Practice Problem Solving** - Apply concepts to real scenarios
- **Interview Preparation** - Develop skills for technical interviews
- **Interactive Learning** - Engage with working code examples

## Available Courses

| Course | Description | Lessons | Difficulty |
|--------|-------------|---------|------------|
| **Data Structures** | Arrays, Linked Lists, Trees, Graphs, Hash Tables | 6 | Intermediate |
| **Algorithms** | Sorting, Searching, Dynamic Programming, Greedy | 4 | Intermediate |
| **Operating Systems** | Processes, Threads, Memory, Scheduling, Deadlocks | 4 | Advanced |
| **Databases** | SQL, Normalization, Indexing, Transactions, ACID | 4 | Intermediate |
| **Computer Networks** | OSI/TCPIP, IP Addressing, HTTP, Security | 4 | Intermediate |
| **Web Development** | HTML, CSS, JavaScript, React, ES6+ | 4 | Beginner |
| **OOP** | Encapsulation, Inheritance, Polymorphism, Design Patterns | 4 | Intermediate |
| **Python** | From basics to advanced OOP concepts | 4 | Beginner |
| **Java** | OOP, Collections, Exception Handling, Generics | 4 | Intermediate |
| **C Language** | Pointers, Memory, Structures, File Handling | 4 | Advanced |
| **C++** | OOP, STL, Templates, Modern C++ | 4 | Advanced |
| **JavaScript** | ES6+, Async/await, DOM Manipulation, Modules | 4 | Intermediate |

## Technical Specifications

### Technology Stack
- **Frontend**: React, TypeScript, Next.js
- **Styling**: Custom CSS with classic design
- **Code Examples**: Syntax highlighting with Shiki
- **Package Manager**: npm

### Architecture
- **Component-based**: Reusable React components
- **Modular Design**: Courses and lessons are organized into separate TypeScript files
- **Type Safety**: Full TypeScript typing for better developer experience

### Data Structure
```typescript
interface Course {
  slug: string;              // URL-friendly identifier
  title: string;            // Course display name
  description: string;      // Course overview
  icon: string;             // Display emoji
  color: string;            // Gradient colors
  lessons: Lesson[];        // Array of lessons
  quiz: QuizQuestion[];     // Course assessment
}
```

## Developer Experience

### Getting Started
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd cse-learner

# Install dependencies
npm install

# Run the development server
npm run dev
```

### Development Workflow
- **Code Editor**: Any editor supporting TypeScript/JavaScript
- **Code Quality**: ESLint + Prettier (integrated with Next.js)
- **Testing**: No automated testing in current setup
- **Build System**: Next.js optimized build system

### Project Structure
```
src/
├── app/                    # Next.js pages
├── components/            # Reusable React components
├── data/                  # Course and quiz data
│   ├── courses.ts         # All course data
│   ├── questions/         # Individual quiz question files
├── lib/                    # Helper functions
└── styles/                 # CSS files
```

## Learning Philosophy

### Learn by Doing
- **Practical Examples**: Each lesson includes working code
- **Immediate Feedback**: Quizzes test your understanding
- **Step-by-step**: Build from fundamentals to advanced topics

### Career Preparation
- **Interview Topics**: Covers common technical interview questions
- **Industry Standards**: Modern coding practices and patterns
- **Real-world Skills**: Code examples you can use in interviews

## Roadmap & Future Enhancements

### Current Features
✅ Structured learning paths  
✅ Code examples in multiple languages  
✅ Interactive quizzes  
✅ Progress tracking
✅ Responsive design
✅ Dark/Light theme support

### Planned Enhancements
- [ ] User accounts and progress saving
- [ ] Mobile app
- [ ] Certificate of completion
- [ ] Community discussions
- [ ] Instructor-led sessions
- [ ] Personalized learning paths

## Community & Support

### Technical Support
- Issues and feature requests: Submit via GitHub issues
- Documentation: Update README and inline comments
- Code reviews: Open to pull requests

### Learning Support
- Need help with specific lessons? Report course quality issues
- Quiz questions unclear? Suggest improvements
- Code examples missing? Contribute content

## License

This project is open source. Contributions, improvements, and bug fixes are welcome.

## Contact & Credits

- Maintained by the CSE Learner Team
- Built with ❤️ for computer science students
- Special thanks to all contributors and content creators

---

*Ready to level up your CS knowledge? Start with the Data Structures course today!* 🚀
