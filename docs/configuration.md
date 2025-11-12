# Miniparse Configuration

## Overview

Miniparse provides a flexible configuration system that allows you to customize the behavior of the text processing pipeline. Configuration can be specified through:

1. **YAML configuration files** - The primary method
2. **Programmatic configuration** - Loading configs in code
3. **Default configuration** - Built-in settings when no custom config is provided

## YAML Configuration

The recommended way to configure Miniparse is with a YAML file named `miniparse.config.yaml` in your project root. The Pipeline will automatically load this file if present.

### Basic Configuration File

```yaml
# miniparse.config.yaml
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

## Configuration Sections

### Pipeline Configuration

The `pipeline` section controls which processing components are enabled:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| enableNormalization | boolean | true | Enables text normalization (case conversion, number formatting) |
| enableCleaning | boolean | true | Enables cleaning of punctuation and whitespace tokens |
| enableExtraction | boolean | true | Enables entity extraction (emails, phones, urls, numbers) |
| enableSegmentation | boolean | true | Enables text segmentation into sentences |
| enableAdvCleaning | boolean | false | Enables advanced cleaning with more sophisticated rules |

### Tokenizer Configuration

The `tokenizer` section configures how text is broken into tokens:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| lowercase | boolean | true | Convert word tokens to lowercase |
| mergeSymbols | boolean | false | Merge consecutive symbol tokens into single tokens |

### Speech Configuration

The `speech` section controls speech pattern analysis:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| removeFillerWords | boolean | true | Remove common filler words (um, uh, like, etc.) |
| detectRepetitions | boolean | false | Detect and remove repeated words |
| findStutters | boolean | false | Detect and fix stuttered words |

### Extraction Configuration

The `extraction` section controls which entity types are extracted:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| extractEmails | boolean | true | Extract email addresses from text |
| extractPhones | boolean | true | Extract phone numbers from text |
| extractUrls | boolean | true | Extract URLs from text |
| extractNumbers | boolean | true | Extract numbers from text |

### LLM Configuration

The `llm` section configures Large Language Model integration:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| enabled | boolean | false | Enable LLM functionality |
| provider | string | "gemini" | LLM provider (currently supports "gemini") |
| apiKey | string | - | Your LLM API key |
| model | string | "gemini-2.5-flash" | LLM model to use |
| temperature | number | - | Temperature setting for LLM generation |
| maxTokens | number | - | Maximum tokens for LLM responses |
| timeout | number | - | Request timeout in milliseconds |

## Programmatic Configuration

You can also load configurations programmatically:

```typescript
import { ConfigLoader } from 'miniparse';

// Load configuration from a specific file
const config = ConfigLoader.loadConfig('./path/to/config.yaml');

// Create pipeline with the loaded config
const pipeline = new Pipeline('./path/to/config.yaml');
```

## Configuration Loading Priority

Miniparse follows this priority order when loading configurations:

1. **Custom config path** - If provided to the Pipeline constructor
2. **Local config file** - `miniparse.config.yaml` in the current working directory
3. **Default config** - Built-in default configuration

## Example Configurations

### Minimal Configuration (Fastest)
```yaml
# For maximum performance, disable unnecessary features
pipeline:
  enableNormalization: true
  enableCleaning: false
  enableExtraction: false
  enableSegmentation: false
  enableAdvCleaning: false

tokenizer:
  lowercase: true
  mergeSymbols: false

speech:
  removeFillerWords: false
  detectRepetitions: false
  findStutters: false

extraction:
  extractEmails: false
  extractPhones: false
  extractUrls: false
  extractNumbers: false

llm:
  enabled: false
  provider: gemini
```

### Speech Processing Configuration
```yaml
# For processing speech-to-text output
pipeline:
  enableNormalization: true
  enableCleaning: true
  enableExtraction: false
  enableSegmentation: true
  enableAdvCleaning: true

tokenizer:
  lowercase: true
  mergeSymbols: false

speech:
  removeFillerWords: true
  detectRepetitions: true
  findStutters: true

extraction:
  extractEmails: false
  extractPhones: false
  extractUrls: false
  extractNumbers: false

llm:
  enabled: false
  provider: gemini
```

### Entity Extraction Configuration
```yaml
# For extracting structured data
pipeline:
  enableNormalization: true
  enableCleaning: true
  enableExtraction: true
  enableSegmentation: false
  enableAdvCleaning: false

tokenizer:
  lowercase: true
  mergeSymbols: false

speech:
  removeFillerWords: false
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