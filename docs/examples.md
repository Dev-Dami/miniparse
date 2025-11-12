# Miniparse Usage Examples

## Basic Usage

### Simple Text Processing
```typescript
import { Pipeline } from 'miniparse';

async function basicExample() {
  const pipeline = new Pipeline();
  const result = await pipeline.process('Hello world! This is a test.');

  console.log(result);
  // Output will contain tokens and extracted entities
}
```

### Using Custom Configuration
```typescript
import { Pipeline } from 'miniparse';

// Use a custom config file
const pipeline = new Pipeline('./my-config.yaml');
const result = await pipeline.process('Sample text...');
```

## Speech Analysis Examples

### Analyzing Speech Patterns
```typescript
import { analyzeSpeechPatterns } from 'miniparse';

const speechText = "Um, well, I think that, uh, like, you know, the project is good.";

const analysis = analyzeSpeechPatterns(speechText);

console.log('Filler words found:', analysis.fillerWords);
console.log('Repetitions found:', analysis.repetitions);
console.log('Stutters found:', analysis.stutters);
```

### Preprocessing Speech
```typescript
import { preprocessSpeechInput } from 'miniparse';

const speechText = "Um, well, I think that, uh, like, you know, the project is good.";

// Remove filler words only
const cleanText1 = preprocessSpeechInput(speechText, {
  removeFillerWords: true,
  detectRepetitions: false,
  findStutters: false
});
console.log(cleanText1);
// Output: "I think that, the project is good."

// Remove filler words and detect repetitions
const cleanText2 = preprocessSpeechInput(speechText, {
  removeFillerWords: true,
  detectRepetitions: true,
  findStutters: false
});
console.log(cleanText2);
```

## Advanced Processing Examples

### Custom Processor
```typescript
import { Pipeline, type PipelineComponent, IntentResult } from 'miniparse';

// Create a custom processor that adds a custom entity
const customProcessor: PipelineComponent = (input: IntentResult) => {
  input.entities.push({
    type: 'custom',
    value: 'custom entity',
    start: 0,
    end: 13
  });
  return input;
};

const pipeline = new Pipeline();
pipeline.addCustomProcessor(customProcessor);

const result = await pipeline.process('Sample text...');
console.log(result.entities);
```

## LLM Integration Examples

### Using LLM for Sentiment Analysis
```typescript
import { Pipeline, GeminiLLMAdapter, createLLMSentimentAnalyzer } from 'miniparse';

const geminiAdapter = new GeminiLLMAdapter({
  apiKey: process.env.GEMINI_API_KEY!,
  model: 'gemini-2.5-flash',
});

const pipeline = new Pipeline();
pipeline.addLLMProcessor(createLLMSentimentAnalyzer(geminiAdapter));

const result = await pipeline.process('I love this product! It works perfectly.');
console.log(result.entities); // Contains sentiment entity
```

### Using LLM for Summarization
```typescript
import { Pipeline, GeminiLLMAdapter, createLLMSummarizer } from 'miniparse';

const geminiAdapter = new GeminiLLMAdapter({
  apiKey: process.env.GEMINI_API_KEY!,
  model: 'gemini-2.5-flash',
});

const pipeline = new Pipeline();
pipeline.addLLMProcessor(createLLMSummarizer(geminiAdapter, undefined, 50));

const result = await pipeline.process('Your long text here...');
console.log(result.entities); // Contains summary entity
```

## Extraction Examples

### Extracting Specific Information
```typescript
import { Pipeline } from 'miniparse';

async function extractSpecificInfo() {
  const pipeline = new Pipeline();
  const text = `
    Hello! My name is John Doe. You can reach me at john.doe@example.com
    or call me at 555-123-4567. I work at Tech Corp and my website is
    https://www.techcorp.com. I was born in 1990.
  `;

  const result = await pipeline.process(text);

  // Filter for specific entity types
  const emails = result.entities.filter(e => e.type === 'email');
  const phones = result.entities.filter(e => e.type === 'phone');
  const urls = result.entities.filter(e => e.type === 'url');
  const numbers = result.entities.filter(e => e.type === 'number');

  console.log('Emails found:', emails);
  console.log('Phones found:', phones);
  console.log('URLs found:', urls);
  console.log('Numbers found:', numbers);
}
```

### Using Individual Extraction Functions
```typescript
import { Pipeline, extractEmailsOnly } from 'miniparse';

async function customExtraction() {
  const pipeline = new Pipeline();

  // Add only specific extraction processors to the pipeline
  pipeline.addCustomProcessor(extractEmailsOnly);

  const result = await pipeline.process('Email: test@example.com and Phone: (555) 123-4567');
  // Only emails will be extracted based on the processors added
  console.log('Result entities:', result.entities.filter(e => e.type === 'email'));
}
```

## Configuration Examples

### Default Configuration File
Create a `miniparse.config.yaml` in your project:

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

## API Integration Examples

### Express.js API for Text Processing

This example demonstrates how to create a simple Express.js API endpoint that uses the `processText` function from Miniparse to process incoming text requests.

```typescript
import express from "express";
import { processText } from "dd-miniparse";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/process", async (req, res) => {
const { text, configPath } = req.query;

if (!text || typeof text !== "string") {
  return res
    .status(400)
    .json({ error: "Missing or invalid 'text' query parameter." });
}

try {
  const result = await processText(text, configPath as string | undefined);
  res.json(result);
} catch (error: any) {
  console.error("Error processing text:", error);
  res
    .status(500)
    .json({ error: "Failed to process text.", details: error.message });
}
});

app.listen(port, () => {
console.log(`Express example app listening at http://localhost:${port}`);
console.log(`Try: http://localhost:${port}/process?text=Hello%20world%20`);
console.log(
  `Or with advanced cleaning enabled (if configured): http://localhost:${port}/process?text=Hello%20world%20&configPath=./default.yaml`,
);
});
```
