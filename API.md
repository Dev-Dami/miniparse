# Miniparse API Documentation

Miniparse is a fast, lightweight, and configurable NLP library for text processing, tokenization, and analysis.

## Core Classes

### Pipeline

The main processing class that orchestrates text analysis.

#### Constructor
```typescript
new Pipeline(configPath?: string)
```
- `configPath` (optional): Path to a custom configuration file

#### Methods
```typescript
process(text: string): Promise<IntentResult>
```
Process text through the pipeline and return the analysis result.

```typescript
use(component: PipelineComponent): this
```
Add a custom component to the pipeline.

```typescript
addCustomProcessor(component: PipelineComponent): this
```
Add a custom processor to the pipeline (alias for `use`).

```typescript
getConfig(): MiniparseConfig
```
Get the current configuration.

### ConfigLoader

Utility class to load configurations from various sources.

#### Static Methods
```typescript
loadConfig(customConfigPath?: string): MiniparseConfig
```
Load configuration from the specified path or from default locations.

## Core Types

### IntentResult
```typescript
interface IntentResult {
  text: string;
  tokens: Token[];
  entities: Entity[];
}
```

### Token
```typescript
interface Token {
  value: string;
  type: TokenType;
  start: number;
  end: number;
}
```

### TokenType
```typescript
type TokenType = "word" | "number" | "punct" | "symbol" | "whitespace" | "unknown";
```

### Entity
```typescript
interface Entity {
  type: string;
  value: string;
  start: number;
  end: number;
}
```

### MiniparseConfig
```typescript
interface MiniparseConfig {
  pipeline: {
    enableNormalization: boolean;
    enableCleaning: boolean;
    enableExtraction: boolean;
    enableSegmentation: boolean;
  };
  tokenizer: {
    lowercase: boolean;
    mergeSymbols: boolean;
  };
  speech: {
    removeFillerWords: boolean;
    detectRepetitions: boolean;
    findStutters: boolean;
  };
  extraction: {
    extractEmails: boolean;
    extractPhones: boolean;
    extractUrls: boolean;
    extractNumbers: boolean;
  };
}
```

## Speech Analysis Functions

### preprocessSpeechInput
Remove speech irregularities from input text.

```typescript
preprocessSpeechInput(text: string, options?: SpeechPatternOptions): string
```
- `text`: Input text to process
- `options` (optional): Configuration object for speech processing

### analyzeSpeechPatterns
Analyze text for speech patterns and return analysis.

```typescript
analyzeSpeechPatterns(text: string): {
  fillerWords: string[];
  repetitions: string[];
  stutters: string[];
}
```
- `text`: Input text to analyze
- Returns: Object with detected speech patterns

### SpeechPatternOptions
```typescript
interface SpeechPatternOptions {
  removeFillerWords?: boolean;
  detectRepetitions?: boolean;
  findStutters?: boolean;
}
```

## Processors

Miniparse comes with several built-in processors:

### normalize
Normalizes text tokens and entity values.

### clean
Removes punctuation and whitespace tokens, filters empty entities.

### extract
Extracts structured data like emails, phones, URLs, and numbers.

### segment
Segments text into sentences.

## Default Configuration

The default configuration is:

```yaml
pipeline:
  enableNormalization: true
  enableCleaning: true
  enableExtraction: true
  enableSegmentation: true

tokenizer:
  lowercase: true
  mergeSymbols: false

speech:
  removeFillerWords: true
  detectRepetitions: false
  findStutters: false

extraction:
  extractEmails: true
  extractPhones: true
  extractUrls: true
  extractNumbers: true
```