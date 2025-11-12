# Miniparse

<div align="center">

[![NPM downloads](https://img.shields.io/npm/dm/devdami-miniparse.svg?style=flat)](https://www.npmjs.com/package/dd-miniparse)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)


</div>

Miniparse is a sophisticated and extensible NLP library for comprehensive text processing, tokenization, and analysis. It offers a modular pipeline, advanced YAML configuration, and powerful LLM integration with Google Gemini.

**IMPORTANT: This library is currently a work in progress. Users should expect:**
* **Potential bugs and stability issues.**
* **API changes between versions.**
* **Performance concerns with large datasets.**
* **Incomplete documentation for newer features.**
* **Experimental features that may not be ready for production.**

---

### Table of Contents

* [Quick start](#quick-start)
* [Install](#install)
* [Core features](#core-features)
* [Documentation](#documentation)
* [Contributing](#contributing)
* [License](#license)
* [Future plans](#future-plans)

---

## Quick Start

To get started with Miniparse, create a new project and install the necessary packages:

```bash
mkdir my-miniparse-app
cd my-miniparse-app
npm init -y
npm install dd-miniparse @google/generative-ai
```

You can then import and use Miniparse in your application. For detailed usage examples, please refer to the [Usage Examples](./docs/examples.md) documentation.

---

## Install

To install Miniparse in an existing project:

```bash
npm i dd-miniparse @google/generative-ai
```

---

## Core Features

*   **Comprehensive Text Processing:** Includes tokenization, normalization, and advanced analysis capabilities.
*   **Highly Configurable:** Utilizes a flexible YAML-based system for extensive customization.
*   **Performance-Oriented:** Designed for efficient string parsing with minimal computational overhead.
*   **Speech Analysis:** Tools to identify filler words, repetitions, and stutters in transcribed text.
*   **Modular Pipeline Architecture:** Supports an extensible processing pipeline with various processor types.
*   **Full TypeScript Support:** Provides detailed type definitions for an enhanced development experience.
*   **LLM Integration:** Built-in support for Google Gemini API, featuring caching, fallbacks, and diverse processor types.

---

## Documentation

For comprehensive details, guides, and examples, please refer to the dedicated documentation files:

*   **[API Documentation](./docs/api.md)**: Detailed reference for all Miniparse APIs, including top-level functions, core classes, and types.
*   **[Configuration Guide](./docs/configuration.md)**: Explains all available configuration options and how to customize the Miniparse pipeline.
*   **[Usage Examples](./docs/examples.md)**: Practical code examples demonstrating various use cases, including basic processing, LLM integration, speech analysis, and API integration.
*   **[Code Walkthrough](./docs/walkthrough.md)**: Insights into the architecture and implementation details of the Miniparse library.

---

## Contributing

Contributions are welcome. Please see the [Contributing Guide](./CONTRIBUTING.md) for more details.

---

## Future Plans

### Version 0.2.0: Improved Text Processing and LLM Integration

Planned features include:
*   Improved LLM integration: support for more models and providers
*   Expanded documentation: guides and API references
---

## License

Licensed under the [MIT License](./LICENSE) © 2025.
