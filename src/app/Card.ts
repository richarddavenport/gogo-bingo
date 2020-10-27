export interface Card {
  spaces: number[];
  selectedSpaces: number[];
}

export const AVAILABLE_NUMBERS = Array.from({ length: 75 }, (_, i) => i + 1);
