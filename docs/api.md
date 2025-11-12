# miniparse API Documentation

miniparse provides a high-level `processText` function for ease of use, as well as granular control through its `Pipeline` class and other components.

## Top-Level Function

### processText

```typescript
processText(text: string, configPath?: string): Promise<IntentResult>
```
Processes the given text using the miniparse pipeline. This is a convenience function that initializes a `Pipeline` and immediately processes the text.

- `text`: The input string to be processed.
- `configPath` (optional): Path to a custom configuration file.
- Returns: A `Promise` that resolves to an `IntentResult` object containing the analysis.

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
getConfig(): DdMiniparseConfig
```
Get the current configuration.

```typescript
getLLMAdapter(): LLMAdapter | undefined
```
Get the configured LLM adapter if LLM functionality is enabled.

```typescript
addLLMProcessor(processor: PipelineComponent): this
```
Add an LLM-based processor to the pipeline.

### Tokenizer

The tokenizer that breaks text into discrete tokens.

#### Constructor
```typescript
new Tokenizer(options?: TokenizerOptions)
```
- `options.lowercase` (optional, default: true): Whether to convert words to lowercase
- `options.mergeSymbols` (optional, default: false): Whether to merge consecutive symbols

#### Methods
```typescript
tokenize(text: string): Token[]
```
Tokenize the given text and return an array of Token objects.

### ConfigLoader

Utility class to load configurations from various sources.

#### Static Methods
```typescript
loadConfig(customConfigPath?: string): DdMiniparseConfig
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

### DdMiniparseConfig
```typescript
interface DdMiniparseConfig {
  pipeline: {
    enableNormalization: boolean;
    enableCleaning: boolean;
    enableExtraction: boolean;
    enableSegmentation: boolean;
    enableAdvCleaning: boolean;
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
  llm?: {
    enabled: boolean;
    provider: string;
    apiKey?: string;
    model?: string;
    baseUrl?: string;
    temperature?: number;
    maxTokens?: number;
    timeout?: number;
  };
}
```

## Processors

dd-miniparse comes with several built-in processors:

### normalize
Normalizes text tokens and entity values.

### clean
Removes punctuation and whitespace tokens, filters empty entities.

### advClean
Advanced cleaning with more sophisticated rules, implemented in `/src/processors/advclean.ts`.

### extract
Extracts structured data like emails, phones, URLs, and numbers.

### segment
Segments text into sentences.

### Specialized Extractors
- `extractEmailsOnly` - Extract only email addresses
- `extractPhonesOnly` - Extract only phone numbers
- `extractUrlsOnly` - Extract only URLs
- `extractNumbersOnly` - Extract only numbers

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

## LLM Integration

### LLM Processors

#### createLLMSummarizer
Creates an LLM-based text summarizer.

```typescript
const summarizer = createLLMSummarizer(
  yourLLMAdapter,
  { temperature: 0.3 },
  100 // max summary length
);
```

#### createLLMSentimentAnalyzer
Creates an LLM-based sentiment analyzer.

```typescript
const sentimentAnalyzer = createLLMSentimentAnalyzer(
  yourLLMAdapter,
  { temperature: 0 }
);
```

#### createLLMIntentClassifier
Creates an LLM-based intent classifier.

```typescript
const intentClassifier = createLLMIntentClassifier(
  yourLLMAdapter,
  ["question", "statement", "command", "greeting"]
);
```

#### createLLMTopicClassifier
Creates an LLM-based topic classifier.

```typescript
const topicClassifier = createLLMTopicClassifier(
  yourLLMAdapter
);
```

#### createLLMTextEnhancer
Creates an LLM-based text enhancer.

```typescript
const textEnhancer = createLLMTextEnhancer(
  yourLLMAdapter
);
```

### Default Configuration

The default configuration is:

```yaml
pipeline:
  enableNormalization: true
  enableCleaning: true
  enableExtraction: true
  enableSegmentation: true
  enableAdvCleaning: false

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

llm:
  enabled: false
  provider: gemini
```
