# Miniparse API

## Core Classes

### Pipeline

Main class for processing text.

**Constructor**
```typescript
new Pipeline(configPath?: string)
```

**Methods**
- `process(text: string)` - Process text and return analysis
- `use(component: PipelineComponent)` - Add custom component
- `addCustomProcessor(component: PipelineComponent)` - Same as `use`
- `getConfig()` - Get current configuration

### ConfigLoader

Load configurations from files.

**Methods**
- `loadConfig(customConfigPath?: string)` - Load configuration

## Core Types

```typescript
interface IntentResult {
  text: string;
  tokens: Token[];
  entities: Entity[];
}

interface Token {
  value: string;
  type: TokenType;
  start: number;
  end: number;
}

type TokenType = "word" | "number" | "punct" | "symbol" | "whitespace" | "unknown";

interface Entity {
  type: string;
  value: string;
  start: number;
  end: number;
}

interface MiniparseConfig { ... }  // See configuration docs
```

## Speech Functions

**preprocessSpeechInput**
```typescript
preprocessSpeechInput(text: string, options?: SpeechPatternOptions): string
```

**analyzeSpeechPatterns**
```typescript
analyzeSpeechPatterns(text: string): {
  fillerWords: string[];
  repetitions: string[];
  stutters: string[];
}
```

## Processors

- `normalize` - Normalize text
- `clean` - Remove punctuation/whitespace
- `extract` - Extract emails, phones, URLs, numbers
- `segment` - Split into sentences

## Specialized Extractors

- `extractEmailsOnly`
- `extractPhonesOnly`
- `extractUrlsOnly`
- `extractNumbersOnly`