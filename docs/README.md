# Miniparse

<div class="flex items-center justify-center mb-8">
  <div class="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl w-full max-w-2xl">
    <h1 class="text-4xl font-bold text-white text-center">Miniparse</h1>
    <p class="text-xl text-blue-100 text-center mt-2">Fast, Lightweight & Configurable NLP Library</p>
  </div>
</div>

<div class="flex flex-wrap justify-center gap-4 mb-8">
  <img src="https://img.shields.io/npm/v/devdami-miniparse.svg?style=for-the-badge" alt="NPM version">
  <img src="https://img.shields.io/npm/dm/devdami-miniparse.svg?style=for-the-badge" alt="NPM downloads">
  <img src="https://img.shields.io/badge/Built%20with-TypeScript-blue?style=for-the-badge" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

Miniparse is a high-performance NLP (Natural Language Processing) library designed for speed and simplicity. It provides text processing, tokenization, and analysis capabilities with a configurable pipeline architecture that can be tailored to your specific needs.

## Why Miniparse?

Traditional NLP libraries often come with heavy dependencies and complex APIs. Miniparse takes a different approach:

- **Speed**: Optimized for fast processing with minimal dependencies
- **Simplicity**: Clean, intuitive API that's easy to learn and use
- **Configurability**: YAML-based configuration for customizing behavior
- **Modularity**: Pipeline architecture lets you enable/disable components as needed
- **No Regex Overhead**: Efficient string parsing instead of heavy regular expressions

## Key Features

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
  <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <div class="text-blue-400 mb-3">
      <span class="material-icons text-3xl">flash_on</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">Fast Processing</h3>
    <p>Optimized algorithms for rapid text analysis without sacrificing accuracy.</p>
  </div>
  
  <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <div class="text-blue-400 mb-3">
      <span class="material-icons text-3xl">settings</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">Highly Configurable</h3>
    <p>Customize behavior with YAML configuration files based on your requirements.</p>
  </div>
  
  <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <div class="text-blue-400 mb-3">
      <span class="material-icons text-3xl">account_balance</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">Pipeline Architecture</h3>
    <p>Modular components that can be enabled, disabled, or extended as needed.</p>
  </div>
  
  <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <div class="text-blue-400 mb-3">
      <span class="material-icons text-3xl">language</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">Speech Analysis</h3>
    <p>Identify and process speech patterns including filler words and repetitions.</p>
  </div>
  
  <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <div class="text-blue-400 mb-3">
      <span class="material-icons text-3xl">extension</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">Extensible</h3>
    <p>Add your own custom processors to extend functionality beyond built-ins.</p>
  </div>
  
  <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <div class="text-blue-400 mb-3">
      <span class="material-icons text-3xl">code</span>
    </div>
    <h3 class="text-xl font-semibold mb-2">TypeScript Ready</h3>
    <p>Full type definitions for better development experience and fewer errors.</p>
  </div>
</div>

## Quick Start

Get up and running with Miniparse in just a few steps:

### Installation

```bash
npm install devdami-miniparse
```

### Basic Usage

```typescript
import { Pipeline } from 'miniparse';

const pipeline = new Pipeline();
const result = await pipeline.process('Hello world! This is a test.');

console.log(result);
```

### With Configuration

```typescript
import { Pipeline } from 'miniparse';

// Use a custom config file
const pipeline = new Pipeline('./miniparse.config.yaml');
const result = await pipeline.process('Testing custom configuration.');

console.log(result);
```

## Performance Benchmarks

<div class="mt-8">
  <canvas id="performanceChart" width="400" height="200"></canvas>
</div>

Miniparse is optimized for performance with efficient string parsing algorithms that outperform traditional regex-based approaches. The chart above shows processing speed comparison with other popular NLP libraries.

## Architecture Overview

Miniparse follows a modular pipeline architecture:

1. **Tokenizer**: Breaks text into discrete tokens (words, numbers, punctuation, etc.)
2. **Pipeline Components**: Modular processors that analyze and transform tokens
3. **Configuration System**: YAML-based settings to control behavior
4. **Output**: Structured results with tokens and extracted entities

## Get Started

Ready to try Miniparse? Install it in your project and start processing text right away:

```bash
npm install devdami-miniparse
```

Then explore the [API documentation](api.md) and [examples](examples.md) to learn more about advanced features and customization options.

## Contributing

Contributions are welcome. Please see the [Contributing Guide](https://github.com/dev-dami/miniparse/blob/main/CONTRIBUTING.md) for more details.

---

<div class="text-center mt-12 text-gray-500">
  <p>Miniparse is licensed under the <a href="https://github.com/dev-dami/miniparse/blob/main/LICENSE" class="text-blue-400 hover:text-blue-300">MIT License</a></p>
</div>