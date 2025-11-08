import type { Token } from "./Tokenizer";
import type { IntentResult } from "../index";

export type PipelineComponent = (
  input: IntentResult,
) => IntentResult | Promise<IntentResult>;
