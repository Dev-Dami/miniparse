# Contributing to Miniparse

Thank you for your interest in contributing to Miniparse! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issues](#issues)

## Code of Conduct

This project and everyone participating in it is governed by the Miniparse Code of Conduct. By participating, you are expected to uphold this code.

## How to Contribute

There are many ways you can contribute to Miniparse:

- Reporting bugs
- Suggesting enhancements
- Writing documentation
- Contributing code for new features
- Fixing bugs
- Improving performance

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/miniparse.git`
3. Navigate to the project directory: `cd miniparse`
4. Install dependencies: `npm install`
5. Build the project: `npm run build`

## Project Structure

```
miniparse/
├── src/
│   ├── adapters/     # Adapter functions for specific use cases
│   ├── config/       # Configuration system
│   ├── core/         # Core functionality (Tokenizer, Pipeline)
│   ├── processors/   # Text processing functions
│   └── types/        # Type definitions
├── dist/            # Compiled JavaScript files
├── examples.md      # Usage examples
├── API.md           # API documentation
├── README.MD        # Main documentation
└── package.json
```

## Coding Guidelines

- Write TypeScript code with proper type annotations
- Follow existing code style and patterns
- Write clear, self-documenting code
- Add comments for complex logic
- Ensure code is performant and memory-efficient

## Testing

Currently, we don't have automated tests, but please manually test your changes:

1. Run `npm run build` to ensure code compiles
2. Test your changes in the example project or create a test case
3. Verify that your changes don't break existing functionality

## Pull Request Process

1. Ensure your code follows the guidelines above
2. Update documentation if needed
3. Test your changes thoroughly
4. Submit a pull request with a clear description of your changes
5. Link any relevant issues

## Issues

When creating an issue, please provide:

- A clear title and description
- Steps to reproduce (for bugs)
- Expected and actual behavior
- Any relevant code snippets or examples
- Environment information (Node.js version, etc.)

---

Thank you for contributing to Miniparse!