import type { PipelineComponent } from "../core/types";

export interface MiniparseConfig {
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

export const defaultConfig: MiniparseConfig = {
  pipeline: {
    enableNormalization: true,
    enableCleaning: true,
    enableExtraction: true,
    enableSegmentation: true,
  },
  tokenizer: {
    lowercase: true,
    mergeSymbols: false,
  },
  speech: {
    removeFillerWords: true,
    detectRepetitions: false,
    findStutters: false,
  },
  extraction: {
    extractEmails: true,
    extractPhones: true,
    extractUrls: true,
    extractNumbers: true,
  },
};