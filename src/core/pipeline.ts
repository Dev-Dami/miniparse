import type { Token } from "./Tokenizer";
import { Tokenizer } from "./Tokenizer";
import type { Entity, IntentResult } from "./index";

export type PipelineComponent = (
  input: IntentResult,
) => IntentResult | Promise<IntentResult>;

export class Pipeline {
  private readonly components: PipelineComponent[] = [];
  private readonly tokenizer: Tokenizer;

  constructor() {
    this.tokenizer = new Tokenizer();
  }

  public use(component: PipelineComponent): this {
    this.components.push(component);
    return this;
  }

  public async process(text: string): Promise<IntentResult> {
    const tokens = this.tokenizer.tokenize(text);
    let result: IntentResult = {
      text,
      tokens,
      entities: [],
    };

    for (const component of this.components) {
      result = await component(result);
    }

    return result;
  }
}
