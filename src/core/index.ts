import type { Token } from "../core/Tokenizer";

export interface Entity {
  type: string;
  value: string;
  start: number;
  end: number;
}

export interface IntentResult {
  text: string;
  tokens: Token[];
  entities: Entity[];
}
