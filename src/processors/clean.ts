import type { PipelineComponent } from "../core/types";
import { IntentResult } from "../types";

export const clean: PipelineComponent = (input: IntentResult): IntentResult => {
  input.tokens = input.tokens.filter(
    (token) => token.type !== "punct" && token.type !== "whitespace",
  );

  input.entities = input.entities.filter(
    (entity) => entity.value.trim().length > 0,
  );

  return input;
};
