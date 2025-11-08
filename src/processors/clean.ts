// src/processors/clean.ts

export function clean(text: string): string {
    // Add cleaning logic here (e.g., remove punctuation)
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
}
