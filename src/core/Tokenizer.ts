export type TokenType =
  | "word"
  | "number"
  | "punct"
  | "symbol"
  | "whitespace"
  | "unknown";

export interface Token {
  value: string;
  type: TokenType;
  start: number;
  end: number;
}

export interface TokenizerOptions {
  lowercase?: boolean;
  mergeSymbols?: boolean;
}

export class Tokenizer {
  private options: Required<TokenizerOptions>;

  constructor(options?: TokenizerOptions) {
    this.options = {
      lowercase: options?.lowercase ?? true,
      mergeSymbols: options?.mergeSymbols ?? false,
    };
  }

  tokenize(text: string): Token[] {
    const tokens: Token[] = [];
    const len = text.length;
    let start = 0;
    let current = "";
    let currentType: TokenType = "unknown";

    for (let i = 0; i < len; i++) {
      const ch = text.charAt(i);
      const type = this.classify(ch);

      if (type !== currentType || this.isBoundary(type, currentType, ch)) {
        if (current.length > 0) {
          tokens.push({
            value:
              this.options.lowercase && currentType === "word"
                ? current.toLowerCase()
                : current,
            type: currentType,
            start,
            end: i,
          });
        }
        current = ch;
        currentType = type;
        start = i;
      } else {
        current += ch;
      }
    }

    if (current.length > 0) {
      tokens.push({
        value:
          this.options.lowercase && currentType === "word"
            ? current.toLowerCase()
            : current,
        type: currentType,
        start,
        end: len,
      });
    }

    return tokens;
  }

  private classify(ch: string): TokenType {
    const code = ch.codePointAt(0)!;
    if (this.isLetter(code)) return "word";
    if (this.isDigit(code)) return "number";
    if (this.isWhitespace(code)) return "whitespace";
    if (this.isPunct(ch)) return "punct";
    if (this.isSymbol(code)) return "symbol";
    return "unknown";
  }

  private isLetter(code: number): boolean {
    return (
      (code >= 65 && code <= 90) ||
      (code >= 97 && code <= 122) ||
      (code >= 128 && code <= 591)
    );
  }

  private isDigit(code: number): boolean {
    return code >= 48 && code <= 57;
  }

  private isWhitespace(code: number): boolean {
    return code === 32 || code === 9 || code === 10 || code === 13;
  }

  private isPunct(ch: string): boolean {
    return ".,!?;:()[]{}\"'`".includes(ch);
  }

  private isSymbol(code: number): boolean {
    return (
      (code >= 33 && code <= 47) ||
      (code >= 58 && code <= 64) ||
      (code >= 91 && code <= 96) ||
      (code >= 123 && code <= 126) ||
      (code >= 8200 && code <= 129999)
    );
  }

  private isBoundary(next: TokenType, prev: TokenType, ch: string): boolean {
    if (next !== prev) return true;
    if (next === "symbol" && !this.options.mergeSymbols) return true;
    return false;
  }
}
