declare module 'parse-ingredient' {
  // The library lacks official TypeScript declarations, so we add minimal ones
  // sufficient for our project use case.
  export interface ParsedIngredient {
    quantity: number | null;
    quantity2?: number | null;
    unitOfMeasure: string | null;
    unitOfMeasureID?: string | null;
    description: string;
    isGroupHeader: boolean;
  }

  export interface ParseOptions {
    normalizeUOM?: boolean;
    // Other options omitted for brevity
  }

  export function parseIngredient(
    input: string,
    options?: ParseOptions
  ): ParsedIngredient[];
} 