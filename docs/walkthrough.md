# Codebase Walkthrough

## Introduction

This guide provides an in-depth walkthrough of the miniparse codebase, explaining how the different components work together to provide a fast and efficient NLP library. Understanding the architecture will help you both use miniparse effectively and potentially contribute to the project.

## Core Components

### 1. Tokenizer (src/core/Tokenizer.ts)

The tokenizer is the foundational component that breaks text into discrete tokens. It uses character-by-character parsing rather than regular expressions for optimal performance.

```typescript
interface Token {
  value: string;    // The actual text content
  type: TokenType;  // The type of token (word, number, etc.)
  start: number;    // Start position in original text
  end: number;      // End position in original text
}

type TokenType = "word" | "number" | "punct" | "symbol" | "whitespace" | "unknown";
```

The tokenizer identifies tokens by checking character properties and groups them accordingly.

### 2. Pipeline (src/core/pipeline.ts)

The pipeline orchestrates the entire text processing flow:

```typescript
class Pipeline {
  private readonly components: PipelineComponent[] = [];
  private readonly tokenizer: Tokenizer;
  private readonly config: MiniparseConfig;
  private llmAdapter?: LLMAdapter;

  constructor(configPath?: string) {
    // Load configuration
    this.config = ConfigLoader.loadConfig(configPath);

    // Initialize tokenizer with config
    this.tokenizer = new Tokenizer({
      lowercase: this.config.tokenizer.lowercase,
      mergeSymbols: this.config.tokenizer.mergeSymbols,
    });

    // Initialize components based on config
    if (this.config.pipeline.enableNormalization) this.use(normalize);
    if (this.config.pipeline.enableCleaning) this.use(clean);
    if (this.config.pipeline.enableAdvCleaning) this.use(advClean);
    // ... other components based on config
  }

  async process(text: string): Promise<IntentResult> {
    // 1. Tokenize the text
    const tokens = this.tokenizer.tokenize(text);

    // 2. Initialize result object
    let result: IntentResult = {
      text,
      tokens,
      entities: [],
    };

    // 3. Pass through each component in sequence
    for (const component of this.components) {
      result = await component(result);
    }

    return result;
  }
}
```

The pipeline follows the **chain of responsibility pattern**, where each component receives the result from the previous component and potentially modifies it before passing it along.

### 3. Processors (src/processors/)

Processors are modular functions that transform the `IntentResult`. Each processor follows this pattern:

```typescript
// Example processor pattern
const exampleProcessor: PipelineComponent = (input: IntentResult) => {
  // Process the input
  // Modify tokens, entities, or text as needed
  return input;
};
```

Current processors include:
- `normalize.ts` - Normalizes text and entity values
- `clean.ts` - Removes unwanted tokens (punctuation, whitespace)
- `advclean.ts` - Advanced cleaning with more sophisticated rules
- `extract.ts` - Extracts entities like emails, phones, URLs, numbers
- `segment.ts` - Segments text into sentences

## Configuration System

### Configuration Loading (src/config/loader.ts)

The configuration system supports multiple sources with a priority order:

1. **Custom config path** - Specified when creating Pipeline
2. **Local config file** - `dd-miniparse.config.yaml` in working directory
3. **Default config** - Built-in defaults

### Configuration Interface (src/config/defaults.ts)

All configuration options are strongly typed using TypeScript interfaces with a comprehensive default configuration.

## LLM Integration

dd-miniparse includes powerful LLM integration with:

- Support for multiple providers (currently focused on Google Gemini)
- Caching mechanisms to reduce API costs
- Multiple pre-built LLM-based processors
- Error handling and fallback mechanisms

## Type System

dd-miniparse uses a robust type system to ensure type safety and provide excellent developer experience:

```typescript
// Core types (in src/types/index.ts)
interface Entity {
  type: string;       // Entity type (email, phone, etc.)
  value: string;      // The actual entity value
  start: number;      // Start position in original text
  end: number;        // End position in original text
}

interface IntentResult {
  text: string;       // Original input text
  tokens: Token[];    // Array of parsed tokens
  entities: Entity[]; // Extracted entities
}

type PipelineComponent = (
  input: IntentResult,
) => IntentResult | Promise<IntentResult>;
```

## Adapters (Speech Processing)

The adapters layer provides high-level APIs for specific use cases. The speech processing adapter offers:

- Removal of filler words from transcribed speech
- Detection and correction of repetitions
- Identification and fixing of stuttered words

```typescript
// src/adapters/speech.ts
export function preprocessSpeechInput(
  text: string,
  options?: SpeechPatternOptions
): string {
  // Process speech text to clean up artifacts
}
```

## Key Design Patterns

### 1. Builder Pattern (Pipeline)
The Pipeline constructor builds the processing chain based on configuration:

```typescript
constructor(configPath?: string) {
  // ... initialization code ...

  if (this.config.pipeline.enableNormalization) this.use(normalize);
  if (this.config.pipeline.enableCleaning) this.use(clean);
  // ... add other components conditionally
}
```

### 2. Chain of Responsibility (Pipeline Process)
Each component in the pipeline modifies the result and passes it to the next:

```typescript
for (const component of this.components) {
  result = await component(result);
}
```

### 3. Strategy Pattern (Processors)
Different processors can be plugged in to change behavior:

```typescript
// Users can add custom processors
pipeline.addCustomProcessor(myCustomProcessor);
```

## Performance Optimizations

### 1. String Parsing Instead of Regex
dd-miniparse avoids regex for tokenization, using character-by-character parsing which is significantly faster.

### 2. Conditional Component Loading
Components are only instantiated if enabled in the configuration, reducing memory usage.

### 3. Minimal Object Creation
Tokens and entities store position information rather than copying text, reducing memory overhead.

## Extending dd-miniparse

You can extend dd-miniparse functionality:

### 1. Custom Processors
```typescript
const myProcessor: PipelineComponent = (input: IntentResult) => {
  // Your custom processing logic
  return input;
};

pipeline.use(myProcessor);
```

### 2. Configuration-Based Extension
Add new configuration options and corresponding processors.

### 3. New Adapters
Create new high-level APIs in the adapters directory for specific use cases.
